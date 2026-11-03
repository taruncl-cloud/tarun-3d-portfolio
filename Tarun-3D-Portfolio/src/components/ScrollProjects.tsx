import React, { useState } from 'react';
import {
  ArrowUpRight,
  Shield,
  ShieldCheck,
  Cpu,
  Smartphone,
  Eye,
  Bot,
  Lock,
  LineChart,
  Award,
  Terminal,
  Layers,
  Code2,
  ExternalLink,
  Server,
  Cloud
} from 'lucide-react';
import { ProjectItem, ModelType } from '../types/portfolio';
import { sound } from '../utils/audioSynth';

interface ScrollProjectsProps {
  onSelectProject: (project: ProjectItem) => void;
  onActivateModel: (model: ModelType) => void;
  activeModel: ModelType;
}

export const TARUN_PROJECTS: ProjectItem[] = [
  {
    id: 'muleshield',
    title: 'MuleShield',
    subtitle: 'AI-Powered Security & Fraud Detection Platform',
    client: 'Cybersecurity Innovation',
    year: '2026',
    category: 'Application Security & AI',
    modelTarget: 'cyber-skull',
    accentColor: '#38bdf8',
    description:
      'A security-focused platform engineered to identify suspicious mule activities, detect intricate fraud patterns, and provide actionable threat mitigation to protect digital assets.',
    metrics: [
      'Intelligent Threat Pattern Identification',
      'Security-Focused Backend Architecture',
      'High-Throughput REST API Processing',
      'PostgreSQL Relational Storage'
    ],
    deliverables: [
      'Threat Heuristic Engine',
      'Fraud Analysis Pipeline',
      'Scalable Node.js Backend',
      'Interactive Incident Dashboard'
    ],
    role: 'Lead Cybersecurity & Backend Architect',
    technologies: ['JavaScript', 'Node.js', 'PostgreSQL', 'REST APIs', 'AI Threat Modeling'],
    focusAreas: [
      'Intelligent threat identification',
      'Security-focused backend architecture',
      'API integration & data processing',
      'Scalable application architecture'
    ]
  },
  {
    id: 'sentinel',
    title: 'Sentinel — AI SOC Analyst',
    subtitle: 'Autonomous Security Operations Center',
    client: 'Security Operations & Threat Defense',
    year: '2026',
    category: 'SecOps & Threat Detection',
    modelTarget: 'particle-self',
    accentColor: '#fbbf24',
    description:
      'An intelligent SOC platform designed to detect suspicious activities, identify brute-force attacks, ingest real-time security events, and provide unified visual incident visibility.',
    metrics: [
      'Automated Security Event Ingestion',
      'Real-time Brute-Force Attack Detection',
      'Centralized Incident Visibility Dashboard',
      'AI-Assisted Security Analysis Pipeline'
    ],
    deliverables: [
      'Event Log Parsing Engine',
      'Dynamic Threat Alert Generation',
      'FastAPI Microservice Backend',
      'Vite & React Security HUD'
    ],
    role: 'Cybersecurity Developer',
    technologies: ['Python', 'FastAPI', 'SQLite', 'React', 'Vite', 'OWASP Standards'],
    focusAreas: [
      'Security monitoring & alert generation',
      'Brute-force detection algorithms',
      'Centralized incident management',
      'AI-assisted triage integration'
    ]
  },
  {
    id: 'vittrace',
    title: 'VITTrace',
    subtitle: 'Smart Lost & Found Management System',
    client: 'VIT-AP University',
    year: '2025',
    category: 'Mobile & Cloud Infrastructure',
    modelTarget: 'neural-geode',
    accentColor: '#4ade80',
    description:
      'A native Android application built with Jetpack Compose designed to streamline lost-and-found management across university campuses with cloud verification and live synchronization.',
    metrics: [
      'Real-time Firebase Cloud Sync',
      'Item Discovery & Secure Claim Workflow',
      'Native Android Jetpack Compose UI',
      'Campus-wide Student Accessibility'
    ],
    deliverables: [
      'Android Native App Architecture',
      'Firebase Firestore Data Pipeline',
      'Firebase Storage Image Verification',
      'Search & Geospatial Location Tagging'
    ],
    role: 'Android & Cloud Engineer',
    technologies: ['Kotlin', 'Android Studio', 'Jetpack Compose', 'Firebase Firestore', 'Firebase Storage'],
    focusAreas: [
      'Report lost & found items',
      'Item discovery and secure tracking',
      'Firebase authentication & storage'
    ]
  },
  {
    id: 'retinai',
    title: 'RetinAI',
    subtitle: 'AI-Based Diabetic Retinopathy Screening',
    client: 'Smart India Hackathon 2026',
    year: '2026',
    category: 'Medical AI & Computer Vision',
    modelTarget: 'kinetic-core',
    accentColor: '#f59e0b',
    description:
      'An AI-powered retinal imaging platform developed for automated diabetic retinopathy screening, featuring twin clinician/patient portals and a high-accuracy computer vision pipeline.',
    metrics: [
      'Automated Retinal Image Analysis',
      'Clinical Doctor & Patient Portals',
      'High-Precision Medical Vision Pipeline',
      'National SIH 2026 Project'
    ],
    deliverables: [
      'Computer Vision Inference Pipeline',
      'Streamlit Clinical Diagnostics Dashboard',
      'Patient Screening History Tracker',
      'Medical Image Normalization'
    ],
    role: 'AI & Computer Vision Developer',
    technologies: ['Python', 'Streamlit', 'Machine Learning', 'Computer Vision', 'Deep Learning'],
    focusAreas: [
      'Retinal image analysis workflow',
      'Doctor & Patient Portals',
      'Screening dashboard & image processing'
    ]
  },
  {
    id: 'nexus-ai',
    title: 'Nexus AI',
    subtitle: 'Personal AI Assistant & Intelligent Automation',
    client: 'Agentic AI Systems',
    year: '2025',
    category: 'Agentic AI & Productivity',
    modelTarget: 'particle-self',
    accentColor: '#c8b6ff',
    description:
      'A JARVIS-inspired personal intelligence hub integrating conversational voice interaction, long-term memory, wake-word detection, PDF intelligence, coding assistance, and cybersecurity tooling.',
    metrics: [
      'Voice STT / TTS Pipeline',
      'Long-Term Memory & Context Graph',
      'Multi-Tool Cybersecurity Automation',
      'Local & Cloud LLM API Orchestration'
    ],
    deliverables: [
      'Voice Assistant Runtime',
      'Document Intelligence & PDF Search',
      'Cybersecurity Tool Execution Bridge',
      'React Conversational Interface'
    ],
    role: 'AI System Engineer',
    technologies: ['Python', 'React', 'AI/LLM APIs', 'JavaScript', 'Speech Recognition'],
    focusAreas: [
      'Voice interaction & Wake-word detection',
      'Long-term memory & PDF intelligence',
      'Cybersecurity automation & coding assistant'
    ]
  },
  {
    id: 'smart-parcel-locker',
    title: 'Smart Parcel Locker',
    subtitle: 'IoT Intelligent Parcel Management System',
    client: 'Embedded Systems & Hardware',
    year: '2025',
    category: 'IoT & Embedded Security',
    modelTarget: 'cyber-skull',
    accentColor: '#38bdf8',
    description:
      'A hardware-secured parcel delivery solution enabling safe package drop-offs without requiring the homeowner to be present, featuring QR verification, OTP access, and ESP32 connectivity.',
    metrics: [
      'Dual QR & OTP Cryptographic Authentication',
      'Automated Solenoid Locker Actuation',
      'ESP32 Fallback Hotspot Architecture',
      'Instant Owner Push Notification'
    ],
    deliverables: [
      'ESP32 Embedded C/C++ Firmware',
      'Keypad & Hardware Interfacing',
      'Notification Dispatch Flow',
      'Standalone Network Hotspot Routine'
    ],
    role: 'IoT & Hardware Security Engineer',
    technologies: ['ESP32', 'IoT', 'Embedded Systems', 'QR Authentication', 'OTP Security', 'Hardware'],
    focusAreas: [
      'QR & OTP based authentication',
      'Automated locker access control',
      'ESP32 hotspot fallback connectivity'
    ]
  },
  {
    id: 'exness-autotrader',
    title: 'Exness Autotrader',
    subtitle: 'Automated Trading & Market Monitoring',
    client: 'Quantitative FinTech',
    year: '2024',
    category: 'Algorithmic Systems & APIs',
    modelTarget: 'neural-geode',
    accentColor: '#fbbf24',
    description:
      'A Python-based trading automation platform interfacing directly with MetaTrader 5 for real-time market monitoring, algorithmic strategy execution, and mobile companion tracking.',
    metrics: [
      'MetaTrader 5 API Bridge',
      'Automated Execution Engine',
      'Microsecond Latency Market Feeds',
      'Android Companion App with Retrofit'
    ],
    deliverables: [
      'MT5 Trading Daemon',
      'FastAPI & Flask REST Service',
      'Android Monitoring Client (Kotlin)',
      'Risk Management Safeguards'
    ],
    role: 'Algorithm & Backend Engineer',
    technologies: ['Python', 'MetaTrader 5', 'FastAPI', 'Flask', 'Kotlin', 'Retrofit'],
    focusAreas: [
      'Trading API integration & algorithmic execution',
      'Real-time market telemetry monitoring',
      'Android mobile client integration'
    ]
  }
];

export const ScrollProjects: React.FC<ScrollProjectsProps> = ({
  onSelectProject,
  onActivateModel,
  activeModel
}) => {
  const [filter, setFilter] = useState<string>('all');

  const filteredProjects = TARUN_PROJECTS.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'security') return p.category.includes('Security') || p.category.includes('SecOps');
    if (filter === 'ai') return p.category.includes('AI') || p.category.includes('Vision');
    if (filter === 'mobile-iot') return p.category.includes('Mobile') || p.category.includes('IoT') || p.category.includes('Algorithmic');
    return true;
  });

  return (
    <section id="showcase" className="relative z-20 w-full max-w-6xl mx-auto px-4 md:px-8 py-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-mono-code mb-2">
            <span>01</span>
            <span>/</span>
            <span>ENGINEERING PORTFOLIO</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight">
            Featured Systems & Applications.
          </h2>
          <p className="mt-3 text-base text-slate-400 max-w-2xl">
            Real-world systems spanning Cybersecurity, AI agents, mobile applications, and cloud architecture. Click any project to inspect technical details and switch the 3D viewport.
          </p>
        </div>

        {/* Filter controls conforming to zero-pill rules (functional segmented buttons) */}
        <div className="flex items-center gap-1 p-1 bg-white/5 border border-white/10 rounded-xl">
          <button
            onClick={() => {
              sound.playClick();
              setFilter('all');
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              filter === 'all' ? 'bg-amber-400 text-black shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            All ({TARUN_PROJECTS.length})
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setFilter('security');
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              filter === 'security' ? 'bg-amber-400 text-black shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Cybersecurity
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setFilter('ai');
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              filter === 'ai' ? 'bg-amber-400 text-black shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            AI & Agents
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setFilter('mobile-iot');
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              filter === 'mobile-iot' ? 'bg-amber-400 text-black shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Mobile & IoT
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map(project => {
          const isActive = activeModel === project.modelTarget;
          return (
            <div
              key={project.id}
              onClick={() => {
                sound.playClick();
                onActivateModel(project.modelTarget);
              }}
              className={`group relative p-6 md:p-8 rounded-2xl border transition-all cursor-pointer backdrop-blur-xl ${
                isActive
                  ? 'bg-zinc-900/90 border-amber-400/60 shadow-[0_0_30px_rgba(251,191,36,0.12)]'
                  : 'bg-zinc-950/70 border-white/10 hover:border-white/25 hover:bg-zinc-900/60'
              }`}
            >
              {/* Top metadata */}
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono-code mb-4">
                <span>{project.client}</span>
                <span>{project.year}</span>
              </div>

              {/* Title & subtitle */}
              <h3 className="font-display text-2xl font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors mb-1">
                {project.title}
              </h3>
              <p className="text-xs text-slate-400 font-medium mb-4">{project.subtitle}</p>

              {/* Description */}
              <p className="text-sm text-slate-300 leading-relaxed mb-6">{project.description}</p>

              {/* Tech Stack list (clean unboxed text with separators) */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-amber-300/90 font-mono-code mb-5">
                {project.technologies.map((tech, idx) => (
                  <React.Fragment key={idx}>
                    <span>{tech}</span>
                    {idx < project.technologies.length - 1 && <span className="text-white/20">·</span>}
                  </React.Fragment>
                ))}
              </div>

              {/* Key metrics list */}
              <div className="space-y-1.5 py-4 border-y border-white/10 mb-6 text-xs text-slate-300 font-mono-code">
                {project.metrics.slice(0, 3).map((metric, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>{metric}</span>
                  </div>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    sound.playClick();
                    onActivateModel(project.modelTarget);
                  }}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                    isActive
                      ? 'bg-amber-400 text-black border-amber-400'
                      : 'bg-white/5 text-slate-300 border-white/10 hover:text-white'
                  }`}
                >
                  {isActive ? '● Active in 3D Viewport' : 'Switch 3D Viewport'}
                </button>

                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    sound.playClick();
                    onSelectProject(project);
                  }}
                  className="flex items-center gap-1.5 text-xs font-semibold text-white group-hover:text-amber-300 transition-colors"
                >
                  <span>Full Architecture</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Technical Skills Section */}
      <div id="skills" className="mt-28 pt-16 border-t border-white/10">
        <div className="flex items-center gap-2 text-xs text-amber-400 font-mono-code mb-2">
          <span>02</span>
          <span>/</span>
          <span>TECHNICAL ARSENAL</span>
        </div>
        <h2 className="font-display text-3xl font-bold text-white tracking-tight mb-8">
          Core Competencies & Technologies
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Col 1: Cybersecurity */}
          <div className="p-6 rounded-2xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono-code mb-3">
              <Shield className="w-4 h-4" />
              <span>CYBERSECURITY & DEFENSE</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>Network Security & Protocol Analysis</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>Vulnerability Assessment & Pen-testing</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>Threat Detection & Security Monitoring</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>Linux Hardening & Ethical Hacking</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>OWASP Top 10 & AppSec Best Practices</span>
              </li>
            </ul>
          </div>

          {/* Col 2: AI & Software Engineering */}
          <div className="p-6 rounded-2xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-xs text-amber-400 font-mono-code mb-3">
              <Bot className="w-4 h-4" />
              <span>AI & SOFTWARE DEVELOPMENT</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>AI Agents & Intelligent Automation</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Python, Java, Kotlin, JavaScript, SQL</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>FastAPI, Node.js, Express, REST APIs</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>React.js, Vite, Tailwind CSS</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Android Development (Jetpack Compose)</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Cloud & Tools */}
          <div className="p-6 rounded-2xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono-code mb-3">
              <Cloud className="w-4 h-4" />
              <span>CLOUD, DEVOPS & TOOLS</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Amazon Web Services (S3, CloudFront, IAM)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Firebase (Firestore, Storage, Auth)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Kali Linux, Ubuntu, VirtualBox</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Postman, Cisco Packet Tracer, Git</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Docker Fundamentals & MetaTrader 5</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Certifications & Professional Accreditations */}
      <div id="certifications" className="mt-28 pt-16 border-t border-white/10">
        <div className="flex items-center gap-2 text-xs text-amber-400 font-mono-code mb-2">
          <span>03</span>
          <span>/</span>
          <span>CERTIFICATIONS & RECOGNITION</span>
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight mb-8">
          Verified Credentials & Accreditations
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
            <Award className="w-5 h-5 text-amber-400 mb-2" />
            <h4 className="font-display text-sm font-bold text-white">Oracle</h4>
            <p className="text-xs text-slate-300 mt-1">Agentic AI Foundations Associate</p>
          </div>
          <div className="p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
            <ShieldCheck className="w-5 h-5 text-cyan-400 mb-2" />
            <h4 className="font-display text-sm font-bold text-white">CompTIA</h4>
            <p className="text-xs text-slate-300 mt-1">Security+ Certification</p>
          </div>
          <div className="p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
            <Lock className="w-5 h-5 text-emerald-400 mb-2" />
            <h4 className="font-display text-sm font-bold text-white">EC-Council / ISO</h4>
            <p className="text-xs text-slate-300 mt-1">Certified Ethical Hacker (CEHv13)</p>
          </div>
          <div className="p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
            <Terminal className="w-5 h-5 text-violet-400 mb-2" />
            <h4 className="font-display text-sm font-bold text-white">Cisco Networking</h4>
            <p className="text-xs text-slate-300 mt-1">Packet Tracer & Network Foundations</p>
          </div>
          <div className="p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
            <Shield className="w-5 h-5 text-rose-400 mb-2" />
            <h4 className="font-display text-sm font-bold text-white">Cybersecurity</h4>
            <p className="text-xs text-slate-300 mt-1">Intro to Cybersecurity & Defense</p>
          </div>
          <div className="p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
            <Award className="w-5 h-5 text-amber-300 mb-2" />
            <h4 className="font-display text-sm font-bold text-white">Google</h4>
            <p className="text-xs text-slate-300 mt-1">TechSpirit Certification</p>
          </div>
        </div>
      </div>
    </section>
  );
};
