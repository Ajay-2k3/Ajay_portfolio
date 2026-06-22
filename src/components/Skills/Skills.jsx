import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout, Server, Database, Cloud, Code, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillCategories, languages } from "../../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

// Custom helper to associate icons with skill categories
const getCategoryIcon = (iconName) => {
  switch (iconName) {
    case "layout":
      return <Layout className="text-accentViolet" size={22} />;
    case "server":
      return <Server className="text-accentCyan" size={22} />;
    case "database":
      return <Database className="text-accentPink" size={22} />;
    case "cloud":
      return <Cloud className="text-accentViolet" size={22} />;
    default:
      return <Code className="text-accentCyan" size={22} />;
  }
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("All");
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  // Group all skills into a single flat array with category annotations
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

  // 1. Cascade scroll enter animation for cards
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll(".skill-card-node");
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          ease: "power3.out",
          duration: 0.8,
          stagger: {
            amount: 0.6,
            grid: "auto",
            from: "start",
          },
          scrollTrigger: {
            trigger: grid,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, [activeCategory]); // Re-run when filter changes to animate new mount states

  // Skill Card Sub-Component to handle local hover bounds and progress animations
  const SkillCard = ({ skill, index }) => {
    const cardRef = useRef(null);
    const iconRef = useRef(null);
    const progressRef = useRef(null);

    // Dynamic width rendering for proficiency bars on ScrollTrigger enter
    useEffect(() => {
      const progressBar = progressRef.current;
      if (!progressBar) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          progressBar,
          { width: "0%" },
          {
            width: `${skill.level}%`,
            ease: "power2.inOut",
            duration: 1.2,
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 95%",
              toggleActions: "play none none none",
            },
          }
        );
      }, cardRef);

      return () => ctx.revert();
    }, [skill.level]);

    // Local GSAP hover triggers: elastic scale on icon
    const handleMouseEnter = () => {
      gsap.to(iconRef.current, {
        scale: 1.2,
        rotation: 8,
        duration: 0.5,
        ease: "elastic.out(1.2, 0.4)",
        overwrite: "auto",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(iconRef.current, {
        scale: 1,
        rotation: 0,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    return (
      <motion.div
        layout
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="skill-card-node bg-bgSecondary border border-borderViolet/30 hover:border-accentViolet/50 rounded-xl p-5 flex flex-col text-left transition-colors duration-300 relative overflow-hidden select-none"
      >
        {/* Glow highlight */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-accentViolet/5 rounded-full filter blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Card header */}
        <div className="flex items-center gap-3.5 mb-4">
          <div ref={iconRef} className="p-2 rounded-lg bg-bgTertiary border border-borderViolet/20">
            {getCategoryIcon(skill.category.toLowerCase())}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-textPrimary">{skill.name}</span>
            <span className="text-[10px] font-mono text-textMuted uppercase">{skill.category}</span>
          </div>
        </div>

        {/* Proficiency bar */}
        <div className="w-full mt-auto">
          <div className="flex justify-between text-xs font-mono text-textMuted mb-1.5">
            <span>Proficiency</span>
            <span className="text-accentCyan">{skill.level}%</span>
          </div>
          <div className="w-full h-1.5 bg-bgTertiary rounded-full overflow-hidden border border-borderViolet/10">
            <div
              ref={progressRef}
              className="h-full rounded-full bg-gradient-to-r from-accentViolet via-accentCyan to-accentPink"
              style={{ width: "0%" }} // Controlled by GSAP
            />
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
      className="py-24 px-6 md:px-12 w-full bg-bgPrimary border-b border-borderViolet/10 relative"
    >
      <div className="max-w-6xl mx-auto flex flex-col">
        {/* Title */}
        <div className="mb-12 text-left">
          <span className="text-accentCyan font-mono text-xs uppercase tracking-widest mb-1">Capacities</span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-textPrimary">Technical Skills</h2>
          <div className="w-12 h-1 bg-accentCyan rounded-full mt-2" />
        </div>

        {/* Categories Tab selector - FM animated active bar */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-borderViolet/10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-4 py-2 text-xs font-mono rounded-lg transition-colors duration-200 focus:outline-none ${
                activeCategory === cat ? "text-white" : "text-textMuted hover:text-textPrimary"
              }`}
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute inset-0 bg-accentViolet/20 border border-accentViolet/50 rounded-lg -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <motion.div
          layout
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <SkillCard key={`${skill.name}-${skill.category}`} skill={skill} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Tag cloud languages row */}
        <div className="mt-16 bg-bgSecondary/40 border border-borderViolet/20 rounded-2xl p-6 text-left relative overflow-hidden">
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
                className="px-3 py-1.5 rounded-lg bg-bgTertiary/80 border border-borderViolet/10 text-xs font-mono text-textMuted hover:text-accentCyan hover:border-accentCyan/30 transition-smooth cursor-default"
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
