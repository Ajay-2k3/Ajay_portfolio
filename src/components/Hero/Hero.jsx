import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Download, Mail } from "lucide-react";
import { Github, Linkedin } from "../Icons";
import { motion } from "framer-motion";
import gsap from "gsap";
import { hero } from "../../data/portfolio";
import { splitText } from "../../utils/splitText";

// Scramble Text component to cycles through roles and settle
const ScrambleText = ({ words }) => {
  const [currentText, setCurrentText] = useState("");
  const timerRef = useRef(null);

  useEffect(() => {
    let wordIndex = 0;
    let iteration = 0;
    const chars = "XYZ@#$%&*<>!?_-+=[]{}";
    const totalIterations = 3; // 3 cycles before settling

    const scrambleWord = (targetWord, callback) => {
      let frame = 0;
      const totalFrames = 20; // animation duration in frames
      
      const nextFrame = () => {
        if (frame >= totalFrames) {
          setCurrentText(targetWord);
          if (callback) callback();
          return;
        }
        
        const progress = frame / totalFrames;
        const revealCount = Math.floor(progress * targetWord.length);
        
        let scrambled = targetWord.slice(0, revealCount);
        for (let i = revealCount; i < targetWord.length; i++) {
          scrambled += chars[Math.floor(Math.random() * chars.length)];
        }
        
        setCurrentText(scrambled);
        frame++;
        requestAnimationFrame(nextFrame);
      };
      
      nextFrame();
    };

    const cycle = () => {
      // If we completed 3 full loops, settle on final role
      if (iteration >= totalIterations * words.length - 1) {
        scrambleWord(words[words.length - 1]);
        return;
      }

      scrambleWord(words[wordIndex], () => {
        timerRef.current = setTimeout(() => {
          wordIndex = (wordIndex + 1) % words.length;
          iteration++;
          cycle();
        }, 2200);
      });
    };

    cycle();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [words]);

  return <span className="text-accentCyan font-mono">{currentText}</span>;
};

export default function Hero() {
  const heroRef = useRef(null);
  const nameRef = useRef(null);
  const taglineRef = useRef(null);
  const socialsRef = useRef(null);
  const ctaRef = useRef(null);
  
  // Orbs references for mousemove parallax
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const orb3Ref = useRef(null);

  // Parallax mouse move setup
  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    const orb1 = orb1Ref.current;
    const orb2 = orb2Ref.current;
    const orb3 = orb3Ref.current;

    const ctx = gsap.context(() => {
      // Set quick setters for jank-free translations
      const setX1 = gsap.quickSetter(orb1, "x", "px");
      const setY1 = gsap.quickSetter(orb1, "y", "px");
      const setX2 = gsap.quickSetter(orb2, "x", "px");
      const setY2 = gsap.quickSetter(orb2, "y", "px");
      const setX3 = gsap.quickSetter(orb3, "x", "px");
      const setY3 = gsap.quickSetter(orb3, "y", "px");

      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const screenCenterX = window.innerWidth / 2;
        const screenCenterY = window.innerHeight / 2;

        const deltaX = clientX - screenCenterX;
        const deltaY = clientY - screenCenterY;

        // Apply distinct multipliers for parallax speeds
        setX1(deltaX * 0.03);
        setY1(deltaY * 0.03);

        setX2(deltaX * 0.05);
        setY2(deltaY * 0.05);

        setX3(deltaX * 0.015);
        setY3(deltaY * 0.015);
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Text animations setup
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Name char split animation
      if (nameRef.current) {
        const chars = splitText(nameRef.current, "chars");
        gsap.fromTo(
          chars,
          { y: 80, opacity: 0, rotationX: -90 },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            stagger: 0.04,
            ease: "back.out(1.7)",
            duration: 0.8,
            delay: 0.3,
            transformOrigin: "center bottom",
          }
        );
      }

      // 2. Tagline word stagger fade
      if (taglineRef.current) {
        const words = splitText(taglineRef.current, "words");
        gsap.fromTo(
          words,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.03,
            ease: "power2.out",
            duration: 0.8,
            delay: 1.0,
          }
        );
      }

      // 3. CTAs and social buttons reveal
      gsap.from([ctaRef.current, socialsRef.current], {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 1.5,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Icon mapping helper
  const renderSocialIcon = (icon) => {
    switch (icon) {
      case "github":
        return <Github size={20} />;
      case "linkedin":
        return <Linkedin size={20} />;
      case "mail":
        return <Mail size={20} />;
      default:
        return null;
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center bg-bgPrimary px-6 md:px-12 pt-20 pb-12 overflow-hidden bg-dot-grid"
    >
      {/* Glow Orbs - Parallax movement controlled by GSAP */}
      <div
        ref={orb1Ref}
        className="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full bg-accentViolet opacity-10 glow-orb top-[10%] left-[5%]"
      />
      <div
        ref={orb2Ref}
        className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full bg-accentCyan opacity-[0.08] glow-orb bottom-[10%] right-[10%]"
      />
      <div
        ref={orb3Ref}
        className="absolute w-[250px] h-[250px] md:w-[350px] md:h-[350px] rounded-full bg-accentPink opacity-[0.06] glow-orb top-[40%] left-[45%]"
      />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left-Aligned Information Column */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          
          {/* Floating Badge (Available for work) */}
          <div className="mb-6 flex justify-start">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
              }}
              className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-bgSecondary border border-borderViolet text-xs font-semibold text-[#10b981]"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] pulse-green-dot" />
              <span>{hero.badge.text}</span>
            </motion.div>
          </div>

          <span className="text-accentViolet font-mono text-sm md:text-base font-semibold uppercase tracking-wider mb-2">
            {hero.greeting}
          </span>

          <h1
            ref={nameRef}
            className="text-5xl md:text-7xl font-bold font-display tracking-tight text-textPrimary leading-none mb-4"
          >
            {hero.name}
          </h1>

          {/* Scrambled Roles */}
          <h2 className="text-xl md:text-3xl font-display font-medium text-textPrimary/80 mb-6 flex items-center gap-2">
            <span>Specializing in</span>
            <ScrambleText words={hero.roles} />
            <span className="typewriter-cursor h-6 md:h-8 inline-block ml-0.5" />
          </h2>

          <p
            ref={taglineRef}
            className="text-base md:text-lg text-textMuted max-w-xl leading-relaxed mb-8"
          >
            {hero.tagline}
          </p>

          {/* CTA Buttons Row */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4 mb-8">
            <motion.a
              href={hero.cta.primary.href}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-xl bg-accentViolet hover:bg-accentViolet/90 text-white font-semibold flex items-center gap-2 transition-colors duration-200 shadow-lg shadow-accentViolet/20"
            >
              <span>{hero.cta.primary.label}</span>
              <ArrowRight size={18} />
            </motion.a>

            <motion.a
              href={hero.cta.secondary.href}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
              className="relative px-6 py-3 rounded-xl overflow-hidden group flex items-center justify-center font-semibold text-textPrimary bg-bgSecondary/40 border border-borderViolet/40 hover:text-white"
            >
              <motion.span
                className="absolute inset-0 border-2 border-accentCyan rounded-xl opacity-0 scale-95"
                variants={{
                  hover: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
                }}
              />
              <span className="relative z-10 flex items-center gap-2">
                <span>{hero.cta.secondary.label}</span>
                <Download size={18} />
              </span>
            </motion.a>
          </div>

          {/* Social Icons row */}
          <div ref={socialsRef} className="flex items-center gap-4 border-t border-borderViolet/20 pt-6">
            <span className="text-xs font-mono text-textMuted uppercase tracking-wider">Connect:</span>
            {hero.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-bgSecondary border border-borderViolet/20 hover:border-accentCyan/40 text-textMuted hover:text-accentCyan transition-smooth"
                aria-label={social.label}
              >
                {renderSocialIcon(social.icon)}
              </a>
            ))}
          </div>
        </div>

        {/* Right-Aligned Technical Code Card Panel */}
        <div className="lg:col-span-5 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "power3.out" }}
            className="w-full max-w-md bg-bgSecondary/60 border border-borderViolet/30 rounded-2xl p-6 font-mono text-xs md:text-sm text-left shadow-2xl relative overflow-hidden backdrop-blur-sm group"
          >
            {/* Corner violet visual highlights */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-accentViolet/5 rounded-full filter blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-accentCyan/5 rounded-full filter blur-xl"></div>

            {/* Window control circles */}
            <div className="flex items-center gap-1.5 mb-6 border-b border-borderViolet/10 pb-4">
              <span className="w-3 h-3 rounded-full bg-accentPink/60" />
              <span className="w-3 h-3 rounded-full bg-accentCyan/60" />
              <span className="w-3 h-3 rounded-full bg-[#10b981]/60" />
              <span className="text-textMuted text-[10px] ml-auto font-mono uppercase">profile.ts</span>
            </div>

            <div className="space-y-1.5 text-textPrimary/90">
              <p className="text-accentViolet">import <span className="text-textPrimary">{"{ Developer }"}</span> from <span className="text-accentPink">"@core/engine"</span>;</p>
              <p className="text-textMuted">// Initialize profile</p>
              <p><span className="text-accentPink">const</span> engineer = <span className="text-accentPink">new</span> <span className="text-accentCyan">Developer</span>({`{`}</p>
              <p className="pl-4">name: <span className="text-accentPink">"{hero.name}"</span>,</p>
              <p className="pl-4">role: <span className="text-accentPink">"Full Stack Developer"</span>,</p>
              <p className="pl-4">education: <span className="text-[#10b981]">"MCA @ SRM Easwari"</span>,</p>
              <p className="pl-4">codebaseMetrics: {`{`}</p>
              <p className="pl-8">apiBoost: <span className="text-[#f59e0b]">"~35% faster"</span>,</p>
              <p className="pl-8">apiEndpoints: <span className="text-[#f59e0b]">15</span>,</p>
              <p className="pl-8">dsaProblems: <span className="text-[#f59e0b]">180</span></p>
              <p className="pl-4">{`}`},</p>
              <p className="pl-4">coreTechStack: [</p>
              <p className="pl-8 text-accentCyan">"React", "Node.js", "TypeScript",</p>
              <p className="pl-8 text-accentCyan">"PostgreSQL", "Supabase", "Kafka"</p>
              <p className="pl-4">],</p>
              <p className="pl-4">status: <span className="text-[#10b981]">"OpenForOpportunity"</span></p>
              <p>{`});`}</p>
              <p className="pt-2 text-textMuted">// Booting...</p>
              <p className="text-accentPink">engineer<span className="text-textPrimary">.</span><span className="text-[#10b981]">deploy</span>();</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
