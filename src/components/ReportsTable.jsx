"use client";

import { useState } from "react";
import "../styles/reports-table.css";

function ReportsTable() {
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  const reports = [
    {
      id: "REP-001",
      name: "Pruebas 360 - Argos",
      date: "12 Jun 2023",
      tests: 42,
      passed: 38,
      failed: 4,
      duration: "2:34",
    },
    {
      id: "REP-002",
      name: "Pruebas 360 - Argos",
      date: "12 Jun 2023",
      tests: 42,
      passed: 38,
      failed: 4,
      duration: "2:34",
    },
  ];

  return (
    <div className="reports-table-card">
      <div className="card-header">
        <div className="header-content">
          <div>
            <h2>Historial de reportes</h2>
            <p>Reportes de pruebas generados recientemente</p>
          </div>
          <div className="header-actions">
            <select
              className="period-select"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="week">Última semana</option>
              <option value="month">Último mes</option>
              <option value="quarter">Último trimestre</option>
            </select>
            {/* <button className="icon-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
            </button> */}
          </div>
        </div>
      </div>
      <div className="card-content">
        <div className="table-container">
          <table className="reports-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Fecha</th>
                <th>Pruebas</th>
                <th>Exitosas</th>
                <th>Fallidas</th>
                <th>Duración</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id}>
                  <td className="id-cell">{report.id}</td>
                  <td>{report.name}</td>
                  <td>{report.date}</td>
                  <td>{report.tests}</td>
                  <td>
                    <div className="status-count success">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                      {report.passed}
                    </div>
                  </td>
                  <td>
                    <div className="status-count error">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="15" y1="9" x2="9" y2="15"></line>
                        <line x1="9" y1="9" x2="15" y2="15"></line>
                      </svg>
                      {report.failed}
                    </div>
                  </td>
                  <td>{report.duration}</td>
                  <td>
                    <div className="action-buttons">
                      {/* <button className="icon-button">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                          <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                      </button> */}
                      {/* <button className="icon-button">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                      </button> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-pagination">
          <div className="pagination-info">Mostrando 5 de 24 reportes</div>
          <div className="pagination-controls">
            <button className="pagination-btn" disabled>
              Anterior
            </button>
            <button className="pagination-btn active">1</button>
            <button className="pagination-btn">2</button>
            <button className="pagination-btn">3</button>
            <button className="pagination-btn">Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportsTable;
