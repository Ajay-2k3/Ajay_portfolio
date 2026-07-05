import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight, Loader2, Check } from "lucide-react";
import { Github, Linkedin } from "../Icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { contact } from "../../data/portfolio";
import { splitText } from "../../utils/splitText";
import useMagnet from "../../hooks/useMagnet";

gsap.registerPlugin(ScrollTrigger);

// Small wrapper component to allow using useMagnet hook inside loops
const MagneticButton = ({ children, href, label }) => {
  const ref = useMagnet(12); // Max force ±12px for social row
  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="p-3 bg-bgSecondary border border-borderViolet/30 hover:border-accentCyan/50 rounded-xl text-textMuted hover:text-accentCyan transition-colors duration-200 inline-block"
    >
      {children}
    </a>
  );
};

export default function Contact() {
  const [formStatus, setFormStatus] = useState("idle"); // idle | loading | success
  const sectionRef = useRef(null);

  // Kinetic text word references
  const w1Ref = useRef(null);
  const w2Ref = useRef(null);
  const w3Ref = useRef(null);
  const w4Ref = useRef(null);

  // Email and Button refs
  const emailRef = useRef(null);
  const buttonRef = useRef(null);
  const btnTextRef = useRef(null);
  const btnSpinnerRef = useRef(null);
  const btnSuccessIconRef = useRef(null);

  // 1. Kinetic Text Reveal on scroll
  useEffect(() => {
    const w1 = splitText(w1Ref.current, "chars");
    const w2 = splitText(w2Ref.current, "chars");
    const w3 = splitText(w3Ref.current, "chars");
    const w4 = splitText(w4Ref.current, "chars");

    // Make sure we overflow hide parents for clip effect
    [w1Ref, w2Ref, w3Ref, w4Ref].forEach(ref => {
      if (ref.current) {
        ref.current.style.overflow = "hidden";
        ref.current.style.display = "block";
      }
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: w1Ref.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(w1, { yPercent: 100 }, { yPercent: 0, stagger: 0.03, duration: 0.4, ease: "power2.out" })
        .fromTo(w2, { yPercent: 100 }, { yPercent: 0, stagger: 0.03, duration: 0.4, ease: "power2.out" }, "-=0.3")
        .fromTo(w3, { yPercent: 100 }, { yPercent: 0, stagger: 0.03, duration: 0.4, ease: "power2.out" }, "-=0.3")
        .fromTo(w4, { yPercent: 100 }, { yPercent: 0, stagger: 0.03, duration: 0.4, ease: "power2.out" }, "-=0.3");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 2. Email Display Glitch Jitter on Hover
  const emailJitterRef = useRef(null);
  const handleEmailEnter = () => {
    emailJitterRef.current = gsap.timeline({ repeat: -1 });
    emailJitterRef.current.to(emailRef.current, {
      x: () => gsap.utils.random(-2, 2),
      y: () => gsap.utils.random(-1, 1),
      color: "#06b6d4",
      duration: 0.05,
      ease: "none",
    });
  };

  const handleEmailLeave = () => {
    if (emailJitterRef.current) {
      emailJitterRef.current.kill();
    }
    gsap.to(emailRef.current, {
      x: 0,
      y: 0,
      color: "#e2e8f0",
      duration: 0.2,
      overwrite: "auto",
    });
  };

  // 3. Form Submit State Machine Anim (Idle -> Loading -> Success)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formStatus !== "idle") return;

    setFormStatus("loading");

    const btn = buttonRef.current;
    const txt = btnTextRef.current;
    const spinner = btnSpinnerRef.current;

    // Morph button into a circular loading node
    gsap.timeline()
      .to(txt, { opacity: 0, y: -5, duration: 0.15 })
      .to(btn, {
        width: "50px",
        borderRadius: "9999px",
        paddingLeft: "0px",
        paddingRight: "0px",
        duration: 0.35,
        ease: "power2.inOut",
      }, "-=0.05")
      .to(spinner, { opacity: 1, duration: 0.15 }, "-=0.05")
      .to(spinner, { rotation: 360, repeat: -1, ease: "none", duration: 0.8 }, "-=0.05");

    // Simulate Server Request Latency
    setTimeout(() => {
      setFormStatus("success");
      gsap.killTweensOf(spinner); // Terminate loop

      const successIcon = btnSuccessIconRef.current;

      // Morph button back to expanded rectangular checkmark button
      gsap.timeline()
        .to(spinner, { opacity: 0, duration: 0.15 })
        .to(btn, {
          width: "160px",
          borderRadius: "12px",
          backgroundColor: "rgba(16, 185, 129, 0.2)",
          borderColor: "rgba(16, 185, 129, 0.5)",
          duration: 0.35,
          ease: "power2.inOut",
        }, "-=0.05")
        .to(successIcon, { opacity: 1, scale: 1, duration: 0.2 }, "-=0.05")
        .to(txt, { opacity: 1, y: 0, duration: 0.15 }, "-=0.05");

      // Reset Form status after 3s
      setTimeout(() => {
        setFormStatus("idle");
        gsap.timeline()
          .to([txt, successIcon], { opacity: 0, duration: 0.15 })
          .to(btn, {
            width: "100%",
            borderRadius: "12px",
            backgroundColor: "#7c3aed", // Reset to violet
            borderColor: "transparent",
            duration: 0.35,
            ease: "power2.inOut",
          })
          .to(txt, { opacity: 1, duration: 0.15 });
        e.target.reset(); // clear input
      }, 3000);
    }, 2000);
  };

  // Framer Motion input stagger variants
  const formParentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const fieldVariants = {
    hidden: { x: 40, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

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
      id="contact"
      ref={sectionRef}
      className="py-24 px-6 md:px-12 w-full bg-bgPrimary border-b border-borderViolet/10 relative overflow-hidden"
    >
      {/* Visual background lights */}
      <div className="absolute w-[200px] h-[200px] rounded-full bg-accentCyan/5 glow-orb bottom-10 left-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

        {/* Left Side: Large Kinetic Text (5/12 cols) */}
        <div className="lg:col-span-5 flex flex-col text-left justify-center">
          <span className="text-accentCyan font-mono text-xs uppercase tracking-widest mb-1">Get In Touch</span>

          {/* Kinetic staggered header words */}
          <div className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-[1.1] mb-6 tracking-tight">
            <span ref={w1Ref} className="block text-textPrimary">Let's</span>
            <span ref={w2Ref} className="block text-textPrimary">Build</span>
            <span ref={w3Ref} className="block text-textPrimary">Something</span>
            <span ref={w4Ref} className="block text-accentPink">Great.</span>
          </div>

          <p className="text-sm md:text-base text-textMuted leading-relaxed max-w-sm mb-8">
            {contact.subtext}
          </p>

          {/* Contact Details Card */}
          <div className="space-y-4 font-mono text-xs md:text-sm border-t border-borderViolet/10 pt-6 mb-8">
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-accentViolet" />
              <button
                ref={emailRef}
                onMouseEnter={handleEmailEnter}
                onMouseLeave={handleEmailLeave}
                onClick={() => window.open(`mailto:${contact.email}`)}
                className="text-textPrimary hover:underline focus:outline-none transition-smooth"
              >
                {contact.email}
              </button>
            </div>
            <div className="flex items-center gap-3 text-textMuted">
              <MapPin size={16} className="text-accentPink" />
              <span>{contact.location}</span>
            </div>
          </div>

          {/* Magnetic Social Row */}
          <div className="flex items-center gap-4">
            {contact.socials.map((social) => (
              <MagneticButton key={social.label} href={social.href} label={social.label}>
                {renderSocialIcon(social.icon)}
              </MagneticButton>
            ))}
          </div>
        </div>

        {/* Right Side: Form (7/12 cols) */}
        <div className="lg:col-span-7 w-full">
          <motion.div
            variants={formParentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="w-full bg-bgSecondary/50 border border-borderViolet/20 rounded-2xl p-6 md:p-8 relative backdrop-blur-sm"
          >
            <form onSubmit={handleFormSubmit} className="space-y-6">
              {contact.formFields.map((field) => (
                <motion.div key={field.name} variants={fieldVariants} className="flex flex-col text-left gap-1.5">
                  <label htmlFor={field.name} className="text-xs font-mono text-textMuted uppercase tracking-wider pl-1">
                    {field.label}
                  </label>

                  {field.type === "textarea" ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      required
                      placeholder={field.placeholder}
                      rows={4}
                      className="w-full bg-bgTertiary border border-borderViolet/30 focus:border-accentCyan/60 rounded-xl px-4 py-3 text-sm text-textPrimary placeholder:text-textMuted/40 focus:outline-none transition-smooth resize-none"
                    />
                  ) : (
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      required
                      placeholder={field.placeholder}
                      className="w-full bg-bgTertiary border border-borderViolet/30 focus:border-accentCyan/60 rounded-xl px-4 py-3 text-sm text-textPrimary placeholder:text-textMuted/40 focus:outline-none transition-smooth"
                    />
                  )}
                </motion.div>
              ))}

              {/* Submit button wrapping loader state animations */}
              <motion.div variants={fieldVariants} className="pt-2 flex justify-center">
                <button
                  ref={buttonRef}
                  type="submit"
                  disabled={formStatus !== "idle"}
                  className="w-full h-12 bg-accentViolet hover:bg-accentViolet/90 border border-transparent rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-accentViolet/20 hover:shadow-accentViolet/35 transition-colors focus:outline-none select-none relative overflow-hidden"
                  style={{ width: "100%" }}
                >
                  {/* Rotating loader spinner */}
                  <span ref={btnSpinnerRef} className="absolute opacity-0 flex items-center justify-center pointer-events-none">
                    <Loader2 size={20} className="animate-spin text-accentCyan" />
                  </span>

                  {/* Success indicator icon */}
                  <span ref={btnSuccessIconRef} className="absolute opacity-0 scale-50 flex items-center justify-center pointer-events-none text-[#10b981]">
                    <Check size={20} />
                  </span>

                  {/* Dynamic text reveal node */}
                  <span ref={btnTextRef} className="flex items-center gap-1.5 relative">
                    {formStatus === "idle" && (
                      <>
                        <span>{contact.submitLabel}</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                    {formStatus === "loading" && <span className="invisible">Loading</span>}
                    {formStatus === "success" && <span className="text-[#10b981]">Sent</span>}
                  </span>
                </button>
              </motion.div>
            </form>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
