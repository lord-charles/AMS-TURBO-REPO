"use client"

import * as React from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"
import { format, subDays } from "date-fns"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertCircle, ArrowRight, BarChart3, Bell, BookOpen, Calendar, Check, ChevronRight, Clock, DollarSign, Download, ExternalLink, Eye, FileText, GraduationCap, HelpCircle, Info, Layers, Lightbulb, Loader2, MoreHorizontal, Pencil, Pin, PlusCircle, RefreshCw, Save, Search, Settings, Star, Trash2, TrendingUp, User, Zap } from 'lucide-react'

export function OverviewTab() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [showAnnouncementDetails, setShowAnnouncementDetails] = React.useState<string | null>(null)
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")

  // Mock data
  const studentInfo = {
    name: "John Mwangi",
    id: "STU2023001",
    program: "Bachelor of Computer Science",
    year: "3rd Year",
    semester: "Fall 2023",
    gpa: 3.7,
    creditsEarned: 86,
    creditsRequired: 120,
    academicStanding: "Good Standing",
    advisor: "Dr. Sarah Odhiambo",
    nextAdvisorMeeting: "2023-07-28T14:30:00Z",
    enrollmentStatus: "Enrolled",
    lastLogin: "2023-07-19T08:45:00Z"
  }

  // Mock upcoming deadlines
  const upcomingDeadlines = [
    {
      id: "deadline1",
      title: "CS301 Midterm Exam",
      dueDate: "2023-07-25T14:00:00Z",
      course: "CS301",
      type: "exam",
      priority: "high",
      location: "Main Hall, Block A",
      description: "Covers all topics from weeks 1-6. Bring your student ID and calculator."
    },
    {
      id: "deadline2",
      title: "MATH201 Assignment Submission",
      dueDate: "2023-07-28T23:59:00Z",
      course: "MATH201",
      type: "assignment",
      priority: "medium",
      description: "Submit via the learning portal. Late submissions will incur a 10% penalty per day."
    },
    {
      id: "deadline3",
      title: "Course Registration Deadline",
      dueDate: "2023-08-05T23:59:00Z",
      type: "administrative",
      priority: "high",
      description: "Last day to register for Fall 2023 courses. Ensure all prerequisites are met."
    },
    {
      id: "deadline4",
      title: "Tuition Fee Payment",
      dueDate: "2023-08-10T23:59:00Z",
      type: "financial",
      priority: "high",
      description: "Final installment for Fall 2023 semester. Late payment will incur a 5% penalty."
    }
  ]

  // Mock recent activity
  const recentActivity = [
    {
      id: "activity1",
      type: "grade",
      title: "Assignment Graded",
      description: "CS301: Data Structures Assignment 2",
      score: "92/100",
      timestamp: "2023-07-19T14:30:00Z",
      course: "CS301"
    },
    {
      id: "activity2",
      type: "submission",
      title: "Assignment Submitted",
      description: "MATH201: Combinatorial Mathematics Problem Set",
      timestamp: "2023-07-18T23:45:00Z",
      course: "MATH201"
    },
    {
      id: "activity3",
      type: "quiz",
      title: "Quiz Completed",
      description: "CS305: Database Systems Quiz 3",
      score: "85%",
      timestamp: "2023-07-17T10:15:00Z",
      course: "CS305"
    },
    {
      id: "activity4",
      type: "enrollment",
      title: "Course Enrollment",
      description: "Added ENG203: Technical Communication",
      timestamp: "2023-07-15T09:30:00Z",
      course: "ENG203"
    },
    {
      id: "activity5",
      type: "payment",
      title: "Tuition Payment",
      description: "Second installment for Fall 2023",
      amount: "KES 45,000",
      timestamp: "2023-07-14T11:20:00Z"
    }
  ]

  // Mock announcements
  const announcements = [
    {
      id: "announcement1",
      title: "Fall Registration Opens Next Week",
      date: "2023-07-19T09:00:00Z",
      category: "registration",
      priority: "high",
      content: "Registration for Fall 2023 courses begins on Monday, July 24. Make sure to meet with your advisor before registering. Priority registration will be available for final year students on July 23.\n\nEnsure that you have cleared any outstanding balances with the finance office to avoid registration holds. The course catalog has been updated with new offerings and can be accessed through the student portal.\n\nRegistration closes on August 5, 2023. Late registration will incur additional fees.",
      author: "Office of the Registrar"
    },
    {
      id: "announcement2",
      title: "Library Hours Extended During Finals",
      date: "2023-07-17T14:30:00Z",
      category: "facilities",
      priority: "medium",
      content: "The main library will be open 24/7 during finals week (August 14-18) to accommodate student study needs. Additional study spaces will be available in Blocks B and C.\n\nQuiet zones will be strictly enforced during this period. Group study rooms must be booked in advance through the library portal.\n\nLibrary staff will be available for extended hours to assist with research and resource access. The digital resource center will also remain open until midnight each day.",
      author: "University Library"
    },
    {
      id: "announcement3",
      title: "Campus Career Fair",
      date: "2023-07-15T10:00:00Z",
      category: "career",
      priority: "medium",
      content: "Don't miss the annual career fair on August 5th. Over 50 companies will be recruiting for internships and full-time positions. Bring multiple copies of your resume and dress professionally.\n\nPre-registration is required through the Career Services portal. Students who pre-register will have access to the employer list and can schedule priority interviews.\n\nPreparation workshops will be held on July 25, 27, and 30 to help you make the most of this opportunity. Sign up through the Career Services portal.",
      author: "Career Services"
    }
  ]

  // Mock insights
  const insights = {
    academic: [
      {
        id: "insight1",
        title: "Your performance in CS301 has improved by 15% this semester",
        description: "Keep up the good work in Data Structures & Algorithms",
        type: "improvement",
        course: "CS301",
        metric: {
          current: 85,
          previous: 70,
          change: 15
        }
      },
      {
        id: "insight2",
        title: "You're in the top 10% of your class in ENG203",
        description: "Your technical writing skills are exceptional",
        type: "strength",
        course: "ENG203",
        metric: {
          current: 92,
          previous: 88,
          change: 4
        }
      }
    ],
    learning: [
      {
        id: "insight3",
        title: "You learn best in the morning",
        description: "Your quiz scores are 20% higher for material studied before noon",
        type: "pattern",
        metric: {
          morning: 85,
          afternoon: 72,
          evening: 65
        }
      },
      {
        id: "insight4",
        title: "Consistent study sessions improve your retention",
        description: "Regular 30-minute sessions outperform cramming by 35%",
        type: "pattern",
        metric: {
          regular: 80,
          cramming: 45,
          difference: 35
        }
      }
    ],
    financial: [
      {
        id: "insight5",
        title: "You've paid 65% of your tuition for this semester",
        description: "Next installment of KES 40,000 due on August 10",
        type: "status",
        metric: {
          paid: 65,
          remaining: 35,
          amount: 40000
        }
      },
      {
        id: "insight6",
        title: "You may qualify for the Merit Scholarship",
        description: "Your GPA meets the minimum requirement of 3.5",
        type: "opportunity",
        metric: {
          required: 3.5,
          current: 3.7,
          deadline: "2023-08-15T23:59:00Z"
        }
      }
    ]
  }

  // Mock quick links
  const quickLinks = [
    {
      id: "link1",
      title: "Course Catalog",
      icon: BookOpen,
      url: "/academics/catalog",
      description: "Browse available courses"
    },
    {
      id: "link2",
      title: "Academic Calendar",
      icon: Calendar,
      url: "/academics/calendar",
      description: "Important dates and deadlines"
    },
    {
      id: "link3",
      title: "Transcript",
      icon: FileText,
      url: "/academics/transcript",
      description: "View your academic record"
    },
    {
      id: "link4",
      title: "Degree Audit",
      icon: GraduationCap,
      url: "/academics/audit",
      description: "Track graduation requirements"
    },
    {
      id: "link5",
      title: "Fee Statement",
      icon: DollarSign,
      url: "/financials/statement",
      description: "View financial information"
    },
    {
      id: "link6",
      title: "Campus Map",
      icon: Search,
      url: "/campus/map",
      description: "Navigate university grounds"
    }
  ]

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "PPP");
    } catch (error) {
      return "Unknown date";
    }
  }

  // Format time for display
  const formatTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "h:mm a");
    } catch (error) {
      return "Unknown time";
    }
  }

  // Calculate days remaining
  const getDaysRemaining = (dateString: string) => {
    try {
      const dueDate = new Date(dateString);
      const today = new Date();

      // Set both dates to midnight for accurate day calculation
      dueDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);

      // Calculate difference in milliseconds
      const diffTime = dueDate.getTime() - today.getTime();

      // Convert to days
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) return "Today";
      if (diffDays === 1) return "Tomorrow";
      if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
      return `${diffDays} days left`;
    } catch (error) {
      return "Unknown";
    }
  }

  // Get priority badge
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High Priority</Badge>;
      case "medium":
        return <Badge variant="secondary">Medium Priority</Badge>;
      case "low":
        return <Badge variant="outline">Low Priority</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  }

  // Get activity icon
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "grade":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "submission":
        return <FileText className="h-4 w-4 text-blue-500" />;
      case "quiz":
        return <BarChart3 className="h-4 w-4 text-purple-500" />;
      case "enrollment":
        return <BookOpen className="h-4 w-4 text-amber-500" />;
      case "payment":
        return <DollarSign className="h-4 w-4 text-emerald-500" />;
      default:
        return <Info className="h-4 w-4 text-muted-foreground" />;
    }
  }

  // Get announcement badge
  const getAnnouncementBadge = (category: string) => {
    switch (category) {
      case "registration":
        return <Badge className="bg-blue-500">Registration</Badge>;
      case "facilities":
        return <Badge className="bg-emerald-500">Facilities</Badge>;
      case "career":
        return <Badge className="bg-purple-500">Career</Badge>;
      case "academic":
        return <Badge className="bg-amber-500">Academic</Badge>;
      case "financial":
        return <Badge className="bg-green-500">Financial</Badge>;
      default:
        return <Badge>{category}</Badge>;
    }
  }

  // Get insight icon
  const getInsightIcon = (type: string) => {
    switch (type) {
      case "improvement":
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case "strength":
        return <Star className="h-5 w-5 text-amber-500" />;
      case "pattern":
        return <Lightbulb className="h-5 w-5 text-blue-500" />;
      case "status":
        return <Info className="h-5 w-5 text-purple-500" />;
      case "opportunity":
        return <Zap className="h-5 w-5 text-emerald-500" />;
      default:
        return <Info className="h-5 w-5 text-muted-foreground" />;
    }
  }

  // Simulate loading when refreshing
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

  return (
    <div className="space-y-6">
      {/* Welcome and Stats Section */}
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl font-bold">Welcome back, {studentInfo.name}</CardTitle>
                <CardDescription>
                  {studentInfo.program} • {studentInfo.year} • {studentInfo.semester}
                </CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={handleRefresh}>
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <RefreshCw className="h-5 w-5" />
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Student ID</p>
                <p className="text-lg font-semibold">{studentInfo.id}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Current GPA</p>
                <p className="text-lg font-semibold">{studentInfo.gpa}/4.0</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Academic Standing</p>
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <p className="text-lg font-semibold">{studentInfo.academicStanding}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Advisor</p>
                <p className="text-lg font-semibold">{studentInfo.advisor}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid gap-6 md:grid-cols-2 ">

        {/* Quick Links Card */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
            <CardDescription>Frequently accessed resources</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            {quickLinks.map((link) => (
              <Button
                key={link.id}
                variant="outline"
                className="h-auto flex-col gap-2 p-4 justify-start hover:bg-muted/50 transition-colors"
                asChild
              >
                <a href={link.url}>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                    <link.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-center">
                    <span className="font-medium">{link.title}</span>
                    <p className="text-xs text-muted-foreground mt-1">{link.description}</p>
                  </div>
                </a>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity Card */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
              <CardTitle >Recent Activity</CardTitle>
              <CardDescription>Recent activities and notifications</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    <span>View All Activity</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    <span>Download Report</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Notification Settings</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[380px]">
              <div className="px-6 py-2">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="py-3 border-b last:border-0">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-full bg-muted p-1.5">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{activity.title}</h3>
                          {activity.course && (
                            <Badge variant="outline" className="ml-2">
                              {activity.course}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {activity.description}
                        </p>
                        <div className="flex items-center justify-between mt-1.5">
                          <span className="text-xs text-muted-foreground">
                            {formatDate(activity.timestamp)} at {formatTime(activity.timestamp)}
                          </span>
                          {activity.score && (
                            <Badge className="bg-green-500">
                              {activity.score}
                            </Badge>
                          )}
                          {activity.amount && (
                            <Badge className="bg-blue-500">
                              {activity.amount}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="border-t p-3">
            <Button variant="outline" size="sm" className="w-full" asChild>
              <a href="/activity">
                <Clock className="mr-2 h-4 w-4" />
                View All Activity
              </a>
            </Button>
          </CardFooter>
        </Card>

        {/* Upcoming Deadlines Card */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium">Upcoming Deadlines</CardTitle>
              <Badge variant="outline" className="font-normal">
                {upcomingDeadlines.length} items
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[320px]">
              <div className="px-6 py-2">
                {upcomingDeadlines.map((deadline) => (
                  <div
                    key={deadline.id}
                    className={cn(
                      "py-3 border-b last:border-0",
                      deadline.priority === "high" && "relative"
                    )}
                  >
                    {deadline.priority === "high" && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 rounded-full my-3"></div>
                    )}
                    <div className="flex items-start gap-3 pl-1">
                      <div className="mt-0.5">
                        {deadline.type === "exam" && (
                          <div className="w-8 h-8 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center">
                            <FileText className="h-4 w-4" />
                          </div>
                        )}
                        {deadline.type === "assignment" && (
                          <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center">
                            <Pencil className="h-4 w-4" />
                          </div>
                        )}
                        {deadline.type === "administrative" && (
                          <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center">
                            <Layers className="h-4 w-4" />
                          </div>
                        )}
                        {deadline.type === "financial" && (
                          <div className="w-8 h-8 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center">
                            <DollarSign className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium truncate">{deadline.title}</h3>
                          {deadline.course && (
                            <Badge variant="outline" className="ml-2 shrink-0">
                              {deadline.course}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="mr-1 h-3.5 w-3.5" />
                            <span>{formatDate(deadline.dueDate)}</span>
                            <span className="mx-1">•</span>
                            <Clock className="mr-1 h-3.5 w-3.5" />
                            <span>{formatTime(deadline.dueDate)}</span>
                          </div>
                          <Badge
                            variant={deadline.priority === "high" ? "destructive" : "outline"}
                            className="text-[10px] h-5 px-1.5"
                          >
                            {getDaysRemaining(deadline.dueDate)}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {deadline.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="border-t p-3">
            <Button variant="outline" size="sm" className="w-full" asChild>
              <a href="/calendar">
                <Calendar className="mr-2 h-4 w-4" />
                View Full Calendar
              </a>
            </Button>
          </CardFooter>
        </Card>


        {/* Academic Progress Card */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium">Academic Progress</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">Your progress toward degree completion based on credits earned.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Degree Completion</span>
              </div>
              <span className="text-sm font-medium">
                {Math.round((studentInfo.creditsEarned / studentInfo.creditsRequired) * 100)}%
              </span>
            </div>
            <Progress
              value={(studentInfo.creditsEarned / studentInfo.creditsRequired) * 100}
              className="h-2"
            />
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div className="flex flex-col">
                <span className="text-muted-foreground">Credits Earned</span>
                <span className="font-medium">{studentInfo.creditsEarned}/{studentInfo.creditsRequired}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground">Current GPA</span>
                <span className="font-medium">{studentInfo.gpa}/4.0</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Core Requirements</span>
                <span className="text-sm font-medium">80%</span>
              </div>
              <Progress value={80} className="h-1.5" />

              <div className="flex items-center justify-between">
                <span className="text-sm">Major Electives</span>
                <span className="text-sm font-medium">75%</span>
              </div>
              <Progress value={75} className="h-1.5" />

              <div className="flex items-center justify-between">
                <span className="text-sm">General Education</span>
                <span className="text-sm font-medium">90%</span>
              </div>
              <Progress value={90} className="h-1.5" />
            </div>

            <div className="mt-10">
              <Button variant="outline" size="sm" className="w-full" asChild>
                <a href="/academics/audit">
                  <FileText className="mr-2 h-4 w-4" />
                  View Degree Audit
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>


        {/* Announcements Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Announcements</CardTitle>
                <CardDescription>Important updates from your institution</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Bell className="mr-2 h-4 w-4" />
                Notification Settings
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className={cn(
                  "rounded-lg border p-4",
                  announcement.priority === "high" && "border-l-4 border-l-red-500"
                )}
              >
                <div className="flex items-center gap-2 mb-2">
                  {announcement.priority === "high" && (
                    <Badge variant="destructive">Important</Badge>
                  )}
                  {getAnnouncementBadge(announcement.category)}
                  <h4 className="font-semibold">{announcement.title}</h4>
                </div>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {announcement.content.split('\n')[0]}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="mr-1 h-3.5 w-3.5" />
                    <span>{formatDate(announcement.date)}</span>
                    <span className="mx-1">•</span>
                    <User className="mr-1 h-3.5 w-3.5" />
                    <span>{announcement.author}</span>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs h-7"
                        onClick={() => setShowAnnouncementDetails(announcement.id)}
                      >
                        Read More
                        <ChevronRight className="ml-1 h-3.5 w-3.5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <div className="flex items-center gap-2">
                          {announcement.priority === "high" && (
                            <Badge variant="destructive">Important</Badge>
                          )}
                          {getAnnouncementBadge(announcement.category)}
                        </div>
                        <DialogTitle className="text-xl mt-2">{announcement.title}</DialogTitle>
                        <DialogDescription className="flex items-center text-sm">
                          <Calendar className="mr-1 h-3.5 w-3.5" />
                          <span>{formatDate(announcement.date)}</span>
                          <span className="mx-1">•</span>
                          <User className="mr-1 h-3.5 w-3.5" />
                          <span>{announcement.author}</span>
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 mt-2">
                        {announcement.content.split('\n\n').map((paragraph, index) => (
                          <p key={index} className="text-sm">{paragraph}</p>
                        ))}
                      </div>
                      <div className="flex justify-between mt-4">
                        <Button variant="outline" size="sm">
                          <Bell className="mr-2 h-4 w-4" />
                          Subscribe to Updates
                        </Button>
                        <Button size="sm">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Open in Portal
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full" asChild>
              <a href="/announcements">
                <ArrowRight className="mr-2 h-4 w-4" />
                View All Announcements
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Next Advisor Meeting */}
      <Card className="bg-muted/30">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Next Advisor Meeting</h3>
                <p className="text-sm text-muted-foreground">
                  {formatDate(studentInfo.nextAdvisorMeeting)} at {formatTime(studentInfo.nextAdvisorMeeting)} with {studentInfo.advisor}
                </p>
                <p className="text-sm mt-1">
                  Prepare questions about course selection and graduation requirements
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Button variant="outline" className="flex-1 md:flex-none">
                <Pencil className="mr-2 h-4 w-4" />
                Reschedule
              </Button>
              <Button className="flex-1 md:flex-none">
                <Calendar className="mr-2 h-4 w-4" />
                Add to Calendar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
