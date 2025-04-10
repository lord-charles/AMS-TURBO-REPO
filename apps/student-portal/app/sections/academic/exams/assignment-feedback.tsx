"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  FileText,
  Download,
  CheckCircle2,
  Clock,
  XCircle,
  MessageSquare,
  Upload,
  ThumbsUp,
  ThumbsDown,
  Calendar,
  Info,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

interface AssignmentFeedbackProps {
  assignmentId: string
  courseId: string
  title: string
  submittedDate: string
  dueDate: string
  status: "graded" | "pending" | "late" | "resubmit"
  score?: number
  maxScore: number
  feedback?: string
  attachments?: Array<{
    id: string
    name: string
    size: number
    url: string
  }>
  instructorComments?: Array<{
    id: string
    author: string
    date: string
    comment: string
  }>
  rubric?: Array<{
    category: string
    score: number
    maxScore: number
    comments?: string
  }>
}

export function AssignmentFeedback({
  assignmentId,
  courseId,
  title,
  submittedDate,
  dueDate,
  status,
  score,
  maxScore,
  feedback,
  attachments = [],
  instructorComments = [],
  rubric = [],
}: AssignmentFeedbackProps) {
  const [activeTab, setActiveTab] = useState("feedback")
  const [feedbackComment, setFeedbackComment] = useState("")
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)
  const { toast } = useToast()

  const scorePercentage = score !== undefined ? (score / maxScore) * 100 : 0

  const getScoreColor = () => {
    if (scorePercentage >= 80) return "text-green-600 dark:text-green-400"
    if (scorePercentage >= 60) return "text-amber-600 dark:text-amber-400"
    return "text-red-600 dark:text-red-400"
  }

  const getStatusBadge = () => {
    switch (status) {
      case "graded":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-100 border-green-200 dark:border-green-800"
          >
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Graded
          </Badge>
        )
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-100 border-blue-200 dark:border-blue-800"
          >
            <Clock className="h-3 w-3 mr-1" />
            Pending Review
          </Badge>
        )
      case "late":
        return (
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 dark:bg-amber-900 dark:text-amber-100 border-amber-200 dark:border-amber-800"
          >
            <Clock className="h-3 w-3 mr-1" />
            Late Submission
          </Badge>
        )
      case "resubmit":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-100 border-red-200 dark:border-red-800"
          >
            <XCircle className="h-3 w-3 mr-1" />
            Resubmission Required
          </Badge>
        )
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes"
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleSubmitComment = () => {
    if (!feedbackComment.trim()) return

    setIsSubmittingComment(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmittingComment(false)
      setFeedbackComment("")

      toast({
        title: "Comment Submitted",
        description: "Your comment has been submitted to the instructor.",
      })
    }, 1000)
  }

  const handleFeedbackReaction = (reaction: "helpful" | "unhelpful") => {
    toast({
      title: reaction === "helpful" ? "Feedback Marked as Helpful" : "Feedback Marked as Unhelpful",
      description: "Thank you for your feedback. This helps instructors improve their comments.",
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <span>Submitted: {formatDate(submittedDate)}</span>
              <span className="hidden sm:inline">•</span>
              <span>Weight: {maxScore / 10}% of final grade</span>
            </CardDescription>
          </div>
          <div>{getStatusBadge()}</div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="rubric">Rubric</TabsTrigger>
            <TabsTrigger value="submission">Your Submission</TabsTrigger>
          </TabsList>

          <TabsContent value="feedback" className="space-y-6">
            {status === "graded" && score !== undefined && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">Score</h3>
                  <div className="flex items-center gap-2">
                    <span className={cn("text-lg font-bold", getScoreColor())}>
                      {score} / {maxScore}
                    </span>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                    >
                      {score >= 70
                        ? "A"
                        : score >= 65
                          ? "B+"
                          : score >= 60
                            ? "B"
                            : score >= 55
                              ? "C+"
                              : score >= 50
                                ? "C"
                                : score >= 45
                                  ? "D+"
                                  : score >= 40
                                    ? "D"
                                    : "E"}
                    </Badge>
                  </div>
                </div>
                <Progress
                  value={scorePercentage}
                  className={cn(
                    "h-2",
                    scorePercentage >= 80 ? "bg-green-100" : scorePercentage >= 60 ? "bg-amber-100" : "bg-red-100",
                  )}
                  // indicatorClassName={cn(
                  //   scorePercentage >= 80 ? "bg-green-600" : scorePercentage >= 60 ? "bg-amber-600" : "bg-red-600",
                  // )}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0</span>
                  <span>50</span>
                  <span>100</span>
                </div>
              </div>
            )}

            {feedback && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">Lecturer's Feedback</h3>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleFeedbackReaction("helpful")}
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span className="sr-only">Helpful</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleFeedbackReaction("unhelpful")}
                    >
                      <ThumbsDown className="h-4 w-4" />
                      <span className="sr-only">Not Helpful</span>
                    </Button>
                  </div>
                </div>
                <div className="bg-muted p-4 rounded-md text-sm">{feedback}</div>
              </div>
            )}

            {instructorComments.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Discussion</h3>
                {instructorComments.map((comment) => (
                  <div key={comment.id} className="bg-muted p-4 rounded-md space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">{comment.author}</span>
                      <span className="text-xs text-muted-foreground">{formatDate(comment.date)}</span>
                    </div>
                    <p className="text-sm">{comment.comment}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Add Comment</h3>
              <Textarea
                placeholder="Ask a question or provide additional context..."
                value={feedbackComment}
                onChange={(e) => setFeedbackComment(e.target.value)}
                rows={3}
              />
              <div className="flex justify-end">
                <Button
                  size="sm"
                  onClick={handleSubmitComment}
                  disabled={!feedbackComment.trim() || isSubmittingComment}
                >
                  {isSubmittingComment ? (
                    <>
                      <Clock className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Send Comment
                    </>
                  )}
                </Button>
              </div>
            </div>

            {status === "resubmit" && (
              <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-md border border-red-200 dark:border-red-800">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200 mb-2">Resubmission Required</h3>
                <p className="text-sm text-red-700 dark:text-red-300">
                  Your lecturer has requested that you resubmit this assignment. Please review the feedback and make the
                  necessary changes. Resubmission deadline: <strong>7 days</strong> from notification.
                </p>
                <Button className="mt-3 bg-red-600 hover:bg-red-700 text-white">
                  <Upload className="mr-2 h-4 w-4" />
                  Resubmit Assignment
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="rubric" className="space-y-6">
            {rubric && rubric.length > 0 ? (
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Grading Rubric</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-2 text-left text-sm font-medium">Criteria</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Score</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Out of</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Comments</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rubric.map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-muted/20" : ""}>
                          <td className="px-4 py-3 text-sm font-medium">{item.category}</td>
                          <td className="px-4 py-3 text-sm">
                            <span
                              className={cn(
                                "font-medium",
                                item.score / item.maxScore >= 0.8
                                  ? "text-green-600"
                                  : item.score / item.maxScore >= 0.6
                                    ? "text-amber-600"
                                    : "text-red-600",
                              )}
                            >
                              {item.score}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">{item.maxScore}</td>
                          <td className="px-4 py-3 text-sm">{item.comments || "-"}</td>
                        </tr>
                      ))}
                      <tr className="bg-muted/30 font-medium">
                        <td className="px-4 py-3 text-sm">Total</td>
                        <td className="px-4 py-3 text-sm">{score}</td>
                        <td className="px-4 py-3 text-sm">{maxScore}</td>
                        <td className="px-4 py-3 text-sm">
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                          >
                            {score !== undefined && score >= 70
                              ? "A"
                              : score !== undefined && score >= 65
                                ? "B+"
                                : score !== undefined && score >= 60
                                  ? "B"
                                  : score !== undefined && score >= 55
                                    ? "C+"
                                    : score !== undefined && score >= 50
                                      ? "C"
                                      : score !== undefined && score >= 45
                                        ? "D+"
                                        : score !== undefined && score >= 40
                                          ? "D"
                                          : "E"}
                          </Badge>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <Alert className="bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Grading Scale</AlertTitle>
                  <AlertDescription>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 text-sm">
                      <div>A: 70-100%</div>
                      <div>B+: 65-69%</div>
                      <div>B: 60-64%</div>
                      <div>C+: 55-59%</div>
                      <div>C: 50-54%</div>
                      <div>D+: 45-49%</div>
                      <div>D: 40-44%</div>
                      <div>E: 0-39%</div>
                    </div>
                  </AlertDescription>
                </Alert>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium">No Rubric Available</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  The lecturer has not provided a detailed rubric for this assignment.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="submission" className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Submission Details</h3>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{formatDate(submittedDate)}</span>
                </div>
              </div>

              {new Date(submittedDate) > new Date(dueDate) && (
                <Alert className="bg-amber-50 border-amber-200 text-amber-800">
                  <Clock className="h-4 w-4" />
                  <AlertTitle>Late Submission</AlertTitle>
                  <AlertDescription>
                    <p>This assignment was submitted after the due date ({formatDate(dueDate)}).</p>
                    <p className="mt-1">Late penalty: 5% per day, maximum 5 days.</p>
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <div className="p-4 border rounded-md bg-muted/30">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs text-muted-foreground">Submission ID</h4>
                  <p className="text-sm font-medium">SUB-{assignmentId.toUpperCase()}</p>
                </div>
                <div>
                  <h4 className="text-xs text-muted-foreground">Course Code</h4>
                  <p className="text-sm font-medium">{courseId}</p>
                </div>
                <div>
                  <h4 className="text-xs text-muted-foreground">Submission Time</h4>
                  <p className="text-sm font-medium">{formatDate(submittedDate)}</p>
                </div>
                <div>
                  <h4 className="text-xs text-muted-foreground">Submission Status</h4>
                  <p className="text-sm font-medium">
                    {status === "graded"
                      ? "Graded"
                      : status === "pending"
                        ? "Under Review"
                        : status === "late"
                          ? "Late"
                          : "Resubmission Required"}
                  </p>
                </div>
              </div>
            </div>

            {attachments.length > 0 ? (
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Your Submission Files</h3>
                <div className="space-y-2">
                  {attachments.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-3 bg-muted rounded-md">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">{file.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{formatFileSize(file.size)}</span>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                          <a href={file.url} download target="_blank" rel="noopener noreferrer">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Alert className="bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Turnitin Similarity Report</AlertTitle>
                  <AlertDescription className="flex items-center justify-between">
                    <span>
                      Similarity Score: <strong>18%</strong>
                    </span>
                    <Button variant="outline" size="sm" className="h-8">
                      <FileText className="mr-2 h-4 w-4" />
                      View Report
                    </Button>
                  </AlertDescription>
                </Alert>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium">No Files Available</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Your submission files are not available for download.
                </p>
              </div>
            )}

            <div className="bg-muted/30 p-4 rounded-md border">
              <h3 className="text-sm font-medium mb-2">Submission Declaration</h3>
              <p className="text-sm text-muted-foreground">
                By submitting this assignment, you declared that this is your original work and you have not copied from
                any other student's work or from any other source except where due reference is made explicitly in the
                text.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => window.history.back()}>
          Back
        </Button>
        <div className="flex gap-2">
          {status === "resubmit" && (
            <Button className="bg-primary">
              <Upload className="mr-2 h-4 w-4" />
              Resubmit Assignment
            </Button>
          )}
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download Feedback
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

