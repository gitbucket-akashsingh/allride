import { Outlet } from "react-router-dom";
import Navbar from "@/features/landing/sections/Navbar";
import Footer from "@/features/landing/sections/Footer";

function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
