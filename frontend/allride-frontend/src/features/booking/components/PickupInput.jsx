import useBookingStore from "../store/bookingStore";

const PickupInput = () => {
  const pickup = useBookingStore((state) => state.pickup);

  const setPickup = useBookingStore((state) => state.setPickup);

  return (
    <input
      type="text"
      placeholder="Enter pickup location"
      value={pickup}
      onChange={(e) => setPickup(e.target.value)}
      className="w-full border rounded-2xl px-4 py-3 outline-none"
    />
  );
};

export default PickupInput;
