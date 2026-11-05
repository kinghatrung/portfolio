import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import content from "../../data";

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Animate progress bar
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 18 + 6;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setShow(false);
          setTimeout(() => onComplete?.(), 400);
        }, 300);
      }
      setProgress(Math.min(current, 100));
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[9990] flex flex-col items-center justify-center"
          style={{ background: "#050816" }}
          role="status"
          aria-label="Loading portfolio"
        >
          {/* Logo mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-16 flex flex-col items-center gap-6"
          >
            {/* Geometric mark */}
            <div style={{ position: "relative", width: 64, height: 64 }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  border: "2px solid rgba(79,142,247,0.5)",
                  transform: "rotate(45deg)",
                  position: "absolute",
                }}
              />
              <div
                style={{
                  width: 40,
                  height: 40,
                  border: "1px solid rgba(79,142,247,0.3)",
                  transform: "rotate(45deg)",
                  position: "absolute",
                  top: 12,
                  left: 12,
                }}
              />
              <div
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: "#4f8ef7",
                  borderRadius: "50%",
                  position: "absolute",
                  top: 28,
                  left: 28,
                }}
              />
            </div>

            {/* Text */}
            <div className="text-center">
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: "0.4em",
                  color: "rgba(241,245,249,0.4)",
                  fontWeight: 500,
                  textTransform: "uppercase",
                }}
              >
                {content.site.loadingText}
              </p>
            </div>
          </motion.div>

          {/* Progress */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="flex flex-col items-center gap-3"
            style={{ width: 240 }}
          >
            {/* Progress bar */}
            <div
              style={{
                width: "100%",
                height: 1,
                background: "rgba(255,255,255,0.08)",
                borderRadius: 1,
                overflow: "hidden",
              }}
            >
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                style={{
                  height: "100%",
                  background: "linear-gradient(90deg, #4f8ef7, #22d3ee)",
                  borderRadius: 1,
                  boxShadow: "0 0 8px rgba(79,142,247,0.6)",
                }}
              />
            </div>
            {/* Progress number */}
            <span
              style={{
                fontSize: 11,
                letterSpacing: "0.2em",
                color: "rgba(79,142,247,0.7)",
                fontWeight: 500,
              }}
            >
              {Math.round(progress).toString().padStart(2, "0")} %
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
