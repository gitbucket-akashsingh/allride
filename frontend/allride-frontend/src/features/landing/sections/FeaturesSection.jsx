function FeatureSection() {
  return (
    <div className=" bg-black text-white overflow-hidden">
      <section id="features" className="py-28 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-yellow-500 font-semibold mb-4">WHY ALLRIDE</p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 text-center">
              Built for Modern Transportation
            </h2>

            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Experience premium ride-sharing with powerful features for riders,
              drivers, and fleet management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Live Ride Tracking",
                desc: "Track rides in real-time with advanced GPS navigation.",
              },
              {
                title: "Fast Booking",
                desc: "Book rides instantly with smooth one-tap experience.",
              },
              {
                title: "Driver Earnings",
                desc: "Drivers can monitor trips, earnings, and performance.",
              },
              {
                title: "Secure Payments",
                desc: "Integrated payment systems for seamless transactions.",
              },
              {
                title: "Fleet Management",
                desc: "Manage vehicles, rides, and analytics efficiently.",
              },
              {
                title: "24/7 Support",
                desc: "Reliable customer support for riders and drivers.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-8 rounded-[32px] bg-zinc-900 hover:bg-zinc-800 hover:shadow-2xl border border-white/10 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center text-2xl mb-6">
                  🚖
                </div>

                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>

                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default FeatureSection;
