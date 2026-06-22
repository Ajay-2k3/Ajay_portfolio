import React, { Suspense, lazy } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import useScrollProgress from "./hooks/useScrollProgress";

// Lazy load below-the-fold components to maximize lighthouse score
const About = lazy(() => import("./components/About/About"));
const Skills = lazy(() => import("./components/Skills/Skills"));
const Projects = lazy(() => import("./components/Projects/Projects"));
const Experience = lazy(() => import("./components/Experience/Experience"));
const Education = lazy(() => import("./components/Education/Education"));
const Certifications = lazy(() => import("./components/Certifications/Certifications"));
const Contact = lazy(() => import("./components/Contact/Contact"));
const Footer = lazy(() => import("./components/Footer/Footer"));

// Skeleton loader helper for lazy components
const SectionLoader = () => (
  <div className="w-full min-h-[400px] flex items-center justify-center bg-bgPrimary/50 border border-borderViolet/10 rounded-2xl my-8">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-4 border-accentViolet border-t-transparent rounded-full animate-spin"></div>
      <span className="text-xs text-textMuted font-mono uppercase tracking-wider">Syncing Stream...</span>
    </div>
  </div>
);

function App() {
  // Drive the top 2px progress bar with our scroll hook
  const progressRef = useScrollProgress();

  return (
    <div className="relative min-h-screen bg-bgPrimary text-textPrimary selection:bg-accentViolet/30 selection:text-white overflow-hidden">
      {/* 2px Scroll Progress Bar at the absolute top */}
      <div
        ref={progressRef}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-accentViolet via-accentCyan to-accentPink z-[999] transform scale-x-0"
      />

      {/* Persistent Nav */}
      <Navbar />

      {/* Main content grid */}
      <main className="w-full relative z-10">
        <Hero />
        
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Skills />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Experience />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Education />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Certifications />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </main>

      {/* Footer */}
      <Suspense fallback={<div className="h-20 bg-bgSecondary" />}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
