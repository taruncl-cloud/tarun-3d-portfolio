import React, { useState, useEffect } from 'react';
import { ThreeCanvas } from './components/ThreeCanvas';
import { TopNavigation } from './components/TopNavigation';
import { HeroSection } from './components/HeroSection';
import { ScrollProjects } from './components/ScrollProjects';
import { ShaderLabSection } from './components/ShaderLabSection';
import { ParticleStudioDock } from './components/ParticleStudioDock';
import { AwsDeploymentHub } from './components/AwsDeploymentHub';
import { MasterPromptModal } from './components/MasterPromptModal';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ContactModal } from './components/ContactModal';
import { ParticleConfig, ModelType, ProjectItem } from './types/portfolio';
import { sound } from './utils/audioSynth';
import { Cloud, Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Particle configuration
  const [config, setConfig] = useState<ParticleConfig>({
    model: 'particle-self',
    particleCount: 32000,
    particleSize: 0.038,
    dispersionForce: 1.15,
    dispersionRadius: 0.85,
    noiseSpeed: 0.8,
    noiseScale: 0.02,
    theme: 'violet-gold',
    wireframeMode: false,
    autoRotate: true,
    cameraFov: 40
  });

  // Modal states
  const [isAwsModalOpen, setIsAwsModalOpen] = useState<boolean>(false);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState<boolean>(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ProjectItem | null>(null);

  // Track scroll progress for 3D camera choreography
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = Math.min(1, Math.max(0, window.scrollY / totalScroll));
        setScrollProgress(progress);
      }

      // Track active section
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight * 0.7) {
        setActiveSection('hero');
      } else if (scrollY < window.innerHeight * 2.2) {
        setActiveSection('showcase');
      } else {
        setActiveSection('lab');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleUpdateConfig = (partial: Partial<ParticleConfig>) => {
    setConfig(prev => ({ ...prev, ...partial }));
  };

  const handleSelectModel = (model: ModelType) => {
    handleUpdateConfig({ model });
  };

  const handleTriggerPulse = () => {
    // Canvas click handler simulates shockwave
  };

  return (
    <div className="relative min-h-screen bg-[#050507] text-slate-100 font-sans selection:bg-amber-400 selection:text-black">
      {/* 3D WebGL Canvas Layer (Fixed background with pointer events) */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <ThreeCanvas config={config} scrollProgress={scrollProgress} />
      </div>

      {/* Top Navigation */}
      <TopNavigation
        onOpenAwsDeploy={() => setIsAwsModalOpen(true)}
        onOpenPromptModal={() => setIsPromptModalOpen(true)}
        onOpenContactModal={() => setIsContactModalOpen(true)}
        activeSection={activeSection}
      />

      {/* Scrollable Content Container */}
      <main className="relative z-10">
        {/* Hero Section matching the reference layout */}
        <HeroSection
          onSelectModel={handleSelectModel}
          currentModel={config.model}
          onOpenPromptModal={() => setIsPromptModalOpen(true)}
          onOpenAwsDeploy={() => setIsAwsModalOpen(true)}
        />

        {/* Selected 3D Works & Case Studies */}
        <ScrollProjects
          onSelectProject={project => setSelectedCaseStudy(project)}
          onActivateModel={handleSelectModel}
          activeModel={config.model}
        />

        {/* Particle Engine & AWS S3/CloudFront Architecture Breakdown */}
        <ShaderLabSection
          onOpenAwsDeploy={() => setIsAwsModalOpen(true)}
          onOpenPromptModal={() => setIsPromptModalOpen(true)}
          particleCount={config.particleCount}
        />

        {/* Minimal Editorial Footer */}
        <footer className="relative z-20 border-t border-white/10 py-12 px-4 md:px-8 bg-black/80 backdrop-blur-md">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <span className="font-display font-bold text-white text-sm">TARUN CL</span>
              <span className="hidden sm:inline">·</span>
              <span>B.Tech CSE (Cybersecurity) · VIT-AP University</span>
              <span className="hidden sm:inline">·</span>
              <span className="text-amber-400 font-mono-code">"Think. Build. Secure."</span>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="https://github.com/taruncl-cloud"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/tarun-cl-96076031b/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <button
                onClick={() => {
                  sound.playClick();
                  setIsPromptModalOpen(true);
                }}
                className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Prompt Generator</span>
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setIsAwsModalOpen(true);
                }}
                className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
              >
                <Cloud className="w-3.5 h-3.5 text-cyan-400" />
                <span>AWS S3 + CloudFront</span>
              </button>
            </div>
          </div>
        </footer>
      </main>

      {/* Collapsible Bottom Control Dock adhering to Three.js guidelines */}
      <ParticleStudioDock
        config={config}
        onChangeConfig={handleUpdateConfig}
        onTriggerPulse={handleTriggerPulse}
      />

      {/* Modals */}
      <AwsDeploymentHub
        isOpen={isAwsModalOpen}
        onClose={() => setIsAwsModalOpen(false)}
      />

      <MasterPromptModal
        isOpen={isPromptModalOpen}
        onClose={() => setIsPromptModalOpen(false)}
      />

      <CaseStudyModal
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onOpenContact={() => setIsContactModalOpen(true)}
      />

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
