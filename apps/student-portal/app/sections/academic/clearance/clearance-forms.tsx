"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, Printer, Eye, CheckCircle2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

interface Student {
  id: string
  name: string
  course: string
  year: string
  registrationNumber: string
  faculty: string
}

interface ClearanceFormsProps {
  student: Student
}

export function ClearanceForms({ student }: ClearanceFormsProps) {
  const [isDownloading, setIsDownloading] = useState<string | null>(null)
  const [downloadedForms, setDownloadedForms] = useState<string[]>([])

  // In a real app, this would come from your API
  const forms = [
    {
      id: "library-form",
      name: "Library Clearance Form",
      department: "Library",
      description: "Form to be signed by the librarian confirming all books have been returned and fines cleared.",
    },
    {
      id: "finance-form",
      name: "Finance Clearance Form",
      department: "Finance",
      description: "Form to be signed by the finance officer confirming all fees have been paid.",
    },
    {
      id: "accommodation-form",
      name: "Accommodation Clearance Form",
      department: "Accommodation",
      description: "Form to be signed by the accommodation officer confirming room has been vacated and keys returned.",
    },
    {
      id: "academic-form",
      name: "Academic Department Clearance Form",
      department: "Academic Department",
      description: "Form to be signed by the department head confirming all academic requirements have been met.",
    },
    {
      id: "sports-form",
      name: "Sports & Recreation Clearance Form",
      department: "Sports & Recreation",
      description: "Form to be signed by the sports officer confirming all equipment has been returned.",
    },
    {
      id: "security-form",
      name: "Security Clearance Form",
      department: "Security",
      description: "Form to be signed by the security officer confirming ID card has been returned.",
    },
    {
      id: "master-form",
      name: "Master Clearance Form",
      department: "All Departments",
      description:
        "Combined form with sections for all departments to sign. Take this form with you to each department.",
      recommended: true,
    },
  ]

  const handleDownload = (formId: string) => {
    setIsDownloading(formId)

    // Simulate download
    setTimeout(() => {
      setIsDownloading(null)
      setDownloadedForms((prev) => [...prev, formId])
      toast({
        title: "Form Downloaded",
        description: "The clearance form has been downloaded successfully.",
      })
    }, 1500)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="bg-muted border-b">
        <CardTitle>Available Forms</CardTitle>
        <CardDescription className="text-muted-foreground">
          Download and print the required forms for your physical clearance process
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="rounded-lg border border-primary/20 bg-primary/10 p-4 mb-6">
            <div className="flex gap-3">
              <FileText className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-primary">How to use these forms</h3>
                <div className="mt-2 text-sm text-primary/90">
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Download and print the forms you need</li>
                    <li>Visit each department physically with your forms</li>
                    <li>Get the forms signed by the authorized personnel</li>
                    <li>Submit the completed forms to the Registrar's office</li>
                    <li>Once all departments have cleared you, your certificate will be generated</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {forms.map((form) => (
              <motion.div
                key={form.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: forms.indexOf(form) * 0.05 }}
              >
                <Card className="overflow-hidden h-full border-border hover:border-border/80 transition-colors">
                  <CardHeader className="p-4 pb-2 bg-background">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base font-semibold">{form.name}</CardTitle>
                        <CardDescription className="text-muted-foreground">{form.department}</CardDescription>
                      </div>
                      {form.recommended && (
                        <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                          Recommended
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground mb-4">{form.description}</p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className={`gap-2 ${downloadedForms.includes(form.id) ? "bg-primary/10 text-primary border-primary/20" : ""}`}
                        onClick={() => handleDownload(form.id)}
                        disabled={isDownloading === form.id}
                      >
                        {isDownloading === form.id ? (
                          "Downloading..."
                        ) : downloadedForms.includes(form.id) ? (
                          <>
                            <CheckCircle2 className="h-4 w-4" />
                            Downloaded
                          </>
                        ) : (
                          <>
                            <Download className="h-4 w-4" />
                            Download
                          </>
                        )}
                      </Button>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Eye className="h-4 w-4" />
                            Preview
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>{form.name}</DialogTitle>
                            <DialogDescription>Preview of the clearance form</DialogDescription>
                          </DialogHeader>
                          <div className="border rounded-md p-6 bg-background shadow-sm">
                            <div className="text-center mb-6">
                              <h2 className="text-xl font-bold uppercase tracking-wide">UNIVERSITY NAME</h2>
                              <h3 className="text-lg font-semibold mt-1">{form.name}</h3>
                            </div>

                            <div className="mb-6">
                              <h4 className="font-medium mb-2 text-foreground border-b pb-1">Student Information</h4>
                              <div className="grid grid-cols-2 gap-4 mt-3">
                                <div>
                                  <p className="text-sm text-muted-foreground font-medium">Name</p>
                                  <p className="font-semibold">{student.name}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground font-medium">Registration Number</p>
                                  <p className="font-semibold">{student.registrationNumber}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground font-medium">Course</p>
                                  <p className="font-semibold">{student.course}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground font-medium">Year</p>
                                  <p className="font-semibold">{student.year}</p>
                                </div>
                              </div>
                            </div>

                            <div className="mb-6">
                              <h4 className="font-medium mb-2 text-foreground border-b pb-1">Department Clearance</h4>
                              <div className="border rounded-md p-4 mt-3 bg-muted">
                                <div className="space-y-4">
                                  <div className="flex justify-between items-center border-b pb-2">
                                    <div>
                                      <p className="font-medium">{form.department}</p>
                                      <p className="text-sm text-muted-foreground">Clearance Status</p>
                                    </div>
                                    <div className="flex flex-col items-end">
                                      <div className="h-8 w-32 border-b border-dashed"></div>
                                      <p className="text-xs text-muted-foreground">Authorized Signature</p>
                                    </div>
                                  </div>

                                  <div>
                                    <p className="text-sm font-medium">Comments</p>
                                    <div className="h-16 border-b border-dashed mt-2"></div>
                                  </div>

                                  <div className="flex justify-between items-center">
                                    <p className="text-sm text-muted-foreground">Date</p>
                                    <div className="h-6 w-32 border-b border-dashed"></div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="mt-8 text-center text-sm text-muted-foreground">
                              <p>This form must be signed by the authorized personnel from {form.department}.</p>
                              <p>Form is not valid without official stamp.</p>
                            </div>
                          </div>

                          <div className="flex justify-end gap-2 mt-4">
                            <Button variant="outline" onClick={handlePrint} className="gap-2">
                              <Printer className="h-4 w-4" />
                              Print
                            </Button>
                            <Button onClick={() => handleDownload(form.id)} className="gap-2">
                              <Download className="h-4 w-4" />
                              Download
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
