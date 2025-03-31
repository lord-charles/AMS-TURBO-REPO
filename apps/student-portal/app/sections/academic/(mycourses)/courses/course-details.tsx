"use client"
import Link from "next/link"
import {
  ArrowLeft,
  Clock,
  Download,
  FileText,
  GraduationCap,
  Info,
  Layers,
  Loader2,
  MapPin,
  MessageSquare,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useCourse } from "@/hooks/use-course"
import { CourseAnnouncements } from "./course-announcements"
import { CourseAssignments } from "./course-assignments"
import { CourseMaterialsList } from "./course-materials-list"
import { CourseDiscussions } from "./course-discussions"

interface CourseDetailsProps {
  courseId: string
}

export function CourseDetails({ courseId }: CourseDetailsProps) {
  const { course, isLoading } = useCourse(courseId)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 border rounded-lg bg-muted/30">
        <Info className="h-12 w-12 text-muted-foreground mb-3" />
        <h3 className="text-lg font-medium">Course Not Found</h3>
        <p className="text-sm text-muted-foreground mt-1 text-center">
          The course you're looking for doesn't exist or you don't have access to it.
        </p>
        <Button className="mt-4" variant="outline" asChild>
          <Link href="/academic/mycourses">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to My Courses
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="p-0">
              <Link href="/academic/mycourses">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Link>
            </Button>
            <Badge variant="outline">{course.code}</Badge>
            <Badge variant={course.status === "active" ? "default" : "outline"}>
              {course.status === "active" ? "Active" : "Completed"}
            </Badge>
          </div>
          <h1 className="text-2xl font-bold tracking-tight mt-2">{course.name}</h1>
          <p className="text-muted-foreground">
            {course.semester} • {course.credits} Credits
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/academic/materials?course=${course.id}`}>
              <Download className="mr-2 h-4 w-4" />
              Download Materials
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/academic/attendance?course=${course.id}`}>
              <Users className="mr-2 h-4 w-4" />
              View Attendance
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Course Information</CardTitle>
            <CardDescription>Details about the course, schedule, and instructor</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="text-sm font-medium">Instructor</div>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={course.instructor} />
                    <AvatarFallback>
                      {course.instructor
                        .split(" ")
                        .map((n:any) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{course.instructor}</div>
                    <div className="text-xs text-muted-foreground">Department of Computer Science</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Schedule</div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{course.schedule}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{course.location}</span>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <div className="text-sm font-medium mb-2">Course Description</div>
              <p className="text-sm text-muted-foreground">
                {course.description ||
                  "This course provides an introduction to the fundamental concepts of computer science, including problem-solving, programming, and data structures. Students will learn to design, implement, and debug programs using a high-level programming language."}
              </p>
            </div>

            <Separator />

            <div>
              <div className="text-sm font-medium mb-2">Course Progress</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Overall Progress</span>
                  <span className="text-sm font-medium">{course.progress}%</span>
                </div>
                <Progress
                  value={course.progress}
                  className="h-2"
                 
                />

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                  <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
                    <span className="text-2xl font-bold">12</span>
                    <span className="text-xs text-muted-foreground">Lectures</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
                    <span className="text-2xl font-bold">5</span>
                    <span className="text-xs text-muted-foreground">Assignments</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
                    <span className="text-2xl font-bold">2</span>
                    <span className="text-xs text-muted-foreground">Quizzes</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
                    <span className="text-2xl font-bold">1</span>
                    <span className="text-xs text-muted-foreground">Exams</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Course Grade</CardTitle>
            <CardDescription>Your current grade and assessment breakdown</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-muted stroke-current"
                    strokeWidth="10"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                  />
                  <circle
                    className="text-primary stroke-current"
                    strokeWidth="10"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    strokeDasharray={`${2.5 * Math.PI * 40}`}
                    strokeDashoffset={`${2.5 * Math.PI * 40 * (1 - course.gradePercentage / 100)}`}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{course.grade || "N/A"}</div>
                    <div className="text-xs text-muted-foreground">{course.gradePercentage || 0}%</div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="text-sm font-medium">Grade Breakdown</div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Assignments</span>
                  </div>
                  <div className="text-sm font-medium">30%</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Quizzes</span>
                  </div>
                  <div className="text-sm font-medium">20%</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Participation</span>
                  </div>
                  <div className="text-sm font-medium">10%</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Final Exam</span>
                  </div>
                  <div className="text-sm font-medium">40%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="announcements" className="space-y-4">
        <TabsList className="w-full sm:w-auto grid grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
        </TabsList>

        <TabsContent value="announcements">
          <CourseAnnouncements courseId={courseId} />
        </TabsContent>

        <TabsContent value="assignments">
          <CourseAssignments courseId={courseId} />
        </TabsContent>

        <TabsContent value="materials">
          <CourseMaterialsList courseId={courseId} />
        </TabsContent>

        <TabsContent value="discussions">
          <CourseDiscussions courseId={courseId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

