"use client"

import { Folder, Forward, MoreHorizontal, Trash2, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
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

export function NavProjects({
  projects,
  sidebarStyle = "default",
  searchHighlight = "",
}: {
  projects: {
    name: string
    url: string
    icon: LucideIcon
  }[]
  sidebarStyle?: "default" | "minimal" | "glass" | "bordered"
  searchHighlight?: string
}) {
  const { isMobile } = useSidebar()

  if (projects.length === 0) return null

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel
        className={cn(
          sidebarStyle === "minimal" && "text-muted-foreground/70 font-normal text-xs uppercase tracking-wider",
          sidebarStyle === "glass" && "text-foreground/70 font-normal text-xs uppercase tracking-wider",
        )}
      >
        Projects
      </SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              asChild
              className={cn(
                "transition-all duration-200",
                sidebarStyle === "minimal" && "rounded-lg hover:bg-primary/10",
                sidebarStyle === "glass" && "rounded-lg hover:bg-background/20",
                sidebarStyle === "bordered" && "hover:border-l-2 hover:border-primary pl-[calc(0.5rem-2px)]",
              )}
            >
              <a href={item.url}>
                <item.icon
                  className={cn(
                    sidebarStyle === "minimal" && "text-primary",
                    sidebarStyle === "glass" && "text-foreground",
                  )}
                />
                <span>{highlightText(item.name, searchHighlight)}</span>
              </a>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <Folder className="text-muted-foreground mr-2 h-4 w-4" />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Forward className="text-muted-foreground mr-2 h-4 w-4" />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2 className="text-muted-foreground mr-2 h-4 w-4" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton
            className={cn(
              "text-sidebar-foreground/70",
              sidebarStyle === "minimal" && "rounded-lg hover:bg-primary/10",
              sidebarStyle === "glass" && "rounded-lg hover:bg-background/20",
              sidebarStyle === "bordered" && "hover:border-l-2 hover:border-primary pl-[calc(0.5rem-2px)]",
            )}
          >
            <MoreHorizontal
              className={cn(
                "text-sidebar-foreground/70",
                sidebarStyle === "minimal" && "text-primary/70",
                sidebarStyle === "glass" && "text-foreground/70",
              )}
            />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}

