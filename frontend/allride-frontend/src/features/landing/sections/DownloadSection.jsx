import phone1 from "/src/assets/images/phone1.png";

function DownloadSection() {
  return (
    <div className=" bg-black text-white overflow-hidden">
      <section className="py-28 bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* LEFT CONTENT */}
            <div>
              <p className="text-yellow-400 font-semibold mb-4">DOWNLOAD APP</p>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-8">
                Your Ride.
                <br />
                Anytime. Anywhere.
              </h2>

              <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mb-10">
                Download the AllRide mobile app to book rides, track drivers,
                manage trips, and experience seamless transportation directly
                from your smartphone.
              </p>

              <div className="flex flex-col sm:flex-row gap-5">
                <button className="flex items-center justify-center gap-4 px-7 py-4 rounded-2xl bg-white text-black hover:scale-105 transition-transform duration-300 shadow-2xl font-semibold">
                  <span className="text-3xl"></span>

                  <div className="text-left">
                    <p className="text-xs font-medium">Download on the</p>
                    <h3 className="text-lg font-black leading-none">
                      App Store
                    </h3>
                  </div>
                </button>

                <button className="flex items-center justify-center gap-4 px-7 py-4 rounded-2xl bg-green-500 text-black hover:scale-105 transition-transform duration-300 shadow-2xl font-semibold">
                  <span className="text-3xl">▶</span>

                  <div className="text-left">
                    <p className="text-xs font-medium">Get it on</p>
                    <h3 className="text-lg font-black leading-none">
                      Google Play
                    </h3>
                  </div>
                </button>
              </div>
            </div>

            {/* RIGHT PHONE MOCKUP */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-[320px] sm:w-[380px] h-[650px] rounded-[48px] bg-black border border-white/10 shadow-[0_0_80px_rgba(255,255,255,0.08)] overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-8 bg-zinc-900 rounded-b-3xl z-20"></div>

                <img
                  src={phone1}
                  alt="AllRide App"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>

                <div className="absolute bottom-8 left-6 right-6 z-10">
                  <div className="bg-zinc-950/80 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-2xl">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-gray-400 text-sm">Ride Status</p>
                        <h3 className="text-xl font-bold">Driver Arriving</h3>
                      </div>

                      <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse"></div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>ETA</span>
                      <span className="text-white font-semibold">4 mins</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DownloadSection;
