"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"
import { Camera, Loader2, Plus, Trash2, Upload } from 'lucide-react'

const personalInfoSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  studentNumber: z.string().min(5, { message: "Student number is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  address: z.string().min(5, { message: "Address is required." }),
  city: z.string().min(2, { message: "City is required." }),
  postalCode: z.string().min(4, { message: "Postal code is required." }),
  country: z.string().min(2, { message: "Country is required." }),
})

const emergencyContactSchema = z.object({
  name: z.string().min(2, { message: "Name is required." }),
  relationship: z.string().min(2, { message: "Relationship is required." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  email: z.string().email({ message: "Please enter a valid email address." }).optional(),
})

type PersonalInfoValues = z.infer<typeof personalInfoSchema>
type EmergencyContactValues = z.infer<typeof emergencyContactSchema>

export function PersonalInfoTab() {
  const [isUploading, setIsUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isSavingEmergency, setIsSavingEmergency] = useState(false)

  const personalInfoForm = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
      studentNumber: "STU123456",
      email: "john.doe@university.edu",
      phone: "+254712345678",
      address: "123 University Way",
      city: "Nairobi",
      postalCode: "00100",
      country: "Kenya",
    },
  })

  const emergencyContactForm = useForm<EmergencyContactValues>({
    resolver: zodResolver(emergencyContactSchema),
    defaultValues: {
      name: "Jane Doe",
      relationship: "Parent",
      phone: "+254787654321",
      email: "jane.doe@example.com",
    },
  })

  function onSubmitPersonalInfo(data: PersonalInfoValues) {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Profile updated",
        description: "Your personal information has been updated successfully.",
      })
      setIsSaving(false)
    }, 1500)
  }

  function onSubmitEmergencyContact(data: EmergencyContactValues) {
    setIsSavingEmergency(true)
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Emergency contact updated",
        description: "Your emergency contact information has been updated successfully.",
      })
      setIsSavingEmergency(false)
    }, 1500)
  }

  function handleProfilePictureUpload() {
    setIsUploading(true)
    // Simulate upload
    setTimeout(() => {
      toast({
        title: "Profile picture updated",
        description: "Your profile picture has been updated successfully.",
      })
      setIsUploading(false)
    }, 2000)
  }

  return (
    <div className="space-y-8">
      {/* Profile Picture Section */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
          <CardDescription>
            Update your profile picture. This will be displayed across the student portal.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative group">
            <Avatar className="h-24 w-24 border-2 border-muted">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
              <AvatarFallback className="text-2xl">JD</AvatarFallback>
            </Avatar>
            <button 
              className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleProfilePictureUpload}
              disabled={isUploading}
            >
              {isUploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Camera className="h-4 w-4" />
              )}
            </button>
          </div>
          <div className="flex flex-col gap-4 w-full max-w-md">
            <div className="text-sm text-muted-foreground">
              Recommended: Square image, at least 300x300 pixels, maximum 5MB.
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={handleProfilePictureUpload}
                disabled={isUploading}
              >
                {isUploading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4" />
                )}
                Upload New Picture
              </Button>
              <Button variant="destructive" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information Form */}
      <Form {...personalInfoForm}>
        <form onSubmit={personalInfoForm.handleSubmit(onSubmitPersonalInfo)}>
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal details. This information will be used for official university communications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={personalInfoForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={personalInfoForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={personalInfoForm.control}
                name="studentNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your student number" {...field} readOnly />
                    </FormControl>
                    <FormDescription>Your student number cannot be changed.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={personalInfoForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={personalInfoForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Address Information</h3>
                <FormField
                  control={personalInfoForm.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter your street address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={personalInfoForm.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your city" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={personalInfoForm.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your postal code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={personalInfoForm.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your country" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" disabled={isSaving}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>

      {/* Emergency Contact Form */}
      <Form {...emergencyContactForm}>
        <form onSubmit={emergencyContactForm.handleSubmit(onSubmitEmergencyContact)}>
          <Card>
            <CardHeader>
              <CardTitle>Emergency Contact</CardTitle>
              <CardDescription>
                Provide details of someone we can contact in case of an emergency.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={emergencyContactForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter contact's full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={emergencyContactForm.control}
                  name="relationship"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relationship</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g. Parent, Spouse, Sibling" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={emergencyContactForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter contact's phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={emergencyContactForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter contact's email address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button">
                Add Another Contact
                <Plus className="ml-2 h-4 w-4" />
              </Button>
              <Button type="submit" disabled={isSavingEmergency}>
                {isSavingEmergency && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Contact
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  )
}
