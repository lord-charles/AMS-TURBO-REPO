"use client"

import { CheckCircle, Clock } from "lucide-react"
import { format, parseISO } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"

export function PendingTasks() {
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Submit Algorithm Analysis Report",
      course: "CS301",
      dueDate: "2023-11-15T23:59:00",
      completed: false,
      priority: "high",
    },
    {
      id: "2",
      title: "Complete Database Design Project",
      course: "CS305",
      dueDate: "2023-11-20T23:59:00",
      completed: false,
      priority: "medium",
    },
    {
      id: "3",
      title: "Prepare for Midterm Examination",
      course: "CS301",
      dueDate: "2023-11-18T09:00:00",
      completed: false,
      priority: "high",
    },
    {
      id: "4",
      title: "Read Chapter 7 of Textbook",
      course: "MATH201",
      dueDate: "2023-11-12T23:59:00",
      completed: true,
      priority: "low",
    },
  ])

  const toggleTask = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <Badge variant="destructive" className="text-xs">
            High
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="secondary" className="text-xs">
            Medium
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="text-xs">
            Low
          </Badge>
        )
      default:
        return null
    }
  }

  // Sort tasks: incomplete first (by due date), then completed
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1
    }
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-primary" />
          Pending Tasks
        </CardTitle>
        <CardDescription>Tasks and assignments that need your attention</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedTasks.map((task, index) => (
            <div key={task.id} className="space-y-2">
              <div className="flex items-start gap-3">
                <Checkbox
                  id={`task-${task.id}`}
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                  className="mt-1"
                />
                <div className="space-y-1 flex-1">
                  <label
                    htmlFor={`task-${task.id}`}
                    className={`font-medium text-sm ${task.completed ? "line-through text-muted-foreground" : ""}`}
                  >
                    {task.title}
                  </label>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {task.course}
                      </Badge>
                      {getPriorityBadge(task.priority)}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{format(parseISO(task.dueDate), "MMM d, h:mm a")}</span>
                    </div>
                  </div>
                </div>
              </div>
              {index < sortedTasks.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

