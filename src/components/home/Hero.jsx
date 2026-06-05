import React from "react";
import { motion } from "framer-motion";
import {
  FaPlay,
  FaStar,
  FaUsers,
  FaBriefcase,
  FaAward,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Hero = () => {
  const companies = [
    {
      name: "Google",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
    },
    {
      name: "Microsoft",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg",
    },
    {
      name: "Amazon",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    },
    {
      name: "Infosys",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",
    },
    {
      name: "TCS",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg",
    },
    {
      name: "Accenture",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg",
    },
  ];

  const stats = [
    {
      icon: <FaUsers />,
      value: "20K+",
      label: "Students Trained",
    },
    {
      icon: <FaBriefcase />,
      value: "2200+",
      label: "Placements",
    },
    {
      icon: <FaAward />,
      value: "95%",
      label: "Success Rate",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-950 min-h-screen">

      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-0 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
      </div>

      {/* Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-24 lg:pt-32 pb-16">

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center min-h-[80vh]">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-3 bg-cyan-500/10 border border-cyan-400/20 backdrop-blur-xl rounded-full px-5 py-2 mb-8">

              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />

              <span className="text-cyan-300 font-semibold text-sm">
                Industry Ready Programs
              </span>

            </div>

            {/* Heading */}
           <h1
  className="
  text-white
  font-black
  leading-[1.1]
  text-4xl
  sm:text-5xl
  lg:text-6xl
  xl:text-7xl
  max-w-[700px]
  "
>
  Learn{" "}
  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
    Future Skills
  </span>

  <br />

  Build Your Dream Career
</h1>

            {/* Description */}
            <p className="mt-6 text-slate-300 text-base md:text-lg leading-8 max-w-2xl">

              Master Full Stack Development, Artificial Intelligence,
              Data Science, Cloud Computing, and DevOps through
              expert-led programs, real-world projects, and
              placement-focused training.

            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-5 mt-10">

              <Link to="/courses">

                <button className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-xl hover:scale-105 transition">

                  Explore Courses

                  <FaArrowRight className="inline ml-2 group-hover:translate-x-1 transition" />

                </button>

              </Link>

              <button className="flex items-center gap-3 px-8 py-4 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 transition">

                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <FaPlay />
                </div>

                Watch Demo

              </button>

            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-12">

              {stats.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5"
                >
                  <div className="text-cyan-400 text-2xl mb-3">
                    {item.icon}
                  </div>

                  <h3 className="text-white font-bold text-3xl">
                    {item.value}
                  </h3>

                  <p className="text-slate-400 mt-2">
                    {item.label}
                  </p>
                </div>
              ))}

            </div>

            {/* Reviews */}
            <div className="flex flex-wrap items-center gap-4 mt-10">

              <div className="flex -space-x-3">

                {[1, 2, 3, 4].map((id) => (
                  <img
                    key={id}
                    src={`https://i.pravatar.cc/100?img=${id}`}
                    alt=""
                    className="w-11 h-11 rounded-full border-2 border-white"
                  />
                ))}

              </div>

              <div>

                <div className="flex gap-1 text-yellow-400">

                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}

                </div>

                <p className="text-slate-300 text-sm">
                  Rated 4.9 by 20,000+ learners
                </p>

              </div>

            </div>

          </motion.div>

          {/* RIGHT */}
<motion.div
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
  className="relative flex justify-center lg:justify-end"
>
  <img
    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
    alt="Student"
    className="
      w-full
      max-w-[480px]
      lg:max-w-[520px]
      rounded-[32px]
      object-cover
      shadow-[0_25px_80px_rgba(0,0,0,0.35)]
      -mt-10
      lg:-mt-32
    "
  />
</motion.div>

        </div>

        {/* Companies */}
        <div className="mt-24">

          <div className="text-center mb-12">

            <p className="text-slate-400 uppercase tracking-widest text-sm">
              Students Placed In
            </p>

            <h2 className="text-white text-3xl font-bold mt-3">
              Top Global Companies
            </h2>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">

            {companies.map((company, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-5 flex items-center justify-center h-24 hover:-translate-y-2 transition duration-300 shadow-lg"
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className="h-10 object-contain"
                />
              </div>
            ))}

          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;