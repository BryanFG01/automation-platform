// Integración del envío de correo en ReportsApp
import React, { useState, useEffect } from "react";
import CorreoService from "./Correo";
import "../styles/serenity.css";

const ReportsApp = () => {
  const [businessUnits, setBusinessUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showReportViewer, setShowReportViewer] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    loadBusinessUnits();
  }, []);

  const loadBusinessUnits = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "http://localhost:8100/api/reports/business-units"
      );
      if (!response.ok) throw new Error(`Error ${response.status}`);
      const data = await response.json();
      setBusinessUnits(data.businessUnits || []);
    } catch (err) {
      setError(`Error cargando unidades: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const loadUnitReports = async (unitId) => {
    setLoading(true);
    setSelectedReport(null);
    setShowReportViewer(false);
    try {
      const response = await fetch(
        `http://localhost:8100/api/reports/business-units/${unitId}`
      );
      if (!response.ok) throw new Error(`Error ${response.status}`);
      const data = await response.json();
      setReports(data.reports || []);
      setSelectedUnit(unitId);
    } catch (err) {
      setError(`Error cargando reportes: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmail = (unitId, report) => {
    const reportLink = `http://localhost:8100/api/reports/business-units/${unitId}/${report.reportDir}/index.html`;
    setHtmlContent(reportLink); // Solo el link
    setShowModal(true);
  };

  const goBackToUnits = () => {
    setSelectedUnit(null);
    setReports([]);
    setSelectedReport(null);
    setShowReportViewer(false);
  };

  return (
    <div className="ReportsApp">
      <CorreoService
        showModal={showModal}
        setShowModal={setShowModal}
        htmlContent={htmlContent}
      />

      {selectedUnit && (
        <button className="breadcrumb-link" onClick={goBackToUnits}>
          ⬅️ Volver al inicio
        </button>
        // <div className="breadcrumb">
        //   <span className="breadcrumb-link" onClick={goBackToUnits}>
        //     ⬅️ Volver al inicio
        //   </span>
        // </div>
      )}

      {selectedUnit ? (
        <div>
          <h2>Reportes de {selectedUnit}</h2>
          <div className="card-list">
            {reports.map((report, index) => (
              <div className="card" key={index}>
                <h3>Test Run #{index + 1}</h3>
                <span>
                  Fecha: {new Date(report.timestamp).toLocaleString()}
                </span>
                {report.commitHash && (
                  <span>Commit: {report.commitHash.substring(0, 8)}...</span>
                )}
                <span> {report.reportDir} </span>
                {report.available ? (
                  <>
                    <button
                      onClick={() =>
                        window.open(
                          `http://localhost:8100/api/reports/business-units/${selectedUnit}/${report.reportDir}/index.html`,
                          "_blank"
                        )
                      }
                    >
                      Ver Reporte
                    </button>
                    <button
                      onClick={() => handleSendEmail(selectedUnit, report)}
                    >
                      ✉ Enviar por correo
                    </button>
                  </>
                ) : (
                  <span>Reporte no disponible</span>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2>Unidades de Negocio</h2>
          <div className="card-list">
            {businessUnits.map((unit) => (
              <div
                className="card"
                key={unit}
                onClick={() => loadUnitReports(unit)}
              >
                <h3>{unit}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsApp;
