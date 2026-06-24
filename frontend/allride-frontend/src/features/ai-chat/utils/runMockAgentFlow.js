import { getAgentStepsForZone } from "../constants/mockAgentData";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Simulates POST /api/v1/ai/dispatcher/run
 *
 * @param {{
 *   zoneId: string,
 *   onStep: (step: object) => void,
 * }} params
 */
export async function runMockAgentFlow({ zoneId, onStep }) {
  const steps = getAgentStepsForZone(zoneId);

  onStep({ role: "system", kind: "text", content: `Agent cycle started for zone ${zoneId}...` });
  await wait(500);

  for (const step of steps) {
    if (step.type === "thought") {
      onStep({ role: "assistant", kind: "thought", content: step.content });
      await wait(700);
      continue;
    }

    if (step.type === "tool") {
      onStep({ role: "assistant", kind: "tool", data: step.toolCall });
      await wait(900);
      continue;
    }

    if (step.type === "outcome") {
      onStep({ role: "assistant", kind: "outcome", data: step.outcome });
      await wait(400);
    }
  }

  onStep({ role: "system", kind: "text", content: "Agent cycle complete." });
}