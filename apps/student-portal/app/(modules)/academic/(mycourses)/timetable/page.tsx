import type { Metadata } from "next"
import { DashboardLayout } from "@/components/dashboard-layout"
import { DashboardHeader } from "@/components/dashboard-header"
import { AcademicSidebar } from "@/app/sections/academic/(mycourses)/academic-sidebar"
import { AcademicTimetable } from "@/app/sections/academic/(mycourses)/timetable/academic-timetable"

export const metadata: Metadata = {
  title: "Class Schedule & Timetable | Academic Portal",
  description: "View your personalized class schedule, lectures, and academic timetable",
}

export default function TimetablePage() {
  return     <DashboardLayout>
  <DashboardHeader />
  <AcademicSidebar />
  <div className="space-y-6 p-2"><AcademicTimetable />
  </div>
  </DashboardLayout>
}

