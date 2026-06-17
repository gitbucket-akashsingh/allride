import api from "@/shared/api/axios";

export const getAvailableRides = () => api.get("/rides/available");
export const acceptRide = (rideId) => api.post(`/rides/${rideId}/accept`);
export const startRide = (rideId) => api.post(`/rides/${rideId}/start`);
export const completeRide = (rideId) => api.post(`/rides/${rideId}/complete`);
export const cancelRide = (rideId) => api.post(`/rides/${rideId}/cancel`);
export const getMyRides = () => api.get("/rides/my-rides");

export const getActiveRide = async () => {
  const res = await api.get("/rides/my-rides");
  return (res.data || []).find((r) =>
    ["ACCEPTED", "STARTED"].includes(r.status)
  ) ?? null;
};