"use client"
import { AcademicSummary } from "./academic-summary"
import { UpcomingEvents } from "./upcoming-events"
import { RecentAnnouncements } from "./recent-announcements"
import { SemesterProgress } from "./semester-progress"
import { QuickActions } from "./quick-actions"
import { PendingTasks } from "./pending-tasks"
import { RecentGrades } from "./recent-grades"
import { AcademicCalendar } from "./academic-calendar"

export function AcademicOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Academic Overview</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your academic progress and upcoming activities.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AcademicSummary />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-1 lg:col-span-2 space-y-6">
          <SemesterProgress />
          <PendingTasks />
          <RecentGrades />
        </div>
        <div className="space-y-6">
          <QuickActions />
          <UpcomingEvents />
          <RecentAnnouncements />
        </div>
      </div>

      <AcademicCalendar />
    </div>
  )
}

