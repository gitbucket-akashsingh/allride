import AiAvatar from "./AiAvatar";

export default function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <AiAvatar size={28} />
      <div className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl rounded-bl-md px-4 py-3">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce [animation-delay:0ms]" />
          <span className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce [animation-delay:150ms]" />
          <span className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}