import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Sliders, RotateCw, Zap, Palette, Eye } from 'lucide-react';
import { ParticleConfig, ModelType, ColorTheme } from '../types/portfolio';
import { sound } from '../utils/audioSynth';

interface ParticleStudioDockProps {
  config: ParticleConfig;
  onChangeConfig: (newConfig: Partial<ParticleConfig>) => void;
  onTriggerPulse: () => void;
}

export const ParticleStudioDock: React.FC<ParticleStudioDockProps> = ({
  config,
  onChangeConfig,
  onTriggerPulse,
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'model' | 'dynamics' | 'colors'>('model');

  const themes: { id: ColorTheme; label: string; primary: string; accent: string }[] = [
    { id: 'violet-gold', label: 'Kinetic Lavender & Gold', primary: '#c8b6ff', accent: '#fbbf24' },
    { id: 'cyber-cyan', label: 'Cyber Cyan & Tangerine', primary: '#38bdf8', accent: '#f97316' },
    { id: 'obsidian-white', label: 'Obsidian Monochrome', primary: '#f8fafc', accent: '#94a3b8' },
    { id: 'acid-emerald', label: 'Acid Matrix Emerald', primary: '#4ade80', accent: '#a3e635' },
    { id: 'solar-amber', label: 'Solar Flares Amber', primary: '#f59e0b', accent: '#ef4444' },
  ];

  const models: { id: ModelType; name: string; tag: string }[] = [
    { id: 'particle-self', name: 'Particle Self', tag: 'Human Bust' },
    { id: 'neural-geode', name: 'Neural Geode', tag: 'Torus Manifold' },
    { id: 'cyber-skull', name: 'Cyber Cranium', tag: 'Holographic' },
    { id: 'kinetic-core', name: 'Kinetic Glyphs', tag: 'Orbital Core' },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[94vw] max-w-3xl pointer-events-auto transition-transform duration-300">
      {/* Collapse / Expand Toggle Button */}
      <div className="flex justify-center -mb-2 relative z-10">
        <button
          onClick={() => {
            sound.playClick();
            setIsCollapsed(!isCollapsed);
          }}
          className="flex items-center gap-1.5 px-3.5 py-1 text-xs font-semibold text-slate-300 bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 rounded-full shadow-lg backdrop-blur-md transition-all"
        >
          {isCollapsed ? (
            <>
              <ChevronUp className="w-3.5 h-3.5 text-amber-400" />
              <span>Show Particle Controls</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              <span>Cinema Mode (Hide HUD)</span>
            </>
          )}
        </button>
      </div>

      {/* Main Glassmorphic Dock Container */}
      {!isCollapsed && (
        <div className="p-4 rounded-2xl bg-zinc-950/90 border border-white/10 backdrop-blur-2xl shadow-2xl text-slate-200">
          {/* Header row with functional tabs */}
          <div className="flex items-center justify-between gap-4 pb-3 mb-3 border-b border-white/10">
            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl">
              <button
                onClick={() => {
                  sound.playHover();
                  setActiveTab('model');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  activeTab === 'model' ? 'bg-white/15 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                3D Models
              </button>
              <button
                onClick={() => {
                  sound.playHover();
                  setActiveTab('dynamics');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  activeTab === 'dynamics' ? 'bg-white/15 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Physics & Shaders
              </button>
              <button
                onClick={() => {
                  sound.playHover();
                  setActiveTab('colors');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  activeTab === 'colors' ? 'bg-white/15 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Color Palettes
              </button>
            </div>

            {/* Quick action buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  onChangeConfig({ autoRotate: !config.autoRotate });
                }}
                title="Toggle Auto Rotation"
                className={`p-2 rounded-lg border text-xs transition-colors flex items-center gap-1.5 ${
                  config.autoRotate
                    ? 'bg-amber-400/10 text-amber-300 border-amber-400/30'
                    : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
                }`}
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Spin</span>
              </button>

              <button
                onClick={() => {
                  sound.playPulseWave();
                  onTriggerPulse();
                }}
                className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Shockwave</span>
              </button>
            </div>
          </div>

          {/* Tab 1: 3D Models */}
          {activeTab === 'model' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {models.map(m => (
                <button
                  key={m.id}
                  onClick={() => {
                    sound.playClick();
                    onChangeConfig({ model: m.id });
                  }}
                  className={`p-2.5 rounded-xl text-left border transition-all ${
                    config.model === m.id
                      ? 'bg-white/10 border-amber-400/50 shadow-[0_0_15px_rgba(251,191,36,0.15)]'
                      : 'bg-white/5 border-white/5 hover:border-white/20 text-slate-300'
                  }`}
                >
                  <p className="text-xs font-bold text-white tracking-tight">{m.name}</p>
                  <p className="text-[10px] text-slate-400 font-mono-code">{m.tag}</p>
                </button>
              ))}
            </div>
          )}

          {/* Tab 2: Physics & Particle Controls */}
          {activeTab === 'dynamics' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-400">
                  <span>Particle Count</span>
                  <span className="font-mono-code text-white tabular-nums">
                    {config.particleCount.toLocaleString()} pts
                  </span>
                </div>
                <input
                  type="range"
                  min={12000}
                  max={48000}
                  step={4000}
                  value={config.particleCount}
                  onChange={e => onChangeConfig({ particleCount: Number(e.target.value) })}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-400">
                  <span>Dispersion Force</span>
                  <span className="font-mono-code text-white tabular-nums">
                    {config.dispersionForce.toFixed(2)}x
                  </span>
                </div>
                <input
                  type="range"
                  min={0.2}
                  max={2.5}
                  step={0.1}
                  value={config.dispersionForce}
                  onChange={e => onChangeConfig({ dispersionForce: Number(e.target.value) })}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-400">
                  <span>Point Size</span>
                  <span className="font-mono-code text-white tabular-nums">
                    {config.particleSize.toFixed(3)}
                  </span>
                </div>
                <input
                  type="range"
                  min={0.015}
                  max={0.075}
                  step={0.005}
                  value={config.particleSize}
                  onChange={e => onChangeConfig({ particleSize: Number(e.target.value) })}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* Tab 3: Color Schemes */}
          {activeTab === 'colors' && (
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {themes.map(t => (
                <button
                  key={t.id}
                  onClick={() => {
                    sound.playClick();
                    onChangeConfig({ theme: t.id });
                  }}
                  className={`p-2 rounded-xl text-left border flex items-center gap-2.5 transition-all ${
                    config.theme === t.id
                      ? 'bg-white/10 border-amber-400/50'
                      : 'bg-white/5 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex -space-x-1 shrink-0">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/40"
                      style={{ backgroundColor: t.primary }}
                    />
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/40"
                      style={{ backgroundColor: t.accent }}
                    />
                  </div>
                  <span className="text-[11px] font-medium text-slate-200 truncate">{t.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
