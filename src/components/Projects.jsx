import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "./ui/SocialIcons";
import RichText from "./ui/RichText";
import content from "../data";

const { projects } = content;
// Numbers follow the display order, so reordering projects renumbers them.
const projectItems = projects.items.map((project, i) => ({ ...project, number: String(i + 1).padStart(2, "0") }));

// Fallback abstract project preview (CSS-only)
const AbstractPreview = ({ color, number }) => (
  <div style={{ width: "100%", height: "100%", background: "#0a0f1e", position: "relative", overflow: "hidden" }}>
    {/* Grid lines */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
      }}
    />
    {/* Radial glow */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `radial-gradient(ellipse 60% 60% at 50% 50%, ${color}20 0%, transparent 70%)`,
      }}
    />
    {/* Number watermark */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 120,
        fontWeight: 900,
        color: color + "10",
        letterSpacing: "-0.05em",
      }}
    >
      {number}
    </div>
    {/* Decorative shapes */}
    <div
      style={{
        position: "absolute",
        top: 30,
        right: 40,
        width: 60,
        height: 60,
        border: `1px solid ${color}30`,
        transform: "rotate(45deg)",
      }}
    />
    <div
      style={{
        position: "absolute",
        bottom: 40,
        left: 30,
        width: 40,
        height: 40,
        border: `1px solid ${color}20`,
        borderRadius: "50%",
      }}
    />
    {/* Horizontal lines */}
    {[0.3, 0.5, 0.7].map((y, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: "10%",
          right: "10%",
          top: `${y * 100}%`,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${color}20, transparent)`,
        }}
      />
    ))}
  </div>
);

const ProjectModal = ({ project, onClose }) => (
  <AnimatePresence>
    {project && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} details`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl rounded-2xl overflow-hidden"
          style={{
            background: "#0d1117",
            border: "1px solid rgba(255,255,255,0.08)",
            maxHeight: "90vh",
            overflowY: "auto",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Preview image */}
          <div style={{ height: 260, overflow: "hidden" }}>
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                decoding="async"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <AbstractPreview color={project.color} number={project.number} />
            )}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 260,
                background: "linear-gradient(to bottom, transparent 50%, #0d1117 100%)",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg"
            style={{ background: "rgba(0,0,0,0.5)", color: "#f1f5f9", border: "1px solid rgba(255,255,255,0.1)" }}
            aria-label="Close"
          >
            <X size={18} />
          </button>

          {/* Content */}
          <div className="p-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span style={{ fontSize: 11, color: project.color, fontWeight: 700, letterSpacing: "0.2em" }}>
                  {project.number}
                </span>
                <h3
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: 700,
                    color: "#f1f5f9",
                    letterSpacing: "-0.02em",
                    marginTop: 4,
                  }}
                >
                  {project.title}
                </h3>
              </div>
              <div className="flex gap-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg transition-colors duration-200"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "rgba(241,245,249,0.7)",
                    }}
                    aria-label="View source code"
                  >
                    <GithubIcon size={18} />
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg transition-colors duration-200"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "rgba(241,245,249,0.7)",
                    }}
                    aria-label="View live demo"
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>
            <p
              style={{
                fontSize: "0.95rem",
                lineHeight: 1.8,
                color: "rgba(241,245,249,0.6)",
                marginBottom: 20,
                whiteSpace: "pre-line",
              }}
            >
              {project.details || project.description}
            </p>

            {project.facts.length > 0 && (
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                {project.facts.map((fact, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <dt style={{ fontSize: 11, color: "rgba(241,245,249,0.4)", marginBottom: 2 }}>{fact.label}</dt>
                    <dd style={{ fontSize: "0.9rem", fontWeight: 600, color: "#f1f5f9" }}>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {project.features.length > 0 && (
              <ul className="flex flex-col gap-2 mb-5">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex gap-2" style={{ fontSize: "0.9rem", color: "rgba(241,245,249,0.6)" }}>
                    <span style={{ color: project.color }} aria-hidden="true">
                      •
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    padding: "4px 12px",
                    borderRadius: 999,
                    background: project.color + "15",
                    border: `1px solid ${project.color}30`,
                    color: project.color,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {project.gallery.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {project.gallery.map((shot, i) => (
                  <figure key={i}>
                    <img
                      src={shot.image}
                      alt={shot.caption || project.title}
                      loading="lazy"
                      className="w-full rounded-xl"
                      style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                    />
                    {shot.caption && (
                      <figcaption style={{ fontSize: 12, color: "rgba(241,245,249,0.4)", marginTop: 6 }}>
                        {shot.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const ProjectCard = ({ project, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className="group relative rounded-2xl overflow-hidden cursor-none"
      style={{
        background: "#0a0f1e",
        border: `1px solid ${hovered ? project.color + "40" : "rgba(255,255,255,0.06)"}`,
        boxShadow: hovered ? `0 24px 60px rgba(0,0,0,0.5), 0 0 40px ${project.color}15` : "0 8px 32px rgba(0,0,0,0.3)",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
      data-cursor="view"
      tabIndex={0}
      role="button"
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      aria-label={`View ${project.title} project details`}
    >
      {/* Image area */}
      <div style={{ height: 220, overflow: "hidden", position: "relative" }}>
        <motion.div
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: "100%", height: "100%" }}
        >
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              decoding="async"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <AbstractPreview color={project.color} number={project.number} />
          )}
        </motion.div>

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to bottom, transparent 30%, rgba(10,15,30,0.95) 100%)`,
            transition: "opacity 0.3s",
          }}
        />

        {/* Number badge */}
        <div
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            fontSize: 11,
            fontWeight: 900,
            letterSpacing: "0.2em",
            color: project.color,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {project.number}
        </div>

        {/* Top-right actions */}
        <div
          className="absolute top-3 right-3 flex gap-2"
          style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.25s" }}
        >
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 rounded-lg"
              style={{ background: "rgba(0,0,0,0.7)", border: "1px solid rgba(255,255,255,0.1)", color: "#f1f5f9" }}
              aria-label="Source code"
            >
              <GithubIcon size={14} />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 rounded-lg"
              style={{ background: "rgba(0,0,0,0.7)", border: "1px solid rgba(255,255,255,0.1)", color: "#f1f5f9" }}
              aria-label="Live demo"
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3
            style={{
              fontSize: "1.05rem",
              fontWeight: 700,
              color: "#f1f5f9",
              letterSpacing: "-0.01em",
              lineHeight: 1.3,
            }}
          >
            {project.title}
          </h3>
          <motion.div
            animate={{ x: hovered ? 2 : 0, y: hovered ? -2 : 0 }}
            transition={{ duration: 0.2 }}
            style={{ color: project.color, flexShrink: 0, marginTop: 2 }}
          >
            <ArrowUpRight size={18} />
          </motion.div>
        </div>

        <p style={{ fontSize: "0.875rem", lineHeight: 1.65, color: "rgba(241,245,249,0.5)", marginBottom: 16 }}>
          {project.description.length > 120 ? `${project.description.substring(0, 120)}...` : project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: "2px 8px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(241,245,249,0.5)",
              }}
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span style={{ fontSize: 11, color: "rgba(241,245,249,0.3)", padding: "2px 8px" }}>
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="relative section-padding" aria-label="Projects">
      <span className="hash-span" />
      <div className="max-container">
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
          {projects.label}
        </motion.p>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="display-md"
          >
            <RichText text={projects.heading} />
          </motion.h2>
          <motion.a
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            href={projects.viewAllHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium flex-shrink-0"
            style={{ color: "#4f8ef7" }}
            data-cursor="open"
          >
            {projects.viewAllLabel} <ArrowUpRight size={16} />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {projectItems.map((project) => (
            <ProjectCard key={project.number} project={project} onClick={() => setSelectedProject(project)} />
          ))}
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};

export default Projects;
