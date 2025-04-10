"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, FileText, BarChart3 } from "lucide-react"
import type { CourseGrade } from "./types"
import { getGradeColor, formatDate } from "./utils"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface CourseGradeItemProps {
  course: CourseGrade
  showDetails?: boolean
  onViewDetails?: (courseId: string) => void
  onRequestAppeal?: (courseId: string) => void
}

export function CourseGradeItem({ course, showDetails = false, onViewDetails, onRequestAppeal }: CourseGradeItemProps) {
  const isPending = course.status === "pending"
  const isWithheld = course.status === "withheld"
  const isAppealed = course.status === "appealed"
  const isRetake = course.isRetake

  // Calculate total score if available
  const hasScores = course.categoryScores && course.categoryWeights
  const totalScore = hasScores
    ? Object.entries(course.categoryScores || {}).reduce((sum, [key, score]) => {
        const weight = course.categoryWeights?.[key as keyof typeof course.categoryWeights] || 0
        return sum + (score * weight) / 100
      }, 0)
    : course.marks || 0

  return (
    <Card
      className={`w-full mb-4 shadow-sm hover:shadow-md transition-shadow ${isWithheld ? "border-yellow-300" : isAppealed ? "border-blue-300" : ""}`}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-base font-semibold">{course.courseCode}</CardTitle>
              {isRetake && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge variant="outline" className="text-xs bg-amber-50">
                        Retake
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>This is a retake course. Previous grade: {course.previousGrade || "N/A"}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {isWithheld && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-800">
                        Withheld
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Grade is withheld. Contact department for details.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {isAppealed && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-800">
                        Appealed
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Grade appeal in progress</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <CardDescription className="line-clamp-1">{course.courseName}</CardDescription>
          </div>
          <div className="text-right">
            <div className={`text-xl font-bold ${getGradeColor(course.grade)}`}>{isPending ? "-" : course.grade}</div>
            <CardDescription>{isPending ? "Pending" : `${course.marks || "-"}/100`}</CardDescription>
          </div>
        </div>
      </CardHeader>

      {showDetails && (
        <CardContent className="pb-2">
          <div className="grid grid-cols-2 gap-2 text-sm mb-3">
            <div>
              <div className="text-muted-foreground">Credit Hours</div>
              <div className="font-medium">{course.creditHours}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Grade Points</div>
              <div className="font-medium">{course.gradePoint || "-"}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Department</div>
              <div className="font-medium line-clamp-1">{course.departmentName}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Instructor</div>
              <div className="font-medium">{course.instructorName || "Not assigned"}</div>
            </div>
          </div>

          {hasScores && (
            <div className="space-y-2 mb-3">
              <div className="text-sm font-medium">Score Breakdown</div>
              {Object.entries(course.categoryScores || {}).map(([key, score]) => {
                if (score === 0 && key === "finalExam") return null
                const weight = course.categoryWeights?.[key as keyof typeof course.categoryWeights] || 0
                const maxScore = weight
                const percentage = (score / maxScore) * 100
                const formattedKey = key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())

                return (
                  <div key={key} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>
                        {formattedKey} ({weight}%)
                      </span>
                      <span>
                        {score.toFixed(1)}/{maxScore}
                      </span>
                    </div>
                    <Progress value={percentage} className="h-1" />
                  </div>
                )
              })}

              <div className="flex justify-between text-sm font-medium mt-2">
                <span>Total Score</span>
                <span>{totalScore.toFixed(1)}/100</span>
              </div>
            </div>
          )}

          {course.datePublished && (
            <div className="text-xs text-muted-foreground">Published on {formatDate(course.datePublished)}</div>
          )}

          {isWithheld && (
            <div className="flex items-center gap-2 text-sm text-yellow-700 bg-yellow-50 p-2 rounded-md mt-2">
              <AlertCircle size={16} />
              <span>Grade is withheld. Please contact your department or check for fee arrears.</span>
            </div>
          )}
        </CardContent>
      )}

      <CardFooter className="pt-2">
        <div className="w-full flex justify-between">
          <Button variant="outline" size="sm" className="text-xs" onClick={() => onViewDetails?.(course.id)}>
            <FileText size={14} className="mr-1" /> Details
          </Button>

          <div className="flex gap-2">
            {!isPending && !isAppealed && (
              <Button variant="ghost" size="sm" className="text-xs" onClick={() => onRequestAppeal?.(course.id)}>
                <AlertCircle size={14} className="mr-1" /> Appeal
              </Button>
            )}
            <Button variant="ghost" size="sm" className="text-xs">
              <BarChart3 size={14} className="mr-1" /> Analytics
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

