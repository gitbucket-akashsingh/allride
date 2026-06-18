import { Link } from "react-router-dom";
import { AuthPageShell, AuthCard } from "@/features/auth/components/AuthPageShell";
import {
  authLogoBoxClass,
  authLabelClass,
  authInputClass,
  authMutedText,
  authLinkClass,
} from "@/features/auth/constants/authStyles";
import AllRideLogo from "@/shared/components/AllRideLogo";

function ForgotPasswordPage() {
  return (
    <AuthPageShell>
      <AuthCard>
        <div className="flex flex-col items-center text-center mb-10">
          <div className={authLogoBoxClass}>
            <AllRideLogo className="w-12 h-12 object-contain" />
          </div>

          <h1 className="text-4xl font-black tracking-tight">Forgot Password?</h1>

          <p className={`${authMutedText} mt-3 text-sm leading-relaxed`}>
            Enter your email address and we&apos;ll send you a password reset
            link.
          </p>
        </div>

        <form className="space-y-6">
          <div>
            <label className={authLabelClass}>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className={authInputClass()}
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-yellow-500 text-black font-black hover:scale-[1.02] transition-all duration-300 shadow-2xl"
          >
            Send Reset Link
          </button>
        </form>

        <div className={`mt-8 text-center ${authMutedText} text-sm`}>
          Remember your password?{" "}
          <Link to="/login" className={authLinkClass}>
            Back to Login
          </Link>
        </div>
      </AuthCard>
    </AuthPageShell>
  );
}

export default ForgotPasswordPage;
