import { Outlet } from "react-router-dom";
// import RiderSidebar from "../components/RiderSidebar";
import Navbar from "@/features/landing/sections/Navbar";

const RiderLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      {/* <RiderSidebar /> */}
      <Navbar />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default RiderLayout;
