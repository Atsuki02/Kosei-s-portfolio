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
        {/* 白背景に馴染むフォグ */}
        <fog attach='fog' args={["#ffffff", 5, 30]} />

        {/* メインの粒子：黒くシャープに */}
        <Sparkles
          count={150}
          scale={[20, 20, 10]}
          size={3}
          speed={0.2}
          opacity={0.6}
          color='#1a1a1a'
        />

        {/* アクセント：少し薄いグレーで奥行きを */}
        <Sparkles
          count={50}
          scale={[25, 25, 15]}
          size={5}
          speed={0.1}
          opacity={0.3}
          color='#4a4a4a'
        />
      </Canvas>
    </div>
  );
};

export default Background3D;
