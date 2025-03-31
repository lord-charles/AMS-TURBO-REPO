"use client"

import * as React from "react"
import { Bot, Check, Copy, User } from "lucide-react"
import type { Message } from "ai"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { nanoid } from "nanoid"

export function AIMessage({ message }: { message: Message }) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 })
  const [messageId] = React.useState(nanoid())

  const isUser = message.role === "user"
  const isAssistant = message.role === "assistant"

  return (
    <div className={cn("group relative mb-4 flex items-start gap-3 last:mb-0", isUser && "justify-end")} id={messageId}>
      {isAssistant && (
        <div className="flex h-7 w-7 shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm">
          <Bot className="h-4 w-4" />
        </div>
      )}

      <div
        className={cn(
          "flex-1 space-y-2 overflow-hidden rounded-lg px-4 py-3 shadow-sm",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted/50",
        )}
      >
        <div className="prose-sm prose-p:leading-relaxed prose-pre:p-0 space-y-2">{message.content}</div>
      </div>

      {isUser && (
        <div className="flex h-7 w-7 shrink-0 select-none items-center justify-center rounded-md border bg-background shadow-sm">
          <User className="h-4 w-4" />
        </div>
      )}

      {isAssistant && message.content.length > 0 && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-12 top-0 h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={() => copyToClipboard(message.content)}
        >
          {isCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          <span className="sr-only">Copy message</span>
        </Button>
      )}
    </div>
  )
}

