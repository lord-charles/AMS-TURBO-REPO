"use client"

import type React from "react"

import { useState } from "react"
import { format } from "date-fns"
import { MessageSquare, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

interface CourseDiscussionsProps {
  courseId: string
}

export function CourseDiscussions({ courseId }: CourseDiscussionsProps) {
  const [message, setMessage] = useState("")
  const { toast } = useToast()

  // Mock discussions data
  const discussions = [
    {
      id: "1",
      title: "Assignment 1 Clarification",
      author: "John Doe",
      authorRole: "student",
      date: "2023-11-08T14:30:00",
      content:
        "I'm having trouble understanding the requirements for Question 3 in Assignment 1. The problem asks us to implement a sorting algorithm with O(n log n) time complexity, but doesn't specify which one. Can we choose any algorithm that meets this requirement?",
      replies: [
        {
          id: "1-1",
          author: "Dr. Sarah Johnson",
          authorRole: "instructor",
          date: "2023-11-08T16:45:00",
          content:
            "Good question, John. Yes, you can choose any sorting algorithm that has O(n log n) time complexity. However, I recommend using either Merge Sort or Quick Sort as we've covered these in detail during our lectures. Make sure to explain your choice and analyze its space complexity as well.",
        },
        {
          id: "1-2",
          author: "Jane Smith",
          authorRole: "student",
          date: "2023-11-09T09:15:00",
          content:
            "Thanks for the clarification! I was also confused about this. I'll be using Merge Sort since it guarantees O(n log n) time complexity even in the worst case.",
        },
      ],
    },
    {
      id: "2",
      title: "Study Group for Midterm",
      author: "Emily Chen",
      authorRole: "student",
      date: "2023-11-10T10:20:00",
      content:
        "Would anyone be interested in forming a study group for the upcoming midterm? We could meet in the library or online via Zoom. I'm thinking we could review the material from weeks 1-6 and work through practice problems together.",
      replies: [
        {
          id: "2-1",
          author: "Michael Brown",
          authorRole: "student",
          date: "2023-11-10T11:05:00",
          content:
            "I'm interested! I think meeting in person would be more productive. How about this Saturday at 2 PM in the main library?",
        },
      ],
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      toast({
        title: "Message posted",
        description: "Your message has been posted to the discussion forum.",
      })
      setMessage("")
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Start a New Discussion</CardTitle>
          <CardDescription>
            Ask questions, share resources, or discuss course topics with your classmates and instructor
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="grid w-full gap-1.5">
                <Textarea
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button type="submit" onClick={handleSubmit} disabled={!message.trim()}>
            <Send className="mr-2 h-4 w-4" />
            Post Message
          </Button>
        </CardFooter>
      </Card>

      {discussions.length > 0 ? (
        discussions.map((discussion) => (
          <Card key={discussion.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{discussion.title}</CardTitle>
                <div className="text-sm text-muted-foreground">{format(new Date(discussion.date), "MMM d, yyyy")}</div>
              </div>
              <CardDescription className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={`/placeholder.svg?height=24&width=24`} alt={discussion.author} />
                  <AvatarFallback>
                    {discussion.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span>{discussion.author}</span>
                <Badge variant="outline" className="ml-1 text-xs">
                  {discussion.authorRole === "instructor" ? "Instructor" : "Student"}
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm">{discussion.content}</p>

              {discussion.replies.length > 0 && (
                <div className="mt-4 space-y-4">
                  <Separator />
                  <div className="text-sm font-medium">Replies ({discussion.replies.length})</div>
                  <div className="space-y-4">
                    {discussion.replies.map((reply) => (
                      <div key={reply.id} className="pl-4 border-l-2 border-muted">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={`/placeholder.svg?height=24&width=24`} alt={reply.author} />
                              <AvatarFallback>
                                {reply.author
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{reply.author}</span>
                            <Badge variant="outline" className="ml-1 text-xs">
                              {reply.authorRole === "instructor" ? "Instructor" : "Student"}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {format(new Date(reply.date), "MMM d, yyyy")}
                          </div>
                        </div>
                        <p className="text-sm mt-2">{reply.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                Reply to Discussion
              </Button>
            </CardFooter>
          </Card>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-12 px-4 border rounded-lg bg-muted/30">
          <MessageSquare className="h-12 w-12 text-muted-foreground mb-3" />
          <h3 className="text-lg font-medium">No Discussions</h3>
          <p className="text-sm text-muted-foreground mt-1 text-center">
            There are no discussions for this course yet. Start a new discussion above.
          </p>
        </div>
      )}
    </div>
  )
}

