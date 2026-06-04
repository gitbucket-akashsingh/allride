import { Outlet } from "react-router-dom";
// import DriverSidebar from "../components/DriverSidebar";

const DriverLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      {/* <DriverSidebar /> */}
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default DriverLayout;
