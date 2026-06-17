import { useEffect, useRef } from "react";
import { getRideStatus } from "../api/rideApi";

// Polls ride status every 3 seconds until it reaches a terminal status
// onStatusChange(status, rideData) is called on every change
const TERMINAL = ["ACCEPTED", "CANCELLED", "COMPLETED"];

const useRidePolling = (rideId, onStatusChange, enabled = true) => {
  const intervalRef = useRef(null);
  const lastStatusRef = useRef(null);

  useEffect(() => {
    if (!rideId || !enabled) return;

    intervalRef.current = setInterval(async () => {
      try {
        const res = await getRideStatus(rideId);
        const data = res.data;
        if (data.status !== lastStatusRef.current) {
          lastStatusRef.current = data.status;
          onStatusChange(data.status, data);
        }
        if (TERMINAL.includes(data.status)) {
          clearInterval(intervalRef.current);
        }
      } catch {
        clearInterval(intervalRef.current);
      }
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, [rideId, enabled, onStatusChange]);
};

export default useRidePolling;