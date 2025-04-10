"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  Search,
  Filter,
  Calendar,
  Download,
  Printer,
  Eye,
  BarChart,
  FileDown,
  Clock,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  CalendarRange,
} from "lucide-react"
import { EmptyState } from "./empty-state"
import { previousApplications } from "./mock-data"
import { getRequestStatusBadge, getRequestTypeBadge } from "./utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import type { PreviousApplication } from "./types"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface HistoryTabProps {
  onViewApplication: (application: any) => void
  onDownloadReceipt: (application: any) => void
  onPrintApplication: (application: any) => void
  onExportHistory: () => void
  onViewStatistics: () => void
}

export function HistoryTab({
  onViewApplication,
  onDownloadReceipt,
  onPrintApplication,
  onExportHistory,
  onViewStatistics,
}: HistoryTabProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [semesterFilter, setSemesterFilter] = useState("all")
  const [expandedApplication, setExpandedApplication] = useState<string | null>(null)

  // dummy data for academic years and semesters
  const academicYears = ["2023/2024", "2022/2023", "2021/2022"]
  const semesters = ["1st Semester", "2nd Semester", "3rd Semester"]

  const filteredApplications = previousApplications.filter((app) => {
    const matchesSearch =
      app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.type.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || app.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesType = typeFilter === "all" || app.type.toLowerCase() === typeFilter.toLowerCase()
    // reminder!!!!!, we would filter by semester as well

    return matchesSearch && matchesStatus && matchesType
  })

  const toggleExpand = (id: string) => {
    if (expandedApplication === id) {
      setExpandedApplication(null)
    } else {
      setExpandedApplication(id)
    }
  }

  const renderApplicationTimeline = (application: PreviousApplication) => {
    if (!application.applicationSteps) return null

    return (
      <div className="mt-4 space-y-3">
        <h4 className="text-sm font-medium">Application Timeline</h4>
        <div className="relative">
          {application.applicationSteps.map((step, index) => (
            <div key={step.id} className="flex items-start mb-4">
              <div className="flex flex-col items-center mr-4">
                <div
                  className={`rounded-full h-8 w-8 flex items-center justify-center ${
                    step.status === "completed"
                      ? "bg-green-100 text-green-600"
                      : step.status === "current"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {step.status === "completed" ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : step.status === "current" ? (
                    <Clock className="h-5 w-5" />
                  ) : (
                    <div className="h-3 w-3 rounded-full bg-gray-300"></div>
                  )}
                </div>
                {index < (application.applicationSteps?.length ?? 0) - 1 && <div className="h-10 w-0.5 bg-gray-200 my-1"></div>}
              </div>
              <div className="pt-1">
                <p
                  className={`text-sm font-medium ${
                    step.status === "completed"
                      ? "text-green-600"
                      : step.status === "current"
                        ? "text-blue-600"
                        : "text-gray-500"
                  }`}
                >
                  {step.name}
                </p>
                {step.date && <p className="text-xs text-gray-500">{step.date}</p>}
                {step.notes && <p className="text-xs text-gray-500 mt-1">{step.notes}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderApplicationCard = (application: PreviousApplication) => {
    const isExpanded = expandedApplication === application.id

    return (
      <Card key={application.id} className="mb-4">
        <Collapsible open={isExpanded}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg flex items-center">
                  {application.course}
                  <span className="text-sm font-normal text-gray-500 ml-2">({application.id})</span>
                </CardTitle>
                <CardDescription>Submitted on {application.date}</CardDescription>
              </div>
              <div className="flex flex-col items-end gap-1">
                {getRequestTypeBadge(application.type)}
                {getRequestStatusBadge(application.status)}
                {getRequestStatusBadge(application.paymentStatus)}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Exam Date</p>
                <p className="font-medium">{application.examDate}</p>
              </div>
              {application.venue && (
                <div>
                  <p className="text-gray-500">Venue</p>
                  <p className="font-medium">{application.venue}</p>
                </div>
              )}
              {application.time && (
                <div>
                  <p className="text-gray-500">Time</p>
                  <p className="font-medium">{application.time}</p>
                </div>
              )}
            </div>

            <CollapsibleContent>
              {renderApplicationTimeline(application)}

              {/* Additional details that would be shown in the expanded view */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="payment-details">
                    <AccordionTrigger className="text-sm">Payment Details</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Status:</span>
                          <span className="font-medium">{application.paymentStatus}</span>
                        </div>
                        {application.paymentStatus === "Paid" && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Payment Date:</span>
                              <span className="font-medium">18/11/2023</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Reference:</span>
                              <span className="font-medium">MPESA-123456789</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Amount:</span>
                              <span className="font-medium">KES 2,500</span>
                            </div>
                            <div className="mt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full"
                                onClick={() => onDownloadReceipt(application)}
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Download Receipt
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="exam-details">
                    <AccordionTrigger className="text-sm">Exam Details</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Course:</span>
                          <span className="font-medium">{application.course}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Exam Type:</span>
                          <span className="font-medium">{application.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Date:</span>
                          <span className="font-medium">{application.examDate}</span>
                        </div>
                        {application.venue && (
                          <div className="flex justify-between">
                            <span className="text-gray-500">Venue:</span>
                            <span className="font-medium">{application.venue}</span>
                          </div>
                        )}
                        {application.time && (
                          <div className="flex justify-between">
                            <span className="text-gray-500">Time:</span>
                            <span className="font-medium">{application.time}</span>
                          </div>
                        )}
                        {application.status === "Approved" && (
                          <div className="flex justify-between">
                            <span className="text-gray-500">Invigilator:</span>
                            <span className="font-medium">Dr. J. Kamau</span>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {application.status === "Approved" && (
                    <AccordionItem value="results">
                      <AccordionTrigger className="text-sm">Results</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Previous Grade:</span>
                            <span className="font-medium">E (30%)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">New Grade:</span>
                            <span className="font-medium text-green-600">C (65%)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Max Possible Grade:</span>
                            <span className="font-medium">C</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Date Released:</span>
                            <span className="font-medium">20/01/2024</span>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )}
                </Accordion>
              </div>
            </CollapsibleContent>
          </CardContent>
          <CardFooter className="flex justify-between pt-2">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" onClick={() => toggleExpand(application.id)}>
                {isExpanded ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-1" />
                    Hide Details
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-1" />
                    Show Details
                  </>
                )}
              </Button>
            </CollapsibleTrigger>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => onViewApplication(application)}>
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
              <Button size="sm" variant="outline" onClick={() => onPrintApplication(application)}>
                <Printer className="h-4 w-4 mr-1" />
                Print
              </Button>
            </div>
          </CardFooter>
        </Collapsible>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <CardTitle>Application History</CardTitle>
          <CardDescription>View a history of all your special examination applications</CardDescription>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onExportHistory}>
            <FileDown className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm" onClick={onViewStatistics}>
            <BarChart className="h-4 w-4 mr-2" />
            Statistics
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by ID, course or type..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="w-40">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-40">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="supplementary">Supplementary</SelectItem>
                  <SelectItem value="deferred">Deferred</SelectItem>
                  <SelectItem value="special sitting">Special Sitting</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-40">
              <Select value={semesterFilter} onValueChange={setSemesterFilter}>
                <SelectTrigger>
                  <CalendarRange className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Semesters</SelectItem>
                  {academicYears.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {filteredApplications.length > 0 ? (
          <>
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Application ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Date Submitted</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Exam Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell className="font-medium">{app.id}</TableCell>
                      <TableCell>{getRequestTypeBadge(app.type)}</TableCell>
                      <TableCell>{app.course}</TableCell>
                      <TableCell>{app.date}</TableCell>
                      <TableCell>{getRequestStatusBadge(app.status)}</TableCell>
                      <TableCell>{getRequestStatusBadge(app.paymentStatus)}</TableCell>
                      <TableCell>{app.examDate}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => onViewApplication(app)}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                          {app.paymentStatus === "Paid" && (
                            <Button variant="outline" size="sm" onClick={() => onDownloadReceipt(app)}>
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Receipt</span>
                            </Button>
                          )}
                          <Button variant="outline" size="sm" onClick={() => onPrintApplication(app)}>
                            <Printer className="h-4 w-4" />
                            <span className="sr-only">Print</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="md:hidden space-y-4">{filteredApplications.map((app) => renderApplicationCard(app))}</div>
          </>
        ) : (
          <EmptyState
            icon={<FileText className="h-12 w-12 text-muted-foreground mb-2 mx-auto" />}
            title="No Applications Found"
            description="No applications match your current filters. Try adjusting your search criteria."
            actionLabel="Clear Filters"
            onAction={() => {
              setSearchQuery("")
              setStatusFilter("all")
              setTypeFilter("all")
              setSemesterFilter("all")
            }}
          />
        )}
      </CardContent>
    </Card>
  )
}
