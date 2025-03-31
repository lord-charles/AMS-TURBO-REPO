"use client"

import * as React from "react"
import { Bell, Calendar, ChevronDown, Command, HelpCircle, Inbox, Keyboard, Layers, LayoutDashboard, LogOut, Menu, MessageSquare, Moon, MoreHorizontal, Search, Settings, Sun, User, Users, Zap, Shield, Star, Clock, Bookmark, BookOpen, FileText, DollarSign, School, AlertTriangle, CreditCard, GraduationCap, Pencil, Activity } from 'lucide-react'
import { cn } from "@/lib/utils"
import { addDays, subDays, subHours, subMinutes } from "date-fns"

import { useDashboard } from "@/contexts/dashboard-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  IconAuth2fa,
  IconLogs,
  IconManualGearbox,
  IconNotification,
  IconPasswordFingerprint,
} from "@tabler/icons-react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { NotificationCenter, type Notification } from "@/components/header-components/notification-center"
import { CommandMenu } from "./header-components/command-menu"
import { useTheme } from "next-themes"
import { DynamicBreadcrumb } from "./header-components/dynamic-breadcrumb"
import { data } from "./app-sidebar"
import ThemeUpdate from "@/lib/theme/themeUpdate"

export function DashboardHeader() {
  const {
    headerStyle,
    colorScheme,
    setColorScheme,
    layoutDensity,
    sidebarPosition,
    isSettingsPanelOpen,
    setIsSettingsPanelOpen,
    isMobileDevice,
    isTabletDevice,
  } = useDashboard()
  const { theme, setTheme } = useTheme()
  const [showMobileMenu, setShowMobileMenu] = React.useState(false)
  const [showCommandMenu, setShowCommandMenu] = React.useState(false)
  const [showMobileSearch, setShowMobileSearch] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [searchHistory, setSearchHistory] = React.useState<any>([])
  const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false)
  const [isNotificationsLoading, setIsNotificationsLoading] = React.useState(false)
  
  // Sample student notifications data
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: "1",
      title: "Assignment deadline approaching",
      description: "Your CS101 Programming Assignment is due in 24 hours. Please submit before the deadline to avoid penalties.",
      timestamp: new Date().toISOString(),
      read: false,
      type: "academic",
      priority: "urgent",
      link: "/academics/assignments",
      relatedEntity: {
        type: "assignment",
        id: "cs101-assignment3",
        title: "CS101: Introduction to Programming - Assignment 3"
      },
      actions: [
        {
          label: "View Assignment",
          icon: FileText,
          onClick: () => console.log("View assignment")
        }
      ]
    },
    {
      id: "2",
      title: "Tuition fee payment reminder",
      description: "Your second semester tuition fee payment is due in 5 days. Please make the payment to avoid late fees.",
      timestamp: subHours(new Date(), 3).toISOString(),
      read: false,
      type: "financial",
      priority: "high",
      link: "/financials/payments",
      relatedEntity: {
        type: "payment",
        id: "tuition-sem2",
        title: "Second Semester Tuition Fee: 2023/2024"
      },
      actions: [
        {
          label: "Pay Now",
          icon: DollarSign,
          onClick: () => console.log("Pay now")
        }
      ]
    },
    {
      id: "3",
      title: "New grade posted",
      description: "Your grade for MTH201 Calculus II has been posted. Check your academic record for details.",
      timestamp: subHours(new Date(), 5).toISOString(),
      read: true,
      type: "academic",
      priority: "medium",
      link: "/academics/grades",
      relatedEntity: {
        type: "course",
        id: "mth201",
        title: "MTH201: Calculus II"
      }
    },
    {
      id: "4",
      title: "Library book due date",
      description: "The book 'Data Structures and Algorithms' is due for return in 2 days. Please return it to avoid late fees.",
      timestamp: subHours(new Date(), 8).toISOString(),
      read: false,
      type: "campus",
      priority: "medium",
      link: "/campus/library",
      relatedEntity: {
        type: "document",
        id: "lib-book-123",
        title: "Data Structures and Algorithms (ISBN: 978-0123456789)"
      }
    },
    {
      id: "5",
      title: "Course registration open",
      description: "Registration for the next semester courses is now open. Please register before the deadline.",
      timestamp: subDays(new Date(), 1).toISOString(),
      read: true,
      type: "administrative",
      priority: "high",
      link: "/academics/registration",
      actions: [
        {
          label: "Register Now",
          icon: Pencil,
          onClick: () => console.log("Register now")
        }
      ]
    },
    {
      id: "6",
      title: "Scholarship application approved",
      description: "Congratulations! Your application for the Merit Scholarship has been approved. Check your financial aid portal for details.",
      timestamp: subDays(new Date(), 1).toISOString(),
      read: true,
      type: "financial",
      priority: "medium",
      link: "/financials/scholarships"
    },
    {
      id: "7",
      title: "Upcoming exam schedule",
      description: "The final exam schedule for this semester has been published. Please check your exam dates and venues.",
      timestamp: subDays(new Date(), 2).toISOString(),
      read: true,
      type: "academic",
      priority: "medium",
      link: "/academics/exams",
      relatedEntity: {
        type: "exam",
        id: "final-exams-2024",
        title: "Final Examinations: Spring 2024"
      }
    },
    {
      id: "8",
      title: "Campus event: Career Fair",
      description: "Don't miss the annual Career Fair happening next week. Meet potential employers and explore internship opportunities.",
      timestamp: subDays(new Date(), 3).toISOString(),
      read: true,
      type: "campus",
      priority: "low",
      link: "/campus/events",
      relatedEntity: {
        type: "event",
        id: "career-fair-2024",
        title: "Annual Career Fair 2024"
      }
    },
    {
      id: "9",
      title: "Account security alert",
      description: "We detected a login to your account from a new device. If this wasn't you, please change your password immediately.",
      timestamp: subDays(new Date(), 4).toISOString(),
      read: true,
      type: "system",
      priority: "high",
      link: "/profile/security",
      actions: [
        {
          label: "Secure Account",
          icon: Shield,
          onClick: () => console.log("Secure account")
        }
      ]
    }
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  // Toggle command menu with keyboard shortcut
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setShowCommandMenu((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  // Detect scroll for header styling
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Simulate loading notifications
  const handleOpenNotifications = () => {
    setIsNotificationsOpen(true)
    setIsNotificationsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsNotificationsLoading(false)
    }, 800)
  }

  // Mark notification as read
  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    )
  }

  // Mark all notifications as read
  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    )
  }

  // Delete notification
  const handleDeleteNotification = (id: string) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== id)
    )
  }

  // View all notifications
  const handleViewAllNotifications = () => {
    setIsNotificationsOpen(false)
    // Navigate to notifications page (would use router in real implementation)
    console.log("Navigate to all notifications")
  }

  // Open notification settings
  const handleNotificationSettings = () => {
    setIsNotificationsOpen(false)
    setIsSettingsPanelOpen(true)
  }


  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-30 flex h-[--header-height] shrink-0 items-center justify-between border-b backdrop-blur supports-[backdrop-filter]:bg-background/60",
          headerStyle === "minimal" && "border-b-0 bg-transparent",
          headerStyle === "elevated" && "shadow-sm border-b-0 bg-background/95",
          headerStyle === "colored" && "bg-primary text-primary-foreground border-primary/20",
          layoutDensity === "compact" && "h-[48px]",
          layoutDensity === "comfortable" && "h-[72px]",
          isScrolled && headerStyle === "minimal" && "shadow-sm bg-background/95 border-b",
        )}
        style={{
          transition:
            "height var(--animation-duration) ease-in-out, background-color var(--animation-duration) ease-in-out, box-shadow var(--animation-duration) ease-in-out",
        }}
      >
        <div className="flex items-center gap-2 px-2 sm:px-4">
          {isMobileDevice ? (
            <Button
              variant="ghost"
              size="icon"
              className="-ml-1 relative overflow-hidden group"
              onClick={() => setShowMobileMenu(true)}
            >
              <Menu className="h-5 w-5 transition-transform group-hover:scale-110 duration-200" />
              <span className="absolute inset-0 rounded-md bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              <span className="sr-only">Menu</span>
            </Button>
          ) : (
            <SidebarTrigger className="-ml-1" />
          )}

          <Separator orientation="vertical" className="mx-2 h-4 hidden sm:block" />

          <DynamicBreadcrumb data={data}  showVersion={true} version='v1.0' />
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center flex-1 px-4 mx-4 relative left-12">
          <div className="relative w-full max-w-md group">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
            <Input
              type="search"
              placeholder="Search..."
              className={cn(
                "w-full pl-8 pr-10 bg-background transition-all duration-300 focus-within:w-[calc(100%+5rem)] focus-within:ring-2 focus-within:ring-ring/30",
                headerStyle === "minimal" && "bg-muted/50 border-muted",
                headerStyle === "colored" &&
                  "bg-primary-foreground/10 border-primary-foreground/20 placeholder:text-primary-foreground/60 text-primary-foreground",
              )}
              onClick={() => setShowCommandMenu(true)}
              readOnly
            />
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <kbd className="pointer-events-none hidden sm:block rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                ⌘K
              </kbd>
            </div>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4">
          {/* Mobile Search Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden relative overflow-hidden group"
            onClick={() => setShowMobileSearch(true)}
          >
            <Search className="h-5 w-5 transition-transform group-hover:scale-110 duration-200" />
            <span className="absolute inset-0 rounded-md bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <span className="sr-only">Search</span>
          </Button>

          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden sm:flex relative overflow-hidden group"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5 transition-transform group-hover:rotate-45 duration-300" />
                  ) : (
                    <Moon className="h-5 w-5 transition-transform group-hover:rotate-12 duration-300" />
                  )}
                  <span className="absolute inset-0 rounded-md bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Toggle theme</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden md:flex relative overflow-hidden group"
                  onClick={() => setShowCommandMenu(true)}
                >
                  <Command className="h-5 w-5 transition-transform group-hover:scale-110 duration-200" />
                  <span className="absolute inset-0 rounded-md bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <span className="sr-only">Command menu</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Command menu (⌘K)</TooltipContent>
            </Tooltip>
          </TooltipProvider>

    {/* Notifications - Now using our new NotificationCenter component */}
    <DropdownMenu open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild onClick={handleOpenNotifications}>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="relative overflow-hidden group"
                    >
                      <Bell className="h-5 w-5 transition-transform group-hover:scale-110 duration-200" />
                      {unreadCount > 0 && (
                        <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground animate-pulse">
                          {unreadCount}
                        </span>
                      )}
                      <span className="absolute inset-0 rounded-md bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      <span className="sr-only">Notifications</span>
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>Notifications</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenuContent align="end" className="p-0">
              <NotificationCenter 
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onMarkAllAsRead={handleMarkAllAsRead}
                onDeleteNotification={handleDeleteNotification}
                onViewAllNotifications={handleViewAllNotifications}
                onSettingsClick={handleNotificationSettings}
                isLoading={isNotificationsLoading}
              />
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "rounded-full transition-all hover:scale-105 hover:ring-2 hover:ring-primary/20",
                  layoutDensity === "compact" ? "h-7 w-7" : "h-8 w-8",
                )}
              >
                <Avatar className="h-full w-full">
                  <AvatarImage src="/avatars/shadcn.jpg" alt="User" />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="mt-8 space-y-2">
                              <DropdownMenuLabel>
                                <h2>Profile</h2>
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="flex space-x-2 items-center">
                                <Settings className="text-primary" size={25} />
                                <h2>Setting</h2>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex space-x-2 items-center">
                                <IconAuth2fa
                                  size={25}
                                  className="text-primary"
                                />
                                <h2>TwoFactor Authentication (2FA)</h2>
                              </DropdownMenuItem>
                           
                              <DropdownMenuItem className="flex space-x-2 items-center">
                                <IconLogs size={25} className="text-primary" />
                                <h2>Security Log</h2>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />

                              <DropdownMenuItem className="flex space-x-2 items-center">
                                <IconNotification
                                  size={25}
                                  className="text-primary"
                                />
                                <h2>Notification Preferences</h2>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="p-2 cursor-pointer" onClick={() => setIsSettingsPanelOpen(true)}>
                  <Settings className="mr-2 h-4 w-4  text-primary" />
                                <span>Customize Dashboard</span>
                              </DropdownMenuItem>
                         
                              <DropdownMenuItem className="flex space-x-2 items-center">
                                <HelpCircle
                                  size={25}
                                  className="text-primary"
                                />{" "}
                                <h2>Help & Support</h2>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex space-x-2 items-center">
                                <IconManualGearbox
                                  size={25}
                                  className="text-primary"
                                />
                                <h2>User Guide</h2>
                              </DropdownMenuItem>

                              <DropdownMenuItem className="flex justify-center items-center gap-x-2">
                                <ThemeUpdate />
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="flex space-x-4 items-center justify-center">
                                <LogOut size={35} className="text-primary" />
                                <h2 className="font-bold text-[20px]">
                                  Logout
                                </h2>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Actions Menu */}
          {isMobileDevice && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative overflow-hidden group">
                  <MoreHorizontal className="h-5 w-5 transition-transform group-hover:scale-110 duration-200" />
                  <span className="absolute inset-0 rounded-md bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <span className="sr-only">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setColorScheme(colorScheme === "dark" ? "light" : "dark")}>
                  {colorScheme === "dark" ? (
                    <>
                      <Sun className="mr-2 h-4 w-4" />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon className="mr-2 h-4 w-4" />
                      <span>Dark Mode</span>
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsSettingsPanelOpen(true)}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Customize</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </header>

      {/* Command Menu */}
      <CommandMenu open={showCommandMenu} onOpenChange={setShowCommandMenu} />
 
      {/* Mobile Menu */}
      <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
        <SheetContent side="left" className="w-[80%] max-w-sm p-0">
          <SheetHeader className="p-4 border-b">
            <SheetTitle className="text-left">Menu</SheetTitle>
            <SheetDescription className="text-left">Navigate to different sections of the dashboard.</SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-100px)]">
            <div className="py-4">
              <div className="space-y-1 px-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <Layers className="mr-2 h-4 w-4" />
                  Projects
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Calendar
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Messages
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Team
                </Button>
              </div>

              <Separator className="my-4" />

              <div className="space-y-1 px-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left"
                  onClick={() => {
                    setShowMobileMenu(false)
                    setIsSettingsPanelOpen(true)
                  }}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help & Support
                </Button>
              </div>

              <Separator className="my-4" />

              <div className="px-4 py-2">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar>
                    <AvatarImage src="/avatars/shadcn.jpg" alt="User" />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">shadcn</p>
                    <p className="text-xs text-muted-foreground">m@example.com</p>
                    <div className="flex items-center mt-1">
                      <Badge variant="secondary" className="text-[10px] px-1 py-0 h-4">
                        Admin
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full" onClick={() => setShowMobileMenu(false)}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Mobile Search */}
      <Sheet open={showMobileSearch} onOpenChange={setShowMobileSearch}>
        <SheetContent side="top" className="h-[50vh]">
          <SheetHeader className="mb-4">
            <SheetTitle>Search</SheetTitle>
            <SheetDescription>Search for anything in your dashboard</SheetDescription>
          </SheetHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-10 pr-4" autoFocus />
          </div>
          <ScrollArea className="h-[calc(50vh-120px)] mt-4">
            <div>
              <p className="text-sm font-medium mb-2">Recent searches</p>
              <div className="space-y-2">
                {searchHistory.map((item: any) => (
                  <Button key={item.id} variant="ghost" className="w-full justify-start text-left">
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.text}
                  </Button>
                ))}
              </div>
            </div>
            <Separator className="my-4" />
            <div>
              <p className="text-sm font-medium mb-2">Quick access</p>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-left">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard overview
                </Button>
                <Button variant="ghost" className="w-full justify-start text-left">
                  <Calendar className="mr-2 h-4 w-4" />
                  Team meeting
                </Button>
                <Button variant="ghost" className="w-full justify-start text-left">
                  <User className="mr-2 h-4 w-4" />
                  User profile
                </Button>
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  )
}
