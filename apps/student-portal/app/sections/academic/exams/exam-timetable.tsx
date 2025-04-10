"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Clock,
  MapPin,
  Search,
  Download,
  CalendarIcon,
  Filter,
  AlertCircle,
  Share2,
  Printer,
  Eye,
  Check,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Exam {
  id: string
  courseCode: string
  courseName: string
  date: string
  startTime: string
  endTime: string
  venue: string
  room: string
  seatNumber?: string
  status: "upcoming" | "completed" | "missed" | "cancelled" | "rescheduled"
  type: "final" | "midterm" | "quiz" | "practical"
  examiner?: string
  instructions?: string[]
}

interface ExamTimetableProps {
  exams: Exam[]
  semester: string
  academicYear: string
}

export function ExamTimetable({ exams: initialExams, semester, academicYear }: ExamTimetableProps) {
  // Mock data for demonstration
  const mockExams: Exam[] = [
    {
      id: "exam1",
      courseCode: "CSC 3101",
      courseName: "Data Structures & Algorithms",
      date: "2023-11-18",
      startTime: "09:00",
      endTime: "11:00",
      venue: "Main Examination Hall",
      room: "Block A, Ground Floor",
      seatNumber: "A-45",
      status: "upcoming",
      type: "midterm",
      examiner: "Dr. Sarah Johnson",
      instructions: [
        "Bring your student ID card",
        "No electronic devices allowed",
        "Only blue or black pens permitted",
        "Arrive 30 minutes before exam start time",
      ],
    },
    {
      id: "exam2",
      courseCode: "BIS 3102",
      courseName: "Database Systems",
      date: "2023-11-22",
      startTime: "14:00",
      endTime: "16:00",
      venue: "Computer Lab 2",
      room: "Block B, First Floor",
      seatNumber: "C-12",
      status: "upcoming",
      type: "practical",
      examiner: "Prof. Michael Chen",
      instructions: [
        "Bring your student ID card",
        "No internet access allowed",
        "SQL reference sheet will be provided",
      ],
    },
    {
      id: "exam3",
      courseCode: "MAT 2101",
      courseName: "Discrete Mathematics",
      date: "2023-11-10",
      startTime: "10:00",
      endTime: "12:00",
      venue: "Examination Hall 2",
      room: "Block A, First Floor",
      seatNumber: "B-23",
      status: "completed",
      type: "midterm",
      examiner: "Dr. Robert Williams",
    },
    {
      id: "exam4",
      courseCode: "ENG 2103",
      courseName: "Technical Communication",
      date: "2023-11-15",
      startTime: "14:00",
      endTime: "16:30",
      venue: "Presentation Room 1",
      room: "Block C, Second Floor",
      seatNumber: "PR-05",
      status: "missed",
      type: "practical",
      examiner: "Prof. Emily Parker",
    },
    {
      id: "exam5",
      courseCode: "CSC 3101",
      courseName: "Data Structures & Algorithms",
      date: "2023-12-15",
      startTime: "09:00",
      endTime: "12:00",
      venue: "Main Examination Hall",
      room: "Block A, Ground Floor",
      status: "upcoming",
      type: "final",
      examiner: "Dr. Sarah Johnson",
      instructions: [
        "Bring your student ID card",
        "No electronic devices allowed",
        "Only blue or black pens permitted",
        "Arrive 30 minutes before exam start time",
        "All sections are compulsory",
      ],
    },
    {
      id: "exam6",
      courseCode: "BIS 3102",
      courseName: "Database Systems",
      date: "2023-12-18",
      startTime: "14:00",
      endTime: "17:00",
      venue: "Main Examination Hall",
      room: "Block A, Ground Floor",
      status: "upcoming",
      type: "final",
      examiner: "Prof. Michael Chen",
      instructions: [
        "Bring your student ID card",
        "No electronic devices allowed",
        "One A4 sheet of handwritten notes allowed",
      ],
    },
    {
      id: "exam7",
      courseCode: "CSC 2201",
      courseName: "Operating Systems",
      date: "2023-11-25",
      startTime: "09:00",
      endTime: "11:00",
      venue: "Lecture Hall 3",
      room: "Block D, Ground Floor",
      seatNumber: "D-15",
      status: "rescheduled",
      type: "midterm",
      examiner: "Dr. James Wilson",
      instructions: ["Originally scheduled for Nov 20", "Bring your student ID card", "No electronic devices allowed"],
    },
  ]

  const [exams] = useState<Exam[]>(mockExams)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [currentView, setCurrentView] = useState<"list" | "calendar">("list")
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null)
  const [isExporting, setIsExporting] = useState(false)
  const { toast } = useToast()

  const filteredExams = exams.filter((exam) => {
    const matchesSearch =
      exam.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.venue.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = filterType === "all" || exam.type === filterType
    const matchesStatus = filterStatus === "all" || exam.status === filterStatus

    return matchesSearch && matchesType && matchesStatus
  })

  const sortedExams = [...filteredExams].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.startTime}`)
    const dateB = new Date(`${b.date}T${b.startTime}`)
    return dateA.getTime() - dateB.getTime()
  })

  const upcomingExams = sortedExams.filter((exam) => exam.status === "upcoming" || exam.status === "rescheduled")
  const otherExams = sortedExams.filter((exam) => exam.status !== "upcoming" && exam.status !== "rescheduled")

  // Check for exams in the next 48 hours
  const now = new Date()
  const next48Hours = new Date(now.getTime() + 48 * 60 * 60 * 1000)
  const upcomingUrgentExams = upcomingExams.filter((exam) => {
    const examDate = new Date(`${exam.date}T${exam.startTime}`)
    return examDate > now && examDate < next48Hours
  })

  const getStatusBadge = (status: Exam["status"]) => {
    switch (status) {
      case "upcoming":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-100">
            Upcoming
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-100">
            Completed
          </Badge>
        )
      case "missed":
        return <Badge variant="destructive">Missed</Badge>
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-100">
            Cancelled
          </Badge>
        )
      case "rescheduled":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 dark:bg-amber-900 dark:text-amber-100">
            Rescheduled
          </Badge>
        )
    }
  }

  const getTypeBadge = (type: Exam["type"]) => {
    switch (type) {
      case "final":
        return <Badge className="bg-primary">Final</Badge>
      case "midterm":
        return <Badge variant="secondary">Midterm</Badge>
      case "quiz":
        return <Badge variant="outline">Quiz</Badge>
      case "practical":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-900 dark:text-purple-100">
            Practical
          </Badge>
        )
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  // Group exams by date for calendar view
  const examsByDate = sortedExams.reduce<Record<string, Exam[]>>((acc, exam) => {
    if (!acc[exam.date]) {
      acc[exam.date] = []
    }
    acc[exam.date].push(exam)
    return acc
  }, {})

  const dates = Object.keys(examsByDate).sort()

  // Handle download timetable
  const handleDownloadTimetable = () => {
    setIsExporting(true)

    // Simulate export process
    setTimeout(() => {
      setIsExporting(false)

      toast({
        title: "Timetable Downloaded",
        description: "Your exam timetable has been downloaded successfully.",
      })
    }, 1500)
  }

  // Handle add to calendar
  const handleAddToCalendar = () => {
    toast({
      title: "Added to Calendar",
      description: "Your exam schedule has been added to your calendar.",
    })
  }

  // Handle print timetable
  const handlePrintTimetable = () => {
    toast({
      title: "Print Initiated",
      description: "Your exam timetable is being sent to the printer.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <CardTitle className="text-xl">Exam Timetable</CardTitle>
              <CardDescription>
                {semester} - {academicYear}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={handleDownloadTimetable}
                disabled={isExporting}
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">{isExporting ? "Exporting..." : "Export"}</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleAddToCalendar}>
                <CalendarIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Add to Calendar</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handlePrintTimetable}>
                <Printer className="h-4 w-4" />
                <span className="hidden sm:inline">Print</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {upcomingUrgentExams.length > 0 && (
            <Alert className="bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/30 dark:border-amber-800 dark:text-amber-200">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Upcoming Exams in the Next 48 Hours</AlertTitle>
              <AlertDescription>
                <ul className="list-disc list-inside mt-2">
                  {upcomingUrgentExams.map((exam) => (
                    <li key={exam.id}>
                      {exam.courseCode}: {formatDate(exam.date)} at {exam.startTime} ({exam.venue})
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by course or venue..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[130px]">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <SelectValue placeholder="Exam Type" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="final">Final</SelectItem>
                  <SelectItem value="midterm">Midterm</SelectItem>
                  <SelectItem value="quiz">Quiz</SelectItem>
                  <SelectItem value="practical">Practical</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[130px]">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <SelectValue placeholder="Status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="missed">Missed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="rescheduled">Rescheduled</SelectItem>
                </SelectContent>
              </Select>

              <div className="hidden md:block">
                <Tabs value={currentView} onValueChange={(v) => setCurrentView(v as "list" | "calendar")}>
                  <TabsList>
                    <TabsTrigger value="list">List</TabsTrigger>
                    <TabsTrigger value="calendar">Calendar</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </div>

          {currentView === "list" ? (
            <div className="space-y-6">
              {upcomingExams.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-3">Upcoming Exams</h3>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Course</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Date & Time</TableHead>
                          <TableHead>Venue</TableHead>
                          <TableHead>Seat</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {upcomingExams.map((exam) => (
                          <TableRow
                            key={exam.id}
                            className="cursor-pointer hover:bg-muted/50"
                            onClick={() => setSelectedExam(exam)}
                          >
                            <TableCell>
                              <div>
                                <div className="font-medium">{exam.courseCode}</div>
                                <div className="text-sm text-muted-foreground">{exam.courseName}</div>
                              </div>
                            </TableCell>
                            <TableCell>{getTypeBadge(exam.type)}</TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3 text-muted-foreground" />
                                  <span>{formatDate(exam.date)}</span>
                                </div>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  <span>
                                    {exam.startTime} - {exam.endTime}
                                  </span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span>{exam.venue}</span>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <MapPin className="h-3 w-3" />
                                  <span>Room {exam.room}</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              {exam.seatNumber ? (
                                <span className="font-medium">{exam.seatNumber}</span>
                              ) : (
                                <span className="text-muted-foreground">Not assigned</span>
                              )}
                            </TableCell>
                            <TableCell>{getStatusBadge(exam.status)}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setSelectedExam(exam)
                                }}
                              >
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}

              {otherExams.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-3">Other Exams</h3>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Course</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Date & Time</TableHead>
                          <TableHead>Venue</TableHead>
                          <TableHead>Seat</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {otherExams.map((exam) => (
                          <TableRow
                            key={exam.id}
                            className="cursor-pointer hover:bg-muted/50"
                            onClick={() => setSelectedExam(exam)}
                          >
                            <TableCell>
                              <div>
                                <div className="font-medium">{exam.courseCode}</div>
                                <div className="text-sm text-muted-foreground">{exam.courseName}</div>
                              </div>
                            </TableCell>
                            <TableCell>{getTypeBadge(exam.type)}</TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3 text-muted-foreground" />
                                  <span>{formatDate(exam.date)}</span>
                                </div>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  <span>
                                    {exam.startTime} - {exam.endTime}
                                  </span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span>{exam.venue}</span>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <MapPin className="h-3 w-3" />
                                  <span>Room {exam.room}</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              {exam.seatNumber ? (
                                <span className="font-medium">{exam.seatNumber}</span>
                              ) : (
                                <span className="text-muted-foreground">Not assigned</span>
                              )}
                            </TableCell>
                            <TableCell>{getStatusBadge(exam.status)}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setSelectedExam(exam)
                                }}
                              >
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}

              {upcomingExams.length === 0 && otherExams.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 px-4 border rounded-lg bg-muted/30">
                  <Calendar className="h-12 w-12 text-muted-foreground" />
                  <h3 className="text-lg font-medium mt-3">No Exams Found</h3>
                  <p className="text-sm text-muted-foreground mt-1 text-center">
                    No exams match your search criteria. Try adjusting your filters.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div>
              {dates.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-4 border rounded-lg bg-muted/30">
                  <Calendar className="h-12 w-12 text-muted-foreground" />
                  <h3 className="text-lg font-medium mt-3">No Exams Found</h3>
                  <p className="text-sm text-muted-foreground mt-1 text-center">
                    No exams match your search criteria. Try adjusting your filters.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {dates.map((date) => (
                    <Card
                      key={date}
                      className={new Date(date).toDateString() === new Date().toDateString() ? "border-primary" : ""}
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{formatDate(date)}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {examsByDate[date].map((exam) => (
                          <div
                            key={exam.id}
                            className="flex items-center justify-between p-2 border rounded-md hover:bg-muted/50 cursor-pointer"
                            onClick={() => setSelectedExam(exam)}
                          >
                            <div>
                              <div className="font-medium">{exam.courseCode}</div>
                              <div className="text-xs text-muted-foreground">
                                {exam.startTime} - {exam.endTime}
                              </div>
                              <div className="text-xs text-muted-foreground truncate max-w-[150px]">{exam.venue}</div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                              {getTypeBadge(exam.type)}
                              {getStatusBadge(exam.status)}
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Exam Details Dialog */}
      {selectedExam && (
        <Dialog open={!!selectedExam} onOpenChange={(open) => !open && setSelectedExam(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {selectedExam.courseCode}: {selectedExam.courseName}
              </DialogTitle>
              <DialogDescription>
                {getTypeBadge(selectedExam.type)} {getStatusBadge(selectedExam.status)}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Date</h4>
                  <p className="text-sm flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {formatDate(selectedExam.date)}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Time</h4>
                  <p className="text-sm flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    {selectedExam.startTime} - {selectedExam.endTime}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Venue</h4>
                  <p className="text-sm flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    {selectedExam.venue}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Room</h4>
                  <p className="text-sm">{selectedExam.room}</p>
                </div>
                {selectedExam.seatNumber && (
                  <div>
                    <h4 className="text-sm font-medium mb-1">Seat Number</h4>
                    <p className="text-sm font-bold">{selectedExam.seatNumber}</p>
                  </div>
                )}
                {selectedExam.examiner && (
                  <div>
                    <h4 className="text-sm font-medium mb-1">Examiner</h4>
                    <p className="text-sm">{selectedExam.examiner}</p>
                  </div>
                )}
              </div>

              {selectedExam.instructions && selectedExam.instructions.length > 0 && (
                <>
                  <div className="pt-2">
                    <h4 className="text-sm font-medium mb-2">Exam Instructions</h4>
                    <ul className="space-y-1">
                      {selectedExam.instructions.map((instruction, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>{instruction}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              {selectedExam.status === "upcoming" && (
                <Alert className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Important</AlertTitle>
                  <AlertDescription>
                    Please arrive at least 30 minutes before the exam start time. Bring your student ID card and all
                    necessary materials.
                  </AlertDescription>
                </Alert>
              )}

              {selectedExam.status === "rescheduled" && (
                <Alert variant="warning" className="mt-4 bg-amber-50 border-amber-200 text-amber-800">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Rescheduled Exam</AlertTitle>
                  <AlertDescription>
                    This exam has been rescheduled. Please note the new date and time.
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <DialogFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setSelectedExam(null)}>
                Close
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    toast({
                      title: "Reminder Set",
                      description: "You will be reminded 24 hours before the exam.",
                    })
                  }}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  Set Reminder
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    toast({
                      title: "Exam Details Shared",
                      description: "Exam details have been shared to your email.",
                    })
                  }}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

