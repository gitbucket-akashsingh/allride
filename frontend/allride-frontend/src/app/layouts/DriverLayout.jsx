import { useState } from "react";
import { Outlet } from "react-router-dom";
import DriverSidebar from "@/features/driver/components/DriverSidebar";
import AppTopBar from "@/features/app/components/AppTopBar";
import { SIDEBAR_WIDTH } from "@/shared/constants/layoutConstants";
import { LayoutContext } from "@/app/context/LayoutContext";

const DriverLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const sidebarWidth = sidebarCollapsed ? 72 : 260;

  return (
    <div className="min-h-screen" style={{ background: "var(--content-bg)" }}>
      
        {/* Full Height SIDEBAR */}
        <DriverSidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed((prev) => !prev)}
        />

        {/* Content column — starts after sidebar */}
        <LayoutContext.Provider value={{ sidebarCollapsed }}>
        <div
           className="min-h-screen flex flex-col transition-[margin-left] duration-300"
           style={{ marginLeft: sidebarWidth }}
        >

        {/* TOP BAR — shows page title + user actions */}
        <AppTopBar role="DRIVER" />

        {/* PAGE CONTENT */}
        <main className="flex-1 w-full px-4 pb-6"
          style={{
            flex: 1,
            transition: "margin-left 0.3s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <Outlet />
        </main>
      </div>
      </LayoutContext.Provider>
    </div>
  );
};

export default DriverLayout;