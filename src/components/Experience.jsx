import { motion } from "framer-motion";
import { experiences } from "../data";

const TimelineCard = ({ exp, index }) => {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: isLeft ? -40 : 40,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
        margin: "-60px",
      }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.1,
      }}
      className="w-full"
    >
      <div
        className="w-full p-5 md:p-6 rounded-2xl glass glass-hover"
        style={{
          maxWidth: 480,
          marginLeft: isLeft ? "auto" : 0,
          marginRight: isLeft ? 0 : "auto",
        }}
      >
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="min-w-0">
            <h3
              style={{
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "#f1f5f9",
                marginBottom: 2,
              }}
            >
              {exp.title}
            </h3>

            <p
              style={{
                fontSize: "0.875rem",
                color: "#4f8ef7",
                fontWeight: 600,
              }}
            >
              {exp.company}
            </p>
          </div>

          <span
            style={{
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.05em",
              color: "rgba(241,245,249,0.4)",
              whiteSpace: "nowrap",
              marginTop: 2,
            }}
          >
            {exp.duration}
          </span>
        </div>

        <p
          style={{
            fontSize: "0.9rem",
            lineHeight: 1.7,
            color: "rgba(241,245,249,0.55)",
            marginBottom: 16,
          }}
        >
          {exp.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {exp.technologies.map((tech) => (
            <span
              key={tech}
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.05em",
                padding: "3px 10px",
                borderRadius: 999,
                background: "rgba(79,142,247,0.1)",
                border: "1px solid rgba(79,142,247,0.2)",
                color: "#4f8ef7",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Experience = () => (
  <section id="experience" className="relative section-padding overflow-hidden" aria-label="Experience">
    <span className="hash-span" />

    <div className="max-container">
      {/* Header */}
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
        — Experience
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="display-md mb-16"
      >
        Where I've <span className="text-gradient-blue">worked</span>.
      </motion.h2>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
          }}
          className="
            absolute
            left-[7px]
            md:left-1/2
            top-0
            bottom-0
            w-px
            origin-top
          "
          style={{
            background: "linear-gradient(to bottom, #4f8ef7, rgba(124,58,237,0.5), transparent)",
          }}
        />

        <div className="flex flex-col gap-12">
          {experiences.map((exp, i) => (
            <div
              key={exp.title + i}
              className="
                relative
                pl-8
                md:pl-0
              "
            >
              {/* Timeline dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: 0.2,
                  type: "spring",
                  bounce: 0.4,
                }}
                className="
                  absolute
                  left-[1px]
                  md:left-1/2
                  top-6
                  -translate-x-1/2
                "
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: "#4f8ef7",
                  border: "3px solid #050816",
                  boxShadow: "0 0 12px rgba(79,142,247,0.6)",
                  zIndex: 2,
                }}
              />

              {/* Mobile */}
              <div className="md:hidden w-full min-w-0">
                <TimelineCard exp={exp} index={i} />
              </div>

              {/* Desktop */}
              <div className="hidden md:grid md:grid-cols-2 md:gap-8">
                {i % 2 === 0 ? (
                  <>
                    <div />
                    <TimelineCard exp={exp} index={i} />
                  </>
                ) : (
                  <>
                    <TimelineCard exp={exp} index={i} />
                    <div />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Experience;
