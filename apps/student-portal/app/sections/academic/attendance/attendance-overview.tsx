"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle, Info } from "lucide-react"
import type { AttendanceStats } from "./types"
import { getAttendanceRequirementMessage } from "./utils"
import { mockAttendanceStats } from "./mock-data"
import Link from "next/link"

interface AttendanceOverviewProps {
  stats?: AttendanceStats
}

export function AttendanceOverview({ stats = mockAttendanceStats }: AttendanceOverviewProps) {
  const {
    overallAttendance,
    totalCourses,
    totalSessions,
    attendedSessions,
    missedSessions,
    excusedSessions,
    lateSessions,
    coursesAtRisk,
  } = stats

  const requirementMessage = getAttendanceRequirementMessage(overallAttendance)
  const isAttendanceCritical = overallAttendance < 70
  const isAttendanceWarning = overallAttendance >= 70 && overallAttendance < 80
  const isAttendanceGood = overallAttendance >= 80

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Attendance Overview</CardTitle>
        <CardDescription>Summary of your attendance across all courses</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="summary" className="space-y-4">
          <TabsList>
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Overall Attendance</span>
                <span className="text-sm font-medium">{overallAttendance}%</span>
              </div>
              <Progress value={overallAttendance} className="h-2" />

              {isAttendanceCritical && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Critical Attendance</AlertTitle>
                  <AlertDescription>
                    Your attendance is below the minimum requirement. Please improve your attendance immediately to
                    avoid academic consequences.
                  </AlertDescription>
                </Alert>
              )}

              {isAttendanceWarning && (
                <Alert variant="warning" className="bg-yellow-50 border-yellow-200 text-yellow-800">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Attendance Warning</AlertTitle>
                  <AlertDescription>{requirementMessage}</AlertDescription>
                </Alert>
              )}

              {isAttendanceGood && (
                <Alert variant="default" className="bg-green-50 border-green-200 text-green-800">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Good Standing</AlertTitle>
                  <AlertDescription>{requirementMessage}</AlertDescription>
                </Alert>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Card className="bg-muted">
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold">{totalCourses}</span>
                  <span className="text-xs text-muted-foreground text-center">Courses</span>
                </CardContent>
              </Card>

              <Card className="bg-muted">
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold">{totalSessions}</span>
                  <span className="text-xs text-muted-foreground text-center">Total Sessions</span>
                </CardContent>
              </Card>

              <Card className="bg-muted">
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold">{attendedSessions}</span>
                  <span className="text-xs text-muted-foreground text-center">Attended</span>
                </CardContent>
              </Card>

              <Card className="bg-muted">
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-red-600">{coursesAtRisk}</span>
                  <span className="text-xs text-muted-foreground text-center">Courses at Risk</span>
                </CardContent>
              </Card>
            </div>

            {coursesAtRisk > 0 && (
              <div className="flex justify-center">
                <Link href="/academic/attendance/at-risk">
                  <Button variant="outline" size="sm">
                    View Courses at Risk
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>

          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Attendance Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Present</span>
                      <span className="font-medium">{attendedSessions - lateSessions}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Late</span>
                      <span className="font-medium">{lateSessions}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Excused</span>
                      <span className="font-medium">{excusedSessions}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Absent</span>
                      <span className="font-medium">{missedSessions - excusedSessions}</span>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex justify-between text-sm font-medium">
                        <span>Total</span>
                        <span>{totalSessions}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Attendance Policy</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>
                    <span className="font-medium">Minimum Requirement:</span> 80% attendance is required for all
                    courses.
                  </p>
                  <p>
                    <span className="font-medium">Warning Level:</span> Below 75% attendance triggers a warning.
                  </p>
                  <p>
                    <span className="font-medium">Critical Level:</span> Below 65% attendance may result in barring from
                    exams.
                  </p>
                  <p>
                    <span className="font-medium">Late Policy:</span> Arriving more than 15 minutes late is marked as
                    'Late'.
                  </p>
                  <p>
                    <span className="font-medium">Excused Absences:</span> Require proper documentation within 14 days.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center gap-2">
              <Link href="/academic/attendance/reports">
                <Button variant="outline" size="sm">
                  View Detailed Reports
                </Button>
              </Link>
              <Link href="/academic/attendance/excuse">
                <Button variant="outline" size="sm">
                  Submit Excuse
                </Button>
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

