"use client"

import { useState } from "react"
import { format, isToday, isTomorrow, addDays, parseISO } from "date-fns"
import { AlertCircle, Calendar, MapPin, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useTimetableData } from "@/hooks/use-timetable-data"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function TimetableListView() {
  const { classes, isLoading } = useTimetableData()
  const [filter, setFilter] = useState<"all" | "today" | "tomorrow" | "upcoming">("all")

  // Filter classes based on selected filter
  const filteredClasses = classes.filter((cls) => {
    const classDate = parseISO(cls.date)

    switch (filter) {
      case "today":
        return isToday(classDate)
      case "tomorrow":
        return isTomorrow(classDate)
      case "upcoming":
        // Next 7 days excluding today and tomorrow
        const nextWeek = addDays(new Date(), 7)
        return !isToday(classDate) && !isTomorrow(classDate) && classDate <= nextWeek
      default:
        return true
    }
  })

  // Sort classes by date and time
  const sortedClasses = [...filteredClasses].sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)

    if (dateA.getTime() !== dateB.getTime()) {
      return dateA.getTime() - dateB.getTime()
    }

    // If same date, sort by start time
    const timeA = a.startTime.split(":").map(Number)
    const timeB = b.startTime.split(":").map(Number)

    if (timeA[0] !== timeB[0]) {
      return timeA[0] - timeB[0]
    }

    return timeA[1] - timeB[1]
  })

  // Group classes by date
  const groupedClasses: Record<string, typeof classes> = {}

  sortedClasses.forEach((cls) => {
    const dateKey = cls.date
    if (!groupedClasses[dateKey]) {
      groupedClasses[dateKey] = []
    }
    groupedClasses[dateKey].push(cls)
  })

  // Get badge for class type
  const getClassBadge = (type: string) => {
    switch (type.toLowerCase()) {
      case "lecture":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Lecture</Badge>
      case "tutorial":
        return <Badge className="bg-green-500 hover:bg-green-600">Tutorial</Badge>
      case "lab":
        return <Badge className="bg-amber-500 hover:bg-amber-600">Lab</Badge>
      case "seminar":
        return <Badge className="bg-purple-500 hover:bg-purple-600">Seminar</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  // Format date for display
  const formatDateHeading = (dateStr: string) => {
    const date = parseISO(dateStr)

    if (isToday(date)) {
      return "Today"
    } else if (isTomorrow(date)) {
      return "Tomorrow"
    } else {
      return format(date, "EEEE, MMMM d, yyyy")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
          All Classes
        </Button>
        <Button variant={filter === "today" ? "default" : "outline"} size="sm" onClick={() => setFilter("today")}>
          Today
        </Button>
        <Button variant={filter === "tomorrow" ? "default" : "outline"} size="sm" onClick={() => setFilter("tomorrow")}>
          Tomorrow
        </Button>
        <Button variant={filter === "upcoming" ? "default" : "outline"} size="sm" onClick={() => setFilter("upcoming")}>
          Upcoming Week
        </Button>
      </div>

      {Object.keys(groupedClasses).length > 0 ? (
        <div className="space-y-6">
          {Object.entries(groupedClasses).map(([date, classes]) => (
            <div key={date} className="space-y-3">
              <h3 className="font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                {formatDateHeading(date)}
              </h3>

              <div className="space-y-3">
                {classes.map((cls:any) => (
                  <div key={cls.id} className="p-4 border rounded-md hover:bg-muted/50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="font-medium">
                          {cls.course}: {cls.title}
                        </div>
                        <div className="text-sm text-muted-foreground">{cls.type}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getClassBadge(cls.type)}
                        <Badge variant="outline">
                          {cls.startTime} - {cls.endTime}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{cls.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{cls.instructor}</span>
                      </div>
                    </div>

                    {cls.notes && (
                      <div className="mt-3 text-sm p-2 bg-muted/50 rounded-md flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                        <span>{cls.notes}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-8">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No classes found</AlertTitle>
            <AlertDescription>
              {filter === "all"
                ? "You don't have any classes scheduled for this semester."
                : `You don't have any classes scheduled for ${filter === "today" ? "today" : filter === "tomorrow" ? "tomorrow" : "the upcoming week"}.`}
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  )
}

