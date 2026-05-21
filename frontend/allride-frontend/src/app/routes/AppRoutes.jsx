import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "@/app/layouts/MainLayout";
import RiderLayout from "@/app/layouts/RiderLayout";
import DriverLayout from "@/app/layouts/DriverLayout";
import AuthLayout from "@/app/layouts/AuthLayout";

import LandingPage from "@/features/landing/pages/LandingPage";

import NewLoginPage from "@/features/auth/pages/NewLoginPage";
import SignupPage from "@/features/auth/pages/SignupPage";
import ForgotPasswordPage from "@/features/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/features/auth/pages/ResetPasswordPage";
import VerifyOTPPage from "@/features/auth/pages/VerifyOTPPage";
import EmailVerificationPage from "@/features/auth/pages/EmailVerificationPage";

import RiderHomePage from "@/features/rider/pages/RiderHomePage";

import DriverDashboard from "@/features/driver/pages/DriverDashboard";
import DriverHomePage from "@/features/driver/pages/DriverHomePage";

import AdminDashboard from "@/features/admin/pages/AdminDashboard";
import AdminHomePage from "@/features/admin/pages/AdminHomePage";

import ProtectedRoutes from "@/shared/routes/ProtectedRoutes";
import PublicRoutes from "@/shared/routes/PublicRoutes";
import RoleBasedRoutes from "@/shared/routes/RoleBasedRoutes";

import UnauthorizedPage from "@/shared/pages/UnAuthorizedPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>

        {/* AUTH ROUTES */}
        <Route element={<PublicRoutes />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<NewLoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/verify-otp" element={<VerifyOTPPage />} />
            <Route path="/verify-email" element={<EmailVerificationPage />} />
          </Route>
        </Route>

        {/* RIDER ROUTES */}
        <Route element={<ProtectedRoutes />}>
          <Route element={<RoleBasedRoutes allowedRoles={["RIDER"]} />}>
            <Route element={<RiderLayout />}>
              <Route path="/rider/home" element={<RiderHomePage />} />
            </Route>
          </Route>
        </Route>

        {/* DRIVER ROUTES */}
        <Route element={<ProtectedRoutes />}>
          <Route element={<RoleBasedRoutes allowedRoles={["DRIVER"]} />}>
            <Route element={<DriverLayout />}>
              <Route path="/driver/home" element={<DriverHomePage />} />
              <Route path="/driver/dashboard" element={<DriverDashboard />} />
            </Route>
          </Route>
        </Route>

        {/* ADMIN ROUTES */}
        <Route element={<ProtectedRoutes />}>
          <Route element={<RoleBasedRoutes allowedRoles={["ADMIN"]} />}>
            <Route element={<DriverLayout />}>
              <Route path="/admin/home" element={<AdminHomePage />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>
          </Route>
        </Route>

        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* <Route path="/" element={<LandingPage />} /> */}

        {/* <Route path="/login" element={<NewLoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verify-otp" element={<VerifyOTPPage />} />
        <Route path="/verify-email" element={<EmailVerificationPage />} /> */}

        {/* <Route element={<ProtectedRoute />}>
          <Route path="/rider/*" element={<RiderRoutes />} />
          <Route path="/driver/*" element={<DriverRoutes />} />
        </Route> */}

        {/* <Route
          path="/rider/home"
          element={
            <ProtectedRoutes>
              <RiderHomePage />
            </ProtectedRoutes>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
