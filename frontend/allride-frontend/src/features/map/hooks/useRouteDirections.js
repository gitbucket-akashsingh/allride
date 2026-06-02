import { useEffect } from "react";
import useMapStore from "../store/mapStore";
import { getDirections } from "../services/directionsService";

const useRouteDirections = () => {
  const pickup = useMapStore((state) => state.pickup);

  const destination = useMapStore((state) => state.destination);

  const setRouteGeoJson = useMapStore((state) => state.setRouteGeoJson);

  const setEta = useMapStore((state) => state.setEta);

  const setDistance = useMapStore((state) => state.setDistance);

  useEffect(() => {
    if (!pickup || !destination) return;

    const fetchDirections = async () => {
      const route = await getDirections(pickup, destination);

      if (!route) return;

      setRouteGeoJson(route.geometry);
      setEta(route.duration);
      setDistance(route.distance);
    };

    fetchDirections();
  }, [pickup, destination, setRouteGeoJson, setEta, setDistance]);
};

export default useRouteDirections;
