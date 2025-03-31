"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Shield, Bell, Lock, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"

import { PersonalInfoTab } from "./components/personal-info-tab"
import { SecurityTab } from "./components/security-tab"
import { NotificationsTab } from "./components/notifications-tab"
import { PrivacyTab } from "./components/privacy-tab"
import { PreferencesTab } from "./components/preferences-tab"

export function ProfileTabs() {
  const [activeTab, setActiveTab] = useState("personal-info")
  const isMobile = useMediaQuery("(max-width: 768px)")

  const tabs = [
    {
      id: "personal-info",
      label: "Personal Information",
      icon: <User className="h-4 w-4" />,
      content: <PersonalInfoTab />,
    },
    {
      id: "security",
      label: "Security & Access",
      icon: <Shield className="h-4 w-4" />,
      content: <SecurityTab />,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <Bell className="h-4 w-4" />,
      content: <NotificationsTab />,
    },
    {
      id: "privacy",
      label: "Privacy & Data",
      icon: <Lock className="h-4 w-4" />,
      content: <PrivacyTab />,
    },
    {
      id: "preferences",
      label: "System Preferences",
      icon: <Settings className="h-4 w-4" />,
      content: <PreferencesTab />,
    },
  ]

  return (
    <Tabs defaultValue="personal-info" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList
        className={cn(
          "w-full h-auto p-1 bg-muted/30 rounded-t-lg sticky top-0 z-10",
          isMobile ? "grid grid-cols-3 gap-1" : "flex",
        )}
      > 
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className={cn("flex items-center gap-2 py-3", isMobile ? "flex-col text-xs" : "text-sm")}
          >
            {tab.icon}
            <span className={cn(isMobile && "mt-1")}>{tab.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="p-6">
        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="mt-0 focus-visible:outline-none focus-visible:ring-0">
            {tab.content}
          </TabsContent>
        ))}
      </div>
    </Tabs>
  )
}

