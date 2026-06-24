import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";
import { Sparkles, Lock } from "lucide-react";

export default function AiAuthBanner() {
  const { isAuthenticated, user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return null;

  if (isAuthenticated) {
    const name = user?.name || user?.email?.split("@")[0] || "Rider";
    return (
      <div className="shrink-0 mx-3 mt-2 px-3 py-2 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 flex items-center gap-2">
        <Sparkles size={14} className="text-green-600 dark:text-green-400 shrink-0" />
        <p className="text-[10px] text-green-800 dark:text-green-300 leading-snug">
          Signed in as <span className="font-bold">{name}</span> · Personalized results enabled
        </p>
      </div>
    );
  }

  return (
    <div className="shrink-0 mx-3 mt-2 px-3 py-2 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 flex items-center justify-between gap-2">
      <div className="flex items-center gap-2 min-w-0">
        <Lock size={14} className="text-amber-600 dark:text-amber-400 shrink-0" />
        <p className="text-[10px] text-amber-900 dark:text-amber-200 leading-snug">
          Demo mode — sign in for your ride data
        </p>
      </div>
      <button
        type="button"
        onClick={() => navigate("/login")}
        className="text-[10px] font-bold text-amber-800 dark:text-amber-300 hover:underline shrink-0"
      >
        Log in
      </button>
    </div>
  );
}