import { ArrowRightIcon, Users, CreditCard, BarChart3, Activity } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function DashboardMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$45,231.89</div>
          <p className="text-xs text-muted-foreground">+20.1% from last month</p>
        </CardContent>
        <CardFooter className="p-2">
          <div className="flex items-center text-sm text-primary">
            <Button variant="link" className="p-0 h-auto font-normal">
              View report
              <ArrowRightIcon className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </CardFooter>
      </Card>
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+2,350</div>
          <p className="text-xs text-muted-foreground">+180.1% from last month</p>
        </CardContent>
        <CardFooter className="p-2">
          <div className="flex items-center text-sm text-primary">
            <Button variant="link" className="p-0 h-auto font-normal">
              View all
              <ArrowRightIcon className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </CardFooter>
      </Card>
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Sales</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+12,234</div>
          <p className="text-xs text-muted-foreground">+19% from last month</p>
        </CardContent>
        <CardFooter className="p-2">
          <div className="flex items-center text-sm text-primary">
            <Button variant="link" className="p-0 h-auto font-normal">
              View report
              <ArrowRightIcon className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </CardFooter>
      </Card>
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Active Now</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+573</div>
          <p className="text-xs text-muted-foreground">+201 since last hour</p>
        </CardContent>
        <CardFooter className="p-2">
          <div className="flex items-center text-sm text-primary">
            <Button variant="link" className="p-0 h-auto font-normal">
              View all
              <ArrowRightIcon className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

