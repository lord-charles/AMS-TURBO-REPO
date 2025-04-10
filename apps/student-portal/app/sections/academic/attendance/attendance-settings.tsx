"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Bell, Mail, MessageSquare, Save } from "lucide-react"
import type { AttendanceSettings } from "./types"
import { mockAttendanceSettings } from "./mock-data"
import { useToast } from "@/hooks/use-toast"

interface AttendanceSettingsProps {
  initialSettings?: AttendanceSettings
}

export function AttendanceSettings({ initialSettings = mockAttendanceSettings }: AttendanceSettingsProps) {
  const [settings, setSettings] = useState<AttendanceSettings>(initialSettings)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  // Handle toggle change
  const handleToggleChange = (field: keyof AttendanceSettings) => {
    setSettings((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  // Handle reminder time change
  const handleReminderTimeChange = (value: number[]) => {
    setSettings((prev) => ({
      ...prev,
      reminderTime: value[0],
    }))
  }

  // Handle threshold change
  const handleThresholdChange = (field: "warningThreshold" | "criticalThreshold", value: number[]) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value[0],
    }))
  }

  // Save settings
  const saveSettings = () => {
    setIsSaving(true)

    setTimeout(() => {
      setIsSaving(false)

      toast({
        title: "Settings Saved",
        description: "Your attendance notification settings have been updated.",
        variant: "default",
      })
    }, 1000)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Attendance Notifications</CardTitle>
        <CardDescription>Customize how you receive attendance alerts and reminders</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Attendance Notifications</Label>
            <p className="text-sm text-muted-foreground">Receive alerts about your attendance status</p>
          </div>
          <Switch
            checked={settings.notificationsEnabled}
            onCheckedChange={() => handleToggleChange("notificationsEnabled")}
          />
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-sm">Class Reminder Time</Label>
            <div className="flex items-center gap-2">
              <Slider
                value={[settings.reminderTime]}
                onValueChange={handleReminderTimeChange}
                min={5}
                max={60}
                step={5}
                disabled={!settings.notificationsEnabled}
              />
              <span className="w-12 text-sm">{settings.reminderTime} min</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Get reminded before your class starts</p>
          </div>

          <div>
            <Label className="text-sm">Warning Threshold</Label>
            <div className="flex items-center gap-2">
              <Slider
                value={[settings.warningThreshold]}
                onValueChange={(value) => handleThresholdChange("warningThreshold", value)}
                min={60}
                max={85}
                step={5}
                disabled={!settings.notificationsEnabled}
              />
              <span className="w-12 text-sm">{settings.warningThreshold}%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Get warned when attendance falls below this percentage</p>
          </div>

          <div>
            <Label className="text-sm">Critical Threshold</Label>
            <div className="flex items-center gap-2">
              <Slider
                value={[settings.criticalThreshold]}
                onValueChange={(value) => handleThresholdChange("criticalThreshold", value)}
                min={50}
                max={75}
                step={5}
                disabled={!settings.notificationsEnabled}
              />
              <span className="w-12 text-sm">{settings.criticalThreshold}%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Get urgent alerts when attendance falls below this percentage
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-2 border-t">
          <Label className="text-base">Notification Channels</Label>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <Label className="text-sm">Email Notifications</Label>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={() => handleToggleChange("emailNotifications")}
              disabled={!settings.notificationsEnabled}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <Label className="text-sm">SMS Notifications</Label>
            </div>
            <Switch
              checked={settings.smsNotifications}
              onCheckedChange={() => handleToggleChange("smsNotifications")}
              disabled={!settings.notificationsEnabled}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <Label className="text-sm">Push Notifications</Label>
            </div>
            <Switch
              checked={settings.pushNotifications}
              onCheckedChange={() => handleToggleChange("pushNotifications")}
              disabled={!settings.notificationsEnabled}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="outline" onClick={() => setSettings(initialSettings)}>
          Reset
        </Button>
        <Button onClick={saveSettings} disabled={isSaving}>
          {isSaving ? (
            <>
              <span className="animate-spin mr-2">
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </span>
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

