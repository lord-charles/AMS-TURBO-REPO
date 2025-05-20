"use client"

import * as React from "react"
import {
  AlertCircle,
  Book,
  BookOpen,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  CreditCardIcon,
  Download,
  ExternalLink,
  Eye,
  FileText,
  Filter,
  GraduationCap,
  Info,
  Loader2,
  MapPin,
  MoreHorizontal,
  Search,
  SortAsc,
  Upload,
} from "lucide-react"
import { format, isBefore, parseISO } from "date-fns"
import { cn } from "@/lib/utils"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useMediaQuery } from "@/hooks/use-media-query"

// Types for our data models
type Course = {
  id: string
  code: string
  name: string
  instructor: string
  credits: number
  schedule: string
  location: string
  progress: number
  grade: string
  status: string
}

type Assignment = {
  id: string
  title: string
  course: string
  dueDate: string
  status: string
  progress?: number
  description: string
  attachments: number
  submittedDate?: string
  grade?: string | null
  feedback?: string
}

type Exam = {
  id: string
  title: string
  course: string
  date: string
  duration: string
  location: string
  status: string
  materials?: string[]
  grade?: string
  feedback?: string
}

type CalendarEvent = {
  id: string
  title: string
  date: string
  endDate?: string
  category: string
}

type LearningMaterial = {
  id: string
  title: string
  course: string
  type: string
  author: string
  uploadDate: string
  fileSize: string
  fileType: string
  duration?: string
}

// Mock data
const mockData = {
  courses: [
    {
      id: "cs301",
      code: "CS301",
      name: "Data Structures & Algorithms",
      instructor: "Dr. Sarah Johnson",
      credits: 4,
      schedule: "Mon, Wed 10:00 AM - 11:30 AM",
      location: "Block B, Room 203",
      progress: 65,
      grade: "B+",
      status: "in-progress",
    },
    {
      id: "cs305",
      code: "CS305",
      name: "Database Systems",
      instructor: "Prof. Michael Chen",
      credits: 3,
      schedule: "Tue, Thu 2:00 PM - 3:30 PM",
      location: "Computer Lab 2",
      progress: 70,
      grade: "A-",
      status: "in-progress",
    },
    {
      id: "math201",
      code: "MATH201",
      name: "Discrete Mathematics",
      instructor: "Dr. Robert Williams",
      credits: 3,
      schedule: "Mon, Fri 9:00 AM - 10:30 AM",
      location: "Block A, Room 105",
      progress: 55,
      grade: "B",
      status: "in-progress",
    },
    {
      id: "eng203",
      code: "ENG203",
      name: "Technical Communication",
      instructor: "Prof. Emily Parker",
      credits: 2,
      schedule: "Wed 2:00 PM - 4:00 PM",
      location: "Block C, Room 110",
      progress: 80,
      grade: "A",
      status: "in-progress",
    },
    {
      id: "cs205",
      code: "CS205",
      name: "Computer Networks",
      instructor: "Dr. James Wilson",
      credits: 3,
      schedule: "Tue, Thu 11:00 AM - 12:30 PM",
      location: "Block B, Room 105",
      progress: 60,
      grade: "B",
      status: "in-progress",
    },
  ],
  assignments: [
    {
      id: "assign1",
      title: "Algorithm Analysis Report",
      course: "CS301",
      dueDate: "2023-11-15T23:59:00",
      status: "in-progress",
      progress: 30,
      description: "Analyze the time and space complexity of sorting algorithms discussed in class.",
      attachments: 2,
    },
    {
      id: "assign2",
      title: "Database Design Project",
      course: "CS305",
      dueDate: "2023-11-20T23:59:00",
      status: "in-progress",
      progress: 60,
      description: "Design and implement a relational database for a university management system.",
      attachments: 3,
    },
    {
      id: "assign3",
      title: "Discrete Mathematics Problem Set",
      course: "MATH201",
      dueDate: "2023-11-10T23:59:00",
      status: "submitted",
      submittedDate: "2023-11-09T22:45:00",
      grade: null,
      description: "Solve problems on graph theory and combinatorics.",
      attachments: 1,
    },
    {
      id: "assign4",
      title: "Technical Report Writing",
      course: "ENG203",
      dueDate: "2023-11-05T23:59:00",
      status: "graded",
      submittedDate: "2023-11-04T20:30:00",
      grade: "A",
      feedback: "Excellent structure and clarity. Well researched.",
      description: "Write a technical report on an emerging technology of your choice.",
      attachments: 1,
    },
    {
      id: "assign5",
      title: "Network Protocols Analysis",
      course: "CS205",
      dueDate: "2023-11-25T23:59:00",
      status: "not-started",
      description: "Analyze and compare different network protocols discussed in class.",
      attachments: 0,
    },
  ],
  exams: [
    {
      id: "exam1",
      title: "Midterm Examination",
      course: "CS301",
      date: "2023-11-18T09:00:00",
      duration: "2 hours",
      location: "Examination Hall 1",
      status: "upcoming",
      materials: ["Textbook chapters 1-5", "Class notes", "No calculators allowed"],
    },
    {
      id: "exam2",
      title: "Database Systems Quiz",
      course: "CS305",
      date: "2023-11-12T14:00:00",
      duration: "1 hour",
      location: "Computer Lab 2",
      status: "upcoming",
      materials: ["Open book", "No internet access"],
    },
    {
      id: "exam3",
      title: "Discrete Mathematics Midterm",
      course: "MATH201",
      date: "2023-11-20T10:00:00",
      duration: "2 hours",
      location: "Examination Hall 2",
      status: "upcoming",
      materials: ["Scientific calculator allowed", "One-page formula sheet"],
    },
    {
      id: "exam4",
      title: "Technical Communication Presentation",
      course: "ENG203",
      date: "2023-11-15T14:00:00",
      duration: "15 minutes per student",
      location: "Presentation Room 1",
      status: "upcoming",
      materials: ["Presentation slides", "Demo materials if applicable"],
    },
    {
      id: "exam5",
      title: "Computer Networks Quiz 1",
      course: "CS205",
      date: "2023-11-07T11:00:00",
      duration: "45 minutes",
      location: "Block B, Room 105",
      status: "completed",
      grade: "B+",
      feedback: "Good understanding of core concepts. Need improvement in protocol details.",
    },
  ],
  academicCalendar: [
    {
      id: "cal1",
      title: "Fall Semester Begins",
      date: "2023-09-01",
      category: "semester",
    },
    {
      id: "cal2",
      title: "Last Day to Add/Drop Courses",
      date: "2023-09-15",
      category: "registration",
    },
    {
      id: "cal3",
      title: "Midterm Examination Week",
      date: "2023-11-15",
      endDate: "2023-11-22",
      category: "exam",
    },
    {
      id: "cal4",
      title: "Thanksgiving Break",
      date: "2023-11-23",
      endDate: "2023-11-26",
      category: "holiday",
    },
    {
      id: "cal5",
      title: "Last Day of Classes",
      date: "2023-12-10",
      category: "semester",
    },
    {
      id: "cal6",
      title: "Final Examination Week",
      date: "2023-12-12",
      endDate: "2023-12-19",
      category: "exam",
    },
    {
      id: "cal7",
      title: "Winter Break Begins",
      date: "2023-12-20",
      category: "holiday",
    },
    {
      id: "cal8",
      title: "Spring Semester Begins",
      date: "2024-01-15",
      category: "semester",
    },
  ],
  learningMaterials: [
    {
      id: "mat1",
      title: "Introduction to Algorithms",
      course: "CS301",
      type: "textbook",
      author: "Thomas H. Cormen, et al.",
      uploadDate: "2023-09-05",
      fileSize: "8.5 MB",
      fileType: "pdf",
    },
    {
      id: "mat2",
      title: "Week 5: Sorting Algorithms",
      course: "CS301",
      type: "lecture-notes",
      author: "Dr. Sarah Johnson",
      uploadDate: "2023-10-10",
      fileSize: "2.3 MB",
      fileType: "pdf",
    },
    {
      id: "mat3",
      title: "Database Systems: Complete Concepts",
      course: "CS305",
      type: "textbook",
      author: "Abraham Silberschatz, et al.",
      uploadDate: "2023-09-03",
      fileSize: "10.2 MB",
      fileType: "pdf",
    },
    {
      id: "mat4",
      title: "SQL Tutorial Videos",
      course: "CS305",
      type: "video",
      author: "Prof. Michael Chen",
      uploadDate: "2023-10-15",
      fileSize: "250 MB",
      fileType: "mp4",
      duration: "45 minutes",
    },
    {
      id: "mat5",
      title: "Discrete Mathematics Handbook",
      course: "MATH201",
      type: "reference",
      author: "Dr. Robert Williams",
      uploadDate: "2023-09-10",
      fileSize: "5.7 MB",
      fileType: "pdf",
    },
    {
      id: "mat6",
      title: "Technical Writing Guidelines",
      course: "ENG203",
      type: "guide",
      author: "Prof. Emily Parker",
      uploadDate: "2023-09-20",
      fileSize: "1.8 MB",
      fileType: "pdf",
    },
    {
      id: "mat7",
      title: "Computer Networks: A Top-Down Approach",
      course: "CS205",
      type: "textbook",
      author: "James F. Kurose, Keith W. Ross",
      uploadDate: "2023-09-05",
      fileSize: "12.1 MB",
      fileType: "pdf",
    },
  ],
}

export function AcademicsTab() {
  const [activeSubTab, setActiveSubTab] = React.useState("courses")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [filterStatus, setFilterStatus] = React.useState("all")
  const [isLoading, setIsLoading] = React.useState(false)
  const isMobile = useMediaQuery("(max-width: 640px)")

  // Extract data from mock data
  const { courses, assignments, exams, academicCalendar, learningMaterials } = mockData

  // Filter assignments based on status
  const filteredAssignments = React.useMemo(() => {
    if (filterStatus === "all") return assignments
    return assignments.filter((assignment) => assignment.status === filterStatus)
  }, [assignments, filterStatus])

  // Filter courses based on search query
  const filteredCourses = React.useMemo(() => {
    if (!searchQuery) return courses
    const query = searchQuery.toLowerCase()
    return courses.filter(
      (course) =>
        course.code.toLowerCase().includes(query) ||
        course.name.toLowerCase().includes(query) ||
        course.instructor.toLowerCase().includes(query),
    )
  }, [courses, searchQuery])

  // Filter exams based on status
  const filteredExams = React.useMemo(() => {
    const now = new Date()
    return exams.map((exam) => {
      const examDate = parseISO(exam.date)
      if (exam.status === "completed") return exam
      return {
        ...exam,
        status: isBefore(examDate, now) ? "completed" : "upcoming",
      }
    })
  }, [exams])

  // Group calendar events by month
  const calendarByMonth = React.useMemo(() => {
    const months = ["September", "October", "November", "December", "January"]
    return months.map((month) => ({
      month,
      events: academicCalendar.filter((event) => {
        const eventDate = new Date(event.date)
        return eventDate.toLocaleString("default", { month: "long" }) === month
      }),
    }))
  }, [academicCalendar])

  // Handle file download (mock)
  const handleDownload = (id: string) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      console.log(`Downloading file with ID: ${id}`)
    }, 1500)
  }

  // Simulate loading when changing tabs
  React.useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [activeSubTab])

  // Component for displaying loading state
  const LoadingState = () => (
    <div className="flex items-center justify-center py-10">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  )

  // Get status badge for assignments
  const getAssignmentStatusBadge = (status: string) => {
    switch (status) {
      case "submitted":
        return <Badge variant="secondary">Submitted</Badge>
      case "graded":
        return <Badge className="bg-green-500 hover:bg-green-600">Graded</Badge>
      case "in-progress":
        return <Badge variant="default">In Progress</Badge>
      case "not-started":
        return <Badge variant="outline">Not Started</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Get file icon based on type
  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "pdf":
        return <FileText className="h-4 w-4 text-red-500" />
      case "mp4":
        return <FileText className="h-4 w-4 text-blue-500" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  // Get calendar event badge
  const getCalendarBadge = (category: string) => {
    switch (category) {
      case "exam":
        return <Badge variant="destructive">Exam Period</Badge>
      case "holiday":
        return <Badge className="bg-green-500 hover:bg-green-600">Holiday</Badge>
      case "registration":
        return <Badge variant="secondary">Registration</Badge>
      case "semester":
        return <Badge variant="outline">Semester</Badge>
      default:
        return <Badge variant="outline">{category}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="courses" value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <h2 className="text-xl font-bold flex items-center">
            <GraduationCap className="mr-2 h-6 w-6 text-primary" />
            Academic Resources
          </h2>
          <TabsList className="h-auto p-1 overflow-auto">
            <TabsTrigger value="courses" className="text-sm px-3 py-1.5">
              <Book className="mr-2 h-4 w-4" />
              <span className={isMobile ? "sr-only" : ""}>My Courses</span>
            </TabsTrigger>
            <TabsTrigger value="assignments" className="text-sm px-3 py-1.5">
              <FileText className="mr-2 h-4 w-4" />
              <span className={isMobile ? "sr-only" : ""}>Assignments</span>
            </TabsTrigger>
            <TabsTrigger value="exams" className="text-sm px-3 py-1.5">
              <GraduationCap className="mr-2 h-4 w-4" />
              <span className={isMobile ? "sr-only" : ""}>Exams</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="text-sm px-3 py-1.5">
              <Calendar className="mr-2 h-4 w-4" />
              <span className={isMobile ? "sr-only" : ""}>Calendar</span>
            </TabsTrigger>
            <TabsTrigger value="materials" className="text-sm px-3 py-1.5">
              <BookOpen className="mr-2 h-4 w-4" />
              <span className={isMobile ? "sr-only" : ""}>Materials</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Courses Tab */}
        <TabsContent value="courses" className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search courses..."
                className="w-full pl-8 pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-0 sm:ml-2">
                  <Filter className="mr-2 h-4 w-4" />
                  <span>Filter</span>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Check className="mr-2 h-4 w-4" />
                  <span>All Courses</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="ml-6">In Progress</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="ml-6">Completed</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Check className="mr-2 h-4 w-4" />
                  <span>Course Code</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="ml-6">Course Name</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="ml-6">Progress</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {isLoading ? (
            <LoadingState />
          ) : (
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">
                            <span className="text-primary font-bold">{course.code}</span>: {course.name}
                          </CardTitle>
                          <CardDescription className="mt-1">Instructor: {course.instructor}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-3">
                        <div className="flex items-center text-sm">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{course.schedule}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{course.location}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <CreditCardIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{course.credits} Credits
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Course Progress</span>
                            <span className="text-sm text-muted-foreground">{course.progress}%</span>
                          </div>
                          <Progress
                            value={course.progress}
                            className="h-2"
                            // indicatorclassname={cn(
                            //   course.progress >= 70
                            //     ? "bg-green-500"
                            //     : course.progress >= 40
                            //       ? "bg-amber-500"
                            //       : "bg-red-500",
                            // )}
                          />
                        </div>
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-sm">Current Grade:</span>
                          <Badge variant={course.grade.startsWith("A") ? "default" : "secondary"}>{course.grade}</Badge>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2">
                      <Button variant="ghost" size="sm" asChild>
                        <a href={`/academics/courses/${course.id}`}>
                          <BookOpen className="mr-2 h-4 w-4" />
                          Course Details
                        </a>
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <a href={`/academics/courses/${course.id}/materials`}>
                          <FileText className="mr-2 h-4 w-4" />
                          Materials
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-8 px-4 border rounded-lg bg-muted/30">
                  <Book className="h-12 w-12 text-muted-foreground mb-3" />
                  <h3 className="text-lg font-medium">No Courses Found</h3>
                  <p className="text-sm text-muted-foreground mt-1 text-center">
                    No courses match your search criteria. Try adjusting your search.
                  </p>
                </div>
              )}
            </div>
          )}
        </TabsContent>

        {/* Assignments Tab */}
        <TabsContent value="assignments" className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <ScrollArea className="w-full sm:w-auto max-w-full pb-2">
              <div className="flex items-center space-x-2">
                <Button
                  variant={filterStatus === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("all")}
                >
                  All
                </Button>
                <Button
                  variant={filterStatus === "in-progress" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("in-progress")}
                >
                  In Progress
                </Button>
                <Button
                  variant={filterStatus === "submitted" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("submitted")}
                >
                  Submitted
                </Button>
                <Button
                  variant={filterStatus === "graded" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("graded")}
                >
                  Graded
                </Button>
                <Button
                  variant={filterStatus === "not-started" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("not-started")}
                >
                  Not Started
                </Button>
              </div>
            </ScrollArea>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <SortAsc className="mr-2 h-4 w-4" />
                  <span>Sort</span>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Check className="mr-2 h-4 w-4" />
                  <span>Due Date (Earliest First)</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="ml-6">Due Date (Latest First)</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="ml-6">Course Code</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="ml-6">Assignment Title</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {isLoading ? (
            <LoadingState />
          ) : (
            <div className="space-y-4">
              {filteredAssignments.length > 0 ? (
                filteredAssignments.map((assignment) => (
                  <Card key={assignment.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{assignment.title}</CardTitle>
                        {getAssignmentStatusBadge(assignment.status)}
                      </div>
                      <CardDescription className="flex items-center mt-1">
                        <span className="font-medium text-primary">{assignment.course}</span>
                        {assignment.status === "in-progress" && (
                          <>
                            <Separator orientation="vertical" className="mx-2 h-3" />
                            <span className="text-muted-foreground">
                              Due in{" "}
                              {Math.ceil(
                                (new Date(assignment.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                              )}{" "}
                              days
                            </span>
                          </>
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-3">
                        <p className="text-sm">{assignment.description}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm">
                            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>Due: {format(parseISO(assignment.dueDate), "MMM d, yyyy 'at' h:mm a")}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>
                              {assignment.attachments} attachment{assignment.attachments !== 1 ? "s" : ""}
                            </span>
                          </div>
                        </div>

                        {assignment.status === "in-progress" && assignment.progress !== undefined && (
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium">Progress</span>
                              <span className="text-sm text-muted-foreground">{assignment.progress}%</span>
                            </div>
                            <Progress
                              value={assignment.progress}
                              className="h-2"

                              // indicatorClassName={cn(
                              //   assignment.progress >= 70
                              //     ? "bg-green-500"
                              //     : assignment.progress >= 40
                              //       ? "bg-amber-500"
                              //       : "bg-red-500",
                              // )}
                            />
                          </div>
                        )}

                        {assignment.status === "submitted" && assignment.submittedDate && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                            <span>
                              Submitted on {format(parseISO(assignment.submittedDate), "MMM d, yyyy 'at' h:mm a")}
                            </span>
                          </div>
                        )}

                        {assignment.status === "graded" && (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                              <span>Submitted on {format(parseISO(assignment.submittedDate!), "MMM d, yyyy")}</span>
                            </div>
                            <Badge className="bg-green-500">{assignment.grade}</Badge>
                          </div>
                        )}

                        {assignment.feedback && (
                          <div className="text-sm p-3 bg-muted/50 rounded-md">
                            <p className="font-medium mb-1">Feedback:</p>
                            <p>{assignment.feedback}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2">
                      <Button variant="ghost" size="sm" asChild>
                        <a href={`/academics/assignments/${assignment.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </a>
                      </Button>
                      {assignment.status === "in-progress" || assignment.status === "not-started" ? (
                        <Button variant="default" size="sm" asChild>
                          <a href={`/academics/assignments/${assignment.id}/submit`}>
                            <Upload className="mr-2 h-4 w-4" />
                            Submit Assignment
                          </a>
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" asChild>
                          <a href={`/academics/assignments/${assignment.id}/submission`}>
                            <FileText className="mr-2 h-4 w-4" />
                            View Submission
                          </a>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-8 px-4 border rounded-lg bg-muted/30">
                  <FileText className="h-12 w-12 text-muted-foreground mb-3" />
                  <h3 className="text-lg font-medium">No Assignments Found</h3>
                  <p className="text-sm text-muted-foreground mt-1 text-center">
                    No assignments match your selected filter. Try selecting a different status.
                  </p>
                </div>
              )}
            </div>
          )}
        </TabsContent>

        {/* Exams Tab */}
        <TabsContent value="exams" className="space-y-4">
          {isLoading ? (
            <LoadingState />
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-primary" />
                  Upcoming Exams
                </h3>
                <div className="space-y-4">
                  {filteredExams
                    .filter((exam) => exam.status === "upcoming")
                    .map((exam) => (
                      <Card key={exam.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{exam.title}</CardTitle>
                            <Badge variant="outline" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
                              Upcoming
                            </Badge>
                          </div>
                          <CardDescription>
                            Course: <span className="font-medium text-primary">{exam.course}</span>
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <div className="flex items-center text-sm">
                                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>{format(parseISO(exam.date), "MMM d, yyyy")}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>
                                  {format(parseISO(exam.date), "h:mm a")} ({exam.duration})
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center text-sm">
                              <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>{exam.location}</span>
                            </div>

                            <div className="mt-2">
                              <p className="text-sm font-medium mb-1">Materials Allowed:</p>
                              <ul className="text-sm space-y-1">
                                {exam?.materials?.map((material, index) => (
                                  <li key={index} className="flex items-start">
                                    <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>{material}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between pt-2">
                          <Button variant="ghost" size="sm" asChild>
                            <a href={`/academics/exams/${exam.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </a>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <a href={`/academics/courses/${exam.course}/materials`}>
                              <Book className="mr-2 h-4 w-4" />
                              Study Materials
                            </a>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>

                {filteredExams.filter((exam) => exam.status === "upcoming").length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 px-4 border rounded-lg bg-muted/30">
                    <Calendar className="h-12 w-12 text-muted-foreground mb-3" />
                    <h3 className="text-lg font-medium">No Upcoming Exams</h3>
                    <p className="text-sm text-muted-foreground mt-1">You don't have any upcoming exams scheduled.</p>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-primary" />
                  Past Exams
                </h3>
                <div className="space-y-4">
                  {filteredExams
                    .filter((exam) => exam.status === "completed")
                    .map((exam) => (
                      <Card key={exam.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{exam.title}</CardTitle>
                            <Badge variant="outline">Completed</Badge>
                          </div>
                          <CardDescription>
                            Course: <span className="font-medium text-primary">{exam.course}</span>
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <div className="flex items-center text-sm">
                                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>{format(parseISO(exam.date), "MMM d, yyyy")}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>
                                  {format(parseISO(exam.date), "h:mm a")} ({exam.duration})
                                </span>
                              </div>
                            </div>

                            {exam.grade && (
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Grade:</span>
                                <Badge variant={exam.grade.startsWith("A") ? "default" : "secondary"}>
                                  {exam.grade}
                                </Badge>
                              </div>
                            )}

                            {exam.feedback && (
                              <div className="text-sm p-3 bg-muted/50 rounded-md">
                                <p className="font-medium mb-1">Feedback:</p>
                                <p>{exam.feedback}</p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between pt-2">
                          <Button variant="ghost" size="sm" asChild>
                            <a href={`/academics/exams/${exam.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </a>
                          </Button>
                          {exam.grade && (
                            <Button variant="outline" size="sm" asChild>
                              <a href={`/academics/exams/${exam.id}/result`}>
                                <FileText className="mr-2 h-4 w-4" />
                                View Result
                              </a>
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    ))}
                </div>

                {filteredExams.filter((exam) => exam.status === "completed").length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 px-4 border rounded-lg bg-muted/30">
                    <FileText className="h-12 w-12 text-muted-foreground mb-3" />
                    <h3 className="text-lg font-medium">No Past Exams</h3>
                    <p className="text-sm text-muted-foreground mt-1">You don't have any completed exams yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </TabsContent>

        {/* Academic Calendar Tab */}
        <TabsContent value="calendar" className="space-y-4">
          {isLoading ? (
            <LoadingState />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-primary" />
                  Academic Calendar 2023-2024
                </CardTitle>
                <CardDescription>Important dates and events for the academic year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Group calendar events by month */}
                  {calendarByMonth.map(({ month, events }) => (
                    <div key={month} className={events.length > 0 ? "" : "hidden"}>
                      <h3 className="text-lg font-medium mb-3">{month} 2023</h3>
                      <div className="space-y-3">
                        {events.map((event) => (
                          <div
                            key={event.id}
                            className="flex items-start p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex-shrink-0 mr-3">
                              <div
                                className={cn(
                                  "w-10 h-10 rounded-full flex items-center justify-center",
                                  event.category === "exam"
                                    ? "bg-red-500/10 text-red-500"
                                    : event.category === "holiday"
                                      ? "bg-green-500/10 text-green-500"
                                      : event.category === "registration"
                                        ? "bg-blue-500/10 text-blue-500"
                                        : "bg-muted text-muted-foreground",
                                )}
                              >
                                <Calendar className="h-5 w-5" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between flex-wrap gap-2">
                                <h4 className="font-medium">{event.title}</h4>
                                {getCalendarBadge(event.category)}
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {event.endDate
                                  ? `${format(new Date(event.date), "MMM d")} - ${format(new Date(event.endDate), "MMM d, yyyy")}`
                                  : format(new Date(event.date), "MMMM d, yyyy")}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <a href="/academics/calendar">
                    <Calendar className="mr-2 h-4 w-4" />
                    View Full Academic Calendar
                  </a>
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>

        {/* Learning Materials Tab */}
        <TabsContent value="materials" className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="search" placeholder="Search materials..." className="w-full pl-8 pr-4" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-0 sm:ml-2">
                  <Filter className="mr-2 h-4 w-4" />
                  <span>Filter</span>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Check className="mr-2 h-4 w-4" />
                  <span>All Materials</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="ml-6">Textbooks</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="ml-6">Lecture Notes</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="ml-6">Videos</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="ml-6">References</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Check className="mr-2 h-4 w-4" />
                  <span>Date (Newest First)</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="ml-6">Date (Oldest First)</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="ml-6">Name (A-Z)</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {isLoading ? (
            <LoadingState />
          ) : (
            <div className="space-y-6">
              <Accordion type="single" collapsible className="w-full">
                {courses.map((course) => (
                  <AccordionItem key={course.id} value={course.id} className="border rounded-md px-0 overflow-hidden">
                    <AccordionTrigger className="hover:bg-muted/50 px-4 py-3 rounded-md">
                      <div className="flex items-center">
                        <Book className="mr-2 h-5 w-5 text-primary" />
                        <span className="font-medium">
                          {course.code}: {course.name}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4">
                      <div className="space-y-2 pt-2">
                        {learningMaterials
                          .filter((material) => material.course === course.code)
                          .map((material) => (
                            <div
                              key={material.id}
                              className="flex items-center justify-between p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors"
                            >
                              <div className="flex items-center min-w-0">
                                <div className="mr-3 p-2 bg-muted rounded-md">{getFileIcon(material.fileType)}</div>
                                <div className="min-w-0">
                                  <h4 className="font-medium truncate">{material.title}</h4>
                                  <div className="flex flex-wrap items-center text-xs text-muted-foreground mt-1 gap-2">
                                    <Badge variant="outline" className="text-xs font-normal">
                                      {material.type}
                                    </Badge>
                                    <span>{material.fileSize}</span>
                                    {material.duration && <span>{material.duration}</span>}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center ml-4">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleDownload(material.id)}
                                  disabled={isLoading}
                                >
                                  {isLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <Download className="h-4 w-4" />
                                  )}
                                  <span className="sr-only">Download</span>
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">More options</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuItem>
                                      <Eye className="mr-2 h-4 w-4" />
                                      <span>Preview</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Download className="mr-2 h-4 w-4" />
                                      <span>Download</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <ExternalLink className="mr-2 h-4 w-4" />
                                      <span>Open in New Tab</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                      <Info className="mr-2 h-4 w-4" />
                                      <span>View Details</span>
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          ))}

                        {learningMaterials.filter((material) => material.course === course.code).length === 0 && (
                          <div className="flex flex-col items-center justify-center py-6 px-4 text-center">
                            <AlertCircle className="h-8 w-8 text-muted-foreground mb-2" />
                            <p className="text-sm font-medium">No materials available</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              No learning materials have been uploaded for this course yet.
                            </p>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

