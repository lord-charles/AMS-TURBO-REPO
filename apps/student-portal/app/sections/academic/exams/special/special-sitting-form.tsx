"use client"

import type React from "react"
import { useState } from "react"
import { Loader2 } from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { failedCourses } from "./mock-data"

const specialSittingFormSchema = z.object({
  course: z.string().min(1, "Course is required"),
  reason: z.string().min(10, "Reason must be at least 10 characters").max(500, "Reason must not exceed 500 characters"),
  conflictingCourse: z.string().optional(),
  preferredDate: z.string().min(1, "Preferred date is required"),
  supportingDocuments: z.boolean().refine((val) => val === true, {
    message: "You must upload supporting documents",
  }),
  acknowledgeFees: z.boolean().refine((val) => val === true, {
    message: "You must acknowledge the fee requirements",
  }),
})

type SpecialSittingFormValues = z.infer<typeof specialSittingFormSchema>

interface SpecialSittingFormProps {
  onSubmit: (showPaymentDialog: boolean) => void
}

export function SpecialSittingForm({ onSubmit }: SpecialSittingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const { toast } = useToast()

  const form = useForm<SpecialSittingFormValues>({
    resolver: zodResolver(specialSittingFormSchema),
    defaultValues: {
      course: "",
      reason: "",
      conflictingCourse: "",
      preferredDate: "",
      supportingDocuments: false,
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

  const handleSubmit = (data: SpecialSittingFormValues) => {
    setIsSubmitting(true)
    setTimeout(() => {
      console.log("Special sitting form data:", data)
      setIsSubmitting(false)
      onSubmit(true)

      toast({
        title: "Application submitted",
        description: "Your special sitting application has been submitted successfully.",
      })
    }, 1500)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Special Sitting Application</CardTitle>
        <CardDescription>Apply for special sitting examinations for timetable clashes</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="course"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a course" />
                        </SelectTrigger>
                        <SelectContent>
                          {failedCourses.map((course) => (
                            <SelectItem key={course.code} value={course.code}>
                              {course.code}: {course.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>Select the course for which you are requesting a special sitting.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason for Application</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Briefly explain why you are applying for a special sitting"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Provide a brief explanation for your application</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="conflictingCourse"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Conflicting Course (If Applicable)</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} placeholder="Enter the course code of the conflicting exam" />
                    </FormControl>
                    <FormDescription>
                      If the reason is a timetable clash, enter the code of the conflicting course.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preferredDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Exam Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormDescription>Enter your preferred date for the special sitting.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Document Upload</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload supporting documents (timetable clash evidence, etc.)
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
                  name="supportingDocuments"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Supporting Documents Uploaded</FormLabel>
                        <FormDescription>
                          I confirm that I have uploaded all the necessary supporting documents for this application.
                        </FormDescription>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

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
                          I understand that I am required to pay a fee of KES 3,000 per exam for special sittings.
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

