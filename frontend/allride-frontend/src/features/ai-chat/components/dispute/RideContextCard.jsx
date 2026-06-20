import { MapPin, Clock, CreditCard } from "lucide-react";

/**
 * @param {import("../../api/contracts").RideContext} props
 */
export default function RideContextCard({
  rideId,
  pickup,
  dropoff,
  startedAt,
  completedAt,
  quotedFare,
  chargedFare,
  paymentStatus,
}) {
  const diff = chargedFare - quotedFare;

  return (
    <div className="flex-1 min-w-0 bg-white dark:bg-zinc-900 border border-amber-200 dark:border-amber-500/30 border-l-4 border-l-amber-500 rounded-2xl p-3 text-sm shadow-sm">
      <div className="flex items-center justify-between gap-2 mb-2">
        <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide">
          Ride context
        </p>
        <span className="text-[10px] font-mono bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full">
          {rideId}
        </span>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex gap-2">
          <MapPin size={14} className="text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-zinc-500">Pickup</p>
            <p className="font-semibold text-zinc-900 dark:text-white">{pickup}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <MapPin size={14} className="text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-zinc-500">Drop-off</p>
            <p className="font-semibold text-zinc-900 dark:text-white">{dropoff}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Clock size={14} className="text-amber-500 shrink-0 mt-0.5" />
          <p className="text-zinc-600 dark:text-zinc-300">
            {startedAt} → {completedAt}
          </p>
        </div>
        <div className="flex gap-2">
          <CreditCard size={14} className="text-amber-500 shrink-0 mt-0.5" />
          <p className="text-zinc-600 dark:text-zinc-300">
            Quoted ₹{quotedFare} · Charged ₹{chargedFare}
            {diff > 0 && (
              <span className="text-red-600 dark:text-red-400 font-semibold">
                {" "}(+₹{diff})
              </span>
            )}
            {" · "}{paymentStatus}
          </p>
        </div>
      </div>
    </div>
  );
}