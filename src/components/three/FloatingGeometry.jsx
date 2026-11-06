import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useOnScreen } from "./useOnScreen";

const FloatingShape = () => {
  const ref = useRef(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });
  return (
    <Float speed={2} floatIntensity={1} rotationIntensity={0.4}>
      <mesh ref={ref}>
        <torusKnotGeometry args={[0.6, 0.18, 100, 16]} />
        <MeshDistortMaterial
          color="#7c3aed"
          metalness={0.3}
          roughness={0.1}
          distort={0.15}
          speed={3}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  );
};

const FloatingGeometry = () => {
  const [wrapperRef, onScreen] = useOnScreen();

  return (
    <div ref={wrapperRef} style={{ width: "100%", height: "100%" }}>
      <Canvas
        frameloop={onScreen ? "always" : "never"}
        resize={{ offsetSize: true }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[3, 3, 3]} intensity={1.5} color="#7c3aed" />
          <pointLight position={[-3, -2, 2]} intensity={0.5} color="#4f8ef7" />
          <FloatingShape />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default FloatingGeometry;
