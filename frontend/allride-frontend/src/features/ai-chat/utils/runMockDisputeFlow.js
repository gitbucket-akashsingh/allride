import {
    MOCK_RIDE_CONTEXT,
    MOCK_POLICY_CITATIONS,
    MOCK_RESOLUTION,
    MOCK_ASSISTANT_MESSAGE,
  } from "../constants/mockDisputeData";
  
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  
  /**
   * Simulates POST /api/v1/ai/disputes/resolve
   *
   * @param {{
   *   message: string,
   *   disputeType?: string,
   *   onStep: (step: object) => void,
   * }} params
   */
  export async function runMockDisputeFlow({ message, disputeType, onStep }) {
    // 1. User message
    onStep({ role: "user", kind: "text", content: message, disputeType });
  
    await wait(600);
    onStep({ role: "system", kind: "text", content: "Retrieving ride logs..." });
  
    await wait(900);
    onStep({ role: "assistant", kind: "ride-context", data: MOCK_RIDE_CONTEXT });
  
    await wait(700);
    onStep({ role: "system", kind: "text", content: "Searching policy documents..." });
  
    await wait(900);
    for (const citation of MOCK_POLICY_CITATIONS) {
      onStep({ role: "assistant", kind: "policy", data: citation });
      await wait(300);
    }
  
    await wait(600);
    onStep({ role: "assistant", kind: "text", content: MOCK_ASSISTANT_MESSAGE });
  
    await wait(400);
    onStep({ role: "assistant", kind: "resolution", data: MOCK_RESOLUTION });
  }