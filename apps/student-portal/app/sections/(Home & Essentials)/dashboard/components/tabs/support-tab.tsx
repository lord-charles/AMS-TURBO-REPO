"use client"

import * as React from "react"
import {
  AlertCircle,
  ArrowRight,
  Book,
  BookOpen,
  Building,
  Check,
  Clock,
  Copy,
  DollarSign,
  FileQuestion,
  FileText,
  GraduationCap,
  HelpCircle,
  Info,
  Laptop,
  Loader2,
  Mail,
  MoreHorizontal,
  Phone,
  PlusCircle,
  Search,
  Send,
  ThumbsUp,
  Wifi,
  RefreshCw,
} from "lucide-react"
import { format, formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useMediaQuery } from "@/hooks/use-media-query"

export function SupportTab() {
  const [activeSubTab, setActiveSubTab] = React.useState("helpdesk")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [supportMessage, setSupportMessage] = React.useState("")
  const [supportCategory, setSupportCategory] = React.useState("technical")
  const [supportSubject, setSupportSubject] = React.useState("")
  const [supportSubmitted, setSupportSubmitted] = React.useState(false)
  const [ticketDialogOpen, setTicketDialogOpen] = React.useState(false)
  const [selectedTicket, setSelectedTicket] = React.useState<any>(null)
  const [newReply, setNewReply] = React.useState("")
  const [faqCategory, setFaqCategory] = React.useState("all")
  const [chatMessages, setChatMessages] = React.useState<any[]>([
    {
      id: "welcome",
      role: "system",
      content: "Hello! Welcome to the Student Support Center. How can I help you today?",
      timestamp: new Date().toISOString(),
    },
  ])
  const [chatInput, setChatInput] = React.useState("")
  const [isChatTyping, setIsChatTyping] = React.useState(false)
  const chatEndRef = React.useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery("(max-width: 640px)")

  // Mock support categories
  const supportCategories = [
    {
      id: "technical",
      name: "Technical Support",
      description: "Issues with portal access, Wi-Fi, or IT services",
      icon: Laptop,
    },
    {
      id: "academic",
      name: "Academic Advising",
      description: "Course selection, registration, or academic planning",
      icon: Book,
    },
    {
      id: "financial",
      name: "Financial Aid",
      description: "Questions about fees, scholarships, or payments",
      icon: DollarSign,
    },
    {
      id: "hostel",
      name: "Hostel & Accommodation",
      description: "Hostel allocation, maintenance, or facilities",
      icon: Building,
    },
    {
      id: "general",
      name: "General Inquiries",
      description: "Other questions or concerns",
      icon: HelpCircle,
    },
  ]

  // Mock support tickets
  const supportTickets = [
    {
      id: "ticket1",
      subject: "Unable to access online library resources",
      category: "technical",
      status: "open",
      priority: "medium",
      created: "2023-11-05T14:30:00",
      lastUpdated: "2023-11-06T10:15:00",
      messages: [
        {
          id: "msg1",
          from: "student",
          content:
            "I'm trying to access the online library resources but keep getting an error message. I've tried using different browsers but still can't log in.",
          timestamp: "2023-11-05T14:30:00",
        },
        {
          id: "msg2",
          from: "support",
          content:
            "Thank you for reporting this issue. Could you please provide a screenshot of the error message you're receiving?",
          timestamp: "2023-11-05T16:45:00",
          supportName: "James Mwangi",
          supportRole: "IT Support Specialist",
        },
        {
          id: "msg3",
          from: "student",
          content:
            "I've attached the screenshot showing the error message. It says 'Authentication failed' when I try to log in with my student credentials.",
          timestamp: "2023-11-06T09:20:00",
        },
        {
          id: "msg4",
          from: "support",
          content:
            "Thank you for the screenshot. We're investigating this issue and will get back to you shortly. In the meantime, please try clearing your browser cache and cookies.",
          timestamp: "2023-11-06T10:15:00",
          supportName: "James Mwangi",
          supportRole: "IT Support Specialist",
        },
      ],
    },
    {
      id: "ticket2",
      subject: "Question about course prerequisites",
      category: "academic",
      status: "closed",
      priority: "low",
      created: "2023-10-28T09:45:00",
      lastUpdated: "2023-10-30T16:20:00",
      messages: [
        {
          id: "msg1",
          from: "student",
          content:
            "I'm planning to register for CS301 next semester but I'm not sure if I have all the prerequisites. Can you help me check?",
          timestamp: "2023-10-28T09:45:00",
        },
        {
          id: "msg2",
          from: "support",
          content:
            "Hello, I'll be happy to help you check the prerequisites for CS301. According to our records, you need to have completed CS201 and MATH102 with at least a C grade. Let me check your transcript.",
          timestamp: "2023-10-28T11:30:00",
          supportName: "Dr. Sarah Odhiambo",
          supportRole: "Academic Advisor",
        },
        {
          id: "msg3",
          from: "support",
          content:
            "I've checked your transcript and can confirm that you have successfully completed both CS201 (B+) and MATH102 (A-). You meet all the prerequisites for CS301 and can register for it next semester.",
          timestamp: "2023-10-30T16:20:00",
          supportName: "Dr. Sarah Odhiambo",
          supportRole: "Academic Advisor",
        },
        {
          id: "msg4",
          from: "student",
          content: "Thank you for checking! I'll go ahead and include CS301 in my registration plan.",
          timestamp: "2023-10-30T16:45:00",
        },
      ],
    },
    {
      id: "ticket3",
      subject: "Wi-Fi connectivity issues in Block B",
      category: "technical",
      status: "in-progress",
      priority: "high",
      created: "2023-11-02T11:20:00",
      lastUpdated: "2023-11-03T14:10:00",
      messages: [
        {
          id: "msg1",
          from: "student",
          content:
            "There's been very poor Wi-Fi connectivity in Block B hostel for the past two days. Many students are having trouble connecting to online classes.",
          timestamp: "2023-11-02T11:20:00",
        },
        {
          id: "msg2",
          from: "support",
          content:
            "Thank you for reporting this issue. We'll dispatch a technician to check the Wi-Fi access points in Block B. Could you please specify which floors are most affected?",
          timestamp: "2023-11-02T13:45:00",
          supportName: "Peter Kamau",
          supportRole: "Network Administrator",
        },
        {
          id: "msg3",
          from: "student",
          content:
            "The issue seems to be worst on floors 3 and 4. The ground floor and first floor have better connectivity but still slower than usual.",
          timestamp: "2023-11-02T14:30:00",
        },
        {
          id: "msg4",
          from: "support",
          content:
            "Our technicians have identified a faulty access point on the 3rd floor that's affecting connectivity throughout the building. We've ordered a replacement part that should arrive tomorrow. In the meantime, we've reconfigured the network to improve connectivity as much as possible.",
          timestamp: "2023-11-03T14:10:00",
          supportName: "Peter Kamau",
          supportRole: "Network Administrator",
        },
      ],
    },
  ]

  // Mock FAQ data
  const faqData = [
    {
      id: "faq1",
      category: "technical",
      question: "How do I reset my student portal password?",
      answer:
        "To reset your password, click on the 'Forgot Password' link on the login page. Enter your student email address, and you'll receive a password reset link. Follow the instructions in the email to create a new password. If you don't receive the email, check your spam folder or contact the IT helpdesk at helpdesk@university.ac.ke or call +254 (0) 123 456 789.",
    },
    {
      id: "faq2",
      category: "technical",
      question: "How do I connect to the campus Wi-Fi?",
      answer:
        "To connect to the campus Wi-Fi, select the 'Campus-Secure' network from your device's Wi-Fi settings. Enter your student ID as the username and your portal password. Accept any security certificates if prompted. If you experience connection issues, try forgetting the network and reconnecting, or visit the IT helpdesk in the Administration Building.",
    },
    {
      id: "faq3",
      category: "academic",
      question: "How do I add or drop a course?",
      answer:
        "You can add or drop courses through the student portal during the designated add/drop period (usually the first two weeks of the semester). Navigate to 'Registration' > 'Add/Drop Courses', select the courses you wish to add or drop, and submit your changes. After the add/drop period, you'll need to complete a course withdrawal form from the Registrar's Office.",
    },
    {
      id: "faq4",
      category: "academic",
      question: "Where can I find my class schedule?",
      answer:
        "Your class schedule is available on the student portal under 'Academics' > 'My Schedule'. You can view your schedule by day, week, or month. You can also download or print your schedule from this page. The schedule includes course names, times, locations, and instructor information.",
    },
    {
      id: "faq5",
      category: "financial",
      question: "When are tuition fees due?",
      answer:
        "Tuition fees are typically due two weeks before the start of each semester. For the Fall semester, this is usually mid-August, and for the Spring semester, early January. You can find the exact due dates on the academic calendar or in the 'Financial' section of your student portal. Late payments may incur additional fees.",
    },
    {
      id: "faq6",
      category: "financial",
      question: "How do I apply for scholarships?",
      answer:
        "Scholarship applications are available through the 'Financial Aid' section of your student portal. Click on 'Scholarships' to view available opportunities and their requirements. Most scholarships require an online application, academic transcripts, and sometimes additional documents like personal statements or recommendation letters. Pay attention to application deadlines, which are typically several months before the start of the academic year.",
    },
    {
      id: "faq7",
      category: "hostel",
      question: "How do I apply for on-campus accommodation?",
      answer:
        "To apply for on-campus accommodation, log in to your student portal and navigate to 'Housing' > 'Accommodation Application'. Complete the application form, select your preferred hostel and room type, and submit your application before the deadline. Hostel allocations are typically done on a first-come, first-served basis, with priority given to continuing students and those from distant counties.",
    },
    {
      id: "faq8",
      category: "hostel",
      question: "How do I report maintenance issues in my hostel room?",
      answer:
        "To report maintenance issues in your hostel room, use the 'Maintenance Request' form in the 'Housing' section of your student portal. Provide a detailed description of the issue and upload photos if possible. For urgent issues like water leaks or electrical problems, contact your Hostel Administrator directly or call the Maintenance Hotline at +254 (0) 123 789 456.",
    },
    {
      id: "faq9",
      category: "general",
      question: "How do I obtain an official transcript?",
      answer:
        "Official transcripts can be requested through the student portal under 'Academics' > 'Transcripts'. There is a processing fee of KES 1,000 for each transcript requested. You can choose to have transcripts mailed to a specific address or held for pickup at the Registrar's Office. Processing typically takes 3-5 business days, though expedited options may be available for an additional fee.",
    },
    {
      id: "faq10",
      category: "general",
      question: "Where is the campus health center located?",
      answer:
        "The Campus Health Center is located in the Student Services Building, first floor, Room 105. It's open Monday through Friday from 8:00 AM to 5:00 PM. For after-hours emergencies, please call the Campus Security at +254 (0) 123 456 999 or visit the nearest hospital emergency room. The health center provides basic medical care, counseling services, and health education to all registered students.",
    },
  ]

  // Mock contact information
  const contactInfo = {
    helpdesk: {
      email: "helpdesk@university.ac.ke",
      phone: "+254 (0) 123 456 789",
      hours: "Monday-Friday, 8:00 AM - 6:00 PM",
      location: "Administration Building, Ground Floor, Room G12"
    },
    academic: {
      email: "academics@university.ac.ke",
      phone: "+254 (0) 123 456 790",
      hours: "Monday-Friday, 8:00 AM - 4:30 PM",
      location: "Academic Block, 2nd Floor, Room 205"
    },
    financial: {
      email: "finance@university.ac.ke",
      phone: "+254 (0) 123 456 791",
      hours: "Monday-Friday, 8:30 AM - 3:30 PM",
      location: "Administration Building, 1st Floor, Room 110"
    },
    hostel: {
      email: "housing@university.ac.ke",
      phone: "+254 (0) 123 456 792",
      hours: "Monday-Friday, 8:00 AM - 5:00 PM, Saturday 9:00 AM - 12:00 PM",
      location: "Student Services Building, Ground Floor, Room G05"
    },
    health: {
      email: "health@university.ac.ke",
      phone: "+254 (0) 123 456 793",
      hours: "Monday-Friday, 8:00 AM - 5:00 PM",
      location: "Student Services Building, 1st Floor, Room 105"
    },
    security: {
      email: "security@university.ac.ke",
      phone: "+254 (0) 123 456 999",
      hours: "24/7",
      location: "Main Gate, Security Office"
    }
  }

  // Mock knowledge base articles
  const knowledgeBaseArticles = [
    {
      id: "kb1",
      title: "Complete Guide to Course Registration",
      category: "academic",
      excerpt:
        "Learn how to navigate the course registration process, including important deadlines, prerequisites, and troubleshooting common issues.",
      readTime: "5 min read",
      lastUpdated: "2023-10-15",
    },
    {
      id: "kb2",
      title: "Understanding Your Fee Statement",
      category: "financial",
      excerpt:
        "A comprehensive guide to reading and understanding your university fee statement, including payment options and deadlines.",
      readTime: "4 min read",
      lastUpdated: "2023-09-28",
    },
    {
      id: "kb3",
      title: "Wi-Fi Connectivity Troubleshooting",
      category: "technical",
      excerpt:
        "Step-by-step guide to resolving common Wi-Fi connectivity issues on campus, including configuration settings for different devices.",
      readTime: "6 min read",
      lastUpdated: "2023-11-02",
    },
    {
      id: "kb4",
      title: "Hostel Allocation Process Explained",
      category: "hostel",
      excerpt:
        "Detailed explanation of how hostel rooms are allocated, including priority criteria, application process, and important dates.",
      readTime: "7 min read",
      lastUpdated: "2023-08-15",
    },
    {
      id: "kb5",
      title: "Accessing Library Resources Remotely",
      category: "technical",
      excerpt:
        "Learn how to access the university's digital library resources from off-campus, including e-books, journals, and research databases.",
      readTime: "3 min read",
      lastUpdated: "2023-10-05",
    },
    {
      id: "kb6",
      title: "Student ID Card Services",
      category: "general",
      excerpt:
        "Information about obtaining, replacing, and using your student ID card for various campus services and facilities.",
      readTime: "4 min read",
      lastUpdated: "2023-09-10",
    },
  ]

  // Filter FAQs based on category and search query
  const filteredFAQs = React.useMemo(() => {
    return faqData.filter((faq) => {
      const matchesCategory = faqCategory === "all" || faq.category === faqCategory
      const matchesSearch =
        searchQuery.trim() === "" ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [faqCategory, searchQuery])

  // Filter knowledge base articles based on search query
  const filteredArticles = React.useMemo(() => {
    if (searchQuery.trim() === "") return knowledgeBaseArticles
    return knowledgeBaseArticles.filter(
      (article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [searchQuery])

  // Get status badge for tickets
  const getTicketStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-blue-500">Open</Badge>
      case "in-progress":
        return <Badge className="bg-amber-500">In Progress</Badge>
      case "closed":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            Closed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Get priority badge for tickets
  const getTicketPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <Badge variant="outline" className="border-red-500 text-red-500">
            High
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-500">
            Medium
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            Low
          </Badge>
        )
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  // Handle support ticket submission
  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setSupportSubmitted(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        setSupportSubmitted(false)
        setSupportMessage("")
        setSupportSubject("")
      }, 3000)
    }, 1500)
  }

  // Handle ticket reply submission
  const handleSubmitReply = () => {
    if (!newReply.trim() || !selectedTicket) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setNewReply("")

      // Update ticket with new reply
      const updatedTicket = {
        ...selectedTicket,
        messages: [
          ...selectedTicket.messages,
          {
            id: `msg${selectedTicket.messages.length + 1}`,
            from: "student",
            content: newReply,
            timestamp: new Date().toISOString(),
          },
        ],
        lastUpdated: new Date().toISOString(),
      }

      setSelectedTicket(updatedTicket)

      // Simulate support response after 2 seconds
      setTimeout(() => {
        const autoResponse = {
          id: `msg${selectedTicket.messages.length + 2}`,
          from: "support",
          content:
            "Thank you for your message. Our support team will review your update and respond as soon as possible.",
          timestamp: new Date().toISOString(),
          supportName: "Automated Response",
          supportRole: "System",
        }

        setSelectedTicket((prev: any) => ({
          ...prev,
          messages: [...prev.messages, autoResponse],
          lastUpdated: new Date().toISOString(),
        }))
      }, 2000)
    }, 1000)
  }

  // Handle live chat message submission
  const handleSendChatMessage = () => {
    if (!chatInput.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: chatInput,
      timestamp: new Date().toISOString(),
    }

    setChatMessages((prev) => [...prev, userMessage])
    setChatInput("")
    setIsChatTyping(true)

    // Simulate support response
    setTimeout(() => {
      const supportResponses = [
        "Thank you for your question. Let me check that for you.",
        "I understand your concern. Here's what you need to know about that.",
        "I'd be happy to help you with that issue. Let me provide some information.",
        "That's a common question. Here's the answer based on university policy.",
        "I'll look into that for you. In the meantime, you might want to check the knowledge base for related articles.",
      ]

      const randomResponse = supportResponses[Math.floor(Math.random() * supportResponses.length)]

      const supportMessage = {
        id: (Date.now() + 1).toString(),
        role: "support",
        content: randomResponse,
        timestamp: new Date().toISOString(),
        supportName: "Jane Wanjiku",
        supportRole: "Student Support Agent",
      }

      setChatMessages((prev) => [...prev, supportMessage])
      setIsChatTyping(false)
    }, 1500)
  }

  // Scroll to bottom of chat when messages change
  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatMessages])

  // Simulate loading when changing tabs
  React.useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [activeSubTab])

  return (
    <div className="space-y-6">
      <Tabs defaultValue="helpdesk" value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
          <h2 className="text-xl font-bold">Student Support & Help Desk</h2>
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="helpdesk" className="text-sm">
              Help Desk
            </TabsTrigger>
            <TabsTrigger value="faq" className="text-sm">
              FAQ
            </TabsTrigger>
            <TabsTrigger value="knowledge" className="text-sm">
              Knowledge Base
            </TabsTrigger>
            <TabsTrigger value="contact" className="text-sm">
              Contact Us
            </TabsTrigger>
            <TabsTrigger value="chat" className="text-sm">
              Live Chat
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Help Desk Tab */}
        <TabsContent value="helpdesk" className="space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Submit a Support Ticket</CardTitle>
                    <CardDescription>Need help? Submit a ticket and our support team will assist you.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {supportSubmitted ? (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                          <Check className="h-6 w-6 text-green-600" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">Ticket Submitted Successfully</h3>
                        <p className="text-muted-foreground mb-4">
                          Thank you for contacting us. We'll respond to your inquiry as soon as possible.
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Your ticket reference:{" "}
                          <span className="font-medium">TKT-{Date.now().toString().slice(-6)}</span>
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmitTicket} className="space-y-4">
                        <div className="space-y-2">
                          <label htmlFor="category" className="text-sm font-medium">
                            Category
                          </label>
                          <Select value={supportCategory} onValueChange={setSupportCategory} required>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {supportCategories.map((category) => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="subject" className="text-sm font-medium">
                            Subject
                          </label>
                          <Input
                            id="subject"
                            placeholder="Brief description of your issue"
                            value={supportSubject}
                            onChange={(e) => setSupportSubject(e.target.value)}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="message" className="text-sm font-medium">
                            Message
                          </label>
                          <Textarea
                            id="message"
                            placeholder="Please provide details about your issue or question"
                            rows={5}
                            value={supportMessage}
                            onChange={(e) => setSupportMessage(e.target.value)}
                            required
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <Button type="button" variant="outline" className="w-full">
                            Attach Files
                          </Button>
                          <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading || !supportMessage || !supportSubject}
                          >
                            {isLoading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Submitting...
                              </>
                            ) : (
                              <>
                                <Send className="mr-2 h-4 w-4" />
                                Submit Ticket
                              </>
                            )}
                          </Button>
                        </div>
                      </form>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Support Categories</CardTitle>
                    <CardDescription>Select the appropriate category for faster resolution</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="px-6 pb-6">
                      {supportCategories.map((category) => (
                        <div
                          key={category.id}
                          className={cn(
                            "flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors",
                            supportCategory === category.id ? "bg-muted hover:bg-muted" : "hover:bg-muted/50",
                          )}
                          onClick={() => setSupportCategory(category.id)}
                        >
                          <div className="mt-0.5 p-2 rounded-full bg-primary/10 text-primary">
                            <category.icon className="h-4 w-4" />
                          </div>
                          <div>
                            <h3 className="font-medium">{category.name}</h3>
                            <p className="text-sm text-muted-foreground">{category.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Your Support Tickets</CardTitle>
                  <CardDescription>Track and manage your existing support requests</CardDescription>
                </CardHeader>
                <CardContent>
                  {supportTickets.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <HelpCircle className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Support Tickets</h3>
                      <p className="text-muted-foreground max-w-md">
                        You don't have any active support tickets. If you need assistance, please submit a new ticket.
                      </p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Subject</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Priority</TableHead>
                          <TableHead>Last Updated</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {supportTickets.map((ticket) => (
                          <TableRow key={ticket.id}>
                            <TableCell className="font-medium">{ticket.subject}</TableCell>
                            <TableCell>
                              {supportCategories.find((cat) => cat.id === ticket.category)?.name || ticket.category}
                            </TableCell>
                            <TableCell>{getTicketStatusBadge(ticket.status)}</TableCell>
                            <TableCell>{getTicketPriorityBadge(ticket.priority)}</TableCell>
                            <TableCell>
                              {formatDistanceToNow(new Date(ticket.lastUpdated), { addSuffix: true })}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedTicket(ticket)
                                  setTicketDialogOpen(true)
                                }}
                              >
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <a href="/support/tickets/history">
                      <FileText className="mr-2 h-4 w-4" />
                      View All Tickets
                    </a>
                  </Button>
                  <Button variant="outline" size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Ticket
                  </Button>
                </CardFooter>
              </Card>

              {/* Ticket Detail Dialog */}
              <Dialog open={ticketDialogOpen} onOpenChange={setTicketDialogOpen}>
                <DialogContent className="max-w-3xl">
                  {selectedTicket && (
                    <>
                      <DialogHeader>
                        <DialogTitle>Ticket: {selectedTicket.subject}</DialogTitle>
                        <DialogDescription className="flex flex-wrap gap-2 items-center">
                          <span>
                            {supportCategories.find((cat) => cat.id === selectedTicket.category)?.name ||
                              selectedTicket.category}
                          </span>
                          <span>•</span>
                          <span>{getTicketStatusBadge(selectedTicket.status)}</span>
                          <span>•</span>
                          <span>{getTicketPriorityBadge(selectedTicket.priority)}</span>
                          <span>•</span>
                          <span>Created: {format(new Date(selectedTicket.created), "PPP")}</span>
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4 max-h-[60vh] overflow-y-auto py-4">
                        {selectedTicket.messages.map((message: any) => (
                          <div
                            key={message.id}
                            className={cn(
                              "flex flex-col gap-2 p-4 rounded-lg",
                              message.from === "student" ? "bg-primary text-primary-foreground ml-8" : "bg-muted mr-8",
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {message.from === "support" && (
                                  <Avatar className="h-6 w-6">
                                    <AvatarFallback>{message.supportName.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                )}
                                <span className="font-medium">
                                  {message.from === "student" ? "You" : message.supportName}
                                </span>
                                {message.from === "support" && (
                                  <span className="text-xs text-muted-foreground">{message.supportRole}</span>
                                )}
                              </div>
                              <span className="text-xs">{format(new Date(message.timestamp), "PPp")}</span>
                            </div>
                            <p className="text-sm whitespace-pre-line">{message.content}</p>
                          </div>
                        ))}
                      </div>

                      {selectedTicket.status !== "closed" && (
                        <div className="space-y-2 pt-4 border-t">
                          <label htmlFor="reply" className="text-sm font-medium">
                            Add Reply
                          </label>
                          <Textarea
                            id="reply"
                            placeholder="Type your reply here..."
                            rows={3}
                            value={newReply}
                            onChange={(e) => setNewReply(e.target.value)}
                          />
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setTicketDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleSubmitReply} disabled={isLoading || !newReply.trim()}>
                              {isLoading ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Sending...
                                </>
                              ) : (
                                <>
                                  <Send className="mr-2 h-4 w-4" />
                                  Send Reply
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </DialogContent>
              </Dialog>
            </>
          )}
        </TabsContent>

        {/* FAQ Tab */}
        <TabsContent value="faq" className="space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search FAQs..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={faqCategory} onValueChange={setFaqCategory}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {supportCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>Find answers to common questions about university services</CardDescription>
                </CardHeader>
                <CardContent>
                  {filteredFAQs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <FileQuestion className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No FAQs Found</h3>
                      <p className="text-muted-foreground max-w-md">
                        {searchQuery
                          ? `No FAQs match your search for "${searchQuery}"`
                          : "There are no FAQs in this category yet."}
                      </p>
                    </div>
                  ) : (
                    <Accordion type="single" collapsible className="w-full">
                      {filteredFAQs.map((faq) => (
                        <AccordionItem key={faq.id} value={faq.id}>
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="hidden sm:inline-flex">
                                {supportCategories.find((cat) => cat.id === faq.category)?.name || faq.category}
                              </Badge>
                              <span>{faq.question}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="pt-2 pb-4 px-1">
                              <p className="text-sm whitespace-pre-line">{faq.answer}</p>
                              <div className="flex justify-end mt-4">
                                <div className="flex items-center gap-2">
                                  <Button variant="ghost" size="sm" className="h-7">
                                    <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                                    Helpful
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-7">
                                    <Copy className="h-3.5 w-3.5 mr-1" />
                                    Copy
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredFAQs.length} of {faqData.length} FAQs
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="/support/faq/all">View All FAQs</a>
                  </Button>
                </CardFooter>
              </Card>

              <div className="bg-muted/30 border rounded-lg p-4">
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <Info className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Can't find what you're looking for?</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      If you couldn't find the answer to your question, you can submit a support ticket or contact us
                      directly.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" onClick={() => setActiveSubTab("helpdesk")}>
                        Submit a Ticket
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setActiveSubTab("contact")}>
                        Contact Us
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </TabsContent>

        {/* Knowledge Base Tab */}
        <TabsContent value="knowledge" className="space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              <div className="relative w-full max-w-md mb-6">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search knowledge base articles..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredArticles.map((article) => (
                  <Card key={article.id} className="flex flex-col">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <Badge variant="outline" className="mb-2">
                          {supportCategories.find((cat) => cat.id === article.category)?.name || article.category}
                        </Badge>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <BookOpen className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardTitle className="text-lg">{article.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-sm text-muted-foreground">{article.excerpt}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-4">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="mr-1 h-3.5 w-3.5" />
                        <span>{article.readTime}</span>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span>Updated: {format(new Date(article.lastUpdated), "MMM d, yyyy")}</span>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {filteredArticles.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Articles Found</h3>
                  <p className="text-muted-foreground max-w-md">
                    No knowledge base articles match your search for "{searchQuery}". Try using different keywords or
                    browse all articles.
                  </p>
                  <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
                    Clear Search
                  </Button>
                </div>
              )}

              <div className="flex justify-center mt-6">
                <Button variant="outline" asChild>
                  <a href="/support/knowledge/all">
                    View All Knowledge Base Articles
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </>
          )}
        </TabsContent>

        {/* Contact Us Tab */}
        <TabsContent value="contact" className="space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Reach out to various departments for assistance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="p-4 rounded-lg border bg-muted/30">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mr-3">
                          <Laptop className="h-5 w-5" />
                        </div>
                        <h3 className="font-medium">IT Helpdesk</h3>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                          <a href={`mailto:${contactInfo.helpdesk.email}`} className="hover:underline">
                            {contactInfo.helpdesk.email}
                          </a>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                          <a href={`tel:${contactInfo.helpdesk.phone.replace(/\s/g, "")}`} className="hover:underline">
                            {contactInfo.helpdesk.phone}
                          </a>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{contactInfo.helpdesk.hours}</span>
                        </div>
                        <div className="flex items-center">
                          <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{contactInfo.helpdesk.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg border bg-muted/30">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mr-3">
                          <GraduationCap className="h-5 w-5" />
                        </div>
                        <h3 className="font-medium">Academic Affairs</h3>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                          <a href={`mailto:${contactInfo.academic.email}`} className="hover:underline">
                            {contactInfo.academic.email}
                          </a>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                          <a href={`tel:${contactInfo.academic.phone.replace(/\s/g, "")}`} className="hover:underline">
                            {contactInfo.academic.phone}
                          </a>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{contactInfo.academic.hours}</span>
                        </div>
                        <div className="flex items-center">
                          <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{contactInfo.academic.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg border bg-muted/30">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mr-3">
                          <DollarSign className="h-5 w-5" />
                        </div>
                        <h3 className="font-medium">Finance Office</h3>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                          <a href={`mailto:${contactInfo.financial.email}`} className="hover:underline">
                            {contactInfo.financial.email}
                          </a>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                          <a href={`tel:${contactInfo.financial.phone.replace(/\s/g, "")}`} className="hover:underline">
                            {contactInfo.financial.phone}
                          </a>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{contactInfo.financial.hours}</span>
                        </div>
                        <div className="flex items-center">
                          <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{contactInfo.financial.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg border bg-muted/30">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-full bg-purple-500/10 text-purple-500 flex items-center justify-center mr-3">
                          <Building className="h-5 w-5" />
                        </div>
                        <h3 className="font-medium">Hostel Administration</h3>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                          <a href={`mailto:${contactInfo.hostel.email}`} className="hover:underline">
                            {contactInfo.hostel.email}
                          </a>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                          <a href={`tel:${contactInfo.hostel.phone.replace(/\s/g, "")}`} className="hover:underline">
                            {contactInfo.hostel.phone}
                          </a>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{contactInfo.hostel.hours}</span>
                        </div>
                        <div className="flex items-center">
                          <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{contactInfo.hostel.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg border bg-muted/30">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mr-3">
                          <AlertCircle className="h-5 w-5" />
                        </div>
                        <h3 className="font-medium">Health Services</h3>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                          <a href={`mailto:${contactInfo.health.email}`} className="hover:underline">
                            {contactInfo.health.email}
                          </a>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                          <a href={`tel:${contactInfo.health.phone.replace(/\s/g, "")}`} className="hover:underline">
                            {contactInfo.health.phone}
                          </a>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{contactInfo.health.hours}</span>
                        </div>
                        <div className="flex items-center">
                          <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{contactInfo.health.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg border bg-muted/30">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mr-3">
                          <Wifi className="h-5 w-5" />
                        </div>
                        <h3 className="font-medium">Campus Security</h3>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                          <a href={`mailto:${contactInfo.security.email}`} className="hover:underline">
                            {contactInfo.security.email}
                          </a>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                          <a href={`tel:${contactInfo.security.phone.replace(/\s/g, "")}`} className="hover:underline">
                            {contactInfo.security.phone}
                          </a>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{contactInfo.security.hours}</span>
                        </div>
                        <div className="flex items-center">
                          <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{contactInfo.security.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Campus Map</CardTitle>
                  <CardDescription>Find your way around campus</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-muted-foreground mb-2">Campus Map Placeholder</p>
                      <Button variant="outline" size="sm">
                        View Interactive Map
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-muted/30 border rounded-lg p-4">
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <Info className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Need Immediate Assistance?</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      For urgent matters requiring immediate attention, please call our emergency hotline.
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-red-500" />
                      <a href="tel:+254123456999" className="font-medium text-red-500 hover:underline">
                        Emergency Hotline: +254 (0) 123 456 999
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </TabsContent>

        {/* Live Chat Tab */}
        <TabsContent value="chat" className="space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="pb-2 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Support Agent" />
                      <AvatarFallback>SA</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">Student Support</CardTitle>
                      <CardDescription className="text-xs">Chat with our support team</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <RefreshCw className="h-4 w-4" />
                      <span className="sr-only">New Chat</span>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          <span>Copy Chat</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          <span>Export as PDF</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          <span>New Chat</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden p-0">
                <ScrollArea className="h-full">
                  <div className="flex flex-col p-4 space-y-4">
                    {chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                          message.role === "user"
                            ? "ml-auto bg-primary text-primary-foreground max-w-[80%]"
                            : "bg-muted max-w-[80%]",
                        )}
                      >
                        {message.role === "support" && (
                          <div className="flex items-center gap-1 mb-1">
                            <span className="font-medium text-xs">{message.supportName || "Support Agent"}</span>
                            {message.supportRole && (
                              <span className="text-xs text-muted-foreground">({message.supportRole})</span>
                            )}
                          </div>
                        )}
                        <div>{message.content}</div>
                      </div>
                    ))}
                    {isChatTyping && (
                      <div className="flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted">
                        <div className="flex items-center gap-1">
                          <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.3s]"></div>
                          <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce"></div>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="p-3 border-t">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSendChatMessage()
                  }}
                  className="flex w-full items-center space-x-2"
                >
                  <Input
                    id="chat-message"
                    placeholder="Type your message here..."
                    className="flex-1"
                    autoComplete="off"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                  />
                  <Button type="submit" size="icon" disabled={!chatInput.trim() || isChatTyping}>
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </form>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

