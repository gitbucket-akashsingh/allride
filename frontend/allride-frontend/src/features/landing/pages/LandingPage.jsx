// import Navbar from "@/features/landing/sections/Navbar.jsx";
import HeroSection from "@/features/landing/sections/HeroSection.jsx";
import FeaturesSection from "@/features/landing/sections/FeaturesSection.jsx";
import RiderDriverSection from "@/features/landing/sections/RiderDriverSection.jsx";
import CTASection from "@/features/landing/sections/CTASection.jsx";
import DownloadSection from "@/features/landing/sections/DownloadSection.jsx";
import LiveTrackingSection from "@/features/landing/sections/LiveTrackingSection.jsx";
// import Footer from "@/features/landing/sections/Footer.jsx";

function LandingPage() {
  return (
    <>
      {/* <Navbar /> */}
      <HeroSection />
      <FeaturesSection />
      <RiderDriverSection />
      <CTASection />
      <DownloadSection />
      <LiveTrackingSection />
      {/* <Footer />   */}
    </>
  );
}

export default LandingPage;
