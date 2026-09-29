import {
  createRootRoute,
  Outlet,
} from "@tanstack/react-router"

import { DashboardLayout } from "@/components/dashboard-layout"

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  )
}