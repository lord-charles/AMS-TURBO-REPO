"use client"

import { useState, useRef, useEffect, useCallback, useMemo } from "react"
import { format } from "date-fns"
import {
    BarChart3,
    CalendarIcon,
    Copy,
    FileText,
    HelpCircle,
    Info,
    Lightbulb,
    MoreHorizontal,
    Pencil,
    RefreshCw,
    Send,
    Share,
    ThumbsDown,
    ThumbsUp,
    X,
    MinusCircle,
    PanelLeftClose,
    PanelLeftOpen,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export type QuickPrompt = {
    id: string
    text: string
    category: string
}

export type Concept = {
    id: string
    title: string
    course: string
    progress: number
}

export type Message = {
    id: string
    role: "user" | "assistant"
    content: string
    timestamp: string
    feedback?: "helpful" | "not-helpful"
}

interface ChatInterfaceProps {
    quickPrompts: QuickPrompt[]
    concepts: Concept[]
    initialMessages?: Message[]
    onSendMessage?: (message: string) => Promise<void>
    onFeedback?: (messageId: string, feedback: "helpful" | "not-helpful") => void
    onQuickPromptClick?: (promptText: string) => void
    onResetChat?: () => void
    onExportChat?: () => void
    onShareChat?: () => void
    avatarSrc?: string
    assistantName?: string
    assistantDescription?: string
    loading?: boolean
    error?: string | null
    sidebarCollapsible?: boolean
    initialSidebarState?: "expanded" | "collapsed"
    hideQuickPrompts?: boolean
    hideImprovements?: boolean
    maxHeight?: string
    className?: string
}

export function ChatInterface({
    quickPrompts,
    concepts,
    initialMessages = [
        {
            id: "1",
            role: "assistant",
            content:
                "Hello! I'm your AI learning assistant. I can help you understand concepts, create study plans, identify areas for improvement, and generate practice questions. How can I support your learning journey today?",
            timestamp: new Date().toISOString(),
        },
    ],
    onSendMessage,
    onFeedback,
    onQuickPromptClick,
    onResetChat,
    onExportChat,
    onShareChat,
    avatarSrc = "/placeholder.svg?height=32&width=32",
    assistantName = "AI Learning Assistant",
    assistantDescription = "Helping you learn, not doing your work",
    loading = false,
    error = null,
    sidebarCollapsible = true,
    initialSidebarState = "expanded",
    hideQuickPrompts = false,
    hideImprovements = false,
    maxHeight = "700px",
}: ChatInterfaceProps) {
    const [messages, setMessages] = useState<Message[]>(initialMessages)
    const [inputValue, setInputValue] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const [chatSubTab, setChatSubTab] = useState<"chat" | "boundaries">("chat")
    const [sidebarVisible, setSidebarVisible] = useState(initialSidebarState === "collapsed")
    const chatEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const scrollAreaRef = useRef<HTMLDivElement>(null)

    // Auto-scroll to bottom when messages change or when typing state changes
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages, isTyping])

    // Adjust for mobile keyboard
    useEffect(() => {
        const handleResize = () => {
            // Only apply this on mobile devices
            if (window.innerWidth < 640 && inputRef.current && document.activeElement === inputRef.current) {
                if (scrollAreaRef.current) {
                    setTimeout(() => {
                        if (chatEndRef.current) {
                            chatEndRef.current.scrollIntoView({ behavior: "auto" })
                        }
                    }, 100)
                }
            }
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    // Focus input when sidebar is toggled
    useEffect(() => {
        // Short delay to wait for animations
        const timer = setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus()
            }
        }, 300)

        return () => clearTimeout(timer)
    }, [sidebarVisible])

    // Memoize filtered concepts to avoid recalculation on every render
    const improvementConcepts = useMemo(() => {
        return concepts
            .filter((concept) => concept.progress < 60)
            .sort((a, b) => a.progress - b.progress)
            .slice(0, 3)
    }, [concepts])

    // Handle sending message with memoized callback
    const handleSendMessage = useCallback(async () => {
        if (!inputValue.trim() || isTyping || loading) return

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: inputValue.trim(),
            timestamp: new Date().toISOString(),
        }

        setMessages((prev) => [...prev, userMessage])
        setInputValue("")
        setIsTyping(true)

        try {
            if (onSendMessage) {
                await onSendMessage(userMessage.content)
            } else {
                // Simulate response for demo purposes
                setTimeout(() => {
                    const assistantMessage: Message = {
                        id: (Date.now() + 1).toString(),
                        role: "assistant",
                        content: `I received your message: "${userMessage.content}". This is a simulated response.`,
                        timestamp: new Date().toISOString(),
                    }
                    setMessages((prev) => [...prev, assistantMessage])
                    setIsTyping(false)
                }, 1500)
            }
        } catch (error) {
            console.error("Error sending message:", error)
            setMessages((prev) => [
                ...prev,
                {
                    id: (Date.now() + 1).toString(),
                    role: "assistant",
                    content: "Sorry, I encountered an error processing your request. Please try again.",
                    timestamp: new Date().toISOString(),
                },
            ])
            setIsTyping(false)
        }
    }, [inputValue, isTyping, loading, onSendMessage])

    // Memoized feedback handler
    const handleMessageFeedback = useCallback(
        (messageId: string, feedback: "helpful" | "not-helpful") => {
            setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, feedback } : msg)))

            if (onFeedback) {
                onFeedback(messageId, feedback)
            }
        },
        [onFeedback],
    )

    // Memoized quick prompt handler
    const handleQuickPromptClick = useCallback(
        (promptText: string) => {
            setInputValue(promptText)

            if (inputRef.current) {
                inputRef.current.focus()
            }

            if (onQuickPromptClick) {
                onQuickPromptClick(promptText)
            }

            // On mobile, collapse sidebar after selecting prompt
            if (window.innerWidth < 768) {
                setSidebarVisible(false)
            }
        },
        [onQuickPromptClick],
    )

    // Memoized reset chat handler
    const handleResetChat = useCallback(() => {
        if (onResetChat) {
            onResetChat()
        } else {
            setMessages([
                {
                    id: "1",
                    role: "assistant",
                    content:
                        "Hello! I'm your AI learning assistant. I can help you understand concepts, create study plans, identify areas for improvement, and generate practice questions. How can I support your learning journey today?",
                    timestamp: new Date().toISOString(),
                },
            ])
        }

        // Focus on input after reset
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [onResetChat])

    // Handle keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ctrl/Cmd + / to focus on input
            if ((e.ctrlKey || e.metaKey) && e.key === "/") {
                e.preventDefault()
                if (inputRef.current) {
                    inputRef.current.focus()
                }
            }

            // Escape to blur input
            if (e.key === "Escape" && document.activeElement === inputRef.current) {
                inputRef?.current?.blur()
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [])

    // Toggle sidebar visibility
    const toggleSidebar = useCallback(() => {
        setSidebarVisible((prev) => !prev)
    }, [])

    // Render message content with clickable links
    const renderMessageContent = (content: string) => {
        // Regular expression to match URLs
        const urlRegex = /(https?:\/\/[^\s]+)/g

        const parts = content.split(urlRegex)

        return parts.map((part, index) => {
            if (part.match(urlRegex)) {
                return (
                    <a
                        key={index}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline break-words"
                    >
                        {part}
                    </a>
                )
            }
            return (
                <span key={index} className="break-words">
                    {part}
                </span>
            )
        })
    }

    return (

        <div className="relative grid gap-0 md:gap-4 grid-cols-1 md:grid-cols-12">
            {/* Main chat area */}
            <div
                className={cn(
                    "md:col-span-12",
                    sidebarVisible ? "lg:col-span-7" : "lg:col-span-12",
                    "transition-all duration-300",
                )}
            >
                <Card
                    className={cn(
                        "flex flex-col shadow-sm h-[500px] sm:h-[550px] md:h-[600px]",
                        maxHeight && `max-h-[${maxHeight}]`,
                    )}
                >
                    {/* Card header */}
                    <CardHeader className="pb-2 border-b space-y-0 flex-shrink-0">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8 border">
                                    <AvatarImage src={avatarSrc} alt={assistantName} />
                                    <AvatarFallback>AI</AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle className="text-base font-medium">{assistantName}</CardTitle>
                                    <CardDescription className="text-xs">{assistantDescription}</CardDescription>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 sm:gap-2">
                                {/* Toggle sidebar button (visible at larger screens) */}
                                {sidebarCollapsible && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="hidden lg:flex h-8 w-8 text-muted-foreground hover:text-foreground transition-colors"
                                        onClick={toggleSidebar}
                                        aria-label={sidebarVisible ? "Hide sidebar" : "Show sidebar"}
                                    >
                                        {sidebarVisible ? (
                                            <PanelLeftClose className="h-4 w-4" />
                                        ) : (
                                            <PanelLeftOpen className="h-4 w-4" />
                                        )}
                                    </Button>
                                )}

                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-muted-foreground hover:text-foreground transition-colors"
                                                onClick={handleResetChat}
                                            >
                                                <RefreshCw className="h-4 w-4" />
                                                <span className="sr-only">New Chat</span>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="bottom">
                                            <p>New conversation</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">More options</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56">
                                        <DropdownMenuItem onClick={() => setChatSubTab("boundaries")}>
                                            <Info className="mr-2 h-4 w-4" />
                                            <span>View AI Boundaries</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() =>
                                                navigator.clipboard.writeText(messages.map((m) => `${m.role}: ${m.content}`).join("\n\n"))
                                            }
                                        >
                                            <Copy className="mr-2 h-4 w-4" />
                                            <span>Copy Conversation</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={onExportChat}>
                                            <FileText className="mr-2 h-4 w-4" />
                                            <span>Export as PDF</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={onShareChat}>
                                            <Share className="mr-2 h-4 w-4" />
                                            <span>Share with Tutor</span>
                                        </DropdownMenuItem>

                                        {/* Mobile-only sidebar toggle */}
                                        <DropdownMenuItem className="lg:hidden flex items-center" onClick={toggleSidebar}>
                                            {sidebarVisible ? (
                                                <PanelLeftClose className="mr-2 h-4 w-4" />
                                            ) : (
                                                <PanelLeftOpen className="mr-2 h-4 w-4" />
                                            )}
                                            <span>{sidebarVisible ? "Hide sidebar" : "Show sidebar"}</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </CardHeader>

                    {/* Error message display */}
                    {error && (
                        <div className="m-2 p-2 bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400 text-sm rounded-md flex items-center">
                            <MinusCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span>{error}</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 ml-auto rounded-full"
                                onClick={() => {
                                    /* Handle closing error */
                                }}
                            >
                                <X className="h-3 w-3" />
                                <span className="sr-only">Dismiss</span>
                            </Button>
                        </div>
                    )}

                    {/* Chat messages area */}
                    <CardContent className="flex-1 overflow-hidden p-0" ref={scrollAreaRef}>
                        <ScrollArea className="h-full">
                            <div className="flex flex-col p-3 sm:p-4 space-y-4" role="log" aria-live="polite">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className="space-y-2 animate-in fade-in-0 slide-in-from-bottom-3 duration-300"
                                        role={message.role === "assistant" ? "article" : "comment"}
                                        aria-label={`${message.role} message`}
                                    >
                                        <div
                                            className={cn(
                                                "flex max-w-[90%] sm:max-w-[85%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                                                message.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted",
                                            )}
                                        >
                                            {renderMessageContent(message.content)}
                                        </div>

                                        {message.role === "assistant" && (
                                            <div className="flex items-center gap-2 ml-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className={cn(
                                                        "h-6 w-6 rounded-full hover:scale-110 transition-transform active:scale-95",
                                                        message.feedback === "helpful"
                                                            ? "text-green-500 bg-green-50 dark:bg-green-950/30"
                                                            : "text-muted-foreground hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-950/30",
                                                    )}
                                                    onClick={() => handleMessageFeedback(message.id, "helpful")}
                                                >
                                                    <ThumbsUp className="h-3 w-3" />
                                                    <span className="sr-only">Helpful</span>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className={cn(
                                                        "h-6 w-6 rounded-full hover:scale-110 transition-transform active:scale-95",
                                                        message.feedback === "not-helpful"
                                                            ? "text-red-500 bg-red-50 dark:bg-red-950/30"
                                                            : "text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30",
                                                    )}
                                                    onClick={() => handleMessageFeedback(message.id, "not-helpful")}
                                                >
                                                    <ThumbsDown className="h-3 w-3" />
                                                    <span className="sr-only">Not Helpful</span>
                                                </Button>
                                                <span className="text-xs text-muted-foreground">
                                                    {format(new Date(message.timestamp), "h:mm a")}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {/* Typing indicator */}
                                {isTyping && (
                                    <div className="flex max-w-[85%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted animate-in fade-in-0 slide-in-from-bottom-3 duration-300">
                                        <div className="flex items-center gap-1">
                                            <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.3s]"></div>
                                            <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.15s]"></div>
                                            <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce"></div>
                                        </div>
                                    </div>
                                )}

                                {/* Anchor for scrolling to bottom */}
                                <div ref={chatEndRef} />
                            </div>
                        </ScrollArea>
                    </CardContent>

                    {/* Input form area */}
                    <CardFooter className="p-2 sm:p-3 border-t">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                handleSendMessage()
                            }}
                            className="flex w-full items-center space-x-2"
                        >
                            <Input
                                id="message"
                                placeholder="Ask about concepts, request practice questions, or get learning advice..."
                                className="flex-1 text-sm"
                                autoComplete="off"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                disabled={loading}
                                ref={inputRef}
                                aria-label="Type your message"
                                aria-describedby="message-tip"
                            />
                            <Button
                                type="submit"
                                size="icon"
                                disabled={!inputValue.trim() || isTyping || loading}
                                className={cn(
                                    "transition-all h-9 w-9 rounded-full",
                                    inputValue.trim() && !isTyping && !loading
                                        ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95"
                                        : "bg-muted text-muted-foreground",
                                )}
                                aria-label="Send message"
                            >
                                {loading ? (
                                    <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <Send className="h-4 w-4" />
                                )}
                            </Button>
                        </form>
                        <div id="message-tip" className="sr-only">
                            Press Enter to send your message, or Escape to cancel.
                        </div>
                    </CardFooter>
                </Card>
            </div>

            {/* Sidebar - moves below on mobile */}
            <div
                className={cn(
                    "space-y-4 lg:col-span-5 transition-all duration-300",
                    sidebarVisible ? "flex flex-col md:flex-row lg:flex-col gap-4 md:gap-4 min-w-0 mt-4 lg:mt-0" : "hidden",
                )}
            >
                {/* Quick Prompts */}
                {!hideQuickPrompts && (
                    <Card className="shadow-sm md:flex-1 lg:flex-none">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Quick Prompts</CardTitle>
                            <CardDescription className="text-xs">Get instant help with common questions</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="px-3 pb-3">
                                {quickPrompts.map((prompt) => (
                                    <Button
                                        key={prompt.id}
                                        variant="ghost"
                                        className="w-full justify-start text-left h-auto py-2 px-3 mb-1 hover:bg-muted/80 transition-colors focus-visible:ring-1 focus-visible:ring-offset-1"
                                        onClick={() => handleQuickPromptClick(prompt.text)}
                                    >
                                        <div className="flex items-start gap-2">
                                            {prompt.category === "concept" && (
                                                <Lightbulb className="h-4 w-4 mt-0.5 text-amber-500 flex-shrink-0" />
                                            )}
                                            {prompt.category === "practice" && (
                                                <Pencil className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
                                            )}
                                            {prompt.category === "analysis" && (
                                                <BarChart3 className="h-4 w-4 mt-0.5 text-blue-500 flex-shrink-0" />
                                            )}
                                            {prompt.category === "planning" && (
                                                <CalendarIcon className="h-4 w-4 mt-0.5 text-red-500 flex-shrink-0" />
                                            )}
                                            <span className="text-sm line-clamp-2">{prompt.text}</span>
                                        </div>
                                    </Button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Areas for Improvement */}
                {!hideImprovements && (
                    <Card className="shadow-sm md:flex-1 lg:flex-none">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Areas for Improvement</CardTitle>
                            <CardDescription className="text-xs">Focus on these to boost your performance</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="px-3 pb-3 space-y-3">
                                {improvementConcepts.map((concept) => (
                                    <div key={concept.id} className="space-y-1">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center min-w-0">
                                                <Badge variant="outline" className="mr-2 text-xs px-1.5 py-0 whitespace-nowrap">
                                                    {concept.course}
                                                </Badge>
                                                <span className="text-sm font-medium line-clamp-1 overflow-hidden text-ellipsis">
                                                    {concept.title}
                                                </span>
                                            </div>
                                            <span className="text-xs text-muted-foreground ml-1 flex-shrink-0">{concept.progress}%</span>
                                        </div>
                                        <Progress value={concept.progress} className="h-1" />
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="w-full justify-start text-xs text-primary mt-1 h-7 px-2 hover:bg-primary/5 transition-colors focus-visible:ring-1 focus-visible:ring-offset-1"
                                            onClick={() => {
                                                setInputValue(`Help me understand ${concept.title}`)
                                                if (inputRef.current) {
                                                    inputRef.current.focus()
                                                }
                                                // On mobile, collapse sidebar after selecting
                                                if (window.innerWidth < 768) {
                                                    setSidebarVisible(false)
                                                }
                                            }}
                                        >
                                            <HelpCircle className="h-3 w-3 mr-1" />
                                            Get help with this concept
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>

    )
}

