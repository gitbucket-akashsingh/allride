/**
 * Scroll to a landing section by id.
 * offset: extra px subtracted from scroll position (use 0 when sections
 * are designed for the floating navbar overlay).
 */
export function scrollToSection(sectionId, options = {}) {
    const { behavior = "smooth", offset = 0 } = options;
    const el = document.getElementById(sectionId);
    if (!el) return false;
  
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
  
    window.scrollTo({
      top,
      behavior,
    });
  
    return true;
  }