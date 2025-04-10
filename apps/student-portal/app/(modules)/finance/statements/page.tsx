import type { Metadata } from "next"
import Link from "next/link"
import { BadgeDollarSign, Download, FileText, HandCoins, Receipt, School } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Financial Statements - Student Portal",
  description: "Access your financial statements and documents",
}

export default function StatementsPage() {
  return (
    <div className="p-2">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Financial Statements</h1>
          <p className="text-muted-foreground">Access and download your financial documents</p>
        </div>

        <Tabs defaultValue="fee-statement" className="w-full">
          <TabsList className="w-full grid grid-cols-3 h-auto p-1">
            <TabsTrigger
              value="fee-statement"
              className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Receipt className="h-4 w-4" />
              <span>Fee Statement</span>
            </TabsTrigger>
            <TabsTrigger
              value="invoices-receipts"
              className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <FileText className="h-4 w-4" />
              <span>Invoices & Receipts</span>
            </TabsTrigger>
            <TabsTrigger
              value="sponsor-contributions"
              className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <HandCoins className="h-4 w-4" />
              <span>Sponsor Contributions</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="fee-statement" className="space-y-4">
            <Card className="border-none shadow-md">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Fee Statement</CardTitle>
                    <CardDescription>Your current fee statement showing all charges and payments</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    <BadgeDollarSign className="mr-1 h-3 w-3" />
                    Balance: KSh 40,000
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-6 space-y-6 bg-card">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-lg">University of Nairobi</h3>
                      <p className="text-muted-foreground">School of Computing and Informatics</p>
                      <p className="text-muted-foreground">P.O. Box 30197, Nairobi, Kenya</p>
                    </div>
                    <div className="text-right">
                      <h3 className="font-bold">Fee Statement</h3>
                      <p className="text-muted-foreground">Academic Year: 2023/2024</p>
                      <p className="text-muted-foreground">Date: April 10, 2024</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium flex items-center gap-2">
                      <School className="h-4 w-4 text-primary" />
                      Student Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      <div>
                        <span className="text-muted-foreground">Name:</span> Sophia Anderson
                      </div>
                      <div>
                        <span className="text-muted-foreground">Student ID:</span> UON/BSC/123/2021
                      </div>
                      <div>
                        <span className="text-muted-foreground">Program:</span> Bachelor of Science in Computer Science
                      </div>
                      <div>
                        <span className="text-muted-foreground">Year of Study:</span> 3
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Receipt className="h-4 w-4 text-primary" />
                      Fee Summary
                    </h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Description</TableHead>
                          <TableHead className="text-right">Amount (KSh)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Total Fees (2023/2024)</TableCell>
                          <TableCell className="text-right">120,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Total Payments Received</TableCell>
                          <TableCell className="text-right">80,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Scholarships/Bursaries</TableCell>
                          <TableCell className="text-right">0</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Outstanding Balance</TableCell>
                          <TableCell className="text-right font-bold">40,000</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      Payment History
                    </h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Receipt No.</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead className="text-right">Amount (KSh)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>March 15, 2024</TableCell>
                          <TableCell>RCP123456</TableCell>
                          <TableCell>Tuition Payment</TableCell>
                          <TableCell className="text-right">20,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>February 28, 2024</TableCell>
                          <TableCell>HELB78945</TableCell>
                          <TableCell>HELB Disbursement</TableCell>
                          <TableCell className="text-right">30,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>January 20, 2024</TableCell>
                          <TableCell>RCP122456</TableCell>
                          <TableCell>Accommodation Fee</TableCell>
                          <TableCell className="text-right">15,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>January 5, 2024</TableCell>
                          <TableCell>RCP121456</TableCell>
                          <TableCell>Tuition Payment</TableCell>
                          <TableCell className="text-right">15,000</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium">Important Notes:</h4>
                    <ul className="list-disc pl-5 mt-2 text-sm">
                      <li>All outstanding fees must be paid by the due dates to avoid penalties</li>
                      <li>This statement is valid as of the date indicated above</li>
                      <li>For any discrepancies, please contact the finance office</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="gap-2">
                  <Download className="h-4 w-4" />
                  Download Fee Statement
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="invoices-receipts" className="space-y-4">
            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Invoices & Receipts Archive</CardTitle>
                    <CardDescription>Access and download your past billing documents</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>Archive of all your invoices and receipts</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Document Type</TableHead>
                      <TableHead>Reference No.</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Amount (KSh)</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>March 15, 2024</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Receipt
                        </Badge>
                      </TableCell>
                      <TableCell>RCP123456</TableCell>
                      <TableCell>Tuition Payment</TableCell>
                      <TableCell className="text-right">20,000</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>March 1, 2024</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          Invoice
                        </Badge>
                      </TableCell>
                      <TableCell>INV123456</TableCell>
                      <TableCell>Tuition Fee - Semester 2</TableCell>
                      <TableCell className="text-right">60,000</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>February 28, 2024</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Receipt
                        </Badge>
                      </TableCell>
                      <TableCell>HELB78945</TableCell>
                      <TableCell>HELB Disbursement</TableCell>
                      <TableCell className="text-right">30,000</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>February 10, 2024</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Receipt
                        </Badge>
                      </TableCell>
                      <TableCell>RCP123123</TableCell>
                      <TableCell>Library Fine Payment</TableCell>
                      <TableCell className="text-right">500</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>January 20, 2024</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Receipt
                        </Badge>
                      </TableCell>
                      <TableCell>RCP122456</TableCell>
                      <TableCell>Accommodation Fee</TableCell>
                      <TableCell className="text-right">15,000</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>January 5, 2024</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Receipt
                        </Badge>
                      </TableCell>
                      <TableCell>RCP121456</TableCell>
                      <TableCell>Tuition Payment</TableCell>
                      <TableCell className="text-right">15,000</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>September 1, 2023</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          Invoice
                        </Badge>
                      </TableCell>
                      <TableCell>INV120456</TableCell>
                      <TableCell>Tuition Fee - Semester 1</TableCell>
                      <TableCell className="text-right">60,000</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export All Documents
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="sponsor-contributions" className="space-y-4">
            <Card className="border-none shadow-md">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Sponsor Contributions</CardTitle>
                    <CardDescription>
                      View disbursements and balances from HELB, NGOs, or private sponsors
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                    <HandCoins className="mr-1 h-3 w-3" />
                    Total: KSh 60,000
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border p-4 bg-card shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Receipt className="h-5 w-5 text-blue-600" />
                      Higher Education Loans Board (HELB)
                    </h3>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Fully Disbursed
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Approved Amount</p>
                      <p className="font-medium">KSh 45,000</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Amount Disbursed</p>
                      <p className="font-medium">KSh 45,000</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Disbursement Date</p>
                      <p className="font-medium">February 28, 2024</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="font-medium text-green-600">Fully Disbursed</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4 bg-card shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <FileText className="h-5 w-5 text-amber-600" />
                      County Bursary
                    </h3>
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                      Under Review
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Applied Amount</p>
                      <p className="font-medium">KSh 20,000</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Amount Approved</p>
                      <p className="font-medium">Pending</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Application Date</p>
                      <p className="font-medium">January 15, 2024</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="font-medium text-amber-600">Under Review</p>
                    </div>
                  </div>
                </div>

                <Table>
                  <TableCaption>History of sponsor contributions</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Sponsor</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Academic Year</TableHead>
                      <TableHead className="text-right">Amount (KSh)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>February 28, 2024</TableCell>
                      <TableCell>HELB</TableCell>
                      <TableCell>HELB/2023/78945</TableCell>
                      <TableCell>2023/2024</TableCell>
                      <TableCell className="text-right">45,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>October 10, 2023</TableCell>
                      <TableCell>HELB</TableCell>
                      <TableCell>HELB/2023/45678</TableCell>
                      <TableCell>2023/2024</TableCell>
                      <TableCell className="text-right">35,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>March 5, 2023</TableCell>
                      <TableCell>County Bursary</TableCell>
                      <TableCell>CB/NAI/2023/5678</TableCell>
                      <TableCell>2022/2023</TableCell>
                      <TableCell className="text-right">15,000</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="gap-2">
                  <Link href="/finance/support">
                    <FileText className="h-4 w-4" />
                    Upload Sponsor Documents
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
