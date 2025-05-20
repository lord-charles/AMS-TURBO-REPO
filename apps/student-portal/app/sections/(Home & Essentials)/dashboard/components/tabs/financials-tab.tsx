"use client"

import * as React from "react"
import { AlertCircle, ArrowDown, ArrowUp, Calendar, Check, ChevronDown, Clock, CreditCard, Download, Eye, FileText, Filter, HelpCircle, Loader2, MoreHorizontal, Printer, Receipt, Search, SortAsc, Wallet } from 'lucide-react'
import { format, parseISO, isAfter } from "date-fns"
import { cn } from "@/lib/utils"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useMediaQuery } from "@/hooks/use-media-query"

export function FinancialsTab() {
  const [activeSubTab, setActiveSubTab] = React.useState("statement")
  const [isLoading, setIsLoading] = React.useState(false)
  const [paymentMethod, setPaymentMethod] = React.useState("")
  const [paymentAmount, setPaymentAmount] = React.useState("")
  const [paymentDialogOpen, setPaymentDialogOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [filterStatus, setFilterStatus] = React.useState("all")
  const isMobile = useMediaQuery("(max-width: 640px)")
  
  const financialSummary = {
    totalFees: 120000,
    paid: 80000,
    balance: 40000,
    dueDate: "2023-11-30",
    academicYear: "2023/2024",
    semester: "Second",
    paymentPlan: "Installment Plan (3 payments)",
    status: "Partially Paid",
    studentId: "STU2023001",
    program: "Bachelor of Computer Science",
    year: "3rd Year"
  }
  
  const feeBreakdown = [
    {
      id: "fee1",
      description: "Tuition Fee",
      amount: 90000,
      category: "academic"
    },
    {
      id: "fee2",
      description: "Library Fee",
      amount: 5000,
      category: "academic"
    },
    {
      id: "fee3",
      description: "Technology Fee",
      amount: 8000,
      category: "academic"
    },
    {
      id: "fee4",
      description: "Student Activity Fee",
      amount: 3000,
      category: "non-academic"
    },
    {
      id: "fee5",
      description: "Health Insurance",
      amount: 12000,
      category: "non-academic"
    },
    {
      id: "fee6",
      description: "Examination Fee",
      amount: 2000,
      category: "academic"
    }
  ]
  
  const paymentHistory = [
    {
      id: "pay1",
      date: "2023-09-05T10:30:00",
      amount: 50000,
      method: "Bank Transfer",
      reference: "TRF23090501",
      status: "completed",
      description: "First Semester"
    },
    {
      id: "pay2",
      date: "2023-10-10T14:15:00",
      amount: 30000,
      method: "Credit Card",
      reference: "CC23101001",
      status: "completed",
      description: "Second Semester"
    },
    {
      id: "pay3",
      date: "2023-11-30T00:00:00",
      amount: 40000,
      method: "Pending",
      reference: "-",
      status: "pending",
      description: "Third Semester (Due)"
    }
  ]
  
  const scholarships = [
    {
      id: "sch1",
      name: "Merit Scholarship",
      amount: 30000,
      status: "applied",
      deadline: "2023-12-15",
      description: "Scholarship for students with outstanding academic performance.",
      eligibility: "GPA of 3.5 or higher, full-time enrollment",
      documents: ["Academic transcripts", "Recommendation letter", "Personal statement"]
    },
    {
      id: "sch2",
      name: "Financial Need Grant",
      amount: 20000,
      status: "available",
      deadline: "2023-12-20",
      description: "Grant for students demonstrating financial need.",
      eligibility: "Demonstrated financial need, good academic standing",
      documents: ["Financial statements", "Income verification", "Application form"]
    },
    {
      id: "sch3",
      name: "International Student Scholarship",
      amount: 25000,
      status: "available",
      deadline: "2023-12-10",
      description: "Scholarship specifically for international students.",
      eligibility: "International student status, GPA of 3.0 or higher",
      documents: ["Passport copy", "Academic transcripts", "Statement of purpose"]
    },
    {
      id: "sch4",
      name: "Department of Computer Science Scholarship",
      amount: 15000,
      status: "not-eligible",
      deadline: "2023-12-05",
      description: "Scholarship for outstanding Computer Science students.",
      eligibility: "Computer Science major, 3rd or 4th year student, GPA of 3.7 or higher",
      documents: ["Academic transcripts", "Project portfolio", "Faculty recommendation"]
    }
  ]
  
  const invoices = [
    {
      id: "inv1",
      date: "2023-09-01",
      dueDate: "2023-09-15",
      amount: 50000,
      status: "paid",
      description: "2023 - First Semester"
    },
    {
      id: "inv2",
      date: "2023-10-01",
      dueDate: "2023-10-15",
      amount: 30000,
      status: "paid",
      description: "2023 - Second Semester"
    },
    {
      id: "inv3",
      date: "2023-11-01",
      dueDate: "2023-11-30",
      amount: 40000,
      status: "unpaid",
      description: "2023 - Third Semester"
    }
  ]

  const financialAidInfo = {
    totalAward: 45000,
    disbursed: 30000,
    remaining: 15000,
    status: "Active",
    type: "Federal Student Aid",
    awards: [
      {
        id: "aid1",
        name: "Federal Pell Grant",
        amount: 15000,
        status: "Disbursed",
        date: "2023-09-10"
      },
      {
        id: "aid2",
        name: "State Grant",
        amount: 15000,
        status: "Disbursed",
        date: "2023-09-10"
      },
      {
        id: "aid3",
        name: "University Grant",
        amount: 15000,
        status: "Pending",
        date: "2023-11-15"
      }
    ]
  }
  
  // Calculate payment progress
  const paymentProgress = Math.round((financialSummary.paid / financialSummary.totalFees) * 100)
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return `KES ${amount.toLocaleString()}`
  }
  
  // Get status badge for payments
  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>
      case "pending":
        return <Badge variant="outline" className="border-amber-500 text-amber-500">Pending</Badge>
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }
  
  // Get status badge for scholarships
  const getScholarshipStatusBadge = (status: string) => {
    switch (status) {
      case "applied":
        return <Badge variant="secondary">Applied</Badge>
      case "available":
        return <Badge className="bg-green-500">Available</Badge>
      case "not-eligible":
        return <Badge variant="outline" className="border-muted-foreground/30">Not Eligible</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }
  
  // Get status badge for invoices
  const getInvoiceStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500">Paid</Badge>
      case "unpaid":
        return <Badge variant="destructive">Unpaid</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Get status badge for financial aid
  const getFinancialAidStatusBadge = (status: string) => {
    switch (status) {
      case "Disbursed":
        return <Badge className="bg-green-500">Disbursed</Badge>
      case "Pending":
        return <Badge variant="outline" className="border-amber-500 text-amber-500">Pending</Badge>
      case "Rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }
  
  // Handle download invoice (mock)
  const handleDownloadInvoice = (id: string) => {
    setIsLoading(true)
    // Simulate download delay
    setTimeout(() => {
      setIsLoading(false)
      console.log(`Downloading invoice with ID: ${id}`)
    }, 1500)
  }

  // Handle payment submission
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    setTimeout(() => {
      setIsLoading(false)
      setPaymentDialogOpen(false)
      setPaymentMethod("")
      setPaymentAmount("")
      
      // Show success message or update UI
      console.log(`Payment of ${paymentAmount} via ${paymentMethod} processed`)
    }, 2000)
  }

  // Filter invoices based on search and status filter
  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || invoice.status === filterStatus
    return matchesSearch && matchesFilter
  })
  
  React.useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [activeSubTab])

  const isPaymentOverdue = (dueDate: string) => {
    return isAfter(new Date(), new Date(dueDate))
  }
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="statement" value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
          <h2 className="text-xl font-bold">Financial Information</h2>
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="statement" className="text-sm">
              Fee Statement
            </TabsTrigger>
            <TabsTrigger value="payments" className="text-sm">
              Payments
            </TabsTrigger>
            <TabsTrigger value="aid" className="text-sm">
              Financial Aid
            </TabsTrigger>
            <TabsTrigger value="scholarships" className="text-sm">
              Scholarships
            </TabsTrigger>
            <TabsTrigger value="invoices" className="text-sm">
              Invoices
            </TabsTrigger>
          </TabsList>
        </div>
        
        {/* Fee Statement Tab */}
        <TabsContent value="statement" className="space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>Financial Summary</CardTitle>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <HelpCircle className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">This summary shows your current financial status for {financialSummary.academicYear}.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <CardDescription>
                      {financialSummary.academicYear} - {financialSummary.semester} Semester
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Total Fees</p>
                          <p className="text-2xl font-bold">{formatCurrency(financialSummary.totalFees)}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Balance Due</p>
                          <p className="text-2xl font-bold text-amber-500">{formatCurrency(financialSummary.balance)}</p>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Payment Progress</span>
                          <span className="text-sm text-muted-foreground">{paymentProgress}%</span>
                        </div>
                        <Progress value={paymentProgress} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-2">
                          {formatCurrency(financialSummary.paid)} paid of {formatCurrency(financialSummary.totalFees)}
                        </p>
                      </div>
                      
                      <div className="pt-2 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Payment Plan:</span>
                          <span className="text-sm font-medium">{financialSummary.paymentPlan}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Next Payment Due:</span>
                          <span className={cn(
                            "text-sm font-medium",
                            isPaymentOverdue(financialSummary.dueDate) && "text-red-500"
                          )}>
                            {format(parseISO(financialSummary.dueDate), "MMMM d, yyyy")}
                            {isPaymentOverdue(financialSummary.dueDate) && " (Overdue)"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Status:</span>
                          <Badge variant="outline" className="border-amber-500 text-amber-500">
                            {financialSummary.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href="/financials/statement/print">
                        <Printer className="mr-2 h-4 w-4" />
                        Print Statement
                      </a>
                    </Button>
                    <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="default" size="sm">
                          <CreditCard className="mr-2 h-4 w-4" />
                          Make Payment
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Make a Payment</DialogTitle>
                          <DialogDescription>
                            Enter payment details to process your transaction.
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handlePaymentSubmit} className="space-y-4 py-4">
                          <div className="space-y-2">
                            <label htmlFor="amount" className="text-sm font-medium">
                              Payment Amount (KES)
                            </label>
                            <Input
                              id="amount"
                              type="number"
                              placeholder="Enter amount"
                              value={paymentAmount}
                              onChange={(e) => setPaymentAmount(e.target.value)}
                              required
                              min="1"
                              max={financialSummary.balance.toString()}
                            />
                            <p className="text-xs text-muted-foreground">
                              Balance due: {formatCurrency(financialSummary.balance)}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="method" className="text-sm font-medium">
                              Payment Method
                            </label>
                            <Select value={paymentMethod} onValueChange={setPaymentMethod} required>
                              <SelectTrigger>
                                <SelectValue placeholder="Select payment method" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="credit-card">Credit/Debit Card</SelectItem>
                                <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                                <SelectItem value="mobile-money">Mobile Money</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setPaymentDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button type="submit" disabled={isLoading || !paymentMethod || !paymentAmount}>
                              {isLoading ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Processing...
                                </>
                              ) : (
                                <>
                                  <CreditCard className="mr-2 h-4 w-4" />
                                  Pay Now
                                </>
                              )}
                            </Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Student Information</CardTitle>
                    <CardDescription>
                      Personal and program details
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Student ID</p>
                          <p className="font-medium">{financialSummary.studentId}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Program</p>
                          <p className="font-medium">{financialSummary.program}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Academic Year</p>
                          <p className="font-medium">{financialSummary.academicYear}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Year of Study</p>
                          <p className="font-medium">{financialSummary.year}</p>
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <h4 className="text-sm font-medium mb-2">Payment Schedule</h4>
                        <div className="space-y-2">
                          {paymentHistory.map((payment, index) => (
                            <div 
                              key={payment.id} 
                              className={cn(
                                "p-2 rounded-lg border text-sm",
                                payment.status === "completed" ? "bg-green-500/5 border-green-500/20" :
                                payment.status === "pending" ? "bg-amber-500/5 border-amber-500/20" :
                                "bg-muted/30"
                              )}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className={cn(
                                    "w-6 h-6 rounded-full flex items-center justify-center mr-2",
                                    payment.status === "completed" ? "bg-green-500/10 text-green-500" :
                                    payment.status === "pending" ? "bg-amber-500/10 text-amber-500" :
                                    "bg-muted text-muted-foreground"
                                  )}>
                                    {payment.status === "completed" ? (
                                      <Check className="h-3 w-3" />
                                    ) : (
                                      <Clock className="h-3 w-3" />
                                    )}
                                  </div>
                                  <span>{payment.description}</span>
                                </div>
                                <span className="font-medium">{formatCurrency(payment.amount)}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Fee Breakdown</CardTitle>
                  <CardDescription>
                    Detailed breakdown of all fees for {financialSummary.academicYear}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {feeBreakdown.map((fee) => (
                        <TableRow key={fee.id}>
                          <TableCell className="font-medium">{fee.description}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {fee.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">{formatCurrency(fee.amount)}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-muted/50">
                        <TableCell className="font-bold">Total</TableCell>
                        <TableCell></TableCell>
                        <TableCell className="text-right font-bold">{formatCurrency(financialSummary.totalFees)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-end pt-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download as PDF
                  </Button>
                </CardFooter>
              </Card>
            </>
          )}
        </TabsContent>
        
        {/* Payments Tab */}
        <TabsContent value="payments" className="space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>
                    Available payment options for your tuition and fees
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="p-4 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mr-3">
                          <CreditCard className="h-5 w-5" />
                        </div>
                        <h3 className="font-medium">Credit/Debit Card</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Pay securely using your credit or debit card. All major cards accepted.
                      </p>
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <a href="/financials/payments/card">
                          Pay with Card
                        </a>
                      </Button>
                    </div>
                    
                    <div className="p-4 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mr-3">
                          <Wallet className="h-5 w-5" />
                        </div>
                        <h3 className="font-medium">Bank Transfer</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Make a direct transfer to the university bank account.
                      </p>
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <a href="/financials/payments/transfer">
                          Bank Details
                        </a>
                      </Button>
                    </div>
                    
                    <div className="p-4 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-full bg-purple-500/10 text-purple-500 flex items-center justify-center mr-3">
                          <Receipt className="h-5 w-5" />
                        </div>
                        <h3 className="font-medium">Mobile Money</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Pay using M-Pesa, Airtel Money, or other mobile payment services available in Kenya.
                      </p>
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <a href="/financials/payments/mobile">
                          Pay with Mobile Money
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="default" className="w-full">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Make a Payment Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Make a Payment</DialogTitle>
                        <DialogDescription>
                          Enter payment details to process your transaction.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handlePaymentSubmit} className="space-y-4 py-4">
                          <div className="space-y-2">
                            <label htmlFor="amount" className="text-sm font-medium">
                              Payment Amount (KES)
                            </label>
                            <Input
                              id="amount"
                              type="number"
                              placeholder="Enter amount"
                              value={paymentAmount}
                              onChange={(e) => setPaymentAmount(e.target.value)}
                              required
                              min="1"
                              max={financialSummary.balance.toString()}
                            />
                            <p className="text-xs text-muted-foreground">
                              Balance due: {formatCurrency(financialSummary.balance)}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="method" className="text-sm font-medium">
                              Payment Method
                            </label>
                            <Select value={paymentMethod} onValueChange={setPaymentMethod} required>
                              <SelectTrigger>
                                <SelectValue placeholder="Select payment method" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="credit-card">Credit/Debit Card</SelectItem>
                                <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                                <SelectItem value="mobile-money">Mobile Money</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setPaymentDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button type="submit" disabled={isLoading || !paymentMethod || !paymentAmount}>
                              {isLoading ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Processing...
                                </>
                              ) : (
                                <>
                                  <CreditCard className="mr-2 h-4 w-4" />
                                  Pay Now
                                </>
                              )}
                            </Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Payment History</CardTitle>
                  <CardDescription>
                    Record of all your payments and transactions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Reference</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paymentHistory.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell>
                            {payment.status === "completed" 
                              ? format(parseISO(payment.date), "MMM d, yyyy")
                              : format(parseISO(payment.date), "MMM d, yyyy") + " (Due)"}
                          </TableCell>
                          <TableCell className="font-medium">{payment.description}</TableCell>
                          <TableCell>{payment.method}</TableCell>
                          <TableCell>{payment.reference}</TableCell>
                          <TableCell className="text-right">{formatCurrency(payment.amount)}</TableCell>
                          <TableCell>{getPaymentStatusBadge(payment.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <a href="/financials/payments/history">
                      <FileText className="mr-2 h-4 w-4" />
                      View Full History
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href="/financials/payments/history/download">
                      <Download className="mr-2 h-4 w-4" />
                      Download Statement
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </>
          )}
        </TabsContent>

        {/* Financial Aid Tab */}
        <TabsContent value="aid" className="space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Total Award</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{formatCurrency(financialAidInfo.totalAward)}</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      For {financialSummary.academicYear}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Disbursed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-500">{formatCurrency(financialAidInfo.disbursed)}</div>
                    <div className="mt-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-muted-foreground">Disbursement Progress</span>
                        <span className="text-sm text-muted-foreground">
                          {Math.round((financialAidInfo.disbursed / financialAidInfo.totalAward) * 100)}%
                        </span>
                      </div>
                      <Progress 
                        value={Math.round((financialAidInfo.disbursed / financialAidInfo.totalAward) * 100)} 
                        className="h-2" 
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Remaining</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-amber-500">{formatCurrency(financialAidInfo.remaining)}</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Next disbursement: {format(new Date(financialAidInfo.awards[2].date), "MMMM d, yyyy")}
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Financial Aid Awards</CardTitle>
                  <CardDescription>
                    Details of your financial aid package for {financialSummary.academicYear}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Award</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Disbursement Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {financialAidInfo.awards.map((award) => (
                        <TableRow key={award.id}>
                          <TableCell className="font-medium">{award.name}</TableCell>
                          <TableCell>{formatCurrency(award.amount)}</TableCell>
                          <TableCell>{format(new Date(award.date), "MMM d, yyyy")}</TableCell>
                          <TableCell>{getFinancialAidStatusBadge(award.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <AlertCircle className="mr-2 h-4 w-4" />
                    <span>Contact the Financial Aid Office for any questions regarding your awards.</span>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href="/financials/aid/details">
                      <FileText className="mr-2 h-4 w-4" />
                      View Full Details
                    </a>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Financial Aid Requirements</CardTitle>
                  <CardDescription>
                    Documents and requirements for maintaining your financial aid
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 rounded-lg border bg-muted/30">
                      <h3 className="font-medium mb-1">Academic Requirements</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        To maintain your financial aid eligibility, you must:
                      </p>
                      <ul className="text-sm space-y-1">
                        <li className="flex items-start">
                          <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Maintain a minimum GPA of 3.0</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Complete at least 12 credit hours per semester</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Make satisfactory academic progress toward your degree</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="p-3 rounded-lg border bg-muted/30">
                      <h3 className="font-medium mb-1">Required Documents</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        The following documents must be submitted annually:
                      </p>
                      <ul className="text-sm space-y-1">
                        <li className="flex items-start">
                          <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>FAFSA or equivalent financial aid application</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Income verification documents</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Enrollment verification</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/financials/aid/requirements">
                      <FileText className="mr-2 h-4 w-4" />
                      View Complete Requirements
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </>
          )}
        </TabsContent>
        
        {/* Scholarships Tab */}
        <TabsContent value="scholarships" className="space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              <div className="bg-muted/30 border rounded-lg p-4">
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <AlertCircle className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Scholarship Information</h3>
                    <p className="text-sm text-muted-foreground">
                      The university offers various scholarships and financial aid options to eligible students. 
                      Applications are evaluated based on academic performance, financial need, and other criteria.
                      Please review the eligibility requirements carefully before applying.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                {scholarships.map((scholarship) => (
                  <Card key={scholarship.id} className={cn(
                    scholarship.status === "not-eligible" && "opacity-70"
                  )}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{scholarship.name}</CardTitle>
                        {getScholarshipStatusBadge(scholarship.status)}
                      </div>
                      <CardDescription>
                        Amount: {formatCurrency(scholarship.amount)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-3">
                        <p className="text-sm">{scholarship.description}</p>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-1">Eligibility:</h4>
                          <p className="text-sm text-muted-foreground">{scholarship.eligibility}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-1">Required Documents:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {scholarship.documents.map((doc, index) => (
                              <li key={index} className="flex items-start">
                                <Check className="mr-2 h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                                <span>{doc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex items-center text-sm">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>Application Deadline: {format(new Date(scholarship.deadline), "MMMM d, yyyy")}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      {scholarship.status === "available" ? (
                        <Button variant="default" className="w-full" asChild>
                          <a href={`/financials/scholarships/${scholarship.id}/apply`}>
                            Apply Now
                          </a>
                        </Button>
                      ) : scholarship.status === "applied" ? (
                        <Button variant="outline" className="w-full" disabled>
                          Application Submitted
                        </Button>
                      ) : (
                        <Button variant="outline" className="w-full" disabled>
                          Not Eligible
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Financial Aid Resources</CardTitle>
                  <CardDescription>
                    Additional resources and support for financial assistance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 rounded-lg border bg-muted/30">
                      <h3 className="font-medium mb-1">Financial Aid Office</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Visit the Financial Aid Office for personalized assistance with scholarships, 
                        grants, and other financial support options.
                      </p>
                      <div className="text-sm">
                        <p>Location: Administration Building, Room 105</p>
                        <p>Hours: Monday-Friday, 8:00 AM - 4:30 PM</p>
                        <p>Email: financial.aid@university.edu</p>
                        <p>Phone: +254 (0) 123 456 789</p>
                      </div>
                    </div>
                    
                    <div className="p-3 rounded-lg border bg-muted/30">
                      <h3 className="font-medium mb-1">External Scholarship Opportunities</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Explore external scholarships and grants available to university students.
                      </p>
                      <Button variant="outline" size="sm" asChild>
                        <a href="/financials/scholarships/external">
                          View External Scholarships
                        </a>
                      </Button>
                    </div>
                    
                    <div className="p-3 rounded-lg border bg-muted/30">
                      <h3 className="font-medium mb-1">Financial Counseling</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Schedule a meeting with a financial counselor to discuss your options.
                      </p>
                      <Button variant="outline" size="sm" asChild>
                        <a href="/financials/counseling">
                          Book Appointment
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
        
        {/* Invoices Tab */}
        <TabsContent value="invoices" className="space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search invoices..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="unpaid">Unpaid</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Invoices & Receipts</CardTitle>
                  <CardDescription>
                    Download and print your invoices and payment receipts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {filteredInvoices.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="font-medium text-lg mb-1">No invoices found</h3>
                      <p className="text-sm text-muted-foreground max-w-sm">
                        {searchQuery 
                          ? `No invoices match your search for "${searchQuery}"`
                          : "There are no invoices matching the selected filter."}
                      </p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Invoice Date</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Due Date</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredInvoices.map((invoice) => (
                          <TableRow key={invoice.id}>
                            <TableCell>{format(new Date(invoice.date), "MMM d, yyyy")}</TableCell>
                            <TableCell className="font-medium">{invoice.description}</TableCell>
                            <TableCell className={cn(
                              isPaymentOverdue(invoice.dueDate) && invoice.status === "unpaid" && "text-red-500"
                            )}>
                              {format(new Date(invoice.dueDate), "MMM d, yyyy")}
                              {isPaymentOverdue(invoice.dueDate) && invoice.status === "unpaid" && " (Overdue)"}
                            </TableCell>
                            <TableCell className="text-right">{formatCurrency(invoice.amount)}</TableCell>
                            <TableCell>{getInvoiceStatusBadge(invoice.status)}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8"
                                  onClick={() => handleDownloadInvoice(invoice.id)}
                                  disabled={isLoading}
                                >
                                  {isLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <Download className="h-4 w-4" />
                                  )}
                                  <span className="sr-only">Download</span>
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Printer className="h-4 w-4" />
                                  <span className="sr-only">Print</span>
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">More options</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuItem>
                                      <Eye className="mr-2 h-4 w-4" />
                                      <span>View Invoice</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Download className="mr-2 h-4 w-4" />
                                      <span>Download PDF</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Printer className="mr-2 h-4 w-4" />
                                      <span>Print Invoice</span>
                                    </DropdownMenuItem>
                                    {invoice.status === "unpaid" && (
                                      <>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => {
                                          setPaymentAmount(invoice.amount.toString())
                                          setPaymentDialogOpen(true)
                                        }}>
                                          <CreditCard className="mr-2 h-4 w-4" />
                                          <span>Pay Now</span>
                                        </DropdownMenuItem>
                                      </>
                                    )}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <a href="/financials/invoices/all">
                      <FileText className="mr-2 h-4 w-4" />
                      View All Invoices
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href="/financials/receipts">
                      <Receipt className="mr-2 h-4 w-4" />
                      View Receipts
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
