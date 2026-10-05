import { createFileRoute } from "@tanstack/react-router"

import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  CreditCard,
  Dumbbell,
  FileText,
  Home,
  Plane,
  Receipt,
  RefreshCw,
  Stethoscope,
  Ticket,
  WalletCards,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export const Route = createFileRoute("/payments")({
  component: PaymentsPage,
})

/* =========================================================
   TRANSACTIONS
========================================================= */

const transactions = [
  {
    name: "Medical Appointment",
    description: "Routine check-up",
    status: "Completed",
    amount: "$150",
    method: "PayPal",
    icon: Stethoscope,
  },
  {
    name: "Membership Renewal",
    description: "Streaming service auto-renewal",
    status: "Pending",
    amount: "$200",
    method: "Visa",
    icon: RefreshCw,
  },
  {
    name: "Air Tickets",
    description: "London to USA",
    status: "Completed",
    amount: "$189",
    method: "American Express",
    icon: Plane,
  },
  {
    name: "Fitness Subscription",
    description: "Monthly fee",
    status: "Failed",
    amount: "$1,250",
    method: "Stripe",
    icon: Dumbbell,
  },
  {
    name: "Stylish Home Accents",
    description: "Home Furnishings",
    status: "Archived",
    amount: "$175",
    method: "PayPal",
    icon: Home,
  },
]

/* =========================================================
   QUICK ACTIONS
========================================================= */

const quickActions = [
  {
    title: "Transfer",
    icon: ArrowUpRight,
  },
  {
    title: "Received",
    icon: Receipt,
  },
  {
    title: "Invoices",
    icon: FileText,
  },
  {
    title: "Ticket",
    icon: Ticket,
  },
]

/* =========================================================
   STATUS STYLES
========================================================= */

function statusClass(status: string) {
  if (status === "Completed") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
  }

  if (status === "Pending") {
    return "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-300"
  }

  if (status === "Failed") {
    return "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950/40 dark:text-orange-300"
  }

  return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300"
}

/* =========================================================
   PAYMENTS PAGE
========================================================= */

function PaymentsPage() {
  return (
    <div className="mx-auto w-full max-w-[1250px]">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">

        {/* =================================================
            CENTER / MAIN CONTENT
        ================================================= */}

        <div className="min-w-0 space-y-4">

          {/* =================================================
              STATS
          ================================================= */}

          <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-4">

            {/* Total Payments */}

            <Card className="border-0 bg-[#E9F0FF] shadow-none dark:bg-[#20283A]">
              <CardContent className="p-3">

                <CreditCard className="size-3.5 text-[#002BDF]" />

                <p className="mt-3 text-[9px] text-muted-foreground">
                  Total Payments
                </p>

                <p className="mt-0.5 text-[15px] font-semibold text-foreground">
                  $3,800
                </p>

              </CardContent>
            </Card>

            {/* Received Payments */}

            <Card className="border-0 bg-[#F0E9FF] shadow-none dark:bg-[#2A223D]">
              <CardContent className="p-3">

                <WalletCards className="size-3.5 text-violet-600" />

                <p className="mt-3 text-[9px] text-muted-foreground">
                  Received Payments
                </p>

                <p className="mt-0.5 text-[15px] font-semibold text-foreground">
                  $5,200
                </p>

              </CardContent>
            </Card>

            {/* Monthly Expenditure */}

            <Card className="border-0 bg-[#FFF0E8] shadow-none dark:bg-[#3A2920]">
              <CardContent className="p-3">

                <Receipt className="size-3.5 text-orange-500" />

                <p className="mt-3 text-[9px] text-muted-foreground">
                  Monthly Expenditure
                </p>

                <p className="mt-0.5 text-[15px] font-semibold text-foreground">
                  $9,500
                </p>

              </CardContent>
            </Card>

            {/* Pending Payments */}

            <Card className="border-0 bg-[#E8F5EC] shadow-none dark:bg-[#20352A]">
              <CardContent className="p-3">

                <WalletCards className="size-3.5 text-emerald-600" />

                <p className="mt-3 text-[9px] text-muted-foreground">
                  Pending Payments
                </p>

                <p className="mt-0.5 text-[15px] font-semibold text-foreground">
                  $2,000
                </p>

              </CardContent>
            </Card>

          </div>

          {/* =================================================
              TRANSACTION LOG
          ================================================= */}

          <Card className="border-border bg-card shadow-sm">

            <CardHeader className="px-5 pb-3 pt-5">

              <div className="flex items-center justify-between">

                <div>

                  <CardTitle className="text-[20px] font-bold tracking-tight text-foreground">
                    Transaction Log
                  </CardTitle>

                  <p className="mt-1 text-[10px] text-muted-foreground">
                    View all recent transactions, payments, and charges.
                  </p>

                </div>

                <Button
                  variant="ghost"
                  className="h-7 px-1.5 text-[9px] text-foreground"
                >
                  View all transactions

                  <ArrowRight className="ml-1.5 size-3" />
                </Button>

              </div>

            </CardHeader>

            <CardContent className="space-y-2 px-4 pb-4 pt-0">

              {transactions.map((transaction) => {
                const Icon = transaction.icon

                return (
                  <div
                    key={transaction.name}
                    className="flex min-h-[58px] items-center gap-3 rounded-xl border border-border bg-background px-3.5 py-2.5 transition-colors hover:bg-muted"
                  >

                    {/* Transaction Icon */}

                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-muted">
                      <Icon className="size-4 text-foreground" />
                    </div>

                    {/* Transaction Details */}

                    <div className="min-w-0 flex-1">

                      <p className="truncate text-[11px] font-medium text-foreground">
                        {transaction.name}
                      </p>

                      <p className="mt-0.5 truncate text-[9px] text-muted-foreground">
                        {transaction.description}
                      </p>

                    </div>

                    {/* Status */}

                    <Badge
                      variant="outline"
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[8px] font-medium ${statusClass(
                        transaction.status,
                      )}`}
                    >
                      <span className="mr-1 size-1.5 rounded-full bg-current" />

                      {transaction.status}
                    </Badge>

                    {/* Amount */}

                    <div className="w-[70px] shrink-0 text-right">

                      <p className="text-[11px] font-semibold text-foreground">
                        {transaction.amount}
                      </p>

                      <p className="mt-0.5 text-[8px] text-muted-foreground">
                        {transaction.method}
                      </p>

                    </div>

                  </div>
                )
              })}

            </CardContent>
          </Card>

          {/* =================================================
              ANNOUNCEMENT
          ================================================= */}

          <Card className="overflow-hidden border-0 bg-gradient-to-r from-[#F7F7F8] via-[#EAF8EF] to-[#B3E1BD] shadow-none dark:from-[#16181D] dark:via-[#17321F] dark:to-[#2A5A3A]">

            <CardContent className="flex min-h-[88px] items-center justify-between gap-4 px-6 py-4">

              <p className="text-[17px] font-medium tracking-tight text-[#0A0C14] dark:text-white">
                Paystay 2.0 will launch on July 25th.
              </p>

              <Button
                variant="outline"
                className="h-9 shrink-0 rounded-full border-[#D9D9D9] bg-white px-4 text-[10px] font-medium text-[#111827] shadow-sm hover:bg-white dark:border-[#45454D] dark:bg-[#202126] dark:text-white dark:hover:bg-[#2A2A31]"
              >
                <Bell className="mr-1.5 size-3.5" />
                Create a reminder
              </Button>

            </CardContent>
          </Card>

        </div>

        {/* =================================================
            RIGHT PANEL
        ================================================= */}

        <div className="space-y-4">

          {/* =================================================
              VISA CARD
          ================================================= */}

          <div className="relative h-[155px] overflow-hidden rounded-xl bg-[#080A4A] p-4 text-white shadow-sm">

            {/* Background Glow */}

            <div className="absolute -right-16 -top-16 size-52 rounded-full bg-blue-700/20 blur-2xl" />

            {/* Blue Bars */}

            <div className="absolute inset-x-0 top-[55px] flex items-center justify-center gap-2 opacity-90">

              <div className="h-8 w-2.5 rounded-full bg-blue-800" />
              <div className="h-14 w-3 rounded-full bg-blue-700" />
              <div className="h-20 w-4 rounded-full bg-blue-600" />
              <div className="h-32 w-5 rounded-full bg-blue-700" />
              <div className="h-24 w-5 rounded-full bg-blue-600" />
              <div className="h-16 w-4 rounded-full bg-blue-700" />
              <div className="h-10 w-3 rounded-full bg-blue-600" />
              <div className="h-20 w-4 rounded-full bg-blue-800" />

            </div>

            {/* Top */}

            <div className="relative z-10 flex items-start justify-between">

              <p className="text-[10px] font-semibold tracking-tight">
                Nexus
              </p>

              <span className="text-[7px] text-white/70">
                debit
              </span>

            </div>

            {/* Chip */}

            <div className="absolute right-4 top-9 z-10 flex items-center gap-2">

              <div className="h-6 w-8 rounded-[4px] border border-white/30 bg-gradient-to-br from-gray-200 via-gray-400 to-gray-200 shadow-inner">

                <div className="grid h-full grid-cols-2 grid-rows-2 gap-[2px] p-1">

                  <span className="rounded-[1px] border border-gray-500/50" />
                  <span className="rounded-[1px] border border-gray-500/50" />
                  <span className="rounded-[1px] border border-gray-500/50" />
                  <span className="rounded-[1px] border border-gray-500/50" />

                </div>

              </div>

              <span className="text-[12px] text-white/90">
                )))
              </span>

            </div>

            {/* Card Number */}

            <div className="absolute bottom-11 left-4 z-10">

              <p className="text-[10px] font-medium tracking-[0.16em]">
                4321 3211 43221 5234
              </p>

            </div>

            {/* Bottom */}

            <div className="absolute bottom-2.5 left-4 right-4 z-10 flex items-end justify-between">

              <p className="text-[22px] font-bold italic tracking-tight">
                VISA
              </p>

              <div>

                <p className="text-[5px] uppercase text-white/40">
                  Card Holder
                </p>

                <p className="text-[7px] font-medium">
                  ALI HAIDER
                </p>

              </div>

              <div>

                <p className="text-[5px] uppercase text-white/40">
                  Valid Thru
                </p>

                <p className="text-[7px] font-medium">
                  09/29
                </p>

              </div>

            </div>

          </div>

          {/* =================================================
              QUICK ACTIONS
          ================================================= */}

          <Card className="border-border bg-card shadow-none">

            <CardHeader className="px-3.5 pb-2 pt-3">

              <CardTitle className="text-[18px] font-semibold text-foreground">
                Quick Actions
              </CardTitle>

              <p className="text-[10px] text-muted-foreground">
                Easily send, receive, or manage payments.
              </p>

            </CardHeader>

            <CardContent className="grid grid-cols-4 gap-1.5 px-3.5 pb-3.5">

              {quickActions.map((action) => {
                const Icon = action.icon

                return (
                  <Button
                    key={action.title}
                    variant="outline"
                    className="h-[68px] flex-col gap-1.5 rounded-xl px-1 text-[8px] text-foreground"
                  >
                    <Icon className="size-3.5" />

                    {action.title}
                  </Button>
                )
              })}

            </CardContent>
          </Card>

          {/* =================================================
              ACTIVITY SUMMARY
          ================================================= */}

          <Card className="border-border bg-card shadow-none">

            <CardHeader className="px-3.5 pb-2 pt-3">

              <div className="flex items-center justify-between">

                <CardTitle className="text-[18px] font-semibold text-foreground">
                  Activity Summary
                </CardTitle>

                <span className="flex items-center text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                  25%

                  <ArrowUpRight className="size-3" />
                </span>

              </div>

              <p className="text-[10px] text-muted-foreground">
                1,500 total interactions this month
              </p>

            </CardHeader>

            <CardContent className="px-3.5 pb-3.5">

              {/* Activity Bar */}

              <div className="flex h-3 overflow-hidden rounded-full">

                <div className="w-[30%] bg-[#B9A7FF]" />
                <div className="w-[15%] bg-[#FFB5A5]" />
                <div className="w-[40%] bg-[#FF8B6B]" />
                <div className="w-[15%] bg-[#6FAA84]" />

              </div>

              {/* Activity Details */}

              <div className="mt-3 flex items-center justify-between text-[8px] text-foreground">

                <span>
                  Payments <b>300</b>
                </span>

                <span>
                  Transfers <b>150</b>
                </span>

                <span>
                  Sales <b>400</b>
                </span>

                <Button
                  variant="outline"
                  size="icon"
                  className="size-5 rounded-full"
                >
                  <ArrowRight className="size-2.5" />
                </Button>

              </div>

            </CardContent>
          </Card>

          {/* =================================================
              HISTORY
          ================================================= */}

          <Card className="border-border bg-card shadow-none">

            <CardHeader className="px-3.5 pb-2 pt-3">

              <CardTitle className="text-[18px] font-semibold text-foreground">
                History
              </CardTitle>

              <p className="text-[8px] text-muted-foreground">
                996 of 1260 sessions
              </p>

            </CardHeader>

            <CardContent className="px-3.5 pb-3.5">

              <Progress
                value={79}
                className="h-1.5"
              />

              <div className="mt-2 flex justify-between text-[8px] text-muted-foreground">

                <span>
                  996 sessions
                </span>

                <span>
                  79%
                </span>

              </div>

            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}