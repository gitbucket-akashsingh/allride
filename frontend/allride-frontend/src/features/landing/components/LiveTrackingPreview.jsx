import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import LiveTrackingDemoMap from "./LiveTrackingDemoMap";
import LiveTrackingDashboard from "./LiveTrackingDashboard";
import { DEMO_MAP_MAX_WIDTH } from "@/features/landing/constants/liveTrackingDemoData";

function getCollapsedMapWidth(viewportWidth) {
  const padded = viewportWidth - 32; // px-4 on each side
  return Math.min(padded, DEMO_MAP_MAX_WIDTH);
}

function LiveTrackingPreview() {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : DEMO_MAP_MAX_WIDTH
  );

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const collapsedWidth = getCollapsedMapWidth(viewportWidth);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const expand = useTransform(scrollYProgress, [0.15, 0.45, 0.75], [0, 1, 0]);
  const borderRadius = useTransform(expand, [0, 1], [40, 0]);
  const scale = useTransform(expand, [0, 1], [1, 1.01]);
  const width = useTransform(expand, [0, 1], [collapsedWidth, viewportWidth]);

  return (
    <div ref={sectionRef} className="relative w-full min-h-[260vh] pb-16">
      <div className="sticky top-0 z-10 flex h-[72vh] items-center justify-center sm:h-[78vh] lg:h-[85vh]">
        <motion.div
          style={
            prefersReducedMotion
              ? {
                  width: collapsedWidth,
                  borderRadius: 40,
                  scale: 1,
                }
              : {
                  width,
                  borderRadius,
                  scale,
                }
          }
          className="relative h-full overflow-hidden border border-zinc-200 bg-zinc-900 shadow-[0_0_80px_rgba(0,0,0,0.12)] dark:border-white/10 dark:shadow-[0_0_80px_rgba(255,255,255,0.08)]"
        >
          <LiveTrackingDemoMap />
          <LiveTrackingDashboard />
          <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </motion.div>
      </div>
    </div>
  );
}

export default LiveTrackingPreview;