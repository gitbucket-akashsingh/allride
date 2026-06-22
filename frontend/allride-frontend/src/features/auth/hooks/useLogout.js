import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";

function useLogout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return async () => {
    await logout();
    navigate("/login", {replace: true });
  };

}

export default useLogout;
