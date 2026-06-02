import useMapStore from "../store/mapStore";

const CurrentLocationButton = () => {
  const currentLocation = useMapStore((state) => state.currentLocation);

  const setViewport = useMapStore((state) => state.setViewport);

  const handleCenter = () => {
    if (!currentLocation) return;

    setViewport({
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
      zoom: 15,
    });
  };

  return (
    <button
      onClick={handleCenter}
      className="absolute bottom-6 right-6 bg-white shadow-lg rounded-full p-4 z-10"
    >
      📍
    </button>
  );
};

export default CurrentLocationButton;
