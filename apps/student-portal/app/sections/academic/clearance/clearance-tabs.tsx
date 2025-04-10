"use client"

import Link from "next/link"
import { ArrowLeft, FileText, FileCheck, HelpCircle, ClipboardList, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

interface Student {
  id: string
  name: string
  course: string
  year: string
  registrationNumber: string
  faculty: string
}

interface ClearanceTabsProps {
  student: Student
  activeTab: string
}

export function ClearanceTabs({ student, activeTab }: ClearanceTabsProps) {
  const tabs = [
    { id: "overview", label: "Overview", href: "/academic/clearance", icon: Home },
    { id: "apply", label: "Apply", href: "/academic/clearance/apply", icon: FileText },
    { id: "forms", label: "Forms", href: "/academic/clearance/forms", icon: ClipboardList },
    { id: "certificate", label: "Certificate", href: "/academic/clearance/certificate", icon: FileCheck },
    { id: "faq", label: "FAQ", href: "/academic/clearance/faq", icon: HelpCircle },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between w-full">
        
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Student Clearance</h1>

      <Tabs value={activeTab}>
        <TabsList className="h-auto p-1  rounded-xl gap-1 justify-start overflow-x-auto flex-nowrap border">
          {tabs.map((tab) => (
            <Link key={tab.id} href={tab.href} className="w-auto">
              <TabsTrigger
                value={tab.id}
                className={`
                  data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm
                  px-4 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-all
                `}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </TabsTrigger>
            </Link>
          ))}
        </TabsList>
      </Tabs>
      </div>


      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground font-medium">Student Name</p>
              <p className="font-semibold text-foreground">{student.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">Registration Number</p>
              <p className="font-semibold text-foreground">{student.registrationNumber}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">Course & Year</p>
              <p className="font-semibold text-foreground">
                {student.course} ({student.year})
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
