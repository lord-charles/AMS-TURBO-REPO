"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"
import type { CourseAttendance } from "./types"
import { AttendanceCard } from "./attendance-card"
import { mockCourseAttendance } from "./mock-data"
import { useState } from "react"

interface CourseAttendanceListProps {
  courses?: CourseAttendance[]
}

export function CourseAttendanceList({ courses = mockCourseAttendance }: CourseAttendanceListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [warningFilter, setWarningFilter] = useState("all")

  // Filter courses based on search query and warning level
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.courseCode.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesWarning =
      warningFilter === "all" ||
      (warningFilter === "at-risk" && (course.warningLevel === "warning" || course.warningLevel === "critical")) ||
      (warningFilter === "good" && (course.warningLevel === "none" || course.warningLevel === "caution"))

    return matchesSearch && matchesWarning
  })

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Course Attendance</CardTitle>
        <CardDescription>View and manage your attendance for each course</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={warningFilter} onValueChange={setWarningFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                <SelectItem value="at-risk">At Risk</SelectItem>
                <SelectItem value="good">Good Standing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCourses.map((course) => (
              <AttendanceCard key={course.courseId} course={course} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-muted-foreground mb-2">No courses found matching your criteria.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setWarningFilter("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

