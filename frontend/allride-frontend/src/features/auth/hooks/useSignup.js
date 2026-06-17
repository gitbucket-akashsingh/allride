import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { signupUser } from "@/features/auth/services/authService";
import { signupSchema } from "@/features/auth/validations/authScemas";
import { getValidSignupRole } from "@/features/auth/constants/signupRoles";


function zodIssuesToFieldErrors(issues) {
  return issues.reduce((acc, issue) => {
    const field = issue.path[0];
    if (field && !acc[field]) {
      acc[field] = issue.message;
    }
    return acc;
  }, {});
}

export const useSignup = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // const roleFromUrl = searchParams.get("role")?.toUpperCase() || "RIDER";
  const roleFromUrl = getValidSignupRole(searchParams.get("role")) || "RIDER";

  const handleSignup = async (formData, setFieldErrors) => {
    const result = signupSchema.safeParse({ ...formData, role: roleFromUrl });

    if (!result.success) {
      setFieldErrors(zodIssuesToFieldErrors(result.error.issues));
      return;
    }

    try {
      await signupUser(result.data);
      toast.success("Account created successfully!");
      navigate("/signup/success", {
        state: {
          role: roleFromUrl,
          fullName: formData.fullName,
        },
      });
    } catch (error) {
      const message =
        error?.response?.data?.message || "Signup failed. Please try again.";
      toast.error(message);
    }
  };

  return { handleSignup, roleFromUrl };
};
