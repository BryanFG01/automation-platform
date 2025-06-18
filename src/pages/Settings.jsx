import DashboardLayout from "../components/DashboardLayout";
import DashboardHeader from "../components/DashboardHeader";

function Settings() {
  return (
    <DashboardLayout>
      <div className="settings-container">
        <DashboardHeader />
        <main className="settings-main">
          <h1>Configuración</h1>
          <div className="settings-content">
            <div className="settings-card">
              <div className="card-header">
                <h2>Configuración general</h2>
                <p>Administre la configuración general de la plataforma</p>
              </div>
              <div className="card-content">
                <div className="settings-form">
                  <div className="form-group">
                    <label>Nombre de la plataforma</label>
                    <input type="text" defaultValue="AutoTest Platform" />
                  </div>
                  <div className="form-group">
                    <label>Correo de notificaciones</label>
                    <input
                      type="email"
                      defaultValue="notificaciones@autotest.com"
                    />
                  </div>
                  {/* <div className="form-group">
                    <label>Zona horaria</label>
                    <select defaultValue="America/Mexico_City">
                      <option value="America/Mexico_City"></option>
                      <option value="America/New_York"></option>
                      <option value="Europe/Madrid"></option>
                    </select>
                  </div> */}
                  <div className="form-group checkbox-group">
                    <label className="checkbox-container">
                      <input type="checkbox" defaultChecked />
                      <span className="checkmark"></span>
                      <span>Enviar notificaciones por correo</span>
                    </label>
                  </div>
                  <div className="form-group checkbox-group">
                    <label className="checkbox-container">
                      <input type="checkbox" defaultChecked />
                      <span className="checkmark"></span>
                      <span>Guardar reportes automáticamente</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <button className="btn outline-btn">Cancelar</button>
                <button className="btn primary-btn">Guardar cambios</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
}

export default Settings;
