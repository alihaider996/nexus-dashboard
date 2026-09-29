import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/product")({
  component: ProductPage,
})

function ProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Products
        </h1>

        <p className="text-sm text-muted-foreground">
          Manage your products and product information.
        </p>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Product page content will go here.
        </p>
      </div>
    </div>
  )
}