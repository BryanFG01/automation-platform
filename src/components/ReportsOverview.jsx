"use client";

import { useState } from "react";
import "../styles/reports-overview.css";

function ReportsOverview() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="overview-card">
      <div className="card-header">
        <h2>Resumen de reportes</h2>
        <p>Análisis de resultados de pruebas por unidad de negocio</p>
      </div>
      <div className="card-content">
        <div className="tabs">
          <div className="tabs-list">
            <button
              className={`tab-button ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              Todos
            </button>
          </div>

          <div className={`tab-content ${activeTab === "all" ? "active" : ""}`}>
            <div className="overview-stats">
              <div className="stat-card">
                <div className="stat-header">
                  <h3>Total de pruebas</h3>
                </div>
                <div className="stat-value">1,248</div>
                <div className="stat-trend">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="trend-icon up"
                  >
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                    <polyline points="17 6 23 6 23 12"></polyline>
                  </svg>
                  <span>+12% respecto al mes anterior</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-header">
                  <h3>Pruebas exitosas</h3>
                </div>
                <div className="stat-value">1,186</div>
                <div className="stat-trend">
                  <span>95% de tasa de éxito</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-header">
                  <h3>Pruebas fallidas</h3>
                </div>
                <div className="stat-value">62</div>
                <div className="stat-trend">
                  <span>5% de tasa de fallo</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-header">
                  <h3>Tiempo promedio</h3>
                </div>
                <div className="stat-value">2.4 min</div>
                <div className="stat-trend">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="trend-icon down"
                  >
                    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
                    <polyline points="17 18 23 18 23 12"></polyline>
                  </svg>
                  <span>-18% respecto al mes anterior</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportsOverview;
