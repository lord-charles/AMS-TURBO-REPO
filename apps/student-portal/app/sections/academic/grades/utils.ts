import type { Course, Semester, AcademicRecord } from "./types"
import { gradingSystem } from "./mock-data"

// Calculate GPA for a list of courses
export const calculateGPA = (courses: Course[]): number => {
  if (!courses.length) return 0

  const completedCourses = courses.filter((course) => course.status === "completed" && course.grade)

  if (!completedCourses.length) return 0

  let totalPoints = 0
  let totalCredits = 0

  completedCourses.forEach((course) => {
    const gradeInfo = gradingSystem.find((g) => g.grade === course.grade)
    if (gradeInfo) {
      totalPoints += gradeInfo.points * course.credits
      totalCredits += course.credits
    }
  })

  return totalCredits > 0 ? Number.parseFloat((totalPoints / totalCredits).toFixed(2)) : 0
}

// Calculate CGPA for multiple semesters
export const calculateCGPA = (allCourses: Course[]): number => {
  return calculateGPA(allCourses)
}

// Get grade points for a grade
export const getGradePoints = (grade: string): number => {
  const gradeInfo = gradingSystem.find((g) => g.grade === grade)
  return gradeInfo ? gradeInfo.points : 0
}

// Get grade from score
export const getGradeFromScore = (score: number): string => {
  const gradeInfo = gradingSystem.find((g) => score >= g.minScore && score <= g.maxScore)
  return gradeInfo ? gradeInfo.grade : "N/A"
}

// Get grade description
export const getGradeDescription = (grade: string): string => {
  const gradeInfo = gradingSystem.find((g) => g.grade === grade)
  return gradeInfo ? gradeInfo.description : "N/A"
}

// Calculate weighted points
export const calculateWeightedPoints = (credits: number, grade: string): number => {
  const points = getGradePoints(grade)
  return Number.parseFloat((points * credits).toFixed(2))
}

// Get academic standing based on CGPA
export const getAcademicStanding = (cgpa: number): string => {
  if (cgpa >= 3.7) return "First Class Honors"
  if (cgpa >= 3.0) return "Second Class Upper Division"
  if (cgpa >= 2.0) return "Second Class Lower Division"
  if (cgpa >= 1.0) return "Pass"
  return "Fail"
}

// Check if student is on academic warning
export const isOnAcademicWarning = (cgpa: number): boolean => {
  return cgpa < 2.0 && cgpa >= 1.5
}

// Check if student is on academic probation
export const isOnAcademicProbation = (cgpa: number): boolean => {
  return cgpa < 1.5
}

// Format date to local string
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

// Get semester progress percentage
export const getSemesterProgress = (startDate: string, endDate: string): number => {
  const start = new Date(startDate).getTime()
  const end = new Date(endDate).getTime()
  const now = new Date().getTime()

  if (now <= start) return 0
  if (now >= end) return 100

  const total = end - start
  const elapsed = now - start
  return Math.round((elapsed / total) * 100)
}

// Calculate what-if GPA
export const calculateWhatIfGPA = (
  existingCourses: Course[],
  newCourses: { credits: number; grade: string }[],
): number => {
  const allCourses = [
    ...existingCourses.filter((course) => course.status === "completed" && course.grade),
    ...newCourses.map((course, index) => ({
      id: `what-if-${index}`,
      code: `WI-${index}`,
      title: `What-If Course ${index + 1}`,
      credits: course.credits,
      grade: course.grade,
      status: "completed" as const,
      semester: "What-If",
      academicYear: "What-If",
    })),
  ]

  return calculateGPA(allCourses)
}

// Get honors eligibility
export const getHonorsEligibility = (cgpa: number, failedCourses: number): boolean => {
  return cgpa >= 3.0 && failedCourses === 0
}

// Get transcript verification URL
export const getTranscriptVerificationURL = (registrationNumber: string): string => {
  return `https://university.ac.ke/verify?reg=${registrationNumber}&type=transcript`
}

// Calculate total credits
export const calculateTotalCredits = (courses: Course[]): number => {
  return courses.filter((course) => course.status === "completed").reduce((total, course) => total + course.credits, 0)
}

// Get payment status class
export const getPaymentStatusClass = (status: string): string => {
  switch (status) {
    case "paid":
      return "text-green-600 bg-green-100"
    case "pending":
      return "text-yellow-600 bg-yellow-100"
    case "failed":
      return "text-red-600 bg-red-100"
    default:
      return "text-gray-600 bg-gray-100"
  }
}

// Get request status class
export const getRequestStatusClass = (status: string): string => {
  switch (status) {
    case "completed":
      return "text-green-600 bg-green-100"
    case "processing":
      return "text-blue-600 bg-blue-100"
    case "pending":
      return "text-yellow-600 bg-yellow-100"
    case "rejected":
      return "text-red-600 bg-red-100"
    default:
      return "text-gray-600 bg-gray-100"
  }
}

// Get appeal status class
export const getAppealStatusClass = (status: string): string => {
  switch (status) {
    case 'approved':
      return 'text-green-600 bg-green-100'
    case 'pending':
      return 'text-yellow-600 bg-yellow-100'
    case 'rejected':
      return 'text-red-600 bg-red-100'
    default:
      return 'text-gray-600 bg-gray-100'
  }
}

// Get current semester
export const getCurrentSemester = (academicRecord: AcademicRecord): Semester | undefined => {
  return academicRecord.semesters.find(semester => semester.status === "in-progress")
}

// Get past semesters
export const getPastSemesters = (academicRecord: AcademicRecord): Semester[] => {
  return academicRecord.semesters
    .filter(semester => semester.status === "completed")
    .sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime())
}

// Check if student is on academic warning
export const isOnAcademicWarningSemesters = (semesters: Semester[]): boolean => {
  const lastTwoSemesters = semesters
    .filter(sem => sem.status === "completed")
    .sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime())
    .slice(0, 2)

  return lastTwoSemesters.some(sem => sem.gpa < 2.0)
}

// Get honors status
export const getHonorsStatus = (cgpa: number): string => {
  if (cgpa >= 3.75) return "First Class Honors"
  if (cgpa >= 3.25) return "Second Class Upper"
  if (cgpa >= 2.75) return "Second Class Lower"
  if (cgpa >= 2.0) return "Pass"
  return "Academic Warning"
}

// Get grade color based on grade
export const getGradeColor = (grade: string): string => {
  switch (grade?.toUpperCase()) {
    case 'A':
      return 'text-green-600 dark:text-green-400'
    case 'B+':
    case 'B':
      return 'text-blue-600 dark:text-blue-400'
    case 'C+':
    case 'C':
      return 'text-yellow-600 dark:text-yellow-400'
    case 'D+':
    case 'D':
      return 'text-orange-600 dark:text-orange-400'
    case 'E':
      return 'text-red-600 dark:text-red-400'
    default:
      return 'text-gray-600 dark:text-gray-400'
  }
}

export const formatRequestStatus = (status: string): { label: string; color: string } => {
  switch (status) {
    case "pending":
      return { label: "Pending", color: "bg-yellow-100 text-yellow-800" }
    case "processing":
      return { label: "Processing", color: "bg-blue-100 text-blue-800" }
    case "ready":
      return { label: "Ready for Collection", color: "bg-green-100 text-green-800" }
    case "collected":
      return { label: "Collected", color: "bg-purple-100 text-purple-800" }
    case "rejected":
      return { label: "Rejected", color: "bg-red-100 text-red-800" }
    default:
      return { label: status, color: "bg-gray-100 text-gray-800" }
  }
}

export const calculateGradeDistribution = (courses: Course[]): Record<string, number> => {
  const distribution: Record<string, number> = {}
  
  courses.forEach((course) => {
    if (course.grade) {
      const gradeKey = course.grade.charAt(0).toUpperCase() // Get first letter of grade
      distribution[gradeKey] = (distribution[gradeKey] || 0) + 1
    }
  })

  return distribution
}
