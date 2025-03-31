import { AcademicSidebar } from "@/app/sections/academic/(mycourses)/academic-sidebar"
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
      <AcademicSidebar />
    </DashboardLayout>

  )
}

