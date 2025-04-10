"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MapPin, BookOpen, CalendarIcon } from "lucide-react"
import type { AttendanceCalendarEvent } from "./types"
import { AttendanceStatusBadge } from "./attendance-status-badge"
import { formatDate } from "./utils"
import { mockCalendarEvents } from "./mock-data"
import type { DayContentProps } from "react-day-picker"

interface AttendanceCalendarProps {
  events?: AttendanceCalendarEvent[]
}

export function AttendanceCalendar({ events = mockCalendarEvents }: AttendanceCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedEvents, setSelectedEvents] = useState<AttendanceCalendarEvent[]>([])

  // Format date for comparison
  const formatDateForCompare = (date: Date | undefined) => {
    if (!date) return ""
    return date.toISOString().split("T")[0]
  }

  // Group events by date
  const eventsByDate = events.reduce(
    (acc, event) => {
      if (!acc[event.date]) {
        acc[event.date] = []
      }
      acc[event.date].push(event)
      return acc
    },
    {} as Record<string, AttendanceCalendarEvent[]>,
  )

  // Handle date selection
  const handleSelect = (date: Date | undefined) => {
    setSelectedDate(date)

    if (date) {
      const dateStr = formatDateForCompare(date)
      const eventsForDate = eventsByDate[dateStr] || []

      if (eventsForDate.length > 0) {
        setSelectedEvents(eventsForDate)
        setIsDialogOpen(true)
      }
    }
  }

  // Get event status counts for a date
  const getEventStatusForDate = (date: Date) => {
    const dateStr = formatDateForCompare(date)
    const eventsForDate = eventsByDate[dateStr] || []

    if (eventsForDate.length === 0) return null

    const statusCounts = {
      attended: 0,
      missed: 0,
      excused: 0,
      late: 0,
      upcoming: 0,
    }

    eventsForDate.forEach((event) => {
      statusCounts[event.status]++
    })

    // Determine primary status for the date
    if (statusCounts.upcoming > 0) return "upcoming"
    if (statusCounts.missed > 0) return "missed"
    if (statusCounts.late > 0) return "late"
    if (statusCounts.excused > 0) return "excused"
    return "attended"
  }

  // Custom day render function for the calendar
  const renderDay = (day: Date) => {
    const status = getEventStatusForDate(day)

    if (!status) return null

    let dotColor = ""
    switch (status) {
      case "attended":
        dotColor = "bg-green-500"
        break
      case "missed":
        dotColor = "bg-red-500"
        break
      case "excused":
        dotColor = "bg-yellow-500"
        break
      case "late":
        dotColor = "bg-orange-500"
        break
      case "upcoming":
        dotColor = "bg-blue-500"
        break
    }

    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute bottom-1 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: dotColor }}></div>
      </div>
    )
  }

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Attendance Calendar</CardTitle>
          <CardDescription>View your attendance history and upcoming classes</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            className="rounded-md border"
            components={{
              DayContent: (props: DayContentProps) => {
                return (
                  <>
                    <div className="relative">
                      {props.date.getDate()}
                      {renderDay(props.date)}
                    </div>
                  </>
                )
              },
            }}
          />

          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs">Present</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span className="text-xs">Late</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-xs">Excused</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-xs">Absent</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-xs">Upcoming</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              {selectedDate && formatDate(formatDateForCompare(selectedDate))}
            </DialogTitle>
            <DialogDescription>Classes and attendance for this day</DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-3 p-1">
              {selectedEvents.map((event, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-md">
                  <div className="flex flex-col items-center justify-center bg-muted p-2 rounded-md">
                    <span className="text-sm font-medium">{event.startTime}</span>
                    <span className="text-xs text-muted-foreground">to</span>
                    <span className="text-sm font-medium">{event.endTime}</span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{event.title}</h4>
                      <AttendanceStatusBadge status={event.status} />
                    </div>

                    <div className="mt-2 space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span>{event.courseCode}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
