import { useState } from "react";
import { Link } from "react-router-dom";
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
import LoginForm from "@/features/auth/components/LoginForm";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { showComingSoon } from "@/shared/utils/featureToast";

function LoginPage() {
  const { handleLogin } = useLogin();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await handleLogin(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthPageShell>
      <AuthCard>
        <div className="flex flex-col items-center text-center mb-10">
          <div className={authLogoBoxClass}>
            <AllRideLogo className="w-12 h-12 object-contain" />
          </div>

          <h1 className="text-4xl font-black tracking-tight">Welcome Back</h1>

          <p className={`${authMutedText} mt-3 text-sm`}>
            Login to continue your AllRide journey
          </p>
        </div>

        <LoginForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={onSubmit}
          loading={loading}
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
          onClick={() => showComingSoon("Google login")}>
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Google
          </button>

          <button type="button" className={authGithubButtonClass}
          title="Google login is under development"
          onClick={() => showComingSoon("Github login")}>
            <img
              src="https://www.svgrepo.com/show/512317/github-142.svg"
              alt="GitHub"
              className="w-5 h-5 dark:invert"
            />
            GitHub
          </button>
        </div>

        <div className={`mt-8 text-center ${authMutedText} text-sm`}>
          Don&apos;t have an account?{" "}
          <Link to="/signup" className={authLinkClass}>
            Create Account
          </Link>
        </div>
      </AuthCard>
    </AuthPageShell>
  );
}

export default LoginPage;
