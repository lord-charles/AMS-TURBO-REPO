"use client"

import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SupplementaryExamForm } from "./supplementary-exam-form"
import { DeferredExamForm } from "./deferred-exam-form"
import { SpecialSittingForm } from "./special-sitting-form"
import { BookOpen, Calendar, Clock } from "lucide-react"

interface ApplyTabProps {
  selectedExamType: string | null
  setSelectedExamType: (type: string | null) => void
  onSubmit: (showPaymentDialog: boolean) => void
}

export function ApplyTab({ selectedExamType, setSelectedExamType, onSubmit }: ApplyTabProps) {
  if (!selectedExamType) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          className="hover:border-primary/50 transition-colors cursor-pointer"
          onClick={() => setSelectedExamType("supplementary")}
        >
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-primary" />
              Supplementary Exam
            </CardTitle>
            <CardDescription>For failed courses</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Apply for supplementary examinations for courses you have failed and wish to improve your grade.
            </p>
          </CardContent>
          <CardFooter>
            <Badge variant="outline">Fee: KES 2,500 per unit</Badge>
          </CardFooter>
        </Card>

        <Card
          className="hover:border-primary/50 transition-colors cursor-pointer"
          onClick={() => setSelectedExamType("deferred")}
        >
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-primary" />
              Deferred Exam
            </CardTitle>
            <CardDescription>For missed examinations</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Apply for deferred examinations if you missed an exam due to illness or other valid reasons.
            </p>
          </CardContent>
          <CardFooter>
            <Badge variant="outline">Fee: KES 1,500 per course</Badge>
          </CardFooter>
        </Card>

        <Card
          className="hover:border-primary/50 transition-colors cursor-pointer"
          onClick={() => setSelectedExamType("special")}
        >
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-primary" />
              Special Sitting
            </CardTitle>
            <CardDescription>For scheduling conflicts</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Apply for special sitting if you have a timetable clash or other approved circumstances.
            </p>
          </CardContent>
          <CardFooter>
            <Badge variant="outline">Fee: KES 3,000 per exam</Badge>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" onClick={() => setSelectedExamType(null)} className="mr-4">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h2 className="text-xl font-semibold">
          {selectedExamType === "supplementary" && "Supplementary Examination Application"}
          {selectedExamType === "deferred" && "Deferred Examination Application"}
          {selectedExamType === "special" && "Special Sitting Application"}
        </h2>
      </div>

      {selectedExamType === "supplementary" && <SupplementaryExamForm onSubmit={onSubmit} />}

      {selectedExamType === "deferred" && <DeferredExamForm onSubmit={onSubmit} />}

      {selectedExamType === "special" && <SpecialSittingForm onSubmit={onSubmit} />}
    </div>
  )
}

