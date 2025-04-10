"use client"

import { useState } from "react"
import {
  ArrowUpDown,
  BadgeCheck,
  BanknoteIcon,
  CreditCard,
  Download,
  History,
  Landmark,
  Phone,
  Receipt,
  Wallet,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  BadgeDollarSign,
  Shield,
  LineChart,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function PaymentsPageClient() {
  // Define the valid payment method types
  type PaymentMethodType = 'mpesa' | 'card' | 'bank' | 'paypal';

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("mpesa")
  const [walletPaymentMethod, setWalletPaymentMethod] = useState<PaymentMethodType>("mpesa")

  // Payment method specific content
  const paymentMethodContent: Record<PaymentMethodType, {
    title: string;
    icon: React.ReactNode;
    buttonText: string;
    buttonIcon: React.ReactNode;
    buttonClass: string;
    content: React.ReactNode;
  }> = {
    mpesa: {
      title: "M-Pesa Payment Instructions",
      icon: <Phone className="h-4 w-4 text-green-600" />,
      buttonText: "Pay with M-Pesa",
      buttonIcon: <Phone className="h-4 w-4" />,
      buttonClass: "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700",
      content: (
        <ol className="ml-6 list-decimal text-sm space-y-2">
          <li>Go to M-Pesa on your phone</li>
          <li>Select "Lipa na M-Pesa"</li>
          <li>Select "Pay Bill"</li>
          <li>
            Enter Business Number: <span className="font-medium">123456</span>
          </li>
          <li>
            Enter Account Number: <span className="font-medium">Your Student ID</span>
          </li>
          <li>
            Enter Amount: <span className="font-medium">As specified above</span>
          </li>
          <li>Enter your M-Pesa PIN and confirm</li>
          <li>You will receive a confirmation SMS</li>
        </ol>
      ),
    },
    card: {
      title: "Card Payment Details",
      icon: <CreditCard className="h-4 w-4 text-blue-600" />,
      buttonText: "Pay with Card",
      buttonIcon: <CreditCard className="h-4 w-4" />,
      buttonClass: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="card-number">Card Number</Label>
            <Input id="card-number" placeholder="1234 5678 9012 3456" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry-date">Expiry Date</Label>
              <Input id="expiry-date" placeholder="MM/YY" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input id="cvv" placeholder="123" type="password" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="card-name">Name on Card</Label>
            <Input id="card-name" placeholder="John Doe" />
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Shield className="h-4 w-4 text-blue-600" />
            <span className="text-xs text-muted-foreground">Your card details are secured with 256-bit encryption</span>
          </div>
        </div>
      ),
    },
    bank: {
      title: "Bank Transfer Details",
      icon: <Landmark className="h-4 w-4 text-purple-600" />,
      buttonText: "Confirm Bank Transfer",
      buttonIcon: <Landmark className="h-4 w-4" />,
      buttonClass: "bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700",
      content: (
        <div className="space-y-4">
          <div className="rounded-md border p-3 bg-muted/20">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Bank Name:</span>
                <span className="text-sm font-medium">Kenya Commercial Bank (KCB)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Account Name:</span>
                <span className="text-sm font-medium">University of Nairobi</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Account Number:</span>
                <span className="text-sm font-medium">1234567890</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Branch:</span>
                <span className="text-sm font-medium">University Way</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Swift Code:</span>
                <span className="text-sm font-medium">KCBLKENX</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="transfer-date">Transfer Date</Label>
            <Input id="transfer-date" type="date" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="transfer-reference">Transfer Reference</Label>
            <Input id="transfer-reference" placeholder="Enter bank reference number" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="transfer-receipt">Upload Receipt (Optional)</Label>
            <Input id="transfer-receipt" type="file" />
          </div>
          <Alert className="bg-amber-50 border-amber-200 text-amber-800">
            <Clock className="h-4 w-4 text-amber-600" />
            <AlertTitle>Processing Time</AlertTitle>
            <AlertDescription className="text-amber-700 text-sm">
              Bank transfers typically take 2-3 business days to reflect in your account.
            </AlertDescription>
          </Alert>
        </div>
      ),
    },
    paypal: {
      title: "PayPal Payment",
      icon: (
        <svg className="h-4 w-4 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.566 6.082-8.558 6.082h-2.19a1.87 1.87 0 0 0-1.846 1.582l-1.12 7.106c-.068.415.206.81.628.81h4.606c.524 0 .968-.382 1.05-.9l.43-2.72c.068-.419.512-.9 1.037-.9h.653c4.299 0 7.664-1.747 8.647-6.797.428-2.188.183-3.713-.7-4.976z" />
        </svg>
      ),
      buttonText: "Pay with PayPal",
      buttonIcon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.566 6.082-8.558 6.082h-2.19a1.87 1.87 0 0 0-1.846 1.582l-1.12 7.106c-.068.415.206.81.628.81h4.606c.524 0 .968-.382 1.05-.9l.43-2.72c.068-.419.512-.9 1.037-.9h.653c4.299 0 7.664-1.747 8.647-6.797.428-2.188.183-3.713-.7-4.976z" />
        </svg>
      ),
      buttonClass: "bg-[#0070ba] hover:bg-[#005ea6]",
      content: (
        <div className="space-y-4">
          <div className="flex justify-center py-4">
            <svg className="h-12 w-auto text-[#0070ba]" viewBox="0 0 124 33" fill="currentColor">
              <path d="M46.211 6.749h-6.839a.95.95 0 0 0-.939.802l-2.766 17.537a.57.57 0 0 0 .564.658h3.265a.95.95 0 0 0 .939-.803l.746-4.73a.95.95 0 0 1 .938-.803h2.165c4.505 0 7.105-2.18 7.784-6.5.306-1.89.013-3.375-.872-4.415-.97-1.142-2.694-1.746-4.985-1.746zM47 13.154c-.374 2.454-2.249 2.454-4.062 2.454h-1.032l.724-4.583a.57.57 0 0 1 .563-.481h.473c1.235 0 2.4 0 3.002.704.359.42.469 1.044.332 1.906zM66.654 13.075h-3.275a.57.57 0 0 0-.563.481l-.145.916-.229-.332c-.709-1.029-2.29-1.373-3.868-1.373-3.619 0-6.71 2.741-7.312 6.586-.313 1.918.132 3.752 1.22 5.031.998 1.176 2.426 1.666 4.125 1.666 2.916 0 4.533-1.875 4.533-1.875l-.146.91a.57.57 0 0 0 .562.66h2.95a.95.95 0 0 0 .939-.803l1.77-11.209a.568.568 0 0 0-.561-.658zm-4.565 6.374c-.316 1.871-1.801 3.127-3.695 3.127-.951 0-1.711-.305-2.199-.883-.484-.574-.668-1.391-.514-2.301.295-1.855 1.805-3.152 3.67-3.152.93 0 1.686.309 2.184.892.499.589.697 1.411.554 2.317zM84.096 13.075h-3.291a.954.954 0 0 0-.787.417l-4.539 6.686-1.924-6.425a.953.953 0 0 0-.912-.678h-3.234a.57.57 0 0 0-.541.754l3.625 10.638-3.408 4.811a.57.57 0 0 0 .465.9h3.287a.949.949 0 0 0 .781-.408l10.946-15.8a.57.57 0 0 0-.468-.895z" />
              <path d="M94.992 6.749h-6.84a.95.95 0 0 0-.938.802l-2.766 17.537a.569.569 0 0 0 .562.658h3.51a.665.665 0 0 0 .656-.562l.785-4.971a.95.95 0 0 1 .938-.803h2.164c4.506 0 7.105-2.18 7.785-6.5.307-1.89.012-3.375-.873-4.415-.971-1.142-2.694-1.746-4.983-1.746zm.789 6.405c-.373 2.454-2.248 2.454-4.062 2.454h-1.031l.725-4.583a.568.568 0 0 1 .562-.481h.473c1.234 0 2.4 0 3.002.704.359.42.468 1.044.331 1.906zM115.434 13.075h-3.273a.567.567 0 0 0-.562.481l-.145.916-.23-.332c-.709-1.029-2.289-1.373-3.867-1.373-3.619 0-6.709 2.741-7.311 6.586-.312 1.918.131 3.752 1.219 5.031 1 1.176 2.426 1.666 4.125 1.666 2.916 0 4.533-1.875 4.533-1.875l-.146.91a.57.57 0 0 0 .564.66h2.949a.95.95 0 0 0 .938-.803l1.771-11.209a.571.571 0 0 0-.565-.658zm-4.565 6.374c-.314 1.871-1.801 3.127-3.695 3.127-.949 0-1.711-.305-2.199-.883-.484-.574-.666-1.391-.514-2.301.297-1.855 1.805-3.152 3.67-3.152.93 0 1.686.309 2.184.892.501.589.699 1.411.554 2.317zM119.295 7.23l-2.807 17.858a.569.569 0 0 0 .562.658h2.822c.469 0 .867-.34.939-.803l2.768-17.536a.57.57 0 0 0-.562-.659h-3.16a.571.571 0 0 0-.562.482z" />
            </svg>
          </div>
          <Alert className="bg-blue-50 border-blue-200 text-blue-800">
            <AlertDescription className="text-blue-700 text-sm">
              Click the "Pay with PayPal" button below to complete your payment securely through PayPal. You can pay
              using your PayPal balance, bank account, or credit card.
            </AlertDescription>
          </Alert>
          <div className="flex items-center gap-2 mt-2">
            <Shield className="h-4 w-4 text-blue-600" />
            <span className="text-xs text-muted-foreground">
              PayPal protects your financial information with industry-leading security
            </span>
          </div>
        </div>
      ),
    },
  }

  return (
    <div className="p-2">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
          <p className="text-muted-foreground">Make secure payments and manage your transaction history</p>
        </div>

        <Tabs defaultValue="make-payment" className="w-full">
          <TabsList className="w-full grid grid-cols-3 h-auto p-1 ">
            <TabsTrigger
              value="make-payment"
              className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <CreditCard className="h-4 w-4" />
              <span>Make Payment</span>
            </TabsTrigger>
            <TabsTrigger
              value="e-wallet"
              className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Wallet className="h-4 w-4" />
              <span>E-Wallet</span>
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <History className="h-4 w-4" />
              <span>Payment History</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="make-payment" className="space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader className="pb-0">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Make a Payment</CardTitle>
                    <CardDescription>Select payment details and choose your preferred payment method</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    <BadgeCheck className="mr-1 h-3 w-3" />
                    Secure Payment
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <Card className="border">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <Badge className="rounded-md text-xs font-bold text-white text-center">1</Badge>
                          Payment Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="payment-type">Payment Type</Label>
                          <Select>
                            <SelectTrigger id="payment-type">
                              <SelectValue placeholder="Select payment type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="tuition">Tuition Fee</SelectItem>
                              <SelectItem value="accommodation">Accommodation Fee</SelectItem>
                              <SelectItem value="library">Library Fee</SelectItem>
                              <SelectItem value="examination">Examination Fee</SelectItem>
                              <SelectItem value="other">Other Fees</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="amount">Amount (KSh)</Label>
                          <Input id="amount" placeholder="Enter amount" type="number" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="reference">Payment Reference (Optional)</Label>
                          <Input id="reference" placeholder="e.g., Tuition for Semester 1" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <Badge className="rounded-md text-xs font-bold text-white text-center">2</Badge>
                          Select Payment Method
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <RadioGroup
                          defaultValue="mpesa"
                          value={paymentMethod}
                          onValueChange={(value: string) => setPaymentMethod(value as PaymentMethodType)}
                          className="grid grid-cols-2 gap-3"
                        >
                          <div className="relative">
                            <RadioGroupItem value="mpesa" id="mpesa" className="peer sr-only" />
                            <Label
                              htmlFor="mpesa"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <Phone className="mb-2 h-6 w-6 text-green-600" />
                              <span className="text-sm font-medium">M-Pesa</span>
                            </Label>
                          </div>

                          <div className="relative">
                            <RadioGroupItem value="card" id="card" className="peer sr-only" />
                            <Label
                              htmlFor="card"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <CreditCard className="mb-2 h-6 w-6 text-blue-600" />
                              <span className="text-sm font-medium">Card</span>
                            </Label>
                          </div>

                          <div className="relative">
                            <RadioGroupItem value="bank" id="bank" className="peer sr-only" />
                            <Label
                              htmlFor="bank"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <Landmark className="mb-2 h-6 w-6 text-purple-600" />
                              <span className="text-sm font-medium">Bank Transfer</span>
                            </Label>
                          </div>

                          <div className="relative">
                            <RadioGroupItem value="paypal" id="paypal" className="peer sr-only" />
                            <Label
                              htmlFor="paypal"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <svg className="mb-2 h-6 w-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.566 6.082-8.558 6.082h-2.19a1.87 1.87 0 0 0-1.846 1.582l-1.12 7.106c-.068.415.206.81.628.81h4.606c.524 0 .968-.382 1.05-.9l.43-2.72c.068-.419.512-.9 1.037-.9h.653c4.299 0 7.664-1.747 8.647-6.797.428-2.188.183-3.713-.7-4.976z" />
                              </svg>
                              <span className="text-sm font-medium">PayPal</span>
                            </Label>
                          </div>
                        </RadioGroup>
                      </CardContent>
                    </Card>

                    <Card className="border">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <Badge className="rounded-md text-xs font-bold text-white text-center">3</Badge>
                          Complete Payment
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Button className={`w-full gap-2 ${paymentMethodContent[paymentMethod].buttonClass}`}>
                          {paymentMethodContent[paymentMethod].buttonIcon}
                          {paymentMethodContent[paymentMethod].buttonText}
                        </Button>
                        <p className="text-xs text-center text-muted-foreground mt-2">
                          By proceeding, you agree to our payment terms and conditions
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-6">
                    <Card className="border">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          {paymentMethodContent[paymentMethod].icon}
                          {paymentMethodContent[paymentMethod].title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>{paymentMethodContent[paymentMethod].content}</CardContent>
                    </Card>

                    <Card className="border">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <Receipt className="h-4 w-4 text-blue-600" />
                          Payment Summary
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Outstanding Balance:</span>
                          <span className="font-medium">KSh 40,000</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Next Due Payment:</span>
                          <span className="font-medium">KSh 20,000</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Due Date:</span>
                          <span className="font-medium">April 30, 2024</span>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="font-medium">Payment Progress</span>
                            <span className="font-medium">66%</span>
                          </div>
                          <Progress value={66} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>

                    <Alert className="bg-blue-50 border-blue-200 text-blue-800">
                      <BadgeCheck className="h-4 w-4 text-blue-600" />
                      <AlertTitle>Secure Payment</AlertTitle>
                      <AlertDescription className="text-blue-700 text-sm">
                        All payment information is encrypted and processed securely. We never store your payment
                        details.
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <BadgeCheck className="h-4 w-4 text-green-600" />
                    Accepted Payment Methods
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="outline" >
                      <Phone className="mr-1 h-3 w-3 text-green-600" />
                      M-Pesa
                    </Badge>
                    <Badge variant="outline" >
                      <CreditCard className="mr-1 h-3 w-3 text-blue-600" />
                      Visa
                    </Badge>
                    <Badge variant="outline" >
                      <CreditCard className="mr-1 h-3 w-3 text-red-600" />
                      Mastercard
                    </Badge>
                    <Badge variant="outline" >
                      <svg className="mr-1 h-3 w-3 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.566 6.082-8.558 6.082h-2.19a1.87 1.87 0 0 0-1.846 1.582l-1.12 7.106c-.068.415.206.81.628.81h4.606c.524 0 .968-.382 1.05-.9l.43-2.72c.068-.419.512-.9 1.037-.9h.653c4.299 0 7.664-1.747 8.647-6.797.428-2.188.183-3.713-.7-4.976z" />
                      </svg>
                      PayPal
                    </Badge>
                    <Badge variant="outline" >
                      <Landmark className="mr-1 h-3 w-3 text-purple-600" />
                      Bank Transfer
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4 text-amber-600" />
                    Processing Times
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">M-Pesa:</span>
                      <span>Within 24 hours</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Card Payment:</span>
                      <span>Immediate</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Bank Transfer:</span>
                      <span>2-3 business days</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">PayPal:</span>
                      <span>Immediate</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    Need Help?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Having trouble with your payment? Contact our finance office for assistance.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="e-wallet" >
            <Card className="border-none shadow-md">
              <CardHeader className="pb-0">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>E-Wallet</CardTitle>
                    <CardDescription>Manage your university e-wallet for campus services</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                    <Wallet className="mr-1 h-3 w-3" />
                    Balance: KSh 1,250
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">KSh 1,250</div>
                      <p className="text-xs text-muted-foreground mt-1">Last updated: Today, 10:45 AM</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">This Month's Spending</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">KSh 750</div>
                      <p className="text-xs text-muted-foreground mt-1">4 transactions this month</p>
                    </CardContent>
                  </Card>
                  <Card >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Available Credit</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">KSh 1,250</div>
                      <p className="text-xs text-muted-foreground mt-1">Usable at campus facilities</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1 space-y-4">
                    <Card className="border">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <Wallet className="h-4 w-4 text-purple-600" />
                          Top-up E-Wallet
                        </CardTitle>
                        <CardDescription>Add funds to your campus e-wallet</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="topup-amount">Amount (KSh)</Label>
                          <Input id="topup-amount" placeholder="Enter amount" type="number" />
                        </div>

                        <div className="space-y-2">
                          <Label>Payment Method</Label>
                          <RadioGroup
                            defaultValue="mpesa"
                            value={walletPaymentMethod}
                            onValueChange={(value: string) => setWalletPaymentMethod(value as PaymentMethodType)}
                            className="grid grid-cols-2 gap-2"
                          >
                            <div className="relative">
                              <RadioGroupItem value="mpesa" id="wallet-mpesa" className="peer sr-only" />
                              <Label
                                htmlFor="wallet-mpesa"
                                className="flex items-center justify-center gap-2 rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                              >
                                <Phone className="h-4 w-4 text-green-600" />
                                <span className="text-sm">M-Pesa</span>
                              </Label>
                            </div>
                            <div className="relative">
                              <RadioGroupItem value="card" id="wallet-card" className="peer sr-only" />
                              <Label
                                htmlFor="wallet-card"
                                className="flex items-center justify-center gap-2 rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                              >
                                <CreditCard className="h-4 w-4 text-blue-600" />
                                <span className="text-sm">Card</span>
                              </Label>
                            </div>
                            <div className="relative">
                              <RadioGroupItem value="paypal" id="wallet-paypal" className="peer sr-only" />
                              <Label
                                htmlFor="wallet-paypal"
                                className="flex items-center justify-center gap-2 rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                              >
                                <svg className="h-4 w-4 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.566 6.082-8.558 6.082h-2.19a1.87 1.87 0 0 0-1.846 1.582l-1.12 7.106c-.068.415.206.81.628.81h4.606c.524 0 .968-.382 1.05-.9l.43-2.72c.068-.419.512-.9 1.037-.9h.653c4.299 0 7.664-1.747 8.647-6.797.428-2.188.183-3.713-.7-4.976z" />
                                </svg>
                                <span className="text-sm">PayPal</span>
                              </Label>
                            </div>
                            <div className="relative">
                              <RadioGroupItem value="bank" id="wallet-bank" className="peer sr-only" />
                              <Label
                                htmlFor="wallet-bank"
                                className="flex items-center justify-center gap-2 rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                              >
                                <Landmark className="h-4 w-4 text-purple-600" />
                                <span className="text-sm">Bank</span>
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        {walletPaymentMethod === "mpesa" && (
                          <div className="rounded-md border p-3 bg-muted/20">
                            <div className="text-xs text-muted-foreground space-y-1">
                              <p>1. Go to M-Pesa on your phone</p>
                              <p>2. Select "Lipa na M-Pesa" then "Pay Bill"</p>
                              <p>
                                3. Enter Business No: <span className="font-medium">123456</span>
                              </p>
                              <p>
                                4. Account No: <span className="font-medium">Your Student ID</span>
                              </p>
                              <p>5. Enter amount and confirm</p>
                            </div>
                          </div>
                        )}

                        {walletPaymentMethod === "card" && (
                          <div className="space-y-2">
                            <div className="space-y-1">
                              <Label htmlFor="wallet-card-number" className="text-xs">
                                Card Number
                              </Label>
                              <Input id="wallet-card-number" placeholder="1234 5678 9012 3456" />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="space-y-1">
                                <Label htmlFor="wallet-expiry" className="text-xs">
                                  Expiry Date
                                </Label>
                                <Input id="wallet-expiry" placeholder="MM/YY" />
                              </div>
                              <div className="space-y-1">
                                <Label htmlFor="wallet-cvv" className="text-xs">
                                  CVV
                                </Label>
                                <Input id="wallet-cvv" placeholder="123" type="password" />
                              </div>
                            </div>
                          </div>
                        )}

                        {walletPaymentMethod === "paypal" && (
                          <div className="rounded-md border p-3 bg-muted/20 text-center">
                            <svg
                              className="h-6 w-auto mx-auto text-[#0070ba] mb-2"
                              viewBox="0 0 124 33"
                              fill="currentColor"
                            >
                              <path d="M46.211 6.749h-6.839a.95.95 0 0 0-.939.802l-2.766 17.537a.57.57 0 0 0 .564.658h3.265a.95.95 0 0 0 .939-.803l.746-4.73a.95.95 0 0 1 .938-.803h2.165c4.505 0 7.105-2.18 7.784-6.5.306-1.89.013-3.375-.872-4.415-.97-1.142-2.694-1.746-4.985-1.746zM47 13.154c-.374 2.454-2.249 2.454-4.062 2.454h-1.032l.724-4.583a.57.57 0 0 1 .563-.481h.473c1.235 0 2.4 0 3.002.704.359.42.469 1.044.332 1.906zM66.654 13.075h-3.275a.57.57 0 0 0-.563.481l-.145.916-.229-.332c-.709-1.029-2.29-1.373-3.868-1.373-3.619 0-6.71 2.741-7.312 6.586-.313 1.918.132 3.752 1.22 5.031.998 1.176 2.426 1.666 4.125 1.666 2.916 0 4.533-1.875 4.533-1.875l-.146.91a.57.57 0 0 0 .562.66h2.95a.95.95 0 0 0 .939-.803l1.77-11.209a.568.568 0 0 0-.561-.658zm-4.565 6.374c-.316 1.871-1.801 3.127-3.695 3.127-.951 0-1.711-.305-2.199-.883-.484-.574-.668-1.391-.514-2.301.295-1.855 1.805-3.152 3.67-3.152.93 0 1.686.309 2.184.892.499.589.697 1.411.554 2.317zM84.096 13.075h-3.291a.954.954 0 0 0-.787.417l-4.539 6.686-1.924-6.425a.953.953 0 0 0-.912-.678h-3.234a.57.57 0 0 0-.541.754l3.625 10.638-3.408 4.811a.57.57 0 0 0 .465.9h3.287a.949.949 0 0 0 .781-.408l10.946-15.8a.57.57 0 0 0-.468-.895z" />
                              <path d="M94.992 6.749h-6.84a.95.95 0 0 0-.938.802l-2.766 17.537a.569.569 0 0 0 .562.658h3.51a.665.665 0 0 0 .656-.562l.785-4.971a.95.95 0 0 1 .938-.803h2.164c4.506 0 7.105-2.18 7.785-6.5.307-1.89.012-3.375-.873-4.415-.971-1.142-2.694-1.746-4.983-1.746zm.789 6.405c-.373 2.454-2.248 2.454-4.062 2.454h-1.031l.725-4.583a.568.568 0 0 1 .562-.481h.473c1.234 0 2.4 0 3.002.704.359.42.468 1.044.331 1.906zM115.434 13.075h-3.273a.567.567 0 0 0-.562.481l-.145.916-.23-.332c-.709-1.029-2.289-1.373-3.867-1.373-3.619 0-6.709 2.741-7.311 6.586-.312 1.918.131 3.752 1.219 5.031 1 1.176 2.426 1.666 4.125 1.666 2.916 0 4.533-1.875 4.533-1.875l-.146.91a.57.57 0 0 0 .564.66h2.949a.95.95 0 0 0 .938-.803l1.771-11.209a.571.571 0 0 0-.565-.658zm-4.565 6.374c-.314 1.871-1.801 3.127-3.695 3.127-.949 0-1.711-.305-2.199-.883-.484-.574-.666-1.391-.514-2.301.297-1.855 1.805-3.152 3.67-3.152.93 0 1.686.309 2.184.892.501.589.699 1.411.554 2.317zM119.295 7.23l-2.807 17.858a.569.569 0 0 0 .562.658h2.822c.469 0 .867-.34.939-.803l2.768-17.536a.57.57 0 0 0-.562-.659h-3.16a.571.571 0 0 0-.562.482z" />
                            </svg>
                            <p className="text-xs text-muted-foreground">
                              Click the button below to complete your payment with PayPal
                            </p>
                          </div>
                        )}

                        {walletPaymentMethod === "bank" && (
                          <div className="rounded-md border p-3 bg-muted/20">
                            <div className="text-xs space-y-1">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Bank:</span>
                                <span className="font-medium">Kenya Commercial Bank</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Account:</span>
                                <span className="font-medium">1234567890</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Reference:</span>
                                <span className="font-medium">Your Student ID</span>
                              </div>
                            </div>
                          </div>
                        )}

                        <Button
                          className={`w-full gap-2 ${
                            walletPaymentMethod === "mpesa"
                              ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                              : walletPaymentMethod === "card"
                                ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                                : walletPaymentMethod === "paypal"
                                  ? "bg-[#0070ba] hover:bg-[#005ea6]"
                                  : "bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
                          }`}
                        >
                          {walletPaymentMethod === "mpesa" && <Phone className="h-4 w-4" />}
                          {walletPaymentMethod === "card" && <CreditCard className="h-4 w-4" />}
                          {walletPaymentMethod === "paypal" && (
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.566 6.082-8.558 6.082h-2.19a1.87 1.87 0 0 0-1.846 1.582l-1.12 7.106c-.068.415.206.81.628.81h4.606c.524 0 .968-.382 1.05-.9l.43-2.72c.068-.419.512-.9 1.037-.9h.653c4.299 0 7.664-1.747 8.647-6.797.428-2.188.183-3.713-.7-4.976z" />
                            </svg>
                          )}
                          {walletPaymentMethod === "bank" && <Landmark className="h-4 w-4" />}
                          Top-up E-Wallet
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Quick Top-up</CardTitle>
                      </CardHeader>
                      <CardContent className="grid grid-cols-3 gap-2">
                        <Button variant="outline" size="sm">
                          KSh 500
                        </Button>
                        <Button variant="outline" size="sm">
                          KSh 1,000
                        </Button>
                        <Button variant="outline" size="sm">
                          KSh 2,000
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="md:col-span-2">
                    <Card className="border h-full">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm font-medium">Recent E-Wallet Transactions</CardTitle>
                          <div className="flex items-center gap-2">
                            <Select defaultValue="all">
                              <SelectTrigger className="h-8 w-[130px]">
                                <SelectValue placeholder="Filter" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Transactions</SelectItem>
                                <SelectItem value="topup">Top-ups</SelectItem>
                                <SelectItem value="spend">Spending</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button variant="ghost" size="sm" className="gap-1 text-xs">
                              View All
                              <ChevronRight className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
                                <BanknoteIcon className="h-4 w-4 text-red-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">Printing Services</p>
                                <p className="text-xs text-muted-foreground">April 5, 2024</p>
                              </div>
                            </div>
                            <span className="font-medium text-red-600">-KSh 150</span>
                          </div>

                          <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
                                <BanknoteIcon className="h-4 w-4 text-red-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">Cafeteria Purchase</p>
                                <p className="text-xs text-muted-foreground">April 2, 2024</p>
                              </div>
                            </div>
                            <span className="font-medium text-red-600">-KSh 300</span>
                          </div>

                          <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                                <Phone className="h-4 w-4 text-green-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">M-Pesa Top-up</p>
                                <p className="text-xs text-muted-foreground">March 28, 2024</p>
                              </div>
                            </div>
                            <span className="font-medium text-green-600">+KSh 1,000</span>
                          </div>

                          <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
                                <BanknoteIcon className="h-4 w-4 text-red-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">ID Replacement</p>
                                <p className="text-xs text-muted-foreground">March 25, 2024</p>
                              </div>
                            </div>
                            <span className="font-medium text-red-600">-KSh 300</span>
                          </div>

                          <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                                <CreditCard className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">Card Top-up</p>
                                <p className="text-xs text-muted-foreground">March 20, 2024</p>
                              </div>
                            </div>
                            <span className="font-medium text-green-600">+KSh 2,000</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card className="border-none shadow-md">
              <CardHeader className="pb-0">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Payment History</CardTitle>
                    <CardDescription>View all your past payments and transactions</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="bg-muted/30 p-4 rounded-lg mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="filter-date">Date Range</Label>
                      <Select>
                        <SelectTrigger id="filter-date">
                          <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Time</SelectItem>
                          <SelectItem value="this-month">This Month</SelectItem>
                          <SelectItem value="last-month">Last Month</SelectItem>
                          <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                          <SelectItem value="last-6-months">Last 6 Months</SelectItem>
                          <SelectItem value="this-year">This Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="filter-type">Payment Type</Label>
                      <Select>
                        <SelectTrigger id="filter-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="tuition">Tuition</SelectItem>
                          <SelectItem value="accommodation">Accommodation</SelectItem>
                          <SelectItem value="library">Library</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="filter-method">Payment Method</Label>
                      <Select>
                        <SelectTrigger id="filter-method">
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Methods</SelectItem>
                          <SelectItem value="mpesa">M-Pesa</SelectItem>
                          <SelectItem value="card">Card Payment</SelectItem>
                          <SelectItem value="bank">Bank Transfer</SelectItem>
                          <SelectItem value="paypal">PayPal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="filter-status">Status</Label>
                      <Select>
                        <SelectTrigger id="filter-status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader className="bg-muted/30">
                      <TableRow>
                        <TableHead>
                          <Button variant="ghost" size="sm" className="gap-1 -ml-4 font-medium">
                            Date
                            <ArrowUpDown className="h-3 w-3" />
                          </Button>
                        </TableHead>
                        <TableHead>Reference</TableHead>
                        <TableHead>Payment Method</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Amount (KSh)</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>March 15, 2024</TableCell>
                        <TableCell>TRX123456</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <Phone className="mr-1 h-3 w-3" />
                            M-Pesa
                          </Badge>
                        </TableCell>
                        <TableCell>Tuition Payment</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Completed
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">20,000</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Receipt className="h-4 w-4" />
                            <span className="sr-only">Download Receipt</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>February 28, 2024</TableCell>
                        <TableCell>HELB78945</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                            <BadgeDollarSign className="mr-1 h-3 w-3" />
                            HELB
                          </Badge>
                        </TableCell>
                        <TableCell>HELB Disbursement</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Completed
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">30,000</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Receipt className="h-4 w-4" />
                            <span className="sr-only">Download Receipt</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>February 10, 2024</TableCell>
                        <TableCell>TRX123123</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <Phone className="mr-1 h-3 w-3" />
                            M-Pesa
                          </Badge>
                        </TableCell>
                        <TableCell>Library Fine Payment</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Completed
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">500</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Receipt className="h-4 w-4" />
                            <span className="sr-only">Download Receipt</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>January 20, 2024</TableCell>
                        <TableCell>TRX122456</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                            <Landmark className="mr-1 h-3 w-3" />
                            Bank Transfer
                          </Badge>
                        </TableCell>
                        <TableCell>Accommodation Fee</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Completed
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">15,000</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Receipt className="h-4 w-4" />
                            <span className="sr-only">Download Receipt</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>January 5, 2024</TableCell>
                        <TableCell>TRX121456</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            <CreditCard className="mr-1 h-3 w-3" />
                            Credit Card
                          </Badge>
                        </TableCell>
                        <TableCell>Tuition Payment</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Completed
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">30,000</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Receipt className="h-4 w-4" />
                            <span className="sr-only">Download Receipt</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>December 15, 2023</TableCell>
                        <TableCell>TRX120789</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            <svg className="mr-1 h-3 w-3 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.566 6.082-8.558 6.082h-2.19a1.87 1.87 0 0 0-1.846 1.582l-1.12 7.106c-.068.415.206.81.628.81h4.606c.524 0 .968-.382 1.05-.9l.43-2.72c.068-.419.512-.9 1.037-.9h.653c4.299 0 7.664-1.747 8.647-6.797.428-2.188.183-3.713-.7-4.976z" />
                            </svg>
                            PayPal
                          </Badge>
                        </TableCell>
                        <TableCell>Tuition Payment</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Completed
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">25,000</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Receipt className="h-4 w-4" />
                            <span className="sr-only">Download Receipt</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-muted-foreground">Showing 6 of 24 transactions</div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Card className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <LineChart className="h-4 w-4 text-blue-600" />
                        Payment Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Total Paid (2024):</span>
                          <span className="font-medium">KSh 95,500</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Last Payment:</span>
                          <span className="font-medium">March 15, 2024</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Most Used Method:</span>
                          <span className="font-medium">M-Pesa</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Receipt className="h-4 w-4 text-green-600" />
                        Receipts
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                          <Download className="h-4 w-4" />
                          Download All Receipts
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                          <Download className="h-4 w-4" />
                          Download Payment Statement
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-600" />
                        Need Help?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        Can't find a transaction or have a payment issue?
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        Report Missing Transaction
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
