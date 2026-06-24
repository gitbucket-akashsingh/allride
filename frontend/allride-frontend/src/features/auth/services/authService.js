import { login, signup, logout } from "../api/authApi";
import {
  saveAuthData,
  clearAuthData,
  getRefreshToken,
} from "@/features/auth/utils/authStorage";


export const loginUser = async (credentials) => {
  const response = await login(credentials);

  const { user, tokens } = response.data;

  saveAuthData(tokens, user);

  return user;
};

export const signupUser = async (data) => {
  const response = await signup({
    email: data.email,
    password: data.password,
    fullName: data.fullName,
    phone: data.phone,
    role: data.role, // "RIDER" or "DRIVER"
  });
  return response.data;
};


export const logoutUser = async () => {
  const refreshToken = getRefreshToken();
  if (refreshToken) {
    try {
      await logout(refreshToken);
    } catch {
      // still clear local session even if server call fails
    }
  }
  clearAuthData();
};