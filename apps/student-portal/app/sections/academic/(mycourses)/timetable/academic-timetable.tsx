"use client"

import { useState } from "react"
import { Bell, Building, CalendarDays, Clock, Download, List, Search, Settings } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { TimetableWeeklyView } from "./timetable-weekly-view"
import { TimetableListView } from "./timetable-list-view"
import { TimetableCalendarSync } from "./timetable-calendar-sync"
import { TimetableNotifications } from "./timetable-notifications"
import { TimetableFilters } from "./timetable-filters"
import { TimetableUpdates } from "./timetable-updates"
import { TimetableRoomDetails } from "./timetable-room-details"
import { TimetableFacultyDetails } from "./timetable-faculty-details"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { CampusMap } from "./campus-map"

export function AcademicTimetable() {
  const [viewMode, setViewMode] = useState<"weekly" | "list">("weekly")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSemester, setSelectedSemester] = useState("fall2023")
  const [selectedWeek, setSelectedWeek] = useState("current")
  const isMobile = useMediaQuery("(max-width: 768px)")
  const { toast } = useToast()

  const handleExport = (format: string) => {
    toast({
      title: "Timetable Exported",
      description: `Your timetable has been exported in ${format.toUpperCase()} format.`,
    })
  }

  const handlePrint = () => {
    toast({
      title: "Print Initiated",
      description: "Your timetable is being prepared for printing.",
    })
    // In a real implementation, this would trigger the print dialog
    window.print && window.print()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Class Schedule & Timetable</h1>
          <p className="text-muted-foreground">
            View your personalized class schedule, lectures, and academic timetable
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fall2023">Fall 2023</SelectItem>
              <SelectItem value="spring2024">Spring 2024</SelectItem>
              <SelectItem value="summer2024">Summer 2024</SelectItem>
              <SelectItem value="fall2024">Fall 2024</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="schedule" className="space-y-6">
        <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 lg:flex lg:w-auto">
          <TabsTrigger value="schedule" className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span>Schedule</span>
          </TabsTrigger>
          <TabsTrigger value="updates" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Updates</span>
            <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-[10px]">3</Badge>
          </TabsTrigger>
          <TabsTrigger value="locations" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            <span>Locations & Faculty</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </TabsTrigger>
        </TabsList>

        {/* Schedule Tab */}
        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-primary" />
                  <CardTitle>Academic Timetable</CardTitle>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Select value={selectedWeek} onValueChange={setSelectedWeek}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select week" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current">Current Week</SelectItem>
                      <SelectItem value="next">Next Week</SelectItem>
                      <SelectItem value="week3">Week 3</SelectItem>
                      <SelectItem value="week4">Week 4</SelectItem>
                      <SelectItem value="week5">Week 5</SelectItem>
                    </SelectContent>
                  </Select>

                  <Tabs
                    value={viewMode}
                    onValueChange={(value) => setViewMode(value as "weekly" | "list")}
                    className="w-full sm:w-auto"
                  >
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="weekly" className="flex items-center gap-1">
                        <CalendarDays className="h-4 w-4" />
                        <span className="hidden sm:inline">Weekly View</span>
                      </TabsTrigger>
                      <TabsTrigger value="list" className="flex items-center gap-1">
                        <List className="h-4 w-4" />
                        <span className="hidden sm:inline">List View</span>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
              <CardDescription>
                Your scheduled lectures, tutorials, and lab sessions for the current semester
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div className="relative w-full sm:w-[300px]">
                  <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search classes, instructors, rooms..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <TimetableFilters />
              </div>

              {viewMode === "weekly" ? <TimetableWeeklyView /> : <TimetableListView />}
            </CardContent>
            <CardFooter className="flex flex-wrap justify-between gap-2 border-t pt-6">
              <div className="flex items-center text-sm text-muted-foreground">
                <div className="flex items-center mr-4">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                  <span>Lecture</span>
                </div>
                <div className="flex items-center mr-4">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                  <span>Tutorial</span>
                </div>
                <div className="flex items-center mr-4">
                  <div className="w-3 h-3 rounded-full bg-amber-500 mr-1"></div>
                  <span>Lab</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-500 mr-1"></div>
                  <span>Seminar</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => handleExport("ics")}>
                  <Download className="mr-2 h-4 w-4" />
                  Export (ICS)
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleExport("pdf")}>
                  <Download className="mr-2 h-4 w-4" />
                  Export (PDF)
                </Button>
                <Button variant="outline" size="sm" onClick={handlePrint}>
                  Print
                </Button>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <CardTitle>Class Timings</CardTitle>
              </div>
              <CardDescription>Standard class session timings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                <div className="p-3 border rounded-md">
                  <div className="font-medium">Morning Session 1</div>
                  <div className="text-sm text-muted-foreground">8:00 AM - 10:00 AM</div>
                </div>
                <div className="p-3 border rounded-md">
                  <div className="font-medium">Morning Session 2</div>
                  <div className="text-sm text-muted-foreground">10:15 AM - 12:15 PM</div>
                </div>
                <div className="p-3 border rounded-md">
                  <div className="font-medium">Lunch Break</div>
                  <div className="text-sm text-muted-foreground">12:15 PM - 1:30 PM</div>
                </div>
                <div className="p-3 border rounded-md">
                  <div className="font-medium">Afternoon Session 1</div>
                  <div className="text-sm text-muted-foreground">1:30 PM - 3:30 PM</div>
                </div>
                <div className="p-3 border rounded-md">
                  <div className="font-medium">Afternoon Session 2</div>
                  <div className="text-sm text-muted-foreground">3:45 PM - 5:45 PM</div>
                </div>
                <div className="p-3 border rounded-md">
                  <div className="font-medium">Evening Session</div>
                  <div className="text-sm text-muted-foreground">6:00 PM - 8:00 PM</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Updates Tab */}
        <TabsContent value="updates" className="space-y-6">
          <TimetableUpdates />
        </TabsContent>

        {/* Locations & Faculty Tab */}
        <TabsContent value="locations" className="space-y-6">
          <Tabs defaultValue="map">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="map">Campus Map</TabsTrigger>
              <TabsTrigger value="rooms">Rooms & Buildings</TabsTrigger>
              <TabsTrigger value="faculty">Faculty Directory</TabsTrigger>
            </TabsList>

            <TabsContent value="map" className="mt-6">
              <CampusMap />
            </TabsContent>

            <TabsContent value="rooms" className="mt-6">
              <TimetableRoomDetails />
            </TabsContent>

            <TabsContent value="faculty" className="mt-6">
              <TimetableFacultyDetails />
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <TimetableCalendarSync />
            <TimetableNotifications />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

