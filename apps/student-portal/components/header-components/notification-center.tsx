"use client"

import * as React from "react"
import { AlertCircle, AlertTriangle, Bell, BookOpen, Calendar, Check, ChevronRight, Clock, CreditCard, DollarSign, FileText, GraduationCap, Info, Library, Link2, type LucideIcon, MessageSquare, MoreHorizontal, Pencil, School, Settings, Shield, Star, Trash2, User, X } from 'lucide-react'
import { format, isToday, isYesterday, parseISO } from "date-fns"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import { useMediaQuery } from "@/hooks/use-media-query"

export type NotificationType = 
  | "academic" 
  | "financial" 
  | "administrative" 
  | "campus" 
  | "system"

export type NotificationPriority = "low" | "medium" | "high" | "urgent"

export interface NotificationAction {
  label: string
  icon?: LucideIcon
  onClick: () => void
}

export interface Notification {
  id: string
  title: string
  description?: string
  timestamp: string
  read: boolean
  type: NotificationType
  priority: NotificationPriority
  link?: string
  image?: string
  actions?: NotificationAction[]
  relatedEntity?: {
    type: "course" | "assignment" | "exam" | "payment" | "event" | "document"
    id: string
    title: string
  }
}

interface NotificationCenterProps {
  notifications: Notification[]
  onMarkAsRead: (id: string) => void
  onMarkAllAsRead: () => void
  onDeleteNotification: (id: string) => void
  onViewAllNotifications: () => void
  onSettingsClick: () => void
  isLoading?: boolean
}

export function NotificationCenter({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDeleteNotification,
  onViewAllNotifications,
  onSettingsClick,
  isLoading = false,
}: NotificationCenterProps) {
  const [activeTab, setActiveTab] = React.useState<string>("all")
  const isMobile = useMediaQuery("(max-width: 640px)")
  
  const unreadCount = notifications.filter(n => !n.read).length
  const urgentCount = notifications.filter(n => n.priority === "urgent" && !n.read).length
  
  // Filter notifications based on active tab
  const filteredNotifications = React.useMemo(() => {
    if (activeTab === "all") return notifications
    return notifications.filter(n => n.type === activeTab)
  }, [notifications, activeTab])
  
  // Group notifications by date
  const groupedNotifications = React.useMemo(() => {
    const groups: { [key: string]: Notification[] } = {
      today: [],
      yesterday: [],
      earlier: [],
    }
    
    filteredNotifications.forEach(notification => {
      const date = parseISO(notification.timestamp)
      if (isToday(date)) {
        groups.today.push(notification)
      } else if (isYesterday(date)) {
        groups.yesterday.push(notification)
      } else {
        groups.earlier.push(notification)
      }
    })
    
    return groups
  }, [filteredNotifications])
  
  // Count notifications by type
  const notificationCounts = React.useMemo(() => {
    const counts = {
      academic: 0,
      financial: 0,
      administrative: 0,
      campus: 0,
      system: 0,
    }
    
    notifications.forEach(notification => {
      if (!notification.read) {
        counts[notification.type]++
      }
    })
    
    return counts
  }, [notifications])
  
  // Get notification icon based on type and priority
  const getNotificationIcon = (type: NotificationType, priority: NotificationPriority) => {
    const iconSize = "h-4 w-4"
    
    // Define color based on priority
    const getColorClass = () => {
      switch (priority) {
        case "urgent":
          return "text-destructive"
        case "high":
          return "text-amber-500"
        case "medium":
          return "text-blue-500"
        default:
          return "text-muted-foreground"
      }
    }
    
    const colorClass = getColorClass()
    
    // Define icon based on type
    switch (type) {
      case "academic":
        return <GraduationCap className={cn(iconSize, colorClass)} />
      case "financial":
        return <DollarSign className={cn(iconSize, colorClass)} />
      case "administrative":
        return <FileText className={cn(iconSize, colorClass)} />
      case "campus":
        return <School className={cn(iconSize, colorClass)} />
      case "system":
        return <Shield className={cn(iconSize, colorClass)} />
      default:
        return <Bell className={cn(iconSize, colorClass)} />
    }
  }
  
  // Get background color for notification icon container
  const getIconContainerClass = (type: NotificationType, priority: NotificationPriority) => {
    // Base classes
    const baseClasses = "flex items-center justify-center rounded-full p-1.5"
    
    // Priority-based background opacity
    const priorityClass = 
      priority === "urgent" ? "bg-destructive/20" :
      priority === "high" ? "bg-amber-500/20" :
      priority === "medium" ? "bg-blue-500/20" :
      "bg-muted"
    
    return cn(baseClasses, priorityClass)
  }
  
  // Get notification type label
  const getTypeLabel = (type: NotificationType) => {
    switch (type) {
      case "academic":
        return "Academic"
      case "financial":
        return "Financial"
      case "administrative":
        return "Administrative"
      case "campus":
        return "Campus"
      case "system":
        return "System"
      default:
        return "Notification"
    }
  }
  
  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = parseISO(timestamp)
    if (isToday(date)) {
      return format(date, "'Today at' h:mm a")
    } else if (isYesterday(date)) {
      return format(date, "'Yesterday at' h:mm a")
    } else {
      return format(date, "MMM d, yyyy 'at' h:mm a")
    }
  }
  
  // Render notification item
  const renderNotificationItem = (notification: Notification) => {
    return (
      <div
        key={notification.id}
        className={cn(
          "flex items-start gap-3 p-3 hover:bg-muted/50 cursor-pointer border-l-2 transition-colors",
          !notification.read && "bg-muted/50 border-l-primary",
          notification.read && "border-l-transparent",
          notification.priority === "urgent" && !notification.read && "border-l-destructive",
          notification.priority === "high" && !notification.read && "border-l-amber-500"
        )}
        onClick={() => onMarkAsRead(notification.id)}
      >
        <div className={cn("mt-0.5", getIconContainerClass(notification.type, notification.priority))}>
          {getNotificationIcon(notification.type, notification.priority)}
        </div>
        
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex w-full justify-between items-start gap-2">
            <span className={cn("font-medium truncate", !notification.read && "text-foreground")}>
              {notification.title}
            </span>
            {!notification.read && (
              <span className="flex h-2 w-2 shrink-0 rounded-full bg-primary"></span>
            )}
          </div>
          
          {notification.description && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {notification.description}
            </p>
          )}
          
          {notification.relatedEntity && (
            <div className="flex items-center mt-2 text-xs text-muted-foreground bg-muted/50 rounded-md p-1.5">
              {notification.relatedEntity.type === "course" && <BookOpen className="h-3 w-3 mr-1.5" />}
              {notification.relatedEntity.type === "assignment" && <Pencil className="h-3 w-3 mr-1.5" />}
              {notification.relatedEntity.type === "exam" && <FileText className="h-3 w-3 mr-1.5" />}
              {notification.relatedEntity.type === "payment" && <CreditCard className="h-3 w-3 mr-1.5" />}
              {notification.relatedEntity.type === "event" && <Calendar className="h-3 w-3 mr-1.5" />}
              {notification.relatedEntity.type === "document" && <FileText className="h-3 w-3 mr-1.5" />}
              <span className="truncate">{notification.relatedEntity.title}</span>
            </div>
          )}
          
          {notification.actions && notification.actions.length > 0 && (
            <div className="flex items-center gap-2 mt-2">
              {notification.actions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={(e) => {
                    e.stopPropagation()
                    action.onClick()
                  }}
                >
                  {action.icon && <action.icon className="h-3 w-3 mr-1" />}
                  {action.label}
                </Button>
              ))}
            </div>
          )}
          
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-muted-foreground">
              {formatTimestamp(notification.timestamp)}
            </span>
            
            <div className="flex items-center">
              <Badge 
                variant="outline" 
                className="text-[10px] px-1 py-0 h-4 mr-1 border-muted-foreground/30"
              >
                {getTypeLabel(notification.type)}
              </Badge>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreHorizontal className="h-3 w-3" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[180px]">
                  <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation()
                    onMarkAsRead(notification.id)
                  }}>
                    {notification.read ? (
                      <>
                        <Clock className="mr-2 h-4 w-4" />
                        <span>Mark as unread</span>
                      </>
                    ) : (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        <span>Mark as read</span>
                      </>
                    )}
                  </DropdownMenuItem>
                  
                  {notification.link && (
                    <DropdownMenuItem onClick={(e) => {
                      e.stopPropagation()
                      window.open(notification.link, "_blank")
                    }}>
                      <Link2 className="mr-2 h-4 w-4" />
                      <span>Open link</span>
                    </DropdownMenuItem>
                  )}
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem 
                    className="text-destructive focus:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteNotification(notification.id)
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  // Render notification group
  const renderNotificationGroup = (title: string, notifications: Notification[]) => {
    if (notifications.length === 0) return null
    
    return (
      <div key={title}>
        <div className="sticky top-0 z-10 bg-background px-3 py-1.5">
          <h3 className="text-xs font-medium text-muted-foreground">{title}</h3>
        </div>
        <div>
          {notifications.map(renderNotificationItem)}
        </div>
      </div>
    )
  }
  
  // Render loading skeleton
  const renderLoadingSkeleton = () => {
    return Array.from({ length: 5 }).map((_, index) => (
      <div key={index} className="flex items-start gap-3 p-3">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-full" />
          <div className="flex items-center justify-between">
            <Skeleton className="h-3 w-1/4" />
            <Skeleton className="h-3 w-1/5" />
          </div>
        </div>
      </div>
    ))
  }
  
  // Render empty state
  const renderEmptyState = () => {
    let icon = <Bell className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
    let title = "No notifications"
    let description = "You're all caught up!"
    
    switch (activeTab) {
      case "academic":
        icon = <GraduationCap className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
        title = "No academic notifications"
        description = "Check back later for updates on courses, assignments, and grades"
        break
      case "financial":
        icon = <DollarSign className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
        title = "No financial notifications"
        description = "Check back later for updates on fees, payments, and scholarships"
        break
      case "administrative":
        icon = <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
        title = "No administrative notifications"
        description = "Check back later for updates on registration, ID cards, and clearance"
        break
      case "campus":
        icon = <School className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
        title = "No campus notifications"
        description = "Check back later for updates on events, library, and housing"
        break
      case "system":
        icon = <Shield className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
        title = "No system notifications"
        description = "Check back later for updates on your account and security"
        break
    }
    
    return (
      <div className="py-12 text-center">
        {icon}
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
    )
  }
  
  return (
    <div className="w-[320px] md:w-[500px] p-0 overflow-hidden">
      <div className="flex items-center justify-between p-3 border-b">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-medium">Notifications</h2>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="ml-auto">
              {unreadCount} new
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-auto px-2 py-1 text-xs" 
              onClick={onMarkAllAsRead}
            >
              Mark all as read
            </Button>
          )}
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7" 
                  onClick={onSettingsClick}
                >
                  <Settings className="h-4 w-4" />
                  <span className="sr-only">Notification settings</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Notification settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      {urgentCount > 0 && (
        <div className="bg-destructive/10 border-b border-destructive/20 p-2 flex items-center justify-between">
          <div className="flex items-center">
            <AlertTriangle className="h-4 w-4 text-destructive mr-2" />
            <span className="text-xs font-medium text-destructive">
              {urgentCount} urgent notification{urgentCount > 1 ? 's' : ''}
            </span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => setActiveTab("all")}
          >
            View
          </Button>
        </div>
      )}
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-3 pt-2 overflow-x-auto scrollbar-none">
          <TabsList className={cn(
            "w-full h-8 p-0.5 grid",
            isMobile ? "grid-cols-3" : "grid-cols-6"
          )}>
            <TabsTrigger value="all" className="text-xs px-1 py-1.5 h-full data-[state=active]:bg-primary">
              All
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-1.5 h-4 px-1 text-[10px]">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            
            <TabsTrigger value="academic" className="text-xs px-1 py-1.5 h-full data-[state=active]:bg-primary">
              Academic
              {notificationCounts.academic > 0 && (
                <Badge variant="secondary" className="ml-1.5 h-4 px-1 text-[10px]">
                  {notificationCounts.academic}
                </Badge>
              )}
            </TabsTrigger>
            
            <TabsTrigger value="financial" className="text-xs px-1 py-1.5 h-full data-[state=active]:bg-primary">
              Financial
              {notificationCounts.financial > 0 && (
                <Badge variant="secondary" className="ml-1.5 h-4 px-1 text-[10px]">
                  {notificationCounts.financial}
                </Badge>
              )}
            </TabsTrigger>
            
            {!isMobile && (
              <>
                <TabsTrigger value="administrative" className="text-xs px-1 py-1.5 h-full data-[state=active]:bg-primary">
                  Admin
                  {notificationCounts.administrative > 0 && (
                    <Badge variant="secondary" className="ml-1.5 h-4 px-1 text-[10px]">
                      {notificationCounts.administrative}
                    </Badge>
                  )}
                </TabsTrigger>
                
                <TabsTrigger value="campus" className="text-xs px-1 py-1.5 h-full data-[state=active]:bg-primary">
                  Campus
                  {notificationCounts.campus > 0 && (
                    <Badge variant="secondary" className="ml-1.5 h-4 px-1 text-[10px]">
                      {notificationCounts.campus}
                    </Badge>
                  )}
                </TabsTrigger>
                
                <TabsTrigger value="system" className="text-xs px-1 py-1.5 h-full data-[state=active]:bg-primary">
                  System
                  {notificationCounts.system > 0 && (
                    <Badge variant="secondary" className="ml-1.5 h-4 px-1 text-[10px]">
                      {notificationCounts.system}
                    </Badge>
                  )}
                </TabsTrigger>
              </>
            )}
          </TabsList>
        </div>
        
        {isMobile && (
          <div className="px-3 pt-1 overflow-x-auto scrollbar-none">
            <TabsList className="w-full h-8 p-0.5 grid grid-cols-3">
              <TabsTrigger value="administrative" className="text-xs px-1 py-1.5 h-full data-[state=active]:bg-muted">
                Admin
                {notificationCounts.administrative > 0 && (
                  <Badge variant="secondary" className="ml-1.5 h-4 px-1 text-[10px]">
                    {notificationCounts.administrative}
                  </Badge>
                )}
              </TabsTrigger>
              
              <TabsTrigger value="campus" className="text-xs px-1 py-1.5 h-full data-[state=active]:bg-muted">
                Campus
                {notificationCounts.campus > 0 && (
                  <Badge variant="secondary" className="ml-1.5 h-4 px-1 text-[10px]">
                    {notificationCounts.campus}
                  </Badge>
                )}
              </TabsTrigger>
              
              <TabsTrigger value="system" className="text-xs px-1 py-1.5 h-full data-[state=active]:bg-muted">
                System
                {notificationCounts.system > 0 && (
                  <Badge variant="secondary" className="ml-1.5 h-4 px-1 text-[10px]">
                    {notificationCounts.system}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
          </div>
        )}
        
        <TabsContent value="all" className="mt-0 data-[state=active]:block">
          <ScrollArea className="h-[400px] md:h-[500px]">
            {isLoading ? (
              renderLoadingSkeleton()
            ) : filteredNotifications.length > 0 ? (
              <>
                {renderNotificationGroup("Today", groupedNotifications.today)}
                {renderNotificationGroup("Yesterday", groupedNotifications.yesterday)}
                {renderNotificationGroup("Earlier", groupedNotifications.earlier)}
              </>
            ) : (
              renderEmptyState()
            )}
          <div className="h-[120px]"/>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="academic" className="mt-0 data-[state=active]:block">
          <ScrollArea className="h-[400px] md:h-[500px]">
            {isLoading ? (
              renderLoadingSkeleton()
            ) : filteredNotifications.length > 0 ? (
              <>
                {renderNotificationGroup("Today", groupedNotifications.today)}
                {renderNotificationGroup("Yesterday", groupedNotifications.yesterday)}
                {renderNotificationGroup("Earlier", groupedNotifications.earlier)}
              </>
            ) : (
              renderEmptyState()
            )}
          <div className="h-[120px]"/>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="financial" className="mt-0 data-[state=active]:block">
          <ScrollArea className="h-[400px] md:h-[500px]">
            {isLoading ? (
              renderLoadingSkeleton()
            ) : filteredNotifications.length > 0 ? (
              <>
                {renderNotificationGroup("Today", groupedNotifications.today)}
                {renderNotificationGroup("Yesterday", groupedNotifications.yesterday)}
                {renderNotificationGroup("Earlier", groupedNotifications.earlier)}
              </>
            ) : (
              renderEmptyState()
            )}
          <div className="h-[120px]"/>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="administrative" className="mt-0 data-[state=active]:block">
          <ScrollArea className="h-[400px] md:h-[500px]">
            {isLoading ? (
              renderLoadingSkeleton()
            ) : filteredNotifications.length > 0 ? (
              <>
                {renderNotificationGroup("Today", groupedNotifications.today)}
                {renderNotificationGroup("Yesterday", groupedNotifications.yesterday)}
                {renderNotificationGroup("Earlier", groupedNotifications.earlier)}
              </>
            ) : (
              renderEmptyState()
            )}
          <div className="h-[120px]"/>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="campus" className="mt-0 data-[state=active]:block">
          <ScrollArea className="h-[400px] md:h-[500px]">
            {isLoading ? (
              renderLoadingSkeleton()
            ) : filteredNotifications.length > 0 ? (
              <>
                {renderNotificationGroup("Today", groupedNotifications.today)}
                {renderNotificationGroup("Yesterday", groupedNotifications.yesterday)}
                {renderNotificationGroup("Earlier", groupedNotifications.earlier)}
              </>
            ) : (
              renderEmptyState()
            )}
          <div className="h-[120px]"/>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="system" className="mt-0 data-[state=active]:block">
          <ScrollArea className="h-[400px] md:h-[500px]">
            {isLoading ? (
              renderLoadingSkeleton()
            ) : filteredNotifications.length > 0 ? (
              <>
                {renderNotificationGroup("Today", groupedNotifications.today)}
                {renderNotificationGroup("Yesterday", groupedNotifications.yesterday)}
                {renderNotificationGroup("Earlier", groupedNotifications.earlier)}
              </>
            ) : (
              renderEmptyState()
            )}
          <div className="h-[120px]"/>
          </ScrollArea>
        </TabsContent>
      </Tabs>
      
      <div className="p-2 border-t">
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full justify-center text-sm font-medium"
          onClick={onViewAllNotifications}
        >
          View all notifications
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
