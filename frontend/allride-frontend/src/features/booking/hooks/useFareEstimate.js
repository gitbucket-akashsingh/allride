import { useEffect } from "react";

import useBookingStore from "../store/bookingStore";

import { calculateFare } from "../services/fareService";

const useFareEstimate = () => {
  const selectedRideType = useBookingStore((state) => state.selectedRideType);

  const setEstimatedFare = useBookingStore((state) => state.setEstimatedFare);

  useEffect(() => {
    if (!selectedRideType) return;

    const fare = calculateFare(selectedRideType);

    setEstimatedFare(fare);
  }, [selectedRideType, setEstimatedFare]);
};

export default useFareEstimate;
