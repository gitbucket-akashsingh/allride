import { Marker } from "react-map-gl/mapbox";

const DropMarker = ({ destination }) => {
  if (!destination) return null;

  return (
    <Marker
      latitude={destination.latitude}
      longitude={destination.longitude}
      anchor="bottom"
    >
      <div className="text-3xl">🏁</div>
    </Marker>
  );
};

export default DropMarker;
