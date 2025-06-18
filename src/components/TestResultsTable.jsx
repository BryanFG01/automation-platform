import "../styles/test-results-table.css";

function TestResultsTable() {
  const testResults = [
    {
      id: "TEST-001",
      name: "Zenu-Surtidores",
      status: "success",
      duration: "1.2s",
      timestamp: "Hoy 10:23",
    },
    {
      id: "TEST-002",
      name: "Argos-1008",
      status: "failed",
      duration: "3.5s",
      timestamp: "Hoy 10:25",
    },
    {
      id: "TEST-003",
      name: "Argos-1014",
      status: "success",
      duration: "2.1s",
      timestamp: "Hoy 10:30",
    },
    // {
    //   id: "TEST-004",
    //   name: "Product Search",
    //   status: "success",
    //   duration: "1.8s",
    //   timestamp: "Hoy 10:35",
    // },
    // {
    //   id: "TEST-005",
    //   name: "Checkout Process",
    //   status: "running",
    //   duration: "2.7s",
    //   timestamp: "Hoy 10:40",
    // },
  ];

  return (
    <div className="table-card">
      <div className="card-header">
        <h2>Resultados recientes</h2>
        <p>Últimas pruebas ejecutadas en la plataforma</p>
      </div>
      <div className="card-content">
        <div className="table-container">
          <table className="results-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Prueba</th>
                <th>Estado</th>
                <th>Duración</th>
                <th>Hora</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {testResults.map((test) => (
                <tr key={test.id}>
                  <td className="id-cell">{test.id}</td>
                  <td>{test.name}</td>
                  <td>
                    {test.status === "success" && (
                      <span className="status-badge success">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        Exitoso
                      </span>
                    )}
                    {test.status === "failed" && (
                      <span className="status-badge error">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="15" y1="9" x2="9" y2="15"></line>
                          <line x1="9" y1="9" x2="15" y2="15"></line>
                        </svg>
                        Fallido
                      </span>
                    )}
                    {test.status === "running" && (
                      <span className="status-badge running">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="spinner"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        En proceso
                      </span>
                    )}
                  </td>
                  <td>{test.duration}</td>
                  <td>{test.timestamp}</td>
                  <td>
                    <button className="icon-button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      <span className="sr-only">Ver detalles</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TestResultsTable;
