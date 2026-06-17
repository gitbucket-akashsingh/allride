import { useState, useEffect, useCallback } from "react";
import {
  Navigation,
  MapPin,
  Power,
  IndianRupee,
  Loader,
  CheckCircle2,
  XCircle,
  Radio,
} from "lucide-react";
import { useAuth } from "@/features/auth/context/AuthContext";
import RideMap from "@/features/map/components/RideMap";
import useMapStore from "@/features/map/store/mapStore";
import { useAvailableRides } from "@/features/driver/hooks/useAvailableRides";
import {
  acceptRide,
  startRide,
  completeRide,
  cancelRide,
  getActiveRide,
} from "@/features/driver/api/driverApi";
import { getRideStatus } from "@/features/rider/api/rideApi";
import Toggle from "@/shared/ui/Toggle";


const PAGE_HEIGHT = "calc(100vh - 6.5rem)";

function formatAddress(ride, type) {
  if (type === "pickup") {
    return (
      ride.pickupAddress ||
      `${ride.pickupLatitude?.toFixed(4)}, ${ride.pickupLongitude?.toFixed(4)}`
    );
  }
  return (
    ride.dropAddress ||
    `${ride.dropLatitude?.toFixed(4)}, ${ride.dropLongitude?.toFixed(4)}`
  );
}

function RideRoute({ ride }) {
  return (
    <div className="flex items-start gap-2">
      <div className="flex flex-col items-center gap-0.5 mt-0.5 shrink-0">
        <div className="w-2 h-2 rounded-full bg-black" />
        <div className="h-4 border-l-2 border-dashed border-zinc-300" />
        <div className="w-2 h-2 rounded bg-black" />
      </div>
      <div className="flex-1 min-w-0 space-y-2">
        <div>
          <p className="text-[10px] text-zinc-400">Pickup</p>
          <p className="text-xs font-semibold text-black truncate">
            {formatAddress(ride, "pickup")}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-zinc-400">Drop</p>
          <p className="text-xs font-semibold text-black truncate">
            {formatAddress(ride, "drop")}
          </p>
        </div>
      </div>
    </div>
  );
}

function DriverHomePage() {
  const { user } = useAuth();

  const setPickup = useMapStore((s) => s.setPickup);
  const setDestination = useMapStore((s) => s.setDestination);

  const [isOnline, setIsOnline] = useState(false);
  const [activeRide, setActiveRide] = useState(null);
  const [dismissedIds, setDismissedIds] = useState([]);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tripComplete, setTripComplete] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const { rides: availableRides } = useAvailableRides(
    isOnline && !activeRide
  );

  const displayName = user?.fullName || user?.name || "Driver";

  const syncRideToMap = useCallback(
    (ride) => {
      if (!ride) return;
      setPickup({
        latitude: ride.pickupLatitude,
        longitude: ride.pickupLongitude,
        label: ride.pickupAddress || "Pickup",
      });
      setDestination({
        latitude: ride.dropLatitude,
        longitude: ride.dropLongitude,
        label: ride.dropAddress || "Drop",
      });
    },
    [setPickup, setDestination]
  );

  const clearMap = useCallback(() => {
    setPickup(null);
    setDestination(null);
  }, [setPickup, setDestination]);

  // Restore active trip on refresh
  useEffect(() => {
    getActiveRide()
      .then((ride) => {
        if (ride) {
          setActiveRide(ride);
          setIsOnline(true);
          syncRideToMap(ride);
        }
      })
      .finally(() => setInitialLoading(false));
  }, [syncRideToMap]);

  // Poll active ride for cancellation / external updates
  useEffect(() => {
    if (!activeRide?.rideId) return;

    const poll = async () => {
      try {
        const res = await getRideStatus(activeRide.rideId);
        const data = res.data;

        if (data.status === "CANCELLED") {
          setError("Ride was cancelled.");
          setActiveRide(null);
          clearMap();
          return;
        }

        if (data.status !== activeRide.status) {
          setActiveRide(data);
          syncRideToMap(data);
        }
      } catch {
        /* ignore poll errors */
      }
    };

    const id = setInterval(poll, 3000);
    return () => clearInterval(id);
  }, [activeRide?.rideId, activeRide?.status, syncRideToMap, clearMap]);

  const handleToggleOnline = () => {
    if (activeRide) return;
    setIsOnline((prev) => !prev);
    setError(null);
    setDismissedIds([]);
  };

  const handleAccept = async (rideId) => {
    setActionLoading(true);
    setError(null);
    try {
      const res = await acceptRide(rideId);
      setActiveRide(res.data);
      syncRideToMap(res.data);
    } catch {
      setError("Could not accept ride. It may already be taken.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleStart = async () => {
    if (!activeRide) return;
    setActionLoading(true);
    setError(null);
    try {
      const res = await startRide(activeRide.rideId);
      setActiveRide(res.data);
    } catch {
      setError("Could not start ride. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleComplete = async () => {
    if (!activeRide) return;
    setActionLoading(true);
    setError(null);
    try {
      await completeRide(activeRide.rideId);
      setActiveRide(null);
      clearMap();
      setTripComplete(true);
      setTimeout(() => setTripComplete(false), 4000);
    } catch {
      setError("Could not complete ride. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!activeRide) return;
    setActionLoading(true);
    setError(null);
    try {
      await cancelRide(activeRide.rideId);
      setActiveRide(null);
      clearMap();
    } catch {
      setError("Could not cancel ride.");
    } finally {
      setActionLoading(false);
    }
  };

  const visibleRequests = availableRides.filter(
    (r) => !dismissedIds.includes(r.rideId)
  );

  if (initialLoading) {
    return (
      <div
        className="flex items-center justify-center bg-zinc-100 h-full"
        style={{ height: PAGE_HEIGHT }}
      >
        <div className="w-8 h-8 border-[3px] border-zinc-200 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div
      className="flex gap-4 p-4 bg-zinc-100 dark:bg-zinc-950 "
      style={{ height: PAGE_HEIGHT }}
    >
      {/* Left panel */}
      <div className="w-[360px] shrink-0 bg-white rounded-2xl shadow-lg border border-zinc-200 flex flex-col overflow-hidden">
        <div className="flex flex-col gap-3 p-4 overflow-y-auto flex-1">

          {/* Header */}
          <div>
            <p className="text-xs text-zinc-500 font-medium">Driver home</p>
            <h1 className="text-xl font-black tracking-tight text-black leading-tight">
              {displayName}
            </h1>
          </div>

          {/* Online / offline toggle */}
          <button
            onClick={handleToggleOnline}
            disabled={!!activeRide}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl border-2 transition-all ${
              activeRide
                ? "border-zinc-200 bg-zinc-50 cursor-not-allowed opacity-70"
                : isOnline
                ? "border-green-500 bg-green-50 hover:bg-green-100"
                : "border-zinc-200 bg-zinc-50 hover:border-zinc-400"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isOnline ? "bg-green-500 text-white" : "bg-zinc-200 text-zinc-500"
                }`}
              >
                <Power size={18} />
              </div>
              <div className="text-left">
                <p className="text-sm font-black text-black">
                  {isOnline ? "You're online" : "You're offline"}
                </p>
                <p className="text-[10px] text-zinc-500">
                  {activeRide
                    ? "Finish current trip to go offline"
                    : isOnline
                    ? "Receiving ride requests"
                    : "Tap to go online"}
                </p>
              </div>
            </div>
            <div
              className={`flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 overflow-hidden transition-colors ${
                isOnline ? "justify-end bg-green-500" : "justify-start bg-zinc-300"
              }`}
            >
              <span className="h-5 w-5 rounded-full bg-white shadow" />
            </div>
          </button>

          {/* Trip complete success */}
          {tripComplete && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
              <CheckCircle2 size={28} className="text-green-600 mx-auto mb-2" />
              <p className="font-black text-green-700">Trip completed!</p>
              <p className="text-xs text-zinc-500 mt-1">
                Earnings updated. Ready for the next ride.
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
              {error}
            </p>
          )}

          {/* ── ACTIVE RIDE ── */}
          {activeRide && (
            <div className="border-2 border-blue-500 bg-blue-50 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Radio size={14} className="text-blue-600 animate-pulse" />
                  <p className="text-xs font-bold text-blue-700 uppercase tracking-wide">
                    Active trip · #{activeRide.rideId}
                  </p>
                </div>
                {activeRide.fare && (
                  <p className="text-lg font-black text-black">
                    ₹{Math.round(activeRide.fare)}
                  </p>
                )}
              </div>

              <RideRoute ride={activeRide} />

              <div className="bg-white border border-blue-200 rounded-xl px-3 py-2">
                <p className="text-[10px] text-zinc-400 uppercase tracking-wide font-semibold">
                  Status
                </p>
                <p className="text-sm font-black text-black mt-0.5">
                  {activeRide.status === "ACCEPTED" && "Head to pickup"}
                  {activeRide.status === "STARTED" && "Trip in progress"}
                </p>
              </div>

              {activeRide.status === "ACCEPTED" && (
                <button
                  onClick={handleStart}
                  disabled={actionLoading}
                  className="w-full py-3 rounded-xl bg-black text-white font-bold text-sm hover:bg-zinc-800 transition disabled:opacity-50"
                >
                  {actionLoading ? "Starting..." : "Arrived — Start trip"}
                </button>
              )}

              {activeRide.status === "STARTED" && (
                <button
                  onClick={handleComplete}
                  disabled={actionLoading}
                  className="w-full py-3 rounded-xl bg-green-600 text-white font-bold text-sm hover:bg-green-700 transition disabled:opacity-50"
                >
                  {actionLoading ? "Completing..." : "Complete trip"}
                </button>
              )}

              <button
                onClick={handleCancel}
                disabled={actionLoading}
                className="w-full py-2 rounded-xl border border-red-200 text-red-500 text-xs font-semibold hover:bg-red-50 transition disabled:opacity-50"
              >
                Cancel trip
              </button>
            </div>
          )}

          {/* ── WAITING FOR REQUESTS ── */}
          {isOnline && !activeRide && visibleRequests.length === 0 && (
            <div className="text-center py-8 bg-zinc-50 border border-zinc-200 rounded-2xl">
              <div className="w-8 h-8 border-[3px] border-zinc-200 border-t-green-500 rounded-full mx-auto animate-spin mb-3" />
              <p className="text-sm font-bold text-black">Waiting for rides...</p>
              <p className="text-[10px] text-zinc-500 mt-1">
                New requests appear here automatically
              </p>
            </div>
          )}

          {/* ── INCOMING REQUESTS ── */}
          {isOnline && !activeRide && visibleRequests.length > 0 && (
            <div className="space-y-2">
              <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wide">
                New ride requests
              </p>
              {visibleRequests.map((ride) => (
                <div
                  key={ride.rideId}
                  className="border-2 border-green-400 bg-green-50 rounded-2xl p-4 space-y-3 animate-pulse"
                  style={{ animationDuration: "2s" }}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-green-700 flex items-center gap-1">
                      <Navigation size={12} />
                      New request
                    </p>
                    {ride.fare && (
                      <p className="text-xl font-black text-black flex items-center">
                        <IndianRupee size={14} />
                        {Math.round(ride.fare)}
                      </p>
                    )}
                  </div>

                  <RideRoute ride={ride} />

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() =>
                        setDismissedIds((prev) => [...prev, ride.rideId])
                      }
                      disabled={actionLoading}
                      className="py-2.5 rounded-xl border border-zinc-300 text-zinc-600 text-xs font-bold hover:bg-white transition"
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => handleAccept(ride.rideId)}
                      disabled={actionLoading}
                      className="py-2.5 rounded-xl bg-black text-white text-xs font-bold hover:bg-zinc-800 transition disabled:opacity-50"
                    >
                      {actionLoading ? "Accepting..." : "Accept ride"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── OFFLINE STATE ── */}
          {!isOnline && !activeRide && (
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 rounded-2xl bg-zinc-200 flex items-center justify-center mx-auto mb-3">
                <Power size={22} className="text-zinc-500" />
              </div>
              <p className="font-bold text-black text-sm">You&apos;re offline</p>
              <p className="text-xs text-zinc-500 mt-1">
                Go online to start receiving ride requests in your area.
              </p>
            </div>
          )}

          {/* Tips card */}
          <div className="bg-black text-white rounded-2xl p-3 mt-auto">
            <p className="text-xs font-bold">Driver tips</p>
            <p className="text-[10px] text-zinc-400 mt-1 leading-snug">
              Accept rides quickly for better ratings. Complete the full trip flow:
              Accept → Arrive &amp; Start → Complete.
            </p>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 min-h-0 h-full bg-white rounded-2xl shadow-lg border border-zinc-200 overflow-hidden relative hidden lg:block">
        <RideMap />

        {activeRide && (
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm shadow-xl rounded-xl p-3 w-56 border border-zinc-100 z-10">
            <p className="text-[9px] text-zinc-400 font-semibold uppercase tracking-wide mb-1.5">
              Active route
            </p>
            <div className="space-y-1.5">
              <div className="flex gap-2 items-start">
                <MapPin size={10} className="text-green-600 mt-0.5 shrink-0" />
                <p className="text-[11px] font-semibold text-black line-clamp-2 leading-snug">
                  {formatAddress(activeRide, "pickup")}
                </p>
              </div>
              <div className="ml-[4px] h-3 border-l-2 border-dashed border-zinc-300" />
              <div className="flex gap-2 items-start">
                <Navigation size={10} className="text-black mt-0.5 shrink-0" />
                <p className="text-[11px] font-semibold text-black line-clamp-2 leading-snug">
                  {formatAddress(activeRide, "drop")}
                </p>
              </div>
            </div>
            {activeRide.fare && (
              <p className="mt-2 pt-1.5 border-t border-zinc-100 text-sm font-black text-black">
                ₹{Math.round(activeRide.fare)}
              </p>
            )}
          </div>
        )}

        {isOnline && !activeRide && (
          <div className="absolute top-4 left-4 bg-green-600 text-white shadow-xl rounded-xl px-3 py-2 z-10 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <p className="text-xs font-bold">Online — searching for rides</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DriverHomePage;