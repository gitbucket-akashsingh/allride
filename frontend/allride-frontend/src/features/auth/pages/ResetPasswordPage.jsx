import { AuthPageShell, AuthCard } from "@/features/auth/components/AuthPageShell";
import {
  authLogoBoxClass,
  authLabelClass,
  authInputClass,
  authMutedText,
} from "@/features/auth/constants/authStyles";
import AllRideLogo from "@/shared/components/AllRideLogo";

function ResetPasswordPage() {
  return (
    <AuthPageShell backTo="/login" backLabel="Back to Login">
      <AuthCard>
        <div className="flex flex-col items-center text-center mb-10">
          <div className={authLogoBoxClass}>
            <AllRideLogo className="w-12 h-12 object-contain" />
          </div>

          <h1 className="text-4xl font-black tracking-tight">Reset Password</h1>

          <p className={`${authMutedText} mt-3 text-sm`}>
            Create a new secure password for your account.
          </p>
        </div>

        <form className="space-y-5">
          <div>
            <label className={authLabelClass}>New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className={authInputClass()}
            />
          </div>

          <div>
            <label className={authLabelClass}>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              className={authInputClass()}
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-yellow-500 text-black font-black hover:scale-[1.02] transition-all duration-300 shadow-2xl"
          >
            Update Password
          </button>
        </form>
      </AuthCard>
    </AuthPageShell>
  );
}

export default ResetPasswordPage;
