"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

import { DashboardProvider } from "@/contexts/dashboard-context"
import { AppSidebar } from "./app-sidebar"
import { DashboardSettings } from "./dashboard-settings"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { useDashboard } from "@/contexts/dashboard-context"
import { useMediaQuery } from "@/hooks/use-media-query"

interface DashboardLayoutProps {
  children: React.ReactNode
}

function DashboardLayoutInner({ children }: DashboardLayoutProps) {
  const {
    sidebarPosition,
    contentWidth,
    layoutDensity,
    animationsEnabled,
    animationSpeed,
    isReducedMotion,
    isMobileDevice,
  } = useDashboard()

  // Get animation style
  const getAnimationStyle = () => {
    if (!animationsEnabled || isReducedMotion) return {}

    return {
      transition: `all var(--animation-duration) ${animationSpeed === "fast" ? "cubic-bezier(0.4, 0, 0.2, 1)" : "ease-in-out"}`,
    }
  }

  return (
    <div
      className={cn(
        "relative flex min-h-screen w-full",
        sidebarPosition === "right" && "flex-row-reverse",
        `density-${layoutDensity}`,
        isMobileDevice && "flex-col",
      )}
      style={getAnimationStyle()}
    >
      <AppSidebar />
      <SidebarInset
        className="flex-1 flex flex-col"
        style={
          {
            "--content-max-width": `${contentWidth}%`,
          } as React.CSSProperties
        }
      >
        {children}
      </SidebarInset>
    </div>
  )
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  // Get the sidebar state from localStorage on client side
  const [defaultOpen, setDefaultOpen] = React.useState(true)
  const isMobile = useMediaQuery("(max-width: 768px)")

  React.useEffect(() => {
    // Check localStorage for saved sidebar state
    const savedState = localStorage.getItem("sidebar:state")
    if (savedState !== null) {
      setDefaultOpen(savedState === "true")
    }

    // Close sidebar by default on mobile
    if (isMobile) {
      setDefaultOpen(false)
    }
  }, [isMobile])

  return (
    <DashboardProvider>
        <SidebarProvider defaultOpen={defaultOpen}>
          <DashboardLayoutInner>{children}</DashboardLayoutInner>
          <DashboardSettings />
        </SidebarProvider>
    </DashboardProvider>
  )
}

