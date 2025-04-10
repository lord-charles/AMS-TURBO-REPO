"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Home, RefreshCcw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
      <div className="text-center space-y-6 max-w-md">
        <AlertTriangle className="h-12 w-12 text-destructive mx-auto" />

        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">Something went wrong</h2>
          <p className="text-muted-foreground">We encountered an unexpected error while processing your request.</p>
        </div>

        <Alert variant="destructive" className="text-left">
          <AlertTitle>Error Details</AlertTitle>
          <AlertDescription className="text-xs font-mono mt-2 break-all">
            {error.digest ? `Error ID: ${error.digest}` : error.message || "Unknown error"}
          </AlertDescription>
        </Alert>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => reset()}>
            <RefreshCcw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Return to Dashboard
            </Link>
          </Button>
        </div>

        <p className="text-sm text-muted-foreground pt-4">
          If this problem persists, please contact the IT support team.
        </p>
      </div>
    </div>
  )
}

