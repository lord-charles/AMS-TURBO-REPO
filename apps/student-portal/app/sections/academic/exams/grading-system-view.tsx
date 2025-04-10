"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, HelpCircle, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function GradingSystemView() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Grading System</CardTitle>
          <CardDescription>
            Comprehensive explanation of the grading system used at Strathmore University
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="undergraduate">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="undergraduate">Undergraduate</TabsTrigger>
              <TabsTrigger value="postgraduate">Postgraduate</TabsTrigger>
            </TabsList>

            <TabsContent value="undergraduate" className="space-y-6 pt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Percentage</TableHead>
                      <TableHead>Letter Grade</TableHead>
                      <TableHead>Grade Points</TableHead>
                      <TableHead>Classification</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">70-100%</TableCell>
                      <TableCell>A</TableCell>
                      <TableCell>4.0</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Excellent</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">60-69%</TableCell>
                      <TableCell>B</TableCell>
                      <TableCell>3.0</TableCell>
                      <TableCell>
                        <Badge className="bg-blue-500">Very Good</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">50-59%</TableCell>
                      <TableCell>C</TableCell>
                      <TableCell>2.0</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-amber-500 text-amber-700">
                          Good
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">40-49%</TableCell>
                      <TableCell>D</TableCell>
                      <TableCell>1.0</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-orange-500 text-orange-700">
                          Satisfactory
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">0-39%</TableCell>
                      <TableCell>F</TableCell>
                      <TableCell>0.0</TableCell>
                      <TableCell>
                        <Badge variant="destructive">Fail</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Degree Classification</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">First Class Honours</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Cumulative GPA of 3.6 and above</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Second Class Honours (Upper Division)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Cumulative GPA of 3.0 to 3.59</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Second Class Honours (Lower Division)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Cumulative GPA of 2.5 to 2.99</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Pass</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Cumulative GPA of 2.0 to 2.49</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Important Information</AlertTitle>
                <AlertDescription>
                  <p className="mb-2">
                    A student must attain a minimum grade of C in all core courses to qualify for graduation.
                  </p>
                  <p>The minimum passing grade for any course is D (40%).</p>
                </AlertDescription>
              </Alert>
            </TabsContent>

            <TabsContent value="postgraduate" className="space-y-6 pt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Percentage</TableHead>
                      <TableHead>Letter Grade</TableHead>
                      <TableHead>Grade Points</TableHead>
                      <TableHead>Classification</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">75-100%</TableCell>
                      <TableCell>A</TableCell>
                      <TableCell>4.0</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Distinction</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">65-74%</TableCell>
                      <TableCell>B</TableCell>
                      <TableCell>3.0</TableCell>
                      <TableCell>
                        <Badge className="bg-blue-500">Credit</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">50-64%</TableCell>
                      <TableCell>C</TableCell>
                      <TableCell>2.0</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-amber-500 text-amber-700">
                          Pass
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">0-49%</TableCell>
                      <TableCell>F</TableCell>
                      <TableCell>0.0</TableCell>
                      <TableCell>
                        <Badge variant="destructive">Fail</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Degree Classification</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Distinction</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Cumulative GPA of 3.7 and above</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Merit</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Cumulative GPA of 3.3 to 3.69</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Pass</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Cumulative GPA of 2.0 to 3.29</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Postgraduate Requirements</AlertTitle>
                <AlertDescription>
                  <p className="mb-2">
                    A student must maintain a minimum cumulative GPA of 2.0 to remain in good academic standing.
                  </p>
                  <p>The minimum passing grade for any postgraduate course is C (50%).</p>
                </AlertDescription>
              </Alert>
            </TabsContent>
          </Tabs>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">GPA Calculation</h3>
            <p className="text-sm text-muted-foreground">
              The Grade Point Average (GPA) is calculated by dividing the total grade points earned by the total credit
              hours attempted.
            </p>

            <div className="p-4 border rounded-md bg-muted/30">
              <h4 className="text-sm font-medium mb-2">Formula:</h4>
              <p className="text-sm font-mono">GPA = Sum(Grade Points × Credit Hours) / Sum(Credit Hours)</p>

              <h4 className="text-sm font-medium mt-4 mb-2">Example:</h4>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course</TableHead>
                      <TableHead>Credit Hours</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Grade Points</TableHead>
                      <TableHead>Quality Points</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>CSC 3101</TableCell>
                      <TableCell>3</TableCell>
                      <TableCell>A</TableCell>
                      <TableCell>4.0</TableCell>
                      <TableCell>12.0</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>BIS 3102</TableCell>
                      <TableCell>4</TableCell>
                      <TableCell>B</TableCell>
                      <TableCell>3.0</TableCell>
                      <TableCell>12.0</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>MAT 2101</TableCell>
                      <TableCell>3</TableCell>
                      <TableCell>C</TableCell>
                      <TableCell>2.0</TableCell>
                      <TableCell>6.0</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>ENG 2103</TableCell>
                      <TableCell>2</TableCell>
                      <TableCell>A</TableCell>
                      <TableCell>4.0</TableCell>
                      <TableCell>8.0</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Total</TableCell>
                      <TableCell className="font-medium">12</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell className="font-medium">38.0</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <p className="text-sm mt-4">GPA = 38.0 / 12 = 3.17 (Second Class Honours, Upper Division)</p>
            </div>
          </div>

          <Alert variant="outline" className="border-primary/50 bg-primary/5">
            <HelpCircle className="h-4 w-4" />
            <AlertTitle>Need Help?</AlertTitle>
            <AlertDescription>
              If you have questions about your grades or GPA calculation, please contact the Examinations Office or your
              academic advisor.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}

