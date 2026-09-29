import { DashboardLayout } from "@/components/dashboard-layout"
import { DashboardStats } from "@/components/dashboard-stats"
import { DashboardCharts } from "@/components/dashboard-charts"
import { DashboardBottom } from "@/components/dashboard-bottom"


function App() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Heading */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Dashboard
          </h1>

          <p className="text-sm text-muted-foreground">
            Here's an overview of your marketing performance
          </p>
        </div>

        {/* Statistics */}
        <DashboardStats />
        <DashboardCharts />
        <DashboardBottom />
      </div>
    </DashboardLayout>
    
    
  )
}

export default App