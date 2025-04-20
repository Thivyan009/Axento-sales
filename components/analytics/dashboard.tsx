"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { Download, Lightbulb } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

// Sample data for charts
const performanceData = [
  { name: "Jan 1", "Open Rate": 45, "Reply Rate": 12, "Conversion Rate": 4 },
  { name: "Jan 8", "Open Rate": 50, "Reply Rate": 14, "Conversion Rate": 5 },
  { name: "Jan 15", "Open Rate": 48, "Reply Rate": 13, "Conversion Rate": 4.5 },
  { name: "Jan 22", "Open Rate": 52, "Reply Rate": 15, "Conversion Rate": 5.5 },
  { name: "Jan 29", "Open Rate": 55, "Reply Rate": 16, "Conversion Rate": 6 },
  { name: "Feb 5", "Open Rate": 58, "Reply Rate": 18, "Conversion Rate": 7 },
  { name: "Feb 12", "Open Rate": 56, "Reply Rate": 17, "Conversion Rate": 6.5 },
  { name: "Feb 19", "Open Rate": 60, "Reply Rate": 19, "Conversion Rate": 7.5 },
  { name: "Feb 26", "Open Rate": 62, "Reply Rate": 20, "Conversion Rate": 8 },
  { name: "Mar 5", "Open Rate": 65, "Reply Rate": 22, "Conversion Rate": 9 },
  { name: "Mar 12", "Open Rate": 63, "Reply Rate": 21, "Conversion Rate": 8.5 },
  { name: "Mar 19", "Open Rate": 68, "Reply Rate": 24, "Conversion Rate": 10 },
]

const campaignComparisonData = [
  { name: "Q2 SaaS Outreach", "Open Rate": 65, "Reply Rate": 22, "Conversion Rate": 9 },
  { name: "Enterprise Decision Makers", "Open Rate": 58, "Reply Rate": 18, "Conversion Rate": 7 },
  { name: "Fintech CTOs", "Open Rate": 52, "Reply Rate": 15, "Conversion Rate": 5.5 },
  { name: "Healthcare Executives", "Open Rate": 60, "Reply Rate": 19, "Conversion Rate": 7.5 },
  { name: "Marketing Directors", "Open Rate": 56, "Reply Rate": 17, "Conversion Rate": 6.5 },
]

const industryData = [
  { name: "SaaS", value: 35 },
  { name: "Finance", value: 25 },
  { name: "Healthcare", value: 20 },
  { name: "Marketing", value: 15 },
  { name: "Other", value: 5 },
]

const roleData = [
  { name: "CTO", value: 30 },
  { name: "VP of Sales", value: 25 },
  { name: "CEO", value: 20 },
  { name: "Director", value: 15 },
  { name: "Other", value: 10 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

const aiSuggestions = [
  "Try shorter subject lines to improve open rates",
  "Focus on CTOs in Fintech for higher conversion rates",
  "Increase follow-up frequency for Enterprise campaigns",
  "Adjust sending times to mornings for better engagement",
  "Personalize first lines with company-specific information",
]

export function AnalyticsDashboard() {
  const [timeframe, setTimeframe] = useState("3m")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs defaultValue="performance" className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <Select defaultValue="3m" onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="1m">Last month</SelectItem>
              <SelectItem value="3m">Last 3 months</SelectItem>
              <SelectItem value="6m">Last 6 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
            <span className="sr-only">Download data</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">65.2%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Badge variant="outline" className="text-green-600 bg-green-50">
                +5.2%
              </Badge>
              <span className="ml-1">from previous period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reply Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">22.8%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Badge variant="outline" className="text-green-600 bg-green-50">
                +3.1%
              </Badge>
              <span className="ml-1">from previous period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9.5%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Badge variant="outline" className="text-green-600 bg-green-50">
                +1.8%
              </Badge>
              <span className="ml-1">from previous period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.1%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Badge variant="outline" className="text-red-600 bg-red-50">
                +0.3%
              </Badge>
              <span className="ml-1">from previous period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>Track key metrics over time</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={performanceData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Open Rate" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Reply Rate" stroke="#82ca9d" />
                <Line type="monotone" dataKey="Conversion Rate" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Campaign Comparison</CardTitle>
            <CardDescription>Compare performance across campaigns</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={campaignComparisonData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={150} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Open Rate" fill="#8884d8" />
                <Bar dataKey="Reply Rate" fill="#82ca9d" />
                <Bar dataKey="Conversion Rate" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Best Performing Segments</CardTitle>
            <CardDescription>Breakdown by industry and role</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="industry">
              <TabsList className="w-full">
                <TabsTrigger value="industry" className="flex-1">
                  Industry
                </TabsTrigger>
                <TabsTrigger value="role" className="flex-1">
                  Role
                </TabsTrigger>
              </TabsList>
              <TabsContent value="industry" className="h-[350px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={industryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {industryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="role" className="h-[350px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={roleData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {roleData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            AI Suggestions
          </CardTitle>
          <CardDescription>Insights and recommendations to improve your campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {aiSuggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Lightbulb className="h-3 w-3" />
                </div>
                <div>
                  <p className="text-sm">{suggestion}</p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
