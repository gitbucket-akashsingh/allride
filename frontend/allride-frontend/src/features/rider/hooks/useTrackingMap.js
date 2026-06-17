import { useEffect } from "react";
import useMapStore from "@/features/map/store/mapStore";
import { getDirections } from "@/features/map/services/directionsService";

// Given a ride object from the API, sets up pickup/destination in mapStore
// so RideMap draws markers and route automatically.
const useTrackingMap = (ride) => {
  const setPickup      = useMapStore((s) => s.setPickup);
  const setDestination = useMapStore((s) => s.setDestination);
  const setRouteGeoJson = useMapStore((s) => s.setRouteGeoJson);
  const setEta         = useMapStore((s) => s.setEta);
  const setDistance    = useMapStore((s) => s.setDistance);
  const mapRef         = useMapStore((s) => s.mapRef);

  useEffect(() => {
    if (!ride) return;

    const pickup = {
      latitude: ride.pickupLatitude,
      longitude: ride.pickupLongitude,
      label: ride.pickupAddress ?? "Pickup",
    };
    const destination = {
      latitude: ride.dropLatitude,
      longitude: ride.dropLongitude,
      label: ride.dropAddress ?? "Drop",
    };

    setPickup(pickup);
    setDestination(destination);

    const fetchRoute = async () => {
      const route = await getDirections(pickup, destination);
      if (!route) return;
      setRouteGeoJson(route.geometry);
      setEta(route.duration);
      setDistance(route.distance);

      if (mapRef?.current) {
        mapRef.current.fitBounds(
          [
            [pickup.longitude, pickup.latitude],
            [destination.longitude, destination.latitude],
          ],
          { padding: { top: 80, bottom: 80, left: 80, right: 80 }, duration: 1000 }
        );
      }
    };

    fetchRoute();

    // Clean up map state when leaving the page
    return () => {
      setPickup(null);
      setDestination(null);
      setRouteGeoJson(null);
      setEta(null);
      setDistance(null);
    };
  }, [ride]);
};

export default useTrackingMap;