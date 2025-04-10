"use client"

import { format, parseISO } from "date-fns"
import { AlertTriangle, Eye, CreditCard, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { getDaysRemaining, getRequestStatusBadge, getRequestTypeBadge, getUrgencyBadge, getUrgencyLevel } from "./utils"
import type { RequestCardProps } from "./types"

export function RequestCard({ request, onSelect, onPayment, onAppeal, onPrint, onCancel }: RequestCardProps) {
  const daysRemaining = request.deadlineDate ? getDaysRemaining(request.deadlineDate) : null
  const urgencyLevel = daysRemaining !== null ? getUrgencyLevel(daysRemaining) : null

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm text-muted-foreground">{request.id}</span>
            <span className="mx-1">•</span>
            {request.courseCode}: {request.course}
          </div>
          {request.deadlineDate && urgencyLevel === "critical" && (
            <Badge variant="destructive" className="animate-pulse">
              <AlertTriangle className="h-3 w-3 mr-1" />
              {daysRemaining !== null && daysRemaining <= 0 ? "Due Today" : "Due Tomorrow"}
            </Badge>
          )}
        </CardTitle>
        <CardDescription className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getRequestTypeBadge(request.type)}
            <span className="text-sm text-muted-foreground">
              Submitted on {format(parseISO(request.submittedDate), "dd MMM yyyy")}
            </span>
          </div>
          {request.deadlineDate && urgencyLevel !== "critical" && getUrgencyBadge(request.deadlineDate)}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {getRequestStatusBadge(request.status)}
            {request.examDate && request.status !== "pending" && (
              <span className="text-sm">
                Exam:{" "}
                {typeof request.examDate === "string" && request.examDate !== "Pending"
                  ? format(parseISO(request.examDate), "dd MMM yyyy")
                  : request.examDate}
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
            <TooltipProvider>
              {request.status === "awaiting-payment" && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => onPayment(request)} className="h-8">
                      <CreditCard className="h-3.5 w-3.5 mr-1" />
                      Pay Now
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Complete payment to finalize your application</p>
                  </TooltipContent>
                </Tooltip>
              )}

              {request.status === "rejected" && !request.appealDetails && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => onAppeal(request)} className="h-8">
                      <FileText className="h-3.5 w-3.5 mr-1" />
                      Submit Appeal
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Submit an appeal for the rejected application</p>
                  </TooltipContent>
                </Tooltip>
              )}

              {["approved", "scheduled"].includes(request.status) && onPrint && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => onPrint(request)} className="h-8">
                      <FileText className="h-3.5 w-3.5 mr-1" />
                      Print
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Print your exam admission card</p>
                  </TooltipContent>
                </Tooltip>
              )}

              {["pending", "under-review", "draft"].includes(request.status) && onCancel && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onCancel(request)}
                      className="h-8 text-destructive hover:text-destructive"
                    >
                      Cancel
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Cancel this application</p>
                  </TooltipContent>
                </Tooltip>
              )}

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="sm" onClick={() => onSelect(request)} className="h-8">
                    <Eye className="h-3.5 w-3.5 mr-1" />
                    View Details
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View complete application details</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

