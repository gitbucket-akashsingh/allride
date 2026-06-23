/** Demo ride data for landing live-tracking preview (Hyderabad route) */

export const DEMO_PICKUP = {
    label: "Gachibowli, Hyderabad",
    short: "Gachibowli",
    latitude: 17.4401,
    longitude: 78.3489,
  };
  
  export const DEMO_DESTINATION = {
    label: "Charminar, Hyderabad",
    short: "Charminar",
    latitude: 17.3616,
    longitude: 78.4747,
  };
  
  export const DEMO_RIDE = {
    rideId: "AR-5632",
    status: "Ongoing",
    driverName: "Rohit Kumar",
    driverInitials: "RK",
    driverRating: 4.8,
    vehicle: "Mercedes-Benz E-Class",
    plate: "TS 09 AB 5678",
    pickupTime: "08:20 PM",
    dropTime: "09:05 PM",
    distanceKm: "14.2",
    fare: "245",
    etaMinutes: 12,
    remainingKm: "8.6",
    progress: 0.62,
    speedKmh: 40,
    traffic: "Heavy",
    nextTurn: "Right in 1 min onto Tank Bund Rd.",
  };
  
  export const DEMO_MAP_VIEW = {
    longitude: 78.4118,
    latitude: 17.401,
    zoom: 11.2,
    pitch: 50,
    bearing: -18,
  };
  
  /** Fallback route when Mapbox Directions is unavailable */
  export const DEMO_ROUTE_GEOJSON = {
    type: "LineString",
    coordinates: [
      [78.3489, 17.4401],
      [78.362, 17.428],
      [78.385, 17.415],
      [78.41, 17.392],
      [78.435, 17.378],
      [78.458, 17.368],
      [78.4747, 17.3616],
    ],
  };
  
  /** max-w-7xl = 80rem = 1280px */
  export const DEMO_MAP_MAX_WIDTH = 1280;