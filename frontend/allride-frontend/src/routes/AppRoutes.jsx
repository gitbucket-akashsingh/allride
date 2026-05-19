import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "../pages/landing/LandingPage";
import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import VerifyOTPPage from "../pages/auth/VerifyOTPPage";
import EmailVerificationPage from "../pages/auth/EmailVerificationPage";
import RiderHomePage from "../pages/rider/RiderHomePage";
import DriverDashboard from "../pages/driver/DriverDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ProtectedRoutes from "../routes/ProtectedRoutes";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route path="/verify-otp" element={<VerifyOTPPage />} />
        <Route path="/verify-email" element={<EmailVerificationPage />} />

        <Route
          path="/rider/home"
          element={
            <ProtectedRoutes>
              <RiderHomePage />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/driver/dashboard"
          element={
            <ProtectedRoutes>
              <DriverDashboard />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoutes>
              <AdminDashboard />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
