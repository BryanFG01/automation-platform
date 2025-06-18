"use client"

import { useState } from "react"
import "../styles/tests-chart.css"

function TestsChart() {
  const [activeTab, setActiveTab] = useState("line")

  return (
    <div className="chart-card">
      <div className="card-header">
        <div>
          <h2>Pruebas por día</h2>
          <p>Visualización de pruebas ejecutadas en los últimos 7 días</p>
        </div>
      </div>
      <div className="card-content">
        <div className="chart-tabs">
          <div className="tabs-list">
            <button
              className={`tab-button ${activeTab === "line" ? "active" : ""}`}
              onClick={() => setActiveTab("line")}
            >
              Línea
            </button>
            <button className={`tab-button ${activeTab === "bar" ? "active" : ""}`} onClick={() => setActiveTab("bar")}>
              Barras
            </button>
          </div>
          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-color success"></div>
              <span>Exitosas</span>
            </div>
            <div className="legend-item">
              <div className="legend-color error"></div>
              <span>Fallidas</span>
            </div>
          </div>
        </div>

        {activeTab === "line" && (
          <div className="chart-container">
            <div className="chart line-chart">
              <div className="chart-grid">
                <div className="grid-line"></div>
                <div className="grid-line"></div>
                <div className="grid-line"></div>
                <div className="grid-line"></div>
              </div>
              <div className="chart-bars">
                <div className="chart-day">
                  <div className="chart-column">
                    <div className="success-line" style={{ height: "70%" }}></div>
                    <div className="error-line" style={{ height: "10%" }}></div>
                  </div>
                  <span className="day-label">Lun</span>
                </div>
                <div className="chart-day">
                  <div className="chart-column">
                    <div className="success-line" style={{ height: "85%" }}></div>
                    <div className="error-line" style={{ height: "5%" }}></div>
                  </div>
                  <span className="day-label">Mar</span>
                </div>
                <div className="chart-day">
                  <div className="chart-column">
                    <div className="success-line" style={{ height: "65%" }}></div>
                    <div className="error-line" style={{ height: "15%" }}></div>
                  </div>
                  <span className="day-label">Mié</span>
                </div>
                <div className="chart-day">
                  <div className="chart-column">
                    <div className="success-line" style={{ height: "90%" }}></div>
                    <div className="error-line" style={{ height: "8%" }}></div>
                  </div>
                  <span className="day-label">Jue</span>
                </div>
                <div className="chart-day">
                  <div className="chart-column">
                    <div className="success-line" style={{ height: "75%" }}></div>
                    <div className="error-line" style={{ height: "12%" }}></div>
                  </div>
                  <span className="day-label">Vie</span>
                </div>
                <div className="chart-day">
                  <div className="chart-column">
                    <div className="success-line" style={{ height: "40%" }}></div>
                    <div className="error-line" style={{ height: "5%" }}></div>
                  </div>
                  <span className="day-label">Sáb</span>
                </div>
                <div className="chart-day">
                  <div className="chart-column">
                    <div className="success-line" style={{ height: "30%" }}></div>
                    <div className="error-line" style={{ height: "3%" }}></div>
                  </div>
                  <span className="day-label">Dom</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "bar" && (
          <div className="chart-container">
            <div className="chart bar-chart">
              <div className="chart-grid">
                <div className="grid-line"></div>
                <div className="grid-line"></div>
                <div className="grid-line"></div>
                <div className="grid-line"></div>
              </div>
              <div className="chart-bars">
                <div className="chart-day">
                  <div className="chart-bar-group">
                    <div className="success-bar" style={{ height: "70%" }}></div>
                    <div className="error-bar" style={{ height: "10%" }}></div>
                  </div>
                  <span className="day-label">Lun</span>
                </div>
                <div className="chart-day">
                  <div className="chart-bar-group">
                    <div className="success-bar" style={{ height: "85%" }}></div>
                    <div className="error-bar" style={{ height: "5%" }}></div>
                  </div>
                  <span className="day-label">Mar</span>
                </div>
                <div className="chart-day">
                  <div className="chart-bar-group">
                    <div className="success-bar" style={{ height: "65%" }}></div>
                    <div className="error-bar" style={{ height: "15%" }}></div>
                  </div>
                  <span className="day-label">Mié</span>
                </div>
                <div className="chart-day">
                  <div className="chart-bar-group">
                    <div className="success-bar" style={{ height: "90%" }}></div>
                    <div className="error-bar" style={{ height: "8%" }}></div>
                  </div>
                  <span className="day-label">Jue</span>
                </div>
                <div className="chart-day">
                  <div className="chart-bar-group">
                    <div className="success-bar" style={{ height: "75%" }}></div>
                    <div className="error-bar" style={{ height: "12%" }}></div>
                  </div>
                  <span className="day-label">Vie</span>
                </div>
                <div className="chart-day">
                  <div className="chart-bar-group">
                    <div className="success-bar" style={{ height: "40%" }}></div>
                    <div className="error-bar" style={{ height: "5%" }}></div>
                  </div>
                  <span className="day-label">Sáb</span>
                </div>
                <div className="chart-day">
                  <div className="chart-bar-group">
                    <div className="success-bar" style={{ height: "30%" }}></div>
                    <div className="error-bar" style={{ height: "3%" }}></div>
                  </div>
                  <span className="day-label">Dom</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TestsChart
