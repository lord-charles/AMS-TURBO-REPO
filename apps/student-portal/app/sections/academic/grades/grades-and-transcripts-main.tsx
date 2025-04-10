"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, Calculator, History, AlertTriangle, Award } from "lucide-react"
import { GradesOverview } from "./grades-overview"
import { TranscriptView } from "./transcript-view"
import GradeCalculator from "./grade-calculator"

export function GradesAndTranscriptsMain() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="p-2 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Grades & Transcripts</h1>
          <p className="text-muted-foreground">
            View your academic performance, request transcripts, and manage grade appeals
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download size={16} />
            <span>Export Grades</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <FileText size={16} />
            <span>Download Transcript</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Academic Summary</CardTitle>
          <CardDescription>Your current academic standing and overall performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
              <span className="text-sm font-medium text-muted-foreground">Current CGPA</span>
              <span className="text-3xl font-bold">3.67</span>
              <span className="text-xs text-muted-foreground">Second Class Upper</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
              <span className="text-sm font-medium text-muted-foreground">Current Semester GPA</span>
              <span className="text-3xl font-bold">3.82</span>
              <span className="text-xs text-muted-foreground">Excellent</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
              <span className="text-sm font-medium text-muted-foreground">Credits Completed</span>
              <span className="text-3xl font-bold">96</span>
              <span className="text-xs text-muted-foreground">of 136 required</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Award size={16} />
            <span className="hidden md:inline">Grades Overview</span>
            <span className="inline md:hidden">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="transcript" className="flex items-center gap-2">
            <FileText size={16} />
            <span className="hidden md:inline">Transcript</span>
            <span className="inline md:hidden">Transcript</span>
          </TabsTrigger>
          <TabsTrigger value="calculator" className="flex items-center gap-2">
            <Calculator size={16} />
            <span className="hidden md:inline">GPA Calculator</span>
            <span className="inline md:hidden">Calculator</span>
          </TabsTrigger>
          <TabsTrigger value="appeals" className="flex items-center gap-2">
            <AlertTriangle size={16} />
            <span className="hidden md:inline">Grade Appeals</span>
            <span className="inline md:hidden">Appeals</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History size={16} />
            <span className="hidden md:inline">Grade History</span>
            <span className="inline md:hidden">History</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <GradesOverview />
        </TabsContent>

        <TabsContent value="transcript" className="mt-6">
          <TranscriptView />
        </TabsContent>

        <TabsContent value="calculator" className="mt-6">
          <GradeCalculator />
        </TabsContent>

        <TabsContent value="appeals" className="mt-6">
          {/* <GradeAppeal /> */}
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          {/* <GradeHistory /> */}
        </TabsContent>
      </Tabs>
    </div>
  )
}

