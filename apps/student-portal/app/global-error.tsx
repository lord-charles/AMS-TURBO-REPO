"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertOctagon, Home, RefreshCcw } from "lucide-react"

export default function GlobalError({
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
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
          <div className="text-center space-y-6 max-w-md">
            <AlertOctagon className="h-16 w-16 text-destructive mx-auto" />

            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">Critical Error</h1>
              <p className="text-muted-foreground">The application encountered a critical error and cannot continue.</p>
            </div>

            <div className="bg-destructive/10 border border-destructive rounded-md p-4 text-left">
              <p className="text-sm font-semibold text-destructive mb-1">Error Details:</p>
              <p className="text-xs font-mono break-all">
                {error.digest ? `Error ID: ${error.digest}` : error.message || "Unknown error"}
              </p>
            </div>

            <div className="flex flex-col gap-4 justify-center">
              <Button onClick={() => reset()} size="lg">
                <RefreshCcw className="mr-2 h-4 w-4" />
                Restart Application
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Try to Return Home
                </Link>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground pt-4">
              Please contact the system administrator with the error details above.
            </p>
          </div>
        </div>
      </body>
    </html>
  )
}

