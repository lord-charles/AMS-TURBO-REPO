"use client"

import { Label } from "@/components/ui/label"

import { useState, useEffect } from "react"
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
  Filter,
  ChevronUp,
  Bookmark,
  BookMarked,
  ListFilter,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useIsMobile } from "@/hooks/use-mobile"

export function CourseRegistration() {
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [levelFilter, setLevelFilter] = useState("all")
  const [cartItems, setCartItems] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [savedCourses, setSavedCourses] = useState<string[]>([])
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const { toast } = useToast()
  const isMobile = useIsMobile()

  // Monitor scroll position to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

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

  // Check if a course is saved
  const isSaved = (courseId: string) => savedCourses.includes(courseId)

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

  // Toggle saved course
  const toggleSavedCourse = (courseId: string) => {
    if (isSaved(courseId)) {
      setSavedCourses(savedCourses.filter((id) => id !== courseId))
      toast({
        title: "Course removed from saved",
        description: "The course has been removed from your saved courses.",
      })
    } else {
      setSavedCourses([...savedCourses, courseId])
      toast({
        title: "Course saved",
        description: "The course has been saved for later reference.",
      })
    }
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

  // Get instructor initials for avatar
  const getInstructorInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  // Render cart content for reuse in different places
  const renderCartContent = () => (
    <div className="space-y-4">
      {cartCourses.length > 0 ? (
        <>
          <ScrollArea className={isMobile ? "h-[300px]" : "h-auto max-h-[500px]"}>
            <div className="space-y-3">
              {cartCourses.map((course) => (
                <div key={course.id} className="flex items-center justify-between gap-2 p-2 border rounded-md">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">
                      {course.code}: {course.name}
                    </div>
                    <div className="text-xs text-muted-foreground">{course.schedule}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => removeFromCart(course.id)}>
                      <X className="h-4 w-4 text-destructive" />
                      <span className="sr-only">Remove {course.code}</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="flex justify-between items-center pt-3 border-t">
            <div className="text-sm">
              <span className="font-medium">Total Credits:</span> {totalCredits}
            </div>
            <div className="text-sm">
              <span className="font-medium">Total Courses:</span> {cartCourses.length}
            </div>
          </div>

          <div className="flex justify-between gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setCartItems([])}>
              Clear Cart
            </Button>
            <Button size="sm" onClick={handleRegister} disabled={cartCourses.length === 0 || isLoading}>
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
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 px-4">
          <ShoppingCart className="h-10 w-10 text-muted-foreground mb-3" />
          <h3 className="text-base font-medium">Your Cart is Empty</h3>
          <p className="text-sm text-muted-foreground mt-1 text-center">
            Browse the available courses and add them to your cart to register.
          </p>
        </div>
      )}
    </div>
  )

  return (
    <div className="space-y-6 pb-20">
      {/* Header Section */}
      <div className="sticky top-0 z-10 bg-background pt-4 pb-2 border-b">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Course Registration</h1>
            <p className="text-muted-foreground">Browse and register for courses for the upcoming semester</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild size="sm">
              <a href="/academic/timetable">
                <Calendar className="mr-2 h-4 w-4" />
                Timetable
              </a>
            </Button>

            {isMobile ? (
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="default" size="sm">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Cart ({cartItems.length})
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Registration Cart</DrawerTitle>
                    <DrawerDescription>Review your selected courses</DrawerDescription>
                  </DrawerHeader>
                  <div className="px-4">{renderCartContent()}</div>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="outline">Close</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            ) : (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="default" size="sm">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Cart ({cartItems.length})
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[450px] sm:w-[540px]">
                  <SheetHeader>
                    <SheetTitle>Registration Cart</SheetTitle>
                    <SheetDescription>Review your selected courses before finalizing registration</SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">{renderCartContent()}</div>
                  <SheetFooter className="mt-4">
                    <SheetClose asChild>
                      <Button variant="outline">Close</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>

      {/* Alert Section */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Registration Period</AlertTitle>
        <AlertDescription>
          Course registration for Spring 2024 is open from November 15 to December 15, 2023. Please ensure you meet all
          prerequisites before registering.
        </AlertDescription>
      </Alert>

      {/* Search and Filter Section */}
      <div className="flex flex-col gap-4">
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

          {isMobile ? (
            <Button variant="outline" className="w-full sm:w-auto" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          ) : (
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
          )}
        </div>

        {/* Mobile Filters */}
        {isMobile && showFilters && (
          <div className="p-4 border rounded-lg bg-muted/20 space-y-3">
            <h3 className="text-sm font-medium flex items-center">
              <ListFilter className="mr-2 h-4 w-4" />
              Filter Courses
            </h3>
            <div className="grid gap-3">
              <div className="grid gap-1">
                <Label htmlFor="mobile-department" className="text-xs">
                  Department
                </Label>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger id="mobile-department">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1">
                <Label htmlFor="mobile-level" className="text-xs">
                  Level
                </Label>
                <Select value={levelFilter} onValueChange={setLevelFilter}>
                  <SelectTrigger id="mobile-level">
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
          </div>
        )}
      </div>

      {/* Course Listing Section */}
      <div className="space-y-4">
       

        <Tabs defaultValue="grid" className="w-full">
          <div className="flex justify-between mb-4">
          <div className="flex items-center space-x-2">
          <h2 className="text-xl font-semibold">Available Courses</h2>
          <Badge variant="outline" className="text-xs">
            {filteredCourses.length} courses found
          </Badge>
        </div>
            <TabsList className="grid w-[180px] grid-cols-2">
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="grid" className="mt-0">
            {filteredCourses.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden h-full flex flex-col">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-lg truncate">
                              <span className="text-primary font-bold">{course.code}</span>
                            </CardTitle>
                            <Badge variant="outline">{course.credits} Cr</Badge>
                          </div>
                          <CardDescription className="mt-1 truncate">{course.name}</CardDescription>
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleSavedCourse(course.id)
                                }}
                              >
                                {isSaved(course.id) ? (
                                  <BookMarked className="h-4 w-4 text-primary" />
                                ) : (
                                  <Bookmark className="h-4 w-4" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {isSaved(course.id) ? "Remove from saved" : "Save for later"}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2 flex-1">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {getInstructorInitials(course.instructor)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="text-sm truncate">{course.instructor}</div>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <span className="truncate">{course.schedule}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <span className="truncate">{course.location}</span>
                        </div>

                        {course.prerequisites.length > 0 && (
                          <div className="flex items-start text-sm">
                            <Info className="mr-2 h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <div className="truncate">
                              <span className="font-medium">Prerequisites: </span>
                              <span>{course.prerequisites.join(", ")}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2 mt-auto">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Info className="mr-2 h-4 w-4" />
                            Details
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
                          Remove
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
          </TabsContent>

          <TabsContent value="list" className="mt-0">
            {filteredCourses.length > 0 ? (
              <div className="space-y-2">
                <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 bg-muted/40 rounded-md text-sm font-medium">
                  <div className="col-span-3">Course</div>
                  <div className="col-span-2">Instructor</div>
                  <div className="col-span-2">Schedule</div>
                  <div className="col-span-2">Location</div>
                  <div className="col-span-1">Credits</div>
                  <div className="col-span-2">Actions</div>
                </div>
                {filteredCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="md:grid md:grid-cols-12 md:gap-4 space-y-3 md:space-y-0 items-center">
                        <div className="md:col-span-3">
                          <div className="font-medium">
                            {course.code}: {course.name}
                          </div>
                          <div className="text-xs text-muted-foreground md:hidden">
                            {course.department} • Level {course.level}
                          </div>
                        </div>
                        <div className="md:col-span-2 flex items-center gap-2">
                          <Avatar className="h-6 w-6 md:hidden">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {getInstructorInitials(course.instructor)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{course.instructor}</span>
                        </div>
                        <div className="md:col-span-2 text-sm flex items-center md:block">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground md:hidden" />
                          {course.schedule}
                        </div>
                        <div className="md:col-span-2 text-sm flex items-center md:block">
                          <MapPin className="mr-2 h-4 w-4 text-muted-foreground md:hidden" />
                          {course.location}
                        </div>
                        <div className="md:col-span-1 text-sm">
                          <Badge variant="outline">{course.credits}</Badge>
                        </div>
                        <div className="md:col-span-2 flex items-center justify-end gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Info className="h-4 w-4" />
                                <span className="sr-only md:not-sr-only md:ml-2">Details</span>
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
                              <X className="h-4 w-4" />
                              <span className="sr-only md:not-sr-only md:ml-2">Remove</span>
                            </Button>
                          ) : (
                            <Button variant="default" size="sm" onClick={() => addToCart(course.id)}>
                              <ShoppingCart className="h-4 w-4" />
                              <span className="sr-only md:not-sr-only md:ml-2">Add</span>
                            </Button>
                          )}

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm" onClick={() => toggleSavedCourse(course.id)}>
                                  {isSaved(course.id) ? (
                                    <BookMarked className="h-4 w-4 text-primary" />
                                  ) : (
                                    <Bookmark className="h-4 w-4" />
                                  )}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                {isSaved(course.id) ? "Remove from saved" : "Save for later"}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </CardContent>
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
          </TabsContent>
        </Tabs>
      </div>

      {/* Floating Cart Button (Mobile) */}
      {isMobile && cartItems.length > 0 && (
        <div className="fixed bottom-4 right-4 z-50">
          <Drawer>
            <DrawerTrigger asChild>
              <Button size="icon" className="h-14 w-14 rounded-full shadow-lg">
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                  {cartItems.length}
                </span>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Registration Cart</DrawerTitle>
                <DrawerDescription>Review your selected courses</DrawerDescription>
              </DrawerHeader>
              <div className="px-4">{renderCartContent()}</div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      )}

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 left-4 z-50 h-10 w-10 rounded-full shadow-md"
          onClick={scrollToTop}
        >
          <ChevronUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  )
}
