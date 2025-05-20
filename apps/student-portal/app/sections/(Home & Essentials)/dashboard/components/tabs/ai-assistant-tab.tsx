"use client"

import * as React from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

import { AlertCircle, ArrowRight, Book, BookOpen, Brain, CalendarIcon, Check,  ChevronRight, Clock, FileText, Filter, Flame, GraduationCap, HelpCircle, Info, Lightbulb, Loader2,  MessageSquare, MoreHorizontal, Pencil, Plus, Save, Search, Settings, Star, Target, Timer, Trash, Trophy, Zap } from 'lucide-react'
import { ChatInterface } from "../ai-assistant/chat-interface"

type MessageType = {
  id: string
  role: "user" | "system" | "assistant"
  content: string
  timestamp: string
  feedback?: "helpful" | "not-helpful"
}

type ConceptType = {
  id: string
  title: string
  description: string
  difficulty: "beginner" | "intermediate" | "advanced"
  course: string
  progress: number
  lastStudied?: string
}

type StudyRecommendationType = {
  id: string
  title: string
  description: string
  course: string
  resources: Array<{
    title: string
    type: "video" | "reading" | "exercise" | "practical" | "quiz"
    duration?: string
    count?: string
    url?: string
  }>
  priority: "high" | "medium" | "low"
  reason: string
}

type LearningInsightType = {
  id: string
  title: string
  description: string
  date: string
  type: "strength" | "weakness" | "improvement" | "pattern"
  course?: string
  metric?: {
    current: number
    previous: number
    change: number
  }
}

type PracticeQuestionType = {
  id: string
  question: string
  difficulty: "easy" | "medium" | "hard"
  course: string
  topic: string
  type: "multiple-choice" | "true-false" | "short-answer" | "fill-in-blank"
  options?: string[]
  correctAnswer?: string
  hint?: string
}

type StudySessionType = {
  id: string
  title: string
  date: string
  startTime: string
  endTime: string
  duration: number
  course: string
  topics: string[]
  completed: boolean
}

export function AIAssistantTab() {
  const [activeTab, setActiveTab] = React.useState("chat")
  const [chatSubTab, setChatSubTab] = React.useState("chat")
  const [isLoading, setIsLoading] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")
  const [isTyping, setIsTyping] = React.useState(false)
  const [selectedConcept, setSelectedConcept] = React.useState<ConceptType | null>(null)
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date())
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCourseFilter, setSelectedCourseFilter] = React.useState<string>("all")
  const [showAIBoundaries, setShowAIBoundaries] = React.useState(false)
  const [practiceSettings, setPracticeSettings] = React.useState({
    difficulty: "medium",
    questionsCount: 5,
    timeLimit: 15,
    showHints: true,
  })
  const [practiceMode, setPracticeMode] = React.useState<"practice" | "quiz" | "challenge">("practice")
  const [showPracticeSettings, setShowPracticeSettings] = React.useState(false)
  const [generatingPractice, setGeneratingPractice] = React.useState(false)
  const [practiceQuestions, setPracticeQuestions] = React.useState<PracticeQuestionType[]>([])
  const [showPracticeQuestions, setShowPracticeQuestions] = React.useState(false)
  
  const isMobile = useMediaQuery("(max-width: 640px)")

  // Mock data
  const [messages, setMessages] = React.useState<MessageType[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your AI learning assistant. I can help you understand concepts, create study plans, identify areas for improvement, and generate practice questions. How can I support your learning journey today?",
      timestamp: new Date().toISOString(),
    },
  ])

  const concepts: ConceptType[] = [
    {
      id: "c1",
      title: "Data Structures: Binary Trees",
      description: "Understanding binary tree operations, traversals, and implementations",
      difficulty: "intermediate",
      course: "CS301",
      progress: 65,
      lastStudied: "2023-07-15T14:30:00Z",
    },
    {
      id: "c2",
      title: "Database Normalization",
      description: "First, second, and third normal forms in relational database design",
      difficulty: "intermediate",
      course: "CS305",
      progress: 82,
      lastStudied: "2023-07-18T10:15:00Z",
    },
    {
      id: "c3",
      title: "Combinatorial Mathematics",
      description: "Permutations, combinations, and the binomial theorem",
      difficulty: "advanced",
      course: "MATH201",
      progress: 45,
      lastStudied: "2023-07-10T09:00:00Z",
    },
    {
      id: "c4",
      title: "Technical Report Writing",
      description: "Structure, formatting, and citation in technical documentation",
      difficulty: "beginner",
      course: "ENG203",
      progress: 90,
      lastStudied: "2023-07-17T13:45:00Z",
    },
    {
      id: "c5",
      title: "Graph Algorithms",
      description: "BFS, DFS, shortest path, and minimum spanning tree algorithms",
      difficulty: "advanced",
      course: "CS301",
      progress: 38,
      lastStudied: "2023-07-12T11:30:00Z",
    },
  ]

  // Mock study recommendations
  const studyRecommendations: StudyRecommendationType[] = [
    {
      id: "rec1",
      title: "Review Graph Algorithms",
      description: "Focus on depth-first and breadth-first search implementations",
      course: "CS301",
      resources: [
        { title: "Graph Traversal Fundamentals", type: "video", duration: "18 min", url: "#" },
        { title: "DFS & BFS Practice Problems", type: "exercise", count: "8 problems", url: "#" },
        { title: "Visualizing Graph Algorithms", type: "practical", duration: "30 min", url: "#" },
      ],
      priority: "high",
      reason: "Your recent quiz scores show this is an area for improvement",
    },
    {
      id: "rec2",
      title: "Strengthen Combinatorial Mathematics",
      description: "Focus on permutation and combination problem-solving techniques",
      course: "MATH201",
      resources: [
        { title: "Combinatorics Explained", type: "reading", duration: "25 min", url: "#" },
        { title: "Practice Problem Set", type: "exercise", count: "12 problems", url: "#" },
        { title: "Combinatorics Quiz", type: "quiz", duration: "20 min", url: "#" },
      ],
      priority: "high",
      reason: "This is your lowest-scoring topic in MATH201",
    },
    {
      id: "rec3",
      title: "Database Query Optimization",
      description: "Learn techniques for writing efficient SQL queries",
      course: "CS305",
      resources: [
        { title: "Query Optimization Techniques", type: "reading", duration: "30 min", url: "#" },
        { title: "Optimization Lab", type: "practical", duration: "45 min", url: "#" },
      ],
      priority: "medium",
      reason: "Building on your strong database foundation with advanced concepts",
    },
  ]

  // Mock learning insights
  const learningInsights: LearningInsightType[] = [
    {
      id: "insight1",
      title: "Strong Technical Writing Skills",
      description: "Your performance in technical documentation assignments is consistently above average. Consider mentoring peers in this area.",
      date: "2023-07-18T00:00:00Z",
      type: "strength",
      course: "ENG203",
      metric: {
        current: 90,
        previous: 85,
        change: 5,
      },
    },
    {
      id: "insight2",
      title: "Graph Algorithm Concepts Need Attention",
      description: "Your quiz scores on graph traversal algorithms are below your average performance. Recommended focus area.",
      date: "2023-07-16T00:00:00Z",
      type: "weakness",
      course: "CS301",
      metric: {
        current: 38,
        previous: 42,
        change: -4,
      },
    },
    {
      id: "insight3",
      title: "Consistent Improvement in Database Design",
      description: "Your understanding of normalization has improved steadily over the last three assessments.",
      date: "2023-07-15T00:00:00Z",
      type: "improvement",
      course: "CS305",
      metric: {
        current: 82,
        previous: 68,
        change: 14,
      },
    },
    {
      id: "insight4",
      title: "Morning Study Sessions More Productive",
      description: "Analysis of your learning patterns shows higher retention and problem-solving success during morning study sessions.",
      date: "2023-07-14T00:00:00Z",
      type: "pattern",
      metric: {
        current: 78,
        previous: 65,
        change: 13,
      },
    },
  ]

  // Mock study sessions
  const studySessions: StudySessionType[] = [
    {
      id: "session1",
      title: "Graph Algorithms Review",
      date: "2023-07-20",
      startTime: "10:00",
      endTime: "11:30",
      duration: 90,
      course: "CS301",
      topics: ["DFS", "BFS", "Shortest Path Algorithms"],
      completed: false,
    },
    {
      id: "session2",
      title: "Combinatorics Practice",
      date: "2023-07-20",
      startTime: "14:00",
      endTime: "15:30",
      duration: 90,
      course: "MATH201",
      topics: ["Permutations", "Combinations", "Problem Solving"],
      completed: false,
    },
    {
      id: "session3",
      title: "Database Optimization Lab",
      date: "2023-07-21",
      startTime: "09:00",
      endTime: "10:30",
      duration: 90,
      course: "CS305",
      topics: ["Query Optimization", "Indexing Strategies"],
      completed: false,
    },
  ]

  // Mock quick prompts
  const quickPrompts = [
    {
      id: "prompt1",
      text: "Explain the difference between DFS and BFS algorithms",
      category: "concept",
    },
    {
      id: "prompt2",
      text: "Create practice questions on database normalization",
      category: "practice",
    },
    {
      id: "prompt3",
      text: "What are my weakest areas in CS301?",
      category: "analysis",
    },
    {
      id: "prompt4",
      text: "Help me understand combinatorial mathematics",
      category: "concept",
    },
    {
      id: "prompt5",
      text: "Generate a study plan for my upcoming exams",
      category: "planning",
    },
  ]

  // Mock practice questions
  const mockPracticeQuestions: PracticeQuestionType[] = [
    {
      id: "q1",
      question: "Which traversal algorithm visits the deepest nodes in a graph first before backtracking?",
      difficulty: "medium",
      course: "CS301",
      topic: "Graph Algorithms",
      type: "multiple-choice",
      options: ["Breadth-First Search", "Depth-First Search", "Dijkstra's Algorithm", "Prim's Algorithm"],
      correctAnswer: "Depth-First Search",
      hint: "Think about which algorithm uses a stack data structure implicitly.",
    },
    {
      id: "q2",
      question: "In a database with tables Students, Courses, and Enrollments, which normal form addresses transitive dependencies?",
      difficulty: "medium",
      course: "CS305",
      topic: "Database Normalization",
      type: "multiple-choice",
      options: ["First Normal Form (1NF)", "Second Normal Form (2NF)", "Third Normal Form (3NF)", "Boyce-Codd Normal Form (BCNF)"],
      correctAnswer: "Third Normal Form (3NF)",
      hint: "3NF builds upon 2NF by removing dependencies between non-key attributes.",
    },
    {
      id: "q3",
      question: "How many different ways can you arrange 5 distinct books on a shelf?",
      difficulty: "easy",
      course: "MATH201",
      topic: "Combinatorial Mathematics",
      type: "short-answer",
      correctAnswer: "120",
      hint: "This is a permutation problem. Use the formula n!",
    },
  ]

  // Filter concepts based on search and course filter
  const filteredConcepts = React.useMemo(() => {
    return concepts.filter(concept => {
      const matchesSearch = searchQuery === "" || 
        concept.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        concept.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCourse = selectedCourseFilter === "all" || concept.course === selectedCourseFilter;
      
      return matchesSearch && matchesCourse;
    });
  }, [searchQuery, selectedCourseFilter]);

  // Get unique courses for filtering
  const uniqueCourses = React.useMemo(() => {
    return Array.from(new Set(concepts.map(concept => concept.course)));
  }, []);

  // Handle sending a message
  const handleSendMessage = async (message: string): Promise<void> => {
    if (!message.trim()) return;

    const userMessage: MessageType = {
      id: Date.now().toString(),
      role: "user",
      content: message,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    await new Promise<void>((resolve) => {
      setTimeout(() => {
        let responseContent = "";
        const query = message.toLowerCase();
        
        if (query.includes("dfs") || query.includes("bfs")) {
          responseContent = "Depth-First Search (DFS) and Breadth-First Search (BFS) are...";
        } else if (query.includes("study plan") || query.includes("schedule")) {
          responseContent = "I've analyzed your performance data...";
        } else {
          const aiResponses = [
            "That's a great question about your coursework...",
            "I can help you with that learning challenge...",
            "Let me provide some guidance on this topic...",
          ];
          responseContent = aiResponses[Math.floor(Math.random() * aiResponses.length)];
        }

        const aiMessage: MessageType = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: responseContent,
          timestamp: new Date().toISOString(),
        };

        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
        resolve();
      }, 1500);
    });
  };

  // Handle quick prompt click
  const handleQuickPromptClick = (prompt: string) => {
    setInputValue(prompt);
  };

  // Handle message feedback
  const handleMessageFeedback = (messageId: string, feedback: "helpful" | "not-helpful") => {
    setMessages(prev => 
      prev.map(message => 
        message.id === messageId 
          ? { ...message, feedback } 
          : message
      )
    );
  };

  // Handle practice generation
  const handleGeneratePractice = () => {
    setGeneratingPractice(true);
    
    // Simulate API call to generate practice questions
    setTimeout(() => {
      setPracticeQuestions(mockPracticeQuestions);
      setGeneratingPractice(false);
      setShowPracticeQuestions(true);
    }, 2000);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "PPP");
    } catch (error) {
      return "Unknown date";
    }
  };

  // Get sessions for selected date
  const sessionsForSelectedDate = React.useMemo(() => {
    if (!selectedDate) return [];
    
    const dateString = format(selectedDate, "yyyy-MM-dd");
    return studySessions.filter(session => session.date === dateString);
  }, [selectedDate, studySessions]);



  // Simulate loading when changing tabs
  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [activeTab]);
  const [mounted, setMounted] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  return (
    <div className="space-y-6">
      <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">AI Learning Assistant</h2>
          </div>
          <TabsList>
            <TabsTrigger value="chat" className="text-sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              <span className={cn(isMobile ? "hidden" : "inline")}>Chat</span>
            </TabsTrigger>
            <TabsTrigger value="insights" className="text-sm">
              <Lightbulb className="h-4 w-4 mr-2" />
              <span className={cn(isMobile ? "hidden" : "inline")}>Insights</span>
            </TabsTrigger>
            <TabsTrigger value="concepts" className="text-sm">
              <BookOpen className="h-4 w-4 mr-2" />
              <span className={cn(isMobile ? "hidden" : "inline")}>Concepts</span>
            </TabsTrigger>
            <TabsTrigger value="practice" className="text-sm">
              <Pencil className="h-4 w-4 mr-2" />
              <span className={cn(isMobile ? "hidden" : "inline")}>Practice</span>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="text-sm">
              <CalendarIcon className="h-4 w-4 mr-2" />
              <span className={cn(isMobile ? "hidden" : "inline")}>Schedule</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Chat Tab */}
        <TabsContent value="chat" className="space-y-4">
          <Tabs value={chatSubTab} onValueChange={setChatSubTab} className="w-full">
            <TabsList className="w-full justify-start mb-4">
              <TabsTrigger value="chat" className="text-sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat Assistant
              </TabsTrigger>
              <TabsTrigger value="boundaries" className="text-sm">
                <Info className="h-4 w-4 mr-2" />
                AI Boundaries
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="space-y-4">
         <ChatInterface
          quickPrompts={quickPrompts}
          concepts={concepts}
          loading={loading}
          error={error}
          initialSidebarState={mounted && isDesktop ? "expanded" : "collapsed"}
          sidebarCollapsible={true}
          onSendMessage={handleSendMessage}
          onFeedback={(messageId, feedback) => {
            console.log(`Feedback for ${messageId}: ${feedback}`)
          }}
          onResetChat={() => {
            console.log("Chat reset")
            // You would implement actual reset logic here
          }}
          onExportChat={() => {
            console.log("Export as PDF")
            // You would implement actual export logic here
          }}
          onShareChat={() => {
            console.log("Share with tutor")
            // You would implement actual sharing logic here
          }}/>
            </TabsContent>
            
            <TabsContent value="boundaries" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>AI Learning Assistant Boundaries</CardTitle>
                  <CardDescription>
                    Understanding how I can help you learn effectively while maintaining academic integrity
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      How I Can Help You
                    </h3>
                    <div className="ml-7 space-y-2">
                      <p className="text-sm">I can help you understand complex concepts by breaking them down into simpler components.</p>
                      <p className="text-sm">I can generate practice questions to test your understanding of course material.</p>
                      <p className="text-sm">I can analyze your learning patterns and suggest areas for improvement.</p>
                      <p className="text-sm">I can create personalized study plans based on your strengths and weaknesses.</p>
                      <p className="text-sm">I can provide feedback on your approach to problems (but not on specific assignment solutions).</p>
                      <p className="text-sm">I can suggest learning resources relevant to your courses and topics.</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium flex items-center">
                      <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                      What I Cannot Do
                    </h3>
                    <div className="ml-7 space-y-2">
                      <p className="text-sm">I cannot complete assignments, projects, or homework for you.</p>
                      <p className="text-sm">I cannot write essays, reports, or code that you will submit as your own work.</p>
                      <p className="text-sm">I cannot provide direct answers to exam or quiz questions.</p>
                      <p className="text-sm">I cannot help you cheat or violate your institution's academic integrity policies.</p>
                      <p className="text-sm">I cannot access or modify your university records or systems.</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium flex items-center">
                      <GraduationCap className="h-5 w-5 text-blue-500 mr-2" />
                      Academic Integrity Commitment
                    </h3>
                    <div className="ml-7 space-y-2">
                      <p className="text-sm">
                        This AI assistant is designed to support your learning journey while upholding the highest standards of academic integrity. 
                        The goal is to help you develop your skills and understanding, not to do the work for you.
                      </p>
                      <p className="text-sm">
                        When you use this assistant, you agree to use it as a learning tool rather than a shortcut for completing assignments.
                        Remember that true learning comes from engaging with the material yourself.
                      </p>
                      <p className="text-sm">
                        If you're unsure whether a particular use of this assistant violates academic integrity policies, 
                        consult your instructor or your university's academic integrity office.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => setChatSubTab("chat")} className="w-full">
                    I Understand - Return to Chat
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              <div className="grid gap-3 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Learning Insights</CardTitle>
                    <CardDescription>AI-generated insights based on your learning patterns and performance</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {learningInsights.map((insight) => (
                      <div
                        key={insight.id}
                        className={cn(
                          "p-4 rounded-lg border",
                          insight.type === "strength" 
                            ? "bg-green-500/5 border-green-500/20" 
                            : insight.type === "weakness"
                              ? "bg-red-500/5 border-red-500/20"
                              : insight.type === "improvement"
                                ? "bg-blue-500/5 border-blue-500/20"
                                : "bg-amber-500/5 border-amber-500/20"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={cn(
                              "mt-0.5 p-2 rounded-full",
                              insight.type === "strength" 
                                ? "bg-green-500/10 text-green-500" 
                                : insight.type === "weakness"
                                  ? "bg-red-500/10 text-red-500"
                                  : insight.type === "improvement"
                                    ? "bg-blue-500/10 text-blue-500"
                                    : "bg-amber-500/10 text-amber-500"
                            )}
                          >
                            {insight.type === "strength" && <Trophy className="h-4 w-4" />}
                            {insight.type === "weakness" && <AlertCircle className="h-4 w-4" />}
                            {insight.type === "improvement" && <ArrowRight className="h-4 w-4" />}
                            {insight.type === "pattern" && <Target className="h-4 w-4" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{insight.title}</h3>
                              {insight.course && <Badge variant="outline">{insight.course}</Badge>}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                            
                            {insight.metric && (
                              <div className="mt-3 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium">{insight.metric.current}%</span>
                                  <span className={cn(
                                    "text-xs flex items-center",
                                    insight.metric.change > 0 ? "text-green-500" : "text-red-500"
                                  )}>
                                    {insight.metric.change > 0 ? "+" : ""}{insight.metric.change}%
                                  </span>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  {formatDate(insight.date)}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Study Recommendations</CardTitle>
                    <CardDescription>Personalized recommendations to improve your performance</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {studyRecommendations.map((rec) => (
                      <div
                        key={rec.id}
                        className={cn(
                          "p-4 rounded-lg border",
                          rec.priority === "high"
                            ? "bg-red-500/5 border-red-500/20"
                            : rec.priority === "medium"
                              ? "bg-amber-500/5 border-amber-500/20"
                              : "bg-blue-500/5 border-blue-500/20",
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={cn(
                              "mt-0.5 p-2 rounded-full",
                              rec.priority === "high"
                                ? "bg-red-500/10 text-red-500"
                                : rec.priority === "medium"
                                  ? "bg-amber-500/10 text-amber-500"
                                  : "bg-blue-500/10 text-blue-500",
                            )}
                          >
                            <Lightbulb className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{rec.title}</h3>
                              <Badge variant="outline">{rec.course}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                            <p className="text-xs text-muted-foreground mt-1 italic">Why: {rec.reason}</p>

                            <div className="mt-3 space-y-2">
                              <h4 className="text-sm font-medium">Recommended Resources:</h4>
                              <div className="grid grid-cols-1 gap-2">
                                {rec.resources.map((resource, index) => (
                                  <div key={index} className="flex items-center p-2 rounded-md bg-background border">
                                    {resource.type === "video" && <FileText className="h-4 w-4 mr-2 text-blue-500" />}
                                    {resource.type === "reading" && <BookOpen className="h-4 w-4 mr-2 text-purple-500" />}
                                    {resource.type === "exercise" && <Pencil className="h-4 w-4 mr-2 text-green-500" />}
                                    {resource.type === "practical" && <Zap className="h-4 w-4 mr-2 text-amber-500" />}
                                    {resource.type === "quiz" && <HelpCircle className="h-4 w-4 mr-2 text-red-500" />}
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium truncate">{resource.title}</p>
                                      <p className="text-xs text-muted-foreground">
                                        {resource.duration || resource.count}
                                      </p>
                                    </div>
                                    <Button variant="ghost" size="sm" className="ml-auto" asChild>
                                      <a href={resource.url || "#"}>
                                        <ArrowRight className="h-4 w-4" />
                                      </a>
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Learning Progress</CardTitle>
                  <CardDescription>Your progress across different courses and topics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    {concepts
                      .sort((a, b) => b.progress - a.progress)
                      .map(concept => (
                        <div key={concept.id}>
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{concept.course}</Badge>
                              <span className="text-sm font-medium">{concept.title}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{concept.progress}%</span>
                          </div>
                          <Progress 
                            value={concept.progress} 
                            className={cn(
                              "h-2",
                              concept.progress < 50 ? "text-red-500" : 
                              concept.progress < 70 ? "text-amber-500" : 
                              "text-green-500"
                            )} 
                          />
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-muted-foreground">
                              {concept.difficulty}
                            </span>
                            {concept.lastStudied && (
                              <span className="text-xs text-muted-foreground">
                                Last studied: {formatDate(concept.lastStudied)}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        {/* Concepts Tab */}
        <TabsContent value="concepts" className="space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="flex-1 w-full">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search concepts..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <Select value={selectedCourseFilter} onValueChange={setSelectedCourseFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Filter by course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Courses</SelectItem>
                      {uniqueCourses.map(course => (
                        <SelectItem key={course} value={course}>{course}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {filteredConcepts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <Search className="h-10 w-10 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No concepts found</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredConcepts.map(concept => (
                    <Card 
                      key={concept.id} 
                      className={cn(
                        "cursor-pointer transition-all hover:shadow-md",
                        selectedConcept?.id === concept.id && "ring-2 ring-primary"
                      )}
                      onClick={() => setSelectedConcept(concept)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <Badge 
                              className={cn(
                                concept.difficulty === "beginner" ? "bg-green-500" : 
                                concept.difficulty === "intermediate" ? "bg-amber-500" : 
                                "bg-red-500"
                              )}
                            >
                              {concept.difficulty}
                            </Badge>
                            <Badge variant="outline" className="ml-2">{concept.course}</Badge>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setInputValue(`Explain ${concept.title} in simple terms`)}>
                                <Lightbulb className="mr-2 h-4 w-4" />
                                <span>Explain This Concept</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => setInputValue(`Generate practice questions about ${concept.title}`)}>
                                <Pencil className="mr-2 h-4 w-4" />
                                <span>Practice This Concept</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => setActiveTab("chat")}>
                                <MessageSquare className="mr-2 h-4 w-4" />
                                <span>Ask About This Concept</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <CardTitle className="text-base mt-2">{concept.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{concept.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Progress</span>
                            <span className="text-sm font-medium">{concept.progress}%</span>
                          </div>
                          <Progress 
                            value={concept.progress} 
                            className={cn(
                              "h-2",
                              concept.progress < 50 ? "text-red-500" : 
                              concept.progress < 70 ? "text-amber-500" : 
                              "text-green-500"
                            )} 
                          />
                          {concept.lastStudied && (
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs text-muted-foreground flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                Last studied: {formatDate(concept.lastStudied)}
                              </span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
              
              {selectedConcept && (
                <Dialog open={!!selectedConcept} onOpenChange={(open) => !open && setSelectedConcept(null)}>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <div className="flex items-center gap-2">
                        <Badge 
                          className={cn(
                            selectedConcept.difficulty === "beginner" ? "bg-green-500" : 
                            selectedConcept.difficulty === "intermediate" ? "bg-amber-500" : 
                            "bg-red-500"
                          )}
                        >
                          {selectedConcept.difficulty}
                        </Badge>
                        <Badge variant="outline">{selectedConcept.course}</Badge>
                      </div>
                      <DialogTitle className="text-xl mt-2">{selectedConcept.title}</DialogTitle>
                      <DialogDescription>{selectedConcept.description}</DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Your Progress</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{selectedConcept.progress}% Complete</span>
                          {selectedConcept.lastStudied && (
                            <span className="text-xs text-muted-foreground">
                              Last studied: {formatDate(selectedConcept.lastStudied)}
                            </span>
                          )}
                        </div>
                        <Progress 
                          value={selectedConcept.progress} 
                          className={cn(
                            "h-2",
                            selectedConcept.progress < 50 ? "text-red-500" : 
                            selectedConcept.progress < 70 ? "text-amber-500" : 
                            "text-green-500"
                          )} 
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <h3 className="text-sm font-medium mb-2">Learning Resources</h3>
                          <div className="space-y-2">
                            <div className="flex items-center p-2 rounded-md bg-muted/30 border">
                              <FileText className="h-4 w-4 mr-2 text-blue-500" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">Video Tutorial: {selectedConcept.title}</p>
                                <p className="text-xs text-muted-foreground">15 minutes</p>
                              </div>
                              <Button variant="ghost" size="sm" className="ml-auto" asChild>
                                <a href="#">
                                  <ArrowRight className="h-4 w-4" />
                                </a>
                              </Button>
                            </div>
                            <div className="flex items-center p-2 rounded-md bg-muted/30 border">
                              <BookOpen className="h-4 w-4 mr-2 text-purple-500" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">Reading: {selectedConcept.title} Explained</p>
                                <p className="text-xs text-muted-foreground">10 minute read</p>
                              </div>
                              <Button variant="ghost" size="sm" className="ml-auto" asChild>
                                <a href="#">
                                  <ArrowRight className="h-4 w-4" />
                                </a>
                              </Button>
                            </div>
                            <div className="flex items-center p-2 rounded-md bg-muted/30 border">
                              <Pencil className="h-4 w-4 mr-2 text-green-500" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">Practice Problems</p>
                                <p className="text-xs text-muted-foreground">8 exercises</p>
                              </div>
                              <Button variant="ghost" size="sm" className="ml-auto" asChild>
                                <a href="#">
                                  <ArrowRight className="h-4 w-4" />
                                </a>
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium mb-2">Related Concepts</h3>
                          <div className="space-y-2">
                            {concepts
                              .filter(c => c.course === selectedConcept.course && c.id !== selectedConcept.id)
                              .slice(0, 3)
                              .map(concept => (
                                <div 
                                  key={concept.id} 
                                  className="flex items-center p-2 rounded-md bg-muted/30 border cursor-pointer hover:bg-muted/50"
                                  onClick={() => setSelectedConcept(concept)}
                                >
                                  <Book className="h-4 w-4 mr-2 text-primary" />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{concept.title}</p>
                                    <div className="flex items-center">
                                      <Progress value={concept.progress} className="h-1 w-16 mr-2" />
                                      <p className="text-xs text-muted-foreground">{concept.progress}% complete</p>
                                    </div>
                                  </div>
                                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <DialogFooter className="flex flex-col sm:flex-row gap-2">
                      <Button 
                        variant="outline" 
                        className="sm:flex-1"
                        onClick={() => {
                          setInputValue(`Explain ${selectedConcept.title} in simple terms`);
                          setActiveTab("chat");
                          setSelectedConcept(null);
                        }}
                      >
                        <Lightbulb className="mr-2 h-4 w-4" />
                        Explain This Concept
                      </Button>
                      <Button 
                        variant="outline" 
                        className="sm:flex-1"
                        onClick={() => {
                          setInputValue(`Generate practice questions about ${selectedConcept.title}`);
                          setActiveTab("chat");
                          setSelectedConcept(null);
                        }}
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Practice This Concept
                      </Button>
                      <Button 
                        className="sm:flex-1"
                        onClick={() => {
                          setActiveTab("practice");
                          setSelectedConcept(null);
                        }}
                      >
                        <Zap className="mr-2 h-4 w-4" />
                        Start Learning Session
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </>
          )}
        </TabsContent>

        {/* Practice Tab */}
        <TabsContent value="practice" className="space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Practice Generator</CardTitle>
                      <CardDescription>Generate custom practice questions to test your understanding</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setShowPracticeSettings(!showPracticeSettings)}>
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {showPracticeSettings && (
                    <div className="space-y-4 p-4 rounded-lg border bg-muted/30 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="difficulty">Difficulty Level</Label>
                          <span className="text-sm font-medium capitalize">{practiceSettings.difficulty}</span>
                        </div>
                        <Select 
                          value={practiceSettings.difficulty} 
                          onValueChange={(value) => setPracticeSettings({...practiceSettings, difficulty: value as any})}
                        >
                          <SelectTrigger id="difficulty">
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="hard">Hard</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="questions-count">Number of Questions</Label>
                          <span className="text-sm font-medium">{practiceSettings.questionsCount}</span>
                        </div>
                        <Slider 
                          id="questions-count"
                          min={1} 
                          max={10} 
                          step={1} 
                          value={[practiceSettings.questionsCount]} 
                          onValueChange={(value) => setPracticeSettings({...practiceSettings, questionsCount: value[0]})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="time-limit">Time Limit (minutes)</Label>
                          <span className="text-sm font-medium">{practiceSettings.timeLimit} min</span>
                        </div>
                        <Slider 
                          id="time-limit"
                          min={5} 
                          max={30} 
                          step={5} 
                          value={[practiceSettings.timeLimit]} 
                          onValueChange={(value) => setPracticeSettings({...practiceSettings, timeLimit: value[0]})}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="show-hints">Show Hints</Label>
                          <p className="text-xs text-muted-foreground">Get helpful hints when you're stuck</p>
                        </div>
                        <Switch 
                          id="show-hints" 
                          checked={practiceSettings.showHints} 
                          onCheckedChange={(checked) => setPracticeSettings({...practiceSettings, showHints: checked})}
                        />
                      </div>
                      
                      <div className="pt-2">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-sm font-medium">Practice Mode</h4>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <Button 
                            variant={practiceMode === "practice" ? "default" : "outline"} 
                            className="w-full"
                            onClick={() => setPracticeMode("practice")}
                          >
                            <Book className="h-4 w-4 mr-2" />
                            Practice
                          </Button>
                          <Button 
                            variant={practiceMode === "quiz" ? "default" : "outline"} 
                            className="w-full"
                            onClick={() => setPracticeMode("quiz")}
                          >
                            <HelpCircle className="h-4 w-4 mr-2" />
                            Quiz
                          </Button>
                          <Button 
                            variant={practiceMode === "challenge" ? "default" : "outline"} 
                            className="w-full"
                            onClick={() => setPracticeMode("challenge")}
                          >
                            <Flame className="h-4 w-4 mr-2" />
                            Challenge
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="practice-topic">What would you like to practice?</Label>
                      <Select defaultValue="graph-algorithms">
                        <SelectTrigger id="practice-topic">
                          <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="graph-algorithms">Graph Algorithms (CS301)</SelectItem>
                          <SelectItem value="database-normalization">Database Normalization (CS305)</SelectItem>
                          <SelectItem value="combinatorial-math">Combinatorial Mathematics (MATH201)</SelectItem>
                          <SelectItem value="technical-writing">Technical Report Writing (ENG203)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="practice-subtopic">Specific subtopic (optional)</Label>
                      <Input id="practice-subtopic" placeholder="E.g., Depth-First Search, 3NF, Permutations..." />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="practice-instructions">Additional instructions (optional)</Label>
                      <Textarea 
                        id="practice-instructions" 
                        placeholder="E.g., Focus on implementation details, include visual examples..."
                        className="min-h-[80px]"
                      />
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={handleGeneratePractice}
                    disabled={generatingPractice}
                  >
                    {generatingPractice ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating Practice Questions...
                      </>
                    ) : (
                      <>
                        <Zap className="mr-2 h-4 w-4" />
                        Generate Practice Questions
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
              
              {showPracticeQuestions && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Practice Questions</CardTitle>
                        <CardDescription>
                          {practiceMode === "practice" ? "Practice mode: Take your time to learn" : 
                           practiceMode === "quiz" ? "Quiz mode: Test your knowledge" : 
                           "Challenge mode: Race against the clock"}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {practiceSettings.timeLimit} min
                        </Badge>
                        <Badge variant="outline" className="flex items-center">
                          <HelpCircle className="mr-1 h-3 w-3" />
                          {practiceQuestions.length} questions
                        </Badge>
                        <Badge 
                          className={cn(
                            practiceSettings.difficulty === "easy" ? "bg-green-500" : 
                            practiceSettings.difficulty === "medium" ? "bg-amber-500" : 
                            "bg-red-500"
                          )}
                        >
                          {practiceSettings.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {practiceQuestions.map((question, index) => (
                      <div key={question.id} className="space-y-4 p-4 rounded-lg border">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                              {index + 1}
                            </div>
                            <Badge variant="outline">{question.course}</Badge>
                            <Badge variant="outline">{question.topic}</Badge>
                          </div>
                          <Badge 
                            className={cn(
                              question.difficulty === "easy" ? "bg-green-500" : 
                              question.difficulty === "medium" ? "bg-amber-500" : 
                              "bg-red-500"
                            )}
                          >
                            {question.difficulty}
                          </Badge>
                        </div>
                        
                        <div>
                          <h3 className="text-base font-medium mb-2">{question.question}</h3>
                          
                          {question.type === "multiple-choice" && question.options && (
                            <div className="space-y-2 mt-4">
                              {question.options.map((option, optIndex) => (
                                <div key={optIndex} className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    id={`q${index}-opt${optIndex}`}
                                    name={`question-${index}`}
                                    className="h-4 w-4 border-muted-foreground"
                                  />
                                  <Label htmlFor={`q${index}-opt${optIndex}`}>{option}</Label>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {question.type === "short-answer" && (
                            <div className="mt-4">
                              <Textarea placeholder="Enter your answer here..." className="min-h-[80px]" />
                            </div>
                          )}
                          
                          {practiceSettings.showHints && question.hint && (
                            <Accordion type="single" collapsible className="w-full mt-4">
                              <AccordionItem value="hint">
                                <AccordionTrigger className="text-sm">
                                  <div className="flex items-center">
                                    <Lightbulb className="h-4 w-4 mr-2 text-amber-500" />
                                    Show Hint
                                  </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                  <p className="text-sm text-muted-foreground">{question.hint}</p>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    <div className="flex justify-between">
                      <Button variant="outline">
                        <Save className="mr-2 h-4 w-4" />
                        Save for Later
                      </Button>
                      <Button>
                        <Check className="mr-2 h-4 w-4" />
                        Submit Answers
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </TabsContent>

        {/* Schedule Tab */}
        <TabsContent value="schedule" className="space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>AI-Optimized Study Schedule</CardTitle>
                  <CardDescription>
                    Personalized study plan based on your learning patterns, course load, and areas for improvement
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-7 divide-y md:divide-y-0 md:divide-x">
                    <div className="p-4 md:col-span-3">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">Calendar</h3>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <CalendarIcon className="h-4 w-4 mr-2" />
                              Today
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Filter className="h-4 w-4 mr-2" />
                                  Filter
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <span>All Courses</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <span>CS301 Only</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <span>MATH201 Only</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <span>CS305 Only</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          className="rounded-md border"
                        />
                        
                        <div className="flex items-center justify-between pt-2">
                          <h3 className="font-medium">Study Stats</h3>
                          <Badge variant="outline">This Week</Badge>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2">
                          <div className="p-2 rounded-lg border bg-muted/30 text-center">
                            <p className="text-2xl font-bold">12</p>
                            <p className="text-xs text-muted-foreground">Hours Studied</p>
                          </div>
                          <div className="p-2 rounded-lg border bg-muted/30 text-center">
                            <p className="text-2xl font-bold">8</p>
                            <p className="text-xs text-muted-foreground">Sessions</p>
                          </div>
                          <div className="p-2 rounded-lg border bg-muted/30 text-center">
                            <p className="text-2xl font-bold">3</p>
                            <p className="text-xs text-muted-foreground">Courses</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 md:col-span-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium flex items-center">
                            {selectedDate && (
                              <span>{format(selectedDate, "EEEE, MMMM d, yyyy")}</span>
                            )}
                          </h3>
                          <Button variant="outline" size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Session
                          </Button>
                        </div>
                        
                        {sessionsForSelectedDate.length === 0 ? (
                          <div className="flex flex-col items-center justify-center py-8 text-center">
                            <CalendarIcon className="h-10 w-10 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium">No study sessions planned</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Add a study session or select a different date.
                            </p>
                            <Button className="mt-4">
                              <Plus className="h-4 w-4 mr-2" />
                              Generate Recommended Sessions
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {sessionsForSelectedDate.map((session) => (
                              <div key={session.id} className="p-3 rounded-lg border">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <Badge variant="outline">{session.course}</Badge>
                                      <h4 className="font-medium">{session.title}</h4>
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                      <p className="text-sm text-muted-foreground flex items-center">
                                        <Clock className="h-3 w-3 mr-1" />
                                        {session.startTime} - {session.endTime} ({session.duration} min)
                                      </p>
                                    </div>
                                  </div>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>
                                        <Pencil className="mr-2 h-4 w-4" />
                                        <span>Edit Session</span>
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <Check className="mr-2 h-4 w-4" />
                                        <span>Mark as Completed</span>
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <Trash className="mr-2 h-4 w-4" />
                                        <span>Delete Session</span>
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                                
                                <div className="mt-2">
                                  <h5 className="text-xs font-medium mb-1">Topics:</h5>
                                  <div className="flex flex-wrap gap-1">
                                    {session.topics.map((topic, index) => (
                                      <Badge key={index} variant="secondary" className="text-xs">
                                        {topic}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                
                                <div className="flex items-center justify-between mt-3">
                                  <Button variant="outline" size="sm" className="h-7">
                                    <BookOpen className="h-3 w-3 mr-1" />
                                    Resources
                                  </Button>
                                  <Button size="sm" className="h-7">
                                    <Zap className="h-3 w-3 mr-1" />
                                    Start Session
                                  </Button>
                                </div>
                              </div>
                            ))}
                            
                            <div className="pt-2">
                              <h3 className="text-sm font-medium mb-2">Recommended Focus Areas</h3>
                              <div className="space-y-2">
                                {concepts
                                  .filter(concept => concept.progress < 60)
                                  .sort((a, b) => a.progress - b.progress)
                                  .slice(0, 2)
                                  .map(concept => (
                                    <div key={concept.id} className="flex items-center justify-between p-2 rounded-md bg-muted/30 border">
                                      <div className="flex items-center">
                                        <Badge variant="outline" className="mr-2">{concept.course}</Badge>
                                        <span className="text-sm">{concept.title}</span>
                                      </div>
                                      <Button variant="ghost" size="sm" className="h-7">
                                        <Plus className="h-3 w-3 mr-1" />
                                        Add Session
                                      </Button>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Study Patterns</CardTitle>
                  <CardDescription>AI analysis of your most productive study times and habits</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Optimal Study Times</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-3 rounded-lg border bg-muted/30">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mr-3">
                            <Timer className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Morning</p>
                            <p className="text-xs text-muted-foreground">8:00 AM - 11:00 AM</p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">Productivity</span>
                            <span className="text-xs font-medium">85%</span>
                          </div>
                          <Progress value={85} className="h-1 mt-1" />
                        </div>
                      </div>
                      <div className="p-3 rounded-lg border bg-muted/30">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mr-3">
                            <Timer className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Evening</p>
                            <p className="text-xs text-muted-foreground">4:00 PM - 7:00 PM</p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">Productivity</span>
                            <span className="text-xs font-medium">72%</span>
                          </div>
                          <Progress value={72} className="h-1 mt-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Study Environment Insights</h3>
                    <div className="p-3 rounded-lg border bg-muted/30">
                      <p className="text-sm">Based on your learning patterns, you perform best in quiet environments with short breaks every 25 minutes. Your retention is highest when you review material within 48 hours of first studying it.</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Recommended Study Techniques</h3>
                    <div className="space-y-2">
                      <div className="flex items-start p-2 rounded-md bg-muted/30 border">
                        <Star className="h-4 w-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium">Active Recall</p>
                          <p className="text-xs text-muted-foreground">Test yourself frequently rather than passively reviewing notes</p>
                        </div>
                      </div>
                      <div className="flex items-start p-2 rounded-md bg-muted/30 border">
                        <Star className="h-4 w-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium">Spaced Repetition</p>
                          <p className="text-xs text-muted-foreground">Review material at increasing intervals for better long-term retention</p>
                        </div>
                      </div>
                      <div className="flex items-start p-2 rounded-md bg-muted/30 border">
                        <Star className="h-4 w-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium">Pomodoro Technique</p>
                          <p className="text-xs text-muted-foreground">25 minutes of focused study followed by a 5-minute break</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Deadlines</CardTitle>
                  <CardDescription>Important dates and recommended preparation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg border bg-red-500/5 border-red-500/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mr-3">
                            <FileText className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">CS301 Midterm Exam</p>
                            <p className="text-xs text-muted-foreground">July 25, 2023 • 3 days left</p>
                          </div>
                        </div>
                        <Badge>High Priority</Badge>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs text-muted-foreground">Focus areas: Graph Algorithms, Binary Trees, Sorting</p>
                        <Button variant="outline" size="sm" className="mt-2 w-full">
                          <Zap className="h-3 w-3 mr-1" />
                          View Study Plan
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-3 rounded-lg border bg-amber-500/5 border-amber-500/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mr-3">
                            <FileText className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">MATH201 Assignment</p>
                            <p className="text-xs text-muted-foreground">July 28, 2023 • 6 days left</p>
                          </div>
                        </div>
                        <Badge variant="outline">Medium Priority</Badge>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs text-muted-foreground">Focus areas: Combinatorial Mathematics, Permutations</p>
                        <Button variant="outline" size="sm" className="mt-2 w-full">
                          <Zap className="h-3 w-3 mr-1" />
                          View Study Plan
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-3 rounded-lg border bg-blue-500/5 border-blue-500/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mr-3">
                            <FileText className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">CS305 Project Milestone</p>
                            <p className="text-xs text-muted-foreground">August 2, 2023 • 11 days left</p>
                          </div>
                        </div>
                        <Badge variant="outline">Medium Priority</Badge>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs text-muted-foreground">Focus areas: Database Normalization, Query Optimization</p>
                        <Button variant="outline" size="sm" className="mt-2 w-full">
                          <Zap className="h-3 w-3 mr-1" />
                          View Study Plan
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
