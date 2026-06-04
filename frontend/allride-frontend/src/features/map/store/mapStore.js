/*Responsibilities
The store manages:
- current location
- pickup coordinates
- destination coordinates
- nearby drivers
- active route
- map viewport
- ETA
- distance 
*/

import { create } from "zustand";
import { MAP_CONFIG } from "../constants/mapConfig";

const useMapStore = create((set) => ({
  currentLocation: null,

  pickup: null,
  destination: null,

  nearbyDrivers: [],

  routeGeoJson: null,

  eta: null,
  distance: null,

  viewport: {
    latitude: MAP_CONFIG.DEFAULT_CENTER.latitude,
    longitude: MAP_CONFIG.DEFAULT_CENTER.longitude,
    zoom: MAP_CONFIG.DEFAULT_ZOOM,
  },

  setCurrentLocation: (location) => set({ currentLocation: location }),

  setPickup: (pickup) => set({ pickup }),

  setDestination: (destination) => set({ destination }),

  setNearbyDrivers: (drivers) => set({ nearbyDrivers: drivers }),

  setRouteGeoJson: (route) => set({ routeGeoJson: route }),

  setEta: (eta) => set({ eta }),

  setDistance: (distance) => set({ distance }),

  setViewport: (viewport) =>
    set((state) => ({
      viewport: {
        ...state.viewport,
        ...viewport,
      },
    })),
}));

export default useMapStore;
