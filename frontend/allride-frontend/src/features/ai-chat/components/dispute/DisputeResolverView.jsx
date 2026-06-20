import { useState, useRef, useEffect } from "react";
import ChatMessage from "../shared/ChatMessage";
import ChatInput from "../shared/ChatInput";
import TypingIndicator from "../shared/TypingIndicator";
import AiAvatar from "../shared/AiAvatar";
import DisputeQuickChips from "./DisputeQuickChips";
import RideContextCard from "./RideContextCard";
import PolicyCitationCard from "./PolicyCitationCard";
import ResolutionCard from "./ResolutionCard";
import { runMockDisputeFlow } from "../../utils/runMockDisputeFlow";

function AssistantRow({ children }) {
  return (
    <div className="flex items-start gap-2">
      <AiAvatar size={28} />
      {children}
    </div>
  );
}

function renderDisputeMessage(msg) {
  if (msg.kind === "text") {
    return (
      <ChatMessage key={msg.id} role={msg.role}>
        {msg.content}
      </ChatMessage>
    );
  }

  if (msg.kind === "ride-context") {
    return (
      <AssistantRow key={msg.id}>
        <RideContextCard {...msg.data} />
      </AssistantRow>
    );
  }

  if (msg.kind === "policy") {
    return (
      <AssistantRow key={msg.id}>
        <PolicyCitationCard {...msg.data} />
      </AssistantRow>
    );
  }

  if (msg.kind === "resolution") {
    return (
      <AssistantRow key={msg.id}>
        <ResolutionCard {...msg.data} />
      </AssistantRow>
    );
  }

  return null;
}

export default function DisputeResolverView() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const bottomRef = useRef(null);

  // Auto-scroll when new messages appear
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isRunning]);

  const startFlow = async (message, disputeType) => {
    setInput("");
    
    const trimmed = message.trim();
    if (!trimmed || isRunning) return;

    setIsRunning(true);

    try {
      await runMockDisputeFlow({
        message: trimmed,
        disputeType,
        onStep: (step) => {
          setMessages((prev) => [
            ...prev,
            { id: crypto.randomUUID(), ...step },
          ]);
        },
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleSend = () => {
    const text = input;
    setInput("");
    startFlow(text);
  };

  const handleChipSelect = (message, type) => {
    setInput(message);
    startFlow(message, type);
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Quick chips — show when chat is empty or always at top */}
      <DisputeQuickChips onSelect={handleChipSelect} disabled={isRunning} />

      {/* Message list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
        {isEmpty && (
          <div className="text-center py-8 px-4">
            <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-1">
              Policy Resolver
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Describe a fare dispute, cancellation fee, or lost item. The AI will
              pull ride logs, search policies, and suggest a resolution.
            </p>
          </div>
        )}

        {messages.map(renderDisputeMessage)}
        {isRunning && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      <ChatInput
        value={input}
        onChange={setInput}
        onSend={handleSend}
        disabled={isRunning}
        placeholder="Describe your dispute..."
      />
    </div>
  );
}