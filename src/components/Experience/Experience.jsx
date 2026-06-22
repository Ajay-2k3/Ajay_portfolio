import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { experience } from "../../data/portfolio";

export default function Experience() {
  const intern = experience[0]; // Bluewhiz Infotech Intern

  // FM Parent container animation parameters
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  // FM Child card animation parameters
  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section
      id="experience"
      className="py-24 px-6 md:px-12 w-full bg-bgPrimary border-b border-borderViolet/10 relative"
    >
      <div className="max-w-6xl mx-auto flex flex-col">
        {/* Section Header */}
        <div className="mb-16 text-left">
          <span className="text-accentPink font-mono text-xs uppercase tracking-widest mb-1">Career Path</span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-textPrimary">Work Experience</h2>
          <div className="w-12 h-1 bg-accentPink rounded-full mt-2" />
        </div>

        {/* Major Work Info Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
          {/* Left Column: Job Description and Stack (5/12 columns) */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <div className="sticky top-28 space-y-6">
              <div className="bg-bgSecondary/60 border border-borderViolet/30 rounded-2xl p-6 relative overflow-hidden backdrop-blur-sm">
                <div className="absolute top-0 right-0 w-24 h-24 bg-accentPink/5 rounded-full filter blur-xl" />
                
                {/* Heading */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-bgTertiary border border-borderViolet/20 rounded-xl text-accentPink">
                    <Briefcase size={22} />
                  </div>
                  <div>
                    <span className="px-2 py-0.5 bg-accentPink/15 border border-accentPink/30 rounded text-[10px] font-mono text-accentPink font-semibold uppercase tracking-wider">
                      {intern.type}
                    </span>
                    <h3 className="text-xl font-bold font-display text-textPrimary mt-1">
                      {intern.role}
                    </h3>
                  </div>
                </div>

                {/* Company details */}
                <div className="space-y-2 text-sm text-textMuted font-mono border-t border-borderViolet/10 pt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-textPrimary font-semibold">{intern.company}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Calendar size={14} className="text-accentViolet" />
                    <span>{intern.period}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <MapPin size={14} className="text-accentCyan" />
                    <span>{intern.location}</span>
                  </div>
                </div>
              </div>

              {/* Technologies Applied */}
              <div className="bg-bgSecondary/30 border border-borderViolet/20 rounded-2xl p-6">
                <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-textPrimary mb-4">
                  Technologies Utilized
                </h4>
                <div className="flex flex-wrap gap-2">
                  {intern.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-bgTertiary border border-borderViolet/10 rounded-md text-xs font-mono text-textMuted hover:text-accentPink hover:border-accentPink/20 transition-smooth"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive achievement metrics grid (7/12 columns) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-textPrimary/80 mb-2 pl-2">
              Key Contributions & Achievements
            </h4>

            {intern.highlights.map((item, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ x: 6, borderColor: "rgba(236,72,153,0.4)" }}
                className="p-5 bg-bgSecondary/60 border border-borderViolet/20 hover:border-accentPink/40 rounded-2xl flex gap-4 transition-smooth cursor-default"
              >
                {/* Metric circular badge */}
                <div className="flex-shrink-0 w-24 h-24 max-w-[80px] max-h-[80px] rounded-xl bg-bgTertiary border border-borderViolet/20 flex flex-col items-center justify-center text-center p-2 font-mono self-center">
                  <span className="text-sm font-bold text-accentCyan text-wrap leading-tight">
                    {item.metric.split(" ")[0]}
                  </span>
                  <span className="text-[9px] text-textMuted uppercase mt-1">
                    {item.metric.split(" ").slice(1).join(" ") || "Boost"}
                  </span>
                </div>

                {/* Description text */}
                <div className="flex flex-col justify-center text-left">
                  <p className="text-sm text-textPrimary/90 leading-relaxed">
                    {item.desc}
                  </p>
                  <div className="flex items-center gap-1.5 mt-2 text-[10px] font-mono text-textMuted">
                    <CheckCircle2 size={12} className="text-[#10b981]" />
                    <span>Verified Internship Milestone</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
