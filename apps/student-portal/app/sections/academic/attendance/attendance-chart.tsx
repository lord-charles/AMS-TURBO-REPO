"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { AttendanceRecord, CourseAttendance } from "./types"
import { calculateMonthlyStats } from "./utils"
import { useEffect, useRef, useState } from "react"

interface AttendanceChartProps {
  courseAttendance?: CourseAttendance
  records?: AttendanceRecord[]
  title?: string
  description?: string
}

export function AttendanceChart({
  courseAttendance,
  records = courseAttendance?.records || [],
  title = "Attendance Overview",
  description = "Visual representation of your attendance",
}: AttendanceChartProps) {
  const [activeTab, setActiveTab] = useState<"bar" | "pie" | "line">("bar")
  const barChartRef = useRef<HTMLCanvasElement>(null)
  const pieChartRef = useRef<HTMLCanvasElement>(null)
  const lineChartRef = useRef<HTMLCanvasElement>(null)

  const monthlyStats = calculateMonthlyStats(records)

  // Count attendance by status
  const statusCounts = {
    present: records.filter((r) => r.status === "present").length,
    absent: records.filter((r) => r.status === "absent").length,
    excused: records.filter((r) => r.status === "excused").length,
    late: records.filter((r) => r.status === "late").length,
  }

  // Calculate total for percentage
  const totalSessions = records.length

  useEffect(() => {
    if (typeof window !== "undefined") {
      const renderBarChart = async () => {
        if (barChartRef.current) {
          const { Chart, BarController, CategoryScale, LinearScale, BarElement, Tooltip, Legend } = await import(
            "chart.js"
          )

          Chart.register(BarController, CategoryScale, LinearScale, BarElement, Tooltip, Legend)

          const ctx = barChartRef.current.getContext("2d")
          if (ctx) {
            const chart = new Chart(ctx, {
              type: "bar",
              data: {
                labels: monthlyStats.map((stat) => stat.month),
                datasets: [
                  {
                    label: "Present",
                    data: monthlyStats.map((stat) => stat.present),
                    backgroundColor: "rgba(34, 197, 94, 0.7)",
                    borderColor: "rgba(34, 197, 94, 1)",
                    borderWidth: 1,
                  },
                  {
                    label: "Late",
                    data: monthlyStats.map((stat) => stat.late),
                    backgroundColor: "rgba(249, 115, 22, 0.7)",
                    borderColor: "rgba(249, 115, 22, 1)",
                    borderWidth: 1,
                  },
                  {
                    label: "Excused",
                    data: monthlyStats.map((stat) => stat.excused),
                    backgroundColor: "rgba(234, 179, 8, 0.7)",
                    borderColor: "rgba(234, 179, 8, 1)",
                    borderWidth: 1,
                  },
                  {
                    label: "Absent",
                    data: monthlyStats.map((stat) => stat.absent),
                    backgroundColor: "rgba(239, 68, 68, 0.7)",
                    borderColor: "rgba(239, 68, 68, 1)",
                    borderWidth: 1,
                  },
                ],
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    stacked: true,
                  },
                  y: {
                    stacked: true,
                    beginAtZero: true,
                  },
                },
              },
            })

            return () => chart.destroy()
          }
        }
      }

      const renderPieChart = async () => {
        if (pieChartRef.current) {
          const { Chart, PieController, ArcElement, Tooltip, Legend } = await import("chart.js")

          Chart.register(PieController, ArcElement, Tooltip, Legend)

          const ctx = pieChartRef.current.getContext("2d")
          if (ctx) {
            const chart = new Chart(ctx, {
              type: "pie",
              data: {
                labels: ["Present", "Late", "Excused", "Absent"],
                datasets: [
                  {
                    data: [statusCounts.present, statusCounts.late, statusCounts.excused, statusCounts.absent],
                    backgroundColor: [
                      "rgba(34, 197, 94, 0.7)",
                      "rgba(249, 115, 22, 0.7)",
                      "rgba(234, 179, 8, 0.7)",
                      "rgba(239, 68, 68, 0.7)",
                    ],
                    borderColor: [
                      "rgba(34, 197, 94, 1)",
                      "rgba(249, 115, 22, 1)",
                      "rgba(234, 179, 8, 1)",
                      "rgba(239, 68, 68, 1)",
                    ],
                    borderWidth: 1,
                  },
                ],
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
              },
            })

            return () => chart.destroy()
          }
        }
      }

      const renderLineChart = async () => {
        if (lineChartRef.current) {
          const { Chart, LineController, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } =
            await import("chart.js")

          Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

          const ctx = lineChartRef.current.getContext("2d")
          if (ctx) {
            // Sort records by date
            const sortedRecords = [...records].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

            // Calculate cumulative attendance percentage over time
            const cumulativeData = sortedRecords.map((_, index) => {
              const recordsUpToIndex = sortedRecords.slice(0, index + 1)
              const presentCount = recordsUpToIndex.filter((r) => r.status === "present" || r.status === "late").length
              return (presentCount / (index + 1)) * 100
            })

            const chart = new Chart(ctx, {
              type: "line",
              data: {
                labels: sortedRecords.map((r) => {
                  const date = new Date(r.date)
                  return `${date.getDate()}/${date.getMonth() + 1}`
                }),
                datasets: [
                  {
                    label: "Cumulative Attendance %",
                    data: cumulativeData,
                    borderColor: "rgba(59, 130, 246, 1)",
                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                    tension: 0.3,
                    fill: true,
                  },
                  {
                    label: "Required (80%)",
                    data: Array(sortedRecords.length).fill(80),
                    borderColor: "rgba(239, 68, 68, 0.7)",
                    borderDash: [5, 5],
                    borderWidth: 2,
                    pointRadius: 0,
                  },
                ],
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                      display: true,
                      text: "Attendance %",
                    },
                  },
                },
              },
            })

            return () => chart.destroy()
          }
        }
      }

      if (activeTab === "bar") renderBarChart()
      if (activeTab === "pie") renderPieChart()
      if (activeTab === "line") renderLineChart()
    }
  }, [activeTab, records, monthlyStats])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "bar" | "pie" | "line")}>
          <TabsList className="mb-4">
            <TabsTrigger value="bar">Monthly</TabsTrigger>
            <TabsTrigger value="pie">Distribution</TabsTrigger>
            <TabsTrigger value="line">Trend</TabsTrigger>
          </TabsList>

          <TabsContent value="bar" className="h-[300px]">
            <canvas ref={barChartRef} />
          </TabsContent>

          <TabsContent value="pie" className="h-[300px]">
            <canvas ref={pieChartRef} />
          </TabsContent>

          <TabsContent value="line" className="h-[300px]">
            <canvas ref={lineChartRef} />
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
          <div className="flex flex-col items-center p-2 bg-green-50 rounded-md">
            <span className="text-green-600 font-semibold text-lg">{statusCounts.present}</span>
            <span className="text-xs text-muted-foreground">Present</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-orange-50 rounded-md">
            <span className="text-orange-600 font-semibold text-lg">{statusCounts.late}</span>
            <span className="text-xs text-muted-foreground">Late</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-yellow-50 rounded-md">
            <span className="text-yellow-600 font-semibold text-lg">{statusCounts.excused}</span>
            <span className="text-xs text-muted-foreground">Excused</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-red-50 rounded-md">
            <span className="text-red-600 font-semibold text-lg">{statusCounts.absent}</span>
            <span className="text-xs text-muted-foreground">Absent</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

