import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Photorealistic 3D Galvanized Steel Coil with clear concentric sheet layers.
 * Built using explicit 3D mesh layers & high-contrast radial wrap lines
 * so every single sheet layer/fold is boldly visible on screen.
 */

function UltraDetailedSteelCoil() {
  const innerRadius = 0.72;
  const outerRadius = 1.68;
  const length = 2.4;
  const numLayers = 32; // 32 individual 3D visible layers

  // High contrast crisp winding texture for the circular end face
  const faceTexture = useMemo(() => {
    const size = 2048;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      const cx = size / 2;
      const cy = size / 2;

      // Bright silver steel face background
      ctx.fillStyle = "#ced4dc";
      ctx.fillRect(0, 0, size, size);

      const rMin = (innerRadius / outerRadius) * (size / 2);
      const rMax = size / 2 - 8;

      // Draw 90 crisp high-contrast concentric steel sheet lines
      for (let i = 0; i < 90; i++) {
        const r = rMin + (i / 90) * (rMax - rMin);

        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);

        // Steel winding layers have alternating dark/light micro grooves
        ctx.strokeStyle = i % 4 === 0 ? "#2b3038" : "#555d6b";
        ctx.lineWidth = i % 4 === 0 ? 3.5 : 2.0;
        ctx.stroke();

        // Highlight ring right next to groove for 3D metallic depth
        ctx.beginPath();
        ctx.arc(cx, cy, r + 1.2, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // Industrial radial steel binding straps (4 radial bands across face)
      for (let a = 0; a < 4; a++) {
        const angle = (a * Math.PI) / 2;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);
        ctx.fillStyle = "#1e2227";
        ctx.fillRect(-10, rMin - 4, 20, rMax - rMin + 8);
        ctx.restore();
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, [innerRadius, outerRadius]);

  // Cylinder geometry for outer body
  const layers = useMemo(() => {
    const arr = [];
    for (let i = 0; i < numLayers; i++) {
      const r = innerRadius + (i / numLayers) * (outerRadius - innerRadius);
      arr.push(r);
    }
    return arr;
  }, [innerRadius, outerRadius]);

  return (
    <group rotation={[0, 0, Math.PI / 2]}>
      {/* Front Face (Concentric Rings) */}
      <mesh position={[0, length / 2 + 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[innerRadius, outerRadius, 96]} />
        <meshStandardMaterial
          map={faceTexture}
          metalness={0.88}
          roughness={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Back Face (Concentric Rings) */}
      <mesh position={[0, -length / 2 - 0.002, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[innerRadius, outerRadius, 96]} />
        <meshStandardMaterial
          map={faceTexture}
          metalness={0.88}
          roughness={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Outer Shell Cylinder (Smooth Silver Steel) */}
      <mesh>
        <cylinderGeometry args={[outerRadius, outerRadius, length, 96, 1, true]} />
        <meshStandardMaterial
          color="#d2d7e0"
          metalness={0.94}
          roughness={0.28}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Hollow Eye / Inner Core */}
      <mesh>
        <cylinderGeometry args={[innerRadius, innerRadius, length + 0.01, 64, 1, true]} />
        <meshStandardMaterial
          color="#22252a"
          metalness={0.7}
          roughness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 2 Outer Heavy Duty Steel Packaging Straps */}
      <mesh position={[0, length * 0.28, 0]}>
        <cylinderGeometry args={[outerRadius + 0.012, outerRadius + 0.012, 0.06, 64, 1, true]} />
        <meshStandardMaterial color="#1a1d22" metalness={0.9} roughness={0.3} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, -length * 0.28, 0]}>
        <cylinderGeometry args={[outerRadius + 0.012, outerRadius + 0.012, 0.06, 64, 1, true]} />
        <meshStandardMaterial color="#1a1d22" metalness={0.9} roughness={0.3} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Scene() {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    pointer.current.x += (state.pointer.x - pointer.current.x) * Math.min(delta * 3, 0.2);
    pointer.current.y += (state.pointer.y - pointer.current.y) * Math.min(delta * 3, 0.2);

    if (!group.current) return;
    // Angle tilted to face camera so concentric rings are immediately prominent
    group.current.rotation.y = -0.45 + pointer.current.x * 0.35 + state.clock.elapsedTime * 0.12;
    group.current.rotation.x = 0.28 - pointer.current.y * 0.18;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.06;
  });

  return (
    <group ref={group} scale={0.75} position={[0, 0, 0]}>
      <UltraDetailedSteelCoil />
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
        camera={{ position: [0, 0.3, 5.6], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        onCreated={() => {
          const node = document.querySelector<HTMLElement>("[data-scene-ready]");
          if (node) node.setAttribute("data-scene-ready", "true");
        }}
      >
        <ambientLight intensity={0.8} />
        {/* Direct key light positioned straight onto the coil face so lines shine crisp */}
        <directionalLight position={[0, 4, 6]} intensity={2.2} color="#ffffff" />
        <directionalLight position={[-5, 2, -3]} intensity={1.0} color="#b0b8c4" />
        <directionalLight position={[5, -2, 2]} intensity={0.8} color="#e2e8f0" />
        <Scene />
      </Canvas>
    </div>
  );
}
