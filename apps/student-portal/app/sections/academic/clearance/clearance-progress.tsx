"use client"

import { format } from "date-fns"
import { CheckCircle, Clock } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"

interface Department {
  name: string
  status: string
  comment: string
  approvedBy: string
  approvedAt: string
}

interface ClearanceProgressProps {
  departments: Department[]
  applicationDate: string
  status: string
}

export function ClearanceProgress({ departments, applicationDate, status }: ClearanceProgressProps) {
  const approvedCount = departments.filter((dept) => dept.status === "approved").length
  const progress = Math.round((approvedCount / departments.length) * 100)

  // Define the clearance journey steps
  const steps = [
    {
      id: "application",
      name: "Application Submitted",
      description: "Your clearance application has been received",
      date: applicationDate,
      completed: true,
    },
    {
      id: "processing",
      name: "Processing",
      description: "Your application is being processed by departments",
      date: "",
      completed: status === "in-progress" || status === "approved",
    },
    {
      id: "approval",
      name: "Final Approval",
      description: "All departments have approved your clearance",
      date: "",
      completed: status === "approved",
    },
    {
      id: "certificate",
      name: "Certificate Issued",
      description: "Your clearance certificate is ready",
      date: "",
      completed: status === "approved",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-foreground">Progress</span>
          <span className="text-sm font-medium text-foreground">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2 bg-muted" />
        <div className="flex justify-between text-xs text-muted-foreground pt-1">
          <span>Application</span>
          <span>Processing</span>
          <span>Approval</span>
          <span>Certificate</span>
        </div>
      </div>

      <div className="space-y-6 mt-8">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            className="flex items-start"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex flex-col items-center mr-4">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                  step.completed
                    ? "bg-primary/10 border-primary text-primary"
                    : "bg-muted border-muted-foreground/20 text-muted-foreground"
                }`}
              >
                {step.completed ? <CheckCircle className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
              </div>
              {index < steps.length - 1 && (
                <div className={`h-14 w-0.5 ${steps[index + 1].completed ? "bg-primary" : "bg-border"}`} />
              )}
            </div>
            <div className="pt-1 pb-8">
              <p className={`font-semibold ${step.completed ? "text-primary" : "text-muted-foreground"}`}>{step.name}</p>
              <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
              {step.date && <p className="text-xs text-muted-foreground mt-1">{format(new Date(step.date), "PPP")}</p>}

              {step.id === "processing" && status === "in-progress" && (
                <div className="mt-3 text-sm bg-primary/10 p-3 rounded-md border border-primary/20">
                  <p className="font-medium text-primary">Current Status:</p>
                  <p className="text-primary">
                    {approvedCount} of {departments.length} departments have approved your clearance
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
