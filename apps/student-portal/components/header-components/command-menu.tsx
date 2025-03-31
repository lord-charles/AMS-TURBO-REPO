"use client";

import { CommandItem } from "@/components/ui/command";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  Book,
  BookOpen,
  Bot,
  BrainCircuit,
  Calendar,
  DollarSign,
  FileText,
  GraduationCap,
  Home,
  Layers,
  Library,
  LifeBuoy,
  Mic,
  Moon,
  Pencil,
  Search,
  SearchCheck,
  Settings,
  Sun,
  Trash2,
  TrendingUp,
  User,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDashboard } from "@/contexts/dashboard-context";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useMediaQuery } from "@/hooks/use-media-query";
import { data } from "../app-sidebar";
import { useTheme } from "next-themes";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CommandMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface SearchHistoryItem {
  id: number;
  text: string;
  icon: LucideIcon;
  url?: string;
  type?: string;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  url: string;
  shortcut?: string;
  badge?: {
    text: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  };
}

interface RecentPage {
  id: string;
  title: string;
  url: string;
  icon: LucideIcon;
  timestamp: string;
  category: string;
}

interface NavItem {
  title: string;
  url: string;
  description?: string;
  items?: NavItem[];
}

interface NavSection {
  title: string;
  url: string;
  icon: LucideIcon;
  description?: string;
  items: NavItem[];
}

interface NavData {
  navMain: NavSection[];
}

export function CommandMenu({ open, onOpenChange }: CommandMenuProps) {
  const router = useRouter();
  const { setIsSettingsPanelOpen } = useDashboard();
  const { theme, setTheme } = useTheme();

  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("all");
  const [isLoading, setIsLoading] = React.useState(false);
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const [searchHistory, setSearchHistory] = React.useState<SearchHistoryItem[]>(
    [
      {
        id: 1,
        text: "Course registration deadline",
        icon: Calendar,
        type: "academic",
      },
      { id: 2, text: "Library book return", icon: Library, type: "campus" },
      {
        id: 3,
        text: "Tuition fee payment",
        icon: DollarSign,
        type: "financial",
      },
      { id: 4, text: "Exam timetable", icon: FileText, type: "academic" },
    ]
  );

  // Quick actions for students
  const quickActions: QuickAction[] = [
    {
      id: "ai-agent",
      title: "AI Learning Mentor",
      description: "Your intelligent academic companion for insights.",
      icon: BrainCircuit,
      url: "/ai-assistant",
      shortcut: "⌘I",
      badge: {
        text: "Coming Soon",
        variant: "secondary",
      },
    },
    {
      id: "view-schedule",
      title: "Today's Schedule",
      description: "View your classes for today",
      icon: Calendar,
      url: "/academics/schedule",
      shortcut: "⌘S",
    },
    {
      id: "assignments",
      title: "Pending Assignments",
      description: "Check upcoming deadlines",
      icon: Pencil,
      url: "/academics/assignments",
      shortcut: "⌘A",
      badge: {
        text: "3 Due",
        variant: "destructive",
      },
    },
    {
      id: "grades",
      title: "Latest Grades",
      description: "View recently posted results",
      icon: TrendingUp,
      url: "/academics/grades",
      shortcut: "⌘G",
      badge: {
        text: "New",
        variant: "default",
      },
    },
    {
      id: "fee-statement",
      title: "Fee Statement",
      description: "Check your current balance",
      icon: DollarSign,
      url: "/financials/statement",
      shortcut: "⌘F",
    },
    {
      id: "library",
      title: "Library Resources",
      description: "Access digital library",
      icon: BookOpen,
      url: "/campus/library",
      shortcut: "⌘L",
    },
  ];

  // Recently visited pages
  const recentPages: RecentPage[] = [
    {
      id: "dashboard",
      title: "Dashboard",
      url: "/home",
      icon: Home,
      timestamp: "5 min ago",
      category: "home",
    },
    {
      id: "course-materials",
      title: "Course Materials",
      url: "/academics/materials",
      icon: Book,
      timestamp: "Yesterday",
      category: "academic",
    },
    {
      id: "transcript",
      title: "Transcript",
      url: "/academics/grades/transcripts",
      icon: FileText,
      timestamp: "2 days ago",
      category: "academic",
    },
    {
      id: "student-id",
      title: "Student ID",
      url: "/profile/documents",
      icon: User,
      timestamp: "3 days ago",
      category: "profile",
    },
  ];

  // Upcoming deadlines
  const upcomingDeadlines = [
    {
      id: "course-reg",
      title: "Course Registration",
      date: "Closes in 2 days",
      url: "/academics/registration",
      icon: GraduationCap,
      priority: "high",
    },
    {
      id: "fee-payment",
      title: "Tuition Payment",
      date: "Due in 5 days",
      url: "/financials/payments",
      icon: DollarSign,
      priority: "high",
    },
    {
      id: "assignment-cs101",
      title: "CS101 Assignment",
      date: "Due tomorrow",
      url: "/academics/assignments",
      icon: Pencil,
      priority: "urgent",
    },
  ];

  // Simulate search results loading
  React.useEffect(() => {
    if (searchQuery) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  // Handle navigation and close command menu
  const handleSelect = (url: string) => {
    router.push(url);
    onOpenChange(false);
  };

  // Remove item from search history
  const removeFromHistory = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setSearchHistory((prev) => prev.filter((item) => item.id !== id));
  };

  // Save search query to history when menu closes
  React.useEffect(() => {
    if (!open && searchQuery) {
      // Only add to history if it's not already there
      if (
        !searchHistory.some(
          (item) => item.text.toLowerCase() === searchQuery.toLowerCase()
        )
      ) {
        setSearchHistory((prev) => [
          {
            id: Date.now(),
            text: searchQuery,
            icon: Search,
            type: "search",
          },
          ...prev.slice(0, 7), // Keep only the 8 most recent searches
        ]);
      }
      setSearchQuery("");
    }
  }, [open, searchQuery, searchHistory]);

  // Get icon for navigation items
  const getNavIcon = (title: string): LucideIcon => {
    const navItem = (data as NavData).navMain.find((item) => item.title === title);
    return navItem?.icon || Home;
  };

  // Filter navigation items based on search query
  const filteredNavItems = React.useMemo(() => {
    if (!searchQuery) return [];

    const query = searchQuery.toLowerCase().trim();
    const results: {
      section: string;
      title: string;
      url: string;
      description?: string;
      icon?: LucideIcon;
    }[] = [];

    // Search through quick actions first
    quickActions.forEach((action) => {
      if (
        action.title.toLowerCase().includes(query) ||
        action.description.toLowerCase().includes(query)
      ) {
        results.push({
          section: "Quick Actions",
          title: action.title,
          url: action.url,
          description: action.description,
          icon: action.icon,
        });
      }
    });

    // Search through upcoming deadlines
    upcomingDeadlines.forEach((deadline) => {
      if (
        deadline.title.toLowerCase().includes(query) ||
        deadline.date.toLowerCase().includes(query)
      ) {
        results.push({
          section: "Deadlines",
          title: deadline.title,
          url: deadline.url,
          description: deadline.date,
          icon: deadline.icon,
        });
      }
    });

    // Search through recent pages
    recentPages.forEach((page) => {
      if (
        page.title.toLowerCase().includes(query) ||
        page.category.toLowerCase().includes(query)
      ) {
        results.push({
          section: "Recent Pages",
          title: page.title,
          url: page.url,
          description: `${page.category} • ${page.timestamp}`,
          icon: page.icon,
        });
      }
    });

    // Search through navigation items
    const searchNavItems = (items: NavItem[], sectionTitle: string, sectionIcon?: LucideIcon) => {
      items.forEach((item) => {
        if (
          item.title.toLowerCase().includes(query) ||
          (item.description && item.description.toLowerCase().includes(query))
        ) {
          results.push({
            section: sectionTitle,
            title: item.title,
            url: item.url,
            description: item.description,
            icon: sectionIcon,
          });
        }

        // Recursively search through nested items
        if (item.items?.length) {
          searchNavItems(item.items, sectionTitle, sectionIcon);
        }
      });
    };

    // Search through main navigation sections
    (data as NavData).navMain.forEach((section) => {
      if (section.title.toLowerCase().includes(query)) {
        results.push({
          section: "Main Sections",
          title: section.title,
          url: section.url,
          description: section.description || "Main navigation section",
          icon: section.icon,
        });
      }

      if (section.items?.length) {
        searchNavItems(section.items, section.title, section.icon);
      }
    });

    return results;
  }, [searchQuery, quickActions, upcomingDeadlines, recentPages, data.navMain]);

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "overflow-hidden p-0",
          !isMobile && "md:max-w-3xl lg:max-w-4xl"
        )}
      >
        <DialogTitle className="flex items-center gap-2 p-2 text-lg font-semibold pb-0">
          <SearchCheck className="w-5 h-5 text-primary" />
          Intelligent Search & Quick Access
        </DialogTitle>

        <div
          className={cn(
            "overflow-hidden",
            !isMobile && "md:max-w-3xl lg:max-w-4xl"
          )}
        >
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex border-b py-0">
              <div className="relative flex-1">
                <CommandInput
                  placeholder={
                    isMobile
                      ? "Search..."
                      : "Search for courses, assignments, resources..."
                  }
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                  className="pl-9 pr-9 h-12 border-0 focus:ring-0 focus:outline-none focus-visible:ring-0 shadow-none"
                />

                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Voice search"
                      >
                        <Mic className="h-4 w-4" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-40 p-2 text-center text-sm">
                      <p>Voice Search Coming Soon!</p>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="border-l">
                <TabsList
                  className={cn(
                    "h-12 bg-transparent border-0 rounded-none",
                    isMobile ? "px-1" : "px-2"
                  )}
                >
                  <TabsTrigger
                    value="all"
                    className={cn(
                      "rounded-sm data-[state=active]:bg-muted",
                      isMobile ? "text-xs px-2" : "text-sm px-3"
                    )}
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger
                    value="academic"
                    className={cn(
                      "rounded-sm data-[state=active]:bg-muted",
                      isMobile ? "text-xs px-2" : "text-sm px-3"
                    )}
                  >
                    Academic
                  </TabsTrigger>
                  <TabsTrigger
                    value="financial"
                    className={cn(
                      "rounded-sm data-[state=active]:bg-muted",
                      isMobile ? "text-xs px-2" : "text-sm px-3"
                    )}
                  >
                    Financial
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            <CommandList
              className={cn(
                isMobile ? "max-h-[60vh]" : "max-h-[65vh]",
                "overflow-hidden"
              )}
            >
              {isLoading ? (
                <div className="p-4 space-y-3">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                </div>
              ) : searchQuery ? (
                <>
                  <CommandEmpty>
                    <div className="py-6 text-center">
                      <AlertCircle className="h-10 w-10 text-muted-foreground/50 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        No results found for "{searchQuery}"
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Try adjusting your search terms
                      </p>
                    </div>
                  </CommandEmpty>

                  {filteredNavItems.length > 0 && (
                    <CommandGroup heading="Search Results">
                      <ScrollArea
                        className={isMobile ? "h-[250px]" : "h-[350px]"}
                      >
                        {filteredNavItems.map((item, index) => (
                          <CommandItem
                            key={`${item.section}-${item.title}-${index}`}
                            onSelect={() => handleSelect(item.url)}
                            className="py-2"
                          >
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <div className="bg-muted rounded-md p-1.5">
                                {item.icon && React.createElement(item.icon, {
                                  className: "h-4 w-4",
                                })}
                              </div>
                              <div className="flex flex-col flex-1 min-w-0">
                                <span className="font-medium truncate">
                                  {item.title}
                                </span>
                                {item.description && (
                                  <span className="text-xs text-muted-foreground truncate">
                                    {item.description}
                                  </span>
                                )}
                              </div>
                              <Badge
                                variant="outline"
                                className="ml-auto whitespace-nowrap"
                              >
                                {item.section}
                              </Badge>
                            </div>
                          </CommandItem>
                        ))}
                      </ScrollArea>
                    </CommandGroup>
                  )}
                </>
              ) : (
                <>
                  <TabsContent
                    value="all"
                    className="mt-0 pt-0 data-[state=active]:block"
                  >
                    <div className="px-3 pt-4 pb-2">
                      <h3 className="text-sm font-medium text-foreground/70">
                        Quick Actions
                      </h3>
                    </div>
                    <div className="px-2 pb-2">
                      <div
                        className={cn(
                          "grid gap-2",
                          isMobile
                            ? "grid-cols-1"
                            : "grid-cols-1 md:grid-cols-2"
                        )}
                      >
                        {quickActions.map((action) => (
                          <div
                            key={action.id}
                            className="flex items-start gap-3 p-2 rounded-md hover:bg-muted cursor-pointer"
                            onClick={() => handleSelect(action.url)}
                          >
                            <div className="mt-0.5 bg-primary/10 text-primary rounded-md p-2">
                              <action.icon className="h-4 w-4" />
                            </div>
                            <div className="flex flex-col flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">
                                  {action.title}
                                </span>
                                {action.badge && (
                                  <Badge
                                    variant={action.badge.variant}
                                    className="ml-auto"
                                  >
                                    {action.badge.text}
                                  </Badge>
                                )}
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {action.description}
                              </span>
                            </div>
                            {action.shortcut && (
                              <kbd className="hidden md:flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
                                {action.shortcut}
                              </kbd>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <CommandSeparator />

                    <CommandGroup heading="Upcoming Deadlines">
                      {upcomingDeadlines.map((deadline) => (
                        <CommandItem
                          key={deadline.id}
                          onSelect={() => handleSelect(deadline.url)}
                          className="py-2"
                        >
                          <div
                            className={cn(
                              "mr-2 flex h-6 w-6 items-center justify-center rounded-full",
                              deadline.priority === "urgent"
                                ? "bg-destructive/20 text-destructive"
                                : deadline.priority === "high"
                                  ? "bg-amber-500/20 text-amber-500"
                                  : "bg-muted"
                            )}
                          >
                            <deadline.icon className="h-3.5 w-3.5" />
                          </div>
                          <span>{deadline.title}</span>
                          <Badge
                            variant={
                              deadline.priority === "urgent"
                                ? "destructive"
                                : "outline"
                            }
                            className="ml-auto animate-pulse"
                          >
                            {deadline.date}
                          </Badge>
                        </CommandItem>
                      ))}
                    </CommandGroup>

                    <CommandSeparator />

                    <CommandGroup heading="Recent Pages">
                      {recentPages.map((page) => (
                        <CommandItem
                          key={page.id}
                          onSelect={() => handleSelect(page.url)}
                        >
                          <page.icon className="mr-2 h-4 w-4" />
                          <span>{page.title}</span>
                          <span className="ml-auto text-xs text-muted-foreground">
                            {page.timestamp}
                          </span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </TabsContent>

                  <TabsContent
                    value="academic"
                    className="mt-0 pt-0 data-[state=active]:block"
                  >
                    <CommandGroup heading="Academic Resources">
                      <CommandItem
                        onSelect={() => handleSelect("/academics/courses")}
                      >
                        <Book className="mr-2 h-4 w-4" />
                        <span>My Courses</span>
                      </CommandItem>
                      <CommandItem
                        onSelect={() => handleSelect("/academics/schedule")}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>Class Schedule</span>
                      </CommandItem>
                      <CommandItem
                        onSelect={() => handleSelect("/academics/assignments")}
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        <span>Assignments</span>
                        <Badge variant="destructive" className="ml-auto">
                          3 Due
                        </Badge>
                      </CommandItem>
                      <CommandItem
                        onSelect={() => handleSelect("/academics/exams")}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Exams & Assessments</span>
                      </CommandItem>
                      <CommandItem
                        onSelect={() => handleSelect("/academics/grades")}
                      >
                        <TrendingUp className="mr-2 h-4 w-4" />
                        <span>Grades & Transcripts</span>
                      </CommandItem>
                      <CommandItem
                        onSelect={() => handleSelect("/academics/calendar")}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>Academic Calendar</span>
                      </CommandItem>
                    </CommandGroup>
                  </TabsContent>

                  <TabsContent
                    value="financial"
                    className="mt-0 pt-0 data-[state=active]:block"
                  >
                    <CommandGroup heading="Financial Services">
                      <CommandItem
                        onSelect={() => handleSelect("/financials/statement")}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Fee Statement</span>
                      </CommandItem>
                      <CommandItem
                        onSelect={() => handleSelect("/financials/payments")}
                      >
                        <DollarSign className="mr-2 h-4 w-4" />
                        <span>Make Payment</span>
                      </CommandItem>
                      <CommandItem
                        onSelect={() => handleSelect("/financials/options")}
                      >
                        <Layers className="mr-2 h-4 w-4" />
                        <span>Payment Options</span>
                      </CommandItem>
                      <CommandItem
                        onSelect={() =>
                          handleSelect("/financials/scholarships")
                        }
                      >
                        <GraduationCap className="mr-2 h-4 w-4" />
                        <span>Scholarships & Financial Aid</span>
                      </CommandItem>
                    </CommandGroup>
                  </TabsContent>

                  <CommandSeparator />

                  <CommandGroup heading="Search History">
                    <div className="px-1">
                      <ScrollArea
                        className={isMobile ? "h-[100px]" : "h-[120px]"}
                      >
                        {searchHistory.map((item) => (
                          <CommandItem
                            key={item.id}
                            onSelect={() => {
                              setSearchQuery(item.text);
                              if (item.url) handleSelect(item.url);
                            }}
                            className="py-1.5"
                          >
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <item.icon className="h-4 w-4 text-muted-foreground shrink-0" />
                              <span className="truncate">{item.text}</span>
                              {item.type && (
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    "ml-auto",
                                    isMobile
                                      ? "hidden sm:inline-flex"
                                      : "inline-flex"
                                  )}
                                >
                                  {item.type}
                                </Badge>
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="ml-auto h-6 w-6 shrink-0"
                                onClick={(e) => removeFromHistory(e, item.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                                <span className="sr-only">
                                  Remove from history
                                </span>
                              </Button>
                            </div>
                          </CommandItem>
                        ))}
                      </ScrollArea>
                    </div>
                  </CommandGroup>

                  <CommandSeparator />

                  <CommandGroup heading="Settings">
                    <CommandItem onSelect={() => setIsSettingsPanelOpen(true)}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Customize Dashboard</span>
                    </CommandItem>
                    <CommandItem onSelect={() => handleSelect("/profile")}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile Settings</span>
                      <CommandShortcut>⇧⌘P</CommandShortcut>
                    </CommandItem>
                    <CommandItem
                      onSelect={() => handleSelect("/support/helpdesk")}
                    >
                      <LifeBuoy className="mr-2 h-4 w-4" />
                      <span>Help & Support</span>
                    </CommandItem>
                  </CommandGroup>

                  <CommandSeparator />

                  <CommandGroup heading="Theme">
                    <CommandItem onSelect={() => setTheme("light")}>
                      <Sun className="mr-2 h-4 w-4" />
                      <span>Light</span>
                    </CommandItem>
                    <CommandItem onSelect={() => setTheme("dark")}>
                      <Moon className="mr-2 h-4 w-4" />
                      <span>Dark</span>
                    </CommandItem>
                    <CommandItem onSelect={() => setTheme("system")}>
                      <Layers className="mr-2 h-4 w-4" />
                      <span>System</span>
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>

            <div
              className={cn(
                "flex items-center justify-between p-2 border-t",
                isMobile ? "flex-col gap-2" : "flex-row"
              )}
            >
              <div
                className={cn(
                  "flex items-center gap-2 text-xs text-muted-foreground",
                  isMobile ? "flex-wrap justify-center" : "flex-nowrap"
                )}
              >
                <span>Press</span>
                <kbd className="rounded border bg-muted px-1.5 font-mono text-[10px]">
                  ↑
                </kbd>
                <kbd className="rounded border bg-muted px-1.5 font-mono text-[10px]">
                  ↓
                </kbd>
                <span>to navigate</span>
                <kbd className="rounded border bg-muted px-1.5 font-mono text-[10px]">
                  Enter
                </kbd>
                <span>to select</span>
                <kbd className="rounded border bg-muted px-1.5 font-mono text-[10px]">
                  Esc
                </kbd>
                <span>to close</span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => setSearchQuery("")}
                >
                  Clear
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => onOpenChange(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </CommandDialog>
  );
}
