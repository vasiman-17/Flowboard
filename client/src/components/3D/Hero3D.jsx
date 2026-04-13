import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Sphere, Box, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';

const Hero3D = () => {
  return (
    <Canvas
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '12px',
      }}
      camera={{ position: [0, 0, 6], fov: 35 }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="cyan" />

      {/* Central sphere with glow */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1.5, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#6366f1"
            emissive="#6366f1"
            emissiveIntensity={0.4}
            metalness={0.8}
            roughness={0.2}
          />
        </Sphere>
      </Float>

      {/* Rotating boxes around sphere */}
      <RotatingBoxes />

      {/* Orbit controls for subtle interaction */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={2}
        rotateSpeed={0.1}
      />
    </Canvas>
  );
};

const RotatingBoxes = () => {
  const groupRef = useRef();

  useEffect(() => {
    const animate = () => {
      if (groupRef.current) {
        groupRef.current.rotation.x += 0.001;
        groupRef.current.rotation.y += 0.002;
      }
    };

    const interval = setInterval(animate, 50);
    return () => clearInterval(interval);
  }, []);

  const boxes = [
    { pos: [3, 0, 0], color: '#22d3ee' },
    { pos: [-3, 0, 0], color: '#f59e0b' },
    { pos: [0, 3, 0], color: '#10b981' },
    { pos: [0, -3, 0], color: '#f43f5e' },
  ];

  return (
    <group ref={groupRef}>
      {boxes.map((box, i) => (
        <Float key={i} speed={2 + i * 0.5} rotationIntensity={0.5} floatIntensity={1}>
          <Box args={[0.8, 0.8, 0.8]} position={box.pos}>
            <meshStandardMaterial
              color={box.color}
              emissive={box.color}
              emissiveIntensity={0.3}
              metalness={0.7}
              roughness={0.3}
            />
          </Box>
        </Float>
      ))}
    </group>
  );
};

export default Hero3D;
