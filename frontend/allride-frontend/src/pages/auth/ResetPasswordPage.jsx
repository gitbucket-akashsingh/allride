import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import logo from "../../assets/allride-logo.png";

function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative flex items-center justify-center px-4 py-10">
      {/* GLOW EFFECTS */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      {/* BACK BUTTON */}
      <Link
        to="/login"
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-5 py-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 text-sm font-semibold"
      >
        <ArrowLeft size={18} />
        Back to Login
      </Link>

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="backdrop-blur-2xl bg-white/5 border border-white/10 shadow-2xl rounded-[36px] p-8 sm:p-10">
          {/* HEADER */}
          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-20 h-20 rounded-3xl bg-black flex items-center justify-center shadow-2xl mb-5">
              <img
                src={logo}
                alt="AllRide Logo"
                className="w-12 h-12 object-contain"
              />
            </div>

            <h1 className="text-4xl font-black tracking-tight">
              Reset Password
            </h1>

            <p className="text-gray-400 mt-3 text-sm">
              Create a new secure password for your account.
            </p>
          </div>

          {/* FORM */}
          <form className="space-y-5">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">
                New Password
              </label>

              <input
                type="password"
                placeholder="Enter new password"
                className="w-full px-5 py-4 rounded-2xl bg-zinc-900 border border-white/10 focus:outline-none focus:border-yellow-500 transition-all"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full px-5 py-4 rounded-2xl bg-zinc-900 border border-white/10 focus:outline-none focus:border-yellow-500 transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-yellow-500 text-black font-black hover:scale-[1.02] transition-all duration-300 shadow-2xl"
            >
              Update Password
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default ResetPasswordPage;
