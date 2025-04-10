"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Printer, Share2, Shield, Stamp, CheckCircle2, Clock, AlertCircle } from "lucide-react"
import type { AcademicRecord, TranscriptRequest } from "./types"
import { calculateWeightedPoints, formatDate, formatRequestStatus, getHonorsStatus } from "./utils"
import { mockAcademicRecord, mockTranscriptRequests } from "./mock-data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { TranscriptRequestForm } from "./transcript-request-form"

interface TranscriptViewProps {
  academicRecord?: AcademicRecord
  transcriptRequests?: TranscriptRequest[]
  onRequestTranscript?: (data: any) => void
}



export function TranscriptView({
  academicRecord = mockAcademicRecord,
  transcriptRequests = mockTranscriptRequests,
  onRequestTranscript,
}: TranscriptViewProps) {
  const [activeTab, setActiveTab] = useState("official")
  const [showRequestForm, setShowRequestForm] = useState(false)

  const handleRequestSubmit = (data: any) => {
    if (onRequestTranscript) {
      onRequestTranscript(data)
    }
    setShowRequestForm(false)
  }

  const handleRequestCancel = () => {
    setShowRequestForm(false)
  }

  const pendingRequests = transcriptRequests.filter((req) => ["pending", "processing"].includes(req.status))

  const completedRequests = transcriptRequests.filter((req) => ["ready", "collected"].includes(req.status))

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock size={16} className="text-yellow-500" />
      case "processing":
        return <Clock size={16} className="text-blue-500" />
      case "ready":
        return <CheckCircle2 size={16} className="text-green-500" />
      case "collected":
        return <CheckCircle2 size={16} className="text-purple-500" />
      case "rejected":
        return <AlertCircle size={16} className="text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Academic Transcript</h1>
          <p className="text-muted-foreground">View and request official academic transcripts</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {!showRequestForm && (
            <Button onClick={() => setShowRequestForm(true)} className="gap-2">
              <FileText size={16} />
              Request Transcript
            </Button>
          )}
        </div>
      </div>

      {showRequestForm ? (
        <TranscriptRequestForm onSubmit={handleRequestSubmit} onCancel={handleRequestCancel} />
      ) : (
        <>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 md:w-[400px]">
              <TabsTrigger value="official">Official Transcript</TabsTrigger>
              <TabsTrigger value="requests">Transcript Requests</TabsTrigger>
            </TabsList>

            <TabsContent value="official" className="mt-4">
              <Card className="border-2">
                <CardHeader className="pb-2 border-b">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Shield size={20} className="text-primary" />
                      <CardTitle>Unofficial Transcript Preview</CardTitle>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      For Reference Only
                    </Badge>
                  </div>
                  <CardDescription>
                    This is an unofficial preview. Official transcripts must be requested.
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-bold uppercase">University of Nairobi</h2>
                    <p className="text-sm font-medium">Office of the Registrar (Academic)</p>
                    <p className="text-sm mt-1">P.O. Box 30197, Nairobi, Kenya</p>
                    <div className="mt-4">
                      <h3 className="text-lg font-bold">ACADEMIC TRANSCRIPT</h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-2">
                        <div className="font-medium">Student Name:</div>
                        <div>{academicRecord.studentName}</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="font-medium">Registration No:</div>
                        <div>{academicRecord.admissionNumber}</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="font-medium">Program:</div>
                        <div>{academicRecord.program}</div>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-2">
                        <div className="font-medium">Faculty:</div>
                        <div>{academicRecord.faculty}</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="font-medium">Department:</div>
                        <div>{academicRecord.department}</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="font-medium">Date of Admission:</div>
                        <div>{formatDate(academicRecord.admissionDate)}</div>
                      </div>
                    </div>
                  </div>

                  {academicRecord.semesters
                    .filter((semester) => semester.status === "completed")
                    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
                    .map((semester, index) => (
                      <div key={semester.id} className="mb-6">
                        <div className="bg-muted p-2 font-medium mb-2">
                          {semester.name} - {semester.academicYear}
                        </div>

                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Course Code</TableHead>
                              <TableHead>Course Title</TableHead>
                              <TableHead className="text-center">Credit Hours</TableHead>
                              <TableHead className="text-center">Grade</TableHead>
                              <TableHead className="text-center">Grade Points</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {semester.courses.map((course) => (
                              <TableRow key={course.id}>
                                <TableCell className="font-medium">{course.code}</TableCell>
                                <TableCell>{course.title}</TableCell>
                                <TableCell className="text-center">{course.credits}</TableCell>
                                <TableCell className="text-center font-medium">{course.grade}</TableCell>
                                <TableCell className="text-center">
                                  {course.grade !== null ? calculateWeightedPoints(course.credits, course?.grade || "") : "-"}
                                </TableCell>
                              </TableRow>
                            ))}
                            <TableRow className="bg-muted/50">
                              <TableCell colSpan={2} className="font-medium">
                                Semester GPA
                              </TableCell>
                              <TableCell className="text-center font-medium">{500}</TableCell>
                              <TableCell className="text-center"></TableCell>
                              <TableCell className="text-center font-medium">{semester.gpa.toFixed(2)}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    ))}

                  <div className="border-t pt-4 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <div className="text-sm font-medium">Cumulative GPA</div>
                        <div className="text-2xl font-bold">{academicRecord.cgpa.toFixed(2)}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">Total Credit Hours</div>
                        <div className="text-2xl font-bold">{academicRecord.totalCreditHours}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">Academic Standing</div>
                        <div className="text-xl font-medium">{getHonorsStatus(academicRecord.cgpa)}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
                    <p>This is an unofficial transcript for reference only.</p>
                    <p>Official transcripts must be requested from the Office of the Registrar.</p>
                  </div>
                </CardContent>

                <CardFooter className="border-t pt-4 flex justify-between">
                  <Button variant="outline" className="gap-2">
                    <Printer size={16} />
                    Print Preview
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                      <Download size={16} />
                      Download PDF
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Share2 size={16} />
                      Share
                    </Button>
                  </div>
                </CardFooter>
              </Card>

              <Alert className="mt-4">
                <Stamp className="h-4 w-4" />
                <AlertTitle>Official Transcripts</AlertTitle>
                <AlertDescription>
                  Official transcripts include security features and are signed and stamped by the Registrar. They are
                  required for job applications, graduate school, and other official purposes.
                </AlertDescription>
              </Alert>
            </TabsContent>

            <TabsContent value="requests" className="mt-4">
              <div className="space-y-6">
                {pendingRequests.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Pending Requests</CardTitle>
                      <CardDescription>Transcript requests that are being processed</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {pendingRequests.map((request) => {
                          const status = formatRequestStatus(request.status)

                          return (
                            <div key={request.id} className="border rounded-lg p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-medium">
                                      {request.type === "official" ? "Official" : "Unofficial"} Transcript
                                    </h4>
                                    <Badge className={status.color}>{status.label}</Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Requested on {formatDate(request.requestDate)}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <div className="text-sm font-medium">
                                    {request.copies} {request.copies === 1 ? "copy" : "copies"}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    KES {request.fee?.toLocaleString()}
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
                                <div>
                                  <div className="text-muted-foreground">Purpose</div>
                                  <div>{request.purpose}</div>
                                </div>
                                {request.destination && (
                                  <div>
                                    <div className="text-muted-foreground">Destination</div>
                                    <div>{request.destination}</div>
                                  </div>
                                )}
                                <div>
                                  <div className="text-muted-foreground">Collection Method</div>
                                  <div className="capitalize">
                                    {request.collectionMethod}
                                    {request.collectionMethod === "delivery" && request.deliveryAddress && (
                                      <span className="block text-xs text-muted-foreground mt-1">
                                        {request.deliveryAddress}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-muted-foreground">Payment Status</div>
                                  <div className="capitalize">
                                    {request.paymentStatus}
                                    {request.paymentReference && (
                                      <span className="block text-xs text-muted-foreground mt-1">
                                        Ref: {request.paymentReference}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {request.estimatedReadyDate && (
                                <div className="mt-4 pt-4 border-t text-sm">
                                  <div className="text-muted-foreground">Estimated Ready Date</div>
                                  <div className="font-medium">{formatDate(request.estimatedReadyDate)}</div>
                                </div>
                              )}

                              <div className="mt-4 flex justify-end gap-2">
                                <Button variant="outline" size="sm">
                                  Track Status
                                </Button>
                                {request.paymentStatus === "unpaid" && <Button size="sm">Pay Now</Button>}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {completedRequests.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Completed Requests</CardTitle>
                      <CardDescription>Transcript requests that are ready or have been collected</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {completedRequests.map((request) => {
                          const status = formatRequestStatus(request.status)

                          return (
                            <div key={request.id} className="border rounded-lg p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-medium">
                                      {request.type === "official" ? "Official" : "Unofficial"} Transcript
                                    </h4>
                                    <Badge className={status.color}>{status.label}</Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Requested on {formatDate(request.requestDate)}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <div className="text-sm font-medium">
                                    {request.copies} {request.copies === 1 ? "copy" : "copies"}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    KES {request.fee.toLocaleString()}
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
                                <div>
                                  <div className="text-muted-foreground">Purpose</div>
                                  <div>{request.purpose}</div>
                                </div>
                                {request.destination && (
                                  <div>
                                    <div className="text-muted-foreground">Destination</div>
                                    <div>{request.destination}</div>
                                  </div>
                                )}
                                <div>
                                  <div className="text-muted-foreground">Ready Date</div>
                                  <div>{request?.actualReadyDate && formatDate(request.actualReadyDate)}</div>
                                </div>
                                {request.collectionDate && (
                                  <div>
                                    <div className="text-muted-foreground">Collection Date</div>
                                    <div>{formatDate(request.collectionDate)}</div>
                                  </div>
                                )}
                              </div>

                              <div className="mt-4 flex justify-end gap-2">
                                {request.status === "ready" && <Button size="sm">Collect Now</Button>}
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {transcriptRequests.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <FileText size={48} className="text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No Transcript Requests</h3>
                    <p className="text-muted-foreground max-w-md mt-2">
                      You haven't made any transcript requests yet. Click the "Request Transcript" button to get
                      started.
                    </p>
                    <Button onClick={() => setShowRequestForm(true)} className="mt-4">
                      Request Transcript
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}
