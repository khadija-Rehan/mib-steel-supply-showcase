import { useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import giCoilImg from "@/assets/gi-coils.jpg";

/**
 * 3D Galvanized Iron (GI) Steel Coil Model.
 * Represents real GI coil with galvanized spangle metallic texture,
 * hollow cylindrical core, wound steel layers, and strapped binding.
 */

function GICoilModel() {
  const texture = useLoader(THREE.TextureLoader, giCoilImg);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 1);

  // GI Coil Outer Shell & Thickness
  // Outer radius: 1.6, Inner core radius: 0.75, Width/Height: 2.2
  const outerRadius = 1.6;
  const innerRadius = 0.75;
  const coilWidth = 2.4;

  const coilShape = useMemo(() => {
    const shape = new THREE.Shape();
    // Outer circle
    shape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false);
    // Inner hole (eye of the coil)
    const holePath = new THREE.Path();
    holePath.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
    shape.holes.push(holePath);
    return shape;
  }, []);

  const extrudeSettings = useMemo(
    () => ({
      depth: coilWidth,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.04,
      curveSegments: 64,
    }),
    [],
  );

  return (
    <group position={[0, 0, -coilWidth / 2]}>
      {/* Main GI Coil Body */}
      <mesh castShadow receiveShadow>
        <extrudeGeometry args={[coilShape, extrudeSettings]} />
        <meshStandardMaterial
          map={texture}
          metalness={0.92}
          roughness={0.32}
          bumpMap={texture}
          bumpScale={0.03}
          color="#d2d7df"
          envMapIntensity={1.4}
        />
      </mesh>

      {/* Internal Core Sleeve */}
      <mesh position={[0, 0, coilWidth / 2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry
          args={[innerRadius, innerRadius, coilWidth + 0.02, 64, 1, true]}
        />
        <meshStandardMaterial
          color="#42474f"
          metalness={0.8}
          roughness={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Industrial Packaging Straps / Bands */}
      <mesh position={[0, 0, coilWidth * 0.22]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry
          args={[outerRadius + 0.015, outerRadius + 0.015, 0.06, 64, 1, true]}
        />
        <meshStandardMaterial
          color="#202327"
          metalness={0.9}
          roughness={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh position={[0, 0, coilWidth * 0.78]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry
          args={[outerRadius + 0.015, outerRadius + 0.015, 0.06, 64, 1, true]}
        />
        <meshStandardMaterial
          color="#202327"
          metalness={0.9}
          roughness={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function Scene() {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    pointer.current.x +=
      (state.pointer.x - pointer.current.x) * Math.min(delta * 3, 0.2);
    pointer.current.y +=
      (state.pointer.y - pointer.current.y) * Math.min(delta * 3, 0.2);

    if (!group.current) return;
    // Smooth 3D rotation and mouse parallax
    group.current.rotation.y =
      0.65 + pointer.current.x * 0.4 + state.clock.elapsedTime * 0.12;
    group.current.rotation.x = 0.25 - pointer.current.y * 0.2;
    // Subtle breathing float
    group.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.08;
  });

  return (
    <group ref={group} position={[0, 0, 0]} rotation={[0.2, 0.65, 0]}>
      <GICoilModel />
    </group>
  );
}

export default function SteelScene() {
  return (
    <div
      className="h-full w-full"
      data-scene-ready="pending"
      ref={(node) => {
        if (!node) return;
        requestAnimationFrame(() =>
          node.setAttribute("data-scene-ready", "true"),
        );
      }}
    >
      <Canvas
        camera={{ position: [0, 0.2, 5.8], fov: 42 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true }}
        onCreated={() => {
          const node = document.querySelector<HTMLElement>(
            "[data-scene-ready]",
          );
          if (node) node.setAttribute("data-scene-ready", "true");
        }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 6, 5]} intensity={1.6} color="#ffffff" />
        <directionalLight
          position={[-6, 2, -4]}
          intensity={0.8}
          color="#b9964a"
        />
        <Scene />
        <Environment resolution={128}>
          <Lightformer
            intensity={3.5}
            position={[0, 5, 0]}
            scale={[10, 10, 1]}
          />
          <Lightformer
            intensity={1.8}
            color="#9db6d8"
            position={[-5, 1, -1]}
            rotation-y={Math.PI / 2}
            scale={[20, 1, 1]}
          />
          <Lightformer
            intensity={1.5}
            color="#b9964a"
            position={[5, -1, 1]}
            rotation-y={-Math.PI / 2}
            scale={[16, 1, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}
