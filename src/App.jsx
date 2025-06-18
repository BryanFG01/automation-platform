import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import Dashboard from "./pages/Dashboard";
import RunTests from "./pages/RunTests";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import PrivateRoute from "./hooks/PrivateRoute"; // importa el PrivateRoute

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />

        {/* Rutas protegidas */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/run-tests"
          element={
            <PrivateRoute>
              <RunTests />
            </PrivateRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <PrivateRoute>
              <Reports />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
