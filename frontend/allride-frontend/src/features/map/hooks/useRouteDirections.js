import { useEffect } from "react";
import useMapStore from "../store/mapStore";
import { getDirections } from "../services/directionsService";

const useRouteDirections = () => {
  const pickup         = useMapStore((state) => state.pickup);
  const destination    = useMapStore((state) => state.destination);
  const setRouteGeoJson = useMapStore((state) => state.setRouteGeoJson);
  const setEta         = useMapStore((state) => state.setEta);
  const setDistance    = useMapStore((state) => state.setDistance);
  const mapRef         = useMapStore((state) => state.mapRef);

  useEffect(() => {
    if (!pickup || !destination) return;

    const fetchDirections = async () => {
      const route = await getDirections(pickup, destination);
      if (!route) return;

      setRouteGeoJson(route.geometry);
      setEta(route.duration);
      setDistance(route.distance);

      // Fit the map to show both markers with padding
      if (mapRef?.current) {
        mapRef.current.fitBounds(
          [
            [pickup.longitude, pickup.latitude],
            [destination.longitude, destination.latitude],
          ],
          { padding: { top: 80, bottom: 80, left: 80, right: 320 }, duration: 1000 }
        );
      }
    };

    fetchDirections();
  }, [pickup, destination, setRouteGeoJson, setEta, setDistance, mapRef]);
};

export default useRouteDirections;