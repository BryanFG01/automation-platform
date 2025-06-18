import DashboardLayout from "../components/DashboardLayout"
import DashboardHeader from "../components/DashboardHeader"
import ReportsOverview from "../components/ReportsOverview"
import ReportsTable from "../components/ReportsTable"
import "../styles/reports.css"

function Reports() {
  return (
    <DashboardLayout>
      <div className="reports-container">
        <DashboardHeader />
        <main className="reports-main">
          <h1>Reportes</h1>
          <ReportsOverview />
          <div className="reports-table-container">
            <ReportsTable />
          </div>
        </main>
      </div>
    </DashboardLayout>
  )
}

export default Reports
