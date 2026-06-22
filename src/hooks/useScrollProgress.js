import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook to animate page-level scroll progress on a target element.
 * Binds scaleX to the page scroll position.
 * 
 * @returns {React.RefObject} - Reference to the progress bar DOM element
 */
export const useScrollProgress = () => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: "html",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.2,
          },
        }
      );
    }, element);

    return () => ctx.revert();
  }, []);

  return ref;
};

export default useScrollProgress;
