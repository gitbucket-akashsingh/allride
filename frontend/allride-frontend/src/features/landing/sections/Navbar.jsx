import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "/src/assets/allride-logo.png";
import { useAuth } from "@/features/auth/context/AuthContext";

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

  const [showDropdown, setShowDropdown] = useState(false);

  // GET AUTH DATA
  const { isAuthenticated, logout } = useAuth();

  // LOGOUT HANDLER
  const handleLogout = () => {
    logout();

    // redirect to home page
    navigate("/");
  };

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

                {/* IF USER NOT LOGGED IN */}
                {!isAuthenticated && (
                  <>
                    <button
                      onClick={() => navigate("/login")}
                      className="hidden sm:flex px-5 py-2.5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 font-semibold text-white"
                    >
                      Login
                    </button>

                    {/* <button
                      onClick={() => navigate("/signup")}
                      className="px-5 py-2.5 rounded-2xl bg-black text-white hover:bg-gray-800 transition-all duration-300 font-semibold shadow-xl hover:-translate-y-0.5"
                    >
                      SignUp
                    </button> */}
                    {/* GET STARTED DROPDOWN */}
                    <div className="relative">
                      <button
                        onClick={() => setShowDropdown((prev) => !prev)}
                        className="px-5 py-2.5 rounded-2xl bg-black text-white hover:bg-gray-800 transition-all duration-300 font-semibold shadow-xl hover:-translate-y-0.5"
                      >
                        Get Started
                      </button>

                      {/* DROPDOWN MENU */}
                      {showDropdown && (
                        <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-white/10 bg-zinc-900 backdrop-blur-xl shadow-2xl overflow-hidden z-50">
                          {/* SIGNUP AS RIDER */}
                          <button
                            onClick={() => {
                              navigate("/signup?role=rider");
                              setShowDropdown(false);
                            }}
                            className="w-full text-left px-5 py-4 hover:bg-white/10 transition text-white font-medium"
                          >
                            🚕 Signup as Rider
                          </button>

                          {/* SIGNUP AS DRIVER */}
                          <button
                            onClick={() => {
                              navigate("/signup?role=driver");
                              setShowDropdown(false);
                            }}
                            className="w-full text-left px-5 py-4 hover:bg-white/10 transition text-white font-medium border-t border-white/10"
                          >
                            🚖 Signup as Driver
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* IF USER LOGGED IN */}
                {isAuthenticated && (
                  <button
                    onClick={handleLogout}
                    className="hidden sm:flex px-5 py-2.5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 font-semibold text-white"
                  >
                    LogOut
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}

export default Navbar;
