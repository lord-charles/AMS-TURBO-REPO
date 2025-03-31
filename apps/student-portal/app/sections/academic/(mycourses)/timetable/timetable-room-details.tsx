"use client"

import { useState } from "react"
import { BuildingIcon, Clock, MapPin, Search, Shield, Wifi } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"

type Building = {
  id: string
  name: string
  code: string
  location: string
  floors: number
  facilities: string[]
  image: string
  status: "open" | "closed" | "limited"
  openingHours: string
}

type Room = {
  id: string
  number: string
  buildingId: string
  type: string
  capacity: number
  facilities: string[]
  image?: string
  availability: "available" | "occupied" | "maintenance" | "reserved"
  currentClass?: string
  nextAvailable?: string
  occupancyRate?: number
}

export function TimetableRoomDetails() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null)
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [bookingDate, setBookingDate] = useState("")
  const [bookingTime, setBookingTime] = useState("")
  const [bookingDuration, setBookingDuration] = useState("1")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Mock data for buildings and rooms
  const buildings: Building[] = [
    {
      id: "b1",
      name: "Main Academic Building",
      code: "MAB",
      location: "Central Campus",
      floors: 5,
      facilities: ["Elevators", "Cafeteria", "Study Areas", "Wi-Fi"],
      image: "/placeholder.svg?height=300&width=500",
      status: "open",
      openingHours: "7:00 AM - 10:00 PM",
    },
    {
      id: "b2",
      name: "Science Complex",
      code: "SC",
      location: "North Campus",
      floors: 4,
      facilities: ["Laboratories", "Research Centers", "Conference Rooms", "Wi-Fi"],
      image: "/placeholder.svg?height=300&width=500",
      status: "open",
      openingHours: "8:00 AM - 9:00 PM",
    },
    {
      id: "b3",
      name: "Engineering Block",
      code: "EB",
      location: "East Campus",
      floors: 3,
      facilities: ["Workshops", "Computer Labs", "Project Rooms", "Wi-Fi"],
      image: "/placeholder.svg?height=300&width=500",
      status: "limited",
      openingHours: "7:30 AM - 8:00 PM",
    },
    {
      id: "b4",
      name: "Library Building",
      code: "LIB",
      location: "West Campus",
      floors: 6,
      facilities: ["Reading Rooms", "Digital Archives", "Group Study Rooms", "Wi-Fi"],
      image: "/placeholder.svg?height=300&width=500",
      status: "open",
      openingHours: "8:00 AM - 11:00 PM",
    },
  ]

  const rooms: Room[] = [
    {
      id: "r1",
      number: "101",
      buildingId: "b1",
      type: "Lecture Hall",
      capacity: 120,
      facilities: ["Projector", "Audio System", "Air Conditioning", "Smart Board"],
      availability: "occupied",
      currentClass: "CS301: Data Structures & Algorithms",
      nextAvailable: "12:30 PM",
      occupancyRate: 85,
    },
    {
      id: "r2",
      number: "203",
      buildingId: "b1",
      type: "Classroom",
      capacity: 60,
      facilities: ["Projector", "Whiteboard", "Air Conditioning"],
      availability: "available",
      nextAvailable: "Now",
      occupancyRate: 0,
    },
    {
      id: "r3",
      number: "305",
      buildingId: "b1",
      type: "Computer Lab",
      capacity: 40,
      facilities: ["Computers", "Projector", "Printer", "Air Conditioning"],
      availability: "reserved",
      nextAvailable: "3:30 PM",
      occupancyRate: 0,
    },
    {
      id: "r4",
      number: "102",
      buildingId: "b2",
      type: "Laboratory",
      capacity: 30,
      facilities: ["Lab Equipment", "Safety Gear", "Fume Hood", "Emergency Shower"],
      availability: "maintenance",
      nextAvailable: "Tomorrow",
      occupancyRate: 0,
    },
    {
      id: "r5",
      number: "201",
      buildingId: "b2",
      type: "Lecture Hall",
      capacity: 100,
      facilities: ["Projector", "Audio System", "Air Conditioning"],
      availability: "available",
      nextAvailable: "Now",
      occupancyRate: 0,
    },
    {
      id: "r6",
      number: "105",
      buildingId: "b3",
      type: "Workshop",
      capacity: 25,
      facilities: ["Tools", "Workbenches", "Safety Equipment", "Material Storage"],
      availability: "occupied",
      currentClass: "ME301: Manufacturing Processes",
      nextAvailable: "2:00 PM",
      occupancyRate: 92,
    },
    {
      id: "r7",
      number: "202",
      buildingId: "b3",
      type: "Computer Lab",
      capacity: 35,
      facilities: ["Computers", "Projector", "Specialized Software", "Air Conditioning"],
      availability: "available",
      nextAvailable: "Now",
      occupancyRate: 20,
    },
    {
      id: "r8",
      number: "301",
      buildingId: "b4",
      type: "Study Room",
      capacity: 15,
      facilities: ["Tables", "Chairs", "Whiteboard", "Wi-Fi"],
      availability: "occupied",
      nextAvailable: "5:00 PM",
      occupancyRate: 60,
    },
  ]

  // Filter buildings and rooms based on search query
  const filteredBuildings = buildings.filter(
    (building) =>
      building.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      building.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      building.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredRooms = rooms.filter(
    (room) =>
      room.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (selectedBuilding && room.buildingId === selectedBuilding.id),
  )

  // Get building by ID
  const getBuildingById = (id: string) => {
    return buildings.find((building) => building.id === id)
  }

  // Get room type badge color
  const getRoomTypeBadge = (type: string) => {
    switch (type.toLowerCase()) {
      case "lecture hall":
        return <Badge className="bg-blue-500 hover:bg-blue-600">{type}</Badge>
      case "classroom":
        return <Badge className="bg-green-500 hover:bg-green-600">{type}</Badge>
      case "laboratory":
      case "lab":
        return <Badge className="bg-amber-500 hover:bg-amber-600">{type}</Badge>
      case "computer lab":
        return <Badge className="bg-purple-500 hover:bg-purple-600">{type}</Badge>
      case "workshop":
        return <Badge className="bg-red-500 hover:bg-red-600">{type}</Badge>
      case "study room":
        return <Badge className="bg-indigo-500 hover:bg-indigo-600">{type}</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  // Get availability badge
  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case "available":
        return <Badge className="bg-green-500 hover:bg-green-600">Available</Badge>
      case "occupied":
        return <Badge className="bg-red-500 hover:bg-red-600">Occupied</Badge>
      case "maintenance":
        return <Badge className="bg-amber-500 hover:bg-amber-600">Maintenance</Badge>
      case "reserved":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Reserved</Badge>
      default:
        return <Badge variant="outline">{availability}</Badge>
    }
  }

  // Get building status badge
  const getBuildingStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-green-500 hover:bg-green-600">Open</Badge>
      case "closed":
        return <Badge className="bg-red-500 hover:bg-red-600">Closed</Badge>
      case "limited":
        return <Badge className="bg-amber-500 hover:bg-amber-600">Limited Access</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Handle room booking
  const handleBookRoom = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Room Booked Successfully",
        description: `Room ${selectedRoom?.number} has been booked for ${bookingDate} at ${bookingTime} for ${bookingDuration} hour(s).`,
      })
    }, 1500)
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BuildingIcon className="h-5 w-5 text-primary" />
          Campus Buildings & Rooms
        </CardTitle>
        <CardDescription>Find information about campus buildings, lecture halls, and classrooms</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search buildings or rooms..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="buildings">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buildings">Buildings</TabsTrigger>
            <TabsTrigger value="rooms">Rooms</TabsTrigger>
          </TabsList>

          <TabsContent value="buildings" className="mt-4">
            <ScrollArea className="h-[400px] pr-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {filteredBuildings.map((building) => (
                  <Dialog key={building.id}>
                    <DialogTrigger asChild>
                      <div
                        className="p-3 border rounded-md cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => setSelectedBuilding(building)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{building.name}</div>
                          {getBuildingStatusBadge(building.status)}
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <Badge variant="outline">{building.code}</Badge>
                          <span className="text-xs text-muted-foreground">{building.location}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{building.openingHours}</span>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>
                          {building.name} ({building.code})
                        </DialogTitle>
                        <DialogDescription className="flex items-center justify-between">
                          <span>{building.location}</span>
                          {getBuildingStatusBadge(building.status)}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="aspect-video rounded-md overflow-hidden">
                          <img
                            src={building.image || "/placeholder.svg"}
                            alt={building.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Building Information</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Location:</span>
                                <span>{building.location}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Floors:</span>
                                <span>{building.floors}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Hours:</span>
                                <span>{building.openingHours}</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium mb-2">Facilities</h4>
                            <div className="flex flex-wrap gap-1">
                              {building.facilities.map((facility, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {facility}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium mb-2">Rooms in this Building</h4>
                          <div className="grid gap-2 sm:grid-cols-2">
                            {rooms
                              .filter((room) => room.buildingId === building.id)
                              .map((room) => (
                                <div key={room.id} className="p-2 border rounded-md text-sm">
                                  <div className="flex items-center justify-between">
                                    <span className="font-medium">Room {room.number}</span>
                                    {getRoomTypeBadge(room.type)}
                                  </div>
                                  <div className="flex items-center justify-between mt-1">
                                    <span className="text-xs text-muted-foreground">
                                      Capacity: {room.capacity} people
                                    </span>
                                    {getAvailabilityBadge(room.availability)}
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" asChild>
                          <a href="#" target="_blank" rel="noopener noreferrer">
                            <MapPin className="mr-2 h-4 w-4" />
                            View on Map
                          </a>
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>

              {filteredBuildings.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">No buildings found matching your search.</div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="rooms" className="mt-4">
            <ScrollArea className="h-[400px] pr-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {filteredRooms.map((room) => {
                  const building = getBuildingById(room.buildingId)

                  return (
                    <Dialog key={room.id}>
                      <DialogTrigger asChild>
                        <div
                          className="p-3 border rounded-md cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() => setSelectedRoom(room)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="font-medium">Room {room.number}</div>
                            {getAvailabilityBadge(room.availability)}
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            {getRoomTypeBadge(room.type)}
                            <span className="text-xs text-muted-foreground">
                              {building?.code || "Unknown Building"}
                            </span>
                          </div>

                          {room.availability === "occupied" && room.occupancyRate && (
                            <div className="mt-2">
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span>Occupancy</span>
                                <span>{room.occupancyRate}%</span>
                              </div>
                              <Progress
                                value={room.occupancyRate}
                                className="h-1"
                                indicatorClassName={
                                  room.occupancyRate > 80
                                    ? "bg-red-500"
                                    : room.occupancyRate > 50
                                      ? "bg-amber-500"
                                      : "bg-green-500"
                                }
                              />
                            </div>
                          )}

                          <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>Next available: {room.nextAvailable}</span>
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Room {room.number}</DialogTitle>
                          <DialogDescription>
                            {building?.name} ({building?.code})
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          {room.image && (
                            <div className="aspect-video rounded-md overflow-hidden">
                              <img
                                src={room.image || "/placeholder.svg"}
                                alt={`Room ${room.number}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}

                          <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                              <h4 className="text-sm font-medium mb-2">Room Information</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Type:</span>
                                  <span>{room.type}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Capacity:</span>
                                  <span>{room.capacity} people</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Building:</span>
                                  <span>{building?.name || "Unknown"}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Status:</span>
                                  <span>{getAvailabilityBadge(room.availability)}</span>
                                </div>
                                {room.currentClass && (
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Current Class:</span>
                                    <span>{room.currentClass}</span>
                                  </div>
                                )}
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Next Available:</span>
                                  <span>{room.nextAvailable}</span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium mb-2">Facilities</h4>
                              <div className="flex flex-wrap gap-1">
                                {room.facilities.map((facility, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {facility}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>

                          {room.availability === "available" && (
                            <div>
                              <h4 className="text-sm font-medium mb-2">Book This Room</h4>
                              <div className="grid gap-3 sm:grid-cols-3">
                                <div>
                                  <label className="text-xs">Date</label>
                                  <Input
                                    type="date"
                                    value={bookingDate}
                                    onChange={(e) => setBookingDate(e.target.value)}
                                  />
                                </div>
                                <div>
                                  <label className="text-xs">Time</label>
                                  <Input
                                    type="time"
                                    value={bookingTime}
                                    onChange={(e) => setBookingTime(e.target.value)}
                                  />
                                </div>
                                <div>
                                  <label className="text-xs">Duration (hours)</label>
                                  <Select value={bookingDuration} onValueChange={setBookingDuration}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Duration" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="1">1 hour</SelectItem>
                                      <SelectItem value="2">2 hours</SelectItem>
                                      <SelectItem value="3">3 hours</SelectItem>
                                      <SelectItem value="4">4 hours</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        <DialogFooter>
                          <Button variant="outline" asChild>
                            <a href="#" target="_blank" rel="noopener noreferrer">
                              <MapPin className="mr-2 h-4 w-4" />
                              View on Map
                            </a>
                          </Button>
                          {room.availability === "available" && (
                            <Button onClick={handleBookRoom} disabled={!bookingDate || !bookingTime || isLoading}>
                              {isLoading ? "Processing..." : "Book Room"}
                            </Button>
                          )}
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )
                })}
              </div>

              {filteredRooms.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">No rooms found matching your search.</div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="w-full flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Wifi className="h-4 w-4" />
            <span>Wi-Fi available in all buildings</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>24/7 Security</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

