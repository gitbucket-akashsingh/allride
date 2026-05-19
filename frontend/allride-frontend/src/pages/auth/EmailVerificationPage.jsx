import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MailCheck } from "lucide-react";

function EmailVerificationPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative flex items-center justify-center px-4 py-10">
      {/* GLOW EFFECTS */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-lg"
      >
        <div className="backdrop-blur-2xl bg-white/5 border border-white/10 shadow-2xl rounded-[36px] p-10 text-center">
          {/* ICON */}
          <div className="w-24 h-24 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mx-auto mb-8">
            <MailCheck size={42} className="text-yellow-400" />
          </div>

          {/* TEXT */}
          <h1 className="text-4xl font-black mb-5">Verify Your Email</h1>

          <p className="text-gray-400 leading-relaxed mb-10 text-lg">
            We&apos;ve sent a verification link to your email address. Please
            check your inbox and verify your account.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 rounded-2xl bg-yellow-500 text-black font-black hover:scale-[1.02] transition-all duration-300 shadow-2xl">
              Resend Email
            </button>

            <Link
              to="/login"
              className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 font-semibold"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default EmailVerificationPage;
