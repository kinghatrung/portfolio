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

    // 30 fps is plenty for a slow drift. Waiting with a timer (not skipping rAF calls) matters: any pending
    // rAF makes the browser run a full frame, so this halves the page's idle rendering work.
    // Movement is scaled by elapsed time, so the speed is the same on 60 Hz and 120 Hz screens.
    const FRAME_MS = 1000 / 30;
    let raf;
    let timer;
    let last = 0;
    const draw = (now) => {
      timer = setTimeout(() => (raf = requestAnimationFrame(draw)), FRAME_MS);
      const step = last ? Math.min((now - last) / (1000 / 60), 4) : 1;
      last = now;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Particles
      particles.forEach((p) => {
        p.y -= p.speed * step;
        p.x += p.drift * step;
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
    };

    raf = requestAnimationFrame(draw);

    // Mouse-following glow: moving a fixed-size layer is compositor-only, while rewriting a
    // full-screen gradient repainted the whole viewport on every mouse move.
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (glowRef.current) {
        glowRef.current.style.opacity = "1";
        glowRef.current.style.transform = `translate(${e.clientX - 600}px, ${e.clientY - 600}px)`;
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
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
          // The center glow used to be repainted on the particle canvas every frame, at full screen size.
          background: `
            radial-gradient(circle at 50% 30%, rgba(79, 142, 247, 0.04) 0, rgba(124, 58, 237, 0.02) 30vw, transparent 60vw),
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
        className="fixed top-0 left-0 pointer-events-none z-0"
        style={{
          width: 1200,
          height: 1200,
          opacity: 0,
          willChange: "transform",
          background: "radial-gradient(600px circle at center, rgba(79, 142, 247, 0.06), transparent 60%)",
        }}
        aria-hidden="true"
      />
      {/* Noise overlay */}
      <div className="noise-overlay" aria-hidden="true" />
    </>
  );
};

export default AnimatedBackground;
