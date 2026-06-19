// import { showComingSoon } from "@/shared/utils/featureToast";
// import FeatureBadge from "@/shared/ui/FeatureBadge";

import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";
import { getRedirectPathByRole } from "@/features/auth/utils/roleRedirect";
import HeroSlider from "@/features/landing/components/HeroSlider";


function HeroSection() {

  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const handleBookRide = () => {
    if (!isAuthenticated) {
      navigate("/signup?role=rider");
      return;
    }
    if (user.role?.toUpperCase() === "RIDER") {
      navigate("/rider/book"); // ← book page, not /rider/home
      return;
    }
    navigate("/signup/switch-role?target=rider");
  };
  const handleBecomeDriver = () => {
    if (!isAuthenticated) {
      navigate("/signup?role=driver");
      return;
    }
    if (user.role?.toUpperCase() === "DRIVER") {
      navigate(getRedirectPathByRole("DRIVER"));
      return;
    }
    navigate("/signup/switch-role?target=driver");
  };
  
  return (
    <>
      <div className="min-h-screen bg-white text-zinc-900 dark:bg-black dark:text-white overflow-hidden">
        <section id="hero" className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-50 via-white to-zinc-100 dark:from-black dark:via-zinc-950 dark:to-zinc-900 pt-32 lg:pt-24 pb-12 lg:pb-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-[35%_65%] gap-10 lg:gap-12 items-center">
            {/* LEFT SIDE */}
            <div>
              {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-semibold mb-6">
                Ride Smarter With AllRide
              </div> */}

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight tracking-tight mb-6 text-center lg:text-left">
                Go Anywhere
                <br />
                with <span className="text-yellow-500">AllRide</span>
              </h1>

              <p className="text-base sm:text-lg text-zinc-500 dark:text-gray-400 leading-relaxed max-w-xl mb-10 text-center lg:text-left mx-auto lg:mx-0">
                Book rides, drive and earn, track trips live, and manage
                transportation effortlessly with a modern ride-sharing platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start">
                <button
                type="button"
                onClick={handleBookRide}
                  // onClick={() => showComingSoon("Ride booking")}
                  className="px-8 py-4 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-semibold shadow-xl hover:-translate-y-1 hover:bg-gray-800 dark:hover:bg-zinc-100 transition-all duration-300"                >
                  Book Ride
                  {/* <FeatureBadge text="Coming Soon" /> */}
                </button>

                <button 
                type="button"
                onClick={handleBecomeDriver}
                className="px-8 py-4 rounded-2xl border border-zinc-800 dark:border-white font-semibold text-zinc-900 dark:text-white hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300">
                  Become Driver
                </button>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 text-center lg:text-left">
                <div>
                  <h3 className="text-3xl font-black">10K+</h3>
                  <p className="text-zinc-400 dark:text-gray-500 text-sm mt-1">Daily Rides</p>
                </div>

                <div>
                  <h3 className="text-3xl font-black">5K+</h3>
                  <p className="text-zinc-400 dark:text-gray-500 text-sm mt-1">Drivers</p>
                </div>

                <div>
                  <h3 className="text-3xl font-black">50+</h3>
                  <p className="text-zinc-400 dark:text-gray-500 text-sm mt-1">Cities</p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="relative">
              <div className="absolute -top-10 -right-10 w-72 h-72 bg-yellow-300/30 rounded-full blur-3xl"></div>

              <div className="relative bg-zinc-100 dark:bg-zinc-900 rounded-[28px] lg:rounded-[40px] shadow-2xl border border-zinc-200 dark:border-white/10 overflow-hidden">
                <HeroSlider />

                {/* <div className="grid grid-cols-2 gap-2 p-2 h-[380px] sm:h-[500px] lg:h-[700px]">
              <HeroSlider />
                <img
                  src={heroImages[0]}
                  alt="AllRide Rider"
                  className="w-full h-full object-cover rounded-[30px]"
                />

                <div className="grid grid-rows-2 gap-2">
                  <img
                    src={heroImages[1]}
                    alt="AllRide Driver"
                    className="w-full h-full object-cover rounded-[30px]"
                  />

                  <img
                    src={heroImages[2]}
                    alt="AllRide Tracking"
                    className="w-full h-full object-cover rounded-[30px]"
                  />
                </div>
              </div> */}

                {/* FLOATING CARD */}
                {/* <div className="absolute z-1 bottom-4 right-4 lg:bottom-6 lg:right-6 bg-zinc-950/90 backdrop-blur-xl shadow-2xl rounded-3xl p-4 lg:p-5 border border-white/10 w-56 sm:w-72">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-lg">Ride in Progress</h4>
                      <p className="text-sm text-gray-400">
                        Hyderabad Airport → Google
                      </p>
                    </div>

                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">ETA</span>
                    <span className="font-semibold">6 mins</span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default HeroSection;
