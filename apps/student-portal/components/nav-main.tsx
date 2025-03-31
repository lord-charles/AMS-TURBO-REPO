"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

// Helper function to highlight search terms
function highlightText(text: string, highlight: string) {
  if (!highlight.trim()) return text

  const regex = new RegExp(`(${highlight.trim()})`, "gi")
  const parts = text.split(regex)

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} className="bg-primary/20 text-primary font-medium rounded px-0.5">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  )
}

export function NavMain({
  items,
  sidebarStyle = "default",
  searchHighlight = "",
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
      isActive?: boolean
    }[]
  }[]
  sidebarStyle?: "default" | "minimal" | "glass" | "bordered"
  searchHighlight?: string
}) {
  if (items.length === 0) return null

  return (
    <SidebarGroup>
      <SidebarGroupLabel
        className={cn(
          sidebarStyle === "minimal" && "text-muted-foreground/70 font-normal text-xs uppercase tracking-wider",
          sidebarStyle === "glass" && "text-foreground/70 font-normal text-xs uppercase tracking-wider",
        )}
      >
        Platform
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          // Check if any subitems match the search highlight
          const hasMatchingSubitems =
            searchHighlight &&
            item.items?.some((subItem) => subItem.title.toLowerCase().includes(searchHighlight.toLowerCase()))

          // Determine if this item should be expanded
          const shouldBeExpanded = item.isActive || hasMatchingSubitems

          return (
            <Collapsible key={item.title} asChild defaultOpen={shouldBeExpanded} className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={cn(
                      "transition-all duration-200",
                      sidebarStyle === "minimal" && "rounded-lg hover:bg-primary/10 data-[active=true]:bg-primary/10",
                      sidebarStyle === "glass" &&
                        "rounded-lg hover:bg-background/20 data-[active=true]:bg-background/30",
                      sidebarStyle === "bordered" &&
                        "hover:border-l-2 hover:border-primary data-[active=true]:border-l-2 data-[active=true]:border-primary pl-[calc(0.5rem-2px)] data-[active=true]:pl-[calc(0.5rem-2px)]",
                    )}
                    isActive={item.isActive}
                  >
                    {item.icon && (
                      <item.icon
                        className={cn(
                          sidebarStyle === "minimal" && "text-primary",
                          sidebarStyle === "glass" && "text-foreground",
                          sidebarStyle === "bordered" && item.isActive && "text-primary",
                        )}
                      />
                    )}
                    <span>{highlightText(item.title, searchHighlight)}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub
                    className={cn(
                      sidebarStyle === "minimal" && "border-primary/20",
                      sidebarStyle === "glass" && "border-background/30",
                      sidebarStyle === "bordered" && "border-border",
                    )}
                  >
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={subItem.isActive}
                          className={cn(
                            "transition-all duration-200",
                            sidebarStyle === "minimal" &&
                              "hover:bg-primary/5 data-[active=true]:bg-primary/10 data-[active=true]:text-primary",
                            sidebarStyle === "glass" && "hover:bg-background/10 data-[active=true]:bg-background/20",
                            sidebarStyle === "bordered" &&
                              "hover:border-l-2 hover:border-primary data-[active=true]:border-l-2 data-[active=true]:border-primary pl-[calc(0.5rem-2px)] data-[active=true]:pl-[calc(0.5rem-2px)] data-[active=true]:text-primary",
                          )}
                        >
                          <a href={subItem.url}>
                            <span>{highlightText(subItem.title, searchHighlight)}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}

