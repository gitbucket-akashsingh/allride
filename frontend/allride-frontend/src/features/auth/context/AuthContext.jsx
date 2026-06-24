import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../api/authApi";
import {  logoutUser } from "../services/authService";
import {
  getAccessToken,
  clearAuthData,
} from "@/features/auth/utils/authStorage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = getAccessToken();

        if (!token) {
          setLoading(false);
          return;
        }

        const response = await getCurrentUser();

        setUser(response.data);
      } catch (error) {
        clearAuthData();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /*
    LOGIN
  */

  const login = (userData) => {

    setUser(userData);
  };

  /*
    LOGOUT
  */

    const logout = async () => {
      await logoutUser();
      setUser(null);
    };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
