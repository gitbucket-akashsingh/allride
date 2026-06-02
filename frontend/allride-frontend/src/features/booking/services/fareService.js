export const calculateFare = (rideType, distance = 5) => {
  return rideType.baseFare + distance * rideType.pricePerKm;
};
