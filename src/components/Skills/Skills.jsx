import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout, Server, Database, Cloud, Cpu, Terminal, BookOpen, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillCategories, languages } from "../../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

// Category properties: maps color accent, light-glow color, and icons dynamically
const categoryMeta = {
  languages: {
    color: "#7c3aed", // violet
    bg: "rgba(124, 58, 237, 0.1)",
    glow: "rgba(124, 58, 237, 0.4)",
    icon: <Terminal size={20} className="text-accentViolet" />,
  },
  frontend: {
    color: "#ec4899", // pink
    bg: "rgba(236, 72, 153, 0.1)",
    glow: "rgba(236, 72, 153, 0.4)",
    icon: <Layout size={20} className="text-accentPink" />,
  },
  backend: {
    color: "#06b6d4", // cyan
    bg: "rgba(6, 182, 212, 0.1)",
    glow: "rgba(6, 182, 212, 0.4)",
    icon: <Server size={20} className="text-accentCyan" />,
  },
  databases: {
    color: "#7c3aed", // violet
    bg: "rgba(124, 58, 237, 0.1)",
    glow: "rgba(124, 58, 237, 0.4)",
    icon: <Database size={20} className="text-accentViolet" />,
  },
  "devops & cloud": {
    color: "#06b6d4", // cyan
    bg: "rgba(6, 182, 212, 0.1)",
    glow: "rgba(6, 182, 212, 0.4)",
    icon: <Cloud size={20} className="text-accentCyan" />,
  },
  practices: {
    color: "#ec4899", // pink
    bg: "rgba(236, 72, 153, 0.1)",
    glow: "rgba(236, 72, 153, 0.4)",
    icon: <Cpu size={20} className="text-accentPink" />,
  },
};

const getMeta = (category) => {
  const key = category.toLowerCase();
  return categoryMeta[key] || {
    color: "#06b6d4",
    bg: "rgba(6, 182, 212, 0.1)",
    glow: "rgba(6, 182, 212, 0.4)",
    icon: <BookOpen size={20} className="text-accentCyan" />,
  };
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("All");
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  // Group all skills into a single flat array
  const allSkills = skillCategories.flatMap((cat) =>
    cat.skills.map((skill) => ({
      ...skill,
      category: cat.category,
    }))
  );

  const filteredSkills =
    activeCategory === "All"
      ? allSkills
      : allSkills.filter((s) => s.category === activeCategory);

  // Compute metrics for active view
  const categorySkills = filteredSkills;
  const averageProficiency = Math.round(
    categorySkills.reduce((acc, curr) => acc + curr.level, 0) / categorySkills.length
  ) || 0;

  // Stagger reveal skills cards on grid filter switch
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll(".skill-card-node");
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { y: 30, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          ease: "power3.out",
          duration: 0.5,
          stagger: {
            amount: 0.3,
            grid: "auto",
            from: "start",
          },
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, [activeCategory]);

  // Sidebar/Dashboard Telemetry Progress Circle animation
  const averageCircleRef = useRef(null);
  const averageTextRef = useRef(null);
  const avgRadius = 40;
  const avgCircumference = 2 * Math.PI * avgRadius;

  useEffect(() => {
    const circle = averageCircleRef.current;
    if (!circle) return;

    const avgOffset = avgCircumference - (averageProficiency / 100) * avgCircumference;
    const metaColor = getMeta(activeCategory).color;

    gsap.to(circle, {
      strokeDashoffset: avgOffset,
      stroke: metaColor,
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto",
    });

    if (averageTextRef.current) {
      gsap.to(averageTextRef.current, {
        innerText: averageProficiency,
        duration: 0.6,
        snap: { innerText: 1 },
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  }, [averageProficiency, activeCategory]);

  // Interactive 3D Tilting Skill Card Sub-Component
  const SkillCard = ({ skill }) => {
    const cardRef = useRef(null);
    const circleRef = useRef(null);
    const textRef = useRef(null);
    
    const radius = 22;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (skill.level / 100) * circumference;
    const meta = getMeta(skill.category);

    // circular gauge reveal
    useEffect(() => {
      const circle = circleRef.current;
      if (!circle) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          circle,
          { strokeDashoffset: circumference },
          {
            strokeDashoffset: strokeDashoffset,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 95%",
              toggleActions: "play none none none",
            },
          }
        );

        if (textRef.current) {
          gsap.fromTo(
            textRef.current,
            { innerText: 0 },
            {
              innerText: skill.level,
              duration: 1.2,
              snap: { innerText: 1 },
              ease: "power2.out",
              scrollTrigger: {
                trigger: textRef.current,
                start: "top 95%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }, cardRef);

      return () => ctx.revert();
    }, [skill.level]);

    // 3D Parallax Tilt hover handlers
    const handleMouseMove = (e) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; 
      const y = e.clientY - rect.top;  
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = -(y - centerY) / 8;
      const rotateY = (x - centerX) / 8;

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 600,
        borderColor: meta.color,
        boxShadow: `0 12px 30px ${meta.glow}`,
        ease: "power2.out",
        duration: 0.3,
        overwrite: "auto",
      });
    };

    const handleMouseLeave = () => {
      const card = cardRef.current;
      if (!card) return;
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        borderColor: "rgba(124, 58, 237, 0.2)",
        boxShadow: "none",
        ease: "power2.out",
        duration: 0.5,
        overwrite: "auto",
      });
    };

    return (
      <motion.div
        layout
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="skill-card-node bg-bgSecondary/50 border border-borderViolet/35 backdrop-blur-md rounded-2xl p-5 flex items-center justify-between transition-colors duration-300 relative overflow-hidden select-none"
      >
        {/* Cybernetic details */}
        <div className="absolute top-0 left-0 w-2 h-[1px] bg-borderViolet/30" />
        <div className="absolute top-0 left-0 w-[1px] h-2 bg-borderViolet/30" />

        {/* Content Info */}
        <div className="flex items-center gap-4">
          <div 
            className="p-3 rounded-xl border border-borderViolet/10 flex items-center justify-center transition-transform duration-300"
            style={{ backgroundColor: meta.bg, borderColor: `${meta.color}20` }}
          >
            {meta.icon}
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm font-bold text-textPrimary tracking-tight">{skill.name}</span>
            <span className="text-[9px] font-mono text-textMuted uppercase mt-0.5 tracking-wider">{skill.category}</span>
          </div>
        </div>

        {/* Circular Progress Ring */}
        <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="28"
              cy="28"
              r="22"
              className="stroke-bgTertiary"
              strokeWidth="3.5"
              fill="transparent"
            />
            <circle
              ref={circleRef}
              cx="28"
              cy="28"
              r="22"
              stroke={meta.color}
              strokeWidth="3.5"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
              strokeLinecap="round"
              style={{
                filter: `drop-shadow(0 0 3px ${meta.color}60)`,
              }}
            />
          </svg>
          <div className="absolute font-mono text-[10px] font-bold text-textPrimary">
            <span ref={textRef}>0</span>%
          </div>
        </div>
      </motion.div>
    );
  };

  const categories = ["All", ...skillCategories.map((c) => c.category)];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 px-6 md:px-12 w-full bg-bgPrimary border-b border-borderViolet/10 relative overflow-hidden"
    >
      {/* Background decoration orbs */}
      <div className="absolute w-[300px] h-[300px] rounded-full bg-accentViolet/5 glow-orb top-[20%] right-[-10%] pointer-events-none" />
      <div className="absolute w-[250px] h-[250px] rounded-full bg-accentCyan/5 glow-orb bottom-[10%] left-[-5%] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col">
        {/* Header */}
        <div className="mb-12 text-left">
          <span className="text-accentCyan font-mono text-xs uppercase tracking-widest mb-1">Capacities</span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-textPrimary">Technical Capabilities</h2>
          <div className="w-12 h-1 bg-accentCyan rounded-full mt-2" />
        </div>

        {/* Dynamic Telemetry Banner Dashboard (Horizontal Layout) */}
        <div className="bg-bgSecondary/60 border border-borderViolet/30 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden mb-10 w-full">
          <div className="absolute top-0 right-0 w-24 h-24 bg-borderViolet/5 rounded-full filter blur-xl" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Portion: Telemetry circle and active stats (lg:col-span-5) */}
            <div className="lg:col-span-5 flex items-center gap-6 border-b lg:border-b-0 lg:border-r border-borderViolet/15 pb-6 lg:pb-0 pr-0 lg:pr-6">
              
              {/* Dial ring */}
              <div className="relative w-24 h-24 flex items-center justify-center flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    className="stroke-bgTertiary"
                    strokeWidth="4"
                    fill="transparent"
                  />
                  <circle
                    ref={averageCircleRef}
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="#06b6d4"
                    strokeWidth="4"
                    fill="transparent"
                    strokeDasharray={avgCircumference}
                    strokeDashoffset={avgCircumference}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <div className="font-mono text-xl font-extrabold text-textPrimary leading-none">
                    <span ref={averageTextRef}>0</span>%
                  </div>
                  <span className="text-[7px] font-mono text-textMuted uppercase tracking-wider mt-0.5">average</span>
                </div>
              </div>

              {/* Scope details */}
              <div className="text-left font-mono space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-textMuted uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping" />
                  <span>Telemetry Core</span>
                </div>
                <h3 className="text-lg font-bold text-textPrimary leading-tight">
                  Scope: <span className="text-accentCyan">{activeCategory}</span>
                </h3>
                <p className="text-[11px] text-textMuted font-sans">
                  {filteredSkills.length} active system {filteredSkills.length === 1 ? "node" : "nodes"} verified.
                </p>
              </div>
            </div>

            {/* Right Portion: Categories Navigation Group (lg:col-span-7) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="flex flex-wrap gap-2 w-full">
                {categories.map((cat) => {
                  const isSelected = activeCategory === cat;
                  const meta = getMeta(cat);
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className="relative px-4 py-2 text-xs font-mono rounded-lg transition-all duration-200 text-left focus:outline-none flex items-center gap-2 cursor-pointer group"
                      style={{
                        color: isSelected ? "#fff" : "rgba(226, 232, 240, 0.6)",
                        backgroundColor: isSelected ? "transparent" : "rgba(19, 19, 31, 0.4)",
                        border: isSelected ? `1px solid ${meta.color}50` : "1px solid rgba(124, 58, 237, 0.1)",
                      }}
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="active-dashboard-tab"
                          className="absolute inset-0 bg-bgTertiary border border-borderViolet/40 rounded-lg -z-10 shadow-inner"
                          transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        />
                      )}
                      <span 
                        className="w-1.5 h-1.5 rounded-full transition-transform duration-300 group-hover:scale-125"
                        style={{ backgroundColor: isSelected ? meta.color : "#64748b" }}
                      />
                      <span>{cat}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* Showcase Grid (Full Width, Centered Symmetrically) */}
        <div className="w-full">
          <motion.div
            layout
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => (
                <SkillCard key={`${skill.name}-${skill.category}`} skill={skill} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Tag cloud languages row */}
        <div className="mt-16 bg-bgSecondary/40 border border-borderViolet/20 rounded-2xl p-6 text-left relative overflow-hidden backdrop-blur-sm">
          <div className="absolute top-0 right-0 w-24 h-24 bg-accentPink/5 rounded-full filter blur-xl" />
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={16} className="text-accentPink" />
            <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-textPrimary">
              Other Languages & Tools
            </h3>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {languages.map((lang, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-lg bg-bgTertiary/80 border border-borderViolet/10 text-xs font-mono text-textMuted hover:text-accentCyan hover:border-accentCyan/30 hover:scale-105 transition-all duration-300 cursor-default shadow-sm hover:shadow-accentCyan/10"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
