import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardLayout } from "@/components/dashboard-layout"
import type React from "react"

export default function ClearanceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardLayout>
      <DashboardHeader />
      <div className="flex min-h-screen flex-col">
        <main className="flex w-full flex-1 flex-col overflow-hidden">{children}</main>
      </div>
    </DashboardLayout>
  )
}
