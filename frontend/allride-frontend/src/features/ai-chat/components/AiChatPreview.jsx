import { AiChatProvider, useAiChat } from "../context/AiChatContext";
import AiChatPanel from "./AiChatPanel";

function PreviewInner() {
  const { activeMode } = useAiChat();

  return (
    <div className="max-w-md mx-auto mt-10 mb-10 border border-zinc-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-xl h-[560px] flex flex-col">
      <AiChatPanel
        onClose={() => {}}
        onMinimize={() => {}}
      />
    </div>
  );
}

export default function AiChatPreview() {
  return (
    <AiChatProvider>
      <PreviewInner />
    </AiChatProvider>
  );
} 