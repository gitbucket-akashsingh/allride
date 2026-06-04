import { login } from "../api/authApi";
import { saveAuthData } from "@/features/auth/utils/authStorage";

export const loginUser = async (credentials) => {
  const response = await login(credentials);

  const { user, tokens } = response.data;

  saveAuthData(tokens, user);

  return user;
};
