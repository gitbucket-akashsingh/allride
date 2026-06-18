import { AuthPageShell, AuthCard } from "@/features/auth/components/AuthPageShell";
import {
  authLogoBoxClass,
  authMutedText,
  authLinkClass,
  authOtpInputClass,
} from "@/features/auth/constants/authStyles";
import AllRideLogo from "@/shared/components/AllRideLogo";

function VerifyOTPPage() {
  return (
    <AuthPageShell backTo="/login" backLabel="Back">
      <AuthCard>
        <div className="flex flex-col items-center text-center mb-10">
          <div className={authLogoBoxClass}>
            <AllRideLogo className="w-12 h-12 object-contain" />
          </div>

          <h1 className="text-4xl font-black tracking-tight">Verify OTP</h1>

          <p className={`${authMutedText} mt-3 text-sm`}>
            Enter the 6-digit verification code sent to your email.
          </p>
        </div>

        <div className="flex justify-center gap-3 mb-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <input
              key={item}
              type="text"
              maxLength="1"
              className={authOtpInputClass}
            />
          ))}
        </div>

        <button className="w-full py-4 rounded-2xl bg-yellow-500 text-black font-black hover:scale-[1.02] transition-all duration-300 shadow-2xl">
          Verify OTP
        </button>

        <div className={`mt-8 text-center ${authMutedText} text-sm`}>
          Didn&apos;t receive code?{" "}
          <button type="button" className={authLinkClass}>
            Resend OTP
          </button>
        </div>
      </AuthCard>
    </AuthPageShell>
  );
}

export default VerifyOTPPage;
