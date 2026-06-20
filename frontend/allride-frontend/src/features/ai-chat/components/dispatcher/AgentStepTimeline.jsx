import ChatMessage from "../shared/ChatMessage";
import AiAvatar from "../shared/AiAvatar";
import ToolCallCard from "./ToolCallCard";
import ZoneOutcomeCard from "./ZoneOutcomeCard";

function AssistantRow({ children }) {
  return (
    <div className="flex items-start gap-2">
      <AiAvatar size={28} />
      {children}
    </div>
  );
}

/**
 * @param {{ steps: Array<{ id: string, role: string, kind: string, content?: string, data?: object }> }} props
 */
export default function AgentStepTimeline({ steps }) {
  return (
    <div className="space-y-3">
      {steps.map((step) => {
        if (step.kind === "text") {
          return (
            <ChatMessage key={step.id} role={step.role}>
              {step.content}
            </ChatMessage>
          );
        }

        if (step.kind === "thought") {
          return (
            <ChatMessage key={step.id} role="assistant">
              <span className="text-zinc-500 dark:text-zinc-400 text-[10px] font-semibold uppercase tracking-wide block mb-1">
                Reasoning
              </span>
              {step.content}
            </ChatMessage>
          );
        }

        if (step.kind === "tool") {
          return (
            <AssistantRow key={step.id}>
              <ToolCallCard {...step.data} />
            </AssistantRow>
          );
        }

        if (step.kind === "outcome") {
          return (
            <AssistantRow key={step.id}>
              <ZoneOutcomeCard {...step.data} />
            </AssistantRow>
          );
        }

        return null;
      })}
    </div>
  );
}