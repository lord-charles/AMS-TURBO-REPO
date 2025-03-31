"use client"

import { useState } from "react"
import { Bell, Clock, Smartphone } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export function TimetableNotifications() {
  const [notifications, setNotifications] = useState({
    classReminders: true,
    scheduleChanges: true,
    cancelations: true,
    venueChanges: true,
    examReminders: true,
  })

  const [reminderTime, setReminderTime] = useState("15")
  const [notificationMethod, setNotificationMethod] = useState("both")
  const { toast } = useToast()

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    })
  }

  const handleSavePreferences = () => {
    toast({
      title: "Notification Preferences Saved",
      description: "Your notification settings have been updated successfully.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          Notifications
        </CardTitle>
        <CardDescription>Customize your class and timetable notification preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="text-sm font-medium">Notification Types</div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="class-reminders" className="text-sm">
                Class Reminders
              </label>
              <Switch
                id="class-reminders"
                checked={notifications.classReminders}
                onCheckedChange={() => handleToggle("classReminders")}
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="schedule-changes" className="text-sm">
                Schedule Changes
              </label>
              <Switch
                id="schedule-changes"
                checked={notifications.scheduleChanges}
                onCheckedChange={() => handleToggle("scheduleChanges")}
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="cancelations" className="text-sm">
                Class Cancelations
              </label>
              <Switch
                id="cancelations"
                checked={notifications.cancelations}
                onCheckedChange={() => handleToggle("cancelations")}
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="venue-changes" className="text-sm">
                Venue Changes
              </label>
              <Switch
                id="venue-changes"
                checked={notifications.venueChanges}
                onCheckedChange={() => handleToggle("venueChanges")}
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="exam-reminders" className="text-sm">
                Exam Reminders
              </label>
              <Switch
                id="exam-reminders"
                checked={notifications.examReminders}
                onCheckedChange={() => handleToggle("examReminders")}
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="text-sm font-medium">Reminder Settings</div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div className="text-sm">Remind me</div>
            <Select value={reminderTime} onValueChange={setReminderTime}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 minutes</SelectItem>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="120">2 hours</SelectItem>
                <SelectItem value="1440">1 day</SelectItem>
              </SelectContent>
            </Select>
            <div className="text-sm">before class</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Notification Method</div>
          <div className="flex items-center gap-2">
            <Smartphone className="h-4 w-4 text-muted-foreground" />
            <Select value={notificationMethod} onValueChange={setNotificationMethod}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email Only</SelectItem>
                <SelectItem value="push">Push Notifications Only</SelectItem>
                <SelectItem value="both">Both Email and Push</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button className="w-full" onClick={handleSavePreferences}>
          Save Preferences
        </Button>
      </CardContent>
    </Card>
  )
}

