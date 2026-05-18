import Navbar from "/src/components/sections/Navbar.jsx";
import HeroSection from "/src/components/sections/HeroSection.jsx";
import FeaturesSection from "/src/components/sections/FeaturesSection.jsx";
import RiderDriverSection from "/src/components/sections/RiderDriverSection.jsx";
import DownloadSection from "/src/components/sections/DownloadSection.jsx";
import LiveTrackingSection from "/src/components/sections/LiveTrackingSection.jsx";
import Footer from "/src/components/sections/Footer.jsx";

function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <RiderDriverSection />
      <DownloadSection />
      <LiveTrackingSection />
      <Footer />
    </>
  );
}

export default LandingPage;
