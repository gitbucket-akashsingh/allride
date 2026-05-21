import toast from "react-hot-toast";

export const showComingSoon = (feature) => {
  toast(`🚧 Feature: ${feature} is under development`, {
    style: {
      background: "#18181b",
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.1)",
      padding: "16px",
      borderRadius: "16px",
    },
  });
};
