"use client";
import { themes, ThemeColors, ThemeColorStateParams } from "./theme-colors";
import { useTheme } from "next-themes";
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext<ThemeColorStateParams>({
  themeColor: "Slate",
  setThemeColor: () => {},
});

interface ThemeDataProviderProps {
  children: React.ReactNode;
}

export default function ThemeDataProvider({
  children,
}: ThemeDataProviderProps) {
  const [themeColor, setThemeColor] = useState<ThemeColors>(() => {
    try {
      if (typeof window !== 'undefined') {
        return (localStorage.getItem("themeColor") as ThemeColors) || "Slate";
      }
      return "Slate";
    } catch (error) {
      return "Slate";
    }
  });
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("themeColor", themeColor);
    }
    
    const currentTheme = theme === 'system' 
      ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      : theme as 'light' | 'dark';

    if (themes[themeColor]?.[currentTheme]) {
      const themeConfig = themes[themeColor][currentTheme];
      for (const [key, value] of Object.entries(themeConfig)) {
        document.documentElement.style.setProperty(`--${key}`, value);
      }
    }

    if (!isMounted) {
      setIsMounted(true);
    }
  }, [themeColor, theme]);

  if (!isMounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeDataProvider");
  }
  return context;
}
