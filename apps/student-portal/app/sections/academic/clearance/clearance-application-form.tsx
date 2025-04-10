"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"
import { AlertCircle, CheckCircle, ChevronRight, HelpCircle, Info } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion } from "framer-motion"
import { Separator } from "@/components/ui/separator"

interface Student {
  id: string
  name: string
  course: string
  year: string
  registrationNumber: string
  faculty: string
}

interface ClearanceApplicationFormProps {
  student: Student
}

const formSchema = z
  .object({
    clearanceType: z.enum(["graduation", "transfer", "withdrawal", "other"], {
      required_error: "Please select a clearance type",
    }),
    otherReason: z.string().optional(),
    expectedGraduationDate: z.string().optional(),
    currentAddress: z.string().min(5, {
      message: "Current address must be at least 5 characters.",
    }),
    permanentAddress: z.string().min(5, {
      message: "Permanent address must be at least 5 characters.",
    }),
    phoneNumber: z.string().min(10, {
      message: "Phone number must be at least 10 characters.",
    }),
    alternativePhoneNumber: z.string().optional(),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    hasOutstandingFees: z.boolean(),
    outstandingAmount: z.string().optional(),
    hasBorrowedBooks: z.boolean(),
    hasHostelAccommodation: z.boolean(),
    hostelRoomNumber: z.string().optional(),
    confirmDetails: z.boolean().refine((val) => val === true, {
      message: "You must confirm that all details are correct.",
    }),
  })
  .refine(
    (data) => {
      if (data.clearanceType === "other" && !data.otherReason) {
        return false
      }
      return true
    },
    {
      message: "Please specify the reason for clearance",
      path: ["otherReason"],
    },
  )
  .refine(
    (data) => {
      if (data.hasOutstandingFees && !data.outstandingAmount) {
        return false
      }
      return true
    },
    {
      message: "Please specify the outstanding amount",
      path: ["outstandingAmount"],
    },
  )
  .refine(
    (data) => {
      if (data.hasHostelAccommodation && !data.hostelRoomNumber) {
        return false
      }
      return true
    },
    {
      message: "Please specify your hostel room number",
      path: ["hostelRoomNumber"],
    },
  )

export function ClearanceApplicationForm({ student }: ClearanceApplicationFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 3

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clearanceType: "graduation",
      otherReason: "",
      expectedGraduationDate: "",
      currentAddress: "",
      permanentAddress: "",
      phoneNumber: "",
      alternativePhoneNumber: "",
      email: "",
      hasOutstandingFees: false,
      outstandingAmount: "",
      hasBorrowedBooks: false,
      hasHostelAccommodation: false,
      hostelRoomNumber: "",
      confirmDetails: false,
    },
  })

  const clearanceType = form.watch("clearanceType")
  const hasOutstandingFees = form.watch("hasOutstandingFees")
  const hasHostelAccommodation = form.watch("hasHostelAccommodation")

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      // In a real app, you would submit this data to your API
      console.log(values)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Application Submitted",
        description:
          "Your clearance application has been submitted successfully. You can now download the clearance forms.",
      })

      // Redirect to the clearance forms page
      router.push("/clearance/forms")
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="shadow-sm">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">Clearance Application</CardTitle>
              <CardDescription className="text-slate-500">
                Submit your clearance application to begin the process
              </CardDescription>
            </div>
            <div className="flex items-center gap-2  rounded-full px-3 py-1 border shadow-sm">
              <span className="text-sm font-medium text-slate-600">Step {currentStep} of {totalSteps}</span>
              <div className="flex gap-1">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-2 w-2 rounded-full ${
                      i + 1 <= currentStep ? 'bg-primary' : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Alert className="mb-6 border-blue-200 bg-blue-50">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-800">Important Information</AlertTitle>
            <AlertDescription className="text-blue-700">
              After submitting this application, you'll need to download the clearance forms and visit each department
              physically to get them signed.
            </AlertDescription>
          </Alert>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Step 1: Clearance Information */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-medium text-sm">
                      1
                    </div>
                    <h3 className="text-lg font-semibold">Clearance Information</h3>
                  </div>
                  <Separator className="my-4" />

                  <FormField
                    control={form.control}
                    name="clearanceType"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <div className="flex items-center gap-2">
                          <FormLabel className="text-base">Reason for Clearance</FormLabel>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-4 w-4 text-slate-400" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                <p>Select the primary reason you're applying for clearance</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-2"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4 hover:">
                              <FormControl>
                                <RadioGroupItem value="graduation" />
                              </FormControl>
                              <FormLabel className="font-medium cursor-pointer flex-1">Graduation</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4 hover:">
                              <FormControl>
                                <RadioGroupItem value="transfer" />
                              </FormControl>
                              <FormLabel className="font-medium cursor-pointer flex-1">Transfer to another institution</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4 hover:">
                              <FormControl>
                                <RadioGroupItem value="withdrawal" />
                              </FormControl>
                              <FormLabel className="font-medium cursor-pointer flex-1">Withdrawal from studies</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4 hover:">
                              <FormControl>
                                <RadioGroupItem value="other" />
                              </FormControl>
                              <FormLabel className="font-medium cursor-pointer flex-1">Other reason</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {clearanceType === "other" && (
                    <FormField
                      control={form.control}
                      name="otherReason"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Please specify</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Provide details about your reason for clearance" 
                              className="resize-none" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {clearanceType === "graduation" && (
                    <FormField
                      control={form.control}
                      name="expectedGraduationDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expected Graduation Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormDescription>
                            This helps us prioritize your clearance process
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </motion.div>
              )}

              {/* Step 2: Contact Information */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-medium text-sm">
                      2
                    </div>
                    <h3 className="text-lg font-semibold ">Contact Information</h3>
                  </div>
                  <Separator className="my-4" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="currentAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Address</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter your current address" 
                              className="resize-none h-24" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Where you currently reside
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="permanentAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Permanent Address</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter your permanent address" 
                              className="resize-none h-24" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Your home or family address
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+254 7XX XXX XXX" {...field} />
                          </FormControl>
                          <FormDescription>
                            Your primary contact number
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="alternativePhoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Alternative Phone Number (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="+254 7XX XXX XXX" {...field} />
                          </FormControl>
                          <FormDescription>
                            A backup number we can reach you on
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormDescription>
                            We'll send updates about your clearance to this email
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 3: Department Information */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-medium text-sm">
                      3
                    </div>
                    <h3 className="text-lg font-semibold ">Department Information</h3>
                  </div>
                  <Separator className="my-4" />

                  <div className="space-y-6">
                    <div className=" rounded-lg p-4 border border-slate-200">
                      <h4 className="font-medium  mb-2">Finance Department</h4>
                      <FormField
                        control={form.control}
                        name="hasOutstandingFees"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-4">
                            <FormControl>
                              <Checkbox 
                                checked={field.value} 
                                onCheckedChange={field.onChange} 
                                className="mt-1"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-base">I have outstanding fees with the Finance Department</FormLabel>
                              <FormDescription>
                                Check this if you have any unpaid tuition or other fees
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />

                      {hasOutstandingFees && (
                        <FormField
                          control={form.control}
                          name="outstandingAmount"
                          render={({ field }) => (
                            <FormItem className="ml-7">
                              <FormLabel>Outstanding Amount (KES)</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="e.g. 5000" {...field} />
                              </FormControl>
                              <FormDescription>
                                Approximate amount you owe to the university
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>

                    <div className=" rounded-lg p-4 border border-slate-200">
                      <h4 className="font-medium  mb-2">Library</h4>
                      <FormField
                        control={form.control}
                        name="hasBorrowedBooks"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox 
                                checked={field.value} 
                                onCheckedChange={field.onChange} 
                                className="mt-1"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-base">I have borrowed books from the Library</FormLabel>
                              <FormDescription>
                                Check this if you currently have books or materials borrowed from the library
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className=" rounded-lg p-4 border border-slate-200">
                      <h4 className="font-medium  mb-2">Accommodation</h4>
                      <FormField
                        control={form.control}
                        name="hasHostelAccommodation"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-4">
                            <FormControl>
                              <Checkbox 
                                checked={field.value} 
                                onCheckedChange={field.onChange} 
                                className="mt-1"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-base">I currently reside in university accommodation</FormLabel>
                              <FormDescription>
                                Check this if you live in a university hostel or residence
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />

                      {hasHostelAccommodation && (
                        <FormField
                          control={form.control}
                          name="hostelRoomNumber"
                          render={({ field }) => (
                            <FormItem className="ml-7">
                              <FormLabel>Hostel and Room Number</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. Block A, Room 123" {...field} />
                              </FormControl>
                              <FormDescription>
                                Specify your current accommodation details
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>

                    <FormField
                      control={form.control}
                      name="confirmDetails"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 ">
                          <FormControl>
                            <Checkbox 
                              checked={field.value} 
                              onCheckedChange={field.onChange} 
                              className="mt-1"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-base font-medium">I confirm that all the information provided is correct</FormLabel>
                            <FormDescription>
                              By checking this box, you confirm that all the details provided are accurate and complete. You
                              understand that providing false information may lead to disciplinary action.
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </motion.div>
              )}

              <div className="flex justify-between pt-4 border-t border-slate-200">
                {currentStep > 1 ? (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                ) : (
                  <div></div>
                )}
                
                {currentStep < totalSteps ? (
                  <Button 
                    type="button" 
                    onClick={nextStep}
                    className="gap-1"
                  >
                    Next Step <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    disabled={isSubmitting || !form.formState.isValid}
                    className="gap-1"
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        Submit Application <CheckCircle className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
