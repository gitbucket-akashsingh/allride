import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, User, Car } from "lucide-react";
import SignupForm from "@/features/auth/components/SignupForm";
import logo from "@/assets/allride-logo.png";
import { useSignup } from "@/features/auth/hooks/useSignup";

import { Navigate, useSearchParams } from "react-router-dom";
import { ALLOWED_SIGNUP_ROLES, getValidSignupRole,} from "@/features/auth/constants/signupRoles";

function SignupPage() {

  const [searchParams] = useSearchParams();
  const roleParam = searchParams.get("role");
  const validRole = getValidSignupRole(roleParam);

  

  const [fieldErrors, setFieldErrors] = useState({});
  const { handleSignup, roleFromUrl } = useSignup();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({}); // clear old errors on new submit

    try {
      setLoading(true);
      await handleSignup(formData, setFieldErrors);
    } finally {
      setLoading(false);
    }
  };

  const roleLabel = roleFromUrl === "DRIVER" ? "Driver" : "Rider";
  const RoleIcon = roleFromUrl === "DRIVER" ? Car : User;
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative flex items-center justify-center px-4 py-10">
      {/* BACK BUTTON */}
      <Link
        to="/"
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-5 py-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 text-sm font-semibold"
      >
        <ArrowLeft size={18} />
        Back to Home
      </Link>

      {/* GLOW EFFECTS */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

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
              Create Account
            </h1>

            <p className="text-gray-400 mt-3 text-sm">
              Join the future of transportation
            </p>
            <span
              className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold ${
                roleFromUrl === "DRIVER"
                  ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                  : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
              }`}
            >
              <RoleIcon size={14} strokeWidth={2} aria-hidden />
              Signing up as {roleLabel}
            </span>
          </div>

          {/* FORM */}
          <SignupForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={onSubmit}
            loading={loading}
            fieldErrors={fieldErrors}
          />

          {/* Oauth2 */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>

            <div className="relative flex justify-center text-sm">
              <span className="bg-zinc-950 px-4 text-gray-400">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* GOOGLE */}
            <button
              type="button"
              className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-white text-black font-semibold hover:scale-[1.02] transition-all duration-300"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Google
            </button>

            {/* GITHUB */}
            <button
              type="button"
              className="flex items-center justify-center gap-3 py-4 rounded-2xl border border-white/10 bg-zinc-900 hover:bg-zinc-800 transition-all duration-300 font-semibold"
            >
              <img
                src="https://www.svgrepo.com/show/512317/github-142.svg"
                alt="GitHub"
                className="w-5 h-5 invert"
              />
              GitHub
            </button>
          </div>

          {/* FOOTER */}
          <div className="mt-8 text-center text-gray-400 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-yellow-400 font-semibold hover:text-yellow-300"
            >
              Login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default SignupPage;
