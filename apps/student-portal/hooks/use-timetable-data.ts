"use client"

import { useState, useEffect } from "react"

// Define types for timetable data
export type ClassSession = {
  id: string
  course: string
  title: string
  type: string
  date: string
  startTime: string
  endTime: string
  location: string
  instructor: string
  notes?: string
}

export function useTimetableData() {
  const [isLoading, setIsLoading] = useState(true)
  const [classes, setClasses] = useState<ClassSession[]>([])

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setClasses(mockTimetableData)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return {
    classes,
    isLoading,
  }
}

// Mock data for timetable
const mockTimetableData: ClassSession[] = [
  {
    id: "class1",
    course: "CS301",
    title: "Data Structures & Algorithms",
    type: "Lecture",
    date: "2023-11-13", // Monday
    startTime: "10:00",
    endTime: "12:00",
    location: "Block B, Room 203",
    instructor: "Dr. Sarah Johnson",
  },
  {
    id: "class2",
    course: "CS301",
    title: "Data Structures & Algorithms",
    type: "Tutorial",
    date: "2023-11-15", // Wednesday
    startTime: "14:00",
    endTime: "15:00",
    location: "Computer Lab 1",
    instructor: "Mr. James Wilson",
  },
  {
    id: "class3",
    course: "CS305",
    title: "Database Systems",
    type: "Lecture",
    date: "2023-11-14", // Tuesday
    startTime: "14:00",
    endTime: "16:00",
    location: "Block A, Room 105",
    instructor: "Prof. Michael Chen",
  },
  {
    id: "class4",
    course: "CS305",
    title: "Database Systems",
    type: "Lab",
    date: "2023-11-16", // Thursday
    startTime: "9:00",
    endTime: "11:00",
    location: "Computer Lab 2",
    instructor: "Prof. Michael Chen",
    notes: "Bring your laptops with MySQL installed",
  },
  {
    id: "class5",
    course: "MATH201",
    title: "Discrete Mathematics",
    type: "Lecture",
    date: "2023-11-13", // Monday
    startTime: "8:00",
    endTime: "10:00",
    location: "Block A, Room 101",
    instructor: "Dr. Robert Williams",
  },
  {
    id: "class6",
    course: "MATH201",
    title: "Discrete Mathematics",
    type: "Tutorial",
    date: "2023-11-17", // Friday
    startTime: "13:00",
    endTime: "14:00",
    location: "Block A, Room 102",
    instructor: "Ms. Emily Parker",
  },
  {
    id: "class7",
    course: "ENG203",
    title: "Technical Communication",
    type: "Seminar",
    date: "2023-11-15", // Wednesday
    startTime: "16:00",
    endTime: "18:00",
    location: "Block C, Room 110",
    instructor: "Prof. Emily Parker",
  },
  {
    id: "class8",
    course: "CS205",
    title: "Computer Networks",
    type: "Lecture",
    date: "2023-11-14", // Tuesday
    startTime: "11:00",
    endTime: "13:00",
    location: "Block B, Room 105",
    instructor: "Dr. James Wilson",
  },
  {
    id: "class9",
    course: "CS205",
    title: "Computer Networks",
    type: "Lab",
    date: "2023-11-16", // Thursday
    startTime: "14:00",
    endTime: "16:00",
    location: "Network Lab",
    instructor: "Dr. James Wilson",
    notes: "Network configuration practical session",
  },
  // Additional classes for the next week
  {
    id: "class10",
    course: "CS301",
    title: "Data Structures & Algorithms",
    type: "Lecture",
    date: "2023-11-20", // Next Monday
    startTime: "10:00",
    endTime: "12:00",
    location: "Block B, Room 203",
    instructor: "Dr. Sarah Johnson",
  },
  {
    id: "class11",
    course: "CS305",
    title: "Database Systems",
    type: "Lecture",
    date: "2023-11-21", // Next Tuesday
    startTime: "14:00",
    endTime: "16:00",
    location: "Block A, Room 105",
    instructor: "Prof. Michael Chen",
    notes: "Guest lecture on Big Data",
  },
]

