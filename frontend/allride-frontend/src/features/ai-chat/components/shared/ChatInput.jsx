import { ChevronRight } from "lucide-react";

/**
 * @param {{
 *   value: string,
 *   onChange: (value: string) => void,
 *   onSend: () => void,
 *   disabled?: boolean,
 *   placeholder?: string,
 * }} props
 */
export default function ChatInput({
  value,
  onChange,
  onSend,
  disabled = false,
  placeholder = "Type your message...",
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!disabled && value.trim()) onSend();
    }
  };

  return (
    <div className="flex items-end gap-2 p-3 border-t border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900">
      <textarea
        rows={1}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={placeholder}
        className="flex-1 resize-none rounded-xl px-3 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-yellow-500 disabled:opacity-60"
      />
      <button
        type="button"
        onClick={onSend}
        disabled={disabled || !value.trim()}
        className="w-10 h-10 shrink-0 rounded-xl bg-yellow-500 text-black flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-40 disabled:hover:scale-100"
        aria-label="Send message"
      >
        <ChevronRight size={18} strokeWidth={2.5} />
      </button>
    </div>
  );
}