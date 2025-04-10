import type {
  AttendanceRecord,
  CourseAttendance,
  AttendanceStats,
  AttendanceExcuse,
  AttendanceSettings,
  AttendanceCalendarEvent,
} from "./types"

// Generate dates for the current semester (assuming it started 3 months ago)
const generatePastDate = (daysAgo: number): string => {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  return date.toISOString().split("T")[0]
}

const generateFutureDate = (daysAhead: number): string => {
  const date = new Date()
  date.setDate(date.getDate() + daysAhead)
  return date.toISOString().split("T")[0]
}

// Mock attendance records for a single course
const generateAttendanceRecords = (
  courseId: string,
  courseName: string,
  courseCode: string,
  totalRecords: number,
): AttendanceRecord[] => {
  const records: AttendanceRecord[] = []

  for (let i = 0; i < totalRecords; i++) {
    // Determine status with a bias towards 'present'
    let status: "present" | "absent" | "excused" | "late"
    const rand = Math.random()
    if (rand < 0.8) {
      status = "present"
    } else if (rand < 0.9) {
      status = "late"
    } else if (rand < 0.95) {
      status = "excused"
    } else {
      status = "absent"
    }

    // Alternate between session types
    const sessionTypes: ("lecture" | "tutorial" | "lab" | "seminar")[] = ["lecture", "tutorial", "lab", "seminar"]
    const sessionType = sessionTypes[i % sessionTypes.length]

    // Alternate between marking methods
    const markingMethods: ("qr" | "biometric" | "manual" | "self")[] = ["qr", "biometric", "manual", "self"]
    const markingMethod = markingMethods[i % markingMethods.length]

    // Generate locations
    const locations = ["Room 101", "LT 5", "Engineering Block", "Science Complex", "Main Hall"]
    const location = locations[i % locations.length]

    records.push({
      id: `rec-${courseId}-${i}`,
      courseId,
      courseName,
      courseCode,
      date: generatePastDate(90 - i * 2), // Classes every 2 days
      status,
      sessionType,
      startTime: "08:00",
      endTime: "10:00",
      duration: 120,
      markedBy: "Dr. James Mwangi",
      markingMethod,
      location,
      notes: status === "excused" ? "Medical appointment" : undefined,
    })
  }

  return records
}

// Mock course attendance data
export const mockCourseAttendance: CourseAttendance[] = [
  {
    courseId: "CSC301",
    courseCode: "CSC301",
    courseName: "Data Structures and Algorithms",
    lecturer: "Dr. James Mwangi",
    totalSessions: 30,
    attendedSessions: 28,
    attendancePercentage: 93.3,
    lastAttended: generatePastDate(2),
    nextSession: {
      date: generateFutureDate(1),
      startTime: "08:00",
      endTime: "10:00",
      location: "Room 101",
      sessionType: "lecture",
    },
    records: generateAttendanceRecords("CSC301", "Data Structures and Algorithms", "CSC301", 30),
    warningLevel: "none",
  },
  {
    courseId: "CSC302",
    courseCode: "CSC302",
    courseName: "Database Systems",
    lecturer: "Prof. Lucy Waithaka",
    totalSessions: 25,
    attendedSessions: 20,
    attendancePercentage: 80,
    lastAttended: generatePastDate(4),
    nextSession: {
      date: generateFutureDate(2),
      startTime: "11:00",
      endTime: "13:00",
      location: "LT 5",
      sessionType: "lecture",
    },
    records: generateAttendanceRecords("CSC302", "Database Systems", "CSC302", 25),
    warningLevel: "caution",
  },
  {
    courseId: "CSC303",
    courseCode: "CSC303",
    courseName: "Software Engineering",
    lecturer: "Dr. Peter Kamau",
    totalSessions: 28,
    attendedSessions: 18,
    attendancePercentage: 64.3,
    lastAttended: generatePastDate(10),
    nextSession: {
      date: generateFutureDate(3),
      startTime: "14:00",
      endTime: "16:00",
      location: "Engineering Block",
      sessionType: "lab",
    },
    records: generateAttendanceRecords("CSC303", "Software Engineering", "CSC303", 28),
    warningLevel: "critical",
  },
  {
    courseId: "CSC304",
    courseCode: "CSC304",
    courseName: "Computer Networks",
    lecturer: "Prof. Sarah Odhiambo",
    totalSessions: 22,
    attendedSessions: 15,
    attendancePercentage: 68.2,
    lastAttended: generatePastDate(6),
    nextSession: {
      date: generateFutureDate(4),
      startTime: "09:00",
      endTime: "11:00",
      location: "Science Complex",
      sessionType: "tutorial",
    },
    records: generateAttendanceRecords("CSC304", "Computer Networks", "CSC304", 22),
    warningLevel: "warning",
  },
  {
    courseId: "CSC305",
    courseCode: "CSC305",
    courseName: "Artificial Intelligence",
    lecturer: "Dr. Michael Otieno",
    totalSessions: 20,
    attendedSessions: 19,
    attendancePercentage: 95,
    lastAttended: generatePastDate(1),
    nextSession: {
      date: generateFutureDate(5),
      startTime: "13:00",
      endTime: "15:00",
      location: "Main Hall",
      sessionType: "seminar",
    },
    records: generateAttendanceRecords("CSC305", "Artificial Intelligence", "CSC305", 20),
    warningLevel: "none",
  },
]

// Calculate overall attendance statistics
export const mockAttendanceStats: AttendanceStats = {
  overallAttendance: 80.2,
  totalCourses: mockCourseAttendance.length,
  totalSessions: mockCourseAttendance.reduce((sum, course) => sum + course.totalSessions, 0),
  attendedSessions: mockCourseAttendance.reduce((sum, course) => sum + course.attendedSessions, 0),
  missedSessions: mockCourseAttendance.reduce(
    (sum, course) => sum + (course.totalSessions - course.attendedSessions),
    0,
  ),
  excusedSessions: 5,
  lateSessions: 8,
  coursesAtRisk: mockCourseAttendance.filter(
    (course) => course.warningLevel === "warning" || course.warningLevel === "critical",
  ).length,
}

// Mock attendance excuses
export const mockAttendanceExcuses: AttendanceExcuse[] = [
  {
    id: "exc-001",
    courseId: "CSC303",
    courseName: "Software Engineering",
    date: generatePastDate(10),
    reason: "Medical appointment at Kenyatta National Hospital",
    status: "approved",
    submittedOn: generatePastDate(12),
    documents: ["medical_certificate.pdf"],
    reviewedBy: "Dr. Peter Kamau",
    reviewedOn: generatePastDate(9),
    comments: "Medical certificate verified. Excuse approved.",
  },
  {
    id: "exc-002",
    courseId: "CSC304",
    courseName: "Computer Networks",
    date: generatePastDate(6),
    reason: "Family emergency",
    status: "pending",
    submittedOn: generatePastDate(6),
    documents: [],
  },
  {
    id: "exc-003",
    courseId: "CSC302",
    courseName: "Database Systems",
    date: generatePastDate(15),
    reason: "Participation in university sports competition",
    status: "rejected",
    submittedOn: generatePastDate(16),
    documents: ["sports_letter.pdf"],
    reviewedBy: "Prof. Lucy Waithaka",
    reviewedOn: generatePastDate(14),
    comments: "Prior notification required for sports events.",
  },
]

// Mock attendance settings
export const mockAttendanceSettings: AttendanceSettings = {
  notificationsEnabled: true,
  reminderTime: 30, // 30 minutes before class
  warningThreshold: 75, // 75% attendance
  criticalThreshold: 65, // 65% attendance
  emailNotifications: true,
  smsNotifications: false,
  pushNotifications: true,
}

// Generate calendar events from attendance records
export const mockCalendarEvents= [
  // Past events (from attendance records)
  ...mockCourseAttendance.flatMap((course) =>
    course.records.map((record) => ({
      id: record.id,
      title: `${record.courseCode} - ${record.sessionType.charAt(0).toUpperCase() + record.sessionType.slice(1)}`,
      date: record.date,
      startTime: record.startTime,
      endTime: record.endTime,
      status:
        record.status === "present"
          ? "attended"
          : record.status === "absent"
            ? "missed"
            : record.status === "excused"
              ? "excused"
              : "late",
      courseCode: record.courseCode,
      location: record.location,
      sessionType: record.sessionType,
    })),
  ),

  // Future events (from next sessions)
  ...(mockCourseAttendance
    .map((course) =>
      course.nextSession
        ? {
            id: `upcoming-${course.courseId}`,
            title: `${course.courseCode} - ${course.nextSession.sessionType.charAt(0).toUpperCase() + course.nextSession.sessionType.slice(1)}`,
            date: course.nextSession.date,
            startTime: course.nextSession.startTime,
            endTime: course.nextSession.endTime,
            status: "upcoming",
            courseCode: course.courseCode,
            location: course.nextSession.location,
            sessionType: course.nextSession.sessionType,
          }
        : null,
    )
    .filter(Boolean) as AttendanceCalendarEvent[]),
]

