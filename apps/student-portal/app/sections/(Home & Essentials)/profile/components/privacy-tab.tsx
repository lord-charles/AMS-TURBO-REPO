"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"
import { AlertTriangle, Download, FileDown, Loader2, Lock, Shield, UserCog, Trash2 } from 'lucide-react'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface PrivacySetting {
  id: string
  title: string
  description: string
  options: {
    value: string
    label: string
  }[]
  currentValue: string
}

export function PrivacyTab() {
  const [isSaving, setIsSaving] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)
  const [showExportDialog, setShowExportDialog] = useState(false)
  const [dataRetentionEnabled, setDataRetentionEnabled] = useState(true)
  
  const [privacySettings, setPrivacySettings] = useState<PrivacySetting[]>([
    {
      id: "profile-visibility",
      title: "Profile Visibility",
      description: "Control who can view your profile information",
      options: [
        { value: "public", label: "Public (All university members)" },
        { value: "students", label: "Students Only" },
        { value: "classmates", label: "Classmates Only" },
        { value: "private", label: "Private (Staff only)" },
      ],
      currentValue: "students",
    },
    {
      id: "academic-visibility",
      title: "Academic Information Visibility",
      description: "Control who can view your academic records and achievements",
      options: [
        { value: "public", label: "Public (All university members)" },
        { value: "students", label: "Students Only" },
        { value: "classmates", label: "Classmates Only" },
        { value: "private", label: "Private (Staff only)" },
      ],
      currentValue: "private",
    },
    {
      id: "contact-visibility",
      title: "Contact Information Visibility",
      description: "Control who can view your contact details",
      options: [
        { value: "public", label: "Public (All university members)" },
        { value: "students", label: "Students Only" },
        { value: "classmates", label: "Classmates Only" },
        { value: "private", label: "Private (Staff only)" },
        { value: "none", label: "No one" },
      ],
      currentValue: "none",
    },
    {
      id: "social-visibility",
      title: "Social Media Visibility",
      description: "Control who can view your linked social media accounts",
      options: [
        { value: "public", label: "Public (All university members)" },
        { value: "students", label: "Students Only" },
        { value: "classmates", label: "Classmates Only" },
        { value: "private", label: "Private (Staff only)" },
        { value: "none", label: "No one" },
      ],
      currentValue: "none",
    },
  ])

  function updatePrivacySetting(id: string, value: string) {
    setPrivacySettings(
      privacySettings.map((setting) => {
        if (setting.id === id) {
          return { ...setting, currentValue: value }
        }
        return setting
      })
    )
  }

  function handleSaveSettings() {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Privacy settings saved",
        description: "Your privacy preferences have been updated successfully.",
      })
      setIsSaving(false)
    }, 1500)
  }

  function handleExportData() {
    setIsExporting(true)
    setExportProgress(0)
    
    // Simulate export progress
    const interval = setInterval(() => {
      setExportProgress((prev) => {
        const newProgress = prev + 10
        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsExporting(false)
            toast({
              title: "Data export complete",
              description: "Your data has been exported successfully. The download will start automatically.",
            })
            // Simulate download
            setTimeout(() => {
              setShowExportDialog(false)
            }, 1000)
          }, 500)
        }
        return newProgress
      })
    }, 400)
  }

  return (
    <div className="space-y-8">
      {/* Privacy Settings Section */}
      <Card>
        <CardHeader>
          <CardTitle>Privacy Settings</CardTitle>
          <CardDescription>
            Control who can see your information and how it's used within the university system.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {privacySettings.map((setting) => (
            <div key={setting.id} className="space-y-2">
              <div className="space-y-1">
                <h4 className="text-sm font-medium">{setting.title}</h4>
                <p className="text-xs text-muted-foreground">{setting.description}</p>
              </div>
              <Select
                value={setting.currentValue}
                onValueChange={(value) => updatePrivacySetting(setting.id, value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent>
                  {setting.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Separator className="my-4" />
            </div>
          ))}
          
          <div className="space-y-4">
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Third-Party Integrations</h4>
              <p className="text-xs text-muted-foreground">
                Control how your data is shared with integrated third-party services.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Library System</div>
                  <div className="text-xs text-muted-foreground">
                    Share your academic information with the university library system
                  </div>
                </div>
                <Switch defaultChecked={true} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Career Services</div>
                  <div className="text-xs text-muted-foreground">
                    Share your profile with university career services for job opportunities
                  </div>
                </div>
                <Switch defaultChecked={true} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Alumni Network</div>
                  <div className="text-xs text-muted-foreground">
                    Share your information with the alumni network after graduation
                  </div>
                </div>
                <Switch defaultChecked={false} />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSaveSettings} disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Privacy Settings
          </Button>
        </CardFooter>
      </Card>

      {/* Data Control Section */}
      <Card>
        <CardHeader>
          <CardTitle>Data Control</CardTitle>
          <CardDescription>
            Manage your personal data and control how it's stored and used.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Data Retention</div>
                <div className="text-xs text-muted-foreground">
                  Allow the university to retain your data after graduation for alumni services
                </div>
              </div>
              <Switch 
                checked={dataRetentionEnabled} 
                onCheckedChange={setDataRetentionEnabled} 
              />
            </div>
            
            {!dataRetentionEnabled && (
              <Alert variant="destructive" className="mt-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Data Retention Disabled</AlertTitle>
                <AlertDescription>
                  Your data will be automatically deleted 6 months after graduation. This may affect alumni services and transcript requests.
                </AlertDescription>
              </Alert>
            )}
            
            <Separator className="my-4" />
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Export Your Data</h4>
              <p className="text-xs text-muted-foreground">
                Download a copy of all your personal data stored in the university system.
              </p>
              <Button 
                variant="outline" 
                className="mt-2 gap-2"
                onClick={() => setShowExportDialog(true)}
              >
                <FileDown className="h-4 w-4" />
                Export My Data
              </Button>
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Data Deletion Request</h4>
              <p className="text-xs text-muted-foreground">
                Request deletion of specific data categories from the university system.
              </p>
              <Button 
                variant="destructive" 
                className="mt-2 gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Request Data Deletion
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Note: Some data may be retained for legal and administrative purposes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Export Dialog */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Your Data</DialogTitle>
            <DialogDescription>
              We'll prepare a comprehensive export of all your personal and academic data.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Preparing your data export</span>
                <span>{exportProgress}%</span>
              </div>
              <Progress value={exportProgress} className="h-2" />
            </div>
            
            <div className="space-y-2 text-sm">
              <p>Your export will include:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Personal information</li>
                <li>Academic records and transcripts</li>
                <li>Financial history</li>
                <li>Communication history</li>
                <li>System activity logs</li>
              </ul>
            </div>
            
            {exportProgress === 100 && (
              <Alert className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-900">
                <Download className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertTitle>Export Complete</AlertTitle>
                <AlertDescription>
                  Your data export is ready. The download will start automatically.
                </AlertDescription>
              </Alert>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowExportDialog(false)}
              disabled={isExporting && exportProgress < 100}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleExportData} 
              disabled={isExporting}
            >
              {isExporting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
