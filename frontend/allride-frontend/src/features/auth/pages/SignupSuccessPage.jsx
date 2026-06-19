import { Link, Navigate, useLocation } from "react-router-dom";
import { PartyPopper, Car, CircleCheck } from "lucide-react";
import { AuthPageShell, AuthCard } from "@/features/auth/components/AuthPageShell";
import { authMutedText } from "@/features/auth/constants/authStyles";

function SignupSuccessPage() {
  const location = useLocation();
  const { role, fullName } = location.state || {};

  if (!role) {
    return <Navigate to="/signup" replace />;
  }

  const isDriver = role === "DRIVER";

  const title = isDriver ? "Happy Driving!" : "Happy Riding!";
  const subtitle = isDriver
    ? "Your driver account has been created successfully."
    : "Your rider account has been created successfully.";

  return (
    <AuthPageShell maxWidth="max-w-lg">
      <AuthCard className="text-center p-10">
        <div
          className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 border ${
            isDriver
              ? "bg-blue-500/10 border-blue-500/20"
              : "bg-yellow-500/10 border-yellow-500/20"
          }`}
        >
          {isDriver ? (
            <Car size={42} className="text-blue-600 dark:text-blue-400" />
          ) : (
            <PartyPopper size={42} className="text-yellow-600 dark:text-yellow-400" />
          )}
        </div>

        <h1 className="text-4xl font-black mb-3">Congratulations!</h1>

        <h2
          className={`text-2xl font-bold mb-5 ${
            isDriver
              ? "text-blue-600 dark:text-blue-400"
              : "text-yellow-600 dark:text-yellow-400"
          }`}
        >
          {title}
        </h2>

        <p className={`${authMutedText} leading-relaxed mb-4 text-lg`}>
          {fullName ? `Welcome, ${fullName}! ` : ""}
          {subtitle}
        </p>

        <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 text-sm mb-10">
          <CircleCheck size={18} />
          <span>You have successfully registered</span>
        </div>

        <Link
          to="/login"
          className="inline-block w-full sm:w-auto px-10 py-4 rounded-2xl bg-yellow-500 text-black font-black hover:scale-[1.02] transition-all duration-300 shadow-2xl"
        >
          Return to Login
        </Link>
      </AuthCard>
    </AuthPageShell>
  );
}

export default SignupSuccessPage;
