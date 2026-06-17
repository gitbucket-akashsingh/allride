import {
  Navigation,
  Zap,
  IndianRupee,
  CreditCard,
  Car,
  Headphones,
} from "lucide-react";
import AnimatedSection from "@/features/landing/components/AnimatedSection";

const FEATURES = [
  {
    title: "Live Ride Tracking",
    desc: "Track rides in real-time with advanced GPS navigation.",
    icon: Navigation,
  },
  {
    title: "Fast Booking",
    desc: "Book rides instantly with smooth one-tap experience.",
    icon: Zap,
  },
  {
    title: "Driver Earnings",
    desc: "Drivers can monitor trips, earnings, and performance.",
    icon: IndianRupee,
  },
  {
    title: "Secure Payments",
    desc: "Integrated payment systems for seamless transactions.",
    icon: CreditCard,
  },
  {
    title: "Fleet Management",
    desc: "Manage vehicles, rides, and analytics efficiently.",
    icon: Car,
  },
  {
    title: "24/7 Support",
    desc: "Reliable customer support for riders and drivers.",
    icon: Headphones,
  },
];

function FeatureSection() {
  return (
    <div className="bg-zinc-50 text-zinc-900 dark:bg-black dark:text-white overflow-hidden">
      <AnimatedSection id="features" className="py-28 bg-zinc-100 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-yellow-500 font-semibold mb-4">WHY ALLRIDE</p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 text-center">
              Built for Modern Transportation
            </h2>

            <p className="text-zinc-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              Experience premium ride-sharing with powerful features for riders,
              drivers, and fleet management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="p-8 rounded-[32px] bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:shadow-2xl border border-zinc-200 dark:border-white/10 transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-6">
                    <Icon
                      className="w-7 h-7 text-yellow-600 dark:text-yellow-500"
                      strokeWidth={2}
                      aria-hidden
                    />
                  </div>

                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>

                  <p className="text-zinc-500 dark:text-gray-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}

export default FeatureSection;