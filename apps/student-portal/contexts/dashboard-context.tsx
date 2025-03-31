"use client"

import * as React from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { useMediaQuery } from "@/hooks/use-media-query"

type SidebarPosition = "left" | "right"
type SidebarVariant = "sidebar" | "floating" | "inset"
type SidebarCollapsible = "offcanvas" | "icon" | "none"
type ColorScheme = "light" | "dark" | "system"
type SidebarStyle = "default" | "minimal" | "glass" | "bordered"
type HeaderStyle = "default" | "minimal" | "elevated" | "colored"
type AnimationSpeed = "fast" | "normal" | "slow" | "none"
type FontSize = "small" | "default" | "large"
type LayoutDensity = "compact" | "default" | "comfortable"
type FontFamily = "system" | "sans" | "serif" | "mono"

interface SavedTheme {
  id: string
  name: string
  colorScheme: ColorScheme
  accentColor: string
  borderRadius: number
  sidebarStyle: SidebarStyle
  headerStyle: HeaderStyle
}

interface DashboardContextType {
  // Sidebar settings
  sidebarPosition: SidebarPosition
  setSidebarPosition: (position: SidebarPosition) => void
  sidebarVariant: SidebarVariant
  setSidebarVariant: (variant: SidebarVariant) => void
  sidebarCollapsible: SidebarCollapsible
  setSidebarCollapsible: (collapsible: SidebarCollapsible) => void
  sidebarStyle: SidebarStyle
  setSidebarStyle: (style: SidebarStyle) => void
  sidebarWidth: number
  setSidebarWidth: (width: number) => void

  // Header settings
  headerStyle: HeaderStyle
  setHeaderStyle: (style: HeaderStyle) => void
  headerHeight: number
  setHeaderHeight: (height: number) => void

  // Theme settings
  colorScheme: ColorScheme
  setColorScheme: (scheme: ColorScheme) => void
  accentColor: string
  setAccentColor: (color: string) => void
  secondaryColor: string
  setSecondaryColor: (color: string) => void
  borderRadius: number
  setBorderRadius: (radius: number) => void

  // Layout settings
  contentWidth: number
  setContentWidth: (width: number) => void
  layoutDensity: LayoutDensity
  setLayoutDensity: (density: LayoutDensity) => void

  // Animation settings
  animationsEnabled: boolean
  setAnimationsEnabled: (enabled: boolean) => void
  animationSpeed: AnimationSpeed
  setAnimationSpeed: (speed: AnimationSpeed) => void

  // Typography settings
  fontSize: FontSize
  setFontSize: (size: FontSize) => void
  fontFamily: FontFamily
  setFontFamily: (family: FontFamily) => void

  // Theme management
  savedThemes: SavedTheme[]
  setSavedThemes: (themes: SavedTheme[]) => void
  saveCurrentTheme: () => void
  applyTheme: (themeId: string) => void
  deleteTheme: (themeId: string) => void
  resetToDefaults: () => void

  // UI state
  isSettingsPanelOpen: boolean
  setIsSettingsPanelOpen: (open: boolean) => void
  isMobileDevice: boolean
  isTabletDevice: boolean
  isReducedMotion: boolean
}

const DashboardContext = React.createContext<DashboardContextType | undefined>(undefined)

const DEFAULT_ACCENT_COLOR = "221.2 83.2% 53.3%" // Blue
const DEFAULT_SECONDARY_COLOR = "217.2 32.6% 17.5%" // Slate

export function DashboardProvider({
  children,
}: {
  children: React.ReactNode
}) {
  // Sidebar settings
  const [sidebarPosition, setSidebarPosition] = useLocalStorage<SidebarPosition>("dashboard-sidebar-position", "left")
  const [sidebarVariant, setSidebarVariant] = useLocalStorage<SidebarVariant>("dashboard-sidebar-variant", "sidebar")
  const [sidebarCollapsible, setSidebarCollapsible] = useLocalStorage<SidebarCollapsible>(
    "dashboard-sidebar-collapsible",
    "icon",
  )
  const [sidebarStyle, setSidebarStyle] = useLocalStorage<SidebarStyle>("dashboard-sidebar-style", "default")
  const [sidebarWidth, setSidebarWidth] = useLocalStorage<number>("dashboard-sidebar-width", 280)

  // Header settings
  const [headerStyle, setHeaderStyle] = useLocalStorage<HeaderStyle>("dashboard-header-style", "default")
  const [headerHeight, setHeaderHeight] = useLocalStorage<number>("dashboard-header-height", 64)

  // Theme settings
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>("dashboard-color-scheme", "system")
  const [accentColor, setAccentColor] = useLocalStorage<string>("dashboard-accent-color", DEFAULT_ACCENT_COLOR)
  const [secondaryColor, setSecondaryColor] = useLocalStorage<string>(
    "dashboard-secondary-color",
    DEFAULT_SECONDARY_COLOR,
  )
  const [borderRadius, setBorderRadius] = useLocalStorage<number>("dashboard-border-radius", 0.5)

  // Layout settings
  const [contentWidth, setContentWidth] = useLocalStorage<number>("dashboard-content-width", 80)
  const [layoutDensity, setLayoutDensity] = useLocalStorage<LayoutDensity>("dashboard-layout-density", "default")

  // Animation settings
  const [animationsEnabled, setAnimationsEnabled] = useLocalStorage<boolean>("dashboard-animations-enabled", true)
  const [animationSpeed, setAnimationSpeed] = useLocalStorage<AnimationSpeed>("dashboard-animation-speed", "normal")

  // Typography settings
  const [fontSize, setFontSize] = useLocalStorage<FontSize>("dashboard-font-size", "default")
  const [fontFamily, setFontFamily] = useLocalStorage<FontFamily>("dashboard-font-family", "system")

  // Theme management
  const [savedThemes, setSavedThemes] = useLocalStorage<SavedTheme[]>("dashboard-saved-themes", [])
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = React.useState(false)

  // Responsive checks
  const isMobileDevice = useMediaQuery("(max-width: 640px)")
  const isTabletDevice = useMediaQuery("(min-width: 641px) and (max-width: 1024px)")
  const isReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")

  // Apply color scheme on client side only
  React.useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    if (colorScheme === "system") {
      const systemScheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemScheme)
    } else {
      root.classList.add(colorScheme)
    }
  }, [colorScheme])

  // Apply layout density
  React.useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("density-compact", "density-default", "density-comfortable")
    root.classList.add(`density-${layoutDensity}`)
  }, [layoutDensity])

  // Apply font size
  React.useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("text-small", "text-default", "text-large")
    root.classList.add(`text-${fontSize}`)
  }, [fontSize])

  // Apply font family
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const root = document.documentElement

      switch (fontFamily) {
        case "sans":
          root.style.setProperty(
            "--font-family",
            "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          )
          break
        case "serif":
          root.style.setProperty("--font-family", "Georgia, 'Times New Roman', serif")
          break
        case "mono":
          root.style.setProperty("--font-family", "Menlo, Monaco, 'Courier New', monospace")
          break
        default:
          root.style.setProperty("--font-family", "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif")
      }

      document.body.style.fontFamily = "var(--font-family)"
    }
  }, [fontFamily])

  // Apply custom CSS variables for theme customization
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const root = document.documentElement

      // Set accent color (primary color)
      root.style.setProperty("--primary", accentColor)

      // Set secondary color
      root.style.setProperty("--secondary", secondaryColor)

      // Set border radius
      root.style.setProperty("--radius", `${borderRadius}rem`)

      // Set content width
      root.style.setProperty("--content-width", `${contentWidth}%`)

      // Set sidebar width
      root.style.setProperty("--sidebar-width", `${sidebarWidth}px`)

      // Set header height
      root.style.setProperty("--header-height", `${headerHeight}px`)

      // Set animation duration based on speed
      const durationMap = {
        fast: "0.15s",
        normal: "0.3s",
        slow: "0.5s",
        none: "0s",
      }
      root.style.setProperty("--animation-duration", durationMap[animationSpeed])

      // Disable animations if needed
      if (!animationsEnabled || isReducedMotion) {
        root.style.setProperty("--animation-duration", "0s")
      }
    }
  }, [
    accentColor,
    secondaryColor,
    borderRadius,
    contentWidth,
    sidebarWidth,
    headerHeight,
    animationSpeed,
    animationsEnabled,
    isReducedMotion,
  ])

  // Save current theme
  const saveCurrentTheme = React.useCallback(() => {
    const themeName = prompt("Enter a name for this theme:")
    if (themeName) {
      const newTheme: SavedTheme = {
        id: Date.now().toString(),
        name: themeName,
        colorScheme,
        accentColor,
        borderRadius,
        sidebarStyle,
        headerStyle,
      }
      setSavedThemes((prev) => [...prev, newTheme])
    }
  }, [colorScheme, accentColor, borderRadius, sidebarStyle, headerStyle, setSavedThemes])

  // Apply a saved theme
  const applyTheme = React.useCallback(
    (themeId: string) => {
      const theme = savedThemes.find((t) => t.id === themeId)
      if (theme) {
        setColorScheme(theme.colorScheme)
        setAccentColor(theme.accentColor)
        setBorderRadius(theme.borderRadius)
        setSidebarStyle(theme.sidebarStyle)
        setHeaderStyle(theme.headerStyle)
      }
    },
    [savedThemes, setColorScheme, setAccentColor, setBorderRadius, setSidebarStyle, setHeaderStyle],
  )

  // Delete a saved theme
  const deleteTheme = React.useCallback(
    (themeId: string) => {
      setSavedThemes((prev) => prev.filter((theme) => theme.id !== themeId))
    },
    [setSavedThemes],
  )

  // Reset to defaults
  const resetToDefaults = React.useCallback(() => {
    if (confirm("Are you sure you want to reset all settings to defaults?")) {
      setSidebarPosition("left")
      setSidebarVariant("sidebar")
      setSidebarCollapsible("icon")
      setSidebarStyle("default")
      setSidebarWidth(280)
      setHeaderStyle("default")
      setHeaderHeight(64)
      setColorScheme("system")
      setAccentColor(DEFAULT_ACCENT_COLOR)
      setSecondaryColor(DEFAULT_SECONDARY_COLOR)
      setBorderRadius(0.5)
      setContentWidth(80)
      setLayoutDensity("default")
      setAnimationsEnabled(true)
      setAnimationSpeed("normal")
      setFontSize("default")
      setFontFamily("system")
    }
  }, [
    setSidebarPosition,
    setSidebarVariant,
    setSidebarCollapsible,
    setSidebarStyle,
    setSidebarWidth,
    setHeaderStyle,
    setHeaderHeight,
    setColorScheme,
    setAccentColor,
    setSecondaryColor,
    setBorderRadius,
    setContentWidth,
    setLayoutDensity,
    setAnimationsEnabled,
    setAnimationSpeed,
    setFontSize,
    setFontFamily,
  ])

  const value = {
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
    isReducedMotion,
  }

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
}

export function useDashboard() {
  const context = React.useContext(DashboardContext)
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider")
  }
  return context
}

