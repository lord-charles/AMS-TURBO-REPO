"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { BadgeIcon, FileCheck, BookOpen } from "lucide-react"
import StudentIdTab from "./components/student-id-tab"
import ExamCardTab from "./components/exam-card-tab"
import OfficialDocumentsTab from "./components/official-documents-tab"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

export default function DocumentTabs() {
  const [activeTab, setActiveTab] = useState("student-id")
  const isMobile = useIsMobile()

  const tabs = [
    {
      id: "student-id",
      title: "Student ID",
      shortTitle: "ID",
      icon: BadgeIcon,
      component: StudentIdTab,
    },
    {
      id: "exam-card",
      title: "Exam Card",
      shortTitle: "Exams",
      icon: BookOpen,
      component: ExamCardTab,
    },
    {
      id: "official-documents",
      title: "Official Documents",
      shortTitle: "Docs",
      icon: FileCheck,
      component: OfficialDocumentsTab,
    },
  ]

  return (
    <Tabs defaultValue="student-id" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="sticky top-0 z-10 bg-background pt-0 pb-3">
      <TabsList
        className={cn(
          "w-full h-auto p-1 gap-4 bg-muted/30 rounded-t-lg sticky top-0 z-10",
          isMobile ? "grid grid-cols-3 gap-1" : "flex",
        )}
      >
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className={cn(
                "flex items-center gap-2 transition-all",
                activeTab === tab.id ? "data-[state=active]:text-primary" : "",
              )}
            >
              <tab.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.title}</span>
              <span className="sm:hidden">{tab.shortTitle}</span>
              {tab.id === "exam-card" && (
                <span className="hidden sm:flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-red-600 text-xs font-medium">
                  !
                </span>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <Card className="rounded-lg shadow-sm">
        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="m-0">
            <tab.component />
          </TabsContent>
        ))}
      </Card>
    </Tabs>
  )
}

