/* rideStore
MOST IMPORTANT STORE.
Manages:
-ride status
-ride lifecycle
-ride synchronization
-ride transitions
-active trip
*/

import { create } from "zustand";
import { RIDE_STATUS } from "@/shared/constants/rideStatus";

const useRideStore = create((set) => ({
  rideStatus: RIDE_STATUS.IDLE,
  activeRide: null,

  setRideStatus: (status) => set({ rideStatus: status }),

  setActiveRide: (ride) => set({ activeRide: ride }),

  resetRide: () =>
    set({
      rideStatus: RIDE_STATUS.IDLE,
      activeRide: null,
    }),
}));

export default useRideStore;
