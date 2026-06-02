import BookingPanel from "../components/BookingPanel";

import SearchingDriver from "../components/SearchingDriver";

import DriverAssignedCard from "../components/DriverAssignedCard";

import DriverArrivingCard from "../components/DriverArrivingCard";

import RideStartedCard from "../components/RideStartedCard";

import RideCompletedCard from "../components/RideCompletedCard";

import useBookingStore from "../store/bookingStore";

import useFareEstimate from "../hooks/useFareEstimate";

import useRideSimulation from "../hooks/useRideSimulation";

import { BOOKING_STEPS } from "../constants/bookingSteps";

const RiderBookingPage = () => {
  useFareEstimate();

  useRideSimulation();

  const bookingStep = useBookingStore((state) => state.bookingStep);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-5">
        <BookingPanel />

        {bookingStep === BOOKING_STEPS.SEARCHING_DRIVER && <SearchingDriver />}

        {(bookingStep === BOOKING_STEPS.DRIVER_ASSIGNED ||
          bookingStep === BOOKING_STEPS.DRIVER_ARRIVING ||
          bookingStep === BOOKING_STEPS.RIDE_STARTED ||
          bookingStep === BOOKING_STEPS.RIDE_COMPLETED) && (
          <DriverAssignedCard />
        )}

        {bookingStep === BOOKING_STEPS.DRIVER_ARRIVING && (
          <DriverArrivingCard />
        )}

        {bookingStep === BOOKING_STEPS.RIDE_STARTED && <RideStartedCard />}

        {bookingStep === BOOKING_STEPS.RIDE_COMPLETED && <RideCompletedCard />}
      </div>
    </div>
  );
};

export default RiderBookingPage;
