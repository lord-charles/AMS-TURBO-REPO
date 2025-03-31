"use client"

import { Bell, Info, Megaphone } from "lucide-react"
import { format } from "date-fns"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function RecentAnnouncements() {
  const announcements = [
    {
      id: "1",
      title: "Midterm Exam Schedule",
      content: "The midterm exam schedule has been published. Please check your timetable.",
      date: "2023-11-10",
      important: true,
    },
    {
      id: "2",
      title: "Library Hours Extended",
      content: "The library will be open until midnight during exam week.",
      date: "2023-11-08",
      important: false,
    },
    {
      id: "3",
      title: "Registration for Spring 2024",
      content: "Registration for Spring 2024 semester will open on November 30.",
      date: "2023-11-05",
      important: true,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Megaphone className="h-5 w-5 text-primary" />
          Recent Announcements
        </CardTitle>
        <CardDescription>Latest updates from your university</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {announcements.slice(0, 2).map((announcement, index) => (
            <div key={announcement.id} className="space-y-2">
              <div className="flex items-start gap-2">
                <div className={`p-1.5 rounded-full ${announcement.important ? "bg-red-500/10" : "bg-blue-500/10"}`}>
                  {announcement.important ? (
                    <Info className="h-4 w-4 text-red-500" />
                  ) : (
                    <Bell className="h-4 w-4 text-blue-500" />
                  )}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="font-medium text-sm">{announcement.title}</div>
                    {announcement.important && (
                      <Badge variant="destructive" className="text-xs">
                        Important
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {format(new Date(announcement.date), "MMM d, yyyy")}
                  </div>
                  <div className="text-sm">{announcement.content}</div>
                </div>
              </div>
              {index < announcements.slice(0, 2).length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link href="/academic/announcements">
            <Megaphone className="mr-2 h-4 w-4" />
            View All Announcements
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

