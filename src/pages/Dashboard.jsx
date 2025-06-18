import DashboardLayout from "../components/DashboardLayout"
import DashboardHeader from "../components/DashboardHeader"
import DashboardMetrics from "../components/DashboardMetrics"
import TestsChart from "../components/TestsChart"
import TestResultsTable from "../components/TestResultsTable"
import "../styles/dashboard.css"

function Dashboard() {
  return (
    <DashboardLayout>
      <div className="dashboard-container">
        <DashboardHeader />
        <main className="dashboard-main">
          <h1>Dashboard</h1>
          <DashboardMetrics />
          <div className="dashboard-charts">
            <TestsChart />
            <TestResultsTable />
          </div>
        </main>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard
