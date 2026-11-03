import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ParticleConfig } from '../types/portfolio';
import {
  generateParticleBust,
  generateNeuralGeode,
  generateCyberSkull,
  generateKineticCore,
  ModelData
} from './ParticleBustGeometry';

interface ThreeCanvasProps {
  config: ParticleConfig;
  scrollProgress: number; // 0 to 1
  onClickPulse?: () => void;
}

// Module-level reusable math objects (Zero GC in render loop)
const _pointer2D = new THREE.Vector2(-999, -999);
const _targetPointer = new THREE.Vector2(0, 0);
const _raycaster = new THREE.Raycaster();
const _plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
const _intersectionPoint = new THREE.Vector3();
const _tempVec3 = new THREE.Vector3();

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ config, scrollProgress }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);
  const currentModelDataRef = useRef<ModelData | null>(null);
  const configRef = useRef(config);
  const scrollRef = useRef(scrollProgress);
  const shockwaveRef = useRef({ active: false, time: 0, origin: new THREE.Vector3() });

  // Keep refs up to date without re-instantiating the WebGL renderer
  configRef.current = config;
  scrollRef.current = scrollProgress;

  // Generate procedural round particle sprite texture
  const createParticleTexture = (): THREE.Texture => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;

    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
    gradient.addColorStop(0.25, 'rgba(255, 255, 255, 0.85)');
    gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.3)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(32, 32, 30, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  };

  // Re-build geometry when model type, count, or theme changes
  const updateGeometry = () => {
    if (!sceneRef.current) return;

    let data: ModelData;
    const count = configRef.current.particleCount;
    const theme = configRef.current.theme;

    switch (configRef.current.model) {
      case 'neural-geode':
        data = generateNeuralGeode(count, theme);
        break;
      case 'cyber-skull':
        data = generateCyberSkull(count, theme);
        break;
      case 'kinetic-core':
        data = generateKineticCore(count, theme);
        break;
      case 'particle-self':
      default:
        data = generateParticleBust(count, theme);
        break;
    }

    currentModelDataRef.current = data;

    if (pointsRef.current) {
      pointsRef.current.geometry.dispose();
      const geom = new THREE.BufferGeometry();
      geom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(data.positions), 3));
      geom.setAttribute('color', new THREE.BufferAttribute(new Float32Array(data.colors), 3));
      pointsRef.current.geometry = geom;
    }
  };

  useEffect(() => {
    updateGeometry();
  }, [config.model, config.particleCount, config.theme]);

  // Handle particle size & point adjustments
  useEffect(() => {
    if (pointsRef.current) {
      const mat = pointsRef.current.material as THREE.PointsMaterial;
      mat.size = config.particleSize;
    }
  }, [config.particleSize]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL guard
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x050507, 0.08);

    // Camera
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 100);
    camera.position.set(0, 0.9, 4.2);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // Initial Model Data
    const initialData = generateParticleBust(configRef.current.particleCount, configRef.current.theme);
    currentModelDataRef.current = initialData;

    // Points BufferGeometry
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(initialData.positions), 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(initialData.colors), 3));

    const particleTexture = createParticleTexture();
    const material = new THREE.PointsMaterial({
      size: configRef.current.particleSize,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.92,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);
    pointsRef.current = points;

    // Pointer event listeners
    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      _targetPointer.set(x, y);
    };

    const handlePointerLeave = () => {
      _targetPointer.set(0, 0);
      _pointer2D.set(-999, -999);
    };

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      _raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
      _raycaster.ray.intersectPlane(_plane, _intersectionPoint);

      shockwaveRef.current = {
        active: true,
        time: 0,
        origin: _intersectionPoint.clone()
      };
    };

    window.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('mouseleave', handlePointerLeave);
    container.addEventListener('click', handleClick);

    // Resize Handler
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let frameId = 0;
    let clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    const animate = () => {
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth pointer lerp
      _pointer2D.x += (_targetPointer.x - _pointer2D.x) * 0.08;
      _pointer2D.y += (_targetPointer.y - _pointer2D.y) * 0.08;

      // Project pointer into 3D world space
      _raycaster.setFromCamera(_pointer2D, camera);
      _raycaster.ray.intersectPlane(_plane, _intersectionPoint);

      // Scroll-driven camera and rotation choreography
      const scroll = scrollRef.current;
      const targetRotY = _pointer2D.x * 0.45 + (configRef.current.autoRotate ? elapsedTime * 0.15 : 0) + scroll * Math.PI * 1.5;
      const targetRotX = -_pointer2D.y * 0.25 - scroll * 0.3;
      const targetPosY = 0.85 - scroll * 1.2;
      const targetPosZ = 4.2 - scroll * 1.0;

      if (pointsRef.current) {
        pointsRef.current.rotation.y += (targetRotY - pointsRef.current.rotation.y) * 0.05;
        pointsRef.current.rotation.x += (targetRotX - pointsRef.current.rotation.x) * 0.05;

        // Camera damping
        camera.position.y += (targetPosY - camera.position.y) * 0.05;
        camera.position.z += (targetPosZ - camera.position.z) * 0.05;
        camera.lookAt(0, 0.85 - scroll * 0.5, 0);

        // Particle Physics: mouse dispersion and noise pulsation
        const data = currentModelDataRef.current;
        if (data && pointsRef.current.geometry) {
          const posAttr = pointsRef.current.geometry.getAttribute('position') as THREE.BufferAttribute;
          const posArray = posAttr.array as Float32Array;
          const orig = data.originalPositions;
          const count = data.pointCount;
          const dispersionForce = configRef.current.dispersionForce;
          const dispersionRadius = configRef.current.dispersionRadius;
          const noiseSpeed = configRef.current.noiseSpeed;

          // Shockwave update
          if (shockwaveRef.current.active) {
            shockwaveRef.current.time += delta * 3.5;
            if (shockwaveRef.current.time > 3.0) {
              shockwaveRef.current.active = false;
            }
          }

          const shockTime = shockwaveRef.current.time;
          const shockOrigin = shockwaveRef.current.origin;
          const shockActive = shockwaveRef.current.active;

          for (let i = 0; i < count; i++) {
            const idx = i * 3;
            const ox = orig[idx];
            const oy = orig[idx + 1];
            const oz = orig[idx + 2];

            // Subtle organic breathing noise
            const noise = Math.sin(elapsedTime * noiseSpeed * 1.8 + oy * 3.0 + ox * 2.0) * 0.015;

            // Distance to mouse intersection
            _tempVec3.set(posArray[idx], posArray[idx + 1], posArray[idx + 2]);
            // Apply current object rotation to get world position
            _tempVec3.applyEuler(pointsRef.current.rotation);

            const dx = _tempVec3.x - _intersectionPoint.x;
            const dy = _tempVec3.y - _intersectionPoint.y;
            const distSq = dx * dx + dy * dy;
            const radSq = dispersionRadius * dispersionRadius;

            let pushX = 0;
            let pushY = 0;
            let pushZ = 0;

            if (distSq < radSq && distSq > 0.0001) {
              const dist = Math.sqrt(distSq);
              const factor = (1.0 - dist / dispersionRadius) * dispersionForce * 0.7;
              pushX = (dx / dist) * factor;
              pushY = (dy / dist) * factor;
              pushZ = factor * 0.6;
            }

            // Shockwave displacement
            if (shockActive) {
              const swDx = _tempVec3.x - shockOrigin.x;
              const swDy = _tempVec3.y - shockOrigin.y;
              const swDist = Math.sqrt(swDx * swDx + swDy * swDy);
              const waveFront = Math.abs(swDist - shockTime * 1.2);
              if (waveFront < 0.35) {
                const waveIntensity = (1.0 - waveFront / 0.35) * Math.max(0, 1.0 - shockTime / 2.5);
                pushX += (swDx / (swDist + 0.001)) * waveIntensity * 0.45;
                pushY += (swDy / (swDist + 0.001)) * waveIntensity * 0.45;
                pushZ += waveIntensity * 0.55;
              }
            }

            // Target position with spring return
            const targetX = ox + pushX + noise;
            const targetY = oy + pushY + noise;
            const targetZ = oz + pushZ;

            posArray[idx] += (targetX - posArray[idx]) * 0.12;
            posArray[idx + 1] += (targetY - posArray[idx + 1]) * 0.12;
            posArray[idx + 2] += (targetZ - posArray[idx + 2]) * 0.12;
          }

          posAttr.needsUpdate = true;
        }
      }

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(animate);
      } else {
        frameId = requestAnimationFrame(animate);
      }
    };

    if (isSoftwareGl) {
      afterDraw(animate);
    } else {
      frameId = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mouseleave', handlePointerLeave);
      container.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      particleTexture.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement.parentNode);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing overflow-hidden pointer-events-auto"
      style={{ touchAction: 'none' }}
    />
  );
};
