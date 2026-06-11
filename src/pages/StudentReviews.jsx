import React from "react";
import { FaLinkedinIn, FaStar, FaQuoteRight } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

const TESTIMONIALS_DATA = [
  {
    id: "review-1",
    text: "Shailendra sir has in-depth and sound knowledge of .NET and related stack. His way of conducting sessions and handling doubts/queries is awesome. The assignments and videos are also very helpful to enhance .NET skills.",
    name: "Sameer Vyas",
    role: "Technical Lead",
    company: "Wipro",
    rating: "5.00",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    linkedinUrl: "https://linkedin.com",
  },
  {
    id: "review-2",
    text: "I joined Full Stack .NET Development Training to upgrade my web technology skills. The training experience was excellent and the teaching methodology was simple, effective, and highly practical.",
    name: "Priyanka Kulkarni",
    role: "Technical Lead",
    company: "Lumedx",
    rating: "5.00",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
    linkedinUrl: "https://linkedin.com",
  },
  {
    id: "review-3",
    text: "It was an excellent experience learning MERN Stack. Live sessions, recordings, projects, and mentor support helped me gain confidence and improve my development skills significantly.",
    name: "Gulam Simnani Qureshi",
    role: "UI Developer",
    company: "CRMnext",
    rating: "5.00",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    linkedinUrl: "https://linkedin.com",
  },
];

export default function StudentReviews() {
  return (
    <section className="relative w-full bg-[#020b14] text-slate-100 py-12 lg:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans">
      
      {/* Premium Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-cyan-500/8 blur-[180px]" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-500/8 blur-[180px]" />

        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-cyan-400/5 blur-[150px]" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Floating Particles */}
      <div className="absolute top-20 left-[10%] w-1 h-1 bg-cyan-400/40 rounded-full animate-pulse" />
      <div className="absolute top-1/3 right-[15%] w-1.5 h-1.5 bg-blue-400/40 rounded-full animate-ping" />
      <div className="absolute bottom-1/4 left-[20%] w-1 h-1 bg-white/30 rounded-full animate-pulse" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 border-b border-white/5 pb-5">
          
          <div className="text-center sm:text-left">
            <span className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-xs font-semibold text-cyan-400">
              Student Testimonials
            </span>

            <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
              <span className="text-white">Student</span>{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Success Stories
              </span>
            </h2>

            <p className="mt-4 max-w-2xl text-slate-400 text-sm md:text-base">
              Discover how our students transformed their careers through
              industry-focused training, mentorship, and real-world projects.
            </p>
          </div>

          <button className="group flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-400 transition-all hover:border-cyan-400/40 hover:bg-cyan-400/15">
            View All Reviews
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-cyan-400/40 hover:shadow-[0_20px_60px_rgba(6,182,212,0.15)]"
            >
              {/* Glow Effect */}
              <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Rating */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className="text-amber-400 text-xs drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]"
                    />
                  ))}
                  <span className="ml-2 text-xs font-bold text-slate-400">
                    ({item.rating})
                  </span>
                </div>

                <FaQuoteRight className="text-4xl text-cyan-400/10 transition-all duration-300 group-hover:scale-110 group-hover:text-cyan-400/20" />
              </div>

              {/* Review Text */}
              <p className="mb-8 text-sm leading-7 text-slate-300 transition-colors duration-300 group-hover:text-slate-100">
                "{item.text}"
              </p>

              {/* Divider */}
              <div className="mb-5 h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

              {/* Profile */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-12 w-12 overflow-hidden rounded-full border border-white/10">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <h4 className="truncate text-sm font-bold text-white group-hover:text-cyan-400">
                      {item.name}
                    </h4>

                    <p className="truncate text-xs text-slate-400">
                      {item.role}{" "}
                      <span className="font-medium text-cyan-400">
                        @ {item.company}
                      </span>
                    </p>
                  </div>
                </div>

                <a
                  href={item.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 transition-all hover:border-[#0077B5] hover:bg-[#0077B5] hover:text-white"
                >
                  <FaLinkedinIn className="text-xs" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}