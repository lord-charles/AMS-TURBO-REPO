"use client"

import { Calendar, Clock, FileText } from "lucide-react"
import { format, parseISO } from "date-fns"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function UpcomingEvents() {
  const events = [
    {
      id: "1",
      title: "Algorithm Analysis Report",
      course: "CS301",
      date: "2023-11-15T23:59:00",
      type: "assignment",
    },
    {
      id: "2",
      title: "Midterm Examination",
      course: "CS301",
      date: "2023-11-18T09:00:00",
      type: "exam",
    },
    {
      id: "3",
      title: "Database Design Project",
      course: "CS305",
      date: "2023-11-20T23:59:00",
      type: "assignment",
    },
    {
      id: "4",
      title: "Course Registration for Spring",
      course: "ADMIN",
      date: "2023-11-30T23:59:00",
      type: "registration",
    },
  ]

  // Sort events by date
  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Upcoming Events
        </CardTitle>
        <CardDescription>Important deadlines and events</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedEvents.slice(0, 3).map((event, index) => (
            <div key={event.id} className="space-y-2">
              <div className="flex items-start gap-2">
                <div
                  className={`p-1.5 rounded-full 
                  ${
                    event.type === "assignment"
                      ? "bg-blue-500/10"
                      : event.type === "exam"
                        ? "bg-red-500/10"
                        : "bg-green-500/10"
                  }`}
                >
                  {event.type === "assignment" ? (
                    <FileText className={`h-4 w-4 text-blue-500`} />
                  ) : event.type === "exam" ? (
                    <Clock className={`h-4 w-4 text-red-500`} />
                  ) : (
                    <Calendar className={`h-4 w-4 text-green-500`} />
                  )}
                </div>
                <div className="space-y-1">
                  <div className="font-medium text-sm">{event.title}</div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {event.course}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {format(parseISO(event.date), "MMM d, h:mm a")}
                    </span>
                  </div>
                </div>
              </div>
              {index < sortedEvents.slice(0, 3).length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link href="/academic/calendar">
            <Calendar className="mr-2 h-4 w-4" />
            View Full Calendar
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

