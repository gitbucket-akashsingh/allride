import AiAvatar from "./AiAvatar";

/**
 * @param {{ role: "user"|"assistant"|"system", children: React.ReactNode }} props
 */
export default function ChatMessage({ role, children }) {
  if (role === "system") {
    return (
      <div className="flex justify-center py-1">
        <p className="text-xs text-zinc-500 dark:text-zinc-400 italic">{children}</p>
      </div>
    );
  }

  if (role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] bg-yellow-500 text-black rounded-2xl rounded-br-md px-4 py-2.5 text-sm leading-relaxed">
          {children}
        </div>
      </div>
    );
  }

  // assistant
  return (
    <div className="flex items-end gap-2">
      <AiAvatar size={28} />
      <div className="max-w-[85%] bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-2xl rounded-bl-md px-4 py-2.5 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
}