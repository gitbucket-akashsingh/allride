import { Navigate, Outlet } from "react-router-dom";
// check useAuth or useLogin
// import { useAuth } from "@/features/auth/context/AuthContext";
import { getAuthData } from "@/features/auth/utils/authStorage";

function ProtectedRoute() {
  // const { isAuthenticated } = useAuth();
  const { token } = getAuthData();

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // USER AUTHENTICATED
  return <Outlet />;
}

export default ProtectedRoute;
