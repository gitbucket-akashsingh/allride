import api from "@/shared/api/axios";

export const signup = async (data) => {
  return api.post("/auth/signup", data);
};

export const login = async (data) => {
  return api.post("/auth/login", data);
};

export const getCurrentUser = async () => {
  return api.get("/auth/me");
};

export const refresh = async (refreshToken) => {
  return api.post("/auth/refresh", { refreshToken });
};

export const logout = async (refreshToken) => {
  return api.post("/auth/logout", { refreshToken });
};
