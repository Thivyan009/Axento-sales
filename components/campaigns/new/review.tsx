"use client"

import { Check, Mail, Calendar } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface CampaignReviewProps {
  data: {
    name: string
    tone: string
    emailPitch: string
    schedule: {
      emailsPerDay: number
      startDate: Date
    }
    leadFilters: {
      roles: string[]
      locations: string[]
      fundingStage: string[]
    }
    link: string
  }
}

export function CampaignReview({ data }: CampaignReviewProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Campaign Summary</h3>
        <p className="text-sm text-muted-foreground">Review your campaign details before launching</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Campaign Details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Name</dt>
                <dd className="mt-1">{data.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Tone</dt>
                <dd className="mt-1 capitalize">{data.tone}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Schedule</dt>
                <dd className="mt-1">
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{data.schedule.emailsPerDay} emails/day</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Starting {data.schedule.startDate.toLocaleDateString()}</span>
                  </div>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Link</dt>
                <dd className="mt-1 truncate">
                  <a
                    href={data.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {data.link}
                  </a>
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Target Audience</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Roles</dt>
                <dd className="mt-1">
                  <div className="flex flex-wrap gap-1">
                    {data.leadFilters.roles.map((role) => (
                      <Badge key={role} variant="secondary">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Locations</dt>
                <dd className="mt-1">
                  <div className="flex flex-wrap gap-1">
                    {data.leadFilters.locations.map((location) => (
                      <Badge key={location} variant="secondary">
                        {location}
                      </Badge>
                    ))}
                  </div>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Funding Stages</dt>
                <dd className="mt-1">
                  <div className="flex flex-wrap gap-1">
                    {data.leadFilters.fundingStage.length > 0 ? (
                      data.leadFilters.fundingStage.map((stage) => (
                        <Badge key={stage} variant="secondary" className="capitalize">
                          {stage.replace("-", " ")}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">All funding stages</span>
                    )}
                  </div>
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Email Preview</CardTitle>
          <CardDescription>This is how your email will look to recipients</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border p-4 whitespace-pre-wrap">{data.emailPitch}</div>
        </CardContent>
      </Card>

      <div className="rounded-md border border-green-200 bg-green-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <Check className="h-5 w-5 text-green-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">Ready to launch</h3>
            <div className="mt-2 text-sm text-green-700">
              <p>Your campaign is ready to be launched. Our AI will:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Find leads matching your criteria using Apollo.io</li>
                <li>Send personalized emails at your specified rate</li>
                <li>Automatically respond to replies using our AI assistant</li>
                <li>Book meetings or drive sales based on your goal</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
