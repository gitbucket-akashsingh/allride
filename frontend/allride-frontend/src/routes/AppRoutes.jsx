import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "../pages/landing/LandingPage";
import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/signup" element={<SignupPage />} />

        {/* <Route path="/rider/home" element={ 
                                         <ProtectedRoute>
                                            <RiderDashboard />
                                          </ProtectedRoute> }
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
