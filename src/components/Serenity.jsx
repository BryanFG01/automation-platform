import React, { useState, useEffect } from "react";
import "../styles/serenity.css";

const ReportsApp = () => {
  const [businessUnits, setBusinessUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showReportViewer, setShowReportViewer] = useState(false);

  // const API_BASE_URL = "/api/reports";

  useEffect(() => {
    loadBusinessUnits();
  }, []);

  const loadBusinessUnits = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://testing-api-gateway.sandboxcw.net/api/reports/business-units"
      );
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setBusinessUnits(data.businessUnits || []);
    } catch (err) {
      setError(`Error cargando unidades de negocio: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const loadUnitReports = async (unitId) => {
    setLoading(true);
    setError(null);
    setSelectedReport(null);
    setShowReportViewer(false);

    try {
      const response = await fetch(
        `https://testing-api-gateway.sandboxcw.net/api/reports/business-units/${unitId}`
      );
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setReports(data.reports || []);
      setSelectedUnit(unitId);
    } catch (err) {
      setError(`Error cargando reportes: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const viewReport = (unitId, reportDir) => {
    const reportUrl = `https://testing-api-gateway.sandboxcw.net/api/reports/business-units/${unitId}/${reportDir}/index.html`;
    setSelectedReport({ unitId, reportDir, url: reportUrl });
    setShowReportViewer(true);
  };

  const openReportInNewTab = (unitId, reportDir) => {
    const reportUrl = `https://testing-api-gateway.sandboxcw.net/api/reports/business-units/${unitId}/${reportDir}/index.html`;
    window.open(reportUrl, "_blank");
  };

  const downloadReport = async (unitId, reportDir) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://testing-api-gateway.sandboxcw.net/api/reports/business-units/${unitId}/${reportDir}/download`
      );
      if (!response.ok) {
        throw new Error("Error descargando reporte");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${unitId}_${reportDir}_report.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError(`Error descargando reporte: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleString("es-CO", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return timestamp || "N/A";
    }
  };

  const goBackToUnits = () => {
    setSelectedUnit(null);
    setReports([]);
    setSelectedReport(null);
    setShowReportViewer(false);
  };

  const goBackToReports = () => {
    setSelectedReport(null);
    setShowReportViewer(false);
  };

  return (
    <div className="ReportsApp">
      <div>
        <button
          className="btn primary-btn"
          onClick={loadBusinessUnits}
          disabled={loading}
        >
          {loading ? "Actualizando" : "Actualizar"}
        </button>
      </div>

      <div className="breadcrumb">
        {(selectedUnit || showReportViewer) && (
          <>
            <span onClick={goBackToUnits}>📊 Inicio</span>
            {selectedUnit && (
              <>
                <span>{">"}</span>
                <span onClick={showReportViewer ? goBackToReports : undefined}>
                  {selectedUnit}
                </span>
              </>
            )}
            {showReportViewer && selectedReport && (
              <>
                <span>{">"}</span>
                <span>{selectedReport.reportDir}</span>
              </>
            )}
          </>
        )}
      </div>

      {error && <div className="error">{error}</div>}

      {showReportViewer && selectedReport ? (
        <div className="report-viewer">
          <h2>Reporte: {selectedReport.reportDir}</h2>
          <button
            onClick={() =>
              openReportInNewTab(
                selectedReport.unitId,
                selectedReport.reportDir
              )
            }
          >
            📱 Nueva Pestaña
          </button>
          {/* <iframe
            src={selectedReport.url}
            title={`Reporte ${selectedReport.reportDir}`}
            width="100%"
            height="600px"
          /> */}
        </div>
      ) : selectedUnit ? (
        <div>
          <h2>
            Reportes de {selectedUnit} ({reports.length})
          </h2>
          {loading ? (
            <p className="loading">Cargando reportes...</p>
          ) : reports.length === 0 ? (
            <p className="empty">
              No hay reportes disponibles para esta unidad de negocio
            </p>
          ) : (
            <div className="card-list">
              {reports.map((report, index) => (
                <div className="card" key={index}>
                  <h3>Test Run #{index + 1}</h3>
                  <span>Fecha: {formatDate(report.timestamp)}</span>
                  {report.commitHash && (
                    <span>Commit: {report.commitHash.substring(0, 8)}...</span>
                  )}
                  {report.available ? (
                    <>
                      {/* <button
                        onClick={() =>
                          viewReport(selectedUnit, report.reportDir)
                        }
                      >
                        Ver Reporte
                      </button> */}
                      <span> {report.reportDir} </span>
                      <button
                        onClick={() =>
                          openReportInNewTab(selectedUnit, report.reportDir)
                        }
                      >
                        📱 Nueva Pestaña
                      </button>
                    </>
                  ) : (
                    <span className="empty">No disponible</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2>Unidades de Negocio ({businessUnits.length})</h2>
          {loading ? (
            <p className="loading">Cargando unidades de negocio...</p>
          ) : businessUnits.length === 0 ? (
            <p className="empty">
              No hay unidades de negocio con reportes disponibles
            </p>
          ) : (
            <div className="card-list">
              {businessUnits.map((unit) => (
                <div
                  className="card"
                  key={unit}
                  onClick={() => loadUnitReports(unit)}
                >
                  <h3>{unit}</h3>
                  <span>Haz clic para ver los reportes disponibles</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReportsApp;
