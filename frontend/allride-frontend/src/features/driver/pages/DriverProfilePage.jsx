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
  Car,
  CreditCard,
  IndianRupee,
  MapPin,
} from "lucide-react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { getMyRides } from "@/features/driver/api/driverApi";
import Toggle from "@/shared/ui/Toggle";

function getInitials(name) {
  if (!name) return "D";
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getAvatarColor(name) {
  if (!name) return "#1e3a5f";
  const colors = [
    "#1e3a5f", "#14532d", "#713f12", "#4a044e",
    "#450a0a", "#0c4a6e", "#1c1917", "#312e81",
  ];
  return colors[name.charCodeAt(0) % colors.length];
}

function StatCard({ icon: Icon, value, label, color = "text-zinc-400" }) {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-3 text-center shadow-sm">
      <Icon size={13} className={`${color} mx-auto mb-1`} />
      <p className="text-lg font-black text-black">{value}</p>
      <p className="text-[10px] text-zinc-400 mt-0.5">{label}</p>
    </div>
  );
}

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

// function Toggle({ value, onChange }) {
//   return (
//     <button
//       type="button"
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

// Static vehicle stub — wire to backend when driver profile API exists
const VEHICLE = {
  make: "Maruti Suzuki",
  model: "Swift",
  color: "White",
  type: "Sedan",
  plate: "TS-09-AB-1234",
  year: "2021",
};

function DriverProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [rides, setRides] = useState([]);
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    getMyRides()
      .then((res) => setRides(res.data || []))
      .catch(() => setRides([]));
  }, []);

  const completedRides = rides.filter((r) => r.status === "COMPLETED");
  const completedCount = completedRides.length;
  const cancelledCount = rides.filter((r) => r.status === "CANCELLED").length;
  const totalEarned = completedRides.reduce((sum, r) => sum + (r.fare || 0), 0);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const displayName = user?.fullName || user?.name || "Driver";
  const initials = getInitials(displayName);
  const avatarColor = getAvatarColor(displayName);

  const profileReturn = {
    returnTo: "/driver/profile",
    returnLabel: "Back to Profile",
  };

  return (
    <div className="bg-zinc-100 dark:bg-zinc-950 min-h-screen">
      <div className="max-w-2xl mx-auto p-5 flex flex-col gap-4">

        {/* Profile header */}
        <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="h-16 bg-gradient-to-r from-blue-900 to-blue-600" />

          <div className="px-5 pb-5">
            <div className="flex items-end justify-between -mt-8 mb-3">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-black border-4 border-white shadow-lg"
                style={{ background: avatarColor }}
              >
                {initials}
              </div>

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
              {displayName}
            </h2>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                <Shield size={9} />
                DRIVER
              </span>
              <span className="flex items-center gap-1 text-[10px] text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full font-semibold">
                <CheckCircle2 size={9} />
                Verified
              </span>
              <span className="flex items-center gap-1 text-[10px] text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full font-semibold">
                <Star size={9} className="fill-amber-500 text-amber-500" />
                4.8
              </span>
            </div>
          </div>
        </div>

        {/* Trip stats */}
        <div className="grid grid-cols-3 gap-2">
          <StatCard icon={BarChart2} value={rides.length} label="Total trips" />
          <StatCard
            icon={CheckCircle2}
            value={completedCount}
            label="Completed"
            color="text-green-500"
          />
          <StatCard
            icon={IndianRupee}
            value={totalEarned > 0 ? `₹${Math.round(totalEarned)}` : "—"}
            label="Total earned"
            color="text-blue-500"
          />
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => navigate("/driver/earnings")}
            className="bg-white border border-zinc-200 rounded-2xl p-3 text-left shadow-sm hover:border-black transition"
          >
            <IndianRupee size={14} className="text-zinc-500 mb-1" />
            <p className="text-xs font-bold text-black">Earnings</p>
            <p className="text-[10px] text-zinc-400">View breakdown</p>
          </button>
          <button
            onClick={() => navigate("/driver/history")}
            className="bg-white border border-zinc-200 rounded-2xl p-3 text-left shadow-sm hover:border-black transition"
          >
            <MapPin size={14} className="text-zinc-500 mb-1" />
            <p className="text-xs font-bold text-black">Trip history</p>
            <p className="text-[10px] text-zinc-400">{rides.length} trips</p>
          </button>
        </div>

        {/* Vehicle info */}
        <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm px-4 py-1">
          <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wide pt-3 pb-1">
            Vehicle details
          </p>

          <InfoRow
            icon={Car}
            label="Vehicle"
            value={`${VEHICLE.make} ${VEHICLE.model} (${VEHICLE.year})`}
          />
          <InfoRow icon={CreditCard} label="Registration" value={VEHICLE.plate} />
          <InfoRow icon={Car} label="Type & color" value={`${VEHICLE.type} · ${VEHICLE.color}`} />
          <InfoRow
            icon={Shield}
            label="Documents"
            value="License & RC verified"
            badge={
              <span className="text-[9px] font-bold text-green-700 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded-lg shrink-0">
                Active
              </span>
            }
          />
        </div>

        {/* Account details */}
        <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm px-4 py-1">
          <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wide pt-3 pb-1">
            Account details
          </p>

          <InfoRow icon={User} label="Full name" value={displayName} />
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
          <InfoRow icon={Phone} label="Phone number" value={user?.phone} />
          <InfoRow
            icon={Lock}
            label="Password"
            value="••••••••"
            badge={
              <button
                disabled
                className="text-[10px] font-semibold text-zinc-400 cursor-not-allowed flex items-center gap-0.5"
              >
                Change <ChevronRight size={10} />
              </button>
            }
          />
        </div>

        {/* Preferences */}
        <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm px-4 py-1">
          <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wide pt-3 pb-1">
            Preferences
          </p>

          <PrefRow
            icon={Bell}
            label="Ride notifications"
            sub="New requests and trip updates"
            right={<Toggle value={notifications} onChange={setNotifications} />}
          />
          <PrefRow
            icon={Star}
            label="Driver rating"
            sub={`${completedCount} completed trips · ${cancelledCount} cancelled`}
            right={
              <span className="flex items-center gap-0.5 text-xs font-black text-amber-600">
                <Star size={11} className="fill-amber-400 text-amber-400" />
                4.8
              </span>
            }
          />
        </div>

        {/* Support */}
        <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm px-4 py-1">
          <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wide pt-3 pb-1">
            Support
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

        {/* Logout */}
        <div className="bg-white border border-red-100 rounded-2xl shadow-sm px-4 py-1">
          <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wide pt-3 pb-1">
            Account
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

        <p className="text-center text-[10px] text-zinc-400 pb-2">
          Allride Driver · ID #{user?.id ?? "—"}
        </p>
      </div>
    </div>
  );
}

export default DriverProfilePage;