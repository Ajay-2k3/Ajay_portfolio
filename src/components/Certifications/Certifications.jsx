import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, ShieldCheck, Milestone } from "lucide-react";
import { certifications } from "../../data/portfolio";

export default function Certifications() {
  const [activeFilter, setActiveFilter] = useState("All");

  // Filter labels mapping
  const filterTabs = ["All", "JPMorgan", "LeetCode", "In-Person"];

  const getFilteredCerts = () => {
    if (activeFilter === "All") return certifications;
    if (activeFilter === "JPMorgan") return certifications.filter(c => c.id === "jpmorgan");
    if (activeFilter === "LeetCode") return certifications.filter(c => c.id === "dsa-leetcode");
    if (activeFilter === "In-Person") return certifications.filter(c => c.id === "java-diploma");
    return certifications;
  };

  const filteredCerts = getFilteredCerts();

  // Custom logo generator based on cert ID
  const renderCertLogo = (id) => {
    switch (id) {
      case "jpmorgan":
        return (
          <div className="w-10 h-10 rounded-lg bg-[#0052cc]/10 border border-[#0052cc]/30 flex items-center justify-center text-xs font-bold text-[#0052cc]">
            JPM
          </div>
        );
      case "java-diploma":
        return (
          <div className="w-10 h-10 rounded-lg bg-[#f59e0b]/10 border border-[#f59e0b]/30 flex items-center justify-center text-xs font-bold text-[#f59e0b]">
            JAVA
          </div>
        );
      case "dsa-leetcode":
        return (
          <div className="w-10 h-10 rounded-lg bg-[#f97316]/10 border border-[#f97316]/30 flex items-center justify-center text-xs font-bold text-[#f97316]">
            LC
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-lg bg-accentViolet/10 border border-accentViolet/30 flex items-center justify-center text-xs font-bold text-accentViolet">
            CERT
          </div>
        );
    }
  };

  return (
    <section
      id="certifications"
      className="py-24 px-6 md:px-12 w-full bg-bgSecondary/15 border-b border-borderViolet/10 relative"
    >
      <div className="max-w-6xl mx-auto flex flex-col">
        {/* Header */}
        <div className="mb-12 text-left">
          <span className="text-accentViolet font-mono text-xs uppercase tracking-widest mb-1">Accreditations</span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-textPrimary">Certifications</h2>
          <div className="w-12 h-1 bg-accentViolet rounded-full mt-2" />
        </div>

        {/* Filter row issued by */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-borderViolet/10">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`relative px-4 py-2 text-xs font-mono rounded-lg transition-colors duration-200 focus:outline-none ${
                activeFilter === tab ? "text-white" : "text-textMuted hover:text-textPrimary"
              }`}
            >
              {activeFilter === tab && (
                <motion.div
                  layoutId="cert-tab-indicator"
                  className="absolute inset-0 bg-accentViolet/20 border border-accentViolet/50 rounded-lg -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {tab}
            </button>
          ))}
        </div>

        {/* 3-Column Masonry Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert, index) => (
              <motion.div
                layout
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  delay: index * 0.1, // Custom index-based stagger
                }}
                className="group relative w-full h-[230px] perspective-1000 select-none cursor-pointer"
              >
                {/* 3D Flip Card Container */}
                <div className="flip-card-inner w-full h-full preserve-3d relative duration-600 transition-transform group-hover:rotate-y-180">
                  
                  {/* FRONT side of Card */}
                  <div className="absolute inset-0 backface-hidden bg-bgSecondary border border-borderViolet/30 rounded-2xl p-6 flex flex-col justify-between shadow-lg">
                    {/* Header */}
                    <div className="flex justify-between items-start gap-4">
                      {renderCertLogo(cert.id)}
                      <Award size={18} className="text-textMuted group-hover:text-accentCyan transition-colors" />
                    </div>

                    {/* Middle Info */}
                    <div className="text-left mt-2 flex-grow flex flex-col justify-center">
                      <h3 className="text-sm md:text-base font-bold font-display text-textPrimary leading-tight group-hover:text-accentCyan transition-colors line-clamp-2">
                        {cert.title}
                      </h3>
                      <p className="text-xs text-textMuted font-medium mt-1.5">{cert.issuer}</p>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center border-t border-borderViolet/10 pt-3 text-[10px] font-mono text-textMuted">
                      <span>{cert.platform}</span>
                      <span className="text-accentCyan">{cert.date}</span>
                    </div>
                  </div>

                  {/* BACK side of Card */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 bg-bgTertiary border border-accentCyan/30 rounded-2xl p-6 flex flex-col justify-between shadow-lg text-left">
                    <div>
                      {/* Sub header */}
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[9px] font-mono text-accentCyan uppercase tracking-widest flex items-center gap-1">
                          <ShieldCheck size={12} />
                          <span>Credentials</span>
                        </span>
                        {cert.verifyUrl && (
                          <a
                            href={cert.verifyUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-textMuted hover:text-accentPink flex items-center gap-1 transition-colors"
                          >
                            <span className="text-[10px] font-mono">Verify</span>
                            <ExternalLink size={10} />
                          </a>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-[11px] text-textPrimary/80 leading-relaxed font-mono line-clamp-4">
                        {cert.description}
                      </p>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1 border-t border-borderViolet/10 pt-3">
                      {cert.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-1.5 py-0.5 bg-bgSecondary border border-borderViolet/10 rounded text-[9px] font-mono text-textMuted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
