function CTASection() {
  return (
    <>
      <div className=" bg-black text-white overflow-hidden">
        <section
          id="download"
          className="py-28 bg-black text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,white,transparent_40%)]"></div>

          <div className="relative max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight mb-8">
              Ready to Ride with AllRide?
            </h2>

            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
              Download the app and experience fast, reliable, and premium
              ride-sharing.
            </p>

            <div className="flex flex-wrap justify-center gap-5">
              <button className="px-8 py-4 rounded-2xl bg-yellow-500 text-black font-bold hover:scale-105 transition-transform duration-300 shadow-2xl">
                Download App
              </button>

              <button className="px-8 py-4 rounded-2xl border border-gray-500 hover:bg-white hover:text-black transition-all duration-300 font-semibold">
                Become a Partner
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default CTASection;
