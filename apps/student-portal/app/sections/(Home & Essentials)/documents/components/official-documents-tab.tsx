"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Download,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  FileCheck,
  FilePlus2,
  FileWarning,
  Search,
  Calendar,
  FileArchive,
  Filter,
  SortAsc,
  SortDesc,
  Eye,
  FileX,
  FileCog,
  FileEdit,
  FileSearch,
} from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function OfficialDocumentsTab() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("available")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  // Mock data for official documents
  const availableDocuments = [
    {
      id: "adm-letter",
      name: "Admission Letter",
      type: "Academic",
      dateIssued: "2020-09-01",
      status: "Available",
      description: "Official university admission letter confirming your enrollment",
      size: "245 KB",
      format: "PDF",
      downloads: 3,
    },
    {
      id: "enroll-cert",
      name: "Enrollment Certificate",
      type: "Academic",
      dateIssued: "2023-09-05",
      status: "Available",
      description: "Certificate confirming your current enrollment status",
      size: "198 KB",
      format: "PDF",
      downloads: 1,
    },
    {
      id: "course-reg",
      name: "Course Registration Form",
      type: "Academic",
      dateIssued: "2023-09-10",
      status: "Available",
      description: "Confirmation of courses registered for current semester",
      size: "312 KB",
      format: "PDF",
      downloads: 5,
    },
    {
      id: "fee-statement",
      name: "Fee Statement",
      type: "Financial",
      dateIssued: "2023-09-15",
      status: "Available",
      description: "Detailed statement of tuition and fees for current semester",
      size: "287 KB",
      format: "PDF",
      downloads: 2,
    },
    {
      id: "transcript",
      name: "Academic Transcript",
      type: "Academic",
      dateIssued: "2023-08-30",
      status: "Available",
      description: "Official record of all courses taken and grades earned",
      size: "356 KB",
      format: "PDF",
      downloads: 0,
    },
  ]

  const pendingDocuments = [
    {
      id: "intern-letter",
      name: "Internship Letter",
      type: "Attachment",
      requestDate: "2023-11-20",
      status: "Processing",
      expectedDate: "2023-11-27",
      progress: 65,
      priority: "Normal",
    },
    {
      id: "clearance-form",
      name: "Clearance Form",
      type: "Administrative",
      requestDate: "2023-11-15",
      status: "Pending Approval",
      expectedDate: "2023-11-30",
      progress: 30,
      priority: "High",
    },
  ]

  const documentTypes = [
    { id: "academic-transcript", name: "Academic Transcript", processingTime: "3-5 working days", fee: 500 },
    { id: "recommendation-letter", name: "Recommendation Letter", processingTime: "7-10 working days", fee: 300 },
    { id: "internship-letter", name: "Internship/Attachment Letter", processingTime: "2-3 working days", fee: 200 },
    { id: "enrollment-verification", name: "Enrollment Verification", processingTime: "1-2 working days", fee: 100 },
    { id: "clearance-form", name: "Clearance Form", processingTime: "5-7 working days", fee: 400 },
    { id: "leave-of-absence", name: "Leave of Absence Request", processingTime: "3-5 working days", fee: 0 },
  ]

  const handleDownload = (documentId: string) => {
    setIsLoading(true)
    // Simulate download delay
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Document Downloaded",
        description: "Your document has been downloaded successfully.",
      })
    }, 1500)
  }

  const handleRequestDocument = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Document Request Submitted",
        description: "Your request has been submitted. You will be notified when it's processed.",
      })
    }, 2000)
  }

  const handleCancelRequest = (documentId: string) => {
    toast({
      title: "Request Cancelled",
      description: "Your document request has been cancelled.",
    })
  }

  const handleViewDocument = (documentId: string) => {
    toast({
      title: "Opening Document",
      description: "Your document is being opened in a new tab.",
    })
  }

  // Filter and sort documents
  const filteredAvailableDocuments = availableDocuments
    .filter(
      (doc) =>
        (doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.type.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (filterType === "all" || doc.type.toLowerCase() === filterType.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.dateIssued).getTime() - new Date(b.dateIssued).getTime()
      } else {
        return new Date(b.dateIssued).getTime() - new Date(a.dateIssued).getTime()
      }
    })

  const filteredPendingDocuments = pendingDocuments
    .filter(
      (doc) =>
        (doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.type.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (filterType === "all" || doc.type.toLowerCase() === filterType.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.requestDate).getTime() - new Date(b.requestDate).getTime()
      } else {
        return new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime()
      }
    })

  const documentTypeOptions = ["all", ...new Set(availableDocuments.map((doc) => doc.type.toLowerCase()))]

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col space-y-6">
        {/* Header with Search, Filter, and Request Button */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex flex-1 gap-2">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search documents..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {documentTypeOptions.map((type) => (
                  <DropdownMenuItem
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={cn("capitalize", filterType === type ? "bg-primary/10 font-medium" : "")}
                  >
                    {type === "all" ? "All Types" : type}
                    {filterType === type && <CheckCircle2 className="ml-2 h-4 w-4" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="shrink-0"
            >
              {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
            </Button>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="shrink-0">
                <FilePlus2 className="mr-2 h-4 w-4" /> Request Document
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Request Official Document</DialogTitle>
                <DialogDescription>
                  Fill out this form to request an official document from the university. Processing times and fees vary
                  by document type.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleRequestDocument} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="document-type">Document Type</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name} {type.fee > 0 && `(KES ${type.fee})`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">Processing time: 3-5 working days</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purpose">Purpose</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="internship">Internship/Attachment</SelectItem>
                      <SelectItem value="scholarship">Scholarship Application</SelectItem>
                      <SelectItem value="employment">Employment</SelectItem>
                      <SelectItem value="further-studies">Further Studies</SelectItem>
                      <SelectItem value="visa">Visa Application</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="copies">Number of Copies</Label>
                  <Select defaultValue="1" required>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Copy</SelectItem>
                      <SelectItem value="2">2 Copies</SelectItem>
                      <SelectItem value="3">3 Copies</SelectItem>
                      <SelectItem value="4">4 Copies</SelectItem>
                      <SelectItem value="5">5 Copies</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority Level</Label>
                  <Select defaultValue="normal" required>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal (Standard processing time)</SelectItem>
                      <SelectItem value="urgent">Urgent (Additional KES 500 fee)</SelectItem>
                      <SelectItem value="express">Express (Additional KES 1,000 fee)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additional-info">Additional Information</Label>
                  <Textarea
                    id="additional-info"
                    placeholder="Please provide any additional details or special requirements"
                    className="min-h-[100px]"
                  />
                </div>

                <DialogFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Submitting..." : "Submit Request"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tabs for Available and Pending Documents */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="available" className="flex items-center gap-2">
              <FileCheck className="h-4 w-4" />
              Available Documents
              <Badge variant="secondary" className="ml-1">
                {filteredAvailableDocuments.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Pending Requests
              {filteredPendingDocuments.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {filteredPendingDocuments.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="m-0">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-4 flex items-start gap-4">
                        <Skeleton className="h-12 w-12 rounded-lg" />
                        <div className="flex-1">
                          <Skeleton className="h-5 w-3/4 mb-2" />
                          <Skeleton className="h-4 w-5/6 mb-3" />
                          <Skeleton className="h-4 w-1/3" />
                        </div>
                      </div>
                      <div className="bg-muted/50 p-3 flex justify-end">
                        <Skeleton className="h-9 w-24" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredAvailableDocuments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredAvailableDocuments.map((doc) => (
                  <Card key={doc.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <div className="p-4 flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-lg">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium">{doc.name}</h3>
                              <p className="text-sm text-muted-foreground">{doc.description}</p>
                            </div>
                            <Badge variant="outline" className="capitalize">
                              {doc.type}
                            </Badge>
                          </div>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>Issued: {new Date(doc.dateIssued).toLocaleDateString("en-GB")}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FileText className="h-3.5 w-3.5" />
                              <span>
                                {doc.format} • {doc.size}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Download className="h-3.5 w-3.5" />
                              <span>
                                {doc.downloads} {doc.downloads === 1 ? "download" : "downloads"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-muted/50 p-3 flex justify-end gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => handleViewDocument(doc.id)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>View Document</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => handleDownload(doc.id)}
                                disabled={isLoading}
                              >
                                <Download className="mr-2 h-4 w-4" /> Download
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Download Document</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <FileWarning className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <h3 className="text-lg font-medium">No documents found</h3>
                <p className="text-muted-foreground mt-1">
                  {searchQuery || filterType !== "all"
                    ? "Try adjusting your search or filters"
                    : "You don't have any available documents yet"}
                </p>
                {(searchQuery || filterType !== "all") && (
                  <Button
                    variant="link"
                    onClick={() => {
                      setSearchQuery("")
                      setFilterType("all")
                    }}
                  >
                    Clear filters
                  </Button>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="pending" className="m-0">
            {isLoading ? (
              <div className="rounded-md border">
                <div className="p-4">
                  <Skeleton className="h-8 w-full mb-6" />
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="py-4">
                      <div className="flex justify-between items-center mb-2">
                        <Skeleton className="h-5 w-1/3" />
                        <Skeleton className="h-5 w-1/4" />
                      </div>
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  ))}
                </div>
              </div>
            ) : filteredPendingDocuments.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Request Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Expected Completion</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPendingDocuments.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium">{doc.name}</TableCell>
                        <TableCell>{doc.type}</TableCell>
                        <TableCell>{new Date(doc.requestDate).toLocaleDateString("en-GB")}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {doc.status === "Processing" ? (
                              <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                                <RefreshCw className="h-3 w-3 animate-spin" />
                                Processing
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="w-fit">
                                Pending Approval
                              </Badge>
                            )}
                            <Progress value={doc.progress} className="h-1.5 w-24" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                            {new Date(doc.expectedDate).toLocaleDateString("en-GB")}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <FileCog className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() =>
                                  toast({
                                    title: "Tracking Request",
                                    description: "Opening request tracking details.",
                                  })
                                }
                              >
                                <FileSearch className="h-4 w-4 mr-2" />
                                Track Request
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  toast({
                                    title: "Updating Request",
                                    description: "Opening request update form.",
                                  })
                                }
                              >
                                <FileEdit className="h-4 w-4 mr-2" />
                                Update Request
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleCancelRequest(doc.id)}
                                className="text-red-600 dark:text-red-400"
                              >
                                <FileX className="h-4 w-4 mr-2" />
                                Cancel Request
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-10">
                <FileArchive className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <h3 className="text-lg font-medium">No pending requests</h3>
                <p className="text-muted-foreground mt-1">
                  {searchQuery || filterType !== "all"
                    ? "Try adjusting your search or filters"
                    : "You don't have any pending document requests"}
                </p>
                {(searchQuery || filterType !== "all") && (
                  <Button
                    variant="link"
                    onClick={() => {
                      setSearchQuery("")
                      setFilterType("all")
                    }}
                  >
                    Clear filters
                  </Button>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Information Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium flex items-center">
              <AlertCircle className="h-4 w-4 mr-2 text-amber-600 dark:text-amber-500" />
              Document Request Information
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Official documents may require payment of processing fees</li>
              <li>Processing times vary depending on the document type and priority level</li>
              <li>You will receive an email notification when your document is ready</li>
              <li>For urgent requests, select the "Urgent" or "Express" priority level</li>
              <li>Documents with "Ready for Collection" status must be collected in person</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

