import React from 'react'
import { DashboardLayout } from '@/components/dashboard-layout'
import { DashboardHeader } from '@/components/dashboard-header'
import DashboardModule from '@/app/sections/(Home & Essentials)/dashboard/home/tabs'

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <DashboardHeader />
     <DashboardModule/>
    </DashboardLayout>
  )
}

