export const CHAT_MODES = {
    DISPUTE: "dispute",
    DISPATCHER: "dispatcher",
  };
  
  export const CHAT_MODE_TABS = [
    {
      id: CHAT_MODES.DISPUTE,
      label: "Policy Resolver",
      description: "RAG dispute & refund assistant",
    },
    {
      id: CHAT_MODES.DISPATCHER,
      label: "City Dispatcher",
      description: "Autonomous traffic & surge agent",
    },
  ];