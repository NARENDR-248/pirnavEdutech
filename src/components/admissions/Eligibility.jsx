import { motion } from "framer-motion";
import { FiTrendingUp, FiBriefcase, FiAward, FiActivity } from "react-icons/fi";

export default function Eligibility() {
  const cards = [
    { icon: <FiTrendingUp className="text-blue-400" />, type: "Freshers", desc: "Kickstart your professional track utilizing intensive workflows tailored to high-demand engineering expectations." },
    { icon: <FiBriefcase className="text-purple-400" />, type: "Working Professionals", desc: "Upskill seamlessly. Scale horizontal cross-discipline competencies or accelerate leadership promotions." },
    { icon: <FiAward className="text-emerald-400" />, type: "College Students", desc: "Acquire specialized job-ready skills concurrently, positioning above market baselines ahead of graduation." },
    { icon: <FiActivity className="text-rose-400" />, type: "Career Switchers", desc: "Engineer clean architectural career shifts into foundational or highly specialized modern tech tracks smoothly." },
  ];

  return (
    <section className="max-w-[1400px] mx-auto px-4 lg:px-8 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Who Can Apply?</h2>
        <p className="text-slate-400">Flexible cohorts mapped purposefully across various experiential vectors.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div
            key={i}
            className="group relative rounded-2xl p-6 border border-slate-800 bg-gradient-to-b from-slate-900/40 to-slate-950/60 transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_25px_rgba(59,130,246,0.08)]"
          >
            <div className="text-3xl mb-4 transform group-hover:scale-110 transition-transform duration-200">{card.icon}</div>
            <h3 className="text-lg font-bold text-white mb-2">{card.type}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}