"use client"

import type React from "react"

import { useState } from "react"
import { AlertCircle, Loader2 } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { failedCourses } from "./mock-data"

const supplementaryFormSchema = z.object({
  courses: z.array(z.string()).min(1, "Select at least one course"),
  reason: z.string().min(10, "Reason must be at least 10 characters"),
  acknowledgeFees: z.boolean().refine((val) => val === true, {
    message: "You must acknowledge the fee requirements",
  }),
})

type SupplementaryFormValues = z.infer<typeof supplementaryFormSchema>

interface SupplementaryExamFormProps {
  onSubmit: (showPaymentDialog: boolean) => void
}

export function SupplementaryExamForm({ onSubmit }: SupplementaryExamFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const { toast } = useToast()

  const form = useForm<SupplementaryFormValues>({
    resolver: zodResolver(supplementaryFormSchema),
    defaultValues: {
      courses: [],
      reason: "",
      acknowledgeFees: false,
    },
  })

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setUploadedFiles((prev) => [...prev, ...newFiles])

      toast({
        title: "Files uploaded",
        description: `${newFiles.length} file(s) uploaded successfully.`,
      })
    }
  }

  const handleSubmit = (data: SupplementaryFormValues) => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Supplementary form data:", data)
      setIsSubmitting(false)
      onSubmit(true)

      toast({
        title: "Application submitted",
        description: "Your supplementary exam application has been submitted successfully.",
      })
    }, 1500)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Supplementary Examination Application</CardTitle>
        <CardDescription>Apply for supplementary examinations for failed courses</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Failed Courses</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Select the courses you wish to apply for supplementary examinations
                </p>

                {failedCourses.length > 0 ? (
                  <div className="space-y-3">
                    {failedCourses.map((course) => (
                      <div key={course.code} className="flex items-start space-x-3 p-3 border rounded-md">
                        <Checkbox
                          id={course.code}
                          onCheckedChange={(checked) => {
                            const currentCourses = form.getValues("courses")
                            if (checked) {
                              form.setValue("courses", [...currentCourses, course.code])
                            } else {
                              form.setValue(
                                "courses",
                                currentCourses.filter((c) => c !== course.code),
                              )
                            }
                          }}
                        />
                        <div className="grid gap-1.5">
                          <Label htmlFor={course.code} className="font-medium">
                            {course.code}: {course.name}
                          </Label>
                          <div className="flex items-center space-x-2 text-sm">
                            <Badge variant={course.grade === "E" ? "destructive" : "outline"}>
                              Grade: {course.grade}
                            </Badge>
                            <span className="text-muted-foreground">Units: {course.units}</span>
                            <span className="text-muted-foreground">
                              Fee: KES {(course.units * 2500).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>No Failed Courses</AlertTitle>
                    <AlertDescription>
                      You have no courses that qualify for supplementary examinations.
                    </AlertDescription>
                  </Alert>
                )}

                {form.formState.errors.courses && (
                  <p className="text-sm font-medium text-destructive mt-2">{form.formState.errors.courses.message}</p>
                )}
              </div>

              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason for Application</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Briefly explain why you are applying for supplementary examinations"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Provide a brief explanation for your application</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Document Upload</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload any supporting documents (optional for supplementary exams)
                  </p>

                  <div className="grid gap-4">
                    <Input id="upload" type="file" multiple className="hidden" onChange={handleFileUpload} />
                    <Label
                      htmlFor="upload"
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none data-[state=open]:bg-secondary hover:bg-secondary/80 h-10 px-4 py-2"
                    >
                      Upload Files
                    </Label>

                    {uploadedFiles.length > 0 && (
                      <div className="space-y-2">
                        <h5 className="font-medium">Uploaded Files</h5>
                        <ul className="list-disc list-inside text-sm">
                          {uploadedFiles.map((file, index) => (
                            <li key={index}>{file.name}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="acknowledgeFees"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Acknowledge Fees</FormLabel>
                        <FormDescription>
                          I understand that I am required to pay a fee of KES 2,500 per course unit for supplementary
                          examinations.
                        </FormDescription>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button disabled={isSubmitting} type="submit">
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Application
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

