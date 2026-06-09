import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaBrain, FaRobot } from "react-icons/fa";

import AiCourse from "./AiCourse";
import AiMentores from "./AiMentores";
import AiCurriculum from "./AiCurriculum";


import Navbar from "../../common/Navbar";
import Footer from "../../common/Footer";

const AiMain = () => {
  const [open, setOpen] = useState(null);

  return (
    <>
    <Navbar />
    <div className="bg-[#020617] text-white">

      {/* HERO */}
      <section className="min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">

          <div>
            <h1 className="text-5xl font-extrabold">
              Become an <span className="text-purple-400">AI Engineer 🤖</span>
            </h1>

            <p className="mt-6 text-slate-400">
              Learn Machine Learning, Deep Learning & Generative AI.
            </p>

            <button className="mt-8 px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-600 rounded-xl">
              Enroll Now
            </button>

            <div className="mt-10 flex gap-8">
              <div><h3 className="text-2xl text-purple-400">3K+</h3><p>Students</p></div>
              <div><h3 className="text-2xl text-pink-400">90%</h3><p>Placement</p></div>
              <div><h3 className="text-2xl text-indigo-400">₹12LPA</h3><p>Salary</p></div>
            </div>
          </div>

          <div className="p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
            <FaBrain className="text-4xl text-purple-400 mb-4" />
            <ul className="space-y-3 text-slate-300">
              <li>✔ Machine Learning</li>
              <li>✔ Deep Learning</li>
              <li>✔ NLP & GenAI</li>
              <li>✔ Real AI Projects</li>
            </ul>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="py-24 max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {["ChatGPT Clone", "AI Image Generator", "Recommendation System"].map((p, i) => (
          <motion.div key={i} whileHover={{ y: -10 }}
            className="p-6 bg-white/5 border border-white/10 rounded-xl">
            {p}
          </motion.div>
        ))}
      </section>

      {/* FAQ */}
      <section className="py-24 max-w-3xl mx-auto px-6">
        {[
          ["Need coding?", "Yes Python basics required."],
          ["AI projects?", "Yes real-world AI apps."],
        ].map((f, i) => (
          <div key={i} onClick={() => setOpen(open === i ? null : i)}
            className="p-5 mb-4 bg-white/5 border border-white/10 rounded-xl">
            {f[0]}
            {open === i && <p className="text-slate-400 mt-2">{f[1]}</p>}
          </div>
        ))}
      </section>
    </div>
    <AiCourse/>
    <AiMentores/>
    <AiCurriculum />
    <Footer/>

        </> 
  );
};

export default AiMain;