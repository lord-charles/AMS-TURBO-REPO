"use client"

import { useState } from "react"
import { Download, FileText, Search, SortAsc, Star, Eye, Clock, User, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"

interface PastPapersViewProps {
  searchQuery: string
  semester: string
}

type PastPaper = {
  id: string
  title: string
  course: string
  courseCode: string
  year: string
  semester: "Fall" | "Spring" | "Summer"
  type: "final" | "midterm" | "quiz" | "practice"
  uploadDate: string
  fileSize: string
  fileType: string
  hasAnswers: boolean
  hasMarkingScheme: boolean
  instructor: string
  downloads: number
  rating?: number
  description?: string
}

export function PastPapersView({ searchQuery, semester }: PastPapersViewProps) {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedPaper, setSelectedPaper] = useState<PastPaper | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [yearFilter, setYearFilter] = useState("all")
  const [courseFilter, setCourseFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const { toast } = useToast()
  const [searchQueryState, setSearchQuery] = useState(searchQuery)

  // Mock past papers data (Strathmore University context)
  const pastPapers: PastPaper[] = [
    {
      id: "paper1",
      title: "Final Examination",
      course: "Data Structures & Algorithms",
      courseCode: "CSC 3101",
      year: "2022",
      semester: "Fall",
      type: "final",
      uploadDate: "2023-01-15",
      fileSize: "2.5 MB",
      fileType: "pdf",
      hasAnswers: true,
      hasMarkingScheme: true,
      instructor: "Dr. Sarah Johnson",
      downloads: 245,
      rating: 4.8,
      description:
        "This final examination covers all topics from the course including arrays, linked lists, trees, graphs, sorting algorithms, and algorithm analysis. The paper includes both theoretical questions and practical programming problems.",
    },
    {
      id: "paper2",
      title: "Midterm Examination",
      course: "Data Structures & Algorithms",
      courseCode: "CSC 3101",
      year: "2022",
      semester: "Fall",
      type: "midterm",
      uploadDate: "2022-10-30",
      fileSize: "1.8 MB",
      fileType: "pdf",
      hasAnswers: true,
      hasMarkingScheme: false,
      instructor: "Dr. Sarah Johnson",
      downloads: 312,
      rating: 4.5,
      description:
        "This midterm covers the first half of the course material including arrays, linked lists, stacks, and queues. The paper includes both multiple choice questions and short answer problems.",
    },
    {
      id: "paper3",
      title: "Final Examination",
      course: "Database Systems",
      courseCode: "BIS 3102",
      year: "2022",
      semester: "Fall",
      type: "final",
      uploadDate: "2023-01-20",
      fileSize: "3.2 MB",
      fileType: "pdf",
      hasAnswers: true,
      hasMarkingScheme: true,
      instructor: "Prof. Michael Chen",
      downloads: 198,
      rating: 4.2,
      description:
        "This final examination covers relational database design, SQL, normalization, transaction management, and database security. The paper includes both theoretical questions and practical SQL problems.",
    },
    {
      id: "paper4",
      title: "Quiz 2",
      course: "Database Systems",
      courseCode: "BIS 3102",
      year: "2022",
      semester: "Fall",
      type: "quiz",
      uploadDate: "2022-11-10",
      fileSize: "0.8 MB",
      fileType: "pdf",
      hasAnswers: true,
      hasMarkingScheme: false,
      instructor: "Prof. Michael Chen",
      downloads: 156,
      description:
        "This quiz covers SQL queries, joins, and aggregate functions. It consists of 10 multiple choice questions and 5 SQL query writing problems.",
    },
    {
      id: "paper5",
      title: "Final Examination",
      course: "Discrete Mathematics",
      courseCode: "MAT 2101",
      year: "2022",
      semester: "Fall",
      type: "final",
      uploadDate: "2023-01-18",
      fileSize: "2.1 MB",
      fileType: "pdf",
      hasAnswers: false,
      hasMarkingScheme: false,
      instructor: "Dr. Robert Williams",
      downloads: 178,
      rating: 4.0,
      description:
        "This final examination covers set theory, logic, relations, functions, graph theory, and combinatorics. The paper includes both proof-based questions and computational problems.",
    },
    {
      id: "paper6",
      title: "Practice Problems",
      course: "Discrete Mathematics",
      courseCode: "MAT 2101",
      year: "2022",
      semester: "Fall",
      type: "practice",
      uploadDate: "2022-12-05",
      fileSize: "1.5 MB",
      fileType: "pdf",
      hasAnswers: true,
      hasMarkingScheme: false,
      instructor: "Dr. Robert Williams",
      downloads: 203,
      description:
        "This set of practice problems is designed to help students prepare for the final examination. It covers all major topics from the course with detailed solutions provided.",
    },
    {
      id: "paper7",
      title: "Final Examination",
      course: "Data Structures & Algorithms",
      courseCode: "CSC 3101",
      year: "2021",
      semester: "Fall",
      type: "final",
      uploadDate: "2022-01-10",
      fileSize: "2.3 MB",
      fileType: "pdf",
      hasAnswers: true,
      hasMarkingScheme: true,
      instructor: "Dr. Sarah Johnson",
      downloads: 345,
      rating: 4.7,
      description:
        "This final examination from the previous year covers all topics from the course. It's a good resource for understanding the exam format and difficulty level.",
    },
    {
      id: "paper8",
      title: "Midterm Examination",
      course: "Database Systems",
      courseCode: "BIS 3102",
      year: "2021",
      semester: "Fall",
      type: "midterm",
      uploadDate: "2021-10-25",
      fileSize: "1.9 MB",
      fileType: "pdf",
      hasAnswers: true,
      hasMarkingScheme: true,
      instructor: "Prof. Michael Chen",
      downloads: 267,
      rating: 4.3,
      description:
        "This midterm examination covers database design principles, ER diagrams, and basic SQL. It includes both theoretical questions and practical problems.",
    },
  ]

  // Filter papers based on search query and filters
  const filteredPapers = pastPapers.filter((paper) => {
    const matchesSearch =
      paper.title.toLowerCase().includes(searchQueryState.toLowerCase()) ||
      paper.course.toLowerCase().includes(searchQueryState.toLowerCase()) ||
      paper.courseCode.toLowerCase().includes(searchQueryState.toLowerCase()) ||
      paper.instructor.toLowerCase().includes(searchQueryState.toLowerCase())

    const matchesYear = yearFilter === "all" || paper.year === yearFilter
    const matchesCourse = courseFilter === "all" || paper.courseCode === courseFilter
    const matchesType = typeFilter === "all" || paper.type === typeFilter

    return matchesSearch && matchesYear && matchesCourse && matchesType
  })

  // Filter papers based on selected tab
  const getPapersByTab = (tab: string) => {
    switch (tab) {
      case "finals":
        return filteredPapers.filter((paper) => paper.type === "final")
      case "midterms":
        return filteredPapers.filter((paper) => paper.type === "midterm")
      case "quizzes":
        return filteredPapers.filter((paper) => paper.type === "quiz" || paper.type === "practice")
      case "with-answers":
        return filteredPapers.filter((paper) => paper.hasAnswers)
      case "all":
      default:
        return filteredPapers
    }
  }

  const displayedPapers = getPapersByTab(activeTab)

  // Get paper type badge
  const getPaperTypeBadge = (type: string) => {
    switch (type) {
      case "final":
        return <Badge className="bg-purple-500 hover:bg-purple-600">Final Exam</Badge>
      case "midterm":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Midterm</Badge>
      case "quiz":
        return <Badge className="bg-green-500 hover:bg-green-600">Quiz</Badge>
      case "practice":
        return <Badge className="bg-amber-500 hover:bg-amber-600">Practice</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  // Handle download paper
  const handleDownload = () => {
    if (!selectedPaper) return

    setIsLoading(true)
    setDownloadProgress(0)

    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 100)

    // Simulate API call
    setTimeout(() => {
      clearInterval(interval)
      setDownloadProgress(100)

      setTimeout(() => {
        setIsLoading(false)
        setDownloadProgress(0)

        toast({
          title: "Download Complete",
          description: `${selectedPaper.title} (${selectedPaper.year}) has been downloaded successfully.`,
        })
      }, 500)
    }, 2000)
  }

  // Get unique years, courses, and types for filters
  const years = Array.from(new Set(pastPapers.map((paper) => paper.year)))
  const courses = Array.from(new Set(pastPapers.map((paper) => paper.courseCode)))
  const types = Array.from(new Set(pastPapers.map((paper) => paper.type)))

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Render star rating
  const renderStarRating = (rating?: number) => {
    if (!rating) return null

    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-3 w-3 ${star <= Math.round(rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
          />
        ))}
        <span className="ml-1 text-xs text-muted-foreground">({rating.toFixed(1)})</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Past Examination Papers</CardTitle>
          <CardDescription>Access previous exam papers, quizzes, and practice materials</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative w-full sm:w-[300px]">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search past papers..."
                className="pl-8"
                value={searchQueryState}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Select value={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={courseFilter} onValueChange={setCourseFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {courses.map((course) => (
                    <SelectItem key={course} value={course}>
                      {course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <SortAsc className="mr-2 h-4 w-4" />
                    Sort
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Year (Newest First)</DropdownMenuItem>
                  <DropdownMenuItem>Year (Oldest First)</DropdownMenuItem>
                  <DropdownMenuItem>Most Downloaded</DropdownMenuItem>
                  <DropdownMenuItem>Highest Rated</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-5">
              <TabsTrigger value="all">
                All
                <Badge className="ml-2">{filteredPapers.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="finals">
                Finals
                <Badge className="ml-2">{getPapersByTab("finals").length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="midterms">
                Midterms
                <Badge className="ml-2">{getPapersByTab("midterms").length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="quizzes">
                Quizzes
                <Badge className="ml-2">{getPapersByTab("quizzes").length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="with-answers">
                With Answers
                <Badge className="ml-2">{getPapersByTab("with-answers").length}</Badge>
              </TabsTrigger>
            </TabsList>

            <div className="mt-4">
              {displayedPapers.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {displayedPapers.map((paper) => (
                    <Card
                      key={paper.id}
                      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedPaper(paper)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">{paper.title}</CardTitle>
                          {getPaperTypeBadge(paper.type)}
                        </div>
                        <CardDescription className="flex items-center mt-1">
                          <span className="font-medium text-primary">{paper.courseCode}</span>
                          <Separator orientation="vertical" className="mx-2 h-3" />
                          <span className="text-muted-foreground">
                            {paper.semester} {paper.year}
                          </span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-1">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span>{paper.fileSize}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Download className="h-4 w-4 text-muted-foreground" />
                              <span>{paper.downloads}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span className="truncate max-w-[150px]">{paper.instructor}</span>
                            </div>
                            {renderStarRating(paper.rating)}
                          </div>

                          <div className="flex items-center gap-1 mt-1">
                            {paper.hasAnswers && (
                              <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                                With Answers
                              </Badge>
                            )}
                            {paper.hasMarkingScheme && (
                              <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                                Marking Scheme
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0 flex justify-between">
                        <Button variant="ghost" size="sm" className="text-xs">
                          <Eye className="mr-1 h-3 w-3" />
                          Preview
                        </Button>
                        <Button variant="ghost" size="sm" className="text-xs">
                          <Download className="mr-1 h-3 w-3" />
                          Download
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 px-4 border rounded-lg bg-muted/30">
                  <FileText className="h-12 w-12 text-muted-foreground" />
                  <h3 className="text-lg font-medium mt-3">No Past Papers Found</h3>
                  <p className="text-sm text-muted-foreground mt-1 text-center">
                    No past papers match your search criteria. Try adjusting your filters.
                  </p>
                </div>
              )}
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* Paper Details Dialog */}
      {selectedPaper && (
        <Dialog open={!!selectedPaper} onOpenChange={(open) => !open && setSelectedPaper(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{selectedPaper.title}</DialogTitle>
              <DialogDescription>
                {selectedPaper.courseCode}: {selectedPaper.course} - {selectedPaper.semester} {selectedPaper.year}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getPaperTypeBadge(selectedPaper.type)}
                  <span className="text-sm text-muted-foreground">
                    Uploaded on {formatDate(selectedPaper.uploadDate)}
                  </span>
                </div>
                <div className="flex items-center gap-1">{renderStarRating(selectedPaper.rating)}</div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>File Size: {selectedPaper.fileSize}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>File Type: {selectedPaper.fileType.toUpperCase()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>Instructor: {selectedPaper.instructor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4 text-muted-foreground" />
                  <span>Downloads: {selectedPaper.downloads}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedPaper.hasAnswers && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    With Answers
                  </Badge>
                )}
                {selectedPaper.hasMarkingScheme && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    Marking Scheme
                  </Badge>
                )}
              </div>

              {selectedPaper.description && (
                <>
                  <Separator />
                  <div>
                    <h4 className="text-sm font-medium mb-2">Description</h4>
                    <p className="text-sm text-muted-foreground">{selectedPaper.description}</p>
                  </div>
                </>
              )}

              {!selectedPaper.hasAnswers && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Note</AlertTitle>
                  <AlertDescription>
                    This past paper does not include answers. You may need to consult with your instructor or tutor for
                    solutions.
                  </AlertDescription>
                </Alert>
              )}

              {isLoading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Downloading...</span>
                    <span>{downloadProgress}%</span>
                  </div>
                  <Progress value={downloadProgress} className="h-2" />
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedPaper(null)}>
                Cancel
              </Button>
              <Button onClick={handleDownload} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Clock className="mr-2 h-4 w-4 animate-spin" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

