"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, BookOpen, ChevronLeft, ChevronRight } from "lucide-react"
import type { AttendanceCalendarEvent } from "./types"
import { AttendanceStatusBadge } from "./attendance-status-badge"
import { formatDate } from "./utils"
import { mockCalendarEvents } from "./mock-data"
import { cn } from "@/lib/utils"

interface ClassScheduleViewProps {
  events?: AttendanceCalendarEvent[]
}

export function ClassScheduleView({ events = mockCalendarEvents }: ClassScheduleViewProps) {
  const [currentWeek, setCurrentWeek] = useState<Date>(new Date())
  const [activeTab, setActiveTab] = useState<"week" | "day" | "list">("week")

  // Get week dates
  const getWeekDates = (date: Date) => {
    const day = date.getDay()
    const diff = date.getDate() - day + (day === 0 ? -6 : 1) // Adjust when day is Sunday
    const monday = new Date(date)
    monday.setDate(diff)

    const weekDates = []
    for (let i = 0; i < 7; i++) {
      const nextDate = new Date(monday)
      nextDate.setDate(monday.getDate() + i)
      weekDates.push(nextDate)
    }

    return weekDates
  }

  const weekDates = getWeekDates(currentWeek)

  // Format date for comparison
  const formatDateForCompare = (date: Date) => {
    return date.toISOString().split("T")[0]
  }

  // Filter events for the current week
  const weekEvents = events.filter((event) => {
    const eventDate = new Date(event.date)
    return weekDates.some((date) => formatDateForCompare(date) === formatDateForCompare(eventDate))
  })

  // Group events by date
  const eventsByDate = weekEvents.reduce(
    (acc, event) => {
      if (!acc[event.date]) {
        acc[event.date] = []
      }
      acc[event.date].push(event)
      return acc
    },
    {} as Record<string, AttendanceCalendarEvent[]>,
  )

  // Navigate to previous week
  const goToPreviousWeek = () => {
    const prevWeek = new Date(currentWeek)
    prevWeek.setDate(prevWeek.getDate() - 7)
    setCurrentWeek(prevWeek)
  }

  // Navigate to next week
  const goToNextWeek = () => {
    const nextWeek = new Date(currentWeek)
    nextWeek.setDate(nextWeek.getDate() + 7)
    setCurrentWeek(nextWeek)
  }

  // Go to current week
  const goToCurrentWeek = () => {
    setCurrentWeek(new Date())
  }

  // Get day name
  const getDayName = (date: Date) => {
    return date.toLocaleDateString("en-US", { weekday: "short" })
  }

  // Check if date is today
  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Class Schedule</CardTitle>
            <CardDescription>View your upcoming and past classes</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={goToPreviousWeek}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={goToCurrentWeek}>
              Today
            </Button>
            <Button variant="outline" size="icon" onClick={goToNextWeek}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "week" | "day" | "list")}>
          <TabsList className="mb-4">
            <TabsTrigger value="week">Week View</TabsTrigger>
            <TabsTrigger value="day">Day View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>

          <TabsContent value="week">
            <div className="grid grid-cols-7 gap-2">
              {weekDates.map((date, index) => (
                <div key={index} className="flex flex-col">
                  <div
                    className={cn(
                      "text-center p-2 rounded-t-md font-medium text-sm",
                      isToday(date) ? "bg-primary text-primary-foreground" : "bg-muted",
                    )}
                  >
                    <div>{getDayName(date)}</div>
                    <div>{date.getDate()}</div>
                  </div>
                  <div className="min-h-[200px] border rounded-b-md p-1 space-y-1">
                    {eventsByDate[formatDateForCompare(date)]?.map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        className={cn(
                          "p-1 rounded-sm text-xs border-l-2",
                          event.status === "attended"
                            ? "border-l-green-500 bg-green-50"
                            : event.status === "missed"
                              ? "border-l-red-500 bg-red-50"
                              : event.status === "excused"
                                ? "border-l-yellow-500 bg-yellow-50"
                                : event.status === "late"
                                  ? "border-l-orange-500 bg-orange-50"
                                  : "border-l-blue-500 bg-blue-50",
                        )}
                      >
                        <div className="font-medium">{event.title}</div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>
                            {event.startTime} - {event.endTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="day">
            <div className="space-y-4">
              <div className="flex justify-center gap-2">
                {weekDates.map((date, index) => (
                  <Button
                    key={index}
                    variant={isToday(date) ? "default" : "outline"}
                    className="flex flex-col py-2"
                    onClick={() => setCurrentWeek(date)}
                  >
                    <span className="text-xs">{getDayName(date)}</span>
                    <span className="text-lg font-bold">{date.getDate()}</span>
                  </Button>
                ))}
              </div>

              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-4">{formatDate(formatDateForCompare(currentWeek))}</h3>

                {eventsByDate[formatDateForCompare(currentWeek)]?.length ? (
                  <div className="space-y-3">
                    {eventsByDate[formatDateForCompare(currentWeek)]?.map((event, index) => (
                      <div key={index} className="flex items-start gap-4 p-3 border rounded-md">
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
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground mb-2" />
                    <h3 className="font-medium">No Classes Scheduled</h3>
                    <p className="text-sm text-muted-foreground">There are no classes scheduled for this day.</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="list">
            <div className="space-y-4">
              {Object.entries(eventsByDate).length > 0 ? (
                Object.entries(eventsByDate)
                  .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
                  .map(([date, dayEvents]) => (
                    <div key={date} className="space-y-2">
                      <h3 className="font-medium">{formatDate(date)}</h3>
                      <div className="space-y-2">
                        {dayEvents.map((event, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 border rounded-md">
                            <div className="flex flex-col items-center justify-center">
                              <span className="text-sm font-medium">{event.startTime}</span>
                              <span className="text-xs text-muted-foreground">-</span>
                              <span className="text-sm font-medium">{event.endTime}</span>
                            </div>

                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <div>
                                  <h4 className="font-medium">{event.title}</h4>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <MapPin className="h-3 w-3" />
                                    <span>{event.location}</span>
                                  </div>
                                </div>
                                <AttendanceStatusBadge status={event.status} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mb-2" />
                  <h3 className="font-medium">No Classes Found</h3>
                  <p className="text-sm text-muted-foreground">There are no classes scheduled for this week.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

