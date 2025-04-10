import { ClearanceOverview } from "@/app/sections/academic/clearance/clearance-overview"
import { ClearanceTabs } from "@/app/sections/academic/clearance/clearance-tabs"
import type { Metadata } from "next"


export const metadata: Metadata = {
  title: "Student Clearance | AMS System",
  description: "Apply and track your university clearance process",
}

export default async function ClearancePage() {
  const studentData = {
    id: "STD123456",
    name: "John Doe",
    course: "Bachelor of Computer Science",
    year: "4th Year",
    registrationNumber: "CS/001/2020",
    faculty: "Faculty of Computing and Information Technology",
  }

  const clearanceStatus = {
    applicationSubmitted: true,
    applicationDate: "2023-11-15T09:30:00Z",
    status: "in-progress", // pending, in-progress, approved, rejected
    departments: [
      {
        name: "Library",
        status: "approved",
        comment: "All books returned",
        approvedBy: "Jane Smith",
        approvedAt: "2023-11-16T14:20:00Z",
      },
      {
        name: "Finance",
        status: "pending",
        comment: "",
        approvedBy: "",
        approvedAt: "",
      },
      {
        name: "Accommodation",
        status: "approved",
        comment: "Room inspection passed",
        approvedBy: "David Maina",
        approvedAt: "2023-11-17T10:15:00Z",
      },
      {
        name: "Academic Department",
        status: "pending",
        comment: "",
        approvedBy: "",
        approvedAt: "",
      },
      {
        name: "Sports & Recreation",
        status: "approved",
        comment: "No equipment borrowed",
        approvedBy: "Sarah Wanjiku",
        approvedAt: "2023-11-16T11:45:00Z",
      },
      {
        name: "Security",
        status: "pending",
        comment: "",
        approvedBy: "",
        approvedAt: "",
      },
    ],
    notifications: [
      {
        id: "1",
        title: "Library Clearance Approved",
        message: "Your library clearance has been approved. All books have been returned successfully.",
        date: "2023-11-16T14:20:00Z",
        read: true,
      },
      {
        id: "2",
        title: "Accommodation Clearance Approved",
        message: "Your accommodation clearance has been approved. Room inspection passed.",
        date: "2023-11-17T10:15:00Z",
        read: true,
      },
      {
        id: "3",
        title: "Finance Department Reminder",
        message: "Please visit the Finance Department to clear your outstanding balance of KES 5,000.",
        date: "2023-11-18T09:30:00Z",
        read: false,
      },
      {
        id: "4",
        title: "Sports & Recreation Clearance Approved",
        message: "Your sports & recreation clearance has been approved.",
        date: "2023-11-16T11:45:00Z",
        read: false,
      },
    ],
  }

  return (
    <div className="p-2">
      <ClearanceTabs student={studentData} activeTab="overview" />
      <div className="mt-4">
        <ClearanceOverview clearanceStatus={clearanceStatus} />
      </div>
    </div>
  )
}
