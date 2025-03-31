"use client"

import { create } from "zustand"

interface SidebarStore {
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
}

export const useSidebar = create<SidebarStore>((set) => ({
  isCollapsed: false,
  setIsCollapsed: (collapsed) => set({ isCollapsed: collapsed }),
}))
