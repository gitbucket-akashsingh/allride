export const generateMockDrivers = (center) => {
  return Array.from({ length: 8 }).map((_, index) => ({
    id: index + 1,
    latitude: center.latitude + (Math.random() - 0.5) * 0.02,
    longitude: center.longitude + (Math.random() - 0.5) * 0.02,
    heading: Math.random() * 360,
  }));
};
