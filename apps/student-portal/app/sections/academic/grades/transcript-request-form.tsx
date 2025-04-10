"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { AlertCircle, CreditCard, FileText, Phone, Building, Banknote } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getKenyanPaymentMethods } from "./payment-utils"

interface TranscriptRequestFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function TranscriptRequestForm({ onSubmit, onCancel }: TranscriptRequestFormProps) {
  const [formData, setFormData] = useState({
    type: "official",
    copies: 1,
    purpose: "",
    destination: "",
    collectionMethod: "pickup",
    deliveryAddress: "",
    expedited: false,
    paymentMethod: "mpesa",
    phoneNumber: "",
    agreeToTerms: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when field is updated
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.purpose.trim()) {
      newErrors.purpose = "Purpose is required"
    }

    if (formData.type === "official" && !formData.destination.trim()) {
      newErrors.destination = "Destination is required for official transcripts"
    }

    if (formData.collectionMethod === "delivery" && !formData.deliveryAddress.trim()) {
      newErrors.deliveryAddress = "Delivery address is required"
    }

    if (formData.paymentMethod === "mpesa" && !formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required for M-Pesa payment"
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const calculateFee = () => {
    let baseFee = formData.type === "official" ? 1000 : 500
    baseFee *= formData.copies

    if (formData.expedited) {
      baseFee += 500
    }

    if (formData.collectionMethod === "delivery") {
      baseFee += 200
    }

    return baseFee
  }

  const fee = calculateFee()
  const paymentMethods = getKenyanPaymentMethods()

  const getPaymentIcon = (id: string) => {
    switch (id) {
      case "mpesa":
        return <Phone size={16} />
      case "equity":
      case "kcb":
      case "coop":
        return <Building size={16} />
      case "cash":
        return <Banknote size={16} />
      default:
        return <CreditCard size={16} />
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Request Academic Transcript</CardTitle>
        <CardDescription>Fill in the details below to request your academic transcript</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Transcript Type</Label>
            <RadioGroup
              id="type"
              value={formData.type}
              onValueChange={(value) => handleChange("type", value)}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="official" id="official" />
                <Label htmlFor="official" className="font-normal">
                  Official Transcript (Sealed and Stamped)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="unofficial" id="unofficial" />
                <Label htmlFor="unofficial" className="font-normal">
                  Unofficial Transcript (For Personal Use)
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="copies">Number of Copies</Label>
              <Select
                value={formData.copies.toString()}
                onValueChange={(value) => handleChange("copies", Number.parseInt(value))}
              >
                <SelectTrigger id="copies">
                  <SelectValue placeholder="Select number of copies" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose of Transcript</Label>
              <Select value={formData.purpose} onValueChange={(value) => handleChange("purpose", value)}>
                <SelectTrigger id="purpose" className={errors.purpose ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="job">Job Application</SelectItem>
                  <SelectItem value="graduate">Graduate School Application</SelectItem>
                  <SelectItem value="scholarship">Scholarship Application</SelectItem>
                  <SelectItem value="transfer">University Transfer</SelectItem>
                  <SelectItem value="personal">Personal Records</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.purpose && <p className="text-xs text-red-500 mt-1">{errors.purpose}</p>}
            </div>
          </div>

          {formData.type === "official" && (
            <div className="space-y-2">
              <Label htmlFor="destination">Destination (Institution/Organization)</Label>
              <Input
                id="destination"
                placeholder="Enter destination"
                value={formData.destination}
                onChange={(e) => handleChange("destination", e.target.value)}
                className={errors.destination ? "border-red-500" : ""}
              />
              {errors.destination && <p className="text-xs text-red-500 mt-1">{errors.destination}</p>}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="collectionMethod">Collection Method</Label>
            <RadioGroup
              id="collectionMethod"
              value={formData.collectionMethod}
              onValueChange={(value) => handleChange("collectionMethod", value)}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pickup" id="pickup" />
                <Label htmlFor="pickup" className="font-normal">
                  Pickup from Registrar's Office
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="delivery" id="delivery" />
                <Label htmlFor="delivery" className="font-normal">
                  Delivery via Postal Service (Additional Fee: KES 200)
                </Label>
              </div>
            </RadioGroup>
          </div>

          {formData.collectionMethod === "delivery" && (
            <div className="space-y-2">
              <Label htmlFor="deliveryAddress">Delivery Address</Label>
              <Textarea
                id="deliveryAddress"
                placeholder="Enter full postal address"
                value={formData.deliveryAddress}
                onChange={(e) => handleChange("deliveryAddress", e.target.value)}
                className={errors.deliveryAddress ? "border-red-500" : ""}
              />
              {errors.deliveryAddress && <p className="text-xs text-red-500 mt-1">{errors.deliveryAddress}</p>}
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Switch
              id="expedited"
              checked={formData.expedited}
              onCheckedChange={(checked) => handleChange("expedited", checked)}
            />
            <Label htmlFor="expedited">Expedited Processing (Additional Fee: KES 500)</Label>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Processing Time</AlertTitle>
            <AlertDescription>
              Standard processing takes 5-7 working days. Expedited processing takes 2-3 working days.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label>Payment Method</Label>
            <RadioGroup
              value={formData.paymentMethod}
              onValueChange={(value) => handleChange("paymentMethod", value)}
              className="flex flex-col space-y-1"
            >
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={method.id} id={method.id} />
                  <Label htmlFor={method.id} className="font-normal flex items-center gap-2">
                    {getPaymentIcon(method.id)}
                    {method.name}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {formData.paymentMethod === "mpesa" && (
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">M-Pesa Phone Number</Label>
              <Input
                id="phoneNumber"
                placeholder="e.g., 07XX XXX XXX"
                value={formData.phoneNumber}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
                className={errors.phoneNumber ? "border-red-500" : ""}
              />
              {errors.phoneNumber && <p className="text-xs text-red-500 mt-1">{errors.phoneNumber}</p>}
              <p className="text-xs text-muted-foreground">You will receive an STK push to complete payment</p>
            </div>
          )}

          <div className="border-t pt-4">
            <div className="flex justify-between font-medium">
              <span>Total Fee:</span>
              <span>KES {fee.toLocaleString()}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Payment must be completed before processing begins</p>
          </div>

          <div className="flex items-start space-x-2">
            <div className="pt-0.5">
              <Switch
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => handleChange("agreeToTerms", checked)}
              />
            </div>
            <div>
              <Label htmlFor="agreeToTerms" className="font-normal">
                I confirm that the information provided is accurate and I agree to the terms and conditions
              </Label>
              {errors.agreeToTerms && <p className="text-xs text-red-500 mt-1">{errors.agreeToTerms}</p>}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} className="gap-2">
          <FileText size={16} />
          Submit Request
        </Button>
      </CardFooter>
    </Card>
  )
}

