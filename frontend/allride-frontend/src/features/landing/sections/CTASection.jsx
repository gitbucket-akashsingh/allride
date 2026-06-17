import { scrollToSection } from "@/shared/utils/scrollToSection";
import AnimatedSection from "@/features/landing/components/AnimatedSection";

function CTASection() {

  const handleDownloadApp = () => {
    scrollToSection("download-app");
  };
  
  return (
    <div className="bg-zinc-100 text-zinc-900 dark:bg-zinc-950 dark:text-white overflow-hidden">
      <AnimatedSection
        id="cta"
        className="py-28 relative overflow-hidden
          bg-gradient-to-br from-amber-50/80 via-zinc-100 to-blue-50/60
          dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900"
      >
        {/* Yellow + blue glow — same language as DownloadSection */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500/20 dark:bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.08),transparent_45%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.12),transparent_40%)]" />

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <p className="text-yellow-600 dark:text-yellow-400 font-semibold mb-4 tracking-wide">
            GET STARTED
          </p>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight mb-8">
            Ready to Ride with{" "}
            <span className="text-yellow-500">AllRide</span>?
          </h2>

          <p className="text-xl text-zinc-600 dark:text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
            Download the app and experience fast, reliable, and premium
            ride-sharing.
          </p>

          <div className="flex flex-wrap justify-center gap-5">
            <button 
            type="button"
            onClick={handleDownloadApp}
            className="px-8 py-4 rounded-2xl bg-yellow-500 text-black font-bold hover:scale-105 transition-transform duration-300 shadow-2xl hover:shadow-yellow-500/25">
              Download App
            </button>

            {/* <button className="px-8 py-4 rounded-2xl border border-zinc-300 dark:border-zinc-600 text-zinc-800 dark:text-white hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 font-semibold">
              Become a Partner
            </button> */}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}

export default CTASection;