import { AcademicSidebar } from "@/app/sections/academic/(mycourses)/academic-sidebar"
import { AcademicOverview } from "@/app/sections/academic/(mycourses)/overview/academic-overview"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Academic Overview | University Student System",
  description: "View your academic progress, upcoming events, and important announcements",
}

export default function AcademicPage() {
  return   <DashboardLayout>
  <DashboardHeader />
  <AcademicSidebar />
  <div className="space-y-6 p-2"><AcademicOverview />
  </div>
  </DashboardLayout>
}
