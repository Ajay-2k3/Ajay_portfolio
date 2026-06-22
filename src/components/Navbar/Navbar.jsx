import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { navLinks, logo } from "../../data/portfolio";
import useMagnet from "../../hooks/useMagnet";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navContainerRef = useRef(null);
  
  // Apply our custom magnetic effect (max ±8px) to the logo
  const logoRef = useMagnet(8);

  // Mount animation for links and logo
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".nav-logo, .nav-desktop-link, .nav-mobile-btn", {
        y: -20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.1,
      });
    }, navContainerRef);

    return () => ctx.revert();
  }, []);

  // QuickSetter for blur & background opacity on scroll > 50px
  useEffect(() => {
    const nav = navContainerRef.current;
    if (!nav) return;

    // quickSetter for target css variables or properties
    const setBg = gsap.quickSetter(nav, "backgroundColor");
    const setBlur = gsap.quickSetter(nav, "backdropFilter");
    const setBorder = gsap.quickSetter(nav, "borderBottomColor");

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setBg("rgba(13, 13, 26, 0.75)");
        setBlur("blur(20px)");
        setBorder("rgba(124, 58, 237, 0.15)");
      } else {
        setBg("rgba(5, 5, 15, 0)");
        setBlur("blur(0px)");
        setBorder("rgba(124, 58, 237, 0)");
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Call once initially to sync on page refresh
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Framer Motion mobile staggering menu parameters
  const menuVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.4, 
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      x: "100%",
      transition: { 
        duration: 0.3, 
        ease: "easeInOut",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 120, damping: 14 } },
    exit: { opacity: 0, x: 20 }
  };

  return (
    <>
      <nav
        ref={navContainerRef}
        className="fixed top-0 left-0 w-full z-50 py-4 px-6 md:px-12 flex items-center justify-between border-b border-transparent transition-colors duration-300"
      >
        {/* Monogram Logo with magnetic pull */}
        <a
          href="#"
          ref={logoRef}
          className="nav-logo inline-block text-2xl font-bold font-display tracking-tight text-accentCyan hover:text-accentPink transition-colors duration-300 select-none cursor-pointer"
        >
          {logo}
          <span className="text-accentViolet">.</span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-desktop-link text-sm font-medium tracking-wide text-textPrimary hover:text-accentViolet transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Toggle Trigger Button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="nav-mobile-btn md:hidden text-textPrimary hover:text-accentViolet p-2 focus:outline-none"
          aria-label="Open Navigation Menu"
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile Menu Panel - Full Screen Overlay using AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className="fixed inset-0 w-full h-screen bg-bgSecondary/95 backdrop-blur-2xl z-55 md:hidden flex flex-col p-6 justify-between border-l border-borderViolet"
          >
            <div className="flex justify-between items-center py-2">
              <span className="text-2xl font-bold font-display text-accentCyan">{logo}</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-textPrimary hover:text-accentPink p-2 focus:outline-none"
                aria-label="Close Navigation Menu"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-6 my-auto items-center">
              {navLinks.map((link) => (
                <motion.a
                  key={link.label}
                  variants={itemVariants}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-display font-semibold tracking-wide text-textPrimary hover:text-accentCyan transition-colors duration-200"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            <div className="text-center text-xs font-mono text-textMuted py-4">
              Ajay S &copy; {new Date().getFullYear()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
