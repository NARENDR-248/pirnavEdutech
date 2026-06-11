import { motion } from "framer-motion";
import { FiMonitor, FiUsers, FiCpu, FiCompass, FiLayers, FiCheckCircle } from "react-icons/fi";

export default function WhyChooseUs() {
  const cards = [
    { icon: <FiMonitor />, title: "Live Instructor Led Classes", desc: "Interactive, real-time sessions featuring dynamic Q&As and direct personalized engagement." },
    { icon: <FiUsers />, title: "Industry Experts", desc: "Learn technical methodologies curated and taught by working professionals from tech giants." },
    { icon: <FiCpu />, title: "Real World Projects", desc: "Build comprehensive portfolios mapped to architectural demands of scale enterprise workflows." },
    { icon: <FiCompass />, title: "Career Mentorship", desc: "1:1 continuous career strategy alignment, mapping milestones directly to your desired roles." },
    { icon: <FiLayers />, title: "Mock Interviews", desc: "Rigorous technical mock drills replicating demanding interview parameters." },
    { icon: <FiCheckCircle />, title: "Placement Assistance", desc: "End-to-end full placement assistance with direct referral access via 500+ ecosystem hiring channels." },
  ];

  return (
    <section className="max-w-[1400px] mx-auto pt-4 md:pt-6 pb-16 px-4 lg:px-8 space-y-9">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Why Students Choose Us</h2>
        <p className="text-slate-400">Engineered to systematically advance your career through immersive upskilling architectures.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -8, scale: 1.01 }}
            className="group relative rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/60 to-slate-950/80 p-6 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]"
          >
            {/* Animated Hover Background Radial Light */}
            <div className="absolute inset-0 bg-radial-gradient from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            
            <div className="w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center text-xl text-blue-400 border border-slate-700/50 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-purple-500 group-hover:text-white group-hover:scale-110 transition-all duration-300 mb-5">
              {card.icon}
            </div>
            
            <h3 className="text-lg font-bold text-slate-100 mb-2 transition-colors group-hover:text-white">
              {card.title}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              {card.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}