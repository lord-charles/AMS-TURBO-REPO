"use client"

import { useState, useEffect, useMemo } from "react"
import {
  BookOpen,
  Calendar,
  Clock,
  Download,
  Info,
  Loader2,
  MapPin,
  Search,
  User,
  Filter,
  Bell,
  BarChart3,
  ChevronDown,
  ExternalLink,
  BellRing,
} from "lucide-react"
import { format, parseISO, isBefore, isAfter, differenceInHours, addHours } from "date-fns"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useMediaQuery } from "@/hooks/use-media-query"

interface ExamsViewProps {
  searchQuery: string
  semester: string
}

type Exam = {
  id: string
  title: string
  course: string
  courseCode: string
  date: string
  startTime: string
  endTime: string
  duration: string
  location: string
  room: string
  status: "upcoming" | "completed" | "missed" | "cancelled" | "rescheduled" | "postponed"
  type: "main" | "cat" | "quiz" | "practical" | "oral" | "project-defense"
  materials?: string[]
  grade?: string | null
  feedback?: string
  seatNumber?: string
  examiner: string
  weight: number
  prerequisites?: string[]
  clearanceStatus?: "cleared" | "pending" | "not-cleared"
  clearanceIssues?: string[]
  studyResources?: { title: string; type: string; url: string }[]
  semester: string
  academicYear: string
  faculty: string
  department: string
  venueMap?: string
  invigilators?: string[]
  specialInstructions?: string[]
  pastPerformance?: {
    semesterName: string
    grade: string
    score: number
  }[]
  classAverageScore?: number
  examRules?: string[]
  rubric?: {
    criteria: string
    weight: number
    score?: number
  }[]
}

export function ExamsView({ searchQuery: initialSearchQuery, semester }: ExamsViewProps) {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [searchSeatQuery, setSearchSeatQuery] = useState("")
  const [selectedSemester, setSelectedSemester] = useState<string>("current")
  const [selectedExamType, setSelectedExamType] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(false)
  const [countdown, setCountdown] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const isMobile = useMediaQuery("(max-width: 768px)")
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery)

  // Mock exams data with Kenyan university context
  const exams: Exam[] = [
    {
      id: "exam1",
      title: "End-Semester Examination",
      course: "Data Structures & Algorithms",
      courseCode: "CSC 3101",
      date: "2023-12-14T09:00:00",
      startTime: "09:00",
      endTime: "12:00",
      duration: "3 hours",
      location: "Science Complex",
      room: "Block A, Ground Floor",
      status: "upcoming",
      type: "main",
      materials: ["Textbook chapters 1-12", "Class notes", "No calculators allowed", "Student ID card required"],
      examiner: "Dr. Sarah Johnson",
      weight: 70,
      seatNumber: "A-45",
      clearanceStatus: "cleared",
      prerequisites: ["Student ID Card", "Exam Fee Payment", "Course Registration Slip"],
      studyResources: [
        { title: "Past Papers (2018-2022)", type: "pdf", url: "/academic/resources/CSC3101_past_papers.pdf" },
        { title: "Revision Notes", type: "pdf", url: "/academic/resources/CSC3101_revision.pdf" },
        { title: "Topic Review Videos", type: "video", url: "https://university.edu/videos/CSC3101" },
      ],
      semester: "September-December",
      academicYear: "2023/2024",
      faculty: "School of Computing and Informatics",
      department: "Computer Science",
      venueMap: "/maps/science_complex.jpg",
      invigilators: ["Dr. Sarah Johnson", "Prof. James Wilson", "Mr. David Kimathi"],
      specialInstructions: [
        "Arrive 30 minutes before exam start time",
        "Bring two blue or black pens",
        "Leave bags and electronic devices at the front of the examination room",
        "Raise hand for any questions or assistance needed during the exam",
      ],
      examRules: [
        "No communication with other candidates",
        "No leaving the examination room during the first hour and the last 30 minutes",
        "All rough work must be done in the answer booklet and crossed out",
        "Ensure your student ID number is written on all answer booklets",
      ],
    },
    {
      id: "exam2",
      title: "CAT 2",
      course: "Database Systems",
      courseCode: "BIS 3102",
      date: "2023-11-12T14:00:00",
      startTime: "14:00",
      endTime: "15:30",
      duration: "1.5 hours",
      location: "Business School",
      room: "LH 2, First Floor",
      status: "completed",
      type: "cat",
      materials: ["Open book", "No internet access"],
      grade: "B+",
      feedback:
        "Good understanding of SQL queries and database normalization. Need to improve on transaction management concepts and ACID properties.",
      examiner: "Prof. Michael Chen",
      weight: 15,
      semester: "September-December",
      academicYear: "2023/2024",
      faculty: "School of Business",
      department: "Information Systems",
      pastPerformance: [
        { semesterName: "Jan-Apr 2023", grade: "B", score: 68 },
        { semesterName: "Sep-Dec 2022", grade: "B+", score: 74 },
      ],
      classAverageScore: 65,
      rubric: [
        { criteria: "SQL Queries", weight: 40, score: 32 },
        { criteria: "Database Design", weight: 30, score: 24 },
        { criteria: "Normalization", weight: 30, score: 21 },
      ],
    },
    {
      id: "exam3",
      title: "CAT 1",
      course: "Discrete Mathematics",
      courseCode: "MAT 2101",
      date: addHours(new Date(), 30).toISOString(),
      startTime: "10:00",
      endTime: "12:00",
      duration: "2 hours",
      location: "Mathematics Building",
      room: "Hall 3, First Floor",
      status: "upcoming",
      type: "cat",
      materials: ["Scientific calculator allowed", "One-page formula sheet"],
      examiner: "Dr. Robert Williams",
      weight: 15,
      seatNumber: "B-23",
      clearanceStatus: "pending",
      clearanceIssues: ["Outstanding Library Fines"],
      studyResources: [
        { title: "Practice Questions", type: "pdf", url: "/academic/resources/MAT2101_practice.pdf" },
        { title: "Formula Sheet", type: "pdf", url: "/academic/resources/MAT2101_formulas.pdf" },
      ],
      semester: "September-December",
      academicYear: "2023/2024",
      faculty: "School of Mathematics and Physics",
      department: "Mathematics",
    },
    {
      id: "exam4",
      title: "Oral Presentation",
      course: "Technical Communication",
      courseCode: "ENG 2103",
      date: "2023-11-15T14:00:00",
      startTime: "14:00",
      endTime: "16:30",
      duration: "15 minutes per student",
      location: "Humanities Building",
      room: "Presentation Room 1, Second Floor",
      status: "completed",
      type: "oral",
      materials: ["Presentation slides", "Demo materials if applicable"],
      grade: "A",
      feedback:
        "Excellent presentation skills with clear articulation and well-organized content. The visual aids enhanced understanding, and questions were answered with confidence and depth.",
      examiner: "Prof. Emily Parker",
      weight: 20,
      semester: "September-December",
      academicYear: "2023/2024",
      faculty: "School of Humanities",
      department: "Languages and Communication",
    },
    {
      id: "exam5",
      title: "CAT 1",
      course: "Computer Networks",
      courseCode: "CSC 2205",
      date: "2023-11-07T11:00:00",
      startTime: "11:00",
      endTime: "12:00",
      duration: "1 hour",
      location: "ICT Building",
      room: "Room 105, First Floor",
      status: "completed",
      type: "cat",
      grade: "B+",
      feedback:
        "Good understanding of network protocols and OSI model. Need improvement in subnetting and routing algorithms.",
      examiner: "Dr. James Wilson",
      weight: 15,
      semester: "September-December",
      academicYear: "2023/2024",
      faculty: "School of Computing and Informatics",
      department: "Computer Science",
      pastPerformance: [{ semesterName: "Jan-Apr 2023", grade: "B", score: 65 }],
      classAverageScore: 62,
    },
    {
      id: "exam6",
      title: "End-Semester Examination",
      course: "Data Structures & Algorithms",
      courseCode: "CSC 3101",
      date: "2023-12-15T09:00:00",
      startTime: "09:00",
      endTime: "12:00",
      duration: "3 hours",
      location: "Main Examination Hall",
      room: "Block A, Ground Floor",
      status: "upcoming",
      type: "main",
      materials: ["No materials allowed", "University ID required", "Approved scientific calculator only"],
      examiner: "Dr. Sarah Johnson",
      weight: 70,
      clearanceStatus: "not-cleared",
      clearanceIssues: ["Outstanding Tuition Fees", "Missing Course Registration"],
      studyResources: [
        { title: "Exam Format Guide", type: "pdf", url: "/academic/resources/CSC3101_format.pdf" },
        { title: "Study Group Schedule", type: "calendar", url: "/academic/calendar/CSC3101_study_group" },
      ],
      semester: "September-December",
      academicYear: "2023/2024",
      faculty: "School of Computing and Informatics",
      department: "Computer Science",
      specialInstructions: [
        "This examination covers all topics from week 1-14",
        "Answer all questions in Section A and any three from Section B",
        "Show all your work for full credit",
      ],
    },
    {
      id: "exam7",
      title: "End-Semester Examination",
      course: "Database Systems",
      courseCode: "BIS 3102",
      date: "2023-12-18T14:00:00",
      startTime: "14:00",
      endTime: "17:00",
      duration: "3 hours",
      location: "Main Examination Hall",
      room: "Block B, Ground Floor",
      status: "upcoming",
      type: "main",
      materials: ["One A4 sheet of handwritten notes allowed", "University ID required"],
      examiner: "Prof. Michael Chen",
      weight: 70,
      clearanceStatus: "cleared",
      studyResources: [
        { title: "Sample Questions", type: "pdf", url: "/academic/resources/BIS3102_samples.pdf" },
        { title: "Database Design Examples", type: "ppt", url: "/academic/resources/BIS3102_examples.ppt" },
      ],
      semester: "September-December",
      academicYear: "2023/2024",
      faculty: "School of Business",
      department: "Information Systems",
    },
    {
      id: "exam8",
      title: "Practical Examination",
      course: "Software Engineering",
      courseCode: "CSC 3205",
      date: "2023-12-05T13:00:00",
      startTime: "13:00",
      endTime: "16:00",
      duration: "3 hours",
      location: "Computer Laboratory",
      room: "Lab 3, Ground Floor",
      status: "upcoming",
      type: "practical",
      materials: [
        "No internet access except for specified repositories",
        "Personal notes allowed",
        "IDE and development tools will be provided",
      ],
      examiner: "Dr. Patricia Kamau",
      weight: 30,
      seatNumber: "PC-22",
      clearanceStatus: "cleared",
      studyResources: [
        { title: "Practice Lab Exercises", type: "zip", url: "/academic/resources/CSC3205_labs.zip" },
        { title: "Code Review Guidelines", type: "pdf", url: "/academic/resources/CSC3205_code_review.pdf" },
      ],
      semester: "September-December",
      academicYear: "2023/2024",
      faculty: "School of Computing and Informatics",
      department: "Computer Science",
    },
    {
      id: "exam9",
      title: "Project Defense",
      course: "Final Year Project",
      courseCode: "CSC 4100",
      date: "2023-12-12T10:00:00",
      startTime: "10:00",
      endTime: "11:00",
      duration: "60 minutes per student",
      location: "Department of Computer Science",
      room: "Conference Room, Third Floor",
      status: "upcoming",
      type: "project-defense",
      materials: [
        "Project report (3 copies)",
        "Presentation slides",
        "Working prototype/demo",
        "Source code repository access",
      ],
      examiner: "Dr. Caroline Muthoni, Prof. James Wilson, Dr. Sarah Johnson",
      weight: 100,
      semester: "September-December",
      academicYear: "2023/2024",
      faculty: "School of Computing and Informatics",
      department: "Computer Science",
      specialInstructions: [
        "30 minutes for presentation",
        "30 minutes for questions and answers",
        "Dress code: Formal business attire",
        "Arrive 30 minutes before your scheduled time",
      ],
    },
    {
      id: "exam10",
      title: "CAT 2",
      course: "Artificial Intelligence",
      courseCode: "CSC 4102",
      date: "2023-11-20T14:00:00",
      startTime: "14:00",
      endTime: "15:30",
      duration: "1.5 hours",
      location: "ICT Building",
      room: "LH 4, Second Floor",
      status: "upcoming",
      type: "cat",
      materials: ["One page of handwritten notes allowed", "Non-programmable calculator allowed"],
      examiner: "Dr. Bernard Otieno",
      weight: 15,
      clearanceStatus: "cleared",
      semester: "September-December",
      academicYear: "2023/2024",
      faculty: "School of Computing and Informatics",
      department: "Computer Science",
    },
    {
      id: "exam11",
      title: "Quiz 3",
      course: "Calculus II",
      courseCode: "MAT 1102",
      date: "2023-11-28T08:00:00",
      startTime: "08:00",
      endTime: "09:00",
      duration: "1 hour",
      location: "Mathematics Building",
      room: "Room 105, First Floor",
      status: "cancelled",
      type: "quiz",
      materials: ["Scientific calculator allowed", "No formula sheets allowed"],
      examiner: "Dr. Josephine Wanjiku",
      weight: 5,
      semester: "September-December",
      academicYear: "2023/2024",
      faculty: "School of Mathematics and Physics",
      department: "Mathematics",
    },
    {
      id: "exam12",
      title: "CAT 1",
      course: "Operating Systems",
      courseCode: "CSC 3103",
      date: "2023-11-05T08:00:00",
      startTime: "08:00",
      endTime: "09:30",
      duration: "1.5 hours",
      location: "ICT Building",
      room: "LH 2, First Floor",
      status: "missed",
      type: "cat",
      materials: ["Closed book", "No electronic devices allowed"],
      examiner: "Dr. Alex Mwangi",
      weight: 15,
      semester: "September-December",
      academicYear: "2023/2024",
      faculty: "School of Computing and Informatics",
      department: "Computer Science",
    },
  ]

  // Simulate loading
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Update countdown for selected exam
  useEffect(() => {
    if (!selectedExam) return

    const examDate = parseISO(selectedExam.date)
    if (isBefore(examDate, new Date())) return

    const interval = setInterval(() => {
      const now = new Date()
      const diff = examDate.getTime() - now.getTime()

      if (diff <= 0) {
        clearInterval(interval)
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setCountdown({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(interval)
  }, [selectedExam])

  // Filter exams based on search query and filters
  const filteredExams = useMemo(() => {
    return exams.filter((exam) => {
      // Search query filter
      const matchesSearch =
        exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.location.toLowerCase().includes(searchQuery.toLowerCase())

      // Semester filter
      const matchesSemester = selectedSemester === "all" || selectedSemester === "current"

      // Exam type filter
      const matchesType = selectedExamType === "all" || exam.type === selectedExamType

      // Status filter
      const matchesStatus = selectedStatus === "all" || exam.status === selectedStatus

      return matchesSearch && matchesSemester && matchesType && matchesStatus
    })
  }, [searchQuery, selectedSemester, selectedExamType, selectedStatus])

  // Filter exams based on selected tab
  const getExamsByTab = (tab: string) => {
    const now = new Date()

    switch (tab) {
      case "upcoming":
        return filteredExams.filter(
          (exam) => (exam.status === "upcoming" || exam.status === "rescheduled") && isAfter(parseISO(exam.date), now),
        )
      case "completed":
        return filteredExams.filter((exam) => exam.status === "completed")
      case "main":
        return filteredExams.filter((exam) => exam.type === "main")
      case "cat":
        return filteredExams.filter((exam) => exam.type === "cat" || exam.type === "quiz")
      case "all":
      default:
        return filteredExams
    }
  }

  const displayedExams = getExamsByTab(activeTab)

  // Get exam type badge
  const getExamTypeBadge = (type: string) => {
    switch (type) {
      case "cat":
        return <Badge className="bg-blue-500 hover:bg-blue-600">CAT</Badge>
      case "main":
        return <Badge className="bg-purple-500 hover:bg-purple-600">End Semester</Badge>
      case "quiz":
        return <Badge className="bg-green-500 hover:bg-green-600">Quiz</Badge>
      case "practical":
        return <Badge className="bg-amber-500 hover:bg-amber-600">Practical</Badge>
      case "oral":
        return (
          <Badge variant="outline" className="bg-pink-50 text-pink-700 dark:bg-pink-900 dark:text-pink-300">
            Oral
          </Badge>
        )
      case "project-defense":
        return (
          <Badge variant="outline" className="bg-indigo-50 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
            Project Defense
          </Badge>
        )
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  // Get exam status badge
  const getExamStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
            Upcoming
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600 dark:bg-green-900 dark:text-green-300">
            Completed
          </Badge>
        )
      case "missed":
        return <Badge variant="destructive">Missed</Badge>
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-600 dark:bg-red-900 dark:text-red-300">
            Cancelled
          </Badge>
        )
      case "rescheduled":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-600 dark:bg-amber-900 dark:text-amber-300">
            Rescheduled
          </Badge>
        )
      case "postponed":
        return (
          <Badge variant="outline" className="bg-orange-50 text-orange-600 dark:bg-orange-900 dark:text-orange-300">
            Postponed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Get clearance status badge
  const getClearanceStatusBadge = (status?: string) => {
    if (!status) return null

    switch (status) {
      case "cleared":
        return <Badge className="bg-green-500 hover:bg-green-600">Cleared</Badge>
      case "pending":
        return <Badge className="bg-amber-500 hover:bg-amber-600">Pending</Badge>
      case "not-cleared":
        return <Badge variant="destructive">Not Cleared</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Handle download exam materials
  const handleDownloadMaterials = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)

      toast({
        title: "Materials Downloaded",
        description: "Exam materials have been downloaded successfully.",
      })
    }, 2000)
  }

  // Handle set reminder
  const handleSetReminder = () => {
    if (!selectedExam) return

    toast({
      title: "Reminder Set",
      description: `You'll be reminded about ${selectedExam.title} 24 hours before the exam.`,
    })
  }

  // Generate seating chart data
  const generateSeatingChart = () => {
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H"]
    const seatsPerRow = 10
    const seatingData: {
      seat: string
      student: string | null
      status: "occupied" | "available" | "reserved" | "highlighted"
    }[] = []

    rows.forEach((row) => {
      for (let i = 1; i <= seatsPerRow; i++) {
        const seatId = `${row}-${i < 10 ? "0" + i : i}`
        const isHighlighted = selectedExam?.seatNumber === seatId

        // Randomly assign some seats as occupied or reserved
        const random = Math.random()
        let status: "occupied" | "available" | "reserved" | "highlighted" = "available"
        let student: string | null = null

        if (isHighlighted) {
          status = "highlighted"
          student = "You"
        } else if (random < 0.6) {
          status = "occupied"
          student = `Student ${Math.floor(Math.random() * 1000)}`
        } else if (random < 0.7) {
          status = "reserved"
          student = null
        }

        seatingData.push({
          seat: seatId,
          student,
          status,
        })
      }
    })

    return seatingData
  }

  // Filter seating data based on search
  const filterSeatingData = (data: any[]) => {
    if (!searchSeatQuery) return data

    return data.filter(
      (item) =>
        item.seat.toLowerCase().includes(searchSeatQuery.toLowerCase()) ||
        (item.student && item.student.toLowerCase().includes(searchSeatQuery.toLowerCase())),
    )
  }

  // Reset filters
  const handleResetFilters = () => {
    setSelectedSemester("current")
    setSelectedExamType("all")
    setSelectedStatus("all")

    toast({
      title: "Filters Reset",
      description: "All exam filters have been reset to default values.",
    })
  }

  return (
    <div className="space-y-6">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Loading exams and assessments...</p>
        </div>
      ) : (
        <>
          {/* Top alerts section - upcoming urgent exams */}
          {getExamsByTab("upcoming").some((exam) => differenceInHours(parseISO(exam.date), new Date()) <= 48) && (
            <Alert className="bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/30 dark:border-amber-800 dark:text-amber-300">
              <BellRing className="h-4 w-4" />
              <AlertTitle>Upcoming Exams in the Next 48 Hours</AlertTitle>
              <AlertDescription>
                <ul className="list-disc list-inside mt-2">
                  {getExamsByTab("upcoming")
                    .filter((exam) => differenceInHours(parseISO(exam.date), new Date()) <= 48)
                    .map((exam) => (
                      <li key={exam.id} className="mb-1">
                        <span className="font-medium">
                          {exam.title} ({exam.courseCode})
                        </span>
                        : {format(parseISO(exam.date), "EEEE, MMMM d")} at {exam.startTime}{" "}
                        {exam.location && `(${exam.location})`}
                        <Button
                          variant="link"
                          size="sm"
                          className="p-0 h-auto ml-2 text-amber-800 dark:text-amber-300"
                          onClick={() => setSelectedExam(exam)}
                        >
                          View Details
                        </Button>
                      </li>
                    ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {/* Filters and controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <div className="relative w-full sm:w-[300px]">
                <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search exams by course, title..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Button variant="outline" size="sm" className="mt-2 sm:mt-0" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="mr-2 h-4 w-4" />
                Filters
                {(selectedSemester !== "current" || selectedExamType !== "all" || selectedStatus !== "all") && (
                  <Badge variant="secondary" className="ml-2">
                    !
                  </Badge>
                )}
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span className="hidden md:inline">Calendar View</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View exams in calendar format</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      <span className="hidden md:inline">Exam Statistics</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View overall exam statistics and performance</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Collapsible Filters Section */}
          <Collapsible open={showFilters} onOpenChange={setShowFilters}>
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between">
                Exam Filters
                <ChevronDown className="h-4 w-4 shrink-0 opacity-50 transition-transform duration-300 peer-data-[state=open]:rotate-180" />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Semester Filter */}
                <div>
                  <h4 className="text-sm font-medium leading-none mb-2">Semester</h4>
                  <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Semester" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Semesters</SelectItem>
                      <SelectItem value="current">Current Semester</SelectItem>
                      <SelectItem value="previous">Previous Semester</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Exam Type Filter */}
                <div>
                  <h4 className="text-sm font-medium leading-none mb-2">Exam Type</h4>
                  <Select value={selectedExamType} onValueChange={setSelectedExamType}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Exam Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="main">End Semester</SelectItem>
                      <SelectItem value="cat">CAT</SelectItem>
                      <SelectItem value="quiz">Quiz</SelectItem>
                      <SelectItem value="practical">Practical</SelectItem>
                      <SelectItem value="oral">Oral</SelectItem>
                      <SelectItem value="project-defense">Project Defense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Exam Status Filter */}
                <div>
                  <h4 className="text-sm font-medium leading-none mb-2">Exam Status</h4>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Exam Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="missed">Missed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="rescheduled">Rescheduled</SelectItem>
                      <SelectItem value="postponed">Postponed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Reset Filters Button */}
              <Button variant="ghost" size="sm" className="mt-4" onClick={handleResetFilters}>
                Reset Filters
              </Button>
            </CollapsibleContent>
          </Collapsible>

          {/* Exam Tabs */}
          <Tabs defaultValue="upcoming" className="space-y-4" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="main">End Semester</TabsTrigger>
              <TabsTrigger value="cat">CATs/Quizzes</TabsTrigger>
              <TabsTrigger value="all">All Exams</TabsTrigger>
            </TabsList>

            {/* Exam List */}
            <TabsContent value={activeTab} className="space-y-4">
              {displayedExams.length === 0 ? (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>No exams found</AlertTitle>
                  <AlertDescription>
                    There are no exams matching your search criteria or selected filters.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {displayedExams.map((exam) => (
                    <Card key={exam.id} className="bg-card text-card-foreground shadow-sm">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold">{exam.title}</CardTitle>
                        <CardDescription>
                          {exam.course} ({exam.courseCode})
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{format(parseISO(exam.date), "EEEE, MMMM d, yyyy")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>
                            {exam.startTime} - {exam.endTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>
                            {exam.location}, {exam.room}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {getExamTypeBadge(exam.type)}
                          {getExamStatusBadge(exam.status)}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <Button variant="secondary" size="sm" onClick={() => setSelectedExam(exam)}>
                          View Details
                        </Button>
                        {exam.status === "upcoming" && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm" onClick={handleSetReminder}>
                                  <Bell className="h-4 w-4" />
                                  <span className="sr-only">Set Reminder</span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Set a reminder for this exam</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Exam Details Dialog */}
          <Dialog open={!!selectedExam} onOpenChange={() => setSelectedExam(null)}>
            <DialogContent className="sm:max-w-[825px]">
              <DialogHeader>
                <DialogTitle>{selectedExam?.title}</DialogTitle>
                <DialogDescription>
                  {selectedExam?.course} ({selectedExam?.courseCode}) - {selectedExam?.academicYear}
                </DialogDescription>
              </DialogHeader>

              <ScrollArea className="h-[70vh] w-full">
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Exam Information</CardTitle>
                        <CardDescription>Details about the exam</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {selectedExam ? format(parseISO(selectedExam.date), "EEEE, MMMM d, yyyy") : "N/A"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>
                            {selectedExam?.startTime} - {selectedExam?.endTime} ({selectedExam?.duration})
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>
                            {selectedExam?.location}, {selectedExam?.room}
                          </span>
                        </div>
                        {selectedExam?.venueMap && (
                          <div className="flex items-center gap-2">
                            <ExternalLink className="h-4 w-4" />
                            <a
                              href={selectedExam.venueMap}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              View Venue Map
                            </a>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>Examiner: {selectedExam?.examiner}</span>
                        </div>
                        {selectedExam?.invigilators && selectedExam?.invigilators.length > 0 && (
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>Invigilators: {selectedExam?.invigilators.join(", ")}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4" />
                          <span>Weight: {selectedExam?.weight}%</span>
                        </div>
                        {selectedExam?.specialInstructions && selectedExam?.specialInstructions.length > 0 && (
                          <div className="space-y-1">
                            <h4 className="text-sm font-medium">Special Instructions:</h4>
                            <ul className="list-disc list-inside">
                              {selectedExam.specialInstructions.map((instruction, index) => (
                                <li key={index}>{instruction}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {selectedExam?.examRules && selectedExam?.examRules.length > 0 && (
                          <div className="space-y-1">
                            <h4 className="text-sm font-medium">Exam Rules:</h4>
                            <ul className="list-disc list-inside">
                              {selectedExam.examRules.map((rule, index) => (
                                <li key={index}>{rule}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {selectedExam?.status === "upcoming" && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Time Until Exam</CardTitle>
                          <CardDescription>Countdown to the exam</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center space-y-2">
                          <div className="flex items-center gap-4">
                            <div>
                              <div className="font-bold text-2xl">{countdown.days}</div>
                              <div className="text-sm text-muted-foreground">Days</div>
                            </div>
                            <div>
                              <div className="font-bold text-2xl">{countdown.hours}</div>
                              <div className="text-sm text-muted-foreground">Hours</div>
                            </div>
                            <div>
                              <div className="font-bold text-2xl">{countdown.minutes}</div>
                              <div className="text-sm text-muted-foreground">Minutes</div>
                            </div>
                            <div>
                              <div className="font-bold text-2xl">{countdown.seconds}</div>
                              <div className="text-sm text-muted-foreground">Seconds</div>
                            </div>
                          </div>
                          <Progress value={100 - (countdown.days / 30) * 100} className="w-full" />
                        </CardContent>
                      </Card>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedExam?.materials && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Exam Materials</CardTitle>
                          <CardDescription>Required and recommended materials</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <ul className="list-disc list-inside">
                            {selectedExam.materials.map((material, index) => (
                              <li key={index}>{material}</li>
                            ))}
                          </ul>
                          <Button variant="secondary" onClick={handleDownloadMaterials} disabled={isLoading}>
                            {isLoading ? (
                              <>
                                Downloading...
                                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                              </>
                            ) : (
                              <>
                                <Download className="mr-2 h-4 w-4" />
                                Download All Materials
                              </>
                            )}
                          </Button>
                        </CardContent>
                      </Card>
                    )}

                    {selectedExam?.studyResources && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Study Resources</CardTitle>
                          <CardDescription>Helpful resources for exam preparation</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <ul className="list-disc list-inside">
                            {selectedExam.studyResources.map((resource, index) => (
                              <li key={index}>
                                <a
                                  href={resource.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-500 hover:underline"
                                >
                                  {resource.title} ({resource.type})
                                </a>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    )}
                  </div>

                  {selectedExam?.clearanceStatus && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Clearance Status</CardTitle>
                        <CardDescription>Your clearance status for this exam</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center gap-2">
                          {getClearanceStatusBadge(selectedExam.clearanceStatus)}
                        </div>
                        {selectedExam.clearanceIssues && selectedExam.clearanceIssues.length > 0 && (
                          <div className="space-y-1">
                            <h4 className="text-sm font-medium">Clearance Issues:</h4>
                            <ul className="list-disc list-inside">
                              {selectedExam.clearanceIssues.map((issue, index) => (
                                <li key={index}>{issue}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}

                  {selectedExam?.seatNumber && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Seating Arrangement</CardTitle>
                        <CardDescription>Find your seat for the exam</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="relative">
                          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            type="search"
                            placeholder="Search by seat or student..."
                            className="pl-8"
                            value={searchSeatQuery}
                            onChange={(e) => setSearchSeatQuery(e.target.value)}
                          />
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full table-auto border-collapse border border-slate-400 dark:border-slate-500">
                            <thead>
                              <tr>
                                <th className="border border-slate-300 dark:border-slate-600 p-2 text-left">Seat</th>
                                <th className="border border-slate-300 dark:border-slate-600 p-2 text-left">Student</th>
                                <th className="border border-slate-300 dark:border-slate-600 p-2 text-left">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filterSeatingData(generateSeatingChart()).map((seat, index) => (
                                <tr
                                  key={index}
                                  className={seat.status === "highlighted" ? "bg-amber-100 dark:bg-amber-800" : ""}
                                >
                                  <td className="border border-slate-300 dark:border-slate-600 p-2">{seat.seat}</td>
                                  <td className="border border-slate-300 dark:border-slate-600 p-2">
                                    {seat.student || "Available"}
                                  </td>
                                  <td className="border border-slate-300 dark:border-slate-600 p-2">{seat.status}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {selectedExam?.feedback && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Feedback</CardTitle>
                        <CardDescription>Feedback from the examiner</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>{selectedExam.feedback}</p>
                      </CardContent>
                    </Card>
                  )}

                  {selectedExam?.pastPerformance && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Past Performance</CardTitle>
                        <CardDescription>Your performance in previous semesters</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <table className="w-full table-auto">
                          <thead>
                            <tr>
                              <th className="text-left font-medium">Semester</th>
                              <th className="text-left font-medium">Grade</th>
                              <th className="text-left font-medium">Score</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedExam.pastPerformance.map((performance, index) => (
                              <tr key={index}>
                                <td>{performance.semesterName}</td>
                                <td>{performance.grade}</td>
                                <td>{performance.score}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {selectedExam.classAverageScore && <p>Class Average Score: {selectedExam.classAverageScore}</p>}
                      </CardContent>
                    </Card>
                  )}

                  {selectedExam?.rubric && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Rubric</CardTitle>
                        <CardDescription>Grading criteria for the exam</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <table className="w-full table-auto">
                          <thead>
                            <tr>
                              <th className="text-left font-medium">Criteria</th>
                              <th className="text-left font-medium">Weight</th>
                              <th className="text-left font-medium">Score</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedExam.rubric.map((rubric, index) => (
                              <tr key={index}>
                                <td>{rubric.criteria}</td>
                                <td>{rubric.weight}%</td>
                                <td>{rubric.score || "N/A"}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </ScrollArea>

              <DialogFooter>
                <Button type="button" variant="secondary" onClick={() => setSelectedExam(null)}>
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  )
}

