import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line, Environment, Lightformer } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import * as THREE from "three";
import type { Product } from "@/data/products";
import { lanes } from "@/data/network";
import { themePalette } from "@/lib/theme-palette";

function useVisible<T extends HTMLElement>(rootMargin = "100px") {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry) setVisible(entry.isIntersecting);
    }, { rootMargin });
    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin]);
  return [ref, visible] as const;
}

function SceneLights() {
  return <>
    <ambientLight intensity={0.7} color={themePalette.sage} />
    <pointLight position={[3, 3, 4]} color={themePalette.steelBlue} intensity={5} />
    <directionalLight position={[-4, 5, 3]} color={themePalette.ivory} intensity={1.8} />
    <Environment><Lightformer intensity={1.4} color={themePalette.sage} position={[0, 5, 0]} scale={[10, 10, 1]} /></Environment>
  </>;
}

const coalPositions: Array<[number, number, number, number]> = [
  [0, 0, 0, 1.55], [1.5, .3, -.5, 1], [-1.3, -.45, -.7, .9], [.3, -1.15, .2, .8], [-.65, 1, -.6, .72],
];

function EmberParticles({ count = 70 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const seed = (i * 16807) % 2147483647;
      array[i * 3] = ((seed % 100) / 100 - .5) * 7;
      array[i * 3 + 1] = ((seed % 197) / 197 - .5) * 8;
      array[i * 3 + 2] = ((seed % 73) / 73 - .5) * 4;
    }
    return array;
  }, [count]);
  useFrame((_, rawDelta) => {
    if (!points.current) return;
    const dt = Math.min(rawDelta, .05);
    const attr = points.current.geometry.attributes["position"];
    if (!attr) return;
    for (let i = 0; i < count; i++) {
      const next = attr.getY(i) + dt * (.3 + (i % 5) * .08);
      attr.setY(i, next > 4 ? -4 : next);
    }
    attr.needsUpdate = true;
  });
  return <points ref={points}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry><pointsMaterial color={themePalette.sage} size={.032} transparent opacity={.42} /></points>;
}

function CoalCluster() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ pointer, clock }, delta) => {
    if (!group.current) return;
    group.current.rotation.y += Math.min(delta, .05) * .08;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, pointer.y * .12, .03);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -pointer.x * .08, .03);
    group.current.position.y = Math.sin(clock.elapsedTime * .5) * .08;
  });
  return <group ref={group} rotation={[.15, -.4, 0]}>
    {coalPositions.map(([x,y,z,s], index) => <group key={index} position={[x,y,z]} scale={s}>
      <mesh castShadow rotation={[index*.4,index*.7,index*.2]}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial color={themePalette.ink} roughness={index % 2 ? .38 : .65} metalness={.55} flatShading />
      </mesh>
      <mesh scale={1.012} rotation={[index*.4,index*.7,index*.2]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color={themePalette.steelBlue} wireframe transparent opacity={index === 0 ? .18 : .06} />
      </mesh>
    </group>)}
    <EmberParticles />
  </group>;
}

function CanvasShell({ children, camera = [0,0,7], interactive = false }: { children: React.ReactNode; camera?: [number,number,number]; interactive?: boolean }) {
  return <Canvas dpr={[1, 1.75]} camera={{ position: camera, fov: 43 }} gl={{ antialias: true, alpha: true }} frameloop="always">
    <SceneLights />{children}
    {interactive && <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={.7} maxPolarAngle={2.4} autoRotate autoRotateSpeed={.6} />}
  </Canvas>;
}

export function HeroScene() {
  const [ref, visible] = useVisible<HTMLDivElement>();
  return <div ref={ref} className="absolute inset-0" aria-hidden>{visible && <CanvasShell camera={[0,0,8]}><fog attach="fog" args={[themePalette.ink, 8, 15]} /><CoalCluster /></CanvasShell>}</div>;
}

function ProductSample({ product }: { product: Product }) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => { if (mesh.current) mesh.current.rotation.y += Math.min(delta,.05) * .18; });
  const material = {
    matte: { color: themePalette.ink, roughness: .95, metalness: .05 }, glossy: { color: themePalette.deepTeal, roughness: .18, metalness: .75 },
    porous: { color: themePalette.ink, roughness: 1, metalness: .02 }, fibrous: { color: themePalette.deepTeal, roughness: .8, metalness: .08 },
  }[product.material];
  return <group>
    <mesh ref={mesh} castShadow scale={1.65} rotation={[.2,.5,.1]}>
      {product.material === "fibrous" ? <cylinderGeometry args={[.85,1.05,1.8,9,4]} /> : <icosahedronGeometry args={[1, product.material === "porous" ? 3 : 2]} />}
      <meshStandardMaterial {...material} flatShading={product.material !== "glossy"} />
    </mesh>
    {product.material === "porous" && Array.from({length:10},(_,i)=><mesh key={i} position={[Math.sin(i*2.1)*1.25,Math.cos(i*1.3)*.9,Math.sin(i)*.7]} scale={.08+(i%3)*.03}><sphereGeometry args={[1,8,8]} /><meshBasicMaterial color={themePalette.ink} /></mesh>)}
  </group>;
}

export function ProductScene({ product }: { product: Product }) {
  const [ref, visible] = useVisible<HTMLDivElement>();
  return <div ref={ref} className="h-full min-h-80 w-full cursor-grab active:cursor-grabbing" aria-label={`Interactive 3D sample of ${product.name}`}>
    {visible ? <CanvasShell interactive><ProductSample product={product} /></CanvasShell> : <div className="h-full animate-pulse bg-muted" />}
  </div>;
}

function DottedGlobe({ activeLane, onLane }: { activeLane: number; onLane: (i:number)=>void }) {
  const globe = useRef<THREE.Group>(null);
  const dots = useMemo(() => Array.from({length:220},(_,i) => {
    const phi = Math.acos(1 - 2 * (i + .5) / 220); const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    return [2*Math.sin(phi)*Math.cos(theta),2*Math.cos(phi),2*Math.sin(phi)*Math.sin(theta)] as [number,number,number];
  }), []);
  useFrame((_,delta)=>{ if(globe.current) globe.current.rotation.y += Math.min(delta,.05)*.05; });
  return <group ref={globe}>
    <mesh><sphereGeometry args={[1.94,32,32]} /><meshStandardMaterial color={themePalette.ink} transparent opacity={.68} roughness={.6} metalness={.3} /></mesh>
    {dots.map((p,i)=><mesh key={i} position={p} scale={.025}><sphereGeometry args={[1,5,5]} /><meshBasicMaterial color={i%7===0 ? themePalette.sage : themePalette.steelBlue} /></mesh>)}
    {lanes.map((lane,i)=>{
      const starts: Array<[number, number, number]> = [[-1.7,.6,.8],[-1.4,-.7,1.1],[1.3,-1.1,.8],[.6,1.65,.6]];
      const start = starts[i];
      if (!start) return null;
      const a = new THREE.Vector3(...start);
      const b = new THREE.Vector3(.35,-.2,1.95); const mid = a.clone().add(b).multiplyScalar(.5).normalize().multiplyScalar(3);
      const curve = new THREE.QuadraticBezierCurve3(a,mid,b);
       return <Line key={lane.country} points={curve.getPoints(32)} color={i===activeLane ? themePalette.ivory : themePalette.sage} lineWidth={i===activeLane ? 3 : 1.3} onClick={(event)=>{event.stopPropagation();onLane(i)}} />;
    })}
  </group>;
}

export function GlobeScene({ activeLane, onLane }: { activeLane: number; onLane:(i:number)=>void }) {
  const [ref, visible] = useVisible<HTMLDivElement>();
  return <div ref={ref} className="h-full min-h-96 cursor-grab active:cursor-grabbing" aria-label="Interactive global coal supply globe">
    {visible && <CanvasShell camera={[0,0,7]} interactive><DottedGlobe activeLane={activeLane} onLane={onLane} /></CanvasShell>}
  </div>;
}
