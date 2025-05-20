"use client"

import * as React from "react"
import { Book, Calendar, DollarSign, GraduationCap, HelpCircle, Home, LinkIcon, Sparkles } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { OverviewTab } from "../components/tabs/overview-tab"
import { AcademicsTab } from "../components/tabs/academics-tab"
import { FinancialsTab } from "../components/tabs/financials-tab"
import { AIAssistantTab } from "../components/tabs/ai-assistant-tab"
import { TimetableTab } from "../components/tabs/timetable-tab"
import { SupportTab } from "../components/tabs/support-tab"
import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import Link from "next/link"
import { Card } from "@/components/ui/card"

export default function DashboardModule() {
  const [activeTab, setActiveTab] = React.useState("overview")
  const isMobile = useMediaQuery("(max-width: 768px)")

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    window.history.pushState({}, "", `/dashboard${value !== "overview" ? `?tab=${value}` : ""}`)
  }

  React.useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const tabFromQuery = searchParams.get('tab')

    if (tabFromQuery && ["academics", "financials", "timetable", "ai-assistant", "support"].includes(tabFromQuery)) {
      setActiveTab(tabFromQuery)
    }
  }, [])

  const navigationItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "academics", label: "Academics", icon: Book },
    { id: "financials", label: "Financials", icon: DollarSign },
    { id: "timetable", label: "Timetable", icon: Calendar },
    { id: "ai-assistant", label: "AI Assistant", icon: Sparkles, badge: "New" },
    { id: "support", label: "Support", icon: HelpCircle },
  ]

  return (
    <div className="p-1">
      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={handleTabChange}
        className="space-y-3"
      >
        <div className="sticky top-[var(--header-height)] z-20 bg-background pt-2">
          <div className="flex flex-col gap-3">
          
            <ScrollArea className="w-full">
              <TabsList className={cn(
                "h-auto bg-card/50 backdrop-blur-sm rounded-xl p-2 shadow-sm border justify-between gap-4",
                isMobile ? "w-[max-content] min-w-full" : "w-full"
              )}>
                 <Link 
                href="/dashboard" 
                className="flex items-center gap-2 group hover:text-primary transition-colors"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-md font-semibold leading-none">Analytics Module</h2>
                  <p className="text-xs truncate text-ellipsis text-muted-foreground hidden sm:block">
                    Track academic performance & insights
                  </p>
                </div>
              </Link>
                <div className="flex items-center">
                {navigationItems.map((item) => (
                  <TabsTrigger
                    key={item.id}
                    value={item.id}
                    className={cn(
                      "flex items-center gap-2 py-2.5 px-4 rounded-lg transition-all duration-200",
                      "data-[state=active]:bg-background data-[state=active]:shadow-sm",
                      "data-[state=active]:text-primary data-[state=active]:font-medium",
                      "data-[state=active]:border-b-2 data-[state=active]:border-primary",
                      "relative"
                    )}
                  >
                    <item.icon className={cn(
                      "h-4 w-4 transition-all",
                      "data-[state=active]:text-primary"
                    )} />
                    <span>{item.label}</span>
                    {item.badge && (
                      <Badge
                        variant="secondary"
                        className="z-50 absolute -top-1 -right-2 h-5 px-1.5 text-xs font-medium bg-primary text-primary-foreground animate-pulse"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </TabsTrigger>
                ))}
                </div>
              </TabsList>
              <ScrollBar orientation="horizontal" className="h-2" />
            </ScrollArea>
          </div>
        </div>

        <TabsContent 
          value="overview" 
          className="animate-in fade-in-50 data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0 data-[state=active]:duration-300 px-0.5"
        >
          <OverviewTab />
        </TabsContent>

        <TabsContent 
          value="academics" 
          className="animate-in fade-in-50 data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0 data-[state=active]:duration-300"
        >
          <Card className="p-2">
          <AcademicsTab />
          </Card>
        </TabsContent>

        <TabsContent 
          value="financials" 
          className="animate-in fade-in-50 data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0 data-[state=active]:duration-300">
          <Card className="p-2">
          <FinancialsTab />
          </Card>

        </TabsContent>

        <TabsContent 
          value="timetable" 
          className="animate-in fade-in-50 data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0 data-[state=active]:duration-300"
        >
          <Card className="p-2">
          <TimetableTab />
          </Card>

        </TabsContent>

        <TabsContent 
          value="ai-assistant" 
          className="animate-in fade-in-50 data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0 data-[state=active]:duration-300"
        >
          <Card className="p-2">
          <AIAssistantTab />
          </Card>

        </TabsContent>

        <TabsContent 
          value="support" 
          className="animate-in fade-in-50 data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0 data-[state=active]:duration-300"
        >
          <Card className="p-2">
          <SupportTab />
          </Card>

        </TabsContent>
      </Tabs>
    </div>
  )
}
