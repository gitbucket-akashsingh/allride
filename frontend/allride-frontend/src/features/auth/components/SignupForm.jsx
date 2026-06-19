import { authLabelClass, authInputClass } from "@/features/auth/constants/authStyles";

function FieldError({ message }) {
  if (!message) return null;
  return <p className="mt-2 text-sm text-red-400">{message}</p>;
}

function SignupForm({
  formData,
  handleChange,
  handleSubmit,
  loading,
  fieldErrors = {},
}) {
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className={authLabelClass}>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter your full name"
          className={authInputClass(fieldErrors.fullName)}
        />
        <FieldError message={fieldErrors.fullName} />
      </div>

      <div>
        <label className={authLabelClass}>Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className={authInputClass(fieldErrors.email)}
        />
        <FieldError message={fieldErrors.email} />
      </div>

      <div>
        <label className={authLabelClass}>Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
          className={authInputClass(fieldErrors.phone)}
        />
        <FieldError message={fieldErrors.phone} />
      </div>

      <div>
        <label className={authLabelClass}>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Create password (min 12 characters)"
          className={authInputClass(fieldErrors.password)}
        />
        <FieldError message={fieldErrors.password} />
      </div>

      <div>
        <label className={authLabelClass}>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          className={authInputClass(fieldErrors.confirmPassword)}
        />
        <FieldError message={fieldErrors.confirmPassword} />
      </div>

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
