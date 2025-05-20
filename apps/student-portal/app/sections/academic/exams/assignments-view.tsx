"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import {
  AlertCircle,
  BookOpen,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  FileText,
  Filter,
  Info,
  Loader2,
  MoreHorizontal,
  Pencil,
  SlidersHorizontal,
  Timer,
  Upload,
  X,
} from "lucide-react"
import { format, parseISO, isBefore, isAfter, addDays, differenceInDays, differenceInHours } from "date-fns"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Dialog } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { AssignmentSubmission } from "./assignment-submission"

interface AssignmentsViewProps {
  searchQuery: string
  semester: string
}

type Assignment = {
  id: string
  title: string
  course: string
  courseCode: string
  dueDate: string
  status: "not-started" | "in-progress" | "submitted" | "graded" | "overdue" | "draft-saved"
  progress?: number
  description: string
  attachments: number
  submittedDate?: string
  grade?: string | null
  feedback?: string
  type: "individual" | "group"
  groupMembers?: string[]
  weight: number
  plagiarismScore?: number
  submissionType: "file" | "text" | "both"
  maxFileSize: string
  allowedFileTypes: string[]
  instructor: string
  maxScore: number
  lateSubmission?: boolean
  lateSubmissionPenalty?: string
  turnitinRequired?: boolean
  submissionAttempts?: number
  maxSubmissionAttempts?: number
  rubric?: {
    criteria: string
    weight: number
    score?: number
  }[]
}

export function AssignmentsView({ searchQuery, semester }: AssignmentsViewProps) {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState<"dueDate" | "title" | "course" | "weight">("dueDate")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [filterType, setFilterType] = useState<"all" | "individual" | "group">("all")
  const [filterCourse, setFilterCourse] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(false)
  const { toast } = useToast()

  // Mock assignments data (Kenyan university context)
  const assignments: Assignment[] = [
    {
      id: "assign1",
      title: "Data Structures Implementation",
      course: "Data Structures & Algorithms",
      courseCode: "CSC 3101",
      dueDate: "2023-11-15T23:59:00",
      status: "in-progress",
      progress: 30,
      description:
        "Implement a linked list and a binary search tree in C++. Include methods for insertion, deletion, and search. Your implementation should handle edge cases and include proper error handling. Submit your code with a detailed report explaining your implementation choices.",
      attachments: 2,
      weight: 15,
      submissionType: "file",
      maxFileSize: "10",
      allowedFileTypes: ["pdf", "docx", "cpp", "zip"],
      instructor: "Dr. Sarah Johnson",
      type: "individual",
      maxScore: 100,
      lateSubmission: true,
      lateSubmissionPenalty: "10% per day",
      turnitinRequired: true,
      submissionAttempts: 0,
      maxSubmissionAttempts: 3,
      rubric: [
        { criteria: "Implementation correctness", weight: 40 },
        { criteria: "Code quality and documentation", weight: 30 },
        { criteria: "Report quality", weight: 20 },
        { criteria: "Handling edge cases", weight: 10 },
      ],
    },
    {
      id: "assign2",
      title: "Database Design for E-Commerce",
      course: "Database Systems",
      courseCode: "BIS 3102",
      dueDate: "2023-11-20T23:59:00",
      status: "in-progress",
      progress: 60,
      description:
        "Design a relational database schema for an e-commerce platform. Include ER diagrams, schema design, and SQL implementation with sample queries. Your submission should include a comprehensive report with justifications for your design decisions and optimization strategies.",
      attachments: 3,
      weight: 25,
      submissionType: "both",
      maxFileSize: "15",
      allowedFileTypes: ["pdf", "sql", "zip"],
      instructor: "Prof. Michael Chen",
      type: "group",
      groupMembers: ["John Smith", "Maria Garcia", "David Kim"],
      maxScore: 120,
      lateSubmission: true,
      lateSubmissionPenalty: "5% per day, up to 3 days",
      turnitinRequired: true,
      submissionAttempts: 1,
      maxSubmissionAttempts: 2,
      rubric: [
        { criteria: "Database design", weight: 35 },
        { criteria: "SQL implementation", weight: 30 },
        { criteria: "Documentation", weight: 20 },
        { criteria: "Optimization strategies", weight: 15 },
      ],
    },
    {
      id: "assign3",
      title: "Mathematical Logic Proofs",
      course: "Discrete Mathematics",
      courseCode: "MAT 2101",
      dueDate: "2023-11-10T23:59:00",
      status: "submitted",
      submittedDate: "2023-11-09T22:45:00",
      grade: null,
      description:
        "Solve problems on propositional logic and predicate logic. Provide formal proofs for each solution. Your submission should demonstrate a clear understanding of logical principles and proof techniques.",
      attachments: 1,
      weight: 10,
      submissionType: "file",
      maxFileSize: "5",
      allowedFileTypes: ["pdf"],
      instructor: "Dr. Robert Williams",
      type: "individual",
      maxScore: 80,
      turnitinRequired: true,
      submissionAttempts: 1,
      maxSubmissionAttempts: 1,
      rubric: [
        { criteria: "Correctness of proofs", weight: 50 },
        { criteria: "Clarity and organization", weight: 30 },
        { criteria: "Presentation", weight: 20 },
      ],
    },
    {
      id: "assign4",
      title: "Technical Report on AI Ethics",
      course: "Technical Communication",
      courseCode: "ENG 2103",
      dueDate: "2023-11-05T23:59:00",
      status: "graded",
      submittedDate: "2023-11-04T20:30:00",
      grade: "A",
      feedback:
        "Excellent structure and clarity. Your report demonstrates strong technical writing skills with clear explanations and well-organized sections. The executive summary effectively captures the key points, and your use of visuals enhances understanding. Consider adding more comparative analysis in future reports.",
      description:
        "Write a technical report on the ethical implications of artificial intelligence in modern society. Include case studies and reference at least 10 scholarly sources. Your report should follow the IEEE format and include an executive summary, introduction, literature review, discussion, and conclusion.",
      attachments: 1,
      plagiarismScore: 2,
      weight: 20,
      submissionType: "file",
      maxFileSize: "10",
      allowedFileTypes: ["pdf", "docx"],
      instructor: "Prof. Emily Parker",
      type: "individual",
      maxScore: 100,
      turnitinRequired: true,
      submissionAttempts: 1,
      maxSubmissionAttempts: 1,
      rubric: [
        { criteria: "Content quality", weight: 40, score: 38 },
        { criteria: "Research depth", weight: 25, score: 24 },
        { criteria: "Structure and organization", weight: 20, score: 20 },
        { criteria: "Language and style", weight: 15, score: 14 },
      ],
    },
    {
      id: "assign5",
      title: "Software Engineering Project Proposal",
      course: "Software Engineering",
      courseCode: "CSC 3205",
      dueDate: "2023-11-25T23:59:00",
      status: "not-started",
      description:
        "Develop a comprehensive project proposal for a software application that addresses a real-world problem. Include requirements analysis, system architecture, implementation plan, and testing strategy. Your proposal should follow the IEEE software requirements specification format.",
      attachments: 0,
      weight: 30,
      submissionType: "both",
      maxFileSize: "20",
      allowedFileTypes: ["pdf", "docx", "pptx"],
      instructor: "Dr. James Wilson",
      type: "group",
      groupMembers: ["You", "Alice Johnson", "Robert Chen", "Priya Patel"],
      maxScore: 150,
      lateSubmission: false,
      turnitinRequired: true,
      submissionAttempts: 0,
      maxSubmissionAttempts: 2,
      rubric: [
        { criteria: "Problem identification", weight: 20 },
        { criteria: "Requirements specification", weight: 25 },
        { criteria: "System design", weight: 25 },
        { criteria: "Implementation plan", weight: 15 },
        { criteria: "Testing strategy", weight: 15 },
      ],
    },
    {
      id: "assign6",
      title: "Operating Systems Lab Report",
      course: "Operating Systems",
      courseCode: "CSC 3103",
      dueDate: "2023-11-08T23:59:00",
      status: "draft-saved",
      progress: 75,
      description:
        "Document your implementation and findings from the process scheduling lab. Include your code, experimental results, analysis, and conclusions. Your report should follow the standard lab report format with clear sections for methodology, results, discussion, and conclusions.",
      attachments: 2,
      weight: 15,
      submissionType: "file",
      maxFileSize: "10",
      allowedFileTypes: ["pdf", "zip"],
      instructor: "Prof. David Lee",
      type: "individual",
      maxScore: 100,
      lateSubmission: true,
      lateSubmissionPenalty: "20% per day",
      turnitinRequired: false,
      submissionAttempts: 0,
      maxSubmissionAttempts: 2,
      rubric: [
        { criteria: "Implementation", weight: 40 },
        { criteria: "Results and analysis", weight: 30 },
        { criteria: "Discussion", weight: 20 },
        { criteria: "Presentation", weight: 10 },
      ],
    },
    {
      id: "assign7",
      title: "Research Methods Literature Review",
      course: "Research Methods",
      courseCode: "RES 3001",
      dueDate: "2023-10-30T23:59:00",
      status: "overdue",
      progress: 40,
      description:
        "Conduct a comprehensive literature review on a research topic of your choice within your field of study. Include at least 15 scholarly sources, critically analyze the current state of research, identify gaps, and propose potential research questions. Your review should follow APA format.",
      attachments: 1,
      weight: 25,
      submissionType: "file",
      maxFileSize: "15",
      allowedFileTypes: ["pdf", "docx"],
      instructor: "Dr. Sarah Thompson",
      type: "individual",
      maxScore: 100,
      lateSubmission: true,
      lateSubmissionPenalty: "10% per day, up to 5 days",
      turnitinRequired: true,
      submissionAttempts: 0,
      maxSubmissionAttempts: 1,
      rubric: [
        { criteria: "Comprehensiveness", weight: 30 },
        { criteria: "Critical analysis", weight: 30 },
        { criteria: "Organization and structure", weight: 20 },
        { criteria: "Writing quality", weight: 20 },
      ],
    },
    {
      id: "assign8",
      title: "Mobile App Development Project",
      course: "Mobile Application Development",
      courseCode: "CSC 4105",
      dueDate: "2023-12-10T23:59:00",
      status: "in-progress",
      progress: 25,
      description:
        "Develop a mobile application that solves a real-world problem. Your submission should include the source code, documentation, user manual, and a video demonstration. The application should implement at least 5 key features and follow material design principles.",
      attachments: 3,
      weight: 40,
      submissionType: "both",
      maxFileSize: "50",
      allowedFileTypes: ["zip", "pdf", "mp4"],
      instructor: "Prof. Michelle Wong",
      type: "group",
      groupMembers: ["You", "John Doe", "Jane Smith", "Michael Johnson"],
      maxScore: 200,
      lateSubmission: false,
      turnitinRequired: false,
      submissionAttempts: 0,
      maxSubmissionAttempts: 2,
      rubric: [
        { criteria: "Functionality", weight: 30 },
        { criteria: "User interface", weight: 20 },
        { criteria: "Code quality", weight: 20 },
        { criteria: "Documentation", weight: 15 },
        { criteria: "Presentation", weight: 15 },
      ],
    },
  ]

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Get unique courses for filter
  const uniqueCourses = useMemo(() => {
    const courses = assignments.map((assignment) => ({
      code: assignment.courseCode,
      name: assignment.course,
    }))
    return Array.from(new Map(courses.map((item) => [item.code, item])).values())
  }, [assignments])

  // Filter assignments based on search query and filters
  const filteredAssignments = useMemo(() => {
    return assignments.filter((assignment) => {
      const matchesSearch =
        assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        assignment.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
        assignment.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        assignment.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesType =
        filterType === "all" ||
        (filterType === "individual" && assignment.type === "individual") ||
        (filterType === "group" && assignment.type === "group")

      const matchesCourse = filterCourse === "all" || assignment.courseCode === filterCourse

      return matchesSearch && matchesType && matchesCourse
    })
  }, [assignments, searchQuery, filterType, filterCourse])

  // Sort assignments
  const sortedAssignments = useMemo(() => {
    return [...filteredAssignments].sort((a, b) => {
      if (sortBy === "dueDate") {
        return sortOrder === "asc"
          ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
          : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
      } else if (sortBy === "title") {
        return sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
      } else if (sortBy === "course") {
        return sortOrder === "asc" ? a.course.localeCompare(b.course) : b.course.localeCompare(a.course)
      } else if (sortBy === "weight") {
        return sortOrder === "asc" ? a.weight - b.weight : b.weight - a.weight
      }
      return 0
    })
  }, [filteredAssignments, sortBy, sortOrder])

  // Filter assignments based on selected tab
  const getAssignmentsByTab = (tab: string) => {
    const now = new Date()

    switch (tab) {
      case "upcoming":
        return sortedAssignments.filter(
          (assignment) =>
            (assignment.status === "not-started" ||
              assignment.status === "in-progress" ||
              assignment.status === "draft-saved") &&
            !isBefore(parseISO(assignment.dueDate), now),
        )
      case "submitted":
        return sortedAssignments.filter(
          (assignment) => assignment.status === "submitted" || assignment.status === "graded",
        )
      case "overdue":
        return sortedAssignments.filter(
          (assignment) =>
            assignment.status === "overdue" ||
            ((assignment.status === "not-started" ||
              assignment.status === "in-progress" ||
              assignment.status === "draft-saved") &&
              isBefore(parseISO(assignment.dueDate), now)),
        )
      case "all":
      default:
        return sortedAssignments
    }
  }

  const displayedAssignments = getAssignmentsByTab(activeTab)

  // Check if any assignments are due soon (within 48 hours)
  const hasDueSoonAssignments = useMemo(() => {
    const now = new Date()
    return assignments.some(
      (assignment) =>
        (assignment.status === "not-started" ||
          assignment.status === "in-progress" ||
          assignment.status === "draft-saved") &&
        differenceInHours(parseISO(assignment.dueDate), now) <= 48 &&
        differenceInHours(parseISO(assignment.dueDate), now) > 0,
    )
  }, [assignments])

  // Get assignments due soon
  const dueSoonAssignments = useMemo(() => {
    const now = new Date()
    return assignments.filter(
      (assignment) =>
        (assignment.status === "not-started" ||
          assignment.status === "in-progress" ||
          assignment.status === "draft-saved") &&
        differenceInHours(parseISO(assignment.dueDate), now) <= 48 &&
        differenceInHours(parseISO(assignment.dueDate), now) > 0,
    )
  }, [assignments])

  // Handle reset filters
  const handleResetFilters = () => {
    setSortBy("dueDate")
    setSortOrder("asc")
    setFilterType("all")
    setFilterCourse("all")
    toast({
      title: "Filters Reset",
      description: "All filters have been reset to default values.",
    })
  }

  // Handle continue draft
  const handleContinueDraft = (assignment: Assignment) => {
    setSelectedAssignment(assignment)
    toast({
      title: "Draft Loaded",
      description: "Your saved draft has been loaded. You can continue working on your submission.",
    })
  }

  return (
    <div className="space-y-6">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Loading assignments...</p>
        </div>
      ) : (
        <>
          {/* Due Soon Alert */}
          {hasDueSoonAssignments && (
            <Alert className="bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/30 dark:border-amber-800 dark:text-amber-300 mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Assignments Due Soon</AlertTitle>
              <AlertDescription>
                <p className="mb-2">You have {dueSoonAssignments.length} assignment(s) due within the next 48 hours:</p>
                <ul className="list-disc list-inside space-y-1">
                  {dueSoonAssignments.map((assignment) => (
                    <li key={assignment.id} className="text-sm">
                      <span className="font-medium">{assignment.title}</span> - Due{" "}
                      {format(parseISO(assignment.dueDate), "MMM d 'at' h:mm a")}
                      <Button
                        variant="link"
                        size="sm"
                        className="p-0 h-auto ml-2 text-amber-800 dark:text-amber-300"
                        onClick={() => setSelectedAssignment(assignment)}
                      >
                        View
                      </Button>
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {/* Filters and Sorting */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">Assignments</h2>
              <Badge variant="outline" className="font-normal">
                {semester}
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8" onClick={() => setShowFilters(!showFilters)}>
                      <SlidersHorizontal className="h-4 w-4 mr-1" />
                      <span className="hidden sm:inline">Filters</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Filter and sort assignments</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 sm:hidden">
                    <Filter className="h-4 w-4 mr-1" />
                    <span>Filters</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>Filter Assignments</SheetTitle>
                    <SheetDescription>Customize how assignments are displayed</SheetDescription>
                  </SheetHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Sort By</h4>
                      <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dueDate">Due Date</SelectItem>
                          <SelectItem value="title">Title</SelectItem>
                          <SelectItem value="course">Course</SelectItem>
                          <SelectItem value="weight">Weight</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Sort Order</h4>
                      <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as any)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sort order" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asc">Ascending</SelectItem>
                          <SelectItem value="desc">Descending</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Assignment Type</h4>
                      <Select value={filterType} onValueChange={(value) => setFilterType(value as any)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Assignment type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="individual">Individual</SelectItem>
                          <SelectItem value="group">Group</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Course</h4>
                      <Select value={filterCourse} onValueChange={(value) => setFilterCourse(value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select course" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Courses</SelectItem>
                          {uniqueCourses.map((course) => (
                            <SelectItem key={course.code} value={course.code}>
                              {course.code}: {course.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button variant="outline" size="sm" className="w-full mt-4" onClick={handleResetFilters}>
                      Reset Filters
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Filters Panel (Desktop) */}
          <Collapsible open={showFilters} onOpenChange={setShowFilters} className="mb-4">
            <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
              <div className="p-4 border rounded-md bg-muted/30 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Sort By</h4>
                    <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dueDate">Due Date</SelectItem>
                        <SelectItem value="title">Title</SelectItem>
                        <SelectItem value="course">Course</SelectItem>
                        <SelectItem value="weight">Weight</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Sort Order</h4>
                    <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as any)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sort order" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asc">Ascending</SelectItem>
                        <SelectItem value="desc">Descending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Assignment Type</h4>
                    <Select value={filterType} onValueChange={(value) => setFilterType(value as any)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Assignment type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="group">Group</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Course</h4>
                    <Select value={filterCourse} onValueChange={(value) => setFilterCourse(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Courses</SelectItem>
                        {uniqueCourses.map((course) => (
                          <SelectItem key={course.code} value={course.code}>
                            {course.code}: {course.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button variant="outline" size="sm" onClick={handleResetFilters}>
                    <X className="h-4 w-4 mr-1" />
                    Reset Filters
                  </Button>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="upcoming">
                Upcoming
                <Badge className="ml-2">{getAssignmentsByTab("upcoming").length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="submitted">
                Submitted
                <Badge className="ml-2">{getAssignmentsByTab("submitted").length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="overdue">
                Overdue
                <Badge className="ml-2">{getAssignmentsByTab("overdue").length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="all">
                All
                <Badge className="ml-2">{sortedAssignments.length}</Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4 mt-4">
              {displayedAssignments.length > 0 ? (
                displayedAssignments.map((assignment) => (
                  <AssignmentCard
                    key={assignment.id}
                    assignment={assignment}
                    onSelect={() => setSelectedAssignment(assignment)}
                    onContinueDraft={handleContinueDraft}
                  />
                ))
              ) : (
                <EmptyState
                  icon={<Clock className="h-12 w-12 text-muted-foreground" />}
                  title="No Upcoming Assignments"
                  description="You don't have any upcoming assignments at the moment."
                />
              )}
            </TabsContent>

            <TabsContent value="submitted" className="space-y-4 mt-4">
              {displayedAssignments.length > 0 ? (
                displayedAssignments.map((assignment) => (
                  <AssignmentCard
                    key={assignment.id}
                    assignment={assignment}
                    onSelect={() => setSelectedAssignment(assignment)}
                    onContinueDraft={handleContinueDraft}
                  />
                ))
              ) : (
                <EmptyState
                  icon={<CheckCircle2 className="h-12 w-12 text-muted-foreground" />}
                  title="No Submitted Assignments"
                  description="You haven't submitted any assignments yet."
                />
              )}
            </TabsContent>

            <TabsContent value="overdue" className="space-y-4 mt-4">
              {displayedAssignments.length > 0 ? (
                displayedAssignments.map((assignment) => (
                  <AssignmentCard
                    key={assignment.id}
                    assignment={assignment}
                    onSelect={() => setSelectedAssignment(assignment)}
                    onContinueDraft={handleContinueDraft}
                  />
                ))
              ) : (
                <EmptyState
                  icon={<Check className="h-12 w-12 text-muted-foreground" />}
                  title="No Overdue Assignments"
                  description="You don't have any overdue assignments. Keep up the good work!"
                />
              )}
            </TabsContent>

            <TabsContent value="all" className="space-y-4 mt-4">
              {displayedAssignments.length > 0 ? (
                displayedAssignments.map((assignment) => (
                  <AssignmentCard
                    key={assignment.id}
                    assignment={assignment}
                    onSelect={() => setSelectedAssignment(assignment)}
                    onContinueDraft={handleContinueDraft}
                  />
                ))
              ) : (
                <EmptyState
                  icon={<FileText className="h-12 w-12 text-muted-foreground" />}
                  title="No Assignments Found"
                  description="No assignments match your search criteria."
                />
              )}
            </TabsContent>
          </Tabs>

          {/* Assignment Details Dialog */}
          {selectedAssignment && (
            <Dialog open={!!selectedAssignment} onOpenChange={(open) => !open && setSelectedAssignment(null)}>
              <AssignmentSubmission
                assignmentId={selectedAssignment.id}
                courseId={selectedAssignment.courseCode}
                title={selectedAssignment.title}
                description={selectedAssignment.description}
                dueDate={selectedAssignment.dueDate}
                maxFileSize={Number.parseInt(selectedAssignment.maxFileSize)}
                allowedFileTypes={selectedAssignment.allowedFileTypes}
                maxScore={selectedAssignment.maxScore}
                isGroupAssignment={selectedAssignment.type === "group"}
                groupMembers={selectedAssignment.groupMembers}
                // turnitinRequired={selectedAssignment.turnitinRequired}
                // submissionAttempts={selectedAssignment.submissionAttempts}
                // maxSubmissionAttempts={selectedAssignment.maxSubmissionAttempts}
                // lateSubmission={selectedAssignment.lateSubmission}
                // lateSubmissionPenalty={selectedAssignment.lateSubmissionPenalty}
                // rubric={selectedAssignment.rubric}
              />
            </Dialog>
          )}
        </>
      )}
    </div>
  )
}

// Assignment Card Component
function AssignmentCard({
  assignment,
  onSelect,
  onContinueDraft,
}: {
  assignment: Assignment
  onSelect: () => void
  onContinueDraft: (assignment: Assignment) => void
}) {
  const now = new Date()
  const dueDate = parseISO(assignment.dueDate)
  const isToday = isBefore(dueDate, addDays(now, 1)) && isAfter(dueDate, now)
  const isDueSoon = differenceInHours(dueDate, now) <= 48 && differenceInHours(dueDate, now) > 0
  const isOverdue =
    isBefore(dueDate, now) &&
    (assignment.status === "not-started" || assignment.status === "in-progress" || assignment.status === "draft-saved")

  // Calculate days/hours until due
  const getDueTimeText = () => {
    const days = differenceInDays(dueDate, now)
    const hours = differenceInHours(dueDate, now) % 24

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ${hours > 0 ? `and ${hours} hour${hours > 1 ? "s" : ""}` : ""}`
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""}`
    } else {
      return "Less than 1 hour"
    }
  }

  return (
    <Card
      className={`overflow-hidden hover:shadow-md transition-shadow ${
        isToday ? "border-primary" : isDueSoon ? "border-amber-400" : isOverdue ? "border-red-400" : ""
      }`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{assignment.title}</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant={assignment.type === "individual" ? "outline" : "secondary"}>
              {assignment.type === "individual" ? "Individual" : "Group"}
            </Badge>
            {getAssignmentStatusBadge(assignment.status, isOverdue)}
          </div>
        </div>
        <CardDescription className="flex items-center mt-1">
          <span className="font-medium text-primary">{assignment.courseCode}</span>
          <Separator orientation="vertical" className="mx-2 h-3" />
          <span className="text-muted-foreground">
            {assignment.status === "in-progress" && !isOverdue && <>Due in {getDueTimeText()}</>}
            {assignment.status === "draft-saved" && !isOverdue && <>Draft saved • Due in {getDueTimeText()}</>}
            {assignment.status === "submitted" && <>Awaiting grade</>}
            {assignment.status === "graded" && <>Grade: {assignment.grade}</>}
            {(assignment.status === "overdue" || isOverdue) && <>Past due date</>}
            {assignment.status === "not-started" && !isOverdue && <>Not started • Due in {getDueTimeText()}</>}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-3">
          <p className="text-sm line-clamp-2">{assignment.description}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Due: {format(parseISO(assignment.dueDate), "MMM d, yyyy 'at' h:mm a")}</span>
            </div>
            <div className="flex items-center text-sm">
              <Badge variant="outline" className="font-normal">
                Weight: {assignment.weight}%
              </Badge>
            </div>
          </div>

          {(assignment.status === "in-progress" || assignment.status === "draft-saved") &&
            assignment.progress !== undefined && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-muted-foreground">{assignment.progress}%</span>
                </div>
                <Progress
                  value={assignment.progress}
                  className="h-2"
                />
              </div>
            )}

          {assignment.status === "submitted" && assignment.submittedDate && (
            <div className="flex items-center text-sm text-muted-foreground">
              <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
              <span>Submitted on {format(parseISO(assignment.submittedDate), "MMM d, yyyy 'at' h:mm a")}</span>
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

          {isDueSoon &&
            (assignment.status === "not-started" ||
              assignment.status === "in-progress" ||
              assignment.status === "draft-saved") && (
              <div className="flex items-center text-sm text-amber-600 dark:text-amber-400">
                <Timer className="mr-2 h-4 w-4" />
                <span>Due soon! {getDueTimeText()} remaining</span>
              </div>
            )}

          {isOverdue && (
            <div className="flex items-center text-sm text-red-600 dark:text-red-400">
              <AlertCircle className="mr-2 h-4 w-4" />
              <span>
                Overdue by {Math.abs(differenceInDays(now, dueDate))} day
                {Math.abs(differenceInDays(now, dueDate)) !== 1 ? "s" : ""}
                {assignment.lateSubmission
                  ? ` • Late submission allowed (${assignment.lateSubmissionPenalty})`
                  : " • Late submission not allowed"}
              </span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onSelect}>
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Button>

          {assignment.status === "draft-saved" && (
            <Button variant="outline" size="sm" onClick={() => onContinueDraft(assignment)}>
              <Pencil className="mr-2 h-4 w-4" />
              Continue Draft
            </Button>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuItem onClick={onSelect}>
              <Eye className="mr-2 h-4 w-4" />
              View Assignment
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onSelect}>
              <BookOpen className="mr-2 h-4 w-4" />
              View Course
            </DropdownMenuItem>
            {(assignment.status === "not-started" ||
              assignment.status === "in-progress" ||
              assignment.status === "draft-saved") && (
              <DropdownMenuItem onClick={onSelect}>
                <Upload className="mr-2 h-4 w-4" />
                Submit Assignment
              </DropdownMenuItem>
            )}
            {assignment.status === "graded" && (
              <DropdownMenuItem onClick={onSelect}>
                <Download className="mr-2 h-4 w-4" />
                Download Feedback
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onSelect}>
              <Info className="mr-2 h-4 w-4" />
              Assignment Info
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  )
}

// Helper function to get status badge
function getAssignmentStatusBadge(status: string, isOverdue: boolean) {
  if (isOverdue && (status === "not-started" || status === "in-progress" || status === "draft-saved")) {
    return <Badge variant="destructive">Overdue</Badge>
  }

  switch (status) {
    case "submitted":
      return <Badge variant="secondary">Submitted</Badge>
    case "graded":
      return <Badge className="bg-green-500 hover:bg-green-600">Graded</Badge>
    case "in-progress":
      return <Badge variant="default">In Progress</Badge>
    case "draft-saved":
      return (
        <Badge variant="outline" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
          Draft Saved
        </Badge>
      )
    case "not-started":
      return <Badge variant="outline">Not Started</Badge>
    case "overdue":
      return <Badge variant="destructive">Overdue</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

// Empty State Component
function EmptyState({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 border rounded-lg bg-muted/30">
      {icon}
      <h3 className="text-lg font-medium mt-3">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1 text-center">{description}</p>
    </div>
  )
}

