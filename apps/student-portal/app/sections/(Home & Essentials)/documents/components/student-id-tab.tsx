"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Download,
  Printer,
  AlertTriangle,
  CheckCircle2,
  QrCode,
  RefreshCw,
  ShieldAlert,
  Camera,
  Share2,
  Maximize2,
  Minimize2,
  FileText,
  Clock,
  Info,
  User,
  MapPin,
  Shield,
  BadgeIcon,
} from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function StudentIdTab() {
  const [isLoading, setIsLoading] = useState(true)
  const [showQrCode, setShowQrCode] = useState(false)
  const [fullScreen, setFullScreen] = useState(false)
  const [activeTab, setActiveTab] = useState("digital")
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const studentInfo = {
    name: "John Kamau Njoroge",
    studentId: "SCT221-0892/2020",
    program: "Bachelor of Science in Computer Science",
    faculty: "Faculty of Science and Technology",
    validUntil: "December 31, 2024",
    issueDate: "January 15, 2022",
    status: "Active",
    campus: "Main Campus, Nairobi",
    idNumber: "32198765",
    bloodGroup: "O+",
    emergencyContact: "+254 712 345 678",
  }

  const timelineEvents = [
    {
      id: 1,
      title: "Application Submitted",
      date: "January 15, 2022",
      description: "Your application for a student ID card was received and processed.",
      status: "completed",
      icon: FileText,
    },
    {
      id: 2,
      title: "Photo Verification",
      date: "January 16, 2022",
      description: "Your photo was verified and approved for use on your ID card.",
      status: "completed",
      icon: Camera,
    },
    {
      id: 3,
      title: "Card Printing",
      date: "January 18, 2022",
      description: "Your physical ID card has been printed and processed.",
      status: "completed",
      icon: Printer,
    },
    {
      id: 4,
      title: "Ready for Collection",
      date: "January 20, 2022",
      description: "Your ID card is ready for collection at the Student Center.",
      status: "current",
      icon: CheckCircle2,
    },
    {
      id: 5,
      title: "Collected",
      date: "Pending",
      description: "You have not yet collected your physical ID card.",
      status: "pending",
      icon: User,
    },
  ]

  const handleDownload = () => {
    setIsLoading(true)
    // Simulate download delay
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Student ID Downloaded",
        description: "Your digital student ID has been downloaded successfully.",
      })
    }, 1500)
  }

  const handlePrint = () => {
    setIsLoading(true)
    // Simulate print delay
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Print Job Sent",
        description: "Your student ID has been sent to the printer.",
      })
    }, 1500)
  }

  const handleReplacementRequest = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Replacement Request Submitted",
        description: "Your request has been submitted. You will be notified when it's processed.",
      })
    }, 2000)
  }

  const handleShare = () => {
    toast({
      title: "Temporary Link Generated",
      description: "A secure link to your ID has been copied to clipboard. It will expire in 24 hours.",
    })
  }

  return (
    <div className="p-4 md:p-6">
      <Tabs defaultValue="digital" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="digital" className="flex items-center gap-2">
            <QrCode className="h-4 w-4" />
            Digital Student ID
          </TabsTrigger>
          <TabsTrigger value="physical" className="flex items-center gap-2">
            <BadgeIcon className="h-4 w-4" />
            Physical ID Card
          </TabsTrigger>
        </TabsList>

        <TabsContent value="digital" className="mt-0">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Student ID Card Preview */}
            <div className={cn("flex-1 transition-all duration-300", fullScreen ? "lg:w-3/4 lg:mx-auto" : "")}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">Digital Student ID</h2>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setFullScreen(!fullScreen)}
                        className="h-8 w-8"
                      >
                        {fullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{fullScreen ? "Exit fullscreen" : "View fullscreen"}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              {isLoading ? (
                <Card className="relative overflow-hidden border-2 border-primary/20">
                  <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <Skeleton className="w-32 h-32 rounded-lg" />
                      <div className="flex-1 w-full">
                        <Skeleton className="h-7 w-3/4 mb-2" />
                        <Skeleton className="h-5 w-1/2 mb-4" />
                        <Skeleton className="h-4 w-5/6 mb-2" />
                        <Skeleton className="h-4 w-4/6 mb-4" />
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Skeleton className="h-3 w-20 mb-1" />
                            <Skeleton className="h-4 w-24" />
                          </div>
                          <div>
                            <Skeleton className="h-3 w-20 mb-1" />
                            <Skeleton className="h-4 w-24" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card
                  className={cn(
                    "relative overflow-hidden transition-all duration-300",
                    "border-0 shadow-lg",
                    fullScreen ? "transform scale-110 md:scale-125 lg:scale-100 mt-8 md:mt-12 lg:mt-0" : "",
                  )}
                >
                  {/* University Header */}
                  <div className="bg-gradient-to-r from-green-800 to-green-700 text-white p-4 text-center relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400"></div>
                    <div className="flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white p-1 mr-3">
                        <div className="w-full h-full rounded-full bg-green-800 flex items-center justify-center">
                          <span className="text-white font-bold text-xs">SU</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-sm md:text-base">STRATHMORE UNIVERSITY</h3>
                        <p className="text-xs text-green-100">Excellence in Education and Training</p>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-5 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="relative">
                        <div className="w-32 h-32 rounded-lg overflow-hidden border-4 border-white dark:border-slate-700 shadow-md bg-white">
                          {showQrCode ? (
                            <div className="w-full h-full bg-white flex items-center justify-center p-2">
                              <Image
                                src="/placeholder.svg?height=128&width=128&text=QR+Code"
                                alt="QR Code"
                                width={128}
                                height={128}
                              />
                            </div>
                          ) : (
                            <Image
                              src="/placeholder.svg?height=128&width=128"
                              alt="Student Photo"
                              width={128}
                              height={128}
                              className="object-cover"
                            />
                          )}
                        </div>
                        <Badge className="absolute -top-2 -right-2 bg-green-600 hover:bg-green-700">
                          {studentInfo.status}
                        </Badge>
                      </div>

                      <div className="flex-1">
                        <div className="text-center md:text-left">
                          <h3 className="text-xl font-bold">{studentInfo.name}</h3>
                          <div className="text-lg font-semibold text-primary mt-1">{studentInfo.studentId}</div>
                          <div className="text-sm text-muted-foreground mt-3">{studentInfo.program}</div>
                          <div className="text-sm text-muted-foreground">{studentInfo.faculty}</div>

                          <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                            <div>
                              <span className="text-muted-foreground text-xs">Issue Date:</span>
                              <div className="font-medium">{studentInfo.issueDate}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground text-xs">Valid Until:</span>
                              <div className="font-medium">{studentInfo.validUntil}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground text-xs">Campus:</span>
                              <div className="font-medium">{studentInfo.campus}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground text-xs">ID Number:</span>
                              <div className="font-medium">{studentInfo.idNumber}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex justify-between items-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowQrCode(!showQrCode)}
                        className="text-xs"
                      >
                        {showQrCode ? (
                          <>
                            <RefreshCw className="h-3 w-3 mr-1" /> Show Photo
                          </>
                        ) : (
                          <>
                            <QrCode className="h-3 w-3 mr-1" /> Show QR Code
                          </>
                        )}
                      </Button>

                      <div className="text-xs text-muted-foreground italic">Scan QR for verification</div>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 text-center">
                      <p className="text-xs text-muted-foreground">
                        This ID card remains the property of Stratmore University and must be surrendered upon request.
                      </p>
                      <p className="text-xs font-medium mt-1">
                        If found, please return to Stratmore University, P.O. Box 43844-00100, Nairobi
                      </p>
                    </div>
                  </CardContent>

                  {/* Security features */}
                  <div className="absolute bottom-3 right-3">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                </Card>
              )}

              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={handleDownload}
                        disabled={isLoading}
                        className="flex items-center justify-center"
                      >
                        <Download className="mr-2 h-4 w-4" /> Download
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Download digital ID for offline use</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={handlePrint}
                        disabled={isLoading}
                        className="flex items-center justify-center"
                      >
                        <Printer className="mr-2 h-4 w-4" /> Print
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Print a physical copy of your ID</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="secondary"
                        onClick={handleShare}
                        disabled={isLoading}
                        className="flex items-center justify-center"
                      >
                        <Share2 className="mr-2 h-4 w-4" /> Share
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Generate a temporary secure link</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      disabled={isLoading}
                      className="flex items-center justify-center border border-dashed"
                    >
                      <Camera className="mr-2 h-4 w-4" /> Update Photo
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Update ID Photo</DialogTitle>
                      <DialogDescription>
                        Upload a new photo for your student ID. The photo must meet university guidelines.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-8 text-center">
                        <Camera className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                        <p className="text-sm text-muted-foreground mb-4">
                          Drag and drop your photo here, or click to browse
                        </p>
                        <Button>Upload Photo</Button>
                      </div>
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Photo Requirements:</h4>
                        <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                          <li>Recent, color photo with white background</li>
                          <li>Face clearly visible, looking directly at camera</li>
                          <li>No hats, sunglasses or head coverings (unless for religious purposes)</li>
                          <li>File format: JPG or PNG, max 5MB</li>
                        </ul>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {!fullScreen && (
              /* ID Information and Actions */
              <div className="flex-1 lg:max-w-sm">
                <h2 className="text-2xl font-semibold mb-4">ID Information</h2>

                <div className="space-y-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-medium flex items-center">
                        <User className="h-4 w-4 mr-2 text-primary" />
                        Personal Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 pb-3">
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <div className="w-28 flex-shrink-0">
                            <span className="text-muted-foreground text-sm">Status:</span>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30"
                          >
                            <CheckCircle2 className="w-3 h-3 mr-1" /> Active
                          </Badge>
                        </div>
                        <div className="flex items-start">
                          <div className="w-28 flex-shrink-0">
                            <span className="text-muted-foreground text-sm">ID Number:</span>
                          </div>
                          <span className="font-medium">{studentInfo.idNumber}</span>
                        </div>
                        <div className="flex items-start">
                          <div className="w-28 flex-shrink-0">
                            <span className="text-muted-foreground text-sm">Blood Group:</span>
                          </div>
                          <span className="font-medium">{studentInfo.bloodGroup}</span>
                        </div>
                        <div className="flex items-start">
                          <div className="w-28 flex-shrink-0">
                            <span className="text-muted-foreground text-sm">Emergency:</span>
                          </div>
                          <span className="font-medium">{studentInfo.emergencyContact}</span>
                        </div>
                        <div className="flex items-start">
                          <div className="w-28 flex-shrink-0">
                            <span className="text-muted-foreground text-sm">Expiration:</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1 text-amber-500" />
                            <span>{studentInfo.validUntil}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium text-amber-800 dark:text-amber-400 flex items-center">
                        <ShieldAlert className="h-4 w-4 mr-2 text-amber-600 dark:text-amber-500" />
                        Important Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1 list-disc list-inside">
                        <li>Your student ID is required for all campus facilities</li>
                        <li>Present your ID for all examinations and university events</li>
                        <li>The QR code provides access to library and labs</li>
                        <li>Report lost or stolen IDs immediately</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="secondary" className="w-full">
                        <AlertTriangle className="mr-2 h-4 w-4" /> Request Replacement ID
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Request ID Replacement</DialogTitle>
                        <DialogDescription>
                          Fill out this form to request a replacement for your student ID card. A processing fee of KES
                          1,000 may apply.
                        </DialogDescription>
                      </DialogHeader>

                      <form onSubmit={handleReplacementRequest} className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="reason">Reason for Replacement</Label>
                          <Select required>
                            <SelectTrigger>
                              <SelectValue placeholder="Select reason" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="lost">Lost ID Card</SelectItem>
                              <SelectItem value="stolen">Stolen ID Card</SelectItem>
                              <SelectItem value="damaged">Damaged ID Card</SelectItem>
                              <SelectItem value="name-change">Name Change</SelectItem>
                              <SelectItem value="photo-update">Photo Update</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Do you have your old ID card?</Label>
                          <RadioGroup defaultValue="no">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="have-old-yes" />
                              <Label htmlFor="have-old-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="have-old-no" />
                              <Label htmlFor="have-old-no">No</Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="police">Police Abstract (for lost/stolen)</Label>
                            <span className="text-xs text-muted-foreground">Optional</span>
                          </div>
                          <div className="border border-dashed rounded p-4 text-center text-sm text-muted-foreground">
                            <p>Drag and drop your police abstract here, or click to browse</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="details">Additional Details</Label>
                          <Textarea
                            id="details"
                            placeholder="Please provide any additional information about your request"
                            className="min-h-[100px]"
                          />
                        </div>

                        <div className="flex items-center space-x-2 pt-2">
                          <Switch id="terms" />
                          <Label htmlFor="terms" className="text-sm">
                            I understand that a replacement fee of KES 1,000 will be added to my fee statement
                          </Label>
                        </div>

                        <DialogFooter>
                          <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Submitting..." : "Submit Request"}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="physical" className="mt-0">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-4">Physical ID Card</h2>

              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="w-full md:w-auto">
                      <div className="w-full md:w-40 h-40 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center border">
                        <Image
                          src="/placeholder.svg?height=160&width=160&text=Physical+ID"
                          alt="Physical ID Card"
                          width={160}
                          height={160}
                          className="object-contain"
                        />
                      </div>
                    </div>

                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="font-medium text-lg">Physical ID Card Status</h3>
                        <p className="text-sm text-muted-foreground">
                          Your physical student ID card status and collection information.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">Processing Status</span>
                            <Badge>Ready for Collection</Badge>
                          </div>
                          <Progress value={100} className="h-2" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Collection Point:</span>
                            <div className="font-medium">Student Center, Ground Floor</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Available From:</span>
                            <div className="font-medium">January 20, 2022</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Office Hours:</span>
                            <div className="font-medium">Mon-Fri, 8:00 AM - 5:00 PM</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Requirements:</span>
                            <div className="font-medium">National ID, Fee Receipt</div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <Button className="w-full sm:w-auto">View Collection Instructions</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6">
                <h3 className="font-medium mb-3">ID Card Timeline</h3>
                <div className="relative pl-6 space-y-0">
                  {timelineEvents.map((event, index) => (
                    <div
                      key={event.id}
                      className={cn("relative pb-8", index === timelineEvents.length - 1 ? "pb-0" : "")}
                    >
                      {/* Timeline connector */}
                      {index < timelineEvents.length - 1 && (
                        <div
                          className={cn(
                            "absolute left-0 top-0 h-full w-0.5",
                            event.status === "pending" ? "bg-slate-200 dark:bg-slate-700" : "bg-primary/60",
                          )}
                          style={{ left: "0.5625rem" }}
                        />
                      )}

                      {/* Timeline dot */}
                      <div
                        className={cn(
                          "absolute left-0 top-0 flex h-3 w-3 items-center justify-center rounded-full",
                          event.status === "current"
                            ? "bg-green-500"
                            : event.status === "completed"
                              ? "bg-primary"
                              : "bg-slate-300 dark:bg-slate-600",
                        )}
                        style={{ left: "0.375rem" }}
                      />

                      <div className="ml-6">
                        <div className="flex items-center">
                          <event.icon className="h-4 w-4 mr-2 text-primary" />
                          <h4 className="font-medium">{event.title}</h4>
                          <Badge
                            variant="outline"
                            className={cn(
                              "ml-2",
                              event.status === "current"
                                ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : event.status === "completed"
                                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                  : "",
                            )}
                          >
                            {event.status === "current"
                              ? "Current"
                              : event.status === "completed"
                                ? "Completed"
                                : "Pending"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{event.date}</p>
                        <p className="text-sm mt-1">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex-1 lg:max-w-sm">
              <h2 className="text-2xl font-semibold mb-4">Collection Information</h2>

              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-medium flex items-center">
                      <Info className="h-4 w-4 mr-2 text-primary" />
                      What to Bring
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <div>
                          <span className="font-medium">National ID Card</span>
                          <p className="text-muted-foreground">Original ID required for verification</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <div>
                          <span className="font-medium">Fee Payment Receipt</span>
                          <p className="text-muted-foreground">Proof of payment for current semester</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <div>
                          <span className="font-medium">Course Registration Form</span>
                          <p className="text-muted-foreground">Stamped by your department</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium text-blue-800 dark:text-blue-400 flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-500" />
                      Collection Guidelines
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                      <li>Visit the Student Center during office hours (8:00 AM - 5:00 PM)</li>
                      <li>Bring all required documents for verification</li>
                      <li>ID cards must be collected in person</li>
                      <li>Sign the collection register upon receipt</li>
                      <li>Verify all details on your card before leaving</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-medium flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-primary" />
                      ID Card Policies
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3 text-sm">
                      <p>Your student ID card is an official university document and must be handled accordingly:</p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Must be carried at all times while on campus</li>
                        <li>Required for access to university facilities</li>
                        <li>Cannot be transferred or loaned to others</li>
                        <li>Must be surrendered upon completion of studies</li>
                        <li>Tampering with the card is strictly prohibited</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Button variant="outline" className="w-full">
                  Report Collection Issues
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

