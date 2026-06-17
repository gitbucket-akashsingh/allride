import { useNavigate } from "react-router-dom";
import logo from "@/assets/allride-logo.png";

function SidebarBrand({ collapsed }) {
  const navigate = useNavigate();

  return (
    <button
  type="button"
  onClick={() => navigate("/")}
  title="Visit homepage"
  className="w-full flex items-center gap-3 px-4 py-4 border-b transition-colors hover:bg-[var(--card-hover)]"
  style={{ borderColor: "var(--sidebar-border)" }}
>
  <div
    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
    style={{ background: "var(--bg-panel)", border: "1px solid var(--border-color)" }}
  >
    <img src={logo} alt="AllRide" className="w-6 h-6 object-contain" />
  </div>
  {!collapsed && (
    <div className="text-left min-w-0">
      <p className="font-black text-sm leading-none" style={{ color: "var(--text-primary)" }}>
        AllRide
      </p>
      <p className="text-[10px] mt-1" style={{ color: "var(--text-secondary)" }}>
        Visit homepage
      </p>
    </div>
  )}
</button>
  );
}

export default SidebarBrand;