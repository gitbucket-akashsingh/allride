import { useNavigate } from "react-router-dom";

import { clearAuthData } from "@/features/auth/utils/authStorage";

function useLogout() {
  const navigate = useNavigate();

  const logout = () => {
    // CLEAR AUTH STORAGE
    clearAuthData();

    // OPTIONAL:
    // clear caches
    // reset stores
    // disconnect sockets

    // REDIRECT TO LOGIN
    navigate("/login", {
      replace: true,
    });
  };

  return logout;
}

export default useLogout;
