import { MapPin, Navigation, Car } from "lucide-react";

function PhoneAppPreview() {
  return (
    <div className="w-full h-full bg-zinc-100 dark:bg-zinc-950 flex flex-col text-zinc-900 dark:text-white">
      {/* Fake status bar */}
      <div className="flex justify-between items-center px-5 pt-12 pb-2 text-[10px] text-zinc-500">
        <span>9:41</span>
        <span className="flex gap-1">●●●</span>
      </div>

      {/* Map area */}
      <div className="relative flex-1 min-h-0 bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_40%,#f59e0b_0%,transparent_50%)]" />
        {/* Route line */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 400" fill="none">
          <path
            d="M 60 320 Q 120 200 180 120 T 240 80"
            stroke="#f59e0b"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="8 6"
          />
        </svg>
        <div className="absolute top-[20%] left-[25%] w-3 h-3 rounded-full bg-yellow-500 ring-4 ring-yellow-500/30" />
        <div className="absolute top-[15%] right-[20%] w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
          <Car size={14} className="text-white" />
        </div>
      </div>

      {/* Bottom sheet — like tracking */}
      <div className="p-4 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 rounded-t-3xl shadow-2xl">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wide">Ride status</p>
            <p className="text-sm font-bold flex items-center gap-1">
              <Navigation size={14} className="text-yellow-500" />
              Driver arriving
            </p>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
        </div>
        <div className="flex gap-2 text-[10px] text-zinc-500">
          <MapPin size={12} />
          <span>ETA 4 min · Airport → Gachibowli</span>
        </div>
        <button
          type="button"
          className="mt-3 w-full py-2.5 rounded-xl bg-yellow-500 text-black text-xs font-bold"
        >
          Track live ride
        </button>
      </div>
    </div>
  );
}

export default PhoneAppPreview;