import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import gsap from "gsap";
import { footer } from "../../data/portfolio";

export default function Footer() {
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const marqueeInnerRef = useRef(null);

  // 1. Infinite Marquee Animation (GSAP)
  useEffect(() => {
    const marquee = marqueeInnerRef.current;
    if (!marquee) return;

    const ctx = gsap.context(() => {
      // Moves left by 50% (which represents the duplicated set length) to look seamless
      gsap.to(marquee, {
        xPercent: -50,
        repeat: -1,
        ease: "none",
        duration: 25,
      });
    }, marqueeInnerRef);

    return () => ctx.revert();
  }, []);

  // 2. Track window scrolling for back-to-top button render
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollBtn(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3. Smooth scroll back to top using standard GSAP tweening custom scroll coordinates
  const handleScrollToTop = () => {
    const scrollObj = { y: window.scrollY };
    
    gsap.to(scrollObj, {
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      onUpdate: () => {
        window.scrollTo(0, scrollObj.y);
      },
    });
  };

  return (
    <footer className="w-full bg-[#0d0d1a]/40 border-t border-borderViolet/10 relative z-20">
      
      {/* Row 1: Infinite Tech Marquee */}
      <div className="overflow-hidden w-full border-b border-borderViolet/10 py-5 bg-bgSecondary/20 font-mono text-[10px] md:text-xs uppercase tracking-wider text-textMuted select-none flex">
        <div
          ref={marqueeInnerRef}
          className="flex whitespace-nowrap gap-12 flex-nowrap pr-12"
        >
          {/* Double list mapping to enable seamless scrolling loops */}
          {footer.marquee.map((tech, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accentCyan" />
              <span>{tech}</span>
            </div>
          ))}
          {footer.marquee.map((tech, idx) => (
            <div key={`dup-${idx}`} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accentCyan" />
              <span>{tech}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        {/* Unified Copyright & Links Row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] md:text-xs font-mono text-textMuted"
        >
          {/* Left: Copyright */}
          <span>&copy; {footer.year} Ajay S. All rights reserved.</span>

          {/* Right: Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Ajay-2k3"
              target="_blank"
              rel="noreferrer"
              className="hover:text-accentPink transition-colors duration-200"
            >
              GitHub
            </a>
            <span>·</span>
            <a
              href="https://linkedin.com/in/ajay-s-4b3383267"
              target="_blank"
              rel="noreferrer"
              className="hover:text-accentPink transition-colors duration-200"
            >
              LinkedIn
            </a>
            <span>·</span>
            <button
              onClick={handleScrollToTop}
              className="hover:text-accentPink transition-colors duration-200 focus:outline-none flex items-center gap-1"
            >
              ↑ Back to Top
            </button>
          </div>
        </motion.div>
      </div>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showScrollBtn && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={handleScrollToTop}
            className="fixed bottom-6 right-6 p-3 rounded-xl bg-accentViolet hover:bg-accentViolet/90 text-white shadow-lg shadow-accentViolet/25 hover:shadow-accentViolet/40 cursor-pointer focus:outline-none select-none z-50 transition-colors"
            aria-label="Scroll to Top"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
