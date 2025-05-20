"use client"

import { Calendar, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export function SemesterProgress() {
  // Calculate days remaining in semester
  const today = new Date()
  const semesterEnd = new Date("2023-12-15")
  const totalDays = 120 
  const daysElapsed = Math.floor((today.getTime() - new Date("2023-09-01").getTime()) / (1000 * 60 * 60 * 24))
  const daysRemaining = Math.max(0, Math.floor((semesterEnd.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)))
  const progressPercentage = Math.min(100, Math.round((daysElapsed / totalDays) * 100))

  // Key semester milestones
  const milestones = [
    { name: "Course/Units Registration", date: "September 15, 2023", completed: true },
    { name: "Assignments", date: "September 30, 2023", completed: true },
    { name: "Cats Exams", date: "October 20-27, 2023", completed: true },
    { name: "Final Exams", date: "December 8-15, 2023", completed: false },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
           2023 Semester Two Progress
        </CardTitle>
        <CardDescription>Track your progress through the current semester</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="text-sm font-medium">Semester Progress</div>
            <div className="text-sm text-muted-foreground">{progressPercentage}% Complete</div>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <div>Sep 1</div>
            <div>Dec 15</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-2 bg-muted rounded-full">
            <Clock className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="text-sm font-medium">{daysRemaining} days remaining</div>
            <div className="text-xs text-muted-foreground">until end of semester</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Key Milestones</div>
          <div className="space-y-2.5">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${milestone.completed ? "bg-green-500" : "bg-amber-500"}`} />
                  <span className="text-sm">{milestone.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{milestone.date}</span>
                  {milestone.completed ? (
                    <Badge
                      variant="outline"
                      className="text-xs bg-green-500/10 text-green-500 hover:bg-green-500/20 hover:text-green-600"
                    >
                      Completed
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs">
                      Upcoming
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

