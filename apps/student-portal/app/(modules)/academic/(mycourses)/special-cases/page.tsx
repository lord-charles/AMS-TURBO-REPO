import { AcademicSidebar } from "@/app/sections/academic/(mycourses)/academic-sidebar"
import { SpecialCases } from "@/app/sections/academic/(mycourses)/special-cases/special-cases"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardLayout } from "@/components/dashboard-layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Special Cases | Academic Portal",
  description: "Apply for supplementary exams and retakes",
}

export default function SpecialCasesPage() {
  return (
    <DashboardLayout>
    <DashboardHeader />
    <AcademicSidebar />
    <div className="space-y-6 p-2">
      <SpecialCases />
    </div>
  </DashboardLayout>

  )
}

