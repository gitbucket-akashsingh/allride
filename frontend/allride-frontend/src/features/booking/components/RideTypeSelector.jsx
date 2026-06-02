import { RIDE_TYPES } from "../constants/rideTypes";

import useBookingStore from "../store/bookingStore";

const RideTypeSelector = () => {
  const selectedRideType = useBookingStore((state) => state.selectedRideType);

  const setSelectedRideType = useBookingStore(
    (state) => state.setSelectedRideType,
  );

  return (
    <div className="space-y-3">
      {RIDE_TYPES.map((ride) => {
        const isSelected = selectedRideType?.id === ride.id;

        return (
          <button
            key={ride.id}
            onClick={() => setSelectedRideType(ride)}
            className={`w-full rounded-2xl border p-4 text-left transition-all ${
              isSelected ? "border-black bg-gray-100" : "border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-lg">
                  {ride.icon} {ride.name}
                </div>

                <div className="text-sm text-gray-500">
                  Capacity: {ride.capacity}
                </div>
              </div>

              <div className="font-semibold">{ride.eta}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default RideTypeSelector;
