import { CHAT_MODE_TABS } from "../../constants/chatModes";
import { useAiChat } from "../../context/AiChatContext";

export default function AiChatModeTabs() {
  const { activeMode, setActiveMode } = useAiChat();

  return (
    <div className="flex gap-1 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
      {CHAT_MODE_TABS.map((tab) => {
        const isActive = activeMode === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveMode(tab.id)}
            className={`flex-1 rounded-lg px-2 py-2 text-center transition-all ${
              isActive
                ? "bg-white dark:bg-zinc-900 shadow-sm text-black dark:text-white"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
            }`}
          >
            <p className="text-xs font-bold leading-tight">{tab.label}</p>
            <p className="text-[9px] mt-0.5 leading-tight opacity-70 hidden sm:block">
              {tab.description}
            </p>
          </button>
        );
      })}
    </div>
  );
}