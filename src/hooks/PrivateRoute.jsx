// hooks/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PrivateRoute;
