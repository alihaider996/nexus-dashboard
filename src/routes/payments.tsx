import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/payments")({
  component: PaymentsPage,
})

function PaymentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Payments
        </h1>

        <p className="text-sm text-muted-foreground">
          Manage and monitor your payment activity.
        </p>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Payments page content will go here.
        </p>
      </div>
    </div>
  )
}