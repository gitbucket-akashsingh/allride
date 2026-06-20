import { Sparkles } from "lucide-react";

export default function AiAvatar({ size = 28 }) {
  return (
    <div
      className="rounded-lg bg-black flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
    >
      <Sparkles size={size * 0.45} className="text-white" />
    </div>
  );
}