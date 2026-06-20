import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToSection } from "@/shared/utils/scrollToSection";

// import Navbar from "@/features/landing/sections/Navbar.jsx";
import HeroSection from "@/features/landing/sections/HeroSection.jsx";
import FeaturesSection from "@/features/landing/sections/FeaturesSection.jsx";
import RiderDriverSection from "@/features/landing/sections/RiderDriverSection.jsx";
import CTASection from "@/features/landing/sections/CTASection.jsx";
import DownloadSection from "@/features/landing/sections/DownloadSection.jsx";
import LiveTrackingSection from "@/features/landing/sections/LiveTrackingSection.jsx";
// import Footer from "@/features/landing/sections/Footer.jsx";

import AiFeaturesSection from "@/features/landing/sections/AiFeaturesSection.jsx";


function LandingPage() {

  const location = useLocation();
  useEffect(() => {
    // From navbar: navigate("/", { state: { scrollTo: "download-app" } })
    // Or from URL hash: /#download-app
    const sectionId =
      location.state?.scrollTo ||
      (location.hash ? location.hash.replace("#", "") : null);
    if (!sectionId) return;
    // Wait for sections to mount in the DOM
    const timer = setTimeout(() => {
      scrollToSection(sectionId);
    }, 50);
    return () => clearTimeout(timer);
  }, [location.pathname, location.hash, location.state]);


  return (
    <>
   
      {/* <Navbar /> */}
      <HeroSection />
      <FeaturesSection />
      <AiFeaturesSection />
      <RiderDriverSection />
      <CTASection />
      <DownloadSection />
      <LiveTrackingSection />
      {/* <Footer />   */}
     
    </>
  );
}

export default LandingPage;
