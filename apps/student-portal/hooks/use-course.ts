"use client"

import { useState, useEffect } from "react"
import { getCourseById } from "@/lib/academic/data"

export function useCourse(courseId: string) {
  const [isLoading, setIsLoading] = useState(true)
  const [course, setCourse] = useState<any>(null)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setCourse(getCourseById(courseId))
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [courseId])

  return {
    course,
    isLoading,
  }
}

