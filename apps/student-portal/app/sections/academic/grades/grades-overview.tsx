"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Calculator,
  Calendar,
  ChevronDown,
  ChevronUp,
  FileText,
  GraduationCap,
  Info,
  Printer,
  RefreshCw,
} from "lucide-react"
import type { AcademicRecord } from "./types"
import { SemesterGradeCard } from "./semester-grade-card"
import { CourseGradeItem } from "./course-grade-item"
import { GradeDistributionChart } from "./grade-distribution-chart"
import { GradeProgressChart } from "./grade-progress-chart"
import { formatDate, getCurrentSemester, getHonorsStatus, getPastSemesters, isOnAcademicWarningSemesters } from "./utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { mockAcademicRecord } from "./mock-data"

interface GradesOverviewProps {
  academicRecord?: AcademicRecord
  onViewCourseDetails?: (courseId: string) => void
  onRequestAppeal?: (courseId: string) => void
  onCalculateGPA?: () => void
  onRequestTranscript?: () => void
}

export function GradesOverview({
  academicRecord = mockAcademicRecord,
  onViewCourseDetails,
  onRequestAppeal,
  onCalculateGPA,
  onRequestTranscript,
}: GradesOverviewProps) {
  const [activeTab, setActiveTab] = useState("current")
  const [showAllSemesters, setShowAllSemesters] = useState(false)

  const currentSemester = getCurrentSemester(academicRecord)
  const pastSemesters = getPastSemesters(academicRecord)
  const displayedPastSemesters = showAllSemesters ? pastSemesters : pastSemesters.slice(0, 2)

  const onAcademicWarning = isOnAcademicWarningSemesters(academicRecord.semesters)
  const honorsStatus = getHonorsStatus(academicRecord.cgpa)

  const allCompletedCourses = pastSemesters.flatMap((semester) =>
    semester.courses.filter((course) => course.status === "published"),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Academic Grades</h1>
          <p className="text-muted-foreground">View and manage your academic performance</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={onCalculateGPA} className="gap-2">
            <Calculator size={16} />
            <span className="hidden sm:inline">GPA Calculator</span>
          </Button>
          <Button variant="outline" size="sm" onClick={onRequestTranscript} className="gap-2">
            <FileText size={16} />
            <span className="hidden sm:inline">Request Transcript</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Printer size={16} />
            <span className="hidden sm:inline">Print Report</span>
          </Button>
          <Button size="sm" className="gap-2">
            <RefreshCw size={16} />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">Academic Summary</CardTitle>
                <CardDescription>{academicRecord.program}</CardDescription>
              </div>
              <Badge variant="outline" className="text-xs">
                {academicRecord.currentLevel}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">CGPA</div>
                <div className="text-2xl font-bold">{academicRecord.cgpa.toFixed(2)}</div>
                <div className="text-xs text-muted-foreground">{honorsStatus}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Credit Hours</div>
                <div className="text-2xl font-bold">{academicRecord.totalCreditHours}</div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Courses</div>
                <div className="text-2xl font-bold">{allCompletedCourses.length}</div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Status</div>
                <div className="text-lg font-medium flex items-center gap-1">
                  <span className={`h-2 w-2 rounded-full ${onAcademicWarning ? "bg-red-500" : "bg-green-500"}`}></span>
                  <span>{onAcademicWarning ? "Warning" : "Good Standing"}</span>
                </div>
                <div className="text-xs text-muted-foreground">Academic Status</div>
              </div>
            </div>

            {academicRecord.scholarships && academicRecord.scholarships.length > 0 && (
              <div className="mt-4 pt-4 border-t">
                <div className="text-sm font-medium mb-2">Scholarships & Awards</div>
                <div className="flex flex-wrap gap-2">
                  {academicRecord.scholarships.map((scholarship, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {scholarship}
                    </Badge>
                  ))}
                  {academicRecord.specialAwards?.map((award, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {award}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Student Information</CardTitle>
            <CardDescription>Personal academic details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2">
                <div className="text-muted-foreground">Name</div>
                <div className="font-medium">{academicRecord.studentName}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="text-muted-foreground">Admission No.</div>
                <div className="font-medium">{academicRecord.admissionNumber}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="text-muted-foreground">Faculty</div>
                <div className="font-medium">{academicRecord.faculty}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="text-muted-foreground">Department</div>
                <div className="font-medium">{academicRecord.department}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="text-muted-foreground">Admission Date</div>
                <div className="font-medium">{formatDate(academicRecord.admissionDate)}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="text-muted-foreground">Expected Graduation</div>
                <div className="font-medium">{formatDate(academicRecord.expectedGraduationDate)}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:w-[400px]">
          <TabsTrigger value="current">Current Semester</TabsTrigger>
          <TabsTrigger value="past">Past Semesters</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="mt-4">
          {currentSemester ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">
                    {currentSemester.name} - {currentSemester.academicYear}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(currentSemester.startDate)} - {formatDate(currentSemester.endDate)}
                  </p>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Calendar size={16} />
                        <span className="hidden sm:inline">Academic Calendar</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View academic calendar</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentSemester.courses.map((course) => (
                  <CourseGradeItem
                    key={course.id}
                    course={course}
                    showDetails={true}
                    onViewDetails={onViewCourseDetails}
                    onRequestAppeal={onRequestAppeal}
                  />
                ))}
              </div>

              {currentSemester.courses.some((course) => course.status === "withheld") && (
                <Alert variant="warning" className="mt-4">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Withheld Grades</AlertTitle>
                  <AlertDescription>
                    Some of your grades are withheld. This may be due to outstanding fees or administrative issues.
                    Please contact the finance office or your department for more information.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <GraduationCap size={48} className="text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No Current Semester</h3>
              <p className="text-muted-foreground max-w-md mt-2">
                There is no active semester at the moment. Check back during the registration period.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="mt-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Past Academic Performance</h3>
              <div className="flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2">
                        <BarChart3 size={16} />
                        <span className="hidden sm:inline">Analytics</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View detailed analytics</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <GradeProgressChart semesters={pastSemesters} />
              <GradeDistributionChart courses={allCompletedCourses} />
            </div>

            <div className="space-y-4 mt-6">
              {displayedPastSemesters.map((semester) => (
                <SemesterGradeCard key={semester.id} semester={semester} />
              ))}

              {pastSemesters.length > 2 && (
                <Collapsible open={showAllSemesters} onOpenChange={setShowAllSemesters}>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full flex items-center justify-center gap-2">
                      {showAllSemesters ? (
                        <>
                          <ChevronUp size={16} />
                          <span>Show Less</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown size={16} />
                          <span>Show {pastSemesters.length - 2} More Semesters</span>
                        </>
                      )}
                    </Button>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="space-y-4 mt-4">
                    {pastSemesters.slice(2).map((semester) => (
                      <SemesterGradeCard key={semester.id} semester={semester} />
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
