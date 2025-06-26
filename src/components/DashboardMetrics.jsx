import "../styles/dashboard-metrics.css";
// import handleRunTests from "./TestExecutionPanel";

function DashboardMetrics() {
  return (
    <div className="metrics-grid">
      <div className="metric-card">
        <div className="metric-header">
          <h3>Total de pruebas</h3>
        </div>
        <div className="metric-value">
          {/* <span>{executedTests.length}</span> */}
          1,248
        </div>
        <p className="metric-trend">+12% respecto al mes anterior</p>
      </div>
      <div className="metric-card">
        <div className="metric-header">
          <h3>Pruebas exitosas</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="metric-icon success"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <div className="metric-value">1,186</div>
        <p className="metric-trend">95% de tasa de éxito</p>
      </div>
      <div className="metric-card">
        <div className="metric-header">
          <h3>Pruebas fallidas</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="metric-icon error"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        </div>
        <div className="metric-value">62</div>
        <p className="metric-trend">5% de tasa de fallo</p>
      </div>
      <div className="metric-card">
        <div className="metric-header">
          <h3>Tiempo promedio</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="metric-icon"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </div>
        <div className="metric-value">2.4 min</div>
        <p className="metric-trend">-18% respecto al mes anterior</p>
      </div>
    </div>
  );
}

export default DashboardMetrics;
