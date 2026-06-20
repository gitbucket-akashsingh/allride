import { Outlet } from "react-router-dom";
import Navbar from "@/features/landing/sections/Navbar";
import Footer from "@/features/landing/sections/Footer";
import { AiChatProvider } from "@/features/ai-chat/context/AiChatContext";
import AiChatWidget from "@/features/ai-chat/components/AiChatWidget";

function MainLayout({  }) {
  return (
    <AiChatProvider>
    <div style={{ minHeight: "100vh", background: "var(--bg-page)" }}>
      <Navbar />
      {/* {children} */}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <AiChatWidget />
    </div>
    </AiChatProvider>
  );
}

export default MainLayout;
