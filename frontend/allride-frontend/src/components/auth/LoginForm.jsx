import { Link } from "react-router-dom";

function LoginForm({ formData, handleChange, handleSubmit, loading }) {
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* EMAIL */}
      <div>
        <label className="text-sm text-gray-400 mb-2 block">
          Email Address
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
          className="w-full px-5 py-4 rounded-2xl bg-zinc-900 border border-white/10 focus:outline-none focus:border-yellow-500 transition-all"
        />
      </div>

      {/* PASSWORD */}
      <div>
        <label className="text-sm text-gray-400 mb-2 block">Password</label>

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
          className="w-full px-5 py-4 rounded-2xl bg-zinc-900 border border-white/10 focus:outline-none focus:border-yellow-500 transition-all"
        />
      </div>

      {/* REMEMBER + FORGOT PASSWORD */}
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-gray-400">
          <input
            type="checkbox"
            name="rememberMe"
            className="accent-yellow-500"
          />
          Remember me
        </label>

        <Link
          to="/forgot-password"
          className="text-yellow-400 hover:text-yellow-300"
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
