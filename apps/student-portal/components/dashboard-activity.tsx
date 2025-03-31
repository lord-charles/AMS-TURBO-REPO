import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function DashboardActivity() {
  const activities = [
    {
      user: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "JD",
      },
      action: "commented on",
      target: "Marketing Campaign",
      time: "2 hours ago",
    },
    {
      user: {
        name: "Sarah Smith",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "SS",
      },
      action: "created",
      target: "New Project Proposal",
      time: "3 hours ago",
    },
    {
      user: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "AJ",
      },
      action: "completed",
      target: "Q3 Financial Report",
      time: "5 hours ago",
    },
    {
      user: {
        name: "Emily Chen",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "EC",
      },
      action: "updated",
      target: "Client Presentation",
      time: "1 day ago",
    },
    {
      user: {
        name: "Michael Brown",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "MB",
      },
      action: "shared",
      target: "Product Roadmap",
      time: "1 day ago",
    },
  ]

  return (
    <Card className="shadow-sm h-full">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions from your team</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-4">
              <Avatar className="h-8 w-8 border">
                <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                <AvatarFallback>{activity.user.initials}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  <span className="font-semibold">{activity.user.name}</span>{" "}
                  <span className="text-muted-foreground">{activity.action}</span>{" "}
                  <span className="font-medium">{activity.target}</span>
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

