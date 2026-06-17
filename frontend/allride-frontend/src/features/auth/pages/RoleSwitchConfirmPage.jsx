import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { getRedirectPathByRole } from "@/features/auth/utils/roleRedirect";
import { getValidSignupRole } from "@/features/auth/constants/signupRoles";


const ROLE_META = {
  RIDER: { label: "Rider", emoji: "🚕" },
  DRIVER: { label: "Driver", emoji: "🚖" },
};

function RoleSwitchConfirmPage() {

    
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated, user, logout, loading } = useAuth();

  const targetRole = getValidSignupRole(searchParams.get("target"));
  if (!targetRole) {
    return <Navigate to="/signup?role=rider" replace />;
  }

//   const targetRole = searchParams.get("target")?.toUpperCase(); // "RIDER" | "DRIVER"
  const currentRole = user?.role?.toUpperCase();

  // Wait for auth check
  if (loading) return null;

  // Not logged in → normal signup
  if (!isAuthenticated) {
    return <Navigate to={`/signup?role=${targetRole?.toLowerCase() || "rider"}`} replace />;
  }

  // Invalid or same role → dashboard
  if (!targetRole || !ROLE_META[targetRole] || currentRole === targetRole) {
    return <Navigate to={getRedirectPathByRole(currentRole)} replace />;
  }

  const current = ROLE_META[currentRole];
  const target = ROLE_META[targetRole];

  const handleCreateNewAccount = () => {
    logout();
    navigate(`/signup?role=${targetRole.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-10 relative">
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 px-5 py-3 rounded-2xl border border-white/10 bg-white/5 text-sm font-semibold"
      >
        <ArrowLeft size={18} />
        Back to Home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md backdrop-blur-2xl bg-white/5 border border-white/10 rounded-[36px] p-8 sm:p-10"
      >
        <div className="flex justify-center mb-6">
          <AlertCircle size={40} className="text-yellow-400" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-center mb-4">
          Already registered as {current.label}
        </h1>

        <p className="text-gray-400 text-center leading-relaxed mb-8">
          You are currently signed in as a {current.emoji}{" "}
          <span className="text-white font-semibold">{current.label}</span>.
          To use AllRide as a {target.label}, you need a separate{" "}
          {target.label.toLowerCase()} account (different email).
        </p>
        <p className="text-sm text-yellow-300/90 text-center mb-6 px-2">
             You'll be signed out so you can create a new account.
        </p>

        <div className="space-y-3">
          <button
            type="button"
            onClick={handleCreateNewAccount}
            className="w-full py-4 rounded-2xl bg-yellow-500 text-black font-black hover:scale-[1.02] transition-transform"
          >
            Create account as {target.label}
          </button>

          <button
            type="button"
            onClick={() => navigate(getRedirectPathByRole(currentRole))}
            className="w-full py-4 rounded-2xl border border-white/10 bg-zinc-900 font-semibold hover:bg-zinc-800 transition-colors"
          >
            Go to my {current.label} dashboard
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default RoleSwitchConfirmPage;