export interface AttendanceRecord {
  id: string
  courseId: string
  courseName: string
  courseCode: string
  date: string
  status: "present" | "absent" | "excused" | "late"
  sessionType: "lecture" | "tutorial" | "lab" | "seminar"
  startTime: string
  endTime: string
  duration: number // in minutes
  markedBy: string
  markingMethod: "qr" | "biometric" | "manual" | "self"
  location: string
  notes?: string
}

export interface CourseAttendance {
  courseId: string
  courseCode: string
  courseName: string
  lecturer: string
  totalSessions: number
  attendedSessions: number
  attendancePercentage: number
  lastAttended?: string
  nextSession?: {
    date: string
    startTime: string
    endTime: string
    location: string
    sessionType: "lecture" | "tutorial" | "lab" | "seminar"
  }
  records: AttendanceRecord[]
  warningLevel: "none" | "caution" | "warning" | "critical"
}

export interface AttendanceStats {
  overallAttendance: number
  totalCourses: number
  totalSessions: number
  attendedSessions: number
  missedSessions: number
  excusedSessions: number
  lateSessions: number
  coursesAtRisk: number
}

export interface AttendanceExcuse {
  id: string
  courseId: string
  courseName: string
  date: string
  reason: string
  status: "pending" | "approved" | "rejected"
  submittedOn: string
  documents?: string[]
  reviewedBy?: string
  reviewedOn?: string
  comments?: string
}

export interface AttendanceSettings {
  notificationsEnabled: boolean
  reminderTime: number // minutes before class
  warningThreshold: number // percentage
  criticalThreshold: number // percentage
  emailNotifications: boolean
  smsNotifications: boolean
  pushNotifications: boolean
}

export interface AttendanceCalendarEvent {
  id: string
  title: string
  date: string
  startTime: string
  endTime: string
  status: "attended" | "missed" | "upcoming" | "excused" | "late"
  courseCode: string
  location: string
  sessionType: "lecture" | "tutorial" | "lab" | "seminar"
}

