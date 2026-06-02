import useBookingStore from "../store/bookingStore";

const RideCompletedCard = () => {
  const resetBooking = useBookingStore((state) => state.resetBooking);

  return (
    <div className="bg-green-200 rounded-2xl p-5">
      <div className="text-xl font-bold">Ride Completed ✅</div>

      <div className="mt-2">Thank you for riding with AllRide.</div>

      <button
        onClick={resetBooking}
        className="mt-4 bg-black text-white rounded-xl px-5 py-3"
      >
        Book Another Ride
      </button>
    </div>
  );
};

export default RideCompletedCard;
