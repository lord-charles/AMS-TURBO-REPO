"use client"

import { useState, useEffect } from "react"
import { AlertCircle, Bell, Clock, Info, MapPin, RefreshCw, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { format, parseISO, isToday, isTomorrow, differenceInMinutes } from "date-fns"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"

type TimetableUpdate = {
  id: string
  type: "cancellation" | "reschedule" | "venue_change" | "instructor_change" | "new_class"
  course: string
  originalDate?: string
  originalTime?: string
  originalLocation?: string
  originalInstructor?: string
  newDate?: string
  newTime?: string
  newLocation?: string
  newInstructor?: string
  message: string
  timestamp: string
  read: boolean
}

export function TimetableUpdates() {
  const [updates, setUpdates] = useState<TimetableUpdate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Mock data for timetable updates
  const mockUpdates: TimetableUpdate[] = [
    {
      id: "u1",
      type: "cancellation",
      course: "CS301: Data Structures & Algorithms",
      originalDate: "2023-11-15",
      originalTime: "10:00 - 12:00",
      message: "The lecture on Wednesday, November 15 has been cancelled due to instructor illness.",
      timestamp: "2023-11-14T08:30:00",
      read: false,
    },
    {
      id: "u2",
      type: "reschedule",
      course: "CS305: Database Systems",
      originalDate: "2023-11-16",
      originalTime: "14:00 - 16:00",
      newDate: "2023-11-17",
      newTime: "10:00 - 12:00",
      message: "The Database Systems lecture has been rescheduled from Thursday to Friday due to a faculty meeting.",
      timestamp: "2023-11-14T10:15:00",
      read: false,
    },
    {
      id: "u3",
      type: "venue_change",
      course: "MATH201: Discrete Mathematics",
      originalDate: "2023-11-17",
      originalTime: "08:00 - 10:00",
      originalLocation: "Block A, Room 101",
      newLocation: "Block B, Room 205",
      message: "The venue for Friday's Discrete Mathematics lecture has been changed due to maintenance work.",
      timestamp: "2023-11-15T09:45:00",
      read: true,
    },
    {
      id: "u4",
      type: "instructor_change",
      course: "ENG203: Technical Communication",
      originalDate: "2023-11-15",
      originalTime: "16:00 - 18:00",
      originalInstructor: "Prof. Emily Parker",
      newInstructor: "Dr. Michael Brown",
      message:
        "Dr. Michael Brown will be substituting for Prof. Emily Parker for this week's Technical Communication seminar.",
      timestamp: "2023-11-14T14:20:00",
      read: true,
    },
    {
      id: "u5",
      type: "new_class",
      course: "CS205: Computer Networks",
      newDate: "2023-11-18",
      newTime: "13:00 - 15:00",
      newLocation: "Computer Lab 2",
      message:
        "An additional practical session for Computer Networks has been scheduled for Saturday to cover network configuration topics.",
      timestamp: "2023-11-15T11:30:00",
      read: false,
    },
  ]

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setUpdates(mockUpdates)
      setIsLoading(false)

      // Show toast notification for unread updates
      const unreadCount = mockUpdates.filter((update) => !update.read).length
      if (unreadCount > 0) {
        toast({
          title: `${unreadCount} New Timetable Update${unreadCount > 1 ? "s" : ""}`,
          description: "Your class schedule has been updated. Please review the changes.",
        })
      }
    }, 1500)

    return () => clearTimeout(timer)
  }, [toast])

  const markAsRead = (id: string) => {
    setUpdates(updates.map((update) => (update.id === id ? { ...update, read: true } : update)))
  }

  const dismissUpdate = (id: string) => {
    setUpdates(updates.filter((update) => update.id !== id))
  }

  const refreshUpdates = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setUpdates(mockUpdates)
      setIsLoading(false)

      toast({
        title: "Updates Refreshed",
        description: "Your timetable updates have been refreshed.",
      })
    }, 1000)
  }

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = parseISO(dateStr)

    if (isToday(date)) {
      return "Today"
    } else if (isTomorrow(date)) {
      return "Tomorrow"
    } else {
      return format(date, "EEEE, MMMM d")
    }
  }

  // Get update type badge
  const getUpdateTypeBadge = (type: string) => {
    switch (type) {
      case "cancellation":
        return <Badge variant="destructive">Cancelled</Badge>
      case "reschedule":
        return <Badge className="bg-amber-500 hover:bg-amber-600">Rescheduled</Badge>
      case "venue_change":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Venue Changed</Badge>
      case "instructor_change":
        return <Badge className="bg-purple-500 hover:bg-purple-600">Instructor Changed</Badge>
      case "new_class":
        return <Badge className="bg-green-500 hover:bg-green-600">New Class</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  // Get update icon
  const getUpdateIcon = (type: string) => {
    switch (type) {
      case "cancellation":
        return <X className="h-5 w-5 text-destructive" />
      case "reschedule":
        return <Clock className="h-5 w-5 text-amber-500" />
      case "venue_change":
        return <MapPin className="h-5 w-5 text-blue-500" />
      case "instructor_change":
        return <Info className="h-5 w-5 text-purple-500" />
      case "new_class":
        return <Bell className="h-5 w-5 text-green-500" />
      default:
        return <AlertCircle className="h-5 w-5" />
    }
  }

  // Sort updates by timestamp (newest first) and read status (unread first)
  const sortedUpdates = [...updates].sort((a, b) => {
    if (a.read !== b.read) {
      return a.read ? 1 : -1
    }
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Timetable Updates
          </CardTitle>
          <Button variant="outline" size="sm" onClick={refreshUpdates} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
        <CardDescription>Recent changes to your class schedule and timetable</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : sortedUpdates.length > 0 ? (
          <div className="space-y-4">
            {sortedUpdates.map((update, index) => (
              <div
                key={update.id}
                className={`p-4 border rounded-md ${!update.read ? "bg-muted/50 border-primary/20" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">{getUpdateIcon(update.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="font-medium">{update.course}</div>
                      <div className="flex items-center gap-2">
                        {getUpdateTypeBadge(update.type)}
                        {!update.read && (
                          <Badge variant="outline" className="bg-primary/10">
                            New
                          </Badge>
                        )}
                      </div>
                    </div>

                    <p className="text-sm mb-3">{update.message}</p>

                    {update.type === "reschedule" && (
                      <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                        <div className="p-2 bg-muted/50 rounded-md">
                          <div className="font-medium text-xs text-muted-foreground mb-1">Original</div>
                          <div>{formatDate(update.originalDate!)}</div>
                          <div>{update.originalTime}</div>
                        </div>
                        <div className="p-2 bg-muted/50 rounded-md">
                          <div className="font-medium text-xs text-muted-foreground mb-1">New</div>
                          <div>{formatDate(update.newDate!)}</div>
                          <div>{update.newTime}</div>
                        </div>
                      </div>
                    )}

                    {update.type === "venue_change" && (
                      <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                        <div className="p-2 bg-muted/50 rounded-md">
                          <div className="font-medium text-xs text-muted-foreground mb-1">Original Venue</div>
                          <div>{update.originalLocation}</div>
                        </div>
                        <div className="p-2 bg-muted/50 rounded-md">
                          <div className="font-medium text-xs text-muted-foreground mb-1">New Venue</div>
                          <div>{update.newLocation}</div>
                        </div>
                      </div>
                    )}

                    {update.type === "instructor_change" && (
                      <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                        <div className="p-2 bg-muted/50 rounded-md">
                          <div className="font-medium text-xs text-muted-foreground mb-1">Original Instructor</div>
                          <div>{update.originalInstructor}</div>
                        </div>
                        <div className="p-2 bg-muted/50 rounded-md">
                          <div className="font-medium text-xs text-muted-foreground mb-1">New Instructor</div>
                          <div>{update.newInstructor}</div>
                        </div>
                      </div>
                    )}

                    {update.type === "new_class" && (
                      <div className="p-2 bg-muted/50 rounded-md text-sm mb-3">
                        <div className="font-medium text-xs text-muted-foreground mb-1">Class Details</div>
                        <div>
                          {formatDate(update.newDate!)}, {update.newTime}
                        </div>
                        <div>Location: {update.newLocation}</div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        {format(parseISO(update.timestamp), "MMM d, h:mm a")}
                        {" • "}
                        {differenceInMinutes(new Date(), parseISO(update.timestamp)) < 60
                          ? `${differenceInMinutes(new Date(), parseISO(update.timestamp))} minutes ago`
                          : format(parseISO(update.timestamp), "MMM d, h:mm a")}
                      </div>
                      <div className="flex items-center gap-2">
                        {!update.read && (
                          <Button variant="ghost" size="sm" onClick={() => markAsRead(update.id)}>
                            Mark as Read
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => dismissUpdate(update.id)}>
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>No Updates</AlertTitle>
            <AlertDescription>There are no recent updates to your class schedule or timetable.</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}

