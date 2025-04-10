"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  FileText,
  Search,
  Filter,
  Calendar,
  AlertCircle,
  Printer,
  Eye,
  CreditCard,
  XCircle,
  RefreshCw,
  Clock,
  CheckCircle,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { EmptyState } from "./empty-state"
import { previousApplications, academicCalendarEvents } from "./mock-data"
import { getRequestStatusBadge, getRequestTypeBadge, formatDate } from "./utils"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import type { PreviousApplication } from "./types"

interface ApplicationStatusTabProps {
  onViewApplication: (application: any) => void
  onPayNow: (application: any) => void
  onCancelApplication: (application: any) => void
  onPrintApplication: (application: any) => void
  onTrackApplication: (application: any) => void
  onAppealDecision: (application: any) => void
}

export function ApplicationStatusTab({
  onViewApplication,
  onPayNow,
  onCancelApplication,
  onPrintApplication,
  onTrackApplication,
  onAppealDecision,
}: ApplicationStatusTabProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [expandedApplication, setExpandedApplication] = useState<string | null>(null)

  const filteredApplications = previousApplications.filter((app) => {
    const matchesSearch =
      app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.type.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || app.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesType = typeFilter === "all" || app.type.toLowerCase() === typeFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesType
  })

  const pendingApplications = filteredApplications.filter(
    (app) => app.status === "Pending" || app.status === "Under Review" || app.paymentStatus === "Not Paid",
  )

  const approvedApplications = filteredApplications.filter(
    (app) => app.status === "Approved" || app.status === "Scheduled",
  )

  const toggleExpand = (id: string) => {
    if (expandedApplication === id) {
      setExpandedApplication(null)
    } else {
      setExpandedApplication(id)
    }
  }

  const renderApplicationSteps = (application: PreviousApplication) => {
    if (!application.applicationSteps) return null

    return (
      <div className="mt-4 space-y-3">
        <h4 className="text-sm font-medium">Application Progress</h4>
        <div className="relative">
          {application.applicationSteps.map((step, index) => (
            <div key={step.id} className="flex items-start mb-4">
              <div className="flex flex-col items-center mr-4">
                <div
                  className={`rounded-full h-8 w-8 flex items-center justify-center ${
                    step.status === "completed"
                      ? "bg-green-100 text-green-600"
                      : step.status === "current"
                        ? "bg-blue-100 text-blue-600 animate-pulse"
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
                {index < (application?.applicationSteps?.length ?? 0) - 1 && <div className="h-10 w-0.5 bg-gray-200 my-1"></div>}
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
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderActionButtons = (application: PreviousApplication) => {
    return (
      <div className="flex flex-wrap gap-2 mt-4">
        <Button size="sm" variant="outline" onClick={() => onViewApplication(application)}>
          <Eye className="h-4 w-4 mr-1" />
          View
        </Button>

        {application.paymentStatus === "Not Paid" && (
          <Button size="sm" variant="default" onClick={() => onPayNow(application)}>
            <CreditCard className="h-4 w-4 mr-1" />
            Pay Now
          </Button>
        )}

        {(application.status === "Pending" || application.status === "Under Review") && (
          <Button
            size="sm"
            variant="outline"
            className="text-red-500 border-red-200 hover:bg-red-50"
            onClick={() => onCancelApplication(application)}
          >
            <XCircle className="h-4 w-4 mr-1" />
            Cancel
          </Button>
        )}

        {application.status === "Rejected" && (
          <Button size="sm" variant="outline" onClick={() => onAppealDecision(application)}>
            <RefreshCw className="h-4 w-4 mr-1" />
            Appeal
          </Button>
        )}

        <Button size="sm" variant="outline" onClick={() => onPrintApplication(application)}>
          <Printer className="h-4 w-4 mr-1" />
          Print
        </Button>
      </div>
    )
  }

  const renderApplicationCard = (application: PreviousApplication) => {
    const isExpanded = expandedApplication === application.id

    return (
      <Card key={application.id} className="mb-4">
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

          <Collapsible open={isExpanded}>
            <CollapsibleContent>{renderApplicationSteps(application)}</CollapsibleContent>
          </Collapsible>
        </CardContent>
        <CardFooter className="flex justify-between pt-2">
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
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => onViewApplication(application)}>
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            {application.paymentStatus === "Not Paid" && (
              <Button size="sm" variant="default" onClick={() => onPayNow(application)}>
                <CreditCard className="h-4 w-4 mr-1" />
                Pay
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    )
  }

  const upcomingEvent = academicCalendarEvents.find(
    (event) => event.type === "special-exam" && new Date(event.startDate) > new Date(),
  )

  return (
    <div className="space-y-6">
      {upcomingEvent && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Upcoming Special Exams</AlertTitle>
          <AlertDescription>
            {upcomingEvent.title} scheduled from {formatDate(upcomingEvent.startDate)} to{" "}
            {formatDate(upcomingEvent.endDate)}.{upcomingEvent.description && ` ${upcomingEvent.description}`}
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Application Status</CardTitle>
          <CardDescription>Track the status of your special examination applications</CardDescription>
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
            <div className="flex gap-2">
              <div className="w-40">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
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
            </div>
          </div>

          {filteredApplications.length > 0 ? (
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Applications</TabsTrigger>
                <TabsTrigger value="pending">
                  Pending
                  {pendingApplications.length > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {pendingApplications.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="approved">
                  Approved
                  {approvedApplications.length > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {approvedApplications.length}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-0">
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
                              {app.paymentStatus === "Not Paid" && (
                                <Button variant="default" size="sm" onClick={() => onPayNow(app)}>
                                  <CreditCard className="h-4 w-4" />
                                  <span className="sr-only">Pay</span>
                                </Button>
                              )}
                              <Button variant="outline" size="sm" onClick={() => onTrackApplication(app)}>
                                <ChevronRight className="h-4 w-4" />
                                <span className="sr-only">Track</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="md:hidden space-y-4">
                  {filteredApplications.map((app) => renderApplicationCard(app))}
                </div>
              </TabsContent>

              <TabsContent value="pending" className="mt-0">
                {pendingApplications.length > 0 ? (
                  <div className="md:hidden space-y-4">
                    {pendingApplications.map((app) => renderApplicationCard(app))}
                  </div>
                ) : (
                  <EmptyState
                    icon={<FileText className="h-12 w-12 text-muted-foreground mb-2 mx-auto" />}
                    title="No Pending Applications"
                    description="You don't have any pending applications at the moment."
                  />
                )}
              </TabsContent>

              <TabsContent value="approved" className="mt-0">
                {approvedApplications.length > 0 ? (
                  <div className="md:hidden space-y-4">
                    {approvedApplications.map((app) => renderApplicationCard(app))}
                  </div>
                ) : (
                  <EmptyState
                    icon={<FileText className="h-12 w-12 text-muted-foreground mb-2 mx-auto" />}
                    title="No Approved Applications"
                    description="You don't have any approved applications at the moment."
                  />
                )}
              </TabsContent>
            </Tabs>
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
              }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
