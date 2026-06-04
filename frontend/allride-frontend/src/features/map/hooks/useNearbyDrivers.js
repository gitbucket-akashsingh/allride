import { useEffect } from "react";
import useMapStore from "../store/mapStore";
import { generateMockDrivers } from "../utils/markerHelpers";

const useNearbyDrivers = () => {
  const currentLocation = useMapStore((state) => state.currentLocation);

  const setNearbyDrivers = useMapStore((state) => state.setNearbyDrivers);

  useEffect(() => {
    if (!currentLocation) return;

    const drivers = generateMockDrivers(currentLocation);

    setNearbyDrivers(drivers);
  }, [currentLocation, setNearbyDrivers]);
};

export default useNearbyDrivers;
