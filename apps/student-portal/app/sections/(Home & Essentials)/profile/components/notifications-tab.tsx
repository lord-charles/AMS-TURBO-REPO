"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"
import { Loader2 } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface NotificationSetting {
  id: string
  title: string
  description: string
  enabled: boolean
}

interface NotificationCategory {
  id: string
  title: string
  description: string
  settings: NotificationSetting[]
}

export function NotificationsTab() {
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("email")
  
  const [emailNotifications, setEmailNotifications] = useState<NotificationCategory[]>([
    {
      id: "academics",
      title: "Academic Notifications",
      description: "Notifications related to your academic activities and performance",
      settings: [
        {
          id: "grades",
          title: "Grade Updates",
          description: "Receive notifications when new grades are posted",
          enabled: true,
        },
        {
          id: "assignments",
          title: "Assignment Deadlines",
          description: "Get reminders about upcoming assignment deadlines",
          enabled: true,
        },
        {
          id: "exams",
          title: "Exam Schedules",
          description: "Be notified about exam schedules and changes",
          enabled: true,
        },
        {
          id: "course-updates",
          title: "Course Updates",
          description: "Receive updates when course materials are added or modified",
          enabled: false,
        },
      ],
    },
    {
      id: "financial",
      title: "Financial Notifications",
      description: "Notifications related to fees, payments, and financial aid",
      settings: [
        {
          id: "fee-reminders",
          title: "Fee Payment Reminders",
          description: "Get reminders about upcoming fee payment deadlines",
          enabled: true,
        },
        {
          id: "payment-confirmations",
          title: "Payment Confirmations",
          description: "Receive confirmations when payments are processed",
          enabled: true,
        },
        {
          id: "financial-aid",
          title: "Financial Aid Updates",
          description: "Be notified about updates to your financial aid status",
          enabled: true,
        },
      ],
    },
    {
      id: "administrative",
      title: "Administrative Notifications",
      description: "Notifications related to university administration and announcements",
      settings: [
        {
          id: "university-announcements",
          title: "University Announcements",
          description: "Receive important announcements from the university",
          enabled: true,
        },
        {
          id: "registration-periods",
          title: "Registration Periods",
          description: "Be notified when course registration periods open and close",
          enabled: true,
        },
        {
          id: "campus-events",
          title: "Campus Events",
          description: "Get updates about upcoming campus events and activities",
          enabled: false,
        },
      ],
    },
  ])
  
  const [smsNotifications, setSmsNotifications] = useState<NotificationCategory[]>([
    {
      id: "academics-sms",
      title: "Academic Notifications",
      description: "Notifications related to your academic activities and performance",
      settings: [
        {
          id: "grades-sms",
          title: "Grade Updates",
          description: "Receive SMS when new grades are posted",
          enabled: false,
        },
        {
          id: "assignments-sms",
          title: "Assignment Deadlines",
          description: "Get SMS reminders about upcoming assignment deadlines",
          enabled: false,
        },
        {
          id: "exams-sms",
          title: "Exam Schedules",
          description: "Be notified via SMS about exam schedules and changes",
          enabled: true,
        },
      ],
    },
    {
      id: "financial-sms",
      title: "Financial Notifications",
      description: "Notifications related to fees, payments, and financial aid",
      settings: [
        {
          id: "fee-reminders-sms",
          title: "Fee Payment Reminders",
          description: "Get SMS reminders about upcoming fee payment deadlines",
          enabled: true,
        },
        {
          id: "payment-confirmations-sms",
          title: "Payment Confirmations",
          description: "Receive SMS confirmations when payments are processed",
          enabled: true,
        },
      ],
    },
    {
      id: "security-sms",
      title: "Security Notifications",
      description: "Security-related notifications for your account",
      settings: [
        {
          id: "login-alerts-sms",
          title: "Login Alerts",
          description: "Receive SMS alerts when your account is accessed from a new device",
          enabled: true,
        },
        {
          id: "password-changes-sms",
          title: "Password Changes",
          description: "Be notified via SMS when your password is changed",
          enabled: true,
        },
      ],
    },
  ])

  function toggleNotification(categoryId: string, settingId: string, enabled: boolean) {
    if (activeTab === "email") {
      setEmailNotifications(
        emailNotifications.map((category) => {
          if (category.id === categoryId) {
            return {
              ...category,
              settings: category.settings.map((setting) => {
                if (setting.id === settingId) {
                  return { ...setting, enabled }
                }
                return setting
              }),
            }
          }
          return category
        })
      )
    } else {
      setSmsNotifications(
        smsNotifications.map((category) => {
          if (category.id === categoryId) {
            return {
              ...category,
              settings: category.settings.map((setting) => {
                if (setting.id === settingId) {
                  return { ...setting, enabled }
                }
                return setting
              }),
            }
          }
          return category
        })
      )
    }
  }

  function handleSaveSettings() {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Notification settings saved",
        description: "Your notification preferences have been updated successfully.",
      })
      setIsSaving(false)
    }, 1500)
  }

  function handleEnableAll() {
    if (activeTab === "email") {
      setEmailNotifications(
        emailNotifications.map((category) => ({
          ...category,
          settings: category.settings.map((setting) => ({
            ...setting,
            enabled: true,
          })),
        }))
      )
    } else {
      setSmsNotifications(
        smsNotifications.map((category) => ({
          ...category,
          settings: category.settings.map((setting) => ({
            ...setting,
            enabled: true,
          })),
        }))
      )
    }
    
    toast({
      title: "All notifications enabled",
      description: `All ${activeTab} notifications have been enabled.`,
    })
  }

  function handleDisableAll() {
    if (activeTab === "email") {
      setEmailNotifications(
        emailNotifications.map((category) => ({
          ...category,
          settings: category.settings.map((setting) => ({
            ...setting,
            enabled: false,
          })),
        }))
      )
    } else {
      setSmsNotifications(
        smsNotifications.map((category) => ({
          ...category,
          settings: category.settings.map((setting) => ({
            ...setting,
            enabled: false,
          })),
        }))
      )
    }
    
    toast({
      title: "All notifications disabled",
      description: `All ${activeTab} notifications have been disabled.`,
    })
  }

  const activeNotifications = activeTab === "email" ? emailNotifications : smsNotifications

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>
            Manage how and when you receive notifications from the student portal.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="email" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email">Email Notifications</TabsTrigger>
              <TabsTrigger value="sms">SMS Notifications</TabsTrigger>
            </TabsList>
            
            <div className="mt-6">
              <div className="flex justify-between mb-6">
                <div className="text-sm text-muted-foreground">
                  {activeTab === "email" 
                    ? "Configure which email notifications you want to receive." 
                    : "Configure which SMS notifications you want to receive. Standard message rates may apply."}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleEnableAll}>
                    Enable All
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDisableAll}>
                    Disable All
                  </Button>
                </div>
              </div>
              
              <div className="space-y-8">
                {activeNotifications.map((category) => (
                  <div key={category.id} className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">{category.title}</h3>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                    
                    <div className="space-y-4">
                      {category.settings.map((setting) => (
                        <div key={setting.id} className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <div className="text-sm font-medium">{setting.title}</div>
                            <div className="text-xs text-muted-foreground">{setting.description}</div>
                          </div>
                          <Switch
                            checked={setting.enabled}
                            onCheckedChange={(checked) => toggleNotification(category.id, setting.id, checked)}
                          />
                        </div>
                      ))}
                    </div>
                    
                    <Separator className="my-4" />
                  </div>
                ))}
              </div>
            </div>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSaveSettings} disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Preferences
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Notification Schedule</CardTitle>
          <CardDescription>
            Control when you receive non-urgent notifications to avoid disruptions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Quiet Hours</div>
                <div className="text-xs text-muted-foreground">
                  Pause non-urgent notifications during specified hours
                </div>
              </div>
              <Switch defaultChecked={true} />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Weekend Mode</div>
                <div className="text-xs text-muted-foreground">
                  Receive only important notifications on weekends
                </div>
              </div>
              <Switch defaultChecked={false} />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Exam Period Focus</div>
                <div className="text-xs text-muted-foreground">
                  Reduce notifications during exam periods
                </div>
              </div>
              <Switch defaultChecked={true} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
