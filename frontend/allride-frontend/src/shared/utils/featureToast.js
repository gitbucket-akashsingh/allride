import toast from "react-hot-toast";
import { createElement } from "react";
import { X, Construction } from "lucide-react";

const COMING_SOON_TOAST_ID = "coming-soon-toast";

export const showComingSoon = (feature) => {
  toast.custom(
    (t) =>
      createElement(
        "div",
        {
          className: `flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-sm font-semibold shadow-lg pointer-events-auto ${
            t.visible ? "animate-enter" : "animate-leave"
          }`,
          style: {
            background: "#eab308",
            color: "#000",
            borderColor: "rgba(0,0,0,0.1)",
            maxWidth: "280px",
            pointerEvents: "auto",
          },
        },
        createElement(Construction, {
          size: 16,
          strokeWidth: 2.5,
          className: "shrink-0",
        }),
        createElement(
          "span",
          { className: "leading-snug font-semibold" },
          `${feature} — coming soon`
        ),
        createElement(
          "button",
          {
            type: "button",
            onClick: (e) => {
              e.preventDefault();
              e.stopPropagation();
              toast.remove(COMING_SOON_TOAST_ID);
            },
            className: "shrink-0 rounded-md p-1 hover:bg-black/10 transition-colors cursor-pointer",
            "aria-label": "Close",
          },
          createElement(X, { size: 14, strokeWidth: 2.5 })
        )
      ),
    {
      id: COMING_SOON_TOAST_ID,
      duration: 3000,
      position: "top-right",
    }
  );
};