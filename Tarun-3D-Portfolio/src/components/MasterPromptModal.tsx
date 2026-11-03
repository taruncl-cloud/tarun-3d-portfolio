import React, { useState } from 'react';
import { Sparkles, Copy, Check, X, Sliders, Code2, Terminal, ShieldAlert } from 'lucide-react';
import { sound } from '../utils/audioSynth';

interface MasterPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MasterPromptModal: React.FC<MasterPromptModalProps> = ({ isOpen, onClose }) => {
  const [designerName, setDesignerName] = useState<string>('Tarun CL');
  const [motionMoniker, setMotionMoniker] = useState<string>("HELLO I'M TARUN");
  const [includeAudio, setIncludeAudio] = useState<boolean>(true);
  const [includeAwsPipeline, setIncludeAwsPipeline] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const generatedPrompt = `Create an award-winning 3D Motion Portfolio web application for ${designerName}, featuring scroll-driven spatial interactions, interactive WebGL particle models, and a production AWS S3 + CloudFront deployment pipeline.

### 1. Visual Aesthetics & Spatial Direction
- Inspired by the reference design (Particle Self / Kin OS): Dark obsidian canvas (#050507), bold brutalist typography, and a prominent hero with pixel font headline "${motionMoniker}".
- In the center of the viewport, render an interactive 3D humanoid particle bust (32,000+ vertices) using Three.js with custom point-cloud geometry (cranium, jaw contour, facial hollows, neck, shoulders, and ambient dust halo).
- Color grading: Lavender/white luminous particles on the head and face with warm golden amber rim lighting on the lower right shoulder, matching the exact reference.
- Floating top status pill: dynamic real-time clock (HH:MM:SS), "Engine active" status, model switcher, and audio toggle.
- Right hero widget card: "Particle Self / Scroll-Driven 3D", interactive like counter, prompt generator link, and CDN deploy trigger.
- Clean typography: Google Fonts 'Silkscreen' for brutalist pixel headlines, 'Plus Jakarta Sans' for editorial body, and 'JetBrains Mono' for tabular telemetry.
- Enforce strict anti-slop rules: zero static pill badges on metadata (clean unboxed text with subtle typographic separators '·'), no low-opacity watermark text, no thick left accent borders.

### 2. Interactive 3D WebGL Engine (Three.js)
- Software-WebGL guard reading GPU renderer string (SwiftShader/llvmpipe) with frame pacing to prevent CPU lag on headless browsers.
- Mouse Physics: As cursor hovers over the particle model, particles within an adjustable radius disperse and push outward with smooth spring-physics return.
- Scroll Choreography: As user scrolls through the page, the camera gracefully translates and the model rotates smoothly across 4 showcase chapters:
  1. "Particle Self" (Humanoid Bust)
  2. "Solace Neural Geode" (Parametric Torus Manifold)
  3. "Aegis Cyber Skull" (Holographic Cranial Mesh)
  4. "Verve Kinetic Core" (Brutalist Typographic Attractor)
- Click interaction: Triggers an expanding radial shockwave pulse across all particles with procedural Web Audio synthesis.
- Collapsible Bottom Dock (Zero Viewport Occlusion): Pinned to bottom-center with "Cinema / Zen Mode" toggle. Allows tweaking particle density (12k–48k), dispersion force, point sizes, auto-rotate spin, and color palettes.

### 3. Content Architecture & Sections
- Top Bar: Single text wordmark, 4 clean single-line nav links, audio toggle, and booking CTA.
- Hero Section: Massive pixel headline, 3D interactive particle bust, status pill, and quick widgets.
- Selected Works: Curated high-impact design case studies with live model switching on click and detailed deliverables/metrics.
- Particle Studio Inspector: Live sandbox to customize shader parameters.
- Industry Accolades: Clean recognition grid (Awwwards SOTD, FWA of the Day, WebGL Best Tech, Biennale Selection).
- Contact Modal: Interactive design inquiry form with budget selector and project timeline.
${includeAudio ? '- Procedural Web Audio: Zero-dependency sound synthesizer providing subtle sine/triangle hover chirps, click hums, and ambient low-frequency drones.' : ''}

### 4. AWS S3 + CloudFront Production Deployment
${includeAwsPipeline ? `- Built for static export via 'npm run build' generating optimized HTML, CSS, and JS chunks in 'dist/'.
- Amazon S3 configuration: Private S3 bucket with all public access blocked; Origin Access Control (OAC) enabled so content is strictly accessible via CloudFront.
- CloudFront CDN: Global edge distribution with Brotli and Gzip compression, TLS 1.3, and HTTP to HTTPS redirection.
- Atomic Cache Strategy:
  * '/assets/*' (hashed JS/CSS/textures) deployed with 'Cache-Control: public, max-age=31536000, immutable'.
  * 'index.html' deployed with 'Cache-Control: public, max-age=0, must-revalidate'.
- Single-Page Application (SPA) routing: Custom error response mapping 403 and 404 HTTP status codes to '/index.html' with HTTP 200.
- Provide ready-to-run AWS CLI sync scripts, S3 bucket policy JSON, CloudFormation YAML template, and Terraform 'main.tf' configuration.` : ''}`;

  const handleCopy = () => {
    sound.playClick();
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-2xl bg-zinc-950 border border-white/10 shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-white tracking-tight">
                Master 3D Motion Portfolio Prompt
              </h3>
              <p className="text-xs text-slate-400">
                Ready-to-use generative AI prompt with exact Three.js shader specs and AWS deployment architecture.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Customization controls */}
        <div className="p-6 border-b border-white/10 bg-zinc-900/40 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1 font-mono-code">Designer / Studio Name</label>
            <input
              type="text"
              value={designerName}
              onChange={e => setDesignerName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-black border border-white/10 text-white font-mono-code focus:border-amber-400 outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1 font-mono-code">Hero Headline Pixel Text</label>
            <input
              type="text"
              value={motionMoniker}
              onChange={e => setMotionMoniker(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-black border border-white/10 text-white font-mono-code focus:border-amber-400 outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="includeAudio"
              checked={includeAudio}
              onChange={e => setIncludeAudio(e.target.checked)}
              className="rounded accent-amber-400"
            />
            <label htmlFor="includeAudio" className="text-slate-300 cursor-pointer">
              Include Web Audio Procedural Synthesizer
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="includeAws"
              checked={includeAwsPipeline}
              onChange={e => setIncludeAwsPipeline(e.target.checked)}
              className="rounded accent-amber-400"
            />
            <label htmlFor="includeAws" className="text-slate-300 cursor-pointer">
              Include AWS S3 + CloudFront Architecture
            </label>
          </div>
        </div>

        {/* Prompt Output Viewer */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-amber-400 font-mono-code">READY-TO-USE SPECIFICATION PROMPT</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Prompt</span>
                </>
              )}
            </button>
          </div>

          <pre className="p-4 rounded-xl bg-black border border-white/10 text-xs text-slate-300 font-mono-code whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
            {generatedPrompt}
          </pre>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-white/[0.02] flex items-center justify-between text-xs text-slate-400">
          <span>Paste this prompt directly into AI Studio or Claude to reproduce this exact architecture.</span>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white font-medium transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
