"use client"

import { useState } from "react"
import { Download, FileText, Folder, Search, Video } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"

interface CourseMaterialsListProps {
  courseId: string
}

export function CourseMaterialsList({ courseId }: CourseMaterialsListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  // Mock materials data
  const materials = [
    {
      id: "mat1",
      title: "Introduction to Algorithms",
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
      type: "lecture-notes",
      author: "Dr. Sarah Johnson",
      uploadDate: "2023-10-10",
      fileSize: "2.3 MB",
      fileType: "pdf",
      category: "Lecture Notes",
    },
    {
      id: "mat3",
      title: "Quicksort Implementation Demo",
      type: "video",
      author: "Dr. Sarah Johnson",
      uploadDate: "2023-10-12",
      fileSize: "150 MB",
      fileType: "mp4",
      duration: "25 minutes",
      category: "Videos",
    },
    {
      id: "mat4",
      title: "Assignment 1 Guidelines",
      type: "document",
      author: "Dr. Sarah Johnson",
      uploadDate: "2023-09-15",
      fileSize: "1.2 MB",
      fileType: "pdf",
      category: "Assignments",
    },
    {
      id: "mat5",
      title: "Practice Problems - Week 6",
      type: "document",
      author: "Dr. Sarah Johnson",
      uploadDate: "2023-10-18",
      fileSize: "1.8 MB",
      fileType: "pdf",
      category: "Practice Materials",
    },
  ]

  // Filter materials based on search query
  const filteredMaterials = materials.filter(
    (material) =>
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Group materials by category
  const groupedMaterials = filteredMaterials.reduce(
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
    toast({
      title: "Download started",
      description: `${title} is being downloaded to your device.`,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search materials..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {Object.keys(groupedMaterials).length > 0 ? (
        Object.entries(groupedMaterials).map(([category, items]) => (
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
                            {material.author} • {format(new Date(material.uploadDate), "MMM d, yyyy")}
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
                      <Button variant="ghost" size="icon" onClick={() => handleDownload(material.id, material.title)}>
                        <Download className="h-4 w-4" />
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
            {searchQuery
              ? "No materials match your search criteria. Try adjusting your search."
              : "No materials have been uploaded for this course yet."}
          </p>
        </div>
      )}
    </div>
  )
}

