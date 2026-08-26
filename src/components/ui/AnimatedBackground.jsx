import { useEffect, useRef } from "react";

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const glowRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const PARTICLE_COUNT = isMobile ? 40 : 100;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Particles
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.2 + 0.3,
      speed: Math.random() * 0.3 + 0.05,
      opacity: Math.random() * 0.5 + 0.1,
      drift: (Math.random() - 0.5) * 0.2,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Subtle radial gradient center glow
      const grd = ctx.createRadialGradient(
        canvas.width * 0.5,
        canvas.height * 0.3,
        0,
        canvas.width * 0.5,
        canvas.height * 0.3,
        canvas.width * 0.6,
      );
      grd.addColorStop(0, "rgba(79, 142, 247, 0.04)");
      grd.addColorStop(0.5, "rgba(124, 58, 237, 0.02)");
      grd.addColorStop(1, "transparent");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Particles
      particles.forEach((p) => {
        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < -5) {
          p.y = canvas.height + 5;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -5 || p.x > canvas.width + 5) p.drift *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148, 176, 255, ${p.opacity})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    draw();

    // Mouse-following glow (CSS based, not canvas for perf)
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(79, 142, 247, 0.06), transparent 60%)`;
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      {/* Base gradient layers */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 10%, rgba(79, 142, 247, 0.06) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 80%, rgba(124, 58, 237, 0.06) 0%, transparent 60%),
            #050816
          `,
        }}
      />
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 1 }}
        aria-hidden="true"
      />
      {/* Mouse glow layer */}
      <div
        ref={glowRef}
        className="fixed inset-0 pointer-events-none z-0 transition-[background] duration-300"
        aria-hidden="true"
      />
      {/* Noise overlay */}
      <div className="noise-overlay" aria-hidden="true" />
    </>
  );
};

export default AnimatedBackground;
