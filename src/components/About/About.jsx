import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { about } from "../../data/portfolio";
import { splitText } from "../../utils/splitText";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  
  // Portrait card references
  const portraitContainerRef = useRef(null);
  const portraitImageRef = useRef(null);
  const borderFrameRef = useRef(null);
  const dotsRef = useRef([]);

  // Right column refs
  const bioRefs = useRef([]);
  const statsRowRef = useRef(null);
  const svgPathRef = useRef(null);

  // 1. 3D mouse rotate card effect (GSAP quickSetter)
  useEffect(() => {
    const container = portraitContainerRef.current;
    const card = portraitImageRef.current;
    if (!container || !card) return;

    const ctx = gsap.context(() => {
      const setRotateX = gsap.quickSetter(card, "rotationX", "deg");
      const setRotateY = gsap.quickSetter(card, "rotationY", "deg");

      const handleMouseMove = (e) => {
        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Compute coordinate displacement ratio (clamped to max ±10 degrees)
        const rotX = -((e.clientY - centerY) / (rect.height / 2)) * 10;
        const rotY = ((e.clientX - centerX) / (rect.width / 2)) * 10;

        setRotateX(rotX);
        setRotateY(rotY);
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.6,
          ease: "power2.out",
        });
      };

      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, portraitContainerRef);

    return () => ctx.revert();
  }, []);

  // 2. Corner accent dots pulse on scroll enter
  useEffect(() => {
    const dots = dotsRef.current.filter(Boolean);
    if (dots.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        dots,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 0.8,
          duration: 0.8,
          ease: "elastic.out(1, 0.4)",
          stagger: 0.15,
          scrollTrigger: {
            trigger: portraitContainerRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  // 3. Right column line-by-line text clips, frame animation, and abstract SVG dash draw
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Offset violet border animation on scroll
      if (borderFrameRef.current) {
        gsap.fromTo(
          borderFrameRef.current,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: portraitContainerRef.current,
              start: "top 80%",
              end: "top 50%",
              scrub: 1,
            },
          }
        );
      }

      // Split bio paragraphs into lines and reveal
      const allLines = [];
      bioRefs.current.forEach((paragraph) => {
        if (paragraph) {
          const lines = splitText(paragraph, "lines");
          allLines.push(...lines);
        }
      });

      if (allLines.length > 0) {
        gsap.fromTo(
          allLines,
          { yPercent: 105 },
          {
            yPercent: 0,
            stagger: 0.08,
            ease: "power3.out",
            duration: 0.9,
            scrollTrigger: {
              trigger: bioRefs.current[0],
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // SVG Abstract Line Drawing
      const path = svgPathRef.current;
      if (path) {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: path,
            start: "top 85%",
            end: "bottom 60%",
            scrub: 0.5,
          },
        });
      }

      // Stats Count-up Animations
      if (statsRowRef.current) {
        const statCounters = statsRowRef.current.querySelectorAll(".stat-counter-val");
        statCounters.forEach((counter, idx) => {
          const targetValue = parseInt(counter.getAttribute("data-target"), 10);
          gsap.fromTo(
            counter,
            { innerText: 0 },
            {
              innerText: targetValue,
              duration: 2,
              delay: idx * 0.2, // Stagger count ups
              snap: { innerText: 1 },
              ease: "power2.out",
              scrollTrigger: {
                trigger: statsRowRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 px-6 md:px-12 w-full bg-bgSecondary/30 border-b border-borderViolet/10 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        {/* Left column: Portrait tilt card (60/40 Split: Column 1) */}
        <div className="w-full lg:w-5/12 flex justify-center relative">
          
          {/* Card tilt container */}
          <div
            ref={portraitContainerRef}
            className="perspective-1000 relative w-64 md:w-80 aspect-[3/4] cursor-pointer group"
          >
            {/* Offset violet border frame */}
            <div
              ref={borderFrameRef}
              className="absolute -inset-4 border border-accentViolet/60 rounded-2xl pointer-events-none transform translate-x-4 translate-y-4 z-0"
            />

            {/* Pulsing Accent Corner Dots */}
            <div
              ref={(el) => (dotsRef.current[0] = el)}
              className="absolute -top-6 -left-6 w-3 h-3 rounded-full bg-accentCyan z-20"
            />
            <div
              ref={(el) => (dotsRef.current[1] = el)}
              className="absolute -bottom-6 -right-6 w-3 h-3 rounded-full bg-accentPink z-20"
            />

            {/* Inner rotating card content */}
            <div
              ref={portraitImageRef}
              className="preserve-3d w-full h-full rounded-2xl bg-bgSecondary border border-borderViolet/40 overflow-hidden relative shadow-xl transform transition-transform duration-100 ease-out"
            >
              {/* Overlay glass glare */}
              <div className="absolute inset-0 bg-gradient-to-tr from-accentViolet/5 via-transparent to-accentCyan/5 z-10 pointer-events-none group-hover:opacity-60 transition-opacity duration-300" />
              
              {/* Fallback mockup profile graphics representing Ajay */}
              <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-[#0d0d1a] to-[#05050f] text-center border-2 border-borderViolet/20 rounded-2xl select-none">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-accentViolet to-accentCyan flex items-center justify-center text-3xl font-bold font-display text-white shadow-xl shadow-accentViolet/10 mb-6">
                  AJ
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold font-display text-textPrimary">Ajay S</h3>
                  <p className="text-xs font-mono text-accentCyan">FULL STACK DEVELOPER</p>
                  <p className="text-[11px] font-mono text-textMuted pt-4">Chennai, Tamil Nadu, India</p>
                </div>
                <div className="mt-8 pt-6 w-full border-t border-borderViolet/10 flex justify-around text-center text-xs font-mono">
                  <div>
                    <span className="block text-accentPink font-bold">12+</span>
                    <span className="text-[10px] text-textMuted">PROJECTS</span>
                  </div>
                  <div>
                    <span className="block text-accentCyan font-bold">180+</span>
                    <span className="text-[10px] text-textMuted">LEETCODE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Content (60/40 Split: Column 2) */}
        <div className="w-full lg:w-7/12 flex flex-col text-left">
          
          {/* Framer Motion slides in title from x:-30 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-6 flex flex-col"
          >
            <span className="text-accentPink font-mono text-xs uppercase tracking-widest mb-1">Background</span>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-textPrimary">About Me</h2>
            <div className="w-12 h-1 bg-accentViolet rounded-full mt-2" />
          </motion.div>

          {/* Bio lines wrapped for clips reveals */}
          <div className="space-y-4 text-textMuted leading-relaxed mb-8 text-sm md:text-base">
            {about.bio.map((paragraph, idx) => (
              <p key={idx} ref={(el) => (bioRefs.current[idx] = el)} className="relative overflow-hidden">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Stats count-up block row */}
          <div
            ref={statsRowRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-borderViolet/10 mb-8"
          >
            {about.stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col text-left font-mono">
                <span className="text-2xl md:text-3xl font-bold text-accentCyan select-none flex items-center">
                  <span className="stat-counter-val" data-target={stat.value}>
                    0
                  </span>
                  <span>{stat.suffix}</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider text-textMuted font-sans mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Vector abstract dynamic line */}
          <div className="w-full h-12 flex items-center relative">
            <svg className="w-full h-8" fill="none" viewBox="0 0 400 32" preserveAspectRatio="none">
              <path
                ref={svgPathRef}
                d="M0,16 Q100,0 200,16 T400,16"
                stroke="url(#svg-gradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="svg-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="50%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
          </div>

        </div>
      </div>
    </section>
  );
}
