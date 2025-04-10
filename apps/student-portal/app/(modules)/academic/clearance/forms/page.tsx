import type { Metadata } from "next"
import { ClearanceTabs } from "@/app/sections/academic/clearance/clearance-tabs"
import { ClearanceForms } from "@/app/sections/academic/clearance/clearance-forms"

export const metadata: Metadata = {
  title: "Clearance Forms | AMS System",
  description: "Download your clearance forms",
}

export default function ClearanceFormsPage() {
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
      <ClearanceTabs student={studentData} activeTab="forms" />

      <div className="mt-6">
        <ClearanceForms student={studentData} />
      </div>
    </div>
  )
}
