import type {  PreviousApplication } from "./types"

// Mock data for failed courses
export const failedCourses = [
  {
    code: "CSC 315",
    name: "Database Systems",
    grade: "E",
    units: 3,
    semester: "1st Semester 2023/2024",
    eligibleForSupplementary: true,
    maxPossibleGrade: "C",
    examDate: "2024-05-15",
    venue: "Main Hall A",
  },
  {
    code: "CSC 301",
    name: "Operating Systems",
    grade: "D",
    units: 4,
    semester: "1st Semester 2023/2024",
    eligibleForSupplementary: true,
    maxPossibleGrade: "C",
    examDate: "2024-05-18",
    venue: "ICT Lab 2",
  },
  {
    code: "MAT 305",
    name: "Numerical Analysis",
    grade: "D-",
    units: 3,
    semester: "1st Semester 2023/2024",
    eligibleForSupplementary: true,
    maxPossibleGrade: "C",
    examDate: "2024-05-20",
    venue: "Science Complex 3B",
  },
]

// Mock data for previous applications
export const previousApplications: PreviousApplication[] = [
  {
    id: "SE-2023-001",
    type: "Supplementary",
    course: "CSC 217",
    date: "12/11/2023",
    status: "Approved",
    paymentStatus: "Paid",
    examDate: "15/01/2024",
    venue: "Main Hall B",
    time: "09:00 AM",
    applicationSteps: [
      { id: 1, name: "Application Submitted", status: "completed", date: "12/11/2023" },
      { id: 2, name: "Department Approval", status: "completed", date: "15/11/2023" },
      { id: 3, name: "Payment", status: "completed", date: "18/11/2023" },
      { id: 4, name: "Exam Scheduled", status: "completed", date: "20/12/2023" },
    ],
  },
  {
    id: "DE-2023-005",
    type: "Deferred",
    course: "MAT 201",
    date: "05/10/2023",
    status: "Pending",
    paymentStatus: "Not Paid",
    examDate: "Pending",
    applicationSteps: [
      { id: 1, name: "Application Submitted", status: "completed", date: "05/10/2023" },
      { id: 2, name: "Department Approval", status: "current", date: "" },
      { id: 3, name: "Payment", status: "upcoming", date: "" },
      { id: 4, name: "Exam Scheduled", status: "upcoming", date: "" },
    ],
  },
]

// Mock data for fee structure
export const feeStructure = [
  {
    examType: "Supplementary Exam",
    fee: 2500,
    currency: "KES",
    notes: "Per course unit",
    academicYear: "2023/2024",
    deadlineInfo: "Must be paid at least 2 weeks before the exam date",
  },
  {
    examType: "Deferred Exam",
    fee: 1500,
    currency: "KES",
    notes: "Per course",
    academicYear: "2023/2024",
    deadlineInfo: "Must be paid within 1 week of application approval",
  },
  {
    examType: "Special Sitting",
    fee: 3000,
    currency: "KES",
    notes: "Per exam",
    academicYear: "2023/2024",
    deadlineInfo: "Must be paid at least 3 weeks before the requested exam date",
  },
]

// Document requirements
export const documentRequirements = [
  {
    id: "medical-cert",
    name: "Medical Certificate",
    description: "Official medical certificate from a registered hospital or doctor",
    required: true,
    acceptedFormats: ["PDF", "JPG", "PNG"],
    maxSize: "5MB",
    examples: ["Hospital discharge summary", "Doctor's note with official letterhead"],
  },
  {
    id: "death-cert",
    name: "Death Certificate/Obituary",
    description: "For bereavement cases, provide a death certificate or funeral program",
    required: true,
    acceptedFormats: ["PDF", "JPG", "PNG"],
    maxSize: "5MB",
  },
  {
    id: "timetable-clash",
    name: "Exam Timetable",
    description: "Official exam timetable showing the clash between exams",
    required: true,
    acceptedFormats: ["PDF", "JPG", "PNG"],
    maxSize: "5MB",
  },
  {
    id: "letter-explanation",
    name: "Letter of Explanation",
    description: "Detailed explanation of circumstances requiring special examination",
    required: true,
    acceptedFormats: ["PDF", "DOC", "DOCX"],
    maxSize: "2MB",
  },
  {
    id: "supporting-evidence",
    name: "Additional Supporting Evidence",
    description: "Any other relevant documents supporting your application",
    required: false,
    acceptedFormats: ["PDF", "JPG", "PNG", "DOC", "DOCX"],
    maxSize: "10MB",
  },
]

// Payment methods


// Academic calendar events
export const academicCalendarEvents = [
  {
    id: "cal-001",
    title: "Supplementary Exams Registration Deadline",
    startDate: "2024-04-15",
    endDate: "2024-04-15",
    type: "registration",
    description: "Last day to register for supplementary examinations for the previous semester",
  },
  {
    id: "cal-002",
    title: "Supplementary Examinations Period",
    startDate: "2024-05-10",
    endDate: "2024-05-25",
    type: "special-exam",
    description: "Period for all supplementary and special examinations",
  },
  {
    id: "cal-003",
    title: "Special Exams Results Release",
    startDate: "2024-06-15",
    endDate: "2024-06-15",
    type: "results",
    description: "Release of results for all special examinations",
  },
]

// Notifications
export const notifications = [
  {
    id: "notif-001",
    title: "Supplementary Exam Registration Open",
    message: "Registration for supplementary exams is now open. Deadline is April 15, 2024.",
    type: "info",
    date: "2024-03-15T09:00:00",
    read: false,
    link: "/academic/exams?tab=apply",
  },
  {
    id: "notif-002",
    title: "Fee Structure Updated",
    message: "The fee structure for special examinations has been updated for the 2023/2024 academic year.",
    type: "warning",
    date: "2024-03-10T14:30:00",
    read: true,
  },
  {
    id: "notif-003",
    title: "Your Deferred Exam Application Approved",
    message: "Your application for a deferred examination for MAT 201 has been approved. Please proceed with payment.",
    type: "success",
    date: "2024-03-05T11:15:00",
    read: false,
    link: "/academic/exams?tab=status",
  },
]
