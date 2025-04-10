"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Camera, QrCode, Check, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface QRCodeScannerProps {
  onSuccess?: (data: string) => void
  onError?: (error: string) => void
}

export function QRCodeScanner({ onSuccess, onError }: QRCodeScannerProps) {
  const [activeTab, setActiveTab] = useState<"scan" | "manual">("scan")
  const [scanning, setScanning] = useState(false)
  const [manualCode, setManualCode] = useState("")
  const [scanResult, setScanResult] = useState<{ success: boolean; message: string } | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { toast } = useToast()

  // Start scanning
  const startScanner = async () => {
    setScanning(true)
    setScanResult(null)

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
        requestAnimationFrame(scanQRCode)
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      setScanning(false)
      toast({
        title: "Camera Error",
        description: "Could not access camera. Please check permissions.",
        variant: "destructive",
      })

      if (onError) onError("Camera access denied")
    }
  }

  // Stop scanning
  const stopScanner = () => {
    setScanning(false)

    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      const tracks = stream.getTracks()

      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
  }

  // Scan QR code from video feed
  const scanQRCode = async () => {
    if (!scanning) return

    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (context && video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.height = video.videoHeight
        canvas.width = video.videoWidth
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        try {
          // In a real implementation, you would use a QR code scanning library
          // For this mock, we'll simulate finding a QR code after a few seconds
          setTimeout(() => {
            const mockQRData = "ATTENDANCE:CSC301:2023-04-02:08:00"
            handleScanSuccess(mockQRData)
          }, 3000)
        } catch (error) {
          console.error("QR scanning error:", error)
          if (scanning) {
            requestAnimationFrame(scanQRCode)
          }
        }
      } else {
        requestAnimationFrame(scanQRCode)
      }
    }
  }

  // Handle successful scan
  const handleScanSuccess = (data: string) => {
    stopScanner()
    setScanResult({ success: true, message: "Attendance marked successfully!" })

    if (onSuccess) onSuccess(data)

    toast({
      title: "Success",
      description: "Your attendance has been marked.",
      variant: "default",
    })
  }

  // Handle manual code submission
  const handleManualSubmit = () => {
    if (!manualCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid attendance code.",
        variant: "destructive",
      })
      return
    }

    // Validate code format (in a real app, you would verify this with the server)
    if (!/^[A-Z0-9]{6}$/.test(manualCode)) {
      setScanResult({ success: false, message: "Invalid code format. Please try again." })

      toast({
        title: "Invalid Code",
        description: "The code format is incorrect. Please try again.",
        variant: "destructive",
      })

      if (onError) onError("Invalid code format")
      return
    }

    // Simulate successful verification
    setScanResult({ success: true, message: "Attendance marked successfully!" })

    if (onSuccess) onSuccess(manualCode)

    toast({
      title: "Success",
      description: "Your attendance has been marked.",
      variant: "default",
    })
  }

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopScanner()
    }
  }, [])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Mark Attendance</CardTitle>
        <CardDescription>Scan QR code or enter attendance code</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "scan" | "manual")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="scan">
              <Camera className="h-4 w-4 mr-2" />
              Scan QR Code
            </TabsTrigger>
            <TabsTrigger value="manual">
              <QrCode className="h-4 w-4 mr-2" />
              Enter Code
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scan" className="space-y-4">
            <div className="relative aspect-video bg-muted rounded-md overflow-hidden">
              {scanning ? (
                <>
                  <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" muted playsInline />
                  <canvas ref={canvasRef} className="absolute inset-0 w-full h-full hidden" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 border-2 border-primary rounded-lg opacity-70"></div>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <QrCode className="h-12 w-12 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Camera preview will appear here</p>
                </div>
              )}
            </div>

            {scanResult && (
              <div
                className={`p-3 rounded-md flex items-center gap-2 ${
                  scanResult.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                }`}
              >
                {scanResult.success ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
                <p>{scanResult.message}</p>
              </div>
            )}

            <div className="flex justify-center">
              {scanning ? (
                <Button variant="destructive" onClick={stopScanner}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel Scan
                </Button>
              ) : (
                <Button onClick={startScanner}>
                  <Camera className="h-4 w-4 mr-2" />
                  Start Scanning
                </Button>
              )}
            </div>
          </TabsContent>

          <TabsContent value="manual" className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Enter the 6-digit attendance code provided by your lecturer
              </p>
              <Input
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value.toUpperCase())}
                placeholder="Enter code (e.g., ABC123)"
                maxLength={6}
                className="text-center text-lg tracking-widest"
              />
            </div>

            {scanResult && (
              <div
                className={`p-3 rounded-md flex items-center gap-2 ${
                  scanResult.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                }`}
              >
                {scanResult.success ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
                <p>{scanResult.message}</p>
              </div>
            )}

            <Button onClick={handleManualSubmit} className="w-full">
              Submit Code
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <p className="text-xs text-muted-foreground text-center">
          Having trouble? Contact your lecturer or the IT support desk for assistance.
        </p>
      </CardFooter>
    </Card>
  )
}

