import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { AlertCircle, User, Car } from "lucide-react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { getRedirectPathByRole } from "@/features/auth/utils/roleRedirect";
import { getValidSignupRole } from "@/features/auth/constants/signupRoles";
import { AuthPageShell, AuthCard } from "@/features/auth/components/AuthPageShell";
import { authMutedText, authSecondaryButtonClass } from "@/features/auth/constants/authStyles";

const ROLE_META = {
  RIDER: { label: "Rider", icon: User },
  DRIVER: { label: "Driver", icon: Car },
};

function RoleSwitchConfirmPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated, user, logout, loading } = useAuth();

  const targetRole = getValidSignupRole(searchParams.get("target"));
  if (!targetRole) {
    return <Navigate to="/signup?role=rider" replace />;
  }

  const currentRole = user?.role?.toUpperCase();

  if (loading) return null;

  if (!isAuthenticated) {
    return (
      <Navigate to={`/signup?role=${targetRole?.toLowerCase() || "rider"}`} replace />
    );
  }

  if (!targetRole || !ROLE_META[targetRole] || currentRole === targetRole) {
    return <Navigate to={getRedirectPathByRole(currentRole)} replace />;
  }

  const current = ROLE_META[currentRole];
  const target = ROLE_META[targetRole];
  const CurrentIcon = current.icon;

  const handleCreateNewAccount = async () => {
    await logout();
    navigate(`/signup?role=${targetRole.toLowerCase()}`);
  };

  return (
    <AuthPageShell>
      <AuthCard>
        <div className="flex justify-center mb-6">
          <AlertCircle size={40} className="text-yellow-600 dark:text-yellow-400" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-center mb-4">
          Already registered as {current.label}
        </h1>

        <p className={`${authMutedText} text-center leading-relaxed mb-8`}>
          You are currently signed in as a{" "}
          <span className="inline-flex items-center gap-1 text-zinc-900 dark:text-white font-semibold">
            <CurrentIcon size={14} strokeWidth={2} aria-hidden />
            {current.label}
          </span>
          . To use AllRide as a {target.label}, you need a separate{" "}
          {target.label.toLowerCase()} account (different email).
        </p>

        <p className="text-sm text-yellow-700 dark:text-yellow-300/90 text-center mb-6 px-2">
          You&apos;ll be signed out so you can create a new account.
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
            className={authSecondaryButtonClass}
          >
            Go to my {current.label} dashboard
          </button>
        </div>
      </AuthCard>
    </AuthPageShell>
  );
}

export default RoleSwitchConfirmPage;
