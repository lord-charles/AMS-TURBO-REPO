"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"
import { Check, Loader2, Moon, RotateCcw, Sun, SunMoon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useDashboard } from "@/contexts/dashboard-context"
import { useTheme } from "next-themes"

export function PreferencesTab() {
  const {
    headerStyle,
    setHeaderStyle,
    layoutDensity,
    setLayoutDensity,
    sidebarPosition,
    setSidebarPosition,
  } = useDashboard()

  const { theme ,setTheme } = useTheme()

  const [isSaving, setIsSaving] = useState(false)
  const [language, setLanguage] = useState("en")
  const [timeZone, setTimeZone] = useState("Africa/Nairobi")
  const [dateFormat, setDateFormat] = useState("dd/mm/yyyy")
  const [timeFormat, setTimeFormat] = useState("24h")
  const [fontSize, setFontSize] = useState([16])
  const [animationsEnabled, setAnimationsEnabled] = useState(true)
  const [highContrastMode, setHighContrastMode] = useState(false)


  // Apply high contrast mode
  useEffect(() => {
    const root = window.document.documentElement

    if (highContrastMode) {
      root.classList.add("high-contrast")
    } else {
      root.classList.remove("high-contrast")
    }
  }, [highContrastMode])

  function handleSaveSettings() {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Preferences saved",
        description: "Your system preferences have been updated successfully.",
      })
      setIsSaving(false)
    }, 1500)
  }

  function handleResetDefaults() {
    setHeaderStyle("minimal")
    setLayoutDensity("comfortable")
    setSidebarPosition("left")
    setLanguage("en")
    setTimeZone("Africa/Nairobi")
    setDateFormat("dd/mm/yyyy")
    setTimeFormat("24h")
    setFontSize([16])
    setAnimationsEnabled(true)
    setHighContrastMode(false)

    toast({
      title: "Defaults restored",
      description: "All preferences have been reset to default values.",
    })
  }

  return (
    <div className="space-y-8">
      {/* Appearance Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize the look and feel of your student portal interface.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Theme</h4>
            <p className="text-xs text-muted-foreground">Choose between light, dark, or system theme.</p>
            <RadioGroup
              defaultValue={theme}
              value={theme}
              onValueChange={(value) => setTheme(value as "light" | "dark" | "system")}
              className="grid grid-cols-3 gap-4 pt-2"
            >
              <div>
                <RadioGroupItem value="light" id="theme-light" className="peer sr-only" />
                <Label
                  htmlFor="theme-light"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Sun className="mb-3 h-6 w-6" />
                  Light
                </Label>
              </div>
              <div>
                <RadioGroupItem value="dark" id="theme-dark" className="peer sr-only" />
                <Label
                  htmlFor="theme-dark"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Moon className="mb-3 h-6 w-6" />
                  Dark
                </Label>
              </div>
              <div>
                <RadioGroupItem value="system" id="theme-system" className="peer sr-only" />
                <Label
                  htmlFor="theme-system"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <SunMoon className="mb-3 h-6 w-6" />
                  System
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Header Style</h4>
            <p className="text-xs text-muted-foreground">Choose how the application header appears.</p>
            <RadioGroup
              defaultValue={headerStyle}
              value={headerStyle}
              onValueChange={(value) => setHeaderStyle(value as "minimal" | "elevated" | "colored")}
              className="grid grid-cols-3 gap-4 pt-2"
            >
              <div>
                <RadioGroupItem value="minimal" id="header-minimal" className="peer sr-only" />
                <Label
                  htmlFor="header-minimal"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <div className="w-full h-3 bg-muted rounded mb-3"></div>
                  Minimal
                </Label>
              </div>
              <div>
                <RadioGroupItem value="elevated" id="header-elevated" className="peer sr-only" />
                <Label
                  htmlFor="header-elevated"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <div className="w-full h-3 bg-muted rounded mb-3 shadow-md"></div>
                  Elevated
                </Label>
              </div>
              <div>
                <RadioGroupItem value="colored" id="header-colored" className="peer sr-only" />
                <Label
                  htmlFor="header-colored"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <div className="w-full h-3 bg-primary rounded mb-3"></div>
                  Colored
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Layout Density</h4>
            <p className="text-xs text-muted-foreground">Control how compact or spacious the interface appears.</p>
            <RadioGroup
              defaultValue={layoutDensity}
              value={layoutDensity}
              onValueChange={(value) => setLayoutDensity(value as "compact" | "comfortable")}
              className="grid grid-cols-2 gap-4 pt-2"
            >
              <div>
                <RadioGroupItem value="compact" id="density-compact" className="peer sr-only" />
                <Label
                  htmlFor="density-compact"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <div className="flex flex-col w-full gap-1 mb-3">
                    <div className="w-full h-1.5 bg-muted rounded"></div>
                    <div className="w-full h-1.5 bg-muted rounded"></div>
                    <div className="w-full h-1.5 bg-muted rounded"></div>
                  </div>
                  Compact
                </Label>
              </div>
              <div>
                <RadioGroupItem value="comfortable" id="density-comfortable" className="peer sr-only" />
                <Label
                  htmlFor="density-comfortable"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <div className="flex flex-col w-full gap-2 mb-3">
                    <div className="w-full h-2 bg-muted rounded"></div>
                    <div className="w-full h-2 bg-muted rounded"></div>
                    <div className="w-full h-2 bg-muted rounded"></div>
                  </div>
                  Comfortable
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Sidebar Position</h4>
            <p className="text-xs text-muted-foreground">Choose which side the navigation sidebar appears on.</p>
            <RadioGroup
              defaultValue={sidebarPosition}
              value={sidebarPosition}
              onValueChange={(value) => setSidebarPosition(value as "left" | "right")}
              className="grid grid-cols-2 gap-4 pt-2"
            >
              <div>
                <RadioGroupItem value="left" id="sidebar-left" className="peer sr-only" />
                <Label
                  htmlFor="sidebar-left"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <div className="flex w-full mb-3">
                    <div className="w-1/4 h-6 bg-muted rounded-l"></div>
                    <div className="w-3/4 h-6 bg-background rounded-r border border-muted"></div>
                  </div>
                  Left
                </Label>
              </div>
              <div>
                <RadioGroupItem value="right" id="sidebar-right" className="peer sr-only" />
                <Label
                  htmlFor="sidebar-right"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <div className="flex w-full mb-3">
                    <div className="w-3/4 h-6 bg-background rounded-l border border-muted"></div>
                    <div className="w-1/4 h-6 bg-muted rounded-r"></div>
                  </div>
                  Right
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Separator className="my-4" />

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium">Font Size</h4>
              <p className="text-xs text-muted-foreground">Adjust the text size throughout the interface.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs">A</span>
              <Slider value={fontSize} min={12} max={20} step={1} onValueChange={setFontSize} className="flex-1" />
              <span className="text-lg">A</span>
              <span className="ml-2 text-sm font-medium w-8 text-center">{fontSize}px</span>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Enable Animations</div>
                <div className="text-xs text-muted-foreground">Toggle interface animations and transitions</div>
              </div>
              <Switch checked={animationsEnabled} onCheckedChange={setAnimationsEnabled} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">High Contrast Mode</div>
                <div className="text-xs text-muted-foreground">
                  Increase contrast for better visibility and accessibility
                </div>
              </div>
              <Switch checked={highContrastMode} onCheckedChange={setHighContrastMode} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Localization Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Localization</CardTitle>
          <CardDescription>Customize language, time zone, and format preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Language</h4>
            <p className="text-xs text-muted-foreground">Select your preferred language for the interface.</p>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="sw">Swahili</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="ar">Arabic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Time Zone</h4>
            <p className="text-xs text-muted-foreground">Set your time zone for accurate scheduling and deadlines.</p>
            <Select value={timeZone} onValueChange={setTimeZone}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select time zone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Africa/Nairobi">Nairobi (EAT, +03:00)</SelectItem>
                <SelectItem value="Africa/Lagos">Lagos (WAT, +01:00)</SelectItem>
                <SelectItem value="Africa/Cairo">Cairo (EET, +02:00)</SelectItem>
                <SelectItem value="Europe/London">London (GMT/BST, +00:00/+01:00)</SelectItem>
                <SelectItem value="America/New_York">New York (EST/EDT, -05:00/-04:00)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator className="my-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Date Format</h4>
              <p className="text-xs text-muted-foreground">Choose how dates are displayed.</p>
              <Select value={dateFormat} onValueChange={setDateFormat}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select date format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dd/mm/yyyy">DD/MM/YYYY (31/12/2023)</SelectItem>
                  <SelectItem value="mm/dd/yyyy">MM/DD/YYYY (12/31/2023)</SelectItem>
                  <SelectItem value="yyyy-mm-dd">YYYY-MM-DD (2023-12-31)</SelectItem>
                  <SelectItem value="dd-mmm-yyyy">DD-MMM-YYYY (31-Dec-2023)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Time Format</h4>
              <p className="text-xs text-muted-foreground">Choose between 12-hour or 24-hour time format.</p>
              <Select value={timeFormat} onValueChange={setTimeFormat}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select time format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12h">12-hour (2:30 PM)</SelectItem>
                  <SelectItem value="24h">24-hour (14:30)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save & Reset Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" className="gap-2" onClick={handleResetDefaults}>
          <RotateCcw className="h-4 w-4" />
          Reset to Defaults
        </Button>
        <Button onClick={handleSaveSettings} disabled={isSaving} className="gap-2">
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
          Save Preferences
        </Button>
      </div>
    </div>
  )
}

