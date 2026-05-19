import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/allride-logo.png";
import hero1 from "../assets/images/hero1.png";
import hero2 from "../assets/images/hero2.png";
import hero3 from "../assets/images/hero3.png";
import phone1 from "../assets/images/phone1.png";
import Driver_image from "../assets/images/Driver_image.png";
import map_image from "../assets/images/map_image.png";

import HeroSlider from "../components/sections/hero/HeroSlider.jsx";

export default function AllRideLandingPage() {
  const heroImages = [hero1, hero2, hero3];

  const navigate = useNavigate();

  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const features = [
    {
      title: "Live Ride Tracking",
      desc: "Track rides in real-time with GPS support.",
    },
    {
      title: "Fast Booking",
      desc: "Book rides instantly with smooth experience.",
    },
    {
      title: "Driver Earnings",
      desc: "Drivers can monitor trips and earnings.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4">
          <div className="backdrop-blur-2xl bg-white/5 border border-white/10 shadow-2xl rounded-3xl px-6 py-4 flex items-center justify-between">
            {/* LOGO */}
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-11 h-11 rounded-2xl bg-black text-white flex items-center justify-center text-lg font-black shadow-lg">
                <img
                  src={logo}
                  alt="App Logo"
                  style={{ width: "32px", height: "32px" }}
                />
              </div>

              <div>
                <h1 className="text-2xl font-black tracking-tight leading-none">
                  AllRide
                </h1>

                <p className="text-xs text-gray-400 mt-1">
                  Smart Ride Platform
                </p>
              </div>
            </div>

            {/* NAV LINKS */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-gray-300">
              <a
                href="#features"
                className="hover:text-yellow-500 transition duration-300"
              >
                Features
              </a>

              <a
                href="#drivers"
                className="hover:text-yellow-500 transition duration-300"
              >
                Drivers
              </a>

              <a
                href="#download"
                className="hover:text-yellow-500 transition duration-300"
              >
                Download App
              </a>

              <a
                href="#support"
                className="hover:text-yellow-500 transition duration-300"
              >
                Support
              </a>
            </nav>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-3">
              {/* THEME TOGGLE */}
              <button
                onClick={toggleTheme}
                className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
              >
                {theme === "dark" ? "🌙" : "☀️"}
              </button>

              <button
                onClick={() => navigate("/login")}
                className="hidden sm:flex px-5 py-2.5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 font-semibold text-white"
              >
                Login
              </button>

              <button className="px-5 py-2.5 rounded-2xl bg-black text-white hover:bg-gray-800 transition-all duration-300 font-semibold shadow-xl hover:-translate-y-0.5">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-black via-zinc-950 to-zinc-900 pt-32 lg:pt-24 pb-12 lg:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-[35%_65%] gap-10 lg:gap-12 items-center">
          {/* LEFT SIDE */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-semibold mb-6">
              Ride Smarter With AllRide
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight tracking-tight mb-6 text-center lg:text-left">
              Go Anywhere
              <br />
              with <span className="text-yellow-500">AllRide</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-xl mb-10 text-center lg:text-left mx-auto lg:mx-0">
              Book rides, drive and earn, track trips live, and manage
              transportation effortlessly with a modern ride-sharing platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start">
              <button className="px-8 py-4 rounded-2xl bg-black text-white font-semibold shadow-xl hover:-translate-y-1 hover:bg-gray-800 transition-all duration-300">
                Book Ride
              </button>

              <button className="px-8 py-4 rounded-2xl border border-black font-semibold hover:bg-black hover:text-white transition-all duration-300">
                Become Driver
              </button>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 text-center lg:text-left">
              <div>
                <h3 className="text-3xl font-black">10K+</h3>
                <p className="text-gray-500 text-sm mt-1">Daily Rides</p>
              </div>

              <div>
                <h3 className="text-3xl font-black">5K+</h3>
                <p className="text-gray-500 text-sm mt-1">Drivers</p>
              </div>

              <div>
                <h3 className="text-3xl font-black">50+</h3>
                <p className="text-gray-500 text-sm mt-1">Cities</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative">
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-yellow-300/30 rounded-full blur-3xl"></div>

            <div className="relative bg-zinc-900 rounded-[28px] lg:rounded-[40px] shadow-2xl border border-white/10 overflow-hidden">
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
              <div className="absolute z-1 bottom-4 right-4 lg:bottom-6 lg:right-6 bg-zinc-950/90 backdrop-blur-xl shadow-2xl rounded-3xl p-4 lg:p-5 border border-white/10 w-56 sm:w-72">
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-28 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-yellow-500 font-semibold mb-4">WHY ALLRIDE</p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 text-center">
              Built for Modern Transportation
            </h2>

            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Experience premium ride-sharing with powerful features for riders,
              drivers, and fleet management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Live Ride Tracking",
                desc: "Track rides in real-time with advanced GPS navigation.",
              },
              {
                title: "Fast Booking",
                desc: "Book rides instantly with smooth one-tap experience.",
              },
              {
                title: "Driver Earnings",
                desc: "Drivers can monitor trips, earnings, and performance.",
              },
              {
                title: "Secure Payments",
                desc: "Integrated payment systems for seamless transactions.",
              },
              {
                title: "Fleet Management",
                desc: "Manage vehicles, rides, and analytics efficiently.",
              },
              {
                title: "24/7 Support",
                desc: "Reliable customer support for riders and drivers.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-8 rounded-[32px] bg-zinc-900 hover:bg-zinc-800 hover:shadow-2xl border border-white/10 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center text-2xl mb-6">
                  🚖
                </div>

                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>

                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DRIVER & RIDER SECTION */}
      <section id="drivers" className="py-28 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-20">
            <p className="text-yellow-400 font-semibold mb-4">
              BUILT FOR EVERYONE
            </p>

            <h2 className="text-3xl sm:text-5xl font-black mb-6">
              One Platform for Riders & Drivers
            </h2>

            <p className="text-gray-400 max-w-3xl mx-auto text-lg">
              AllRide provides a seamless experience for passengers and drivers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-[36px] border border-white/10 bg-zinc-900 p-8 lg:p-10 shadow-2xl">
              <div className="w-16 h-16 rounded-3xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-3xl mb-8">
                🚕
              </div>

              <p className="text-yellow-400 font-semibold mb-4">FOR RIDERS</p>

              <h3 className="text-3xl lg:text-4xl font-black mb-6 leading-tight">
                Book rides instantly with smart tracking.
              </h3>

              <p className="text-gray-400 leading-relaxed mb-8 text-lg">
                Experience smooth ride booking, live tracking, and secure
                payments.
              </p>

              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-7 h-7 rounded-full bg-green-500/20 flex items-center justify-center text-sm">
                    ✓
                  </div>
                  <span className="text-gray-300">Real-time GPS tracking</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-7 h-7 rounded-full bg-green-500/20 flex items-center justify-center text-sm">
                    ✓
                  </div>
                  <span className="text-gray-300">Quick ride booking</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-7 h-7 rounded-full bg-green-500/20 flex items-center justify-center text-sm">
                    ✓
                  </div>
                  <span className="text-gray-300">Secure digital payments</span>
                </div>
              </div>

              <button className="px-8 py-4 rounded-2xl bg-yellow-500 text-black font-bold hover:scale-105 transition-transform duration-300 shadow-2xl">
                Ride with AllRide
              </button>
            </div>

            <div className="rounded-[36px] border border-white/10 bg-zinc-900 p-8 lg:p-10 shadow-2xl">
              <div className="w-16 h-16 rounded-3xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-3xl mb-8">
                🚘
              </div>

              <p className="text-blue-400 font-semibold mb-4">FOR DRIVERS</p>

              <h3 className="text-3xl lg:text-4xl font-black mb-6 leading-tight">
                Earn more with flexible driving opportunities.
              </h3>

              <p className="text-gray-400 leading-relaxed mb-8 text-lg">
                Manage rides, earnings, and trip analytics from one platform.
              </p>

              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-7 h-7 rounded-full bg-green-500/20 flex items-center justify-center text-sm">
                    ✓
                  </div>
                  <span className="text-gray-300">Live earnings dashboard</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-7 h-7 rounded-full bg-green-500/20 flex items-center justify-center text-sm">
                    ✓
                  </div>
                  <span className="text-gray-300">Flexible working hours</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-7 h-7 rounded-full bg-green-500/20 flex items-center justify-center text-sm">
                    ✓
                  </div>
                  <span className="text-gray-300">
                    Instant ride notifications
                  </span>
                </div>
              </div>

              <button className="px-8 py-4 rounded-2xl bg-white text-black font-bold hover:scale-105 transition-transform duration-300 shadow-2xl">
                Become a Driver
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section
        id="download"
        className="py-28 bg-black text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,white,transparent_40%)]"></div>

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight mb-8">
            Ready to Ride with AllRide?
          </h2>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
            Download the app and experience fast, reliable, and premium
            ride-sharing.
          </p>

          <div className="flex flex-wrap justify-center gap-5">
            <button className="px-8 py-4 rounded-2xl bg-yellow-500 text-black font-bold hover:scale-105 transition-transform duration-300 shadow-2xl">
              Download App
            </button>

            <button className="px-8 py-4 rounded-2xl border border-gray-500 hover:bg-white hover:text-black transition-all duration-300 font-semibold">
              Become a Partner
            </button>
          </div>
        </div>
      </section>

      {/* APP DOWNLOAD SECTION */}
      <section className="py-28 bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* LEFT CONTENT */}
            <div>
              <p className="text-yellow-400 font-semibold mb-4">DOWNLOAD APP</p>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-8">
                Your Ride.
                <br />
                Anytime. Anywhere.
              </h2>

              <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mb-10">
                Download the AllRide mobile app to book rides, track drivers,
                manage trips, and experience seamless transportation directly
                from your smartphone.
              </p>

              <div className="flex flex-col sm:flex-row gap-5">
                <button className="flex items-center justify-center gap-4 px-7 py-4 rounded-2xl bg-white text-black hover:scale-105 transition-transform duration-300 shadow-2xl font-semibold">
                  <span className="text-3xl"></span>

                  <div className="text-left">
                    <p className="text-xs font-medium">Download on the</p>
                    <h3 className="text-lg font-black leading-none">
                      App Store
                    </h3>
                  </div>
                </button>

                <button className="flex items-center justify-center gap-4 px-7 py-4 rounded-2xl bg-green-500 text-black hover:scale-105 transition-transform duration-300 shadow-2xl font-semibold">
                  <span className="text-3xl">▶</span>

                  <div className="text-left">
                    <p className="text-xs font-medium">Get it on</p>
                    <h3 className="text-lg font-black leading-none">
                      Google Play
                    </h3>
                  </div>
                </button>
              </div>
            </div>

            {/* RIGHT PHONE MOCKUP */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-[320px] sm:w-[380px] h-[650px] rounded-[48px] bg-black border border-white/10 shadow-[0_0_80px_rgba(255,255,255,0.08)] overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-8 bg-zinc-900 rounded-b-3xl z-20"></div>

                <img
                  src={phone1}
                  alt="AllRide App"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>

                <div className="absolute bottom-8 left-6 right-6 z-10">
                  <div className="bg-zinc-950/80 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-2xl">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-gray-400 text-sm">Ride Status</p>
                        <h3 className="text-xl font-bold">Driver Arriving</h3>
                      </div>

                      <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse"></div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>ETA</span>
                      <span className="text-white font-semibold">4 mins</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE MAP SECTION */}
      <motion.section
        id="live-map"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="py-28 bg-black relative overflow-hidden"
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

            <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
              Experience real-time driver tracking, live ride updates, and smart
              transportation intelligence with AllRide.
            </p>
          </div>

          {/* Map Container */}
          {/* <div className="relative w-full h-[450px] sm:h-[600px] lg:h-[750px] rounded-[40px] overflow-hidden border border-white/10 bg-zinc-900 shadow-[0_0_80px_rgba(255,255,255,0.08)]"> */}
          <div className="relative w-full h-fit rounded-[40px] overflow-hidden border border-white/10 bg-zinc-900 shadow-[0_0_80px_rgba(255,255,255,0.08)]">
            {/* MAP IMAGE */}
            <img
              src={map_image}
              alt="AllRide Live Map"
              // className="w-full h-full object-cover"
              className="w-full h-auto object-contain"
              loading="lazy"
            />

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>

            {/* DRIVER INFO CARD */}
            {/* <div className="absolute top-6 left-6 bg-zinc-950/90 backdrop-blur-xl border border-white/10 rounded-3xl p-5 w-72 shadow-2xl">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={Driver_image}
                  alt="Driver"
                  className="w-14 h-14 rounded-2xl object-cover"
                />

                <div>
                  <h3 className="font-bold text-lg">Rohit Kumar</h3>

                  <p className="text-gray-400 text-sm">
                    Mercedes-Benz E-Class • TS 09 AB 5678
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>Arriving in</span>

                <span className="text-white font-semibold">4 mins</span>
              </div>
            </div> */}

            {/* LIVE BADGE */}
            {/* <div className="absolute bottom-6 right-6 bg-yellow-500 text-black rounded-3xl px-6 py-4 font-bold flex items-center gap-3 shadow-2xl">
              <div className="w-3 h-3 rounded-full bg-green-600 animate-pulse"></div>
              Ride Live
            </div> */}

            {/* LOCATION PINS */}
            {/* <div className="absolute top-1/3 left-1/2 w-6 h-6 rounded-full bg-red-500 border-4 border-white shadow-2xl animate-bounce"></div>

            <div className="absolute bottom-1/4 left-1/3 w-6 h-6 rounded-full bg-yellow-400 border-4 border-white shadow-2xl animate-pulse"></div> */}
          </div>
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer className="bg-black border-t border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-black">AllRide</h3>
            <p className="text-gray-500 mt-2">Modern ride-sharing platform.</p>
          </div>

          <div className="flex gap-8 text-gray-400 text-sm font-medium">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
