import { AttendanceMain } from "@/app/sections/academic/attendance/attendance-main";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardLayout } from "@/components/dashboard-layout";

export default function AttendancePage() {
  return (
    <DashboardLayout>
      <DashboardHeader />
      <AttendanceMain />
    </DashboardLayout>
  )
}

