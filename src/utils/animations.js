import gsap from "gsap";

/**
 * Checks whether the browser/device has prefers-reduced-motion active.
 * @returns {boolean}
 */
export const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Run a GSAP animation safely with respect to prefers-reduced-motion.
 * If reduced motion is preferred, we trigger a fallback (e.g. instant or simple fade) or bypass completely.
 * 
 * @param {Function} animationCallback - Callback containing GSAP animations
 * @param {HTMLElement|React.RefObject} scope - Scoping container ref
 */
export const safeAnimation = (animationCallback, scope) => {
  const mm = gsap.matchMedia();
  
  mm.add(
    {
      reduce: "(prefers-reduced-motion: reduce)",
      animate: "(prefers-reduced-motion: no-preference)"
    },
    (context) => {
      const { reduce } = context.conditions;
      if (reduce) {
        // Fallback: simple fade-in or instant display
        gsap.set(scope.current || scope, { opacity: 1, visibility: "visible" });
      } else {
        // Run full animations
        animationCallback(context);
      }
    }
  );

  return mm;
};

// Preset configurations
export const easePresets = {
  power2Out: "power2.out",
  power3Out: "power3.out",
  backOut: "back.out(1.7)",
  elasticOut: "elastic.out(1, 0.3)",
  easeIO: "power2.inOut"
};
