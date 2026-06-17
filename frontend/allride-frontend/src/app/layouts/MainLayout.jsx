import { Outlet } from "react-router-dom";
import Navbar from "@/features/landing/sections/Navbar";
import Footer from "@/features/landing/sections/Footer";

function MainLayout({ children }) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-page)" }}>
      <Navbar />
      {children}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
