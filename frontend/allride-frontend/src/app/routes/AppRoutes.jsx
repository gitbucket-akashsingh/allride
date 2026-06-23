import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "@/app/layouts/MainLayout";
import RiderLayout from "@/app/layouts/RiderLayout";
import DriverLayout from "@/app/layouts/DriverLayout";
import AuthLayout from "@/app/layouts/AuthLayout";

import RoleSwitchConfirmPage from "@/features/auth/pages/RoleSwitchConfirmPage";

import LandingPage from "@/features/landing/pages/LandingPage";

import NewLoginPage from "@/features/auth/pages/NewLoginPage";
import SignupPage from "@/features/auth/pages/SignupPage";
import SignupSuccessPage from "@/features/auth/pages/SignupSuccessPage";
import ForgotPasswordPage from "@/features/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/features/auth/pages/ResetPasswordPage";
import VerifyOTPPage from "@/features/auth/pages/VerifyOTPPage";
import EmailVerificationPage from "@/features/auth/pages/EmailVerificationPage";

import RiderHomePage from "@/features/rider/pages/RiderHomePage";
import BookRidePage from "@/features/rider/pages/BookRidePage";
import RideHistoryPage from "@/features/rider/pages/RideHistoryPage";
import ProfilePage from "@/features/rider/pages/ProfilePage";
import PaymentPage from "@/features/rider/pages/PaymentPage";
import RideTrackingPage from "@/features/rider/pages/RideTrackingPage";

import DriverDashboard from "@/features/driver/pages/DriverDashboard";
import DriverHomePage from "@/features/driver/pages/DriverHomePage";
import DriverEarningsPage from "@/features/driver/pages/DriverEarningsPage";
import DriverHistoryPage from "@/features/driver/pages/DriverHistoryPage";
import DriverProfilePage from "@/features/driver/pages/DriverProfilePage";
import DriverOnboardingPage from "@/features/driver/pages/DriverOnboardingPage";
import DriverProfileGuard from "@/features/driver/components/DriverProfileGuard";

import AdminDashboard from "@/features/admin/pages/AdminDashboard";
import AdminHomePage from "@/features/admin/pages/AdminHomePage";

import ProtectedRoutes from "@/shared/routes/ProtectedRoutes";
import PublicRoutes from "@/shared/routes/PublicRoutes";
import RoleBasedRoutes from "@/shared/routes/RoleBasedRoutes";

import UnauthorizedPage from "@/shared/pages/UnAuthorizedPage";
import PrivacyPage from "@/features/legal/pages/PrivacyPage";
import TermsPage from "@/features/legal/pages/TermsPage";
import SupportPage from "@/features/support/pages/SupportPage";

import NotFoundPage from "@/shared/pages/NotFoundPage";
import ScrollToTop from "@/app/routes/ScrollToTop";


function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/support" element={<SupportPage />} />
        </Route>

        <Route path="/signup/switch-role" element={<RoleSwitchConfirmPage />} />

        {/* AUTH ROUTES */}
        <Route element={<PublicRoutes />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<NewLoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signup/success" element={<SignupSuccessPage />} />
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
              <Route path="/rider/book" element={<BookRidePage />} />
              <Route path="/rider/history" element={<RideHistoryPage />} />
              <Route path="/rider/profile" element={<ProfilePage />} />
              <Route path="/rider/payments" element={<PaymentPage />} />
              <Route path="/rider/tracking" element={<RideTrackingPage />} />
            </Route>
          </Route>
        </Route>

          {/* DRIVER ROUTES */}
          <Route element={<ProtectedRoutes />}>
           <Route element={<RoleBasedRoutes allowedRoles={["DRIVER"]} />}>
            {/* Onboarding — no sidebar, no profile required */}
            <Route path="/driver/onboarding" element={<DriverOnboardingPage />} />

            {/* Main driver app — requires profile */}
            <Route element={<DriverLayout />}>
            {/* Outside DriverProfileGuard — pending drivers can view profile only */}
                <Route path="/driver/profile" element={<DriverProfilePage />} />
              <Route element={<DriverProfileGuard />}>
                <Route path="/driver/home" element={<DriverHomePage />} />
                <Route path="/driver/dashboard" element={<DriverDashboard />} />
                <Route path="/driver/earnings" element={<DriverEarningsPage />} />
                <Route path="/driver/history" element={<DriverHistoryPage />} />
                {/* <Route path="/driver/profile" element={<DriverProfilePage />} /> */}
              </Route>
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

        {/* <Route path="/map-test" element={<MapTestPage />} /> */}
        {/* <Route path="/book-ride" element={<RiderBookingPage />} /> */}

        {/* CATCH-ALL — must be last */}
        <Route path="*" element={<NotFoundPage />} />

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
