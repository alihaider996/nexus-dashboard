import type { ReactNode } from "react"

import {
  Download,
  Filter,
  Search,
} from "lucide-react"

import { useLocation } from "@tanstack/react-router"

import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"
import { ThemeSwitch } from "@/components/theme-switch"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

type DashboardLayoutProps = {
  children: ReactNode
}

export function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const location = useLocation()

  const pageTitles: Record<string, string> = {
    "/": "Dashboard",
    "/payments": "Payments",
    "/customers": "Customers",
    "/message": "Message",
    "/onboarding": "Onboarding",
    "/product": "Products",
    "/invoice": "Invoices",
    "/analytics": "Analytics",
    "/automation": "Automation",
    "/settings": "Settings",
    "/security": "Security",
    "/help": "Help",
  }

  const currentPage =
    pageTitles[location.pathname] ?? "Dashboard"

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <Header>
          <div className="flex w-full items-center justify-between gap-4">

            {/* Left Side */}
            <div className="flex items-center gap-4">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <span className="text-muted-foreground">
                      Nexus
                    </span>
                  </BreadcrumbItem>

                  <BreadcrumbSeparator className="hidden md:block" />

                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      {currentPage}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-2">

              {/* Search */}
              <div className="relative hidden lg:block">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  placeholder="Search..."
                  className="w-[220px] pl-9"
                />
              </div>

              {/* Filter */}
              <Button
                variant="outline"
                size="icon"
              >
                <Filter className="size-4" />
              </Button>

              {/* Export */}
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex"
              >
                <Download className="mr-2 size-4" />
                Export
              </Button>

              {/* Theme Switch */}
              <ThemeSwitch />

            </div>
          </div>
        </Header>

        <main className="flex flex-1 flex-col gap-4 p-4 md:p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}