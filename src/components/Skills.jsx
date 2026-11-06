import { useState } from "react";
import { motion } from "framer-motion";
import RichText from "./ui/RichText";
import content from "../data";

const { skills } = content;

const SkillIcon = ({ skill, categoryColor }) => {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.12, y: -4 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col items-center gap-2 p-4 rounded-xl cursor-none"
      style={{
        background: hovered ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? categoryColor + "40" : "rgba(255,255,255,0.07)"}`,
        boxShadow: hovered ? `0 0 20px ${categoryColor}20` : "none",
        transition: "background 0.2s, border-color 0.2s, box-shadow 0.2s",
        minWidth: 80,
      }}
      data-cursor="hover"
      role="listitem"
      aria-label={skill.name}
    >
      {/* Icon */}
      <div style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {!imgError ? (
          <img
            src={skill.icon}
            alt={skill.name}
            loading="lazy"
            decoding="async"
            width={32}
            height={32}
            style={{
              width: 32,
              height: 32,
              objectFit: "contain",
              filter: skill.icon.includes("threejs") ? "invert(1)" : "none",
              opacity: hovered ? 1 : 0.85,
              transition: "opacity 0.2s",
            }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: categoryColor + "20",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              fontWeight: 700,
              color: categoryColor,
            }}
          >
            {skill.name[0]}
          </div>
        )}
      </div>
      {/* Name */}
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.02em",
          color: hovered ? "#f1f5f9" : "rgba(241,245,249,0.45)",
          transition: "color 0.2s",
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        {skill.name}
      </span>

      {/* Tooltip glow on hover */}
      {hovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          style={{
            position: "absolute",
            bottom: -28,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.1em",
            padding: "3px 8px",
            borderRadius: 999,
            background: categoryColor + "20",
            border: `1px solid ${categoryColor}40`,
            color: categoryColor,
            whiteSpace: "nowrap",
            zIndex: 10,
          }}
        >
          {skill.name}
        </motion.div>
      )}
    </motion.div>
  );
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(skills.allLabel);

  const allCategories = [skills.allLabel, ...skills.categories.map((c) => c.name)];
  const filteredCategories =
    activeCategory === skills.allLabel ? skills.categories : skills.categories.filter((c) => c.name === activeCategory);

  return (
    <section id="skills" className="relative section-padding" aria-label="Skills">
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
          {skills.label}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="display-md mb-8"
        >
          <RichText text={skills.heading} />
        </motion.h2>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-12"
          role="tablist"
          aria-label="Skill categories"
        >
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              role="tab"
              aria-selected={activeCategory === cat}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                background: activeCategory === cat ? "rgba(79,142,247,0.15)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${activeCategory === cat ? "rgba(79,142,247,0.4)" : "rgba(255,255,255,0.07)"}`,
                color: activeCategory === cat ? "#4f8ef7" : "rgba(241,245,249,0.5)",
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skill grids per category */}
        <div className="flex flex-col gap-12">
          {filteredCategories.map((category, ci) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: ci * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div style={{ width: 4, height: 20, borderRadius: 2, background: category.color }} />
                <h3
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: category.color,
                    textTransform: "uppercase",
                  }}
                >
                  {category.name}
                </h3>
              </div>
              <div className="flex flex-wrap gap-3" role="list" aria-label={`${category.name} skills`}>
                {category.skills.map((skill, si) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: si * 0.05 }}
                  >
                    <SkillIcon skill={skill} categoryColor={category.color} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
