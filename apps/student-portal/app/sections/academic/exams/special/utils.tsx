import { format, parseISO, differenceInDays, isAfter, isBefore } from "date-fns"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle,
  CalendarClock,
  Clock,
  BookOpen,
  CheckCircle2,
  X,
  Save,
  Wallet,
  Calendar,
  Search,
  FilePlus,
  FileText,
  Ban,
  HelpCircle,
} from "lucide-react"

export const formatDate = (dateString: string, formatStr = "dd MMM yyyy"): string => {
  try {
    return format(parseISO(dateString), formatStr)
  } catch (error) {
    return dateString
  }
}

export const getDaysRemaining = (deadlineDate: string): number => {
  const deadline = parseISO(deadlineDate)
  const today = new Date()
  return differenceInDays(deadline, today)
}

export const getUrgencyLevel = (daysRemaining: number): "low" | "medium" | "high" | "critical" => {
  if (daysRemaining <= 1) return "critical"
  if (daysRemaining <= 3) return "high"
  if (daysRemaining <= 7) return "medium"
  return "low"
}

export const getUrgencyBadge = (deadlineDate: string) => {
  const daysRemaining = getDaysRemaining(deadlineDate)
  const urgencyLevel = getUrgencyLevel(daysRemaining)

  switch (urgencyLevel) {
    case "critical":
      return (
        <Badge variant="destructive" className="animate-pulse">
          <AlertTriangle className="h-3 w-3 mr-1" />
          {daysRemaining <= 0 ? "Due Today" : "Due Tomorrow"}
        </Badge>
      )
    case "high":
      return (
        <Badge variant="outline" className="text-orange-600 bg-orange-50">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Due in {daysRemaining} days
        </Badge>
      )
    case "medium":
      return (
        <Badge variant="outline" className="text-amber-600 bg-amber-50">
          <Clock className="h-3 w-3 mr-1" />
          Due in {daysRemaining} days
        </Badge>
      )
    case "low":
      return (
        <Badge variant="outline" className="text-blue-600 bg-blue-50">
          <Calendar className="h-3 w-3 mr-1" />
          Due in {daysRemaining} days
        </Badge>
      )
    default:
      return null
  }
}

export const getRequestTypeBadge = (type: string) => {
  switch (type.toLowerCase()) {
    case "deferred":
      return (
        <Badge variant="outline" className="text-blue-600 bg-blue-50">
          <CalendarClock className="h-3 w-3 mr-1" />
          Deferred
        </Badge>
      )
    case "special-sitting":
    case "special sitting":
      return (
        <Badge variant="outline" className="text-purple-600 bg-purple-50">
          <Clock className="h-3 w-3 mr-1" />
          Special Sitting
        </Badge>
      )
    case "supplementary":
      return (
        <Badge variant="outline" className="text-amber-600 bg-amber-50">
          <BookOpen className="h-3 w-3 mr-1" />
          Supplementary
        </Badge>
      )
    default:
      return (
        <Badge variant="outline">
          <HelpCircle className="h-3 w-3 mr-1" />
          {type}
        </Badge>
      )
  }
}

export const getRequestStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return (
        <Badge variant="outline" className="text-blue-600 bg-blue-50">
          <Clock className="h-3 w-3 mr-1" />
          Pending
        </Badge>
      )
    case "under-review":
    case "under review":
      return (
        <Badge variant="outline" className="text-purple-600 bg-purple-50">
          <Search className="h-3 w-3 mr-1" />
          Under Review
        </Badge>
      )
    case "awaiting-payment":
    case "awaiting payment":
    case "not paid":
      return (
        <Badge variant="outline" className="text-amber-600 bg-amber-50">
          <Wallet className="h-3 w-3 mr-1" />
          Awaiting Payment
        </Badge>
      )
    case "approved":
      return (
        <Badge className="bg-green-500 hover:bg-green-600">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Approved
        </Badge>
      )
    case "scheduled":
      return (
        <Badge className="bg-green-500 hover:bg-green-600">
          <Calendar className="h-3 w-3 mr-1" />
          Scheduled
        </Badge>
      )
    case "rejected":
      return (
        <Badge variant="destructive">
          <X className="h-3 w-3 mr-1" />
          Rejected
        </Badge>
      )
    case "draft":
      return (
        <Badge variant="secondary">
          <Save className="h-3 w-3 mr-1" />
          Draft
        </Badge>
      )
    case "cancelled":
      return (
        <Badge variant="outline" className="text-gray-600 bg-gray-100">
          <Ban className="h-3 w-3 mr-1" />
          Cancelled
        </Badge>
      )
    case "paid":
      return (
        <Badge className="bg-green-500 hover:bg-green-600">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Paid
        </Badge>
      )
    default:
      return (
        <Badge variant="outline">
          <FileText className="h-3 w-3 mr-1" />
          {status}
        </Badge>
      )
  }
}

export const getApprovalStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return (
        <Badge variant="outline" className="text-blue-600 bg-blue-50">
          <Clock className="h-3 w-3 mr-1" />
          Pending
        </Badge>
      )
    case "approved":
      return (
        <Badge className="bg-green-500 hover:bg-green-600">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Approved
        </Badge>
      )
    case "rejected":
      return (
        <Badge variant="destructive">
          <X className="h-3 w-3 mr-1" />
          Rejected
        </Badge>
      )
    case "awaiting-documents":
    case "awaiting documents":
      return (
        <Badge variant="outline" className="text-amber-600 bg-amber-50">
          <FilePlus className="h-3 w-3 mr-1" />
          Awaiting Documents
        </Badge>
      )
    case "under-review":
    case "under review":
      return (
        <Badge variant="outline" className="text-purple-600 bg-purple-50">
          <Search className="h-3 w-3 mr-1" />
          Under Review
        </Badge>
      )
    default:
      return (
        <Badge variant="outline">
          <FileText className="h-3 w-3 mr-1" />
          {status}
        </Badge>
      )
  }
}

export const getNotificationIcon = (type:any) => {
  switch (type) {
    case "info":
      return <Clock className="h-5 w-5 text-blue-500" />
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-amber-500" />
    case "success":
      return <CheckCircle2 className="h-5 w-5 text-green-500" />
    case "error":
      return <X className="h-5 w-5 text-red-500" />
    default:
      return <FileText className="h-5 w-5 text-gray-500" />
  }
}

export const calculateTotalFee = (courses: string[], feePerUnit = 2500): number => {
  return courses.length * 3 * feePerUnit
}

export const formatCurrency = (amount: number, currency = "KES"): string => {
  return `${currency} ${amount.toLocaleString()}`
}

export const isDateValid = (dateString: string): boolean => {
  const date = new Date(dateString)
  return !isNaN(date.getTime())
}

export const getExamPeriodStatus = (startDate: string, endDate: string): "upcoming" | "ongoing" | "past" => {
  const today = new Date()
  const start = parseISO(startDate)
  const end = parseISO(endDate)

  if (isBefore(today, start)) return "upcoming"
  if (isAfter(today, end)) return "past"
  return "ongoing"
}

export const getReadableFileSize = (sizeInBytes: number): string => {
  if (sizeInBytes < 1024) return `${sizeInBytes} bytes`
  if (sizeInBytes < 1024 * 1024) return `${(sizeInBytes / 1024).toFixed(1)} KB`
  return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`
}

