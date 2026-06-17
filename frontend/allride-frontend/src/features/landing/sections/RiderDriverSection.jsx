import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";
import { getRedirectPathByRole } from "@/features/auth/utils/roleRedirect";
import AnimatedSection from "@/features/landing/components/AnimatedSection";
import { User, Car, Check } from "lucide-react";

function FeatureCheck({ children }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-7 h-7 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
        <Check className="w-3.5 h-3.5 text-green-600 dark:text-green-400" strokeWidth={2.5} aria-hidden />
      </div>
      <span className="text-zinc-600 dark:text-gray-300">{children}</span>
    </div>
  );
}

function RiderDriverSection() {

  // const { goToRider, goToDriver } = useRoleAction();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const handleRiderAction = () => {
    if (!isAuthenticated) {
      navigate("/signup?role=rider");
      return;
    }
    else if ((user.role?.toUpperCase()) === "RIDER") {
      navigate(getRedirectPathByRole(user.role?.toUpperCase()));
      return;
    }
    navigate("/signup/switch-role?target=rider");
    
  };


  const handleDriverAction = () => {
    if (!isAuthenticated) {
      navigate("/signup?role=driver");
      return;
    }
    if ((user.role?.toUpperCase()) === "DRIVER") {
      navigate(getRedirectPathByRole(user.role?.toUpperCase()));
      return;
    }
    navigate("/signup/switch-role?target=driver");
   
  };

  return (
    <div className="bg-white text-zinc-900 dark:bg-black dark:text-white overflow-hidden">
      <AnimatedSection id="drivers" className="py-28 bg-zinc-50 dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-20">
            <p className="text-yellow-400 font-semibold mb-4">
              BUILT FOR EVERYONE
            </p>

            <h2 className="text-3xl sm:text-5xl font-black mb-6">
              One Platform for Riders & Drivers
            </h2>

            <p className="text-zinc-500 dark:text-gray-400 max-w-3xl mx-auto text-lg">
              AllRide provides a seamless experience for passengers and drivers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-[36px] border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 p-8 lg:p-10 shadow-2xl">
              <div className="w-16 h-16 rounded-3xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-3xl mb-8">
              <User
    className="w-8 h-8 text-yellow-600 dark:text-yellow-400"
    strokeWidth={2}
    aria-hidden
  />
              </div>

              <p className="text-yellow-400 font-semibold mb-4">FOR RIDERS</p>

              <h3 className="text-3xl lg:text-4xl font-black mb-6 leading-tight">
                Book rides instantly with smart tracking.
              </h3>

              <p className="text-zinc-500 dark:text-gray-400 leading-relaxed mb-8 text-lg">
                Experience smooth ride booking, live tracking, and secure
                payments.
              </p>

              <div className="space-y-4 mb-10">
                  <FeatureCheck>Real-time GPS tracking</FeatureCheck>
                  <FeatureCheck>Quick ride booking</FeatureCheck>
                  <FeatureCheck>Secure digital payments</FeatureCheck>
              </div>

              <button 
              type="button"
              onClick={handleRiderAction}
              className="px-8 py-4 rounded-2xl bg-yellow-500 text-black font-bold hover:scale-105 transition-transform duration-300 shadow-2xl">
                Ride with AllRide
              </button>
            </div>

            <div className="rounded-[36px] border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 p-8 lg:p-10 shadow-2xl">
              <div className="w-16 h-16 rounded-3xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-3xl mb-8">
              <Car
    className="w-8 h-8 text-blue-600 dark:text-blue-400"
    strokeWidth={2}
    aria-hidden
  />
              </div>

              <p className="text-blue-400 font-semibold mb-4">FOR DRIVERS</p>

              <h3 className="text-3xl lg:text-4xl font-black mb-6 leading-tight">
                Earn more with flexible driving opportunities.
              </h3>

              <p className="text-zinc-500 dark:text-gray-400 leading-relaxed mb-8 text-lg">
                Manage rides, bookings, earnings, and trip analytics from one platform.
              </p>

              <div className="space-y-4 mb-10">
                 <FeatureCheck>Live earnings dashboard</FeatureCheck>
                 <FeatureCheck>Flexible working hours</FeatureCheck>
                 <FeatureCheck>Instant ride notifications</FeatureCheck>
              </div>

              <button 
              type="button"
              onClick={handleDriverAction}
              className="px-8 py-4 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-black font-bold hover:scale-105 transition-transform duration-300 shadow-2xl">
                Become a Driver
              </button>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}

export default RiderDriverSection;
