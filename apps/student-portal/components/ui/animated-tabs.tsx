"use client"

import * as React from "react"
import { motion } from "framer-motion"

interface Tab {
  id: string
  label: string
}

export interface AnimatedTabsProps {
  tabs: Tab[]
  defaultTab?: string
  onChange?: (tabId: string) => void
}

export function AnimatedTabs({ tabs, defaultTab = tabs[0]?.id, onChange }: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = React.useState(defaultTab)
  const [hoveredTab, setHoveredTab] = React.useState<string | null>(null)

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
    onChange?.(tabId)
  }

  return (
    <div className="flex items-center gap-2 relative p-1 rounded-lg bg-muted/80">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          onMouseEnter={() => setHoveredTab(tab.id)}
          onMouseLeave={() => setHoveredTab(null)}
          className={`relative px-3 py-1.5 text-sm font-medium transition-colors rounded-md
            ${activeTab === tab.id ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"}
          `}
          style={{
            WebkitTapHighlightColor: "transparent",
          }}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="active-pill"
              className="absolute inset-0 bg-primary"
              style={{ borderRadius: 6 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          {hoveredTab === tab.id && activeTab !== tab.id && (
            <motion.div
              layoutId="hovered-pill"
              className="absolute inset-0 bg-muted"
              style={{ borderRadius: 6 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10 mix-blend-normal">{tab.label}</span>
        </button>
      ))}
    </div>
  )
}