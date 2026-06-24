import { useEffect, useRef } from "react";
import { getRideStatus } from "../api/rideApi";

// Only stop polling when ride reaches a true terminal state
const TERMINAL = ["CANCELLED", "COMPLETED"];

const useRidePolling = (rideId, onStatusChange, enabled = true) => {
  const intervalRef = useRef(null);
  const lastStatusRef = useRef(null);
  const onStatusChangeRef = useRef(onStatusChange);

  useEffect(() => {
    onStatusChangeRef.current = onStatusChange;
  }, [onStatusChange]);

  useEffect(() => {
    if (!rideId || !enabled) return;

    const poll = async () => {
      try {
        const res = await getRideStatus(rideId);
        const data = res.data;
        if (data.status !== lastStatusRef.current) {
          lastStatusRef.current = data.status;
          onStatusChangeRef.current(data.status, data);
        }
        if (TERMINAL.includes(data.status)) {
          clearInterval(intervalRef.current);
        }
      } catch {
        clearInterval(intervalRef.current);
      }
    };

    poll();
    intervalRef.current = setInterval(poll, 3000);

    return () => clearInterval(intervalRef.current);
  }, [rideId, enabled]);
};

export default useRidePolling;