import React, { useState } from 'react';
import { Heart, ArrowUpRight, Sparkles, MoveRight, Eye, Shield, Terminal, Github, Linkedin, ExternalLink } from 'lucide-react';
import { sound } from '../utils/audioSynth';
import { ModelType } from '../types/portfolio';

interface HeroSectionProps {
  onSelectModel: (model: ModelType) => void;
  currentModel: ModelType;
  onOpenPromptModal: () => void;
  onOpenAwsDeploy: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectModel,
  currentModel,
  onOpenPromptModal,
  onOpenAwsDeploy,
}) => {
  const [likes, setLikes] = useState<number>(248);
  const [hasLiked, setHasLiked] = useState<boolean>(false);

  const handleLike = () => {
    sound.playPulseWave();
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
    } else {
      setLikes(prev => prev - 1);
      setHasLiked(false);
    }
  };

  return (
    <section id="hero" className="relative w-full min-h-screen flex flex-col justify-between pt-20 pb-12 px-4 md:px-8 pointer-events-none select-none">
      {/* Massive brutalist pixel headline behind the particle bust, customized to TARUN */}
      <div className="absolute inset-0 flex items-center justify-center z-0 overflow-hidden pointer-events-none opacity-90">
        <h1 className="font-pixel text-[clamp(2.4rem,7.5vw,8.5rem)] text-white/90 leading-none tracking-tight text-center max-w-full drop-shadow-[0_10px_35px_rgba(255,255,255,0.15)]">
          HELLO I'M TARUN
        </h1>
      </div>

      {/* Floating interactive top widget dock matching screenshot layout */}
      <div className="relative z-10 w-full flex justify-center mt-2">
        <div className="pointer-events-auto flex items-center gap-2 p-1.5 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md text-xs text-slate-300 shadow-2xl">
          <button
            onClick={() => sound.playClick()}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors"
            title="Overview grid"
          >
            <Shield className="w-4 h-4 text-amber-400" />
          </button>

          <div className="flex items-center gap-2 px-2 text-slate-300 font-mono-code text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-white font-medium">SecOps & AI active</span>
          </div>

          <div className="hidden sm:flex items-center gap-1 border-l border-white/10 pl-2">
            <button
              onClick={() => {
                sound.playHover();
                onSelectModel('particle-self');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                currentModel === 'particle-self' ? 'bg-white/15 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Avatar
            </button>
            <button
              onClick={() => {
                sound.playHover();
                onSelectModel('cyber-skull');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                currentModel === 'cyber-skull' ? 'bg-white/15 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Security HUD
            </button>
            <button
              onClick={() => {
                sound.playHover();
                onSelectModel('neural-geode');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                currentModel === 'neural-geode' ? 'bg-white/15 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Neural Geode
            </button>
            <button
              onClick={() => {
                sound.playHover();
                onSelectModel('kinetic-core');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                currentModel === 'kinetic-core' ? 'bg-white/15 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Kinetic Core
            </button>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onOpenAwsDeploy();
            }}
            className="px-3 py-1 rounded-xl bg-amber-400 text-black font-semibold text-xs hover:bg-amber-300 transition-colors"
          >
            AWS S3 Deploy
          </button>
        </div>
      </div>

      {/* Floating Right Card matching the reference screenshot, now with Tarun CL's bio */}
      <aside className="absolute right-4 md:right-8 top-28 z-20 w-80 pointer-events-auto hidden md:block">
        <div className="p-5 rounded-2xl bg-zinc-950/85 border border-white/10 backdrop-blur-xl shadow-2xl">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h2 className="font-display text-xl font-bold text-white tracking-tight">Tarun CL</h2>
              <p className="text-xs text-amber-300 font-mono-code">Cybersecurity & AI Developer</p>
            </div>
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-colors ${
                hasLiked
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : 'bg-white/5 text-slate-300 hover:text-white border border-white/10'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-rose-400 text-rose-400' : ''}`} />
              <span className="font-mono-code tabular-nums">{likes}</span>
            </button>
          </div>

          <div className="text-xs text-slate-300 space-y-1.5 mb-4">
            <p className="text-slate-400">
              <span className="text-white font-medium">B.Tech CSE (Cybersecurity)</span> · VIT-AP University
            </p>
            <p className="text-slate-400">Location: <span className="text-slate-200">India</span></p>
            <p className="font-mono-code text-[11px] text-amber-400/90 pt-1 border-t border-white/5">
              "Think. Build. Secure."
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-white/10">
            {/* Social Links */}
            <div className="grid grid-cols-2 gap-2">
              <a
                href="https://github.com/taruncl-cloud"
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playHover()}
                className="flex items-center justify-center gap-2 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-200 border border-white/5 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/tarun-cl-96076031b/"
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playHover()}
                className="flex items-center justify-center gap-2 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-200 border border-white/5 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-sky-400" />
                <span>LinkedIn</span>
              </a>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onOpenAwsDeploy();
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/50 text-xs font-medium text-cyan-200 transition-colors border border-cyan-800/40"
            >
              <span className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>S3: taruncl-portfolio-2026</span>
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </div>
        </div>
      </aside>

      {/* Bottom Row: Editorial kicker & scroll down guide */}
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        <div className="max-w-xl pointer-events-auto">
          {/* Subtle unboxed metadata adhering to zero-pill rules */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-2 font-mono-code">
            <span className="text-amber-400 font-semibold">Tarun CL</span>
            <span>·</span>
            <span>VIT-AP University</span>
            <span>·</span>
            <span>Cybersecurity & AI Developer</span>
            <span>·</span>
            <span>AWS Cloud Certified S3 Stack</span>
          </div>
          <p className="text-sm md:text-base text-slate-200 font-medium leading-snug">
            Passionate about building intelligent, secure, and scalable digital solutions. Specializing in application security, agentic AI systems, full-stack software, and automated cloud pipelines.
          </p>
        </div>

        <div className="pointer-events-auto flex items-center gap-4 text-xs text-slate-400 font-mono-code">
          <span className="flex items-center gap-1.5 text-slate-300">
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            Cursor dispersion active
          </span>
          <span>·</span>
          <a
            href="#showcase"
            onClick={() => sound.playHover()}
            className="flex items-center gap-1 text-white hover:text-amber-300 transition-colors group"
          >
            <span>Explore 7 projects</span>
            <MoveRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};
