import type { Metadata } from "next"
import Link from "next/link"
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  CreditCard,
  FileText,
  LineChart,
  Receipt,
  Shield,
  Wallet,
} from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"


export const metadata: Metadata = {
  title: "Finance Dashboard - Student Portal",
  description: "Overview of your financial status",
}

export default function DashboardPage() {
  return (
 
    <div className="p-2">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Finance Dashboard</h1>
            <Button variant="outline" size="sm" className="hidden md:flex">
              <FileText className="mr-2 h-4 w-4" />
              Export Summary
            </Button>
          </div>
          <p className="text-muted-foreground">Welcome back, Sophia. Here's your financial overview.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="overflow-hidden border-none shadow-md">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-2">
              <CardTitle className="text-sm font-medium text-black">Total Fees</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">KSh 120,000</div>
                  <p className="text-xs text-muted-foreground">2023/2024 Academic Year</p>
                </div>
                <div className="rounded-full bg-blue-100 p-2 text-blue-700">
                  <Receipt className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-none shadow-md">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 pb-2">
              <CardTitle className="text-sm font-medium text-black">Amount Paid</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">KSh 80,000</div>
                  <p className="text-xs text-muted-foreground">66% of total fees</p>
                </div>
                <div className="rounded-full bg-green-100 p-2 text-green-700">
                  <Wallet className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-none shadow-md">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 pb-2">
              <CardTitle className="text-sm font-medium text-black">Balance Due</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">KSh 40,000</div>
                  <p className="text-xs text-muted-foreground">Next installment: KSh 20,000</p>
                </div>
                <div className="rounded-full bg-amber-100 p-2 text-amber-700">
                  <FileText className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-none shadow-md">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 pb-2">
              <CardTitle className="text-sm font-medium text-black">Clearance Status</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">Partial</span>
                    <Badge variant="outline" className="border-yellow-200 bg-yellow-100 text-yellow-700">
                      Exams Only
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Not cleared for graduation</p>
                </div>
                <div className="rounded-full bg-purple-100 p-2 text-purple-700">
                  <Shield className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Alert
          variant="destructive"
          className="bg-gradient-to-r from-amber-50 to-yellow-50 border-yellow-200 text-amber-800"
        >
          <AlertCircle className="h-4 w-4 text-amber-800" />
          <AlertTitle className="text-amber-800 font-medium">Payment Reminder</AlertTitle>
          <AlertDescription className="text-amber-700">
            Your next installment of KSh 20,000 is due by April 30, 2024. Please make payment to avoid late penalties.
          </AlertDescription>
        </Alert>

        <div className="grid gap-6 md:grid-cols-7">
          <Card className="md:col-span-4 border-none shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Payment Progress</CardTitle>
                  <CardDescription>Your fee payment progress for the current semester</CardDescription>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <LineChart className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="font-medium">Overall Progress</div>
                  <div className="font-medium">66%</div>
                </div>
                <Progress value={66} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="font-medium">Tuition Fees</div>
                  <div className="font-medium">75%</div>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="font-medium">Accommodation</div>
                  <div className="font-medium">50%</div>
                </div>
                <Progress value={50} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="font-medium">Other Fees</div>
                  <div className="font-medium">100%</div>
                </div>
                <Progress value={100} className="h-2" />
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" size="sm" className="gap-1">
                <Link href="/finance/my-fees">
                  View Fee Breakdown
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="md:col-span-3 border-none shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Quick Actions</CardTitle>
                <Button variant="ghost" size="sm" className="gap-1 text-xs">
                  View All
                  <ArrowUpRight className="h-3 w-3" />
                </Button>
              </div>
              <CardDescription>Common finance-related tasks</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Button
                asChild
                className="w-full justify-between bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <Link href="/finance/payments">
                  Make a Payment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-between">
                <Link href="/finance/statements">
                  Download Fee Statement
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-between">
                <Link href="/finance/clearance">
                  Check Clearance Status
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-between">
                <Link href="/finance/support">
                  Contact Finance Office
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
