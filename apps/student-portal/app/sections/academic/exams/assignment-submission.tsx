"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Upload, AlertTriangle, CheckCircle2, Clock, Info, HelpCircle, Paperclip, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

interface AssignmentSubmissionProps {
  assignmentId: string
  courseId: string
  title: string
  description: string
  dueDate: string
  maxFileSize: number
  allowedFileTypes: string[]
  maxScore: number
  isGroupAssignment?: boolean
  groupMembers?: string[]
}

export function AssignmentSubmission({
  assignmentId,
  courseId,
  title,
  description,
  dueDate,
  maxFileSize,
  allowedFileTypes,
  maxScore,
  isGroupAssignment = false,
  groupMembers = [],
}: AssignmentSubmissionProps) {
  const [files, setFiles] = useState<File[]>([])
  const [comments, setComments] = useState("")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")
  const [plagiarismChecked, setPlagiarismChecked] = useState(false)
  const [submissionError, setSubmissionError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("upload")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const dueDateTime = new Date(dueDate)
  const now = new Date()
  const isOverdue = now > dueDateTime
  const timeRemaining = dueDateTime.getTime() - now.getTime()
  const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24))
  const hoursRemaining = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)

      // Validate file types
      const invalidFiles = selectedFiles.filter(
        (file) => !allowedFileTypes.some((type) => file.name.toLowerCase().endsWith(type.toLowerCase())),
      )

      if (invalidFiles.length > 0) {
        setSubmissionError(
          `Invalid file type(s): ${invalidFiles.map((f) => f.name).join(", ")}. Allowed types: ${allowedFileTypes.join(", ")}`,
        )
        return
      }

      // Validate file sizes
      const oversizedFiles = selectedFiles.filter((file) => file.size > maxFileSize * 1024 * 1024)

      if (oversizedFiles.length > 0) {
        setSubmissionError(
          `File(s) exceed maximum size of ${maxFileSize}MB: ${oversizedFiles.map((f) => f.name).join(", ")}`,
        )
        return
      }

      setFiles((prev) => [...prev, ...selectedFiles])
      setSubmissionError(null)

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files)

      // Validate file types
      const invalidFiles = droppedFiles.filter(
        (file) => !allowedFileTypes.some((type) => file.name.toLowerCase().endsWith(type.toLowerCase())),
      )

      if (invalidFiles.length > 0) {
        setSubmissionError(
          `Invalid file type(s): ${invalidFiles.map((f) => f.name).join(", ")}. Allowed types: ${allowedFileTypes.join(", ")}`,
        )
        return
      }

      // Validate file sizes
      const oversizedFiles = droppedFiles.filter((file) => file.size > maxFileSize * 1024 * 1024)

      if (oversizedFiles.length > 0) {
        setSubmissionError(
          `File(s) exceed maximum size of ${maxFileSize}MB: ${oversizedFiles.map((f) => f.name).join(", ")}`,
        )
        return
      }

      setFiles((prev) => [...prev, ...droppedFiles])
      setSubmissionError(null)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (files.length === 0) {
      setSubmissionError("Please attach at least one file")
      return
    }

    if (!plagiarismChecked) {
      setSubmissionError("Please confirm that this is your original work")
      return
    }

    setUploadStatus("uploading")
    setUploadProgress(0)

    const uploadInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(uploadInterval)
          return 100
        }
        return prev + 5
      })
    }, 150)

    setTimeout(() => {
      clearInterval(uploadInterval)
      setUploadProgress(100)

      setTimeout(() => {
        setUploadStatus("success")

        toast({
          title: "Assignment Submitted Successfully",
          description: "Your assignment has been submitted and is pending review.",
        })
      }, 500)
    }, 3000)
  }

  const handleSaveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your assignment draft has been saved. You can continue editing later.",
    })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes"
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  const formatTimeRemaining = () => {
    if (isOverdue) return "Overdue"

    if (daysRemaining > 0) {
      return `${daysRemaining} day${daysRemaining !== 1 ? "s" : ""} ${hoursRemaining} hour${hoursRemaining !== 1 ? "s" : ""} remaining`
    } else if (hoursRemaining > 0) {
      return `${hoursRemaining} hour${hoursRemaining !== 1 ? "s" : ""} ${minutesRemaining} minute${minutesRemaining !== 1 ? "s" : ""} remaining`
    } else {
      return `${minutesRemaining} minute${minutesRemaining !== 1 ? "s" : ""} remaining`
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <span>Maximum Score: {maxScore} points</span>
                <span className="hidden sm:inline">•</span>
                <span>Weight: {maxScore / 10}% of final grade</span>
              </div>
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {isOverdue ? (
              <Badge variant="destructive" className="flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                Overdue
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className={cn(
                  "flex items-center gap-1",
                  daysRemaining === 0 && hoursRemaining < 24
                    ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800"
                    : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
                )}
              >
                <Clock className="h-3 w-3" />
                {formatTimeRemaining()}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload Files</TabsTrigger>
            <TabsTrigger value="details">Assignment Details</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="file-upload" className="block mb-2">
                  Upload Files{" "}
                  <span className="text-muted-foreground text-xs">
                    (Max: {maxFileSize}MB, Types: {allowedFileTypes.join(", ")})
                  </span>
                </Label>
                <div
                  className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Input
                    id="file-upload"
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    accept={allowedFileTypes.map((type) => `.${type}`).join(",")}
                  />
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm font-medium">Drag and drop files here or click to browse</p>
                    <p className="text-xs text-muted-foreground">Supported formats: {allowedFileTypes.join(", ")}</p>
                  </div>
                </div>
              </div>

              {files.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-2">Selected Files ({files.length})</h3>
                  <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <FileText className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-sm font-medium truncate">{file.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{formatFileSize(file.size)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleRemoveFile(index)
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="comments" className="block mb-2">
                  Additional Comments
                </Label>
                <Textarea
                  id="comments"
                  placeholder="Add any comments or notes for your instructor..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-md p-4 dark:bg-amber-950/20 dark:border-amber-800">
                <h3 className="text-sm font-medium text-amber-800 dark:text-amber-300 mb-2">Plagiarism Declaration</h3>
                <p className="text-sm text-amber-700 dark:text-amber-400 mb-3">
                  I understand that plagiarism is a serious academic offense that may result in disciplinary action as
                  per the university's academic integrity policy. By submitting this assignment, I declare that:
                </p>
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="plagiarism-check-1"
                      checked={plagiarismChecked}
                      onCheckedChange={(checked) => setPlagiarismChecked(checked as boolean)}
                    />
                    <Label htmlFor="plagiarism-check-1" className="text-sm text-amber-700 dark:text-amber-400">
                      This is my original work and I have not copied from any other student's work or from any other
                      source except where due reference is made explicitly in the text.
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="plagiarism-check-2"
                      checked={plagiarismChecked}
                      onCheckedChange={(checked) => setPlagiarismChecked(checked as boolean)}
                    />
                    <Label htmlFor="plagiarism-check-2" className="text-sm text-amber-700 dark:text-amber-400">
                      I have not submitted this work, or parts of it, for assessment in another unit at this or any
                      other institution.
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="plagiarism-check-3"
                      checked={plagiarismChecked}
                      onCheckedChange={(checked) => setPlagiarismChecked(checked as boolean)}
                    />
                    <Label htmlFor="plagiarism-check-3" className="text-sm text-amber-700 dark:text-amber-400">
                      I understand that my work may be electronically checked for plagiarism using Turnitin or other
                      plagiarism detection software.
                    </Label>
                  </div>
                </div>
              </div>

              {submissionError && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{submissionError}</AlertDescription>
                </Alert>
              )}

              {uploadStatus === "uploading" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}

              {uploadStatus === "success" && (
                <Alert className="bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-50 border-green-200 dark:border-green-800">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>Your assignment has been submitted successfully.</AlertDescription>
                </Alert>
              )}

              {isOverdue && uploadStatus === "idle" && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Late Submission</AlertTitle>
                  <AlertDescription>
                    This assignment is past the due date. Late submissions may be subject to penalties as per course
                    policy.
                  </AlertDescription>
                </Alert>
              )}
            </form>
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Assignment Description</h3>
              <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md">{description}</div>
            </div>

            {isGroupAssignment && groupMembers && groupMembers.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-2">Group Members</h3>
                <div className="flex flex-wrap gap-2">
                  {groupMembers.map((member, index) => (
                    <Badge key={index} variant="secondary">
                      {member}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-sm font-medium mb-2">Submission Requirements</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Info className="h-4 w-4 text-muted-foreground" />
                  <span>Maximum File Size: {maxFileSize}MB</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Paperclip className="h-4 w-4 text-muted-foreground" />
                  <span>Allowed File Types: {allowedFileTypes.join(", ")}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Due Date: {new Date(dueDate).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <Alert>
              <HelpCircle className="h-4 w-4" />
              <AlertTitle>Submission Guidelines</AlertTitle>
              <AlertDescription>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>Ensure your submission follows all formatting requirements specified in the assignment.</li>
                  <li>All assignments must be submitted through the student portal before the deadline.</li>
                  <li>Late submissions may be penalized at a rate of 5% per day up to a maximum of 5 days.</li>
                  <li>
                    Technical issues are not considered valid reasons for late submission unless reported to ICT support
                    before the deadline.
                  </li>
                  <li>For group assignments, only one member should submit on behalf of the group.</li>
                </ul>
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" type="button" onClick={() => window.history.back()}>
            Cancel
          </Button>
          {uploadStatus === "idle" && (
            <Button variant="outline" type="button" onClick={handleSaveDraft}>
              Save Draft
            </Button>
          )}
        </div>
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={uploadStatus === "uploading" || uploadStatus === "success" || !plagiarismChecked}
          className={cn(
            uploadStatus === "success" && "bg-green-600 hover:bg-green-700",
            !plagiarismChecked && "opacity-50 cursor-not-allowed",
          )}
        >
          {uploadStatus === "uploading" ? (
            <>
              <Clock className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : uploadStatus === "success" ? (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Submitted
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Submit Assignment
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

