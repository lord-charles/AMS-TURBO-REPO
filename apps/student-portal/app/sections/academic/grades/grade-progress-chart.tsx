import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { SemesterGrades } from "./types"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface GradeProgressChartProps {
  semesters: SemesterGrades[]
  title?: string
  description?: string
}

export function GradeProgressChart({
  semesters,
  title = "GPA Progression",
  description = "Your GPA trend across semesters",
}: GradeProgressChartProps) {
  // Sort semesters chronologically
  const sortedSemesters = [...semesters]
    .filter((semester) => semester.status !== "current")
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())

  // Prepare data for the chart
  const chartData = sortedSemesters.map((semester) => ({
    name: `${semester.semester} ${semester.academicYear.split("/")[0]}`,
    gpa: semester.gpa,
    creditHours: semester.totalCreditHours,
  }))

  // Calculate min and max GPA for y-axis
  const minGPA = Math.max(0, Math.floor(Math.min(...chartData.map((d) => d.gpa)) * 2) / 2)
  const maxGPA = Math.min(4, Math.ceil(Math.max(...chartData.map((d) => d.gpa)) * 2) / 2)

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-md shadow-sm p-2 text-sm">
          <p className="font-medium">{label}</p>
          <p className="text-primary">GPA: {payload[0].value.toFixed(2)}</p>
          <p className="text-muted-foreground">Credit Hours: {payload[0].payload.creditHours}</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: "#e5e7eb" }} />
                <YAxis
                  domain={[minGPA, maxGPA]}
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: "#e5e7eb" }}
                  tickFormatter={(value) => value.toFixed(1)}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="gpa"
                  stroke="#0ea5e9"
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              No historical data available
            </div>
          )}
        </div>

        <div className="mt-4 text-xs text-muted-foreground">Based on {chartData.length} completed semesters</div>
      </CardContent>
    </Card>
  )
}

