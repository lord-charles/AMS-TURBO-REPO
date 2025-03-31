"use client"

import * as React from "react"
import { Bot, CircleOff, Loader2, Maximize2, Minimize2, RefreshCw, SendHorizonal, Sparkles, X } from "lucide-react"
import { cn } from "@/lib/utils"

import { useAIAssistant } from "./ai-assistant-provider"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useDashboard } from "@/contexts/dashboard-context"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { AIMessage } from "./ai-message"
import { AIMessageSkeleton } from "./ai-message-skeleton"

export function AIAssistant() {
  const {
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
    minimize,
    setMinimize,
  } = useAIAssistant()

  const { colorScheme, animationsEnabled, layoutDensity, sidebarWidth } = useDashboard()
  const messagesEndRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const [isDragging, setIsDragging] = React.useState(false)
  const [position, setPosition] = React.useState({ x: 0, y: 0 })
  const dragRef = React.useRef<{ x: number; y: number } | null>(null)

  // Scroll to bottom when messages change
  React.useEffect(() => {
    if (messagesEndRef.current && open && !minimize) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, open, minimize])

  // Focus input when opened
  React.useEffect(() => {
    if (open && !minimize && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open, minimize])

  // Handle Escape key to close
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        e.preventDefault()
        setOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, setOpen])

  // Handle dragging
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).dataset.dragHandle !== "true") return
    setIsDragging(true)
    dragRef.current = { x: e.clientX - position.x, y: e.clientY - position.y }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !dragRef.current) return

    let newX = e.clientX - dragRef.current.x
    let newY = e.clientY - dragRef.current.y

    // Boundary checking
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    const chatWidth = 380
    const chatHeight = minimize ? 48 : 600

    // Ensure the chat stays within visible boundaries
    newX = Math.max(0, Math.min(windowWidth - chatWidth, newX))
    newY = Math.max(0, Math.min(windowHeight - chatHeight, newY))

    setPosition({ x: newX, y: newY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    dragRef.current = null
  }

  // Apply a suggestion
  const applySuggestion = (suggestion: string) => {
    if (inputRef.current) {
      inputRef.current.value = suggestion
      inputRef.current.focus()
    }
  }

  if (!open) {
    return (
      <Button
        onClick={() => setOpen(true)}
        className="fixed bottom-20 right-4 z-50 h-12 w-12 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:scale-105"
        size="icon"
      >
        <Bot className="h-5 w-5" />
        <span className="sr-only">Open AI Assistant</span>
      </Button>
    )
  }

  return (
    <div
      className={cn(
        "fixed z-50 shadow-xl rounded-lg bg-background border",
        "transition-all duration-300",
        animationsEnabled ? "transition-all duration-300" : "",
        minimize ? "w-48 h-12" : "w-[380px] h-[600px]",
      )}
      style={{
        bottom: position.y === 0 ? "20px" : undefined,
        right: position.x === 0 ? "20px" : undefined,
        top: position.y !== 0 ? `${position.y}px` : undefined,
        left: position.x !== 0 ? `${position.x}px` : undefined,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Header */}
      <div
        className={cn(
          "flex items-center gap-2 px-3 py-2.5 border-b bg-muted/50",
          "cursor-move select-none rounded-t-lg",
        )}
        data-drag-handle="true"
      >
        <div className="flex items-center gap-2 flex-1">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <div className="font-semibold text-sm">AI Assistant</div>
          {!minimize && (
            <Badge variant="outline" className="ml-2 text-xs font-normal">
              Beta
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-1">
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-full"
                  onClick={() => setMinimize(!minimize)}
                >
                  {minimize ? <Maximize2 className="h-3.5 w-3.5" /> : <Minimize2 className="h-3.5 w-3.5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">{minimize ? "Expand" : "Minimize"}</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-full text-destructive"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">Close</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Body - Hidden when minimized */}
      {!minimize && (
        <>
          {/* Messages */}
          <ScrollArea className="h-[calc(100%-64px-60px)]">
            <div className="flex flex-col p-4 gap-4">
              {messages.map((message) => (
                <AIMessage key={message.id} message={message} />
              ))}

              {isLoading && <AIMessageSkeleton />}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Suggestions */}
          {messages.length < 3 && suggestions.length > 0 && (
            <div className="px-4 py-2 border-t">
              <div className="text-xs text-muted-foreground mb-2">Suggested queries:</div>
              <div className="flex flex-wrap gap-2">
                {suggestions.slice(0, 3).map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs h-7"
                    onClick={() => applySuggestion(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t p-3">
            <form
              onSubmit={(e) => {
                handleSubmit(e)
                // Clear suggestions after first message
                if (messages.length <= 2) {
                  setTimeout(() => {
                    // Generate new contextual suggestions based on the conversation
                    // In a real implementation, these could be dynamically generated
                  }, 1000)
                }
              }}
              className="flex items-end gap-2"
            >
              <Textarea
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                placeholder="Ask me anything..."
                className="min-h-10 max-h-40 flex-1 resize-none rounded-md p-2 text-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit(e as any)
                  }
                }}
              />

              <div className="flex flex-col gap-2">
                {isLoading ? (
                  <Button type="button" size="icon" variant="ghost" className="h-8 w-8" onClick={stop}>
                    <CircleOff className="h-4 w-4" />
                    <span className="sr-only">Stop generating</span>
                  </Button>
                ) : messages.length > 1 ? (
                  <Button type="button" size="icon" variant="ghost" className="h-8 w-8" onClick={reload}>
                    <RefreshCw className="h-4 w-4" />
                    <span className="sr-only">Regenerate response</span>
                  </Button>
                ) : null}

                <Button type="submit" size="icon" className="h-8 w-8" disabled={isLoading || !input.trim()}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <SendHorizonal className="h-4 w-4" />}
                  <span className="sr-only">Send message</span>
                </Button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  )
}

