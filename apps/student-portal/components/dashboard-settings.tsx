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
            "border-l border-border/40 bg-card w-full",
          )}
        >
          <SheetHeader className=" space-y-2 border-b sticky top-0 z-10">
            <SheetTitle className="text-xl flex items-center gap-2">
              <Settings2 className="h-5 w-5" />
              Dashboard Customization
            </SheetTitle>
            <SheetDescription className="hidden sm:block">
              Personalize your dashboard experience.
            </SheetDescription>
         
          </SheetHeader>

          <div className="flex flex-col h-[calc(100vh-10rem)]">
            <Tabs defaultValue="layout" value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
              <TabsList className="grid grid-cols-3  mt-4 sm:mt-6 mb-4">
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
                  </div>
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </div>

          <SheetFooter className=" border-t mt-auto">
            <Button type="submit" onClick={() => setIsSettingsPanelOpen(false)} className="w-full">
              Apply Changes
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

    </>
  )
}
