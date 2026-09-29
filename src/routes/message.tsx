import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/message")({
  component: MessagePage,
})

function MessagePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Messages
        </h1>

        <p className="text-sm text-muted-foreground">
          Manage customer conversations and messages.
        </p>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Message page content will go here.
        </p>
      </div>
    </div>
  )
}