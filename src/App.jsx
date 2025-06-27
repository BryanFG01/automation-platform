import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { NotificationContainer } from './components/Notificaciones/NotificationContainer'
import PrivateRoute from './hooks/PrivateRoute' // importa el PrivateRoute
import PublicLayout from './layouts/PublicLayout'
import Dashboard from './pages/Dashboard'
import LoginPage from './pages/LoginPage'
import RunTests from './pages/RunTests'
import Settings from './pages/Settings'
import WelcomePage from './pages/WelcomePage'
import { useNotificationStore } from './stores/useNotificationStore'

function App() {
  const { notifications, removeNotification } = useNotificationStore()

  return (
    <>
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

      <NotificationContainer notifications={notifications} onClose={removeNotification} />
    </>
  )
}

export default App
