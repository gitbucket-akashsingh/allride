import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { loginUser } from "@/features/auth/services/authService";

import { getRedirectPathByRole } from "@/features/auth/utils/roleRedirect";

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
      const code = error?.response?.data?.code;
      const message =
        error?.response?.data?.message || error.message || "Login failed";
      if (code === "EMAIL_NOT_VERIFIED") {
        toast.error("Please verify your email first.");
        navigate("/verify-otp", {
          state: { email: credentials.email },
        });
        return;
      }
      toast.error(message);
    }
  };

  return {
    handleLogin,
  };
};
