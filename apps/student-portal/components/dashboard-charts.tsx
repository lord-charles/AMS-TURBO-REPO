import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function DashboardCharts() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Performance Analytics</CardTitle>
        <CardDescription>View your performance metrics over time.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="h-[300px] w-full rounded-lg bg-muted/30 flex items-center justify-center">
              <div className="text-muted-foreground">Chart Visualization</div>
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <div className="h-[300px] w-full rounded-lg bg-muted/30 flex items-center justify-center">
              <div className="text-muted-foreground">Analytics Data</div>
            </div>
          </TabsContent>
          <TabsContent value="reports" className="space-y-4">
            <div className="h-[300px] w-full rounded-lg bg-muted/30 flex items-center justify-center">
              <div className="text-muted-foreground">Reports Data</div>
            </div>
          </TabsContent>
          <TabsContent value="notifications" className="space-y-4">
            <div className="h-[300px] w-full rounded-lg bg-muted/30 flex items-center justify-center">
              <div className="text-muted-foreground">Notifications Data</div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

