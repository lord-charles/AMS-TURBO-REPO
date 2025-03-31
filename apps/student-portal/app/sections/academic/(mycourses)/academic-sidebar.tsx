"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BookOpen,
  Calendar,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Library,
  Menu,
  PenTool,
  RefreshCw,
  UserCheck,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface AcademicSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AcademicSidebar({ className, ...props }: AcademicSidebarProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const routes = [
    {
      label: "Overview",
      icon: LayoutDashboard,
      href: "/academic/overview",
      active: pathname === "/academic",
    },
    {
      label: "My Courses",
      icon: BookOpen,
      href: "/academic/mycourses",
      active: pathname === "/academic/mycourses" || pathname.startsWith("/academic/mycourses/"),
    },
    {
      label: "Course Registration",
      icon: PenTool,
      href: "/academic/registration",
      active: pathname === "/academic/registration",
    },
    {
      label: "Course Materials",
      icon: Library,
      href: "/academic/materials",
      active: pathname === "/academic/materials",
    },
    {
      label: "Timetable",
      icon: Calendar,
      href: "/academic/timetable",
      active: pathname === "/academic/timetable",
    },
    {
      label: "Exams",
      icon: FileText,
      href: "/academic/exams",
      active: pathname === "/academic/exams",
    },
    {
      label: "Grades & Transcripts",
      icon: GraduationCap,
      href: "/academic/grades",
      active: pathname === "/academic/grades",
    },
    {
      label: "Attendance",
      icon: UserCheck,
      href: "/academic/attendance",
      active: pathname === "/academic/attendance",
    },
    {
      label: "Special Cases",
      icon: RefreshCw,
      href: "/academic/special-cases",
      active: pathname === "/academic/special-cases",
    },
  ]

  return (
    <div className={cn("sticky top-0 z-40 w-full border-b bg-background", className)} {...props}>
      <div className=" flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/academic" className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <h2 className="text-lg font-semibold hidden md:block">Courses Module</h2>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {routes.slice(0, 5).map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-1 rounded-md px-3 py-2 text-sm transition-colors hover:text-primary",
                route.active ? "bg-muted text-primary font-medium" : "text-muted-foreground",
              )}
            >
              <route.icon className="h-4 w-4" />
              <span>{route.label}</span>
            </Link>
          ))}

          {/* Dropdown for additional items */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1">
                <span>More</span>
                <FileText className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Academic Services</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {routes.slice(5).map((route) => (
                <DropdownMenuItem key={route.href} asChild>
                  <Link href={route.href} className="flex items-center gap-2 w-full">
                    <route.icon className="h-4 w-4" />
                    <span>{route.label}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center gap-2">
   

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-6 w-6 text-primary" />
                  <h2 className="text-lg font-semibold">Academic Portal</h2>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>
              <nav className="grid gap-2 py-4">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                      route.active ? "bg-muted text-primary font-medium" : "text-muted-foreground",
                    )}
                  >
                    <route.icon className="h-4 w-4" />
                    <span>{route.label}</span>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
}

