import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  updateAccessToken,
  clearAuthData,
} from "@/features/auth/utils/authStorage";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest || originalRequest._retry) {
      return Promise.reject(error);
    }

    const isAuthEndpoint =
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/signup") ||
      originalRequest.url?.includes("/auth/verify-email") ||
      originalRequest.url?.includes("/auth/resend-otp") ||
      originalRequest.url?.includes("/auth/refresh") ||
      originalRequest.url?.includes("/auth/logout");

    if (error.response?.status !== 401 || isAuthEndpoint) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      clearAuthData();
      window.location.href = "/login";
      return Promise.reject(error);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
        { refreshToken },
        { headers: { "Content-Type": "application/json" } }
      );

      const newAccessToken = response.data.accessToken;
      updateAccessToken(newAccessToken);
      processQueue(null, newAccessToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      clearAuthData();
      window.location.href = "/login";
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;