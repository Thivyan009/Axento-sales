"use client"

import { useState } from "react"
import { BarChart3, Calendar, Mail, MessageSquare, MoreHorizontal, Pause, Play, Search, Users } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample campaign data
const campaigns = [
  {
    id: "1",
    name: "Q2 SaaS Outreach",
    status: "active",
    stats: {
      leads: 1250,
      emails: 875,
      replies: 142,
      meetings: 28,
    },
    lastUpdated: "2 hours ago",
    createdAt: "2023-04-15",
    schedule: "100 emails/day",
    tone: "Professional",
  },
  {
    id: "2",
    name: "Enterprise Decision Makers",
    status: "active",
    stats: {
      leads: 750,
      emails: 520,
      replies: 87,
      meetings: 15,
    },
    lastUpdated: "5 hours ago",
    createdAt: "2023-04-10",
    schedule: "75 emails/day",
    tone: "Friendly",
  },
  {
    id: "3",
    name: "Fintech CTOs",
    status: "paused",
    stats: {
      leads: 500,
      emails: 320,
      replies: 45,
      meetings: 8,
    },
    lastUpdated: "2 days ago",
    createdAt: "2023-03-28",
    schedule: "50 emails/day",
    tone: "Professional",
  },
  {
    id: "4",
    name: "Healthcare Executives",
    status: "active",
    stats: {
      leads: 350,
      emails: 210,
      replies: 32,
      meetings: 5,
    },
    lastUpdated: "1 day ago",
    createdAt: "2023-04-05",
    schedule: "40 emails/day",
    tone: "Witty",
  },
  {
    id: "5",
    name: "Marketing Directors",
    status: "paused",
    stats: {
      leads: 425,
      emails: 280,
      replies: 38,
      meetings: 7,
    },
    lastUpdated: "3 days ago",
    createdAt: "2023-03-20",
    schedule: "60 emails/day",
    tone: "Friendly",
  },
]

export function CampaignList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <Card>
      <CardHeader className="pb-1">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>All Campaigns</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search campaigns..."
                className="w-full pl-8 sm:w-[200px] lg:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Created</TableHead>
                <TableHead className="hidden md:table-cell">Schedule</TableHead>
                <TableHead className="hidden lg:table-cell">Leads</TableHead>
                <TableHead className="hidden lg:table-cell">Emails</TableHead>
                <TableHead className="hidden lg:table-cell">Replies</TableHead>
                <TableHead className="hidden lg:table-cell">Meetings</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCampaigns.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center">
                    No campaigns found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredCampaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell className="font-medium">
                      <Link href={`/campaigns/${campaign.id}`} className="hover:underline">
                        {campaign.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge variant={campaign.status === "active" ? "default" : "secondary"}>
                        {campaign.status === "active" ? (
                          <span className="flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                            Active
                          </span>
                        ) : (
                          "Paused"
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        {campaign.createdAt}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{campaign.schedule}</TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5 text-muted-foreground" />
                        {campaign.stats.leads}
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                        {campaign.stats.emails}
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
                        {campaign.stats.replies}
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex items-center gap-1">
                        <BarChart3 className="h-3.5 w-3.5 text-muted-foreground" />
                        {campaign.stats.meetings}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Link href={`/campaigns/${campaign.id}`} className="flex w-full">
                              View details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Edit campaign</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            {campaign.status === "active" ? (
                              <span className="flex items-center gap-2">
                                <Pause className="h-4 w-4" />
                                Pause campaign
                              </span>
                            ) : (
                              <span className="flex items-center gap-2">
                                <Play className="h-4 w-4" />
                                Resume campaign
                              </span>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete campaign</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
