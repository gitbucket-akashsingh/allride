export const authLabelClass =
  "text-sm text-zinc-500 dark:text-gray-400 mb-2 block";

export const authInputClass = (hasError = false) =>
  `w-full px-5 py-4 rounded-2xl bg-white border text-zinc-900 placeholder:text-zinc-400 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500 ${
    hasError ? "border-red-500" : "border-zinc-200 dark:border-white/10"
  } focus:outline-none focus:border-yellow-500 transition-all`;

export const authMutedText = "text-zinc-500 dark:text-gray-400";
export const authLinkClass = "text-yellow-600 dark:text-yellow-400 font-semibold hover:text-yellow-500 dark:hover:text-yellow-300";
export const authDividerBg = "bg-white dark:bg-zinc-950";

export const logoBoxClass = "bg-black dark:bg-white";

export const authLogoBoxClass =
  `w-20 h-20 rounded-3xl ${logoBoxClass} flex items-center justify-center shadow-2xl mb-5`;

export const authDividerLineClass = "w-full border-t border-zinc-200 dark:border-white/10";

export const authGoogleButtonClass =
  "flex items-center justify-center gap-3 py-4 rounded-2xl border border-zinc-200 bg-white text-zinc-900 font-semibold hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800 transition-all duration-300 hover:scale-[1.02]";

export const authGithubButtonClass =
  "flex items-center justify-center gap-3 py-4 rounded-2xl border border-zinc-200 bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:border-white/10 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800 transition-all duration-300 font-semibold hover:scale-[1.02]";

export const authSecondaryButtonClass =
  "w-full py-4 rounded-2xl border border-zinc-200 bg-zinc-100 font-semibold hover:bg-zinc-200 dark:border-white/10 dark:bg-zinc-900 dark:hover:bg-zinc-800 transition-colors";

export const authOtpInputClass =
  "w-14 h-16 text-center text-2xl font-black rounded-2xl bg-white border border-zinc-200 text-zinc-900 dark:bg-zinc-900 dark:border-white/10 dark:text-white focus:outline-none focus:border-yellow-500";