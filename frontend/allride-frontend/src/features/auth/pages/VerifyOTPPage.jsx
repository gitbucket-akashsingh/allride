import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthPageShell, AuthCard } from "@/features/auth/components/AuthPageShell";
import {
  authLogoBoxClass,
  authMutedText,
  authLinkClass,
  authOtpInputClass,
} from "@/features/auth/constants/authStyles";
import AllRideLogo from "@/shared/components/AllRideLogo";
import {
  verifyEmailOtp,
  resendEmailOtp,
} from "@/features/auth/services/authService";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 60;

function VerifyOTPPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || new URLSearchParams(location.search).get("email");

  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(""));
  const [submitting, setSubmitting] = useState(false);
  const [resendSeconds, setResendSeconds] = useState(RESEND_COOLDOWN);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (resendSeconds <= 0) return;
    const timer = setInterval(() => setResendSeconds((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [resendSeconds]);

  if (!email) {
    return <Navigate to="/signup" replace />;
  }

  const maskedEmail = email.replace(/(.{2}).+(@.+)/, "$1***$2");

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...digits];
    next[index] = value;
    setDigits(next);
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    e.preventDefault();
    const next = Array(OTP_LENGTH).fill("");
    pasted.split("").forEach((ch, i) => { next[i] = ch; });
    setDigits(next);
    inputRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  };

  const handleVerify = async () => {
    const otp = digits.join("");
    if (otp.length !== OTP_LENGTH) {
      toast.error("Enter the full 6-digit code.");
      return;
    }
    setSubmitting(true);
    try {
      await verifyEmailOtp({ email, otp });
      toast.success("Email verified! You can log in now.");
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Verification failed.");
      setDigits(Array(OTP_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (resendSeconds > 0) return;
    try {
      await resendEmailOtp(email);
      toast.success("A new code has been sent.");
      setResendSeconds(RESEND_COOLDOWN);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Could not resend code.");
    }
  };

  return (
    <AuthPageShell backTo="/login" backLabel="Back">
      <AuthCard>
        <div className="flex flex-col items-center text-center mb-10">
          <div className={authLogoBoxClass}>
            <AllRideLogo className="w-12 h-12 object-contain" />
          </div>
          <h1 className="text-4xl font-black tracking-tight">Verify OTP</h1>
          <p className={`${authMutedText} mt-3 text-sm`}>
            Enter the 6-digit code sent to <span className="font-semibold">{maskedEmail}</span>
          </p>
        </div>

        <div className="flex justify-center gap-3 mb-8" onPaste={handlePaste}>
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={authOtpInputClass}
            />
          ))}
        </div>

        <button
          type="button"
          disabled={submitting}
          onClick={handleVerify}
          className="w-full py-4 rounded-2xl bg-yellow-500 text-black font-black hover:scale-[1.02] transition-all duration-300 shadow-2xl disabled:opacity-60"
        >
          {submitting ? "Verifying..." : "Verify OTP"}
        </button>

        <div className={`mt-8 text-center ${authMutedText} text-sm`}>
          Didn&apos;t receive code?{" "}
          <button
            type="button"
            disabled={resendSeconds > 0}
            onClick={handleResend}
            className={`${authLinkClass} disabled:opacity-50`}
          >
            {resendSeconds > 0 ? `Resend in ${resendSeconds}s` : "Resend OTP"}
          </button>
        </div>

        <div className="mt-4 text-center">
          <Link to="/login" className={authLinkClass}>
            Back to Login
          </Link>
        </div>
      </AuthCard>
    </AuthPageShell>
  );
}

export default VerifyOTPPage;