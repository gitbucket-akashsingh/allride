import { Scale, Radar, Sparkles, ArrowRight } from "lucide-react";
import AnimatedSection from "@/features/landing/components/AnimatedSection";
import { useAiChat } from "@/features/ai-chat/context/AiChatContext";
import { CHAT_MODES } from "@/features/ai-chat/constants/chatModes";

const AI_FEATURES = [
  {
    id: CHAT_MODES.DISPUTE,
    icon: Scale,
    badge: "RAG Pipeline",
    title: "Automated Dispute & Policy Resolver",
    description:
      "Users dispute overcharges, cancellation fees, or lost items. The AI pulls ride logs, retrieves relevant policy snippets from a vector store, and generates a context-aware refund decision.",
    bullets: [
      "Ride log + fare context",
      "Policy similarity search (PGvector)",
      "Automated resolution or escalation",
    ],
    cta: "Try Policy Resolver",
  },
  {
    id: CHAT_MODES.DISPATCHER,
    icon: Radar,
    badge: "AI Agent",
    title: "Autonomous Dispatcher & Traffic Agent",
    description:
      "When demand spikes or weather shifts, an agent analyzes city state and autonomously calls tools — driver availability, weather, surge pricing, and driver notifications.",
    bullets: [
      "getDriverAvailability(zone)",
      "getWeatherForecast()",
      "updateDynamicPricingMultiplier()",
    ],
    cta: "Try Dispatcher Agent",
  },
];

function AiFeatureCard({ feature, onTry }) {
  const Icon = feature.icon;

  return (
    <article className="group flex flex-col h-full p-8 rounded-[32px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 hover:border-yellow-500/40 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
          <Icon
            className="w-7 h-7 text-yellow-600 dark:text-yellow-500"
            strokeWidth={2}
            aria-hidden
          />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
          {feature.badge}
        </span>
      </div>

      <h3 className="text-2xl font-black mb-3 text-zinc-900 dark:text-white">
        {feature.title}
      </h3>

      <p className="text-zinc-500 dark:text-gray-400 leading-relaxed mb-6 flex-1">
        {feature.description}
      </p>

      <ul className="space-y-2 mb-8">
        {feature.bullets.map((bullet) => (
          <li
            key={bullet}
            className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300"
          >
            <Sparkles
              size={14}
              className="text-yellow-500 shrink-0 mt-0.5"
              aria-hidden
            />
            <span className="font-mono text-xs sm:text-sm">{bullet}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => onTry(feature.id)}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-bold hover:scale-[1.02] active:scale-[0.98] transition-transform"
      >
        {feature.cta}
        <ArrowRight size={16} />
      </button>
    </article>
  );
}

export default function AiFeaturesSection() {
  const { openChat } = useAiChat();

  const handleTry = (mode) => {
    openChat(mode);
  };

  return (
    <div className="bg-zinc-50 text-zinc-900 dark:bg-black dark:text-white overflow-hidden">
      <AnimatedSection id="ai-features" className="py-28 bg-zinc-100 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-16">
            <p className="text-yellow-500 font-semibold mb-4">POWERED BY SPRING AI</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6">
              AI Built Into the Ride Platform
            </h2>
            <p className="text-zinc-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              Two production-grade AI capabilities — dispute resolution with RAG and an
              autonomous dispatcher agent — embedded directly in AllRide.
            </p>
          </div>

          {/* Equal-weight cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {AI_FEATURES.map((feature) => (
              <AiFeatureCard
                key={feature.id}
                feature={feature}
                onTry={handleTry}
              />
            ))}
          </div>

          {/* Secondary hint toward FAB */}
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-12">
            Or use the{" "}
            <span className="inline-flex items-center gap-1 font-semibold text-yellow-600 dark:text-yellow-400">
              <Sparkles size={14} />
              chat button
            </span>{" "}
            anytime at the bottom-right.
          </p>
        </div>
      </AnimatedSection>
    </div>
  );
}