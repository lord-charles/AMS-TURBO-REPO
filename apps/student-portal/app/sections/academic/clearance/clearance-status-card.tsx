"use client"

import { CheckCircle2, Clock, AlertCircle, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

interface Department {
  name: string
  status: string
  comment: string
  approvedBy: string
  approvedAt: string
}

interface ClearanceStatusCardProps {
  status: string
  departments: Department[]
}

export function ClearanceStatusCard({ status, departments }: ClearanceStatusCardProps) {
  const approvedCount = departments.filter((dept) => dept.status === "approved").length
  const pendingCount = departments.filter((dept) => dept.status === "pending").length
  const progress = Math.round((approvedCount / departments.length) * 100)

  const pendingDepartments = departments.filter((dept) => dept.status === "pending")

  return (
    <Card className="border-border shadow-sm overflow-hidden">
      <CardHeader className="pb-3 bg-muted border-b">
        <CardTitle className="text-lg font-semibold">Clearance Status</CardTitle>
        <CardDescription className="text-muted-foreground">Current status of your clearance application</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 p-5">
        <div className="flex items-center justify-between">
          <StatusBadge status={status} />
          <span className="text-sm font-semibold">{progress}% Complete</span>
        </div>

        <div className="space-y-1">
          <Progress value={progress} className="h-2 bg-muted" />
          <div className="flex justify-between text-xs text-muted-foreground pt-1">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Departments Approved</h4>
            <span className="text-sm font-semibold text-primary">
              {approvedCount} of {departments.length}
            </span>
          </div>


          <div className="space-y-2 mt-4">
            {departments.map((dept) => (
              <div
                key={dept.name}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <span className="text-sm text-foreground">{dept.name}</span>
                <DepartmentStatus status={dept.status} />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "pending":
      return (
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-medium">
          <Clock className="mr-1 h-3 w-3" /> Pending
        </Badge>
      )
    case "in-progress":
      return (
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-medium">
          <Clock className="mr-1 h-3 w-3" /> In Progress
        </Badge>
      )
    case "approved":
      return (
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-medium">
          <CheckCircle2 className="mr-1 h-3 w-3" /> Approved
        </Badge>
      )
    case "rejected":
      return (
        <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 font-medium">
          <AlertCircle className="mr-1 h-3 w-3" /> Rejected
        </Badge>
      )
    default:
      return null
  }
}

function DepartmentStatus({ status }: { status: string }) {
  switch (status) {
    case "pending":
      return (
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-medium">
          Pending
        </Badge>
      )
    case "approved":
      return (
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-medium">
          Approved
        </Badge>
      )
    case "rejected":
      return (
        <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 font-medium">
          Rejected
        </Badge>
      )
    default:
      return null
  }
}
