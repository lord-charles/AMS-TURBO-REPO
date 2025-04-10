"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CreditCard, FileText, Home, LayoutDashboard, LifeBuoy, Receipt, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { DashboardLayout } from "@/components/dashboard-layout"
import { DashboardHeader } from "@/components/dashboard-header"

const navigationItems = [
  {
    title: "Overview",
    href: "/finance/overview",
    icon: LayoutDashboard,
  },
  {
    title: "Dashboard",
    href: "/finance/dashboard",
    icon: Home,
  },
  {
    title: "My Fees",
    href: "/finance/my-fees",
    icon: Receipt,
  },
  {
    title: "Payments",
    href: "/finance/payments",
    icon: CreditCard,
  },
  {
    title: "Statements",
    href: "/finance/statements",
    icon: FileText,
  },
  {
    title: "Clearance",
    href: "/finance/clearance",
    icon: Shield,
  },
  {
    title: "Support",
    href: "/finance/support",
    icon: LifeBuoy,
  },
]

export default function FinanceLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <DashboardLayout>
      <DashboardHeader />
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="p-2 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <MobileNav pathname={pathname} />
            <Link href="/" className="flex items-center gap-2">
              <div className="rounded-md bg-primary p-1">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="hidden font-bold sm:inline-block text-2xl">Student Finance</span>
            </Link>
          </div>

          <DesktopNav pathname={pathname} />

        </div>
      </header>
      <main className="flex-1 bg-muted/20">{children}</main>
   
    </div>
    </DashboardLayout>
  )
}

function MobileNav({ pathname }: { pathname: string }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="h-8 w-8 md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <line x1="3" x2="21" y1="6" y2="6" />
            <line x1="3" x2="21" y1="12" y2="12" />
            <line x1="3" x2="21" y1="18" y2="18" />
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <div className="px-7">
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-md bg-primary p-1">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold">Student Portal</span>
          </Link>
        </div>
        <div className="flex flex-col gap-4 py-4">
          {navigationItems.map((item) => (
            <MobileNavLink key={item.href} item={item} pathname={pathname} />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}

function MobileNavLink({ item, pathname }: { item: (typeof navigationItems)[number]; pathname: string }) {
  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-2 px-7 py-2 text-sm font-medium",
        isActive ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground",
      )}
    >
      <item.icon className="h-4 w-4" />
      {item.title}
    </Link>
  )
}

function DesktopNav({ pathname }: { pathname: string }) {
  return (
    <nav className="hidden md:flex items-center space-x-1">
      {navigationItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex h-9 items-center gap-1 rounded-md px-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}
