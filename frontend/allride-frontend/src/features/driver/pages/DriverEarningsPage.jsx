import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  IndianRupee,
  TrendingUp,
  Calendar,
  Clock,
  ChevronRight,
  Navigation,
} from "lucide-react";
import { getMyRides } from "@/features/driver/api/driverApi";

function formatDate(isoString) {
  if (!isoString) return "—";
  return new Date(isoString).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatShortDate(isoString) {
  if (!isoString) return "—";
  return new Date(isoString).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
  });
}

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

const PERIODS = ["Today", "This week", "This month", "All time"];

function DriverEarningsPage() {
  const navigate = useNavigate();
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activePeriod, setActivePeriod] = useState("Today");

  useEffect(() => {
    getMyRides()
      .then((res) => {
        const completed = (res.data || [])
          .filter((r) => r.status === "COMPLETED" && r.fare)
          .sort(
            (a, b) =>
              getRideDate(b).getTime() - getRideDate(a).getTime()
          );
        setRides(completed);
      })
      .catch(() => setError("Could not load earnings. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  const now = new Date();
  const weekStart = startOfWeek(now);

  const periodRides = useMemo(() => {
    if (activePeriod === "All time") return rides;

    return rides.filter((ride) => {
      const d = getRideDate(ride);
      if (activePeriod === "Today") return isSameDay(d, now);
      if (activePeriod === "This week") return d >= weekStart;
      if (activePeriod === "This month") {
        return (
          d.getFullYear() === now.getFullYear() &&
          d.getMonth() === now.getMonth()
        );
      }
      return true;
    });
  }, [rides, activePeriod, now, weekStart]);

  const todayRides = rides.filter((r) => isSameDay(getRideDate(r), now));
  const weekRides = rides.filter((r) => getRideDate(r) >= weekStart);
  const monthRides = rides.filter(
    (r) =>
      getRideDate(r).getFullYear() === now.getFullYear() &&
      getRideDate(r).getMonth() === now.getMonth()
  );

  const todayTotal = sumFares(todayRides);
  const weekTotal = sumFares(weekRides);
  const monthTotal = sumFares(monthRides);
  const allTimeTotal = sumFares(rides);
  const periodTotal = sumFares(periodRides);

  const weeklyChart = useMemo(() => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const totals = days.map((_, i) => {
      const dayStart = new Date(weekStart);
      dayStart.setDate(weekStart.getDate() + i);
      const dayEnd = new Date(dayStart);
      dayEnd.setDate(dayStart.getDate() + 1);

      return rides
        .filter((r) => {
          const d = getRideDate(r);
          return d >= dayStart && d < dayEnd;
        })
        .reduce((sum, r) => sum + r.fare, 0);
    });

    const max = Math.max(...totals, 1);
    return days.map((label, i) => ({
      label,
      amount: totals[i],
      height: `${Math.max((totals[i] / max) * 100, totals[i] > 0 ? 8 : 0)}%`,
    }));
  }, [rides, weekStart]);

  return (
    <div className="bg-zinc-100 dark:bg-zinc-950 min-h-screen">
      <div className="max-w-3xl mx-auto p-5 flex flex-col gap-4">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-black tracking-tight">Earnings</h1>
            <p className="text-xs text-zinc-500 mt-0.5">Track what you&apos;ve earned from trips</p>
          </div>
          <button
            onClick={() => navigate("/driver/history")}
            className="flex items-center gap-1.5 bg-black text-white text-xs font-bold px-3 py-2 rounded-xl hover:bg-zinc-800 transition shadow-md"
          >
            <Clock size={12} />
            Trip history
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
            {/* Hero — today's earnings */}
            <div className="bg-black text-white rounded-2xl p-5 shadow-lg">
              <div className="flex items-center gap-2 mb-1">
                <IndianRupee size={14} className="text-zinc-400" />
                <p className="text-xs text-zinc-400 font-semibold uppercase tracking-wide">
                  Today&apos;s earnings
                </p>
              </div>
              <p className="text-4xl font-black tracking-tight">
                ₹{Math.round(todayTotal).toLocaleString()}
              </p>
              <p className="text-xs text-zinc-400 mt-1">
                {todayRides.length} trip{todayRides.length !== 1 ? "s" : ""} completed today
              </p>
            </div>

            {/* Period summary cards */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white border border-zinc-200 rounded-2xl p-3 shadow-sm">
                <div className="flex items-center gap-1 mb-1">
                  <Calendar size={11} className="text-zinc-400" />
                  <p className="text-[10px] text-zinc-400 font-semibold">This week</p>
                </div>
                <p className="text-lg font-black text-black">
                  ₹{Math.round(weekTotal).toLocaleString()}
                </p>
                <p className="text-[10px] text-zinc-400 mt-0.5">{weekRides.length} trips</p>
              </div>
              <div className="bg-white border border-zinc-200 rounded-2xl p-3 shadow-sm">
                <div className="flex items-center gap-1 mb-1">
                  <TrendingUp size={11} className="text-zinc-400" />
                  <p className="text-[10px] text-zinc-400 font-semibold">This month</p>
                </div>
                <p className="text-lg font-black text-black">
                  ₹{Math.round(monthTotal).toLocaleString()}
                </p>
                <p className="text-[10px] text-zinc-400 mt-0.5">{monthRides.length} trips</p>
              </div>
              <div className="bg-white border border-zinc-200 rounded-2xl p-3 shadow-sm">
                <div className="flex items-center gap-1 mb-1">
                  <IndianRupee size={11} className="text-zinc-400" />
                  <p className="text-[10px] text-zinc-400 font-semibold">All time</p>
                </div>
                <p className="text-lg font-black text-black">
                  ₹{Math.round(allTimeTotal).toLocaleString()}
                </p>
                <p className="text-[10px] text-zinc-400 mt-0.5">{rides.length} trips</p>
              </div>
            </div>

            {/* Weekly chart */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-sm">
              <p className="text-xs font-bold text-black mb-3">This week</p>
              <div className="flex items-end justify-between gap-2 h-28">
                {weeklyChart.map(({ label, amount, height }) => (
                  <div key={label} className="flex-1 flex flex-col items-center gap-1">
                    <p className="text-[9px] text-zinc-400 font-semibold">
                      {amount > 0 ? `₹${Math.round(amount)}` : ""}
                    </p>
                    <div className="w-full h-20 bg-zinc-100 rounded-lg flex items-end overflow-hidden">
                      <div
                        className="w-full bg-black rounded-lg transition-all"
                        style={{ height }}
                      />
                    </div>
                    <p className="text-[9px] text-zinc-500 font-medium">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Period filter + breakdown */}
            <div>
              <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wide mb-2">
                Trip breakdown
              </p>
              <div className="flex gap-2 overflow-x-auto pb-1 mb-3">
                {PERIODS.map((p) => (
                  <button
                    key={p}
                    onClick={() => setActivePeriod(p)}
                    className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all ${
                      activePeriod === p
                        ? "bg-black text-white border-black"
                        : "bg-white text-zinc-500 border-zinc-200 hover:border-zinc-400"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-sm mb-2">
                <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wide">
                  {activePeriod}
                </p>
                <p className="text-2xl font-black text-black mt-0.5">
                  ₹{Math.round(periodTotal).toLocaleString()}
                </p>
                <p className="text-xs text-zinc-500 mt-0.5">
                  {periodRides.length} completed trip{periodRides.length !== 1 ? "s" : ""}
                </p>
              </div>

              {periodRides.length === 0 ? (
                <div className="bg-white border border-zinc-200 rounded-2xl p-8 text-center shadow-sm">
                  <p className="text-3xl mb-3">💰</p>
                  <p className="font-bold text-black text-sm">No earnings yet</p>
                  <p className="text-xs text-zinc-400 mt-1">
                    Complete trips to see your earnings here.
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
                  {periodRides.map((ride) => (
                    <div
                      key={ride.rideId}
                      className="bg-white border border-zinc-200 rounded-2xl p-3 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-[10px] text-zinc-400">
                              {formatShortDate(ride.completedAt || ride.requestedAt)}
                            </span>
                            <span className="text-[10px] text-zinc-300">·</span>
                            <span className="text-[10px] text-zinc-400">
                              Trip #{ride.rideId}
                            </span>
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
                              <p className="text-xs text-zinc-500 truncate mt-0.5">
                                {ride.dropAddress || "Drop"}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm font-black text-green-600">
                            +₹{Math.round(ride.fare)}
                          </p>
                          <p className="text-[9px] text-zinc-400 mt-0.5">Cash</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => navigate("/driver/history")}
              className="flex items-center justify-center gap-1 text-xs font-semibold text-zinc-500 hover:text-black transition"
            >
              View full trip history
              <ChevronRight size={12} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default DriverEarningsPage;