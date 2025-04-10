import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CreditCard, FileText, HelpCircle, LayoutDashboard, Receipt, Shield } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"


export const metadata: Metadata = {
  title: "Finance Module - Student Portal",
  description: "Manage your university finances, fees, payments, and financial clearance",
}

export default function HomePage() {
  return (
   
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col">
        {/* Hero Section with Feature Grid */}
        <div className="p-2 flex-1 flex flex-col">
          <div className="flex flex-col md:flex-row items-center justify-between mb-4">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Manage Your University Finances</h1>
              <p className="text-muted-foreground">
                Track fees, make payments, and maintain financial clearance—all in one place.
              </p>
              
            </div>
            <div className="flex flex-wrap gap-3">
                <Button asChild size="sm" className="gap-2">
                  <Link href="/finance/dashboard">
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="gap-2">
                  <Link href="/finance/my-fees">
                    <FileText className="h-4 w-4" />
                    View Fees
                  </Link>
                </Button>
              </div>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card className="border shadow-sm hover:shadow-md transition-shadow ">
              <CardHeader className="pb-2 space-y-0">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                    <Receipt className="h-4 w-4 text-blue-700" />
                  </div>
                  <CardTitle className="text-base">My Fees</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  View fee obligations, payment plans, and scholarship information.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1">
                  <Link href="/finance/my-fees">
                    View Fees
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2 space-y-0">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                    <CreditCard className="h-4 w-4 text-green-700" />
                  </div>
                  <CardTitle className="text-base">Payments</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Make secure payments via M-Pesa, card, PayPal, or bank transfer.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1">
                  <Link href="/finance/payments">
                    Make Payment
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2 space-y-0">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                    <FileText className="h-4 w-4 text-purple-700" />
                  </div>
                  <CardTitle className="text-base">Statements</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Access fee statements, invoices, receipts, and sponsor contributions.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1">
                  <Link href="/finance/statements">
                    View Statements
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2 space-y-0">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                    <Shield className="h-4 w-4 text-amber-700" />
                  </div>
                  <CardTitle className="text-base">Clearance</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Check clearance status for exams, graduation, and download certificates.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1">
                  <Link href="/finance/clearance">
                    Check Status
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2 space-y-0">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100">
                    <HelpCircle className="h-4 w-4 text-indigo-700" />
                  </div>
                  <CardTitle className="text-base">Support</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Request refunds, query transactions, and contact finance support.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1">
                  <Link href="/finance/support">
                    Get Support
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="border shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-primary/5 to-primary/10">
              <CardHeader className="pb-2 space-y-0">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                    <LayoutDashboard className="h-4 w-4 text-primary" />
                  </div>
                  <CardTitle className="text-base">Dashboard</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  View your financial overview, recent transactions, and upcoming payments.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild size="sm" className="h-7 px-2 text-xs gap-1">
                  <Link href="/finance/dashboard">
                    Go to Dashboard
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
 
  )
}
