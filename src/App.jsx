import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import RunTests from "./pages/RunTests";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import PrivateRoute from "./hooks/PrivateRoute"; // importa el PrivateRoute
import PublicLayout from "./layouts/PublicLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* Rutas protegidas */}
        <Route element={<PrivateRoute />}>
          <Route index path="/dashboard" element={<Dashboard />} />
          <Route path="/run-tests" element={<RunTests />} />
          {/* <Route path="/reports" element={<Reports />} /> */}
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
