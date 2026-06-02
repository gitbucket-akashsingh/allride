import { create } from "zustand";

import { BOOKING_STEPS } from "../constants/bookingSteps";

const useBookingStore = create((set) => ({
  pickup: "",

  destination: "",

  selectedRideType: null,

  estimatedFare: null,

  bookingStep: BOOKING_STEPS.IDLE,

  assignedDriver: null,

  rideOTP: "4821",

  paymentMethod: "Cash",

  setPickup: (pickup) =>
    set({
      pickup,
    }),

  setDestination: (destination) =>
    set({
      destination,
    }),

  setSelectedRideType: (rideType) =>
    set({
      selectedRideType: rideType,
    }),

  setEstimatedFare: (fare) =>
    set({
      estimatedFare: fare,
    }),

  setBookingStep: (step) =>
    set({
      bookingStep: step,
    }),

  setAssignedDriver: (driver) =>
    set({
      assignedDriver: driver,
    }),

  resetBooking: () =>
    set({
      pickup: "",
      destination: "",
      selectedRideType: null,
      estimatedFare: null,
      bookingStep: BOOKING_STEPS.IDLE,
      assignedDriver: null,
    }),
}));

export default useBookingStore;
