import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";
import SidebarBrand from "@/shared/components/SidebarBrand";
import { Home, LayoutDashboard, IndianRupee, History, User } from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", path: "/driver/home" },
  { icon: LayoutDashboard, label: "Dashboard", path: "/driver/dashboard" },
  { icon: IndianRupee, label: "Earnings", path: "/driver/earnings" },
  { icon: History, label: "Trip History", path: "/driver/history" },
  { icon: User, label: "Profile", path: "/driver/profile" },
];

const DriverSidebar = ({ collapsed, onToggle}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const displayName = user?.fullName || "Driver";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <aside
    className="app-sidebar fixed top-0 left-0 h-screen z-[100] flex flex-col overflow-hidden transition-[width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
    style={{ width: collapsed ? 72 : 260 }}
  >
      <SidebarBrand collapsed={collapsed} />
      {/* HEADER */}
      <div
        style={{
          padding: collapsed ? "20px 0" : "20px 16px",
          borderBottom: "1px solid var(--sidebar-border)",
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
                background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                fontWeight: 900,
                color: "white",
                flexShrink: 0,
              }}
            >
              {initial}
            </div>
            <div>
            <p style={{ color: "var(--text-primary)", fontSize: "14px", fontWeight: 700, margin: 0 }}>
  {displayName}
</p>
<p style={{ color: "var(--text-secondary)", fontSize: "11px", margin: "2px 0 0 0" }}>
  {user?.email || "driver@allride.com"}
</p>
            </div>
          </div>
        )}

        {/* {collapsed && (
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              fontWeight: 900,
              color: "white",
            }}
          >
            {initial}
          </div>
        )} */}

<button
          type="button"
          onClick={onToggle}
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-color)",
            color: "var(--text-primary)",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>

      {/* NAV */}
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
          const Icon = item.icon;

          return (
            <button
            key={item.path}
            type="button"
            onClick={() => navigate(item.path)}
            title={collapsed ? item.label : ""}
            className={`app-sidebar-nav-btn ${
              isActive ? "is-active-driver" : ""
            } ${collapsed ? "justify-center py-3" : "px-3.5 py-3"}`}
          >
            <Icon size={18} strokeWidth={2} className="shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </button>
          );
        })}
      </nav>

      {/* LOGOUT */}
      <div
        style={{
          padding: "12px 8px",
          borderTop: "1px solid var(--sidebar-border)",
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
          }}
        >
          <span style={{ fontSize: "20px" }}>🚪</span>
          {!collapsed && <span>Logout</span>}
        </button> */}
      </div>
    </aside>
  );
};

export default DriverSidebar;
