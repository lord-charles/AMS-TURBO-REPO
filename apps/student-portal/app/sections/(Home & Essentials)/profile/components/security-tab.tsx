"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"
import { AlertTriangle, Check, Laptop, Loader2, LogOut, Smartphone, Tablet } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, { message: "Current password is required." }),
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
      .regex(/[0-9]/, { message: "Password must contain at least one number." })
      .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character." }),
    confirmPassword: z.string().min(1, { message: "Please confirm your password." }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  })

type PasswordValues = z.infer<typeof passwordSchema>

const activeDevices = [
  {
    id: 1,
    device: "MacBook Pro",
    type: "laptop",
    location: "Nairobi, Kenya",
    ip: "196.201.xxx.xxx",
    lastActive: "Current session",
    isCurrent: true,
  },
  {
    id: 2,
    device: "iPhone 13",
    type: "mobile",
    location: "Nairobi, Kenya",
    ip: "196.201.xxx.xxx",
    lastActive: "2 hours ago",
    isCurrent: false,
  },
  {
    id: 3,
    device: "iPad Air",
    type: "tablet",
    location: "Mombasa, Kenya",
    ip: "41.215.xxx.xxx",
    lastActive: "Yesterday at 3:45 PM",
    isCurrent: false,
  },
]

const recentActivity = [
  {
    id: 1,
    activity: "Password changed",
    date: "March 15, 2023 at 10:30 AM",
    location: "Nairobi, Kenya",
    ip: "196.201.xxx.xxx",
  },
  {
    id: 2,
    activity: "Login from new device",
    date: "March 10, 2023 at 8:15 AM",
    location: "Mombasa, Kenya",
    ip: "41.215.xxx.xxx",
  },
  {
    id: 3,
    activity: "Two-factor authentication enabled",
    date: "February 28, 2023 at 2:45 PM",
    location: "Nairobi, Kenya",
    ip: "196.201.xxx.xxx",
  },
]

export function SecurityTab() {
  const [isSavingPassword, setIsSavingPassword] = useState(false)
  const [is2FAEnabled, setIs2FAEnabled] = useState(false)
  const [isEnabling2FA, setIsEnabling2FA] = useState(false)
  const [showVerification, setShowVerification] = useState(false)
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""])
  const [sessionTimeout, setSessionTimeout] = useState("30")
  const [isSavingTimeout, setIsSavingTimeout] = useState(false)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [deviceToLogout, setDeviceToLogout] = useState<number | null>(null)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const passwordForm = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  function onSubmitPassword(data: PasswordValues) {
    setIsSavingPassword(true)
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully.",
      })
      passwordForm.reset()
      setIsSavingPassword(false)
    }, 1500)
  }

  function handleToggle2FA(checked: boolean) {
    if (checked) {
      setIsEnabling2FA(true)
      // Simulate API call to send verification code
      setTimeout(() => {
        setShowVerification(true)
        setIsEnabling2FA(false)
      }, 1500)
    } else {
      setIs2FAEnabled(false)
      toast({
        title: "Two-factor authentication disabled",
        description: "Your account is now less secure. We recommend enabling 2FA for better security.",
        variant: "destructive",
      })
    }
  }

  function handleVerificationCodeChange(index: number, value: string) {
    const newCode = [...verificationCode]
    newCode[index] = value
    setVerificationCode(newCode)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`verification-code-${index + 1}`)
      if (nextInput) {
        nextInput.focus()
      }
    }
  }

  function handleVerifyCode() {
    setIsEnabling2FA(true)
    // Simulate API call
    setTimeout(() => {
      setIs2FAEnabled(true)
      setShowVerification(false)
      setIsEnabling2FA(false)
      toast({
        title: "Two-factor authentication enabled",
        description: "Your account is now more secure with 2FA.",
      })
    }, 1500)
  }

  function handleSaveTimeout() {
    setIsSavingTimeout(true)
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Session timeout updated",
        description: `Your session will now timeout after ${sessionTimeout} minutes of inactivity.`,
      })
      setIsSavingTimeout(false)
    }, 1000)
  }

  function handleLogoutDevice() {
    setIsLoggingOut(true)
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Device logged out",
        description: "The selected device has been logged out successfully.",
      })
      setIsLoggingOut(false)
      setShowLogoutDialog(false)
      setDeviceToLogout(null)
    }, 1500)
  }

  function getDeviceIcon(type: string) {
    switch (type) {
      case "laptop":
        return <Laptop className="h-4 w-4" />
      case "mobile":
        return <Smartphone className="h-4 w-4" />
      case "tablet":
        return <Tablet className="h-4 w-4" />
      default:
        return <Laptop className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-8">
      {/* Password Change Section */}
      <Form {...passwordForm}>
        <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)}>
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password to keep your account secure. We recommend using a strong, unique password.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={passwordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your current password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your new password" {...field} />
                    </FormControl>
                    <FormDescription>
                      Password must be at least 8 characters and include uppercase, lowercase, number, and special
                      character.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Confirm your new password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" disabled={isSavingPassword}>
                {isSavingPassword && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update Password
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>

      {/* Two-Factor Authentication Section */}
      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication (2FA)</CardTitle>
          <CardDescription>
            Add an extra layer of security to your account by enabling two-factor authentication.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Enable Two-Factor Authentication</h4>
              <p className="text-sm text-muted-foreground">
                Receive a verification code via SMS when logging in from a new device.
              </p>
            </div>
            <Switch checked={is2FAEnabled} onCheckedChange={handleToggle2FA} disabled={isEnabling2FA} />
          </div>

          {showVerification && (
            <div className="bg-muted p-4 rounded-lg space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Verify Your Phone Number</h4>
                <p className="text-sm text-muted-foreground">
                  We've sent a 6-digit verification code to your registered phone number. Please enter it below.
                </p>
              </div>

              <div className="flex justify-center gap-2">
                {verificationCode.map((digit, index) => (
                  <Input
                    key={index}
                    id={`verification-code-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    className="w-10 h-12 text-center text-lg"
                    value={digit}
                    onChange={(e) => handleVerificationCodeChange(index, e.target.value)}
                    autoFocus={index === 0}
                  />
                ))}
              </div>

              <div className="flex justify-between items-center">
                <Button variant="link" size="sm" className="px-0">
                  Resend Code
                </Button>
                <Button onClick={handleVerifyCode} disabled={isEnabling2FA}>
                  {isEnabling2FA && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Verify
                </Button>
              </div>
            </div>
          )}

          {is2FAEnabled && (
            <Alert className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-900">
              <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertTitle>Two-factor authentication is enabled</AlertTitle>
              <AlertDescription>Your account is protected with an additional layer of security.</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Active Sessions Section */}
      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>
            Manage devices that are currently logged into your account. You can log out from any device.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeDevices.map((device) => (
                <TableRow key={device.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getDeviceIcon(device.type)}
                      <div>
                        <div className="font-medium">{device.device}</div>
                        <div className="text-xs text-muted-foreground">{device.ip}</div>
                      </div>
                      {device.isCurrent && (
                        <Badge variant="outline" className="ml-2 bg-primary/10 text-primary border-primary/20">
                          Current
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{device.location}</TableCell>
                  <TableCell>{device.lastActive}</TableCell>
                  <TableCell className="text-right">
                    {!device.isCurrent && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setDeviceToLogout(device.id)
                          setShowLogoutDialog(true)
                        }}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Session Timeout Section */}
      <Card>
        <CardHeader>
          <CardTitle>Session Timeout</CardTitle>
          <CardDescription>Configure how long your session stays active during periods of inactivity.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="space-y-1 flex-1">
              <h4 className="text-sm font-medium">Auto-logout after inactivity</h4>
              <p className="text-sm text-muted-foreground">
                Your session will automatically end after the selected period of inactivity.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Select value={sessionTimeout} onValueChange={setSessionTimeout}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select timeout" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleSaveTimeout} disabled={isSavingTimeout}>
                {isSavingTimeout && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Section */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Review recent security-related activities on your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Activity</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivity.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>{activity.activity}</TableCell>
                  <TableCell>{activity.date}</TableCell>
                  <TableCell>{activity.location}</TableCell>
                  <TableCell>{activity.ip}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="link">View Full Activity Log</Button>
        </CardFooter>
      </Card>

      {/* Logout Dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Logout Device</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out this device? This will end the session immediately.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                If this is not your device, we recommend changing your password after logging it out.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLogoutDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogoutDevice} disabled={isLoggingOut}>
              {isLoggingOut && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Logout Device
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

