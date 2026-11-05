import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ExternalLink } from "lucide-react";
import { GithubIcon } from "./ui/SocialIcons";
import { Suspense, lazy } from "react";
import RichText from "./ui/RichText";
import content from "../data";

const HeroScene = lazy(() => import("./three/HeroScene"));
const { hero } = content;

const Hero = () => {
  const mouse = useRef({ x: 0, y: 0 });

  const onMouseMove = useCallback((e) => {
    const { innerWidth, innerHeight } = window;
    mouse.current = {
      x: (e.clientX / innerWidth - 0.5) * 2,
      y: -(e.clientY / innerHeight - 0.5) * 2,
    };
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center overflow-hidden"
      onMouseMove={onMouseMove}
      aria-label="Hero"
    >
      <div className="max-container section-padding w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 min-h-[80vh]">
          {/* Left — Text */}
          <motion.div
            className="flex-1 flex flex-col justify-center z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Status badge */}
            {hero.badge && (
              <motion.div variants={itemVariants} className="mb-6">
                <span
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{
                    background: "rgba(79,142,247,0.1)",
                    border: "1px solid rgba(79,142,247,0.25)",
                    color: "#4f8ef7",
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: "#22d3ee",
                      display: "inline-block",
                      boxShadow: "0 0 8px #22d3ee",
                    }}
                  />
                  {hero.badge}
                </span>
              </motion.div>
            )}

            {/* Main heading */}
            <motion.h1 variants={itemVariants} className="display-xl mb-4" style={{ color: "#f1f5f9" }}>
              <RichText text={hero.heading} />
              <span style={{ color: "rgba(79,142,247,0.6)" }}>{hero.headingSuffix}</span>
            </motion.h1>

            {/* Role */}
            <motion.h2
              variants={itemVariants}
              className="display-md mb-6"
              style={{ color: "rgba(241,245,249,0.5)", fontWeight: 600 }}
            >
              {hero.role}
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="mb-10 max-w-lg"
              style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)", lineHeight: 1.7, color: "rgba(241,245,249,0.55)" }}
            >
              {hero.description}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-12">
              <a
                href={hero.primaryCtaHref}
                onClick={(e) => {
                  if (!hero.primaryCtaHref.startsWith("#")) return;
                  e.preventDefault();
                  document.getElementById(hero.primaryCtaHref.slice(1))?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #4f8ef7, #7c3aed)",
                  color: "#fff",
                  boxShadow: "0 4px 24px rgba(79,142,247,0.3)",
                }}
                data-cursor="view"
                aria-label="View my projects"
              >
                {hero.primaryCtaLabel}
                <ExternalLink
                  size={16}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </a>
              <a
                href={hero.secondaryCtaHref}
                rel="noopener noreferrer"
                target="_blank"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(241,245,249,0.8)",
                }}
                data-cursor="open"
              >
                <GithubIcon size={16} />
                {hero.secondaryCtaLabel}
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div variants={itemVariants} className="flex items-center gap-6">
              {hero.status && (
                <span style={{ fontSize: 12, color: "rgba(241,245,249,0.3)", letterSpacing: "0.1em" }}>{hero.status}</span>
              )}
              {hero.status && hero.location && <div style={{ width: 40, height: 1, background: "rgba(255,255,255,0.1)" }} />}
              {hero.location && (
                <span style={{ fontSize: 12, color: "rgba(241,245,249,0.3)", letterSpacing: "0.1em" }}>{hero.location}</span>
              )}
            </motion.div>
          </motion.div>

          {/* Right — 3D Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 relative"
            style={{ minHeight: 400, maxWidth: 500, width: "100%" }}
            aria-hidden="true"
          >
            {/* Glow behind 3D */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(79,142,247,0.12) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <Suspense fallback={<div style={{ width: "100%", height: 400 }} />}>
              <div style={{ width: "100%", height: 500 }}>
                <HeroScene mouse={mouse} />
              </div>
            </Suspense>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-label="Scroll down"
      >
        <span style={{ fontSize: 10, letterSpacing: "0.3em", color: "rgba(241,245,249,0.3)", fontWeight: 500 }}>
          {hero.scrollLabel}
        </span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown size={16} style={{ color: "rgba(79,142,247,0.5)" }} />
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          background: "linear-gradient(to bottom, transparent, #050816)",
          pointerEvents: "none",
        }}
      />
    </section>
  );
};

export default Hero;
