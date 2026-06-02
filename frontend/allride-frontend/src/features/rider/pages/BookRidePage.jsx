import {
  MapPin,
  Navigation,
  Clock3,
  User,
  ArrowRight,
  Car,
  ShieldCheck,
} from "lucide-react";

function BookRidePage() {
  return (
    <div className="min-h-screen bg-[#f6f6f6] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] h-screen">
        {/* LEFT BOOKING PANEL */}
        <div className="bg-white border-r border-zinc-200 px-6 py-8 flex flex-col">
          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-4xl font-black tracking-tight text-black">
              Get a ride
            </h1>

            <div className="mt-5 flex items-center gap-3 bg-green-100 text-green-800 px-4 py-3 rounded-2xl border border-green-200">
              <ShieldCheck size={18} />
              <span className="text-sm font-semibold">
                50% off your next ride. Up to ₹70 promo.
              </span>
            </div>
          </div>

          {/* FORM */}
          <div className="space-y-4">
            {/* PICKUP */}
            <div className="bg-zinc-100 hover:bg-zinc-200 transition-all rounded-2xl px-5 py-5 flex items-center gap-4 cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white shrink-0">
                <Navigation size={18} />
              </div>

              <div className="flex-1 overflow-hidden">
                <p className="text-xs text-zinc-500 font-medium mb-1">Pickup</p>

                <p className="font-semibold text-black truncate">
                  Rajiv Gandhi International Airport
                </p>
              </div>
            </div>

            {/* DESTINATION */}
            <div className="bg-zinc-100 hover:bg-zinc-200 transition-all rounded-2xl px-5 py-5 flex items-center gap-4 cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white shrink-0">
                <MapPin size={18} />
              </div>

              <div className="flex-1 overflow-hidden">
                <p className="text-xs text-zinc-500 font-medium mb-1">
                  Destination
                </p>

                <p className="font-semibold text-black truncate">
                  DBS Technology Services India Pvt Ltd
                </p>
              </div>

              <button className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:scale-105 transition">
                <ArrowRight size={18} />
              </button>
            </div>

            {/* TIME */}
            <div className="bg-zinc-100 hover:bg-zinc-200 transition-all rounded-2xl px-5 py-5 flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white">
                  <Clock3 size={18} />
                </div>

                <div>
                  <p className="text-xs text-zinc-500 font-medium mb-1">
                    Schedule
                  </p>

                  <p className="font-semibold text-black">Pickup now</p>
                </div>
              </div>

              <span className="text-zinc-500 text-sm">▼</span>
            </div>

            {/* RIDER */}
            <div className="bg-zinc-100 hover:bg-zinc-200 transition-all rounded-2xl px-5 py-5 flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white">
                  <User size={18} />
                </div>

                <div>
                  <p className="text-xs text-zinc-500 font-medium mb-1">
                    Rider
                  </p>

                  <p className="font-semibold text-black">For me</p>
                </div>
              </div>

              <span className="text-zinc-500 text-sm">▼</span>
            </div>
          </div>

          {/* BUTTON */}
          <div className="mt-8">
            <button className="w-full bg-black text-white py-5 rounded-2xl font-bold text-lg hover:bg-zinc-800 transition-all hover:-translate-y-1 active:scale-[0.99] shadow-xl">
              Search
            </button>
          </div>

          {/* BOTTOM INFO */}
          <div className="mt-auto pt-10">
            <div className="bg-black text-white rounded-3xl p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>

              <div className="flex items-start gap-4 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Car size={26} />
                </div>

                <div>
                  <h3 className="font-bold text-lg">Ride Comfort+</h3>

                  <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
                    Faster pickups, premium drivers and live trip tracking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT MAP SECTION */}
        <div className="relative hidden lg:block overflow-hidden">
          {/* MAP IMAGE */}
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1974&auto=format&fit=crop"
            alt="Map"
            className="w-full h-full object-cover"
          />

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/10"></div>

          {/* ROUTE CARD */}
          <div className="absolute top-10 left-10 bg-white shadow-2xl rounded-3xl p-5 w-[320px] border border-zinc-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-zinc-500">Trip Distance</p>
                <h3 className="text-2xl font-black text-black">31.4 km</h3>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center">
                <Navigation size={22} />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-3 h-3 rounded-full bg-black mt-1.5"></div>

                <div>
                  <p className="text-xs text-zinc-500">From</p>
                  <p className="font-semibold text-black text-sm">
                    Rajiv Gandhi International Airport
                  </p>
                </div>
              </div>

              <div className="ml-[5px] h-10 border-l-2 border-dashed border-zinc-300"></div>

              <div className="flex gap-3">
                <div className="w-3 h-3 rounded bg-black mt-1.5"></div>

                <div>
                  <p className="text-xs text-zinc-500">To</p>
                  <p className="font-semibold text-black text-sm">
                    DBS Technology Services India Pvt Ltd
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* DRIVER FLOATING CARD */}
          <div className="absolute bottom-10 right-10 bg-white rounded-3xl shadow-2xl border border-zinc-200 p-5 w-[340px]">
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop"
                alt="Driver"
                className="w-16 h-16 rounded-2xl object-cover"
              />

              <div className="flex-1">
                <h4 className="font-black text-black text-lg">
                  Driver arriving
                </h4>

                <p className="text-sm text-zinc-500 mt-1">
                  Toyota Innova • TS09AB7821
                </p>
              </div>

              <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse"></div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="bg-zinc-100 rounded-2xl p-3 text-center">
                <p className="text-xs text-zinc-500">ETA</p>
                <h5 className="font-black text-black mt-1">6 min</h5>
              </div>

              <div className="bg-zinc-100 rounded-2xl p-3 text-center">
                <p className="text-xs text-zinc-500">Fare</p>
                <h5 className="font-black text-black mt-1">₹684</h5>
              </div>

              <div className="bg-zinc-100 rounded-2xl p-3 text-center">
                <p className="text-xs text-zinc-500">Rating</p>
                <h5 className="font-black text-black mt-1">4.9★</h5>
              </div>
            </div>
          </div>

          {/* MAP GRADIENT */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>
      </div>
    </div>
  );
}

export default BookRidePage;
