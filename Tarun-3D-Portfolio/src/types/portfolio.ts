export type ModelType = 'particle-self' | 'neural-geode' | 'cyber-skull' | 'kinetic-core';

export type ColorTheme = 'violet-gold' | 'cyber-cyan' | 'obsidian-white' | 'acid-emerald' | 'solar-amber';

export interface ParticleConfig {
  model: ModelType;
  particleCount: number;
  particleSize: number;
  dispersionForce: number;
  dispersionRadius: number;
  noiseSpeed: number;
  noiseScale: number;
  theme: ColorTheme;
  wireframeMode: boolean;
  autoRotate: boolean;
  cameraFov: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  client: string; // e.g. "VIT-AP / Independent", "Smart India Hackathon", etc.
  year: string;
  category: string;
  modelTarget: ModelType;
  accentColor: string;
  description: string;
  metrics: string[];
  deliverables: string[];
  role: string;
  technologies: string[];
  focusAreas?: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface DeploymentConfig {
  bucketName: string;
  region: string;
  customDomain: string;
  priceClass: 'PriceClass_100' | 'PriceClass_200' | 'PriceClass_All';
  enableBrotli: boolean;
  spaRouting: boolean;
}
