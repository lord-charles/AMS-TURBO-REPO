'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Home, Search } from "lucide-react"
import React from "react"

export default function NotFound() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold tracking-tight">Page Not Found</h2>
          <p className="text-muted-foreground">
            We couldn't find the page you were looking for. It might have been moved or deleted.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard?tab=support">
              <BookOpen className="mr-2 h-4 w-4" />
              Browse Courses
            </Link>
          </Button>
        </div>

        <div className="pt-6 border-t">
          <p className="text-sm text-muted-foreground mb-4">Looking for something specific?</p>
          <div className="flex gap-2 justify-center">
            <Button variant="outline" asChild 
              >
              <Link href="/dashboard?tab=support">
                <Search className="mr-2 h-4 w-4" />
                Search Portal
              </Link>
            </Button> 
          </div>
        </div>
      </div>
    </div>
    
  )
}

