import { GradesAndTranscriptsMain } from "@/app/sections/academic/grades/grades-and-transcripts-main";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardLayout } from "@/components/dashboard-layout";

export default function GradesPage() {
  return (
    <DashboardLayout>
      <DashboardHeader />
      <GradesAndTranscriptsMain />
    </DashboardLayout>
  )
}

