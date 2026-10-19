import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, Float, Sparkles } from '@react-three/drei';
import DoorModel from './hero/DoorModel';

export default function Hero3DCanvas({ mouse }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
      onTouchStart={() => setIsHovered(prev => !prev)}
      className="hero-model-stage relative w-full h-[380px] sm:h-[430px] md:h-[540px] flex items-center justify-center cursor-pointer bg-slate-100/60 backdrop-blur-md rounded-[2.5rem] border border-slate-200/80 shadow-inner"
    >
      <div className="absolute inset-x-8 bottom-7 h-20 bg-slate-900/10 blur-3xl pointer-events-none" />

      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 45 }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
        performance={{ min: 0.55 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'default' }}
        onCreated={({ gl }) => {
          const dom = gl.domElement;
          dom.addEventListener('webglcontextlost', (e) => e.preventDefault(), false);
        }}
      >
        <ambientLight intensity={0.4} color="#f8fafc" />
        <directionalLight position={[5, 10, 8]} intensity={2.0} color="#ffffff" />
        <spotLight position={[-8, 5, 5]} intensity={1.5} color="#38bdf8" angle={0.6} penumbra={1} />
        <spotLight position={[8, -5, 5]} intensity={1.0} color="#818cf8" angle={0.6} penumbra={1} />

        <Suspense fallback={null}>
          <Environment preset="city" />
          <Sparkles count={40} scale={6} size={1.5} speed={0.2} opacity={0.2} color="#bae6fd" />
          <Float speed={1.5} rotationIntensity={0.08} floatIntensity={0.25}>
            <DoorModel mouse={mouse} isHovered={isHovered} />
          </Float>
          <ContactShadows frames={1} position={[0, -2.4, 0]} opacity={0.4} scale={5} blur={2.5} far={3} color="#0f172a" />
        </Suspense>
      </Canvas>
    </div>
  );
}
