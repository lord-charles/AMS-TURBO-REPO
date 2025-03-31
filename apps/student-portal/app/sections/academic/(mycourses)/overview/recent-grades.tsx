"use client"

import { Award } from "lucide-react"
import { format } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

export function RecentGrades() {
  const grades = [
    {
      id: "1",
      title: "Quiz 2",
      course: "CS301",
      courseTitle: "Data Structures & Algorithms",
      date: "2023-11-05",
      grade: "A",
      score: 92,
      outOf: 100,
    },
    {
      id: "2",
      title: "Assignment 3",
      course: "CS305",
      courseTitle: "Database Systems",
      date: "2023-11-02",
      grade: "B+",
      score: 85,
      outOf: 100,
    },
    {
      id: "3",
      title: "Midterm Exam",
      course: "MATH201",
      courseTitle: "Discrete Mathematics",
      date: "2023-10-25",
      grade: "A-",
      score: 88,
      outOf: 100,
    },
  ]

  const getGradeBadge = (grade: string) => {
    if (grade.startsWith("A")) {
      return <Badge className="bg-green-500 hover:bg-green-600">{grade}</Badge>
    } else if (grade.startsWith("B")) {
      return <Badge className="bg-blue-500 hover:bg-blue-600">{grade}</Badge>
    } else if (grade.startsWith("C")) {
      return <Badge variant="secondary">{grade}</Badge>
    } else {
      return <Badge variant="destructive">{grade}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          Recent Grades
        </CardTitle>
        <CardDescription>Your latest academic performance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {grades.map((grade, index) => (
            <div key={grade.id} className="space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-medium">{grade.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {grade.course}: {grade.courseTitle}
                  </div>
                </div>
                {getGradeBadge(grade.grade)}
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>
                    Score: {grade.score}/{grade.outOf}
                  </span>
                  <span className="text-muted-foreground">{format(new Date(grade.date), "MMM d, yyyy")}</span>
                </div>
                <Progress
                  value={(grade.score / grade.outOf) * 100}
                  className="h-2"
                  indicatorClassName={
                    grade.score >= 90
                      ? "bg-green-500"
                      : grade.score >= 80
                        ? "bg-blue-500"
                        : grade.score >= 70
                          ? "bg-amber-500"
                          : "bg-red-500"
                  }
                />
              </div>

              {index < grades.length - 1 && <Separator className="mt-3" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

