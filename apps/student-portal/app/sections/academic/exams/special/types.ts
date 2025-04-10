import type { ReactNode } from "react"

export type SpecialExamRequest = {
  id: string
  type: "deferred" | "special-sitting" | "supplementary"
  course: string
  courseCode: string
  originalExamDate?: string
  requestedDate?: string
  reason: string
  status: "pending" | "approved" | "rejected" | "draft" | "under-review" | "awaiting-payment" | "scheduled"
  submittedDate: string
  supportingDocuments: SupportingDocument[]
  feedback?: string
  approvedBy?: string
  approvalDate?: string
  fee?: string
  paymentStatus?: "paid" | "pending" | "waived" | "partial"
  paymentMethod?: "mpesa" | "bank-transfer" | "cash" | "card" | "equity" | "kcb" | "coop"
  paymentReference?: string
  paymentDate?: string
  examDate?: string
  examVenue?: string
  examTime?: string
  invigilator?: string
  applicationSteps?: ApplicationStep[]
  academicYear?: string
  semester?: string
  gradeBeforeExam?: string
  gradeAfterExam?: string
  maxPossibleGrade?: string
  departmentApproval?: ApprovalStatus
  facultyApproval?: ApprovalStatus
  examsOfficeApproval?: ApprovalStatus
  appealDetails?: AppealDetails
  lastUpdated?: string
  deadlineDate?: string
  studentId?: string
  studentName?: string
  studentEmail?: string
  studentPhone?: string
  faculty?: string
  department?: string
  programmeOfStudy?: string
  yearOfStudy?: number
  semesterOfStudy?: number
}

export type RequestCardProps = {
  request: SpecialExamRequest
  onSelect: (request: SpecialExamRequest) => void
  onPayment: (request: SpecialExamRequest) => void
  onAppeal: (request: SpecialExamRequest) => void
  onPrint: (request: SpecialExamRequest) => void
  onCancel: (request: SpecialExamRequest) => void
}

export type SupportingDocument = {
  id: string
  name: string
  type: string
  size: string
  uploadDate: string
  status: "uploaded" | "verified" | "rejected" | "pending-verification"
  notes?: string
  requiredFor?: ("supplementary" | "deferred" | "special-sitting")[]
  isRequired?: boolean
}

export type ApplicationStep = {
  id: number
  name: string
  status: "completed" | "current" | "upcoming" | "skipped"
  date?: string
  notes?: string
}

export type ApprovalStatus = {
  status: "pending" | "approved" | "rejected" | "awaiting-documents" | "under-review"
  approver?: string
  date?: string
  comments?: string
}

export type AppealDetails = {
  appealDate: string
  reason: string
  status: "pending" | "approved" | "rejected"
  response?: string
  responseDate?: string
}

export type CourseResult = {
  courseCode: string
  courseName: string
  grade: string
  score: number
  credits: number
  status: "passed" | "failed" | "incomplete" | "withdrawn"
  academicYear: string
  semester: string
  examDate: string
  retakeEligible: boolean
  supplementaryEligible: boolean
  specialExamFee: string
}

export type PaymentMethod = {
  id: string
  name: string
  icon: ReactNode
  instructions: string
  processingTime: string
  additionalFee?: string
  accountNumber?: string
  paybillNumber?: string
}

export type FailedCourse = {
  code: string
  name: string
  grade: string
  units: number
  semester: string
  eligibleForSupplementary: boolean
  maxPossibleGrade?: string
  examDate?: string
  venue?: string
}

export type FeeStructureItem = {
  examType: string
  fee: number
  currency: string
  notes: string
  academicYear?: string
  deadlineInfo?: string
}

export type PreviousApplication = {
  id: string
  type: string
  course: string
  date: string
  status: string
  paymentStatus: string
  examDate: string
  venue?: string
  time?: string
  applicationSteps?: ApplicationStep[]
}

export type DocumentRequirement = {
  id: string
  name: string
  description: string
  required: boolean
  acceptedFormats: string[]
  maxSize: string
  examples?: string[]
}

