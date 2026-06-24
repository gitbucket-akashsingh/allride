import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";
import { getRedirectPathByRole } from "@/features/auth/utils/roleRedirect";

function PublicRoute() {
  const { loading, isAuthenticated, user } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (isAuthenticated && user?.role) {
    return <Navigate to={getRedirectPathByRole(user.role)} replace />;
  }

  return <Outlet />;
}

export default PublicRoute;