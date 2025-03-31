"use client"

import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

export function TimetableFilters() {
  const [classTypes, setClassTypes] = useState({
    lecture: true,
    tutorial: true,
    lab: true,
    seminar: true,
  })

  const [courses, setCourses] = useState({
    CS301: true,
    CS305: true,
    MATH201: true,
    ENG203: true,
    CS205: true,
  })

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            Class Types
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Filter by Class Type</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={classTypes.lecture}
            onCheckedChange={(checked) => setClassTypes({ ...classTypes, lecture: !!checked })}
          >
            Lectures
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={classTypes.tutorial}
            onCheckedChange={(checked) => setClassTypes({ ...classTypes, tutorial: !!checked })}
          >
            Tutorials
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={classTypes.lab}
            onCheckedChange={(checked) => setClassTypes({ ...classTypes, lab: !!checked })}
          >
            Labs
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={classTypes.seminar}
            onCheckedChange={(checked) => setClassTypes({ ...classTypes, seminar: !!checked })}
          >
            Seminars
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            Courses
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Filter by Course</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {Object.entries(courses).map(([course, checked]) => (
            <DropdownMenuCheckboxItem
              key={course}
              checked={checked}
              onCheckedChange={(isChecked) => setCourses({ ...courses, [course]: !!isChecked })}
            >
              {course}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

