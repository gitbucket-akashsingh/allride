import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Navigation,
  Clock,
  Sparkles,
  CloudSun,
  TrendingUp,
  Zap,
  ChevronRight,
  MapPin,
  Home,
  Briefcase,
  Plane,
  BarChart2,
  IndianRupee,
  Radio,
  Loader,
} from "lucide-react";
import { getMyRides, getActiveRide } from "@/features/rider/api/rideApi";

const QUICK_DESTINATIONS = [
  { label: "Home", icon: Home, address: "Kondapur, Hyderabad" },
  { label: "Work", icon: Briefcase, address: "DBS Tech, Gachibowli" },
  { label: "Airport", icon: Plane, address: "RGIA, Shamshabad" },
];

const AI_INSIGHTS = [
  {
    id: 1,
    icon: CloudSun,
    color: "text-amber-500",
    bg: "bg-amber-50",
    title: "Weather",
    value: "Partly cloudy, 31°C",
    sub: "Good conditions for travel",
  },
  {
    id: 2,
    icon: TrendingUp,
    color: "text-red-500",
    bg: "bg-red-50",
    title: "Traffic",
    value: "Moderate congestion",
    sub: "NH65 — expect +12 min",
  },
  {
    id: 3,
    icon: Zap,
    color: "text-green-500",
    bg: "bg-green-50",
    title: "Best time",
    value: "Book after 11 AM",
    sub: "Surge ends in ~40 min",
  },
];

function formatDate(isoString) {
  if (!isoString) return "—";
  return new Date(isoString).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function RiderHomePage() {
  const navigate = useNavigate();
  const [rides, setRides] = useState([]);
  const [activeRide, setActiveRide] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [ridesRes, active] = await Promise.all([
          getMyRides(),
          getActiveRide(),
        ]);
        setRides(ridesRes.data || []);
        setActiveRide(active);
      } catch {
        setRides([]);
        setActiveRide(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const completedRides = rides.filter((r) => r.status === "COMPLETED");
  const totalSpent = completedRides.reduce((sum, r) => sum + (r.fare || 0), 0);
  const recentRides = completedRides.slice(0, 3);

  const stats = {
    totalRides: rides.length,
    totalSpent: Math.round(totalSpent),
    completed: completedRides.length,
  };

  return (
    <div className="bg-zinc-100 dark:bg-zinc-950 min-h-screen">
      <div className="max-w-4xl mx-auto p-5 flex flex-col gap-4">

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 font-medium">Good morning</p>
            <h1 className="text-xl font-black text-black tracking-tight leading-tight">
              Welcome back 👋
            </h1>
          </div>
          <button
            onClick={() => navigate("/rider/book")}
            className="flex items-center gap-2 bg-black text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-zinc-800 transition-all shadow-md hover:-translate-y-0.5 active:scale-[0.98]"
          >
            <Navigation size={14} />
            Book a Ride
          </button>
        </div>

        {activeRide && (
          <button
            onClick={() => navigate("/rider/tracking")}
            className="w-full bg-black text-white rounded-2xl p-4 text-left hover:bg-zinc-800 transition shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio size={14} className="text-green-400 animate-pulse" />
                <span className="text-xs font-bold">Active ride — {activeRide.status}</span>
              </div>
              <ChevronRight size={14} />
            </div>
            <p className="text-[10px] text-zinc-400 mt-1 truncate">
              {activeRide.pickupAddress} → {activeRide.dropAddress}
            </p>
          </button>
        )}

        <div>
          <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wide mb-2">
            Quick destinations
          </p>
          <div className="grid grid-cols-3 gap-2">
            {QUICK_DESTINATIONS.map(({ label, icon: Icon, address }) => (
              <button
                key={label}
                onClick={() => navigate("/rider/book")}
                className="bg-white border border-zinc-200 rounded-2xl p-3 text-left hover:border-black hover:shadow-md transition-all group"
              >
                <div className="w-8 h-8 rounded-xl bg-zinc-100 group-hover:bg-black flex items-center justify-center mb-2 transition-all">
                  <Icon size={14} className="text-zinc-600 group-hover:text-white transition-all" />
                </div>
                <p className="text-xs font-bold text-black">{label}</p>
                <p className="text-[10px] text-zinc-400 mt-0.5 truncate">{address}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-black flex items-center justify-center">
                <Sparkles size={12} className="text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-black leading-none">AI Assistant</p>
                <p className="text-[9px] text-zinc-400 mt-0.5">Powered by Spring AI · updates every 15 min</p>
              </div>
            </div>
            <span className="text-[9px] bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded-full font-medium">
              Coming soon
            </span>
          </div>
          <div className="grid grid-cols-3 divide-x divide-zinc-100">
            {AI_INSIGHTS.map(({ id, icon: Icon, color, bg, title, value, sub }) => (
              <div key={id} className={`p-3 ${bg}`}>
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon size={12} className={color} />
                  <p className="text-[9px] text-zinc-500 font-semibold uppercase tracking-wide">{title}</p>
                </div>
                <p className="text-xs font-black text-black leading-tight">{value}</p>
                <p className="text-[9px] text-zinc-500 mt-0.5 leading-tight">{sub}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white border border-zinc-200 rounded-2xl p-3 text-center shadow-sm">
            <BarChart2 size={13} className="text-zinc-400 mx-auto mb-1" />
            <p className="text-xl font-black text-black">{loading ? "—" : stats.totalRides}</p>
            <p className="text-[10px] text-zinc-400 mt-0.5">Total rides</p>
          </div>
          <div className="bg-white border border-zinc-200 rounded-2xl p-3 text-center shadow-sm">
            <IndianRupee size={13} className="text-zinc-400 mx-auto mb-1" />
            <p className="text-xl font-black text-black">
              {loading ? "—" : stats.totalSpent > 0 ? `₹${stats.totalSpent.toLocaleString()}` : "—"}
            </p>
            <p className="text-[10px] text-zinc-400 mt-0.5">Total spent</p>
          </div>
          <div className="bg-white border border-zinc-200 rounded-2xl p-3 text-center shadow-sm">
            <Clock size={13} className="text-zinc-400 mx-auto mb-1" />
            <p className="text-xl font-black text-black">{loading ? "—" : stats.completed}</p>
            <p className="text-[10px] text-zinc-400 mt-0.5">Completed</p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wide">
              Recent rides
            </p>
            <button
              onClick={() => navigate("/rider/history")}
              className="text-[10px] text-black font-semibold hover:underline flex items-center gap-0.5"
            >
              View all <ChevronRight size={10} />
            </button>
          </div>

          {loading && (
            <div className="flex justify-center py-8">
              <Loader size={20} className="animate-spin text-zinc-400" />
            </div>
          )}

          {!loading && recentRides.length === 0 && (
            <div className="bg-white border border-zinc-200 rounded-2xl p-6 text-center shadow-sm">
              <p className="text-sm font-bold text-black">No rides yet</p>
              <p className="text-xs text-zinc-400 mt-1">Book your first ride to see it here.</p>
            </div>
          )}

          <div className="flex flex-col gap-2">
            {recentRides.map((ride) => (
              <div
                key={ride.rideId}
                className="bg-white border border-zinc-200 rounded-2xl p-3 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Clock size={10} className="text-zinc-400 shrink-0" />
                      <span className="text-[10px] text-zinc-400">{formatDate(ride.requestedAt)}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="flex flex-col items-center gap-0.5 mt-0.5 shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-black" />
                        <div className="h-3 border-l border-dashed border-zinc-300" />
                        <div className="w-1.5 h-1.5 rounded bg-black" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-black truncate">
                          {ride.pickupAddress || "Pickup"}
                        </p>
                        <p className="text-xs text-zinc-500 truncate mt-1">
                          {ride.dropAddress || "Drop"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm font-black text-black shrink-0">
                    {ride.fare ? `₹${Math.round(ride.fare)}` : "—"}
                  </p>
                </div>
                <button
                  onClick={() => navigate("/rider/book")}
                  className="mt-2.5 w-full flex items-center justify-center gap-1.5 border border-zinc-200 text-zinc-600 text-[10px] font-semibold py-1.5 rounded-xl hover:bg-zinc-50 hover:border-zinc-400 transition"
                >
                  <MapPin size={10} />
                  Book again
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default RiderHomePage;