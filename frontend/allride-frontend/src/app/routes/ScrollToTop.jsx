import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets scroll to top when the route pathname changes.
 * Skip when landing on "/" with a section scroll intent (navbar section links).
 */
function ScrollToTop() {
  const { pathname, state } = useLocation();

  useEffect(() => {
    // Home + scrollTo state = navbar section link from another page — don't jump to top
    if (pathname === "/" && state?.scrollTo) return;

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, state]);

  return null;
}

export default ScrollToTop;