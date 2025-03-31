"use client"
import { format } from "date-fns"
import { Megaphone } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface CourseAnnouncementsProps {
  courseId: string
}

export function CourseAnnouncements({ courseId }: CourseAnnouncementsProps) {
  // Mock announcements data
  const announcements = [
    {
      id: "1",
      title: "Midterm Exam Details",
      content:
        "The midterm exam will be held on November 18th from 9:00 AM to 11:00 AM in Examination Hall 1. Please bring your student ID and arrive 15 minutes early. The exam will cover all material from weeks 1-6.",
      date: "2023-11-10T10:30:00",
      author: "Dr. Sarah Johnson",
      important: true,
    },
    {
      id: "2",
      title: "Assignment 2 Deadline Extended",
      content:
        "Due to the technical issues with the submission system, the deadline for Assignment 2 has been extended to November 20th at 11:59 PM. Please make sure to submit your work before the new deadline.",
      date: "2023-11-08T14:15:00",
      author: "Dr. Sarah Johnson",
      important: false,
    },
    {
      id: "3",
      title: "Guest Lecture Next Week",
      content:
        "We will have a guest lecture by Prof. David Miller from Stanford University on November 22nd. The lecture will be on 'Advanced Algorithms in Industry' and will be held during our regular class time. Attendance is mandatory.",
      date: "2023-11-05T09:45:00",
      author: "Dr. Sarah Johnson",
      important: true,
    },
  ]

  return (
    <div className="space-y-4">
      {announcements.length > 0 ? (
        announcements.map((announcement) => (
          <Card
            key={announcement.id}
            className={announcement.important ? "border-red-200 bg-red-50/50 dark:bg-red-900/10" : ""}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg">{announcement.title}</CardTitle>
                  {announcement.important && (
                    <Badge variant="destructive" className="ml-2">
                      Important
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  {format(new Date(announcement.date), "MMM d, yyyy")}
                </div>
              </div>
              <CardDescription className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={`/placeholder.svg?height=24&width=24`} alt={announcement.author} />
                  <AvatarFallback>
                    {announcement.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span>{announcement.author}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{announcement.content}</p>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-12 px-4 border rounded-lg bg-muted/30">
          <Megaphone className="h-12 w-12 text-muted-foreground mb-3" />
          <h3 className="text-lg font-medium">No Announcements</h3>
          <p className="text-sm text-muted-foreground mt-1 text-center">
            There are no announcements for this course yet.
          </p>
        </div>
      )}
    </div>
  )
}

