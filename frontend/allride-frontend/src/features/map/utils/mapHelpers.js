export const convertPlaceToLocation = (place) => ({
  latitude: place.center[1],
  longitude: place.center[0],
  placeName: place.place_name,
});
