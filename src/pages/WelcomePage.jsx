"use client";

import { useNavigate } from "react-router-dom";
import "../styles/welcome-page.css";

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="welcome-content">
        <h2>Automatización de pruebas simplificada</h2>
        <p>
          Ejecute, monitoree y analice sus pruebas automatizadas en una
          plataforma unificada con reportes detallados y visualización en tiempo
          real.
        </p>
        <div className="welcome-buttons">
          <button
            className="btn primary-btn"
            onClick={() => navigate("login", { viewTransition: true })}
          >
            Comenzar ahora
          </button>
          {/* <button className="btn outline-btn">Ver demostración</button> */}
        </div>
      </div>
      <div className="welcome-image">
        <div className="image-container">
          <img
            src="/public/welcome.png"
            alt="Dashboard preview"
            className="preview-image"
          />
        </div>
        {/* <div className="stats-card">
                <div className="stats-indicator">
                  <div className="indicator-dot success"></div>
                  <span>98% de pruebas exitosas</span>
                </div>
              </div> */}
      </div>
    </>
  );
}

export default WelcomePage;
