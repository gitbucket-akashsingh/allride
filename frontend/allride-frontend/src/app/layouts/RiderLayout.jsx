import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/features/landing/sections/Navbar";
import RiderSidebar from "@/features/rider/components/RiderSidebar";

const NAVBAR_HEIGHT = 88; // px — matches the navbar's actual rendered height

const RiderLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const sidebarWidth = sidebarCollapsed ? 72 : 260;

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a" }}>
      {/* ── NAVBAR — full width across the top ── */}
      <Navbar />

      {/* ── BODY ROW — sidebar + page content, sits below navbar ── */}
      <div
        style={{
          display: "flex",
          paddingTop: `${NAVBAR_HEIGHT}px`, // pushes content below the fixed navbar
          minHeight: "100vh",
        }}
      >
        {/* SIDEBAR */}
        <RiderSidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed((prev) => !prev)}
          navbarHeight={NAVBAR_HEIGHT}
        />

        {/* PAGE CONTENT */}
        <main
          style={{
            marginLeft: `${sidebarWidth}px`,
            flex: 1,
            transition: "margin-left 0.3s cubic-bezier(0.4,0,0.2,1)",
            minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RiderLayout;
