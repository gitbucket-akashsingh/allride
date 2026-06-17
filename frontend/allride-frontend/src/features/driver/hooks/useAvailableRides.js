import { useState, useEffect, useRef } from "react";
import { getAvailableRides } from "../api/driverApi";

export const useAvailableRides = (isOnline) => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isOnline) { setRides([]); return; }

    const poll = async () => {
      try {
        const res = await getAvailableRides();
        setRides(res.data || []);
      } catch { /* silently fail */ }
    };

    poll(); // immediate first call
    intervalRef.current = setInterval(poll, 4000);
    return () => clearInterval(intervalRef.current);
  }, [isOnline]);

  return { rides, loading };
};