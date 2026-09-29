import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/automation")({
  component: AutomationPage,
})

function AutomationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Automation
        </h1>

        <p className="text-sm text-muted-foreground">
          Manage your automated workflows and processes.
        </p>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Automation page content will go here.
        </p>
      </div>
    </div>
  )
}