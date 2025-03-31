"use client"

import { useState, useEffect } from "react"
import { courses } from "@/lib/academic/data"

export function useCourses() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState(courses)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setData(courses)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return {
    courses: data,
    isLoading,
  }
}

