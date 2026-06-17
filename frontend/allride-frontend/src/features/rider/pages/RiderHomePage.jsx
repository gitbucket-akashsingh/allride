import { useNavigate } from "react-router-dom";
import {
  Navigation,
  Clock,
  Star,
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
} from "lucide-react";

// ── Mock data — replace with real API calls when backend is ready ────────────
const MOCK_RECENT_RIDES = [
  {
    id: 1,
    from: "Rajiv Gandhi International Airport",
    to: "DBS Technology Services, Gachibowli",
    date: "Today, 9:15 AM",
    fare: 684,
    status: "COMPLETED",
    rated: false,
    type: "Standard",
  },
  {
    id: 2,
    from: "Gachibowli, Hyderabad",
    to: "Inorbit Mall, Madhapur",
    date: "Yesterday, 7:30 PM",
    fare: 132,
    status: "COMPLETED",
    rated: true,
    rating: 5,
    type: "Standard",
  },
  {
    id: 3,
    from: "Kondapur Bus Stop",
    to: "Hitech City Metro Station",
    date: "Jun 12, 8:00 AM",
    fare: 98,
    status: "COMPLETED",
    rated: true,
    rating: 4,
    type: "Standard",
  },
];

const MOCK_STATS = {
  totalRides: 12,
  totalSpent: 2450,
  avgRating: 4.8,
};

const QUICK_DESTINATIONS = [
  { label: "Home", icon: Home, address: "Kondapur, Hyderabad" },
  { label: "Work", icon: Briefcase, address: "DBS Tech, Gachibowli" },
  { label: "Airport", icon: Plane, address: "RGIA, Shamshabad" },
];

// ── AI insight cards — replace content via Spring AI API later ──────────────
const AI_INSIGHTS = [
  {
    id: 1,
    icon: CloudSun,
    color: "text-amber-500",
    bg: "bg-amber-50",
    border: "border-amber-100",
    title: "Weather",
    value: "Partly cloudy, 31°C",
    sub: "Good conditions for travel",
  },
  {
    id: 2,
    icon: TrendingUp,
    color: "text-red-500",
    bg: "bg-red-50",
    border: "border-red-100",
    title: "Traffic",
    value: "Moderate congestion",
    sub: "NH65 — expect +12 min",
  },
  {
    id: 3,
    icon: Zap,
    color: "text-green-500",
    bg: "bg-green-50",
    border: "border-green-100",
    title: "Best time",
    value: "Book after 11 AM",
    sub: "Surge ends in ~40 min",
  },
];

const PAGE_HEIGHT = "calc(100vh - 64px)";

function RiderHomePage() {
  const navigate = useNavigate();

  return (
    <div
      className="bg-zinc-100 dark:bg-zinc-950 min-h-screen"
      
    >
      <div className="max-w-4xl mx-auto p-5 flex flex-col gap-4">

        {/* ── HEADER ───────────────────────────────────────────────── */}
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

        {/* ── QUICK DESTINATIONS ──────────────────────────────────── */}
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

        {/* ── AI ASSISTANT CARD ────────────────────────────────────── */}
        <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
          {/* Header bar */}
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

          {/* Insight tiles */}
          <div className="grid grid-cols-3 divide-x divide-zinc-100">
            {AI_INSIGHTS.map(({ id, icon: Icon, color, bg, border, title, value, sub }) => (
              <div key={id} className={`p-3 ${bg}`}>
                <div className={`flex items-center gap-1.5 mb-1`}>
                  <Icon size={12} className={color} />
                  <p className="text-[9px] text-zinc-500 font-semibold uppercase tracking-wide">
                    {title}
                  </p>
                </div>
                <p className="text-xs font-black text-black leading-tight">{value}</p>
                <p className="text-[9px] text-zinc-500 mt-0.5 leading-tight">{sub}</p>
              </div>
            ))}
          </div>

          {/* Placeholder prompt area */}
          <div className="px-4 py-3 border-t border-zinc-100 flex items-center gap-2">
            <div className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 flex items-center gap-2">
              <Sparkles size={11} className="text-zinc-400 shrink-0" />
              <span className="text-xs text-zinc-400">
                Ask AI: "Is it a good time to book a ride?"
              </span>
            </div>
            <button
              disabled
              className="w-7 h-7 rounded-xl bg-zinc-100 flex items-center justify-center cursor-not-allowed"
              title="Spring AI integration coming soon"
            >
              <ChevronRight size={12} className="text-zinc-400" />
            </button>
          </div>
        </div>

        {/* ── STATS ROW ────────────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white border border-zinc-200 rounded-2xl p-3 text-center shadow-sm">
            <div className="flex items-center justify-center gap-1 mb-1">
              <BarChart2 size={13} className="text-zinc-400" />
            </div>
            <p className="text-xl font-black text-black">{MOCK_STATS.totalRides}</p>
            <p className="text-[10px] text-zinc-400 mt-0.5">Total rides</p>
          </div>
          <div className="bg-white border border-zinc-200 rounded-2xl p-3 text-center shadow-sm">
            <div className="flex items-center justify-center gap-1 mb-1">
              <IndianRupee size={13} className="text-zinc-400" />
            </div>
            <p className="text-xl font-black text-black">₹{MOCK_STATS.totalSpent.toLocaleString()}</p>
            <p className="text-[10px] text-zinc-400 mt-0.5">Total spent</p>
          </div>
          <div className="bg-white border border-zinc-200 rounded-2xl p-3 text-center shadow-sm">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star size={13} className="text-amber-400 fill-amber-400" />
            </div>
            <p className="text-xl font-black text-black">{MOCK_STATS.avgRating}</p>
            <p className="text-[10px] text-zinc-400 mt-0.5">Avg rating</p>
          </div>
        </div>

        {/* ── RECENT RIDES ─────────────────────────────────────────── */}
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

          <div className="flex flex-col gap-2">
            {MOCK_RECENT_RIDES.map((ride) => (
              <div
                key={ride.id}
                className="bg-white border border-zinc-200 rounded-2xl p-3 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  {/* Route */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Clock size={10} className="text-zinc-400 shrink-0" />
                      <span className="text-[10px] text-zinc-400">{ride.date}</span>
                      <span className="text-[10px] text-zinc-300">·</span>
                      <span className="text-[10px] text-zinc-400">{ride.type}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="flex flex-col items-center gap-0.5 mt-0.5 shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-black" />
                        <div className="h-3 border-l border-dashed border-zinc-300" />
                        <div className="w-1.5 h-1.5 rounded bg-black" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-black truncate">{ride.from}</p>
                        <p className="text-xs text-zinc-500 truncate mt-1">{ride.to}</p>
                      </div>
                    </div>
                  </div>

                  {/* Fare + rating */}
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <p className="text-sm font-black text-black">₹{ride.fare}</p>

                    {/* Rate button — shown only if not rated */}
                    {!ride.rated ? (
                      <button className="flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-bold px-2 py-1 rounded-lg hover:bg-amber-100 transition">
                        <Star size={9} className="fill-amber-500 text-amber-500" />
                        Rate driver
                      </button>
                    ) : (
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={9}
                            className={
                              i < ride.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-zinc-300"
                            }
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Book again button */}
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