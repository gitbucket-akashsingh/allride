import { motion } from "framer-motion";
import { Link, Navigate, useLocation } from "react-router-dom";
import { PartyPopper, Car, CircleCheck } from "lucide-react";

function SignupSuccessPage() {
  const location = useLocation();
  const { role, fullName } = location.state || {};

  // Block direct URL access without completing signup
  if (!role) {
    return <Navigate to="/signup" replace />;
  }

  const isDriver = role === "DRIVER";

  const title = isDriver ? "Happy Driving!" : "Happy Riding!";
  const subtitle = isDriver
    ? "Your driver account has been created successfully."
    : "Your rider account has been created successfully.";

  const emoji = isDriver ? "🚖" : "🚕";

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative flex items-center justify-center px-4 py-10">
      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-lg"
      >
        <div className="backdrop-blur-2xl bg-white/5 border border-white/10 shadow-2xl rounded-[36px] p-10 text-center">
          {/* ICON */}
          <div
            className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 border ${
              isDriver
                ? "bg-blue-500/10 border-blue-500/20"
                : "bg-yellow-500/10 border-yellow-500/20"
            }`}
          >
            {isDriver ? (
              <Car size={42} className="text-blue-400" />
            ) : (
              <PartyPopper size={42} className="text-yellow-400" />
            )}
          </div>

          {/* TEXT */}
          <p className="text-4xl mb-3">{emoji}</p>

          <h1 className="text-4xl font-black mb-3">Congratulations!</h1>

          <h2
            className={`text-2xl font-bold mb-5 ${
              isDriver ? "text-blue-400" : "text-yellow-400"
            }`}
          >
            {title}
          </h2>

          <p className="text-gray-400 leading-relaxed mb-4 text-lg">
            {fullName ? `Welcome, ${fullName}! ` : ""}
            {subtitle}
          </p>

          <div className="flex items-center justify-center gap-2 text-green-400 text-sm mb-10">
            <CircleCheck size={18} />
            <span>You have successfully registered</span>
          </div>

          {/* CTA */}
          <Link
            to="/login"
            className="inline-block w-full sm:w-auto px-10 py-4 rounded-2xl bg-yellow-500 text-black font-black hover:scale-[1.02] transition-all duration-300 shadow-2xl"
          >
            Return to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default SignupSuccessPage;
