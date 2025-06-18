import React, { useState } from "react";
import "../styles/correo.css";

const CorreoService = ({ showModal, setShowModal, htmlContent }) => {
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [mensaje, setMensaje] = useState(null);

  const enviarCorreo = async (correo) => {
    try {
      const data = {
        custom: {
          messages: [
            {
              recipients: [correo],
              data: {
                htmlContent: htmlContent,
              },
              subject: "Resumen de pruebas",
              title: "Resumen de pruebas",
            },
          ],
        },
        business_unit: 0,
        app_id: 1,
        template_prefix: "qa_automation",
      };

      const response = await fetch(
        "https://cw20-api-notifications.celuwebdev.com/api/email/request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        setMensaje("✅ Correo enviado exitosamente");
        setShowModal(false);
      } else {
        setMensaje("❌ No se pudo enviar el correo");
      }
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      setMensaje("❌ Error al enviar el correo");
    }
  };

  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Enviar resumen de pruebas</h3>
        <input
          type="email"
          placeholder="Ingrese su correo electrónico"
          value={correoElectronico}
          onChange={(e) => setCorreoElectronico(e.target.value)}
          className="email-input"
        />
        <div className="modal-buttons">
          <button className="btn-cancel" onClick={() => setShowModal(false)}>
            Cancelar
          </button>
          <button
            className="btn-send"
            onClick={() => enviarCorreo(correoElectronico)}
          >
            Enviar
          </button>
        </div>
        {mensaje && <p className="message">{mensaje}</p>}
      </div>
    </div>
  );
};

export default CorreoService;
