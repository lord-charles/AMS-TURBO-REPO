"use client"

import { useState } from "react"
import Link from "next/link"
import { format, parseISO } from "date-fns"
import { CheckCircle2, Clock, FileText, Upload } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CourseAssignmentsProps {
  courseId: string
}

export function CourseAssignments({ courseId }: CourseAssignmentsProps) {
  const [activeTab, setActiveTab] = useState("upcoming")

  // Mock assignments data
  const assignments = [
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
  ]

  // Filter assignments based on course ID and status
  const courseAssignments = assignments.filter((assignment) => assignment.course === courseId)
  const upcomingAssignments = courseAssignments.filter(
    (assignment) => assignment.status === "in-progress" || assignment.status === "not-started",
  )
  const submittedAssignments = courseAssignments.filter(
    (assignment) => assignment.status === "submitted" || assignment.status === "graded",
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

  return (
    <div className="space-y-4">
      <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="submitted">Submitted</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4 mt-4">
          {upcomingAssignments.length > 0 ? (
            upcomingAssignments.map((assignment) => (
              <Card key={assignment.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{assignment.title}</CardTitle>
                    {getAssignmentStatusBadge(assignment.status)}
                  </div>
                  <CardDescription>
                    Due: {format(parseISO(assignment.dueDate), "MMM d, yyyy 'at' h:mm a")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-3">
                    <p className="text-sm">{assignment.description}</p>

                    {assignment.status === "in-progress" && assignment.progress !== undefined && (
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm text-muted-foreground">{assignment.progress}%</span>
                        </div>
                        <Progress
                          value={assignment.progress}
                          className="h-2"
                          indicatorClassName={
                            assignment.progress >= 70
                              ? "bg-green-500"
                              : assignment.progress >= 40
                                ? "bg-amber-500"
                                : "bg-red-500"
                          }
                        />
                      </div>
                    )}

                    <div className="flex items-center text-sm">
                      <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>
                        {assignment.attachments} attachment{assignment.attachments !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/academic/assignments/${assignment.id}`}>
                      <FileText className="mr-2 h-4 w-4" />
                      View Details
                    </Link>
                  </Button>
                  <Button variant="default" size="sm" asChild>
                    <Link href={`/academic/assignments/${assignment.id}/submit`}>
                      <Upload className="mr-2 h-4 w-4" />
                      Submit Assignment
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-4 border rounded-lg bg-muted/30">
              <Clock className="h-12 w-12 text-muted-foreground mb-3" />
              <h3 className="text-lg font-medium">No Upcoming Assignments</h3>
              <p className="text-sm text-muted-foreground mt-1 text-center">
                You don't have any upcoming assignments for this course.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="submitted" className="space-y-4 mt-4">
          {submittedAssignments.length > 0 ? (
            submittedAssignments.map((assignment) => (
              <Card key={assignment.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{assignment.title}</CardTitle>
                    {getAssignmentStatusBadge(assignment.status)}
                  </div>
                  <CardDescription>
                    Due: {format(parseISO(assignment.dueDate), "MMM d, yyyy 'at' h:mm a")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-3">
                    <p className="text-sm">{assignment.description}</p>

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
                        <Badge className="bg-green-500">Grade: {assignment.grade}</Badge>
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
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/academic/assignments/${assignment.id}`}>
                      <FileText className="mr-2 h-4 w-4" />
                      View Details
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/academic/assignments/${assignment.id}/submission`}>
                      <FileText className="mr-2 h-4 w-4" />
                      View Submission
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-4 border rounded-lg bg-muted/30">
              <FileText className="h-12 w-12 text-muted-foreground mb-3" />
              <h3 className="text-lg font-medium">No Submitted Assignments</h3>
              <p className="text-sm text-muted-foreground mt-1 text-center">
                You haven't submitted any assignments for this course yet.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

