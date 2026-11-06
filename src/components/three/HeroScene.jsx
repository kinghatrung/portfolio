import { Suspense, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { MeshDistortMaterial, Environment, Float } from "@react-three/drei";
import { EquirectangularReflectionMapping, SRGBColorSpace, TextureLoader } from "three";
import { useOnScreen } from "./useOnScreen";

// public/env/city.jpg is drei's "city" HDR baked to a 50 KB JPG. The preset downloaded 1.5 MB from a
// third-party CDN on every visit; clamped highlights are the only loss and the glass hides them.
class EquirectLoader extends TextureLoader {
  load(url, onLoad, onProgress, onError) {
    const done = (texture) => {
      texture.mapping = EquirectangularReflectionMapping;
      texture.colorSpace = SRGBColorSpace;
      onLoad?.(texture);
    };
    return super.load(url, done, onProgress, onError);
  }
}

const CityEnvironment = () => <Environment map={useLoader(EquirectLoader, "/env/city.jpg")} />;

const InteractiveGeometry = ({ mouse }) => {
  const meshRef = useRef(null);
  const outerRef = useRef(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    // Slow base rotation
    meshRef.current.rotation.y = t * 0.15 + mouse.current.x * 0.5;
    meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.2 + mouse.current.y * 0.3;

    // Outer wireframe counter-rotation
    if (outerRef.current) {
      outerRef.current.rotation.y = -t * 0.08;
      outerRef.current.rotation.x = t * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group>
        {/* Main glassy icosahedron */}
        <mesh ref={meshRef} castShadow>
          <icosahedronGeometry args={[1.4, 1]} />
          <MeshDistortMaterial
            color="#4f8ef7"
            metalness={0.1}
            roughness={0.05}
            distort={0.25}
            speed={2}
            transparent
            opacity={0.85}
            envMapIntensity={1.5}
          />
        </mesh>

        {/* Outer wireframe */}
        <mesh ref={outerRef}>
          <icosahedronGeometry args={[1.9, 1]} />
          <meshBasicMaterial color="#4f8ef7" wireframe transparent opacity={0.08} />
        </mesh>

        {/* Inner glow core */}
        <mesh>
          <sphereGeometry args={[0.7, 16, 16]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.12} />
        </mesh>
      </group>
    </Float>
  );
};

const HeroScene = ({ mouse }) => {
  const [wrapperRef, onScreen] = useOnScreen();

  return (
    <div ref={wrapperRef} style={{ width: "100%", height: "100%" }}>
      <Canvas
        frameloop={onScreen ? "always" : "never"}
        // Measure the layout size: the parent's entrance scale animation made the size depend on timing.
        resize={{ offsetSize: true }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <CityEnvironment />
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={1} color="#4f8ef7" />
          <pointLight position={[-5, -2, -3]} intensity={0.5} color="#7c3aed" />
          <InteractiveGeometry mouse={mouse} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroScene;
