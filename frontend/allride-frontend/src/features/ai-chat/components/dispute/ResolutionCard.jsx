import toast from "react-hot-toast";
import { CheckCircle2, ArrowUpRight } from "lucide-react";

const DECISION_LABELS = {
  FULL_REFUND: "Full refund",
  PARTIAL_REFUND: "Partial refund",
  DENIED: "Denied",
  ESCALATE: "Escalate to human",
};

/**
 * @param {import("../../api/contracts").Resolution} props
 */
export default function ResolutionCard({ decision, refundAmount, confidence, reasoning }) {
  const handleAccept = () => {
    toast.success(
      refundAmount
        ? `Resolution accepted. Refund of ₹${refundAmount} initiated.`
        : "Resolution accepted."
    );
  };

  const handleEscalate = () => {
    toast("Escalated to human support. Ticket #SUP-4821", { icon: "📩" });
  };

  return (
    <div className="flex-1 min-w-0 bg-white dark:bg-zinc-900 border border-green-200 dark:border-green-500/30 border-l-4 border-l-green-500 rounded-2xl p-3 text-sm shadow-sm">
      <p className="text-xs font-bold text-green-700 dark:text-green-400 uppercase tracking-wide mb-2">
        AI resolution
      </p>

      <div className="flex items-center justify-between gap-2 mb-2">
        <p className="font-black text-zinc-900 dark:text-white">
          {DECISION_LABELS[decision] || decision}
          {refundAmount != null && (
            <span className="text-green-600 dark:text-green-400"> · ₹{refundAmount}</span>
          )}
        </p>
        <span className="text-[10px] text-zinc-500">
          {Math.round(confidence * 100)}% confidence
        </span>
      </div>

      {/* confidence bar */}
      <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full mb-2 overflow-hidden">
        <div
          className="h-full bg-green-500 rounded-full transition-all"
          style={{ width: `${confidence * 100}%` }}
        />
      </div>

      <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed mb-3">
        {reasoning}
      </p>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleAccept}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-green-500 text-white text-xs font-bold hover:opacity-90 transition-opacity"
        >
          <CheckCircle2 size={14} />
          Accept resolution
        </button>
        <button
          type="button"
          onClick={handleEscalate}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-zinc-200 dark:border-white/10 text-xs font-bold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
        >
          <ArrowUpRight size={14} />
          Escalate
        </button>
      </div>
    </div>
  );
}