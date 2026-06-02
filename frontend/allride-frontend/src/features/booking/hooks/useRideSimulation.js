import { useEffect } from "react";

import useBookingStore from "../store/bookingStore";

import { BOOKING_STEPS } from "../constants/bookingSteps";

const mockDriver = {
  name: "Rahul Sharma",

  vehicle: "Honda City",

  plate: "DL01AB1234",

  rating: 4.9,

  eta: "4 mins",
};

const useRideSimulation = () => {
  const bookingStep = useBookingStore((state) => state.bookingStep);

  const setAssignedDriver = useBookingStore((state) => state.setAssignedDriver);

  const setBookingStep = useBookingStore((state) => state.setBookingStep);

  useEffect(() => {
    if (bookingStep !== BOOKING_STEPS.SEARCHING_DRIVER) return;

    const assignedTimer = setTimeout(() => {
      setAssignedDriver(mockDriver);

      setBookingStep(BOOKING_STEPS.DRIVER_ASSIGNED);
    }, 3000);

    const arrivingTimer = setTimeout(() => {
      setBookingStep(BOOKING_STEPS.DRIVER_ARRIVING);
    }, 6000);

    const startedTimer = setTimeout(() => {
      setBookingStep(BOOKING_STEPS.RIDE_STARTED);
    }, 10000);

    const completedTimer = setTimeout(() => {
      setBookingStep(BOOKING_STEPS.RIDE_COMPLETED);
    }, 15000);

    return () => {
      clearTimeout(assignedTimer);
      clearTimeout(arrivingTimer);
      clearTimeout(startedTimer);
      clearTimeout(completedTimer);
    };
  }, [bookingStep, setAssignedDriver, setBookingStep]);
};

export default useRideSimulation;
