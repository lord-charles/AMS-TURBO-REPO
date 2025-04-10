"use client"

import { BarChart4, CheckCircle2, ChevronRight, CreditCard, Eye, FileText, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { failedCourses, feeStructure } from "./mock-data"

interface OverviewTabProps {
  onApplyClick: (examType: string) => void
}

export function OverviewTab({ onApplyClick }: OverviewTabProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart4 className="h-5 w-5 mr-2 text-primary" />
              Academic Performance Summary
            </CardTitle>
            <CardDescription>Courses that may require supplementary examinations</CardDescription>
          </CardHeader>
          <CardContent>
            {failedCourses.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Units</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {failedCourses.map((course) => (
                    <TableRow key={course.code}>
                      <TableCell>
                        <div className="font-medium">{course.code}</div>
                        <div className="text-sm text-muted-foreground">{course.name}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={course.grade === "E" ? "destructive" : "outline"}>{course.grade}</Badge>
                      </TableCell>
                      <TableCell>{course.units}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CheckCircle2 className="h-12 w-12 text-green-500 mb-2" />
                <p className="text-lg font-medium">No Failed Courses</p>
                <p className="text-sm text-muted-foreground">
                  You have no courses that require supplementary examinations.
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View Full Transcript
            </Button>
            {failedCourses.length > 0 && (
              <Button size="sm" onClick={() => onApplyClick("supplementary")}>
                Apply for Supplementary
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-primary" />
              Fee Structure
            </CardTitle>
            <CardDescription>Current fees for special examination applications</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Exam Type</TableHead>
                  <TableHead>Fee (KES)</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {feeStructure.map((fee) => (
                  <TableRow key={fee.examType}>
                    <TableCell className="font-medium">{fee.examType}</TableCell>
                    <TableCell>{fee.fee.toLocaleString()}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{fee.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              <Info className="h-4 w-4 inline mr-1" />
              Fees are subject to change. Payment is required before application processing.
            </p>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-primary" />
            Special Examination Types
          </CardTitle>
          <CardDescription>Information about different types of special examinations</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="supplementary">
              <AccordionTrigger>
                <div className="flex items-center">
                  <Badge variant="outline" className="mr-2">
                    Supplementary
                  </Badge>
                  For failed courses
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>
                    Supplementary examinations are offered to students who have failed a course (grades D, E, or F) and
                    wish to improve their grade without repeating the entire course.
                  </p>
                  <h4 className="font-medium mt-2">Eligibility:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Students who have failed a course with grades D, E, or F</li>
                    <li>
                      Students who have not exceeded the maximum number of supplementary exams allowed per semester
                      (typically 3)
                    </li>
                    <li>Application must be made within the designated application period</li>
                  </ul>
                  <h4 className="font-medium mt-2">Requirements:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Payment of supplementary examination fee (KES 2,500 per course unit)</li>
                    <li>Clearance from finance department</li>
                    <li>Approval from the department chairperson</li>
                  </ul>
                  <Button className="mt-2" onClick={() => onApplyClick("supplementary")}>
                    Apply for Supplementary Exam
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="deferred">
              <AccordionTrigger>
                <div className="flex items-center">
                  <Badge variant="outline" className="mr-2">
                    Deferred
                  </Badge>
                  For missed examinations
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>
                    Deferred examinations are for students who were unable to sit for their scheduled examinations due
                    to valid reasons such as illness, bereavement, or other extenuating circumstances.
                  </p>
                  <h4 className="font-medium mt-2">Eligibility:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Students who missed an examination due to documented illness or emergency</li>
                    <li>Application must be made within 2 weeks of the missed examination</li>
                  </ul>
                  <h4 className="font-medium mt-2">Requirements:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Supporting documentation (medical certificate, death certificate, etc.)</li>
                    <li>Payment of deferred examination fee (KES 1,500 per course)</li>
                    <li>Approval from the dean of faculty</li>
                  </ul>
                  <Button className="mt-2" onClick={() => onApplyClick("deferred")}>
                    Apply for Deferred Exam
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="special">
              <AccordionTrigger>
                <div className="flex items-center">
                  <Badge variant="outline" className="mr-2">
                    Special Sitting
                  </Badge>
                  For scheduling conflicts
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>
                    Special sitting examinations are arranged for students who have scheduling conflicts or other
                    approved circumstances that prevent them from taking an exam at its scheduled time.
                  </p>
                  <h4 className="font-medium mt-2">Eligibility:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Students with documented examination timetable clashes</li>
                    <li>Students with other approved special circumstances</li>
                    <li>Application must be made at least 2 weeks before the scheduled examination</li>
                  </ul>
                  <h4 className="font-medium mt-2">Requirements:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Evidence of timetable clash or other special circumstances</li>
                    <li>Payment of special sitting fee (KES 3,000 per exam)</li>
                    <li>Approval from the examination officer</li>
                  </ul>
                  <Button className="mt-2" onClick={() => onApplyClick("special")}>
                    Apply for Special Sitting
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}

