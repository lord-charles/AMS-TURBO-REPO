"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CreditCard, FileText, Home, LifeBuoy, Menu, Receipt, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const routes = [
    {
      href: "/finance/dashboard",
      label: "Dashboard",
      icon: Home,
    },
    {
      href: "/finance/my-fees",
      label: "My Fees",
      icon: Receipt,
    },
    {
      href: "/finance/payments",
      label: "Payments",
      icon: CreditCard,
    },
    {
      href: "/finance/statements",
      label: "Statements",
      icon: FileText,
    },
    {
      href: "/finance/clearance",
      label: "Clearance",
      icon: User,
    },
    {
      href: "/finance/support",
      label: "Support",
      icon: LifeBuoy,
    },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen} >
      <SheetTrigger asChild className="md:hidden">
        <Button variant="outline" size="icon" className="h-8 w-8">
          <Menu className="h-4 w-4" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="pr-0">
        <div className="px-7">
          <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
            <span className="font-bold">Student Portal</span>
          </Link>
        </div>
        <div className="flex flex-col gap-4 py-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2 px-7 py-2 text-sm font-medium ${
                pathname === route.href ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <route.icon className="h-4 w-4" />
              {route.label}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
