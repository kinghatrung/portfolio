import { useEffect, useRef, useState } from "react";

// Lets a <Canvas> stop rendering while it is scrolled out of view, so off-screen 3D doesn't hold the GPU.
export function useOnScreen() {
  const ref = useRef(null);
  const [onScreen, setOnScreen] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, onScreen];
}
