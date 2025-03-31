"use client"

import * as React from "react"
import {  Building,  DollarSign,  GraduationCap, Home,  LogOut, MessageSquare, Search, Settings,  Users,  Bell, X,  School, ChevronDown, ChevronRight } from 'lucide-react'
import { cn } from "@/lib/utils"
import { useThemeContext } from "@/lib/theme/themeContext"
import { themes } from "@/lib/theme/theme-colors"
import { useTheme } from "next-themes"

import { useDashboard } from "@/contexts/dashboard-context"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarInput,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { useSidebar } from "@/components/ui/sidebar"
import Link from "next/link"
import { IconHome2 } from "@tabler/icons-react"

// Academic dashboard data structure
interface NavItem {
  title: string;
  url: string;
  description?: string;
  isActive?: boolean;
  items?: NavItem[];
}

interface NavSection {
  title: string;
  url: string;
  icon: React.ComponentType;
  description?: string;
  items: NavItem[];
}

export const data = {
  user: {
    name: "John Doe",
    email: "john.doe@university.edu",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    { name: "Student Portal", logo: GraduationCap, plan: "Student" },
    { name: "Research Lab", logo: School, plan: "Research" },
    { name: "Student Council", logo: Users, plan: "Leadership" },
  ],
  navMain: [
    // 1️⃣ Home & Essentials 🏠
    {
      title: "Home & Essentials",
      url: "/dashboard",
      icon: IconHome2,
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          isActive: true,
          description: "Quick access to academic progress, upcoming deadlines, announcements, and personalized notifications.",
        },
        {
          title: "Profile & Settings",
          url: "/profile",
          description: "Manage personal details, security settings, notification preferences, and privacy controls.",
        },
        {
          title: "Student ID & Exam Card",
          url: "/profile/documents",
          description: "Download your student ID, admission letter, enrollment verification, and other official documents.",
        },
      ],
    },
    // 2️⃣ Academics 📚
    {
      title: "Academics",
      url: "/academic",
      icon: GraduationCap,
      items: [
        {
          title: "My Courses",
          url: "/academic/courses",
          description: "Manage your current semester courses, view enrolled units, and access course-related materials.",
          items: [
            { title: "Overview", url: "/academic/overview", description: "Get a summary of your academic progress and course details." },
            { title: "Course Registration", url: "/academic/registration", description: "Enroll in courses, drop or swap subjects, and track prerequisites and approvals." },
            { title: "My Courses", url: "/academic/mycourses", description: "View your registered courses, lecturers, and attendance records." },
            { title: "Assignments", url: "/academic/assignments", description: "Submit coursework, view deadlines, and check grading status." },
            { title: "Class Schedule", url: "/academic/timetable", description: "View your personalized academic timetable with lecture and lab sessions." },
            { title: "Exams & Assessments", url: "/academic/exams", description: "Check exam schedules, seating arrangements, and past papers." },
            { title: "Course Materials", url: "/academic/materials", description: "Download lecture slides, reference notes, and video lectures." }
   
          ],
        },
        {
          title: "Grades & Transcripts",
          url: "/academic/grades",
          description: "Track semester grades, cumulative GPA, and request official or unofficial transcripts.",
          items: [
            { title: "Semester Results", url: "/academic/grades/semester", description: "View your final grades for each semester." },
            { title: "Cumulative GPA", url: "/academic/grades/gpa", description: "Monitor academic performance and progress toward graduation." },
            { title: "Transcripts", url: "/academic/grades/transcripts", description: "Download official transcripts for employment or further studies." },
          ],
        },
        {
          title: "Academic Calendar",
          url: "/academic/calendar",
          description: "Stay updated with university key dates, semester start/end, exam periods, and holidays.",
        },
        {
          title: "Student Clearance",
          url: "/academic/clearance",
          description: "Complete clearance for graduation, transfers, and financial obligations.",
        },
        {
          title: "Research & Publications",
          url: "/academic/research",
          description: "Access university research, publish academic papers, and collaborate on projects.",
        }
      ],
    },
    // 3️⃣ Financials 💰
    {
      title: "Financials",
      url: "/financials",
      icon: DollarSign,
      items: [
        {
          title: "Fees & Payments",
          url: "/financials/payments",
          description: "Manage tuition payments, invoices, and financial statements.",
          items: [
            { title: "Fee Statement", url: "/financials/statement", description: "View and download your tuition fee breakdown." },
            { title: "Payment Options", url: "/financials/options", description: "Mobile money, bank transfer, credit card, and online payments." },
            { title: "Scholarships & Financial Aid", url: "/financials/scholarships", description: "Apply for financial assistance and monitor your scholarship status." },
          ],
        },
      ],
    },
    // 4️⃣ Campus Resources 🏛
    {
      title: "Campus Resources",
      url: "/campus",
      icon: Building,
      items: [
        {
          title: "Library & Research",
          url: "/campus/library",
          description: "Search digital and physical library collections, manage borrowed books, and pay fines.",
        },
        {
          title: "Internships & Careers",
          url: "/campus/careers",
          description: "Explore job postings, internships, career mentorship, and resume-building services.",
        },
        {
          title: "Clubs & Student Life",
          url: "/campus/clubs",
          description: "Join student organizations, participate in campus events, and build your leadership skills.",
        },
        {
          title: "Housing & Accommodation",
          url: "/campus/housing",
          description: "Apply for university housing, check availability, and submit maintenance requests.",
        },
        {
          title: "Health & Wellness Services",
          url: "/campus/health",
          description: "Access medical services, mental health support, and university health insurance information.",
        },
        {
          title: "Alumni Network",
          url: "/campus/alumni",
          description: "Stay connected with alumni, find mentorship programs, and explore networking opportunities.",
        },
        {
          title: "Transportation & Parking",
          url: "/campus/transport",
          description: "Check shuttle schedules, parking permits, and transportation services.",
        },
      ],
    },
    // 5️⃣ Communication & Support 📞
    {
      title: "Communication & Support",
      url: "/support",
      icon: MessageSquare,
      items: [
        {
          title: "Announcements & Notices",
          url: "/support/announcements",
          description: "Stay informed with university-wide updates, academic news, and policy changes.",
        },
        {
          title: "Messaging & Forums",
          url: "/support/messaging",
          description: "Engage in student discussions, communicate with faculty, and receive important messages.",
        },
        {
          title: "Help Desk & Support",
          url: "/support/helpdesk",
          description: "Request assistance for academic, financial, or technical issues.",
        },
      ],
    },
  ],
};



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {
    sidebarPosition,
    sidebarVariant,
    sidebarCollapsible,
    sidebarStyle,
    layoutDensity,
    animationsEnabled,
    animationSpeed,
    isMobileDevice,
  } = useDashboard()

  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  const { themeColor } = useThemeContext()
  const { theme } = useTheme()

  const currentTheme = theme === 'system' 
    ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    : theme as 'light' | 'dark'

  const themeConfig = themes[themeColor][currentTheme]

  const [searchQuery, setSearchQuery] = React.useState("")
  const [filteredNavItems, setFilteredNavItems] = React.useState(data.navMain)

  
  // Track open sections - initialize with first section open
  const [openSections, setOpenSections] = React.useState<Record<string, boolean>>({
    [data.navMain[0].title]: true
  })

  // Toggle section open/closed state
  const toggleSection = (title: string) => {
    setOpenSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }))
  }

  // Filter navigation items based on search query
  React.useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredNavItems(data.navMain)
      return
    }

    const query = searchQuery.toLowerCase()

    // Filter main navigation items with deep search through nested items
    const navItems = data.navMain.filter((item: NavSection) => {
      // Check if main item matches
      if (item.title.toLowerCase().includes(query)) return true
      if (item.description?.toLowerCase().includes(query)) return true

      // Check if any sub-items match
      if (
        item.items?.some((subItem: NavItem) => {
          if (subItem.title.toLowerCase().includes(query)) return true
          if (subItem.description?.toLowerCase().includes(query)) return true

          // Deep search in nested items
          if (subItem.items?.some((nestedItem: NavItem) => {
            return nestedItem.title.toLowerCase().includes(query) ||
                   nestedItem.description?.toLowerCase().includes(query)
          })) return true

          return false
        })
      ) return true

      return false
    })

    setFilteredNavItems(navItems)
    
    // When searching, open all matching sections
    const newOpenSections: Record<string, boolean> = {}
    navItems.forEach(item => {
      newOpenSections[item.title] = true
    })
    setOpenSections(newOpenSections)
  }, [searchQuery])

  // Get sidebar style classes
  const getSidebarStyleClasses = () => {
    switch (sidebarStyle) {
      case "minimal":
        return "bg-background/95 backdrop-blur-sm border-0"
      case "glass":
        return "glass-morphism border-0"
      case "bordered":
        return "bg-background border-r border-l"
      default:
        return "bg-sidebar border-r shadow-sm"
    }
  }

  // Get animation style
  const getAnimationStyle = () => {
    if (!animationsEnabled) return {}

    return {
      transition: `all var(--animation-duration) ${animationSpeed === "fast" ? "cubic-bezier(0.4, 0, 0.2, 1)" : "ease-in-out"}`,
    }
  }

  // Highlight text that matches search query
  const highlightText = (text: string) => {
    if (!searchQuery.trim()) return text
    
    const regex = new RegExp(`(${searchQuery.trim()})`, 'gi')
    const parts = text.split(regex)
    
    return (
      <>
        {parts.map((part, i) => 
          regex.test(part) ? <span key={i} className="bg-primary/20 text-primary font-medium">{part}</span> : part
        )}
      </>
    )
  }

  // Render a navigation item with proper styling and collapsible functionality
  const renderNavItem = (item: NavItem, depth: number = 0, sectionTitle: string) => {
    const hasSubItems = item.items && item.items.length > 0
    const isOpen = openSections[`${sectionTitle}-${item.title}`] || false
    
    return (
      <div key={item.title} className={cn("w-full", depth > 0 && "ml-4 pl-2 border-l border-border/50")}>
        {hasSubItems ? (
          <Collapsible
            open={isOpen}
            onOpenChange={(open) => setOpenSections(prev => ({
              ...prev,
              [`${sectionTitle}-${item.title}`]: open
            }))}
            className="w-full"
          >
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                className={cn(
                  "w-full justify-between group",
                  item.isActive && "bg-primary/10 text-primary font-medium",
                  depth > 0 && "text-sm"
                )}
                style={{
                  color: `hsl(${themeConfig.foreground})`,
                }}
              >
                <span className="truncate">{highlightText(item.title)}</span>
                <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-1 pb-2">
              {item.items?.map(subItem => renderNavItem(subItem, depth + 1, sectionTitle))}
            </CollapsibleContent>
          </Collapsible>
        ) : (
          <SidebarMenuButton
            asChild
            className={cn(
              "w-full",
              item.isActive && "bg-primary/10 text-primary font-medium",
              depth > 0 && "text-sm"
            )}
            style={{
              color: `hsl(${themeConfig.foreground})`,
            }}
          >
            <Link href={item.url}>
              <span className="truncate">{highlightText(item.title)}</span>
            </Link>
          </SidebarMenuButton>
        )}
      </div>
    )
  }

  // Render a navigation section with collapsible functionality
  const renderNavSection = (section: NavSection) => {
    const isOpen = openSections[section.title] || false
    const Icon = section.icon as any
    
    return (
      <SidebarGroup key={section.title} className="px-2 py-1">
        <Collapsible
          open={isOpen}
          onOpenChange={(open) => toggleSection(section.title)}
          className="w-full group/collapsible"
        >
          <CollapsibleTrigger asChild>
            <SidebarGroupLabel className="flex items-center justify-between cursor-pointer hover:bg-muted/50 rounded-md px-2 py-1.5 text-sm font-medium">
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <span style={{ color: `hsl(${themeConfig.foreground})` }}>{highlightText(section.title)}</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarGroupLabel>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-1 space-y-1 ml-6">
            <SidebarMenu>
              {section.items.map(item => (
                <SidebarMenuItem key={item.title}>
                  {renderNavItem(item, 0, section.title)}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </CollapsibleContent>
        </Collapsible>
      </SidebarGroup>
    )
  }

  // Render a collapsed navigation section (icon only)
  const renderCollapsedNavSection = (section: NavSection) => {
    const Icon = section.icon as any
    
    return (
      <SidebarGroup key={section.title} className="px-2 py-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="w-full h-9 flex items-center justify-center p-0">
                <Icon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">{section.title}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </SidebarGroup>
    )
  }
 
  return (
    <Sidebar
      side={sidebarPosition}
      variant={sidebarVariant}
      collapsible={sidebarCollapsible}
      className={cn(
        "border-none p-2",
        sidebarStyle === "minimal" && "bg-background/30 backdrop-blur-2xl",
        sidebarStyle === "glass" && "bg-background/20 backdrop-blur-xl",
      )}
      style={{
        ...getAnimationStyle(),
        "--animation-duration": animationSpeed === "fast" ? "150ms" : "300ms",
        backgroundColor: `hsl(${themeConfig.background})`,
        borderColor: `hsl(${themeConfig.border})`,
      } as unknown as React.CSSProperties}
      {...props}
    >
      <SidebarHeader
        className={cn(
          "py-3 bg-background",
          sidebarStyle === "minimal" || sidebarStyle === "glass" ? "border-b border-border/30" : "border-b",
          sidebarStyle ==="minimal" && "border-t-2 border-primary/30 border rounded-t-md"
        )}
        style={{
          borderColor: `hsla(${themeConfig.border}, 0.2)`,
        }}
      >
        {!isCollapsed ? (
          <>
            <TeamSwitcher teams={data.teams} />

            <form onSubmit={(e) => e.preventDefault()} className="px-3 pt-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <SidebarInput
                  id="sidebar-search"
                  placeholder="Search..."
                  className={cn(
                    "w-full pl-9 pr-9 h-9 bg-muted/50 border-border/50 focus-visible:ring-primary/30",
                    sidebarStyle === "glass" && "bg-background/20 border-border/30",
                  )}
                  style={{
                    borderColor: `hsla(${themeConfig.border}, 0.2)`,
                    color: `hsl(${themeConfig.foreground})`,
                  }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full opacity-70 hover:opacity-100"
                    onClick={() => setSearchQuery("")}
                    style={{
                      color: `hsl(${themeConfig.foreground})`,
                    }}
                  >
                    <X className="h-3.5 w-3.5" />
                    <span className="sr-only">Clear search</span>
                  </Button>
                )}
              </div>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                    <GraduationCap className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">University Portal</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <Search className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Search</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="bg-background py-2">
        <ScrollArea className="h-full">
          {searchQuery && filteredNavItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
              <p className="text-muted-foreground mb-2">{isCollapsed ? "0" : "No results found"}</p>
            </div>
          ) : (
            <>
              {filteredNavItems.map((section) => 
                isCollapsed ? renderCollapsedNavSection(section) : renderNavSection(section)
              )}
            </>
          )}
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter
        className={cn(
          "py-3 bg-background",
          sidebarStyle === "minimal" || sidebarStyle === "glass" ? "border-t border-border/30" : "border-t",
        )}
        style={{
          borderColor: `hsla(${themeConfig.border}, 0.2)`,
        }}
      >
        {!isCollapsed ? (
          <>
            <NavUser user={data.user} />

            <TooltipProvider delayDuration={300}>
              <div className="flex items-center justify-between px-4 py-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-muted/80">
                        <Settings className="h-4.5 w-4.5" />
                        <span className="sr-only">Settings</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Settings</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-muted/80 relative">
                        <Bell className="h-4.5 w-4.5" />
                        <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">3</Badge>
                        <span className="sr-only">Notifications</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Notifications</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-muted/80">
                        <LogOut className="h-4.5 w-4.5" />
                        <span className="sr-only">Logout</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Logout</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </TooltipProvider>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-muted/80">
                    <Settings className="h-4.5 w-4.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Settings</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
