import { ArrowDownRight, ArrowUpRight, Eye, MousePointerClick, Wallet } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const stats = [
  {
    title: "Page Views",
    value: "12,450",
    change: "15.8%",
    description: "vs. previous month",
    trend: "up",
    icon: Eye,
  },
  {
    title: "Total Revenue",
    value: "$363.95",
    change: "34.0%",
    description: "vs. previous month",
    trend: "down",
    icon: Wallet,
  },
  {
    title: "Bounce Rate",
    value: "86.5%",
    change: "24.2%",
    description: "vs. previous month",
    trend: "up",
    icon: MousePointerClick,
  },
]

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon
        const isPositive = stat.trend === "up"

        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>

              <Icon className="size-4 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-semibold tracking-tight">
                {stat.value}
              </div>

              <div className="mt-2 flex items-center gap-2 text-xs">
                <span
                  className={
                    isPositive
                      ? "flex items-center font-medium text-emerald-600"
                      : "flex items-center font-medium text-red-500"
                  }
                >
                  {isPositive ? (
                    <ArrowUpRight className="mr-1 size-3" />
                  ) : (
                    <ArrowDownRight className="mr-1 size-3" />
                  )}

                  {stat.change}
                </span>

                <span className="text-muted-foreground">
                  {stat.description}
                </span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}