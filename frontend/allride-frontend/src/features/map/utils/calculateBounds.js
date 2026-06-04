export const calculateBounds = (pickup, destination) => {
  return [
    [pickup.longitude, pickup.latitude],
    [destination.longitude, destination.latitude],
  ];
};
