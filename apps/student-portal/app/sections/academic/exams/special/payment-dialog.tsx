"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const paymentFormSchema = z.object({
  paymentMethod: z.enum(["mpesa", "bank", "card"]),
  phoneNumber: z
    .string()
    .optional()
    .refine((val) => !val || /^(?:254|\+254|0)?(7[0-9]{8})$/.test(val), { message: "Invalid Kenyan phone number" }),
  transactionId: z.string().optional(),
  amount: z.string().min(1, "Amount is required"),
})

type PaymentFormValues = z.infer<typeof paymentFormSchema>

interface PaymentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PaymentDialog({ open, onOpenChange }: PaymentDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      paymentMethod: "mpesa",
      phoneNumber: "",
      transactionId: "",
      amount: "",
    },
  })

  const onSubmit = (data: PaymentFormValues) => {
    setIsSubmitting(true)

    setTimeout(() => {
      console.log("Payment form data:", data)
      setIsSubmitting(false)
      onOpenChange(false)

      toast({
        title: "Payment initiated",
        description:
          data.paymentMethod === "mpesa"
            ? "Please check your phone for M-Pesa payment prompt."
            : "Your payment has been initiated. Please complete the process.",
      })
    }, 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Payment for Special Exam</DialogTitle>
          <DialogDescription>Complete your payment to finalize the application</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Payment Method</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-3 gap-3"
                    >
                      <FormItem>
                        <FormControl>
                          <RadioGroupItem value="mpesa" id="mpesa" />
                        </FormControl>
                        <FormLabel htmlFor="mpesa">M-Pesa</FormLabel>
                      </FormItem>
                      <FormItem>
                        <FormControl>
                          <RadioGroupItem value="bank" id="bank" />
                        </FormControl>
                        <FormLabel htmlFor="bank">Bank Transfer</FormLabel>
                      </FormItem>
                      <FormItem>
                        <FormControl>
                          <RadioGroupItem value="card" id="card" />
                        </FormControl>
                        <FormLabel htmlFor="card">Card</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormDescription>Choose your preferred payment method</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.getValues("paymentMethod") === "mpesa" && (
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="07XXXXXXXX" {...field} />
                    </FormControl>
                    <FormDescription>Enter your M-Pesa registered phone number</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter amount" type="number" {...field} />
                  </FormControl>
                  <FormDescription>Enter the amount to pay</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="transactionId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter transaction ID" {...field} />
                  </FormControl>
                  <FormDescription>Enter the transaction ID for verification</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isSubmitting} type="submit">
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Initiate Payment
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

