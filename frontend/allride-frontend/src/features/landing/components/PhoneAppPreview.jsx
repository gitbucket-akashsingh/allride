import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MapPin,
  Navigation,
  Car,
  Home,
  Briefcase,
  Plane,
  ShieldCheck,
  Clock3,
  User,
  Search,
  ChevronRight,
  Bell, 
} from "lucide-react";

// ── Locations & route quotes ─────────────────────────────────────────────
const LOCATIONS = {
  airport: {
    id: "airport",
    label: "Rajiv Gandhi International Airport",
    short: "RGIA Airport",
  },
  kondapur: {
    id: "kondapur",
    label: "Kondapur, Hyderabad",
    short: "Kondapur",
  },
  hitech: {
    id: "hitech",
    label: "Hitech City Metro Station",
    short: "Hitech City",
  },
  gachibowli: {
    id: "gachibowli",
    label: "DBS Technology, Gachibowli",
    short: "Gachibowli",
  },
  inorbit: {
    id: "inorbit",
    label: "Inorbit Mall, Madhapur",
    short: "Inorbit Mall",
  },
  charminar: {
    id: "charminar",
    label: "Charminar, Old City",
    short: "Charminar",
  },
};

const PICKUP_OPTIONS = [
  LOCATIONS.airport,
  LOCATIONS.kondapur,
  LOCATIONS.hitech,
];

const DROPOFF_OPTIONS = [
  LOCATIONS.gachibowli,
  LOCATIONS.inorbit,
  LOCATIONS.charminar,
];

/** Pre-calculated demo fares per route (pickupId:dropoffId) */
const ROUTE_QUOTES = {
  "airport:gachibowli":   { eta: 42, distance: 28.4, fares: { standard: 684, premium: 892, xl: 1048 } },
  "airport:inorbit":      { eta: 38, distance: 24.1, fares: { standard: 612, premium: 798, xl: 936 } },
  "airport:charminar":    { eta: 48, distance: 32.6, fares: { standard: 756, premium: 985, xl: 1158 } },
  "kondapur:gachibowli":  { eta: 14, distance: 6.2,  fares: { standard: 132, premium: 178, xl: 210 } },
  "kondapur:inorbit":     { eta: 11, distance: 4.8,  fares: { standard: 98,  premium: 132, xl: 156 } },
  "kondapur:charminar":   { eta: 28, distance: 14.5, fares: { standard: 318, premium: 415, xl: 488 } },
  "hitech:gachibowli":    { eta: 12, distance: 5.1,  fares: { standard: 118, premium: 158, xl: 186 } },
  "hitech:inorbit":       { eta: 9,  distance: 3.4,  fares: { standard: 86,  premium: 116, xl: 138 } },
  "hitech:charminar":     { eta: 26, distance: 13.8, fares: { standard: 298, premium: 388, xl: 456 } },
};

const RIDE_TYPES = [
  { id: "standard", label: "Standard", icon: "🚕" },
  { id: "premium",  label: "Premium",  icon: "🚙" },
  { id: "xl",       label: "XL",       icon: "🚐" },
];

const QUICK_DESTINATIONS = [
  { id: "home",    label: "Home",    icon: Home,     pickupId: "kondapur",   dropoffId: "gachibowli" },
  { id: "work",    label: "Work",    icon: Briefcase, pickupId: "kondapur",   dropoffId: "gachibowli" },
  { id: "airport", label: "Airport", icon: Plane,    pickupId: "hitech",     dropoffId: "airport" },
];

function getDemoOtp(pickupId, dropoffId) {
  const key = `${pickupId || "0"}${dropoffId || "0"}`;
  const num = key.split("").reduce((n, c) => n + c.charCodeAt(0), 4821);
  return String(num % 10000).padStart(4, "0");
}

function getRouteQuote(pickupId, dropoffId) {
  if (!pickupId || !dropoffId) return null;
  const key = `${pickupId}:${dropoffId}`;
  if (ROUTE_QUOTES[key]) return ROUTE_QUOTES[key];
  // Fallback for any unexpected combo
  return { eta: 20, distance: 10, fares: { standard: 249, premium: 325, xl: 382 } };
}

function getLocationLabel(id) {
  return Object.values(LOCATIONS).find((l) => l.id === id)?.label ?? "";
}

// ── Small helpers (keep file self-contained) ──────────────────────────────
function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

/** Tappable demo control — visual feedback only, no real actions */
function DemoTap({ className, children, disabled, onDemoAction, ...props }) {
  const handleClick = (e) => {
    e.preventDefault();
    if (disabled) return;
    onDemoAction?.();
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      className={cx(
        "transition-all duration-150 touch-manipulation select-none",
        !disabled && "hover:brightness-105 hover:shadow-md active:scale-[0.97] active:brightness-95",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

/** Inline picker — tap field to open, tap option to select */
function LocationField({
  kind,
  icon: Icon,
  iconClass,
  valueId,
  options,
  isOpen,
  onToggle,
  onSelect,
}) {
  const selected = options.find((o) => o.id === valueId);
  const label = kind === "pickup" ? "Pickup" : "Destination";

  return (
    <div className="relative">
      <DemoTap
        onDemoAction={onToggle}
        className={cx(
          "w-full flex items-center gap-2 rounded-xl px-3 py-2.5 text-left border-2",
          selected
            ? "border-black dark:border-yellow-500 bg-zinc-50 dark:bg-zinc-800"
            : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
        )}
      >
        <Icon size={12} className={cx("shrink-0", iconClass)} />
        <div className="min-w-0 flex-1">
          <p className="text-[8px] text-zinc-400 uppercase">{label}</p>
          <p className="text-[10px] font-semibold truncate">
            {selected?.label ?? `Choose ${label.toLowerCase()}`}
          </p>
        </div>
        <ChevronRight
          size={12}
          className={cx(
            "text-zinc-400 shrink-0 transition-transform",
            isOpen && "rotate-90"
          )}
        />
      </DemoTap>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-1 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-lg divide-y divide-zinc-100 dark:divide-zinc-800">
              {options.map((opt) => (
                <DemoTap
                  key={opt.id}
                  onDemoAction={() => onSelect(opt.id)}
                  className={cx(
                    "w-full px-3 py-2.5 text-left text-[10px] font-medium",
                    valueId === opt.id
                      ? "bg-yellow-500/15 text-yellow-700 dark:text-yellow-300"
                      : "hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  )}
                >
                  {opt.label}
                </DemoTap>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Shared UI pieces ──────────────────────────────────────────────────────
function StatusBar({ badge }) {
  return (
    <div className="flex justify-between items-center px-5 pt-12 pb-2 text-[10px] text-zinc-500 shrink-0">
      <span>9:41</span>
      {badge ? (
        <span className="text-[8px] font-semibold uppercase tracking-wider text-yellow-600 dark:text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded-full">
          {badge}
        </span>
      ) : (
        <span className="flex gap-1">●●●</span>
      )}
    </div>
  );
}

/** iOS-style push notification — overlays screen, auto-dismisses */
function DemoRideNotification({ notification }) {
  if (!notification) return null;

  const { driverName, otp } = notification;

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          key="ride-notification"
          initial={{ y: -120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
          className="absolute top-11 left-3 right-3 z-50 pointer-events-none"
        >
          <div className="rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-700 shadow-[0_12px_40px_rgba(0,0,0,0.18)] px-3 py-2.5">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-yellow-500 flex items-center justify-center shrink-0 shadow-sm">
                <Bell size={14} className="text-black" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[10px] font-black text-zinc-900 dark:text-white">
                    AllRide
                  </p>
                  <p className="text-[8px] text-zinc-400 shrink-0">now</p>
                </div>
                <p className="text-[10px] font-bold text-zinc-900 dark:text-white mt-0.5 leading-snug">
                  Ride confirmed — your driver is coming
                </p>
                <p className="text-[9px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-snug">
                  {driverName} is on the way. Share OTP{" "}
                  <span className="font-black text-yellow-600 dark:text-yellow-400 tracking-widest">
                    {otp}
                  </span>{" "}
                  to start your trip.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DemoMap({ showRoute = false, showDriver = false, routeAnimated = false }) {
  return (
    <div className="relative flex-1 min-h-0 bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900">
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_40%,#f59e0b_0%,transparent_50%)]" />

      {showRoute && (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 400" fill="none">
          <motion.path
            d="M 60 320 Q 120 200 180 120 T 240 80"
            stroke="#f59e0b"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="8 6"
            initial={routeAnimated ? { pathLength: 0, opacity: 0 } : false}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </svg>
      )}

      {/* Pickup pin */}
      <motion.div
        className="absolute top-[68%] left-[22%] w-3 h-3 rounded-full bg-green-500 ring-4 ring-green-500/30"
        animate={showRoute ? { scale: [1, 1.2, 1] } : {}}
        transition={{ repeat: Infinity, duration: 2 }}
      />

      {/* Drop pin */}
      {showRoute && (
        <div className="absolute top-[18%] right-[22%] w-3 h-3 rounded-full bg-red-500 ring-4 ring-red-500/30" />
      )}

      {/* Driver car */}
      {showDriver && (
        <motion.div
          className="absolute top-[42%] left-[48%] w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shadow-lg"
          animate={{ x: [0, 8, 0], y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          <Car size={14} className="text-white" />
        </motion.div>
      )}
    </div>
  );
}

// ── Screen 1: Home ────────────────────────────────────────────────────────
function HomeScreen({ onBookRide, onQuickDest }) {
  return (
    <div className="flex flex-col h-full min-h-0 pointer-events-auto">
      <StatusBar badge="Interactive preview" />

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
        <div>
          <p className="text-[10px] text-zinc-500 font-medium">Good morning</p>
          <h2 className="text-base font-black leading-tight">Welcome back 👋</h2>
        </div>

        <DemoTap
          onDemoAction={onBookRide}
          className="w-full flex items-center gap-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-4 py-3 text-left shadow-sm"
        >
          <Search size={16} className="text-zinc-400 shrink-0" />
          <span className="text-sm text-zinc-400">Where to?</span>
          <ChevronRight size={14} className="ml-auto text-zinc-300" />
        </DemoTap>

        <div>
          <p className="text-[9px] text-zinc-400 font-semibold uppercase tracking-wide mb-2">
            Quick destinations
          </p>
          <div className="grid grid-cols-3 gap-2">
            {QUICK_DESTINATIONS.map(({ id, label, icon: Icon, address }) => (
              <DemoTap
                key={id}
                onDemoAction={() => onQuickDest(id)}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-2.5 text-left group"
              >
                <div className="w-7 h-7 rounded-xl bg-zinc-100 dark:bg-zinc-800 group-hover:bg-yellow-500 flex items-center justify-center mb-1.5 transition-colors">
                  <Icon size={12} className="text-zinc-600 dark:text-zinc-300 group-hover:text-black" />
                </div>
                <p className="text-[10px] font-bold">{label}</p>
                <p className="text-[8px] text-zinc-400 mt-0.5 truncate">{address}</p>
              </DemoTap>
            ))}
          </div>
        </div>

        <DemoTap
          onDemoAction={onBookRide}
          className="w-full flex items-center justify-center gap-2 bg-black dark:bg-yellow-500 text-white dark:text-black text-xs font-bold py-3 rounded-xl shadow-md"
        >
          <Navigation size={14} />
          Book a Ride
        </DemoTap>
      </div>
    </div>
  );
}

// ── Screen 2: Booking ─────────────────────────────────────────────────────
function BookingScreen({
  pickupId,
  dropoffId,
  rideType,
  openPicker,
  onTogglePicker,
  onSelectPickup,
  onSelectDropoff,
  onSelectRideType,
  onBook,
}) {
  const quote = getRouteQuote(pickupId, dropoffId);
  const canBook = Boolean(quote);
  const selectedFare = quote?.fares?.[rideType];

  return (
    <div className="flex flex-col h-full min-h-0 pointer-events-auto">
      <StatusBar badge="Interactive preview" />
      <DemoMap showRoute={canBook} routeAnimated />

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="shrink-0 p-4 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 rounded-t-3xl shadow-2xl max-h-[58%] overflow-y-auto"
      >
        <h2 className="text-sm font-black mb-2">Get a ride</h2>
        <div className="flex items-center gap-1.5 bg-green-50 dark:bg-green-950/40 text-green-800 dark:text-green-300 px-2.5 py-1.5 rounded-xl border border-green-200 dark:border-green-800 mb-3">
          <ShieldCheck size={11} />
          <span className="text-[9px] font-semibold">Safe, fast and reliable</span>
        </div>

        <LocationField
          kind="pickup"
          icon={Navigation}
          iconClass="text-green-600"
          valueId={pickupId}
          options={PICKUP_OPTIONS}
          isOpen={openPicker === "pickup"}
          onToggle={() => onTogglePicker("pickup")}
          onSelect={onSelectPickup}
        />

        <div className="ml-[18px] h-3 border-l-2 border-dashed border-zinc-300 dark:border-zinc-600" />

        <LocationField
          kind="dropoff"
          icon={MapPin}
          iconClass="text-red-500"
          valueId={dropoffId}
          options={DROPOFF_OPTIONS}
          isOpen={openPicker === "dropoff"}
          onToggle={() => onTogglePicker("dropoff")}
          onSelect={onSelectDropoff}
        />

        {quote && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="grid grid-cols-2 gap-2 mt-3"
          >
            <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 rounded-xl p-2 text-center">
              <p className="text-sm font-black text-blue-700 dark:text-blue-300">{quote.eta}</p>
              <p className="text-[8px] text-zinc-500">min ETA</p>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 rounded-xl p-2 text-center">
              <p className="text-sm font-black text-indigo-700 dark:text-indigo-300">{quote.distance}</p>
              <p className="text-[8px] text-zinc-500">km</p>
            </div>
          </motion.div>
        )}

        <p className="text-[8px] text-zinc-400 font-semibold uppercase tracking-wide mt-3 mb-1.5">
          Ride type
        </p>
        <div className="flex gap-1.5">
          {RIDE_TYPES.map((type) => {
            const fare = quote?.fares?.[type.id];
            return (
              <DemoTap
                key={type.id}
                disabled={!quote}
                onDemoAction={() => onSelectRideType(type.id)}
                className={cx(
                  "flex-1 flex flex-col items-center gap-0.5 py-2 px-1 rounded-xl border-2",
                  rideType === type.id
                    ? "border-black dark:border-yellow-500 bg-black dark:bg-yellow-500 text-white dark:text-black"
                    : "border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-500"
                )}
              >
                <span className="text-sm">{type.icon}</span>
                <span className="text-[9px] font-bold">{type.label}</span>
                <span className="text-[9px] font-black">
                  {fare ? `₹${fare}` : "—"}
                </span>
              </DemoTap>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-1.5 mt-3">
          <DemoTap className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 rounded-xl px-2.5 py-2">
            <Clock3 size={11} className="text-zinc-500" />
            <div className="text-left">
              <p className="text-[8px] text-zinc-400">Schedule</p>
              <p className="text-[10px] font-semibold">Now</p>
            </div>
          </DemoTap>
          <DemoTap className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 rounded-xl px-2.5 py-2">
            <User size={11} className="text-zinc-500" />
            <div className="text-left">
              <p className="text-[8px] text-zinc-400">Rider</p>
              <p className="text-[10px] font-semibold">For me</p>
            </div>
          </DemoTap>
        </div>

        <DemoTap
          disabled={!canBook}
          onDemoAction={onBook}
          className={cx(
            "w-full mt-3 py-2.5 rounded-xl text-xs font-bold",
            canBook
              ? "bg-yellow-500 text-black shadow-md"
              : "bg-zinc-200 dark:bg-zinc-800 text-zinc-400"
          )}
        >
          Book Ride · {selectedFare ? `₹${selectedFare}` : "—"}
        </DemoTap>
      </motion.div>
    </div>
  );
}

// ── Screen 3: Searching ───────────────────────────────────────────────────
function SearchingScreen({ fare }) {
  return (
    <div className="flex flex-col h-full min-h-0 pointer-events-auto">
      <StatusBar badge="Interactive preview" />
      <DemoMap showRoute showDriver />

      <div className="shrink-0 p-4 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 rounded-t-3xl shadow-2xl">
        <div className="text-center py-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl space-y-2">
          <div className="w-7 h-7 border-[3px] border-amber-200 border-t-amber-500 rounded-full mx-auto animate-spin" />
          <p className="text-xs font-bold text-amber-700 dark:text-amber-300">
            Finding your driver...
          </p>
          <p className="text-lg font-black">₹{fare}</p>
          <p className="text-[9px] text-zinc-500">Estimated fare · demo only</p>
        </div>
      </div>
    </div>
  );
}

// ── Screen 4: Tracking ────────────────────────────────────────────────────
function TrackingScreen({ pickupId, dropoffId, eta, onReset }) {
  const pickupShort = Object.values(LOCATIONS).find((l) => l.id === pickupId)?.short ?? "Pickup";
  const dropShort = Object.values(LOCATIONS).find((l) => l.id === dropoffId)?.short ?? "Drop";

  return (
    <div className="flex flex-col h-full min-h-0 pointer-events-auto">
      <StatusBar badge="Interactive preview" />
      <DemoMap showRoute showDriver routeAnimated />

      <div className="shrink-0 p-4 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 rounded-t-3xl shadow-2xl">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[9px] text-zinc-500 uppercase tracking-wide">Ride status</p>
            <p className="text-sm font-bold flex items-center gap-1">
              <Navigation size={13} className="text-yellow-500" />
              Driver arriving
            </p>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
        </div>

        <div className="flex gap-2 text-[9px] text-zinc-500 mb-3">
          <MapPin size={11} className="shrink-0 mt-0.5" />
          <span className="leading-relaxed">
            ETA {Math.max(4, Math.round(eta * 0.12))} min · {pickupShort} → {dropShort}
          </span>
        </div>

        <div className="flex items-center gap-3 p-2.5 bg-zinc-50 dark:bg-zinc-800 rounded-xl mb-3">
          <div className="w-9 h-9 rounded-full bg-zinc-300 dark:bg-zinc-600 flex items-center justify-center text-xs font-bold">
            RK
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold">Ravi K. · 4.9 ★</p>
            <p className="text-[9px] text-zinc-500">White Swift · TS 09 AB 1234</p>
          </div>
        </div>

        <DemoTap
          onDemoAction={onReset}
          className="w-full py-2.5 rounded-xl bg-yellow-500 text-black text-xs font-bold"
        >
          Try demo again
        </DemoTap>
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────
function PhoneAppPreview() {
  const [screen, setScreen] = useState("home");
  const [pickupId, setPickupId] = useState("");
  const [dropoffId, setDropoffId] = useState("");
  const [rideType, setRideType] = useState("standard");
  const [openPicker, setOpenPicker] = useState(null); // "pickup" | "dropoff" | null
  const [bookedFare, setBookedFare] = useState(0);
  const [notification, setNotification] = useState(null);

  const quote = getRouteQuote(pickupId, dropoffId);

  const resetDemo = useCallback(() => {
    setScreen("home");
    setPickupId("");
    setDropoffId("");
    setRideType("standard");
    setOpenPicker(null);
    setBookedFare(0);
    setNotification(null); 
  }, []);

  const goToBooking = useCallback((prefill) => {
    setScreen("booking");
    setOpenPicker(null);
    if (prefill) {
      setPickupId(prefill.pickupId);
      setDropoffId(prefill.dropoffId);
    }
  }, []);

  useEffect(() => {
    if (screen !== "searching") return;
    const t = setTimeout(() => setScreen("tracking"), 2400);
    return () => clearTimeout(t);
  }, [screen]);

  useEffect(() => {
    if (screen !== "tracking") return;
    const t = setTimeout(() => resetDemo(), 10000);
    return () => clearTimeout(t);
  }, [screen, resetDemo]);

  // Push notification when driver is found (tracking screen)
useEffect(() => {
  if (screen !== "tracking") return;

  const otp = getDemoOtp(pickupId, dropoffId);

  setNotification({
    driverName: "Ravi K.",
    otp,
  });

  const hide = setTimeout(() => setNotification(null), 4500);
  return () => {
    clearTimeout(hide);
    setNotification(null);
  };
}, [screen, pickupId, dropoffId]);

  const handleQuickDest = (id) => {
    const dest = QUICK_DESTINATIONS.find((d) => d.id === id);
    if (dest) goToBooking({ pickupId: dest.pickupId, dropoffId: dest.dropoffId });
    else goToBooking();
  };

  const handleSelectPickup = (id) => {
    setPickupId(id);
    setOpenPicker(null);
  };

  const handleSelectDropoff = (id) => {
    setDropoffId(id);
    setOpenPicker(null);
  };

  const handleTogglePicker = (which) => {
    setOpenPicker((prev) => (prev === which ? null : which));
  };

  const handleBook = () => {
    if (!quote) return;
    setBookedFare(quote.fares[rideType]);
    setOpenPicker(null);
    setScreen("searching");
  };

  return (
    <div className="relative w-full h-full bg-zinc-100 dark:bg-zinc-950 flex flex-col text-zinc-900 dark:text-white overflow-hidden pointer-events-auto touch-manipulation">
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          className="flex flex-col h-full min-h-0"
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.22 }}
        >
          {screen === "home" && (
            <HomeScreen
              onBookRide={() => goToBooking()}
              onQuickDest={handleQuickDest}
            />
          )}
          {screen === "booking" && (
            <BookingScreen
              pickupId={pickupId}
              dropoffId={dropoffId}
              rideType={rideType}
              openPicker={openPicker}
              onTogglePicker={handleTogglePicker}
              onSelectPickup={handleSelectPickup}
              onSelectDropoff={handleSelectDropoff}
              onSelectRideType={setRideType}
              onBook={handleBook}
            />
          )}
          {screen === "searching" && <SearchingScreen fare={bookedFare} />}
          {screen === "tracking" && (
            <TrackingScreen
              pickupId={pickupId}
              dropoffId={dropoffId}
              eta={quote?.eta ?? 15}
              onReset={resetDemo}
            />
          )}
        </motion.div>
      </AnimatePresence>
      <DemoRideNotification notification={notification} />
    </div>
  );
}

export default PhoneAppPreview;