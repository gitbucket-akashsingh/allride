import PickupInput from "./PickupInput";
import DestinationInput from "./DestinationInput";
import RideTypeSelector from "./RideTypeSelector";
import FareEstimateCard from "./FareEstimateCard";
import RideActionButton from "./RideActionButton";

const BookingPanel = () => {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 space-y-5">
      <div>
        <h1 className="text-3xl font-bold">Book Your Ride</h1>

        <p className="text-gray-500 mt-1">Fast and reliable rides</p>
      </div>

      <PickupInput />

      <DestinationInput />

      <RideTypeSelector />

      <FareEstimateCard />

      <RideActionButton />
    </div>
  );
};

export default BookingPanel;
