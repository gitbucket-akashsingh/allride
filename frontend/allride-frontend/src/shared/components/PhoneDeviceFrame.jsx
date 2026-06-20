function PhoneDeviceFrame({ children, className = "" }) {
  return (
    <div className={`relative flex justify-center lg:justify-end ${className}`}>
      {/* Static glow — no transform */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[360px] h-[580px] rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(245,158,11,0.4) 0%, transparent 70%)",
        }}
      />

      <div
        className="relative w-[320px] sm:w-[380px] h-[650px] rounded-[48px] p-[10px]
          bg-gradient-to-b from-zinc-800 to-zinc-950
          shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.1)_inset]
          dark:from-zinc-900 dark:to-black"
      >
        <div className="absolute -left-[2px] top-28 w-[3px] h-10 rounded-full bg-zinc-700/80" />
        <div className="absolute -left-[2px] top-44 w-[3px] h-14 rounded-full bg-zinc-700/80" />
        <div className="absolute -right-[2px] top-36 w-[3px] h-16 rounded-full bg-zinc-700/80" />

        <div className="relative h-full rounded-[38px] overflow-hidden bg-black ring-1 ring-white/10">
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 h-[26px] w-[100px] rounded-full bg-black border border-white/10 shadow-inner" />

          <div className="relative h-full overflow-hidden bg-zinc-950">
            {children}
          </div>

          <div
            className="pointer-events-none absolute inset-0 z-20 rounded-[38px]
              bg-gradient-to-br from-white/[0.12] via-transparent to-transparent"
          />
        </div>
      </div>
    </div>
  );
}

export default PhoneDeviceFrame;