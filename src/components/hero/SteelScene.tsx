import { useMemo, useRef } from "react";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

/**
 * Procedural 3D steel scene: a metallic steel coil built from a helical
 * ribbon extrusion, plus steel pipes and plates. Simulation-free — the
 * scene only draws, motion is a slow rotation with pointer parallax.
 */

const STEEL_COLOR = "#c8cdd6";
const STEEL_DARK = "#5a6270";
const GOLD_COLOR = "#b9964a";

class HelixCurve extends THREE.Curve<THREE.Vector3> {
  constructor(
    private radius: number,
    private height: number,
    private turns: number,
  ) {
    super();
  }
  getPoint(t: number, optionalTarget = new THREE.Vector3()) {
    const angle = t * this.turns * Math.PI * 2;
    return optionalTarget.set(
      Math.cos(angle) * this.radius,
      (t - 0.5) * this.height,
      Math.sin(angle) * this.radius,
    );
  }
}

function SteelCoil(props: ThreeElements["group"]) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const w = 0.42; // strip width
    const th = 0.16; // strip thickness
    const r = th * 0.42;
    shape.moveTo(-w / 2 + r, -th / 2);
    shape.lineTo(w / 2 - r, -th / 2);
    shape.quadraticCurveTo(w / 2, -th / 2, w / 2, -th / 2 + r);
    shape.lineTo(w / 2, th / 2 - r);
    shape.quadraticCurveTo(w / 2, th / 2, w / 2 - r, th / 2);
    shape.lineTo(-w / 2 + r, th / 2);
    shape.quadraticCurveTo(-w / 2, th / 2, -w / 2, th / 2 - r);
    shape.lineTo(-w / 2, -th / 2 + r);
    shape.quadraticCurveTo(-w / 2, -th / 2, -w / 2 + r, -th / 2);

    const path = new HelixCurve(1.55, 2.4, 4.5);
    const geo = new THREE.ExtrudeGeometry(shape, {
      extrudePath: path,
      steps: 260,
      bevelEnabled: false,
    });
    geo.rotateX(Math.PI / 2); // coil axis horizontal
    return geo;
  }, []);

  return (
    <mesh geometry={geometry} castShadow receiveShadow {...props}>
      <meshStandardMaterial
        color={STEEL_COLOR}
        metalness={1}
        roughness={0.28}
        envMapIntensity={1.2}
      />
    </mesh>
  );
}

function SteelPipe({
  position,
  length,
  radius,
}: {
  position: [number, number, number];
  length: number;
  radius: number;
}) {
  return (
    <mesh position={position} rotation={[0, 0, Math.PI / 2.6]}>
      <cylinderGeometry args={[radius, radius, length, 32, 1, true]} />
      <meshStandardMaterial
        color={STEEL_DARK}
        metalness={1}
        roughness={0.35}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function SteelPlate({
  position,
  rotation,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
}) {
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={[2.6, 0.12, 1.7]} />
      <meshStandardMaterial
        color={GOLD_COLOR}
        metalness={1}
        roughness={0.3}
      />
    </mesh>
  );
}

function Scene() {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    pointer.current.x += (state.pointer.x - pointer.current.x) * Math.min(delta * 3, 0.2);
    pointer.current.y += (state.pointer.y - pointer.current.y) * Math.min(delta * 3, 0.2);
    if (!group.current) return;
    group.current.rotation.y = 0.5 + pointer.current.x * 0.35 + state.clock.elapsedTime * 0.08;
    group.current.rotation.x = 0.12 - pointer.current.y * 0.15;
  });

  return (
    <group ref={group} position={[0, -0.1, 0]}>
      <SteelCoil />
      <SteelPipe position={[-2.6, -1.4, -1.2]} length={3.4} radius={0.22} />
      <SteelPipe position={[-2.2, -1.75, -1.6]} length={3.2} radius={0.16} />
      <SteelPipe position={[2.4, -1.5, -1.0]} length={3.0} radius={0.26} />
      <SteelPlate position={[2.5, 1.3, -1.6]} rotation={[0.3, -0.5, 0.12]} />
      <SteelPlate position={[-2.7, 1.5, -1.9]} rotation={[-0.2, 0.6, -0.1]} />
    </group>
  );
}

export default function SteelScene() {
  return (
    <div
      className="h-full w-full"
      data-scene-ready="pending"
      ref={(node) => {
        // Flip to ready once the canvas has produced its first frame.
        if (!node) return;
        requestAnimationFrame(() => node.setAttribute("data-scene-ready", "true"));
      }}
    >
      <Canvas
        camera={{ position: [0, 0.4, 7], fov: 42 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true }}
        onCreated={() => {
          const node = document.querySelector<HTMLElement>("[data-scene-ready]");
          if (node) node.setAttribute("data-scene-ready", "true");
        }}
      >
        <ambientLight intensity={0.25} />
        <directionalLight position={[4, 6, 5]} intensity={1.4} color="#ffffff" />
        <directionalLight position={[-6, 2, -4]} intensity={0.6} color={GOLD_COLOR} />
        <Scene />
        <Environment resolution={128}>
          <Lightformer intensity={3} position={[0, 5, 0]} scale={[10, 10, 1]} />
          <Lightformer intensity={1.4} color="#9db6d8" position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[20, 1, 1]} />
          <Lightformer intensity={1.2} color={GOLD_COLOR} position={[5, -1, 1]} rotation-y={-Math.PI / 2} scale={[16, 1, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}
