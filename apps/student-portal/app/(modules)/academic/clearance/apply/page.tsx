import type { Metadata } from "next"
import { ClearanceTabs } from "@/app/sections/academic/clearance/clearance-tabs"
import { ClearanceApplicationForm } from "@/app/sections/academic/clearance/clearance-application-form"

export const metadata: Metadata = {
  title: "Apply for Clearance | AMS System",
  description: "Submit your clearance application",
}

export default function ClearanceApplicationPage() {
  const studentData = {
    id: "STD123456",
    name: "John Doe",
    course: "Bachelor of Computer Science",
    year: "4th Year",
    registrationNumber: "CS/001/2020",
    faculty: "Faculty of Computing and Information Technology",
  }

  return (
    <div className="p-2">
      <ClearanceTabs student={studentData} activeTab="apply" />

      <div className="mt-6">
        <ClearanceApplicationForm student={studentData} />
      </div>
    </div>
  )
}
