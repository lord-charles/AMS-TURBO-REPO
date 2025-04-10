"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AttendanceChart } from "@/app/sections/academic/attendance/attendance-chart"
import { AttendanceStatusBadge } from "@/app/sections/academic/attendance/attendance-status-badge"
import { mockCourseAttendance } from "@/app/sections/academic/attendance/mock-data"
import { formatDate, getWarningLevelColor } from "@/app/sections/academic/attendance/utils"
import { ArrowLeft, Calendar, Clock, MapPin, User } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DashboardLayout } from "@/components/dashboard-layout"
import { DashboardHeader } from "@/components/dashboard-header"

export default function CourseAttendancePage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.courseId as string

  // Find course data
  const courseData = mockCourseAttendance.find((course) => course.courseId === courseId)

  // If course not found, show error
  if (!courseData) {
    return (
      <div className="container mx-auto py-6">
        <Card>
          <CardHeader>
            <CardTitle>Course Not Found</CardTitle>
            <CardDescription>The requested course could not be found.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Sort records by date (newest first)
  const sortedRecords = [...courseData.records].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <DashboardLayout>
      <DashboardHeader />
      <div className=" py-6 space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">
          {courseData.courseCode}: {courseData.courseName}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Course Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Lecturer:</span>
                <span className="text-sm font-medium">{courseData.lecturer}</span>
              </div>

              {courseData.nextSession && (
                <>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Next Session:</span>
                    <span className="text-sm font-medium">{formatDate(courseData.nextSession.date)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Time:</span>
                    <span className="text-sm font-medium">
                      {courseData.nextSession.startTime} - {courseData.nextSession.endTime}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Location:</span>
                    <span className="text-sm font-medium">{courseData.nextSession.location}</span>
                  </div>
                </>
              )}

              <div className="flex items-center gap-2 mt-4">
                <div
                  className={`px-2 py-1 rounded-md text-xs font-medium ${getWarningLevelColor(courseData.warningLevel)}`}
                >
                  Attendance Status:{" "}
                  {courseData.warningLevel.charAt(0).toUpperCase() + courseData.warningLevel.slice(1)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Attendance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="flex flex-col items-center p-3 bg-muted rounded-md">
                <span className="text-2xl font-bold">{courseData.totalSessions}</span>
                <span className="text-xs text-muted-foreground">Total Sessions</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-muted rounded-md">
                <span className="text-2xl font-bold">{courseData.attendedSessions}</span>
                <span className="text-xs text-muted-foreground">Attended</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-muted rounded-md">
                <span className="text-2xl font-bold">{courseData.totalSessions - courseData.attendedSessions}</span>
                <span className="text-xs text-muted-foreground">Missed</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-muted rounded-md">
                <span className="text-2xl font-bold">{courseData.attendancePercentage}%</span>
                <span className="text-xs text-muted-foreground">Attendance Rate</span>
              </div>
            </div>

            <div className="h-[200px]">
              <AttendanceChart courseAttendance={courseData} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="records" className="space-y-4">
        <TabsList>
          <TabsTrigger value="records">Attendance Records</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="records">
          <Card>
            <CardHeader>
              <CardTitle>Attendance History</CardTitle>
              <CardDescription>Detailed record of your attendance for this course</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Session Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Marking Method</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedRecords.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell>{formatDate(record.date)}</TableCell>
                      <TableCell>
                        {record.startTime} - {record.endTime}
                      </TableCell>
                      <TableCell className="capitalize">{record.sessionType}</TableCell>
                      <TableCell>
                        <AttendanceStatusBadge status={record.status} />
                      </TableCell>
                      <TableCell>{record.location}</TableCell>
                      <TableCell className="capitalize">{record.markingMethod}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Trends</CardTitle>
                <CardDescription>Your attendance pattern over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <AttendanceChart
                  courseAttendance={courseData}
                  title="Attendance Trend"
                  description="Your attendance pattern over the semester"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Session Type Analysis</CardTitle>
                <CardDescription>Attendance by session type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["lecture", "tutorial", "lab", "seminar"].map((type) => {
                    const typeRecords = courseData.records.filter((r) => r.sessionType === type)
                    if (typeRecords.length === 0) return null

                    const attended = typeRecords.filter((r) => r.status === "present" || r.status === "late").length
                    const total = typeRecords.length
                    const percentage = Math.round((attended / total) * 100)

                    return (
                      <div key={type} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium capitalize">{type}s</span>
                          <span className="text-sm">
                            {attended}/{total} ({percentage}%)
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${percentage}%` }}></div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
    </DashboardLayout>
  )
}

