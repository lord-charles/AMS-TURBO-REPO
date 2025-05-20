"use client"
import { AcademicSummary } from "./academic-summary"
import { SemesterProgress } from "./semester-progress"
import { QuickActions } from "./quick-actions"

export function AcademicOverview() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Academic Overview</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your academic progress and upcoming activities.
        </p>
      </div>

      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
        <AcademicSummary />
      </div>

      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-1 lg:col-span-2 space-y-6">
          <SemesterProgress />
        </div>
        <div className="space-y-6">
          <QuickActions />
        </div>
      </div>

    </div>
  )
}

