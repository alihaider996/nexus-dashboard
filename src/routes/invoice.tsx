import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/invoice")({
  component: InvoicePage,
})

function InvoicePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Invoices
        </h1>

        <p className="text-sm text-muted-foreground">
          Create, manage, and track your invoices.
        </p>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Invoice page content will go here.
        </p>
      </div>
    </div>
  )
}