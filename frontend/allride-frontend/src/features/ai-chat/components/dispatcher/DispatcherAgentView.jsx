import { useState, useRef, useEffect } from "react";
import { Play, MapPin } from "lucide-react";
import ChatInput from "../shared/ChatInput";
import TypingIndicator from "../shared/TypingIndicator";
import AgentStepTimeline from "./AgentStepTimeline";
import { DISPATCHER_ZONES } from "../../constants/mockAgentData";
import { runMockAgentFlow } from "../../utils/runMockAgentFlow";

export default function DispatcherAgentView() {
  const [zoneId, setZoneId] = useState("HTC-01");
  const [steps, setSteps] = useState([]);
  const [input, setInput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [steps, isRunning]);

  const resolveZoneFromText = (text) => {
    const lower = text.toLowerCase();
    const match = DISPATCHER_ZONES.find(
      (z) =>
        lower.includes(z.name.toLowerCase()) ||
        lower.includes(z.id.toLowerCase())
    );
    return match?.id ?? zoneId;
  };

  const startCycle = async (overrideZoneId) => {
    if (isRunning) return;

    const targetZone = overrideZoneId ?? zoneId;
    setZoneId(targetZone);
    setIsRunning(true);

    try {
      await runMockAgentFlow({
        zoneId: targetZone,
        onStep: (step) => {
          setSteps((prev) => [...prev, { id: crypto.randomUUID(), ...step }]);
        },
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    const detectedZone = resolveZoneFromText(text);
    startCycle(detectedZone);
  };

  const isEmpty = steps.length === 0;

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Controls */}
      <div className="shrink-0 px-4 pt-3 pb-2 border-b border-zinc-100 dark:border-white/5 space-y-2">
        <div className="flex items-center gap-2">
          <MapPin size={14} className="text-zinc-400 shrink-0" />
          <select
            value={zoneId}
            onChange={(e) => setZoneId(e.target.value)}
            disabled={isRunning}
            className="flex-1 text-xs font-semibold rounded-xl px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 focus:outline-none focus:border-yellow-500 disabled:opacity-60"
          >
            {DISPATCHER_ZONES.map((zone) => (
              <option key={zone.id} value={zone.id}>
                {zone.name} ({zone.id})
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={() => startCycle()}
          disabled={isRunning}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black text-xs font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <Play size={14} />
          {isRunning ? "Agent running..." : "Run agent cycle"}
        </button>
      </div>

      {/* Timeline */}
      <div className="flex-1 overflow-y-auto p-4 min-h-0">
        {isEmpty && (
          <div className="text-center py-8 px-4">
            <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-1">
              City Dispatcher Agent
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Simulates a cron-triggered AI agent that calls tools like{" "}
              <code className="text-[10px]">getDriverAvailability</code>,{" "}
              <code className="text-[10px]">getWeatherForecast</code>, and{" "}
              <code className="text-[10px]">updateDynamicPricingMultiplier</code>.
            </p>
          </div>
        )}

        <AgentStepTimeline steps={steps} />
        {isRunning && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      <ChatInput
        value={input}
        onChange={setInput}
        onSend={handleSend}
        disabled={isRunning}
        placeholder='Try "Re-analyze Gachibowli zone"...'
      />
    </div>
  );
}