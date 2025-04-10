"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Bell, Calendar, Download, FileText, HelpCircle, Info, Printer, RefreshCw } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { OverviewTab } from "./overview-tab"
import { ApplyTab } from "./apply-tab"
import { ApplicationStatusTab } from "./application-status-tab"
import { HistoryTab } from "./history-tab"
import { PaymentDialog } from "./payment-dialog"
import { academicCalendarEvents, notifications } from "./mock-data"
import { formatDate } from "./utils"

export function SpecialExamsView() {
  // Tab state
  const [activeTab, setActiveTab] = useState("overview")

  // Application state
  const [selectedExamType, setSelectedExamType] = useState<string | null>(null)
  const [selectedApplication, setSelectedApplication] = useState(null)

  // Dialog states
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [showHelpDialog, setShowHelpDialog] = useState(false)

  // Find the next upcoming event
  const today = new Date()
  const upcomingEvents = academicCalendarEvents
    .filter((event) => new Date(event.startDate) > today)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())

  const nextEvent = upcomingEvents.length > 0 ? upcomingEvents[0] : null

  // Count unread notifications
  const unreadCount = notifications.filter((n) => !n.read).length

  // Handlers for overview tab
  const handleApplyClick = (examType: string) => {
    setSelectedExamType(examType)
    setActiveTab("apply")
  }

  // Handlers for apply tab
  const handleFormSubmit = (showPayment: boolean) => {
    if (showPayment) {
      setShowPaymentDialog(true)
    } else {
      setActiveTab("status")
    }
  }

  // Handlers for application status tab
  const handleViewApplication = (application: any) => {
    setSelectedApplication(application)
    console.log("View application:", application)
  }

  const handlePayNow = (application: any) => {
    setSelectedApplication(application)
    setShowPaymentDialog(true)
  }

  const handleCancelApplication = (application: any) => {
    console.log("Cancel application:", application)
  }

  const handlePrintApplication = (application: any) => {
    console.log("Print application:", application)
  }

  const handleTrackApplication = (application: any) => {
    console.log("Track application:", application)
  }

  const handleAppealDecision = (application: any) => {
    console.log("Appeal decision for application:", application)
  }

  // Handlers for history tab
  const handleDownloadReceipt = (application: any) => {
    console.log("Download receipt for application:", application)
  }

  const handleExportHistory = () => {
    console.log("Export application history")
  }

  const handleViewStatistics = () => {
    console.log("View application statistics")
  }

  // Handle payment completion
  const handlePaymentComplete = () => {
    setShowPaymentDialog(false)
    setActiveTab("status")
  }

  // Handle refresh data
  const handleRefreshData = () => {
    console.log("Refreshing data...")
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Special Examinations</h2>
          <p className="text-muted-foreground">
            Apply for and manage your supplementary, deferred, and special sitting examinations
          </p>
        </div>

        <div className="flex items-center gap-2">
          {nextEvent && (
            <Button variant="outline" className="hidden md:flex">
              <Calendar className="mr-2 h-4 w-4" />
              Next Deadline: {formatDate(nextEvent.startDate)}
            </Button>
          )}

   
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" onClick={() => setShowHelpDialog(true)}>
                  <HelpCircle className="h-4 w-4" />
                  <span className="sr-only md:not-sr-only md:ml-2">Help</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Get help with special examinations</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" onClick={handleRefreshData}>
                  <RefreshCw className="h-4 w-4" />
                  <span className="sr-only">Refresh</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Refresh data</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Mobile Alert for Upcoming Deadline */}
      {nextEvent && (
        <Alert className="md:hidden">
          <Calendar className="h-4 w-4" />
          <AlertTitle>Upcoming Deadline</AlertTitle>
          <AlertDescription>
            {nextEvent.title}: {formatDate(nextEvent.startDate)}
          </AlertDescription>
        </Alert>
      )}

      {/* Main Tabs */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="apply" disabled={!selectedExamType && activeTab !== "apply"}>
            Apply
          </TabsTrigger>
          <TabsTrigger value="status">Application Status</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <OverviewTab onApplyClick={handleApplyClick} />
        </TabsContent>

        <TabsContent value="apply" className="space-y-4">
          <ApplyTab
            selectedExamType={selectedExamType}
            setSelectedExamType={setSelectedExamType}
            onSubmit={handleFormSubmit}
          />
        </TabsContent>

        <TabsContent value="status" className="space-y-4">
          <ApplicationStatusTab
            onViewApplication={handleViewApplication}
            onPayNow={handlePayNow}
            onCancelApplication={handleCancelApplication}
            onPrintApplication={handlePrintApplication}
            onTrackApplication={handleTrackApplication}
            onAppealDecision={handleAppealDecision}
          />
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <HistoryTab
            onViewApplication={handleViewApplication}
            onDownloadReceipt={handleDownloadReceipt}
            onPrintApplication={handlePrintApplication}
            onExportHistory={handleExportHistory}
            onViewStatistics={handleViewStatistics}
          />
        </TabsContent>
      </Tabs>

      <Separator className="my-4" />

      {/* Important Information Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center">
            <Info className="h-4 w-4 mr-2" />
            Important Information
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Applications for special examinations must be submitted at least 2 weeks before the scheduled examination
              date.
            </li>
            <li>All applications require supporting documentation to be considered valid.</li>
            <li>Payment must be completed within 72 hours of application approval.</li>
            <li>For medical-related deferrals, a medical certificate from a registered practitioner is mandatory.</li>
            <li>Supplementary examinations are capped at a maximum grade of C.</li>
            <li>M-Pesa payments are processed within 24 hours. Bank transfers may take up to 3 working days.</li>
            <li>Special examination results are released with the regular examination results.</li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="link" className="p-0 h-auto text-sm">
              <FileText className="h-4 w-4 mr-2" />
              View Special Examinations Policy
            </Button>
            <Button variant="link" className="p-0 h-auto text-sm">
              <Download className="h-4 w-4 mr-2" />
              Download Application Guidelines
            </Button>
            <Button variant="link" className="p-0 h-auto text-sm">
              <Printer className="h-4 w-4 mr-2" />
              Print Fee Structure
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment Dialog */}
      <PaymentDialog
        open={showPaymentDialog}
        onOpenChange={setShowPaymentDialog}
        // application={selectedApplication}
        // onPaymentComplete={handlePaymentComplete}
      />

      {/* Help Dialog */}
      <Dialog open={showHelpDialog} onOpenChange={setShowHelpDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Special Examinations Help</DialogTitle>
            <DialogDescription>Get assistance with special examination applications</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="font-medium">Contact Information</h4>
              <p className="text-sm">
                Examinations Office: <br />
                Email: exams@university.ac.ke <br />
                Phone: +254 700 123 456 <br />
                Location: Administration Block, 2nd Floor, Room 205
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Office Hours</h4>
              <p className="text-sm">
                Monday - Friday: 8:00 AM - 5:00 PM <br />
                Saturday: 8:00 AM - 12:00 PM <br />
                Closed on Sundays and Public Holidays
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Common Issues</h4>
              <ul className="text-sm list-disc pl-5 space-y-1">
                <li>Payment verification delays</li>
                <li>Document upload problems</li>
                <li>Application status inquiries</li>
                <li>Special considerations</li>
              </ul>
            </div>
          </div>
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setShowHelpDialog(false)}>
              Close
            </Button>
            <Button>Contact Support</Button>
          </div>
        </DialogContent>
      </Dialog>


    </div>
  )
}

