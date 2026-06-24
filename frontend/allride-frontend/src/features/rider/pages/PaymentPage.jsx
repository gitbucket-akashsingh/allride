import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Wallet,
  CreditCard,
  Smartphone,
  Banknote,
  Plus,
  CheckCircle2,
  Lock,
  ChevronRight,
  ArrowDownLeft,
  ArrowUpRight,
  TrendingDown,
  Clock,
  IndianRupee,
  Shield,
} from "lucide-react";
import { getMyRides } from "@/features/rider/api/rideApi";

// ── Helpers ───────────────────────────────────────────────────────────────────

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

function formatShortDate(isoString) {
  if (!isoString) return "—";
  const d = new Date(isoString);
  return d.toLocaleString("en-IN", { day: "numeric", month: "short" });
}

const PAYMENT_METHODS = [
  {
    id: "cash",
    label: "Cash",
    description: "Pay driver directly",
    icon: Banknote,
    available: true,
    isDefault: true,
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
  },
  {
    id: "card",
    label: "Credit / Debit Card",
    description: "Visa, Mastercard, RuPay",
    icon: CreditCard,
    available: false,
    isDefault: false,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  {
    id: "upi",
    label: "UPI",
    description: "GPay, PhonePe, Paytm",
    icon: Smartphone,
    available: false,
    isDefault: false,
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
  },
  {
    id: "wallet",
    label: "Allride Wallet",
    description: "Instant payments, cashback",
    icon: Wallet,
    available: false,
    isDefault: false,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

function PaymentPage() {
  const navigate = useNavigate();
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("methods"); // "methods" | "history"

  useEffect(() => {
    getMyRides()
      .then((res) => {
        const completed = (res.data || [])
          .filter((r) => r.status === "COMPLETED" && r.fare)
          ;
        setRides(completed);
      })
      .catch(() => setRides([]))
      .finally(() => setLoading(false));
  }, []);

  const totalSpent = rides.reduce((sum, r) => sum + (r.fare ?? 0), 0);

  // This month's spend
  const now = new Date();
  const thisMonthSpent = rides
    .filter((r) => {
      if (!r.requestedAt) return false;
      const d = new Date(r.requestedAt);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    })
    .reduce((sum, r) => sum + (r.fare ?? 0), 0);

  return (
    <div className="bg-zinc-100 dark:bg-zinc-950 min-h-screen">
      <div className="max-w-2xl mx-auto p-5 flex flex-col gap-4">

        {/* ── HEADER ─────────────────────────────────────────────── */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-black tracking-tight">Payments</h1>
            <p className="text-xs text-zinc-500 mt-0.5">Manage your payment methods and history</p>
          </div>
          <button
            disabled
            title="Coming soon"
            className="flex items-center gap-1.5 bg-zinc-200 text-zinc-400 text-xs font-bold px-3 py-2 rounded-xl cursor-not-allowed"
          >
            <Plus size={12} />
            Add method
          </button>
        </div>

        {/* ── WALLET CARD ────────────────────────────────────────── */}
        <div className="relative bg-black text-white rounded-2xl p-5 overflow-hidden">
          {/* background glow circles */}
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-10 w-20 h-20 bg-white/5 rounded-full blur-2xl" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                  <Wallet size={15} />
                </div>
                <div>
                  <p className="text-[10px] text-zinc-400 leading-none">Allride Wallet</p>
                  <p className="text-[9px] text-zinc-500 mt-0.5">Coming soon</p>
                </div>
              </div>
              <span className="text-[9px] bg-white/10 text-zinc-400 px-2 py-0.5 rounded-full border border-white/10">
                Not activated
              </span>
            </div>

            <p className="text-3xl font-black tracking-tight">₹0.00</p>
            <p className="text-xs text-zinc-500 mt-1">Available balance</p>

            <div className="mt-4 flex gap-2">
              <button
                disabled
                className="flex-1 flex items-center justify-center gap-1.5 bg-white/10 text-zinc-400 text-xs font-semibold py-2 rounded-xl cursor-not-allowed border border-white/10"
              >
                <ArrowDownLeft size={12} />
                Add money
              </button>
              <button
                disabled
                className="flex-1 flex items-center justify-center gap-1.5 bg-white/10 text-zinc-400 text-xs font-semibold py-2 rounded-xl cursor-not-allowed border border-white/10"
              >
                <ArrowUpRight size={12} />
                Withdraw
              </button>
            </div>
          </div>
        </div>

        {/* ── SPEND SUMMARY ──────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white border border-zinc-200 rounded-2xl p-3 text-center shadow-sm">
            <TrendingDown size={13} className="text-zinc-400 mx-auto mb-1" />
            <p className="text-lg font-black text-black">
              {totalSpent > 0 ? `₹${Math.round(totalSpent).toLocaleString()}` : "₹0"}
            </p>
            <p className="text-[10px] text-zinc-400 mt-0.5">Total spent</p>
          </div>
          <div className="bg-white border border-zinc-200 rounded-2xl p-3 text-center shadow-sm">
            <Clock size={13} className="text-zinc-400 mx-auto mb-1" />
            <p className="text-lg font-black text-black">
              {thisMonthSpent > 0 ? `₹${Math.round(thisMonthSpent).toLocaleString()}` : "₹0"}
            </p>
            <p className="text-[10px] text-zinc-400 mt-0.5">This month</p>
          </div>
          <div className="bg-white border border-zinc-200 rounded-2xl p-3 text-center shadow-sm">
            <IndianRupee size={13} className="text-zinc-400 mx-auto mb-1" />
            <p className="text-lg font-black text-black">{rides.length}</p>
            <p className="text-[10px] text-zinc-400 mt-0.5">Paid rides</p>
          </div>
        </div>

        {/* ── TABS ───────────────────────────────────────────────── */}
        <div className="flex gap-2">
          {[
            { id: "methods", label: "Payment Methods" },
            { id: "history", label: `Transactions${rides.length > 0 ? ` (${rides.length})` : ""}` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-xs font-semibold px-4 py-2 rounded-xl border transition-all ${
                activeTab === tab.id
                  ? "bg-black text-white border-black"
                  : "bg-white text-zinc-500 border-zinc-200 hover:border-zinc-400"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── PAYMENT METHODS TAB ────────────────────────────────── */}
        {activeTab === "methods" && (
          <div className="flex flex-col gap-2">
            {PAYMENT_METHODS.map(({ id, label, description, icon: Icon, available, isDefault, color, bg, border }) => (
              <div
                key={id}
                className={`bg-white border rounded-2xl p-4 flex items-center gap-3 shadow-sm transition-all ${
                  available
                    ? "border-zinc-200 hover:border-zinc-400 cursor-pointer"
                    : "border-zinc-100 opacity-60 cursor-not-allowed"
                }`}
              >
                {/* Icon */}
                <div className={`w-10 h-10 rounded-xl ${bg} ${border} border flex items-center justify-center shrink-0`}>
                  <Icon size={18} className={color} />
                </div>

                {/* Labels */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-black">{label}</p>
                  <p className="text-[10px] text-zinc-400 mt-0.5">{description}</p>
                </div>

                {/* Right badge */}
                {isDefault && available ? (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-1 rounded-lg shrink-0">
                    <CheckCircle2 size={10} />
                    Default
                  </span>
                ) : !available ? (
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-zinc-400 bg-zinc-50 border border-zinc-200 px-2 py-1 rounded-lg shrink-0">
                    <Lock size={9} />
                    Soon
                  </span>
                ) : (
                  <ChevronRight size={14} className="text-zinc-400 shrink-0" />
                )}
              </div>
            ))}

            {/* Security note */}
            <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-2xl px-4 py-3 mt-1">
              <Shield size={14} className="text-blue-500 shrink-0 mt-0.5" />
              <p className="text-[11px] text-blue-700 leading-snug">
                Your payment information is encrypted and secure. Card and UPI payments will be available soon.
              </p>
            </div>
          </div>
        )}

        {/* ── TRANSACTIONS TAB ───────────────────────────────────── */}
        {activeTab === "history" && (
          <div className="flex flex-col gap-2">

            {/* Loading */}
            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="w-6 h-6 border-[3px] border-zinc-200 border-t-black rounded-full animate-spin" />
              </div>
            )}

            {/* Empty state */}
            {!loading && rides.length === 0 && (
              <div className="bg-white border border-zinc-200 rounded-2xl p-10 text-center shadow-sm">
                <p className="text-3xl mb-3">🧾</p>
                <p className="font-bold text-black text-sm">No transactions yet</p>
                <p className="text-xs text-zinc-400 mt-1">
                  Completed ride fares will appear here.
                </p>
                <button
                  onClick={() => navigate("/rider/book")}
                  className="mt-4 bg-black text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-zinc-800 transition"
                >
                  Book a ride
                </button>
              </div>
            )}

            {/* Transaction rows */}
            {!loading && rides.length > 0 && (
              <>
                {/* Month grouping header */}
                <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wide px-1">
                  {rides.length} transaction{rides.length !== 1 ? "s" : ""}
                </p>

                {rides.map((ride) => (
                  <div
                    key={ride.rideId}
                    className="bg-white border border-zinc-200 rounded-2xl p-3 flex items-center gap-3 shadow-sm"
                  >
                    {/* Icon */}
                    <div className="w-9 h-9 rounded-xl bg-zinc-100 flex items-center justify-center shrink-0">
                      <Banknote size={16} className="text-zinc-500" />
                    </div>

                    {/* Route + date */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-black truncate">
                        {ride.pickupAddress
                          ? shortenAddress(ride.pickupAddress)
                          : `Ride #${ride.rideId}`}
                        {" → "}
                        {ride.dropAddress
                          ? shortenAddress(ride.dropAddress)
                          : "Drop"}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Banknote size={9} className="text-zinc-400" />
                        <p className="text-[10px] text-zinc-400">Cash</p>
                        <span className="text-zinc-300">·</span>
                        <p className="text-[10px] text-zinc-400">{formatShortDate(ride.requestedAt)}</p>
                        <span className="text-zinc-300">·</span>
                        <p className="text-[10px] text-zinc-400">Ride #{ride.rideId}</p>
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="text-right shrink-0">
                      <p className="text-sm font-black text-red-500">
                        −₹{Math.round(ride.fare)}
                      </p>
                      <p className="text-[9px] text-zinc-400 mt-0.5">Paid</p>
                    </div>
                  </div>
                ))}

                {/* Total footer */}
                <div className="bg-white border border-zinc-200 rounded-2xl p-3 flex items-center justify-between shadow-sm">
                  <p className="text-xs font-semibold text-zinc-500">Total paid</p>
                  <p className="text-sm font-black text-black">
                    ₹{Math.round(totalSpent).toLocaleString()}
                  </p>
                </div>
              </>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

// Shorten long address to first part before first comma
function shortenAddress(address) {
  if (!address) return "";
  const parts = address.split(",");
  return parts[0].trim();
}

export default PaymentPage;