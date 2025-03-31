"use client"

import { useState, useRef } from "react"
import { Search, MapPin, Building, Navigation, Plus, Minus, RotateCw, Info, Download } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type Location = {
  id: string
  name: string
  type: "building" | "landmark" | "facility"
  coordinates: { x: number; y: number }
  description: string
  image?: string
  floors?: number
  departments?: string[]
  facilities?: string[]
}

export function CampusMap() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [zoom, setZoom] = useState(1)
  const [mapView, setMapView] = useState<"satellite" | "map" | "3d">("map")
  const [showLabels, setShowLabels] = useState(true)
  const [showBuildings, setShowBuildings] = useState(true)
  const [showFacilities, setShowFacilities] = useState(true)
  const [showLandmarks, setShowLandmarks] = useState(true)
  const mapRef = useRef<HTMLDivElement>(null)

  // Mock campus locations data
  const locations: Location[] = [
    {
      id: "b1",
      name: "Main Academic Building",
      type: "building",
      coordinates: { x: 150, y: 120 },
      description: "The main academic building housing lecture halls, classrooms, and faculty offices.",
      image: "/placeholder.svg?height=300&width=500",
      floors: 5,
      departments: ["Computer Science", "Mathematics", "Physics"],
      facilities: ["Lecture Halls", "Classrooms", "Faculty Offices", "Computer Labs"],
    },
    {
      id: "b2",
      name: "Science Complex",
      type: "building",
      coordinates: { x: 250, y: 180 },
      description: "Houses the science departments and research laboratories.",
      image: "/placeholder.svg?height=300&width=500",
      floors: 4,
      departments: ["Chemistry", "Biology", "Environmental Science"],
      facilities: ["Research Labs", "Lecture Halls", "Specialized Equipment"],
    },
    {
      id: "b3",
      name: "Engineering Block",
      type: "building",
      coordinates: { x: 350, y: 150 },
      description: "Home to the engineering departments and workshops.",
      image: "/placeholder.svg?height=300&width=500",
      floors: 3,
      departments: ["Mechanical Engineering", "Electrical Engineering", "Civil Engineering"],
      facilities: ["Workshops", "Design Studios", "Project Spaces"],
    },
    {
      id: "b4",
      name: "Library",
      type: "building",
      coordinates: { x: 200, y: 250 },
      description: "The university's main library with study spaces and digital resources.",
      image: "/placeholder.svg?height=300&width=500",
      floors: 6,
      facilities: ["Reading Rooms", "Study Carrels", "Digital Media Center", "Archives"],
    },
    {
      id: "f1",
      name: "Student Center",
      type: "facility",
      coordinates: { x: 280, y: 220 },
      description: "Central hub for student activities and services.",
      image: "/placeholder.svg?height=300&width=500",
      facilities: ["Cafeteria", "Student Lounge", "Club Offices", "Event Spaces"],
    },
    {
      id: "f2",
      name: "Sports Complex",
      type: "facility",
      coordinates: { x: 400, y: 300 },
      description: "Athletic facilities including gym, courts, and fields.",
      image: "/placeholder.svg?height=300&width=500",
      facilities: ["Gymnasium", "Swimming Pool", "Tennis Courts", "Track Field"],
    },
    {
      id: "l1",
      name: "Central Plaza",
      type: "landmark",
      coordinates: { x: 250, y: 250 },
      description: "The main gathering area at the heart of the campus.",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "l2",
      name: "Founders' Monument",
      type: "landmark",
      coordinates: { x: 180, y: 180 },
      description: "Historic monument commemorating the university's founders.",
      image: "/placeholder.svg?height=300&width=500",
    },
  ]

  // Filter locations based on search query
  const filteredLocations = locations.filter(
    (location) =>
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (location.departments &&
        location.departments.some((dept) => dept.toLowerCase().includes(searchQuery.toLowerCase()))),
  )

  // Filter locations based on type toggles
  const displayedLocations = filteredLocations.filter((location) => {
    if (location.type === "building" && !showBuildings) return false
    if (location.type === "facility" && !showFacilities) return false
    if (location.type === "landmark" && !showLandmarks) return false
    return true
  })

  // Handle zoom in/out
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, 2))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 0.6))
  }

  const handleReset = () => {
    setZoom(1)
  }

  // Get pin color based on location type
  const getPinColor = (type: string) => {
    switch (type) {
      case "building":
        return "text-blue-500"
      case "facility":
        return "text-green-500"
      case "landmark":
        return "text-amber-500"
      default:
        return "text-gray-500"
    }
  }

  // Get location type badge
  const getLocationTypeBadge = (type: string) => {
    switch (type) {
      case "building":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Building</Badge>
      case "facility":
        return <Badge className="bg-green-500 hover:bg-green-600">Facility</Badge>
      case "landmark":
        return <Badge className="bg-amber-500 hover:bg-amber-600">Landmark</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <CardTitle>Interactive Campus Map</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Select value={mapView} onValueChange={(value: any) => setMapView(value)}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Map view" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="map">Map View</SelectItem>
                  <SelectItem value="satellite">Satellite</SelectItem>
                  <SelectItem value="3d">3D View</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <CardDescription>Explore campus buildings, facilities, and landmarks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative w-full sm:w-[300px]">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search locations..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className={showBuildings ? "bg-blue-500/10" : ""}
                onClick={() => setShowBuildings(!showBuildings)}
              >
                <Building className={`mr-2 h-4 w-4 ${showBuildings ? "text-blue-500" : ""}`} />
                Buildings
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={showFacilities ? "bg-green-500/10" : ""}
                onClick={() => setShowFacilities(!showFacilities)}
              >
                <MapPin className={`mr-2 h-4 w-4 ${showFacilities ? "text-green-500" : ""}`} />
                Facilities
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={showLandmarks ? "bg-amber-500/10" : ""}
                onClick={() => setShowLandmarks(!showLandmarks)}
              >
                <Navigation className={`mr-2 h-4 w-4 ${showLandmarks ? "text-amber-500" : ""}`} />
                Landmarks
              </Button>
            </div>
          </div>

          <div className="relative border rounded-md overflow-hidden" style={{ height: "500px" }}>
            {/* Map container */}
            <div
              ref={mapRef}
              className="relative w-full h-full bg-slate-100 dark:bg-slate-900 overflow-hidden"
              style={{
                backgroundImage: `url('/placeholder.svg?height=1000&width=1000')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: `scale(${zoom})`,
                transition: "transform 0.3s ease",
              }}
            >
              {/* Map pins */}
              {displayedLocations.map((location) => (
                <TooltipProvider key={location.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Dialog>
                        <DialogTrigger asChild>
                          <button
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 hover:scale-110 transition-transform"
                            style={{
                              left: `${location.coordinates.x}px`,
                              top: `${location.coordinates.y}px`,
                            }}
                            onClick={() => setSelectedLocation(location)}
                          >
                            {location.type === "building" ? (
                              <Building className={`h-6 w-6 ${getPinColor(location.type)}`} />
                            ) : location.type === "landmark" ? (
                              <Navigation className={`h-6 w-6 ${getPinColor(location.type)}`} />
                            ) : (
                              <MapPin className={`h-6 w-6 ${getPinColor(location.type)}`} />
                            )}
                            {showLabels && (
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 whitespace-nowrap bg-background/80 dark:bg-background/80 px-2 py-0.5 text-xs rounded">
                                {location.name}
                              </div>
                            )}
                          </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              {location.name}
                              {getLocationTypeBadge(location.type)}
                            </DialogTitle>
                            <DialogDescription>{location.description}</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-6 py-4">
                            <div className="aspect-video rounded-md overflow-hidden">
                              <img
                                src={location.image || "/placeholder.svg?height=300&width=500"}
                                alt={location.name}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                              {location.floors && (
                                <div>
                                  <h4 className="text-sm font-medium mb-2">Building Information</h4>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Floors:</span>
                                      <span>{location.floors}</span>
                                    </div>
                                    {location.departments && (
                                      <div>
                                        <span className="text-muted-foreground">Departments:</span>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                          {location.departments.map((dept, index) => (
                                            <Badge key={index} variant="outline" className="text-xs">
                                              {dept}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}

                              {location.facilities && (
                                <div>
                                  <h4 className="text-sm font-medium mb-2">Facilities</h4>
                                  <div className="flex flex-wrap gap-1">
                                    {location.facilities.map((facility, index) => (
                                      <Badge key={index} variant="outline" className="text-xs">
                                        {facility}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <a href="#" target="_blank" rel="noopener noreferrer">
                                  <Info className="mr-2 h-4 w-4" />
                                  More Details
                                </a>
                              </Button>
                              <Button size="sm" asChild>
                                <a href="#" target="_blank" rel="noopener noreferrer">
                                  <Navigation className="mr-2 h-4 w-4" />
                                  Get Directions
                                </a>
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{location.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>

            {/* Map controls */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
              <Button variant="secondary" size="icon" onClick={handleZoomIn}>
                <Plus className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="icon" onClick={handleZoomOut}>
                <Minus className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="icon" onClick={handleReset}>
                <RotateCw className="h-4 w-4" />
              </Button>
            </div>

            {/* Map legend */}
            <div className="absolute bottom-4 left-4 bg-background/90 dark:bg-background/90 p-2 rounded-md border text-xs">
              <div className="font-medium mb-1">Legend</div>
              <div className="flex items-center gap-2 mb-1">
                <Building className="h-4 w-4 text-blue-500" />
                <span>Buildings</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="h-4 w-4 text-green-500" />
                <span>Facilities</span>
              </div>
              <div className="flex items-center gap-2">
                <Navigation className="h-4 w-4 text-amber-500" />
                <span>Landmarks</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <div className="text-sm text-muted-foreground">Click on any location pin to view details</div>
          <Button variant="outline" size="sm" asChild>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Download className="mr-2 h-4 w-4" />
              Download Map
            </a>
          </Button>
        </CardFooter>
      </Card>

      {/* Nearby locations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5 text-primary" />
            Nearby Locations
          </CardTitle>
          <CardDescription>Locations near your current position or next class</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px] pr-4">
            <div className="space-y-3">
              {locations.slice(0, 5).map((location) => (
                <div
                  key={location.id}
                  className="flex items-center gap-3 p-3 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  {location.type === "building" ? (
                    <Building className={`h-5 w-5 ${getPinColor(location.type)}`} />
                  ) : location.type === "landmark" ? (
                    <Navigation className={`h-5 w-5 ${getPinColor(location.type)}`} />
                  ) : (
                    <MapPin className={`h-5 w-5 ${getPinColor(location.type)}`} />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{location.name}</div>
                    <div className="text-sm text-muted-foreground truncate">
                      {location.description.substring(0, 60)}...
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <Navigation className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

