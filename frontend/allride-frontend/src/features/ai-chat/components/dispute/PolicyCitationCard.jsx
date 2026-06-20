import { FileSearch } from "lucide-react";

/**
 * @param {import("../../api/contracts").PolicyCitation} props
 */
export default function PolicyCitationCard({ title, snippet, score }) {
  return (
    <div className="flex-1 min-w-0 bg-white dark:bg-zinc-900 border border-blue-200 dark:border-blue-500/30 border-l-4 border-l-blue-500 rounded-2xl p-3 text-sm shadow-sm">
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-1.5 min-w-0">
          <FileSearch size={14} className="text-blue-500 shrink-0" />
          <p className="text-xs font-bold text-blue-700 dark:text-blue-400 truncate">
            {title}
          </p>
        </div>
        <span className="text-[10px] font-mono shrink-0 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">
          {score.toFixed(2)} match
        </span>
      </div>
      <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed italic">
        "{snippet}"
      </p>
    </div>
  );
}