import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/customers")({
  component: CustomersPage,
})

function CustomersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Customers
        </h1>

        <p className="text-sm text-muted-foreground">
          Manage and view your customers.
        </p>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Customers page content will go here.
        </p>
      </div>
    </div>
  )
}