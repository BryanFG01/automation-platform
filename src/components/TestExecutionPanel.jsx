"use client";

import { useState, useEffect } from "react";

import "../styles/test-execution-panel.css";

function TestExecutionPanel() {
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState("Unidades de Negocio");
  const [selectedTests, setSelectedTests] = useState([]);

  const [businessUnits, setBusinessUnits] = useState(() => {
    const saved = localStorage.getItem("businessUnits");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: "Unidades de Negocio",
            name: "Unidades de Negocio",
            tests: [],
          },
        ];
  });
  useEffect(() => {
    localStorage.setItem("businessUnits", JSON.stringify(businessUnits));
  }, [businessUnits]);

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
    setIsRunning(true);

    const token = localStorage.getItem("access_token");

    const allTests =
      businessUnits.find((unit) => unit.id === "Unidades de Negocio")?.tests ||
      [];

    const testsToRun = allTests.filter((test) =>
      selectedTests.includes(test.id)
    );

    if (!token) {
      console.error("No se encontró el token de acceso.");
      setIsRunning(false);
      return;
    }

    // 1. 🔄 Llamar a la API para recargar unidades
    try {
      const reloadResponse = await fetch(
        "https://testing-api-gateway.sandboxcw.net/api/business-units/",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!reloadResponse.ok) {
        console.warn("No se pudo recargar las unidades.");
      } else {
        console.log("Unidades recargadas correctamente.");
      }

      // esperar un momento por si la recarga es asíncrona internamente
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Error al recargar unidades:", error);
      setIsRunning(false);
      return;
    }

    // 2. 🚀 Ejecutar pruebas luego de recargar unidades
    for (const test of testsToRun) {
      const endpoint = `https://testing-api-gateway.sandboxcw.net/api/units/${test.id}/test-runs`;

      console.log(`Ejecutando ${test.name}`);

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: "Prueba con testRunner especifico",
            testRunner:
              test.test_runner_config?.test_runner_name || "TestRunnerDefault",
          }),
        });

        const result = await response.json();
        console.log(`Resultado para ${test.name}:`, result);
      } catch (err) {
        console.error(`Error ejecutando ${test.name}:`, err);
      }
    }

    setIsRunning(false);
  };

  const getBusinessUnit = () => {
    const url = "https://testing-api-gateway.sandboxcw.net/api/business-units";
    const token = localStorage.getItem("access_token");
    // console.log(token);

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // fetch(url, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error(`HTTPS error! Status: ${response.status}`);
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  };

  const handleJsonChange = (e) => {
    setNewTestJson(e.target.value);
  };

  const handleSaveNewTest = async () => {
    const guardarUnidadEndpoint = `https://testing-api-gateway.sandboxcw.net/api/business-units/`;
    const token = localStorage.getItem("access_token");

    try {
      const newTest = JSON.parse(newTestJson);

      // // Asignar un ID si no viene definido
      // newTest.id = newTest.id || newTest.name;

      // 🔄 Enviar al backend
      const response = await fetch(guardarUnidadEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTest),
      });

      if (!response.ok) {
        console.Error(`Error en el guardado: ${response.statusText}`);
      }

      const savedTest = await response.json();

      // ✅ Actualizar el estado local después de guardar exitosamente
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

      setNewTestJson(JSON.stringify(defaultTest, null, 2));
      setActiveTab("Unidades de Negocio");
      console.log("Unidad guardada correctamente.");
    } catch (err) {
      alert("JSON inválido o error en la API.");
      console.error(err);
    }
  };

  const handleDeleteTest = async (testId) => {
    console.log(`Eliminando unidad ${testId.id}`);
    console.log(Object.keys(testId));

    const deleteEndpoint = `https://testing-api-gateway.sandboxcw.net/api/business-units/${testId.name}`;
    const token = localStorage.getItem("access_token");

    if (!token) {
      console.error("Token no encontrado.");
      return;
    }

    try {
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

      // ✅ Elimina del estado para evitar duplicados en el render
      setBusinessUnits((prevUnits) =>
        prevUnits.filter((unit) => unit.name !== testId.name)
      );

      console.log(`Unidad ${testId} eliminada exitosamente.`);
    } catch (error) {
      console.error("Error al eliminar unidad de negocio:", error);
    }
  };

  const handleCheckboxChange = (testId) => {
    setSelectedTests((prevSelected) =>
      prevSelected.includes(testId)
        ? prevSelected.filter((id) => id !== testId)
        : [...prevSelected, testId]
    );
  };

  useEffect(() => {
    getBusinessUnit();
  }, []);

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
                  {unit.tests.map((test) => (
                    <div key={test.id} className="test-item">
                      <label className="checkbox-container">
                        <input
                          type="checkbox"
                          id={test.id}
                          checked={selectedTests.includes(test.id)}
                          onChange={() => handleCheckboxChange(test.id)}
                        />

                        <span className="checkmark"> </span>
                        <span className="test-name">{test.name}</span>
                      </label>
                      <span className="test-duration">2.1s</span>

                      <button
                        // onClick={() => handleDeleteTest(test.id)}
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
