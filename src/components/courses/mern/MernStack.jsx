import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaNodeJs, FaDatabase, FaReact } from "react-icons/fa";
import Navbar from "../../common/Navbar";
import Footer from "../../common/Footer";

const MernMain = () => {
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
              Become a <span className="text-green-400">MERN Stack Developer</span>
            </h1>

            <p className="mt-6 text-slate-400">
              Master MongoDB, Express, React & Node.js with real-world apps.
            </p>

            <button className="mt-8 px-6 py-3 bg-gradient-to-r from-green-400 to-emerald-600 rounded-xl">
              Enroll Now
            </button>

            <div className="mt-10 flex gap-8">
              <div><h3 className="text-2xl text-green-400">4K+</h3><p>Students</p></div>
              <div><h3 className="text-2xl text-emerald-400">92%</h3><p>Placement</p></div>
              <div><h3 className="text-2xl text-lime-400">₹7LPA</h3><p>Salary</p></div>
            </div>
          </div>

          <div className="p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
            <FaNodeJs className="text-4xl text-green-400 mb-4" />
            <ul className="space-y-3 text-slate-300">
              <li>✔ Full Stack Projects</li>
              <li>✔ REST APIs</li>
              <li>✔ MongoDB & Backend</li>
              <li>✔ Deployment</li>
            </ul>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="py-24 max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {["E-Commerce", "Social Media App", "Admin Panel"].map((p, i) => (
          <motion.div key={i} whileHover={{ y: -10 }}
            className="p-6 bg-white/5 border border-white/10 rounded-xl">
            {p}
          </motion.div>
        ))}
      </section>

      {/* FAQ */}
      <section className="py-24 max-w-3xl mx-auto px-6">
        {[
          ["Is backend included?", "Yes full backend training."],
          ["Projects?", "Yes real full stack apps."],
        ].map((f, i) => (
          <div key={i} onClick={() => setOpen(open === i ? null : i)}
            className="p-5 mb-4 bg-white/5 border border-white/10 rounded-xl">
            {f[0]}
            {open === i && <p className="text-slate-400 mt-2">{f[1]}</p>}
          </div>
        ))}
      </section>
    </div>
    <Footer />
        </> 
  );
};

export default MernMain;