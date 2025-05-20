import DocumentTabs from "@/app/sections/(Home & Essentials)/documents/document-tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardLayout } from "@/components/dashboard-layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Student Documents | University Portal",
  description: "Access and manage your student ID, exam card, and official university documents",
}

export default function DocumentsPage() {
  return (
    <DashboardLayout>
      <DashboardHeader />
    <div className="p-2 px-4 pb-6 pt-2">
      <div className="mb-4">
        <h1 className="text-3xl font-bold tracking-tight">Student Documents</h1>
        <p className="text-muted-foreground mt-1">
          Access and manage your student ID, exam card, and other official university documents
        </p>
      </div>

      <DocumentTabs />
    </div>
    </DashboardLayout>

  )
}

