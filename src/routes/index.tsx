import { createFileRoute } from "@tanstack/react-router"

import { DashboardStats } from "@/components/dashboard-stats"
import { DashboardCharts } from "@/components/dashboard-charts"
import { DashboardBottom } from "@/components/dashboard-bottom"

export const Route = createFileRoute("/")({
  component: DashboardPage,
})

function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Dashboard
        </h1>

        <p className="text-sm text-muted-foreground">
          Here's an overview of your marketing performance.
        </p>
      </div>

      <DashboardStats />

      <DashboardCharts />

      <DashboardBottom />
    </div>
  )
}