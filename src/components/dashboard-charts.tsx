import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  XAxis,
  YAxis,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

/* Sales Overview Data                                                       */
const salesData = [
  {
    month: "Oct",
    china: 850,
    uk: 620,
    usa: 520,
    canada: 480,
    other: 518,
    total: 2988,
  },
  {
    month: "Nov",
    china: 420,
    uk: 360,
    usa: 310,
    canada: 285,
    other: 390,
    total: 1765,
  },
  {
    month: "Dec",
    china: 1050,
    uk: 820,
    usa: 720,
    canada: 650,
    other: 765,
    total: 4005,
  },
]


/* Subscriber Data */

const subscriberData = [
  { day: "Sun", subscribers: 1800 },
  { day: "Mon", subscribers: 2400 },
  { day: "Tue", subscribers: 3874 },
  { day: "Wed", subscribers: 2100 },
  { day: "Thu", subscribers: 2700 },
  { day: "Fri", subscribers: 2300 },
  { day: "Sat", subscribers: 3100 },
]

/* Chart Configuration  */

const salesChartConfig = {
  china: {
    label: "China",
    color: "hsl(245 75% 55%)",
  },
  uk: {
    label: "UK",
    color: "hsl(190 75% 48%)",
  },
  usa: {
    label: "USA",
    color: "hsl(205 85% 58%)",
  },
  canada: {
    label: "Canada",
    color: "hsl(175 70% 45%)",
  },
  other: {
    label: "Other",
    color: "hsl(175 25% 82%)",
  },
} satisfies ChartConfig

const subscriberChartConfig = {
  subscribers: {
    label: "Subscribers",
    color: "hsl(230 20% 90%)",
  },
} satisfies ChartConfig

/* Dashboard Charts                                                           */

export function DashboardCharts() {
  return (
    <div className="grid gap-4 lg:grid-cols-5">
      {/* Sales Overview  */}
  
      <Card className="lg:col-span-3">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle>Sales Overview</CardTitle>

              <CardDescription>
                Monthly sales performance
              </CardDescription>
            </div>

            <div className="text-right">
              <p className="text-2xl font-semibold">$9,257.51</p>

              <p className="text-xs text-emerald-600">
                15.8% ↑ +$143.50 increased
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <ChartContainer
            config={salesChartConfig}
            className="h-[300px] w-full"
          >
            <BarChart
              accessibilityLayer
              data={salesData}
              margin={{
                top: 20,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid
                vertical={false}
                strokeDasharray="4 4"
              />

              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `$${value / 1000}k`}
              />

              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent />}
              />

              <ChartLegend
                content={<ChartLegendContent />}
              />

              <Bar
                dataKey="china"
                stackId="sales"
                fill="var(--color-china)"
                radius={[0, 0, 4, 4]}
              />

              <Bar
                dataKey="uk"
                stackId="sales"
                fill="var(--color-uk)"
              />

              <Bar
                dataKey="usa"
                stackId="sales"
                fill="var(--color-usa)"
              />

              <Bar
                dataKey="canada"
                stackId="sales"
                fill="var(--color-canada)"
              />

              <Bar
                dataKey="other"
                stackId="sales"
                fill="var(--color-other)"
                radius={[4, 4, 0, 0]}
              >
                <LabelList
                  dataKey="total"
                  position="top"
                  offset={8}
                  className="fill-foreground"
                  fontSize={10}
                  formatter={(value) => `$${Number(value).toLocaleString()}`}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Total Subscribers */}

      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Total Subscriber</CardTitle>

              <CardDescription>
                Weekly subscriber activity
              </CardDescription>
            </div>

            <span className="rounded-md border px-2 py-1 text-xs text-muted-foreground">
              Weekly
            </span>
          </div>

          <div className="pt-2">
            <p className="text-2xl font-semibold">24,473</p>

            <p className="text-xs text-emerald-600">
              8.3% ↑ +749 increased
            </p>
          </div>
        </CardHeader>

        <CardContent>
          <ChartContainer
            config={subscriberChartConfig}
            className="h-[300px] w-full"
          >
            <BarChart
              accessibilityLayer
              data={subscriberData}
              margin={{
                top: 20,
                right: 5,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid
                vertical={false}
                strokeDasharray="4 4"
              />

              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />

              <YAxis hide />

              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent />}
              />

              <Bar
                dataKey="subscribers"
                radius={[6, 6, 0, 0]}
              >
                {subscriberData.map((entry) => (
                  <Cell
                    key={entry.day}
                    fill={
                      entry.day === "Tue"
                        ? "hsl(245 75% 55%)"
                        : "hsl(230 20% 90%)"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}