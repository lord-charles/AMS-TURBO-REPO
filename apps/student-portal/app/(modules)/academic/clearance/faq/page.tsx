import type { Metadata } from "next"
import { ClearanceTabs } from "@/app/sections/academic/clearance/clearance-tabs"
import { ClearanceFAQ } from "@/app/sections/academic/clearance/clearance-faq"

export const metadata: Metadata = {
  title: "Clearance FAQ | Student Clearance",
  description: "Frequently asked questions about the clearance process",
}

export default function FAQPage() {
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
      <ClearanceTabs student={studentData} activeTab="faq" />

      <div className="mt-6">
        <ClearanceFAQ />
      </div>
    </div>
  )
}
