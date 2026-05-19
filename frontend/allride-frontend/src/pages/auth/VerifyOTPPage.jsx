import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import logo from "../../assets/allride-logo.png";

function VerifyOTPPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative flex items-center justify-center px-4 py-10">
      {/* GLOWS */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      {/* BACK */}
      <Link
        to="/login"
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-5 py-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 text-sm font-semibold"
      >
        <ArrowLeft size={18} />
        Back
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

            <h1 className="text-4xl font-black tracking-tight">Verify OTP</h1>

            <p className="text-gray-400 mt-3 text-sm">
              Enter the 6-digit verification code sent to your email.
            </p>
          </div>

          {/* OTP INPUTS */}
          <div className="flex justify-center gap-3 mb-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <input
                key={item}
                type="text"
                maxLength="1"
                className="w-14 h-16 text-center text-2xl font-black rounded-2xl bg-zinc-900 border border-white/10 focus:outline-none focus:border-yellow-500"
              />
            ))}
          </div>

          {/* BUTTON */}
          <button className="w-full py-4 rounded-2xl bg-yellow-500 text-black font-black hover:scale-[1.02] transition-all duration-300 shadow-2xl">
            Verify OTP
          </button>

          {/* RESEND */}
          <div className="mt-8 text-center text-gray-400 text-sm">
            Didn&apos;t receive code?{" "}
            <button className="text-yellow-400 font-semibold hover:text-yellow-300">
              Resend OTP
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default VerifyOTPPage;
