import { Download, Filter, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

export function DashboardHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      {/* Sidebar Toggle */}
      <SidebarTrigger className="-ml-1" />

      <Separator
        orientation="vertical"
        className="mr-2 h-4"
      />

      {/* Search */}
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          placeholder="Search..."
          className="h-9 pl-9"
        />
      </div>

      {/* Header Actions */}
      <div className="ml-auto flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="hidden sm:flex"
        >
          Oct 18 - Nov 18
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="hidden sm:flex"
        >
          Monthly
        </Button>

        <Button variant="outline" size="sm">
          <Filter />
          <span className="hidden sm:inline">Filter</span>
        </Button>

        <Button variant="outline" size="sm">
          <Download />
          <span className="hidden sm:inline">Export</span>
        </Button>
      </div>
    </header>
  )
}