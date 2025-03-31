"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  AlertCircle,
  CheckCircle2,
  Download,
  FileText,
  Info,
  Printer,
  RefreshCw,
  XCircle,
  MapPin,
  Calendar,
  Clock,
  AlertTriangle,
  Building2,
  ChevronRight,
  Share2,
  Eye,
  EyeOff,
  Shield,
  BookOpen,
  User,
  CalendarClock,
  FileBarChart2,
  ClipboardList,
  CalendarDays,
  Copy,
  QrCode,
  Filter,
  Search,
  CheckCheck,
  HelpCircle,
  ClipboardCheck,
  Gauge,
  StickyNote,
  HardHat,
  CircleCheck,
  TableProperties,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/hooks/use-toast"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ExamCardTab() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentSemester, setCurrentSemester] = useState("current")
  const [showExamCard, setShowExamCard] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const [activeTab, setActiveTab] = useState("card")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterView, setFilterView] = useState("all")
  const [cardQRVisible, setCardQRVisible] = useState(false)

  // Mock data for the exam card
  const studentInfo = {
    name: "John Kamau Njoroge",
    regNumber: "SCT221-0123/2020",
    faculty: "School of Computing and Information Technology",
    programme: "Bachelor of Science in Computer Science",
    year: 3,
    semester: 1,
    academicYear: "2025/2024",
    photo: "/placeholder.svg?height=150&width=120",
  }

  const examCardStatus = {
    isCleared: true,
    feeStatus: {
      cleared: true,
      amountPaid: 42000,
      totalFees: 52000,
      percentagePaid: 80,
      minRequiredPercentage: 80,
    },
    courseRegistration: {
      registered: true,
      totalCourses: 6,
      pendingCourses: 0,
    },
    examRoomAssigned: true,
    lastUpdated: "2025-11-15T10:30:00",
  }

  const registeredCourses = [
    {
      code: "CSC 301",
      name: "Database Systems",
      credits: 3,
      examDate: "2025-3-28",
      examTime: "09:00 - 12:00",
      venue: "LT 5",
      building: "Science Complex",
      floor: "Ground Floor",
      status: "confirmed",
    },
    {
      code: "CSC 305",
      name: "Software Engineering",
      credits: 4,
      examDate: "2025-4-28",
      examTime: "14:00 - 17:00",
      venue: "LT 2",
      building: "Engineering Block",
      floor: "1st Floor",
      status: "confirmed",
    },
    {
      code: "CSC 311",
      name: "Computer Networks",
      credits: 3,
      examDate: "2025-5-28",
      examTime: "09:00 - 12:00",
      venue: "LT 3",
      building: "Science Complex",
      floor: "2nd Floor",
      status: "confirmed",
    },
    {
      code: "CSC 315",
      name: "Artificial Intelligence",
      credits: 4,
      examDate: "2025-5-18",
      examTime: "14:00 - 17:00",
      venue: "LT 1",
      building: "Science Complex",
      floor: "Ground Floor",
      status: "pending",
    },
    {
      code: "CSC 321",
      name: "Operating Systems",
      credits: 3,
      examDate: "2025-6-20",
      examTime: "09:00 - 12:00",
      venue: "LT 4",
      building: "Engineering Block",
      floor: "3rd Floor",
      status: "confirmed",
    },
    {
      code: "CSC 325",
      name: "Web Development",
      credits: 3,
      examDate: "2025-6-22",
      examTime: "14:00 - 17:00",
      venue: "LT 6",
      building: "Science Complex",
      floor: "1st Floor",
      status: "pending",
    },
  ]

  const previousSemesters = [
    { id: "sem1", name: "Jan-Apr 2025" },
    { id: "sem2", name: "May-Aug 2025" },
  ]

  const examRules = [
    {
      title: "Before the Exam",
      rules: [
        "Arrive at least 30 minutes before the scheduled start time",
        "Bring your student ID and exam card for verification",
        "Ensure you know your exact seat number and venue",
        "Use the restroom before entering the examination room",
        "Switch off all electronic devices and store them in designated areas",
      ],
    },
    {
      title: "During the Exam",
      rules: [
        "No communication with other candidates is permitted",
        "Raise your hand if you need assistance from an invigilator",
        "No food is allowed (water in clear bottles is permitted)",
        "Do not leave your seat without permission",
        "Use only authorized materials and stationery",
      ],
    },
    {
      title: "After the Exam",
      rules: [
        "Stop writing immediately when instructed",
        "Remain seated until all papers are collected",
        "Leave the examination room quietly",
        "Do not take any examination materials out of the room",
        "Report any concerns to the Chief Invigilator before leaving",
      ],
    },
  ]

  const announcements = [
    {
      id: 1,
      title: "Venue Change for CSC 311",
      message: "Due to renovation works, the exam venue for CSC 311 has been changed from LT 3 to LT 7.",
      date: "2023-11-30T09:00:00",
      severity: "important",
      read: false,
    },
    {
      id: 2,
      title: "Special Accommodations Deadline",
      message: "All requests for special accommodations must be submitted by December 3rd.",
      date: "2023-11-25T14:30:00",
      severity: "info",
      read: true,
    },
    {
      id: 3,
      title: "Exam Timetable Final Version",
      message: "The final version of the exam timetable has been published. Please check for any changes.",
      date: "2023-11-20T11:15:00",
      severity: "info",
      read: true,
    },
  ]

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Reset search when changing filter view
    setSearchQuery("")
  }, [filterView])

  const handleDownload = () => {
    setIsLoading(true)
    // Simulate download delay
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Exam Card Downloaded",
        description: "Your exam card has been downloaded successfully.",
      })
    }, 1500)
  }

  const handlePrint = () => {
    setIsLoading(true)
    // Simulate print delay
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Print Job Sent",
        description: "Your exam card has been sent to the printer.",
      })
    }, 1500)
  }

  const handleRefresh = () => {
    setIsLoading(true)
    // Simulate refresh delay
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Exam Card Refreshed",
        description: "Your exam card information has been updated.",
        variant: "default",
      })
    }, 2000)
  }

  const handleShare = () => {
    toast({
      title: "Share Link Generated",
      description: "A temporary link to your exam card has been copied to clipboard.",
    })
  }

  const handleCopyRegNumber = () => {
    navigator.clipboard.writeText(studentInfo.regNumber)
    toast({
      title: "Registration Number Copied",
      description: "Your registration number has been copied to clipboard.",
    })
  }

  const toggleCardQR = () => {
    setCardQRVisible(!cardQRVisible)
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-KE", options)
  }

  // Format time for display
  const formatTime = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit" }
    return new Date(dateString).toLocaleTimeString("en-KE", options)
  }

  // Format date and time for announcement display
  const formatAnnounceDate = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    
    // Ensure date parsing is reliable
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date string");
    }
  
    // Calculate time difference in days
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
    if (diffDays === 0) {
      return `Today at ${date.toLocaleTimeString("en-KE", { hour: "2-digit", minute: "2-digit" })}`;
    } else if (diffDays === 1) {
      return `Yesterday at ${date.toLocaleTimeString("en-KE", { hour: "2-digit", minute: "2-digit" })}`;
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return formatDate(dateString); // Ensure formatDate is defined
    }
  };
  

  // Filter courses based on search and filter
  const filteredCourses = registeredCourses.filter((course) => {
    const matchesSearch =
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      formatDate(course.examDate).toLowerCase().includes(searchQuery.toLowerCase())

    if (filterView === "all") return matchesSearch
    if (filterView === "confirmed") return matchesSearch && course.status === "confirmed"
    if (filterView === "pending") return matchesSearch && course.status === "pending"

    return matchesSearch
  })

  // Sort courses by date
  const sortedCourses = [...filteredCourses].sort((a, b) => new Date(a?.examDate).getTime() - new Date(b.examDate).getTime())

  // Calculate number of days until first exam
  const calculateDaysUntilExam = () => {
    if (registeredCourses.length === 0) return null

    const firstExam = [...registeredCourses].sort((a, b) => new Date(a.examDate).getTime() - new Date(b.examDate).getTime())[0]
    const today = new Date()
    const examDate = new Date(firstExam.examDate)
    const diffTime = examDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return {
      days: diffDays,
      course: firstExam,
    }
  }

  const daysUntilExam = calculateDaysUntilExam()
  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Page Header with Kenyan University Styling */}
      <div className="rounded-lg bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Exam Card</h2>
            <div className="text-muted-foreground">
              Sep-Dec 2025 Semester •{" "}
              {isLoading ? (
                <Skeleton className="h-4 w-32 inline-block align-middle" />
              ) : (
                <>
                  Last updated: {formatDate(examCardStatus.lastUpdated)} at {formatTime(examCardStatus.lastUpdated)}
                </>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Tabs value={currentSemester} onValueChange={setCurrentSemester} className="w-[260px]">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="current">Current</TabsTrigger>
                <TabsTrigger value="sem1">{previousSemesters[0].id}</TabsTrigger>
                <TabsTrigger value="sem2">{previousSemesters[1].id}</TabsTrigger>
              </TabsList>
            </Tabs>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={handleRefresh} disabled={isLoading}>
                    <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Refresh exam card information</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>

      {/* Main Content with Smart Tabs */}
      <div className="space-y-6">
        {/* Countdown to Exams */}
        {!isLoading && daysUntilExam && daysUntilExam.days > 0 && (
          <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950/20 dark:border-orange-900/30">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex-shrink-0 bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full">
                  <CalendarDays className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="flex-grow text-center md:text-left">
                  <p className="text-orange-800 dark:text-orange-300 font-medium">
                    {daysUntilExam.days} {daysUntilExam.days === 1 ? "day" : "days"} until your first exam
                  </p>
                  <p className="text-orange-700 dark:text-orange-400 text-sm">
                    <span className="font-medium">{daysUntilExam.course.code}:</span> {daysUntilExam.course.name} on{" "}
                    {formatDate(daysUntilExam.course.examDate)}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white dark:bg-transparent border-orange-200 dark:border-orange-800 hover:bg-orange-100 dark:hover:bg-orange-900/30 text-orange-800 dark:text-orange-300"
                  onClick={() => {
                    setActiveTab("schedule")
                    // Scroll to the specific course
                    setTimeout(() => {
                      document
                        .getElementById(`course-${daysUntilExam.course.code.replace(/\s+/g, "-")}`)
                        ?.scrollIntoView({ behavior: "smooth", block: "center" })
                    }, 100)
                  }}
                >
                  View Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Smart Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 border-b">
            <TabsList className="h-auto p-0 bg-transparent flex w-full justify-start overflow-x-auto">
              <TabsTrigger
                value="card"
                className="data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:text-foreground"
              >
                <FileBarChart2 className="h-4 w-4 mr-2" />
                <span>Exam Card</span>
                {!examCardStatus.isCleared && (
                  <Badge variant="destructive" className="ml-2 h-5 px-1.5">
                    !
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="clearance"
                className="data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:text-foreground"
              >
                <Gauge className="h-4 w-4 mr-2" />
                <span>Clearance Status</span>
              </TabsTrigger>
              <TabsTrigger
                value="schedule"
                className="data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:text-foreground"
              >
                <CalendarDays className="h-4 w-4 mr-2" />
                <span>Exam Schedule</span>
              </TabsTrigger>
              <TabsTrigger
                value="rules"
                className="data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:text-foreground"
              >
                <ClipboardList className="h-4 w-4 mr-2" />
                <span>Rules & Info</span>
              </TabsTrigger>
              <TabsTrigger
                value="announcements"
                className="data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:text-foreground"
              >
                <StickyNote className="h-4 w-4 mr-2" />
                <span>Announcements</span>
                {announcements.some((a) => !a.read) && (
                  <Badge variant="default" className="ml-2 h-5 px-1.5">
                    {announcements.filter((a) => !a.read).length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Exam Card Tab Content */}
          <TabsContent value="card" className="mt-6 space-y-6">
            {/* Digital Exam Card Preview */}
            {examCardStatus.isCleared ? (
              <Card className="border-primary/20 overflow-hidden">
                <CardHeader className="bg-primary/5 pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg flex items-center">
                      <Shield className="mr-2 h-5 w-5 text-primary" />
                      Digital Exam Card
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setPreviewMode(!previewMode)}>
                              {previewMode ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
                              {previewMode ? "Close Preview" : "Full Preview"}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{previewMode ? "Close full preview mode" : "View full exam card preview"}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <Button variant="ghost" size="sm" onClick={handleShare}>
                        <Share2 className="h-4 w-4 mr-1" /> Share
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {!showExamCard && !previewMode ? (
                    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <FileText className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Your Exam Card is Ready</h3>
                      <p className="text-muted-foreground max-w-md mb-6">
                        You have been cleared for the Sep-Dec 2025 examinations. Click below to view your digital exam
                        card.
                      </p>
                      <Button onClick={() => setShowExamCard(true)}>View Exam Card</Button>
                    </div>
                  ) : (
                    <div className={cn("transition-all duration-300", previewMode ? "p-6" : "p-4")}>
                      {/* Exam Card Design - Styled for Kenyan Universities */}
                      <div
                        className={cn(
                          "border rounded-lg overflow-hidden transition-all duration-300 bg-white dark:bg-slate-900",
                          previewMode ? "max-w-4xl mx-auto shadow-lg" : "",
                        )}
                      >
                        {/* University Header */}
                        <div className="bg-primary text-primary-foreground p-4 text-center relative overflow-hidden">
                          <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent_70%)]"></div>
                          </div>
                          <div className="relative z-10">
                            <h3 className="text-lg md:text-xl font-bold uppercase tracking-wider">
                              Strathmore University
                            </h3>
                            <p className="text-sm md:text-base opacity-90">EXAMINATION CARD</p>
                            <p className="text-xs md:text-sm opacity-80 mt-1">Sep-Dec 2025 Semester</p>
                          </div>
                        </div>

                        {/* Student Information */}
                        <div className="p-4 md:p-6 flex flex-col md:flex-row gap-4 border-b">
                          <div className="md:w-1/4 flex justify-center">
                            {isLoading ? (
                              <Skeleton className="h-[150px] w-[120px] rounded" />
                            ) : (
                              <div className="relative">
                                <div className="border-2 border-gray-200 dark:border-gray-700 rounded overflow-hidden">
                                  <img
                                    src={studentInfo.photo || "/placeholder.svg"}
                                    alt="Student Photo"
                                    className="h-[150px] w-[120px] object-cover"
                                  />
                                </div>
                                {cardQRVisible && (
                                  <div className="absolute -bottom-2 -right-2 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-1 border border-gray-200 dark:border-gray-700">
                                    <img
                                      src="/placeholder.svg?height=60&width=60"
                                      alt="QR Code"
                                      className="h-14 w-14"
                                    />
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                          <div className="md:w-3/4 space-y-3">
                            {isLoading ? (
                              <div className="space-y-3">
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                                <Skeleton className="h-4 w-2/3" />
                                <Skeleton className="h-4 w-1/3" />
                              </div>
                            ) : (
                              <>
                                <div className="flex justify-between items-start">
                                  <h4 className="text-lg font-bold">{studentInfo.name}</h4>
                                  <div className="flex gap-1">
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7"
                                            onClick={handleCopyRegNumber}
                                          >
                                            <Copy className="h-3.5 w-3.5" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>Copy registration number</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7"
                                            onClick={toggleCardQR}
                                          >
                                            <QrCode className="h-3.5 w-3.5" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>{cardQRVisible ? "Hide" : "Show"} verification QR code</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                  <div>
                                    <span className="text-muted-foreground">Registration Number:</span>
                                    <p className="font-medium">{studentInfo.regNumber}</p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Programme:</span>
                                    <p className="font-medium">{studentInfo.programme}</p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Faculty:</span>
                                    <p className="font-medium">{studentInfo.faculty}</p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Year & Semester:</span>
                                    <p className="font-medium">
                                      Year {studentInfo.year}, Semester {studentInfo.semester}
                                    </p>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Clearance Status */}
                        <div className="p-4 border-b">
                          <h4 className="font-semibold mb-2 flex items-center">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mr-1" /> Clearance Status
                          </h4>
                          {isLoading ? (
                            <div className="space-y-2">
                              <Skeleton className="h-4 w-full" />
                              <Skeleton className="h-4 w-3/4" />
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                <span>Fees: {examCardStatus.feeStatus.percentagePaid}% Paid</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                <span>Courses: All {examCardStatus.courseRegistration.totalCourses} Registered</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                <span>Venues: All Assigned</span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Registered Courses */}
                        <div className="p-4">
                          <h4 className="font-semibold mb-3 flex items-center">
                            <BookOpen className="h-4 w-4 text-primary mr-1" /> Registered Courses & Exam Schedule
                          </h4>
                          {isLoading ? (
                            <div className="space-y-2">
                              <Skeleton className="h-4 w-full" />
                              <Skeleton className="h-4 w-full" />
                              <Skeleton className="h-4 w-full" />
                            </div>
                          ) : (
                            <div className="text-sm">
                              <table className="w-full border-collapse">
                                <thead>
                                  <tr className="border-b">
                                    <th className="text-left py-2 font-medium">Course</th>
                                    <th className="text-left py-2 font-medium hidden md:table-cell">Credits</th>
                                    <th className="text-left py-2 font-medium">Date</th>
                                    <th className="text-left py-2 font-medium hidden md:table-cell">Time</th>
                                    <th className="text-left py-2 font-medium">Venue</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {registeredCourses.map((course, index) => (
                                    <tr
                                      key={course.code}
                                      className={index !== registeredCourses.length - 1 ? "border-b" : ""}
                                    >
                                      <td className="py-2">
                                        <div className="font-medium">{course.code}</div>
                                        <div className="text-muted-foreground text-xs md:hidden">{course.name}</div>
                                      </td>
                                      <td className="py-2 hidden md:table-cell">{course.credits}</td>
                                      <td className="py-2">
                                        <div>{formatDate(course.examDate)}</div>
                                        <div className="text-muted-foreground text-xs md:hidden">{course.examTime}</div>
                                      </td>
                                      <td className="py-2 hidden md:table-cell">{course.examTime}</td>
                                      <td className="py-2">
                                        <TooltipProvider>
                                          <Tooltip>
                                            <TooltipTrigger className="underline decoration-dotted underline-offset-4">
                                              {course.venue}
                                            </TooltipTrigger>
                                            <TooltipContent className="flex flex-col gap-1">
                                              <div className="flex items-center gap-1 text-xs">
                                                <Building2 className="h-3 w-3" />
                                                <span>{course.building}</span>
                                              </div>
                                              <div className="flex items-center gap-1 text-xs">
                                                <MapPin className="h-3 w-3" />
                                                <span>{course.floor}</span>
                                              </div>
                                            </TooltipContent>
                                          </Tooltip>
                                        </TooltipProvider>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>

                        {/* Verification & Footer */}
                        <div className="bg-muted/30 p-4 text-sm">
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                            <div className="flex items-center gap-2">
                              <CalendarClock className="h-4 w-4 text-muted-foreground" />
                              <span>Valid until: December 31, 2025</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span>Verified by: Examinations Office</span>
                            </div>
                          </div>
                          <div className="mt-3 text-xs text-center text-muted-foreground">
                            This digital exam card must be presented along with your student ID card to gain entry to
                            examination venues.
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      {previewMode && (
                        <div className="flex justify-center mt-6 gap-3">
                          <Button variant="outline" onClick={handlePrint} disabled={isLoading}>
                            <Printer className="mr-2 h-4 w-4" /> Print
                          </Button>
                          <Button onClick={handleDownload} disabled={isLoading}>
                            <Download className="mr-2 h-4 w-4" /> Download
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
                {!previewMode && (
                  <CardFooter className="flex justify-end gap-3 pt-2 bg-muted/10">
                    <Button
                      variant="outline"
                      onClick={handlePrint}
                      disabled={!examCardStatus.isCleared || isLoading || !showExamCard}
                    >
                      <Printer className="mr-2 h-4 w-4" /> Print
                    </Button>
                    <Button onClick={handleDownload} disabled={!examCardStatus.isCleared || isLoading || !showExamCard}>
                      <Download className="mr-2 h-4 w-4" /> Download
                    </Button>
                  </CardFooter>
                )}
              </Card>
            ) : (
              <Card className="border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900/30">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                      <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-red-800 dark:text-red-300">Not Cleared for Exams</h3>
                    <p className="text-red-700 dark:text-red-400 max-w-md mb-6">
                      You have outstanding issues that need to be resolved before you can access your exam card.
                    </p>
                    <Button
                      onClick={() => setActiveTab("clearance")}
                      className="bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600"
                    >
                      View Clearance Status
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Links for Exam Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="bg-primary/10 rounded-full p-3 h-10 w-10 flex items-center justify-center">
                      <CalendarDays className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">View Exam Schedule</h3>
                      <p className="text-sm text-muted-foreground mb-3">See your full examination timetable</p>
                      <Button variant="secondary" size="sm" onClick={() => setActiveTab("schedule")}>
                        View Schedule
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="bg-primary/10 rounded-full p-3 h-10 w-10 flex items-center justify-center">
                      <HardHat className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Exam Rules & Info</h3>
                      <p className="text-sm text-muted-foreground mb-3">Important rules and guidelines</p>
                      <Button variant="secondary" size="sm" onClick={() => setActiveTab("rules")}>
                        View Rules
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="bg-primary/10 rounded-full p-3 h-10 w-10 flex items-center justify-center">
                      <HelpCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Need Help?</h3>
                      <p className="text-sm text-muted-foreground mb-3">Contact examination support</p>
                      <Button variant="secondary" size="sm">
                        Get Support
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Clearance Status Tab Content */}
          <TabsContent value="clearance" className="mt-6 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-primary" />
                  Exam Clearance Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Overall Status */}
                  <div className="flex-1">
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        {isLoading ? (
                          <div className="flex flex-col items-center">
                            <Skeleton className="h-16 w-16 rounded-full" />
                            <Skeleton className="h-6 w-32 mt-4" />
                            <Skeleton className="h-4 w-48 mt-2" />
                          </div>
                        ) : examCardStatus.isCleared ? (
                          <>
                            <div className="inline-flex items-center justify-center p-4 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                              <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-500" />
                            </div>
                            <h3 className="text-xl font-medium text-green-600 dark:text-green-500">
                              Cleared for Exams
                            </h3>
                            <p className="text-muted-foreground mt-1">You can download your exam card</p>
                          </>
                        ) : (
                          <>
                            <div className="inline-flex items-center justify-center p-4 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
                              <XCircle className="h-10 w-10 text-red-600 dark:text-red-500" />
                            </div>
                            <h3 className="text-xl font-medium text-red-600 dark:text-red-500">Not Cleared</h3>
                            <p className="text-muted-foreground mt-1">Please resolve the issues below</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Detailed Status */}
                  <div className="flex-[2]">
                    <div className="space-y-4">
                      {/* Fee Payment Status */}
                      <div className="flex items-start gap-3">
                        {isLoading ? (
                          <Skeleton className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        ) : examCardStatus.feeStatus.cleared ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-500 mt-0.5 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">Fee Payment</h4>
                            {isLoading ? (
                              <Skeleton className="h-5 w-16" />
                            ) : (
                              <Badge variant={examCardStatus.feeStatus.cleared ? "outline" : "destructive"}>
                                {examCardStatus.feeStatus.cleared ? "Cleared" : "Not Cleared"}
                              </Badge>
                            )}
                          </div>
                          <div className="mt-2">
                            {isLoading ? (
                              <>
                                <Skeleton className="h-4 w-full mb-1" />
                                <Skeleton className="h-2 w-full" />
                              </>
                            ) : (
                              <>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>
                                    KES {examCardStatus.feeStatus.amountPaid.toLocaleString()} paid of KES{" "}
                                    {examCardStatus.feeStatus.totalFees.toLocaleString()}
                                  </span>
                                  <span className="font-medium">{examCardStatus.feeStatus.percentagePaid}%</span>
                                </div>
                                <div className="relative pt-1">
                                  <div className="flex mb-1 items-center justify-between">
                                    <div>
                                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary bg-primary/10">
                                        {examCardStatus.feeStatus.percentagePaid}%
                                      </span>
                                    </div>
                                    <div className="text-right">
                                      <span className="text-xs font-semibold inline-block text-primary">
                                        {examCardStatus.feeStatus.minRequiredPercentage}% Required
                                      </span>
                                    </div>
                                  </div>
                                  <div className="overflow-hidden h-2 text-xs flex rounded bg-primary/10">
                                    <div
                                      style={{ width: `${examCardStatus.feeStatus.percentagePaid}%` }}
                                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                                    ></div>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                          {!isLoading && !examCardStatus.feeStatus.cleared && (
                            <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded text-sm text-red-600 dark:text-red-400">
                              <div className="flex gap-2">
                                <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="font-medium">Action Required</p>
                                  <p className="mt-1">
                                    Please clear your outstanding balance to access your exam card. Visit the finance
                                    office or make a payment online.
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Course Registration Status */}
                      <div className="flex items-start gap-3">
                        {isLoading ? (
                          <Skeleton className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        ) : examCardStatus.courseRegistration.registered ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-500 mt-0.5 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">Course Registration</h4>
                            {isLoading ? (
                              <Skeleton className="h-5 w-16" />
                            ) : (
                              <Badge variant={examCardStatus.courseRegistration.registered ? "outline" : "destructive"}>
                                {examCardStatus.courseRegistration.registered ? "Verified" : "Incomplete"}
                              </Badge>
                            )}
                          </div>
                          {isLoading ? (
                            <Skeleton className="h-4 w-3/4 mt-1" />
                          ) : (
                            <p className="text-sm text-muted-foreground mt-1">
                              {examCardStatus.courseRegistration.totalCourses} courses registered for this semester
                            </p>
                          )}
                          {!isLoading && examCardStatus.courseRegistration.pendingCourses > 0 && (
                            <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                              {examCardStatus.courseRegistration.pendingCourses} courses pending registration
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Exam Room Assignment */}
                      <div className="flex items-start gap-3">
                        {isLoading ? (
                          <Skeleton className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        ) : examCardStatus.examRoomAssigned ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                        ) : (
                          <Info className="h-5 w-5 text-amber-600 dark:text-amber-500 mt-0.5 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">Exam Room Assignment</h4>
                            {isLoading ? (
                              <Skeleton className="h-5 w-16" />
                            ) : (
                              <Badge variant={examCardStatus.examRoomAssigned ? "outline" : "secondary"}>
                                {examCardStatus.examRoomAssigned ? "Assigned" : "Pending"}
                              </Badge>
                            )}
                          </div>
                          {isLoading ? (
                            <Skeleton className="h-4 w-full mt-1" />
                          ) : (
                            <p className="text-sm text-muted-foreground mt-1">
                              {examCardStatus.examRoomAssigned
                                ? "Exam venues have been assigned for all courses"
                                : "Exam venues will be assigned 1 week before exams"}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Clearance Information */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <ClipboardCheck className="mr-2 h-5 w-5 text-primary" />
                  Clearance Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-medium mb-3">Examination Fee Requirements</h3>
                    <ul className="space-y-3">
                      <li className="flex gap-3">
                        <div className="mt-0.5 flex-shrink-0">
                          <CircleCheck className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Minimum Payment Threshold</p>
                          <p className="text-sm text-muted-foreground">
                            Students must have paid at least 80% of their total semester fees to be eligible for
                            examinations.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <div className="mt-0.5 flex-shrink-0">
                          <CircleCheck className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Late Payment Penalties</p>
                          <p className="text-sm text-muted-foreground">
                            A 5% late payment fee will be applied to all fees paid after the payment deadline.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <div className="mt-0.5 flex-shrink-0">
                          <CircleCheck className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Special Circumstances</p>
                          <p className="text-sm text-muted-foreground">
                            Students facing financial hardship may apply for a fee payment plan through the Finance
                            Office.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-medium mb-3">Academic Requirements</h3>
                    <ul className="space-y-3">
                      <li className="flex gap-3">
                        <div className="mt-0.5 flex-shrink-0">
                          <CircleCheck className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Course Registration</p>
                          <p className="text-sm text-muted-foreground">
                            All courses must be properly registered with the Academic Registrar's office.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <div className="mt-0.5 flex-shrink-0">
                          <CircleCheck className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Class Attendance</p>
                          <p className="text-sm text-muted-foreground">
                            Students must have attended at least 75% of all lectures and practical sessions.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <div className="mt-0.5 flex-shrink-0">
                          <CircleCheck className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Continuous Assessment Tests (CATs)</p>
                          <p className="text-sm text-muted-foreground">
                            All required CATs and assignments must be completed and submitted.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-medium mb-3">Administrative Requirements</h3>
                    <ul className="space-y-3">
                      <li className="flex gap-3">
                        <div className="mt-0.5 flex-shrink-0">
                          <CircleCheck className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Student ID Card</p>
                          <p className="text-sm text-muted-foreground">
                            Students must have a valid student ID card for the current academic year.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <div className="mt-0.5 flex-shrink-0">
                          <CircleCheck className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Library Clearance</p>
                          <p className="text-sm text-muted-foreground">
                            All borrowed books must be returned to the library and fines cleared.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <div className="mt-0.5 flex-shrink-0">
                          <CircleCheck className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Disciplinary Status</p>
                          <p className="text-sm text-muted-foreground">
                            Students must not be under any disciplinary action that bars them from examinations.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Exam Schedule Tab Content */}
          <TabsContent value="schedule" className="mt-6 space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search courses..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">
                      <Filter className="h-4 w-4 mr-2" />
                      <span>
                        {filterView === "all" ? "All Courses" : filterView === "confirmed" ? "Confirmed" : "Pending"}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setFilterView("all")}>
                      <span className={filterView === "all" ? "font-medium" : ""}>All Courses</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterView("confirmed")}>
                      <span className={filterView === "confirmed" ? "font-medium" : ""}>Confirmed Only</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterView("pending")}>
                      <span className={filterView === "pending" ? "font-medium" : ""}>Pending Only</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isLoading}>
                        <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Refresh exam schedule</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            {/* Schedule View Tabs */}
            <Card>
              <CardContent className="pt-6">
                <Tabs defaultValue="table" className="w-full">
                  <TabsList className="w-full grid grid-cols-2 mb-4">
                    <TabsTrigger value="table" className="flex items-center gap-2">
                      <TableProperties className="h-4 w-4" />
                      <span>Table View</span>
                    </TabsTrigger>
                    <TabsTrigger value="calendar" className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" />
                      <span>Calendar View</span>
                    </TabsTrigger>
                  </TabsList>

                  {/* Table View */}
                  <TabsContent value="table">
                    <div className="rounded-md border overflow-hidden">
                      {isLoading ? (
                        <div className="space-y-3 p-4">
                          <Skeleton className="h-8 w-full" />
                          <Skeleton className="h-12 w-full" />
                          <Skeleton className="h-12 w-full" />
                          <Skeleton className="h-12 w-full" />
                        </div>
                      ) : filteredCourses.length === 0 ? (
                        <div className="text-center py-8">
                          <div className="inline-flex items-center justify-center p-4 bg-muted rounded-full mb-4">
                            <Search className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <h3 className="text-lg font-medium mb-2">No courses found</h3>
                          <p className="text-muted-foreground mb-4">
                            {searchQuery ? `No courses match "${searchQuery}"` : "No courses match the selected filter"}
                          </p>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setSearchQuery("")
                              setFilterView("all")
                            }}
                          >
                            Reset Search & Filters
                          </Button>
                        </div>
                      ) : (
                        <Table>
                          <TableHeader className="bg-muted/50">
                            <TableRow>
                              <TableHead>Course Code</TableHead>
                              <TableHead className="hidden md:table-cell">Course Name</TableHead>
                              <TableHead className="hidden md:table-cell">Credits</TableHead>
                              <TableHead>Exam Date</TableHead>
                              <TableHead className="hidden md:table-cell">Time</TableHead>
                              <TableHead>Venue</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {sortedCourses.map((course) => (
                              <TableRow
                                key={course.code}
                                className="hover:bg-muted/30 transition-colors"
                                id={`course-${course.code.replace(/\s+/g, "-")}`}
                              >
                                <TableCell className="font-medium">{course.code}</TableCell>
                                <TableCell className="hidden md:table-cell">{course.name}</TableCell>
                                <TableCell className="hidden md:table-cell">{course.credits}</TableCell>
                                <TableCell>{formatDate(course.examDate)}</TableCell>
                                <TableCell className="hidden md:table-cell">{course.examTime}</TableCell>
                                <TableCell>
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger className="underline decoration-dotted underline-offset-4 flex items-center">
                                        {course.venue} <ChevronRight className="h-3 w-3 ml-1 opacity-70" />
                                      </TooltipTrigger>
                                      <TooltipContent className="p-3 space-y-2">
                                        <div className="font-medium">{course.building}</div>
                                        <div className="flex items-center gap-1 text-xs">
                                          <MapPin className="h-3 w-3" />
                                          <span>{course.floor}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs">
                                          <Clock className="h-3 w-3" />
                                          <span>{course.examTime}</span>
                                        </div>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </TableCell>
                                <TableCell>
                                  {course.status === "confirmed" ? (
                                    <Badge
                                      variant="outline"
                                      className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30"
                                    >
                                      <CheckCheck className="h-3 w-3 mr-1" /> Confirmed
                                    </Badge>
                                  ) : (
                                    <Badge
                                      variant="outline"
                                      className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-900/30"
                                    >
                                      <Clock className="h-3 w-3 mr-1" /> Pending
                                    </Badge>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}
                    </div>
                    {!isLoading && registeredCourses.length > 0 && filteredCourses.length > 0 && (
                      <div className="mt-4 text-sm text-muted-foreground">
                        Showing {filteredCourses.length} of {registeredCourses.length} courses
                        {searchQuery && <span> matching "{searchQuery}"</span>}
                        {filterView !== "all" && <span> with status "{filterView}"</span>}
                      </div>
                    )}
                  </TabsContent>

                  {/* Calendar View */}
                  <TabsContent value="calendar">
                    {isLoading ? (
                      <Skeleton className="h-48 w-full" />
                    ) : filteredCourses.length === 0 ? (
                      <div className="text-center py-8">
                        <div className="inline-flex items-center justify-center p-4 bg-muted rounded-full mb-4">
                          <Search className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">No courses found</h3>
                        <p className="text-muted-foreground mb-4">
                          {searchQuery ? `No courses match "${searchQuery}"` : "No courses match the selected filter"}
                        </p>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setSearchQuery("")
                            setFilterView("all")
                          }}
                        >
                          Reset Search & Filters
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {sortedCourses.map((course, index) => (
                          <div key={course.code} className="flex gap-3">
                            <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-lg flex flex-col items-center justify-center text-center">
                              <span className="text-sm font-medium">
                                {new Date(course.examDate).toLocaleDateString("en-KE", { month: "short" })}
                              </span>
                              <span className="text-xl font-bold">{new Date(course.examDate).getDate()}</span>
                            </div>

                            <div className="flex-grow border-l-2 pl-4 pb-6 relative border-muted-foreground/20">
                              {/* Timeline connector */}
                              {index !== sortedCourses.length - 1 && (
                                <div className="absolute top-6 bottom-0 left-[-1px] w-[2px] bg-muted-foreground/20"></div>
                              )}

                              {/* Timeline dot */}
                              <div className="absolute top-1 left-[-5px] h-3 w-3 rounded-full bg-primary"></div>

                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{course.code}</span>
                                  {course.status === "confirmed" ? (
                                    <Badge
                                      variant="outline"
                                      className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30"
                                    >
                                      <CheckCheck className="h-3 w-3 mr-1" /> Confirmed
                                    </Badge>
                                  ) : (
                                    <Badge
                                      variant="outline"
                                      className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-900/30"
                                    >
                                      <Clock className="h-3 w-3 mr-1" /> Pending
                                    </Badge>
                                  )}
                                </div>
                                <p>{course.name}</p>
                                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                                  <div className="flex items-center">
                                    <Clock className="h-3.5 w-3.5 mr-1" />
                                    <span>{course.examTime}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <MapPin className="h-3.5 w-3.5 mr-1" />
                                    <span>
                                      {course.venue}, {course.building}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rules & Info Tab Content */}
          <TabsContent value="rules" className="mt-6 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-primary" />
                  Examination Rules & Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-24 w-full" />
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Rules Sections */}
                    {examRules.map((section, index) => (
                      <div key={index} className="p-4 bg-muted/20 rounded-lg">
                        <h3 className="font-medium text-lg mb-4 flex items-center">
                          {index === 0 ? (
                            <Clock className="h-5 w-5 mr-2 text-primary" />
                          ) : index === 1 ? (
                            <HardHat className="h-5 w-5 mr-2 text-primary" />
                          ) : (
                            <CheckCheck className="h-5 w-5 mr-2 text-primary" />
                          )}
                          {section.title}
                        </h3>
                        <ul className="space-y-3">
                          {section.rules.map((rule, ruleIndex) => (
                            <li key={ruleIndex} className="flex gap-2">
                              <div className="mt-1 flex-shrink-0">
                                <div className="h-2 w-2 rounded-full bg-primary mt-1.5"></div>
                              </div>
                              <p>{rule}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}

                    {/* Additional Information */}
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger className="hover:bg-muted/30 px-3 rounded-md">
                          Exam Card Requirements
                        </AccordionTrigger>
                        <AccordionContent className="px-3">
                          <div className="p-3 bg-muted/20 rounded-md">
                            <ul className="list-disc pl-5 space-y-2">
                              <li>You must present your exam card and student ID to enter the examination room.</li>
                              <li>
                                Ensure your exam card is printed in color and is not damaged or altered in any way.
                              </li>
                              <li>Exam cards are valid only for the semester they are issued.</li>
                              <li>Digital exam cards must be downloaded before the examination period begins.</li>
                            </ul>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger className="hover:bg-muted/30 px-3 rounded-md">
                          Special Accommodations
                        </AccordionTrigger>
                        <AccordionContent className="px-3">
                          <div className="p-3 bg-muted/20 rounded-md">
                            <p className="mb-2">
                              Students requiring special accommodations for examinations must submit their requests to
                              the Examinations Office at least two weeks before the examination period begins.
                            </p>
                            <p>
                              Supporting documentation from the Disability Services Office must accompany all requests.
                            </p>
                            <div className="mt-3 p-3 bg-primary/5 rounded border border-primary/10">
                              <h5 className="font-medium mb-1">Contact Information:</h5>
                              <p className="text-sm">
                                Examinations Office: <span className="font-medium">exams@knu.ac.ke</span>
                              </p>
                              <p className="text-sm">
                                Disability Services: <span className="font-medium">disability@knu.ac.ke</span>
                              </p>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                        <AccordionTrigger className="hover:bg-muted/30 px-3 rounded-md">
                          Missing an Examination
                        </AccordionTrigger>
                        <AccordionContent className="px-3">
                          <div className="p-3 bg-muted/20 rounded-md">
                            <p className="mb-2">
                              If you miss an examination due to illness or other extenuating circumstances, you must:
                            </p>
                            <ol className="list-decimal pl-5 space-y-2">
                              <li>Notify the Examinations Office within 24 hours of the missed examination.</li>
                              <li>Submit a medical certificate or other relevant documentation within 7 days.</li>
                              <li>
                                Complete a Special Consideration form available from the Examinations Office or online
                                portal.
                              </li>
                            </ol>
                            <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 rounded">
                              <div className="flex gap-2">
                                <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-amber-800 dark:text-amber-400">
                                  Failure to follow these procedures may result in a grade of zero for the missed
                                  examination.
                                </p>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-4">
                        <AccordionTrigger className="hover:bg-muted/30 px-3 rounded-md">
                          Academic Misconduct
                        </AccordionTrigger>
                        <AccordionContent className="px-3">
                          <div className="p-3 bg-muted/20 rounded-md">
                            <p className="mb-2">
                              The university takes academic misconduct very seriously. The following actions are
                              considered academic misconduct:
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                              <li>Cheating, including using unauthorized materials or devices</li>
                              <li>Impersonation (having someone else take an exam for you)</li>
                              <li>Plagiarism or collusion</li>
                              <li>Disruptive behavior during examinations</li>
                              <li>Possession of electronic devices capable of storing or retrieving information</li>
                            </ul>
                            <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded">
                              <div className="flex gap-2">
                                <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-red-800 dark:text-red-400">
                                  Penalties for academic misconduct may include a zero grade for the examination, course
                                  failure, suspension, or expulsion from the university.
                                </p>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Examination FAQs */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <HelpCircle className="mr-2 h-5 w-5 text-primary" />
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="faq-1">
                    <AccordionTrigger className="hover:bg-muted/30 px-3 rounded-md">
                      What should I do if I arrive late for an examination?
                    </AccordionTrigger>
                    <AccordionContent className="px-3">
                      <div className="p-3 bg-muted/20 rounded-md">
                        <p>
                          If you arrive within 30 minutes of the examination start time, you will be admitted but will
                          not receive additional time. If you arrive more than 30 minutes late, you will not be allowed
                          to enter the examination room and will need to apply for a deferred examination through the
                          Examinations Office with appropriate documentation.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq-2">
                    <AccordionTrigger className="hover:bg-muted/30 px-3 rounded-md">
                      What items am I allowed to bring into the examination room?
                    </AccordionTrigger>
                    <AccordionContent className="px-3">
                      <div className="p-3 bg-muted/20 rounded-md">
                        <p className="mb-2">You may bring:</p>
                        <ul className="list-disc pl-5 space-y-1 mb-2">
                          <li>Student ID card and exam card</li>
                          <li>Pens, pencils, erasers, and other authorized stationery</li>
                          <li>Clear water bottle (no labels)</li>
                          <li>Authorized calculators (as specified by your department)</li>
                        </ul>
                        <p className="mb-2">Items NOT allowed:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Mobile phones or any electronic devices</li>
                          <li>Smart watches or fitness trackers</li>
                          <li>Unauthorized notes or materials</li>
                          <li>Bags or purses (these must be left in designated areas)</li>
                          <li>Food (unless you have special medical permission)</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq-3">
                    <AccordionTrigger className="hover:bg-muted/30 px-3 rounded-md">
                      How can I request a re-mark of my examination?
                    </AccordionTrigger>
                    <AccordionContent className="px-3">
                      <div className="p-3 bg-muted/20 rounded-md">
                        <p>
                          To request a re-mark, you must submit a formal application to the Examinations Office within
                          14 days of the release of results. There is a non-refundable fee for this service, which will
                          be refunded only if your grade changes. The application form is available on the university
                          portal or from the Examinations Office.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq-4">
                    <AccordionTrigger className="hover:bg-muted/30 px-3 rounded-md">
                      What happens if there's an emergency during an examination?
                    </AccordionTrigger>
                    <AccordionContent className="px-3">
                      <div className="p-3 bg-muted/20 rounded-md">
                        <p>
                          In case of an emergency (fire alarm, power outage, etc.), follow the instructions of the
                          invigilators immediately. Leave all examination materials on your desk and evacuate in an
                          orderly manner. Do not discuss the examination with other students during the evacuation. If
                          possible, the examination will resume once the emergency is resolved, with additional time
                          provided.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq-5">
                    <AccordionTrigger className="hover:bg-muted/30 px-3 rounded-md">
                      Can I use the restroom during an examination?
                    </AccordionTrigger>
                    <AccordionContent className="px-3">
                      <div className="p-3 bg-muted/20 rounded-md">
                        <p>
                          Yes, you may use the restroom during an examination, but you must be escorted by an
                          invigilator. You will not be given extra time for restroom breaks. Restroom breaks are not
                          permitted during the first 30 minutes or the last 30 minutes of the examination period. It is
                          recommended that you use the restroom before entering the examination room.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Announcements Tab Content */}
          <TabsContent value="announcements" className="mt-6 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <StickyNote className="mr-2 h-5 w-5 text-primary" />
                  Examination Announcements
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                  </div>
                ) : announcements.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center p-4 bg-muted rounded-full mb-4">
                      <Info className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No Announcements</h3>
                    <p className="text-muted-foreground">
                      There are currently no announcements related to examinations
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {announcements.map((announcement) => (
                      <div
                        key={announcement.id}
                        className={cn(
                          "p-4 rounded-lg border",
                          announcement.severity === "important"
                            ? "bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900/30"
                            : "bg-muted/20 border-muted/50",
                        )}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            {announcement.severity === "important" ? (
                              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-500" />
                            ) : (
                              <Info className="h-5 w-5 text-primary" />
                            )}
                            <h3
                              className={cn(
                                "font-medium",
                                announcement.severity === "important" ? "text-red-800 dark:text-red-300" : "",
                              )}
                            >
                              {announcement.title}
                            </h3>
                            {!announcement.read && (
                              <Badge variant="default" className="ml-2">
                                New
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">{formatAnnounceDate(announcement.date)}</div>
                        </div>
                        <p
                          className={cn(
                            "text-sm",
                            announcement.severity === "important"
                              ? "text-red-700 dark:text-red-400"
                              : "text-muted-foreground",
                          )}
                        >
                          {announcement.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

