import { Radar, Zap, Users, Timer } from "lucide-react";

/**
 * @param {import("../../api/contracts").ZoneOutcome} props
 */
export default function ZoneOutcomeCard({
  zoneName,
  zoneId,
  surgeMultiplier,
  driversNotified,
  etaImprovement,
}) {
  return (
    <div className="flex-1 min-w-0 bg-white dark:bg-zinc-900 border border-emerald-200 dark:border-emerald-500/30 border-l-4 border-l-emerald-500 rounded-2xl p-3 text-sm shadow-sm">
      <div className="flex items-center justify-between gap-2 mb-3">
        <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
          Zone outcome
        </p>
        <span className="text-[10px] font-mono bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full">
          {zoneId}
        </span>
      </div>

      <p className="text-sm font-black text-zinc-900 dark:text-white mb-3">{zoneName}</p>

      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800 p-2 text-center">
          <Zap size={14} className="mx-auto text-amber-500 mb-1" />
          <p className="text-lg font-black text-zinc-900 dark:text-white">{surgeMultiplier}x</p>
          <p className="text-[9px] text-zinc-500">Surge</p>
        </div>
        <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800 p-2 text-center">
          <Users size={14} className="mx-auto text-blue-500 mb-1" />
          <p className="text-lg font-black text-zinc-900 dark:text-white">{driversNotified}</p>
          <p className="text-[9px] text-zinc-500">Drivers notified</p>
        </div>
        <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800 p-2 text-center">
          <Timer size={14} className="mx-auto text-green-500 mb-1" />
          <p className="text-[10px] font-bold text-zinc-900 dark:text-white leading-tight mt-1">
            {etaImprovement}
          </p>
          <p className="text-[9px] text-zinc-500">ETA impact</p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 mt-3 text-[10px] text-zinc-500">
        <Radar size={12} />
        Autonomous dispatcher applied city-wide balancing actions
      </div>
    </div>
  );
}