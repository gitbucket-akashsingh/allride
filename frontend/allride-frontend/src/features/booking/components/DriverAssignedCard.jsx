import useBookingStore from "../store/bookingStore";

const DriverAssignedCard = () => {
  const assignedDriver = useBookingStore((state) => state.assignedDriver);

  if (!assignedDriver) return null;

  return (
    <div className="bg-green-100 rounded-2xl p-5">
      <div className="font-bold text-xl">Driver Assigned 🚖</div>

      <div className="mt-4 space-y-1">
        <div>{assignedDriver.name}</div>

        <div>{assignedDriver.vehicle}</div>

        <div>{assignedDriver.plate}</div>

        <div>⭐ {assignedDriver.rating}</div>

        <div>ETA: {assignedDriver.eta}</div>
      </div>
    </div>
  );
};

export default DriverAssignedCard;
