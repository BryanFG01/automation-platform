// components/ConfirmationModal.js
import { useEffect } from "react";
import "../styles/confirmation-modal.css";

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);

  return (
    <div className="modal-overlay">
      <div className="confirmation-modal">
        <div className="modal-content">
          <p>{message}</p>
        </div>
        <div className="modal-actions">
          <button className="btn secondary-btn" onClick={onCancel}>
            Cancelar
          </button>
          <button className="btn danger-btn" onClick={onConfirm}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
