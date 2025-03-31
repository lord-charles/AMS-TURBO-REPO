"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, Calendar, Clock, Filter, GraduationCap, Loader2, MapPin, Search, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"

import { useCourses } from "@/hooks/use-courses"
import { CourseStatistics } from "./course-statistics"
import { SemesterProgress } from "./semester-progress"
import { UpcomingDeadlines } from "./upcoming-deadlines"

export function CoursesDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [semesterFilter, setSemesterFilter] = useState("current")
  const { toast } = useToast()
  const { courses, isLoading } = useCourses()

  // Filter courses based on search query and semester filter
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSemester =
      semesterFilter === "all" ||
      (semesterFilter === "current" && course.semester === "Fall 2023") ||
      (semesterFilter === "past" && course.semester !== "Fall 2023")

    return matchesSearch && matchesSemester
  })

  const handleExportTimetable = () => {
    toast({
      title: "Timetable exported",
      description: "Your timetable has been exported to your calendar",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Courses</h1>
          <p className="text-muted-foreground">Manage your enrolled courses and track your academic progress</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleExportTimetable}>
            <Calendar className="mr-2 h-4 w-4" />
            Export Timetable
          </Button>
          <Button asChild>
            <Link href="/academic/registration">
              <GraduationCap className="mr-2 h-4 w-4" />
              Register Courses
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="enrolled" className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <TabsList>
            <TabsTrigger value="enrolled">Enrolled Courses</TabsTrigger>
            <TabsTrigger value="overview">Semester Overview</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-[200px]">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search courses..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter Semester</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSemesterFilter("current")}>Current Semester</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSemesterFilter("past")}>Past Semesters</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSemesterFilter("all")}>All Semesters</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <TabsContent value="enrolled" className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : filteredCourses.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          <span className="text-primary font-bold">{course.code}</span>: {course.name}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {course.semester} • {course.credits} Credits
                        </CardDescription>
                      </div>
                      <Badge variant={course.status === "active" ? "default" : "outline"}>
                        {course.status === "active" ? "Active" : "Completed"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <User className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>Instructor: {course.instructor}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{course.schedule}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{course.location}</span>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Course Progress</span>
                          <span className="text-sm text-muted-foreground">{course.progress}%</span>
                        </div>
                        <Progress
                          value={course.progress}
                          className="h-2"
                        
                        />
                      </div>

                      {course.grade && (
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-sm">Current Grade:</span>
                          <Badge
                            variant={
                              course.grade.startsWith("A")
                                ? "default"
                                : course.grade.startsWith("B")
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {course.grade}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/academic/mycourses/${course.id}`}>
                        <BookOpen className="mr-2 h-4 w-4" />
                        Course Details
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/academic/materials?course=${course.id}`}>
                        <GraduationCap className="mr-2 h-4 w-4" />
                        Materials
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-4 border rounded-lg bg-muted/30">
              <BookOpen className="h-12 w-12 text-muted-foreground mb-3" />
              <h3 className="text-lg font-medium">No Courses Found</h3>
              <p className="text-sm text-muted-foreground mt-1 text-center">
                {searchQuery
                  ? "No courses match your search criteria. Try adjusting your search."
                  : "You don't have any enrolled courses for the selected semester."}
              </p>
              {!searchQuery && (
                <Button className="mt-4" asChild>
                  <Link href="/academic/registration">Register for Courses</Link>
                </Button>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <CourseStatistics />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Semester Progress</CardTitle>
                <CardDescription>Track your progress through the current semester</CardDescription>
              </CardHeader>
              <CardContent>
                <SemesterProgress />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
                <CardDescription>Important dates and deadlines</CardDescription>
              </CardHeader>
              <CardContent>
                <UpcomingDeadlines />
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/academic/calendar">
                    <Calendar className="mr-2 h-4 w-4" />
                    View Full Calendar
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

