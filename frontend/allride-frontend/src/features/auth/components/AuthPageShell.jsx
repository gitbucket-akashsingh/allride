import { Link } from "react-router-dom";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/shared/hooks/useTheme";

export function AuthPageShell({ backTo = "/", backLabel = "Back to Home", maxWidth = "max-w-md", children }) {
  const { toggleTheme, isDark } = useTheme();

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-white overflow-hidden relative flex items-center justify-center px-4 py-10">
      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <Link
        to={backTo}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-5 py-3 rounded-2xl border border-zinc-200 bg-white/80 backdrop-blur-xl hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 transition-all text-sm font-semibold text-zinc-700 dark:text-white"
      >
        <ArrowLeft size={18} />
        {backLabel}
      </Link>

      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="absolute top-6 right-6 z-20 p-3 rounded-2xl border border-zinc-200 bg-white/80 backdrop-blur-xl hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 transition-all text-zinc-700 dark:text-white"
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`relative z-10 w-full ${maxWidth}`}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function AuthCard({ children, className = "" }) {
  return (
    <div
      className={`backdrop-blur-2xl bg-white border border-zinc-200 shadow-2xl rounded-[36px] p-8 sm:p-10 dark:bg-white/5 dark:border-white/10 ${className}`}
    >
      {children}
    </div>
  );
}