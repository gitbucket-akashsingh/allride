import { useState, useEffect, useCallback } from "react";
import { getDriverProfile } from "../api/driverApi";

export function useDriverProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getDriverProfile();
      setProfile(res.data);
    } catch (err) {
      const status = err?.response?.status;
      if (status === 404) {
        setProfile(null); // no profile yet — onboarding needed
      } else {
        setError("Could not load driver profile");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    profile,
    loading,
    error,
    hasProfile: !!profile,
    isOnline: profile?.online === true,
    isApproved: profile?.approved === true,
    refetch,
  };
}