import React, { useEffect, useRef } from "react";
import { GraduationCap, MapPin, Award } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { education } from "../../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const milestonesRef = useRef([]);

  // Line drawing and milestones reveals
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Center Line SVG scroll animation
      const path = lineRef.current;
      if (path) {
        // Find total vertical pixel height of the SVG block
        const length = path.getBoundingClientRect().height || 800;
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 85%",
            scrub: 0.5,
          },
        });
      }

      // 2. Milestones entry animations (Alternating slide-in + Elastic dots)
      milestonesRef.current.forEach((milestone, idx) => {
        if (!milestone) return;

        const leftCol = milestone.querySelector(".timeline-left");
        const dotNode = milestone.querySelector(".timeline-dot");
        const rightCol = milestone.querySelector(".timeline-right");

        // Alternate slides depending on parity index
        const isAlternate = idx % 2 === 1; // MCA is right, BCA is left

        // Animate Left column items (Year or Content)
        if (leftCol) {
          gsap.fromTo(
            leftCol,
            { x: -60, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              scrollTrigger: {
                trigger: milestone,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        // Animate Right column items (Content or Year)
        if (rightCol) {
          gsap.fromTo(
            rightCol,
            { x: 60, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              scrollTrigger: {
                trigger: milestone,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        // Animate elastic center dot scale
        if (dotNode) {
          gsap.fromTo(
            dotNode,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.8,
              ease: "elastic.out(1, 0.4)",
              scrollTrigger: {
                trigger: milestone,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="py-24 px-6 md:px-12 w-full bg-bgSecondary/30 border-b border-borderViolet/10 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto flex flex-col relative">
        {/* Header */}
        <div className="mb-20 text-left">
          <span className="text-accentCyan font-mono text-xs uppercase tracking-widest mb-1">Academic Background</span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-textPrimary">Education</h2>
          <div className="w-12 h-1 bg-accentCyan rounded-full mt-2" />
        </div>

        {/* Center line SVG drawing tracker */}
        <div className="absolute top-36 bottom-0 left-1/2 -translate-x-1/2 w-1.5 z-0 pointer-events-none hidden md:block">
          <svg className="w-full h-full" fill="none" preserveAspectRatio="none">
            <line
              ref={lineRef}
              x1="3"
              y1="0"
              x2="3"
              y2="100%"
              stroke="url(#timeline-gradient)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="timeline-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Timeline milestones container */}
        <div className="space-y-16 relative z-10">
          {education.map((edu, idx) => {
            const isAlternate = idx % 2 === 1; // 0 = MCA (Content Right), 1 = BCA (Content Left)

            return (
              <div
                key={idx}
                ref={(el) => (milestonesRef.current[idx] = el)}
                className="grid grid-cols-1 md:grid-cols-11 items-center gap-6 md:gap-0 relative"
              >
                {/* 1. Left Side: Year on index 0, Card on index 1 */}
                <div className="timeline-left md:col-span-5 text-left md:text-right">
                  {!isAlternate ? (
                    // Index 0: Year range left
                    <div className="pr-0 md:pr-10">
                      <span className="text-3xl md:text-4xl font-bold font-display text-textMuted/40 font-mono tracking-tight block">
                        {edu.period}
                      </span>
                      <span className="px-2 py-0.5 mt-2 inline-block bg-accentCyan/10 border border-accentCyan/30 text-[10px] font-mono text-accentCyan rounded uppercase">
                        {edu.status}
                      </span>
                    </div>
                  ) : (
                    // Index 1: Card Content left
                    <div className="pl-0 md:pl-0 md:pr-10">
                      <div className="p-6 bg-bgSecondary border border-borderViolet/30 hover:border-accentPink/40 rounded-2xl transition-smooth shadow-lg text-left">
                        <div className="flex items-center gap-2 text-accentPink mb-2">
                          <GraduationCap size={18} />
                          <span className="text-xs font-mono font-bold uppercase tracking-wider">
                            {edu.highlight}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold font-display text-textPrimary">
                          {edu.degree}
                        </h3>
                        <p className="text-sm text-textPrimary/80 mt-1 font-semibold">
                          {edu.institution}
                        </p>
                        <div className="flex items-center gap-1.5 text-xs text-textMuted mt-3 font-mono">
                          <MapPin size={12} className="text-accentViolet" />
                          <span>{edu.location}</span>
                        </div>
                        <p className="text-xs text-textMuted mt-4 leading-relaxed font-mono">
                          {edu.description}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Center Timeline Node Circle */}
                <div className="timeline-dot md:col-span-1 flex justify-center z-20">
                  <div className="w-8 h-8 rounded-full bg-bgPrimary border-4 border-bgSecondary flex items-center justify-center shadow-lg">
                    <span
                      className={`w-3.5 h-3.5 rounded-full ${
                        !isAlternate ? "bg-accentCyan" : "bg-accentPink"
                      }`}
                      style={{
                        boxShadow: `0 0 10px ${!isAlternate ? "var(--accent-cyan)" : "var(--accent-pink)"}`,
                      }}
                    />
                  </div>
                </div>

                {/* 3. Right Side: Card on index 0, Year on index 1 */}
                <div className="timeline-right md:col-span-5 text-left">
                  {!isAlternate ? (
                    // Index 0: Card Content right
                    <div className="pl-0 md:pl-10">
                      <div className="p-6 bg-bgSecondary border border-borderViolet/30 hover:border-accentCyan/40 rounded-2xl transition-smooth shadow-lg">
                        <div className="flex items-center gap-2 text-accentCyan mb-2">
                          <GraduationCap size={18} />
                          <span className="text-xs font-mono font-bold uppercase tracking-wider">
                            {edu.highlight}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold font-display text-textPrimary">
                          {edu.degree}
                        </h3>
                        <p className="text-sm text-textPrimary/80 mt-1 font-semibold">
                          {edu.institution}
                        </p>
                        <div className="flex items-center gap-1.5 text-xs text-textMuted mt-3 font-mono">
                          <MapPin size={12} className="text-accentViolet" />
                          <span>{edu.location}</span>
                        </div>
                        <p className="text-xs text-textMuted mt-4 leading-relaxed font-mono">
                          {edu.description}
                        </p>
                      </div>
                    </div>
                  ) : (
                    // Index 1: Year range right
                    <div className="pl-0 md:pl-10">
                      <span className="text-3xl md:text-4xl font-bold font-display text-textMuted/40 font-mono tracking-tight block">
                        {edu.period}
                      </span>
                      <span className="px-2 py-0.5 mt-2 inline-block bg-accentPink/10 border border-accentPink/30 text-[10px] font-mono text-accentPink rounded uppercase">
                        {edu.status}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
