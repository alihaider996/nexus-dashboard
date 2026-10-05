import { useMemo, useState } from "react"

import { createFileRoute } from "@tanstack/react-router"

import {
  ArrowDownAZ,
  ArrowUpAZ,
  Check,
  Grid2X2,
  List,
  Mail,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Input } from "@/components/ui/input"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export const Route = createFileRoute("/customers")({
  component: CustomersPage,
})

type Plan = "Premium" | "Standard" | "Lite"

type Customer = {
  id: number
  name: string
  email: string
  dateJoined: string
  dateValue: number
  plan: Plan
  initials: string
  image: string
}

const initialCustomers: Customer[] = [
  {
    id: 1,
    name: "Jaydon Carder",
    email: "jaydon@example.com",
    dateJoined: "28.12.2022",
    dateValue: 20221228,
    plan: "Premium",
    initials: "JC",
    image: "https://i.pravatar.cc/100?img=12",
  },
  {
    id: 2,
    name: "Maria George",
    email: "maria@example.com",
    dateJoined: "26.12.2022",
    dateValue: 20221226,
    plan: "Standard",
    initials: "MG",
    image: "https://i.pravatar.cc/100?img=47",
  },
  {
    id: 3,
    name: "Emerson Calzoni",
    email: "emerson@example.com",
    dateJoined: "22.12.2022",
    dateValue: 20221222,
    plan: "Standard",
    initials: "EC",
    image: "https://i.pravatar.cc/100?img=68",
  },
  {
    id: 4,
    name: "Kadin Ekstrom Bothman",
    email: "kadin@example.com",
    dateJoined: "18.12.2022",
    dateValue: 20221218,
    plan: "Standard",
    initials: "KB",
    image: "https://i.pravatar.cc/100?img=32",
  },
  {
    id: 5,
    name: "Laura Donin",
    email: "laura@example.com",
    dateJoined: "12.12.2022",
    dateValue: 20221212,
    plan: "Premium",
    initials: "LD",
    image: "https://i.pravatar.cc/100?img=44",
  },
  {
    id: 6,
    name: "Greta David",
    email: "greta@example.com",
    dateJoined: "05.12.2022",
    dateValue: 20221205,
    plan: "Lite",
    initials: "GD",
    image: "https://i.pravatar.cc/100?img=49",
  },
  {
    id: 7,
    name: "Alfonso Madsen Gonzalez",
    email: "alfonso@example.com",
    dateJoined: "05.12.2022",
    dateValue: 20221205,
    plan: "Standard",
    initials: "AM",
    image: "https://i.pravatar.cc/100?img=11",
  },
  {
    id: 8,
    name: "Wilson Dias",
    email: "wilson@example.com",
    dateJoined: "03.12.2022",
    dateValue: 20221203,
    plan: "Premium",
    initials: "WD",
    image: "https://i.pravatar.cc/100?img=15",
  },
  {
    id: 9,
    name: "Ellie Bothosh Merino",
    email: "ellie@example.com",
    dateJoined: "01.12.2022",
    dateValue: 20221201,
    plan: "Standard",
    initials: "EB",
    image: "https://i.pravatar.cc/100?img=25",
  },
  {
    id: 10,
    name: "Nolan Herwitz",
    email: "nolan@example.com",
    dateJoined: "28.11.2022",
    dateValue: 20221128,
    plan: "Lite",
    initials: "NH",
    image: "https://i.pravatar.cc/100?img=13",
  },
  {
    id: 11,
    name: "Gretchen Bergson",
    email: "gretchen@example.com",
    dateJoined: "27.11.2022",
    dateValue: 20221127,
    plan: "Standard",
    initials: "GB",
    image: "https://i.pravatar.cc/100?img=45",
  },
]

const avatarStyles = [
  "bg-[#DCE7FF] text-[#3159B7]",
  "bg-[#FFE5B5] text-[#A65D00]",
  "bg-[#EDEDED] text-[#4A4A4A]",
  "bg-[#F5D7C8] text-[#8E4D32]",
  "bg-[#FFD8E9] text-[#B32D68]",
  "bg-[#E4F0D8] text-[#4E7A35]",
]

function planClass(plan: Plan) {
  if (plan === "Premium") {
    return "border-0 bg-[#F4B5D2] text-[#8B1550]"
  }

  if (plan === "Lite") {
    return "border-0 bg-[#DCC4FF] text-[#6334A0]"
  }

  return "border-0 bg-[#DCE3E8] text-[#53616B]"
}

function CustomersPage() {
  const [customers, setCustomers] = useState(initialCustomers)

  const [search, setSearch] = useState("")

  const [view, setView] = useState<"list" | "grid">("grid")

  const [sort, setSort] = useState<"newest" | "oldest" | "name">("newest")

  const [filter, setFilter] = useState<"all" | Plan>("all")

  const [selected, setSelected] = useState<number[]>([])

  const [addOpen, setAddOpen] = useState(false)

  const [name, setName] = useState("")

  const [email, setEmail] = useState("")

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase()

    const result = customers.filter(
      (c) =>
        (!q ||
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q)) &&
        (filter === "all" || c.plan === filter),
    )

    return [...result].sort((a, b) =>
      sort === "name"
        ? a.name.localeCompare(b.name)
        : sort === "oldest"
          ? a.dateValue - b.dateValue
          : b.dateValue - a.dateValue,
    )
  }, [customers, search, sort, filter])

  const allSelected =
    visible.length > 0 &&
    visible.every((c) => selected.includes(c.id))

  const toggle = (id: number) =>
    setSelected((s) =>
      s.includes(id)
        ? s.filter((x) => x !== id)
        : [...s, id],
    )

  const toggleAll = () =>
    setSelected(
      allSelected
        ? selected.filter(
            (id) => !visible.some((c) => c.id === id),
          )
        : [
            ...new Set([
              ...selected,
              ...visible.map((c) => c.id),
            ]),
          ],
    )

  function addCustomer() {
    const cleanName = name.trim()

    if (!cleanName) return

    const initials = cleanName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((x) => x[0])
      .join("")
      .toUpperCase()

    setCustomers((current) => [
      {
        id: Date.now(),
        name: cleanName,
        email: email.trim() || "customer@example.com",
        dateJoined: "30.09.2026",
        dateValue: 20260930,
        plan: "Standard",
        initials,
        image: `https://i.pravatar.cc/100?u=${Date.now()}`,
      },
      ...current,
    ])

    setName("")
    setEmail("")
    setAddOpen(false)
  }

  return (
    <div className="mx-auto w-full max-w-[1220px]">
      {/* Main Customer Container */}
      <Card className="border-border bg-card shadow-none">
        <CardContent className="p-5 md:p-6">

          {/* =====================================================
              HEADER
          ===================================================== */}

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-[24px] font-semibold tracking-tight text-foreground">
                Customers
              </h1>

              <p className="mt-1 text-[11px] text-muted-foreground">
                Manage and view your customers.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative w-full sm:w-[220px]">
                <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />

                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search"
                  className="h-8 pl-9 text-[10px]"
                />
              </div>

              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-8"
                  >
                    <Mail className="size-3.5" />
                  </Button>
                </TooltipTrigger>

                <TooltipContent>
                  Notifications
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                {/* <TooltipTrigger>
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-8"
                  >
                    <List className="size-3.5" />
                  </Button>
                </TooltipTrigger> */}

                <TooltipContent>
                  Customer options
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* =====================================================
              FILTERS / ACTIONS
          ===================================================== */}

          <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">

              {/* Sort */}
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button
                    variant="outline"
                    className="h-8 gap-1.5 px-2.5 text-[10px]"
                  >
                    {sort === "oldest" ? (
                      <ArrowUpAZ className="size-3.5" />
                    ) : (
                      <ArrowDownAZ className="size-3.5" />
                    )}

                    Sort by
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="start">
                  <DropdownMenuItem
                    onClick={() => setSort("newest")}
                  >
                    Newest first
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => setSort("oldest")}
                  >
                    Oldest first
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => setSort("name")}
                  >
                    Name A-Z
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button
                    variant={
                      filter !== "all"
                        ? "default"
                        : "outline"
                    }
                    className="h-8 gap-1.5 px-2.5 text-[10px]"
                  >
                    <SlidersHorizontal className="size-3.5" />

                    Filter

                    {filter !== "all" && (
                      <span className="rounded-full bg-white/20 px-1.5">
                        {filter}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="start">
                  <DropdownMenuItem
                    onClick={() => setFilter("all")}
                  >
                    All plans
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => setFilter("Premium")}
                  >
                    Premium
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => setFilter("Standard")}
                  >
                    Standard
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => setFilter("Lite")}
                  >
                    Lite
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {filter !== "all" && (
                <Button
                  variant="ghost"
                  className="h-8 px-2 text-[10px]"
                  onClick={() => setFilter("all")}
                >
                  <X className="mr-1 size-3" />
                  Clear
                </Button>
              )}
            </div>

            {/* View + Add */}
            <div className="flex items-center gap-2">

              <div className="flex rounded-md border border-border bg-muted/30 p-0.5">
                <Button
                  variant={
                    view === "grid"
                      ? "secondary"
                      : "ghost"
                  }
                  size="icon"
                  className="size-7"
                  onClick={() => setView("grid")}
                >
                  <Grid2X2 className="size-3.5" />
                </Button>

                <Button
                  variant={
                    view === "list"
                      ? "secondary"
                      : "ghost"
                  }
                  size="icon"
                  className="size-7"
                  onClick={() => setView("list")}
                >
                  <List className="size-3.5" />
                </Button>
              </div>

              <Button
                className="h-8 gap-1.5 bg-[#F5C52B] px-3 text-[10px] text-[#171717] hover:bg-[#E8B91F]"
                onClick={() => setAddOpen(true)}
              >
                <Plus className="size-3.5" />
                Add New Customer
              </Button>
            </div>
          </div>

          {/* =====================================================
              SELECTION BAR
          ===================================================== */}

          {selected.length > 0 && (
            <div className="mt-3 flex items-center justify-between rounded-md bg-muted px-3 py-2">
              <p className="text-[10px] font-medium text-foreground">
                {selected.length} customer
                {selected.length > 1 ? "s" : ""} selected
              </p>

              <Button
                variant="ghost"
                className="h-6 px-2 text-[9px]"
                onClick={() => setSelected([])}
              >
                Clear selection
              </Button>
            </div>
          )}

          {/* =====================================================
              LIST VIEW
          ===================================================== */}

          {view === "list" ? (
            <div className="mt-4 overflow-hidden rounded-xl border border-border">
              <Table>

                <TableHeader>
                  <TableRow className="bg-muted hover:bg-muted">
                    <TableHead className="w-10 px-3">
                      <Checkbox
                        checked={allSelected}
                        onCheckedChange={toggleAll}
                        aria-label="Select all customers"
                      />
                    </TableHead>

                    <TableHead className="text-[9px]">
                      Name
                    </TableHead>

                    <TableHead className="text-[9px]">
                      Date joined
                    </TableHead>

                    <TableHead className="text-[9px]">
                      Plan
                    </TableHead>

                    <TableHead className="text-right text-[9px]">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {visible.map((customer, index) => (
                    <TableRow key={customer.id}>

                      <TableCell className="px-3">
                        <Checkbox
                          checked={selected.includes(customer.id)}
                          onCheckedChange={() =>
                            toggle(customer.id)
                          }
                        />
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2.5">
                          <Avatar className="size-7">
                            <AvatarFallback
                              className={`text-[9px] font-medium ${
                                avatarStyles[
                                  index %
                                    avatarStyles.length
                                ]
                              }`}
                            >
                              {customer.initials}
                            </AvatarFallback>
                          </Avatar>

                          <div className="min-w-0">
                            <p className="truncate text-[10px] font-medium text-foreground">
                              {customer.name}
                            </p>

                            <p className="truncate text-[8px] text-muted-foreground">
                              {customer.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="text-[9px] text-muted-foreground">
                        {customer.dateJoined}
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`rounded-full px-2 py-0.5 text-[8px] ${planClass(
                            customer.plan,
                          )}`}
                        >
                          {customer.plan}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <div className="flex justify-end gap-1">

                          <Tooltip>
                            <TooltipTrigger>
                              <Button
                                variant="outline"
                                size="icon"
                                className="size-7"
                                onClick={() =>
                                  window.alert(
                                    `Call ${customer.name}`,
                                  )
                                }
                              >
                                <Phone className="size-3" />
                              </Button>
                            </TooltipTrigger>

                            <TooltipContent>
                              Call customer
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger>
                              <Button
                                variant="outline"
                                size="icon"
                                className="size-7"
                                onClick={() =>
                                  window.alert(
                                    `Email ${customer.email}`,
                                  )
                                }
                              >
                                <Mail className="size-3" />
                              </Button>
                            </TooltipTrigger>

                            <TooltipContent>
                              Send email
                            </TooltipContent>
                          </Tooltip>

                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <Button
                                variant="outline"
                                size="icon"
                                className="size-7"
                              >
                                <MoreHorizontal className="size-3" />
                              </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                View customer
                              </DropdownMenuItem>

                              <DropdownMenuItem>
                                Edit customer
                              </DropdownMenuItem>

                              <DropdownMenuItem>
                                View transactions
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>

              </Table>
            </div>
          ) : (

            /* ===================================================
               GRID VIEW
            =================================================== */

            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {visible.map((customer, index) => (
                <Card
                  key={customer.id}
                  className="
                    group
                    min-h-[210px]
                    rounded-2xl
                    border-border
                    bg-card
                    text-card-foreground
                    shadow-[0_1px_3px_rgba(15,23,42,0.04)]
                    transition-shadow
                    hover:shadow-md
                  "
                >
                  <CardContent className="flex h-full flex-col p-4">

                    {/* Customer Header */}
                    <div className="flex items-start justify-between gap-2">

                      <div className="flex min-w-0 items-center gap-3">

                        <Checkbox
                          checked={selected.includes(customer.id)}
                          onCheckedChange={() =>
                            toggle(customer.id)
                          }
                          className="size-5 shrink-0 rounded-md"
                        />

                        <Avatar className="size-10 shrink-0">
                          <AvatarImage
                            src={customer.image}
                            alt={customer.name}
                          />

                          <AvatarFallback
                            className={`text-[10px] font-semibold ${
                              avatarStyles[
                                index %
                                  avatarStyles.length
                              ]
                            }`}
                          >
                            {customer.initials}
                          </AvatarFallback>
                        </Avatar>

                        <div className="min-w-0">
                          <p className="truncate text-[12px] font-semibold text-foreground">
                            {customer.name}
                          </p>

                          <p className="mt-0.5 text-[10px] text-muted-foreground">
                            {customer.dateJoined}
                          </p>
                        </div>
                      </div>

                      <Badge
                        variant="outline"
                        className={`rounded-full px-2.5 py-1 text-[8px] font-medium ${planClass(
                          customer.plan,
                        )}`}
                      >
                        {customer.plan}
                      </Badge>
                    </div>

                    {/* Description */}
                    <p className="mt-7 min-h-[38px] text-[10px] leading-relaxed text-muted-foreground">
                      User&apos;s description around their case or
                      business insurance.
                    </p>

                    {/* Actions */}
                    <div className="mt-auto flex items-center justify-between border-t border-border pt-3">

                      <div className="flex items-center gap-2">

                        <Button
                          variant="ghost"
                          size="icon"
                          className="
                            size-9
                            rounded-xl
                            border
                            border-border
                            bg-background
                            text-foreground
                            hover:bg-muted
                          "
                          onClick={() =>
                            window.alert(
                              `Call ${customer.name}`,
                            )
                          }
                        >
                          <Phone className="size-3" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="
                            size-9
                            rounded-xl
                            border
                            border-border
                            bg-background
                            text-foreground
                            hover:bg-muted
                          "
                          onClick={() =>
                            window.alert(
                              `Email ${customer.email}`,
                            )
                          }
                        >
                          <Mail className="size-3" />
                        </Button>

                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="
                              size-9
                              rounded-xl
                              border
                              border-border
                              bg-background
                              text-foreground
                              hover:bg-muted
                            "
                          >
                            <MoreHorizontal className="size-3" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            View customer
                          </DropdownMenuItem>

                          <DropdownMenuItem>
                            Edit customer
                          </DropdownMenuItem>

                          <DropdownMenuItem>
                            View transactions
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* =====================================================
              EMPTY STATE
          ===================================================== */}

          {visible.length === 0 && (
            <div className="mt-4 rounded-xl border border-dashed border-border p-10 text-center">
              <p className="text-sm font-medium text-foreground">
                No customers found
              </p>

              <p className="mt-1 text-[10px] text-muted-foreground">
                Try another search or clear the filter.
              </p>
            </div>
          )}

          {/* =====================================================
              FOOTER
          ===================================================== */}

          <div className="mt-4 flex items-center justify-between text-[9px] text-muted-foreground">
            <span>
              Showing {visible.length} of {customers.length} customers
            </span>

            {selected.length > 0 && (
              <span className="flex items-center gap-1 text-foreground">
                <Check className="size-3" />
                {selected.length} selected
              </span>
            )}
          </div>

        </CardContent>
      </Card>

      {/* =======================================================
          ADD CUSTOMER DIALOG
      ======================================================= */}

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="sm:max-w-[430px]">

          <DialogHeader>
            <DialogTitle>
              Add New Customer
            </DialogTitle>

            <DialogDescription>
              Add a new customer to your Nexus customer list.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3 py-2">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Customer name"
            />

            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              type="email"
            />
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setAddOpen(false)}
            >
              Cancel
            </Button>

            <Button
              disabled={!name.trim()}
              className="bg-[#110E29] text-white hover:bg-[#110E29]/90"
              onClick={addCustomer}
            >
              Add Customer
            </Button>
          </DialogFooter>

        </DialogContent>
      </Dialog>
    </div>
  )
}