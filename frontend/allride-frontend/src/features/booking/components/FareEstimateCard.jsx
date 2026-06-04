import useBookingStore from "../store/bookingStore";

const FareEstimateCard = () => {
  const estimatedFare = useBookingStore((state) => state.estimatedFare);

  if (!estimatedFare) return null;

  return (
    <div className="bg-black text-white rounded-2xl p-5">
      <div className="text-sm opacity-70">Estimated Fare</div>

      <div className="text-3xl font-bold mt-2">₹{estimatedFare}</div>
    </div>
  );
};

export default FareEstimateCard;
