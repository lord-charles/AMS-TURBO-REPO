"use client"

import * as React from "react"
import {
  AlertCircle,
  Book,
  BookOpen,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  ExternalLink,
  Eye,
  FileText,
  Filter,
  Info,
  Laptop,
  Loader2,
  MapPin,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Share,
  Timer,
  User,
  Video,
  X,
} from "lucide-react"
import { addDays, eachDayOfInterval, endOfWeek, format, getDay, isToday, startOfWeek } from "date-fns"
import { cn } from "@/lib/utils"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Spinner } from "@/components/ui/spinner"

export function TimetableTab() {
  const [activeSubTab, setActiveSubTab] = React.useState("today")
  const [currentDate, setCurrentDate] = React.useState(new Date())
  const [currentWeek, setCurrentWeek] = React.useState(startOfWeek(new Date(), { weekStartsOn: 1 }))
  const [isLoading, setIsLoading] = React.useState(false)
  const [selectedClass, setSelectedClass] = React.useState<any>(null)
  const [selectedExam, setSelectedExam] = React.useState<any>(null)
  const [showAddEvent, setShowAddEvent] = React.useState(false)
  const [showFilters, setShowFilters] = React.useState(false)
  const [filterCourse, setFilterCourse] = React.useState("all")
  const [filterType, setFilterType] = React.useState("all")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [calendarView, setCalendarView] = React.useState<"day" | "week">("week")
  const [showReminders, setShowReminders] = React.useState(true)
  const [showLocationMap, setShowLocationMap] = React.useState(false)

  const isMobile = useMediaQuery("(max-width: 640px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")

  // Mock data for classes with enhanced information
  const classes = [
    {
      id: "class1",
      courseCode: "CS301",
      courseName: "Data Structures & Algorithms",
      day: "Monday",
      startTime: "10:00",
      endTime: "11:30",
      location: "Block B, Room 203",
      building: "Computer Science Building",
      lecturer: {
        name: "Dr. Sarah Johnson",
        email: "s.johnson@university.edu",
        office: "CS Building, Room 405",
        officeHours: "Tuesdays 14:00-16:00",
      },
      type: "lecture",
      materials: [
        { title: "Lecture Slides", type: "pdf", url: "#" },
        { title: "Reading Assignment", type: "text", url: "#" },
      ],
      attendance: 85,
      color: "#4f46e5", // Indigo
      virtualOption: {
        available: true,
        platform: "Zoom",
        link: "https://zoom.us/j/123456789",
      },
      notes: "Midterm exam review session",
    },
    {
      id: "class2",
      courseCode: "CS301",
      courseName: "Data Structures & Algorithms",
      day: "Wednesday",
      startTime: "10:00",
      endTime: "11:30",
      location: "Block B, Room 203",
      building: "Computer Science Building",
      lecturer: {
        name: "Dr. Sarah Johnson",
        email: "s.johnson@university.edu",
        office: "CS Building, Room 405",
        officeHours: "Tuesdays 14:00-16:00",
      },
      type: "lecture",
      materials: [{ title: "Lecture Slides", type: "pdf", url: "#" }],
      attendance: 90,
      color: "#4f46e5", // Indigo
      virtualOption: {
        available: true,
        platform: "Zoom",
        link: "https://zoom.us/j/123456789",
      },
    },
    {
      id: "class3",
      courseCode: "CS301",
      courseName: "Data Structures & Algorithms",
      day: "Friday",
      startTime: "14:00",
      endTime: "16:00",
      location: "Computer Lab 1",
      building: "Computer Science Building",
      lecturer: {
        name: "Mr. James Wilson",
        email: "j.wilson@university.edu",
        office: "CS Building, Room 302",
        officeHours: "Wednesdays 10:00-12:00",
      },
      type: "practical",
      materials: [
        { title: "Lab Assignment", type: "pdf", url: "#" },
        { title: "Code Samples", type: "code", url: "#" },
      ],
      attendance: 95,
      color: "#4f46e5", // Indigo
      virtualOption: {
        available: false,
      },
      notes: "Bring your laptop with development environment set up",
    },
    {
      id: "class4",
      courseCode: "CS305",
      courseName: "Database Systems",
      day: "Tuesday",
      startTime: "14:00",
      endTime: "15:30",
      location: "Computer Lab 2",
      building: "Computer Science Building",
      lecturer: {
        name: "Prof. Michael Chen",
        email: "m.chen@university.edu",
        office: "CS Building, Room 410",
        officeHours: "Thursdays 13:00-15:00",
      },
      type: "lecture",
      materials: [
        { title: "Lecture Notes", type: "pdf", url: "#" },
        { title: "Database Design Example", type: "pdf", url: "#" },
      ],
      attendance: 88,
      color: "#0891b2", // Cyan
      virtualOption: {
        available: true,
        platform: "Microsoft Teams",
        link: "https://teams.microsoft.com/l/meetup-join/...",
      },
    },
    {
      id: "class5",
      courseCode: "CS305",
      courseName: "Database Systems",
      day: "Thursday",
      startTime: "14:00",
      endTime: "15:30",
      location: "Computer Lab 2",
      building: "Computer Science Building",
      lecturer: {
        name: "Prof. Michael Chen",
        email: "m.chen@university.edu",
        office: "CS Building, Room 410",
        officeHours: "Thursdays 13:00-15:00",
      },
      type: "lecture",
      materials: [{ title: "Lecture Notes", type: "pdf", url: "#" }],
      attendance: 85,
      color: "#0891b2", // Cyan
      virtualOption: {
        available: true,
        platform: "Microsoft Teams",
        link: "https://teams.microsoft.com/l/meetup-join/...",
      },
    },
    {
      id: "class6",
      courseCode: "MATH201",
      courseName: "Discrete Mathematics",
      day: "Monday",
      startTime: "08:00",
      endTime: "09:30",
      location: "Block A, Room 105",
      building: "Mathematics Building",
      lecturer: {
        name: "Dr. Robert Williams",
        email: "r.williams@university.edu",
        office: "Math Building, Room 203",
        officeHours: "Mondays 14:00-16:00",
      },
      type: "lecture",
      materials: [
        { title: "Lecture Notes", type: "pdf", url: "#" },
        { title: "Problem Set", type: "pdf", url: "#" },
      ],
      attendance: 75,
      color: "#ca8a04", // Yellow
      virtualOption: {
        available: false,
      },
    },
    {
      id: "class7",
      courseCode: "MATH201",
      courseName: "Discrete Mathematics",
      day: "Friday",
      startTime: "08:00",
      endTime: "09:30",
      location: "Block A, Room 105",
      building: "Mathematics Building",
      lecturer: {
        name: "Dr. Robert Williams",
        email: "r.williams@university.edu",
        office: "Math Building, Room 203",
        officeHours: "Mondays 14:00-16:00",
      },
      type: "lecture",
      materials: [{ title: "Lecture Notes", type: "pdf", url: "#" }],
      attendance: 80,
      color: "#ca8a04", // Yellow
      virtualOption: {
        available: false,
      },
    },
    {
      id: "class8",
      courseCode: "ENG203",
      courseName: "Technical Communication",
      day: "Wednesday",
      startTime: "14:00",
      endTime: "16:00",
      location: "Block C, Room 110",
      building: "Arts Building",
      lecturer: {
        name: "Prof. Emily Parker",
        email: "e.parker@university.edu",
        office: "Arts Building, Room 305",
        officeHours: "Fridays 10:00-12:00",
      },
      type: "lecture",
      materials: [
        { title: "Writing Guidelines", type: "pdf", url: "#" },
        { title: "Sample Reports", type: "pdf", url: "#" },
      ],
      attendance: 92,
      color: "#be185d", // Pink
      virtualOption: {
        available: true,
        platform: "Google Meet",
        link: "https://meet.google.com/abc-defg-hij",
      },
      notes: "Presentation assignments will be discussed",
    },
    {
      id: "class9",
      courseCode: "CS205",
      courseName: "Computer Networks",
      day: "Tuesday",
      startTime: "11:00",
      endTime: "12:30",
      location: "Block B, Room 105",
      building: "Computer Science Building",
      lecturer: {
        name: "Dr. James Wilson",
        email: "j.wilson@university.edu",
        office: "CS Building, Room 302",
        officeHours: "Wednesdays 10:00-12:00",
      },
      type: "lecture",
      materials: [
        { title: "Lecture Notes", type: "pdf", url: "#" },
        { title: "Network Diagrams", type: "pdf", url: "#" },
      ],
      attendance: 82,
      color: "#15803d", // Green
      virtualOption: {
        available: true,
        platform: "Zoom",
        link: "https://zoom.us/j/987654321",
      },
    },
    {
      id: "class10",
      courseCode: "CS205",
      courseName: "Computer Networks",
      day: "Thursday",
      startTime: "11:00",
      endTime: "12:30",
      location: "Block B, Room 105",
      building: "Computer Science Building",
      lecturer: {
        name: "Dr. James Wilson",
        email: "j.wilson@university.edu",
        office: "CS Building, Room 302",
        officeHours: "Wednesdays 10:00-12:00",
      },
      type: "lecture",
      materials: [{ title: "Lecture Notes", type: "pdf", url: "#" }],
      attendance: 85,
      color: "#15803d", // Green
      virtualOption: {
        available: true,
        platform: "Zoom",
        link: "https://zoom.us/j/987654321",
      },
    },
  ]

  // Mock data for exams with enhanced information
  const exams = [
    {
      id: "exam1",
      courseCode: "CS301",
      courseName: "Data Structures & Algorithms",
      date: "2023-11-18",
      startTime: "09:00",
      endTime: "11:00",
      location: "Examination Hall 1",
      building: "Main Campus",
      type: "midterm",
      weight: "30%",
      topics: ["Binary Trees", "Graph Algorithms", "Sorting Algorithms", "Algorithm Analysis"],
      materials: [
        { title: "Study Guide", type: "pdf", url: "#" },
        { title: "Practice Questions", type: "pdf", url: "#" },
      ],
      instructions: "Bring student ID, calculator, and two blue pens. No electronic devices allowed.",
      color: "#4f46e5", // Indigo
    },
    {
      id: "exam2",
      courseCode: "CS305",
      courseName: "Database Systems",
      date: "2023-11-12",
      startTime: "14:00",
      endTime: "15:00",
      location: "Computer Lab 2",
      building: "Computer Science Building",
      type: "quiz",
      weight: "15%",
      topics: ["SQL Queries", "Normalization", "Entity-Relationship Diagrams"],
      materials: [{ title: "Review Notes", type: "pdf", url: "#" }],
      instructions: "Open book quiz. Bring your laptop with MySQL installed.",
      color: "#0891b2", // Cyan
    },
    {
      id: "exam3",
      courseCode: "MATH201",
      courseName: "Discrete Mathematics",
      date: "2023-11-20",
      startTime: "10:00",
      endTime: "12:00",
      location: "Examination Hall 2",
      building: "Main Campus",
      type: "midterm",
      weight: "25%",
      topics: ["Set Theory", "Combinatorics", "Graph Theory", "Boolean Algebra"],
      materials: [
        { title: "Formula Sheet", type: "pdf", url: "#" },
        { title: "Practice Problems", type: "pdf", url: "#" },
      ],
      instructions: "Closed book exam. Non-programmable calculators allowed.",
      color: "#ca8a04", // Yellow
    },
    {
      id: "exam4",
      courseCode: "ENG203",
      courseName: "Technical Communication",
      date: "2023-11-15",
      startTime: "14:00",
      endTime: "14:15",
      location: "Presentation Room 1",
      building: "Arts Building",
      type: "presentation",
      weight: "20%",
      topics: ["Technical Report Structure", "Visual Communication", "Audience Analysis"],
      materials: [{ title: "Presentation Guidelines", type: "pdf", url: "#" }],
      instructions: "5-minute presentation followed by Q&A. Bring your slides on a USB drive.",
      color: "#be185d", // Pink
    },
    {
      id: "exam5",
      courseCode: "CS205",
      courseName: "Computer Networks",
      date: "2023-11-07",
      startTime: "11:00",
      endTime: "11:45",
      location: "Block B, Room 105",
      building: "Computer Science Building",
      type: "quiz",
      weight: "10%",
      topics: ["OSI Model", "TCP/IP Protocol Suite", "Network Addressing"],
      materials: [{ title: "Study Guide", type: "pdf", url: "#" }],
      instructions: "Closed book quiz. No calculators or electronic devices allowed.",
      color: "#15803d", // Green
    },
    {
      id: "exam6",
      courseCode: "CS301",
      courseName: "Data Structures & Algorithms",
      date: "2023-12-15",
      startTime: "09:00",
      endTime: "12:00",
      location: "Examination Hall 1",
      building: "Main Campus",
      type: "final",
      weight: "50%",
      topics: ["All course topics", "Special focus on advanced algorithms"],
      materials: [
        { title: "Comprehensive Study Guide", type: "pdf", url: "#" },
        { title: "Past Papers", type: "pdf", url: "#" },
      ],
      instructions: "Closed book exam. Bring student ID and blue pens. No electronic devices allowed.",
      color: "#4f46e5", // Indigo
    },
    {
      id: "exam7",
      courseCode: "CS305",
      courseName: "Database Systems",
      date: "2023-12-18",
      startTime: "14:00",
      endTime: "17:00",
      location: "Examination Hall 2",
      building: "Main Campus",
      type: "final",
      weight: "50%",
      topics: ["All course topics", "Database design project defense"],
      materials: [{ title: "Exam Preparation Guide", type: "pdf", url: "#" }],
      instructions: "Bring student ID and project documentation. No electronic devices allowed.",
      color: "#0891b2", // Cyan
    },
    {
      id: "exam8",
      courseCode: "MATH201",
      courseName: "Discrete Mathematics",
      date: "2023-12-12",
      startTime: "09:00",
      endTime: "12:00",
      location: "Examination Hall 1",
      building: "Main Campus",
      type: "final",
      weight: "50%",
      topics: ["All course topics", "Special focus on proofs"],
      materials: [
        { title: "Formula Sheet", type: "pdf", url: "#" },
        { title: "Practice Final", type: "pdf", url: "#" },
      ],
      instructions: "Closed book exam. Non-programmable calculators allowed.",
      color: "#ca8a04", // Yellow
    },
    {
      id: "exam9",
      courseCode: "ENG203",
      courseName: "Technical Communication",
      date: "2023-12-10",
      startTime: "14:00",
      endTime: "16:00",
      location: "Block C, Room 110",
      building: "Arts Building",
      type: "final",
      weight: "40%",
      topics: ["Technical writing", "Documentation standards", "Professional communication"],
      materials: [{ title: "Writing Guidelines", type: "pdf", url: "#" }],
      instructions: "Open book exam. Bring your style guide and dictionary.",
      color: "#be185d", // Pink
    },
    {
      id: "exam10",
      courseCode: "CS205",
      courseName: "Computer Networks",
      date: "2023-12-20",
      startTime: "09:00",
      endTime: "12:00",
      location: "Examination Hall 2",
      building: "Main Campus",
      type: "final",
      weight: "50%",
      topics: ["All course topics", "Network design and troubleshooting"],
      materials: [
        { title: "Study Guide", type: "pdf", url: "#" },
        { title: "Network Diagrams", type: "pdf", url: "#" },
      ],
      instructions: "Closed book exam. No calculators or electronic devices allowed.",
      color: "#15803d", // Green
    },
  ]

  // Get unique courses for filtering
  const uniqueCourses = React.useMemo(() => {
    const courses = new Set<string>()
    classes.forEach((cls) => courses.add(cls.courseCode))
    return Array.from(courses)
  }, [classes])

  // Get day name from number (0-6)
  const getDayName = (dayNumber: number) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    return days[dayNumber]
  }

  // Get today's classes
  const getTodayClasses = () => {
    const today = getDayName(getDay(new Date()))
    return classes.filter((cls) => cls.day === today)
  }

  // Get classes for a specific day
  const getClassesForDay = (day: string) => {
    return classes
      .filter((cls) => cls.day === day)
      .sort((a, b) => {
        // Sort by start time
        if (a.startTime < b.startTime) return -1
        if (a.startTime > b.startTime) return 1
        return 0
      })
  }

  // Filter classes based on search and filters
  const filteredClasses = React.useMemo(() => {
    return classes.filter((cls) => {
      const matchesSearch =
        searchQuery === "" ||
        cls.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cls.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cls.location.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCourse = filterCourse === "all" || cls.courseCode === filterCourse
      const matchesType = filterType === "all" || cls.type === filterType

      return matchesSearch && matchesCourse && matchesType
    })
  }, [searchQuery, filterCourse, filterType, classes])

  // Get upcoming exams
  const getUpcomingExams = () => {
    const today = new Date()
    return exams
      .filter((exam) => new Date(exam.date) >= today)
      .sort((a, b) => {
        // Sort by date
        if (new Date(a.date) < new Date(b.date)) return -1
        if (new Date(a.date) > new Date(b.date)) return 1
        // If same date, sort by start time
        if (a.startTime < b.startTime) return -1
        if (a.startTime > b.startTime) return 1
        return 0
      })
  }

  // Filter exams based on search and filters
  const filteredExams = React.useMemo(() => {
    return exams.filter((exam) => {
      const matchesSearch =
        searchQuery === "" ||
        exam.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.location.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCourse = filterCourse === "all" || exam.courseCode === filterCourse
      const matchesType = filterType === "all" || exam.type === filterType

      return matchesSearch && matchesCourse && matchesType
    })
  }, [searchQuery, filterCourse, filterType, exams])

  // Get days of current week
  const daysOfWeek = React.useMemo(() => {
    return eachDayOfInterval({
      start: currentWeek,
      end: endOfWeek(currentWeek, { weekStartsOn: 1 }),
    })
  }, [currentWeek])

  // Navigate to previous week
  const goToPreviousWeek = () => {
    setCurrentWeek((prevWeek) => addDays(prevWeek, -7))
  }

  // Navigate to next week
  const goToNextWeek = () => {
    setCurrentWeek((prevWeek) => addDays(prevWeek, 7))
  }

  // Navigate to current week
  const goToCurrentWeek = () => {
    setCurrentWeek(startOfWeek(new Date(), { weekStartsOn: 1 }))
  }

  // Format date
  const formatDate = (date: string | Date) => {
    return format(new Date(date), "MMMM d, yyyy")
  }

  // Format time
  const formatTime = (time: string) => {
    // Convert 24-hour format to 12-hour format
    const [hours, minutes] = time.split(":")
    const hour = Number.parseInt(hours, 10)
    const ampm = hour >= 12 ? "PM" : "AM"
    const hour12 = hour % 12 || 12
    return `${hour12}:${minutes} ${ampm}`
  }

  // Get class type badge
  const getClassTypeBadge = (type: string) => {
    switch (type) {
      case "lecture":
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20">
            Lecture
          </Badge>
        )
      case "practical":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20">
            Practical
          </Badge>
        )
      case "tutorial":
        return (
          <Badge
            variant="outline"
            className="bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 border-purple-500/20"
          >
            Tutorial
          </Badge>
        )
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  // Get exam type badge
  const getExamTypeBadge = (type: string) => {
    switch (type) {
      case "midterm":
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-amber-500/20">
            Midterm
          </Badge>
        )
      case "final":
        return <Badge variant="destructive">Final</Badge>
      case "quiz":
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20">
            Quiz
          </Badge>
        )
      case "presentation":
        return (
          <Badge
            variant="outline"
            className="bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 border-purple-500/20"
          >
            Presentation
          </Badge>
        )
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  // Get days until exam
  const getDaysUntilExam = (examDate: string) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const date = new Date(examDate)
    date.setHours(0, 0, 0, 0)

    const diffTime = date.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Tomorrow"
    if (diffDays < 0) return "Passed"
    return `${diffDays} days`
  }

  // Handle download timetable (mock)
  const handleDownloadTimetable = (format: string) => {
    setIsLoading(true)
    // Simulate download delay
    setTimeout(() => {
      setIsLoading(false)
      console.log(`Downloading timetable in ${format} format`)
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

  // Get time block position for weekly view
  const getTimeBlockPosition = (startTime: string, endTime: string) => {
    // Convert time to minutes since 8:00 AM (assuming 8:00 AM is the start of the day)
    const [startHour, startMinute] = startTime.split(":").map(Number)
    const [endHour, endMinute] = endTime.split(":").map(Number)

    const startMinutes = (startHour - 8) * 60 + startMinute
    const endMinutes = (endHour - 8) * 60 + endMinute

    // Calculate top position (start time) and height (duration)
    const top = (startMinutes / 60) * 4 // 4rem per hour
    const height = ((endMinutes - startMinutes) / 60) * 4

    return { top: `${top}rem`, height: `${height}rem` }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="today" value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
          <h2 className="text-xl font-bold">Class Schedule</h2>
          <div className="flex items-center gap-2">
            <TabsList>
              <TabsTrigger value="today" className="text-sm">
                Today
              </TabsTrigger>
              <TabsTrigger value="weekly" className="text-sm">
                Weekly
              </TabsTrigger>
              <TabsTrigger value="exams" className="text-sm">
                Exams
              </TabsTrigger>
            </TabsList>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleDownloadTimetable("ics")}>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Export to Calendar</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDownloadTimetable("pdf")}>
                  <Download className="mr-2 h-4 w-4" />
                  <span>Download as PDF</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowFilters(true)}>
                  <Filter className="mr-2 h-4 w-4" />
                  <span>Filter Options</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setShowAddEvent(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  <span>Add Event</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Today's Classes Tab */}
        <TabsContent value="today" className="space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <Spinner className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-medium">Today's Schedule</h3>
                  <p className="text-sm text-muted-foreground">{format(new Date(), "EEEE, MMMM d, yyyy")}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search classes..."
                      className="w-full sm:w-[200px] pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto"
                    onClick={() => handleDownloadTimetable("ics")}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export Schedule
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {getTodayClasses().length > 0 ? (
                  getTodayClasses()
                    .filter((cls) => {
                      return (
                        searchQuery === "" ||
                        cls.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        cls.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        cls.location.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                    })
                    .sort((a, b) => a.startTime.localeCompare(b.startTime))
                    .map((cls) => (
                      <Card key={cls.id} className="overflow-hidden hover:shadow-md transition-shadow duration-200">
                        <div className="w-1 h-full absolute left-0" style={{ backgroundColor: cls.color }} />
                        <CardHeader className="pb-2">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <CardTitle className="text-lg flex items-center gap-2">
                                {cls.courseCode}: {cls.courseName}
                                {cls.notes && (
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <Info className="h-4 w-4 text-muted-foreground" />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p className="max-w-xs">{cls.notes}</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                )}
                              </CardTitle>
                              <CardDescription className="flex items-center gap-2">
                                <span>
                                  {formatTime(cls.startTime)} - {formatTime(cls.endTime)}
                                </span>
                                {cls.virtualOption.available && (
                                  <Badge
                                    variant="outline"
                                    className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20"
                                  >
                                    <Video className="mr-1 h-3 w-3" />
                                    Virtual
                                  </Badge>
                                )}
                              </CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                              {getClassTypeBadge(cls.type)}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                                onClick={() => setSelectedClass(cls)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                Details
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                            <div className="sm:col-span-8 space-y-2">
                              <div className="flex items-center text-sm">
                                <MapPin className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0" />
                                <span>{cls.location}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <User className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0" />
                                <span>{cls.lecturer.name}</span>
                              </div>
                            </div>
                            <div className="sm:col-span-4">
                              <div className="flex flex-col space-y-1">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-muted-foreground">Attendance:</span>
                                  <span className="font-medium">{cls.attendance}%</span>
                                </div>
                                <Progress value={cls.attendance} className="h-2" />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex flex-wrap justify-between pt-0 gap-2">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="h-8">
                              <Book className="mr-2 h-4 w-4" />
                              Materials
                            </Button>
                            {cls.virtualOption.available && (
                              <Button variant="default" size="sm" className="h-8">
                                <Video className="mr-2 h-4 w-4" />
                                Join Virtual
                              </Button>
                            )}
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8">
                                <MoreHorizontal className="mr-2 h-4 w-4" />
                                Options
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                              <DropdownMenuItem>
                                <FileText className="mr-2 h-4 w-4" />
                                <span>View Materials</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <MapPin className="mr-2 h-4 w-4" />
                                <span>View on Campus Map</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Pencil className="mr-2 h-4 w-4" />
                                <span>View Assignments</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Calendar className="mr-2 h-4 w-4" />
                                <span>Add to Calendar</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Share className="mr-2 h-4 w-4" />
                                <span>Share Class Details</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </CardFooter>
                      </Card>
                    ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 px-4 border rounded-lg bg-muted/30">
                    <Calendar className="h-12 w-12 text-muted-foreground mb-3" />
                    <h3 className="text-lg font-medium">No Classes Today</h3>
                    <p className="text-sm text-muted-foreground mt-1 text-center max-w-md">
                      You don't have any scheduled classes for today. Consider checking your upcoming exams or
                      assignments.
                    </p>
                    <div className="flex items-center gap-2 mt-4">
                      <Button variant="outline" onClick={() => setActiveSubTab("weekly")}>
                        View Week
                      </Button>
                      <Button variant="default" onClick={() => setActiveSubTab("exams")}>
                        Check Exams
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </TabsContent>

        {/* Weekly Schedule Tab */}
        <TabsContent value="weekly" className="space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-medium">Weekly Schedule</h3>
                  <p className="text-sm text-muted-foreground">
                    {format(currentWeek, "MMMM d")} -{" "}
                    {format(endOfWeek(currentWeek, { weekStartsOn: 1 }), "MMMM d, yyyy")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={goToPreviousWeek} className="h-9 w-9">
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Previous Week</span>
                  </Button>
                  <Button variant="outline" size="sm" onClick={goToCurrentWeek} className="h-9">
                    Today
                  </Button>
                  <Button variant="outline" size="icon" onClick={goToNextWeek} className="h-9 w-9">
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Next Week</span>
                  </Button>
                  <Select value={calendarView} onValueChange={(value) => setCalendarView(value as "day" | "week")}>
                    <SelectTrigger className="w-[100px] h-9">
                      <SelectValue placeholder="View" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">Day</SelectItem>
                      <SelectItem value="week">Week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-lg border bg-card overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-5 border-b">
                  {daysOfWeek.slice(0, 5).map((day) => (
                    <div
                      key={format(day, "yyyy-MM-dd")}
                      className={cn(
                        "py-2 px-3 text-center border-r last:border-r-0",
                        isToday(day) && "bg-primary/10 font-medium",
                      )}
                    >
                      <div className="text-sm">{format(day, "EEEE")}</div>
                      <div className={cn("text-xs text-muted-foreground", isToday(day) && "text-foreground")}>
                        {format(day, "MMM d")}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 min-h-[500px] relative">
                  {daysOfWeek.slice(0, 5).map((day) => {
                    const dayName = format(day, "EEEE")
                    const dayClasses = getClassesForDay(dayName)
                    const isCurrentDay = isToday(day)

                    return (
                      <div
                        key={format(day, "yyyy-MM-dd")}
                        className={cn("border-r min-h-[500px] relative", isCurrentDay && "bg-primary/5")}
                      >
                        {dayClasses.length > 0 ? (
                          <div className="relative p-2">
                            {dayClasses.map((cls) => {
                              const { top, height } = getTimeBlockPosition(cls.startTime, cls.endTime)

                              return (
                                <div
                                  key={cls.id}
                                  className="absolute rounded-md border left-2 right-2 p-2 flex flex-col overflow-hidden shadow-sm cursor-pointer transition-all hover:shadow-md"
                                  style={{
                                    top,
                                    height,
                                    backgroundColor: `${cls.color}10`,
                                    borderColor: `${cls.color}40`,
                                    borderLeft: `3px solid ${cls.color}`,
                                  }}
                                  onClick={() => setSelectedClass(cls)}
                                >
                                  <div className="font-medium text-sm truncate">{cls.courseCode}</div>
                                  <div className="text-xs text-muted-foreground truncate">{cls.location}</div>
                                  <div className="text-xs mt-auto">
                                    {formatTime(cls.startTime)} - {formatTime(cls.endTime)}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full text-center p-4">
                            <Info className="h-8 w-8 text-muted-foreground/50 mb-2" />
                            <p className="text-sm font-medium">No Classes</p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                  {/* Time Indicators */}
                  <div className="absolute left-0 top-0 w-full h-full pointer-events-none">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute left-0 right-0 border-t border-dashed border-border/50"
                        style={{ top: `${i * 4}rem` }}
                      >
                        <div className="absolute -top-2.5 -left-0.5 text-xs text-muted-foreground bg-card px-1">
                          {format(new Date().setHours(8 + i, 0, 0), "h:mm a")}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {searchQuery && (
                <div className="space-y-4 pt-4">
                  <h3 className="text-lg font-medium">Search Results</h3>
                  {filteredClasses.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {filteredClasses.map((cls) => (
                        <Card key={cls.id} className="overflow-hidden hover:shadow-md transition-shadow duration-200">
                          <div className="w-1 h-full absolute left-0" style={{ backgroundColor: cls.color }} />
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <div>
                                <CardTitle className="text-sm">{cls.courseCode}</CardTitle>
                                <CardDescription className="text-xs">
                                  {cls.day}, {formatTime(cls.startTime)}
                                </CardDescription>
                              </div>
                              {getClassTypeBadge(cls.type)}
                            </div>
                          </CardHeader>
                          <CardContent className="pb-2 text-sm">
                            <p className="font-medium line-clamp-1">{cls.courseName}</p>
                            <div className="text-xs text-muted-foreground mt-1">{cls.location}</div>
                          </CardContent>
                          <CardFooter className="pt-0">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full h-7 text-xs"
                              onClick={() => setSelectedClass(cls)}
                            >
                              <Eye className="mr-1 h-3 w-3" />
                              View Details
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-6 border rounded-lg bg-muted/30">
                      <Search className="h-10 w-10 text-muted-foreground mb-3" />
                      <h3 className="text-lg font-medium">No Classes Found</h3>
                      <p className="text-sm text-muted-foreground mt-1 text-center">
                        No classes match your search query "{searchQuery}".
                      </p>
                      <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
                        Clear Search
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </TabsContent>

        {/* Exams Schedule Tab */}
        <TabsContent value="exams" className="space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-medium">Exam Schedule</h3>
                  <p className="text-sm text-muted-foreground">Upcoming exams and assessments</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search exams..."
                      className="w-full sm:w-[200px] pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto"
                    onClick={() => handleDownloadTimetable("pdf")}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export Exam Schedule
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                {/* Group exams by month */}
                {["November", "December"].map((month) => {
                  const monthExams = getUpcomingExams().filter((exam) => {
                    const examDate = new Date(exam.date)
                    return (
                      examDate.toLocaleString("default", { month: "long" }) === month &&
                      (searchQuery === "" ||
                        exam.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        exam.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        exam.location.toLowerCase().includes(searchQuery.toLowerCase()))
                    )
                  })

                  if (monthExams.length === 0) return null

                  return (
                    <div key={month}>
                      <h4 className="text-base font-medium mb-3 flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        {month} 2023
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {monthExams.map((exam) => (
                          <Card
                            key={exam.id}
                            className="overflow-hidden hover:shadow-md transition-shadow duration-200"
                          >
                            <div className="w-1 h-full absolute left-0" style={{ backgroundColor: exam.color }} />
                            <CardHeader className="pb-2">
                              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                                <div>
                                  <CardTitle className="text-lg flex items-center gap-2">
                                    {exam.courseCode}: {exam.courseName}
                                  </CardTitle>
                                  <CardDescription>
                                    {formatDate(exam.date)} • {formatTime(exam.startTime)} - {formatTime(exam.endTime)}
                                  </CardDescription>
                                </div>
                                <div className="flex items-center gap-2">
                                  {getExamTypeBadge(exam.type)}
                                  <Badge variant="outline" className="whitespace-nowrap">
                                    {getDaysUntilExam(exam.date)}
                                  </Badge>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="pb-2">
                              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                                <div className="sm:col-span-8 space-y-2">
                                  <div className="flex items-center text-sm">
                                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0" />
                                    <span>
                                      {exam.location}, {exam.building}
                                    </span>
                                  </div>
                                  <div className="flex items-center text-sm">
                                    <AlertCircle className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0" />
                                    <span className="text-muted-foreground">Weight: {exam.weight}</span>
                                  </div>
                                </div>
                                <div className="sm:col-span-4">
                                  <div className="flex flex-col space-y-1">
                                    <div className="flex items-center justify-between text-sm">
                                      <span className="text-muted-foreground">Topics:</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {exam.topics.slice(0, 2).map((topic, i) => (
                                        <Badge key={i} variant="secondary" className="text-xs">
                                          {topic}
                                        </Badge>
                                      ))}
                                      {exam.topics.length > 2 && (
                                        <Badge variant="secondary" className="text-xs">
                                          +{exam.topics.length - 2} more
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="flex flex-wrap justify-between pt-2 gap-2">
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" className="h-8">
                                  <Book className="mr-2 h-4 w-4" />
                                  Study Materials
                                </Button>
                                <Button
                                  variant="default"
                                  size="sm"
                                  className="h-8"
                                  onClick={() => setSelectedExam(exam)}
                                >
                                  <Eye className="mr-2 h-4 w-4" />
                                  Details
                                </Button>
                              </div>
                              <div className="flex items-center">
                                <Button variant="ghost" size="sm" className="h-8">
                                  <Calendar className="mr-2 h-4 w-4" />
                                  Add to Calendar
                                </Button>
                              </div>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )
                })}

                {searchQuery !== "" && filteredExams.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 px-4 border rounded-lg bg-muted/30">
                    <Search className="h-12 w-12 text-muted-foreground mb-3" />
                    <h3 className="text-lg font-medium">No Matching Exams</h3>
                    <p className="text-sm text-muted-foreground mt-1 text-center">
                      No exams match your search query "{searchQuery}".
                    </p>
                    <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
                      Clear Search
                    </Button>
                  </div>
                )}

                {getUpcomingExams().length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 px-4 border rounded-lg bg-muted/30">
                    <Calendar className="h-12 w-12 text-muted-foreground mb-3" />
                    <h3 className="text-lg font-medium">No Upcoming Exams</h3>
                    <p className="text-sm text-muted-foreground mt-1 text-center max-w-md">
                      You don't have any upcoming exams scheduled. Check back later or contact your academic advisor if
                      you expect to see exams here.
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-muted/30 border rounded-lg p-4">
                <div className="flex items-start">
                  <div className="mr-4 mt-1 flex-shrink-0">
                    <AlertCircle className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Exam Guidelines</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li className="flex items-start">
                          <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                          Arrive at least 15 minutes before exam time
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                          Bring your student ID card for verification
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                          Check permitted materials for each exam
                        </li>
                      </ul>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li className="flex items-start">
                          <X className="h-4 w-4 mr-2 mt-0.5 text-red-500" />
                          Mobile phones must be turned off and stored away
                        </li>
                        <li className="flex items-start">
                          <X className="h-4 w-4 mr-2 mt-0.5 text-red-500" />
                          No unauthorized materials at your desk
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                          In case of illness, notify the examination office
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>

      {/* Class Details Dialog */}
      <Dialog open={!!selectedClass} onOpenChange={(open) => !open && setSelectedClass(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedClass?.color }} />
              {selectedClass?.courseCode}: {selectedClass?.courseName}
            </DialogTitle>
            <DialogDescription>
              {selectedClass?.day}, {selectedClass && formatTime(selectedClass.startTime)} -{" "}
              {selectedClass && formatTime(selectedClass.endTime)}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="flex items-start gap-4">
              <div className="bg-muted rounded-md p-2 flex items-center justify-center">
                {selectedClass?.type === "lecture" ? (
                  <BookOpen className="h-8 w-8 text-blue-500" />
                ) : selectedClass?.type === "practical" ? (
                  <Laptop className="h-8 w-8 text-green-500" />
                ) : (
                  <Book className="h-8 w-8 text-purple-500" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-medium">
                  {selectedClass?.type.charAt(0).toUpperCase() + (selectedClass?.type?.slice(1) || "")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Location: {selectedClass?.location}, {selectedClass?.building}
                </p>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="text-sm font-medium mb-2">Lecturer Information</h4>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    {selectedClass?.lecturer.name
                      .split(" ")
                      .map((n:any) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{selectedClass?.lecturer.name}</p>
                  <p className="text-xs text-muted-foreground">{selectedClass?.lecturer.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-sm">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                  <span>Office: {selectedClass?.lecturer.office}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                  <span>Office Hours: {selectedClass?.lecturer.officeHours}</span>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="text-sm font-medium mb-2">Course Materials</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedClass?.materials.map((material:any, index:number) => (
                  <Button key={index} variant="outline" size="sm" className="justify-start" asChild>
                    <a href={material.url} target="_blank" rel="noopener noreferrer">
                      <FileText className="h-4 w-4 mr-2" />
                      {material.title}
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            {selectedClass?.virtualOption.available && (
              <>
                <Separator />

                <div>
                  <h4 className="text-sm font-medium mb-2">Virtual Option</h4>
                  <div className="bg-blue-50 dark:bg-blue-950/50 text-blue-900 dark:text-blue-100 rounded-md p-3 flex items-start">
                    <Video className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">{selectedClass?.virtualOption.platform}</p>
                      <p className="text-sm mt-1">
                        This class has a virtual attendance option. Click the button below to join the virtual session.
                      </p>
                      <Button size="sm" className="mt-2" asChild>
                        <a href={selectedClass?.virtualOption.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Join Virtual Class
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {selectedClass?.notes && (
              <>
                <Separator />

                <div>
                  <h4 className="text-sm font-medium mb-2">Notes</h4>
                  <div className="bg-amber-50 dark:bg-amber-950/50 text-amber-900 dark:text-amber-100 rounded-md p-3">
                    <div className="flex">
                      <Info className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0" />
                      <p>{selectedClass?.notes}</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <DialogFooter className="flex items-center justify-between flex-row">
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground mr-2">Attendance:</span>
              <span className="font-medium text-sm">{selectedClass?.attendance}%</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setSelectedClass(null)}>
                Close
              </Button>
              <Button>
                <Calendar className="mr-2 h-4 w-4" />
                Add to Calendar
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Exam Details Dialog */}
      <Dialog open={!!selectedExam} onOpenChange={(open) => !open && setSelectedExam(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedExam?.color }} />
              {selectedExam?.courseCode}: {selectedExam?.courseName}
            </DialogTitle>
            <DialogDescription>
              {selectedExam && formatDate(selectedExam.date)} • {selectedExam && formatTime(selectedExam.startTime)} -{" "}
              {selectedExam && formatTime(selectedExam.endTime)}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="flex items-start gap-4">
              <div className="bg-muted rounded-md p-2 flex items-center justify-center">
                {selectedExam?.type === "midterm" ? (
                  <Book className="h-8 w-8 text-amber-500" />
                ) : selectedExam?.type === "final" ? (
                  <FileText className="h-8 w-8 text-red-500" />
                ) : selectedExam?.type === "quiz" ? (
                  <Timer className="h-8 w-8 text-blue-500" />
                ) : (
                  <Pencil className="h-8 w-8 text-purple-500" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">
                    {selectedExam?.type.charAt(0).toUpperCase() + selectedExam?.type.slice(1)} Exam
                  </h3>
                  {getExamTypeBadge(selectedExam?.type || "")}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Location: {selectedExam?.location}, {selectedExam?.building}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline">Weight: {selectedExam?.weight}</Badge>
                  <Badge variant="outline">{selectedExam && getDaysUntilExam(selectedExam.date)}</Badge>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="text-sm font-medium mb-2">Exam Topics</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedExam?.topics.map((topic:any, index:number) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="text-sm font-medium mb-2">Study Materials</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedExam?.materials.map((material:any, index:number) => (
                  <Button key={index} variant="outline" size="sm" className="justify-start" asChild>
                    <a href={material.url} target="_blank" rel="noopener noreferrer">
                      <FileText className="h-4 w-4 mr-2" />
                      {material.title}
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="text-sm font-medium mb-2">Exam Instructions</h4>
              <div className="bg-muted rounded-md p-3">
                <p className="text-sm">{selectedExam?.instructions}</p>
              </div>
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" className="sm:mr-auto" asChild>
              <a href="#">
                <Book className="mr-2 h-4 w-4" />
                Go to Course
              </a>
            </Button>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button variant="outline" onClick={() => setSelectedExam(null)} className="flex-1 sm:flex-initial">
                Close
              </Button>
              <Button className="flex-1 sm:flex-initial">
                <Calendar className="mr-2 h-4 w-4" />
                Add to Calendar
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Filters Dialog */}
      <Dialog open={showFilters} onOpenChange={setShowFilters}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Filter Options</DialogTitle>
            <DialogDescription>Filter your schedule by course and type.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="course-filter">Course</Label>
              <Select value={filterCourse} onValueChange={setFilterCourse}>
                <SelectTrigger id="course-filter">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {uniqueCourses.map((course) => (
                    <SelectItem key={course} value={course}>
                      {course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type-filter">Type</Label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger id="type-filter">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="lecture">Lecture</SelectItem>
                  <SelectItem value="practical">Practical</SelectItem>
                  <SelectItem value="tutorial">Tutorial</SelectItem>
                  {activeSubTab === "exams" && (
                    <>
                      <SelectItem value="midterm">Midterm</SelectItem>
                      <SelectItem value="final">Final</SelectItem>
                      <SelectItem value="quiz">Quiz</SelectItem>
                      <SelectItem value="presentation">Presentation</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="reminders">Show Reminders</Label>
                <Switch id="reminders" checked={showReminders} onCheckedChange={setShowReminders} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="location-map">Show Location Map</Label>
                <Switch id="location-map" checked={showLocationMap} onCheckedChange={setShowLocationMap} />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setFilterCourse("all")
                setFilterType("all")
                setSearchQuery("")
              }}
            >
              Reset Filters
            </Button>
            <Button onClick={() => setShowFilters(false)}>Apply Filters</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Event Dialog */}
      <Dialog open={showAddEvent} onOpenChange={setShowAddEvent}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Event</DialogTitle>
            <DialogDescription>Add a personal event to your schedule.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-title" className="text-right">
                Title
              </Label>
              <Input id="event-title" placeholder="Event title" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-date" className="text-right">
                Date
              </Label>
              <Input id="event-date" type="date" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-start-time" className="text-right">
                Start Time
              </Label>
              <Input id="event-start-time" type="time" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-end-time" className="text-right">
                End Time
              </Label>
              <Input id="event-end-time" type="time" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-location" className="text-right">
                Location
              </Label>
              <Input id="event-location" placeholder="Event location" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-color" className="text-right">
                Color
              </Label>
              <div className="col-span-3 flex gap-2">
                {["#4f46e5", "#0891b2", "#ca8a04", "#be185d", "#15803d"].map((color) => (
                  <div key={color} className="w-8 h-8 rounded-full cursor-pointer" style={{ backgroundColor: color }} />
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddEvent(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Handle adding event
                setShowAddEvent(false)
              }}
            >
              Add Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

