import { ProfileTabs } from "@/app/sections/(Home & Essentials)/profile/profile-tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Profile & Settings | Student Portal",
  description: "Manage your personal information, security settings, notifications, and preferences",
}

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <DashboardHeader />
      <div className="p-2 px-4 pb-6 pt-2">
      <div className="flex flex-col pb-2">
        <h1 className="text-3xl font-bold tracking-tight">Profile & Settings</h1>
        <p className="text-muted-foreground">
          Manage your personal information, security settings, notifications, and preferences
        </p>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <ProfileTabs />
        </CardContent>
      </Card>
    </div>
    </DashboardLayout>
  )
}
