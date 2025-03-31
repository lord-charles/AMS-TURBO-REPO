import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Plus } from "lucide-react"

export function DashboardProjects() {
  const projects = [
    {
      name: "Website Redesign",
      description: "Redesign the company website with new branding",
      status: "In Progress",
      statusColor: "bg-yellow-500",
      progress: 65,
      dueDate: "Oct 25, 2023",
    },
    {
      name: "Mobile App Development",
      description: "Create a new mobile app for customers",
      status: "On Track",
      statusColor: "bg-green-500",
      progress: 40,
      dueDate: "Nov 15, 2023",
    },
    {
      name: "Marketing Campaign",
      description: "Q4 marketing campaign for new product launch",
      status: "At Risk",
      statusColor: "bg-red-500",
      progress: 20,
      dueDate: "Dec 1, 2023",
    },
    {
      name: "Customer Portal",
      description: "Build a new customer portal for account management",
      status: "Not Started",
      statusColor: "bg-gray-500",
      progress: 0,
      dueDate: "Jan 10, 2024",
    },
  ]

  return (
    <Card className="shadow-sm mt-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Active Projects</CardTitle>
          <CardDescription>Track your ongoing project progress</CardDescription>
        </div>
        <Button size="sm" className="h-8">
          <Plus className="mr-1 h-3.5 w-3.5" />
          New Project
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden border shadow-none">
              <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between">
                <div>
                  <CardTitle className="text-base">{project.name}</CardTitle>
                  <CardDescription className="text-xs mt-1">{project.description}</CardDescription>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="font-normal">
                    <div className={`mr-1.5 h-2 w-2 rounded-full ${project.statusColor}`} />
                    {project.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">Due {project.dueDate}</span>
                </div>
                <div className="mt-3 h-2 w-full rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${project.progress}%` }} />
                </div>
                <div className="mt-1 text-xs text-right text-muted-foreground">{project.progress}% complete</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

