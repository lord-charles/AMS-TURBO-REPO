export interface Course {
  id: string
  code: string
  title: string
  credits: number
  grade?: string
  score?: number
  status: "completed" | "in-progress" | "upcoming" | "failed" | "withheld" | "published"
  semester: string
  academicYear: string
  isRetake?: boolean
  isSpecialExam?: boolean
}

export interface Semester {
  id: string
  name: string
  academicYear: string
  courses: Course[]
  gpa: number
  totalCredits: number
  status: "completed" | "in-progress" | "upcoming"
  startDate: string
  endDate: string
}

export interface AcademicRecord {
  studentName: string
  admissionNumber: string
  program: string
  faculty: string
  department: string
  currentLevel: string
  admissionDate: string
  expectedGraduationDate: string
  semesters: Semester[]
  cgpa: number
  totalCreditHours: number
  scholarships?: string[]
  specialAwards?: string[]
}

export interface GradeDistribution {
  grade: string
  count: number
  percentage: number
}

export interface TranscriptRequest {
  id: string
  type: "official" | "unofficial"
  copies: number
  purpose: string
  destination?: string
  requestDate: string
  status: "pending" | "processing" | "ready" | "collected" | "rejected"
  collectionMethod: "pickup" | "delivery"
  deliveryAddress?: string
  expedited: boolean
  fee: number
  paymentStatus: "unpaid" | "paid" | "failed"
  paymentReference?: string
  estimatedReadyDate?: string
  actualReadyDate?: string
  collectionDate?: string
}

export interface GradeAppeal {
  id: string
  courseId: string
  courseName: string
  courseCode: string
  currentGrade: string
  expectedGrade: string
  reason: string
  supportingDocuments: string[]
  status: "draft" | "submitted" | "under-review" | "approved" | "rejected"
  submissionDate: string
  decisionDate?: string
  decisionReason?: string
  facultyFeedback?: string
}

export interface GradePoint {
  semester: string
  gpa: number
  cgpa: number
}

export interface GradeCalculation {
  courseCode: string
  courseName: string
  credits: number
  expectedGrade: string
  gradePoints: number
  weightedPoints: number
}

export interface GradingSystem {
  grade: string
  minScore: number
  maxScore: number
  points: number
  description: string
}

export interface AcademicStanding {
  cgpa: number
  classification: string
  status: "good" | "warning" | "probation"
  honorsEligible: boolean
}

export interface TranscriptData {
  studentInfo: {
    name: string
    registrationNumber: string
    program: string
    faculty: string
    admissionDate: string
    graduationDate?: string
  }
  semesters: Semester[]
  cgpa: number
  totalCredits: number
  academicStanding: AcademicStanding
  certifications?: string[]
  specialNotes?: string[]
}
