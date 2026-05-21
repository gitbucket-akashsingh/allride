import { Navigate, Outlet } from "react-router-dom";
import { getAuthData } from "@/features/auth/utils/authStorage";

function RoleBasedRoute({ allowedRoles = [] }) {
  const { token, user } = getAuthData();

  // NOT AUTHENTICATED
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // ROLE NOT ALLOWED
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ACCESS GRANTED
  return <Outlet />;
}

export default RoleBasedRoute;
