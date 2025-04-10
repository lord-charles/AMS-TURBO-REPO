import type { Metadata } from "next"
import {
  AlertCircle,
  BadgeHelp,
  Building,
  Clock,
  FileQuestion,
  FileUp,
  HelpCircle,
  Info,
  Mail,
  MessageSquare,
  Phone,
  RefreshCw,
  Send,
  User,
  Wallet,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Finance Support - Student Portal",
  description: "Get help with finance-related issues",
}

export default function SupportPage() {
  return (
    <div className="p-2">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Finance Support</h1>
          <p className="text-muted-foreground">Get help with finance-related issues and submit requests</p>
        </div>

        <Tabs defaultValue="refund" className="w-full">
          <TabsList className="w-full grid grid-cols-4 h-auto p-1">
            <TabsTrigger
              value="refund"
              className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Wallet className="h-4 w-4" />
              <span>Request Refund</span>
            </TabsTrigger>
            <TabsTrigger
              value="query"
              className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <FileQuestion className="h-4 w-4" />
              <span>Query Transaction</span>
            </TabsTrigger>
            <TabsTrigger
              value="upload"
              className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <FileUp className="h-4 w-4" />
              <span>Upload Documents</span>
            </TabsTrigger>
            <TabsTrigger
              value="contact"
              className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Contact Finance</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="refund" className="space-y-4">
            <Card className="border-none shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Request a Refund</CardTitle>
                    <CardDescription>Claim refunds for overpayments or withdrawn semesters</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    <Clock className="mr-1 h-3 w-3" />
                    Processing time: 7-14 days
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/30 p-4 rounded-lg mb-4">
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-blue-600" />
                    Refund Policy Highlights
                  </h3>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Refunds are processed within 7-14 working days after approval</li>
                    <li>Overpayments can be refunded or credited to your next semester</li>
                    <li>Withdrawal refunds are subject to the university's withdrawal policy</li>
                    <li>Supporting documentation is required for all refund requests</li>
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="refund-type">Refund Type</Label>
                    <Select>
                      <SelectTrigger id="refund-type">
                        <SelectValue placeholder="Select refund type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="overpayment">Fee Overpayment</SelectItem>
                        <SelectItem value="withdrawal">Semester Withdrawal</SelectItem>
                        <SelectItem value="duplicate">Duplicate Payment</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="refund-amount">Refund Amount (KSh)</Label>
                    <Input id="refund-amount" placeholder="Enter amount" type="number" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="refund-reason">Reason for Refund</Label>
                  <Textarea id="refund-reason" placeholder="Please explain why you are requesting a refund" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="refund-payment">Related Payment</Label>
                  <Select>
                    <SelectTrigger id="refund-payment">
                      <SelectValue placeholder="Select related payment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="payment1">March 15, 2024 - Tuition Payment (KSh 20,000)</SelectItem>
                      <SelectItem value="payment2">February 28, 2024 - HELB Disbursement (KSh 30,000)</SelectItem>
                      <SelectItem value="payment3">January 20, 2024 - Accommodation Fee (KSh 15,000)</SelectItem>
                      <SelectItem value="payment4">January 5, 2024 - Tuition Payment (KSh 15,000)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="refund-method">Preferred Refund Method</Label>
                    <Select>
                      <SelectTrigger id="refund-method">
                        <SelectValue placeholder="Select refund method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mpesa">M-Pesa</SelectItem>
                        <SelectItem value="bank">Bank Transfer</SelectItem>
                        <SelectItem value="credit">Credit to Student Account</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="refund-phone">M-Pesa Phone Number (if applicable)</Label>
                    <Input id="refund-phone" placeholder="e.g., 07XX XXX XXX" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="refund-documents">Supporting Documents</Label>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Input id="refund-documents" type="file" className="cursor-pointer" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Upload any relevant documents to support your refund request (e.g., payment receipts, withdrawal
                    approval)
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button variant="outline">Save Draft</Button>
                <Button>Submit Refund Request</Button>
              </CardFooter>
            </Card>

            <Card className="border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Recent Refund Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>March 10, 2024</TableCell>
                      <TableCell>REF-2024-001</TableCell>
                      <TableCell>KSh 5,000</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          <Clock className="mr-1 h-3 w-3" />
                          Under Review
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>January 15, 2024</TableCell>
                      <TableCell>REF-2024-002</TableCell>
                      <TableCell>KSh 2,500</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Completed
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="query" className="space-y-4">
            <Card className="border-none shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Query a Transaction</CardTitle>
                    <CardDescription>Dispute missing receipts or payment errors</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    <Clock className="mr-1 h-3 w-3" />
                    Response time: 2-3 days
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/30 p-4 rounded-lg mb-4">
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-blue-600" />
                    Before Submitting a Query
                  </h3>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Check your payment history to confirm the transaction is not already recorded</li>
                    <li>Allow up to 24 hours for M-Pesa payments and 3-5 days for bank transfers to reflect</li>
                    <li>Have your transaction reference number or receipt ready</li>
                    <li>Include as much detail as possible to help us resolve your query quickly</li>
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="query-type">Query Type</Label>
                    <Select>
                      <SelectTrigger id="query-type">
                        <SelectValue placeholder="Select query type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="missing">Missing Receipt</SelectItem>
                        <SelectItem value="wrong-amount">Wrong Amount Recorded</SelectItem>
                        <SelectItem value="payment-not-reflected">Payment Not Reflected</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="transaction-date">Transaction Date</Label>
                    <Input id="transaction-date" type="date" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="transaction-reference">Transaction Reference</Label>
                    <Input id="transaction-reference" placeholder="e.g., M-Pesa confirmation code or bank reference" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="transaction-amount">Transaction Amount (KSh)</Label>
                    <Input id="transaction-amount" placeholder="Enter amount" type="number" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payment-method">Payment Method</Label>
                  <Select>
                    <SelectTrigger id="payment-method">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mpesa">M-Pesa</SelectItem>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                      <SelectItem value="card">Credit/Debit Card</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="query-description">Describe the Issue</Label>
                  <Textarea
                    id="query-description"
                    placeholder="Please provide details about the transaction issue"
                    className="min-h-[120px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="query-documents">Supporting Documents</Label>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Input id="query-documents" type="file" className="cursor-pointer" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Upload any relevant documents (e.g., M-Pesa confirmation message, bank statement)
                  </p>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button className="w-full">Submit Query</Button>
              </CardFooter>
            </Card>

            <Card className="border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Recent Transaction Queries</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Query Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>April 2, 2024</TableCell>
                      <TableCell>QRY-2024-003</TableCell>
                      <TableCell>Missing Receipt</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          <RefreshCw className="mr-1 h-3 w-3" />
                          In Progress
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upload" className="space-y-4">
            <Card className="border-none shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Upload Sponsor/Bursary Documents</CardTitle>
                    <CardDescription>Submit supporting documents for third-party payments or funding</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    <Clock className="mr-1 h-3 w-3" />
                    Processing time: 3-5 days
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert className="bg-blue-50 border-blue-200 text-blue-800">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertTitle>Important Information</AlertTitle>
                  <AlertDescription className="text-blue-700">
                    <p>
                      Uploading sponsor documents helps us properly allocate funds to your account. Please ensure all
                      documents are clear, legible, and include your student ID.
                    </p>
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="document-type">Document Type</Label>
                    <Select>
                      <SelectTrigger id="document-type">
                        <SelectValue placeholder="Select document type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="helb">HELB Award Letter</SelectItem>
                        <SelectItem value="bursary">County Bursary Award</SelectItem>
                        <SelectItem value="scholarship">Scholarship Award Letter</SelectItem>
                        <SelectItem value="sponsor">Corporate Sponsor Letter</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sponsor-name">Sponsor/Bursary Name</Label>
                    <Input id="sponsor-name" placeholder="e.g., HELB, Nairobi County Bursary" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="award-amount">Award Amount (KSh)</Label>
                    <Input id="award-amount" placeholder="Enter amount" type="number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="award-period">Academic Period</Label>
                    <Select>
                      <SelectTrigger id="award-period">
                        <SelectValue placeholder="Select academic period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2023-2024">2023/2024 Academic Year</SelectItem>
                        <SelectItem value="2023-sem1">2023/2024 - Semester 1</SelectItem>
                        <SelectItem value="2023-sem2">2023/2024 - Semester 2</SelectItem>
                        <SelectItem value="2024-2025">2024/2025 Academic Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="document-upload">Upload Document</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <FileUp className="h-8 w-8 text-muted-foreground/50 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop your files here, or click to browse
                    </p>
                    <Input id="document-upload" type="file" className="cursor-pointer" />
                    <p className="text-xs text-muted-foreground mt-2">
                      Accepted formats: PDF, JPG, PNG (Max size: 5MB)
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additional-notes">Additional Notes</Label>
                  <Textarea id="additional-notes" placeholder="Any additional information about this funding" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button variant="outline" className="gap-2">
                  <FileUp className="h-4 w-4" />
                  Upload More Documents
                </Button>
                <Button>Submit Documents</Button>
              </CardFooter>
            </Card>

            <Card className="border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Recently Uploaded Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Document Type</TableHead>
                      <TableHead>Sponsor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>March 20, 2024</TableCell>
                      <TableCell>HELB Award Letter</TableCell>
                      <TableCell>HELB</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Processed
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>February 15, 2024</TableCell>
                      <TableCell>County Bursary Award</TableCell>
                      <TableCell>Nairobi County</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          <RefreshCw className="mr-1 h-3 w-3" />
                          Processing
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <Card className="border-none shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Contact Finance Office</CardTitle>
                    <CardDescription>Get in touch with the university finance department</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    <Clock className="mr-1 h-3 w-3" />
                    Response time: 24-48 hours
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="contact-category">Category</Label>
                      <Select>
                        <SelectTrigger id="contact-category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="payment">Payment Issues</SelectItem>
                          <SelectItem value="fees">Fee Structure Inquiry</SelectItem>
                          <SelectItem value="clearance">Clearance Issues</SelectItem>
                          <SelectItem value="scholarship">Scholarship/Bursary</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-subject">Subject</Label>
                      <Input id="contact-subject" placeholder="Enter subject" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-message">Message</Label>
                      <Textarea id="contact-message" placeholder="Type your message here" className="min-h-[150px]" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-attachment">Attachment (Optional)</Label>
                      <Input id="contact-attachment" type="file" />
                    </div>

                    <Button className="w-full gap-2">
                      <Send className="h-4 w-4" />
                      Send Message
                    </Button>
                  </div>

                  <div className="space-y-6">
                    <Card className="border">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <Building className="h-4 w-4 text-blue-600" />
                          Finance Office Contact Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                            <Mail className="h-4 w-4 text-blue-700" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Email</p>
                            <p className="text-sm text-muted-foreground">finance@university.ac.ke</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                            <Phone className="h-4 w-4 text-green-700" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Phone</p>
                            <p className="text-sm text-muted-foreground">+254 (0) 20 123 4567</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                            <Building className="h-4 w-4 text-purple-700" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Location</p>
                            <p className="text-sm text-muted-foreground">Administration Block, Ground Floor, Room 12</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                            <Clock className="h-4 w-4 text-amber-700" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Office Hours</p>
                            <p className="text-sm text-muted-foreground">Monday to Friday, 8:00 AM - 5:00 PM</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <BadgeHelp className="h-4 w-4 text-amber-600" />
                          Frequently Asked Questions
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="rounded-lg p-3 hover:bg-muted/50 transition-colors">
                          <p className="font-medium text-sm">How long does it take to process a refund?</p>
                          <p className="text-xs text-muted-foreground">
                            Refunds are typically processed within 14 working days after approval.
                          </p>
                        </div>
                        <div className="rounded-lg p-3 hover:bg-muted/50 transition-colors">
                          <p className="font-medium text-sm">When is the deadline for fee payment?</p>
                          <p className="text-xs text-muted-foreground">
                            Fee payment deadlines are outlined in your payment plan. The first installment is due during
                            registration.
                          </p>
                        </div>
                        <div className="rounded-lg p-3 hover:bg-muted/50 transition-colors">
                          <p className="font-medium text-sm">How do I apply for a payment extension?</p>
                          <p className="text-xs text-muted-foreground">
                            Submit a payment extension request through this portal at least 14 days before the due date.
                          </p>
                        </div>
                        <Button variant="link" className="px-0 mt-2 text-sm">
                          <HelpCircle className="mr-2 h-4 w-4" />
                          View All FAQs
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <MessageSquare className="h-4 w-4 text-blue-600" />
                          Recent Support Tickets
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium">Missing Receipt Query</p>
                            <p className="text-xs text-muted-foreground">Submitted on April 2, 2024</p>
                          </div>
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                            <RefreshCw className="mr-1 h-3 w-3" />
                            In Progress
                          </Badge>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium">Fee Structure Inquiry</p>
                            <p className="text-xs text-muted-foreground">Submitted on March 15, 2024</p>
                          </div>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <User className="mr-1 h-3 w-3" />
                            Resolved
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-2">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          View Ticket History
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
