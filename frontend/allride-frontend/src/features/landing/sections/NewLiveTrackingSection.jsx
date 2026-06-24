import map_image from "/src/assets/images/map_image.png";
import { motion } from "framer-motion";
import LiveTrackingPreview from "@/features/landing/components/LiveTrackingPreview";

/** Set to false to restore the static map image mockup */
const USE_INTERACTIVE_LIVE_TRACKING = false;

function LiveTrackingSection() {
  return (
    <div className="overflow-x-clip bg-white text-zinc-900 dark:bg-black dark:text-white">
      <section id="live-map" className="relative bg-white dark:bg-black">
        <div className="pointer-events-none absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

        {/* Intro — animates on scroll into view */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="pb-12 pt-28"
        >
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
            <p className="mb-4 font-semibold text-yellow-400">LIVE TRACKING</p>

            <h2 className="mb-8 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Track Every Ride
              <br />
              in Real Time
            </h2>

            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-zinc-500 dark:text-gray-400">
              Experience real-time driver tracking, live ride updates, and smart
              transportation intelligence with AllRide.
            </p>
          </div>
        </motion.div>

        {/* Interactive preview OR static fallback */}
        {USE_INTERACTIVE_LIVE_TRACKING ? (
          <LiveTrackingPreview />
        ) : (
          <div className="mx-auto max-w-7xl px-4 pb-28 sm:px-6">
            <div className="relative h-fit w-full overflow-hidden rounded-[40px] border border-zinc-200 bg-zinc-100 shadow-[0_0_80px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-zinc-900 dark:shadow-[0_0_80px_rgba(255,255,255,0.08)]">
              <img
                src={map_image}
                alt="AllRide Live Map"
                className="h-auto w-full object-contain"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent dark:from-black/40" />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default LiveTrackingSection;