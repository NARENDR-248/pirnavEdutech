import { motion } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";

const features = [
  { title: "Live Classes", academy: true, others: false, note: "Mostly Recorded" },
  { title: "Structured Curriculum", academy: true, others: false, note: "Scattered Content" },
  { title: "1:1 Mentorship", academy: true, others: false },
  { title: "Placement Support", academy: true, others: false },
  { title: "Real Projects", academy: true, others: "limited" },
  { title: "Mock Interviews", academy: true, others: false },
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-[#020617] pt-4 pb-12 text-white">

      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <span className="inline-block rounded-full bg-cyan-500/10 border border-cyan-500/20 px-4 py-1 text-xs text-cyan-300">
            Why Choose Us
          </span>

          <h2 className="mt-4 text-3xl md:text-4xl font-bold">
            Compare Before You Decide
          </h2>

          <p className="mt-3 text-sm text-slate-400 max-w-xl mx-auto">
            Learn with structured curriculum, real projects, and mentorship-driven training.
          </p>
        </motion.div>

        {/* TABLE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
        >

          {/* Header Row */}
          <div className="grid grid-cols-3 bg-gradient-to-r from-cyan-600 to-blue-700 px-5 py-3 text-sm font-semibold">
            <div>Features</div>
            <div className="text-center">Our Academy</div>
            <div className="text-center">Others</div>
          </div>

          {/* Rows */}
          {features.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-3 items-center px-5 py-4 border-b border-white/5 hover:bg-white/5 transition"
            >
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                {item.note && (
                  <p className="text-xs text-slate-500">{item.note}</p>
                )}
              </div>

              <div className="flex justify-center">
                <CheckCircle className="text-emerald-400" size={18} />
              </div>

              <div className="flex justify-center">
                {item.others === false ? (
                  <XCircle className="text-red-400" size={18} />
                ) : (
                  <AlertTriangle className="text-yellow-400" size={18} />
                )}
              </div>
            </div>
          ))}
        </motion.div>

        {/* STATS */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 text-center"
          >
            <h3 className="text-2xl font-bold text-cyan-400">500+</h3>
            <p className="text-sm text-slate-400">Students Trained</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 text-center"
          >
            <h3 className="text-2xl font-bold text-cyan-400">95%</h3>
            <p className="text-sm text-slate-400">Placement Rate</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 text-center"
          >
            <h3 className="text-2xl font-bold text-cyan-400">50+</h3>
            <p className="text-sm text-slate-400">Industry Mentors</p>
          </motion.div>

        </div>

      </div>
    </section>
  );
}