import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/security")({
  component: SecurityPage,
})

function SecurityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Security
        </h1>

        <p className="text-sm text-muted-foreground">
          Manage security, access, and protection settings.
        </p>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Security page content will go here.
        </p>
      </div>
    </div>
  )
}