import {
    MapPin,
    Phone,
    MessageCircle,
    Star,
    X,
    Gauge,
    Navigation,
    AlertTriangle,
  } from "lucide-react";
  import AllRideLogo from "@/shared/components/AllRideLogo";
  import {
    DEMO_RIDE,
    DEMO_PICKUP,
    DEMO_DESTINATION,
  } from "@/features/landing/constants/liveTrackingDemoData";
  
  function GlassCard({ className = "", children }) {
    return (
      <div
        className={`border border-white/10 bg-zinc-950/80 shadow-2xl backdrop-blur-xl ${className}`}
      >
        {children}
      </div>
    );
  }
  
  function LiveTrackingDashboard() {
    const ride = DEMO_RIDE;
  
    return (
      <div className="pointer-events-none absolute inset-0 z-10">
        {/* Top-left header */}
        <GlassCard className="absolute left-4 top-4 max-w-[220px] rounded-2xl px-4 py-3 sm:left-6 sm:top-6 sm:max-w-none">
          <div className="flex items-center gap-2.5">
            <AllRideLogo className="h-7 w-auto shrink-0" alt="AllRide" />
            <div className="min-w-0">
              <p className="text-xs font-black leading-tight text-white sm:text-sm">
                AllRide · Live Tracking
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <span className="text-[10px] text-zinc-400">
                  Ride ID: {ride.rideId}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] font-semibold text-green-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                  {ride.status}
                </span>
              </div>
            </div>
          </div>
        </GlassCard>
  
        {/* Bottom-left ETA card */}
        <GlassCard className="absolute bottom-4 left-4 w-[200px] rounded-2xl px-4 py-3 sm:bottom-6 sm:left-6 sm:w-56">
          <p className="text-lg font-black text-white sm:text-xl">
            {ride.etaMinutes} minutes
          </p>
          <p className="text-[10px] text-zinc-400 sm:text-xs">remaining</p>
          <p className="mt-2 text-xs text-zinc-300 sm:text-sm">
            {ride.remainingKm} km to destination
          </p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full rounded-full bg-blue-500 transition-all duration-1000"
              style={{ width: `${ride.progress * 100}%` }}
            />
          </div>
        </GlassCard>
  
        {/* Right sidebar — desktop */}
        <GlassCard className="pointer-events-auto absolute bottom-6 right-6 top-6 hidden w-72 flex-col overflow-hidden rounded-3xl lg:flex xl:w-80">
          <div className="space-y-4 border-b border-white/10 p-5">
            <div>
              <p className="mb-1 text-[10px] uppercase tracking-wider text-zinc-500">
                Real-time
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <Gauge size={14} className="shrink-0 text-blue-400" />
                  <div>
                    <p className="text-[10px] text-zinc-500">Speed</p>
                    <p className="text-sm font-bold text-white">
                      {ride.speedKmh} km/h
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle size={14} className="shrink-0 text-orange-400" />
                  <div>
                    <p className="text-[10px] text-zinc-500">Traffic</p>
                    <p className="text-sm font-bold text-orange-400">
                      {ride.traffic}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-start gap-2 border-t border-white/5 pt-3">
                <Navigation size={14} className="mt-0.5 shrink-0 text-yellow-400" />
                <div>
                  <p className="text-[10px] text-zinc-500">Next turn</p>
                  <p className="text-xs leading-snug text-zinc-200">
                    {ride.nextTurn}
                  </p>
                </div>
              </div>
            </div>
          </div>
  
          <div className="border-b border-white/10 p-5">
            <p className="mb-3 text-[10px] uppercase tracking-wider text-zinc-500">
              Driver
            </p>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-zinc-700 text-sm font-black text-white">
                {ride.driverInitials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-white">{ride.driverName}</p>
                <p className="flex items-center gap-1 text-xs text-zinc-400">
                  <Star size={12} className="fill-yellow-400 text-yellow-400" />
                  {ride.driverRating}
                </p>
              </div>
              <button
                type="button"
                className="rounded-xl bg-white/10 p-2 transition-colors hover:bg-white/15"
                aria-label="Contact driver (demo)"
              >
                <Phone size={16} className="text-white" />
              </button>
              <button
                type="button"
                className="rounded-xl bg-white/10 p-2 transition-colors hover:bg-white/15"
                aria-label="Message driver (demo)"
              >
                <MessageCircle size={16} className="text-white" />
              </button>
            </div>
          </div>
  
          <div className="border-b border-white/10 p-5">
            <p className="mb-3 text-[10px] uppercase tracking-wider text-zinc-500">
              Vehicle
            </p>
            <div className="rounded-2xl border border-white/5 bg-zinc-900/80 p-3">
              <div className="mb-3 flex h-16 items-center justify-center rounded-xl bg-gradient-to-br from-zinc-700 to-zinc-900 text-3xl">
                🚗
              </div>
              <p className="text-sm font-bold text-white">{ride.vehicle}</p>
              <p className="mt-1 font-mono text-xs text-zinc-400">{ride.plate}</p>
            </div>
          </div>
  
          <div className="flex-1 overflow-y-auto p-5">
            <p className="mb-3 text-[10px] uppercase tracking-wider text-zinc-500">
              Journey
            </p>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-green-500" />
                <div>
                  <p className="text-xs font-semibold text-white">
                    {DEMO_PICKUP.label}
                  </p>
                  <p className="text-[10px] text-zinc-500">{ride.pickupTime}</p>
                </div>
              </div>
              <div className="ml-1 h-4 border-l border-dashed border-zinc-700" />
              <div className="flex gap-3">
                <MapPin size={14} className="mt-0.5 shrink-0 text-red-400" />
                <div>
                  <p className="text-xs font-semibold text-white">
                    {DEMO_DESTINATION.label}
                  </p>
                  <p className="text-[10px] text-zinc-500">{ride.dropTime}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-between border-t border-white/10 pt-4 text-sm">
              <span className="text-zinc-500">Distance</span>
              <span className="font-semibold text-white">{ride.distanceKm} km</span>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-zinc-500">Fare</span>
              <span className="font-bold text-yellow-400">₹ {ride.fare}</span>
            </div>
          </div>
  
          <div className="border-t border-white/10 p-5">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 py-2.5 text-sm font-semibold text-red-400 transition-colors hover:bg-red-500/10"
            >
              <X size={16} />
              Cancel Ride
            </button>
          </div>
        </GlassCard>
  
        {/* Mobile bottom summary */}
        <GlassCard className="pointer-events-auto absolute bottom-4 right-4 left-[13.5rem] rounded-2xl px-3 py-2.5 sm:left-60 lg:hidden">
          <p className="truncate text-xs font-bold text-white">{ride.driverName}</p>
          <p className="truncate text-[10px] text-zinc-400">
            {ride.vehicle} · {ride.speedKmh} km/h
          </p>
        </GlassCard>
      </div>
    );
  }
  
  export default LiveTrackingDashboard;