import DashboardNav from "./DashboardNav";
import "../styles/dashboard-layout.css";

function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <DashboardNav />
      <div className="dashboard-content">{children}</div>
    </div>
  );
}

export default DashboardLayout;
