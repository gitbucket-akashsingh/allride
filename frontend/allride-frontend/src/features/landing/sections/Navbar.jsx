import { useNavigate, useLocation } from "react-router-dom";
import { NAV_LINKS } from "@/features/landing/constants/sectionIds";
import { scrollToSection } from "@/shared/utils/scrollToSection";
import { useState, useEffect, useRef } from "react";
import logo from "/src/assets/allride-logo.png";
import {Moon, Sun, User, Car, LayoutDashboard, LogOut, ChevronDown, } from "lucide-react";
import { useAuth } from "@/features/auth/context/AuthContext";

function Navbar() {
  const [theme, setTheme] = useState(() => {
    // Persist theme across refreshes
    return localStorage.getItem("allride-theme") || "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
    localStorage.setItem("allride-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const navigate = useNavigate();

  const location = useLocation();

  const handleLogoClick = () => {

    setShowDropdown(false);

    if (location.pathname === "/") {
      // Already on landing — scroll to top (hero)
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      if (location.hash) {
        navigate("/", { replace: true });
      }
      return;
    }
  
    // Other pages — go to landing (ScrollToTop resets scroll)
    navigate("/");
  };

const handleNavClick = (e, item) => {

  setShowDropdown(false);
  // Section links: /#features, /#drivers, /#download-app
  if (item.href.startsWith("/#")) {
    e.preventDefault();
    const sectionId = item.href.slice(2); // remove "/#"

    if (location.pathname === "/") {
      scrollToSection(sectionId);
    } else {
      navigate("/", { state: { scrollTo: sectionId } });
    }
    return;
  }

  // Route links: /support
  if (item.href.startsWith("/") && !item.href.includes("#")) {
    e.preventDefault();
    navigate(item.href);
  }
};

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!showDropdown) return;
  
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
  
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowDropdown(false);
      }
    };
    const onPointerDown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setShowDropdown(false);
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showDropdown]);

  useEffect(() => {
    setShowDropdown(false);
  }, [location.pathname]);

  // const { isAuthenticated, logout } = useAuth();
  const { isAuthenticated, logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isDark = theme === "dark";

  return (
    <>
      {/* NAVBAR */}
      <div className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4 pointer-events-none">

      <header
        // className="fixed top-0 left-0 w-full z-200"
        className="pointer-events-auto mx-auto max-w-7xl rounded-2xl border border-white/10 
               bg-black/40 backdrop-blur-xl shadow-2xl"
        style={{
          background: "var(--navbar-bg)",
          borderColor: "var(--navbar-border)",
          borderBottom: "1px solid var(--navbar-border)",
          backdropFilter: "blur(32px) saturate(180%)",
          WebkitBackdropFilter: "blur(32px) saturate(180%)",
          boxShadow: isDark
            ? "0 1px 40px rgba(0,0,0,0.6)"
            : "0 4px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(248,250,252,0.5)",
          transition: "background 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 24px",
          }}
        >
          {/* LOGO */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              cursor: "pointer",
            }}
            onClick={handleLogoClick}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: isDark ? "#000" : "#0f172a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
              }}
            >
              <img
                src={logo}
                alt="AllRide Logo"
                style={{ width: "28px", height: "28px" }}
              />
            </div>
            <div>
              <h1
                style={{
                  fontSize: "20px",
                  fontWeight: 900,
                  letterSpacing: "-0.5px",
                  margin: 0,
                  lineHeight: 1,
                  color: "var(--text-primary)",
                }}
              >
                AllRide
              </h1>
              <p
                style={{
                  fontSize: "10px",
                  color: "var(--text-secondary)",
                  margin: "2px 0 0 0",
                }}
              >
                Smart Ride Platform
              </p>
            </div>
          </div>

          {/* NAV LINKS */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "32px",
              fontSize: "13px",
              fontWeight: 600,
            }}
            className="hidden lg:flex"
          >
            {
            // [
            //   { label: "Features", href: "/#features" },
            //   { label: "Drivers", href: "/#drivers" },
            //   { label: "Download App", href: "/#download-app" },
            //   { label: "Support", href: "/support" },
            // ]
            NAV_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                style={{
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#f59e0b")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-secondary)")
                }
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* RIGHT ACTIONS */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* THEME TOGGLE */}
            <button
              onClick={toggleTheme}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "10px",
                border: "1px solid var(--border-color)",
                background: "var(--bg-card)",
                cursor: "pointer",
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
                color: "var(--text-primary)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--card-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "var(--bg-card)")
              }
            >
              {isDark ? (
  <Moon size={16} strokeWidth={2} />
) : (
  <Sun size={16} strokeWidth={2} />
)}
            </button>

            {/* NOT LOGGED IN */}
            {!isAuthenticated && (
              <>
                <button
                  onClick={() => {
                   setShowDropdown(false);
                   navigate("/login");
}}
                  style={{
                    padding: "8px 20px",
                    borderRadius: "10px",
                    border: "1px solid var(--border-color)",
                    background: "var(--bg-card)",
                    color: "var(--text-primary)",
                    fontWeight: 600,
                    fontSize: "13px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "var(--card-hover)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "var(--bg-card)")
                  }
                >
                  Login
                </button>

                {/* GET STARTED DROPDOWN */}
                <div ref={dropdownRef} style={{ position: "relative" }}>
                  <button
                    onClick={() => setShowDropdown((prev) => !prev)}
                    style={{
                      padding: "8px 20px",
                      borderRadius: "10px",
                      background: "linear-gradient(135deg, #f59e0b, #ef4444)",
                      color: "white",
                      fontWeight: 700,
                      fontSize: "13px",
                      border: "none",
                      cursor: "pointer",
                      boxShadow: "0 4px 14px rgba(245,158,11,0.35)",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "translateY(-1px)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "translateY(0)")
                    }
                  >
                    Get Started
                  </button>

                  {showDropdown && (
                    <div
                      style={{
                        position: "absolute",
                        right: 0,
                        top: "calc(100% + 8px)",
                        width: "200px",
                        borderRadius: "14px",
                        border: "1px solid var(--border-color)",
                        background: isDark ? "#1f2937" : "#ffffff",
                        backdropFilter: "blur(20px)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                        overflow: "hidden",
                        zIndex: 999,
                      }}
                    >
                      {[
  {
    icon: User,
    label: "Signup as Rider",
    role: "rider",
  },
  {
    icon: Car,
    label: "Signup as Driver",
    role: "driver",
  },
].map((item, i) => {
  const Icon = item.icon;
  return (
    <button
      key={item.role}
      onClick={() => {
        navigate(`/signup?role=${item.role}`);
        setShowDropdown(false);
      }}
      style={{
        width: "100%",
        padding: "14px 18px",
        background: "transparent",
        border: "none",
        borderTop: i > 0 ? "1px solid var(--border-color)" : "none",
        color: "var(--text-primary)",
        fontSize: "13px",
        fontWeight: 600,
        textAlign: "left",
        cursor: "pointer",
        transition: "background 0.15s",
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "var(--card-hover)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.background = "transparent")
      }
    >
      <Icon size={16} strokeWidth={2} />
      {item.label}
    </button>
  );
})}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* LOGGED IN */}
            {/* {isAuthenticated && (
              <button
                onClick={handleLogout}
                style={{
                  padding: "8px 20px",
                  borderRadius: "10px",
                  border: "1px solid var(--border-color)",
                  background: "var(--bg-card)",
                  color: "var(--text-primary)",
                  fontWeight: 600,
                  fontSize: "13px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(239,68,68,0.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "var(--bg-card)")
                }
              >
                LogOut
              </button>
            )} */}
            {/* ✅ AFTER: LOGGED IN */}
            {/* LOGGED IN - USER PROFILE DROPDOWN */}
            {isAuthenticated && (
              <div ref={dropdownRef} style={{ position: "relative" }}>
                {/* USER BUTTON */}
                <button
                  onClick={() => setShowDropdown((prev) => !prev)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "6px 12px 6px 6px",
                    borderRadius: "12px",
                    border: "1px solid var(--border-color)",
                    background: "var(--bg-card)",
                    color: "var(--text-primary)",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "var(--card-hover)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "var(--bg-card)")
                  }
                >
                  {/* AVATAR ICON */}
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "8px",
                      background: "linear-gradient(135deg, #f59e0b, #ef4444)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: 800,
                      fontSize: "12px",
                    }}
                  >
                    {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
                  </div>

                  <span style={{ fontWeight: 600, fontSize: "13px" }}>
                    {user?.fullName || "User"}
                  </span>

                  <span
                    style={{
                      fontSize: "10px",
                      color: "var(--text-secondary)",
                      marginLeft: "4px",
                    }}
                  >
                    <ChevronDown size={14} strokeWidth={2} style={{ color: "var(--text-secondary)" }} />
                  </span>
                </button>

                {/* DROPDOWN MENU */}
                {showDropdown && (
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "calc(100% + 8px)",
                      width: "200px",
                      borderRadius: "14px",
                      border: "1px solid var(--border-color)",
                      background: isDark ? "#1f2937" : "#ffffff",
                      backdropFilter: "blur(20px)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                      overflow: "hidden",
                      zIndex: 999,
                    }}
                  >
                    {/* DASHBOARD OPTION */}
                    <button
                      onClick={() => {
                        const role = user?.role?.toUpperCase();
                        if (role === "DRIVER") navigate("/driver/home");
                        else if (role === "ADMIN") navigate("/admin/home");
                        else navigate("/rider/home");
                        setShowDropdown(false);
                      }}
                      style={{
                        width: "100%",
                        padding: "14px 18px",
                        background: "transparent",
                        border: "none",
                        color: "var(--text-primary)",
                        fontSize: "13px",
                        fontWeight: 600,
                        textAlign: "left",
                        cursor: "pointer",
                        transition: "background 0.15s",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "var(--card-hover)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      <LayoutDashboard size={16} strokeWidth={2} />
                      Dashboard
                    </button>

                    {/* PROFILE OPTION */}
                    <button
                      onClick={() => {
                        const role = user?.role?.toUpperCase();
                        if (role === "DRIVER") navigate("/driver/profile");
                        else navigate("/rider/profile");
                        setShowDropdown(false);
                      }}
                      style={{
                        width: "100%",
                        padding: "14px 18px",
                        background: "transparent",
                        border: "none",
                        borderTop: "1px solid var(--border-color)",
                        color: "var(--text-primary)",
                        fontSize: "13px",
                        fontWeight: 600,
                        textAlign: "left",
                        cursor: "pointer",
                        transition: "background 0.15s",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "var(--card-hover)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      <span style={{ fontSize: "16px" }}>👤</span> Profile
                    </button>

                    {/* LOGOUT OPTION */}
                    <button
                      onClick={() => {
                        handleLogout();
                        setShowDropdown(false);
                      }}
                      style={{
                        width: "100%",
                        padding: "14px 18px",
                        background: "transparent",
                        border: "none",
                        borderTop: "1px solid var(--border-color)",
                        color: "#ef4444",
                        fontSize: "13px",
                        fontWeight: 600,
                        textAlign: "left",
                        cursor: "pointer",
                        transition: "background 0.15s",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background =
                          "rgba(239,68,68,0.1)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      <LogOut size={16} strokeWidth={2} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
     </div>
      {/* Spacer so page content doesn't hide under fixed navbar */}
      <div style={{ height: "64px" }} />
    </>
  );
}

export default Navbar;
