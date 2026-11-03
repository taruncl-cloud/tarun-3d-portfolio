import React from 'react';
import { Cpu, Terminal, Sparkles, Cloud, ShieldCheck, Zap, Activity, HardDrive } from 'lucide-react';
import { sound } from '../utils/audioSynth';

interface ShaderLabSectionProps {
  onOpenAwsDeploy: () => void;
  onOpenPromptModal: () => void;
  particleCount: number;
}

export const ShaderLabSection: React.FC<ShaderLabSectionProps> = ({
  onOpenAwsDeploy,
  onOpenPromptModal,
  particleCount
}) => {
  return (
    <section id="interaction-lab" className="relative z-20 w-full max-w-6xl mx-auto px-4 md:px-8 py-24 border-t border-white/10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-mono-code mb-2">
            <span>03</span>
            <span>/</span>
            <span>PARTICLE ENGINE ARCHITECTURE</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight">
            Anatomy of the 3D Point Cloud.
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onOpenPromptModal();
            }}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition-colors flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Master Prompt</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onOpenAwsDeploy();
            }}
            className="px-4 py-2 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-800/50 text-xs font-semibold text-cyan-200 transition-colors flex items-center gap-2"
          >
            <Cloud className="w-3.5 h-3.5 text-cyan-400" />
            <span>Deploy to S3 + CDN</span>
          </button>
        </div>
      </div>

      {/* Grid of technical breakdowns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Procedural Geometry Math */}
        <div className="p-6 rounded-2xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-xs text-amber-400 font-mono-code mb-4">
            <Cpu className="w-4 h-4" />
            <span>POINT-CLOUD GEOMETRY</span>
          </div>
          <h3 className="font-display text-lg font-bold text-white mb-2">
            Mathematical Bust Generation
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Constructed without external .glb or .obj assets. Synthesizes {particleCount.toLocaleString()} coordinates across cranial spherical harmonics, jaw contours, and clavicle tapers with zero 404 risk.
          </p>
          <div className="p-3 rounded-lg bg-black/60 border border-white/5 font-mono-code text-[11px] text-amber-300/80 space-y-1">
            <p>θ = 2π · u, φ = acos(2v - 1)</p>
            <p>x = r · sin(φ)cos(θ) · 0.95</p>
            <p>y = r · cos(φ) · 1.15 + 1.25</p>
          </div>
        </div>

        {/* Card 2: Interactive Spring Dispersion */}
        <div className="p-6 rounded-2xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono-code mb-4">
            <Activity className="w-4 h-4" />
            <span>FORCE & SPRING DYNAMICS</span>
          </div>
          <h3 className="font-display text-lg font-bold text-white mb-2">
            Radial Cursor Dispersion
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Mouse coordinates are projected via Raycaster into 3D world space. Particles within the radius experience an inverse displacement force with exponential spring return.
          </p>
          <div className="p-3 rounded-lg bg-black/60 border border-white/5 font-mono-code text-[11px] text-cyan-300/80 space-y-1">
            <p>factor = (1 - dist / radius) · force</p>
            <p>target = origin + push + noise(t)</p>
            <p>pos += (target - pos) · 0.12</p>
          </div>
        </div>

        {/* Card 3: AWS Global Edge Delivery */}
        <div className="p-6 rounded-2xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono-code mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>AWS S3 + CLOUDFRONT</span>
          </div>
          <h3 className="font-display text-lg font-bold text-white mb-2">
            Edge-Optimized Delivery
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Static assets are distributed across 450+ CloudFront edge pops. Immutable hashed chunks are cached for 1 year while index.html validates on each request.
          </p>
          <div className="p-3 rounded-lg bg-black/60 border border-white/5 font-mono-code text-[11px] text-emerald-300/80 space-y-1">
            <p>Origin: Private S3 Bucket via OAC</p>
            <p>Compression: Brotli + Gzip</p>
            <p>SPA Routing: 403/404 → /index.html</p>
          </div>
        </div>
      </div>

      {/* Live AWS CLI Quick Deploy Strip */}
      <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-zinc-900 to-black border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-display text-sm font-bold text-white">Ready for AWS S3 Sync & CloudFront CDN</h4>
            <p className="text-xs text-slate-400">Run a one-command build & deploy pipeline with automated cache invalidation.</p>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onOpenAwsDeploy();
          }}
          className="px-4 py-2 text-xs font-bold text-black bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap"
        >
          View CloudFormation & Terraform Scripts
        </button>
      </div>
    </section>
  );
};
