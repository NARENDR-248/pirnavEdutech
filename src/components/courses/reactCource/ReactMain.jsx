import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaReact,
  FaPlay,
  FaGoogle,
  FaAmazon,
  FaMicrosoft,
} from "react-icons/fa";
import Navbar from "../../common/Navbar";
import Footer from "../../common/Footer";


const ReactMain = () => {
  const [open, setOpen] = useState(null);

  return (
    <>
    <Navbar />
    <div className="bg-[#020617] text-white overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center">

        {/* Glow */}
        <div className="absolute w-[600px] h-[600px] bg-cyan-500/20 blur-[140px] top-[-150px] left-[-150px]" />
        <div className="absolute w-[500px] h-[500px] bg-purple-600/20 blur-[140px] bottom-[-150px] right-[-150px]" />

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center z-10">

          {/* LEFT */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl font-extrabold leading-tight">
              Crack Top Tech Jobs <br />
              with <span className="text-cyan-400">React Mastery 🚀</span>
            </h1>

            <p className="mt-6 text-slate-400 text-lg">
              Learn from industry experts. Build production apps.
              Get hired with confidence.
            </p>

            <div className="mt-8 flex gap-4">
              <button className="px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 font-semibold hover:scale-105 transition">
                Enroll Now
              </button>

              <button className="px-7 py-3 border border-white/20 rounded-xl flex items-center gap-2 hover:bg-white/10">
                <FaPlay /> Watch Demo
              </button>
            </div>

            {/* STATS */}
            <div className="mt-12 flex gap-10">
              {[
                ["5K+", "Students"],
                ["95%", "Placement"],
                ["₹8LPA", "Avg Salary"],
              ].map((s, i) => (
                <div key={i}>
                  <h3 className="text-3xl font-bold text-cyan-400">{s[0]}</h3>
                  <p className="text-slate-400">{s[1]}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT CARD */}
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">

              <div className="flex items-center gap-3 mb-6">
                <FaReact className="text-cyan-400 text-4xl" />
                <h3 className="text-xl font-semibold">React Bootcamp</h3>
              </div>

              <ul className="space-y-3 text-slate-300">
                <li>✔ 30+ Projects</li>
                <li>✔ Live Mentorship</li>
                <li>✔ Resume + Interview Prep</li>
                <li>✔ Job Assistance</li>
              </ul>

              <button className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 hover:scale-105 transition">
                Start Learning →
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= TRUST LOGOS ================= */}
      <section className="py-16 border-y border-white/10 text-center">
        <p className="text-slate-400 mb-6">Students placed at</p>

        <div className="flex justify-center gap-10 text-3xl opacity-70">
          <FaGoogle />
          <FaAmazon />
          <FaMicrosoft />
        </div>
      </section>

      {/* ================= PROJECTS ================= */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          Build Production Projects
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {["Netflix Clone", "E-Commerce Platform", "Admin Dashboard"].map(
            (p, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -12 }}
                className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-400/30 transition"
              >
                <h3 className="text-xl font-semibold">{p}</h3>
                <p className="text-slate-400 mt-3">
                  Build scalable real-world applications.
                </p>
              </motion.div>
            )
          )}
        </div>
      </section>

      {/* ================= CURRICULUM ================= */}
      <section className="py-24 bg-[#020617]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            Structured Learning Path
          </h2>

          <div className="space-y-8">
            {[
              "JavaScript Deep Dive",
              "React Core Concepts",
              "Hooks + Routing",
              "State Management",
              "Advanced Patterns",
              "Projects + Deployment",
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-xl bg-white/5 border border-white/10"
              >
                Phase {i + 1}: {item}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          Success Stories
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            "Got 8LPA React job!",
            "Best mentorship program!",
            "Real projects helped me crack interviews",
          ].map((t, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
            >
              "{t}"
            </div>
          ))}
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="py-24 bg-[#020617]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">FAQs</h2>

          {[
            ["Do I need JS?", "Yes, basics required."],
            ["Projects included?", "Yes, many real apps."],
            ["Placement help?", "Full support provided."],
          ].map((f, i) => (
            <div
              key={i}
              onClick={() => setOpen(open === i ? null : i)}
              className="p-5 mb-4 rounded-xl bg-white/5 border border-white/10 cursor-pointer"
            >
              <h3>{f[0]}</h3>
              {open === i && (
                <p className="text-slate-400 mt-2">{f[1]}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-24 text-center">
        <h2 className="text-4xl font-bold">
          Ready to Become a React Developer?
        </h2>

        <button className="mt-8 px-10 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-lg font-semibold hover:scale-105 transition">
          Enroll Now 🚀
        </button>
      </section>
    </div>
    <Footer />
        </>
  );
};

export default ReactMain;