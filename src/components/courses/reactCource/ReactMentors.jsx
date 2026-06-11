import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MessageCircle, ArrowRight, BadgeCheck } from "lucide-react";

const mentorsData = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "AI Research Scientist",
    company: "Google",
    experience: "10+ Years",
    desc: "Expert in Machine Learning & Deep Learning systems.",
  },
  {
    id: 2,
    name: "Rahul Sharma",
    role: "Senior React Engineer",
    company: "Microsoft",
    experience: "8+ Years",
    desc: "Specialist in React, Next.js & scalable UI systems.",
  },
  {
    id: 3,
    name: "Priya Verma",
    role: "Data Scientist",
    company: "Amazon",
    experience: "7+ Years",
    desc: "Works on AI models, analytics & prediction systems.",
  },
  {
    id: 4,
    name: "Amit Kumar",
    role: "Full Stack Engineer",
    company: "Netflix",
    experience: "9+ Years",
    desc: "Builds high-performance web applications at scale.",
  },
];

const ReactMentors = () => {
  const [active, setActive] = useState(1);
  const navigate = useNavigate();

  const selectedMentor = mentorsData.find((m) => m.id === active);

  return (
    <section className="relative py-14 bg-[#020617] overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/10 blur-[120px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white">
            Meet Our Mentors
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Learn from industry experts working at top companies
          </p>
        </div>

        {/* Layout */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* LEFT LIST */}
          <div className="space-y-3">
            {mentorsData.map((mentor) => (
              <motion.div
                key={mentor.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setActive(mentor.id)}
                className={`
                  cursor-pointer
                  p-3 rounded-xl
                  border
                  transition-all
                  backdrop-blur-xl
                  ${
                    active === mentor.id
                      ? "bg-white/10 border-cyan-400"
                      : "bg-white/5 border-white/10"
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <BadgeCheck
                    className={`w-4 h-4 ${
                      active === mentor.id ? "text-cyan-400" : "text-slate-500"
                    }`}
                  />
                  <p className="text-white text-sm font-medium">
                    {mentor.name}
                  </p>
                </div>

                <p className="text-xs text-slate-400 ml-6">
                  {mentor.role}
                </p>
              </motion.div>
            ))}
          </div>

          {/* RIGHT DETAILS CARD */}
          <motion.div
            key={selectedMentor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="
              md:col-span-2
              p-6 rounded-2xl
              bg-white/5
              border border-white/10
              backdrop-blur-xl
              relative
              overflow-hidden
            "
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10" />

            <div className="relative z-10">

              <div className="flex justify-between items-start">

                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {selectedMentor.name}
                  </h3>

                  <p className="text-cyan-400 text-sm mt-1">
                    {selectedMentor.role} @ {selectedMentor.company}
                  </p>

                  <p className="text-slate-400 text-sm mt-3">
                    {selectedMentor.desc}
                  </p>

                  <p className="text-xs text-slate-500 mt-2">
                    Experience: {selectedMentor.experience}
                  </p>
                </div>

                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
                  <MessageCircle className="text-white w-5 h-5" />
                </div>

              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-6">

                <button
                  onClick={() => navigate("/contact")}
                  className="
                    px-5 py-2
                    rounded-xl
                    bg-gradient-to-r from-cyan-500 to-blue-600
                    text-white text-sm
                    hover:scale-105 transition
                  "
                >
                  Book Mentorship
                </button>

                <button
                  onClick={() => navigate("/ai-curriculum")}
                  className="
                    px-5 py-2
                    rounded-xl
                    border border-white/10
                    bg-white/5
                    text-white text-sm
                    hover:bg-white/10 transition
                    flex items-center gap-2
                  "
                >
                  View Curriculum
                  <ArrowRight size={14} />
                </button>

              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ReactMentors;