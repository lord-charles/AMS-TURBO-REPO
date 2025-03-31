"use client"

import * as React from "react"
import { useChat } from "ai/react"
import type { Message } from "ai"

type AIAssistantContextType = {
  messages: Message[]
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isLoading: boolean
  stop: () => void
  reload: () => void
  open: boolean
  setOpen: (open: boolean) => void
  suggestions: string[]
  setSuggestions: (suggestions: string[]) => void
  minimize: boolean
  setMinimize: (minimize: boolean) => void
}

export const AIAssistantContext = React.createContext<AIAssistantContextType | undefined>(undefined)

export function AIAssistantProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState<boolean>(false)
  const [minimize, setMinimize] = React.useState<boolean>(false)
  const [suggestions, setSuggestions] = React.useState<string[]>([
    "How can I optimize my dashboard?",
    "Analyze my recent metrics",
    "Summarize today's activity",
    "Generate a report for this week",
  ])

  const { messages, input, handleInputChange, handleSubmit, isLoading, stop, reload } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content: "Hello! I'm your AI dashboard assistant. How can I help you today?",
      },
    ],
  })

  const value = {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    reload,
    open,
    setOpen,
    suggestions,
    setSuggestions,
    minimize,
    setMinimize,
  }

  return <AIAssistantContext.Provider value={value}>{children}</AIAssistantContext.Provider>
}

export function useAIAssistant() {
  const context = React.useContext(AIAssistantContext)
  if (!context) {
    throw new Error("useAIAssistant must be used within an AIAssistantProvider")
  }
  return context
}

