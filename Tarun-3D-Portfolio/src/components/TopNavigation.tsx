import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Cloud, Shield, Github, Linkedin } from 'lucide-react';
import { sound } from '../utils/audioSynth';

interface TopNavigationProps {
  onOpenAwsDeploy: () => void;
  onOpenPromptModal: () => void;
  onOpenContactModal: () => void;
  activeSection: string;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  onOpenAwsDeploy,
  onOpenPromptModal,
  onOpenContactModal,
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleAudio = () => {
    const nextState = sound.toggle();
    setIsAudioEnabled(nextState);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 md:px-8 py-3.5 flex items-center justify-between gap-8 border-b border-white/5 bg-black/60 backdrop-blur-md">
      {/* Zone 1: Tarun CL Wordmark & live status pill */}
      <div className="flex items-center gap-4 shrink-0">
        <a
          href="#hero"
          onClick={() => sound.playClick()}
          className="font-display text-lg font-bold tracking-tight text-white hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          TARUN CL
        </a>

        {/* Live status capsule matching the reference screenshot */}
        <div className="hidden lg:flex items-center gap-3 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 font-mono-code tabular-nums">
          <Shield className="w-3.5 h-3.5 text-amber-400" />
          <span>{currentTime || '12:40:27'}</span>
          <span className="text-white/30">/</span>
          <span className="text-emerald-400 font-sans text-[11px] font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Think. Build. Secure.
          </span>
        </div>
      </div>

      {/* Zone 2: Single-line navigation links */}
      <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
        <a
          href="#showcase"
          onClick={() => sound.playHover()}
          className="hover:text-white transition-colors whitespace-nowrap shrink-0"
        >
          01. Projects
        </a>
        <a
          href="#skills"
          onClick={() => sound.playHover()}
          className="hover:text-white transition-colors whitespace-nowrap shrink-0"
        >
          02. Skills
        </a>
        <a
          href="#certifications"
          onClick={() => sound.playHover()}
          className="hover:text-white transition-colors whitespace-nowrap shrink-0"
        >
          03. Credentials
        </a>
        <button
          onClick={() => {
            sound.playClick();
            onOpenPromptModal();
          }}
          className="text-amber-300 hover:text-amber-200 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Tarun's Prompt
        </button>
      </nav>

      {/* Zone 3: Actions (Sound, AWS Deploy, Contact) */}
      <div className="flex items-center gap-2.5 shrink-0">
        <button
          onClick={handleToggleAudio}
          title={isAudioEnabled ? 'Mute Procedural Audio' : 'Enable Procedural Audio'}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
          aria-label="Toggle procedural audio"
        >
          {isAudioEnabled ? (
            <Volume2 className="w-4 h-4 text-amber-400" />
          ) : (
            <VolumeX className="w-4 h-4 text-slate-400" />
          )}
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onOpenAwsDeploy();
          }}
          className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors whitespace-nowrap shrink-0"
        >
          <Cloud className="w-3.5 h-3.5 text-cyan-400" />
          <span>AWS S3 + CloudFront</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onOpenContactModal();
          }}
          className="px-4 py-1.5 text-xs font-bold text-black bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-[0_0_20px_rgba(251,191,36,0.25)]"
        >
          Get In Touch
        </button>
      </div>
    </header>
  );
};
