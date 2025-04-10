import type { CourseAttendance, AttendanceRecord, AttendanceStats } from "./types"

// Calculate attendance percentage
export const calculateAttendancePercentage = (attended: number, total: number): number => {
  if (total === 0) return 0
  return Math.round((attended / total) * 100 * 10) / 10 // Round to 1 decimal place
}

// Determine warning level based on attendance percentage
export const getWarningLevel = (
  percentage: number,
  warningThreshold = 75,
  criticalThreshold = 65,
): "none" | "caution" | "warning" | "critical" => {
  if (percentage >= warningThreshold + 5) return "none"
  if (percentage >= warningThreshold) return "caution"
  if (percentage >= criticalThreshold) return "warning"
  return "critical"
}

// Get color for attendance status
export const getStatusColor = (
  status: "present" | "absent" | "excused" | "late" | "attended" | "missed" | "upcoming",
): string => {
  switch (status) {
    case "present":
    case "attended":
      return "bg-green-100 text-green-800 border-green-200"
    case "absent":
    case "missed":
      return "bg-red-100 text-red-800 border-red-200"
    case "excused":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "late":
      return "bg-orange-100 text-orange-800 border-orange-200"
    case "upcoming":
      return "bg-blue-100 text-blue-800 border-blue-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

// Get color for warning level
export const getWarningLevelColor = (level: "none" | "caution" | "warning" | "critical"): string => {
  switch (level) {
    case "none":
      return "bg-green-100 text-green-800"
    case "caution":
      return "bg-yellow-100 text-yellow-800"
    case "warning":
      return "bg-orange-100 text-orange-800"
    case "critical":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

// Format date to local string
export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }
  return new Date(dateString).toLocaleDateString("en-KE", options)
}

// Format time (24-hour format)
export const formatTime = (timeString: string): string => {
  const [hours, minutes] = timeString.split(":")
  return `${hours}:${minutes}`
}

// Calculate days since last attendance
export const daysSinceLastAttendance = (lastAttendedDate: string): number => {
  const today = new Date()
  const lastDate = new Date(lastAttendedDate)
  const diffTime = Math.abs(today.getTime() - lastDate.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

// Calculate days until next session
export const daysUntilNextSession = (nextSessionDate: string): number => {
  const today = new Date()
  const nextDate = new Date(nextSessionDate)
  const diffTime = Math.abs(nextDate.getTime() - today.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

// Group attendance records by month
export const groupRecordsByMonth = (records: AttendanceRecord[]): Record<string, AttendanceRecord[]> => {
  return records.reduce(
    (grouped, record) => {
      const date = new Date(record.date)
      const monthYear = `${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`

      if (!grouped[monthYear]) {
        grouped[monthYear] = []
      }

      grouped[monthYear].push(record)
      return grouped
    },
    {} as Record<string, AttendanceRecord[]>,
  )
}

// Calculate monthly attendance statistics
export const calculateMonthlyStats = (
  records: AttendanceRecord[],
): { month: string; present: number; absent: number; excused: number; late: number; total: number }[] => {
  const grouped = groupRecordsByMonth(records)

  return Object.entries(grouped).map(([month, monthRecords]) => {
    const present = monthRecords.filter((r) => r.status === "present").length
    const absent = monthRecords.filter((r) => r.status === "absent").length
    const excused = monthRecords.filter((r) => r.status === "excused").length
    const late = monthRecords.filter((r) => r.status === "late").length

    return {
      month,
      present,
      absent,
      excused,
      late,
      total: monthRecords.length,
    }
  })
}

// Get attendance requirement message based on percentage
export const getAttendanceRequirementMessage = (percentage: number): string => {
  if (percentage >= 80) {
    return "You're meeting the attendance requirement (80%)"
  } else {
    const needed = Math.ceil((80 - percentage) / 5) * 5
    return `You need to improve attendance by ${needed}% to meet requirements`
  }
}

// Calculate overall attendance statistics
export const calculateOverallStats = (courses: CourseAttendance[]): AttendanceStats => {
  const totalSessions = courses.reduce((sum, course) => sum + course.totalSessions, 0)
  const attendedSessions = courses.reduce((sum, course) => sum + course.attendedSessions, 0)
  const missedSessions = totalSessions - attendedSessions

  // Count excused and late sessions from records
  let excusedSessions = 0
  let lateSessions = 0

  courses.forEach((course) => {
    course.records.forEach((record) => {
      if (record.status === "excused") excusedSessions++
      if (record.status === "late") lateSessions++
    })
  })

  const overallAttendance = calculateAttendancePercentage(attendedSessions, totalSessions)
  const coursesAtRisk = courses.filter(
    (course) => course.warningLevel === "warning" || course.warningLevel === "critical",
  ).length

  return {
    overallAttendance,
    totalCourses: courses.length,
    totalSessions,
    attendedSessions,
    missedSessions,
    excusedSessions,
    lateSessions,
    coursesAtRisk,
  }
}

