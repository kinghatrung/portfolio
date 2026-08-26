import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import { GithubIcon, FacebookIcon, MailIcon } from "./ui/SocialIcons";
import { socialLinks } from "../data";

const EMAIL = "nmhuyen2706@gmail.com";

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const iconMap = { github: GithubIcon, facebook: FacebookIcon, mail: MailIcon };

  return (
    <section id="contact" className="relative section-padding overflow-hidden" aria-label="Contact">
      <span className="hash-span" />

      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(79,142,247,0.06) 0%, transparent 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(79,142,247,0.3), transparent)",
        }}
      />

      <div className="max-container relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
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
              marginBottom: 24,
            }}
          >
            — Get In Touch
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="display-lg mb-6"
            style={{ lineHeight: 1.05 }}
          >
            Let's build something <span className="text-gradient-blue">extraordinary</span>.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.75,
              color: "rgba(241,245,249,0.5)",
              marginBottom: 48,
              maxWidth: 480,
            }}
          >
            I'm always open to new opportunities, interesting projects, and creative collaborations. If you have an
            idea, let's talk.
          </motion.p>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <a
              href={`mailto:${EMAIL}`}
              className="group flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-base transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #4f8ef7, #7c3aed)",
                color: "#fff",
                boxShadow: "0 4px 32px rgba(79,142,247,0.35)",
                letterSpacing: "-0.01em",
              }}
              data-cursor="open"
            >
              START A PROJECT
              <ArrowUpRight
                size={20}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </a>
            <button
              onClick={copyEmail}
              className="flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-base transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(241,245,249,0.7)",
              }}
              data-cursor="hover"
              aria-label="Copy email address"
            >
              {copied ? <Check size={18} style={{ color: "#22d3ee" }} /> : <Copy size={18} />}
              {copied ? "Copied!" : EMAIL}
            </button>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((link) => {
              const Icon = iconMap[link.icon] || MailIcon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(241,245,249,0.6)",
                  }}
                  data-cursor="open"
                  aria-label={link.label}
                >
                  <Icon size={16} />
                  {link.label}
                </a>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
