import { BarChart3, Mail, MessageSquare, MoreHorizontal, Pause, Play, Users } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

interface CampaignCardProps {
  campaign: {
    id: string
    name: string
    status: string
    stats: {
      leads: number
      emails: number
      replies: number
      meetings: number
    }
    lastUpdated: string
  }
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const replyRate = Math.round((campaign.stats.replies / campaign.stats.emails) * 100) || 0
  const conversionRate = Math.round((campaign.stats.meetings / campaign.stats.replies) * 100) || 0

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{campaign.name}</CardTitle>
            <CardDescription>Updated {campaign.lastUpdated}</CardDescription>
          </div>
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
              <DropdownMenuItem className="text-destructive">Delete campaign</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Leads</span>
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3 text-muted-foreground" />
              <span className="font-medium">{campaign.stats.leads}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Emails</span>
            <div className="flex items-center gap-1">
              <Mail className="h-3 w-3 text-muted-foreground" />
              <span className="font-medium">{campaign.stats.emails}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Replies</span>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3 text-muted-foreground" />
              <span className="font-medium">{campaign.stats.replies}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Meetings</span>
            <div className="flex items-center gap-1">
              <BarChart3 className="h-3 w-3 text-muted-foreground" />
              <span className="font-medium">{campaign.stats.meetings}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Reply rate</span>
            <span className="font-medium">{replyRate}%</span>
          </div>
          <Progress value={replyRate} className="h-1" />

          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Conversion rate</span>
            <span className="font-medium">{conversionRate}%</span>
          </div>
          <Progress value={conversionRate} className="h-1" />
        </div>
      </CardContent>
      <CardFooter className="pt-1">
        <Button variant="outline" size="sm" className="w-full">
          {campaign.status === "active" ? (
            <>
              <Pause className="mr-2 h-3 w-3" />
              Pause Campaign
            </>
          ) : (
            <>
              <Play className="mr-2 h-3 w-3" />
              Resume Campaign
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
