import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useTheme } from "@/shared/hooks/useTheme";
import { LayoutDashboard, User, LogOut } from "lucide-react";

function UserAccountMenu({ variant = "full" }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark } = useTheme();

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const role = user?.role?.toUpperCase();

  const dashboardPath =
    role === "DRIVER" ? "/driver/home"
    : role === "ADMIN" ? "/admin/home"
    : "/rider/home";

  const profilePath =
    role === "DRIVER" ? "/driver/profile"
    : role === "ADMIN" ? "/admin/home" // or admin profile when you add it
    : "/rider/profile";

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const handleLogout = () => {
    logout();
    navigate("/");
    setOpen(false);
  };

  const go = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <div ref={menuRef} className="relative">
      <button
  type="button"
  onClick={() => setOpen((prev) => !prev)}
  style={{
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: variant === "compact" ? "0" : "6px 12px 6px 6px",
    borderRadius: variant === "compact" ? "12px" : "12px",
    border: variant === "compact" ? "none" : "1px solid var(--border-color)",
    background: variant === "compact"
      ? "transparent"
      : "var(--bg-card)",
    color: "var(--text-primary)",
    cursor: "pointer",
    transition: "all 0.2s",
    width: variant === "compact" ? "36px" : "auto",
    height: variant === "compact" ? "36px" : "auto",
  }}
  onMouseEnter={(e) => {
    if (variant !== "compact") {
      e.currentTarget.style.background = "var(--card-hover)";
    }
  }}
  onMouseLeave={(e) => {
    if (variant !== "compact") {
      e.currentTarget.style.background = "var(--bg-card)";
    }
  }}
  title={user?.fullName || "Account"}
>
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
      flexShrink: 0,
    }}
  >
    {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
  </div>

  {variant === "full" && (
    <>
      <span style={{ fontWeight: 600, fontSize: "13px", maxWidth: "120px" }} className="truncate">
        {user?.fullName || "User"}
      </span>
      <span style={{ fontSize: "10px", color: "var(--text-secondary)", marginLeft: "4px" }}>
        ▼
      </span>
    </>
  )}
</button>

      {open && (
        <div
          className="absolute right-0 top-[calc(100%+8px)] w-[200px] rounded-2xl border overflow-hidden z-[999]"
          style={{
            borderColor: "var(--border-color)",
            background: "var(--bg-panel)",
            color: "var(--text-primary)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            backdropFilter: "blur(20px)",
          }}
        >
          <button type="button" onClick={() => go(dashboardPath)} className="menu-item">
          <LayoutDashboard size={16} strokeWidth={2} />
            Dashboard
          </button>

          <button type="button" onClick={() => go(profilePath)} className="menu-item border-t">
          <User size={16} strokeWidth={2} />
            Profile
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="menu-item border-t text-red-500"
          >
            <LogOut size={16} strokeWidth={2} />
             Log out
          </button>

        </div>
      )}
    </div>
  );
}

export default UserAccountMenu;