import { Marker } from "react-map-gl/mapbox";

const DriverMarker = ({ driver }) => {
  return (
    <Marker
      latitude={driver.latitude}
      longitude={driver.longitude}
      anchor="center"
    >
      <div
        className="text-2xl transition-transform"
        style={{
          transform: `rotate(${driver.heading}deg)`,
        }}
      >
        🚖
      </div>
    </Marker>
  );
};

export default DriverMarker;
