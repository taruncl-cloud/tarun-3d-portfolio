import React from 'react';
import { X, CheckCircle2, ArrowRight, Layers, Sparkles, Terminal } from 'lucide-react';
import { ProjectItem } from '../types/portfolio';
import { sound } from '../utils/audioSynth';

interface CaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenContact: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose, onOpenContact }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-2xl bg-zinc-950 border border-white/10 shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/[0.02]">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-mono-code mb-1">
              <span>{project.client}</span>
              <span>·</span>
              <span>{project.year}</span>
              <span>·</span>
              <span>{project.category}</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-white tracking-tight">
              {project.title}
            </h3>
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

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div>
            <h4 className="text-xs text-slate-400 font-mono-code mb-2 uppercase tracking-wider">The Challenge & Vision</h4>
            <p className="text-sm text-slate-200 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Role & Target Model */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-white/5 border border-white/10 text-xs">
            <div>
              <span className="text-slate-400 font-mono-code block mb-1">My Role</span>
              <span className="text-white font-medium">{project.role}</span>
            </div>
            <div>
              <span className="text-slate-400 font-mono-code block mb-1">3D Particle Architecture</span>
              <span className="text-amber-400 font-medium capitalize">{project.modelTarget.replace('-', ' ')}</span>
            </div>
          </div>

          {/* Technologies Used */}
          {project.technologies && project.technologies.length > 0 && (
            <div>
              <h4 className="text-xs text-slate-400 font-mono-code mb-2 uppercase tracking-wider">Technologies & Frameworks</h4>
              <div className="flex flex-wrap gap-2 text-xs font-mono-code">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-amber-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Focus Areas */}
          {project.focusAreas && project.focusAreas.length > 0 && (
            <div>
              <h4 className="text-xs text-slate-400 font-mono-code mb-2 uppercase tracking-wider">Core Focus Areas</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                {project.focusAreas.map((area, idx) => (
                  <li key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-black/40 border border-white/5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Key Deliverables */}
          <div>
            <h4 className="text-xs text-slate-400 font-mono-code mb-3 uppercase tracking-wider">Architecture & Deliverables</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              {project.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-black/60 border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quantitative Metrics */}
          <div>
            <h4 className="text-xs text-slate-400 font-mono-code mb-3 uppercase tracking-wider">Impact & Performance Benchmarks</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.metrics.map((metric, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-amber-400/5 border border-amber-400/20 text-center">
                  <span className="block text-xs font-semibold text-amber-300 font-mono-code">{metric}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-white/10 bg-white/[0.02] flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono-code">Designed for production scale</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
            >
              Back
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
                onOpenContact();
              }}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-black bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
            >
              <span>Discuss Similar Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
