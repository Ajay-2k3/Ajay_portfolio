import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Reusable magnetic hover hook using GSAP.
 * Pulls elements elastically towards the cursor when hovered.
 * 
 * @param {number} maxForce - The maximum pixel displacement (default 8px)
 * @returns {React.RefObject} - Reference to bind to the magnetic element
 */
export const useMagnet = (maxForce = 8) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const handleMouseMove = (e) => {
        const rect = element.getBoundingClientRect();
        const elementCenterX = rect.left + rect.width / 2;
        const elementCenterY = rect.top + rect.height / 2;
        
        // Calculate displacement from center
        const deltaX = e.clientX - elementCenterX;
        const deltaY = e.clientY - elementCenterY;

        // Scale displacement based on element size and max force
        const targetX = (deltaX / (rect.width / 2)) * maxForce;
        const targetY = (deltaY / (rect.height / 2)) * maxForce;

        gsap.to(element, {
          x: targetX,
          y: targetY,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.3)",
          overwrite: "auto",
        });
      };

      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
        gsap.set(element, { x: 0, y: 0 });
      };
    });

    return () => {
      mm.revert();
    };
  }, [maxForce]);

  return ref;
};
export default useMagnet;
