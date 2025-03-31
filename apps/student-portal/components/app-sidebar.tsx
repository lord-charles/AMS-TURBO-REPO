"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bell,
  Building,
  ChevronDown,
  ChevronRight,
  DollarSign,
  GraduationCap,
  LogOut,
  MessageSquare,
  School,
  Search,
  Settings,
  Users,
  X,
} from "lucide-react"
import { IconHome2 } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { useThemeContext } from "@/lib/theme/themeContext"
import { themes } from "@/lib/theme/theme-colors"
import { useDashboard } from "@/contexts/dashboard-context"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"

// Academic dashboard data structure
interface NavItem {
  title: string
  url: string
  description?: string
  isActive?: boolean
  items?: NavItem[]
}

interface NavSection {
  title: string
  url: string
  icon: React.ComponentType
  description?: string
  items: NavItem[]
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
          description:
            "Quick access to academic progress, upcoming deadlines, announcements, and personalized notifications.",
        },
        {
          title: "Profile & Settings",
          url: "/profile",
          description: "Manage personal details, security settings, notification preferences, and privacy controls.",
        },
        {
          title: "Student ID & Exam Card",
          url: "/profile/documents",
          description:
            "Download your student ID, admission letter, enrollment verification, and other official documents.",
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
          description:
            "Manage your current semester courses, view enrolled units, and access course-related materials.",
          items: [
            {
              title: "Overview",
              url: "/academic/overview",
              description: "Get a summary of your academic progress and course details.",
            },
            {
              title: "Course Registration",
              url: "/academic/registration",
              description: "Enroll in courses, drop or swap subjects, and track prerequisites and approvals.",
            },
            {
              title: "My Courses",
              url: "/academic/mycourses",
              description: "View your registered courses, lecturers, and attendance records.",
            },
            {
              title: "Assignments",
              url: "/academic/assignments",
              description: "Submit coursework, view deadlines, and check grading status.",
            },
            {
              title: "Class Schedule",
              url: "/academic/timetable",
              description: "View your personalized academic timetable with lecture and lab sessions.",
            },
            {
              title: "Exams & Assessments",
              url: "/academic/exams",
              description: "Check exam schedules, seating arrangements, and past papers.",
            },
            {
              title: "Course Materials",
              url: "/academic/materials",
              description: "Download lecture slides, reference notes, and video lectures.",
            },
          ],
        },
        {
          title: "Grades & Transcripts",
          url: "/academic/grades",
          description: "Track semester grades, cumulative GPA, and request official or unofficial transcripts.",
          items: [
            {
              title: "Semester Results",
              url: "/academic/grades/semester",
              description: "View your final grades for each semester.",
            },
            {
              title: "Cumulative GPA",
              url: "/academic/grades/gpa",
              description: "Monitor academic performance and progress toward graduation.",
            },
            {
              title: "Transcripts",
              url: "/academic/grades/transcripts",
              description: "Download official transcripts for employment or further studies.",
            },
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
        },
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
            {
              title: "Fee Statement",
              url: "/financials/statement",
              description: "View and download your tuition fee breakdown.",
            },
            {
              title: "Payment Options",
              url: "/financials/options",
              description: "Mobile money, bank transfer, credit card, and online payments.",
            },
            {
              title: "Scholarships & Financial Aid",
              url: "/financials/scholarships",
              description: "Apply for financial assistance and monitor your scholarship status.",
            },
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
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  // Function to check if a path is active with improved exact path matching
  const isPathActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname === path) return true
    if (path !== "/" && pathname.startsWith(`${path}/`)) return true
    return false
  }

  // Check if an item or any of its descendants is active
  const isItemActive = (item: NavItem): boolean => {
    if (isPathActive(item.url)) return true
    if (item.items) {
      return item.items.some(isItemActive)
    }
    return false
  }

  // Function to process navigation items and set isActive
  const processNavItems = (items: NavItem[]): NavItem[] => {
    return items.map((item) => ({
      ...item,
      isActive: isItemActive(item),
      items: item.items ? processNavItems(item.items) : undefined,
    }))
  }

  // Memoized processed navigation data
  const processedNavData = React.useMemo(
    () => ({
      ...data,
      navMain: data.navMain.map((section) => ({
        ...section,
        items: processNavItems(section.items),
      })),
    }),
    [pathname],
  )

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
  const { theme, resolvedTheme } = useTheme()

  // Get the current theme more safely without direct window access
  const currentTheme = resolvedTheme || theme || "light"

  // Get theme configuration
  const themeConfig = React.useMemo(
    () => themes[themeColor][currentTheme === "dark" ? "dark" : "light"],
    [themeColor, currentTheme],
  )

  const [searchQuery, setSearchQuery] = React.useState("")
  const searchInputRef = React.useRef<HTMLInputElement>(null)

  // Initialize open sections with active sections
  const initialOpenSections = React.useMemo(() => {
    const openSections: Record<string, boolean> = {}

    // Open sections with active items by default
    processedNavData.navMain.forEach((section: NavSection) => {
      const hasActiveItem = section.items.some(isItemActive)
      if (hasActiveItem) {
        openSections[section.title] = true

        // Also open subsections with active items
        section.items.forEach((item) => {
          if (item.items && item.items.some(isItemActive)) {
            openSections[`${section.title}-${item.title}`] = true
          }
        })
      }
    })

    return openSections
  }, [])

  const [openSections, setOpenSections] = React.useState<Record<string, boolean>>(initialOpenSections)

  // Add keyboard shortcut for search
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Focus search on Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Filter navigation items based on search query with debounce for performance
  const [debouncedSearchQuery, setDebouncedSearchQuery] = React.useState(searchQuery)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  const filteredNavItems = React.useMemo(() => {
    if (!debouncedSearchQuery.trim()) {
      return processedNavData.navMain
    }

    const query = debouncedSearchQuery.toLowerCase()

    // Deep search function for nested items
    const itemMatchesSearch = (item: NavItem): boolean => {
      if (item.title.toLowerCase().includes(query)) return true
      if (item.description?.toLowerCase().includes(query)) return true
      if (item.items?.some(itemMatchesSearch)) return true
      return false
    }

    // Filter main navigation sections
    return processedNavData.navMain.filter((section: NavSection) => {
      if (section.title.toLowerCase().includes(query)) return true
      if (section.description?.toLowerCase().includes(query)) return true
      if (section.items.some(itemMatchesSearch)) return true
      return false
    })
  }, [processedNavData, debouncedSearchQuery])

  // Update open sections when search changes
  React.useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      // When searching, open all matching sections
      const newOpenSections: Record<string, boolean> = {}

      filteredNavItems.forEach((section) => {
        newOpenSections[section.title] = true

        // Open subsections that match search
        section.items.forEach((item) => {
          if (
            item.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
            item.description?.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
            item.items?.some(
              (subItem) =>
                subItem.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
                subItem.description?.toLowerCase().includes(debouncedSearchQuery.toLowerCase()),
            )
          ) {
            newOpenSections[`${section.title}-${item.title}`] = true
          }
        })
      })

      setOpenSections((prev) => ({ ...prev, ...newOpenSections }))
    }
  }, [debouncedSearchQuery, filteredNavItems])

  // Get animation style based on animation settings
  const getAnimationStyle = React.useMemo(() => {
    if (!animationsEnabled) return {}

    return {
      transition: `all var(--animation-duration) ${animationSpeed === "fast" ? "cubic-bezier(0.4, 0, 0.2, 1)" : "ease-in-out"}`,
      "--animation-duration": animationSpeed === "fast" ? "150ms" : "300ms",
    } as React.CSSProperties
  }, [animationsEnabled, animationSpeed])

  // Get sidebar style classes based on sidebar style setting
  const sidebarStyleClasses = React.useMemo(() => {
    switch (sidebarStyle) {
      case "minimal":
        return "bg-background/95 backdrop-blur-sm border-0"
      case "glass":
        return "bg-background/20 backdrop-blur-xl border-0"
      case "bordered":
        return "bg-background border-r border-l"
      default:
        return "bg-sidebar border-r shadow-sm"
    }
  }, [sidebarStyle])

  // Highlight text that matches search query
  const highlightText = (text: string) => {
    if (!debouncedSearchQuery.trim()) return text

    const regex = new RegExp(`(${debouncedSearchQuery.trim()})`, "gi")
    const parts = text.split(regex)

    return (
      <>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <span key={i} className="bg-primary/20 text-primary font-medium">
              {part}
            </span>
          ) : (
            part
          ),
        )}
      </>
    )
  }

  // NavItem Component - Extracted for better maintainability
  const NavItem = React.memo(
    ({ item, depth = 0, sectionTitle }: { item: NavItem; depth?: number; sectionTitle: string }) => {
      const hasSubItems = item.items && item.items.length > 0
      const isOpen = openSections[`${sectionTitle}-${item.title}`] || false
      const hasActiveDescendant = item.items?.some(
        (subItem) => subItem.isActive || subItem.items?.some((nestedItem) => nestedItem.isActive),
      )

      return (
        <div
          className={cn(
            "w-full",
            depth > 0 && "ml-4 pl-2 border-l border-border/50",
            (item.isActive || hasActiveDescendant) && depth > 0 && "border-l-primary/50",
          )}
        >
          {hasSubItems ? (
            <Collapsible
              open={isOpen}
              onOpenChange={(open) =>
                setOpenSections((prev) => ({
                  ...prev,
                  [`${sectionTitle}-${item.title}`]: open,
                }))
              }
              className="w-full"
            >
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  className={cn(
                    "w-full justify-between group transition-all",
                    (item.isActive || hasActiveDescendant) &&
                      "bg-primary/10 text-primary font-medium border-l-[3px] border-primary pl-[calc(0.5rem-3px)]",
                    !item.isActive && !hasActiveDescendant && "hover:bg-muted/70",
                    depth > 0 && "text-sm",
                  )}
                  style={getAnimationStyle}
                >
                  <span className="truncate">{highlightText(item.title)}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180",
                      item.isActive || hasActiveDescendant ? "text-primary" : "text-muted-foreground",
                    )}
                    style={getAnimationStyle}
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-1 pb-2">
                {item.items?.map((subItem) => (
                  <NavItem key={subItem.title} item={subItem} depth={depth + 1} sectionTitle={sectionTitle} />
                ))}
              </CollapsibleContent>
            </Collapsible>
          ) : (
            <SidebarMenuButton
              asChild
              className={cn(
                "w-full transition-all",
                item.isActive &&
                  "bg-primary/10 text-primary font-medium border-l-[3px] border-primary pl-[calc(0.5rem-3px)]",
                !item.isActive && "hover:bg-muted/70",
                depth > 0 && "text-sm",
                layoutDensity === "compact" && "py-1.5",
              )}
              style={getAnimationStyle}
            >
              <Link href={item.url}>
                <span className="truncate">{highlightText(item.title)}</span>
                {item.description && !isCollapsed && debouncedSearchQuery && (
                  <span className="text-xs text-muted-foreground mt-0.5 block truncate">
                    {highlightText(item.description)}
                  </span>
                )}
              </Link>
            </SidebarMenuButton>
          )}
        </div>
      )
    },
  )
  NavItem.displayName = "NavItem"

  // NavSection Component - Extracted for better maintainability
  const NavSection = React.memo(({ section }: { section: NavSection }) => {
    const isOpen = openSections[section.title] || false
    const Icon = section.icon as any


    // Check if any items in this section are active
    const hasActiveItem = section.items.some(isItemActive)

    return (
      <SidebarGroup key={section.title} className="px-2 py-1">
        <Collapsible
          open={isOpen}
          onOpenChange={(open) =>
            setOpenSections((prev) => ({
              ...prev,
              [section.title]: open,
            }))
          }
          className="w-full group/collapsible"
        >
          <CollapsibleTrigger asChild>
            <SidebarGroupLabel
              className={cn(
                "flex items-center justify-between cursor-pointer rounded-md px-2 py-1.5 text-sm font-medium transition-all",
                hasActiveItem ? "bg-primary/10 text-primary hover:bg-primary/15" : "hover:bg-muted/50",
                layoutDensity === "compact" && "py-1",
              )}
              style={getAnimationStyle}
            >
              <div className="flex items-center gap-2">
                <Icon className={cn("h-4 w-4", hasActiveItem ? "text-primary" : "text-muted-foreground")} />
                <span className={cn(hasActiveItem && "font-medium")}>{highlightText(section.title)}</span>
              </div>
              <ChevronRight
                className={cn(
                  "h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90",
                  hasActiveItem ? "text-primary" : "text-muted-foreground",
                )}
                style={getAnimationStyle}
              />
            </SidebarGroupLabel>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-1 space-y-1 ml-6">
            <SidebarMenu>
              {section.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavItem item={item} sectionTitle={section.title} />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </CollapsibleContent>
        </Collapsible>
      </SidebarGroup>
    )
  })
  NavSection.displayName = "NavSection"

  // CollapsedNavSection Component - Extracted for better maintainability
  const CollapsedNavSection = React.memo(({ section }: { section: NavSection }) => {
    const Icon = section.icon as any
    const hasActiveItem = section.items.some(isItemActive)

    return (
      <SidebarGroup key={section.title} className="px-2 py-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "w-full h-9 flex items-center justify-center p-0 relative transition-all",
                  hasActiveItem && "bg-primary/10 text-primary",
                  layoutDensity === "compact" && "h-8",
                )}
                style={getAnimationStyle}
              >
                <Icon className={cn("h-4 w-4", hasActiveItem && "text-primary")} />
                {hasActiveItem && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-r-full" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="font-medium">
              {section.title}
              {hasActiveItem && (
                <Badge variant="outline" className="ml-2 bg-primary/10 border-primary/40 text-primary text-[10px] py-0">
                  Active
                </Badge>
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </SidebarGroup>
    )
  })
  CollapsedNavSection.displayName = "CollapsedNavSection"

  // Empty state component for no search results
  const EmptySearchResults = () => (
    <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
      <Search className="h-8 w-8 text-muted-foreground/40 mb-2" />
      <p className="text-muted-foreground font-medium">{isCollapsed ? "0" : "No results found"}</p>
      <p className="text-xs text-muted-foreground/70 mt-1 max-w-[180px]">
        Try a different search term or browse the menu
      </p>
      {!isCollapsed && (
        <Button variant="outline" size="sm" className="mt-4" onClick={() => setSearchQuery("")}>
          Clear search
        </Button>
      )}
    </div>
  )

  return (
    <Sidebar
      side={sidebarPosition}
      variant={sidebarVariant}
      collapsible={sidebarCollapsible}
      className={cn(
        "border-none transition-all",
        sidebarStyle === "minimal" && "bg-background/30 backdrop-blur-2xl p-2",
        sidebarStyle === "glass" && "bg-background/20 backdrop-blur-xl p-2",
        sidebarStyle === "bordered" && "bg-background border-r border-l p-0",
        sidebarStyle === "default" && "bg-sidebar border-r shadow-sm p-0",
        layoutDensity === "compact" && "p-0",
      )}
      style={{
        ...getAnimationStyle,
        backgroundColor: `hsl(${themeConfig.background})`,
        borderColor: `hsl(${themeConfig.border})`,
      }}
      {...props}
    >
      <SidebarHeader
        className={cn(
          "py-3 transition-all",
          sidebarStyle === "minimal" || sidebarStyle === "glass"
            ? "bg-background/80 backdrop-blur-md border-b border-border/30"
            : "bg-background border-b",
          sidebarStyle === "minimal" && "border-t-2 border-primary border rounded-t-md",
          layoutDensity === "compact" && "py-2",
        )}
        style={{
          ...getAnimationStyle,
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
                  ref={searchInputRef}
                  id="sidebar-search"
                  placeholder="Search... (Ctrl+K)"
                  className={cn(
                    "w-full pl-9 pr-9 h-9 rounded-md transition-all",
                    "focus-visible:ring-primary/40 focus-visible:ring-offset-0 focus-visible:border-primary/40",
                    sidebarStyle === "glass"
                      ? "bg-background/20 border-border/30 focus-visible:bg-background/30"
                      : "bg-muted/50 border-border/50 focus-visible:bg-muted/70",
                    layoutDensity === "compact" && "h-8 text-sm",
                  )}
                  style={{
                    ...getAnimationStyle,
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
                    className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full opacity-70 hover:opacity-100 transition-opacity"
                    onClick={() => setSearchQuery("")}
                    style={getAnimationStyle}
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
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn("h-9 w-9 rounded-full", layoutDensity === "compact" && "h-8 w-8")}
                  >
                    <GraduationCap className={cn("h-5 w-5", layoutDensity === "compact" && "h-4 w-4")} />
                    <span className="sr-only">University Portal</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="font-medium">
                  University Portal
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn("h-8 w-8")}
                    size="icon"
                    className={cn("h-8 w-8 rounded-full", layoutDensity === "compact" && "h-7 w-7")}
                    onClick={() => {
                      searchInputRef.current?.focus()
                    }}
                  >
                    <Search className="h-4 w-4" />
                    <span className="sr-only">Search</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="font-medium">
                  Search (Ctrl+K)
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent
        className={cn(
          "py-2 transition-all",
          sidebarStyle === "minimal" || sidebarStyle === "glass"
            ? "bg-background/80 backdrop-blur-md"
            : "bg-background",
          layoutDensity === "compact" && "py-1.5",
        )}
        style={getAnimationStyle}
      >
        <ScrollArea className={cn("h-full pr-1", layoutDensity === "compact" && "pr-0.5")}>
          {debouncedSearchQuery && filteredNavItems.length === 0 ? (
            <EmptySearchResults />
          ) : (
            <>
              {filteredNavItems.map((section) =>
                isCollapsed ? (
                  <CollapsedNavSection key={section.title} section={section} />
                ) : (
                  <NavSection key={section.title} section={section} />
                ),
              )}
            </>
          )}
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter
        className={cn(
          "py-3 transition-all",
          sidebarStyle === "minimal" || sidebarStyle === "glass"
            ? "bg-background/80 backdrop-blur-md border-t border-border/30"
            : "bg-background border-t",
          layoutDensity === "compact" && "py-2",
        )}
        style={{
          ...getAnimationStyle,
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
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "h-9 w-9 rounded-full hover:bg-muted/80 transition-colors",
                          layoutDensity === "compact" && "h-8 w-8",
                        )}
                        style={getAnimationStyle}
                      >
                        <Settings className="h-4.5 w-4.5" />
                        <span className="sr-only">Settings</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="font-medium">
                      Settings
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "h-9 w-9 rounded-full hover:bg-muted/80 transition-colors relative",
                          layoutDensity === "compact" && "h-8 w-8",
                        )}
                        style={getAnimationStyle}
                      >
                        <Bell className="h-4.5 w-4.5" />
                        <Badge
                          className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] font-semibold bg-primary text-primary-foreground"
                          style={getAnimationStyle}
                        >
                          3
                        </Badge>
                        <span className="sr-only">Notifications</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="font-medium">
                      Notifications
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "h-9 w-9 rounded-full hover:bg-muted/80 transition-colors",
                          layoutDensity === "compact" && "h-8 w-8",
                        )}
                        style={getAnimationStyle}
                      >
                        <LogOut className="h-4.5 w-4.5" />
                        <span className="sr-only">Logout</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="font-medium">
                      Logout
                    </TooltipContent>
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
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-9 w-9 rounded-full hover:bg-muted/80 transition-colors",
                      layoutDensity === "compact" && "h-8 w-8",
                    )}
                    style={getAnimationStyle}
                  >
                    <Settings className="h-4.5 w-4.5" />
                    <span className="sr-only">Settings</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="font-medium">
                  Settings
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}

