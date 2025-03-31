"use client"

import { Calendar, Clock, FileText } from "lucide-react"
import { format, parseISO } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function UpcomingDeadlines() {
  const deadlines = [
    {
      id: "1",
      title: "Algorithm Analysis Report",
      course: "CS301",
      dueDate: "2023-11-15T23:59:00",
      type: "assignment",
    },
    {
      id: "2",
      title: "Midterm Examination",
      course: "CS301",
      dueDate: "2023-11-18T09:00:00",
      type: "exam",
    },
    {
      id: "3",
      title: "Database Design Project",
      course: "CS305",
      dueDate: "2023-11-20T23:59:00",
      type: "assignment",
    },
    {
      id: "4",
      title: "Course Registration for Spring",
      course: "ADMIN",
      dueDate: "2023-11-30T23:59:00",
      type: "registration",
    },
  ]

  // Sort deadlines by date
  const sortedDeadlines = [...deadlines].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())

  return (
    <div className="space-y-4">
      {sortedDeadlines.map((deadline, index) => (
        <div key={deadline.id} className="space-y-2">
          <div className="flex items-start gap-2">
            <div
              className={`p-1.5 rounded-full 
              ${
                deadline.type === "assignment"
                  ? "bg-blue-500/10"
                  : deadline.type === "exam"
                    ? "bg-red-500/10"
                    : "bg-green-500/10"
              }`}
            >
              {deadline.type === "assignment" ? (
                <FileText className={`h-4 w-4 text-blue-500`} />
              ) : deadline.type === "exam" ? (
                <Clock className={`h-4 w-4 text-red-500`} />
              ) : (
                <Calendar className={`h-4 w-4 text-green-500`} />
              )}
            </div>
            <div className="space-y-1">
              <div className="font-medium text-sm">{deadline.title}</div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {deadline.course}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {format(parseISO(deadline.dueDate), "MMM d, h:mm a")}
                </span>
              </div>
            </div>
          </div>
          {index < sortedDeadlines.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  )
}

