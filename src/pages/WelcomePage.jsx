"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import "../styles/welcome-page.css";

function WelcomePage() {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (success) => {
    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="welcome-page">
      <header className="welcome-header">
        <div className="welcome-header-content">
          <div className="logo-container">
            <div className="logo-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 17-2-2 2-2" />
                <path d="M8 19h8a4 4 0 0 0 4-4 4 4 0 0 0-4-4H8" />
              </svg>
            </div>
            <h1>AutoTest Platform</h1>
          </div>
          {!showLogin && (
            <button
              className="btn primary-btn"
              onClick={() => setShowLogin(true)}
            >
              Iniciar sesión
            </button>
          )}
        </div>
      </header>

      <main className="welcome-main">
        {showLogin ? (
          <div className="login-container">
            <LoginForm onLoginSuccess={() => handleLogin(true)} />
          </div>
        ) : (
          <>
            <div className="welcome-content">
              <h2>Automatización de pruebas simplificada</h2>
              <p>
                Ejecute, monitoree y analice sus pruebas automatizadas en una
                plataforma unificada con reportes detallados y visualización en
                tiempo real.
              </p>
              <div className="welcome-buttons">
                <button
                  className="btn primary-btn"
                  onClick={() => setShowLogin(true)}
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
        )}
      </main>

      <footer className="welcome-footer">
        <div className="footer-content">
          <p>© 2024 AutoTest Platform. Todos los derechos reservados.</p>
          <div className="footer-links">
            {/* <a href="#">Documentación</a>
            <a href="#">Soporte</a>
            <a href="#">Contacto</a> */}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default WelcomePage;
