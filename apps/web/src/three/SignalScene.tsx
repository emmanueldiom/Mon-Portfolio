import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import * as THREE from 'three';

const COLS = 170;
const ROWS = 72;
const WIDTH = 18;
const DEPTH = 9;

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uAspect;
  uniform float uFlatten;
  uniform float uPixelRatio;
  attribute float aSeed;
  varying float vMix;
  varying float vAlpha;

  void main() {
    vec3 p = position;
    float amp = 1.0 - uFlatten * 0.9;
    float wave = sin(p.x * 0.55 + uTime * 0.55 + p.z * 0.35) * 0.45
               + sin(p.x * 1.30 - uTime * 0.38 + p.z * 0.90) * 0.18
               + sin(p.z * 1.10 + uTime * 0.30) * 0.20;
    p.y += wave * amp;

    // Onde autour du curseur, calculée dans l'espace de l'écran.
    vec4 clip = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    vec2 d = clip.xy / clip.w - uPointer;
    d.x *= uAspect;
    float dist = length(d);
    float influence = smoothstep(0.42, 0.0, dist);
    p.y += (sin(dist * 22.0 - uTime * 4.2) * 0.22 + 0.28) * influence * amp;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (1.6 + aSeed * 1.6 + influence * 2.0) * uPixelRatio * (7.0 / -mv.z);

    vMix = clamp(position.x / ${WIDTH.toFixed(1)} + 0.5, 0.0, 1.0);
    vAlpha = (0.18 + 0.82 * smoothstep(-${(DEPTH / 2).toFixed(1)}, ${(DEPTH / 2).toFixed(1)}, position.z)) * (0.75 + influence * 0.6);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vMix;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.08, d) * vAlpha;
    gl_FragColor = vec4(mix(uColorA, uColorB, vMix), a);
  }
`;

interface FieldProps {
  pointerRef: RefObject<THREE.Vector2>;
  flattenRef: RefObject<number>;
}

function Field({ pointerRef, flattenRef }: FieldProps) {
  const geometry = useMemo(() => {
    const positions = new Float32Array(COLS * ROWS * 3);
    const seeds = new Float32Array(COLS * ROWS);
    let n = 0;
    for (let j = 0; j < ROWS; j++) {
      for (let i = 0; i < COLS; i++) {
        positions[n * 3] = (i / (COLS - 1) - 0.5) * WIDTH;
        positions[n * 3 + 1] = 0;
        positions[n * 3 + 2] = (j / (ROWS - 1) - 0.5) * DEPTH;
        seeds[n] = Math.random();
        n++;
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    g.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
    return g;
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(9, 9) },
      uAspect: { value: 1 },
      uFlatten: { value: 0 },
      uPixelRatio: { value: 1 },
      uColorA: { value: new THREE.Color('#3ee3f0') },
      uColorB: { value: new THREE.Color('#a48cff') },
    }),
    [],
  );

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state, delta) => {
    uniforms.uTime.value += Math.min(delta, 0.05);
    uniforms.uAspect.value = state.size.width / state.size.height;
    uniforms.uPixelRatio.value = state.viewport.dpr;
    uniforms.uPointer.value.lerp(pointerRef.current ?? uniforms.uPointer.value, 0.08);
    uniforms.uFlatten.value += ((flattenRef.current ?? 0) - uniforms.uFlatten.value) * 0.1;
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** Champ de points interactif du Hero. Chargé à la demande, ordinateur uniquement. */
export default function SignalScene({ onReady }: { onReady?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef(new THREE.Vector2(9, 9));
  const flattenRef = useRef(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointerRef.current.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -(((event.clientY - rect.top) / rect.height) * 2 - 1),
      );
    };
    const onPointerLeave = () => pointerRef.current.set(9, 9);
    const onScroll = () => {
      flattenRef.current = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.9)));
    };

    // Pas de rendu quand le Hero n'est plus à l'écran.
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 });
    observer.observe(container);

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      observer.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full" aria-hidden="true">
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        dpr={[1, 1.75]}
        camera={{ position: [0, 3.1, 7.6], fov: 42, near: 0.1, far: 50 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ camera }) => {
          camera.lookAt(0.6, -0.4, 0);
          onReady?.();
        }}
      >
        <Field pointerRef={pointerRef} flattenRef={flattenRef} />
      </Canvas>
    </div>
  );
}
