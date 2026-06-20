import { createContext, useContext, useState, useCallback } from "react";
import { CHAT_MODES } from "../constants/chatModes";

const AiChatContext = createContext(null);

export function AiChatProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMode, setActiveMode] = useState(CHAT_MODES.DISPUTE);
  const [openSignal, setOpenSignal] = useState(0);

  const openChat = useCallback((mode) => {
    if (mode) setActiveMode(mode);
    setIsOpen(true);
    setOpenSignal((n) => n + 1);
  }, []);

  const closeChat = useCallback(() => setIsOpen(false), []);
  const toggleChat = useCallback(() => setIsOpen((v) => !v), []);

  return (
    <AiChatContext.Provider
      value={{ 
        isOpen, 
        activeMode, 
        openSignal,
        setActiveMode, 
        openChat, 
        closeChat, 
        toggleChat 
      }}
    >
      {children}
    </AiChatContext.Provider>
  );
}

export function useAiChat() {
  const ctx = useContext(AiChatContext);
  if (!ctx) throw new Error("useAiChat must be used inside AiChatProvider");
  return ctx;
}