import { motion } from "framer-motion";
import { Suspense, lazy } from "react";
import {
  MapPin,
  Code2,
  Layers,
  Zap,
  Sparkles,
  Rocket,
  Heart,
  Star,
  Globe,
  Cpu,
  Palette,
  Shield,
  Terminal,
  Smartphone,
} from "lucide-react";
import RichText from "./ui/RichText";
import content from "../data";

const FloatingGeometry = lazy(() => import("./three/FloatingGeometry"));
const { about } = content;

// Keep in sync with HIGHLIGHT_ICONS in admin/schema.js
const icons = { Code2, Layers, Zap, Sparkles, Rocket, Heart, Star, Globe, Cpu, Palette, Shield, Terminal, Smartphone };

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const About = () => (
  <section id="about" className="relative section-padding" aria-label="About">
    <span className="hash-span" />
    <div className="max-container">
      {/* Label */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          fontSize: 12,
          letterSpacing: "0.35em",
          color: "#4f8ef7",
          fontWeight: 600,
          textTransform: "uppercase",
          marginBottom: 16,
        }}
      >
        {about.label}
      </motion.p>

      <div className="flex flex-col lg:flex-row items-start gap-16">
        {/* Left — bio */}
        <motion.div
          className="flex-1 space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.h2 variants={itemVariants} className="display-md">
            <RichText text={about.heading} />
          </motion.h2>

          {about.paragraphs.map((paragraph, i) => (
            <motion.p
              key={i}
              variants={itemVariants}
              style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "rgba(241,245,249,0.6)" }}
            >
              {paragraph}
            </motion.p>
          ))}

          {/* Highlights */}
          <motion.div variants={itemVariants} className="flex flex-col gap-3 pt-2">
            {about.highlights.map((h, i) => {
              const Icon = icons[h.icon] || Sparkles;
              return (
                <div key={i} className="flex items-center gap-3" style={{ color: "rgba(241,245,249,0.7)" }}>
                  <span style={{ color: "#4f8ef7" }}>
                    <Icon size={18} />
                  </span>
                  <span style={{ fontSize: "0.95rem" }}>{h.text}</span>
                </div>
              );
            })}
          </motion.div>

          {/* Location */}
          {about.location && (
            <motion.div variants={itemVariants} className="flex items-center gap-2 pt-2">
              <MapPin size={14} style={{ color: "#4f8ef7" }} />
              <span style={{ fontSize: "0.9rem", color: "rgba(241,245,249,0.4)" }}>{about.location}</span>
            </motion.div>
          )}

          {/* Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            {about.stats.map((s, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center p-4 rounded-xl"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <span
                  style={{
                    fontSize: "clamp(1.4rem, 3vw, 2rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    color: "#4f8ef7",
                  }}
                >
                  {s.value}
                </span>
                <span style={{ fontSize: 11, color: "rgba(241,245,249,0.4)", marginTop: 4, textAlign: "center" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — 3D object */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex-shrink-0 lg:w-80 w-full"
          style={{ height: 320 }}
          aria-hidden="true"
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(124,58,237,0.12) 0%, transparent 70%)",
                borderRadius: 24,
              }}
            />
            <Suspense fallback={null}>
              <FloatingGeometry />
            </Suspense>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default About;
