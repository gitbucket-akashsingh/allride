import { authLabelClass, authInputClass } from "@/features/auth/constants/authStyles";
function FieldError({ message }) {
  if (!message) return null;
  return <p className="mt-2 text-sm text-red-400">{message}</p>;
}

function inputClass(hasError) {
  return `w-full px-5 py-4 rounded-2xl bg-zinc-900 border ${
    hasError ? "border-red-500" : "border-white/10"
  } focus:outline-none focus:border-yellow-500 transition-all`;
}

function SignupForm({
  formData,
  handleChange,
  handleSubmit,
  loading,
  fieldErrors = {},
}) {
  const hasErrors = Object.keys(fieldErrors).length > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* ERROR MESSAGE on the top of the form for all fields */}
      {/* {hasErrors && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          Please fix the errors below before continuing.
        </div>
      )} */}

      {/* FULL NAME */}
      <div>
        <label className="text-sm text-gray-400 mb-2 block">Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter your full name"
          className={inputClass(fieldErrors.fullName)}
        />
        <FieldError message={fieldErrors.fullName} />
      </div>

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
          className={inputClass(fieldErrors.email)}
        />
        <FieldError message={fieldErrors.email} />
      </div>

      {/* PHONE */}
      <div>
        <label className="text-sm text-gray-400 mb-2 block">Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
          className={inputClass(fieldErrors.phone)}
        />
        <FieldError message={fieldErrors.phone} />
      </div>

      {/* PASSWORD */}
      <div>
        <label className="text-sm text-gray-400 mb-2 block">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Create password (min 12 characters)"
          className={inputClass(fieldErrors.password)}
        />
        <FieldError message={fieldErrors.password} />
      </div>

      {/* CONFIRM PASSWORD */}
      <div>
        <label className="text-sm text-gray-400 mb-2 block">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          className={inputClass(fieldErrors.confirmPassword)}
        />
        <FieldError message={fieldErrors.confirmPassword} />
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-2xl bg-yellow-500 text-black font-black hover:scale-[1.02] transition-all duration-300 shadow-2xl disabled:opacity-60 disabled:hover:scale-100"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>
    </form>
  );
}

export default SignupForm;
