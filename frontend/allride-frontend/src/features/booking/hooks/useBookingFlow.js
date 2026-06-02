import useBookingStore from "../store/bookingStore";

import { BOOKING_STEPS } from "../constants/bookingSteps";

const useBookingFlow = () => {
  const setBookingStep = useBookingStore((state) => state.setBookingStep);

  const startSearchingDriver = () => {
    setBookingStep(BOOKING_STEPS.SEARCHING_DRIVER);
  };

  return {
    startSearchingDriver,
  };
};

export default useBookingFlow;
