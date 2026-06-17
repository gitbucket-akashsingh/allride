import { useState } from "react";
import { Navigation, MapPin, ShieldCheck, Car, Clock3, User } from "lucide-react";
import RideMap from "@/features/map/components/RideMap";
import LocationAutocomplete from "@/features/map/components/LocationAutocomplete";
import useMapStore from "@/features/map/store/mapStore";
import { requestRide } from "@/features/rider/api/rideApi";
import useRidePolling from "@/features/rider/hooks/useRidePolling";

const RIDE_TYPES = [
  { id: "standard", label: "Standard", icon: "🚕", price: "₹" },
  { id: "premium",  label: "Premium",  icon: "🚙", price: "₹₹" },
  { id: "xl",       label: "XL",       icon: "🚐", price: "₹₹₹" },
];

const PAGE_HEIGHT = "calc(100vh - 64px)";

function BookRidePage() {
  const [selectedRideType, setSelectedRideType] = useState("standard");
  const [bookingStatus, setBookingStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rideId, setRideId] = useState(null);
  const [fare, setFare] = useState(null);

  const pickup         = useMapStore((s) => s.pickup);
  const destination    = useMapStore((s) => s.destination);
  const eta            = useMapStore((s) => s.eta);
  const distance       = useMapStore((s) => s.distance);
  const setPickup      = useMapStore((s) => s.setPickup);
  const setDestination = useMapStore((s) => s.setDestination);

  const canSearch = pickup?.latitude && destination?.latitude;

  const handleSearch = async () => {
    if (!canSearch) return;
    setLoading(true);
    setError(null);
    try {
      const res = await requestRide({ pickup, destination });
      setRideId(res.data.rideId);
      setFare(res.data.fare);
      setBookingStatus("searching");
    } catch {
      setError("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useRidePolling(
    rideId,
    (status) => {
      if (status === "ACCEPTED") setBookingStatus("booked");
      if (status === "CANCELLED") {
        setBookingStatus(null);
        setError("Ride was cancelled.");
      }
    },
    bookingStatus === "searching"
  );

  const handleReset = () => {
    setBookingStatus(null);
    setRideId(null);
    setFare(null);
    setPickup(null);
    setDestination(null);
    setError(null);
  };

  return (
    <div
      className="flex gap-4 p-4 bg-zinc-100 dark:bg-zinc-950"
      style={{ height: PAGE_HEIGHT }}
    >
      {/* ── LEFT CARD ─────────────────────────────────────────────── */}
      <div className="w-[340px] shrink-0 bg-white rounded-2xl shadow-lg border border-zinc-200 flex flex-col overflow-hidden">
        <div className="flex flex-col gap-3 p-4 overflow-y-auto flex-1">

          {/* Header */}
          <div>
            <h1 className="text-xl font-black tracking-tight text-black leading-tight">
              Get a ride
            </h1>
            <div className="mt-2 flex items-center gap-1.5 bg-green-50 text-green-800 px-3 py-1.5 rounded-xl border border-green-200">
              <ShieldCheck size={13} />
              <span className="text-xs font-semibold">Safe, fast and reliable</span>
            </div>
          </div>

          {/* Location inputs */}
          <div>
            <LocationAutocomplete
              label="Pickup"
              placeholder="Enter pickup location"
              icon={<Navigation size={13} />}
              onSelect={setPickup}
              showCurrentLocation={true}
            />
            <div className="ml-[18px] h-3 border-l-2 border-dashed border-zinc-300" />
            <LocationAutocomplete
              label="Destination"
              placeholder="Where to?"
              icon={<MapPin size={13} />}
              onSelect={setDestination}
            />
          </div>

          {/* Route summary */}
          {eta && distance && (
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-2.5 text-center">
                <p className="text-lg font-black text-blue-700 leading-none">{eta}</p>
                <p className="text-[10px] text-zinc-500 mt-0.5">min ETA</p>
              </div>
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-2.5 text-center">
                <p className="text-lg font-black text-indigo-700 leading-none">{distance}</p>
                <p className="text-[10px] text-zinc-500 mt-0.5">km away</p>
              </div>
            </div>
          )}

          {/* Ride type */}
          <div>
            <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wide mb-1.5">
              Ride type
            </p>
            <div className="flex gap-1.5">
              {RIDE_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedRideType(type.id)}
                  className={`flex-1 flex flex-col items-center gap-0.5 py-2 px-1 rounded-xl border-2 transition-all ${
                    selectedRideType === type.id
                      ? "border-black bg-black text-white"
                      : "border-zinc-200 bg-zinc-50 text-zinc-500 hover:border-zinc-400"
                  }`}
                >
                  <span className="text-base">{type.icon}</span>
                  <span className="text-[10px] font-bold leading-none">{type.label}</span>
                  <span className="text-[9px] opacity-60">{type.price}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Schedule & Rider */}
          <div className="grid grid-cols-2 gap-1.5">
            <div className="flex items-center gap-2 bg-zinc-100 rounded-xl px-2.5 py-2 cursor-pointer hover:bg-zinc-200 transition">
              <Clock3 size={12} className="text-zinc-500 shrink-0" />
              <div>
                <p className="text-[9px] text-zinc-400 leading-none">Schedule</p>
                <p className="text-[11px] font-semibold text-black mt-0.5">Now</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-zinc-100 rounded-xl px-2.5 py-2 cursor-pointer hover:bg-zinc-200 transition">
              <User size={12} className="text-zinc-500 shrink-0" />
              <div>
                <p className="text-[9px] text-zinc-400 leading-none">Rider</p>
                <p className="text-[11px] font-semibold text-black mt-0.5">For me</p>
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
              {error}
            </p>
          )}

          {/* Search button */}
          {bookingStatus === null && (
            <button
              onClick={handleSearch}
              disabled={!canSearch || loading}
              className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all ${
                canSearch
                  ? "bg-black text-white hover:bg-zinc-800 shadow-md hover:-translate-y-0.5 active:scale-[0.98]"
                  : "bg-zinc-100 text-zinc-400 cursor-not-allowed"
              }`}
            >
              {loading ? "Booking..." : "Search"}
            </button>
          )}

          {/* Searching */}
          {bookingStatus === "searching" && (
            <div className="text-center py-3 bg-amber-50 border border-amber-200 rounded-xl space-y-1">
              <div className="w-6 h-6 border-[3px] border-amber-200 border-t-amber-500 rounded-full mx-auto animate-spin" />
              <p className="text-sm font-bold text-amber-700">Finding your driver...</p>
              {fare && (
                <p className="text-xl font-black text-black">₹{Math.round(fare)}</p>
              )}
              <p className="text-[10px] text-zinc-500">Estimated fare · 10–30 sec</p>
            </div>
          )}

          {/* Booked */}
          {bookingStatus === "booked" && (
            <div className="text-center py-3 bg-green-50 border border-green-200 rounded-xl">
              <div className="text-2xl mb-1">✅</div>
              <p className="font-black text-green-700">Ride Booked!</p>
              <p className="text-[10px] text-zinc-500 mt-0.5">Driver is on the way</p>
              <button onClick={handleReset} className="mt-2 text-xs text-zinc-500 underline">
                Book another ride
              </button>
            </div>
          )}

          {/* Promo card */}
          <div className="bg-black text-white rounded-2xl p-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-full blur-2xl" />
            <div className="flex items-center gap-2.5 relative z-10">
              <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <Car size={14} />
              </div>
              <div>
                <h3 className="font-bold text-xs">Ride Comfort+</h3>
                <p className="text-[10px] text-zinc-400 mt-0.5 leading-snug">Premium drivers and live tracking.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── RIGHT CARD — Map ──────────────────────────────────────── */}
      <div className="flex-1 bg-white rounded-2xl shadow-lg border border-zinc-200 overflow-hidden relative hidden lg:block">
        <RideMap />

        {pickup && destination && (
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm shadow-xl rounded-xl p-3 w-56 border border-zinc-100 z-10">
            <p className="text-[9px] text-zinc-400 font-semibold uppercase tracking-wide mb-1.5">
              Your Route
            </p>
            <div className="space-y-1.5">
              <div className="flex gap-2 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-black mt-1 shrink-0" />
                <p className="text-[11px] font-semibold text-black line-clamp-1 leading-snug">{pickup.label}</p>
              </div>
              <div className="ml-[2px] h-3 border-l-2 border-dashed border-zinc-300" />
              <div className="flex gap-2 items-start">
                <div className="w-1.5 h-1.5 rounded bg-black mt-1 shrink-0" />
                <p className="text-[11px] font-semibold text-black line-clamp-1 leading-snug">{destination.label}</p>
              </div>
            </div>
            {distance && eta && (
              <div className="mt-2 pt-1.5 border-t border-zinc-100 flex justify-between text-[10px] text-zinc-500">
                <span><strong className="text-black text-xs">{distance} km</strong></span>
                <span><strong className="text-black text-xs">{eta} min</strong> ETA</span>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}

export default BookRidePage;