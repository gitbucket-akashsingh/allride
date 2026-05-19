import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "/src/assets/allride-logo.png";

function Navbar() {
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

  const navigate = useNavigate();

  return (
    <>
      <div className=" bg-black text-white overflow-hidden">
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
      </div>
    </>
  );
}

export default Navbar;
