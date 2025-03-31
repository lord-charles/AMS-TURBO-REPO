import { AcademicSidebar } from "@/app/sections/academic/(mycourses)/academic-sidebar"
import { CourseRegistration } from "@/app/sections/academic/(mycourses)/registration/course-registration"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardLayout } from "@/components/dashboard-layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Course Registration | Academic Portal",
  description: "Register for new courses and manage your course load",
}

export default function RegistrationPage() {
  return (
    <DashboardLayout>
    <DashboardHeader />
    <AcademicSidebar />
    <div className="space-y-6 p-2">
      <CourseRegistration />
    </div>
  </DashboardLayout>

  )
}

