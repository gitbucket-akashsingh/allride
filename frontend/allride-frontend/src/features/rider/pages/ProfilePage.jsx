import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Phone,
  User,
  Shield,
  CheckCircle2,
  LogOut,
  Bell,
  ChevronRight,
  Pencil,
  Star,
  BarChart2,
  XCircle,
  Lock,
  Globe,
} from "lucide-react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { getMyRides } from "@/features/rider/api/rideApi";
import Toggle from "@/shared/ui/Toggle";

// ── Helper — generate avatar initials ────────────────────────────────────────
function getInitials(name) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// ── Helper — avatar background color from name ───────────────────────────────
function getAvatarColor(name) {
  if (!name) return "#27272a";
  const colors = [
    "#0f172a", "#1e3a5f", "#14532d", "#713f12",
    "#4a044e", "#450a0a", "#0c4a6e", "#1c1917",
  ];
  const i = name.charCodeAt(0) % colors.length;
  return colors[i];
}

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, value, label, color = "text-zinc-400" }) {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-3 text-center shadow-sm">
      <Icon size={13} className={`${color} mx-auto mb-1`} />
      <p className="text-lg font-black text-black">{value}</p>
      <p className="text-[10px] text-zinc-400 mt-0.5">{label}</p>
    </div>
  );
}

// ── Info row ─────────────────────────────────────────────────────────────────
function InfoRow({ icon: Icon, label, value, badge }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-zinc-100 last:border-0">
      <div className="w-8 h-8 rounded-xl bg-zinc-100 flex items-center justify-center shrink-0">
        <Icon size={14} className="text-zinc-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-zinc-400 font-medium">{label}</p>
        <p className="text-sm font-semibold text-black truncate">{value || "—"}</p>
      </div>
      {badge}
    </div>
  );
}

// ── Preference row ────────────────────────────────────────────────────────────
function PrefRow({ icon: Icon, label, sub, right, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className={`w-full flex items-center gap-3 py-3 border-b border-zinc-100 last:border-0 text-left ${
        onClick ? "hover:bg-zinc-50 transition cursor-pointer" : "cursor-default"
      }`}
    >
      <div className="w-8 h-8 rounded-xl bg-zinc-100 flex items-center justify-center shrink-0">
        <Icon size={14} className="text-zinc-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-black">{label}</p>
        {sub && <p className="text-[10px] text-zinc-400 mt-0.5">{sub}</p>}
      </div>
      {right}
    </button>
  );
}

{/* <Toggle value={notifications} onChange={setNotifications} /> */}
// ── Mini toggle ───────────────────────────────────────────────────────────────
// function Toggle({ value, onChange }) {
//   return (
//     <button
//       onClick={() => onChange(!value)}
//       className={`relative w-9 h-5 rounded-full transition-colors shrink-0 ${
//         value ? "bg-black" : "bg-zinc-300"
//       }`}
//     >
//       <span
//         className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
//           value ? "translate-x-4" : "translate-x-0.5"
//         }`}
//       />
//     </button>
//   );
// }

// ── Main component ────────────────────────────────────────────────────────────
function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [rides, setRides] = useState([]);
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    getMyRides()
      .then((res) => setRides(res.data || []))
      .catch(() => setRides([]));
  }, []);

  const completedCount = rides.filter((r) => r.status === "COMPLETED").length;
  const cancelledCount = rides.filter((r) => r.status === "CANCELLED").length;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const initials   = getInitials(user?.fullName);
  const avatarColor = getAvatarColor(user?.fullName);

  const profileReturn = {
    returnTo: "/rider/profile",
    returnLabel: "Back to Profile",
  };

  return (
    <div className="bg-zinc-100 dark:bg-zinc-950 min-h-screen">
      <div className="max-w-2xl mx-auto p-5 flex flex-col gap-4">

        {/* ── PROFILE HEADER CARD ──────────────────────────────── */}
        <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
          {/* Top banner */}
          <div className="h-16 bg-gradient-to-r from-zinc-900 to-zinc-700" />

          {/* Avatar + name */}
          <div className="px-5 pb-5">
            <div className="flex items-end justify-between -mt-8 mb-3">
              {/* Avatar */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-black border-4 border-white shadow-lg"
                style={{ background: avatarColor }}
              >
                {initials}
              </div>

              {/* Edit button */}
              <button
                disabled
                title="Profile editing coming soon"
                className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 bg-zinc-100 border border-zinc-200 px-3 py-1.5 rounded-xl cursor-not-allowed"
              >
                <Pencil size={11} />
                Edit profile
              </button>
            </div>

            <h2 className="text-lg font-black text-black tracking-tight">
              {user?.fullName || "—"}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                <Shield size={9} />
                {user?.role || "RIDER"}
              </span>
              <span className="flex items-center gap-1 text-[10px] text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full font-semibold">
                <CheckCircle2 size={9} />
                Verified
              </span>
            </div>
          </div>
        </div>

        {/* ── RIDE STATS ───────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-2">
          <StatCard icon={BarChart2} value={rides.length} label="Total rides" />
          <StatCard
            icon={CheckCircle2}
            value={completedCount}
            label="Completed"
            color="text-green-500"
          />
          <StatCard
            icon={XCircle}
            value={cancelledCount}
            label="Cancelled"
            color="text-red-400"
          />
        </div>

        {/* ── ACCOUNT DETAILS ──────────────────────────────────── */}
        <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm px-4 py-1">
          <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wide pt-3 pb-1">
            Account details
          </p>

          <InfoRow
            icon={User}
            label="Full name"
            value={user?.fullName}
          />
          <InfoRow
            icon={Mail}
            label="Email address"
            value={user?.email}
            badge={
              <span className="flex items-center gap-1 text-[9px] font-bold text-green-700 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded-lg shrink-0">
                <CheckCircle2 size={8} />
                Verified
              </span>
            }
          />
          <InfoRow
            icon={Phone}
            label="Phone number"
            value={user?.phone}
          />
          <InfoRow
            icon={Lock}
            label="Password"
            value="••••••••"
            badge={
              <button
                disabled
                className="text-[10px] font-semibold text-zinc-400 hover:text-black transition flex items-center gap-0.5 cursor-not-allowed"
              >
                Change <ChevronRight size={10} />
              </button>
            }
          />
        </div>

        {/* ── PREFERENCES ──────────────────────────────────────── */}
        <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm px-4 py-1">
          <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wide pt-3 pb-1">
            Preferences
          </p>

          <PrefRow
            icon={Bell}
            label="Notifications"
            sub="Ride updates and offers"
            right={
              <Toggle value={notifications} onChange={setNotifications} />
            }
          />
          <PrefRow
            icon={Globe}
            label="Language"
            sub="English (India)"
            right={
              <button
                disabled
                className="text-[10px] font-semibold text-zinc-400 flex items-center gap-0.5 cursor-not-allowed"
              >
                Change <ChevronRight size={10} />
              </button>
            }
          />
          <PrefRow
            icon={Star}
            label="Rate the app"
            sub="Love Allride? Tell us!"
            right={
              <button
                disabled
                className="text-[10px] font-semibold text-zinc-400 flex items-center gap-0.5 cursor-not-allowed"
              >
                Rate <ChevronRight size={10} />
              </button>
            }
          />
        </div>

        {/* ── ACCOUNT LINKS ────────────────────────────────────── */}
        <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm px-4 py-1">
          <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wide pt-3 pb-1">
            Account
          </p>

          <PrefRow
            icon={Shield}
            label="Privacy policy"
            onClick={() => navigate("/privacy", { state: profileReturn })}
            right={<ChevronRight size={12} className="text-zinc-400" />}
          />
          <PrefRow
            icon={Lock}
            label="Terms of service"
            onClick={() => navigate("/terms", { state: profileReturn })}
            right={<ChevronRight size={12} className="text-zinc-400" />}
          />
          <PrefRow
            icon={Mail}
            label="Contact support"
            onClick={() => navigate("/support", { state: profileReturn })}
            right={<ChevronRight size={12} className="text-zinc-400" />}
          />
        </div>

        {/* ── DANGER ZONE — LOGOUT ─────────────────────────────── */}
        <div className="bg-white border border-red-100 rounded-2xl shadow-sm px-4 py-1">
          <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wide pt-3 pb-1">
            Danger zone
          </p>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 py-3 text-left group"
          >
            <div className="w-8 h-8 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
              <LogOut size={14} className="text-red-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-red-500 group-hover:text-red-700 transition">
                Sign out
              </p>
              <p className="text-[10px] text-zinc-400">
                You will be redirected to the login page
              </p>
            </div>
            <ChevronRight size={12} className="text-red-300" />
          </button>
        </div>

        {/* App version footer */}
        <p className="text-center text-[10px] text-zinc-400 pb-2">
          Allride v1.0.0 · User ID #{user?.id}
        </p>

      </div>
    </div>
  );
}

export default ProfilePage;