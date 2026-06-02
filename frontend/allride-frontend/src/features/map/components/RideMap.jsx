import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

import useMapStore from "../store/mapStore";

import PickupMarker from "./PickupMarker";
import DropMarker from "./DropMarker";
import NearbyDrivers from "./NearbyDrivers";
import RoutePolyline from "./RoutePolyline";
import CurrentLocationButton from "./CurrentLocationButton";
import MapLoader from "./MapLoader";

import useCurrentLocation from "../hooks/useCurrentLocation";
import useNearbyDrivers from "../hooks/useNearbyDrivers";
import useRouteDirections from "../hooks/useRouteDirections";

import { MAP_CONFIG } from "../constants/mapConfig";

const RideMap = () => {
  const { loading } = useCurrentLocation();

  useNearbyDrivers();
  useRouteDirections();

  const viewport = useMapStore((state) => state.viewport);

  const setViewport = useMapStore((state) => state.setViewport);

  const currentLocation = useMapStore((state) => state.currentLocation);

  const pickup = useMapStore((state) => state.pickup);

  const destination = useMapStore((state) => state.destination);

  const nearbyDrivers = useMapStore((state) => state.nearbyDrivers);

  const routeGeoJson = useMapStore((state) => state.routeGeoJson);

  if (loading) {
    return <MapLoader />;
  }

  return (
    <div className="relative h-full w-full">
      <Map
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        {...viewport}
        onMove={(event) => setViewport(event.viewState)}
        mapStyle={MAP_CONFIG.MAP_STYLE}
      >
        {currentLocation && (
          <Marker
            latitude={currentLocation.latitude}
            longitude={currentLocation.longitude}
          >
            <div className="text-3xl">🧍</div>
          </Marker>
        )}

        <PickupMarker pickup={pickup} />

        <DropMarker destination={destination} />

        <NearbyDrivers drivers={nearbyDrivers} />

        <RoutePolyline routeGeoJson={routeGeoJson} />
      </Map>

      <CurrentLocationButton />
    </div>
  );
};

export default RideMap;
