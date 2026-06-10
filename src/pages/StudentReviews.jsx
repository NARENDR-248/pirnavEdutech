import React from 'react';
import { FaLinkedinIn, FaStar, FaQuoteRight } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';

// Mock Testimonial Data Contract Matching Your UI Mockup exactly
const TESTIMONIALS_DATA = [
  {
    id: 'review-1',
    text: 'Shailendra sir has in-depth and sound knowledge of .NET and related stack. His way of conducting sessions and handling doubts/queries is awesome. And the staff are awesome they are eager to help that’s sounds Great. All the assignments and videos are also very helpful to enhance .NET...',
    name: 'Sameer Vyas',
    role: 'Technical Lead',
    company: 'Wipro',
    rating: '5.00',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    linkedinUrl: 'https://linkedin.com'
  },
  {
    id: 'review-2',
    text: 'I have joined the Full Stack .NET Development Training to upgrade web technologies skills and It was a great experience getting training with ScholarHat. Thanks to Trainer for his simple and effective technique of teaching. He is a very experienced and knowledgeable professional....',
    name: 'Priyanka Kulkarni',
    role: 'Technical Lead',
    company: 'Lumedx',
    rating: '5.00',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    linkedinUrl: 'https://linkedin.com'
  },
  {
    id: 'review-3',
    text: 'It was an excellent experience to learn MERN Stack training from ScholarHat. The courses are top rate and the best part is live instruction, with playback. DNT is one of the modern platforms to learn and equip in the IT Market. I have learned a lot from this training. And really helped to...',
    name: 'Gulam Simnani Qureshi',
    role: 'UI Developer',
    company: 'CRMnext',
    rating: '5.00',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    linkedinUrl: 'https://linkedin.com'
  }
];

export default function StudentReviews() {
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-b from-[#061C2D] to-[#0B2E4A] text-slate-100 flex flex-col items-center justify-center py-24 px-4 sm:px-6 lg:px-8 overflow-hidden antialiased font-sans">
      
      {/* Premium Ambient Background Aurora/Glow maps */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-cyan-500/10 blur-[140px] pointer-events-none select-none" />
      <div className="absolute bottom-24 left-10 w-[450px] h-[450px] rounded-full bg-blue-600/10 blur-[160px] pointer-events-none select-none" />
      
      {/* Ambient Floating Particle Micro-details */}
      <div className="absolute top-1/4 left-[8%] w-1 h-1 bg-white/20 rounded-full animate-pulse duration-3000" />
      <div className="absolute top-1/3 right-[15%] w-1.5 h-1.5 bg-cyan-400/20 rounded-full animate-ping duration-[4000ms]" />
      <div className="absolute bottom-1/4 left-[18%] w-1 h-1 bg-blue-400/30 rounded-full animate-pulse duration-2000" />

      <div className="w-full max-w-7xl mx-auto relative z-10">
        
        {/* Core Layout Header Node */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 mb-16 border-b border-white/[0.05] pb-8">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left group">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
              Our Students Review
            </h2>
            <div className="h-[3px] w-24 bg-gradient-to-r from-cyan-400 via-blue-500 to-transparent rounded-full transition-all duration-300 group-hover:w-44 shadow-[0_0_12px_rgba(34,211,238,0.6)]" />
          </div>

          <a 
            href="#reviews-catalog" 
            className="inline-flex items-center gap-1.5 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors duration-200 group"
          >
            <span>View All</span>
            <FiArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>

        {/* Responsive Layout Grid Presentation Layer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-fr">
          {TESTIMONIALS_DATA.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col justify-between h-full p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-white/[0.05] shadow-[0_12px_40px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.04)] backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/30 hover:-translate-y-1.5 hover:scale-[1.015] hover:shadow-[0_20px_45px_rgba(0,0,0,0.5),0_0_30px_rgba(6,182,212,0.15)] overflow-hidden"
            >
              {/* Radial Blur Backdrop layer activated uniquely on card hover */}
              <div className="absolute -top-16 -right-16 w-32 h-32 bg-cyan-500/5 blur-2xl rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none" />

              <div>
                {/* Micro Meta-Row Section */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  {/* Digital Star Matrix Wrapper */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, index) => (
                      <FaStar key={index} className="text-amber-400 text-xs drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]" />
                    ))}
                    <span className="text-xs font-bold text-slate-400 ml-2 tracking-wide">({item.rating})</span>
                  </div>

                  {/* Absolute Glass Low-Opacity Background Icon */}
                  <FaQuoteRight className="text-white/[0.03] text-4xl transform transition-all duration-300 group-hover:text-cyan-400/10 group-hover:scale-105" />
                </div>

                {/* Main Review Paragraph Blocks */}
                <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-normal tracking-wide mb-6 transition-colors duration-200 group-hover:text-slate-100">
                  "{item.text}"
                </p>
              </div>

              <div>
                {/* Structural Section Boundary Line */}
                <div className="w-full h-px bg-gradient-to-r from-white/[0.07] via-white/[0.02] to-transparent mb-5" />

                {/* Profile Identity Unit Layout */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Mirror-Frame Avatar Container */}
                    <div className="w-12 h-12 rounded-full border border-white/10 overflow-hidden bg-slate-950 transition-all duration-300 shrink-0 group-hover:scale-105 group-hover:border-cyan-400/40 shadow-inner">
                      <img 
                        src={item.avatar} 
                        alt={`${item.name} profile image avatar`} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Metadata Typography Core Stack */}
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-white tracking-tight line-clamp-1 transition-colors duration-200 group-hover:text-cyan-400">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {item.role} <span className="text-cyan-400/90 font-medium">@ {item.company}</span>
                      </p>
                    </div>
                  </div>

                  {/* LinkedIn Interactivity Module Button */}
                  <a 
                    href={item.linkedinUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={`Visit ${item.name}'s LinkedIn profile`}
                    className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#0077B5] hover:border-[#0077B5] transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,119,181,0.5)] active:scale-95 shrink-0"
                  >
                    <FaLinkedinIn className="text-xs" />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}