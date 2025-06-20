"use client";

import { useRef, useState } from "react";
import "../styles/emulator-view.css";
import ReportsApp from "./Serenity";
import CorreoService from "./Correo";

function EmulatorView() {
  const emulatorRef = useRef(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("emulator");
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCorreoModal, setShowCorreoModal] = useState(false);
  const [htmlContent, setHtmlContent] = useState(
    "<p>Contenido HTML de resumen</p>"
  );

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  const handleExpand = () => {
    const el = emulatorRef.current;
    if (el instanceof HTMLElement) {
      if (!document.fullscreenElement) {
        el.requestFullscreen().catch((err) => {
          console.error(
            `Error al intentar entrar en pantalla completa: ${err.message}`
          );
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className="emulator-card">
      <div className="card-header">
        <div className="header-content">
          <div>
            <h2>Visualización del emulador</h2>
            <p>Vista en tiempo real de la ejecución de pruebas</p>
          </div>
          <div className="header-actions">
            <button
              className="icon-button"
              onClick={handleExpand}
              title={isExpanded ? "Reducir vista" : "Expandir vista"}
            >
              🖥️
            </button>
          </div>
        </div>
      </div>

      <div className="card-content">
        <div className="tabs">
          <div className="tabs-list">
            <button
              className={`tab-button ${
                activeTab === "emulator" ? "active" : ""
              }`}
              onClick={() => setActiveTab("emulator")}
            >
              Emulador
            </button>
            <button
              className={`tab-button ${activeTab === "report" ? "active" : ""}`}
              onClick={() => setActiveTab("report")}
            >
              Reporte Serenity
            </button>
            {/* <button
              className={`tab-button ${activeTab === "Correo" ? "active" : ""}`}
              onClick={() => setActiveTab("Correo")}
            >
              Envios de Reporte
            </button> */}
          </div>

          <div
            className={`tab-content ${
              activeTab === "emulator" ? "active" : ""
            }`}
          >
            <div className="emulator-container" ref={emulatorRef}>
              <iframe
                src="http://testing.sandboxcw.net:16081/" // estado de la url que se llama
                title="Vista previa web"
                style={{
                  width: "1000%",
                  height: "700%",
                  border: "none",
                  borderRadius: "10px",
                }}
              />
            </div>
          </div>

          <div
            className={`tab-content ${activeTab === "report" ? "active" : ""}`}
          >
            <div className="report-container">
              {/* <h3>Reporte de pruebas Serenity BDD</h3> */}
              <div>
                {" "}
                <ReportsApp />{" "}
              </div>
            </div>
          </div>
          <div>
            <div
              className={`tab-content ${
                activeTab === "Correo" ? "active" : ""
              }`}
            >
              {/* <div className="correo-container">
                <button onClick={() => setShowCorreoModal(true)}>
                  Abrir Correo
                </button>

                <CorreoService
                  showModal={showCorreoModal}
                  setShowModal={setShowCorreoModal}
                  htmlContent={htmlContent}
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmulatorView;
