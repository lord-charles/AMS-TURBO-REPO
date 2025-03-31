import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getCourseById } from "@/lib/academic/data"
import { CourseDetails } from "@/app/sections/academic/(mycourses)/courses/course-details"
import { DashboardLayout } from "@/components/dashboard-layout"
import { DashboardHeader } from "@/components/dashboard-header"
import { AcademicSidebar } from "@/app/sections/academic/(mycourses)/academic-sidebar"

export const metadata: Metadata = {
  title: "Course Details | Academic Portal",
  description: "View detailed information about your course",
}

interface CoursePageProps {
  params: {
    courseId: string
  }
}

export default function CoursePage({ params }: CoursePageProps) {
  const course = getCourseById(params.courseId)

  if (!course) {
    notFound()
  }

  return (
    <DashboardLayout>
    <DashboardHeader />
    <AcademicSidebar />
    <div className="space-y-6 p-2">
      <CourseDetails courseId={params.courseId} />
    </div>
  </DashboardLayout>

  )
}

