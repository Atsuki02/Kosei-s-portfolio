import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function Rig() {
  useFrame((state) => {
    state.camera.position.lerp(
      new THREE.Vector3(state.mouse.x * 2, state.mouse.y * 2, 10),
      0.02
    );
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

const Background3D = () => {
  return (
    <div className='fixed inset-0 z-0 h-screen w-full bg-transparent pointer-events-none'>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Rig />
        {/* 深淵な奥行きを作る霧 */}
        <fog attach='fog' args={["#000000", 5, 30]} />

        {/* メインの微細な光の粒子（浮遊する塵） */}
        <Sparkles
          count={200}
          scale={[20, 20, 10]}
          size={4}
          speed={0.2}
          opacity={0.5}
          color='#ffffff'
        />

        {/* アクセントとなる少し大きめの粒子（薄い紫） */}
        <Sparkles
          count={50}
          scale={[25, 25, 15]}
          size={8}
          speed={0.1}
          opacity={0.3}
          color='#a78bfa'
        />

        {/* 遠景の星空 */}
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default Background3D;
