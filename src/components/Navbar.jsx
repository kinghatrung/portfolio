import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "../data";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = (id, title) => {
    setActive(title);
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4"
        role="navigation"
        aria-label="Main navigation"
      >
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between w-full max-w-5xl px-6 py-3 rounded-2xl"
          style={{
            background: scrolled ? "rgba(5, 8, 22, 0.85)" : "rgba(5, 8, 22, 0.5)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.4)" : "none",
            transition: "background 0.4s ease, box-shadow 0.4s ease",
          }}
        >
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActive("");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 group"
            aria-label="Return to top"
          >
            <div
              style={{
                width: 32,
                height: 32,
                border: "1.5px solid rgba(79,142,247,0.6)",
                transform: "rotate(45deg)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "border-color 0.3s",
              }}
              className="group-hover:border-blue-400"
            >
              <div style={{ width: 8, height: 8, backgroundColor: "#4f8ef7", borderRadius: "50%" }} />
            </div>
            <span
              style={{
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "#f1f5f9",
              }}
            >
              Huyen<span style={{ color: "#4f8ef7" }}>.</span>
            </span>
          </a>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleNavClick(link.id, link.title)}
                  className="relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                  style={{
                    color: active === link.title ? "#f1f5f9" : "rgba(241,245,249,0.5)",
                    background: active === link.title ? "rgba(79,142,247,0.1)" : "transparent",
                  }}
                  aria-current={active === link.title ? "page" : undefined}
                >
                  {link.title}
                  {active === link.title && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: "rgba(79,142,247,0.08)", border: "1px solid rgba(79,142,247,0.2)" }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a
            href="mailto:nmhuyen2706@gmail.com"
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
            style={{
              background: "rgba(79,142,247,0.1)",
              border: "1px solid rgba(79,142,247,0.3)",
              color: "#4f8ef7",
            }}
            data-cursor="open"
          >
            Hire Me
          </a>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            style={{ color: "#f1f5f9", background: "rgba(255,255,255,0.05)" }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </motion.div>
      </nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: "rgba(5,8,22,0.97)", backdropFilter: "blur(20px)" }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex flex-col items-center justify-center h-full gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.07, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <button
                    onClick={() => handleNavClick(link.id, link.title)}
                    className="block text-center px-8 py-3 rounded-xl transition-all duration-200"
                    style={{
                      fontSize: "clamp(1.8rem, 6vw, 3rem)",
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      color: active === link.title ? "#4f8ef7" : "rgba(241,245,249,0.7)",
                    }}
                  >
                    {link.title}
                  </button>
                </motion.div>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: navLinks.length * 0.07 + 0.1, duration: 0.3 }}
                href="mailto:nmhuyen2706@gmail.com"
                className="mt-8 px-8 py-3 rounded-xl font-semibold text-lg"
                style={{
                  background: "rgba(79,142,247,0.15)",
                  border: "1px solid rgba(79,142,247,0.3)",
                  color: "#4f8ef7",
                }}
                onClick={() => setMobileOpen(false)}
              >
                Hire Me
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
