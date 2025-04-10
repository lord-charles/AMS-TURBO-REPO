"use client"

import * as React from "react"
import { LucideIcon } from "lucide-react"
import {
  Building,
  ChevronDown,
  DollarSign,
  GraduationCap,
  Home,
  LogOut,
  MessageSquare,
  School,
  Search,
  User,
  Users,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { data } from "@/components/app-sidebar"


interface MobileSidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSettingsOpen?: () => void
}

// Define types for our navigation items
type NavSubItem = {
  title: string
  url: string
  description: string
  isActive?: boolean
}

type NavItemBase = {
  title: string
  url: string
  description: string
  isActive?: boolean
}

type NavItemWithSubItems = NavItemBase & {
  items: NavSubItem[]
}

type NavItem = NavItemBase | NavItemWithSubItems

// Type guard to check if an item has sub-items
function hasSubItems(item: NavItem): item is NavItemWithSubItems {
  return 'items' in item
}

type NavSection = {
  title: string
  url: string
  icon: LucideIcon
  items: NavItem[]
}

export function MobileSidebar({ open, onOpenChange, onSettingsOpen }: MobileSidebarProps) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [expandedSections, setExpandedSections] = React.useState<Record<string, boolean>>({})
  const [expandedItems, setExpandedItems] = React.useState<Record<string, boolean>>({})

  // Toggle section expansion
  const toggleSection = (title: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  // Toggle item expansion
  const toggleItem = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  // Filter navigation items based on search
  const filteredNavItems =
    searchQuery.trim() === ""
      ? data.navMain
      : data.navMain
          .map((section) => ({
            ...section,
            items: section.items.filter(
              (item) =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (hasSubItems(item) && item.items.some(
                  (subItem) =>
                    subItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    subItem.description?.toLowerCase().includes(searchQuery.toLowerCase()),
                )),
            ),
          }))
          .filter((section) => section.items.length > 0)

  // Get frequently used items
  const frequentItems = React.useMemo(() => {
    const allItems: Array<NavItem & { section: string; parent?: string; icon: LucideIcon }> = []

    // First add active items
    data.navMain.forEach((section: NavSection) => {
      section.items.forEach((item: NavItem) => {
        if ('isActive' in item && item.isActive) {
          allItems.push({
            ...item,
            section: section.title,
            icon: section.icon,
          })
        }
        if (hasSubItems(item)) {
          item.items.forEach((subItem) => {
            if ('isActive' in subItem && subItem.isActive) {
              allItems.push({
                ...subItem,
                section: section.title,
                parent: item.title,
                icon: section.icon,
              })
            }
          })
        }
      })
    })

    // If not enough active items, add some important ones
    if (allItems.length < 4) {
      // Add dashboard if not already included
      if (!allItems.some((item) => item.url === "/dashboard")) {
        const dashboardSection = data.navMain.find((section) => section.title === "Home & Essentials")
        const dashboardItem = dashboardSection?.items.find((item) => item.title === "Dashboard")
        if (dashboardSection && dashboardItem) {
          allItems.push({
            ...dashboardItem,
            section: dashboardSection.title,
            icon: dashboardSection.icon,
          })
        }
      }

      // Add courses if not already included
      if (!allItems.some((item) => item.url === "/academic/courses")) {
        const academicSection = data.navMain.find((section) => section.title === "Academics")
        const coursesItem = academicSection?.items.find((item) => item.title === "My Courses")
        if (academicSection && coursesItem) {
          allItems.push({
            ...coursesItem,
            section: academicSection.title,
            icon: academicSection.icon,
          })
        }
      }

      // Add financial overview if not already included
      if (!allItems.some((item) => item.url === "/finance/overview")) {
        const financeSection = data.navMain.find((section) => section.title === "Financials")
        const overviewItem = financeSection?.items.find((item) => item.title === "Overview")
        if (financeSection && overviewItem) {
          allItems.push({
            ...overviewItem,
            section: financeSection.title,
            icon: financeSection.icon,
          })
        }
      }
    }

    return allItems.slice(0, 4)
  }, [])

  // Auto-expand sections with active items
  React.useEffect(() => {
    const newExpandedSections: Record<string, boolean> = {}
    const newExpandedItems: Record<string, boolean> = {}

    data.navMain.forEach((section) => {
      section.items.forEach((item) => {
        // Check if item has isActive property and it's true
        if ('isActive' in item && item.isActive) {
          newExpandedSections[section.title] = true
        }
        // Check if item has sub-items and any of them are active
        if (hasSubItems(item) && item.items.some((subItem) => 'isActive' in subItem && subItem.isActive)) {
          newExpandedSections[section.title] = true
          newExpandedItems[item.title] = true
        }
      })
    })

    setExpandedSections((prev) => ({ ...prev, ...newExpandedSections }))
    setExpandedItems((prev) => ({ ...prev, ...newExpandedItems }))
  }, [])

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="w-[90%] max-w-sm p-0 border-r shadow-lg sm:max-w-md"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="flex flex-col h-full bg-gradient-to-b from-background to-background/95">
          {/* Header */}
          <div className="p-4 border-b sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="h-10 w-10 border shadow-sm">
                <AvatarImage src={data.user.avatar} alt={data.user.name} />
                <AvatarFallback>
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{data.user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{data.user.email}</p>
              </div>
            </div>

            <div className="relative mb-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-9 h-9 bg-muted/40 focus-visible:bg-background"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="all" className="w-full flex-1 flex flex-col">
            <TabsList className="w-full grid grid-cols-2 h-12 rounded-none bg-muted/50 p-2">
              <TabsTrigger value="all" className="rounded-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none rounded-md">
                All
              </TabsTrigger>
              <TabsTrigger value="frequent" className="rounded-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none rounded-md">
                Frequent
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0 flex-1 overflow-hidden">
              <ScrollArea className="h-[calc(100vh-230px)]">
                <div className="p-2">
                  {filteredNavItems.map((section) => (
                    <div key={section.title} className="mb-2">
                      {/* Section Header */}
                      <button
                        onClick={() => toggleSection(section.title)}
                        className={`w-full flex items-center gap-3 p-3 rounded-md hover:bg-muted/80 active:scale-[0.98] transition-all ${
                          expandedSections[section.title] ? "bg-muted/50" : ""
                        }`}
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-muted/80 text-foreground shadow-sm">
                          {section.icon && <section.icon className="h-5 w-5" />}
                        </div>
                        <span className="font-medium">{section.title}</span>
                        <ChevronDown
                          className={`ml-auto h-4 w-4 shrink-0 opacity-70 transition-transform duration-200 ${
                            expandedSections[section.title] ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Section Content */}
                      {expandedSections[section.title] && (
                        <div className="mt-1 ml-4 pl-4 border-l border-muted">
                          {section.items.map((item) => (
                            <div key={item.title} className="mb-1">
                              {hasSubItems(item) ? (
                                <>
                                  {/* Item with subitems */}
                                  <button
                                    onClick={() => toggleItem(item.title)}
                                    className={`w-full flex items-center justify-between p-2.5 rounded-md hover:bg-muted/50 active:scale-[0.98] transition-all ${
                                      expandedItems[item.title] ? "bg-muted/30" : ""
                                    }`}
                                  >
                                    <span className={item.isActive ? "font-medium" : ""}>{item.title}</span>
                                    <ChevronDown
                                      className={`ml-2 h-3.5 w-3.5 shrink-0 opacity-70 transition-transform duration-200 ${
                                        expandedItems[item.title] ? "rotate-180" : ""
                                      }`}
                                    />
                                  </button>

                                  {/* Subitems */}
                                  {expandedItems[item.title] && (
                                    <div className="pl-4 border-l border-border ml-2 mt-1 space-y-1">
                                      {item.items.map((subItem) => (
                                        <a
                                          key={subItem.title}
                                          href={subItem.url}
                                          onClick={() => onOpenChange(false)}
                                          className={`flex items-center p-2 text-sm rounded-md hover:bg-muted/30 active:scale-[0.98] transition-all ${
                                            'isActive' in subItem && subItem.isActive ? "bg-muted/20 font-medium" : ""
                                          }`}
                                        >
                                          {subItem.title}
                                        </a>
                                      ))}
                                    </div>
                                  )}
                                </>
                              ) : (
                                /* Regular item */
                                <a
                                  href={item.url}
                                  onClick={() => onOpenChange(false)}
                                  className={`flex items-center p-2.5 rounded-md hover:bg-muted/50 active:scale-[0.98] transition-all ${
                                    'isActive' in item && item.isActive ? "bg-muted/30 font-medium" : ""
                                  }`}
                                >
                                  {item.title}
                                </a>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="frequent" className="mt-0 flex-1 overflow-hidden">
              <ScrollArea className="h-[calc(100vh-230px)]">
                <div className="p-4 space-y-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Frequently Accessed</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {frequentItems.map((item, index) => (
                      <a
                        key={index}
                        href={item.url}
                        onClick={() => onOpenChange(false)}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/80 active:scale-[0.98] transition-all shadow-sm border border-border/40"
                      >
                        <div className="flex items-center justify-center w-10 h-10 rounded-md bg-muted/80 text-foreground shadow-sm">
                          {item.icon && <item.icon className="h-5 w-5" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{item.title}</p>
                          <p className="text-xs text-muted-foreground truncate">
                            {item.parent ? `${item.section} › ${item.parent}` : item.section}
                          </p>
                          {item.description && (
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{item.description}</p>
                          )}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>

          {/* Footer */}
          <div className="p-4 border-t sticky bottom-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <Button
              variant="outline"
              className="w-full h-10 gap-2 active:scale-[0.98] transition-all shadow-sm"
              onClick={() => onOpenChange(false)}
            >
              <LogOut className="h-4 w-4" />
              <span>Log out</span>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
