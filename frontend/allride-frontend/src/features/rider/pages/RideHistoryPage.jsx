import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMyRides, cancelRide } from "@/features/rider/api/rideApi";
import {
  Clock,
  Star,
  Navigation,
  MapPin,
  CheckCircle2,
  XCircle,
  Loader,
  ChevronRight,
  Filter,
  IndianRupee,
} from "lucide-react";

// ── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  COMPLETED: {
    label: "Completed",
    icon: CheckCircle2,
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
    dot: "bg-green-500",
  },
  CANCELLED: {
    label: "Cancelled",
    icon: XCircle,
    color: "text-red-500",
    bg: "bg-red-50",
    border: "border-red-200",
    dot: "bg-red-400",
  },
  REQUESTED: {
    label: "Searching",
    icon: Loader,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    dot: "bg-amber-400",
  },
  ACCEPTED: {
    label: "Accepted",
    icon: Loader,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    dot: "bg-blue-400",
  },
  STARTED: {
    label: "In progress",
    icon: Navigation,
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
    dot: "bg-purple-400",
  },
};

function formatDate(isoString) {
  if (!isoString) return "—";
  const d = new Date(isoString);
  return d.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatCoords(lat, lng) {
  if (!lat || !lng) return "Location unavailable";
  return `${parseFloat(lat).toFixed(4)}°, ${parseFloat(lng).toFixed(4)}°`;
}

const FILTERS = ["All", "Completed", "Cancelled", "In progress"];

// ── Component ─────────────────────────────────────────────────────────────────

function RideHistoryPage() {
  const navigate = useNavigate();
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const res = await getMyRides();
        setRides(res.data || []);
      } catch {
        setError("Could not load ride history. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchRides();
  }, []);

  const filteredRides = rides.filter((r) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Completed") return r.status === "COMPLETED";
    if (activeFilter === "Cancelled") return r.status === "CANCELLED";
    if (activeFilter === "In progress")
      return ["REQUESTED", "ACCEPTED", "STARTED"].includes(r.status);
    return true;
  });

  // Summary stats derived from real data
  const totalSpent = rides
    .filter((r) => r.status === "COMPLETED" && r.fare)
    .reduce((sum, r) => sum + r.fare, 0);
  const completedCount = rides.filter((r) => r.status === "COMPLETED").length;
  const cancelledCount = rides.filter((r) => r.status === "CANCELLED").length;

  const [cancellingId, setCancellingId] = useState(null);

  const handleCancel = async (rideId) => {
    setCancellingId(rideId);
    try {
      await cancelRide(rideId);
      setRides((prev) =>
        prev.map((r) => (r.rideId === rideId ? { ...r, status: "CANCELLED" } : r))
      );
    } catch {
      setError("Could not cancel ride.");
    } finally {
      setCancellingId(null);
    }
  };

  const isInProgress = (status) =>
    ["REQUESTED", "ACCEPTED", "STARTED"].includes(status);

  return (
    <div className="bg-zinc-100 dark:bg-zinc-950 min-h-screen">
      <div className="max-w-3xl mx-auto p-5 flex flex-col gap-4">

        {/* ── HEADER ─────────────────────────────────────────────── */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-black tracking-tight">Ride History</h1>
            <p className="text-xs text-zinc-500 mt-0.5">All your past rides in one place</p>
          </div>
          <button
            onClick={() => navigate("/rider/book")}
            className="flex items-center gap-1.5 bg-black text-white text-xs font-bold px-3 py-2 rounded-xl hover:bg-zinc-800 transition shadow-md"
          >
            <Navigation size={12} />
            Book a ride
          </button>
        </div>

        {/* ── STATS ROW ──────────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white border border-zinc-200 rounded-2xl p-3 text-center shadow-sm">
            <p className="text-xl font-black text-black">{rides.length}</p>
            <p className="text-[10px] text-zinc-400 mt-0.5">Total rides</p>
          </div>
          <div className="bg-white border border-zinc-200 rounded-2xl p-3 text-center shadow-sm">
            <p className="text-xl font-black text-black">
              {totalSpent > 0 ? `₹${Math.round(totalSpent).toLocaleString()}` : "—"}
            </p>
            <p className="text-[10px] text-zinc-400 mt-0.5">Total spent</p>
          </div>
          <div className="bg-white border border-zinc-200 rounded-2xl p-3 text-center shadow-sm">
            <p className="text-xl font-black text-black">{cancelledCount}</p>
            <p className="text-[10px] text-zinc-400 mt-0.5">Cancelled</p>
          </div>
        </div>

        {/* ── FILTER TABS ────────────────────────────────────────── */}
        <div className="flex gap-2 overflow-x-auto pb-0.5">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all ${
                activeFilter === f
                  ? "bg-black text-white border-black"
                  : "bg-white text-zinc-500 border-zinc-200 hover:border-zinc-400"
              }`}
            >
              {f}
            </button>
          ))}
          <div className="ml-auto shrink-0">
            <button className="flex items-center gap-1 text-xs font-semibold text-zinc-500 bg-white border border-zinc-200 px-3 py-1.5 rounded-xl hover:border-zinc-400 transition">
              <Filter size={11} />
              Sort
            </button>
          </div>
        </div>

        {/* ── CONTENT ────────────────────────────────────────────── */}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="w-7 h-7 border-[3px] border-zinc-200 border-t-black rounded-full animate-spin" />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-2xl px-4 py-3">
            {error}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filteredRides.length === 0 && (
          <div className="bg-white border border-zinc-200 rounded-2xl p-10 text-center shadow-sm">
            <p className="text-3xl mb-3">🛺</p>
            <p className="font-bold text-black text-sm">No rides yet</p>
            <p className="text-xs text-zinc-400 mt-1">
              {activeFilter === "All"
                ? "Your ride history will appear here once you book your first ride."
                : `No ${activeFilter.toLowerCase()} rides found.`}
            </p>
            {activeFilter === "All" && (
              <button
                onClick={() => navigate("/rider/book")}
                className="mt-4 bg-black text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-zinc-800 transition"
              >
                Book your first ride
              </button>
            )}
          </div>
        )}

        {/* Ride list */}
        {!loading && !error && filteredRides.length > 0 && (
          <div className="flex flex-col gap-2">
            {filteredRides.map((ride) => {
              const cfg = STATUS_CONFIG[ride.status] ?? STATUS_CONFIG.REQUESTED;
              const StatusIcon = cfg.icon;
              const isExpanded = expandedId === ride.rideId;

              return (
                <div
                  key={ride.rideId}
                  className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden"
                >
                  {/* ── Main row ── */}
                  <div className="p-3">
                    <div className="flex items-start justify-between gap-3">
                      {/* Left: route */}
                      <div className="flex-1 min-w-0">
                        {/* Status + date row */}
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${cfg.color} ${cfg.bg} ${cfg.border}`}
                          >
                            <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                            {cfg.label}
                          </span>
                          <span className="text-[10px] text-zinc-400">
                            {formatDate(ride.requestedAt)}
                          </span>
                        </div>

                        {/* Route visualization */}
                        <div className="flex items-start gap-2">
                          <div className="flex flex-col items-center gap-0.5 mt-0.5 shrink-0">
                            <div className="w-2 h-2 rounded-full bg-black" />
                            <div className="h-4 border-l-2 border-dashed border-zinc-300" />
                            <div className="w-2 h-2 rounded bg-black" />
                          </div>
                          <div className="flex-1 min-w-0 space-y-2">
                            <div>
                              <p className="text-[10px] text-zinc-400">From</p>
                              <p className="text-xs font-semibold text-black truncate">
                              {ride.pickupAddress || formatCoords(ride.pickupLatitude, ride.pickupLongitude)}
                              </p>
                            </div>
                            <div>
                              <p className="text-[10px] text-zinc-400">To</p>
                              <p className="text-xs font-semibold text-black truncate">
                              {ride.dropAddress || formatCoords(ride.dropLatitude, ride.dropLongitude)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: fare + rating */}
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <div className="text-right">
                          <p className="text-sm font-black text-black">
                            {ride.fare ? `₹${Math.round(ride.fare)}` : "—"}
                          </p>
                          <p className="text-[9px] text-zinc-400">Ride #{ride.rideId}</p>
                        </div>

                        {/* Rate button — only for unrated completed rides */}
                        {ride.status === "COMPLETED" && (
                          <button className="flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-bold px-2 py-1 rounded-lg hover:bg-amber-100 transition">
                            <Star size={9} className="fill-amber-500 text-amber-500" />
                            Rate
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Expand / collapse toggle */}
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : ride.rideId)}
                      className="mt-2 w-full flex items-center justify-center gap-1 text-[10px] text-zinc-400 hover:text-zinc-600 transition"
                    >
                      {isExpanded ? "Hide details" : "Show details"}
                      <ChevronRight
                        size={10}
                        className={`transition-transform ${isExpanded ? "rotate-90" : ""}`}
                      />
                    </button>
                  </div>

                  {/* ── Expanded details ── */}
                  {isExpanded && (
                    <div className="border-t border-zinc-100 bg-zinc-50 px-4 py-3 grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-[9px] text-zinc-400 uppercase tracking-wide font-semibold">
                          Ride ID
                        </p>
                        <p className="text-xs font-bold text-black mt-0.5">#{ride.rideId}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-zinc-400 uppercase tracking-wide font-semibold">
                          Fare
                        </p>
                        <p className="text-xs font-bold text-black mt-0.5">
                          {ride.fare ? `₹${ride.fare.toFixed(2)}` : "—"}
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] text-zinc-400 uppercase tracking-wide font-semibold">
                          Requested
                        </p>
                        <p className="text-xs font-bold text-black mt-0.5">
                          {formatDate(ride.requestedAt)}
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] text-zinc-400 uppercase tracking-wide font-semibold">
                          Completed
                        </p>
                        <p className="text-xs font-bold text-black mt-0.5">
                          {formatDate(ride.completedAt)}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-[9px] text-zinc-400 uppercase tracking-wide font-semibold">
                          Pickup
                        </p>
                        <p className="text-xs font-bold text-black mt-0.5 font-mono">
                        {ride.pickupAddress || `${ride.pickupLatitude}, ${ride.pickupLongitude}`}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-[9px] text-zinc-400 uppercase tracking-wide font-semibold">
                          Drop
                        </p>
                        <p className="text-xs font-bold text-black mt-0.5 font-mono">
                        {ride.dropAddress || `${ride.dropLatitude}, ${ride.dropLongitude}`}
                        </p>
                      </div>
                    </div>
                  )}

                 {isInProgress(ride.status) && (
                    <div className="px-3 pb-2 flex gap-2">
                      <button
                        onClick={() => navigate("/rider/tracking")}
                        className="flex-1 bg-black text-white text-[10px] font-bold py-1.5 rounded-xl hover:bg-zinc-800 transition"
                      >
                        Track ride
                      </button>
                      <button
                        onClick={() => handleCancel(ride.rideId)}
                        disabled={cancellingId === ride.rideId}
                        className="flex-1 border border-red-200 text-red-600 text-[10px] font-semibold py-1.5 rounded-xl hover:bg-red-50 transition disabled:opacity-50"
                      >
                        {cancellingId === ride.rideId ? "Cancelling..." : "Cancel"}
                      </button>
                    </div>
                  )}

                  {/* ── Book again button ── */}
                  <div className="px-3 pb-3">
                    <button
                      onClick={() => navigate("/rider/book")}
                      className="w-full flex items-center justify-center gap-1.5 border border-zinc-200 text-zinc-500 text-[10px] font-semibold py-1.5 rounded-xl hover:bg-zinc-50 hover:border-zinc-400 transition"
                    >
                      <MapPin size={10} />
                      Book again
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}

export default RideHistoryPage;