import React, { useState } from 'react';
import { 
  FiCode, 
  FiCpu, 
  FiAward, 
  FiCloud, 
  FiDatabase, 
  FiLayers,
  FiChevronRight 
} from 'react-icons/fi';

// ─── Reusable Component Data ──────────────────────────────────────────────────

const TABS = [
  { id: 'dotnet', label: '.NET Platform', icon: FiLayers },
  { id: 'aiml', label: 'AI/ML & Gen AI', icon: FiCpu },
  { id: 'career', label: 'Career & Leadership', icon: FiAward },
  { id: 'devops', label: 'Cloud & DevOps', icon: FiCloud },
  { id: 'java', label: 'Java Platform', icon: FiDatabase },
  { id: 'frontend', label: 'JS & Front-end', icon: FiCode },
];

const COURSE_DATA = {
  java: [
    {
      id: 'j1',
      title: 'Data Structures and Algorithms Training',
      desc: 'Master foundational computer science matrices, complex sorting algorithms, and system optimized balance trees.',
      icon: FiLayers,
      iconGradient: 'from-purple-500/20 to-indigo-600/20 text-purple-400 border-purple-500/30'
    },
    {
      id: 'j2',
      title: 'Java Microservices Certification Training',
      desc: 'Build scalable distributed systems using Spring Boot, Spring Cloud, Docker, and reactive architecture frameworks.',
      icon: FiDatabase,
      iconGradient: 'from-emerald-500/20 to-teal-600/20 text-emerald-400 border-emerald-500/30'
    }
  ],
  dotnet: [
    {
      id: 'd1',
      title: 'Enterprise .NET Core Architecture',
      desc: 'Deep dive into Clean Architecture, Web API optimization, and secure entity frameworks for high-throughput enterprise scale.',
      icon: FiLayers,
      iconGradient: 'from-blue-500/20 to-cyan-600/20 text-blue-400 border-blue-500/30'
    }
  ],
  aiml: [], // Add records over time to dynamically scale UI layout
  career: [],
  devops: [],
  frontend: []
};

// ─── Sub-Components ──────────────────────────────────────────────────────────

function CourseCard({ course }) {
  const Icon = course.icon;
  return (
    <div className="group relative flex flex-col sm:flex-row items-start gap-5 p-5 rounded-2xl bg-slate-900/30 border border-white/[0.05] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] backdrop-blur-md transition-all duration-300 will-change-transform hover:scale-[1.02] hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] cursor-pointer">
      
      {/* Icon Wrapper */}
      <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br border flex items-center justify-center shadow-inner transition-transform duration-300 group-hover:scale-105 ${course.iconGradient}`}>
        <Icon className="w-6 h-6" />
      </div>

      {/* Card Content Text */}
      <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
        <div>
          <h4 className="text-base font-bold text-white tracking-tight mb-1.5 transition-colors duration-200 group-hover:text-cyan-400 line-clamp-1">
            {course.title}
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed tracking-wide line-clamp-2 mb-4">
            {course.desc}
          </p>
        </div>

        {/* CTA Outline Button */}
        <div className="inline-flex">
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-slate-300 border border-white/10 transition-all duration-300 bg-white/[0.01] hover:text-white hover:border-cyan-400/50 hover:bg-cyan-500/5 hover:shadow-[0_0_15px_rgba(6,182,212,0.1)]">
            <span>More Details</span>
            <FiChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function SkillTracksSection() {
  const [activeTab, setActiveTab] = useState('java');

  const activeCourses = COURSE_DATA[activeTab] || [];

  return (

    <section className="relative w-full bg-[#020b14] text-white pt-10 pb-4 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans">

      
      {/* Aurora Ambient Glow Overlays */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none select-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none select-none" />
      
      {/* Decorative Star Particles */}
      <div className="absolute top-20 left-[15%] w-1 h-1 bg-white/40 rounded-full animate-pulse" />
      <div className="absolute bottom-40 right-[12%] w-1.5 h-1.5 bg-cyan-400/30 rounded-full animate-ping [animation-duration:3s]" />
      <div className="absolute top-1/2 right-[8%] w-1 h-1 bg-blue-400/40 rounded-full animate-pulse [animation-duration:2s]" />

      <div className="w-full max-w-5xl mx-auto flex flex-col items-center relative z-10">
        
        {/* Section Heading Panel */}
        <div className="flex flex-col items-center text-center mb-10 group">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-2 select-none">
            Skill Tracks
          </h2>
          <div className="h-0.5 w-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300 group-hover:w-28 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
        </div>

        {/* Tab Selection Filter Container */}
        <div className="w-full p-2 mb-12 rounded-2xl bg-slate-950/40 border border-white/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.6)] backdrop-blur-xl overflow-x-auto scrollbar-none">
          <div className="flex items-center justify-between gap-1.5 min-w-max md:min-w-0 w-full">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-b from-white/[0.07] to-white/[0.02] text-cyan-400 border border-cyan-400/40 shadow-[0_0_20px_rgba(6,182,212,0.15)] ring-1 ring-cyan-400/20'
                      : 'text-slate-400 border border-transparent hover:text-slate-200 hover:bg-white/[0.02]'
                  }`}
                >
                  <tab.icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Courses Presentation Grid */}
        <div className="w-full min-h-[220px]">
          {activeCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 transition-all duration-300">
              {activeCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="w-full py-16 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-2xl bg-slate-950/10 backdrop-blur-xs">
              <FiCode className="w-8 h-8 text-slate-600 mb-2 stroke-[1.5]" />
              <p className="text-sm text-slate-500 font-medium">
                New cohorts forming soon for this track. Check back shortly!
              </p>
            </div>
          )}
        </div>

        {/* Global Catalog Footer Action */}
        <div className="mt-0">
          <button className="group relative flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-sm font-bold tracking-wide text-slate-950 shadow-[0_4px_20px_rgba(6,182,212,0.25)] transition-all duration-300 transform will-change-transform hover:-translate-y-0.5 hover:shadow-[0_6px_25px_rgba(6,182,212,0.4)] active:scale-[0.98]">
            <span className="text-white">Explore All Live Training</span>
            <div className="flex items-center text-white/80 group-hover:translate-x-0.5 transition-transform duration-200">
              <FiChevronRight className="w-4 h-4 -mr-1" />
              <FiChevronRight className="w-4 h-4" />
            </div>
          </button>
        </div>

      </div>
    </section>
  );
}