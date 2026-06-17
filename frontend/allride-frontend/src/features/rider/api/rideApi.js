import api from "@/shared/api/axios";

export const requestRide = ({ pickup, destination }) =>
  api.post("/rides/request", {
    pickupLatitude: pickup.latitude,
    pickupLongitude: pickup.longitude,
    pickupAddress: pickup.label,
    dropLatitude: destination.latitude,
    dropLongitude: destination.longitude,
    dropAddress: destination.label,
  });

  // New — polls ride status
export const getRideStatus = (rideId) =>
    api.get(`/rides/${rideId}/status`);

export const getMyRides = () =>
    api.get("/rides/my-rides");

// Returns the most recent non-completed, non-cancelled ride
export const getActiveRide = async () => {
    const res = await api.get("/rides/my-rides");
    const rides = res.data || [];
    const active = rides.find((r) =>
      ["REQUESTED", "ACCEPTED", "STARTED"].includes(r.status)
    );
    return active ?? null;
  };