import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/analytics")({
  component: AnalyticsPage,
})

function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Analytics
        </h1>

        <p className="text-sm text-muted-foreground">
          Track your marketing performance and analytics.
        </p>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Analytics page content will go here.
        </p>
      </div>
    </div>
  )
}