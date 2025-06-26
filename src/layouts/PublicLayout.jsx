import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "../styles/public-layout.css";
import { useEffect } from "react";

const PublicLayout = () => {
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/dashboard", { replace: true, viewTransition: true });
    }
  }, [token]);

  return (
    <div className="public-layout">
      <header className="public-layout-header">
        <div className="public-layout-header-content">
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
        </div>
      </header>

      <main className="public-layout-main">
        <Outlet />
      </main>

      <footer className="public-layout-footer">
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
};

export default PublicLayout;
