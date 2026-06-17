import map_image from "/src/assets/images/map_image.png";
import { motion } from "framer-motion";

function LiveTrackingSection() {
  return (
    <div className="bg-white text-zinc-900 dark:bg-black dark:text-white overflow-hidden">
      <motion.section
        id="live-map"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="py-28 bg-white dark:bg-black relative overflow-hidden"
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

            <p className="text-zinc-500 dark:text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
              Experience real-time driver tracking, live ride updates, and smart
              transportation intelligence with AllRide.
            </p>
          </div>

          {/* Map Container */}
          <div className="relative w-full h-fit rounded-[40px] overflow-hidden border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-zinc-900 shadow-[0_0_80px_rgba(0,0,0,0.08)] dark:shadow-[0_0_80px_rgba(255,255,255,0.08)]">
            <img
              src={map_image}
              alt="AllRide Live Map"
              className="w-full h-auto object-contain"
              loading="lazy"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/20 dark:from-black/40 via-transparent to-transparent"></div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default LiveTrackingSection;
