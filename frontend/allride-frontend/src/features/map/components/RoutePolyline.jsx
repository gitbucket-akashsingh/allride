import { Layer, Source } from "react-map-gl/mapbox";

const RoutePolyline = ({ routeGeoJson }) => {
  if (!routeGeoJson) return null;

  return (
    <Source
      id="route-source"
      type="geojson"
      data={{
        type: "Feature",
        properties: {},
        geometry: routeGeoJson,
      }}
    >
      <Layer
        id="route-layer"
        type="line"
        paint={{
          "line-color": "#2563eb",
          "line-width": 5,
        }}
      />
    </Source>
  );
};

export default RoutePolyline;
