import { login } from "../api/authApi";
import { signup } from "../api/authApi";
import { saveAuthData } from "@/features/auth/utils/authStorage";

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
