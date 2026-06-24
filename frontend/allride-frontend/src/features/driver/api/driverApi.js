import api from "@/shared/api/axios";

// ── Driver profile & status ──────────────────────────────
export const getDriverProfile = () => api.get("/driver/profile");

export const createDriverProfile = (data) =>
  api.post("/driver/profile", data);

export const goOnline = () => api.post("/driver/online");

export const goOffline = () => api.post("/driver/offline");

export const updateDriverLocation = (latitude, longitude) =>
  api.post("/driver/location", { latitude, longitude });

// ── Ride actions (driver) ────────────────────────────────
export const getAvailableRides = () => api.get("/rides/available");

export const acceptRide = (rideId) => api.post(`/rides/${rideId}/accept`);

export const startRide = (rideId) => api.post(`/rides/${rideId}/start`);

export const completeRide = (rideId) => api.post(`/rides/${rideId}/complete`);

export const cancelRide = (rideId) => api.post(`/rides/${rideId}/cancel`);

export const getMyRides = () => api.get("/rides/my-rides");

export const getActiveRide = async () => {
  const res = await api.get("/rides/active");
  if (res.status === 204 || !res.data) return null;
  return res.data;
};