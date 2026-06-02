import { Marker } from "react-map-gl/mapbox";

const PickupMarker = ({ pickup }) => {
  if (!pickup) return null;

  return (
    <Marker
      latitude={pickup.latitude}
      longitude={pickup.longitude}
      anchor="bottom"
    >
      <div className="text-3xl">📍</div>
    </Marker>
  );
};

export default PickupMarker;
