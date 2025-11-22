import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Lightfield() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    // Fogを削除し、手動のフェードのみにする（より確実に制御するため）
    // scene.fog = new THREE.FogExp2(new THREE.Color("#000000"), 0.002);

    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 50);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // --- Textures ---
    const getTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 32;
      canvas.height = 32;
      const context = canvas.getContext("2d");
      if (context) {
        const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
        // 中心をより強く発光させる
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.2, "rgba(255, 255, 255, 0.9)");
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.3)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        context.fillStyle = gradient;
        context.fillRect(0, 0, 32, 32);
      }
      const texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    const particleTexture = getTexture();

    // --- Particles System ---
    const particleCount = 3000; // 少し減らして個々の質を上げる
    const geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const randomness = new Float32Array(particleCount);
    const speeds = new Float32Array(particleCount);

    const spread = 250; // より広範囲に

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread * 1.2; // 奥行きを深く

      // サイズを全体的に大きく
      const r = Math.random();
      // 小さい粒子(塵)と、大きいボケ(Bokeh)のメリハリ
      scales[i] =
        r < 0.7 ? Math.random() * 1.0 + 0.5 : Math.random() * 4.0 + 2.0;

      randomness[i] = Math.random();
      speeds[i] = Math.random() * 0.5 + 0.5;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute("aRandom", new THREE.BufferAttribute(randomness, 1));
    geometry.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: particleTexture },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uPixelRatio: { value: renderer.getPixelRatio() },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uPixelRatio;
        uniform vec2 uMouse;
        
        attribute float aScale;
        attribute float aRandom;
        attribute float aSpeed;
        
        varying float vAlpha;
        varying vec3 vColor;

        void main() {
          vec3 pos = position;
          
          float time = uTime * aSpeed * 0.3;
          
          // ゆったりとした大きなうねり
          pos.x += sin(time + pos.z * 0.05) * 5.0;
          pos.y += cos(time * 0.8 + pos.x * 0.05) * 3.0;
          pos.z += sin(time * 0.5 + pos.y * 0.05) * 5.0;

          // マウスインタラクション
          pos.x += uMouse.x * 20.0 * aRandom;
          pos.y += uMouse.y * 20.0 * aRandom;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;

          // サイズ計算：基本サイズを大きくし、距離減衰を適用
          // ピクセル比率も考慮
          gl_PointSize = aScale * 30.0 * uPixelRatio;
          gl_PointSize *= (100.0 / -mvPosition.z);

          // 距離に基づくアルファフェード（計算を安全な順序に修正）
          float dist = length(mvPosition.xyz);
          // 近く(10)から遠く(200)まで表示。遠すぎる/近すぎるものはフェードアウト
          float alphaFade = smoothstep(0.0, 20.0, dist) * (1.0 - smoothstep(100.0, 250.0, dist));

          // 点滅エフェクト
          float twinkle = sin(uTime * 3.0 + aRandom * 100.0) * 0.5 + 0.5;
          
          // ベースの不透明度を上げる (0.1 -> 0.4)
          vAlpha = (0.4 + 0.6 * twinkle) * alphaFade;
          
          // 色の決定：基本は白、ランダムで紫～青のニュアンス
          // aRandomが高いほど色が付く
          vec3 colorWhite = vec3(1.0, 1.0, 1.0);
          vec3 colorPurple = vec3(0.8, 0.7, 1.0); // 明るい紫
          vec3 colorBlue = vec3(0.7, 0.8, 1.0);   // 明るい青
          
          vec3 mixColor = mix(colorPurple, colorBlue, sin(aRandom * 3.14));
          vColor = mix(colorWhite, mixColor, aRandom * 0.5);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        varying float vAlpha;
        varying vec3 vColor;
        
        void main() {
          vec4 tex = texture2D(uTexture, gl_PointCoord);
          // 完全に透明なピクセルは描画しない
          if (tex.a < 0.01) discard;
          
          // アルファを強調
          float finalAlpha = vAlpha * tex.a;
          
          // 明るさをブースト
          gl_FragColor = vec4(vColor * 1.5, finalAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const clock = new THREE.Clock();
    const targetMouse = new THREE.Vector2();
    const currentMouse = new THREE.Vector2();

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
      material.uniforms.uPixelRatio.value = renderer.getPixelRatio();
    };
    window.addEventListener("resize", onResize);

    const onMouseMove = (e: MouseEvent) => {
      targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    let animationId: number;
    const animate = () => {
      const elapsed = clock.getElapsedTime();

      currentMouse.lerp(targetMouse, 0.05);
      material.uniforms.uMouse.value = currentMouse;
      material.uniforms.uTime.value = elapsed;

      // ゆっくり回転
      particles.rotation.y = elapsed * 0.05;
      particles.rotation.x = Math.sin(elapsed * 0.05) * 0.1;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      cancelAnimationFrame(animationId);
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className='absolute inset-0 pointer-events-none mix-blend-screen'
      style={{ zIndex: 0 }}
      aria-hidden='true'
    />
  );
}
