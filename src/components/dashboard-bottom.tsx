import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"

import { Pie, PieChart } from "recharts"

import {
  CreditCard,
  ExternalLink,
  MoreHorizontal,
} from "lucide-react"

import {
  SiGoogleads,
  SiShopify,
  SiStripe,
  SiZapier,
} from "react-icons/si"

const salesData = [
  {
    name: "Website",
    value: 374.82,
    fill: "var(--color-website)",
  },
  {
    name: "Mobile App",
    value: 241.6,
    fill: "var(--color-mobile)",
  },
  {
    name: "Other",
    value: 213.42,
    fill: "var(--color-other)",
  },
]

const salesChartConfig = {
  website: {
    label: "Website",
    color: "hsl(245 75% 55%)",
  },
  mobile: {
    label: "Mobile App",
    color: "hsl(185 75% 48%)",
  },
  other: {
    label: "Other",
    color: "hsl(220 15% 90%)",
  },
} satisfies ChartConfig

const integrations = [
  {
    name: "Stripe",
    type: "Payment",
    rate: 84,
    amount: "$2,420.00",
    icon: SiStripe,
    iconClass: "text-[#635BFF]",
  },
  {
    name: "Zapier",
    type: "Automation",
    rate: 72,
    amount: "$1,840.00",
    icon: SiZapier,
    iconClass: "text-[#FF4F00]",
  },
  {
    name: "Shopify",
    type: "E-commerce",
    rate: 65,
    amount: "$1,520.00",
    icon: SiShopify,
    iconClass: "text-[#95BF47]",
  },
  {
    name: "Google Ads",
    type: "Marketing",
    rate: 58,
    amount: "$1,240.00",
    icon: SiGoogleads,
    iconClass: "text-[#4285F4]",
  },
]

export function DashboardBottom() {
  return (
    <div className="grid gap-4 lg:grid-cols-5">
      {/* Sales Distribution */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="size-4 text-muted-foreground" />

              <CardTitle className="text-sm font-medium">
                Sales Distribution
              </CardTitle>
            </div>

            <button className="rounded-md border px-2.5 py-1.5 text-xs text-muted-foreground hover:bg-muted">
              Monthly
            </button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="mb-1 flex items-center gap-1.5">
                <span className="h-3 w-0.5 rounded-full bg-violet-600" />

                <span className="text-xs text-muted-foreground">
                  Website
                </span>
              </div>

              <p className="text-lg font-semibold">
                $374.82
              </p>
            </div>

            <div>
              <div className="mb-1 flex items-center gap-1.5">
                <span className="h-3 w-0.5 rounded-full bg-cyan-500" />

                <span className="text-xs text-muted-foreground">
                  Mobile App
                </span>
              </div>

              <p className="text-lg font-semibold">
                $241.60
              </p>
            </div>

            <div>
              <div className="mb-1 flex items-center gap-1.5">
                <span className="h-3 w-0.5 rounded-full bg-gray-300" />

                <span className="text-xs text-muted-foreground">
                  Other
                </span>
              </div>

              <p className="text-lg font-semibold">
                $213.42
              </p>
            </div>
          </div>

          <div className="mt-4">
            <ChartContainer
              config={salesChartConfig}
              className="mx-auto h-[220px] w-full"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent hideLabel />
                  }
                />

                <Pie
                  data={salesData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={2}
                  strokeWidth={3}
                />
              </PieChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* List of Integration */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm font-medium">
                List of Integration
              </CardTitle>

              <p className="mt-1 text-xs text-muted-foreground">
                Monitor your connected applications
              </p>
            </div>

            <button className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground">
              See All
              <ExternalLink className="size-3.5" />
            </button>
          </div>
        </CardHeader>

        <CardContent>
          {/* Table Header */}
          <div className="grid grid-cols-[auto_1.5fr_1fr_1fr_1fr_auto] items-center gap-4 border-b pb-3 text-xs font-medium text-muted-foreground">
            <div />

            <span>Application</span>

            <span>Type</span>

            <span>Rate</span>

            <span>Profit</span>

            <div />
          </div>

          {/* Integration Rows */}
          <div className="divide-y">
            {integrations.map((integration) => {
              const Icon = integration.icon

              return (
                <div
                  key={integration.name}
                  className="grid grid-cols-[auto_1.5fr_1fr_1fr_1fr_auto] items-center gap-4 py-4"
                >
                  <Checkbox />

                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-lg border bg-muted/40">
                      <Icon
                        className={`size-5 ${integration.iconClass}`}
                      />
                    </div>

                    <span className="text-sm font-medium">
                      {integration.name}
                    </span>
                  </div>

                  <span className="text-xs text-muted-foreground">
                    {integration.type}
                  </span>

                  <div className="flex items-center gap-2">
                    <Progress
                      value={integration.rate}
                      className="h-1.5 w-16"
                    />

                    <span className="text-xs text-muted-foreground">
                      {integration.rate}%
                    </span>
                  </div>

                  <span className="text-sm font-medium">
                    {integration.amount}
                  </span>

                  <button className="text-muted-foreground hover:text-foreground">
                    <MoreHorizontal className="size-4" />
                  </button>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}