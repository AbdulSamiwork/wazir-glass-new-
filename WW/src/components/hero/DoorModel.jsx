import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { FrameBar, GlassPane } from './ThreePrimitives';

export default function DoorModel({ mouse, isHovered }) {
  const groupRef = useRef();
  const doorHingeRef = useRef();
  const textRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        (mouse.x * 0.2),
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        (mouse.y * -0.15),
        0.05
      );
    }

    if (doorHingeRef.current) {
      const targetRotation = isHovered ? -Math.PI / 2.2 : 0;
      doorHingeRef.current.rotation.y = THREE.MathUtils.lerp(
        doorHingeRef.current.rotation.y,
        targetRotation,
        0.08
      );
    }

    if (textRef.current) {
      textRef.current.position.y = Math.sin(time * 2.5) * 0.04;
      const targetScale = isHovered ? 1.08 : 1;
      textRef.current.scale.setScalar(
        THREE.MathUtils.lerp(textRef.current.scale.x, targetScale, 0.08)
      );
    }
  });

  const materials = useMemo(() => ({
    wall: {
      color: '#f8fafc',
      roughness: 1,
      metalness: 0,
    },
    frame: {
      color: '#0f172a',
      metalness: 0.8,
      roughness: 0.4,
      envMapIntensity: 1.8,
    },
    innerFrame: {
      color: '#1e293b',
      metalness: 0.8,
      roughness: 0.35,
      envMapIntensity: 1.5,
    },
    handle: {
      color: '#f8fafc',
      metalness: 1,
      roughness: 0.1,
      envMapIntensity: 2.5,
    },
    glassEdge: {
      color: '#7dd3fc',
      transparent: true,
      opacity: 0.4,
      roughness: 0.1,
      metalness: 0.2,
    },
    glass: new THREE.MeshPhysicalMaterial({
      color: '#ffffff',
      transmission: 1,
      transparent: true,
      opacity: 1,
      roughness: 0.05,
      metalness: 0.1,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      ior: 1.6,
      thickness: 0.8,
      attenuationColor: '#bae6fd',
      attenuationDistance: 2.0,
      envMapIntensity: 4.5,
      reflectivity: 1,
    }),
  }), []);

  return (
    <group ref={groupRef} scale={0.85} position={[0, -0.15, 0]}>
      {/* Structural Walls */}
      <FrameBar position={[-2.8, 0, -0.1]} args={[2.8, 10, 0.4]} material={materials.wall} />
      <FrameBar position={[2.8, 0, -0.1]} args={[2.8, 10, 0.4]} material={materials.wall} />
      <FrameBar position={[0, 3.5, -0.1]} args={[10, 3.0, 0.4]} material={materials.wall} />
      <FrameBar position={[0, -3.5, -0.1]} args={[10, 3.0, 0.4]} material={materials.wall} />

      {/* Interior Background */}
      <mesh position={[0, 0, -3]}>
        <planeGeometry args={[12, 10]} />
        <meshStandardMaterial color="#020617" roughness={0.8} />
      </mesh>

      {/* SpotLights */}
      <spotLight position={[0, 2, -1.5]} angle={0.8} penumbra={0.8} intensity={6} color="#38bdf8" distance={8} />
      <spotLight position={[-2, -2, -1]} angle={0.8} penumbra={0.8} intensity={3} color="#818cf8" distance={6} />

      {/* Animated Welcome Text */}
      <Text
        ref={textRef}
        position={[0, 0, -1.8]}
        fontSize={0.24}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
        letterSpacing={0.06}
        lineHeight={1.4}
        textAlign="center"
        maxWidth={2.6}
      >
        {"Welcome to\nWazir Glass &\nAluminium Centre"}
        <meshStandardMaterial color="#ffffff" emissive="#38bdf8" emissiveIntensity={1.2} toneMapped={false} />
      </Text>

      {/* Outer Doorway Frame */}
      <FrameBar position={[-1.4, 0, 0]} args={[0.15, 4.2, 0.2]} material={materials.frame} />
      <FrameBar position={[1.4, 0, 0]} args={[0.15, 4.2, 0.2]} material={materials.frame} />
      <FrameBar position={[0, 2.025, 0]} args={[2.95, 0.15, 0.2]} material={materials.frame} />
      <FrameBar position={[0, -2.025, 0]} args={[2.95, 0.05, 0.2]} material={materials.frame} />

      {/* Hinged Door Group */}
      <group ref={doorHingeRef} position={[-1.325, 0, 0]}>
        <group position={[1.325, 0, 0]}>
          <FrameBar position={[-1.275, 0, 0]} args={[0.1, 3.9, 0.08]} material={materials.innerFrame} />
          <FrameBar position={[1.275, 0, 0]} args={[0.1, 3.9, 0.08]} material={materials.innerFrame} />
          <FrameBar position={[0, 1.9, 0]} args={[2.65, 0.1, 0.08]} material={materials.innerFrame} />
          <FrameBar position={[0, -1.9, 0]} args={[2.65, 0.1, 0.08]} material={materials.innerFrame} />

          <GlassPane position={[0, 0, 0]} args={[2.45, 3.7, 0.03]} material={materials.glass} edgeMaterial={materials.glassEdge} />

          {/* Pull Handle */}
          <group position={[1.0, 0, 0.1]}>
            <FrameBar position={[0, 0, 0.05]} args={[0.04, 1.2, 0.04]} material={materials.handle} />
            <FrameBar position={[0, 0.5, 0.025]} args={[0.03, 0.03, 0.05]} material={materials.handle} />
            <FrameBar position={[0, -0.5, 0.025]} args={[0.03, 0.03, 0.05]} material={materials.handle} />
          </group>
        </group>
      </group>
    </group>
  );
}
