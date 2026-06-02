import { useEffect, useState } from "react";
import useMapStore from "../store/mapStore";
import { getCurrentPosition } from "../services/geolocationService";

const useCurrentLocation = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const setCurrentLocation = useMapStore((state) => state.setCurrentLocation);

  const setViewport = useMapStore((state) => state.setViewport);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        setLoading(true);

        const location = await getCurrentPosition();

        setCurrentLocation(location);

        setViewport({
          latitude: location.latitude,
          longitude: location.longitude,
          zoom: 14,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, [setCurrentLocation, setViewport]);

  return {
    loading,
    error,
  };
};

export default useCurrentLocation;
