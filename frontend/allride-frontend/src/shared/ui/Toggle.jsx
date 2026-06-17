function Toggle({
    value,
    onChange,
    size = "sm",
    activeClassName = "bg-black",
    inactiveClassName = "bg-zinc-300",
  }) {
    const sizes = {
      sm: { track: "h-5 w-9", knob: "h-4 w-4" },
      md: { track: "h-6 w-11", knob: "h-5 w-5" },
    };
  
    const s = sizes[size];
  
    return (
      <button
        type="button"
        role="switch"
        aria-checked={value}
        onClick={(e) => {
          e.stopPropagation(); // important inside clickable rows
          onChange(!value);
        }}
        className={`relative flex shrink-0 items-center rounded-full p-0.5 transition-colors overflow-hidden ${s.track} ${
          value ? activeClassName : inactiveClassName
        } ${value ? "justify-end" : "justify-start"}`}
      >
        <span
          className={`rounded-full bg-white shadow ${s.knob}`}
        />
      </button>
    );
  }
  
  export default Toggle;