import useBookingStore from "../store/bookingStore";

const ConfirmRideModal = ({ onConfirm, onClose }) => {
  const pickup = useBookingStore((state) => state.pickup);

  const destination = useBookingStore((state) => state.destination);

  const selectedRideType = useBookingStore((state) => state.selectedRideType);

  const estimatedFare = useBookingStore((state) => state.estimatedFare);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-5 z-50">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold">Confirm Ride</h2>

        <div>
          <div className="text-sm text-gray-500">Pickup</div>

          <div>{pickup}</div>
        </div>

        <div>
          <div className="text-sm text-gray-500">Destination</div>

          <div>{destination}</div>
        </div>

        <div>
          <div className="text-sm text-gray-500">Ride Type</div>

          <div>
            {selectedRideType?.icon} {selectedRideType?.name}
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-500">Fare</div>

          <div>₹{estimatedFare}</div>
        </div>

        <div className="flex gap-3 pt-3">
          <button onClick={onClose} className="flex-1 border rounded-2xl py-3">
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 bg-black text-white rounded-2xl py-3"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRideModal;
