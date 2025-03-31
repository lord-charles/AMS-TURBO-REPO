import { AcademicSidebar } from "@/app/sections/academic/(mycourses)/academic-sidebar"
import { CoursesDashboard } from "@/app/sections/academic/(mycourses)/courses/courses-dashboard"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardLayout } from "@/components/dashboard-layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "My Courses | Academic Portal",
  description: "View and manage your enrolled courses",
}

export default function MyCoursesPage() {
  return (
    <DashboardLayout>
    <DashboardHeader />
    <AcademicSidebar />
    <div className="space-y-6 p-2">
      <CoursesDashboard />
    </div>
  </DashboardLayout>

  )
}

