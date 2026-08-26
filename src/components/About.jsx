import { motion } from "framer-motion";
import { Suspense, lazy } from "react";
import { MapPin, Code2, Layers, Zap } from "lucide-react";

const FloatingGeometry = lazy(() => import("./three/FloatingGeometry"));

const stats = [
  { value: "3+", label: "Years Learning" },
  { value: "10+", label: "Projects Built" },
  { value: "4", label: "Tech Stacks" },
  { value: "∞", label: "Coffee Consumed" },
];

const highlights = [
  { icon: <Code2 size={18} />, text: "Clean, maintainable code" },
  { icon: <Layers size={18} />, text: "Full-stack capability" },
  { icon: <Zap size={18} />, text: "Performance-focused" },
];

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
        — About Me
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
            Engineering <span className="text-gradient-blue">craft</span> meets creative{" "}
            <span className="text-gradient-violet">vision</span>.
          </motion.h2>

          <motion.p
            variants={itemVariants}
            style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "rgba(241,245,249,0.6)" }}
          >
            I'm a Frontend Engineer and Creative Developer based in Ho Chi Minh City, Vietnam. I specialize in building
            performant, interactive web experiences using React, Three.js, and modern animation libraries.
          </motion.p>

          <motion.p
            variants={itemVariants}
            style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "rgba(241,245,249,0.6)" }}
          >
            My work sits at the intersection of engineering precision and creative exploration — whether that's crafting
            smooth UI systems, implementing WebGL shaders, or designing interactions that feel satisfying to use. I
            believe the web is the most accessible creative medium, and I take that seriously.
          </motion.p>

          {/* Highlights */}
          <motion.div variants={itemVariants} className="flex flex-col gap-3 pt-2">
            {highlights.map((h) => (
              <div key={h.text} className="flex items-center gap-3" style={{ color: "rgba(241,245,249,0.7)" }}>
                <span style={{ color: "#4f8ef7" }}>{h.icon}</span>
                <span style={{ fontSize: "0.95rem" }}>{h.text}</span>
              </div>
            ))}
          </motion.div>

          {/* Location */}
          <motion.div variants={itemVariants} className="flex items-center gap-2 pt-2">
            <MapPin size={14} style={{ color: "#4f8ef7" }} />
            <span style={{ fontSize: "0.9rem", color: "rgba(241,245,249,0.4)" }}>Ho Chi Minh City, Vietnam</span>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            {stats.map((s) => (
              <div
                key={s.label}
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
