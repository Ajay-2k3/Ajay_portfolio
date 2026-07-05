import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Download, Mail, Terminal as ShellIcon, Cpu, Database, Play } from "lucide-react";
import { Github, Linkedin } from "../Icons";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { hero } from "../../data/portfolio";
import { splitText } from "../../utils/splitText";

// Scramble Text component for role typewriter cycles
const ScrambleText = ({ words }) => {
  const [currentText, setCurrentText] = useState("");
  const timerRef = useRef(null);

  useEffect(() => {
    let wordIndex = 0;
    let iteration = 0;
    const chars = "XYZ@#$%&*<>!?_-+=[]{}";
    const totalIterations = 3; 

    const scrambleWord = (targetWord, callback) => {
      let frame = 0;
      const totalFrames = 15; 
      
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

  return <span className="text-accentCyan font-mono font-bold">{currentText}</span>;
};

export default function Hero() {
  const [activeTab, setActiveTab] = useState("terminal"); // terminal | diagnostics
  const heroRef = useRef(null);
  const nameRef = useRef(null);
  const taglineRef = useRef(null);
  const socialsRef = useRef(null);
  const ctaRef = useRef(null);
  const terminalLogsRef = useRef(null);
  
  // Parallax background orbs
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const orb3Ref = useRef(null);

  // 3D Visualizer refs
  const container3dRef = useRef(null);
  const cardIDE = useRef(null);
  const cardSchema = useRef(null);

  // Parallax mouse movements for background orbs
  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    const orb1 = orb1Ref.current;
    const orb2 = orb2Ref.current;
    const orb3 = orb3Ref.current;

    const ctx = gsap.context(() => {
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

        setX1(deltaX * 0.025);
        setY1(deltaY * 0.025);

        setX2(deltaX * 0.04);
        setY2(deltaY * 0.04);

        setX3(deltaX * 0.015);
        setY3(deltaY * 0.015);
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Text entrance stagger animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial terminal logs stagger
      gsap.fromTo(
        ".term-log-line",
        { opacity: 0, x: -15 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" }
      );

      // 2. Name split characters reveal
      if (nameRef.current) {
        const chars = splitText(nameRef.current, "chars");
        gsap.fromTo(
          chars,
          { y: 60, opacity: 0, rotationX: -80 },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            stagger: 0.03,
            ease: "back.out(1.6)",
            duration: 0.7,
            delay: 0.5,
            transformOrigin: "center bottom",
          }
        );
      }

      // 3. Tagline words stagger
      if (taglineRef.current) {
        const words = splitText(taglineRef.current, "words");
        gsap.fromTo(
          words,
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.02,
            ease: "power2.out",
            duration: 0.6,
            delay: 0.8,
          }
        );
      }

      // 4. Action buttons reveal
      gsap.from([ctaRef.current, socialsRef.current], {
        opacity: 0,
        y: 15,
        duration: 0.7,
        delay: 1.2,
        stagger: 0.1,
        ease: "power2.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Trigger typewriter effect on terminal diagnostics toggle
  useEffect(() => {
    if (activeTab === "diagnostics") {
      gsap.fromTo(
        ".diag-log",
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.35, stagger: 0.08, ease: "power2.out" }
      );
    }
  }, [activeTab]);

  // 3D Parallax Tilt for Dual Card Panel
  const handleMouseMove3D = (e) => {
    const container = container3dRef.current;
    const ide = cardIDE.current;
    const schema = cardSchema.current;
    if (!container || !ide || !schema) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 8;
    const rotateY = (x - centerX) / 8;

    // IDE tilts forward, Schema shifts back and slides out
    gsap.to(ide, {
      rotateX: rotateX * 0.8,
      rotateY: rotateY * 0.8,
      x: (x - centerX) * 0.04,
      y: (y - centerY) * 0.04,
      ease: "power2.out",
      duration: 0.3,
      overwrite: "auto",
    });

    gsap.to(schema, {
      rotateX: rotateX * 0.6,
      rotateY: rotateY * 0.6,
      x: -(x - centerX) * 0.08 - 40, // slides offset further left on hover
      y: -(y - centerY) * 0.08 + 40, // slides offset further down on hover
      ease: "power2.out",
      duration: 0.3,
      overwrite: "auto",
    });
  };

  const handleMouseLeave3D = () => {
    const ide = cardIDE.current;
    const schema = cardSchema.current;
    if (!ide || !schema) return;

    gsap.to(ide, {
      rotateX: 0,
      rotateY: 0,
      x: 0,
      y: 0,
      ease: "power3.out",
      duration: 0.6,
      overwrite: "auto",
    });

    gsap.to(schema, {
      rotateX: 0,
      rotateY: 0,
      x: -40,
      y: 40,
      ease: "power3.out",
      duration: 0.6,
      overwrite: "auto",
    });
  };

  const renderSocialIcon = (icon) => {
    switch (icon) {
      case "github":
        return <Github size={18} />;
      case "linkedin":
        return <Linkedin size={18} />;
      case "mail":
        return <Mail size={18} />;
      default:
        return null;
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center bg-bgPrimary px-6 md:px-12 pt-36 lg:pt-40 pb-16 overflow-hidden bg-dot-grid"
    >
      {/* Background decoration orbs */}
      <div
        ref={orb1Ref}
        className="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full bg-accentViolet opacity-[0.08] glow-orb top-[10%] left-[5%]"
      />
      <div
        ref={orb2Ref}
        className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full bg-accentCyan opacity-[0.06] glow-orb bottom-[10%] right-[10%]"
      />
      <div
        ref={orb3Ref}
        className="absolute w-[250px] h-[250px] md:w-[350px] md:h-[350px] rounded-full bg-accentPink opacity-[0.04] glow-orb top-[40%] left-[45%]"
      />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* LEFT COLUMN: Bio console (lg:col-span-7) */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          
          {/* Main terminal bio block */}
          <div className="w-full bg-bgSecondary/35 border border-borderViolet/25 rounded-2xl p-6 backdrop-blur-sm shadow-xl relative overflow-hidden font-mono mb-6">
            <div className="absolute top-0 right-0 w-24 h-24 bg-borderViolet/5 rounded-full filter blur-xl" />
            
            {/* Terminal Header & Navigation Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-borderViolet/10 pb-3 mb-5">
              
              {/* Tab options selector */}
              <div className="flex items-center gap-1.5 bg-bgTertiary/60 p-1 border border-borderViolet/10 rounded-lg">
                <button
                  onClick={() => setActiveTab("terminal")}
                  className={`px-3 py-1 rounded-md text-[9px] uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    activeTab === "terminal"
                      ? "bg-accentViolet text-white shadow-md shadow-accentViolet/20"
                      : "text-textMuted hover:text-textPrimary"
                  }`}
                >
                  terminal.sh
                </button>
                <button
                  onClick={() => setActiveTab("diagnostics")}
                  className={`px-3 py-1 rounded-md text-[9px] uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    activeTab === "diagnostics"
                      ? "bg-accentCyan text-bgPrimary shadow-md shadow-accentCyan/20"
                      : "text-textMuted hover:text-textPrimary"
                  }`}
                >
                  diagnostics.log
                </button>
              </div>

              {/* Window controls representation */}
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-accentPink/60" />
                <span className="w-2 h-2 rounded-full bg-accentCyan/60" />
                <span className="w-2 h-2 rounded-full bg-[#10b981]/60" />
              </div>
            </div>

            {/* TAB CONTENT: Interactive Shell panels */}
            <div className="min-h-[260px] flex flex-col justify-between">
              
              {activeTab === "terminal" ? (
                /* Terminal tab content */
                <div className="font-sans space-y-4">
                  
                  {/* Boot diagnostics info lines */}
                  <div ref={terminalLogsRef} className="space-y-1 font-mono text-[10px] text-textMuted leading-tight mb-2">
                    <p className="term-log-line">ajay@mainframe:~$ ./boot_system.sh</p>
                    <p className="term-log-line text-accentCyan">➜ Initializing Full-Stack Engine... [OK]</p>
                    <p className="term-log-line text-[#10b981]">➜ Connected port 5000 (Socket.IO telemetry active)</p>
                  </div>

                  <span className="text-accentViolet font-mono text-xs uppercase tracking-widest font-semibold block">
                    {hero.greeting}
                  </span>

                  <h1
                    ref={nameRef}
                    className="text-4xl md:text-6xl font-bold font-display tracking-tight text-textPrimary leading-none"
                  >
                    {hero.name}
                  </h1>

                  <h2 className="text-lg md:text-2xl font-display font-medium text-textPrimary/80 flex items-center gap-2">
                    <span className="text-textMuted font-mono text-xs md:text-sm">&gt; Specialize:</span>
                    <ScrambleText words={hero.roles} />
                    <span className="typewriter-cursor h-5 md:h-7 inline-block ml-0.5" />
                  </h2>

                  <p
                    ref={taglineRef}
                    className="text-xs md:text-sm text-textMuted leading-relaxed max-w-xl font-mono border-t border-borderViolet/10 pt-4"
                  >
                    {hero.tagline}
                  </p>
                </div>
              ) : (
                /* Diagnostics logs tab content */
                <div className="font-mono text-[11px] text-textMuted space-y-1.5 leading-relaxed">
                  <p className="diag-log text-accentCyan">ajay@mainframe:~$ ./query_diagnostics.log</p>
                  <p className="diag-log text-textMuted">[INFO] Querying network performance benchmarks...</p>
                  <p className="diag-log text-[#10b981]">✔ [LOAD] Ensemble ML models loaded successfully.</p>
                  <p className="diag-log text-[#10b981]">✔ [LATENCY] ML prediction response timed at &lt;500ms.</p>
                  <p className="diag-log text-[#10b981]">✔ [DATABASES] PostgreSQL compound indexing active (latency -40%).</p>
                  <p className="diag-log text-[#10b981]">✔ [SECURITY] CSRF protection & JWT middleware validation verified.</p>
                  <p className="diag-log text-accentPink">⚡ [SYSTEM] Node.js/TypeScript core is fully compiled and operational.</p>
                  <p className="diag-log text-textPrimary pt-4 blink-prompt font-bold">ajay@mainframe:~$ _</p>
                </div>
              )}
            </div>
          </div>

          {/* CTA Buttons & Social links */}
          <div className="space-y-6">
            <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
              <motion.a
                href={hero.cta.primary.href}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-6 py-3 rounded-full bg-accentViolet hover:bg-accentViolet/90 text-white font-mono text-xs font-semibold flex items-center gap-2 transition-colors duration-200 shadow-lg shadow-accentViolet/25"
                style={{
                  boxShadow: `0 0 20px rgba(124, 82, 237, 0.25)`,
                }}
              >
                <span>LAUNCH_WORK</span>
                <ArrowRight size={14} />
              </motion.a>

              <motion.a
                href={hero.cta.secondary.href}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-6 py-3 rounded-full bg-bgSecondary/50 border border-borderViolet/35 hover:border-accentCyan/55 text-textPrimary hover:text-white font-mono text-xs font-semibold flex items-center gap-2 transition-all duration-300"
              >
                <span>GET_RESUME</span>
                <Download size={14} className="text-accentCyan" />
              </motion.a>
            </div>

            {/* Social Icons row */}
            <div ref={socialsRef} className="flex items-center gap-3 border-t border-borderViolet/15 pt-5">
              <span className="text-[10px] font-mono text-textMuted uppercase tracking-widest mr-2">Core links:</span>
              {hero.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-bgSecondary/60 border border-borderViolet/20 hover:border-accentCyan/45 text-textMuted hover:text-accentCyan transition-all duration-300"
                  aria-label={social.label}
                >
                  {renderSocialIcon(social.icon)}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 3D Holographic dual-layer panel (lg:col-span-5) */}
        <div 
          ref={container3dRef}
          onMouseMove={handleMouseMove3D}
          onMouseLeave={handleMouseLeave3D}
          className="lg:col-span-5 w-full flex justify-center py-12 relative cursor-pointer min-h-[380px]"
        >
          {/* Card 2: Relational database schema layout (BACKGROUND CARD) */}
          <div
            ref={cardSchema}
            className="absolute w-full max-w-[280px] bg-[#070712]/90 border border-accentCyan/30 rounded-xl p-5 shadow-2xl font-mono text-[10px] text-left pointer-events-none select-none z-10 transition-transform duration-100"
            style={{
              transform: "translate(-40px, 40px)",
              borderColor: "rgba(6, 182, 212, 0.25)",
              boxShadow: "0 10px 40px rgba(6,182,212,0.06)",
            }}
          >
            {/* Schema Header */}
            <div className="flex items-center gap-2 border-b border-accentCyan/15 pb-2 mb-3 text-accentCyan">
              <Database size={12} />
              <span className="uppercase text-[9px] tracking-wider font-bold">schema.db — PostgreSQL</span>
            </div>
            
            {/* Schema columns */}
            <div className="space-y-3.5 text-textMuted">
              <div>
                <p className="text-textPrimary font-semibold">Table stock_telemetry {'{'}</p>
                <p className="pl-3">id <span className="text-accentCyan">uuid</span> <span className="text-accentPink">[pk]</span></p>
                <p className="pl-3">price <span className="text-[#10b981]">numeric</span></p>
                <p className="pl-3">latency_ms <span className="text-accentPink">int</span></p>
                <p className="pl-3">predictions <span className="text-accentViolet">jsonb</span></p>
                <p>{'}'}</p>
              </div>

              <div>
                <p className="text-textPrimary font-semibold">Table order_queue {'{'}</p>
                <p className="pl-3">id <span className="text-accentCyan">serial</span> <span className="text-accentPink">[pk]</span></p>
                <p className="pl-3">status <span className="text-[#10b981]">varchar</span></p>
                <p className="pl-3">payload <span className="text-accentViolet">json</span></p>
                <p>{'}'}</p>
              </div>
            </div>
          </div>

          {/* Card 1: profile.ts IDE code card (FOREGROUND CARD) */}
          <div
            ref={cardIDE}
            className="w-full max-w-[340px] bg-bgSecondary/85 border border-borderViolet/35 rounded-2xl p-5 shadow-2xl relative overflow-hidden backdrop-blur-sm z-20 transition-transform duration-100"
            style={{
              boxShadow: `0 15px 45px rgba(124,58,237,0.12)`,
            }}
          >
            {/* Visual glow overlay */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-accentViolet/5 rounded-full filter blur-xl" />

            {/* IDE header */}
            <div className="flex items-center gap-1.5 mb-5 border-b border-borderViolet/10 pb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-accentPink/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-accentCyan/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]/60" />
              <span className="text-textMuted text-[9px] ml-auto font-mono uppercase flex items-center gap-1">
                <Cpu size={10} className="text-accentPink" />
                <span>profile.ts</span>
              </span>
            </div>

            {/* Code lines */}
            <div className="space-y-1 font-mono text-[10px] md:text-xs text-left text-textPrimary/90">
              <p className="text-accentViolet">import <span className="text-textPrimary">{"{ Developer }"}</span> from <span className="text-accentPink">"@core/engine"</span>;</p>
              <p className="text-textMuted">// Initialize profile</p>
              <p><span className="text-accentPink">const</span> engineer = <span className="text-accentPink">new</span> <span className="text-accentCyan">Developer</span>({`{`}</p>
              <p className="pl-3">name: <span className="text-accentPink">"{hero.name}"</span>,</p>
              <p className="pl-3">role: <span className="text-accentPink">"Full Stack Developer"</span>,</p>
              <p className="pl-3">education: <span className="text-[#10b981]">"MCA @ SRM Easwari"</span>,</p>
              <p className="pl-3">codebaseMetrics: {`{`}</p>
              <p className="pl-6">apiBoost: <span className="text-[#f59e0b]">"~35% faster"</span>,</p>
              <p className="pl-6">apiEndpoints: <span className="text-[#f59e0b]">"12+"</span>,</p>
              <p className="pl-6">dsaProblems: <span className="text-[#f59e0b]">180</span></p>
              <p className="pl-3">{`}`},</p>
              <p className="pl-3">coreTechStack: [</p>
              <p className="pl-6 text-accentCyan">"React", "Node.js", "TypeScript",</p>
              <p className="pl-6 text-accentCyan">"PostgreSQL", "Supabase", "Kafka"</p>
              <p className="pl-3">],</p>
              <p className="pl-3">status: <span className="text-[#10b981]">"OpenForOpportunity"</span></p>
              <p>{`});`}</p>
              <p className="pt-2 text-textMuted">// Deploying mainframe...</p>
              <p className="text-accentPink">engineer<span className="text-textPrimary">.</span><span className="text-[#10b981]">deploy</span>();</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
