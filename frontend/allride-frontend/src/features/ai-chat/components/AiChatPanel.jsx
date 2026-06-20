import { X, Minus } from "lucide-react";
import { useAiChat } from "../context/AiChatContext";
import { CHAT_MODES } from "../constants/chatModes";
import AiChatModeTabs from "./shared/AiChatModeTabs";
import AiAvatar from "./shared/AiAvatar";
import DisputeResolverView from "./dispute/DisputeResolverView";
import DispatcherAgentView from "./dispatcher/DispatcherAgentView";

/**
 * @param {{ onClose: () => void, onMinimize: () => void, compact?: boolean }} props
 * compact = true when minimized bar (header only)
 */
export default function AiChatPanel({ onClose, onMinimize, compact = false }) {
  const { activeMode } = useAiChat();

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-900 overflow-hidden">
      {/* Header */}
      <div className="shrink-0 flex items-center justify-between gap-2 px-4 py-3 border-b border-zinc-200 dark:border-white/10">
        <div className="flex items-center gap-2 min-w-0">
          <AiAvatar size={32} />
          <div className="min-w-0">
            <p className="text-sm font-black text-zinc-900 dark:text-white leading-none">
              AllRide AI
            </p>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5 truncate">
              Spring AI · Policy & Dispatcher
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={onMinimize}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Minimize chat"
          >
            <Minus size={16} />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Close chat"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Tabs — hide when minimized compact */}
      {!compact && (
        <div className="shrink-0 px-3 py-2 border-b border-zinc-100 dark:border-white/5">
          <AiChatModeTabs />
        </div>
      )}

      {/* Body */}
      {!compact && (
        <div className="flex-1 min-h-0">
          {activeMode === CHAT_MODES.DISPUTE ? (
            <DisputeResolverView />
          ) : (
            <DispatcherAgentView />
          )}
        </div>
      )}
    </div>
  );
}