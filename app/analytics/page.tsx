import { AnalyticsDashboard } from "@/components/analytics/dashboard"

export default function AnalyticsPage() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Track and analyze your campaign performance</p>
        </div>
      </div>

      <AnalyticsDashboard />
    </div>
  )
}
