import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Navigation,
  MapPin,
  Clock,
  CheckCircle2,
  Loader,
  Car,
  Phone,
  MessageSquare,
  RefreshCw,
  IndianRupee,
  AlertCircle,
  ChevronRight,
  Radio,
} from "lucide-react";
import RideMap from "@/features/map/components/RideMap";
import useMapStore from "@/features/map/store/mapStore";
import { getActiveRide, getMyRides } from "@/features/rider/api/rideApi";
import useTrackingMap from "@/features/rider/hooks/useTrackingMap";
import useRidePolling from "@/features/rider/hooks/useRidePolling";

// ── Status config ─────────────────────────────────────────────────────────────
const STATUS = {
  REQUESTED: {
    label: "Finding your driver",
    sub: "We're matching you with the nearest driver",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    dot: "bg-amber-400",
    icon: Loader,
    animate: true,
  },
  ACCEPTED: {
    label: "Driver is on the way",
    sub: "Your driver has accepted the ride",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    dot: "bg-blue-500",
    icon: Car,
    animate: false,
  },
  STARTED: {
    label: "Ride in progress",
    sub: "You're on your way to the destination",
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
    dot: "bg-green-500",
    icon: Navigation,
    animate: false,
  },
  COMPLETED: {
    label: "Ride completed",
    sub: "Hope you had a great ride!",
    color: "text-zinc-600",
    bg: "bg-zinc-50",
    border: "border-zinc-200",
    dot: "bg-zinc-400",
    icon: CheckCircle2,
    animate: false,
  },
  CANCELLED: {
    label: "Ride cancelled",
    sub: "This ride was cancelled",
    color: "text-red-500",
    bg: "bg-red-50",
    border: "border-red-200",
    dot: "bg-red-400",
    icon: AlertCircle,
    animate: false,
  },
};

// ── Timeline step ─────────────────────────────────────────────────────────────
const STEPS = ["REQUESTED", "ACCEPTED", "STARTED", "COMPLETED"];

function TimelineStep({ step, currentStatus }) {
  const stepIndex    = STEPS.indexOf(step);
  const currentIndex = STEPS.indexOf(currentStatus);
  const done    = currentIndex > stepIndex;
  const active  = currentIndex === stepIndex;
  const pending = currentIndex < stepIndex;

  const labels = {
    REQUESTED: "Searching",
    ACCEPTED:  "Driver found",
    STARTED:   "Ride started",
    COMPLETED: "Completed",
  };

  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all ${
          done    ? "bg-black"
          : active ? "bg-black ring-4 ring-black/20"
          :          "bg-zinc-200"
        }`}
      >
        {done ? (
          <CheckCircle2 size={11} className="text-white" />
        ) : active ? (
          <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
        ) : (
          <div className="w-2 h-2 rounded-full bg-zinc-400" />
        )}
      </div>
      <span
        className={`text-xs font-semibold transition-colors ${
          done || active ? "text-black" : "text-zinc-400"
        }`}
      >
        {labels[step]}
      </span>
    </div>
  );
}

const PAGE_HEIGHT = "calc(100vh - 64px)";

// ── Main component ────────────────────────────────────────────────────────────
function RideTrackingPage() {
  const navigate = useNavigate();
  const [ride, setRide]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus]   = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const eta      = useMapStore((s) => s.eta);
  const distance = useMapStore((s) => s.distance);

  // Fetch most recent active OR last completed/cancelled ride
  const loadRide = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    try {
      const active = await getActiveRide();
      if (active) {
        setRide(active);
        setStatus(active.status);
      } else {
        // No active ride — show last completed
        const res = await getMyRides();
        const last = (res.data || []).slice(-1)[0] ?? null;
        setRide(last);
        setStatus(last?.status ?? null);
      }
    } catch {
      setRide(null);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadRide();
  }, [loadRide]);

  // Poll for status changes when ride is active
  useRidePolling(
    ride?.rideId,
    (newStatus) => {
      setStatus(newStatus);
      if (newStatus === "COMPLETED" || newStatus === "CANCELLED") {
        loadRide(true);
      }
    },
    ["REQUESTED", "ACCEPTED", "STARTED"].includes(status)
  );

  // Wire ride coordinates into mapStore → draws markers + route
  useTrackingMap(ride);

  const cfg = status ? (STATUS[status] ?? STATUS.REQUESTED) : null;
  const StatusIcon = cfg?.icon ?? Loader;
  const isActive = ["REQUESTED", "ACCEPTED", "STARTED"].includes(status);

  return (
    <div
      className="flex gap-4 p-4 bg-zinc-100 dark:bg-zinc-950"
      style={{ height: PAGE_HEIGHT }}
    >
      {/* ── LEFT PANEL ─────────────────────────────────────────── */}
      <div className="w-[340px] shrink-0 bg-white rounded-2xl shadow-lg border border-zinc-200 flex flex-col overflow-hidden">
        <div className="flex flex-col gap-4 p-4 overflow-y-auto flex-1">

          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-black text-black tracking-tight">Track Ride</h1>
              <p className="text-[10px] text-zinc-400 mt-0.5">Live status updates</p>
            </div>
            <button
              onClick={() => loadRide(true)}
              disabled={refreshing}
              className="w-7 h-7 rounded-xl bg-zinc-100 flex items-center justify-center hover:bg-zinc-200 transition"
            >
              <RefreshCw size={12} className={`text-zinc-500 ${refreshing ? "animate-spin" : ""}`} />
            </button>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <div className="w-7 h-7 border-[3px] border-zinc-200 border-t-black rounded-full animate-spin" />
              <p className="text-xs text-zinc-400">Loading ride status...</p>
            </div>
          )}

          {/* No ride */}
          {!loading && !ride && (
            <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
              <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center">
                <MapPin size={20} className="text-zinc-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-black">No active ride</p>
                <p className="text-xs text-zinc-400 mt-1">
                  Book a ride to start tracking it here.
                </p>
              </div>
              <button
                onClick={() => navigate("/rider/book")}
                className="mt-2 bg-black text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-zinc-800 transition"
              >
                Book a ride
              </button>
            </div>
          )}

          {/* Ride info */}
          {!loading && ride && cfg && (
            <>
              {/* Status banner */}
              <div className={`flex items-center gap-3 px-3 py-3 rounded-2xl border ${cfg.bg} ${cfg.border}`}>
                <div className={`w-8 h-8 rounded-xl ${cfg.bg} border ${cfg.border} flex items-center justify-center shrink-0`}>
                  <StatusIcon
                    size={16}
                    className={`${cfg.color} ${cfg.animate ? "animate-spin" : ""}`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-black ${cfg.color}`}>{cfg.label}</p>
                  <p className="text-[10px] text-zinc-500 mt-0.5">{cfg.sub}</p>
                </div>
                {isActive && (
                  <div className="flex items-center gap-1 shrink-0">
                    <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot} animate-pulse`} />
                    <span className="text-[9px] font-bold text-zinc-500">LIVE</span>
                  </div>
                )}
              </div>

              {/* Timeline */}
              {status !== "CANCELLED" && (
                <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-3 flex flex-col gap-2.5">
                  <p className="text-[9px] text-zinc-400 font-semibold uppercase tracking-wide mb-1">
                    Journey progress
                  </p>
                  {STEPS.map((step, i) => (
                    <div key={step}>
                      <TimelineStep step={step} currentStatus={status} />
                      {i < STEPS.length - 1 && (
                        <div className="ml-[9px] h-3 border-l-2 border-dashed border-zinc-200" />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* ETA + Distance */}
              {(eta || distance) && isActive && (
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-2.5 text-center">
                    <div className="flex items-center justify-center gap-1 mb-0.5">
                      <Clock size={10} className="text-blue-400" />
                      <p className="text-[9px] text-blue-400 font-semibold uppercase tracking-wide">ETA</p>
                    </div>
                    <p className="text-lg font-black text-blue-700">{eta} min</p>
                  </div>
                  <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-2.5 text-center">
                    <div className="flex items-center justify-center gap-1 mb-0.5">
                      <Navigation size={10} className="text-indigo-400" />
                      <p className="text-[9px] text-indigo-400 font-semibold uppercase tracking-wide">Distance</p>
                    </div>
                    <p className="text-lg font-black text-indigo-700">{distance} km</p>
                  </div>
                </div>
              )}

              {/* Route card */}
              <div className="border border-zinc-100 rounded-2xl overflow-hidden">
                <div className="flex items-start gap-2 px-3 py-2.5">
                  <div className="flex flex-col items-center gap-0.5 mt-0.5 shrink-0">
                    <div className="w-2 h-2 rounded-full bg-black" />
                    <div className="h-4 border-l-2 border-dashed border-zinc-300" />
                    <div className="w-2 h-2 rounded bg-black" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-2">
                    <div>
                      <p className="text-[9px] text-zinc-400">Pickup</p>
                      <p className="text-xs font-semibold text-black truncate">
                        {ride.pickupAddress || `${ride.pickupLatitude?.toFixed(4)}, ${ride.pickupLongitude?.toFixed(4)}`}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] text-zinc-400">Drop</p>
                      <p className="text-xs font-semibold text-black truncate">
                        {ride.dropAddress || `${ride.dropLatitude?.toFixed(4)}, ${ride.dropLongitude?.toFixed(4)}`}
                      </p>
                    </div>
                  </div>
                </div>
                {ride.fare && (
                  <div className="px-3 py-2 border-t border-zinc-100 flex items-center justify-between">
                    <span className="text-[10px] text-zinc-400 flex items-center gap-1">
                      <IndianRupee size={10} />
                      Fare
                    </span>
                    <span className="text-sm font-black text-black">₹{Math.round(ride.fare)}</span>
                  </div>
                )}
              </div>

              {/* Driver contact — shown when ACCEPTED or STARTED */}
              {["ACCEPTED", "STARTED"].includes(status) && (
                <div className="bg-zinc-900 text-white rounded-2xl p-3">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-lg">
                      🧑‍✈️
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black">Your Driver</p>
                      <p className="text-[10px] text-zinc-400 mt-0.5">Driver #{ride.driverId ?? "—"}</p>
                    </div>
                    <div className="flex gap-1.5">
                      <button
                        disabled
                        title="Call driver — coming soon"
                        className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center cursor-not-allowed"
                      >
                        <Phone size={13} className="text-zinc-400" />
                      </button>
                      <button
                        disabled
                        title="Message driver — coming soon"
                        className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center cursor-not-allowed"
                      >
                        <MessageSquare size={13} className="text-zinc-400" />
                      </button>
                    </div>
                  </div>
                  <p className="text-[9px] text-zinc-500">
                    In-app call and chat coming soon
                  </p>
                </div>
              )}

              {/* Ride completed CTA */}
              {status === "COMPLETED" && (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-3 text-center">
                  <p className="text-2xl mb-1">✅</p>
                  <p className="text-sm font-black text-green-700">Ride completed!</p>
                  <p className="text-[10px] text-zinc-500 mt-0.5">Hope you had a great ride</p>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => navigate("/rider/history")}
                      className="flex-1 border border-zinc-200 text-zinc-600 text-[10px] font-semibold py-1.5 rounded-xl hover:bg-zinc-50 transition"
                    >
                      View history
                    </button>
                    <button
                      onClick={() => navigate("/rider/book")}
                      className="flex-1 bg-black text-white text-[10px] font-bold py-1.5 rounded-xl hover:bg-zinc-800 transition"
                    >
                      Book again
                    </button>
                  </div>
                </div>
              )}

              {/* Cancelled state */}
              {status === "CANCELLED" && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-3 text-center">
                  <p className="text-2xl mb-1">❌</p>
                  <p className="text-sm font-black text-red-600">Ride cancelled</p>
                  <button
                    onClick={() => navigate("/rider/book")}
                    className="mt-3 w-full bg-black text-white text-[10px] font-bold py-1.5 rounded-xl hover:bg-zinc-800 transition"
                  >
                    Book a new ride
                  </button>
                </div>
              )}

              {/* Ride ID + refresh hint */}
              <p className="text-center text-[9px] text-zinc-400">
                Ride #{ride.rideId} · Auto-refreshes every 3 sec
              </p>
            </>
          )}
        </div>
      </div>

      {/* ── RIGHT CARD — Live Map ─────────────────────────────── */}
      <div className="flex-1 bg-white rounded-2xl shadow-lg border border-zinc-200 overflow-hidden relative hidden lg:block">
        {/* Live badge */}
        {isActive && (
          <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-black/80 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-full">
            <Radio size={10} className="text-green-400 animate-pulse" />
            LIVE
          </div>
        )}

        {!loading && !ride ? (
          <div className="h-full flex flex-col items-center justify-center gap-3 text-center p-8">
            <div className="w-16 h-16 rounded-3xl bg-zinc-100 flex items-center justify-center">
              <MapPin size={28} className="text-zinc-300" />
            </div>
            <p className="text-sm font-bold text-zinc-400">Map will show here</p>
            <p className="text-xs text-zinc-300">Your ride route appears on the map once a ride is active</p>
          </div>
        ) : (
          <RideMap />
        )}
      </div>
    </div>
  );
}

export default RideTrackingPage;