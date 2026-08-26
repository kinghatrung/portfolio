import { ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon, MailIcon } from "./ui/SocialIcons";
import { navLinks, socialLinks } from "../data";

const iconMap = { github: GithubIcon, linkedin: LinkedinIcon, mail: MailIcon };

const Footer = () => (
  <footer className="relative" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} aria-label="Site footer">
    <div className="max-container section-padding" style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", color: "#f1f5f9" }}>
            Huyen<span style={{ color: "#4f8ef7" }}>.</span>
          </span>
          <span style={{ fontSize: 12, color: "rgba(241,245,249,0.35)", letterSpacing: "0.05em" }}>
            Frontend Engineer &amp; Creative Developer
          </span>
        </div>

        {/* Nav links */}
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2" role="list">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  style={{ fontSize: 13, color: "rgba(241,245,249,0.4)", fontWeight: 500, transition: "color 0.2s" }}
                  className="hover:text-white"
                  data-cursor="hover"
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social */}
        <div className="flex items-center gap-3">
          {socialLinks.map((s) => {
            const Icon = iconMap[s.icon] || MailIcon;
            return (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="p-2 rounded-lg transition-all duration-200"
                style={{
                  color: "rgba(241,245,249,0.4)",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
                aria-label={s.label}
                data-cursor="open"
              >
                <Icon size={16} />
              </a>
            );
          })}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-8 pt-6"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <p style={{ fontSize: 12, color: "rgba(241,245,249,0.25)" }}>
          © 2026 Huyen Minh — Somewhere Between Dreams & Reality
        </p>
        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs transition-colors duration-200"
          style={{ color: "rgba(241,245,249,0.25)" }}
          data-cursor="open"
        >
          View Source <ArrowUpRight size={12} />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
