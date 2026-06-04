const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export const searchPlaces = async (query) => {
  if (!query) return [];

  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${MAPBOX_TOKEN}&autocomplete=true&limit=5`,
  );

  const data = await response.json();

  return data.features || [];
};

export const reverseGeocode = async (longitude, latitude) => {
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_TOKEN}`,
  );

  const data = await response.json();

  return data.features?.[0] || null;
};
