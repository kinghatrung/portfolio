import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [cursorState, setCursorState] = useState("default"); // default | hover | view | open
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const raf = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      if (!visible) setVisible(true);
      if (!raf.current) raf.current = requestAnimationFrame(animateRing);
    };

    const onEnter = (e) => {
      const target = e.target;
      if (target.closest('[data-cursor="view"]')) {
        setCursorState("view");
      } else if (target.closest('[data-cursor="open"]')) {
        setCursorState("open");
      } else if (target.closest("a") || target.closest("button") || target.closest('[data-cursor="hover"]')) {
        setCursorState("hover");
      }
    };

    const onLeave = () => setCursorState("default");

    const animateRing = () => {
      const lerp = 0.1;
      const dx = pos.current.x - ringPos.current.x;
      const dy = pos.current.y - ringPos.current.y;
      ringPos.current.x += dx * lerp;
      ringPos.current.y += dy * lerp;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      }
      // Stop once the ring has caught up; onMove restarts it. A still mouse no longer renders every frame.
      raf.current = Math.abs(dx) + Math.abs(dy) > 0.1 ? requestAnimationFrame(animateRing) : null;
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(raf.current);
      raf.current = null; // the effect re-runs when `visible` changes; a stale id would block the restart in onMove
    };
  }, [visible]);

  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) return null;

  const isHover = cursorState === "hover";
  const isView = cursorState === "view";
  const isOpen = cursorState === "open";
  const isExpanded = isHover || isView || isOpen;
  const label = isView ? "VIEW" : isOpen ? "OPEN" : "";

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: isExpanded ? 6 : 8,
          height: isExpanded ? 6 : 8,
          borderRadius: "50%",
          backgroundColor: "#4f8ef7",
          marginLeft: isExpanded ? -3 : -4,
          marginTop: isExpanded ? -3 : -4,
          opacity: visible ? 1 : 0,
          transition: "width 0.2s, height 0.2s, margin 0.2s, opacity 0.3s",
          willChange: "transform",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center"
        style={{
          width: isExpanded ? 64 : 36,
          height: isExpanded ? 64 : 36,
          borderRadius: "50%",
          border: `1.5px solid ${isExpanded ? "rgba(79,142,247,0.8)" : "rgba(79,142,247,0.5)"}`,
          backgroundColor: isExpanded ? "rgba(79,142,247,0.08)" : "transparent",
          marginLeft: isExpanded ? -32 : -18,
          marginTop: isExpanded ? -32 : -18,
          opacity: visible ? 1 : 0,
          transition:
            "width 0.25s cubic-bezier(0.16,1,0.3,1), height 0.25s cubic-bezier(0.16,1,0.3,1), margin 0.25s cubic-bezier(0.16,1,0.3,1), opacity 0.3s",
          willChange: "transform",
          backdropFilter: isExpanded ? "blur(4px)" : "none",
        }}
      >
        {label && (
          <span
            style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: "#4f8ef7",
              userSelect: "none",
            }}
          >
            {label}
          </span>
        )}
      </div>
    </>
  );
};

export default CustomCursor;
