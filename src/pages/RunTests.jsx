import DashboardLayout from "../components/DashboardLayout";
import DashboardHeader from "../components/DashboardHeader";
import TestExecutionPanel from "../components/TestExecutionPanel";
import EmulatorView from "../components/EmulatorView";
import Logs from "../components/Logs";
import "../styles/run-tests.css";

function RunTests() {
  return (
    <DashboardLayout>
      <div className="run-tests-container">
        <DashboardHeader />
        <main className="run-tests-main">
          <h1>Ejecutar pruebas</h1>
          <div className="run-tests-panels">
            <TestExecutionPanel />
            {/* <Logs /> */}
            <EmulatorView />
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
}

export default RunTests;
