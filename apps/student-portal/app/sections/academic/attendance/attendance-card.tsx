import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, AlertTriangle, Info } from "lucide-react"
import type { CourseAttendance } from "./types"
import { formatDate, getWarningLevelColor, daysSinceLastAttendance, daysUntilNextSession } from "./utils"
import { AttendanceStatusBadge } from "./attendance-status-badge"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface AttendanceCardProps {
  course: CourseAttendance
}

export function AttendanceCard({ course }: AttendanceCardProps) {
  const {
    courseId,
    courseCode,
    courseName,
    attendancePercentage,
    totalSessions,
    attendedSessions,
    lastAttended,
    nextSession,
    warningLevel,
  } = course

  const warningLevelColor = getWarningLevelColor(warningLevel)
  const lastAttendedDays = lastAttended ? daysSinceLastAttendance(lastAttended) : null
  const nextSessionDays = nextSession ? daysUntilNextSession(nextSession.date) : null

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold">{courseCode}</CardTitle>
            <CardDescription className="text-sm line-clamp-1">{courseName}</CardDescription>
          </div>
          {warningLevel !== "none" && (
            <div className={cn("px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1", warningLevelColor)}>
              {warningLevel === "critical" && <AlertTriangle className="h-3 w-3" />}
              {warningLevel === "warning" && <Info className="h-3 w-3" />}
              {warningLevel === "caution" && <Info className="h-3 w-3" />}
              {warningLevel.charAt(0).toUpperCase() + warningLevel.slice(1)}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Attendance</span>
              <span className="text-sm font-medium">{attendancePercentage}%</span>
            </div>
            <Progress value={attendancePercentage} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {attendedSessions} of {totalSessions} sessions attended
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2 text-sm">
            {lastAttended && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Last attended:</span>
                <span className="font-medium">
                  {formatDate(lastAttended)} ({lastAttendedDays} {lastAttendedDays === 1 ? "day" : "days"} ago)
                </span>
              </div>
            )}

            {nextSession && (
              <div className="flex flex-col gap-1 p-2 bg-muted rounded-md">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="font-medium">Next session: {formatDate(nextSession.date)}</span>
                </div>
                <div className="flex items-center gap-2 ml-6">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span>
                    {nextSession.startTime} - {nextSession.endTime}
                  </span>
                </div>
                <div className="flex items-center gap-2 ml-6">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span>{nextSession.location}</span>
                </div>
                <div className="flex items-center gap-2 ml-6">
                  <AttendanceStatusBadge status="upcoming" />
                  <span className="text-xs">
                    {nextSession.sessionType.charAt(0).toUpperCase() + nextSession.sessionType.slice(1)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/academic/attendance/${courseId}`} className="w-full">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}



