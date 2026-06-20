import { useState } from "react";
import { Wrench, ChevronDown, ChevronUp } from "lucide-react";

/**
 * @param {import("../../api/contracts").ToolCall} props
 */
export default function ToolCallCard({ tool, input, output, durationMs }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex-1 min-w-0 bg-white dark:bg-zinc-900 border border-purple-200 dark:border-purple-500/30 border-l-4 border-l-purple-500 rounded-2xl p-3 text-sm shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <Wrench size={14} className="text-purple-500 shrink-0" />
          <p className="text-xs font-mono font-bold text-purple-700 dark:text-purple-300 truncate">
            {tool}()
          </p>
        </div>
        <span className="text-[10px] text-zinc-500 shrink-0">{durationMs}ms</span>
      </div>

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="mt-2 flex items-center gap-1 text-[10px] font-semibold text-purple-600 dark:text-purple-400 hover:underline"
      >
        {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        {expanded ? "Hide" : "Show"} input / output
      </button>

      {expanded && (
        <div className="mt-2 space-y-2">
          <div>
            <p className="text-[10px] uppercase tracking-wide text-zinc-500 mb-1">Input</p>
            <pre className="text-[10px] leading-relaxed bg-zinc-50 dark:bg-zinc-800 rounded-lg p-2 overflow-x-auto">
              {JSON.stringify(input, null, 2)}
            </pre>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wide text-zinc-500 mb-1">Output</p>
            <pre className="text-[10px] leading-relaxed bg-zinc-50 dark:bg-zinc-800 rounded-lg p-2 overflow-x-auto">
              {JSON.stringify(output, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}