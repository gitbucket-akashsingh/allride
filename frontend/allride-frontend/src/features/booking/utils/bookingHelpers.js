export const isBookingValid = ({ pickup, destination, selectedRideType }) => {
  return pickup && destination && selectedRideType;
};
