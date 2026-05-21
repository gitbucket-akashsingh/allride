import { Navigate, Outlet } from "react-router-dom";
import { getAuthData } from "@/features/auth/utils/authStorage";

function PublicRoute() {
  const { token, user } = getAuthData();

  // USER ALREADY LOGGED IN
  if (token && user) {
    // REDIRECT BASED ON ROLE
    if (user.role === "RIDER") {
      return <Navigate to="/rider/home" replace />;
    }

    if (user.role === "DRIVER") {
      return <Navigate to="/driver/home" replace />;
    }
  }

  // USER NOT LOGGED IN
  return <Outlet />;
}

export default PublicRoute;
