import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardStats } from "@/components/dashboard/stats"
import { CampaignCard } from "@/components/campaigns/campaign-card"

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
  },
]

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <DashboardHeader />
      <DashboardStats />

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Your Campaigns</h2>
        <Button asChild>
          <Link href="/campaigns/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Campaign
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="paused">Paused</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {campaigns
              .filter((campaign) => campaign.status === "active")
              .map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="paused" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {campaigns
              .filter((campaign) => campaign.status === "paused")
              .map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="completed" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="flex h-[220px] items-center justify-center border-dashed">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <p className="text-center text-sm text-muted-foreground">No completed campaigns yet</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
