"use client"

import { useState } from "react"
import {
  Archive,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock,
  Filter,
  MessageSquare,
  MoreHorizontal,
  Search,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample reply data
const replies = [
  {
    id: "1",
    contact: {
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      company: "Acme Inc.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    subject: "Re: Our AI-powered sales solution",
    preview:
      "Thanks for reaching out. I'm interested in learning more about your solution. Could you provide some case studies from companies similar to ours?",
    fullMessage:
      "Thanks for reaching out. I'm interested in learning more about your solution. Could you provide some case studies from companies similar to ours? We're particularly interested in how it might integrate with our existing CRM system.\n\nBest,\nSarah",
    timestamp: "2 hours ago",
    campaign: "Q2 SaaS Outreach",
    status: "new",
    tag: "positive",
    aiSuggestion:
      "Hi Sarah,\n\nThank you for your interest! I'd be happy to share some relevant case studies. We've worked with several companies in your industry, achieving an average of 30% increase in sales efficiency.\n\nRegarding CRM integration, we seamlessly connect with all major platforms including Salesforce, HubSpot, and Pipedrive.\n\nI've attached two case studies to this email. Would you be available for a quick 15-minute call next week to discuss your specific needs?\n\nBest regards,\nJohn",
  },
  {
    id: "2",
    contact: {
      name: "Michael Chen",
      email: "michael.chen@example.com",
      company: "TechCorp",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    subject: "Re: Autonomous sales outreach",
    preview:
      "I'm not the right person for this. You should contact our VP of Sales, Lisa Wong (lisa.wong@example.com).",
    fullMessage:
      "I'm not the right person for this. You should contact our VP of Sales, Lisa Wong (lisa.wong@example.com).\n\nRegards,\nMichael",
    timestamp: "5 hours ago",
    campaign: "Enterprise Decision Makers",
    status: "new",
    tag: "neutral",
    aiSuggestion:
      "Hi Michael,\n\nThank you for pointing me in the right direction. I appreciate your help.\n\nI'll reach out to Lisa directly about our autonomous sales solution.\n\nHave a great day!\n\nBest regards,\nJohn",
  },
  {
    id: "3",
    contact: {
      name: "Alex Rodriguez",
      email: "alex.rodriguez@example.com",
      company: "Global Finance",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    subject: "Re: AI sales assistant for financial services",
    preview: "Please remove me from your email list. We're not interested in your services at this time.",
    fullMessage:
      "Please remove me from your email list. We're not interested in your services at this time.\n\nAlex Rodriguez\nCTO, Global Finance",
    timestamp: "1 day ago",
    campaign: "Fintech CTOs",
    status: "new",
    tag: "negative",
    aiSuggestion:
      "Hi Alex,\n\nI apologize for the inconvenience. I've removed you from our email list as requested.\n\nIf your needs change in the future, please don't hesitate to reach out.\n\nBest regards,\nJohn",
  },
  {
    id: "4",
    contact: {
      name: "Emma Wilson",
      email: "emma.wilson@example.com",
      company: "Healthcare Plus",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    subject: "Re: Streamlining sales processes with AI",
    preview: "This sounds interesting. We're currently evaluating several solutions. What makes yours different?",
    fullMessage:
      "This sounds interesting. We're currently evaluating several solutions. What makes yours different? Also, do you have any experience working with healthcare organizations?\n\nEmma Wilson\nDirector of Operations\nHealthcare Plus",
    timestamp: "3 days ago",
    campaign: "Healthcare Executives",
    status: "replied",
    tag: "positive",
    aiSuggestion:
      "Hi Emma,\n\nThank you for your interest! What sets our solution apart is its 100% autonomous operation - it handles the entire sales process from prospecting to meeting scheduling without human intervention.\n\nWe have extensive experience in healthcare, working with organizations like MedTech Solutions and CareFirst Group, helping them increase their sales efficiency by 40% while maintaining HIPAA compliance.\n\nWould you be available for a brief demo next week? I can show you how we've helped similar healthcare organizations.\n\nBest regards,\nJohn",
  },
  {
    id: "5",
    contact: {
      name: "David Park",
      email: "david.park@example.com",
      company: "Creative Marketing",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    subject: "Re: AI-powered outreach for marketing agencies",
    preview: "I'd like to schedule a demo. Is next Tuesday at 2pm EST available?",
    fullMessage:
      "I'd like to schedule a demo. Is next Tuesday at 2pm EST available?\n\nDavid Park\nCMO\nCreative Marketing",
    timestamp: "4 days ago",
    campaign: "Marketing Directors",
    status: "replied",
    tag: "positive",
    aiSuggestion:
      "Hi David,\n\nGreat to hear from you! Tuesday at 2pm EST works perfectly for me. I've sent you a calendar invitation with the meeting details and Zoom link.\n\nI'm looking forward to showing you how our AI sales assistant can specifically benefit your marketing agency.\n\nPlease let me know if you need to reschedule or have any questions before our meeting.\n\nBest regards,\nJohn",
  },
]

export function RepliesInbox() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedReply, setSelectedReply] = useState(replies[0])
  const [responseText, setResponseText] = useState(replies[0].aiSuggestion)
  const [tagFilter, setTagFilter] = useState("all")

  const filteredReplies = replies.filter((reply) => {
    const matchesSearch =
      reply.contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reply.contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reply.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reply.preview.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTag = tagFilter === "all" || reply.tag === tagFilter

    return matchesSearch && matchesTag
  })

  const handleSelectReply = (reply: (typeof replies)[0]) => {
    setSelectedReply(reply)
    setResponseText(reply.aiSuggestion)
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <div className="md:col-span-1">
        <Card className="h-full">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Inbox</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Filter className="h-4 w-4 mr-1" />
                    Filter
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setTagFilter("all")}>All replies</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTagFilter("positive")}>
                    <ThumbsUp className="h-4 w-4 mr-2 text-green-500" />
                    Positive
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTagFilter("neutral")}>
                    <MessageSquare className="h-4 w-4 mr-2 text-blue-500" />
                    Neutral
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTagFilter("negative")}>
                    <ThumbsDown className="h-4 w-4 mr-2 text-red-500" />
                    Negative
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search replies..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="new">
              <TabsList className="w-full rounded-none border-b bg-transparent p-0">
                <TabsTrigger
                  value="new"
                  className="rounded-none border-b-2 border-b-transparent bg-transparent px-4 py-2 data-[state=active]:border-b-primary data-[state=active]:bg-transparent"
                >
                  New
                </TabsTrigger>
                <TabsTrigger
                  value="replied"
                  className="rounded-none border-b-2 border-b-transparent bg-transparent px-4 py-2 data-[state=active]:border-b-primary data-[state=active]:bg-transparent"
                >
                  Replied
                </TabsTrigger>
                <TabsTrigger
                  value="archived"
                  className="rounded-none border-b-2 border-b-transparent bg-transparent px-4 py-2 data-[state=active]:border-b-primary data-[state=active]:bg-transparent"
                >
                  Archived
                </TabsTrigger>
              </TabsList>
              <TabsContent value="new" className="m-0">
                <div className="divide-y">
                  {filteredReplies
                    .filter((reply) => reply.status === "new")
                    .map((reply) => (
                      <button
                        key={reply.id}
                        className={`w-full cursor-pointer p-4 text-left hover:bg-muted ${selectedReply.id === reply.id ? "bg-muted" : ""}`}
                        onClick={() => handleSelectReply(reply)}
                      >
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={reply.contact.avatar || "/placeholder.svg"} alt={reply.contact.name} />
                            <AvatarFallback>{reply.contact.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1 overflow-hidden">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">{reply.contact.name}</p>
                              <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                            </div>
                            <p className="text-sm font-medium truncate">{reply.subject}</p>
                            <p className="text-xs text-muted-foreground truncate">{reply.preview}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {reply.campaign}
                              </Badge>
                              {reply.tag === "positive" && (
                                <Badge
                                  variant="outline"
                                  className="bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
                                >
                                  <ThumbsUp className="mr-1 h-3 w-3" />
                                  Positive
                                </Badge>
                              )}
                              {reply.tag === "neutral" && (
                                <Badge
                                  variant="outline"
                                  className="bg-blue-50 text-blue-700 hover:bg-blue-50 hover:text-blue-700"
                                >
                                  <MessageSquare className="mr-1 h-3 w-3" />
                                  Neutral
                                </Badge>
                              )}
                              {reply.tag === "negative" && (
                                <Badge
                                  variant="outline"
                                  className="bg-red-50 text-red-700 hover:bg-red-50 hover:text-red-700"
                                >
                                  <ThumbsDown className="mr-1 h-3 w-3" />
                                  Negative
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  {filteredReplies.filter((reply) => reply.status === "new").length === 0 && (
                    <div className="p-4 text-center text-sm text-muted-foreground">No new replies found</div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="replied" className="m-0">
                <div className="divide-y">
                  {filteredReplies
                    .filter((reply) => reply.status === "replied")
                    .map((reply) => (
                      <button
                        key={reply.id}
                        className={`w-full cursor-pointer p-4 text-left hover:bg-muted ${selectedReply.id === reply.id ? "bg-muted" : ""}`}
                        onClick={() => handleSelectReply(reply)}
                      >
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={reply.contact.avatar || "/placeholder.svg"} alt={reply.contact.name} />
                            <AvatarFallback>{reply.contact.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1 overflow-hidden">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">{reply.contact.name}</p>
                              <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                            </div>
                            <p className="text-sm font-medium truncate">{reply.subject}</p>
                            <p className="text-xs text-muted-foreground truncate">{reply.preview}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {reply.campaign}
                              </Badge>
                              <Badge
                                variant="outline"
                                className="bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
                              >
                                <Check className="mr-1 h-3 w-3" />
                                Replied
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  {filteredReplies.filter((reply) => reply.status === "replied").length === 0 && (
                    <div className="p-4 text-center text-sm text-muted-foreground">No replied messages found</div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="archived" className="m-0">
                <div className="p-4 text-center text-sm text-muted-foreground">No archived messages</div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2">
        {selectedReply ? (
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{selectedReply.subject}</CardTitle>
                  <CardDescription>
                    From {selectedReply.contact.name} ({selectedReply.contact.email})
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">More</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Archive className="mr-2 h-4 w-4" />
                      Archive
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ArrowUpRight className="mr-2 h-4 w-4" />
                      Open in CRM
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={selectedReply.contact.avatar || "/placeholder.svg"}
                        alt={selectedReply.contact.name}
                      />
                      <AvatarFallback>{selectedReply.contact.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{selectedReply.contact.name}</p>
                      <p className="text-xs text-muted-foreground">{selectedReply.contact.company}</p>
                    </div>
                  </div>
                  <div className="rounded-md border p-4 whitespace-pre-wrap">{selectedReply.fullMessage}</div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{selectedReply.timestamp}</span>
                    <div className="flex items-center gap-2">
                      {selectedReply.tag === "positive" && (
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
                        >
                          <ThumbsUp className="mr-1 h-3 w-3" />
                          Positive
                        </Badge>
                      )}
                      {selectedReply.tag === "neutral" && (
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700 hover:bg-blue-50 hover:text-blue-700"
                        >
                          <MessageSquare className="mr-1 h-3 w-3" />
                          Neutral
                        </Badge>
                      )}
                      {selectedReply.tag === "negative" && (
                        <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 hover:text-red-700">
                          <ThumbsDown className="mr-1 h-3 w-3" />
                          Negative
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">AI-Suggested Response</h3>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Sparkles className="h-3.5 w-3.5" />
                      Regenerate
                    </Button>
                  </div>
                  <Textarea
                    className="min-h-[200px]"
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Select defaultValue="email">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Response type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Email Response</SelectItem>
                          <SelectItem value="meeting">Schedule Meeting</SelectItem>
                          <SelectItem value="followup">Follow-up Later</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="sm">
                        <Clock className="mr-1 h-4 w-4" />
                        Schedule
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <X className="mr-1 h-4 w-4" />
                        Discard
                      </Button>
                      <Button>
                        <Check className="mr-1 h-4 w-4" />
                        Send Response
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="h-full flex items-center justify-center">
            <CardContent className="text-center p-6">
              <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
              <h3 className="mt-4 text-lg font-medium">No message selected</h3>
              <p className="text-sm text-muted-foreground">Select a message from the inbox to view and respond</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
