"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Bell, Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion } from "framer-motion"

interface Notification {
  id: string
  title: string
  message: string
  date: string
  read: boolean
}

interface ClearanceNotificationsProps {
  notifications: Notification[]
}

export function ClearanceNotifications({ notifications }: ClearanceNotificationsProps) {
  const [notifs, setNotifs] = useState<Notification[]>(notifications)

  const unreadCount = notifs.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifs(notifs.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifs(notifs.map((n) => ({ ...n, read: true })))
  }

  return (
    <Card className="border-border shadow-sm overflow-hidden">
      <CardHeader className="pb-3 bg-muted border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg font-semibold">Notifications</CardTitle>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                {unreadCount} new
              </Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="h-8 text-xs text-primary hover:text-primary/90 hover:bg-primary/10"
            >
              Mark all as read
            </Button>
          )}
        </div>
        <CardDescription className="text-muted-foreground">Updates about your clearance process</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[280px]">
          {notifs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <Bell className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No notifications yet</p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {notifs.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`relative rounded-lg border p-4 ${
                    !notification.read ? "bg-primary/10 border-primary/20" : "bg-background border-border"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <h4 className={`text-sm font-medium ${!notification.read ? "text-primary" : "text-foreground"}`}>
                      {notification.title}
                    </h4>
                    <div className="flex items-center">
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(notification.date), "MMM d, h:mm a")}
                      </span>
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 ml-1 text-primary hover:text-primary/90 hover:bg-primary/10"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check className="h-3 w-3" />
                          <span className="sr-only">Mark as read</span>
                        </Button>
                      )}
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{notification.message}</p>
                </motion.div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
