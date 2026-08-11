import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Floating Cyberpunk 3D Geometry Object
const FloatingCyberShape: React.FC<{
  position: [number, number, number];
  scale?: number;
  color?: string;
  wireframeColor?: string;
  rotationSpeed?: number;
}> = ({
  position,
  scale = 1,
  color = '#7CFF00',
  wireframeColor = '#00F0FF',
  rotationSpeed = 0.5,
}) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const wireframeRef = useRef<THREE.LineSegments>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3 * rotationSpeed;
      meshRef.current.rotation.y += delta * 0.5 * rotationSpeed;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.x += delta * 0.3 * rotationSpeed;
      wireframeRef.current.rotation.y += delta * 0.5 * rotationSpeed;
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* Translucent Glass Body Mesh */}
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={0.25}
          roughness={0.1}
          metalness={0.8}
          transmission={0.6}
          thickness={0.5}
        />
      </mesh>

      {/* Glowing Neon Wireframe */}
      <lineSegments ref={wireframeRef}>
        <wireframeGeometry args={[new THREE.OctahedronGeometry(1, 0)]} />
        <lineBasicMaterial color={wireframeColor} linewidth={1.5} transparent opacity={0.6} />
      </lineSegments>
    </group>
  );
};

// Cyber Particle Starfield & Glowing Node Grid Background
const ParticleStarfield: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const count = 500;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const color1 = new THREE.Color('#7CFF00');
    const color2 = new THREE.Color('#00F0FF');

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;

      const mixed = Math.random() > 0.5 ? color1 : color2;
      col[i * 3] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }

    return [pos, col];
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Interactive Scene Container with Mouse Tilt Interactivity
const SceneContent: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      // Smoothly tilt 3D scene based on mouse coordinates (state.pointer.x, state.pointer.y)
      const targetX = state.pointer.y * 0.25;
      const targetY = state.pointer.x * 0.25;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} color="#00F0FF" />
      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#7CFF00" />

      {/* Floating 3D Cyber Shapes */}
      <FloatingCyberShape position={[-6, 3, -5]} scale={1.8} color="#7CFF00" wireframeColor="#00F0FF" rotationSpeed={0.4} />
      <FloatingCyberShape position={[7, -2, -4]} scale={1.5} color="#00F0FF" wireframeColor="#7CFF00" rotationSpeed={0.6} />
      <FloatingCyberShape position={[-4, -4, -6]} scale={1.2} color="#BF5AF2" wireframeColor="#00F0FF" rotationSpeed={0.5} />
      <FloatingCyberShape position={[5, 4, -7]} scale={2.2} color="#7CFF00" wireframeColor="#FF9F0A" rotationSpeed={0.3} />

      {/* Particle Starfield */}
      <ParticleStarfield />
    </group>
  );
};

export const BackgroundCanvas: React.FC = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
      }}
      className="overflow-hidden"
    >
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
        gl={{ alpha: true, antialias: true }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
};
