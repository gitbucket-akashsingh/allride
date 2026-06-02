import { useState } from "react";

import ConfirmRideModal from "./ConfirmRideModal";

import useBookingStore from "../store/bookingStore";

import { isBookingValid } from "../utils/bookingHelpers";

import useBookingFlow from "../hooks/useBookingFlow";

const RideActionButton = () => {
  const [showModal, setShowModal] = useState(false);

  const pickup = useBookingStore((state) => state.pickup);

  const destination = useBookingStore((state) => state.destination);

  const selectedRideType = useBookingStore((state) => state.selectedRideType);

  const { startSearchingDriver } = useBookingFlow();

  const handleOpenModal = () => {
    const valid = isBookingValid({
      pickup,
      destination,
      selectedRideType,
    });

    if (!valid) {
      alert("Please complete all booking details");
      return;
    }

    setShowModal(true);
  };

  const handleConfirmBooking = () => {
    setShowModal(false);

    startSearchingDriver();
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="w-full bg-black text-white rounded-2xl py-4 font-semibold"
      >
        Confirm Booking
      </button>

      {showModal && (
        <ConfirmRideModal
          onConfirm={handleConfirmBooking}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default RideActionButton;
