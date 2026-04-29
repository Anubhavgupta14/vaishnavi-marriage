'use client';

import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Heart } from 'lucide-react';
import { GALLERY_IMAGES } from '@/lib/constants';

// ─── Starfield ───────────────────────────────────────────────────────────────

function Starfield() {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const pos = new Float32Array(10000 * 3);
    for (let i = 0; i < 10000; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 400;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 400;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 400;
    }
    return pos;
  }, []);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.015;
    ref.current.rotation.x = clock.getElapsedTime() * 0.008;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        size={0.5}
        color="#ffffff"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

// ─── Fibonacci sphere positions ───────────────────────────────────────────────

function fibonacciSphere(n: number, radius: number) {
  const positions: [number, number, number][] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    positions.push([Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius]);
  }
  return positions;
}

// ─── Individual floating card ─────────────────────────────────────────────────

interface CardProps {
  position: [number, number, number];
  imageUrl: string;
  onClick: () => void;
}

function GalleryCard({ position, imageUrl, onClick }: CardProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);
  const { camera } = useThree();

  const texture = useMemo(() => {
    const t = new THREE.TextureLoader().load(imageUrl);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, [imageUrl]);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.lookAt(camera.position);
    const targetScale = hovered ? 1.18 : 1;
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onPointerEnter={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerLeave={() => { setHovered(false); document.body.style.cursor = 'default'; }}
    >
      {/* Glow border — rendered slightly behind */}
      {hovered && (
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[2.65, 3.5]} />
          <meshBasicMaterial
            color={new THREE.Color(0.19, 0.72, 0.78)}
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      )}
      {/* Photo card */}
      <mesh>
        <planeGeometry args={[2.4, 3.2]} />
        <meshBasicMaterial
          map={texture}
          side={THREE.DoubleSide}
          color={hovered ? new THREE.Color(1.25, 1.25, 1.25) : new THREE.Color(1, 1, 1)}
        />
      </mesh>
    </group>
  );
}

// ─── Scene ────────────────────────────────────────────────────────────────────

function Scene({ onSelect }: { onSelect: (img: (typeof GALLERY_IMAGES)[0]) => void }) {
  const positions = useMemo(() => fibonacciSphere(GALLERY_IMAGES.length, 10), []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <Starfield />
      {GALLERY_IMAGES.map((img, i) => (
        <GalleryCard
          key={img.id}
          position={positions[i]}
          imageUrl={img.src}
          onClick={() => onSelect(img)}
        />
      ))}
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        enableZoom
        minDistance={5}
        maxDistance={30}
        autoRotate={false}
      />
    </>
  );
}

// ─── Image tilt modal ─────────────────────────────────────────────────────────

interface ModalProps {
  image: (typeof GALLERY_IMAGES)[0];
  onClose: () => void;
}

function ImageModal({ image, onClose }: ModalProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [favourited, setFavourited] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setTilt({
      x: ((e.clientY - cy) / rect.height) * -15,
      y: ((e.clientX - cx) / rect.width) * 15,
    });
  }, []);

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-lg w-full"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 3D tilt container */}
        <div
          ref={containerRef}
          style={{ perspective: '800px' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={resetTilt}
        >
          <motion.div
            style={{
              rotateX: tilt.x,
              rotateY: tilt.y,
              transformStyle: 'preserve-3d',
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.src}
              alt={image.alt}
              className="w-full rounded-2xl"
              style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.6)' }}
            />
          </motion.div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-center gap-4 mt-5">
          <motion.a
            href={image.src}
            download={`photo-${image.id}.jpeg`}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium"
            style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)', textDecoration: 'none' }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
          >
            <Download size={16} />
            Download
          </motion.a>
          <motion.button
            onClick={() => setFavourited(!favourited)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium"
            style={{
              background: favourited ? 'rgba(122,26,46,0.6)' : 'rgba(255,255,255,0.15)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.25)',
            }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
          >
            <Heart size={16} fill={favourited ? '#fff' : 'none'} />
            {favourited ? 'Favourited' : 'Favourite'}
          </motion.button>
        </div>
      </motion.div>

      {/* Close button */}
      <button
        id="gallery-modal-close"
        className="absolute top-6 right-6 p-2 rounded-full transition-colors"
        style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}
        onClick={onClose}
        aria-label="Close"
      >
        <X size={20} />
      </button>
    </motion.div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function StellarCardGallery() {
  const [selected, setSelected] = useState<(typeof GALLERY_IMAGES)[0] | null>(null);

  return (
    <div className="relative w-full h-full" style={{ background: '#000' }}>
      {/* Three.js canvas */}
      <Canvas
        camera={{ position: [0, 0, 18], fov: 55 }}
        style={{ position: 'absolute', inset: 0 }}
        gl={{ antialias: true }}
      >
        <Scene onSelect={setSelected} />
      </Canvas>

      {/* Hint overlay */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full text-sm pointer-events-none select-none"
        style={{
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(8px)',
          color: 'rgba(255,255,255,0.7)',
          fontFamily: 'Inter, sans-serif',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        Drag to explore · Scroll to zoom · Click to view
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ImageModal image={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
