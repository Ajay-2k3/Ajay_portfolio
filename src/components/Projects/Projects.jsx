import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ExternalLink, Calendar, CheckCircle2, Server, ArrowLeft, ArrowRight } from "lucide-react";
import { Github } from "../Icons";
import gsap from "gsap";
import { projects } from "../../data/portfolio";

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  // Extend projects list with a GitHub showroom slide
  const slides = [
    ...projects,
    {
      id: "github-more",
      title: "Explore More Systems on GitHub",
      date: "Ongoing Integration",
      tagline: "Browse my full repository portfolio containing REST API templates, Kafka pipelines, Docker configurations, and relational schema designs.",
      image: "/src/assets/hero.png", // fallback
      accent: "#06b6d4",
      stack: ["Java", "Spring Boot", "Python", "SQL", "Apache Kafka", "Docker", "Git"],
      bullets: [
        "Core Java microservices and clean architectural implementations",
        "Automated deployment workflows and GitHub Actions configurations",
        "Optimized relational query schemas and data analytics scripts",
        "Active open-source contributions and system design documentation",
      ],
      links: {
        live: "",
        github: "https://github.com/Ajay-2k3",
      },
      isGitHubSlide: true,
    }
  ];

  const currentProject = slides[activeIndex];

  // GSAP slide transition animations triggered on activeIndex change
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const ctx = gsap.context(() => {
      // Slide and fade up headers
      gsap.fromTo(
        ".project-text-anim",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.08 }
      );

      // Stagger highlights reveal from left
      gsap.fromTo(
        ".project-bullet-anim",
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: "power2.out" }
      );

      // 3D scale and rotate in of the media preview card
      gsap.fromTo(
        ".project-media-anim",
        { scale: 0.92, opacity: 0, rotateY: 12, transformPerspective: 800 },
        { scale: 1, opacity: 1, rotateY: 0, duration: 0.65, ease: "power3.out" }
      );

      // Stagger pop tech badges
      gsap.fromTo(
        ".project-badge-anim",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.35, stagger: 0.03, ease: "back.out(1.5)" }
      );
    }, contentRef);

    return () => ctx.revert();
  }, [activeIndex]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // 3D tilt movement on hover of media card
  const mediaContainerRef = useRef(null);
  const handleMouseMove = (e) => {
    const card = mediaContainerRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotX = -(y - centerY) / 12;
    const rotY = (x - centerX) / 12;

    gsap.to(card, {
      rotateX: rotX,
      rotateY: rotY,
      transformPerspective: 800,
      ease: "power2.out",
      duration: 0.3,
    });
  };

  const handleMouseLeave = () => {
    const card = mediaContainerRef.current;
    if (!card) return;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      ease: "power2.out",
      duration: 0.5,
    });
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 px-6 md:px-12 w-full bg-bgSecondary/15 border-b border-borderViolet/10 relative overflow-hidden"
    >
      {/* Dynamic background lights */}
      <div 
        className="absolute w-[350px] h-[350px] rounded-full opacity-[0.04] glow-orb top-[30%] left-[20%] pointer-events-none transition-colors duration-500"
        style={{ backgroundColor: currentProject.accent }}
      />

      <div className="max-w-6xl mx-auto flex flex-col">
        {/* Section Header */}
        <div className="mb-12 text-left flex justify-between items-end">
          <div>
            <span className="text-accentViolet font-mono text-xs uppercase tracking-widest mb-1">Portfolio</span>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-textPrimary">Featured Work</h2>
            <div className="w-12 h-1 bg-accentViolet rounded-full mt-2" />
          </div>

          {/* Slide Indicators Navigation */}
          <div className="flex items-center gap-3 font-mono text-xs text-textMuted select-none">
            <button
              onClick={handlePrev}
              className="p-2 border border-borderViolet/30 hover:border-accentCyan/50 rounded-xl hover:text-accentCyan bg-bgSecondary/40 transition-colors cursor-pointer"
              aria-label="Previous Project"
            >
              <ArrowLeft size={16} />
            </button>
            <span className="text-textPrimary font-semibold">
              {(activeIndex + 1).toString().padStart(2, "0")}
            </span>
            <span>/</span>
            <span>{slides.length.toString().padStart(2, "0")}</span>
            <button
              onClick={handleNext}
              className="p-2 border border-borderViolet/30 hover:border-accentCyan/50 rounded-xl hover:text-accentCyan bg-bgSecondary/40 transition-colors cursor-pointer"
              aria-label="Next Project"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Dynamic Project Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-borderViolet/10 pb-3">
          {slides.map((proj, idx) => {
            const isSelected = activeIndex === idx;
            return (
              <button
                key={proj.id}
                onClick={() => setActiveIndex(idx)}
                className="relative px-4 py-2.5 text-xs font-mono rounded-lg transition-all duration-200 text-left focus:outline-none flex items-center gap-2 cursor-pointer"
                style={{
                  color: isSelected ? "#fff" : "rgba(226, 232, 240, 0.6)",
                  border: isSelected ? `1px solid ${proj.accent}50` : "1px solid rgba(124, 58, 237, 0.1)",
                }}
              >
                {isSelected && (
                  <motion.div
                    layoutId="active-project-tab"
                    className="absolute inset-0 bg-bgTertiary border border-borderViolet/30 rounded-lg -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
                <span 
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: proj.accent }}
                />
                <span>{proj.isGitHubSlide ? "GitHub Showroom" : proj.title.split(" — ")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Split Screen Workspace Area */}
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
          
          {/* LEFT COLUMN: Texts details (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Meta indicator badge */}
            <div className="project-text-anim inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bgTertiary border border-borderViolet/30 text-[10px] font-mono text-textMuted uppercase tracking-wider">
              <Calendar size={12} className="text-accentCyan" style={{ color: currentProject.accent }} />
              <span>{currentProject.date}</span>
            </div>

            {/* Title & Tagline */}
            <div className="space-y-3">
              <h3 
                className="project-text-anim text-2xl md:text-3xl font-bold font-display text-textPrimary leading-tight transition-colors"
                style={{ textShadow: `0 0 20px ${currentProject.accent}15` }}
              >
                {currentProject.title}
              </h3>
              <p className="project-text-anim text-sm md:text-base text-textMuted leading-relaxed">
                {currentProject.tagline}
              </p>
            </div>

            {/* Staggered Highlights (Bullets) */}
            <div className="space-y-3 bg-bgSecondary/40 border border-borderViolet/20 rounded-2xl p-5 backdrop-blur-sm">
              <h4 className="project-text-anim text-[10px] font-mono uppercase tracking-wider text-textMuted flex items-center gap-1.5">
                <CheckCircle2 size={12} className="text-accentCyan" style={{ color: currentProject.accent }} />
                <span>Engineered Features</span>
              </h4>
              <ul className="space-y-3">
                {currentProject.bullets.map((bullet, idx) => (
                  <li 
                    key={idx} 
                    className="project-bullet-anim flex items-start gap-2.5 text-xs md:text-sm text-textPrimary/80 leading-relaxed font-sans"
                  >
                    <span 
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: currentProject.accent }}
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack Pills */}
            <div className="space-y-2">
              <h4 className="project-text-anim text-[10px] font-mono uppercase tracking-wider text-textMuted">
                Architectural Layers
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentProject.stack.map((tech) => (
                  <span
                    key={tech}
                    className="project-badge-anim px-2.5 py-1 rounded-lg bg-bgTertiary border border-borderViolet/15 text-xs font-mono text-textMuted hover:text-textPrimary transition-colors duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct CTAs */}
            <div className="project-text-anim pt-4 flex flex-wrap items-center gap-4">
              {currentProject.links.live && (
                <a
                  href={currentProject.links.live}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-accentViolet hover:bg-accentViolet/90 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-lg hover:shadow-accentViolet/25 shadow-accentViolet/10"
                  style={{ backgroundColor: currentProject.accent }}
                >
                  <span>Launch Live App</span>
                  <ExternalLink size={14} />
                </a>
              )}
              <a
                href={currentProject.links.github}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 bg-bgSecondary border border-borderViolet/40 hover:border-accentCyan/45 text-textPrimary hover:text-accentCyan font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-all"
              >
                <Github size={15} />
                <span>View Source Code</span>
                <ArrowUpRight size={14} />
              </a>
            </div>

          </div>

          {/* RIGHT COLUMN: Cinematic Browser Window Mockup (lg:col-span-5) */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <div 
              ref={mediaContainerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="project-media-anim w-full max-w-md bg-bgSecondary border border-borderViolet/35 rounded-2xl overflow-hidden shadow-2xl relative transition-shadow duration-300 select-none group"
              style={{
                boxShadow: `0 20px 40px ${currentProject.accent}08`,
              }}
            >
              {/* Browser control header bar */}
              <div className="w-full bg-bgTertiary px-4 py-3 border-b border-borderViolet/10 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-accentPink/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-accentCyan/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]/60" />
                
                {/* Simulated address bar */}
                <div className="ml-4 flex-grow bg-bgPrimary/60 border border-borderViolet/5 rounded-md px-3 py-0.5 text-[9px] font-mono text-textMuted truncate text-center">
                  {currentProject.isGitHubSlide ? "github.com/Ajay-2k3/repositories" : `${currentProject.id}.ajay-dev.app`}
                </div>
              </div>

              {/* Viewport content area */}
              <div className="relative w-full aspect-[4/3] bg-bgTertiary overflow-hidden flex items-center justify-center">
                {/* Glowing backdrop based on active project theme */}
                <div 
                  className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none z-10"
                  style={{ backgroundColor: currentProject.accent }}
                />

                {/* Main preview screenshot mock */}
                <img
                  src={currentProject.image}
                  alt={currentProject.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlapping developer metrics widget on hover */}
                {!currentProject.isGitHubSlide && (
                  <div className="absolute bottom-3 left-3 right-3 bg-bgSecondary/90 border border-borderViolet/30 backdrop-blur-md rounded-xl p-3 z-20 text-xs font-mono flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                    <span className="text-[10px] text-textMuted uppercase flex items-center gap-1">
                      <Server size={12} className="text-accentCyan" style={{ color: currentProject.accent }} />
                      <span>Diagnostics</span>
                    </span>
                    <span className="text-[10px] font-semibold" style={{ color: currentProject.accent }}>
                      {currentProject.id === "ai-stock" ? "Ensemble ML (sub-500ms)" : "Razorpay + Socket.IO"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
