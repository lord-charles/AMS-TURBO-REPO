"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AttendanceOverview } from "./attendance-overview"
import { CourseAttendanceList } from "./course-attendance-list"
import { AttendanceCalendar } from "./attendance-calendar"
import { QRCodeScanner } from "./qr-code-scanner"
import { ClassScheduleView } from "./class-schedule-view"
import { AttendanceReports } from "./attendance-reports"
import { AttendanceExcuseForm } from "./attendance-excuse-form"
import { AttendanceSettings } from "./attendance-settings"
import { mockCourseAttendance, mockAttendanceStats, mockCalendarEvents } from "./mock-data"
import { useToast } from "@/hooks/use-toast"

export function AttendanceMain() {
  const [activeTab, setActiveTab] = useState("overview")
  const { toast } = useToast()

  // Handle QR code scan success
  const handleScanSuccess = (data: string) => {
    toast({
      title: "Attendance Marked",
      description: "Your attendance has been recorded successfully.",
      variant: "default",
    })
  }

  // Handle QR code scan error
  const handleScanError = (error: string) => {
    toast({
      title: "Scan Error",
      description: error,
      variant: "destructive",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold tracking-tight">Attendance Management</h1>
        <p className="text-muted-foreground">Track, manage, and view your attendance across all courses</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 h-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="mark">Mark Attendance</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="excuse">Submit Excuse</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AttendanceOverview stats={mockAttendanceStats} />
            <AttendanceCalendar events={mockCalendarEvents} />
          </div>

          <CourseAttendanceList courses={mockCourseAttendance} />
        </TabsContent>

        <TabsContent value="courses">
          <CourseAttendanceList courses={mockCourseAttendance} />
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Calendar</CardTitle>
              <CardDescription>View your attendance history and upcoming classes</CardDescription>
            </CardHeader>
            <CardContent>
              <AttendanceCalendar events={mockCalendarEvents} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mark">
          <div className="max-w-md mx-auto">
            <QRCodeScanner onSuccess={handleScanSuccess} onError={handleScanError} />
          </div>
        </TabsContent>

        <TabsContent value="schedule">
          <ClassScheduleView events={mockCalendarEvents} />
        </TabsContent>

        <TabsContent value="reports">
          <AttendanceReports courses={mockCourseAttendance} />
        </TabsContent>

        <TabsContent value="excuse">
          <div className="max-w-md mx-auto">
            <AttendanceExcuseForm />
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <div className="max-w-md mx-auto">
            <AttendanceSettings />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

