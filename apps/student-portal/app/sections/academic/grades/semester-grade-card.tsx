"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, FileText, Award, BarChart3 } from "lucide-react"
import type { Semester } from "./types"
import { formatDate, getGradeColor } from "./utils"
import { Progress } from "@/components/ui/progress"
import { getSemesterProgress } from "./utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface SemesterGradeCardProps {
  semester: Semester
  showDetails?: boolean
}

export function SemesterGradeCard({ semester, showDetails = false }: SemesterGradeCardProps) {
  const [isOpen, setIsOpen] = useState(showDetails)
  const isCurrentSemester = semester.status === "in-progress"
  const progress = isCurrentSemester ? getSemesterProgress(semester.startDate, semester.endDate) : 100

  return (
    <Card className="w-full mb-4 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{semester.name}</CardTitle>
            <CardDescription>{semester.academicYear}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={isCurrentSemester ? "secondary" : "outline"}>
              {semester.status}
            </Badge>
            <Badge variant="default" className={getGradeColor(semester.gpa.toFixed(1))}>
              GPA: {semester.gpa.toFixed(2)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isCurrentSemester && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Semester Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
        <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
          <div>Total Credits: {semester.totalCredits}</div>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <ChevronUp className="h-4 w-4 mr-1" />
            ) : (
              <ChevronDown className="h-4 w-4 mr-1" />
            )}
            {isOpen ? "Hide" : "Show"} Details
          </Button>
        </div>
        <Collapsible open={isOpen}>
          <CollapsibleContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Credits</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {semester.courses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{course.code}</div>
                        <div className="text-sm text-muted-foreground">{course.title}</div>
                      </div>
                    </TableCell>
                    <TableCell>{course.credits}</TableCell>
                    <TableCell>
                      <span className={getGradeColor(course.grade || "")}>
                        {course.grade || "N/A"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {course.status.replace("-", " ")}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>

      <CardFooter className="pt-0 flex justify-between">
        <Button variant="outline" size="sm" className="text-xs">
          <FileText size={14} className="mr-1" /> View Report
        </Button>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="text-xs">
            <BarChart3 size={14} className="mr-1" /> Analytics
          </Button>
          <Button variant="ghost" size="sm" className="text-xs">
            <Award size={14} className="mr-1" /> Performance
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
