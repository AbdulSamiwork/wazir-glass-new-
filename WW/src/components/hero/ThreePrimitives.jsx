import React from 'react';
import { RoundedBox } from '@react-three/drei';

export function FrameBar({ position, args, material }) {
  return (
    <RoundedBox position={position} args={args} radius={0.025} smoothness={6}>
      <meshStandardMaterial attach="material" {...material} />
    </RoundedBox>
  );
}

export function GlassPane({ position, args, material, edgeMaterial }) {
  return (
    <group position={position}>
      <mesh material={material}>
        <boxGeometry args={args} />
      </mesh>
      <FrameBar position={[-args[0] / 2, 0, 0]} args={[0.012, args[1], args[2] + 0.01]} material={edgeMaterial} />
      <FrameBar position={[args[0] / 2, 0, 0]} args={[0.012, args[1], args[2] + 0.01]} material={edgeMaterial} />
      <FrameBar position={[0, args[1] / 2, 0]} args={[args[0], 0.012, args[2] + 0.01]} material={edgeMaterial} />
      <FrameBar position={[0, -args[1] / 2, 0]} args={[args[0], 0.012, args[2] + 0.01]} material={edgeMaterial} />
      
      {/* Glossy reflection layers */}
      <mesh position={[-args[0] * 0.22, args[1] * 0.07, args[2] / 2 + 0.01]} rotation={[0, 0, -0.2]}>
        <planeGeometry args={[0.16, args[1] * 0.88]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.15} depthWrite={false} />
      </mesh>
    </group>
  );
}
