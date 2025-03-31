"use client"

import { BookOpen, Calendar, FileText, GraduationCap, Library, RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function QuickActions() {
  const actions = [
    {
      icon: BookOpen,
      label: "My Courses",
      href: "/academic/mycourses",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: GraduationCap,
      label: "Register Courses",
      href: "/academic/registration",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: Library,
      label: "Course Materials",
      href: "/academic/materials",
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      icon: Calendar,
      label: "Timetable",
      href: "/academic/timetable",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: FileText,
      label: "Exams",
      href: "/academic/exams",
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
    {
      icon: RefreshCw,
      label: "Special Cases",
      href: "/academic/special-cases",
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Frequently used academic services</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {actions.map((action) => (
            <Button
              key={action.href}
              variant="outline"
              className="flex flex-col h-auto py-4 gap-2 justify-center items-center"
              asChild
            >
              <Link href={action.href}>
                <div className={`p-2 rounded-full ${action.bgColor}`}>
                  <action.icon className={`h-5 w-5 ${action.color}`} />
                </div>
                <span className="text-xs font-medium">{action.label}</span>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

