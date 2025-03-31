"use client"

import { useState } from "react"
import { format, addDays, startOfWeek, endOfWeek, isSameDay, addWeeks, subWeeks } from "date-fns"
import { ChevronLeft, ChevronRight, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useTimetableData } from "@/hooks/use-timetable-data"
import { ScrollArea } from "@/components/ui/scroll-area"

export function TimetableWeeklyView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const { classes, isLoading } = useTimetableData()

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }) // Start from Monday
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 })

  const nextWeek = () => {
    setCurrentDate(addWeeks(currentDate, 1))
  }

  const prevWeek = () => {
    setCurrentDate(subWeeks(currentDate, 1))
  }

  const today = () => {
    setCurrentDate(new Date())
  }

  // Generate days of the week
  const weekDays = Array.from({ length: 5 }, (_, i) => addDays(weekStart, i))

  // Time slots from 8 AM to 8 PM
  const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = 8 + i
    return {
      start: `${hour % 12 === 0 ? 12 : hour % 12}:00 ${hour < 12 ? "AM" : "PM"}`,
      end: `${(hour + 1) % 12 === 0 ? 12 : (hour + 1) % 12}:00 ${hour + 1 < 12 ? "AM" : "PM"}`,
      hour,
    }
  })

  // Get classes for a specific day and time slot
  const getClassesForTimeSlot = (day: Date, hour: number) => {
    return classes.filter((cls:any) => {
      const classDate = new Date(cls.date)
      const classStartHour = Number.parseInt(cls.startTime.split(":")[0])

      return isSameDay(classDate, day) && classStartHour === hour
    })
  }

  // Get color based on class type
  const getClassColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "lecture":
        return "bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-300"
      case "tutorial":
        return "bg-green-100 border-green-300 text-green-800 dark:bg-green-900/30 dark:border-green-700 dark:text-green-300"
      case "lab":
        return "bg-amber-100 border-amber-300 text-amber-800 dark:bg-amber-900/30 dark:border-amber-700 dark:text-amber-300"
      case "seminar":
        return "bg-purple-100 border-purple-300 text-purple-800 dark:bg-purple-900/30 dark:border-purple-700 dark:text-purple-300"
      default:
        return "bg-gray-100 border-gray-300 text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h3 className="font-medium">
          {format(weekStart, "MMMM d")} - {format(weekEnd, "MMMM d, yyyy")}
        </h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={prevWeek}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={today}>
            Today
          </Button>
          <Button variant="outline" size="sm" onClick={nextWeek}>
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      <div className="border rounded-md overflow-hidden">
        <div className="grid grid-cols-6 border-b">
          <div className="p-2 text-center font-medium bg-muted/50 border-r">Time</div>
          {weekDays.map((day) => (
            <div
              key={day.toString()}
              className={`p-2 text-center font-medium ${isSameDay(day, new Date()) ? "bg-primary/10" : "bg-muted/50"}`}
            >
              <div>{format(day, "EEE")}</div>
              <div className="text-sm">{format(day, "MMM d")}</div>
            </div>
          ))}
        </div>

        <ScrollArea className="h-[600px]">
          <div className="grid grid-cols-6">
            {timeSlots.map((slot) => (
              <>
                <div key={slot.hour} className="p-2 text-center text-sm border-r border-b">
                  {slot.start}
                  <br />
                  {slot.end}
                </div>

                {weekDays.map((day) => {
                  const classesInSlot = getClassesForTimeSlot(day, slot.hour)

                  return (
                    <div
                      key={`${day.toString()}-${slot.hour}`}
                      className={`p-2 border-b min-h-[100px] ${isSameDay(day, new Date()) ? "bg-primary/5" : ""}`}
                    >
                      {classesInSlot.length > 0 ? (
                        <div className="space-y-1">
                          {classesInSlot.map((cls:any) => (
                            <TooltipProvider key={cls.id}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div
                                    className={`p-2 text-sm border rounded-md cursor-pointer ${getClassColor(cls.type)}`}
                                  >
                                    <div className="font-medium truncate">{cls.course}</div>
                                    <div className="flex items-center justify-between text-xs mt-1">
                                      <Badge variant="outline" className="font-normal">
                                        {cls.type}
                                      </Badge>
                                      <span>
                                        {cls.startTime} - {cls.endTime}
                                      </span>
                                    </div>
                                    <div className="text-xs mt-1 truncate">{cls.location}</div>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent className="p-0 overflow-hidden">
                                  <div className="p-3 max-w-xs">
                                    <div className="font-medium">
                                      {cls.course}: {cls.title}
                                    </div>
                                    <div className="text-sm mt-1">
                                      {cls.type} • {cls.startTime} - {cls.endTime}
                                    </div>
                                    <div className="text-sm">{cls.location}</div>
                                    <div className="text-sm">Instructor: {cls.instructor}</div>
                                    {cls.notes && (
                                      <div className="mt-2 text-sm flex items-start gap-1">
                                        <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                        <span>{cls.notes}</span>
                                      </div>
                                    )}
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  )
                })}
              </>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-xs">Lecture</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-xs">Tutorial</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <span className="text-xs">Lab</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
          <span className="text-xs">Seminar</span>
        </div>
      </div>
    </div>
  )
}

