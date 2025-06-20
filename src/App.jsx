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
        <Route element={<PrivateRoute />}>
          <Route index path="/dashboard" element={<Dashboard />} />
          <Route path="/run-tests" element={<RunTests />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
