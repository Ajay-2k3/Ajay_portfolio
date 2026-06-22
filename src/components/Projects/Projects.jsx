import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Code2 } from "lucide-react";
import { Github } from "../Icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  // GSAP Horizontal scroll pinning configuration
  useEffect(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    const mm = gsap.matchMedia();

    // Only apply horizontal scroll pinning on desktop screen sizes (>= 1024px)
    mm.add(
      {
        isDesktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        isMobile: "(max-width: 1023px), (prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { isDesktop } = context.conditions;

        if (isDesktop) {
          gsap.to(track, {
            x: () => -(track.scrollWidth - window.innerWidth + 80),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              pin: true,
              scrub: 0.6,
              start: "top top",
              // end calculates scrolling depth proportional to width of the project list
              end: () => "+=" + (track.scrollWidth - window.innerWidth + 200),
              invalidateOnRefresh: true,
            },
          });
        }
      }
    );

    return () => mm.revert();
  }, []);

  // Individual Project Card component
  const ProjectCard = ({ project }) => {
    return (
      <motion.div
        whileHover={{
          y: -8,
          boxShadow: "0 20px 60px rgba(124,58,237,0.25)",
        }}
        initial="initial"
        whileHover="hover"
        className="w-[380px] h-[480px] flex-shrink-0 bg-bgSecondary border border-borderViolet/30 hover:border-accentViolet/50 rounded-2xl overflow-hidden flex flex-col group cursor-pointer transition-colors duration-300 select-none relative"
      >
        {/* Top 55% - Images area */}
        <div className="h-[55%] w-full overflow-hidden relative bg-bgTertiary border-b border-borderViolet/10">
          {/* Subtle colored overlay driven by project accent */}
          <div
            className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none z-10"
            style={{ backgroundColor: project.accent }}
          />

          <motion.img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover origin-center"
            variants={{
              hover: { scale: 1.06 },
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />

          {/* View project overlay */}
          <motion.div
            variants={{
              initial: { opacity: 0, y: 15 },
              hover: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-bgPrimary/70 z-20 flex items-center justify-center gap-4"
          >
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-accentViolet hover:bg-accentViolet/90 text-white font-semibold text-xs rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <span>Live Demo</span>
                <ArrowUpRight size={14} />
              </a>
            )}
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 bg-bgSecondary border border-borderViolet/40 rounded-lg text-textPrimary hover:text-accentCyan transition-smooth"
              aria-label="View Github Repository"
            >
              <Github size={18} />
            </a>
          </motion.div>
        </div>

        {/* Bottom 45% - Info area */}
        <div className="h-[45%] p-5 flex flex-col justify-between text-left">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono text-accentCyan uppercase tracking-widest">
                {project.date}
              </span>
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: project.accent, boxShadow: `0 0 10px ${project.accent}` }}
              />
            </div>
            <h3 className="text-lg font-bold font-display text-textPrimary group-hover:text-accentCyan transition-colors line-clamp-1">
              {project.title}
            </h3>
            <p className="text-xs text-textMuted leading-relaxed line-clamp-2">
              {project.tagline}
            </p>
          </div>

          {/* Staggered badges on hover */}
          <motion.div
            variants={{
              hover: {
                transition: {
                  staggerChildren: 0.04,
                },
              },
            }}
            className="flex flex-wrap gap-1.5 mt-2"
          >
            {project.stack.slice(0, 4).map((tech) => (
              <motion.span
                key={tech}
                variants={{
                  initial: { y: 10, opacity: 0 },
                  hover: { y: 0, opacity: 1 },
                }}
                transition={{ duration: 0.2 }}
                className="px-2 py-1 bg-bgTertiary border border-borderViolet/10 text-[9px] font-mono text-textMuted rounded-md"
              >
                {tech}
              </motion.span>
            ))}
            {project.stack.length > 4 && (
              <motion.span
                variants={{
                  initial: { y: 10, opacity: 0 },
                  hover: { y: 0, opacity: 1 },
                }}
                transition={{ duration: 0.2 }}
                className="px-2 py-1 bg-bgTertiary border border-accentViolet/20 text-[9px] font-mono text-accentViolet rounded-md"
              >
                +{project.stack.length - 4} more
              </motion.span>
            )}
          </motion.div>
        </div>
      </motion.div>
    );
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="projects-section py-24 px-6 md:px-12 w-full bg-bgSecondary/10 border-b border-borderViolet/10 relative overflow-hidden flex flex-col justify-center min-h-screen lg:h-screen lg:py-0"
    >
      <div className="max-w-6xl mx-auto w-full mb-8 lg:mb-12 text-left lg:absolute lg:top-16 lg:left-12 lg:right-12">
        <span className="text-accentViolet font-mono text-xs uppercase tracking-widest mb-1">Portfolio</span>
        <h2 className="text-3xl md:text-4xl font-bold font-display text-textPrimary">Featured Work</h2>
        <div className="w-12 h-1 bg-accentViolet rounded-full mt-2" />
      </div>

      {/* Horizontal track container */}
      <div className="w-full flex items-center overflow-x-auto lg:overflow-x-visible no-scrollbar">
        <div
          ref={trackRef}
          className="projects-track flex gap-8 py-8 px-4 lg:px-12 w-max lg:h-[520px] items-center"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}

          {/* See More on GitHub card */}
          <motion.a
            href="https://github.com/Ajay-2k3"
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -8, boxShadow: "0 20px 60px rgba(6,182,212,0.2)" }}
            className="w-[380px] h-[480px] flex-shrink-0 bg-bgSecondary/40 border-2 border-dashed border-borderViolet/20 hover:border-accentCyan/50 rounded-2xl flex flex-col items-center justify-center p-8 text-center group cursor-pointer transition-colors duration-300"
          >
            <div className="w-14 h-14 rounded-xl bg-bgTertiary border border-borderViolet/30 flex items-center justify-center mb-6 text-textMuted group-hover:text-accentCyan group-hover:border-accentCyan/40 transition-colors">
              <Github size={24} />
            </div>
            <h3 className="text-lg font-bold font-display text-textPrimary mb-2">See More on GitHub</h3>
            <p className="text-xs text-textMuted max-w-[260px] leading-relaxed mb-6">
              Browse other systems integrations, script tools, database optimizations, and ongoing microservices.
            </p>
            <span className="px-4 py-2 rounded-xl bg-bgTertiary border border-borderViolet/30 text-xs font-semibold text-textMuted group-hover:bg-accentCyan group-hover:text-bgPrimary transition-colors duration-300">
              Visit GitHub Profile &rarr;
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
