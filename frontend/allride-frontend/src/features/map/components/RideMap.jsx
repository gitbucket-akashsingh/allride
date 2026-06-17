import { useRef, useEffect } from "react";
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
import { useLayout } from "@/app/context/LayoutContext";

const RideMap = () => {
  const { sidebarCollapsed } = useLayout();

  const mapRef       = useRef(null);
  const containerRef = useRef(null); // watches the container for size changes

  const { loading } = useCurrentLocation();

  useNearbyDrivers();
  useRouteDirections();

  const viewport        = useMapStore((state) => state.viewport);
  const setViewport     = useMapStore((state) => state.setViewport);
  const setMapRef       = useMapStore((state) => state.setMapRef);
  const currentLocation = useMapStore((state) => state.currentLocation);
  const pickup          = useMapStore((state) => state.pickup);
  const destination     = useMapStore((state) => state.destination);
  const nearbyDrivers   = useMapStore((state) => state.nearbyDrivers);
  const routeGeoJson    = useMapStore((state) => state.routeGeoJson);

  useEffect(() => {
    if (loading) return;
    // Wait for sidebar width transition (300ms in your layout)
    const timer = setTimeout(() => {
      mapRef.current?.resize();
    }, 320);
    return () => clearTimeout(timer);
  }, [sidebarCollapsed, loading]);

  // Register map ref in store so hooks (e.g. fitBounds) can access the map
  useEffect(() => {
    setMapRef(mapRef);
  }, [setMapRef]);

  // Whenever the container div changes size (sidebar toggle, window resize, etc.)
  // tell the Mapbox canvas to redraw itself to fill the new size.
  useEffect(() => {
    if (loading || !containerRef.current) return;

    const resizeMap = () => {
      mapRef.current?.resize();
    };

     const observer = new ResizeObserver(resizeMap);

    observer.observe(containerRef.current);

    // Resize once when map first appears
    resizeMap();
    requestAnimationFrame(resizeMap);

    return () => observer.disconnect();
  }, [loading]);

  if (loading) return <MapLoader />;

  return (
    <div ref={containerRef} className="relative h-full w-full">
      <Map
        ref={mapRef}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        {...viewport}
        onMove={(event) => setViewport(event.viewState)}
        mapStyle={MAP_CONFIG.MAP_STYLE}
      >
        {currentLocation && (
          <Marker latitude={currentLocation.latitude} longitude={currentLocation.longitude}>
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