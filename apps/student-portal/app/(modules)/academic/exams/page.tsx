import { SpecialExamsView } from "@/app/sections/academic/exams/special-exams-view"
import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardLayout } from "@/components/dashboard-layout"

export const metadata: Metadata = {
  title: "Exams & Assignments | Academic Portal",
  description: "View and manage your exams, assignments, and academic assessments",
}

export default function ExamsPage() {
  return (
    <DashboardLayout>
      <DashboardHeader />
      <SpecialExamsView />
    </DashboardLayout>
  )
}

