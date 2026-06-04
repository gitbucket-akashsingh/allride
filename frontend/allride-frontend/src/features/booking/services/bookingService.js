export const createRideBooking = async (bookingData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        rideId: "RIDE_" + Date.now(),
        ...bookingData,
      });
    }, 1500);
  });
};
