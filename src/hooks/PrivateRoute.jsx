// hooks/PrivateRoute.jsx
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoute() {
  const token = localStorage.getItem('access_token')

  if (!token) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default PrivateRoute
