import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useAiChat } from "../context/AiChatContext";
import AiChatPanel from "./AiChatPanel";

const SEEN_KEY = "allride-ai-chat-seen";
const GREETING_TEXT = "Hi! I'm your AllRide AI assistant.";
const MOBILE_GREETING = "Your AI assistant";


export default function AiChatWidget() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const { isOpen, openChat, closeChat, toggleChat, openSignal } = useAiChat();
  const [isMinimized, setIsMinimized] = useState(false);
  const [showPulse, setShowPulse] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [typedMobileText, setTypedMobileText] = useState("");
  const [fabGreeting, setFabGreeting] = useState(false);
  const isHoveredRef = useRef(false);
  const hoverLeaveTimer = useRef(null);

  // First-visit pulse on FAB
  useEffect(() => {
    if (isOpen) setIsMinimized(false);
  }, [isOpen, openSignal]);

  // FAB greeting on home page load
  // useEffect(() => {
  //   if (!isHome || isOpen || isMinimized) return;

  //   const expandTimer = setTimeout(() => setFabGreeting(true), 1000);
  //   const collapseTimer = setTimeout(() => setFabGreeting(false), 5000);

  //   return () => {
  //     clearTimeout(expandTimer);
  //     clearTimeout(collapseTimer);
  //   };
  // }, [isHome]);

  useEffect(() => {
    if (!isHome || isOpen || isMinimized) return;
  
    const t1 = setTimeout(() => setFabGreeting(true), 1000);
    // const t2 = setTimeout(() => setFabGreeting(false), 4500);
    const t2 = setTimeout(() => {
      if (!isHoveredRef.current) setFabGreeting(false);
    }, 4500);
    // const t3 = setTimeout(() => setFabGreeting(true), 5200);
    // const t4 = setTimeout(() => setFabGreeting(false), 8700);
  
    return () => [t1, t2].forEach(clearTimeout);
  }, [isHome]);

  // Opening from openChat() (e.g. landing CTAs in Todo 6) should expand panel
  // useEffect(() => {
  //   if (isOpen) setIsMinimized(false);
  // }, [isOpen]);

    // Type greeting when pill expands (resets on each peek)
    // useEffect(() => {
    //   if (!fabGreeting) {
    //     setTypedText("");
    //     setTypedMobileText("");
    //     return;
    //   }
  
    //   let desktopIndex = 0;
    //   let mobileIndex = 0;
  
    //   // Small delay so pill spring starts before typing
    //   const startDelay = setTimeout(() => {
    //     const interval = setInterval(() => {
    //       if (desktopIndex < GREETING_TEXT.length) {
    //         desktopIndex += 1;
    //         setTypedText(GREETING_TEXT.slice(0, desktopIndex));
    //       }
    //       if (mobileIndex < MOBILE_GREETING.length) {
    //         mobileIndex += 1;
    //         setTypedMobileText(MOBILE_GREETING.slice(0, mobileIndex));
    //       }
    //       if (
    //         desktopIndex >= GREETING_TEXT.length &&
    //         mobileIndex >= MOBILE_GREETING.length
    //       ) {
    //         clearInterval(interval);
    //       }
    //     }, 38);
  
    //     return () => clearInterval(interval);
    //   }, 200);
  
    //   return () => clearTimeout(startDelay);
    // }, [fabGreeting]);

    useEffect(() => {
      if (!fabGreeting) {
        setTypedText("");
        setTypedMobileText("");
        return;
      }
  
      let desktopIndex = 0;
      let mobileIndex = 0;
      let intervalId;
  
      const startDelay = setTimeout(() => {
        intervalId = setInterval(() => {
          if (desktopIndex < GREETING_TEXT.length) {
            desktopIndex += 1;
            setTypedText(GREETING_TEXT.slice(0, desktopIndex));
          }
          if (mobileIndex < MOBILE_GREETING.length) {
            mobileIndex += 1;
            setTypedMobileText(MOBILE_GREETING.slice(0, mobileIndex));
          }
          if (
            desktopIndex >= GREETING_TEXT.length &&
            mobileIndex >= MOBILE_GREETING.length
          ) {
            clearInterval(intervalId);
          }
        }, 18);
      }, 50);
  
      return () => {
        clearTimeout(startDelay);
        if (intervalId) clearInterval(intervalId);
      };
    }, [fabGreeting]);

  // Escape closes chat
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const handleFabClick = () => {
    setFabGreeting(false);
    localStorage.setItem(SEEN_KEY, "1");
    setShowPulse(false);
    if (isOpen && isMinimized) {
      setIsMinimized(false);
      return;
    }
    toggleChat();
  };

  const handleFabHoverIn = () => {
    if (!window.matchMedia("(hover: hover)").matches) return;

  // isHoveredRef.current = true;
  // setFabGreeting(true);
     clearTimeout(hoverLeaveTimer.current);
     isHoveredRef.current = true;
     // Force typing effect to restart
  setFabGreeting(false);
  requestAnimationFrame(() => setFabGreeting(true));
  };
  
  const handleFabHoverOut = () => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    
  // isHoveredRef.current = false;
  // setFabGreeting(false);

  hoverLeaveTimer.current = setTimeout(() => {
    isHoveredRef.current = false;
    setFabGreeting(false);
  }, 150);
  };

  const handleClose = () => {
    setIsMinimized(false);
    closeChat();
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleExpandFromBar = () => {
    setIsMinimized(false);
    if (!isOpen) openChat();
  };

  const panelVisible = isOpen && !isMinimized;
  const barVisible = isOpen && isMinimized;

  return (
    <>
      {/* Mobile backdrop when panel is fully open */}
      {panelVisible && (
        <button
          type="button"
          aria-label="Close chat overlay"
          onClick={handleClose}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* Full panel — desktop: bottom-right card; mobile: nearly full screen */}
      {panelVisible && (
        <div
          className="fixed z-50 flex flex-col overflow-hidden shadow-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900
            inset-x-3 bottom-3 top-auto h-[min(640px,calc(100vh-5rem))] rounded-3xl
            md:inset-auto md:right-6 md:bottom-6 md:w-[400px] md:h-[min(640px,85vh)]"
          role="dialog"
          aria-label="AllRide AI chat"
        >
          <AiChatPanel onClose={handleClose} onMinimize={handleMinimize} />
        </div>
      )}

      {/* Minimized bar */}
      {barVisible && (
        <button
          type="button"
          onClick={handleExpandFromBar}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 pl-3 pr-4 py-2.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black shadow-2xl hover:scale-105 transition-transform"
        >
          <Sparkles size={16} />
          <span className="text-xs font-bold">AllRide AI</span>
        </button>
      )}

      {/* FAB — hidden when panel open (not minimized) */}
      {!panelVisible && !barVisible && (
        <div
  className="fixed bottom-6 right-6 z-50 flex flex-row-reverse items-center gap-0"
  onMouseEnter={handleFabHoverIn}
  onMouseLeave={handleFabHoverOut}
>    {/* Icon — always centered in its own circle */}
    <motion.button
      type="button"
      onClick={handleFabClick}
      aria-label="Open AllRide AI chat"
      animate={{
        scale: fabGreeting ? [1, 1.12, 1] : 1,
        rotate: fabGreeting ? [0, -8, 8, 0] : 0,
      }}
      transition={{
        duration: 0.6,
        ease: "easeInOut",
      }}
      className="relative z-10 w-14 h-14 shrink-0 rounded-full bg-yellow-500 text-black shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
    >
      {/* Ping ring when greeting starts */}
      {fabGreeting && (
        <motion.span
          initial={{ scale: 0.8, opacity: 0.6 }}
          animate={{ scale: 2.2, opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 rounded-full bg-yellow-400"
        />
      )}
      <motion.div
        animate={{ rotate: fabGreeting ? 360 : 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <Sparkles size={22} strokeWidth={2.5} />
      </motion.div>
    </motion.button>

    {/* Greeting pill — grows to the LEFT of the icon */}
    <motion.div
      initial={false}
      animate={{
        maxWidth: fabGreeting ? 340 : 0,
        opacity: fabGreeting ? 1 : 0,
        marginRight: fabGreeting ? 10 : 0,
      }}
      transition={{
        width: { type: "spring", stiffness: 260, damping: 22 },
        opacity: { duration: 0.25 },
        marginRight: { type: "spring", stiffness: 260, damping: 22 },
      }}
      className="overflow-hidden h-12 flex items-center rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black shadow-xl"
    >
      {/* <motion.p
        initial={false}
        animate={{ x: fabGreeting ? 0 : 16, opacity: fabGreeting ? 1 : 0 }}
        transition={{ delay: fabGreeting ? 0.15 : 0, duration: 0.35 }}
        className="text-xs font-bold whitespace-nowrap pl-4 pr-2 hidden sm:block"
      >
        {GREETING_TEXT}
      </motion.p>
      <motion.p
        initial={false}
        animate={{ x: fabGreeting ? 0 : 16, opacity: fabGreeting ? 1 : 0 }}
        transition={{ delay: fabGreeting ? 0.15 : 0, duration: 0.35 }}
        className="text-xs font-bold whitespace-nowrap pl-4 pr-2 sm:hidden"
      >
        Your AI assistant
      </motion.p> */}

{/* Desktop — text lives IN the bar */}
<p className="text-xs font-bold whitespace-nowrap pl-4 pr-3 hidden sm:block">
        {typedText}
        {fabGreeting && typedText.length < GREETING_TEXT.length && (
          <span className="inline-block w-[2px] h-3 ml-0.5 bg-white dark:bg-black animate-pulse align-middle" />
        )}
      </p>
      {/* Mobile — same bar, shorter copy */}
      <p className="text-xs font-bold whitespace-nowrap pl-4 pr-3 sm:hidden">
        {typedMobileText}
        {fabGreeting && typedMobileText.length < MOBILE_GREETING.length && (
          <span className="inline-block w-[2px] h-3 ml-0.5 bg-white dark:bg-black animate-pulse align-middle" />
        )}
      </p>

    </motion.div>

    {/* <motion.p
  initial={false}
  animate={{ x: fabGreeting ? 0 : 16, opacity: fabGreeting ? 1 : 0 }}
  transition={{ delay: fabGreeting ? 0.15 : 0, duration: 0.35 }}
  className="text-xs font-bold whitespace-nowrap pl-4 pr-2 hidden sm:block"
>
  {typedText}
  {fabGreeting && typedText.length < GREETING_TEXT.length && (
    <span className="inline-block w-[2px] h-3 ml-0.5 bg-white dark:bg-black animate-pulse align-middle" />
  )}
</motion.p>

<motion.p
  initial={false}
  animate={{ x: fabGreeting ? 0 : 16, opacity: fabGreeting ? 1 : 0 }}
  transition={{ delay: fabGreeting ? 0.15 : 0, duration: 0.35 }}
  className="text-xs font-bold whitespace-nowrap pl-4 pr-2 sm:hidden"
>
  {typedMobileText}
  {fabGreeting && typedMobileText.length < MOBILE_GREETING.length && (
    <span className="inline-block w-[2px] h-3 ml-0.5 bg-white dark:bg-black animate-pulse align-middle" />
  )}
</motion.p> */}

  </div>
)}
    </>
  );
}