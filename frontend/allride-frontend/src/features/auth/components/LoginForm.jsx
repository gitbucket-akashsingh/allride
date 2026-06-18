import { Link } from "react-router-dom";
import { authLabelClass, authInputClass, authMutedText, authLinkClass } from "@/features/auth/constants/authStyles";

function LoginForm({ formData, handleChange, handleSubmit, loading }) {
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* EMAIL */}
      <div>
        <label className={authLabelClass}>
          Email Address
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
          className={authInputClass()}
          />
      </div>

      {/* PASSWORD */}
      <div>
        <label className={authLabelClass}>Password</label>

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
          className={authInputClass()}
          />
      </div>

      {/* REMEMBER + FORGOT PASSWORD */}
      <div className="flex items-center justify-between text-sm">
        <label className={`flex items-center gap-2 ${authMutedText}`}>
          <input
            type="checkbox"
            name="rememberMe"
            className="accent-yellow-500"
          />
          Remember me
        </label>

        <Link
          to="/forgot-password"
          className={authLinkClass}
        >
          Forgot Password?
        </Link>
      </div>

      {/* LOGIN BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-2xl bg-yellow-500 text-black font-black hover:scale-[1.02] transition-all duration-300 shadow-2xl disabled:opacity-60"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

export default LoginForm;
