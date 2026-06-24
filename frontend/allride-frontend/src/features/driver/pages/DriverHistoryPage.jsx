import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Navigation,
  CheckCircle2,
  XCircle,
  Loader,
  ChevronRight,
  Filter,
  IndianRupee,
} from "lucide-react";
import { getMyRides } from "@/features/driver/api/driverApi";

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
    label: "Requested",
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

function DriverHistoryPage() {
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
        setError("Could not load trip history. Please try again.");
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
      return ["ACCEPTED", "STARTED"].includes(r.status);
    return true;
  });

  const totalEarned = rides
    .filter((r) => r.status === "COMPLETED" && r.fare)
    .reduce((sum, r) => sum + r.fare, 0);
  const completedCount = rides.filter((r) => r.status === "COMPLETED").length;
  const cancelledCount = rides.filter((r) => r.status === "CANCELLED").length;

  return (
    <div className="bg-zinc-100 dark:bg-zinc-950 min-h-screen">
      <div className="max-w-3xl mx-auto p-5 flex flex-col gap-4">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-black tracking-tight">Trip History</h1>
            <p className="text-xs text-zinc-500 mt-0.5">All trips you&apos;ve driven</p>
          </div>
          <button
            onClick={() => navigate("/driver/home")}
            className="flex items-center gap-1.5 bg-black text-white text-xs font-bold px-3 py-2 rounded-xl hover:bg-zinc-800 transition shadow-md"
          >
            <Navigation size={12} />
            Go online
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white border border-zinc-200 rounded-2xl p-3 text-center shadow-sm">
            <p className="text-xl font-black text-black">{rides.length}</p>
            <p className="text-[10px] text-zinc-400 mt-0.5">Total trips</p>
          </div>
          <div className="bg-white border border-zinc-200 rounded-2xl p-3 text-center shadow-sm">
            <div className="flex items-center justify-center gap-0.5 mb-0.5">
              <IndianRupee size={12} className="text-zinc-400" />
            </div>
            <p className="text-xl font-black text-black">
              {totalEarned > 0 ? Math.round(totalEarned).toLocaleString() : "—"}
            </p>
            <p className="text-[10px] text-zinc-400 mt-0.5">Total earned</p>
          </div>
          <div className="bg-white border border-zinc-200 rounded-2xl p-3 text-center shadow-sm">
            <p className="text-xl font-black text-black">{completedCount}</p>
            <p className="text-[10px] text-zinc-400 mt-0.5">Completed</p>
          </div>
        </div>

        {/* Filters */}
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
            <button
              disabled
              title="Coming soon"
              className="flex items-center gap-1 text-xs font-semibold text-zinc-400 bg-white border border-zinc-200 px-3 py-1.5 rounded-xl cursor-not-allowed"
            >
              <Filter size={11} />
              Sort
            </button>
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="w-7 h-7 border-[3px] border-zinc-200 border-t-black rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-2xl px-4 py-3">
            {error}
          </div>
        )}

        {!loading && !error && filteredRides.length === 0 && (
          <div className="bg-white border border-zinc-200 rounded-2xl p-10 text-center shadow-sm">
            <p className="text-3xl mb-3">🚖</p>
            <p className="font-bold text-black text-sm">No trips yet</p>
            <p className="text-xs text-zinc-400 mt-1">
              {activeFilter === "All"
                ? "Your trip history will appear here once you complete your first ride."
                : `No ${activeFilter.toLowerCase()} trips found.`}
            </p>
            {activeFilter === "All" && (
              <button
                onClick={() => navigate("/driver/home")}
                className="mt-4 bg-black text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-zinc-800 transition"
              >
                Go online to accept rides
              </button>
            )}
          </div>
        )}

        {!loading && !error && filteredRides.length > 0 && (
          <div className="flex flex-col gap-2">
            {filteredRides.map((ride) => {
              const cfg = STATUS_CONFIG[ride.status] ?? STATUS_CONFIG.REQUESTED;
              const isExpanded = expandedId === ride.rideId;

              return (
                <div
                  key={ride.rideId}
                  className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden"
                >
                  <div className="p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
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
                                {ride.pickupAddress ||
                                  formatCoords(ride.pickupLatitude, ride.pickupLongitude)}
                              </p>
                            </div>
                            <div>
                              <p className="text-[10px] text-zinc-400">Drop</p>
                              <p className="text-xs font-semibold text-black truncate">
                                {ride.dropAddress ||
                                  formatCoords(ride.dropLatitude, ride.dropLongitude)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end shrink-0">
                        <p className="text-sm font-black text-black">
                          {ride.fare ? `₹${Math.round(ride.fare)}` : "—"}
                        </p>
                        <p className="text-[9px] text-zinc-400">Trip #{ride.rideId}</p>
                      </div>
                    </div>

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

                  {isExpanded && (
                    <div className="border-t border-zinc-100 bg-zinc-50 px-4 py-3 grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-[9px] text-zinc-400 uppercase tracking-wide font-semibold">
                          Trip ID
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
                        <p className="text-xs font-bold text-black mt-0.5">
                          {ride.pickupAddress ||
                            `${ride.pickupLatitude}, ${ride.pickupLongitude}`}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-[9px] text-zinc-400 uppercase tracking-wide font-semibold">
                          Drop
                        </p>
                        <p className="text-xs font-bold text-black mt-0.5">
                          {ride.dropAddress ||
                            `${ride.dropLatitude}, ${ride.dropLongitude}`}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {!loading && !error && cancelledCount > 0 && (
          <p className="text-[10px] text-zinc-400 text-center">
            {cancelledCount} cancelled trip{cancelledCount !== 1 ? "s" : ""} total
          </p>
        )}
      </div>
    </div>
  );
}

export default DriverHistoryPage;