"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ClearanceTimeline } from "@/app/sections/academic/clearance/clearance-timeline"
import { ClearanceRequirements } from "@/app/sections/academic/clearance/clearance-requirements"
import { ClearanceStatusCard } from "@/app/sections/academic/clearance/clearance-status-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

interface Student {
  id: string
  name: string
  course: string
  year: string
  registrationNumber: string
  faculty: string
}

interface Department {
  name: string
  status: string
  comment: string
  approvedBy: string
  approvedAt: string
}

interface ClearanceStatus {
  applicationSubmitted: boolean
  applicationDate: string
  status: string
  departments: Department[]
  notifications: {
    id: string
    title: string
    message: string
    date: string
    read: boolean
  }[]
}

interface ClearanceOverviewProps {
  clearanceStatus: ClearanceStatus
}

export function ClearanceOverview({ clearanceStatus }: ClearanceOverviewProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column */}
        <motion.div
          className="md:col-span-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className=" shadow-sm h-full">
            <CardHeader className=" border-b px-6 py-4">
              <Tabs defaultValue="timeline" className="w-full">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Clearance Details</CardTitle>
                  <TabsList className="bg-background border ">
                    <TabsTrigger value="timeline" className="text-sm">
                      Timeline
                    </TabsTrigger>
                    <TabsTrigger value="requirements" className="text-sm">
                      Requirements
                    </TabsTrigger>
                  </TabsList>
                </div>
              </Tabs>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="timeline" className="w-full">
                <TabsContent value="timeline" className="p-6 m-0">
                  <ClearanceTimeline departments={clearanceStatus.departments} />
                </TabsContent>
                <TabsContent value="requirements" className="p-6 m-0">
                  <ClearanceRequirements />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <ClearanceStatusCard status={clearanceStatus.status} departments={clearanceStatus.departments} />
        </motion.div>
      </div>
    </div>
  )
}
