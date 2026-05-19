function RiderDriverSection() {
  return (
    <div className=" bg-black text-white overflow-hidden">
      <section id="drivers" className="py-28 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-20">
            <p className="text-yellow-400 font-semibold mb-4">
              BUILT FOR EVERYONE
            </p>

            <h2 className="text-3xl sm:text-5xl font-black mb-6">
              One Platform for Riders & Drivers
            </h2>

            <p className="text-gray-400 max-w-3xl mx-auto text-lg">
              AllRide provides a seamless experience for passengers and drivers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-[36px] border border-white/10 bg-zinc-900 p-8 lg:p-10 shadow-2xl">
              <div className="w-16 h-16 rounded-3xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-3xl mb-8">
                🚕
              </div>

              <p className="text-yellow-400 font-semibold mb-4">FOR RIDERS</p>

              <h3 className="text-3xl lg:text-4xl font-black mb-6 leading-tight">
                Book rides instantly with smart tracking.
              </h3>

              <p className="text-gray-400 leading-relaxed mb-8 text-lg">
                Experience smooth ride booking, live tracking, and secure
                payments.
              </p>

              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-7 h-7 rounded-full bg-green-500/20 flex items-center justify-center text-sm">
                    ✓
                  </div>
                  <span className="text-gray-300">Real-time GPS tracking</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-7 h-7 rounded-full bg-green-500/20 flex items-center justify-center text-sm">
                    ✓
                  </div>
                  <span className="text-gray-300">Quick ride booking</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-7 h-7 rounded-full bg-green-500/20 flex items-center justify-center text-sm">
                    ✓
                  </div>
                  <span className="text-gray-300">Secure digital payments</span>
                </div>
              </div>

              <button className="px-8 py-4 rounded-2xl bg-yellow-500 text-black font-bold hover:scale-105 transition-transform duration-300 shadow-2xl">
                Ride with AllRide
              </button>
            </div>

            <div className="rounded-[36px] border border-white/10 bg-zinc-900 p-8 lg:p-10 shadow-2xl">
              <div className="w-16 h-16 rounded-3xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-3xl mb-8">
                🚘
              </div>

              <p className="text-blue-400 font-semibold mb-4">FOR DRIVERS</p>

              <h3 className="text-3xl lg:text-4xl font-black mb-6 leading-tight">
                Earn more with flexible driving opportunities.
              </h3>

              <p className="text-gray-400 leading-relaxed mb-8 text-lg">
                Manage rides, earnings, and trip analytics from one platform.
              </p>

              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-7 h-7 rounded-full bg-green-500/20 flex items-center justify-center text-sm">
                    ✓
                  </div>
                  <span className="text-gray-300">Live earnings dashboard</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-7 h-7 rounded-full bg-green-500/20 flex items-center justify-center text-sm">
                    ✓
                  </div>
                  <span className="text-gray-300">Flexible working hours</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-7 h-7 rounded-full bg-green-500/20 flex items-center justify-center text-sm">
                    ✓
                  </div>
                  <span className="text-gray-300">
                    Instant ride notifications
                  </span>
                </div>
              </div>

              <button className="px-8 py-4 rounded-2xl bg-white text-black font-bold hover:scale-105 transition-transform duration-300 shadow-2xl">
                Become a Driver
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RiderDriverSection;
