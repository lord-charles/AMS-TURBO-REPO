import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  BadgeDollarSign,
  Calculator,
  Calendar,
  Clock,
  Download,
  FileText,
  GraduationCap,
  Info,
  LayoutList,
  Percent,
  Receipt,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "My Fees - Student Portal",
  description: "View your fee obligations and payment plans",
}

export default function MyFeesPage() {
  return (
    <div className="p-2">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">My Fees</h1>
          <p className="text-muted-foreground">View your fee obligations based on your academic program</p>
        </div>

        <Tabs defaultValue="breakdown" className="w-full">
          <TabsList className="w-full grid grid-cols-3 h-auto p-1">
            <TabsTrigger
              value="breakdown"
              className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <LayoutList className="h-4 w-4" />
              <span>Fee Breakdown</span>
            </TabsTrigger>
            <TabsTrigger
              value="payment-plan"
              className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Calendar className="h-4 w-4" />
              <span>Payment Plan</span>
            </TabsTrigger>
            <TabsTrigger
              value="scholarships"
              className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <GraduationCap className="h-4 w-4" />
              <span>Scholarships</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="breakdown" className="space-y-4">
            <Card className="border-none shadow-md">
              <CardHeader className="pb-0">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Fee Breakdown for 2023/2024</CardTitle>
                    <CardDescription>Bachelor of Science in Computer Science - Year 3</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    <Calculator className="mr-1 h-3 w-3" />
                    Total: KSh 120,000
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>Itemized tuition and functional fees per semester</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Fee Item</TableHead>
                      <TableHead>Semester 1 (KSh)</TableHead>
                      <TableHead>Semester 2 (KSh)</TableHead>
                      <TableHead className="text-right">Total (KSh)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Tuition Fee</TableCell>
                      <TableCell>35,000</TableCell>
                      <TableCell>35,000</TableCell>
                      <TableCell className="text-right">70,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-1">
                          Library Fee
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-4 w-4 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Covers access to library resources and online journals</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                      <TableCell>5,000</TableCell>
                      <TableCell>5,000</TableCell>
                      <TableCell className="text-right">10,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-1">
                          ICT Fee
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-4 w-4 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Covers internet access and computer lab usage</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                      <TableCell>7,500</TableCell>
                      <TableCell>7,500</TableCell>
                      <TableCell className="text-right">15,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-1">
                          Examination Fee
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-4 w-4 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Covers setting, invigilation, and marking of exams</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                      <TableCell>5,000</TableCell>
                      <TableCell>5,000</TableCell>
                      <TableCell className="text-right">10,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-1">
                          Student Activity Fee
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-4 w-4 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Supports student clubs, sports, and campus events</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                      <TableCell>2,500</TableCell>
                      <TableCell>2,500</TableCell>
                      <TableCell className="text-right">5,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-1">
                          Medical Insurance
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-4 w-4 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Covers basic healthcare at university clinic</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                      <TableCell>5,000</TableCell>
                      <TableCell>5,000</TableCell>
                      <TableCell className="text-right">10,000</TableCell>
                    </TableRow>
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={3}>Total</TableCell>
                      <TableCell className="text-right">120,000</TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
                <Button asChild className="gap-2">
                  <Link href="/finance/payments">
                    Make Payment
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="payment-plan" className="space-y-4">
            <Card className="border-none shadow-md">
              <CardHeader className="pb-0">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Payment Plan for 2023/2024</CardTitle>
                    <CardDescription>Installment schedules, due dates, and penalties</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                    <Clock className="mr-1 h-3 w-3" />
                    Next Due: April 30
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>Payment schedule for the current academic year</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Installment</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Amount (KSh)</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Penalty if Late</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Registration Fee</TableCell>
                      <TableCell>September 1, 2023</TableCell>
                      <TableCell>20,000</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Paid
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">N/A</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">First Installment</TableCell>
                      <TableCell>October 15, 2023</TableCell>
                      <TableCell>30,000</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Paid
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">KSh 3,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Second Installment</TableCell>
                      <TableCell>January 15, 2024</TableCell>
                      <TableCell>30,000</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Paid
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">KSh 3,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Third Installment</TableCell>
                      <TableCell>April 30, 2024</TableCell>
                      <TableCell>20,000</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          Pending
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">KSh 2,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Final Installment</TableCell>
                      <TableCell>June 15, 2024</TableCell>
                      <TableCell>20,000</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          Pending
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">KSh 2,000</TableCell>
                    </TableRow>
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={2}>Total</TableCell>
                      <TableCell>120,000</TableCell>
                      <TableCell colSpan={2}></TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </CardContent>
              <CardFooter>
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium flex items-center gap-1">
                    <Info className="h-4 w-4" />
                    Late Payment Policy:
                  </p>
                  <ul className="list-disc pl-5 mt-2">
                    <li>Late payments incur penalties as shown above</li>
                    <li>Students with outstanding balances may be barred from exams</li>
                    <li>Payment extensions must be requested at least 14 days before due date</li>
                  </ul>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="scholarships" className="space-y-4">
            <Card className="border-none shadow-md">
              <CardHeader className="pb-0">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Scholarships & Discounts</CardTitle>
                    <CardDescription>HELB, institutional scholarships, and bursaries</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                    <BadgeDollarSign className="mr-1 h-3 w-3" />
                    Total: KSh 65,000
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="rounded-lg border bg-card p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        <Receipt className="h-5 w-5 text-blue-600" />
                        HELB Loan
                      </h3>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Approved
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Amount</p>
                        <p className="font-medium">KSh 45,000</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Disbursement Date</p>
                        <p className="font-medium">February 28, 2024</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Reference Number</p>
                        <p className="font-medium">HELB/2023/78945</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <p className="font-medium text-green-600">Disbursed</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border bg-card p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        <FileText className="h-5 w-5 text-amber-600" />
                        County Bursary
                      </h3>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        Pending
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Amount Applied For</p>
                        <p className="font-medium">KSh 20,000</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Application Date</p>
                        <p className="font-medium">January 15, 2024</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Reference Number</p>
                        <p className="font-medium">CB/NAI/2024/1234</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <p className="font-medium text-amber-600">Under Review</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border bg-card p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        <Percent className="h-5 w-5 text-green-600" />
                        Early Payment Discount
                      </h3>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Applied
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Discount Amount</p>
                        <p className="font-medium">KSh 5,000</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Applied On</p>
                        <p className="font-medium">September 5, 2023</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Eligibility</p>
                        <p className="font-medium">Full semester payment before deadline</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <p className="font-medium text-green-600">Credited to Account</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="gap-2">
                  <Link href="/finance/support">
                    <FileText className="h-4 w-4" />
                    Upload Scholarship Documents
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
