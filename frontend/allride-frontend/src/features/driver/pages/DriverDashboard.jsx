import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  IndianRupee,
  TrendingUp,
  BarChart2,
  CheckCircle2,
  XCircle,
  Star,
  Clock,
  ChevronRight,
  Navigation,
  Zap,
  Target,
} from "lucide-react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { getMyRides } from "@/features/driver/api/driverApi";

function getRideDate(ride) {
  return new Date(ride.completedAt || ride.requestedAt);
}

function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function startOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function sumFares(rides) {
  return rides.reduce((sum, r) => sum + (r.fare || 0), 0);
}

function formatShortDate(isoString) {
  if (!isoString) return "—";
  return new Date(isoString).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function StatCard({ icon: Icon, value, label, sub, color = "text-zinc-400" }) {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-3 shadow-sm">
      <Icon size={13} className={`${color} mb-1`} />
      <p className="text-lg font-black text-black">{value}</p>
      <p className="text-[10px] text-zinc-400 mt-0.5">{label}</p>
      {sub && <p className="text-[9px] text-zinc-400 mt-0.5">{sub}</p>}
    </div>
  );
}

function MetricRow({ label, value, barWidth, color = "bg-black" }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs font-semibold text-zinc-600">{label}</p>
        <p className="text-xs font-black text-black">{value}</p>
      </div>
      <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: barWidth }} />
      </div>
    </div>
  );
}

function DriverDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMyRides()
      .then((res) => {
        const sorted = [...(res.data || [])].sort(
          (a, b) => getRideDate(b).getTime() - getRideDate(a).getTime()
        );
        setRides(sorted);
      })
      .catch(() => setError("Could not load dashboard data. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  const now = new Date();
  const weekStart = startOfWeek(now);
  const displayName = user?.fullName || user?.name || "Driver";

  const completedRides = rides.filter((r) => r.status === "COMPLETED");
  const cancelledRides = rides.filter((r) => r.status === "CANCELLED");
  const inProgressRides = rides.filter((r) =>
    ["ACCEPTED", "STARTED"].includes(r.status)
  );

  const todayCompleted = completedRides.filter((r) =>
    isSameDay(getRideDate(r), now)
  );
  const weekCompleted = completedRides.filter((r) => getRideDate(r) >= weekStart);

  const todayEarnings = sumFares(todayCompleted);
  const weekEarnings = sumFares(weekCompleted);
  const allTimeEarnings = sumFares(completedRides);
  const avgFare =
    completedRides.length > 0
      ? Math.round(allTimeEarnings / completedRides.length)
      : 0;

  const assignedTrips = rides.filter((r) =>
    ["COMPLETED", "CANCELLED", "STARTED", "ACCEPTED"].includes(r.status)
  );
  const completionRate =
    assignedTrips.length > 0
      ? Math.round((completedRides.length / assignedTrips.length) * 100)
      : 100;
  const cancellationRate =
    assignedTrips.length > 0
      ? Math.round((cancelledRides.length / assignedTrips.length) * 100)
      : 0;

  const weeklyChart = useMemo(() => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const counts = days.map((_, i) => {
      const dayStart = new Date(weekStart);
      dayStart.setDate(weekStart.getDate() + i);
      const dayEnd = new Date(dayStart);
      dayEnd.setDate(dayStart.getDate() + 1);

      return completedRides.filter((r) => {
        const d = getRideDate(r);
        return d >= dayStart && d < dayEnd;
      }).length;
    });

    const max = Math.max(...counts, 1);
    return days.map((label, i) => ({
      label,
      count: counts[i],
      height: `${Math.max((counts[i] / max) * 100, counts[i] > 0 ? 8 : 0)}%`,
    }));
  }, [completedRides, weekStart]);

  const recentTrips = completedRides.slice(0, 4);

  const greeting = (() => {
    const hour = now.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  })();

  return (
    <div className="bg-zinc-100 dark:bg-zinc-950 min-h-screen">
      <div className="max-w-3xl mx-auto p-5 flex flex-col gap-4">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 font-medium">{greeting}</p>
            <h1 className="text-xl font-black text-black tracking-tight">
              {displayName}
            </h1>
            <p className="text-xs text-zinc-500 mt-0.5">Driver dashboard</p>
          </div>
          <button
            onClick={() => navigate("/driver/home")}
            className="flex items-center gap-1.5 bg-black text-white text-xs font-bold px-3 py-2 rounded-xl hover:bg-zinc-800 transition shadow-md"
          >
            <Navigation size={12} />
            Go online
          </button>
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

        {!loading && !error && (
          <>
            {/* Active ride alert */}
            {inProgressRides.length > 0 && (
              <button
                onClick={() => navigate("/driver/home")}
                className="w-full bg-blue-600 text-white rounded-2xl p-4 text-left shadow-md hover:bg-blue-700 transition"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-blue-100 uppercase tracking-wide">
                      Active trip
                    </p>
                    <p className="text-sm font-black mt-0.5">
                      Trip #{inProgressRides[0].rideId} · {inProgressRides[0].status}
                    </p>
                  </div>
                  <ChevronRight size={16} />
                </div>
              </button>
            )}

            {/* Today hero */}
            <div className="bg-black text-white rounded-2xl p-5 shadow-lg">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-zinc-400 font-semibold uppercase tracking-wide">
                    Today
                  </p>
                  <p className="text-4xl font-black tracking-tight mt-1">
                    ₹{Math.round(todayEarnings).toLocaleString()}
                  </p>
                  <p className="text-xs text-zinc-400 mt-1">
                    {todayCompleted.length} trip{todayCompleted.length !== 1 ? "s" : ""} completed
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-zinc-400">This week</p>
                  <p className="text-lg font-black">₹{Math.round(weekEarnings).toLocaleString()}</p>
                  <p className="text-[10px] text-zinc-400">{weekCompleted.length} trips</p>
                </div>
              </div>
            </div>

            {/* Stat grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <StatCard
                icon={BarChart2}
                value={completedRides.length}
                label="Total trips"
                color="text-blue-500"
              />
              <StatCard
                icon={IndianRupee}
                value={allTimeEarnings > 0 ? `₹${Math.round(allTimeEarnings)}` : "—"}
                label="All-time earned"
                color="text-green-500"
              />
              <StatCard
                icon={Target}
                value={avgFare > 0 ? `₹${avgFare}` : "—"}
                label="Avg per trip"
                color="text-purple-500"
              />
              <StatCard
                icon={Star}
                value="4.8"
                label="Rating"
                sub="Driver score"
                color="text-amber-500"
              />
            </div>

            {/* Weekly trips chart */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold text-black">Trips this week</p>
                <button
                  onClick={() => navigate("/driver/earnings")}
                  className="text-[10px] font-semibold text-zinc-500 hover:text-black flex items-center gap-0.5"
                >
                  Earnings <ChevronRight size={10} />
                </button>
              </div>
              <div className="flex items-end justify-between gap-2 h-28">
                {weeklyChart.map(({ label, count, height }) => (
                  <div key={label} className="flex-1 flex flex-col items-center gap-1">
                    <p className="text-[9px] text-zinc-400 font-semibold">
                      {count > 0 ? count : ""}
                    </p>
                    <div className="w-full h-20 bg-zinc-100 rounded-lg flex items-end overflow-hidden">
                      <div
                        className="w-full bg-blue-600 rounded-lg transition-all"
                        style={{ height }}
                      />
                    </div>
                    <p className="text-[9px] text-zinc-500 font-medium">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={14} className="text-zinc-500" />
                <p className="text-xs font-bold text-black">Performance</p>
              </div>
              <div className="flex flex-col gap-3">
                <MetricRow
                  label="Completion rate"
                  value={`${completionRate}%`}
                  barWidth={`${completionRate}%`}
                  color="bg-green-500"
                />
                <MetricRow
                  label="Cancellation rate"
                  value={`${cancellationRate}%`}
                  barWidth={`${cancellationRate}%`}
                  color="bg-red-400"
                />
                <MetricRow
                  label="Acceptance rate"
                  value="—"
                  barWidth="0%"
                  color="bg-zinc-300"
                />
              </div>
              <p className="text-[9px] text-zinc-400 mt-3">
                Acceptance rate requires ride-request tracking — coming soon.
              </p>
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => navigate("/driver/earnings")}
                className="bg-white border border-zinc-200 rounded-2xl p-3 text-left shadow-sm hover:border-black transition"
              >
                <IndianRupee size={14} className="text-zinc-500 mb-1" />
                <p className="text-xs font-bold text-black">Earnings</p>
              </button>
              <button
                onClick={() => navigate("/driver/history")}
                className="bg-white border border-zinc-200 rounded-2xl p-3 text-left shadow-sm hover:border-black transition"
              >
                <Clock size={14} className="text-zinc-500 mb-1" />
                <p className="text-xs font-bold text-black">History</p>
              </button>
              <button
                onClick={() => navigate("/driver/profile")}
                className="bg-white border border-zinc-200 rounded-2xl p-3 text-left shadow-sm hover:border-black transition"
              >
                <Zap size={14} className="text-zinc-500 mb-1" />
                <p className="text-xs font-bold text-black">Profile</p>
              </button>
            </div>

            {/* Recent trips */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wide">
                  Recent trips
                </p>
                <button
                  onClick={() => navigate("/driver/history")}
                  className="text-[10px] text-black font-semibold hover:underline flex items-center gap-0.5"
                >
                  View all <ChevronRight size={10} />
                </button>
              </div>

              {recentTrips.length === 0 ? (
                <div className="bg-white border border-zinc-200 rounded-2xl p-8 text-center shadow-sm">
                  <p className="text-3xl mb-3">📊</p>
                  <p className="font-bold text-black text-sm">No trips yet</p>
                  <p className="text-xs text-zinc-400 mt-1">
                    Go online to start accepting rides.
                  </p>
                  <button
                    onClick={() => navigate("/driver/home")}
                    className="mt-4 bg-black text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-zinc-800 transition"
                  >
                    Go online
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {recentTrips.map((ride) => (
                    <div
                      key={ride.rideId}
                      className="bg-white border border-zinc-200 rounded-2xl p-3 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="flex items-center gap-1 text-[10px] font-semibold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                              <CheckCircle2 size={9} />
                              Completed
                            </span>
                            <span className="text-[10px] text-zinc-400">
                              {formatShortDate(ride.completedAt || ride.requestedAt)}
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-black truncate">
                            {ride.pickupAddress || "Pickup"}
                          </p>
                          <p className="text-xs text-zinc-500 truncate">
                            → {ride.dropAddress || "Drop"}
                          </p>
                        </div>
                        <p className="text-sm font-black text-black shrink-0">
                          ₹{Math.round(ride.fare || 0)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {cancelledRides.length > 0 && (
                <p className="text-[10px] text-zinc-400 text-center mt-2 flex items-center justify-center gap-1">
                  <XCircle size={10} />
                  {cancelledRides.length} cancelled trip{cancelledRides.length !== 1 ? "s" : ""} total
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DriverDashboard;