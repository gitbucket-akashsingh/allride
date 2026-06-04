const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export const getDirections = async (pickup, destination) => {
  const coordinates = `${pickup.longitude},${pickup.latitude};${destination.longitude},${destination.latitude}`;

  const response = await fetch(
    `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?geometries=geojson&overview=full&access_token=${MAPBOX_TOKEN}`,
  );

  const data = await response.json();

  const route = data.routes?.[0];

  if (!route) return null;

  return {
    geometry: route.geometry,
    distance: (route.distance / 1000).toFixed(1),
    duration: Math.ceil(route.duration / 60),
  };
};
