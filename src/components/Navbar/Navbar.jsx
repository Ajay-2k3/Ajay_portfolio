import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { navLinks, logo } from "../../data/portfolio";
import useMagnet from "../../hooks/useMagnet";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const navContainerRef = useRef(null);
  const logoRef = useMagnet(10); // Dynamic magnetic logo pull

  // Compress and glow the capsule dock on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Sync initial mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Entrance animations for dock buttons
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".dock-item", {
        y: -25,
        opacity: 0,
        stagger: 0.06,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.15,
      });
    }, navContainerRef);

    return () => ctx.revert();
  }, []);

  // Keep desktop layout minimal and spacious by showing core navigation nodes
  const desktopLinks = navLinks.filter((link) =>
    ["About", "Skills", "Projects", "Contact"].includes(link.label)
  );

  return (
    <>
      {/* Floating Capsule Dock Bar */}
      <header
        ref={navContainerRef}
        className="fixed top-0 left-0 w-full z-50 py-5 px-6 md:px-12 flex justify-center pointer-events-none transition-all duration-300"
      >
        <div
          className={`w-full max-w-4xl bg-bgSecondary/60 border backdrop-blur-xl rounded-full px-6 py-2.5 flex items-center justify-between shadow-2xl transition-all duration-300 pointer-events-auto select-none ${
            isScrolled
              ? "max-w-3xl py-2 border-accentViolet/25 shadow-accentViolet/10 mt-2"
              : "border-borderViolet/20 mt-0"
          }`}
        >
          
          {/* Logo Monogram & Telemetry light */}
          <div className="dock-item flex items-center gap-3.5">
            <a
              href="#"
              ref={logoRef}
              className="text-lg font-bold font-display tracking-tight text-accentCyan hover:text-accentPink transition-colors duration-300 cursor-pointer"
            >
              {logo}
              <span className="text-accentViolet">.</span>
            </a>
            
            {/* Pulsing Status Capsule */}
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#10b981]/10 border border-[#10b981]/25 text-[8px] font-mono font-bold text-[#10b981]">
              <span className="w-1 h-1 rounded-full bg-[#10b981] animate-ping" />
              <span>ONLINE</span>
            </div>
          </div>

          {/* Desktop Navigation Links (Spaciously Filtered) */}
          <nav className="dock-item hidden md:flex items-center gap-1">
            {desktopLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="relative px-3.5 py-1.5 text-xs font-mono tracking-wider uppercase text-textPrimary/80 hover:text-white transition-colors duration-200"
              >
                {hoveredIdx === idx && (
                  <motion.span
                    layoutId="dock-nav-indicator"
                    className="absolute inset-0 bg-accentViolet/15 border border-accentViolet/30 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="dock-item flex items-center gap-2">
            <a
              href="#contact"
              className="hidden md:inline-flex px-4 py-1 rounded-full bg-accentViolet/10 hover:bg-accentViolet text-textPrimary hover:text-white border border-accentViolet/40 text-[10px] font-mono tracking-wider transition-all duration-300 shadow-md shadow-accentViolet/5 hover:shadow-accentViolet/20"
            >
              <span>HIRE_ME</span>
              <ArrowUpRight size={12} className="ml-1.5 self-center" />
            </a>

            {/* Mobile hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden text-textPrimary hover:text-accentViolet p-2 focus:outline-none cursor-pointer"
              aria-label="Open menu drawer"
            >
              <Menu size={18} />
            </button>
          </div>

        </div>
      </header>

      {/* Fullscreen Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 w-full h-screen bg-bgPrimary/95 z-[99] flex flex-col md:hidden"
          >
            {/* Drawer Header */}
            <div className="flex justify-between items-center px-8 py-5 border-b border-borderViolet/10">
              <span className="text-lg font-bold font-display text-accentCyan">
                {logo}<span className="text-accentViolet">.</span>
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-textPrimary hover:text-accentPink p-2 focus:outline-none cursor-pointer"
                aria-label="Close menu drawer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Complete listing of navigation anchors */}
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.06 }
                }
              }}
              className="flex-grow flex flex-col justify-center items-center gap-5"
            >
              {navLinks.map((link) => (
                <motion.a
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 15 } },
                    exit: { y: -20, opacity: 0 }
                  }}
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xl font-bold font-display tracking-wide text-textPrimary hover:text-accentCyan transition-colors duration-200"
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.a
                variants={{
                  hidden: { scale: 0.9, opacity: 0 },
                  visible: { scale: 1, opacity: 1, transition: { delay: 0.3 } },
                  exit: { scale: 0.9, opacity: 0 }
                }}
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 px-6 py-2 rounded-full bg-accentViolet hover:bg-accentViolet/90 text-white text-xs font-mono flex items-center gap-2 shadow-lg shadow-accentViolet/25"
              >
                <span>INITIATE_CONTACT</span>
                <ArrowUpRight size={14} />
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
