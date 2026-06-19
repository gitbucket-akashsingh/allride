import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { User, Car } from "lucide-react";
import SignupForm from "@/features/auth/components/SignupForm";
import { AuthPageShell, AuthCard } from "@/features/auth/components/AuthPageShell";
import {
  authLogoBoxClass,
  authMutedText,
  authLinkClass,
  authDividerBg,
  authDividerLineClass,
  authGoogleButtonClass,
  authGithubButtonClass,
} from "@/features/auth/constants/authStyles";
import AllRideLogo from "@/shared/components/AllRideLogo";
import { useSignup } from "@/features/auth/hooks/useSignup";
import { getValidSignupRole } from "@/features/auth/constants/signupRoles";
import { showComingSoon } from "@/shared/utils/featureToast";


function SignupPage() {
  const [searchParams] = useSearchParams();
  getValidSignupRole(searchParams.get("role"));

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
    setFieldErrors({});

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
    <AuthPageShell>
      <AuthCard>
        <div className="flex flex-col items-center text-center mb-10">
          <div className={authLogoBoxClass}>
            <AllRideLogo className="w-12 h-12 object-contain" />
          </div>

          <h1 className="text-4xl font-black tracking-tight">Create Account</h1>

          <p className={`${authMutedText} mt-3 text-sm`}>
            Join the future of transportation
          </p>

          <span
            className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold ${
              roleFromUrl === "DRIVER"
                ? "bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-500/30"
                : "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border border-yellow-500/30"
            }`}
          >
            <RoleIcon size={14} strokeWidth={2} aria-hidden />
            Signing up as {roleLabel}
          </span>
        </div>

        <SignupForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={onSubmit}
          loading={loading}
          fieldErrors={fieldErrors}
        />

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className={authDividerLineClass} />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className={`${authDividerBg} px-4 ${authMutedText}`}>
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button type="button" className={authGoogleButtonClass}
          title="Google login is under development"
          onClick={() => showComingSoon("Google login")}
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Google
          </button>

          <button type="button" className={authGithubButtonClass}
          title="Google login is under development"
          onClick={() => showComingSoon("Github login")}
          >
            <img
              src="https://www.svgrepo.com/show/512317/github-142.svg"
              alt="GitHub"
              className="w-5 h-5 dark:invert"
            />
            GitHub
          </button>
        </div>

        <div className={`mt-8 text-center ${authMutedText} text-sm`}>
          Already have an account?{" "}
          <Link to="/login" className={authLinkClass}>
            Login
          </Link>
        </div>
      </AuthCard>
    </AuthPageShell>
  );
}

export default SignupPage;
