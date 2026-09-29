import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/help")({
  component: HelpPage,
})

function HelpPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Help & Support
        </h1>

        <p className="text-sm text-muted-foreground">
          Find answers and get support for your Nexus workspace.
        </p>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Help and support content will go here.
        </p>
      </div>
    </div>
  )
}