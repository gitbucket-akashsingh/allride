import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";
import { getRedirectPathByRole } from "@/features/auth/utils/roleRedirect";

export function useRoleAction() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const goToSignupOrDashboard = (role) => {
    if (!isAuthenticated) {
      navigate(`/signup?role=${role.toLowerCase()}`);
      return;
    }
    navigate(getRedirectPathByRole(user.role?.toUpperCase()));
  };

  return {
    goToRider: () => goToSignupOrDashboard("rider"),
    goToDriver: () => goToSignupOrDashboard("driver"),
  };
}