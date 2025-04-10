"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Course } from "./types"
import { calculateGradeDistribution, getGradeColor } from "./utils"

interface GradeDistributionChartProps {
  courses: Course[]
  title?: string
  description?: string
}

export function GradeDistributionChart({
  courses,
  title = "Grade Distribution",
  description = "Distribution of grades across all courses",
}: GradeDistributionChartProps) {
  const distribution = calculateGradeDistribution(courses)
  const totalCourses = Object.values(distribution).reduce((sum, count) => sum + count, 0)

  // Colors for the bars
  const colors: Record<string, string> = {
    A: "bg-green-500",
    B: "bg-blue-500",
    C: "bg-yellow-500",
    D: "bg-orange-500",
    E: "bg-red-500",
    F: "bg-red-700",
    Other: "bg-gray-500",
  }

  // Find the maximum count for scaling
  const maxCount = Math.max(...Object.values(distribution))

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(distribution).map(([grade, count]) => {
            const percentage = totalCourses > 0 ? (count / totalCourses) * 100 : 0
            const barWidth = maxCount > 0 ? (count / maxCount) * 100 : 0
            const color = colors[grade] || colors.Other

            return (
              <div key={grade} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center">
                    <span className={`font-medium ${getGradeColor(grade)}`}>{grade}</span>
                  </div>
                  <div className="text-muted-foreground">
                    {count} course{count !== 1 ? "s" : ""} ({percentage.toFixed(1)}%)
                  </div>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div className={`h-full ${color}`} style={{ width: `${barWidth}%` }} />
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-4 text-xs text-muted-foreground">Based on {totalCourses} completed courses</div>
      </CardContent>
    </Card>
  )
}
