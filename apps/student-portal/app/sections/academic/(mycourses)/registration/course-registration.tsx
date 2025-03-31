"use client"

import { useState } from "react"
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  Calendar,
  Check,
  Clock,
  GraduationCap,
  Info,
  Loader2,
  MapPin,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function CourseRegistration() {
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [levelFilter, setLevelFilter] = useState("all")
  const [cartItems, setCartItems] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Mock available courses data
  const availableCourses = [
    {
      id: "cs301",
      code: "CS301",
      name: "Data Structures & Algorithms",
      instructor: "Dr. Sarah Johnson",
      credits: 4,
      schedule: "Mon, Wed 10:00 AM - 11:30 AM",
      location: "Block B, Room 203",
      department: "Computer Science",
      level: "300",
      seats: {
        total: 60,
        available: 15,
      },
      prerequisites: ["CS201", "MATH201"],
      description:
        "This course covers fundamental data structures and algorithms, including arrays, linked lists, trees, graphs, sorting, and searching algorithms. Students will analyze algorithm efficiency and implement various data structures.",
    },
    {
      id: "cs305",
      code: "CS305",
      name: "Database Systems",
      instructor: "Prof. Michael Chen",
      credits: 3,
      schedule: "Tue, Thu 2:00 PM - 3:30 PM",
      location: "Computer Lab 2",
      department: "Computer Science",
      level: "300",
      seats: {
        total: 45,
        available: 8,
      },
      prerequisites: ["CS201"],
      description:
        "Introduction to database management systems, focusing on relational databases, SQL, database design, normalization, and transaction processing. Students will design and implement a database application.",
    },
    {
      id: "math201",
      code: "MATH201",
      name: "Discrete Mathematics",
      instructor: "Dr. Robert Williams",
      credits: 3,
      schedule: "Mon, Fri 9:00 AM - 10:30 AM",
      location: "Block A, Room 105",
      department: "Mathematics",
      level: "200",
      seats: {
        total: 80,
        available: 22,
      },
      prerequisites: ["MATH101"],
      description:
        "This course covers sets, logic, proof techniques, combinatorics, graph theory, and recurrence relations. It provides the mathematical foundation for computer science and other disciplines.",
    },
    {
      id: "eng203",
      code: "ENG203",
      name: "Technical Communication",
      instructor: "Prof. Emily Parker",
      credits: 2,
      schedule: "Wed 2:00 PM - 4:00 PM",
      location: "Block C, Room 110",
      department: "English",
      level: "200",
      seats: {
        total: 50,
        available: 12,
      },
      prerequisites: ["ENG101"],
      description:
        "Develops skills in technical writing, presentations, and communication for professional settings. Students will create technical documents, reports, and deliver presentations.",
    },
    {
      id: "cs405",
      code: "CS405",
      name: "Artificial Intelligence",
      instructor: "Dr. James Wilson",
      credits: 4,
      schedule: "Tue, Thu 11:00 AM - 12:30 PM",
      location: "Block B, Room 105",
      department: "Computer Science",
      level: "400",
      seats: {
        total: 40,
        available: 5,
      },
      prerequisites: ["CS301", "MATH201", "STAT301"],
      description:
        "Introduction to artificial intelligence concepts including search algorithms, knowledge representation, machine learning, neural networks, and natural language processing.",
    },
  ]

  // Filter courses based on search query and filters
  const filteredCourses = availableCourses.filter((course) => {
    const matchesSearch =
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDepartment = departmentFilter === "all" || course.department === departmentFilter

    const matchesLevel = levelFilter === "all" || course.level === levelFilter

    return matchesSearch && matchesDepartment && matchesLevel
  })

  // Check if a course is in the cart
  const isInCart = (courseId: string) => cartItems.includes(courseId)

  // Add course to cart
  const addToCart = (courseId: string) => {
    if (!isInCart(courseId)) {
      setCartItems([...cartItems, courseId])
      toast({
        title: "Course added to cart",
        description: "The course has been added to your registration cart.",
      })
    }
  }

  // Remove course from cart
  const removeFromCart = (courseId: string) => {
    setCartItems(cartItems.filter((id) => id !== courseId))
    toast({
      title: "Course removed from cart",
      description: "The course has been removed from your registration cart.",
    })
  }

  // Get cart courses
  const cartCourses = availableCourses.filter((course) => cartItems.includes(course.id))

  // Calculate total credits
  const totalCredits = cartCourses.reduce((sum, course) => sum + course.credits, 0)

  // Handle registration submission
  const handleRegister = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Registration successful",
        description: `You have successfully registered for ${cartItems.length} courses.`,
      })
      setCartItems([])
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Course Registration</h1>
          <p className="text-muted-foreground">Browse and register for courses for the upcoming semester</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <a href="/academic/timetable">
              <Calendar className="mr-2 h-4 w-4" />
              View Timetable
            </a>
          </Button>
          <Button variant="default" asChild>
            <a href="#registration-cart">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Registration Cart ({cartItems.length})
            </a>
          </Button>
        </div>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Registration Period</AlertTitle>
        <AlertDescription>
          Course registration for Spring 2024 is open from November 15 to December 15, 2023. Please ensure you meet all
          prerequisites before registering.
        </AlertDescription>
      </Alert>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-[300px]">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search courses..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="Computer Science">Computer Science</SelectItem>
              <SelectItem value="Mathematics">Mathematics</SelectItem>
              <SelectItem value="English">English</SelectItem>
            </SelectContent>
          </Select>

          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-full sm:w-[120px]">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="100">100 Level</SelectItem>
              <SelectItem value="200">200 Level</SelectItem>
              <SelectItem value="300">300 Level</SelectItem>
              <SelectItem value="400">400 Level</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Available Courses</h2>

        {filteredCourses.length > 0 ? (
          <div className="space-y-4">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">
                          <span className="text-primary font-bold">{course.code}</span>: {course.name}
                        </CardTitle>
                        <Badge variant="outline">{course.credits} Credits</Badge>
                      </div>
                      <CardDescription className="mt-1">
                        {course.department} • Level {course.level}
                      </CardDescription>
                    </div>
                    <Badge variant={course.seats.available > 10 ? "outline" : "secondary"}>
                      {course.seats.available} Seats Available
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <User className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Instructor: {course.instructor}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{course.schedule}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{course.location}</span>
                    </div>

                    {course.prerequisites.length > 0 && (
                      <div className="flex items-start text-sm">
                        <Info className="mr-2 h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <span className="font-medium">Prerequisites: </span>
                          <span>{course.prerequisites.join(", ")}</span>
                        </div>
                      </div>
                    )}

                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="description">
                        <AccordionTrigger className="text-sm py-1">Course Description</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-sm">{course.description}</p>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Info className="mr-2 h-4 w-4" />
                        Course Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>
                          {course.code}: {course.name}
                        </DialogTitle>
                        <DialogDescription>
                          {course.department} • Level {course.level} • {course.credits} Credits
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <p className="text-sm">{course.description}</p>
                        <Separator />
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <User className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>Instructor: {course.instructor}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>{course.schedule}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>{course.location}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <GraduationCap className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>
                              Seats: {course.seats.available} of {course.seats.total} available
                            </span>
                          </div>
                        </div>
                        {course.prerequisites.length > 0 && (
                          <>
                            <Separator />
                            <div className="space-y-1">
                              <h4 className="text-sm font-medium">Prerequisites</h4>
                              <ul className="text-sm space-y-1">
                                {course.prerequisites.map((prereq) => (
                                  <li key={prereq} className="flex items-start">
                                    <ArrowRight className="mr-2 h-4 w-4 text-muted-foreground mt-0.5" />
                                    <span>{prereq}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </>
                        )}
                      </div>
                      <DialogFooter>
                        {isInCart(course.id) ? (
                          <Button variant="destructive" onClick={() => removeFromCart(course.id)}>
                            <X className="mr-2 h-4 w-4" />
                            Remove from Cart
                          </Button>
                        ) : (
                          <Button onClick={() => addToCart(course.id)}>
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Add to Cart
                          </Button>
                        )}
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {isInCart(course.id) ? (
                    <Button variant="destructive" size="sm" onClick={() => removeFromCart(course.id)}>
                      <X className="mr-2 h-4 w-4" />
                      Remove from Cart
                    </Button>
                  ) : (
                    <Button variant="default" size="sm" onClick={() => addToCart(course.id)}>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4 border rounded-lg bg-muted/30">
            <BookOpen className="h-12 w-12 text-muted-foreground mb-3" />
            <h3 className="text-lg font-medium">No Courses Found</h3>
            <p className="text-sm text-muted-foreground mt-1 text-center">
              No courses match your search criteria. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>

      <div id="registration-cart" className="space-y-4 pt-6">
        <h2 className="text-xl font-semibold">Registration Cart</h2>

        {cartCourses.length > 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>Selected Courses</CardTitle>
              <CardDescription>Review your selected courses before finalizing registration</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course Code</TableHead>
                    <TableHead>Course Name</TableHead>
                    <TableHead>Credits</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.code}</TableCell>
                      <TableCell>{course.name}</TableCell>
                      <TableCell>{course.credits}</TableCell>
                      <TableCell className="text-sm">{course.schedule}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => removeFromCart(course.id)}>
                          <X className="h-4 w-4 text-destructive" />
                          <span className="sr-only">Remove {course.code}</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="flex justify-between items-center mt-4 pt-4 border-t">
                <div className="text-sm">
                  <span className="font-medium">Total Credits:</span> {totalCredits}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Total Courses:</span> {cartCourses.length}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setCartItems([])}>
                Clear Cart
              </Button>
              <Button onClick={handleRegister} disabled={cartCourses.length === 0 || isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Complete Registration
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4 border rounded-lg bg-muted/30">
            <ShoppingCart className="h-12 w-12 text-muted-foreground mb-3" />
            <h3 className="text-lg font-medium">Your Cart is Empty</h3>
            <p className="text-sm text-muted-foreground mt-1 text-center">
              Browse the available courses and add them to your cart to register.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

