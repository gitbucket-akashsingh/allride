import { createContext, useContext } from "react";

export const LayoutContext = createContext({
  sidebarCollapsed: false,
});

export const useLayout = () => useContext(LayoutContext);