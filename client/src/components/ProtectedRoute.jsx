import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    // Redirect to login if not logged in
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
