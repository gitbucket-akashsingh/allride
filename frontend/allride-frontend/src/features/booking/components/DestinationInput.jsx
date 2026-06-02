import useBookingStore from "../store/bookingStore";

const DestinationInput = () => {
  const destination = useBookingStore((state) => state.destination);

  const setDestination = useBookingStore((state) => state.setDestination);

  return (
    <input
      type="text"
      placeholder="Where to?"
      value={destination}
      onChange={(e) => setDestination(e.target.value)}
      className="w-full border rounded-2xl px-4 py-3 outline-none"
    />
  );
};

export default DestinationInput;
