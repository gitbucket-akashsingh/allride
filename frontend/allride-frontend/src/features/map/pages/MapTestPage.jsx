import RideMap from "../components/RideMap";
import useMapStore from "../store/mapStore";

const MapTestPage = () => {
  const setPickup = useMapStore((state) => state.setPickup);

  const setDestination = useMapStore((state) => state.setDestination);

  const eta = useMapStore((state) => state.eta);

  const distance = useMapStore((state) => state.distance);

  const handleTestRoute = () => {
    setPickup({
      latitude: 28.6139,
      longitude: 77.209,
    });

    setDestination({
      latitude: 28.6328,
      longitude: 77.2197,
    });
  };

  return (
    <div className="relative h-screen">
      <RideMap />

      <div className="absolute top-4 left-4 bg-white p-4 rounded-xl shadow-lg z-10">
        <button
          onClick={handleTestRoute}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Test Route
        </button>

        <div className="mt-3 text-sm">ETA: {eta ? `${eta} mins` : "--"}</div>

        <div className="text-sm">
          Distance: {distance ? `${distance} km` : "--"}
        </div>
      </div>
    </div>
  );
};

export default MapTestPage;
