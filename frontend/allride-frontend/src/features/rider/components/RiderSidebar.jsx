import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";

const navItems = [
  { icon: "🏠", label: "Home", path: "/rider/home" },
  { icon: "🗺️", label: "Book a Ride", path: "/rider/book" },
  { icon: "📋", label: "Ride History", path: "/rider/history" },
  { icon: "📍", label: "Track Ride", path: "/rider/tracking" },
  { icon: "💳", label: "Payments", path: "/rider/payments" },
  { icon: "👤", label: "Profile", path: "/rider/profile" },
];

const RiderSidebar = ({ collapsed, onToggle, navbarHeight = 88 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside
      style={{
        width: collapsed ? "72px" : "260px",
        height: `calc(100vh - ${navbarHeight}px)`,
        background: "linear-gradient(180deg, #0a0a0a 0%, #111827 100%)",
        borderRight: "1px solid rgba(255,255,255,0.07)",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)",
        position: "fixed",
        top: `${navbarHeight}px`,
        left: 0,
        zIndex: 100,
        overflow: "hidden",
        boxShadow: "4px 0 24px rgba(0,0,0,0.4)",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          padding: collapsed ? "20px 0" : "20px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          gap: "12px",
        }}
      >
        {!collapsed && (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #f59e0b, #ef4444)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                fontWeight: 900,
                color: "white",
                flexShrink: 0,
              }}
            >
              {user?.name?.charAt(0)?.toUpperCase() || "R"}
            </div>
            <div>
              <p
                style={{
                  color: "white",
                  fontSize: "14px",
                  fontWeight: 700,
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                {user?.name || "Rider"}
              </p>
              <p
                style={{
                  color: "#9ca3af",
                  fontSize: "11px",
                  margin: 0,
                  marginTop: "2px",
                }}
              >
                {user?.email || "rider@allride.com"}
              </p>
            </div>
          </div>
        )}

        {collapsed && (
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #f59e0b, #ef4444)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              fontWeight: 900,
              color: "white",
            }}
          >
            {user?.name?.charAt(0)?.toUpperCase() || "R"}
          </div>
        )}

        <button
          onClick={onToggle}
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            color: "white",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "14px",
            flexShrink: 0,
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.target.style.background = "rgba(255,255,255,0.12)")
          }
          onMouseLeave={(e) =>
            (e.target.style.background = "rgba(255,255,255,0.06)")
          }
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>

      {/* NAV ITEMS */}
      <nav
        style={{
          flex: 1,
          padding: "12px 8px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              title={collapsed ? item.label : ""}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: collapsed ? "12px 0" : "12px 14px",
                justifyContent: collapsed ? "center" : "flex-start",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                width: "100%",
                background: isActive
                  ? "linear-gradient(135deg, rgba(245,158,11,0.2), rgba(239,68,68,0.15))"
                  : "transparent",
                borderLeft: isActive
                  ? "3px solid #f59e0b"
                  : "3px solid transparent",
                color: isActive ? "#f59e0b" : "#9ca3af",
                fontSize: "15px",
                fontWeight: isActive ? 700 : 500,
                transition: "all 0.2s ease",
                textAlign: "left",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.color = "white";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#9ca3af";
                }
              }}
            >
              <span style={{ fontSize: "20px", flexShrink: 0 }}>
                {item.icon}
              </span>
              {!collapsed && (
                <span style={{ fontSize: "14px" }}>{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* FOOTER LOGOUT */}
      <div
        style={{
          padding: "12px 8px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* <button
          onClick={handleLogout}
          title={collapsed ? "Logout" : ""}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: collapsed ? "12px 0" : "12px 14px",
            justifyContent: collapsed ? "center" : "flex-start",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            width: "100%",
            background: "transparent",
            color: "#ef4444",
            fontSize: "14px",
            fontWeight: 600,
            transition: "all 0.2s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(239,68,68,0.1)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
        >
          <span style={{ fontSize: "20px", flexShrink: 0 }}>🚪</span>
          {!collapsed && <span>Logout</span>}
        </button> */}
      </div>
    </aside>
  );
};

export default RiderSidebar;
