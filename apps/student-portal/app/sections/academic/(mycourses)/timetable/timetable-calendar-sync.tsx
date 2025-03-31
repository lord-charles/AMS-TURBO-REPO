"use client"

import { useState } from "react"
import { Check, ExternalLink, RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function TimetableCalendarSync() {
  const [syncStatus, setSyncStatus] = useState<"not-synced" | "syncing" | "synced">("not-synced")
  const [selectedCalendar, setSelectedCalendar] = useState<"google" | "outlook" | "apple">("google")
  const { toast } = useToast()

  const handleSync = () => {
    setSyncStatus("syncing")

    // Simulate API call
    setTimeout(() => {
      setSyncStatus("synced")
      toast({
        title: "Calendar Synced Successfully",
        description: `Your timetable has been synced with ${
          selectedCalendar === "google"
            ? "Google Calendar"
            : selectedCalendar === "outlook"
              ? "Outlook Calendar"
              : "Apple Calendar"
        }`,
      })
    }, 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RefreshCw className="h-5 w-5 text-primary" />
          Calendar Sync
        </CardTitle>
        <CardDescription>Sync your academic timetable with your preferred calendar application</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="text-sm font-medium">Select Calendar Service</div>
          <Select value={selectedCalendar} onValueChange={(value: any) => setSelectedCalendar(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select calendar service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="google">Google Calendar</SelectItem>
              <SelectItem value="outlook">Microsoft Outlook</SelectItem>
              <SelectItem value="apple">Apple Calendar</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Sync Options</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-sm">Include class locations</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-sm">Set reminders (15 minutes before)</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-sm">Include instructor details</span>
            </div>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          Last synced: {syncStatus === "synced" ? "Just now" : "Never"}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button className="w-full" onClick={handleSync} disabled={syncStatus === "syncing"}>
          {syncStatus === "syncing" ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Syncing...
            </>
          ) : syncStatus === "synced" ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Synced
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Sync Now
            </>
          )}
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            Open in{" "}
            {selectedCalendar === "google"
              ? "Google Calendar"
              : selectedCalendar === "outlook"
                ? "Outlook"
                : "Apple Calendar"}
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}

