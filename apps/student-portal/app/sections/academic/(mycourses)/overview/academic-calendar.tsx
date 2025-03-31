"use client"

import { useState } from "react"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from "date-fns"

export function AcademicCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Calendar events
  const events = [
    { date: "2023-11-15", title: "Algorithm Analysis Report Due", type: "assignment" },
    { date: "2023-11-18", title: "Midterm Examination", type: "exam" },
    { date: "2023-11-20", title: "Database Design Project Due", type: "assignment" },
    { date: "2023-11-23", title: "Thanksgiving Break", type: "holiday" },
    { date: "2023-11-24", title: "Thanksgiving Break", type: "holiday" },
    { date: "2023-11-30", title: "Course Registration for Spring", type: "registration" },
    { date: "2023-12-08", title: "Last Day of Classes", type: "academic" },
    { date: "2023-12-10", title: "Reading Day", type: "academic" },
    { date: "2023-12-12", title: "Final Exams Begin", type: "exam" },
    { date: "2023-12-19", title: "Final Exams End", type: "exam" },
    { date: "2023-12-20", title: "Winter Break Begins", type: "holiday" },
  ]

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  })

  const getEventsForDay = (date: Date) => {
    return events.filter((event) => isSameDay(new Date(event.date), date))
  }

  const getEventBadgeColor = (type: string) => {
    switch (type) {
      case "assignment":
        return "bg-blue-500 hover:bg-blue-600"
      case "exam":
        return "bg-red-500 hover:bg-red-600"
      case "holiday":
        return "bg-green-500 hover:bg-green-600"
      case "registration":
        return "bg-purple-500 hover:bg-purple-600"
      case "academic":
        return "bg-amber-500 hover:bg-amber-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-primary" />
            Academic Calendar
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Select
              value={format(currentMonth, "yyyy-MM")}
              onValueChange={(value) => {
                const [year, month] = value.split("-").map(Number)
                setCurrentMonth(new Date(year, month - 1))
              }}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue>{format(currentMonth, "MMMM yyyy")}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => {
                  const date = new Date(2023, i)
                  return (
                    <SelectItem key={i} value={format(date, "yyyy-MM")}>
                      {format(date, "MMMM yyyy")}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardDescription>View your academic schedule and important dates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-sm font-medium py-1">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: startOfMonth(currentMonth).getDay() }, (_, i) => (
            <div key={`empty-start-${i}`} className="h-24 p-1 border rounded-md bg-muted/20 opacity-50" />
          ))}

          {daysInMonth.map((day) => {
            const dayEvents = getEventsForDay(day)
            return (
              <div
                key={day.toISOString()}
                className={`h-24 p-1 border rounded-md overflow-hidden ${
                  isToday(day) ? "border-primary bg-primary/5" : "hover:bg-muted/20"
                }`}
              >
                <div className="text-right">
                  <span
                    className={`text-sm inline-block rounded-full w-6 h-6 text-center leading-6 ${
                      isToday(day) ? "bg-primary text-primary-foreground" : ""
                    }`}
                  >
                    {format(day, "d")}
                  </span>
                </div>
                <div className="mt-1 space-y-1 overflow-y-auto max-h-[calc(100%-24px)]">
                  {dayEvents.map((event, index) => (
                    <div key={index} className="text-xs">
                      <Badge
                        className={`text-[10px] truncate w-full justify-start font-normal ${getEventBadgeColor(event.type)}`}
                      >
                        {event.title}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}

          {Array.from(
            {
              length: 6 * 7 - (startOfMonth(currentMonth).getDay() + daysInMonth.length),
            },
            (_, i) => (
              <div key={`empty-end-${i}`} className="h-24 p-1 border rounded-md bg-muted/20 opacity-50" />
            ),
          )}
        </div>
      </CardContent>
    </Card>
  )
}

