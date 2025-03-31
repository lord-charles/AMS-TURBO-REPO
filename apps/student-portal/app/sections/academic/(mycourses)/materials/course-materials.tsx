"use client"

import { useState } from "react"
import { Book, Download, FileText, Folder, Loader2, Search, Upload, Video } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function CourseMaterials() {
  const [searchQuery, setSearchQuery] = useState("")
  const [courseFilter, setCourseFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Mock courses data
  const courses = [
    {
      id: "cs301",
      code: "CS301",
      name: "Data Structures & Algorithms",
    },
    {
      id: "cs305",
      code: "CS305",
      name: "Database Systems",
    },
    {
      id: "math201",
      code: "MATH201",
      name: "Discrete Mathematics",
    },
    {
      id: "eng203",
      code: "ENG203",
      name: "Technical Communication",
    },
    {
      id: "cs205",
      code: "CS205",
      name: "Computer Networks",
    },
  ]

  // Mock materials data
  const materials = [
    {
      id: "mat1",
      title: "Introduction to Algorithms",
      course: "CS301",
      type: "textbook",
      author: "Thomas H. Cormen, et al.",
      uploadDate: "2023-09-05",
      fileSize: "8.5 MB",
      fileType: "pdf",
      category: "Textbooks",
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
      category: "Lecture Notes",
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
      category: "Textbooks",
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
      category: "Videos",
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
      category: "References",
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
      category: "Guides",
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
      category: "Textbooks",
    },
  ]

  // Filter materials based on search query and filters
  const filteredMaterials = materials.filter((material) => {
    const matchesSearch =
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.type.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCourse = courseFilter === "all" || material.course === courseFilter

    const matchesType = typeFilter === "all" || material.type === typeFilter

    return matchesSearch && matchesCourse && matchesType
  })

  // Group materials by course
  const materialsByCourse = courses.map((course) => ({
    course,
    materials: filteredMaterials.filter((material) => material.course === course.code),
  }))

  // Group materials by category
  const materialsByCategory = filteredMaterials.reduce(
    (groups, material) => {
      const category = material.category
      if (!groups[category]) {
        groups[category] = []
      }
      groups[category].push(material)
      return groups
    },
    {} as Record<string, typeof materials>,
  )

  // Get file icon based on type
  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "pdf":
        return <FileText className="h-4 w-4 text-red-500" />
      case "mp4":
        return <Video className="h-4 w-4 text-blue-500" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const handleDownload = (id: string, title: string) => {
    setIsLoading(true)
    // Simulate download delay
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Download started",
        description: `${title} is being downloaded to your device.`,
      })
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Course Materials</h1>
          <p className="text-muted-foreground">Access learning materials for all your courses</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Material
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Learning Material</DialogTitle>
              <DialogDescription>
                Upload a document, presentation, or other learning material to share with your class.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid w-full gap-1.5">
                <label htmlFor="title" className="text-sm font-medium">
                  Title
                </label>
                <Input id="title" placeholder="Enter material title" />
              </div>
              <div className="grid w-full gap-1.5">
                <label htmlFor="course" className="text-sm font-medium">
                  Course
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.code}: {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid w-full gap-1.5">
                <label htmlFor="type" className="text-sm font-medium">
                  Material Type
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="notes">Lecture Notes</SelectItem>
                    <SelectItem value="assignment">Assignment</SelectItem>
                    <SelectItem value="reference">Reference Material</SelectItem>
                    <SelectItem value="presentation">Presentation</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid w-full gap-1.5">
                <label htmlFor="file" className="text-sm font-medium">
                  File
                </label>
                <Input id="file" type="file" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Upload</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-[300px]">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search materials..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Select value={courseFilter} onValueChange={setCourseFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              {courses.map((course) => (
                <SelectItem key={course.id} value={course.code}>
                  {course.code}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="textbook">Textbooks</SelectItem>
              <SelectItem value="lecture-notes">Lecture Notes</SelectItem>
              <SelectItem value="video">Videos</SelectItem>
              <SelectItem value="reference">References</SelectItem>
              <SelectItem value="guide">Guides</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="by-course" className="space-y-4">
        <TabsList>
          <TabsTrigger value="by-course">By Course</TabsTrigger>
          <TabsTrigger value="by-category">By Category</TabsTrigger>
        </TabsList>

        <TabsContent value="by-course" className="space-y-6">
          {materialsByCourse.some((item) => item.materials.length > 0) ? (
            <Accordion type="multiple" className="w-full">
              {materialsByCourse.map(
                ({ course, materials }) =>
                  materials.length > 0 && (
                    <AccordionItem key={course.id} value={course.id}>
                      <AccordionTrigger className="hover:bg-muted/50 px-4 rounded-md">
                        <div className="flex items-center">
                          <Book className="mr-2 h-5 w-5 text-primary" />
                          <span>
                            {course.code}: {course.name}
                          </span>
                          <Badge variant="outline" className="ml-2">
                            {materials.length}
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4">
                        <div className="space-y-3 pt-2">
                          {materials.map((material) => (
                            <div
                              key={material.id}
                              className="flex items-center justify-between p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors"
                            >
                              <div className="flex items-center min-w-0">
                                <div className="mr-3 p-2 bg-muted rounded-md">{getFileIcon(material.fileType)}</div>
                                <div className="min-w-0">
                                  <h4 className="font-medium truncate">{material.title}</h4>
                                  <div className="flex flex-wrap items-center text-xs text-muted-foreground mt-1 gap-2">
                                    <Badge variant="outline" className="text-xs">
                                      {material.type}
                                    </Badge>
                                    <span>{material.fileSize}</span>
                                    {material.duration && <span>{material.duration}</span>}
                                  </div>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDownload(material.id, material.title)}
                                disabled={isLoading}
                              >
                                {isLoading ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Download className="h-4 w-4" />
                                )}
                                <span className="sr-only">Download {material.title}</span>
                              </Button>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ),
              )}
            </Accordion>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-4 border rounded-lg bg-muted/30">
              <FileText className="h-12 w-12 text-muted-foreground mb-3" />
              <h3 className="text-lg font-medium">No Materials Found</h3>
              <p className="text-sm text-muted-foreground mt-1 text-center">
                {searchQuery || courseFilter !== "all" || typeFilter !== "all"
                  ? "No materials match your search criteria. Try adjusting your filters."
                  : "No materials have been uploaded for your courses yet."}
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="by-category" className="space-y-6">
          {Object.keys(materialsByCategory).length > 0 ? (
            Object.entries(materialsByCategory).map(([category, items]) => (
              <Card key={category}>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Folder className="h-5 w-5 text-muted-foreground" />
                    <CardTitle className="text-lg">{category}</CardTitle>
                    <Badge variant="outline">{items.length}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {items.map((material, index) => (
                      <div key={material.id}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-muted rounded-md">{getFileIcon(material.fileType)}</div>
                            <div>
                              <div className="font-medium">{material.title}</div>
                              <div className="text-xs text-muted-foreground">
                                {material.course} • {material.author} •{" "}
                                {format(new Date(material.uploadDate), "MMM d, yyyy")}
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {material.type}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{material.fileSize}</span>
                                {material.duration && (
                                  <span className="text-xs text-muted-foreground">{material.duration}</span>
                                )}
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDownload(material.id, material.title)}
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Download className="h-4 w-4" />
                            )}
                            <span className="sr-only">Download {material.title}</span>
                          </Button>
                        </div>
                        {index < items.length - 1 && <Separator className="my-3" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-4 border rounded-lg bg-muted/30">
              <FileText className="h-12 w-12 text-muted-foreground mb-3" />
              <h3 className="text-lg font-medium">No Materials Found</h3>
              <p className="text-sm text-muted-foreground mt-1 text-center">
                {searchQuery || courseFilter !== "all" || typeFilter !== "all"
                  ? "No materials match your search criteria. Try adjusting your filters."
                  : "No materials have been uploaded for your courses yet."}
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

