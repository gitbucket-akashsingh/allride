import { DISPUTE_QUICK_PROMPTS } from "../../constants/mockDisputeData";

/**
 * @param {{ onSelect: (message: string, type: string) => void, disabled?: boolean }} props
 */
export default function DisputeQuickChips({ onSelect, disabled = false }) {
  return (
    <div className="flex flex-wrap gap-2 px-4 pt-3">
      {DISPUTE_QUICK_PROMPTS.map((prompt) => (
        <button
          key={prompt.type}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(prompt.message, prompt.type)}
          className="text-xs font-semibold px-3 py-1.5 rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:border-yellow-500 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors disabled:opacity-50"
        >
          {prompt.label}
        </button>
      ))}
    </div>
  );
}