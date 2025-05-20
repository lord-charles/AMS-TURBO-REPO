"use client"

import { useState } from "react"
import {
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Filter,
  GraduationCap,
  HelpCircle,
  Info,
  Layers,
  ListChecks,
  Pencil,
  Search,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ExamsView } from "./exams-view"
import { AssignmentsView } from "./assignments-view"

import { PastPapersView } from "./past-papers-view"
import { GradingSystemView } from "./grading-system-view"
import { SpecialExamsView } from "./special/special-exams-main"

export function ExamsAndAssignmentsModule() {
  const [selectedSemester, setSelectedSemester] = useState("fall2023")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-6 p-2">
      <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800 mb-6">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-500 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-800 dark:text-blue-300">Academic Calendar Announcement</h3>
              <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                The Sep-Dec 2023 semester exam period will run from December 4th to December 18th, 2023. Please ensure
                all coursework is submitted by November 30th.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Exams & Assignments</h1>
          <p className="text-muted-foreground">Manage your CATs, main exams, assignments, and academic assessments</p>
        </div>

        <div className="flex items-center gap-2">
          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Sep-Dec 2023</SelectItem>
              <SelectItem value="jan-apr-2023">Jan-Apr 2023</SelectItem>
              <SelectItem value="may-aug-2023">May-Aug 2023</SelectItem>
              <SelectItem value="sep-dec-2022">Sep-Dec 2022</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-[300px]">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search assignments, exams..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Calendar View
          </Button>
          <Button variant="default" size="sm">
            <CheckCircle className="mr-2 h-4 w-4" />
            Upcoming
            <Badge className="ml-2 bg-primary/20 text-primary hover:bg-primary/30">5</Badge>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="assignments" className="space-y-6">
        <TabsList className="w-full grid grid-cols-2 md:grid-cols-5 lg:flex lg:w-auto">
          <TabsTrigger value="assignments" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Assignments</span>
            <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-[10px]">8</Badge>
          </TabsTrigger>
          <TabsTrigger value="exams" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            <span>Exams</span>
            <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-[10px]">3</Badge>
          </TabsTrigger>
          <TabsTrigger value="special" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            <span>Special Exams</span>
          </TabsTrigger>
          <TabsTrigger value="past-papers" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Past Papers</span>
          </TabsTrigger>
          <TabsTrigger value="grading" className="flex items-center gap-2">
            <Layers className="h-4 w-4" />
            <span>Grading System</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="assignments">
          <AssignmentsView searchQuery={searchQuery} semester={selectedSemester} />
        </TabsContent>

        <TabsContent value="exams">
          <ExamsView searchQuery={searchQuery} semester={selectedSemester} />
        </TabsContent>

        <TabsContent value="special">
          <SpecialExamsView  />
        </TabsContent>

        <TabsContent value="past-papers">
          <PastPapersView searchQuery={searchQuery} semester={selectedSemester} />
        </TabsContent>

        <TabsContent value="grading">
          <GradingSystemView />
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            Assessment Information
          </CardTitle>
          <CardDescription>Important information about exams and assignments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="p-4 border rounded-md bg-muted/30">
              <div className="flex items-center gap-2 font-medium mb-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>Submission Deadlines</span>
              </div>
              <p className="text-sm text-muted-foreground">
                All assignments must be submitted by 11:59 PM on the due date unless otherwise specified. Late
                submissions incur a 5% penalty per day up to a maximum of 5 days.
              </p>
            </div>

            <div className="p-4 border rounded-md bg-muted/30">
              <div className="flex items-center gap-2 font-medium mb-2">
                <Pencil className="h-5 w-5 text-primary" />
                <span>Exam Regulations</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Students must arrive 30 minutes before exam start time with valid student ID and proof of fee payment.
                No electronic devices allowed unless specified by the examiner.
              </p>
            </div>

            <div className="p-4 border rounded-md bg-muted/30">
              <div className="flex items-center gap-2 font-medium mb-2">
                <ListChecks className="h-5 w-5 text-primary" />
                <span>Academic Integrity</span>
              </div>
              <p className="text-sm text-muted-foreground">
                All submitted work is checked for plagiarism using Turnitin. Ensure proper citation of sources. Academic
                dishonesty may result in disciplinary action as per university policy.
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <Button variant="outline" asChild>
              <a href="/academics/policies" target="_blank" rel="noreferrer">
                <FileText className="mr-2 h-4 w-4" />
                View Full Examination Policies
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

