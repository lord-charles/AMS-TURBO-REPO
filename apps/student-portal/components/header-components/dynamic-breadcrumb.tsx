"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, ChevronRight, HomeIcon, FileText, Folder, BookOpen } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface BaseNavItem {
  title: string
  url: string
  description?: string
  isActive?: boolean
}

interface NavItemWithItems extends BaseNavItem {
  items: BaseNavItem[]
}

interface NavSection extends BaseNavItem {
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
  items?: (BaseNavItem | NavItemWithItems)[]
}

interface DynamicBreadcrumbProps {
  data: {
    navMain: NavSection[]
  }
  showVersion?: boolean
  version?: string
}

export function DynamicBreadcrumb({
  data,
  showVersion = true,
  version = "v2.0",
}: DynamicBreadcrumbProps) {
  const pathname = usePathname()

  // Find the current section and subsection based on pathname
  const findCurrentSection = (): {
    section: NavSection | null
    item: BaseNavItem | NavItemWithItems | null
    subItem: BaseNavItem | null
  } => {
    for (const section of data.navMain) {
      if (pathname.startsWith(section.url)) {
        // Check for direct section match
        if (pathname === section.url) {
          return { section, item: null, subItem: null }
        }

        // Check for items with exact match first
        if (section.items) {
          // First try to find exact matches for items and subitems
          for (const item of section.items) {
            // Direct item match
            if (pathname === item.url) {
              return { section, item, subItem: null }
            }

            // Check for subitems
            if ("items" in item && item.items) {
              for (const subItem of item.items) {
                if (pathname === subItem.url) {
                  return { section, item, subItem }
                }
              }
            }
          }
          
          // If no exact matches, find the best partial match by path segments
          const pathSegments = pathname.split('/').filter(Boolean);
          
          // Find the item with the most matching segments
          let bestMatchItem: BaseNavItem | NavItemWithItems | null = null;
          let bestMatchSegmentCount = 0;
          
          for (const item of section.items) {
            const itemSegments = item.url.split('/').filter(Boolean);
            const matchingSegments = pathSegments.filter((seg, i) => itemSegments[i] === seg).length;
            
            if (matchingSegments > bestMatchSegmentCount && pathname.startsWith(item.url)) {
              bestMatchSegmentCount = matchingSegments;
              bestMatchItem = item;
            }
            
            // Also check subitems
            if ("items" in item && item.items) {
              for (const subItem of item.items) {
                const subItemSegments = subItem.url.split('/').filter(Boolean);
                const subMatchingSegments = pathSegments.filter((seg, i) => subItemSegments[i] === seg).length;
                
                if (subMatchingSegments > bestMatchSegmentCount && pathname.startsWith(subItem.url)) {
                  bestMatchSegmentCount = subMatchingSegments;
                  bestMatchItem = item;
                  return { section, item, subItem };
                }
              }
            }
          }
          
          if (bestMatchItem) {
            return { section, item: bestMatchItem, subItem: null };
          }
        }

        // Return section-only match as fallback
        return { section, item: null, subItem: null };
      }
    }
    return { section: null, item: null, subItem: null }
  }

  const { section, item, subItem } = findCurrentSection()
  console.log({ section, item, subItem })
  if (!section) return null

  // Get appropriate icons or fallbacks
  const SectionIcon = section.icon || HomeIcon
  const ItemIcon = item && "icon" in item && item.icon ? item.icon : FileText
  
  const currentTitle = subItem?.title || item?.title || section.title

  // Helper function to render icon with fallback
  const renderIcon = (icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | undefined, fallback: React.ComponentType<React.SVGProps<SVGSVGElement>>) => {
    const IconComponent = icon || fallback
    return <IconComponent className="h-4 w-4 mr-1.5 text-muted-foreground" />
  }

  return (
    <div className="flex items-center justify-between w-full gap-2">
      <Breadcrumb className="flex">
        <BreadcrumbList>
          {/* Home icon - always visible */}
          <BreadcrumbItem>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <BreadcrumbLink
                    href="/dashboard"
                    className="flex items-center p-1 rounded-md hover:bg-muted transition-colors"
                  >
                    <HomeIcon className="h-4 w-4" />
                  </BreadcrumbLink>
                </TooltipTrigger>
                <TooltipContent>Home</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </BreadcrumbItem>

          {section && (
            <>
              <BreadcrumbSeparator className="hidden md:flex">
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </BreadcrumbSeparator>

              <BreadcrumbItem className="hidden md:flex">
                {section.items && section.items.length > 0 ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <BreadcrumbLink className="flex items-center gap-1 group px-2 py-1 rounded-md hover:bg-muted transition-colors">
                        {renderIcon(section.icon, Folder)}
                        <span className="font-medium">{item?.title}</span>
                        <ChevronDown className="h-3 w-3 text-muted-foreground group-hover:text-foreground transition-all duration-200 group-data-[state=open]:rotate-180" />
                      </BreadcrumbLink>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-72">
                      {section.items.map((sectionItem) =>
                        "items" in sectionItem && sectionItem.items ? (
                          <DropdownMenuSub key={sectionItem.url} >
                            <DropdownMenuSubTrigger
                              className={cn("flex flex-col items-start", sectionItem.url === item?.url && "bg-muted")}
                            >
                              <div className="flex items-center w-full">
                                {renderIcon(("icon" in sectionItem && sectionItem.icon) ? sectionItem.icon as React.ComponentType<React.SVGProps<SVGSVGElement>> : undefined, BookOpen)}
                                <span className="font-medium">{sectionItem.title}</span>
                              </div>
                              {sectionItem.description && (
                                <span className="text-xs text-muted-foreground line-clamp-1 pl-5 w-full">
                                  {sectionItem.description}
                                </span>
                              )}
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent className="w-72">
                                {sectionItem.items.map((subItem) => (
                                  <DropdownMenuItem key={subItem.url} asChild>
                                    <Link href={subItem.url} className="flex flex-col items-start">
                                      <div className="flex items-center w-full">
                                        {renderIcon(("icon" in subItem && subItem.icon) ? subItem.icon as React.ComponentType<React.SVGProps<SVGSVGElement>> : undefined, FileText)}
                                        <span className={cn("font-medium", pathname === subItem.url && "text-primary")}>
                                          {subItem.title}
                                        </span>
                                      </div>
                                      {subItem.description && (
                                        <span className="text-xs text-muted-foreground line-clamp-1 pl-5 w-full">
                                          {subItem.description}
                                        </span>
                                      )}
                                    </Link>
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                        ) : (
                          <DropdownMenuItem key={sectionItem.url} asChild>
                            <Link href={sectionItem.url} className="flex flex-col items-start">
                              <div className="flex items-center w-full">
                                {renderIcon(("icon" in sectionItem && sectionItem.icon) ? sectionItem.icon as React.ComponentType<React.SVGProps<SVGSVGElement>> : undefined, FileText)}
                                <span className={cn("font-medium", sectionItem.url === item?.url && "text-primary")}>
                                  {sectionItem.title}
                                </span>
                              </div>
                              {sectionItem.description && (
                                <span className="text-xs text-muted-foreground line-clamp-1 pl-5 w-full">
                                  {sectionItem.description}
                                </span>
                              )}
                            </Link>
                          </DropdownMenuItem>
                        ),
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <BreadcrumbLink href={item?.url} className="flex items-center px-2 py-1 rounded-md hover:bg-muted transition-colors">
                    {item && renderIcon(("icon" in item && item.icon) ? item.icon as React.ComponentType<React.SVGProps<SVGSVGElement>> : undefined, FileText)}
                    <span>{item?.title}</span>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </>
          )}

          {/* Current page - always visible */}
          {(subItem || (item && !subItem)) && (
            <>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </BreadcrumbSeparator>

              <BreadcrumbItem>
                <BreadcrumbPage className="flex items-center px-2 py-1">
                  <span className="font-medium">{currentTitle}</span>
                  {showVersion && (
                    <Badge variant="outline" className="ml-2 px-1.5 py-0 h-5 text-xs font-normal">
                      {version}
                    </Badge>
                  )}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
