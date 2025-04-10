"use client"

import { useState } from "react"
import { AlertCircle, Check, FileText, Loader2 } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function SpecialCases() {
  const [activeTab, setActiveTab] = useState("supplementary")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Mock courses data
  const courses = [
    {
      id: "cs301",
      code: "CS301",
      name: "Data Structures & Algorithms",
      grade: "D",
      semester: "Semester One",
      eligible: true,
    },
    {
      id: "math201",
      code: "MATH201",
      name: "Discrete Mathematics",
      grade: "F",
      semester: "Semester One",
      eligible: true,
    },
    {
      id: "cs205",
      code: "CS205",
      name: "Computer Networks",
      grade: "E",
      semester: "Semester One",
      eligible: false,
    },
  ]

  // Mock applications data
  const applications = [
    {
      id: "app1",
      type: "supplementary",
      course: "CS201",
      courseName: "Introduction to Programming",
      submittedDate: "2023-10-15",
      status: "approved",
      examDate: "2023-12-05",
      fee: "2,500 KES",
      paymentStatus: "paid",
    },
    {
      id: "app2",
      type: "retake",
      course: "PHYS101",
      courseName: "Physics I",
      submittedDate: "2023-10-10",
      status: "pending",
      fee: "5,000 KES",
      paymentStatus: "pending",
    },
  ]

  const handleApply = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Application submitted",
        description: "Your application has been submitted successfully.",
      })
    }, 2000)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500 hover:bg-green-600">Approved</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Special Cases</h1>
          <p className="text-muted-foreground">Apply for supplementary exams and course retakes</p>
        </div>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Application Period</AlertTitle>
        <AlertDescription>
          Applications for supplementary exams and retakes for the Fall 2023 semester are open until November 30, 2023.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="supplementary" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="supplementary">Supplementary Exams</TabsTrigger>
          <TabsTrigger value="retake">Course Retakes</TabsTrigger>
        </TabsList>

        <TabsContent value="supplementary" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Eligible Courses</CardTitle>
                <CardDescription>Courses you are eligible to take supplementary exams for</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {courses.filter((course) => course.eligible).length > 0 ? (
                  courses
                    .filter((course) => course.eligible)
                    .map((course) => (
                      <div key={course.id} className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <div className="font-medium">
                            {course.code}: {course.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {course.semester} • Grade: {course.grade}
                          </div>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm">Apply</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Apply for Supplementary Exam</DialogTitle>
                              <DialogDescription>
                                Submit your application for a supplementary exam for {course.code}: {course.name}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <h4 className="text-sm font-medium">Course Information</h4>
                                <div className="text-sm">
                                  <div>
                                    <span className="font-medium">Course:</span> {course.code}: {course.name}
                                  </div>
                                  <div>
                                    <span className="font-medium">Semester:</span> {course.semester}
                                  </div>
                                  <div>
                                    <span className="font-medium">Grade:</span> {course.grade}
                                  </div>
                                </div>
                              </div>
                              <Separator />
                              <div className="space-y-2">
                                <h4 className="text-sm font-medium">Fee Information</h4>
                                <div className="text-sm">
                                  <div>
                                    <span className="font-medium">Supplementary Exam Fee:</span> 2,500 KES
                                  </div>
                                  <div>
                                    <span className="font-medium">Payment Method:</span> M-Pesa or Bank Transfer
                                  </div>
                                </div>
                              </div>
                              <Separator />
                              <div className="space-y-2">
                                <h4 className="text-sm font-medium">Reason for Application</h4>
                                <Textarea placeholder="Briefly explain why you are applying for a supplementary exam" />
                              </div>
                              <div className="space-y-2">
                                <h4 className="text-sm font-medium">Supporting Documents (Optional)</h4>
                                <Input type="file" />
                                <p className="text-xs text-muted-foreground">
                                  Upload any supporting documents (e.g., medical certificates) if applicable.
                                </p>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline">Cancel</Button>
                              <Button onClick={handleApply} disabled={isLoading}>
                                {isLoading ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                  </>
                                ) : (
                                  <>
                                    <Check className="mr-2 h-4 w-4" />
                                    Submit Application
                                  </>
                                )}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Check className="h-12 w-12 text-muted-foreground mb-3" />
                    <h3 className="text-lg font-medium">No Eligible Courses</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      You don't have any courses eligible for supplementary exams.
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <div className="text-sm text-muted-foreground">
                  Note: Supplementary exams are only available for courses with grades D, E, or F from the previous two
                  semesters.
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Application Process</CardTitle>
                <CardDescription>Steps to apply for a supplementary exam</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border bg-muted">
                      <span className="text-sm font-medium">1</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Check Eligibility</h4>
                      <p className="text-sm text-muted-foreground">
                        Verify that your course is eligible for a supplementary exam.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border bg-muted">
                      <span className="text-sm font-medium">2</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Submit Application</h4>
                      <p className="text-sm text-muted-foreground">
                        Complete and submit the supplementary exam application form.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border bg-muted">
                      <span className="text-sm font-medium">3</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Pay Fees</h4>
                      <p className="text-sm text-muted-foreground">
                        Pay the supplementary exam fee of 2,500 KES per course.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border bg-muted">
                      <span className="text-sm font-medium">4</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Await Approval</h4>
                      <p className="text-sm text-muted-foreground">
                        Wait for your application to be reviewed and approved.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border bg-muted">
                      <span className="text-sm font-medium">5</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Take Exam</h4>
                      <p className="text-sm text-muted-foreground">
                        Attend the supplementary exam on the scheduled date.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <a href="/academic/special-cases/guidelines">
                    <FileText className="mr-2 h-4 w-4" />
                    View Complete Guidelines
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>My Applications</CardTitle>
              <CardDescription>Track the status of your supplementary exam applications</CardDescription>
            </CardHeader>
            <CardContent>
              {applications.filter((app) => app.type === "supplementary").length > 0 ? (
                <div className="space-y-4">
                  {applications
                    .filter((app) => app.type === "supplementary")
                    .map((application) => (
                      <div key={application.id} className="p-4 border rounded-md">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <div className="font-medium">
                              {application.course}: {application.courseName}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Submitted on {format(new Date(application.submittedDate), "MMMM d, yyyy")}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(application.status)}
                            <Badge variant={application.paymentStatus === "paid" ? "outline" : "secondary"}>
                              {application.paymentStatus === "paid" ? "Paid" : "Payment Pending"}
                            </Badge>
                          </div>
                        </div>

                        <div className="mt-4 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Fee:</span>
                            <span className="font-medium">{application.fee}</span>
                          </div>
                          {application.examDate && (
                            <div className="flex justify-between text-sm">
                              <span>Exam Date:</span>
                              <span className="font-medium">
                                {format(new Date(application.examDate), "MMMM d, yyyy")}
                              </span>
                            </div>
                          )}
                          <div className="flex justify-between text-sm">
                            <span>Application Status:</span>
                            <span className="font-medium">
                              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 flex justify-end gap-2">
                          {application.paymentStatus === "pending" && <Button size="sm">Pay Fee</Button>}
                          <Button variant="outline" size="sm" asChild>
                            <a href={`/academic/special-cases/applications/${application.id}`}>View Details</a>
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mb-3" />
                  <h3 className="text-lg font-medium">No Applications</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    You haven't submitted any supplementary exam applications yet.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="retake" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Eligible Courses</CardTitle>
                <CardDescription>Courses you are eligible to retake</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {courses.filter((course) => course.eligible).length > 0 ? (
                  courses
                    .filter((course) => course.eligible)
                    .map((course) => (
                      <div key={course.id} className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <div className="font-medium">
                            {course.code}: {course.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {course.semester} • Grade: {course.grade}
                          </div>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm">Apply</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Apply for Course Retake</DialogTitle>
                              <DialogDescription>
                                Submit your application to retake {course.code}: {course.name}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <h4 className="text-sm font-medium">Course Information</h4>
                                <div className="text-sm">
                                  <div>
                                    <span className="font-medium">Course:</span> {course.code}: {course.name}
                                  </div>
                                  <div>
                                    <span className="font-medium">Semester:</span> {course.semester}
                                  </div>
                                  <div>
                                    <span className="font-medium">Grade:</span> {course.grade}
                                  </div>
                                </div>
                              </div>
                              <Separator />
                              <div className="space-y-2">
                                <h4 className="text-sm font-medium">Fee Information</h4>
                                <div className="text-sm">
                                  <div>
                                    <span className="font-medium">Retake Fee:</span> 5,000 KES
                                  </div>
                                  <div>
                                    <span className="font-medium">Payment Method:</span> M-Pesa or Bank Transfer
                                  </div>
                                </div>
                              </div>
                              <Separator />
                              <div className="space-y-2">
                                <h4 className="text-sm font-medium">Preferred Semester</h4>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select semester" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="spring2024">Spring 2024</SelectItem>
                                    <SelectItem value="fall2024">Fall 2024</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <h4 className="text-sm font-medium">Reason for Retake</h4>
                                <Textarea placeholder="Briefly explain why you want to retake this course" />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline">Cancel</Button>
                              <Button onClick={handleApply} disabled={isLoading}>
                                {isLoading ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                  </>
                                ) : (
                                  <>
                                    <Check className="mr-2 h-4 w-4" />
                                    Submit Application
                                  </>
                                )}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Check className="h-12 w-12 text-muted-foreground mb-3" />
                    <h3 className="text-lg font-medium">No Eligible Courses</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      You don't have any courses eligible for retake.
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <div className="text-sm text-muted-foreground">
                  Note: Course retakes are only available for courses with grades D, E, or F from the previous four
                  semesters.
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Retake Information</CardTitle>
                <CardDescription>Important information about course retakes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">What is a Course Retake?</h4>
                    <p className="text-sm text-muted-foreground">
                      A course retake allows you to repeat a course you previously failed or performed poorly in. You
                      will attend classes and complete all assessments again.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Retake vs. Supplementary</h4>
                    <p className="text-sm text-muted-foreground">
                      A retake involves attending the full course again, while a supplementary exam only requires taking
                      another exam without attending classes.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Grading Policy</h4>
                    <p className="text-sm text-muted-foreground">
                      The higher grade between your original attempt and retake will be used in calculating your GPA,
                      but both grades will appear on your transcript.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Fees</h4>
                    <p className="text-sm text-muted-foreground">
                      Retaking a course costs 5,000 KES per credit hour. Payment must be completed before registration
                      is confirmed.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <a href="/academic/special-cases/guidelines">
                    <FileText className="mr-2 h-4 w-4" />
                    View Complete Guidelines
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>My Applications</CardTitle>
              <CardDescription>Track the status of your course retake applications</CardDescription>
            </CardHeader>
            <CardContent>
              {applications.filter((app) => app.type === "retake").length > 0 ? (
                <div className="space-y-4">
                  {applications
                    .filter((app) => app.type === "retake")
                    .map((application) => (
                      <div key={application.id} className="p-4 border rounded-md">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <div className="font-medium">
                              {application.course}: {application.courseName}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Submitted on {format(new Date(application.submittedDate), "MMMM d, yyyy")}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(application.status)}
                            <Badge variant={application.paymentStatus === "paid" ? "outline" : "secondary"}>
                              {application.paymentStatus === "paid" ? "Paid" : "Payment Pending"}
                            </Badge>
                          </div>
                        </div>

                        <div className="mt-4 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Fee:</span>
                            <span className="font-medium">{application.fee}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Application Status:</span>
                            <span className="font-medium">
                              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 flex justify-end gap-2">
                          {application.paymentStatus === "pending" && <Button size="sm">Pay Fee</Button>}
                          <Button variant="outline" size="sm" asChild>
                            <a href={`/academic/special-cases/applications/${application.id}`}>View Details</a>
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mb-3" />
                  <h3 className="text-lg font-medium">No Applications</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    You haven't submitted any course retake applications yet.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

