import React, { useState } from 'react';
import { X, Send, Check, Mail, Github, Linkedin, ExternalLink, ShieldCheck, MapPin } from 'lucide-react';
import { sound } from '../utils/audioSynth';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Cybersecurity & Software Engineering');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playPulseWave();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-zinc-950 border border-white/10 shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/[0.02]">
          <div>
            <h3 className="font-display text-xl font-bold text-white tracking-tight">
              Connect with Tarun CL
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Cybersecurity Developer · Software Engineer · AI Enthusiast
            </p>
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

        {/* Direct Channels Strip */}
        <div className="px-6 py-4 bg-zinc-900/50 border-b border-white/5 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-mono-code flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              Direct Email:
            </span>
            <a
              href="mailto:cltaruncl@gmail.com"
              className="text-amber-300 hover:text-amber-200 font-mono-code transition-colors"
            >
              cltaruncl@gmail.com
            </a>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-mono-code flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              University & Location:
            </span>
            <span className="text-slate-300">VIT-AP University, India</span>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-white/5">
            <a
              href="https://github.com/taruncl-cloud"
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playHover()}
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 transition-colors font-mono-code"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/tarun-cl-96076031b/"
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playHover()}
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 transition-colors font-mono-code"
            >
              <Linkedin className="w-3.5 h-3.5 text-sky-400" />
              <span>LinkedIn</span>
            </a>
            <a
              href="http://taruncl-portfolio-2026.s3-website-us-east-1.amazonaws.com/#skills"
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playHover()}
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/20 transition-colors font-mono-code"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>S3 Host</span>
            </a>
          </div>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="font-display text-lg font-bold text-white">Message Dispatched</h4>
            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              Thank you for connecting! I will review your message and reply to <span className="text-amber-300">{email}</span> promptly.
            </p>
            <button
              onClick={() => {
                sound.playClick();
                setIsSubmitted(false);
                onClose();
              }}
              className="mt-4 px-5 py-2 text-xs font-bold text-black bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 font-mono-code mb-1">Your Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Dr. Rajesh Kumar / Hiring Manager"
                className="w-full px-3 py-2 rounded-lg bg-black border border-white/10 text-white placeholder-zinc-600 focus:border-amber-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-mono-code mb-1">Your Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="contact@company.com"
                className="w-full px-3 py-2 rounded-lg bg-black border border-white/10 text-white placeholder-zinc-600 focus:border-amber-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-mono-code mb-1">Topic / Collaboration</label>
              <select
                value={subject}
                onChange={e => setSubject(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-black border border-white/10 text-white focus:border-amber-400 outline-none"
              >
                <option value="Cybersecurity & Software Engineering">Cybersecurity & Software Role</option>
                <option value="AI / Agentic Systems Collaboration">AI & Agentic Systems Research</option>
                <option value="Cloud & AWS Architecture">Cloud Architecture & Deployment</option>
                <option value="Hackathon / Project Opportunity">Project / SIH Hackathon Collaboration</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-mono-code mb-1">Message</label>
              <textarea
                rows={3}
                required
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Write your note or project requirements..."
                className="w-full px-3 py-2 rounded-lg bg-black border border-white/10 text-white placeholder-zinc-600 focus:border-amber-400 outline-none resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onClose();
                }}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-black bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-[0_0_20px_rgba(251,191,36,0.2)]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send to Tarun</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
