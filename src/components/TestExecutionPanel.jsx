"use client";

import { useState, useEffect, use } from "react";
import "../styles/test-execution-panel.css";
import ConfirmationModal from "./ConfirmationModal";
import Swal from "sweetalert2";
import { AlertTriangle } from "lucide-react";

// const API_BASE_URL = "https://testing-api-gateway.sandboxcw.net/api";

const getAuthHeaders = (token) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

function TestExecutionPanel() {
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState("Unidades de Negocio");
  const [selectedTests, setSelectedTests] = useState([]);
  const [needsRefresh, setNeedsRefresh] = useState(true);

  // const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const [testToDelete, setTestToDelete] = useState(null);

  const [businessUnits, setBusinessUnits] = useState(() => {
    // Intenta cargar desde localStorage primero
    const saved = localStorage.getItem("businessUnits");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Verifica que tenga la estructura correcta
        if (
          Array.isArray(parsed) &&
          parsed.some((unit) => unit.id === "Unidades de Negocio")
        ) {
          return parsed;
        }
      } catch (e) {
        console.error("Error parsing saved units", e);
      }
    }

    // Estado por defecto
    return [
      {
        id: "Unidades de Negocio",
        name: "Unidades de Negocio",
        tests: [],
      },
    ];
  });

  const defaultTest = {
    name: "unit1011",
    git_config: {
      repo_url:
        "https://dev.azure.com/celuweb20/Celuweb%20QA/_git/ProyectoMovilQA",
      username: "nelson.apache",
      password:
        "DDKTau0LWdqS3VT759OZVBr7U6iwvNDVoWZDCmSIhJdwqUS08D4JJQQJ99BFACAAAAAJvLs9AAASAZDO2WEM",
      branch: "DSD/Zenu1011/feature/Richard",
    },
    db_config: {
      username: "zenu",
      password: "zenu123",
      database: "zenudb",
      host_port: 15433,
    },
    emulator_config: {
      api_level: "31",
      device: "pixel_4",
      ports: {
        adb_host_port: 15556,
        appium_host_port: 14724,
      },
      language: "es",
      locale: "CO",
      timezone: "America/Bogota",
    },
    test_runner_config: {
      cucumber_tags: "@campoUsuarioLogin",
      test_runner_name: "TestRunnerNelson",
      max_retry: 1,
      report_path: "/reports/unit1011",
      host_port: 18003,
      execution_mode: "testRunner",
    },
    microservice_config: {
      host_port: 18004,
      host: "0.0.0.0",
    },
    apk_config: {
      download_url:
        "https://celuwebcom-my.sharepoint.com/:u:/g/personal/nelson_apache_celuweb_com/EXJgS0cbi6FBtU-ahp77084Bq9KMcgAPdEvGzK78K2QQaQ?e=FkPNKI",
      filename: "CwQA_vR315.apk",
      version: "1.0.283",
    },
    resource_limits: {
      database: {
        cpu: "0.5",
        memory: "512m",
      },
      microservice: {
        cpu: "0.5",
        memory: "256m",
      },
      test_runner: {
        cpu: "2.0",
        memory: "3g",
      },
      emulator: {
        cpu: "4.0",
        memory: "4g",
      },
    },
  };

  const [newTestJson, setNewTestJson] = useState(
    JSON.stringify(defaultTest, null, 2)
  );
  const handleRunTests = async () => {
    // Validación inicial
    if (selectedTests.length === 0) {
      const result = await Swal.fire({
        icon: "error",
        title: "Por favor, selecciona al menos una prueba.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "var(--primary)",
        background: "white",
        color: "black",
      });
      if (!result.isConfirmed) {
        return;
      }
      return;
    }

    setIsRunning(true);
    const token = localStorage.getItem("access_token");

    if (!token) {
      console.error("No se encontró el token de acceso.");
      setIsRunning(false);
      return;
    }

    // Obtener pruebas seleccionadas
    const mainUnit = businessUnits.find(
      (unit) => unit.id === "Unidades de Negocio"
    );
    const testsToRun =
      mainUnit?.tests.filter(
        (test) =>
          selectedTests.includes(test.id) || selectedTests.includes(test.name)
      ) || [];

    console.log("Pruebas a ejecutar:", testsToRun); // Debug

    if (testsToRun.length === 0) {
      console.error("No se encontraron pruebas coincidentes con la selección");
      setIsRunning(false);
      return;
    }

    try {
      // 1. Recargar unidades
      const reloadPromises = [
        fetch("https://testing-api-gateway.sandboxcw.net/api/business-units", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }),
        fetch("https://testing-api-gateway.sandboxcw.net/reload-units", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }),
      ];

      const [reloadResponse, reloadResponseBusinessUnit] = await Promise.all(
        reloadPromises
      );

      if (!reloadResponse.ok) console.warn("No se pudo recargar las unidades.");
      if (!reloadResponseBusinessUnit.ok)
        console.warn("No se pudo recargar las unidades (business).");

      // Pequeña pausa para asegurar la recarga
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 2. Ejecutar pruebas seleccionadas
      const executionPromises = testsToRun.map(async (test) => {
        try {
          const endpoint = `https://testing-api-gateway.sandboxcw.net/api/units/${test.name}/test-runs`;
          console.log(`Iniciando ejecución de ${test.name}`);

          const response = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              name: `Ejecución de ${test.name}`,
              testRunner:
                test.test_runner_config?.test_runner_name ||
                "TestRunnerDefault",
            }),
          });

          const result = await response.json();
          console.log(`Resultado de ${test.name}:`, result);
          return result;
        } catch (err) {
          console.error(`Error en ${test.name}:`, err);
          return { error: true, message: err.message };
        }
      });

      const results = await Promise.all(executionPromises);
      console.log("Resultados completos:", results);
    } catch (error) {
      console.error("Error general en la ejecución:", error);
    } finally {
      setIsRunning(false);
    }
  };
  // 2. Modifica el useEffect de carga de datos
  useEffect(() => {
    const fetchInitialData = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      try {
        const response = await fetch(
          "https://testing-api-gateway.sandboxcw.net/api/business-units",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const units = await response.json();
          const validUnits = Array.isArray(units) ? units : [];

          // Actualiza el estado manteniendo cualquier dato local que no esté en el backend
          setBusinessUnits((prevUnits) => {
            const mainUnit = prevUnits.find(
              (unit) => unit.id === "Unidades de Negocio"
            ) || {
              id: "Unidades de Negocio",
              name: "Unidades de Negocio",
              tests: [],
            };

            // Combina tests locales con los del backend, evitando duplicados
            const mergedTests = [
              ...mainUnit.tests.filter(
                (localTest) =>
                  !validUnits.some(
                    (backendTest) => backendTest.name === localTest.name
                  )
              ),
              ...validUnits,
            ];

            return [
              {
                ...mainUnit,
                tests: mergedTests,
              },
            ];
          });
        }
      } catch (err) {
        console.error("Error al cargar unidades:", err);
      }
    };

    fetchInitialData();
  }, []);
  const handleJsonChange = (e) => {
    setNewTestJson(e.target.value);
  };

  const handleSaveNewTest = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    try {
      const newTest = JSON.parse(newTestJson);
      newTest.id = newTest.id || `${newTest.name}-${Date.now()}`;

      // Guardar en el backend
      const response = await fetch(
        "https://testing-api-gateway.sandboxcw.net/api/business-units/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newTest),
        }
      );

      if (!response.ok) throw new Error("Error al guardar en el backend");

      const savedTest = await response.json();

      // Actualizar el estado local
      setBusinessUnits((prevUnits) =>
        prevUnits.map((unit) =>
          unit.id === "Unidades de Negocio"
            ? {
                ...unit,
                tests: [...unit.tests, savedTest],
              }
            : unit
        )
      );

      // Resetear el formulario
      setNewTestJson(JSON.stringify(defaultTest, null, 2));
      setActiveTab("Unidades de Negocio");
    } catch (err) {
      console.error("Error al guardar unidad:", err);
      alert(
        "Error al guardar la unidad. Verifica la consola para más detalles."
      );
    }
  };

  const handleDeleteTest = async (testId) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "¿Estás seguro?",
      text: `Vas a eliminar la unidad: ${testId.name}?`,
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "var(--primary)",
      background: "white",
      color: "black",
    });

    if (!result.isConfirmed) {
      console.log("Cancelado");
      return; // Salimos si cancela
    }

    const deleteEndpoint = `https://testing-api-gateway.sandboxcw.net/api/business-units/${testId.name}`;
    const token = localStorage.getItem("access_token");

    if (!token) {
      console.error("Token no encontrado.");
      return;
    }

    try {
      // Primero actualiza el estado local para reflejar el cambio inmediatamente
      setBusinessUnits((prevUnits) =>
        prevUnits.map((unit) =>
          unit.id === "Unidades de Negocio"
            ? {
                ...unit,
                tests: unit.tests.filter((test) => test.name !== testId.name),
              }
            : unit
        )
      );

      // Luego realiza la llamada al backend
      const response = await fetch(deleteEndpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error al eliminar: ${response.statusText}`);
      }

      console.log(`Unidad ${testId.name} eliminada exitosamente.`);

      // Finalmente, fuerza una recarga limpia del backend
      setNeedsRefresh(true);
    } catch (error) {
      console.error("Error al eliminar unidad de negocio:", error);
      // Si hay error, recargamos para restaurar el estado
      setNeedsRefresh(true);
    }
  };
  const handleCheckboxChange = (testName) => {
    setSelectedTests((prevSelected) => {
      // Si ya está seleccionado, lo removemos
      if (prevSelected.includes(testName)) {
        return prevSelected.filter((name) => name !== testName);
      }
      // Si no está seleccionado, lo agregamos
      else {
        return [...prevSelected, testName];
      }
    });
  };

  useEffect(() => {
    localStorage.setItem("businessUnits", JSON.stringify(businessUnits));
  }, [businessUnits]);

  return (
    <div className="execution-panel-card">
      <div className="card-header">
        <h2>Panel de ejecución</h2>
        <p>Seleccione la unidad de negocio a ejecutar</p>
      </div>

      <div className="card-content">
        <div className="tabs">
          <div className="tabs-list">
            <button
              className={`tab-button ${
                activeTab === "Unidades de Negocio" ? "active" : ""
              }`}
              onClick={() => setActiveTab("Unidades de Negocio")}
            >
              Unidades de Negocio
            </button>
            <button
              className={`tab-button ${activeTab === "add" ? "active" : ""}`}
              onClick={() => setActiveTab("add")}
            >
              Agregar unidad de negocio
            </button>
          </div>

          {/* Panel de Unidades de Negocio */}
          {businessUnits
            .filter((unit) => unit.id === "Unidades de Negocio")
            .map((unit) => (
              <div
                key={unit.id}
                className={`tab-content ${
                  activeTab === unit.id ? "active" : ""
                }`}
              >
                <div className="unit-header">
                  <h3>{unit.name}</h3>
                </div>
                <div className="tests-list">
                  {Array.isArray(unit.tests) &&
                    unit.tests.map((test) => (
                      <div key={test.id} className="test-item">
                        <label className="checkbox-container">
                          <input
                            type="checkbox"
                            id={test.id}
                            checked={selectedTests.includes(test.name)}
                            onChange={() => handleCheckboxChange(test.name)}
                          />
                          <span className="checkmark"></span>
                          <span className="test-name">{test.name}</span>
                        </label>
                        <span className="test-duration">2.1s</span>

                        <button
                          // onClick={() => handleSaveNewTest(test.name)}
                          style={{
                            marginLeft: "10px",
                            background: "transparent",
                            color: "red",
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          {/* Editar */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="svg-edit"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                            />
                          </svg>
                        </button>

                        <button
                          onClick={() => handleDeleteTest(test)}
                          style={{
                            marginLeft: "10px",
                            background: "transparent",
                            color: "red",
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          🗑
                        </button>
                        {/* <div>
                          {showDeleteModal && (
                            <ConfirmationModal
                              message="¿Desea eliminar la unidad de negocio?"
                              onConfirm={handleConfirmDelete}
                              onCancel={handleCancelDelete}
                            />
                          )}
                        </div> */}
                      </div>
                    ))}
                </div>
              </div>
            ))}

          {/* Panel para agregar unidad */}
          {activeTab === "add" && (
            <div className="tab-content active">
              <h3>Agregar nueva unidad de negocio</h3>
              <textarea
                style={{ width: "100%", height: "200px", marginTop: "10px" }}
                value={newTestJson}
                onChange={handleJsonChange}
              />
              <button
                className="btn primary-btn full-width"
                style={{ marginTop: "10px" }}
                onClick={handleSaveNewTest}
              >
                Guardar Unidad de Negocio
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="card-footer">
        <button
          className="btn primary-btn full-width"
          onClick={handleRunTests}
          disabled={isRunning}
        >
          {isRunning ? (
            <>
              <svg className="spinner" width="16" height="16" />
              Ejecutando pruebas...
            </>
          ) : (
            <>
              <svg width="16" height="16" />
              Ejecutar pruebas seleccionadas
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default TestExecutionPanel;
