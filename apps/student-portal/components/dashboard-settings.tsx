"use client"

import * as React from "react"
import {
  Check,
  Copy,
  Laptop,
  Layout,
  Loader2,
  Monitor,
  Palette,
  PanelLeft,
  Save,
  Settings2,
  Smartphone,
  Trash,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

import { useDashboard } from "@/contexts/dashboard-context"
import { useThemeContext } from "@/lib/theme/themeContext"
import { themes, ThemeColors } from "@/lib/theme/theme-colors"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

type ColorScheme = 'light' | 'dark' | 'system'
type SidebarStyle = 'default' | 'minimal' | 'glass' | 'bordered'
type HeaderStyle = 'default' | 'minimal' | 'elevated' | 'colored'

interface SavedTheme {
  id: string
  name: string
  colorScheme: ColorScheme
  accentColor: string
  borderRadius: number
  sidebarStyle: SidebarStyle
  headerStyle: HeaderStyle
}

export function DashboardSettings() {
  const {
    sidebarPosition,
    setSidebarPosition,
    sidebarVariant,
    setSidebarVariant,
    sidebarCollapsible,
    setSidebarCollapsible,
    sidebarStyle,
    setSidebarStyle,
    sidebarWidth,
    setSidebarWidth,
    headerStyle,
    setHeaderStyle,
    headerHeight,
    setHeaderHeight,
    colorScheme,
    setColorScheme,
    accentColor,
    setAccentColor,
    secondaryColor,
    setSecondaryColor,
    borderRadius,
    setBorderRadius,
    contentWidth,
    setContentWidth,
    layoutDensity,
    setLayoutDensity,
    animationsEnabled,
    setAnimationsEnabled,
    animationSpeed,
    setAnimationSpeed,
    fontSize,
    setFontSize,
    fontFamily,
    setFontFamily,
    savedThemes,
    setSavedThemes,
    saveCurrentTheme,
    applyTheme,
    deleteTheme,
    resetToDefaults,
    isSettingsPanelOpen,
    setIsSettingsPanelOpen,
    isMobileDevice,
    isTabletDevice,
  } = useDashboard()

  const { themeColor, setThemeColor } = useThemeContext()
  const { theme, setTheme } = useTheme()

  const [newThemeName, setNewThemeName] = React.useState("")
  const [isSaving, setIsSaving] = React.useState(false)
  const [showThemeDialog, setShowThemeDialog] = React.useState(false)
  const [exportedTheme, setExportedTheme] = React.useState("")
  const [showExportDialog, setShowExportDialog] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState("layout")

  // Get available theme colors
  const themeColors = Object.keys(themes).filter(key => key !== 'Default') as ThemeColors[]

  // Handle theme saving
  const handleSaveTheme = () => {
    if (!newThemeName.trim()) return

    setIsSaving(true)

    setTimeout(() => {
      const newTheme: SavedTheme = {
        id: Date.now().toString(),
        name: newThemeName,
        colorScheme,
        accentColor,
        borderRadius,
        sidebarStyle,
        headerStyle,
      }

      setSavedThemes([...savedThemes, newTheme])
      setNewThemeName("")
      setShowThemeDialog(false)
      setIsSaving(false)
    }, 800)
  }

  // Export theme as JSON
  const handleExportTheme = () => {
    const themeData = {
      sidebarPosition,
      sidebarVariant,
      sidebarCollapsible,
      sidebarStyle,
      sidebarWidth,
      headerStyle,
      headerHeight,
      colorScheme,
      accentColor,
      secondaryColor,
      borderRadius,
      contentWidth,
      layoutDensity,
      animationsEnabled,
      animationSpeed,
      fontSize,
      fontFamily,
    }

    setExportedTheme(JSON.stringify(themeData, null, 2))
    setShowExportDialog(true)
  }

  // Copy exported theme to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(exportedTheme)
  }

  return (
    <>
      <Sheet open={isSettingsPanelOpen} onOpenChange={setIsSettingsPanelOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-4 right-4 z-50 h-12 w-12 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:scale-105"
          >
            <Settings2 className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          className={cn(
            "border-l border-border/40 backdrop-blur-sm bg-background/95 p-0",
            isMobileDevice ? "w-full" : "sm:max-w-md",
          )}
        >
          <SheetHeader className="p-4 sm:p-6 space-y-2 border-b sticky top-0 z-10 bg-background/95 backdrop-blur-sm">
            <SheetTitle className="text-xl flex items-center gap-2">
              <Settings2 className="h-5 w-5" />
              Dashboard Customization
            </SheetTitle>
            <SheetDescription className="hidden sm:block">
              Personalize your dashboard experience with these settings.
            </SheetDescription>
            <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </SheetClose>
          </SheetHeader>

          <div className="flex flex-col h-[calc(100vh-8rem)]">
            <Tabs defaultValue="layout" value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
              <TabsList className="grid grid-cols-4 mx-4 sm:mx-6 mt-4 sm:mt-6 mb-4">
                <TabsTrigger value="layout" className="flex items-center gap-2">
                  <Layout className="h-4 w-4" />
                  <span className="hidden sm:inline">Layout</span>
                </TabsTrigger>
                <TabsTrigger value="sidebar" className="flex items-center gap-2">
                  <PanelLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Sidebar</span>
                </TabsTrigger>
                <TabsTrigger value="theme" className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  <span className="hidden sm:inline">Theme</span>
                </TabsTrigger>
                <TabsTrigger value="advanced" className="flex items-center gap-2">
                  <Settings2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Advanced</span>
                </TabsTrigger>
              </TabsList>

              <ScrollArea className="flex-1 px-4 sm:px-6 pb-4">
                {/* Layout Tab */}
                <TabsContent value="layout" className="space-y-6 mt-0 h-full">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-3">Layout Density</h3>
                      <RadioGroup
                        value={layoutDensity}
                        onValueChange={(value) => setLayoutDensity(value as any)}
                        className="grid grid-cols-3 gap-3"
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <div
                            className={cn(
                              "relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-accent w-full",
                              layoutDensity === "compact" ? "border-primary" : "border-border",
                            )}
                            onClick={() => setLayoutDensity("compact")}
                          >
                            <div className="w-full h-12 bg-muted rounded-md flex flex-col">
                              <div className="w-full h-2 bg-primary/20 rounded-t-md"></div>
                              <div className="flex-1 flex items-center justify-center">
                                <div className="w-3/4 h-1 bg-primary/10 rounded-sm"></div>
                              </div>
                            </div>
                            {layoutDensity === "compact" && (
                              <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />
                            )}
                          </div>
                          <Label className="text-xs">Compact</Label>
                        </div>

                        <div className="flex flex-col items-center space-y-2">
                          <div
                            className={cn(
                              "relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-accent w-full",
                              layoutDensity === "default" ? "border-primary" : "border-border",
                            )}
                            onClick={() => setLayoutDensity("default")}
                          >
                            <div className="w-full h-12 bg-muted rounded-md flex flex-col">
                              <div className="w-full h-3 bg-primary/20 rounded-t-md"></div>
                              <div className="flex-1 flex items-center justify-center">
                                <div className="w-3/4 h-1.5 bg-primary/10 rounded-sm"></div>
                              </div>
                            </div>
                            {layoutDensity === "default" && (
                              <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />
                            )}
                          </div>
                          <Label className="text-xs">Default</Label>
                        </div>

                        <div className="flex flex-col items-center space-y-2">
                          <div
                            className={cn(
                              "relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-accent w-full",
                              layoutDensity === "comfortable" ? "border-primary" : "border-border",
                            )}
                            onClick={() => setLayoutDensity("comfortable")}
                          >
                            <div className="w-full h-12 bg-muted rounded-md flex flex-col">
                              <div className="w-full h-4 bg-primary/20 rounded-t-md"></div>
                              <div className="flex-1 flex items-center justify-center">
                                <div className="w-3/4 h-2 bg-primary/10 rounded-sm"></div>
                              </div>
                            </div>
                            {layoutDensity === "comfortable" && (
                              <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />
                            )}
                          </div>
                          <Label className="text-xs">Comfortable</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-3">Font Size</h3>
                      <RadioGroup
                        value={fontSize}
                        onValueChange={(value) => setFontSize(value as any)}
                        className="grid grid-cols-3 gap-3"
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <div
                            className={cn(
                              "relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-accent w-full",
                              fontSize === "small" ? "border-primary" : "border-border",
                            )}
                            onClick={() => setFontSize("small")}
                          >
                            <div className="w-full h-12 bg-muted rounded-md flex items-center justify-center">
                              <span className="text-xs text-muted-foreground">Aa</span>
                            </div>
                            {fontSize === "small" && <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />}
                          </div>
                          <Label className="text-xs">Small</Label>
                        </div>

                        <div className="flex flex-col items-center space-y-2">
                          <div
                            className={cn(
                              "relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-accent w-full",
                              fontSize === "default" ? "border-primary" : "border-border",
                            )}
                            onClick={() => setFontSize("default")}
                          >
                            <div className="w-full h-12 bg-muted rounded-md flex items-center justify-center">
                              <span className="text-sm text-muted-foreground">Aa</span>
                            </div>
                            {fontSize === "default" && (
                              <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />
                            )}
                          </div>
                          <Label className="text-xs">Default</Label>
                        </div>

                        <div className="flex flex-col items-center space-y-2">
                          <div
                            className={cn(
                              "relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-accent w-full",
                              fontSize === "large" ? "border-primary" : "border-border",
                            )}
                            onClick={() => setFontSize("large")}
                          >
                            <div className="w-full h-12 bg-muted rounded-md flex items-center justify-center">
                              <span className="text-base text-muted-foreground">Aa</span>
                            </div>
                            {fontSize === "large" && <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />}
                          </div>
                          <Label className="text-xs">Large</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-3">Font Family</h3>
                      <RadioGroup
                        value={fontFamily}
                        onValueChange={(value) => setFontFamily(value as any)}
                        className="grid grid-cols-2 gap-3"
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <div
                            className={cn(
                              "relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-accent w-full",
                              fontFamily === "system" ? "border-primary" : "border-border",
                            )}
                            onClick={() => setFontFamily("system")}
                          >
                            <div className="w-full h-12 bg-muted rounded-md flex items-center justify-center">
                              <span className="text-sm text-muted-foreground font-sans">System</span>
                            </div>
                            {fontFamily === "system" && (
                              <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />
                            )}
                          </div>
                          <Label className="text-xs">System</Label>
                        </div>

                        <div className="flex flex-col items-center space-y-2">
                          <div
                            className={cn(
                              "relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-accent w-full",
                              fontFamily === "sans" ? "border-primary" : "border-border",
                            )}
                            onClick={() => setFontFamily("sans")}
                          >
                            <div className="w-full h-12 bg-muted rounded-md flex items-center justify-center">
                              <span className="text-sm text-muted-foreground font-sans">Sans</span>
                            </div>
                            {fontFamily === "sans" && <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />}
                          </div>
                          <Label className="text-xs">Sans</Label>
                        </div>

                        <div className="flex flex-col items-center space-y-2">
                          <div
                            className={cn(
                              "relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-accent w-full",
                              fontFamily === "serif" ? "border-primary" : "border-border",
                            )}
                            onClick={() => setFontFamily("serif")}
                          >
                            <div className="w-full h-12 bg-muted rounded-md flex items-center justify-center">
                              <span className="text-sm text-muted-foreground font-serif">Serif</span>
                            </div>
                            {fontFamily === "serif" && (
                              <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />
                            )}
                          </div>
                          <Label className="text-xs">Serif</Label>
                        </div>

                        <div className="flex flex-col items-center space-y-2">
                          <div
                            className={cn(
                              "relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-accent w-full",
                              fontFamily === "mono" ? "border-primary" : "border-border",
                            )}
                            onClick={() => setFontFamily("mono")}
                          >
                            <div className="w-full h-12 bg-muted rounded-md flex items-center justify-center">
                              <span className="text-sm text-muted-foreground font-mono">Mono</span>
                            </div>
                            {fontFamily === "mono" && <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />}
                          </div>
                          <Label className="text-xs">Mono</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-3">Content Width</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">Narrow</span>
                          <span className="text-xs text-muted-foreground">Wide</span>
                        </div>
                        <Slider
                          value={[contentWidth]}
                          max={100}
                          step={5}
                          onValueChange={(value) => setContentWidth(value[0])}
                          className="w-full"
                        />
                        <div className="text-center text-xs text-muted-foreground mt-1">{contentWidth}%</div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-3">Header Style</h3>
                      <RadioGroup
                        value={headerStyle}
                        onValueChange={(value) => setHeaderStyle(value as any)}
                        className="grid grid-cols-2 gap-3"
                      >
                        <div
                          className={cn(
                            "relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-accent",
                            headerStyle === "default" ? "border-primary" : "border-border",
                          )}
                          onClick={() => setHeaderStyle("default")}
                        >
                          <div className="w-full h-16 bg-muted rounded-md flex flex-col">
                            <div className="w-full h-6 bg-background border-b flex items-center px-2">
                              <div className="w-4 h-4 rounded-full bg-primary/20"></div>
                              <div className="w-12 h-2 bg-primary/10 rounded-full ml-2"></div>
                              <div className="ml-auto w-4 h-4 rounded-full bg-primary/20"></div>
                            </div>
                            <div className="flex-1"></div>
                          </div>
                          <span className="text-sm font-medium">Default</span>
                          {headerStyle === "default" && (
                            <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />
                          )}
                        </div>

                        <div
                          className={cn(
                            "relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-accent",
                            headerStyle === "minimal" ? "border-primary" : "border-border",
                          )}
                          onClick={() => setHeaderStyle("minimal")}
                        >
                          <div className="w-full h-16 bg-muted rounded-md flex flex-col">
                            <div className="w-full h-6 bg-transparent flex items-center px-2">
                              <div className="w-4 h-4 rounded-full bg-primary/20"></div>
                              <div className="w-12 h-2 bg-primary/10 rounded-full ml-2"></div>
                              <div className="ml-auto w-4 h-4 rounded-full bg-primary/20"></div>
                            </div>
                            <div className="flex-1"></div>
                          </div>
                          <span className="text-sm font-medium">Minimal</span>
                          {headerStyle === "minimal" && (
                            <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />
                          )}
                        </div>

                        <div
                          className={cn(
                            "relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-accent",
                            headerStyle === "elevated" ? "border-primary" : "border-border",
                          )}
                          onClick={() => setHeaderStyle("elevated")}
                        >
                          <div className="w-full h-16 bg-muted rounded-md flex flex-col">
                            <div className="w-full h-6 bg-background shadow-sm flex items-center px-2">
                              <div className="w-4 h-4 rounded-full bg-primary/20"></div>
                              <div className="w-12 h-2 bg-primary/10 rounded-full ml-2"></div>
                              <div className="ml-auto w-4 h-4 rounded-full bg-primary/20"></div>
                            </div>
                            <div className="flex-1"></div>
                          </div>
                          <span className="text-sm font-medium">Elevated</span>
                          {headerStyle === "elevated" && (
                            <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />
                          )}
                        </div>

                        <div
                          className={cn(
                            "relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-accent",
                            headerStyle === "colored" ? "border-primary" : "border-border",
                          )}
                          onClick={() => setHeaderStyle("colored")}
                        >
                          <div className="w-full h-16 bg-muted rounded-md flex flex-col">
                            <div className="w-full h-6 bg-primary flex items-center px-2">
                              <div className="w-4 h-4 rounded-full bg-primary-foreground/20"></div>
                              <div className="w-12 h-2 bg-primary-foreground/10 rounded-full ml-2"></div>
                              <div className="ml-auto w-4 h-4 rounded-full bg-primary-foreground/20"></div>
                            </div>
                            <div className="flex-1"></div>
                          </div>
                          <span className="text-sm font-medium">Colored</span>
                          {headerStyle === "colored" && (
                            <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />
                          )}
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </TabsContent>

                {/* Sidebar Tab */}
                <TabsContent value="sidebar" className="space-y-6 mt-0 h-full">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-3">Sidebar Position</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div
                          className={cn(
                            "flex flex-col items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-accent",
                            sidebarPosition === "left" ? "border-primary" : "border-border",
                          )}
                          onClick={() => setSidebarPosition("left")}
                        >
                          <div className="w-full h-16 bg-muted rounded-md flex">
                            <div className="w-1/4 h-full bg-primary/20 rounded-l-md"></div>
                            <div className="w-3/4 h-full"></div>
                          </div>
                          <span className="text-sm font-medium">Left</span>
                          {sidebarPosition === "left" && (
                            <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />
                          )}
                        </div>
                        <div
                          className={cn(
                            "flex flex-col items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-accent",
                            sidebarPosition === "right" ? "border-primary" : "border-border",
                          )}
                          onClick={() => setSidebarPosition("right")}
                        >
                          <div className="w-full h-16 bg-muted rounded-md flex">
                            <div className="w-3/4 h-full"></div>
                            <div className="w-1/4 h-full bg-primary/20 rounded-r-md"></div>
                          </div>
                          <span className="text-sm font-medium">Right</span>
                          {sidebarPosition === "right" && (
                            <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-3">Sidebar Style</h3>
                      <RadioGroup
                        value={sidebarStyle}
                        onValueChange={(value) => setSidebarStyle(value as any)}
                        className="grid grid-cols-2 gap-3"
                      >
                        <div
                          className={cn(
                            "relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-accent",
                            sidebarStyle === "default" ? "border-primary" : "border-border",
                          )}
                          onClick={() => setSidebarStyle("default")}
                        >
                          <div className="w-full h-20 bg-muted rounded-md flex">
                            <div className="w-1/3 h-full bg-primary/10 rounded-l-md flex flex-col p-1">
                              <div className="w-full h-3 bg-primary/20 rounded-sm mb-1"></div>
                              <div className="w-full h-3 bg-primary/20 rounded-sm mb-1"></div>
                              <div className="w-full h-3 bg-primary/20 rounded-sm"></div>
                            </div>
                            <div className="w-2/3 h-full"></div>
                          </div>
                          <span className="text-sm font-medium">Default</span>
                          {sidebarStyle === "default" && (
                            <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />
                          )}
                        </div>
                        <div
                          className={cn(
                            "relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-accent",
                            sidebarStyle === "minimal" ? "border-primary" : "border-border",
                          )}
                          onClick={() => setSidebarStyle("minimal")}
                        >
                          <div className="w-full h-20 bg-muted rounded-md flex">
                            <div className="w-1/3 h-full bg-primary/5 rounded-l-md flex flex-col p-1">
                              <div className="w-full h-3 bg-primary/10 rounded-full mb-1"></div>
                              <div className="w-full h-3 bg-primary/10 rounded-full mb-1"></div>
                              <div className="w-full h-3 bg-primary/10 rounded-full"></div>
                            </div>
                            <div className="w-2/3 h-full"></div>
                          </div>
                          <span className="text-sm font-medium">Minimal</span>
                          {sidebarStyle === "minimal" && (
                            <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />
                          )}
                        </div>
                        <div
                          className={cn(
                            "relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-accent",
                            sidebarStyle === "glass" ? "border-primary" : "border-border",
                          )}
                          onClick={() => setSidebarStyle("glass")}
                        >
                          <div className="w-full h-20 bg-muted rounded-md flex">
                            <div className="w-1/3 h-full bg-background/50 backdrop-blur-sm rounded-l-md flex flex-col p-1">
                              <div className="w-full h-3 bg-foreground/10 rounded-sm mb-1"></div>
                              <div className="w-full h-3 bg-foreground/10 rounded-sm mb-1"></div>
                              <div className="w-full h-3 bg-foreground/10 rounded-sm"></div>
                            </div>
                            <div className="w-2/3 h-full"></div>
                          </div>
                          <span className="text-sm font-medium">Glass</span>
                          {sidebarStyle === "glass" && (
                            <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />
                          )}
                        </div>
                        <div
                          className={cn(
                            "relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-accent",
                            sidebarStyle === "bordered" ? "border-primary" : "border-border",
                          )}
                          onClick={() => setSidebarStyle("bordered")}
                        >
                          <div className="w-full h-20 bg-muted rounded-md flex">
                            <div className="w-1/3 h-full bg-background border-r border-l rounded-l-md flex flex-col p-1">
                              <div className="w-full h-3 border-l-2 border-primary pl-1 bg-background rounded-sm mb-1"></div>
                              <div className="w-full h-3 border-l-2 border-transparent pl-1 bg-background rounded-sm mb-1"></div>
                              <div className="w-full h-3 border-l-2 border-transparent pl-1 bg-background rounded-sm"></div>
                            </div>
                            <div className="w-2/3 h-full"></div>
                          </div>
                          <span className="text-sm font-medium">Bordered</span>
                          {sidebarStyle === "bordered" && (
                            <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />
                          )}
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-3">Sidebar Variant</h3>
                      <RadioGroup
                        value={sidebarVariant}
                        onValueChange={(value) => setSidebarVariant(value as any)}
                        className="grid grid-cols-3 gap-3"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sidebar" id="sidebar-standard" />
                          <Label htmlFor="sidebar-standard">Standard</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="floating" id="sidebar-floating" />
                          <Label htmlFor="sidebar-floating">Floating</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="inset" id="sidebar-inset" />
                          <Label htmlFor="sidebar-inset">Inset</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-3">Collapse Mode</h3>
                      <Select value={sidebarCollapsible} onValueChange={(value) => setSidebarCollapsible(value as any)}>
                        <SelectTrigger id="sidebar-collapsible" className="w-full">
                          <SelectValue placeholder="Select collapsible mode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="icon">Icon Only</SelectItem>
                          <SelectItem value="offcanvas">Off-Canvas</SelectItem>
                          <SelectItem value="none">Not Collapsible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-3">Sidebar Width</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">Narrow</span>
                          <span className="text-xs text-muted-foreground">Wide</span>
                        </div>
                        <Slider
                          value={[sidebarWidth]}
                          min={200}
                          max={400}
                          step={10}
                          onValueChange={(value) => setSidebarWidth(value[0])}
                          className="w-full"
                        />
                        <div className="text-center text-xs text-muted-foreground mt-1">{sidebarWidth}px</div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Theme Tab */}
                <TabsContent value="theme" className="space-y-6 mt-0 h-full">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-3">Color Scheme</h3>
                      <div className="grid grid-cols-3 gap-3">
                        <div
                          className={cn(
                            "relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-accent",
                            theme === "light" ? "border-primary" : "border-border",
                          )}
                          onClick={() => setTheme("light")}
                        >
                          <div className="w-full h-16 bg-white rounded-md border"></div>
                          <span className="text-sm font-medium">Light</span>
                          {theme === "light" && <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />}
                        </div>
                        <div
                          className={cn(
                            "relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-accent",
                            theme === "dark" ? "border-primary" : "border-border",
                          )}
                          onClick={() => setTheme("dark")}
                        >
                          <div className="w-full h-16 bg-slate-900 rounded-md border"></div>
                          <span className="text-sm font-medium">Dark</span>
                          {theme === "dark" && <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />}
                        </div>
                        <div
                          className={cn(
                            "relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-accent",
                            theme === "system" ? "border-primary" : "border-border",
                          )}
                          onClick={() => setTheme("system")}
                        >
                          <div className="w-full h-16 bg-gradient-to-r from-white to-slate-900 rounded-md border"></div>
                          <span className="text-sm font-medium">System</span>
                          {theme === "system" && (
                            <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-3">Theme Style</h3>
                      <div className="grid grid-cols-3 gap-3">
                        {themeColors.map((color) => {
                          const themeConfig = themes[color]
                          const currentTheme = theme === 'system' 
                            ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
                            : theme as 'light' | 'dark'
                          const bgColor = themeConfig[currentTheme]?.background
                          const fgColor = themeConfig[currentTheme]?.foreground
                          
                          return (
                            <div
                              key={color}
                              className={cn(
                                "relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-accent",
                                themeColor === color ? "border-primary" : "border-border",
                              )}
                              onClick={() => setThemeColor(color)}
                            >
                              <div 
                                className="w-full h-16 rounded-md border overflow-hidden"
                                style={{
                                  background: `hsl(${bgColor})`,
                                }}
                              >
                                <div className="h-full flex items-center justify-center text-xs p-2">
                                  <div 
                                    className="w-full h-full rounded border"
                                    style={{ 
                                      background: `hsl(${themeConfig[currentTheme]?.card})`,
                                      color: `hsl(${fgColor})`,
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center'
                                    }}
                                  >
                                    {color}
                                  </div>
                                </div>
                              </div>
                              <span className="text-sm font-medium">{color}</span>
                              {themeColor === color && <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />}
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-3">Border Radius</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">Square</span>
                          <span className="text-xs text-muted-foreground">Round</span>
                        </div>
                        <Slider
                          value={[borderRadius]}
                          max={1}
                          step={0.1}
                          onValueChange={(value) => setBorderRadius(value[0])}
                          className="w-full"
                        />
                        <div className="flex justify-center mt-2">
                          <div
                            className="w-16 h-16 bg-primary transition-all duration-300"
                            style={{ borderRadius: `${borderRadius * 1}rem` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 space-y-2">
                      <Button
                        className="w-full flex items-center justify-center gap-2"
                        onClick={() => setShowThemeDialog(true)}
                      >
                        <Save className="h-4 w-4" />
                        Save Current Theme
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2"
                        onClick={handleExportTheme}
                      >
                        <Copy className="h-4 w-4" />
                        Export Theme
                      </Button>
                    </div>

                    {savedThemes.length > 0 && (
                      <div className="space-y-2 pt-2">
                        <h3 className="text-sm font-medium">Saved Themes</h3>
                        <div className="space-y-2">
                          {savedThemes.map((theme) => (
                            <div
                              key={theme.id}
                              className="flex items-center justify-between p-2 rounded-md border hover:bg-accent cursor-pointer"
                            >
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-4 h-4 rounded-full"
                                  style={{
                                    backgroundColor: `hsl(${theme.accentColor.split(" ")[0]}, ${theme.accentColor.split(" ")[1]}, ${theme.accentColor.split(" ")[2]})`,
                                  }}
                                ></div>
                                <span className="text-sm">{theme.name}</span>
                                <Badge variant="outline" className="ml-2 text-xs">
                                  {theme.colorScheme}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => applyTheme(theme.id)}
                                >
                                  <Check className="h-4 w-4" />
                                  <span className="sr-only">Apply</span>
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive">
                                      <Trash className="h-4 w-4" />
                                      <span className="sr-only">Delete</span>
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Delete theme</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete the "{theme.name}" theme? This action cannot be
                                        undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => deleteTheme(theme.id)}
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                      >
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* Advanced Tab */}
                <TabsContent value="advanced" className="space-y-6 mt-0 h-full">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="animations-enabled">UI Animations</Label>
                        <p className="text-xs text-muted-foreground">Enable smooth transitions and animations</p>
                      </div>
                      <Switch
                        id="animations-enabled"
                        checked={animationsEnabled}
                        onCheckedChange={setAnimationsEnabled}
                      />
                    </div>

                    {animationsEnabled && (
                      <div>
                        <h3 className="text-sm font-medium mb-3">Animation Speed</h3>
                        <RadioGroup
                          value={animationSpeed}
                          onValueChange={(value) => setAnimationSpeed(value as any)}
                          className="grid grid-cols-4 gap-3"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="fast" id="animation-fast" />
                            <Label htmlFor="animation-fast">Fast</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="normal" id="animation-normal" />
                            <Label htmlFor="animation-normal">Normal</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="slow" id="animation-slow" />
                            <Label htmlFor="animation-slow">Slow</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="none" id="animation-none" />
                            <Label htmlFor="animation-none">None</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    )}

                    <Separator />

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Device Preview</h3>
                      <div className="grid grid-cols-3 gap-3">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="lg"
                                className="h-20 flex flex-col gap-2 items-center justify-center"
                              >
                                <Smartphone className="h-8 w-8 text-muted-foreground" />
                                <span className="text-xs">Mobile</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Preview on mobile device</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="lg"
                                className="h-20 flex flex-col gap-2 items-center justify-center"
                              >
                                <Laptop className="h-8 w-8 text-muted-foreground" />
                                <span className="text-xs">Tablet</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Preview on tablet device</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="lg"
                                className="h-20 flex flex-col gap-2 items-center justify-center"
                              >
                                <Monitor className="h-8 w-8 text-muted-foreground" />
                                <span className="text-xs">Desktop</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Preview on desktop device</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>

                    <Separator />

                    <div className="pt-2">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" className="w-full text-destructive hover:text-destructive">
                            Reset to Defaults
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Reset all settings?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will reset all dashboard customization settings to their default values. This action
                              cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={resetToDefaults}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Reset
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </div>

          <SheetFooter className="p-4 sm:p-6 border-t mt-auto">
            <Button type="submit" onClick={() => setIsSettingsPanelOpen(false)} className="w-full">
              Apply Changes
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Save Theme Dialog */}
      <Dialog open={showThemeDialog} onOpenChange={setShowThemeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Save Theme</DialogTitle>
            <DialogDescription>Give your theme a name to save your current customization settings.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="theme-name" className="text-right">
                Name
              </Label>
              <Input
                id="theme-name"
                placeholder="My Custom Theme"
                className="col-span-3"
                value={newThemeName}
                onChange={(e) => setNewThemeName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowThemeDialog(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleSaveTheme} disabled={!newThemeName.trim() || isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>Save</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Theme Dialog */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Export Theme</DialogTitle>
            <DialogDescription>Copy this JSON to save or share your theme configuration.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="relative">
              <pre className="p-4 rounded-md bg-muted overflow-auto text-xs max-h-[300px]">{exportedTheme}</pre>
              <Button variant="outline" size="sm" className="absolute top-2 right-2" onClick={copyToClipboard}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExportDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
