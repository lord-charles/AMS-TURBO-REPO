import type { Metadata } from "next"
import { ClearanceTabs } from "@/app/sections/academic/clearance/clearance-tabs"
import { ClearanceCertificate } from "@/app/sections/academic/clearance/clearance-certificate"

export const metadata: Metadata = {
  title: "Clearance Certificate | AMS System",
  description: "View and download your clearance certificate",
}

export default function ClearanceCertificatePage() {
  const studentData = {
    id: "STD123456",
    name: "John Doe",
    course: "Bachelor of Computer Science",
    year: "4th Year",
    registrationNumber: "CS/001/2020",
    faculty: "Faculty of Computing and Information Technology",
  }

  const certificateData = {
    certificateNumber: "CLR/2023/001234",
    issueDate: "2023-12-01T10:30:00Z",
    validUntil: "2024-12-01T10:30:00Z",
    departments: [
      {
        name: "Library",
        approvedBy: "Jane Smith",
        approvedAt: "2023-11-16T14:20:00Z",
      },
      {
        name: "Finance",
        approvedBy: "Michael Omondi",
        approvedAt: "2023-11-20T09:45:00Z",
      },
      {
        name: "Accommodation",
        approvedBy: "David Maina",
        approvedAt: "2023-11-17T10:15:00Z",
      },
      {
        name: "Academic Department",
        approvedBy: "Prof. Lucy Wambui",
        approvedAt: "2023-11-25T15:30:00Z",
      },
      {
        name: "Sports & Recreation",
        approvedBy: "Sarah Wanjiku",
        approvedAt: "2023-11-16T11:45:00Z",
      },
      {
        name: "Security",
        approvedBy: "James Otieno",
        approvedAt: "2023-11-22T13:10:00Z",
      },
    ],
    registrarSignature: true,
    registrarName: "Dr. Francis Mwangi",
    registrarTitle: "University Registrar",
  }

  return (
    <div className="p-2">
      <ClearanceTabs student={studentData} activeTab="certificate" />

      <div className="mt-6">
        <ClearanceCertificate student={studentData} certificate={certificateData} />
      </div>
    </div>
  )
}
