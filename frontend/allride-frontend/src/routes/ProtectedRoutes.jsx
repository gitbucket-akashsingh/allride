import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return children;
}

export default ProtectedRoute;
