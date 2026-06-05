import { motion } from "framer-motion";
import { FaReact, FaPlay } from "react-icons/fa";

const ReactHeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-slate-950 text-white overflow-hidden">

      {/* 🔥 Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 blur-[120px] rounded-full top-[-100px] left-[-100px]"></div>
      <div className="absolute w-[400px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full bottom-[-100px] right-[-100px]"></div>

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center z-10">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Become a <span className="text-cyan-400">React Developer</span> <br />
            & Get Hired in <span className="text-blue-500">90 Days 🚀</span>
          </h1>

          <p className="mt-6 text-slate-400 text-lg">
            Master React with real-world projects, mentorship, and job-ready skills.
            Join thousands of students placed in top tech companies.
          </p>

          {/* CTA BUTTONS */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 font-semibold hover:scale-105 transition">
              Enroll Now
            </button>

            <button className="px-6 py-3 rounded-xl border border-white/20 flex items-center gap-2 hover:bg-white/10 transition">
              <FaPlay /> Watch Demo
            </button>
          </div>

          {/* STATS */}
          <div className="mt-10 flex gap-8 text-sm">
            <div>
              <h3 className="text-2xl font-bold text-cyan-400">5K+</h3>
              <p className="text-slate-400">Students</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-blue-500">95%</h3>
              <p className="text-slate-400">Placement Rate</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-purple-400">₹8 LPA</h3>
              <p className="text-slate-400">Avg Salary</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT CARD (GLASS UI) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">

            <div className="flex items-center gap-3 mb-6">
              <FaReact className="text-cyan-400 text-3xl animate-spin-slow" />
              <h3 className="text-xl font-semibold">React Bootcamp</h3>
            </div>

            <ul className="space-y-3 text-slate-300">
              <li>✔ 30+ Real Projects</li>
              <li>✔ Live Mentorship</li>
              <li>✔ Resume + Interview Prep</li>
              <li>✔ Job Assistance</li>
            </ul>

            <button className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 font-semibold hover:scale-105 transition">
              Start Learning →
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReactHeroSection;