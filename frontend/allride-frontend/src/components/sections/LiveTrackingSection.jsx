import map_image from "/src/assets/images/map_image.png";
import { motion } from "framer-motion";
// import Driver_image from "/src/assets/images/Driver_image.png";

function LiveTrackingSection() {
  return (
    <div className=" bg-black text-white overflow-hidden">
      <motion.section
        id="live-map"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="py-28 bg-black relative overflow-hidden"
      >
        {/* Glow Effects */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Heading */}
          <div className="text-center mb-20">
            <p className="text-yellow-400 font-semibold mb-4">LIVE TRACKING</p>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-8 leading-tight">
              Track Every Ride
              <br />
              in Real Time
            </h2>

            <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
              Experience real-time driver tracking, live ride updates, and smart
              transportation intelligence with AllRide.
            </p>
          </div>

          {/* Map Container */}
          {/* <div className="relative w-full h-[450px] sm:h-[600px] lg:h-[750px] rounded-[40px] overflow-hidden border border-white/10 bg-zinc-900 shadow-[0_0_80px_rgba(255,255,255,0.08)]"> */}
          <div className="relative w-full h-fit rounded-[40px] overflow-hidden border border-white/10 bg-zinc-900 shadow-[0_0_80px_rgba(255,255,255,0.08)]">
            {/* MAP IMAGE */}
            <img
              src={map_image}
              alt="AllRide Live Map"
              // className="w-full h-full object-cover"
              className="w-full h-auto object-contain"
              loading="lazy"
            />

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>

            {/* DRIVER INFO CARD */}
            {/* <div className="absolute top-6 left-6 bg-zinc-950/90 backdrop-blur-xl border border-white/10 rounded-3xl p-5 w-72 shadow-2xl">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={Driver_image}
                        alt="Driver"
                        className="w-14 h-14 rounded-2xl object-cover"
                      />
      
                      <div>
                        <h3 className="font-bold text-lg">Rohit Kumar</h3>
      
                        <p className="text-gray-400 text-sm">
                          Mercedes-Benz E-Class • TS 09 AB 5678
                        </p>
                      </div>
                    </div>
      
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>Arriving in</span>
      
                      <span className="text-white font-semibold">4 mins</span>
                    </div>
                  </div> */}

            {/* LIVE BADGE */}
            {/* <div className="absolute bottom-6 right-6 bg-yellow-500 text-black rounded-3xl px-6 py-4 font-bold flex items-center gap-3 shadow-2xl">
                    <div className="w-3 h-3 rounded-full bg-green-600 animate-pulse"></div>
                    Ride Live
                  </div> */}

            {/* LOCATION PINS */}
            {/* <div className="absolute top-1/3 left-1/2 w-6 h-6 rounded-full bg-red-500 border-4 border-white shadow-2xl animate-bounce"></div>
      
                  <div className="absolute bottom-1/4 left-1/3 w-6 h-6 rounded-full bg-yellow-400 border-4 border-white shadow-2xl animate-pulse"></div> */}
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default LiveTrackingSection;
