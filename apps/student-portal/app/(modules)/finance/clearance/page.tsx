import type { Metadata } from "next"
import Link from "next/link"
import {
  AlertCircle,
  ArrowRight,
  BadgeCheck,
  Calendar,
  Check,
  Clock,
  Download,
  FileCheck,
  FileText,
  Info,
  LayoutList,
  Shield,
  Stamp,
  X,
} from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export const metadata: Metadata = {
  title: "Financial Clearance - Student Portal",
  description: "Check your financial clearance status",
}

export default function ClearancePage() {
  return (
    <div className="p-2">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Financial Clearance</h1>
          <p className="text-muted-foreground">Check your clearance status for academic events</p>
        </div>

        <Tabs defaultValue="status" className="w-full">
          <TabsList className="w-full grid grid-cols-3 h-auto p-1 ">
            <TabsTrigger
              value="status"
              className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Shield className="h-4 w-4" />
              <span>Clearance Status</span>
            </TabsTrigger>
            <TabsTrigger
              value="certificate"
              className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Stamp className="h-4 w-4" />
              <span>Clearance Certificate</span>
            </TabsTrigger>
            <TabsTrigger
              value="conditions"
              className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <LayoutList className="h-4 w-4" />
              <span>Outstanding Conditions</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="status" className="space-y-4">
            <Card className="border-none shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Current Clearance Status</CardTitle>
                    <CardDescription>Your financial clearance status for academic events</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    <Clock className="mr-1 h-3 w-3" />
                    Updated: April 10, 2024
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border overflow-hidden">
                    <div className="h-1.5 bg-green-500 w-full"></div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex items-center justify-between">
                        <span>Exam Clearance</span>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <Check className="mr-1 h-3 w-3" />
                          Cleared
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Valid for April 2024 exams</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BadgeCheck className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Minimum fee requirement met</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileCheck className="h-4 w-4 text-green-600" />
                        <span className="text-sm">No outstanding library fines</span>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" className="mt-2 w-full text-xs gap-1">
                              <Info className="h-3 w-3" />
                              View Details
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="w-80">
                            <div className="space-y-2">
                              <p className="font-medium">Exam Clearance Details</p>
                              <p className="text-xs">
                                You have paid 66% of your total fees (KSh 80,000), which exceeds the minimum 60%
                                requirement for exam clearance.
                              </p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardContent>
                  </Card>

                  <Card className="border overflow-hidden">
                    <div className="h-1.5 bg-green-500 w-full"></div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex items-center justify-between">
                        <span>Transcript Clearance</span>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <Check className="mr-1 h-3 w-3" />
                          Cleared
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">No financial holds on transcripts</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BadgeCheck className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Minimum fee requirement met</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileCheck className="h-4 w-4 text-green-600" />
                        <span className="text-sm">All administrative fees paid</span>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" className="mt-2 w-full text-xs gap-1">
                              <Info className="h-3 w-3" />
                              View Details
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="w-80">
                            <div className="space-y-2">
                              <p className="font-medium">Transcript Clearance Details</p>
                              <p className="text-xs">
                                You have met all requirements for transcript clearance. You can request official
                                transcripts at any time.
                              </p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardContent>
                  </Card>

                  <Card className="border overflow-hidden">
                    <div className="h-1.5 bg-red-500 w-full"></div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex items-center justify-between">
                        <span>Graduation Clearance</span>
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          <X className="mr-1 h-3 w-3" />
                          Not Cleared
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <span className="text-sm">KSh 40,000 balance remaining</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <X className="h-4 w-4 text-red-600" />
                        <span className="text-sm">100% fee payment required</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-amber-600" />
                        <span className="text-sm">Deadline: June 30, 2024</span>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" className="mt-2 w-full text-xs gap-1">
                              <Info className="h-3 w-3" />
                              View Details
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="w-80">
                            <div className="space-y-2">
                              <p className="font-medium">Graduation Clearance Details</p>
                              <p className="text-xs">
                                You need to clear your remaining balance of KSh 40,000 to be eligible for graduation.
                                The deadline for full payment is June 30, 2024.
                              </p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Overall Clearance Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Fee Payment Progress</span>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            KSh 80,000 / KSh 120,000
                          </Badge>
                        </div>
                        <div className="font-medium">66%</div>
                      </div>
                      <Progress value={66} className="h-2" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                      <div className="flex flex-col gap-1">
                        <div className="text-xs text-muted-foreground">Exam Clearance Threshold</div>
                        <div className="flex items-center gap-2">
                          <Progress value={60} className="h-1.5" />
                          <span className="text-xs font-medium">60%</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="text-xs text-muted-foreground">Current Payment</div>
                        <div className="flex items-center gap-2">
                          <Progress value={66} className="h-1.5" />
                          <span className="text-xs font-medium">66%</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="text-xs text-muted-foreground">Graduation Threshold</div>
                        <div className="flex items-center gap-2">
                          <Progress value={100} className="h-1.5" />
                          <span className="text-xs font-medium">100%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Clearance Information</AlertTitle>
                  <AlertDescription>
                    <p>Your current payment of KSh 80,000 qualifies you for exam clearance but not for graduation.</p>
                    <p className="mt-2">
                      To be fully cleared for all academic activities, please clear your remaining balance of KSh
                      40,000.
                    </p>
                  </AlertDescription>
                </Alert>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-3">
                <Button asChild variant="outline" className="w-full sm:w-auto gap-2">
                  <Link href="/finance/my-fees">
                    <FileText className="h-4 w-4" />
                    View Fee Breakdown
                  </Link>
                </Button>
                <Button asChild className="w-full sm:w-auto gap-2">
                  <Link href="/finance/payments">
                    Make Payment to Clear Balance
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="certificate" className="space-y-4">
            <Card className="border-none shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Clearance Certificate</CardTitle>
                    <CardDescription>Generate and download your clearance certificate</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    <Calendar className="mr-1 h-3 w-3" />
                    Valid until: May 31, 2024
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border bg-card">
                    <CardHeader className="pb-2 border-b">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium">Exam Clearance Certificate</CardTitle>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <Check className="mr-1 h-3 w-3" />
                          Available
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="border rounded-lg p-6 space-y-6 ">
                        <div className="flex flex-col items-center text-center space-y-2">
                          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                            <Stamp className="h-8 w-8 text-primary" />
                          </div>
                          <h3 className="font-bold text-lg">Exam Clearance Certificate</h3>
                          <p className="text-muted-foreground">Valid for April 2024 Examinations</p>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <div className="grid grid-cols-1 gap-2">
                            <div>
                              <span className="text-muted-foreground">Student Name:</span> Sophia Anderson
                            </div>
                            <div>
                              <span className="text-muted-foreground">Student ID:</span> UON/BSC/123/2021
                            </div>
                            <div>
                              <span className="text-muted-foreground">Program:</span> Bachelor of Science in Computer
                              Science
                            </div>
                            <div>
                              <span className="text-muted-foreground">Year of Study:</span> 3
                            </div>
                          </div>

                          <div className="text-center space-y-2">
                            <p>
                              This is to certify that the above-named student has been cleared to sit for the April 2024
                              examinations.
                            </p>
                            <p className="font-medium">Certificate ID: CLR-2024-12345</p>
                            <p className="text-sm text-muted-foreground">Date Issued: April 10, 2024</p>
                          </div>

                          <div className="flex justify-center">
                            <div className="border border-dashed border-muted-foreground rounded-md p-4 text-center">
                              <p className="text-sm text-muted-foreground">Finance Officer Signature</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <Button className="w-full gap-2">
                        <Download className="h-4 w-4" />
                        Download Exam Clearance
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="border bg-card">
                    <CardHeader className="pb-2 border-b">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium">Graduation Clearance Certificate</CardTitle>
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          <X className="mr-1 h-3 w-3" />
                          Not Available
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="flex flex-col items-center justify-center h-full py-8 px-4 text-center space-y-4">
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100">
                          <AlertCircle className="h-8 w-8 text-red-600" />
                        </div>
                        <h3 className="font-bold text-lg">Certificate Not Available</h3>
                        <p className="text-muted-foreground max-w-md">
                          You have an outstanding balance of KSh 40,000. Please clear this balance to generate a
                          graduation clearance certificate.
                        </p>

                        <div className="w-full max-w-md space-y-2 mt-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <div className="font-medium">Payment Progress</div>
                              <div className="font-medium">66%</div>
                            </div>
                            <Progress value={66} className="h-2" />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            100% payment required for graduation clearance
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <Button asChild className="w-full gap-2">
                        <Link href="/finance/payments">
                          <ArrowRight className="h-4 w-4" />
                          Make Payment to Clear Balance
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                <Alert variant="destructive" className="bg-yellow-50 text-yellow-800 border-yellow-300">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Important Information</AlertTitle>
                  <AlertDescription>
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                      <li>Clearance certificates are valid for the specified academic period only.</li>
                      <li>
                        The certificate must be presented when requested by examination officers or academic
                        administrators.
                      </li>
                      <li>
                        For any issues with your clearance certificate, please contact the finance office immediately.
                      </li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="conditions" className="space-y-4">
            <Card className="border-none shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Outstanding Conditions</CardTitle>
                    <CardDescription>See exactly what fees or steps are blocking clearance</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    <Clock className="mr-1 h-3 w-3" />
                    Updated: April 10, 2024
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader className="bg-muted/30">
                      <TableRow>
                        <TableHead>Condition</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Required For</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Amount (KSh)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Minimum Fee Payment</TableCell>
                        <TableCell>At least 60% of total fees must be paid</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            Exam Clearance
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <Check className="mr-1 h-3 w-3" />
                            Satisfied
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">72,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Library Fines</TableCell>
                        <TableCell>All library fines must be cleared</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            Exam Clearance
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <Check className="mr-1 h-3 w-3" />
                            Satisfied
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">0</TableCell>
                      </TableRow>
                      <TableRow className="bg-red-50/30">
                        <TableCell className="font-medium">Full Fee Payment</TableCell>
                        <TableCell>100% of total fees must be paid</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                            Graduation Clearance
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                            <X className="mr-1 h-3 w-3" />
                            Not Satisfied
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium text-red-600">40,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Hostel Clearance</TableCell>
                        <TableCell>All hostel fees must be paid</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                            Graduation Clearance
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <Check className="mr-1 h-3 w-3" />
                            Satisfied
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">0</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Clearance Requirements by Academic Event</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border overflow-hidden">
                      <div className="h-1.5 bg-green-500 w-full"></div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center justify-between">
                          <span>Exam Clearance</span>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <Check className="mr-1 h-3 w-3" />
                            All Conditions Met
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                            <span className="text-sm">Minimum 60% of total fees paid</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                            <span className="text-sm">No outstanding library fines</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                            <span className="text-sm">Registration completed for the semester</span>
                          </li>
                        </ul>
                        <div className="mt-4 pt-4 border-t">
                          <div className="flex items-center justify-between text-sm">
                            <div className="font-medium">Progress</div>
                            <div className="font-medium">100%</div>
                          </div>
                          <Progress value={100} className="h-2 mt-2" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border overflow-hidden">
                      <div className="h-1.5 bg-red-500 w-full"></div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center justify-between">
                          <span>Graduation Clearance</span>
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                            <X className="mr-1 h-3 w-3" />
                            Conditions Pending
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <X className="h-4 w-4 text-red-600 flex-shrink-0" />
                            <span className="text-sm">100% of total fees paid</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                            <span className="text-sm">No outstanding library fines</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                            <span className="text-sm">Hostel clearance (if applicable)</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-amber-600 flex-shrink-0" />
                            <span className="text-sm">All academic requirements met</span>
                          </li>
                        </ul>
                        <div className="mt-4 pt-4 border-t">
                          <div className="flex items-center justify-between text-sm">
                            <div className="font-medium">Progress</div>
                            <div className="font-medium">66%</div>
                          </div>
                          <Progress value={66} className="h-2 mt-2" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Alert className="bg-amber-50 border-amber-200 text-amber-800">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <AlertTitle>Action Required</AlertTitle>
                  <AlertDescription>
                    <p>
                      To achieve full graduation clearance, you need to clear your outstanding balance of KSh 40,000
                      before June 30, 2024.
                    </p>
                    <p className="mt-2">
                      Failure to clear this balance may result in ineligibility for graduation in the upcoming ceremony.
                    </p>
                  </AlertDescription>
                </Alert>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-3">
                <Button asChild variant="outline" className="w-full sm:w-auto gap-2">
                  <Link href="/finance/my-fees">
                    <FileText className="h-4 w-4" />
                    View Fee Breakdown
                  </Link>
                </Button>
                <Button asChild className="w-full sm:w-auto gap-2">
                  <Link href="/finance/payments">
                    Make Payment to Clear Conditions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
