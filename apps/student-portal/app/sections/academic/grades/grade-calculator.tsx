"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import type { Semester } from "./types"
import { calculateGPA, calculateWhatIfGPA, getGradePoints } from "./utils"
import { mockTranscriptData } from "./mock-data"

type GradeValue = "A" | "B" | "C" | "D" | "E" | "N/A"

interface GradeCalculatorProps {
  academicRecord?: {
    semesters: Semester[]
  }
}

export default function GradeCalculator({ academicRecord = mockTranscriptData }: GradeCalculatorProps) {
  const [activeTab, setActiveTab] = useState("semester")
  const [selectedSemester, setSelectedSemester] = useState<string>("")
  const [whatIfCourses, setWhatIfCourses] = useState<
    {
      id: string
      courseCode: string
      courseName: string
      creditHours: number
      currentGrade: GradeValue
      newGrade: GradeValue
    }[]
  >([])
  const [customCourses, setCustomCourses] = useState<
    {
      id: string
      courseCode: string
      courseName: string
      creditHours: number
      grade: GradeValue
    }[]
  >([
    {
      id: "custom-1",
      courseCode: "",
      courseName: "",
      creditHours: 3,
      grade: "A",
    },
  ])
  const [currentGPA, setCurrentGPA] = useState<number>(0)
  const [projectedGPA, setProjectedGPA] = useState<number>(0)
  const [customGPA, setCustomGPA] = useState<number>(0)

  // Get all semesters
  const semesters = academicRecord.semesters.filter(
    (semester) => semester.status === "completed" || semester.status === "in-progress",
  )

  // Initialize with the current semester if available, otherwise the most recent
  useEffect(() => {
    const currentSem = semesters.find((sem) => sem.status === "in-progress")
    if (currentSem) {
      setSelectedSemester(currentSem.id)
    } else if (semesters.length > 0) {
      // Sort by end date descending and get the most recent
      const sortedSemesters = [...semesters].sort(
        (a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime(),
      )
      setSelectedSemester(sortedSemesters[0].id)
    }
  }, []) // Only run once on mount

  // Update what-if courses when semester changes
  useEffect(() => {
    if (selectedSemester) {
      const semester = semesters.find((sem) => sem.id === selectedSemester)
      if (semester) {
        const courses = semester.courses
          .filter((course) => course.status === "completed" || course.status === "in-progress")
          .map((course) => ({
            id: course.id,
            courseCode: course.code,
            courseName: course.title,
            creditHours: course.credits,
            currentGrade: (course.grade || "N/A") as GradeValue,
            newGrade: (course.grade || "N/A") as GradeValue,
          }))
        setWhatIfCourses(courses)
        setCurrentGPA(semester.gpa || 0)
        // Initialize projected GPA to match current GPA
        setProjectedGPA(semester.gpa || 0)
      }
    }
  }, [selectedSemester]) // Only depend on selectedSemester

  // Calculate projected GPA when what-if courses change
  const calculateProjectedGPA = useCallback(() => {
    if (!selectedSemester || whatIfCourses.length === 0) return

    const semester = semesters.find((sem) => sem.id === selectedSemester)
    if (!semester) return

    const changedCourses = whatIfCourses
      .filter((course) => course.currentGrade !== course.newGrade && course.newGrade !== "N/A")
      .map((course) => ({
        credits: course.creditHours,
        grade: course.newGrade,
      }))

    if (changedCourses.length > 0) {
      const newGPA = calculateWhatIfGPA(
        semester.courses.map((course) => ({
          ...course,
          grade: course.grade || "N/A",
          gradePoint: course.grade ? getGradePoints(course.grade as GradeValue) : 0,
        })),
        changedCourses,
      )
      return newGPA
    }

    return semester.gpa || 0
  }, [selectedSemester, whatIfCourses, semesters])

  // Update projected GPA when what-if courses change
  useEffect(() => {
    const newGPA = calculateProjectedGPA()
    if (newGPA !== undefined) {
      setProjectedGPA(newGPA)
    }
  }, [calculateProjectedGPA])

  // Calculate custom GPA
  const calculateCustomGPA = useCallback(() => {
    const validCourses = customCourses.filter((course) => course.courseCode.trim() !== "" && course.creditHours > 0)

    if (validCourses.length === 0) return 0

    const coursesForCalculation = validCourses.map((course) => ({
      id: course.id,
      code: course.courseCode,
      title: course.courseName,
      credits: course.creditHours,
      grade: course.grade,
      gradePoint: getGradePoints(course.grade),
      status: "completed" as const,
      semester: "Custom",
      academicYear: "Custom",
      score: 0,
    }))

    return calculateGPA(coursesForCalculation)
  }, [customCourses])

  // Update custom GPA when custom courses change
  useEffect(() => {
    const newGPA = calculateCustomGPA()
    setCustomGPA(newGPA)
  }, [calculateCustomGPA])

  const handleWhatIfGradeChange = (courseId: string, newGrade: GradeValue) => {
    setWhatIfCourses((prev) => prev.map((course) => (course.id === courseId ? { ...course, newGrade } : course)))
  }

  const handleCustomCourseChange = (index: number, field: string, value: any) => {
    setCustomCourses((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }

  const addCustomCourse = () => {
    const newCourse = {
      id: `custom-${Date.now()}`,
      courseCode: "",
      courseName: "",
      creditHours: 3,
      grade: "A" as GradeValue,
    }
    setCustomCourses((prev) => [...prev, newCourse])
  }

  const removeCustomCourse = (index: number) => {
    if (customCourses.length <= 1) return

    setCustomCourses((prev) => {
      const updated = [...prev]
      updated.splice(index, 1)
      return updated
    })
  }

  const resetWhatIfCalculation = () => {
    if (!selectedSemester) return

    const semester = semesters.find((sem) => sem.id === selectedSemester)
    if (!semester) return

    const courses = semester.courses
      .filter((course) => course.status === "completed" || course.status === "in-progress")
      .map((course) => ({
        id: course.id,
        courseCode: course.code,
        courseName: course.title,
        creditHours: course.credits,
        currentGrade: (course.grade || "N/A") as GradeValue,
        newGrade: (course.grade || "N/A") as GradeValue,
      }))

    setWhatIfCourses(courses)
    setProjectedGPA(semester.gpa || 0)
  }

  const resetCustomCalculation = () => {
    const initialCourse = {
      id: `custom-${Date.now()}`,
      courseCode: "",
      courseName: "",
      creditHours: 3,
      grade: "A" as GradeValue,
    }
    setCustomCourses([initialCourse])
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">GPA Calculator</h1>
          <p className="text-muted-foreground">Calculate your GPA and explore different grade scenarios</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:w-[400px]">
          <TabsTrigger value="semester">What-If Calculator</TabsTrigger>
          <TabsTrigger value="custom">Custom Calculator</TabsTrigger>
        </TabsList>

        <TabsContent value="semester" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>What-If GPA Calculator</CardTitle>
              <CardDescription>See how different grades would affect your GPA</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="semester">Select Semester</Label>
                  <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                    <SelectTrigger id="semester">
                      <SelectValue placeholder="Select a semester" />
                    </SelectTrigger>
                    <SelectContent>
                      {semesters.map((semester) => (
                        <SelectItem key={semester.id} value={semester.id}>
                          {semester.name} - {semester.academicYear}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedSemester && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-md">
                      <div>
                        <div className="text-sm text-muted-foreground">Current GPA</div>
                        <div className="text-2xl font-bold">{currentGPA.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Projected GPA</div>
                        <div className="text-2xl font-bold">
                          {projectedGPA.toFixed(2)}
                          {projectedGPA !== currentGPA && (
                            <span
                              className={`text-sm ml-2 ${projectedGPA > currentGPA ? "text-green-500" : "text-red-500"}`}
                            >
                              {projectedGPA > currentGPA ? "+" : ""}
                              {(projectedGPA - currentGPA).toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Course</TableHead>
                          <TableHead className="text-center">Credits</TableHead>
                          <TableHead className="text-center">Current Grade</TableHead>
                          <TableHead className="text-center">New Grade</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {whatIfCourses.map((course) => (
                          <TableRow key={course.id}>
                            <TableCell>
                              <div className="font-medium">{course.courseCode}</div>
                              <div className="text-xs text-muted-foreground">{course.courseName}</div>
                            </TableCell>
                            <TableCell className="text-center">{course.creditHours}</TableCell>
                            <TableCell className="text-center font-medium">
                              {course.currentGrade !== "N/A" ? course.currentGrade : "-"}
                            </TableCell>
                            <TableCell>
                              <Select
                                value={course.newGrade}
                                onValueChange={(value) => handleWhatIfGradeChange(course.id, value as GradeValue)}
                                disabled={course.currentGrade === "N/A"}
                              >
                                <SelectTrigger className="w-20 mx-auto">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="A">A</SelectItem>
                                  <SelectItem value="B">B</SelectItem>
                                  <SelectItem value="C">C</SelectItem>
                                  <SelectItem value="D">D</SelectItem>
                                  <SelectItem value="E">E</SelectItem>
                                  <SelectItem value="N/A">N/A</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    {projectedGPA !== currentGPA && (
                      <div className="p-4 bg-muted/50 rounded-md">
                        <div className="text-sm font-medium mb-2">GPA Impact</div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Current GPA</span>
                            <span>Projected GPA</span>
                          </div>
                          <div className="relative h-2 w-full bg-secondary rounded-full overflow-hidden">
                            <div
                              className="absolute inset-0 flex items-center"
                              style={{ left: `${(currentGPA / 4) * 100}%` }}
                            >
                              <div className="h-4 w-0.5 bg-primary"></div>
                            </div>
                            <div
                              className="absolute inset-0 flex items-center"
                              style={{ left: `${(projectedGPA / 4) * 100}%` }}
                            >
                              <div className="h-4 w-0.5 bg-green-500"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end">
                      <Button variant="outline" onClick={resetWhatIfCalculation}>
                        Reset
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Custom GPA Calculator</CardTitle>
              <CardDescription>Calculate your GPA with custom courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Custom Courses</Label>
                  <div className="space-y-4">
                    {customCourses.map((course, index) => (
                      <div key={course.id} className="grid grid-cols-1 md:grid-cols-12 gap-2 items-end">
                        <div className="md:col-span-3">
                          <Label htmlFor={`course-code-${index}`} className="text-xs">
                            Course Code
                          </Label>
                          <Input
                            id={`course-code-${index}`}
                            value={course.courseCode}
                            onChange={(e) => handleCustomCourseChange(index, "courseCode", e.target.value)}
                          />
                        </div>
                        <div className="md:col-span-4">
                          <Label htmlFor={`course-name-${index}`} className="text-xs">
                            Course Name
                          </Label>
                          <Input
                            id={`course-name-${index}`}
                            value={course.courseName}
                            onChange={(e) => handleCustomCourseChange(index, "courseName", e.target.value)}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor={`credit-hours-${index}`} className="text-xs">
                            Credits
                          </Label>
                          <Input
                            id={`credit-hours-${index}`}
                            type="number"
                            value={course.creditHours}
                            onChange={(e) =>
                              handleCustomCourseChange(index, "creditHours", Number.parseInt(e.target.value) || 0)
                            }
                            min="0"
                            max="12"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor={`grade-${index}`} className="text-xs">
                            Grade
                          </Label>
                          <Select
                            value={course.grade}
                            onValueChange={(value) => handleCustomCourseChange(index, "grade", value as GradeValue)}
                          >
                            <SelectTrigger id={`grade-${index}`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="A">A</SelectItem>
                              <SelectItem value="B">B</SelectItem>
                              <SelectItem value="C">C</SelectItem>
                              <SelectItem value="D">D</SelectItem>
                              <SelectItem value="E">E</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="md:col-span-1">
                          {customCourses.length > 1 && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeCustomCourse(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              ✕
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={resetCustomCalculation}>
                    Reset
                  </Button>
                  <Button onClick={addCustomCourse}>Add Course</Button>
                </div>

                <div className="p-4 bg-muted/50 rounded-md">
                  <div className="text-sm text-muted-foreground">Custom GPA</div>
                  <div className="text-2xl font-bold">{customGPA.toFixed(2)}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

