"use client"

import { useState } from "react"
import { Calendar, Clock, Mail, MapPin, Phone, Search, Star, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

type Faculty = {
  id: string
  name: string
  title: string
  department: string
  email: string
  phone: string
  office: string
  officeHours: string[]
  courses: string[]
  bio: string
  image: string
  expertise: string[]
  publications?: string[]
  availability: "available" | "busy" | "out-of-office" | "on-leave"
  rating?: number
}

export function TimetableFacultyDetails() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null)
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [appointmentDate, setAppointmentDate] = useState("")
  const [appointmentTime, setAppointmentTime] = useState("")
  const [appointmentReason, setAppointmentReason] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Mock data for faculty
  const faculty: Faculty[] = [
    {
      id: "f1",
      name: "Dr. Sarah Johnson",
      title: "Associate Professor",
      department: "Computer Science",
      email: "s.johnson@university.edu",
      phone: "+254 712 345 678",
      office: "MAB 305",
      officeHours: ["Monday: 2:00 PM - 4:00 PM", "Thursday: 10:00 AM - 12:00 PM"],
      courses: ["CS301: Data Structures & Algorithms", "CS401: Advanced Algorithms"],
      bio: "Dr. Sarah Johnson is an Associate Professor in the Department of Computer Science. Her research interests include algorithm design, computational complexity, and machine learning applications.",
      image: "/placeholder.svg?height=200&width=200",
      expertise: ["Algorithm Analysis", "Machine Learning", "Computational Theory"],
      publications: [
        "Johnson, S. et al. (2022). 'Efficient Algorithms for Large-Scale Data Processing'",
        "Johnson, S. & Chen, M. (2021). 'Machine Learning Approaches to Algorithm Optimization'",
      ],
      availability: "available",
      rating: 4.8,
    },
    {
      id: "f2",
      name: "Prof. Michael Chen",
      title: "Professor",
      department: "Computer Science",
      email: "m.chen@university.edu",
      phone: "+254 723 456 789",
      office: "SC 201",
      officeHours: ["Tuesday: 1:00 PM - 3:00 PM", "Friday: 9:00 AM - 11:00 AM"],
      courses: ["CS305: Database Systems", "CS405: Advanced Database Systems"],
      bio: "Prof. Michael Chen is a Professor in the Department of Computer Science with over 15 years of teaching experience. His research focuses on database systems, data mining, and big data analytics.",
      image: "/placeholder.svg?height=200&width=200",
      expertise: ["Database Systems", "Data Mining", "Big Data Analytics"],
      publications: [
        "Chen, M. (2023). 'Modern Approaches to Database Optimization'",
        "Chen, M. & Williams, R. (2022). 'Big Data Processing in Distributed Systems'",
      ],
      availability: "busy",
      rating: 4.5,
    },
    {
      id: "f3",
      name: "Dr. Robert Williams",
      title: "Assistant Professor",
      department: "Mathematics",
      email: "r.williams@university.edu",
      phone: "+254 734 567 890",
      office: "MAB 210",
      officeHours: ["Wednesday: 11:00 AM - 1:00 PM", "Friday: 2:00 PM - 4:00 PM"],
      courses: ["MATH201: Discrete Mathematics", "MATH301: Abstract Algebra"],
      bio: "Dr. Robert Williams is an Assistant Professor in the Department of Mathematics. His research interests include discrete mathematics, graph theory, and combinatorial optimization.",
      image: "/placeholder.svg?height=200&width=200",
      expertise: ["Discrete Mathematics", "Graph Theory", "Combinatorial Optimization"],
      publications: [
        "Williams, R. (2023). 'Applications of Graph Theory in Network Design'",
        "Williams, R. & Parker, E. (2021). 'Combinatorial Approaches to Optimization Problems'",
      ],
      availability: "available",
      rating: 4.2,
    },
    {
      id: "f4",
      name: "Prof. Emily Parker",
      title: "Professor",
      department: "English",
      email: "e.parker@university.edu",
      phone: "+254 745 678 901",
      office: "LIB 405",
      officeHours: ["Monday: 10:00 AM - 12:00 PM", "Wednesday: 3:00 PM - 5:00 PM"],
      courses: ["ENG203: Technical Communication", "ENG305: Professional Writing"],
      bio: "Prof. Emily Parker is a Professor in the Department of English with a specialization in technical and professional communication. She has published numerous articles on effective communication in technical fields.",
      image: "/placeholder.svg?height=200&width=200",
      expertise: ["Technical Writing", "Professional Communication", "Digital Rhetoric"],
      publications: [
        "Parker, E. (2023). 'Technical Communication in the Digital Age'",
        "Parker, E. & Johnson, S. (2022). 'Effective Communication in STEM Fields'",
      ],
      availability: "on-leave",
      rating: 4.7,
    },
    {
      id: "f5",
      name: "Dr. James Wilson",
      title: "Associate Professor",
      department: "Computer Science",
      email: "j.wilson@university.edu",
      phone: "+254 756 789 012",
      office: "EB 105",
      officeHours: ["Tuesday: 9:00 AM - 11:00 AM", "Thursday: 2:00 PM - 4:00 PM"],
      courses: ["CS205: Computer Networks", "CS405: Network Security"],
      bio: "Dr. James Wilson is an Associate Professor in the Department of Computer Science. His research focuses on computer networks, network security, and distributed systems.",
      image: "/placeholder.svg?height=200&width=200",
      expertise: ["Computer Networks", "Network Security", "Distributed Systems"],
      publications: [
        "Wilson, J. (2023). 'Security Challenges in Modern Network Architectures'",
        "Wilson, J. & Chen, M. (2021). 'Distributed Systems for Secure Data Processing'",
      ],
      availability: "available",
      rating: 4.4,
    },
  ]

  // Filter faculty based on search query and department
  const filteredFaculty = faculty.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.courses.some((course) => course.toLowerCase().includes(searchQuery.toLowerCase())) ||
      f.expertise.some((exp) => exp.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesDepartment = selectedDepartment === "all" || f.department === selectedDepartment

    return matchesSearch && matchesDepartment
  })

  // Get availability badge
  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case "available":
        return <Badge className="bg-green-500 hover:bg-green-600">Available</Badge>
      case "busy":
        return <Badge className="bg-amber-500 hover:bg-amber-600">Busy</Badge>
      case "out-of-office":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Out of Office</Badge>
      case "on-leave":
        return <Badge variant="destructive">On Leave</Badge>
      default:
        return <Badge variant="outline">{availability}</Badge>
    }
  }

  // Handle appointment booking
  const handleBookAppointment = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Appointment Request Sent",
        description: `Your appointment request with ${selectedFaculty?.name} for ${appointmentDate} at ${appointmentTime} has been sent.`,
      })
    }, 1500)
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          Faculty Directory
        </CardTitle>
        <CardDescription>Information about instructors, professors, and their office hours</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="relative w-full sm:w-[300px]">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search faculty by name, department, or expertise..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="Computer Science">Computer Science</SelectItem>
              <SelectItem value="Mathematics">Mathematics</SelectItem>
              <SelectItem value="English">English</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {filteredFaculty.map((f) => (
              <Dialog key={f.id}>
                <DialogTrigger asChild>
                  <div
                    className="flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => setSelectedFaculty(f)}
                  >
                    <Avatar>
                      <AvatarImage src={f.image} alt={f.name} />
                      <AvatarFallback>
                        {f.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="font-medium">{f.name}</div>
                        {f.rating && (
                          <div className="flex items-center text-xs text-amber-500">
                            <Star className="h-3 w-3 fill-current" />
                            <span className="ml-1">{f.rating}</span>
                          </div>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground truncate">
                        {f.title}, {f.department}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {getAvailabilityBadge(f.availability)}
                      <Badge variant="outline" className="text-xs">
                        {f.courses.length} Courses
                      </Badge>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[700px]">
                  <DialogHeader>
                    <DialogTitle>{f.name}</DialogTitle>
                    <DialogDescription>
                      {f.title}, {f.department}
                    </DialogDescription>
                  </DialogHeader>
                  <Tabs defaultValue="profile">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="profile">Profile</TabsTrigger>
                      <TabsTrigger value="courses">Courses & Schedule</TabsTrigger>
                      <TabsTrigger value="publications">Publications</TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile" className="space-y-4 py-4">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="sm:w-1/3 flex justify-center">
                          <Avatar className="h-32 w-32">
                            <AvatarImage src={f.image} alt={f.name} />
                            <AvatarFallback className="text-2xl">
                              {f.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="sm:w-2/3">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium">{f.name}</h3>
                            {getAvailabilityBadge(f.availability)}
                          </div>

                          {f.rating && (
                            <div className="flex items-center mt-1 mb-3">
                              {Array(5)
                                .fill(0)
                                .map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < Math.floor(f?.rating || 0) ? "text-amber-500 fill-amber-500" : "text-muted-foreground"}`}
                                  />
                                ))}
                              <span className="ml-2 text-sm">{f.rating} / 5.0</span>
                            </div>
                          )}

                          <p className="text-sm text-muted-foreground">{f.bio}</p>

                          <div className="mt-4 space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <a href={`mailto:${f.email}`} className="text-primary hover:underline">
                                {f.email}
                              </a>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <span>{f.phone}</span>
                            </div>
                            <div className="flex items-start gap-2 text-sm">
                              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                              <span>Office: {f.office}</span>
                            </div>
                            <div className="flex items-start gap-2 text-sm">
                              <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                              <div>
                                <div>Office Hours:</div>
                                <ul className="list-disc list-inside ml-1 mt-1">
                                  {f.officeHours.map((hour, index) => (
                                    <li key={index}>{hour}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-sm font-medium mb-2">Areas of Expertise</h3>
                        <div className="flex flex-wrap gap-2">
                          {f.expertise.map((exp, index) => (
                            <Badge key={index} variant="secondary">
                              {exp}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {f.availability === "available" && (
                        <>
                          <Separator />
                          <div>
                            <h3 className="text-sm font-medium mb-2">Request an Appointment</h3>
                            <div className="grid gap-3 sm:grid-cols-3">
                              <div>
                                <label className="text-xs">Date</label>
                                <Input
                                  type="date"
                                  value={appointmentDate}
                                  onChange={(e) => setAppointmentDate(e.target.value)}
                                />
                              </div>
                              <div>
                                <label className="text-xs">Time</label>
                                <Input
                                  type="time"
                                  value={appointmentTime}
                                  onChange={(e) => setAppointmentTime(e.target.value)}
                                />
                              </div>
                              <div>
                                <label className="text-xs">Reason</label>
                                <Input
                                  placeholder="Brief reason"
                                  value={appointmentReason}
                                  onChange={(e) => setAppointmentReason(e.target.value)}
                                />
                              </div>
                            </div>
                            <Button
                              className="mt-3 w-full"
                              onClick={handleBookAppointment}
                              disabled={!appointmentDate || !appointmentTime || isLoading}
                            >
                              {isLoading ? "Processing..." : "Request Appointment"}
                            </Button>
                          </div>
                        </>
                      )}
                    </TabsContent>

                    <TabsContent value="courses" className="space-y-4 py-4">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Current Courses</h3>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {f.courses.map((course, index) => (
                            <div key={index} className="p-3 border rounded-md">
                              <div className="font-medium">{course}</div>
                              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                <span>
                                  {course.includes("CS301")
                                    ? "Mon, Wed 10:00 AM - 11:30 AM"
                                    : course.includes("CS305")
                                      ? "Tue, Thu 2:00 PM - 3:30 PM"
                                      : course.includes("MATH201")
                                        ? "Mon, Fri 9:00 AM - 10:30 AM"
                                        : "Wed 2:00 PM - 4:00 PM"}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                <MapPin className="h-3 w-3" />
                                <span>
                                  {course.includes("CS301")
                                    ? "Block B, Room 203"
                                    : course.includes("CS305")
                                      ? "Computer Lab 2"
                                      : course.includes("MATH201")
                                        ? "Block A, Room 105"
                                        : "Block C, Room 110"}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-sm font-medium mb-2">Weekly Schedule</h3>
                        <div className="border rounded-md overflow-hidden">
                          <div className="grid grid-cols-6 border-b">
                            <div className="p-2 text-center font-medium bg-muted/50 border-r">Time</div>
                            {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
                              <div key={day} className="p-2 text-center font-medium bg-muted/50">
                                {day}
                              </div>
                            ))}
                          </div>

                          <div className="grid grid-cols-6">
                            {["8-10 AM", "10-12 PM", "12-2 PM", "2-4 PM", "4-6 PM"].map((time, timeIndex) => (
                              <>
                                <div key={time} className="p-2 text-center text-sm border-r border-b">
                                  {time}
                                </div>

                                {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, dayIndex) => {
                                  // Simplified logic to show classes
                                  const hasClass =
                                    (f.name.includes("Sarah") && (day === "Mon" || day === "Wed") && timeIndex === 1) ||
                                    (f.name.includes("Michael") &&
                                      (day === "Tue" || day === "Thu") &&
                                      timeIndex === 3) ||
                                    (f.name.includes("Robert") &&
                                      (day === "Mon" || day === "Fri") &&
                                      timeIndex === 0) ||
                                    (f.name.includes("Emily") && day === "Wed" && timeIndex === 3) ||
                                    (f.name.includes("James") && (day === "Tue" || day === "Thu") && timeIndex === 1)

                                  const hasOfficeHours =
                                    (f.name.includes("Sarah") &&
                                      ((day === "Mon" && timeIndex === 3) || (day === "Thu" && timeIndex === 1))) ||
                                    (f.name.includes("Michael") &&
                                      ((day === "Tue" && timeIndex === 2) || (day === "Fri" && timeIndex === 0))) ||
                                    (f.name.includes("Robert") &&
                                      ((day === "Wed" && timeIndex === 1) || (day === "Fri" && timeIndex === 3))) ||
                                    (f.name.includes("Emily") &&
                                      ((day === "Mon" && timeIndex === 1) || (day === "Wed" && timeIndex === 3))) ||
                                    (f.name.includes("James") &&
                                      ((day === "Tue" && timeIndex === 0) || (day === "Thu" && timeIndex === 3)))

                                  return (
                                    <div key={`${day}-${time}`} className="p-2 border-b min-h-[60px]">
                                      {hasClass && (
                                        <div className="p-1 text-xs bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 rounded text-blue-800 dark:text-blue-300">
                                          {f.courses[0].split(":")[0]}
                                        </div>
                                      )}

                                      {hasOfficeHours && (
                                        <div className="p-1 text-xs bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded text-green-800 dark:text-green-300 mt-1">
                                          Office Hours
                                        </div>
                                      )}
                                    </div>
                                  )
                                })}
                              </>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                            <span>Classes</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                            <span>Office Hours</span>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="publications" className="space-y-4 py-4">
                      {f.publications && f.publications.length > 0 ? (
                        <div>
                          <h3 className="text-sm font-medium mb-2">Recent Publications</h3>
                          <div className="space-y-3">
                            {f.publications.map((pub, index) => (
                              <div key={index} className="p-3 border rounded-md">
                                <div className="text-sm">{pub}</div>
                                <div className="flex justify-end mt-2">
                                  <Button variant="outline" size="sm">
                                    View Publication
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          No publications available for this faculty member.
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>

                  <DialogFooter>
                    <Button variant="outline" asChild>
                      <a href={`mailto:${f.email}`}>
                        <Mail className="mr-2 h-4 w-4" />
                        Contact
                      </a>
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ))}

            {filteredFaculty.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">No faculty found matching your search.</div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="w-full flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm text-muted-foreground">Total Faculty: {faculty.length}</div>
          <Button variant="outline" size="sm" asChild>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <User className="mr-2 h-4 w-4" />
              Faculty Directory PDF
            </a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

