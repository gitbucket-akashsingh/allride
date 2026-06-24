import api from "@/shared/api/axios";

export const estimateFare = ({ pickup, destination }) =>
  api.post("/rides/estimate", {
    pickupLatitude: pickup.latitude,
    pickupLongitude: pickup.longitude,
    pickupAddress: pickup.label,
    dropLatitude: destination.latitude,
    dropLongitude: destination.longitude,
    dropAddress: destination.label,
  });

export const requestRide = ({ pickup, destination }) =>
  api.post("/rides/request", {
    pickupLatitude: pickup.latitude,
    pickupLongitude: pickup.longitude,
    pickupAddress: pickup.label,
    dropLatitude: destination.latitude,
    dropLongitude: destination.longitude,
    dropAddress: destination.label,
  });

export const getRideStatus = (rideId) =>
  api.get(`/rides/${rideId}/status`);

export const getMyRides = () =>
  api.get("/rides/my-rides");

export const cancelRide = (rideId) =>
  api.post(`/rides/${rideId}/cancel`);

export const getActiveRide = async () => {
  const res = await api.get("/rides/active");
  if (res.status === 204 || !res.data) return null;
  return res.data;
};