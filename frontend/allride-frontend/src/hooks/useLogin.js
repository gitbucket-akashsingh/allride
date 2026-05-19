import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { loginUser } from "../services/authService";

import { getRedirectPathByRole } from "../utils/roleRedirect";

import { useAuth } from "../context/AuthContext";

export const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (credentials) => {
    try {
      /*
        LOGIN
      */

      const user = await loginUser(credentials);

      console.log("LOGGED IN USER:", user);

      /*
        UPDATE CONTEXT
      */

      login(user);

      /*
        SAFETY CHECK
      */

      if (!user || !user.role) {
        throw new Error("User role missing");
      }

      /*
        SUCCESS
      */

      toast.success("Login successful");

      /*
        REDIRECT
      */

      const redirectPath = getRedirectPathByRole(user.role);

      console.log("REDIRECT PATH:", redirectPath);

      navigate(redirectPath);
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      const message =
        error?.response?.data?.message || error.message || "Login failed";

      toast.error(message);
    }
  };

  return {
    handleLogin,
  };
};
