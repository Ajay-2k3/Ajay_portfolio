import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook to animate a numeric count up effect using GSAP.
 * Triggers when the element enters the viewport.
 * 
 * @param {number} targetValue - The number to count up to
 * @param {number} duration - Animation duration in seconds (default 2s)
 * @param {number} delay - Animation delay in seconds (default 0s)
 * @returns {React.RefObject} - DOM element reference
 */
export const useCountUp = (targetValue, duration = 2, delay = 0) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      // Animate innerText using GSAP's snap property to ensure integers
      gsap.fromTo(
        element,
        { innerText: 0 },
        {
          innerText: targetValue,
          duration: duration,
          delay: delay,
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, element);

    return () => ctx.revert();
  }, [targetValue, duration, delay]);

  return ref;
};

export default useCountUp;
