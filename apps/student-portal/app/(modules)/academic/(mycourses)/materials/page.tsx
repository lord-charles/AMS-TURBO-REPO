import { AcademicSidebar } from "@/app/sections/academic/(mycourses)/academic-sidebar"
import { CourseMaterials } from "@/app/sections/academic/(mycourses)/materials/course-materials"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardLayout } from "@/components/dashboard-layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Course Materials | Academic Portal",
  description: "Access learning materials for your courses",
}

export default function MaterialsPage() {
  return (
    <DashboardLayout>
      <DashboardHeader />
    <AcademicSidebar />

    <div className="space-y-6 p-2">
      <CourseMaterials />
    </div>
    </DashboardLayout>


  )
}

