"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AttendanceStatusBadge } from "./attendance-status-badge"
import { Download, FileText, Printer } from "lucide-react"
import type { CourseAttendance } from "./types"
import { formatDate } from "./utils"
import { mockCourseAttendance } from "./mock-data"
import { useToast } from "@/hooks/use-toast"

interface AttendanceReportsProps {
  courses?: CourseAttendance[]
}

export function AttendanceReports({ courses = mockCourseAttendance }: AttendanceReportsProps) {
  const [selectedCourse, setSelectedCourse] = useState<string>(courses[0]?.courseId || "")
  const [selectedPeriod, setSelectedPeriod] = useState<string>("all")
  const { toast } = useToast()

  // Get selected course data
  const courseData = courses.find((course) => course.courseId === selectedCourse)

  // Filter records based on selected period
  const filteredRecords =
    courseData?.records.filter((record) => {
      if (selectedPeriod === "all") return true

      const recordDate = new Date(record.date)
      const today = new Date()

      if (selectedPeriod === "month") {
        // Last 30 days
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(today.getDate() - 30)
        return recordDate >= thirtyDaysAgo
      }

      if (selectedPeriod === "week") {
        // Last 7 days
        const sevenDaysAgo = new Date()
        sevenDaysAgo.setDate(today.getDate() - 7)
        return recordDate >= sevenDaysAgo
      }

      return true
    }) || []

  // Sort records by date (newest first)
  const sortedRecords = [...filteredRecords].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // Calculate statistics
  const totalRecords = sortedRecords.length
  const presentCount = sortedRecords.filter((r) => r.status === "present").length
  const absentCount = sortedRecords.filter((r) => r.status === "absent").length
  const excusedCount = sortedRecords.filter((r) => r.status === "excused").length
  const lateCount = sortedRecords.filter((r) => r.status === "late").length

  const attendancePercentage = totalRecords > 0 ? Math.round(((presentCount + lateCount) / totalRecords) * 100) : 0

  // Handle export
  const handleExport = (format: "pdf" | "excel") => {
    toast({
      title: "Export Initiated",
      description: `Your attendance report is being exported as ${format.toUpperCase()}.`,
      variant: "default",
    })

    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: `Your attendance report has been exported successfully.`,
        variant: "default",
      })
    }, 1500)
  }

  // Handle print
  const handlePrint = () => {
    toast({
      title: "Print Initiated",
      description: "Preparing attendance report for printing.",
      variant: "default",
    })

    setTimeout(() => {
      window.print()
    }, 500)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Attendance Reports</CardTitle>
        <CardDescription>Generate detailed attendance reports for your courses</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 space-y-1">
            <label className="text-sm font-medium">Course</label>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger>
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((course) => (
                  <SelectItem key={course.courseId} value={course.courseId}>
                    {course.courseCode} - {course.courseName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full sm:w-[180px] space-y-1">
            <label className="text-sm font-medium">Time Period</label>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger>
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="month">Last 30 Days</SelectItem>
                <SelectItem value="week">Last 7 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {courseData && (
          <Tabs defaultValue="detailed" className="space-y-4">
            <TabsList>
              <TabsTrigger value="detailed">Detailed Report</TabsTrigger>
              <TabsTrigger value="summary">Summary</TabsTrigger>
            </TabsList>

            <TabsContent value="detailed">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Session Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Marked By</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedRecords.length > 0 ? (
                      sortedRecords.map((record, index) => (
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
                          <TableCell>{record.markedBy}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          No attendance records found for the selected period.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="summary">
              <div className="space-y-4">
                <Card className="bg-muted">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
                      <div className="p-2">
                        <div className="text-2xl font-bold">{totalRecords}</div>
                        <div className="text-xs text-muted-foreground">Total Sessions</div>
                      </div>
                      <div className="p-2">
                        <div className="text-2xl font-bold text-green-600">{presentCount}</div>
                        <div className="text-xs text-muted-foreground">Present</div>
                      </div>
                      <div className="p-2">
                        <div className="text-2xl font-bold text-orange-600">{lateCount}</div>
                        <div className="text-xs text-muted-foreground">Late</div>
                      </div>
                      <div className="p-2">
                        <div className="text-2xl font-bold text-yellow-600">{excusedCount}</div>
                        <div className="text-xs text-muted-foreground">Excused</div>
                      </div>
                      <div className="p-2">
                        <div className="text-2xl font-bold text-red-600">{absentCount}</div>
                        <div className="text-xs text-muted-foreground">Absent</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Attendance Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Course Code</span>
                          <span className="font-medium">{courseData.courseCode}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Course Name</span>
                          <span className="font-medium">{courseData.courseName}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Lecturer</span>
                          <span className="font-medium">{courseData.lecturer}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Attendance Rate</span>
                          <span className="font-medium">{attendancePercentage}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Status</span>
                          <span
                            className={`font-medium ${
                              attendancePercentage >= 80
                                ? "text-green-600"
                                : attendancePercentage >= 70
                                  ? "text-yellow-600"
                                  : "text-red-600"
                            }`}
                          >
                            {attendancePercentage >= 80
                              ? "Good Standing"
                              : attendancePercentage >= 70
                                ? "Warning"
                                : "Critical"}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Report Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Report Period</span>
                          <span className="font-medium">
                            {selectedPeriod === "all"
                              ? "All Time"
                              : selectedPeriod === "month"
                                ? "Last 30 Days"
                                : "Last 7 Days"}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Generated On</span>
                          <span className="font-medium">{new Date().toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Generated By</span>
                          <span className="font-medium">Student Portal</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Report ID</span>
                          <span className="font-medium">{`ATT-${Date.now().toString().slice(-8)}`}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}

        <div className="flex justify-end gap-2 pt-2 border-t">
          <Button variant="outline" size="sm" onClick={() => handleExport("pdf")}>
            <FileText className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleExport("excel")}>
            <Download className="h-4 w-4 mr-2" />
            Export Excel
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

