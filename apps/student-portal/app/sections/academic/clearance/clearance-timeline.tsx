"use client"

import { format } from "date-fns"
import { CheckCircle, Clock, XCircle } from "lucide-react"
import { motion } from "framer-motion"

interface Department {
  name: string
  status: string
  comment: string
  approvedBy: string
  approvedAt: string
}

interface ClearanceTimelineProps {
  departments: Department[]
}

export function ClearanceTimeline({ departments }: ClearanceTimelineProps) {
  // Sort departments by status (approved first, then pending)
  const sortedDepartments = [...departments].sort((a, b) => {
    if (a.status === "approved" && b.status !== "approved") return -1
    if (a.status !== "approved" && b.status === "approved") return 1
    return 0
  })

  return (
    <div className="space-y-4">
      <ol className="relative border-l border-border">
        {sortedDepartments.map((dept, index) => (
          <motion.li
            key={dept.name}
            className="mb-6 ml-6 last:mb-0"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-background">
              {dept.status === "approved" ? (
                <CheckCircle className="h-4 w-4 text-primary" />
              ) : dept.status === "rejected" ? (
                <XCircle className="h-4 w-4 text-destructive" />
              ) : (
                <Clock className="h-4 w-4 text-primary" />
              )}
            </span>
            <h3 className="mb-1 flex items-center text-base font-semibold text-foreground">
              {dept.name}
              {dept.status === "approved" && (
                <span className="ml-2 text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  Approved
                </span>
              )}
              {dept.status === "rejected" && (
                <span className="ml-2 text-xs font-medium text-destructive bg-destructive/10 px-2 py-0.5 rounded-full">
                  Rejected
                </span>
              )}
              {dept.status === "pending" && (
                <span className="ml-2 text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  Pending
                </span>
              )}
            </h3>

            {dept.status === "approved" && (
              <>
                <time className="mb-2 block text-sm font-normal text-muted-foreground">
                  Approved on {format(new Date(dept.approvedAt), "PPP")} by {dept.approvedBy}
                </time>
                {dept.comment && (
                  <p className="text-sm text-muted-foreground bg-muted p-2 rounded-md border border-border">
                    {dept.comment}
                  </p>
                )}
              </>
            )}

            {dept.status === "rejected" && dept.comment && (
              <>
                <time className="mb-2 block text-sm font-normal text-muted-foreground">
                  Rejected on {format(new Date(dept.approvedAt), "PPP")} by {dept.approvedBy}
                </time>
                <p className="text-sm text-destructive bg-destructive/10 p-2 rounded-md border border-destructive/20">{dept.comment}</p>
              </>
            )}
          </motion.li>
        ))}
      </ol>
    </div>
  )
}
