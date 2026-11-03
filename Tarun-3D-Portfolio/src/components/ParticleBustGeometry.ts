import * as THREE from 'three';
import { ColorTheme } from '../types/portfolio';

export interface ModelData {
  positions: Float32Array;
  colors: Float32Array;
  originalPositions: Float32Array;
  randomWeights: Float32Array;
  pointCount: number;
}

/**
 * Procedurally generates a 3D Human Bust point cloud inspired by the reference image.
 * Includes cranial dome, facial structure, neck, shoulders, and atmospheric floating particles.
 */
export function generateParticleBust(count: number = 32000, theme: ColorTheme = 'violet-gold'): ModelData {
  const positions = new Float32Array(count * 3);
  const originalPositions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const randomWeights = new Float32Array(count);

  const themeColors = getThemePalette(theme);

  let pIdx = 0;
  const targetCount = count;

  for (let i = 0; i < targetCount; i++) {
    let x = 0;
    let y = 0;
    let z = 0;
    const r = Math.random();

    // Split distribution across anatomical zones
    if (r < 0.38) {
      // Cranium and Head (upper oval / sphere)
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const rad = 1.15 + (Math.random() - 0.5) * 0.12;

      // Squish along Z slightly and taper along Y
      x = rad * Math.sin(phi) * Math.cos(theta) * 0.95;
      y = rad * Math.cos(phi) * 1.15 + 1.25;
      z = rad * Math.sin(phi) * Math.sin(theta) * 0.85;

      // Form jawline and chin tapering on lower hemisphere
      if (y < 1.3) {
        const chinFactor = Math.max(0, (1.3 - y) / 1.0);
        x *= (1.0 - chinFactor * 0.42);
        z = z * 0.8 + chinFactor * 0.28; // Chin thrusts slightly forward
      }
    } else if (r < 0.55) {
      // Facial features & nose contour / eye sockets
      const theta = (Math.random() - 0.5) * 1.6;
      const faceY = 0.8 + Math.random() * 1.1;
      const faceRad = 0.98 + (Math.random() - 0.5) * 0.08;

      x = Math.sin(theta) * faceRad * 0.85;
      y = faceY;
      z = Math.cos(theta) * faceRad * 0.75 + 0.35;

      // Nose bridge projection
      if (Math.abs(x) < 0.22 && y > 1.05 && y < 1.45) {
        z += 0.28 * (1.0 - Math.abs(x) / 0.22);
      }
      // Eye cavities depression
      if (Math.abs(x) > 0.25 && Math.abs(x) < 0.65 && y > 1.25 && y < 1.55) {
        z -= 0.14;
      }
    } else if (r < 0.72) {
      // Neck (cylinder)
      const neckAngle = Math.random() * Math.PI * 2;
      const neckY = 0.1 + Math.random() * 0.75;
      const neckR = 0.52 + (1.0 - (neckY / 0.75)) * 0.18 + (Math.random() - 0.5) * 0.08;

      x = Math.cos(neckAngle) * neckR;
      y = neckY;
      z = Math.sin(neckAngle) * neckR * 0.92;
    } else if (r < 0.92) {
      // Torso, Shoulders & Clavicle (wide curved taper)
      const shoulderU = (Math.random() - 0.5) * 2; // -1 to 1
      const shoulderSpread = 2.45;
      x = shoulderU * shoulderSpread * (0.8 + Math.random() * 0.25);
      
      const falloff = 1.0 - Math.pow(Math.abs(shoulderU), 1.8);
      y = -0.05 + falloff * 0.35 - Math.abs(shoulderU) * 0.65 - Math.random() * 0.55;
      z = (Math.random() - 0.5) * 1.2 * (0.6 + falloff * 0.4);
    } else {
      // Ambient atmospheric halo particles (floating dust aura)
      const phi = Math.random() * Math.PI * 2;
      const costheta = Math.random() * 2 - 1;
      const theta = Math.acos(costheta);
      const rad = 0.8 + Math.random() * 2.8;

      x = rad * Math.sin(theta) * Math.cos(phi);
      y = rad * Math.cos(theta) + 0.9;
      z = rad * Math.sin(theta) * Math.sin(phi);
    }

    // Subtle micro-organic noise
    x += (Math.random() - 0.5) * 0.04;
    y += (Math.random() - 0.5) * 0.04;
    z += (Math.random() - 0.5) * 0.04;

    positions[pIdx] = x;
    positions[pIdx + 1] = y;
    positions[pIdx + 2] = z;

    originalPositions[pIdx] = x;
    originalPositions[pIdx + 1] = y;
    originalPositions[pIdx + 2] = z;

    // Vertex color grading matching the reference image:
    // White/lavender on face/head, amber/gold glow on lower right shoulder
    const color = calculatePointColor(x, y, z, themeColors);
    colors[pIdx] = color.r;
    colors[pIdx + 1] = color.g;
    colors[pIdx + 2] = color.b;

    randomWeights[i] = Math.random() * 0.8 + 0.2;
    pIdx += 3;
  }

  return {
    positions,
    colors,
    originalPositions,
    randomWeights,
    pointCount: count
  };
}

/**
 * Generates a Neural Quantum Geode (harmonic torus knot with phyllotaxis core)
 */
export function generateNeuralGeode(count: number = 28000, theme: ColorTheme = 'cyber-cyan'): ModelData {
  const positions = new Float32Array(count * 3);
  const originalPositions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const randomWeights = new Float32Array(count);
  const themeColors = getThemePalette(theme);

  let pIdx = 0;
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 32;
    const p = 3;
    const q = 7;
    const r = 1.35 + 0.35 * Math.cos(q * t);

    let x = r * Math.cos(p * t);
    let y = 0.85 * Math.sin(q * t) + 0.8;
    let z = r * Math.sin(p * t);

    // Add volumetric dispersion rings
    const dispersion = (Math.random() - 0.5) * 0.45;
    x += dispersion;
    y += dispersion;
    z += dispersion;

    positions[pIdx] = x;
    positions[pIdx + 1] = y;
    positions[pIdx + 2] = z;

    originalPositions[pIdx] = x;
    originalPositions[pIdx + 1] = y;
    originalPositions[pIdx + 2] = z;

    const color = calculatePointColor(x, y, z, themeColors);
    colors[pIdx] = color.r;
    colors[pIdx + 1] = color.g;
    colors[pIdx + 2] = color.b;

    randomWeights[i] = Math.random() * 0.9 + 0.1;
    pIdx += 3;
  }

  return { positions, colors, originalPositions, randomWeights, pointCount: count };
}

/**
 * Generates a Cyber Skull Hologram
 */
export function generateCyberSkull(count: number = 26000, theme: ColorTheme = 'obsidian-white'): ModelData {
  const positions = new Float32Array(count * 3);
  const originalPositions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const randomWeights = new Float32Array(count);
  const themeColors = getThemePalette(theme);

  let pIdx = 0;
  for (let i = 0; i < count; i++) {
    let x = 0;
    let y = 0;
    let z = 0;
    const r = Math.random();

    if (r < 0.45) {
      // Upper Cranium Sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const rad = 1.25 + (Math.random() - 0.5) * 0.1;

      x = rad * Math.sin(phi) * Math.cos(theta);
      y = Math.max(0.6, rad * Math.cos(phi)) + 0.7;
      z = rad * Math.sin(phi) * Math.sin(theta) * 0.95;
    } else if (r < 0.7) {
      // Facial Bone & Cheek Arches
      const side = Math.random() > 0.5 ? 1 : -1;
      const angle = (Math.random() * 0.8 + 0.2);
      x = side * (0.4 + Math.sin(angle) * 0.65);
      y = 0.5 + Math.random() * 0.6;
      z = 0.85 + Math.cos(angle) * 0.25;

      // Cheek arch
      if (Math.abs(x) > 0.6) {
        z -= 0.35;
      }
    } else if (r < 0.88) {
      // Maxilla & Teeth Line
      const arch = (Math.random() - 0.5) * 1.2;
      x = arch * 0.65;
      y = 0.2 + (Math.random() - 0.5) * 0.25;
      z = Math.sqrt(Math.max(0.01, 0.45 - x * x)) + 0.4;
    } else {
      // Mandible Jaw
      const u = (Math.random() - 0.5) * 1.4;
      x = u * 0.68;
      y = -0.15 + Math.abs(u) * 0.3;
      z = Math.sqrt(Math.max(0.01, 0.35 - x * x)) + 0.35;
    }

    positions[pIdx] = x;
    positions[pIdx + 1] = y;
    positions[pIdx + 2] = z;

    originalPositions[pIdx] = x;
    originalPositions[pIdx + 1] = y;
    originalPositions[pIdx + 2] = z;

    const color = calculatePointColor(x, y, z, themeColors);
    colors[pIdx] = color.r;
    colors[pIdx + 1] = color.g;
    colors[pIdx + 2] = color.b;

    randomWeights[i] = Math.random() * 0.8 + 0.2;
    pIdx += 3;
  }

  return { positions, colors, originalPositions, randomWeights, pointCount: count };
}

/**
 * Generates a Kinetic Typographic Core
 */
export function generateKineticCore(count: number = 24000, theme: ColorTheme = 'solar-amber'): ModelData {
  const positions = new Float32Array(count * 3);
  const originalPositions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const randomWeights = new Float32Array(count);
  const themeColors = getThemePalette(theme);

  let pIdx = 0;
  for (let i = 0; i < count; i++) {
    // 3 interlocking orthogonal rings with particle trails
    const ring = Math.floor(Math.random() * 3);
    const angle = Math.random() * Math.PI * 2;
    const rad = 1.35 + (Math.random() - 0.5) * 0.2;
    const thickness = (Math.random() - 0.5) * 0.25;

    let x = 0;
    let y = 0.8;
    let z = 0;

    if (ring === 0) {
      x = Math.cos(angle) * rad;
      y += Math.sin(angle) * rad;
      z = thickness;
    } else if (ring === 1) {
      x = Math.cos(angle) * rad;
      y += thickness;
      z = Math.sin(angle) * rad;
    } else {
      x = thickness;
      y += Math.cos(angle) * rad;
      z = Math.sin(angle) * rad;
    }

    positions[pIdx] = x;
    positions[pIdx + 1] = y;
    positions[pIdx + 2] = z;

    originalPositions[pIdx] = x;
    originalPositions[pIdx + 1] = y;
    originalPositions[pIdx + 2] = z;

    const color = calculatePointColor(x, y, z, themeColors);
    colors[pIdx] = color.r;
    colors[pIdx + 1] = color.g;
    colors[pIdx + 2] = color.b;

    randomWeights[i] = Math.random() * 0.9 + 0.1;
    pIdx += 3;
  }

  return { positions, colors, originalPositions, randomWeights, pointCount: count };
}

interface Palette {
  primary: THREE.Color;
  secondary: THREE.Color;
  accent: THREE.Color;
  halo: THREE.Color;
}

function getThemePalette(theme: ColorTheme): Palette {
  switch (theme) {
    case 'violet-gold':
      // The exact palette from the user reference screenshot:
      // Lavender/white head, golden amber shoulder highlight, deep indigo shadow
      return {
        primary: new THREE.Color('#dcd6f7'),
        secondary: new THREE.Color('#a78bfa'),
        accent: new THREE.Color('#fbbf24'), // Warm amber rim on lower right
        halo: new THREE.Color('#fef08a'),
      };
    case 'cyber-cyan':
      return {
        primary: new THREE.Color('#38bdf8'),
        secondary: new THREE.Color('#0284c7'),
        accent: new THREE.Color('#f97316'),
        halo: new THREE.Color('#bae6fd'),
      };
    case 'acid-emerald':
      return {
        primary: new THREE.Color('#4ade80'),
        secondary: new THREE.Color('#15803d'),
        accent: new THREE.Color('#a3e635'),
        halo: new THREE.Color('#bbf7d0'),
      };
    case 'solar-amber':
      return {
        primary: new THREE.Color('#f59e0b'),
        secondary: new THREE.Color('#d97706'),
        accent: new THREE.Color('#ef4444'),
        halo: new THREE.Color('#fef3c7'),
      };
    case 'obsidian-white':
    default:
      return {
        primary: new THREE.Color('#f8fafc'),
        secondary: new THREE.Color('#94a3b8'),
        accent: new THREE.Color('#e2e8f0'),
        halo: new THREE.Color('#ffffff'),
      };
  }
}

function calculatePointColor(x: number, y: number, z: number, palette: Palette): THREE.Color {
  const result = new THREE.Color();
  // Reference lighting:
  // Top & front is crisp lavender-white (primary/secondary)
  // Lower right (+X, -Y) has warm golden amber rim light (accent)
  const isLowerRight = (x > 0.2 && y < 0.6) || (x > 0.6 && y < 0.9);
  const isFrontFace = (z > 0.4 && y > 0.8 && y < 1.7);

  if (isLowerRight) {
    const t = Math.min(1.0, (x + 0.5) * 0.7 + (1.0 - y) * 0.5);
    result.lerpColors(palette.secondary, palette.accent, t);
  } else if (isFrontFace) {
    const t = Math.min(1.0, (y - 0.7) / 1.0);
    result.lerpColors(palette.secondary, palette.primary, t);
  } else {
    // Top cranium and background
    const dist = Math.sqrt(x * x + z * z);
    if (dist > 1.8) {
      result.copy(palette.halo);
    } else {
      result.lerpColors(palette.secondary, palette.primary, Math.min(1.0, y / 2.0));
    }
  }

  return result;
}
