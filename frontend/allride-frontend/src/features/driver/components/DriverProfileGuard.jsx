import { Navigate, Outlet, Link } from "react-router-dom";
import { useDriverProfile } from "../hooks/useDriverProfile";

function DriverProfileGuard() {
  const { loading, hasProfile, isApproved, error, refetch } = useDriverProfile();

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-[3px] border-zinc-200 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  if (!hasProfile) {
    return <Navigate to="/driver/onboarding" replace />;
  }

  if (!isApproved) {
    return (
      <div className="max-w-lg mx-auto mt-16 p-8 bg-amber-50 border border-amber-200 rounded-2xl text-center">
        <p className="text-2xl font-black text-amber-900">Pending approval</p>
        <p className="text-sm text-amber-800 mt-3 leading-relaxed">
          Your driver profile has been submitted. An admin must approve your account
          before you can go online or accept rides.
        </p>
        <p className="text-xs text-amber-700 mt-4">
          You&apos;ll get access automatically once approved — click below to check again.
        </p>
        <button
          type="button"
          onClick={refetch}
          className="mt-6 px-6 py-2.5 rounded-xl bg-amber-900 text-white text-sm font-bold hover:bg-amber-800 transition"
        >
          Check approval status
        </button>
        <Link
          to="/driver/profile"
          className="mt-3 inline-block text-xs font-semibold text-amber-800 underline"
        >
          View submitted profile
        </Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-lg mx-auto mt-16 p-6 bg-red-50 border border-red-200 rounded-2xl text-center text-red-600">
        {error}
      </div>
    );
  }

  return <Outlet />;
}

export default DriverProfileGuard;