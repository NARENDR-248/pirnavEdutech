import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  Brain,
  ArrowRight,
  Sparkles,
  Building,
} from "lucide-react";

import { FaLinkedin } from "react-icons/fa";

const mentors = [
  {
    name: "Dr. Sarah Johnson",
    role: "AI Research Scientist",
    company: "OpenAI",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800",
    expertise: "LLMs & Generative AI",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Michael Chen",
    role: "Machine Learning Lead",
    company: "Google",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43d?w=800",
    expertise: "Deep Learning",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Priya Sharma",
    role: "Data Science Manager",
    company: "Microsoft",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800",
    expertise: "AI Products",
    linkedin: "https://linkedin.com",
  },
  {
    name: "David Wilson",
    role: "AI Solutions Architect",
    company: "Amazon",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800",
    expertise: "Cloud AI",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Ananya Reddy",
    role: "Computer Vision Engineer",
    company: "Meta",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800",
    expertise: "Computer Vision",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Rahul Kumar",
    role: "NLP Specialist",
    company: "NVIDIA",
    image:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=800",
    expertise: "Natural Language Processing",
    linkedin: "https://linkedin.com",
  },
];

const AiMentores = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-28 overflow-hidden bg-[#030712]">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[160px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/10 blur-[160px]" />
      <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] bg-blue-500/5 blur-[200px] -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 backdrop-blur-xl text-cyan-300 text-sm font-medium">
            <Sparkles size={16} />
            Learn From Industry Experts
          </div>

          <h2 className="mt-6 text-5xl md:text-6xl font-bold text-white">
            Meet Your
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              AI Mentors
            </span>
          </h2>

          <p className="max-w-3xl mx-auto mt-6 text-slate-400 text-lg">
            Learn directly from AI researchers, ML engineers, and industry
            leaders working at top global technology companies.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 text-center">
            <h3 className="text-4xl font-bold text-cyan-400">50+</h3>
            <p className="text-slate-400 mt-2">Mentors</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 text-center">
            <h3 className="text-4xl font-bold text-blue-400">15+</h3>
            <p className="text-slate-400 mt-2">Companies</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 text-center">
            <h3 className="text-4xl font-bold text-purple-400">12+</h3>
            <p className="text-slate-400 mt-2">Years Exp</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 text-center">
            <h3 className="text-4xl font-bold text-emerald-400">100%</h3>
            <p className="text-slate-400 mt-2">Industry Ready</p>
          </div>

        </div>

        {/* Mentor Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {mentors.map((mentor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="
                group
                overflow-hidden
                rounded-[32px]
                border border-white/10
                bg-white/[0.04]
                backdrop-blur-2xl
                hover:border-cyan-400/30
                transition-all duration-500
              "
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/40 to-transparent" />

                <div className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center">
                  <Brain className="text-cyan-400" size={22} />
                </div>
              </div>

              <div className="p-6">

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs">
                  <Building size={14} />
                  {mentor.company}
                </div>

                <h3 className="mt-4 text-2xl font-bold text-white">
                  {mentor.name}
                </h3>

                <p className="text-slate-300 mt-1">
                  {mentor.role}
                </p>

                <p className="text-cyan-400 text-sm mt-3">
                  {mentor.expertise}
                </p>

                <div className="flex gap-3 mt-6">

                  <button
                    onClick={() =>
                      window.open(mentor.linkedin, "_blank")
                    }
                    className="
                      flex-1
                      py-3
                      rounded-xl
                      border border-white/10
                      bg-white/5
                      text-white
                      flex items-center
                      justify-center
                      gap-2
                      hover:bg-white/10
                      transition
                    "
                  >
                    <FaLinkedin />
                    LinkedIn
                  </button>

                  <button
                    onClick={() => navigate("/contact")}
                    className="
                      flex-1
                      py-3
                      rounded-xl
                      bg-gradient-to-r
                      from-cyan-500
                      to-blue-600
                      text-white
                      font-semibold
                      flex items-center
                      justify-center
                      gap-2
                      hover:scale-105
                      transition
                    "
                  >
                    Connect
                    <ArrowRight size={16} />
                  </button>

                </div>

              </div>
            </motion.div>
          ))}

        </div>

        {/* CTA */}
        <div className="text-center mt-20">

          <button
            onClick={() => navigate("/contact")}
            className="
              px-10
              py-5
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              via-blue-500
              to-purple-600
              text-white
              font-semibold
              shadow-[0_20px_60px_rgba(59,130,246,0.35)]
              hover:scale-105
              transition-all
            "
          >
            Book a Mentor Session →
          </button>

        </div>

      </div>
    </section>
  );
};

export default AiMentores;