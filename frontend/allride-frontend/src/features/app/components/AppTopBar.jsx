import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search, Bell, Moon, Sun } from "lucide-react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useTheme } from "@/shared/hooks/useTheme";
import { getPageTitle } from "@/shared/constants/appRouteTitles";
import { showComingSoon } from "@/shared/utils/featureToast";
import UserAccountMenu from "@/features/app/components/UserAccountMenu";


function AppTopBar({ role = "RIDER" }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toggleTheme, isDark } = useTheme();
  const [search, setSearch] = useState("");

  const pageTitle = getPageTitle(location.pathname);

  const searchPlaceholder =
    role === "DRIVER"
      ? "Search trips, earnings..."
      : "Search rides, places...";

  const quickAction =
    role === "DRIVER"
      ? { label: "Dashboard", path: "/driver/dashboard" }
      : { label: "Book Ride", path: "/rider/book" };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    showComingSoon("Search");
  };

  return (
    <div className="sticky top-0 z-40 px-4 pt-4 pb-2">
      <header
        className="rounded-2xl border backdrop-blur-xl shadow-2xl flex items-center gap-3 px-4 py-3"
        style={{
          background: "var(--navbar-bg)",
          borderColor: "var(--navbar-border)",
        }}
      >
        {/* Page title */}
        <div className="hidden sm:block min-w-[120px]">
          <p className="text-xs text-[var(--text-secondary)]">AllRide</p>
          <h1 className="text-sm font-bold text-[var(--text-primary)] truncate">
            {pageTitle}
          </h1>
        </div>

        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-xl mx-auto">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{
                color: "var(--text-secondary)",
              }}
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-yellow-500"
              style={{
                background: "var(--input-bg)",
                border: "1px solid var(--input-border)",
                color: "var(--text-primary)",
              }}
            />
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => navigate(quickAction.path)}
            className="hidden md:inline-flex px-4 py-2 rounded-xl bg-yellow-500 text-black text-sm font-bold hover:scale-[1.02] transition-transform"
          >
            {quickAction.label}
          </button>

          <button
            type="button"
            onClick={() => showComingSoon("Notifications")}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:bg-[var(--card-hover)]"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              color: "var(--text-primary)",
            }}
            aria-label="Notifications"
          >
            <Bell size={16} />
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:bg-[var(--card-hover)]"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              color: "var(--text-primary)",
            }}
            aria-label="Toggle theme"
          >
            {isDark 
            ? (<Moon size={16} strokeWidth={2} />) 
            : (<Sun size={16} strokeWidth={2} />)}
          </button>

          
          <UserAccountMenu variant="full" />

        </div>
      </header>
    </div>
  );
}

export default AppTopBar;