"use client"
import { Bot } from "lucide-react"

import { Skeleton } from "@/components/ui/skeleton"

export function AIMessageSkeleton() {
  return (
    <div className="mb-4 flex items-start gap-3 last:mb-0">
      <div className="flex h-7 w-7 shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm">
        <Bot className="h-4 w-4" />
      </div>
      <div className="flex-1 space-y-2 overflow-hidden rounded-lg bg-muted/50 px-4 py-3">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  )
}

