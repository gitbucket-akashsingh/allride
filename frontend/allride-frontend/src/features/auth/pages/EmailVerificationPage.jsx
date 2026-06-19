import { Link } from "react-router-dom";
import { MailCheck } from "lucide-react";
import { AuthPageShell, AuthCard } from "@/features/auth/components/AuthPageShell";
import { authMutedText } from "@/features/auth/constants/authStyles";

function EmailVerificationPage() {
  return (
    <AuthPageShell backTo="/login" backLabel="Back to Login" maxWidth="max-w-lg">
      <AuthCard className="text-center p-10">
        <div className="w-24 h-24 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mx-auto mb-8">
          <MailCheck size={42} className="text-yellow-600 dark:text-yellow-400" />
        </div>

        <h1 className="text-4xl font-black mb-5">Verify Your Email</h1>

        <p className={`${authMutedText} leading-relaxed mb-10 text-lg`}>
          We&apos;ve sent a verification link to your email address. Please
          check your inbox and verify your account.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 rounded-2xl bg-yellow-500 text-black font-black hover:scale-[1.02] transition-all duration-300 shadow-2xl">
            Resend Email
          </button>

          <Link
            to="/login"
            className="px-8 py-4 rounded-2xl border border-zinc-200 bg-zinc-100 hover:bg-zinc-200 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 transition-all duration-300 font-semibold"
          >
            Back to Login
          </Link>
        </div>
      </AuthCard>
    </AuthPageShell>
  );
}

export default EmailVerificationPage;
