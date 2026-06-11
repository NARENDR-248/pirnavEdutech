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
import PrinavHero2 from "../../assets/pirnavHero2.png";
import { TypeAnimation } from "react-type-animation";

const Hero = () => {
  const title = ["An Ecosystem for High Achievers"];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };
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
<<<<<<< HEAD
    <section className="relative overflow-hidden bg-slate-950">
=======
<section className="relative overflow-hidden bg-slate-950 min-h-[500px]">
>>>>>>> 2ebd100 (new features)
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-32 -left-32 w-[600px] h-[600px]
    bg-gradient-to-r from-cyan-500/20 to-blue-500/20
    rounded-full blur-[140px]"
        />

        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-3 h-3 bg-cyan-400 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + i * 8}%`,
            }}
          />
        ))}
      </div>

      {/* Grid */}
<<<<<<< HEAD
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-20 pb-8">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 items-center">
=======
<div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-6 lg:pt-12 pb-16">
<div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
>>>>>>> 2ebd100 (new features)
          {/* LEFT */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0px rgba(34,211,238,0)",
                  "0 0 30px rgba(34,211,238,0.4)",
                  "0 0 0px rgba(34,211,238,0)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />

              <span className="text-cyan-300 font-semibold text-sm">
                Industry Ready Programs
              </span>
            </motion.div>
            <TypeAnimation
              sequence={[
                "🚀 AI & Full Stack Training",
                2000,
                "💼 Placement Assistance",
                2000,
                "🎯 Industry Ready Curriculum",
                2000,
              ]}
              repeat={Infinity}
              speed={50}
              className="text-cyan-400 font-semibold"
            />

            {/* Heading */}
            <motion.h1 className="text-white font-black leading-[1.05] text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">
              {title.map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.3,
                    duration: 0.8,
                  }}
                  className="block"
                >
                  {word === "Future Skills" ? (
                    <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                      {word}
                    </span>
                  ) : (
                    word
                  )}
                </motion.span>
              ))}
            </motion.h1>

            {/* Description */}
            <p className="mt-4 text-slate-300 text-sm md:text-base leading-6 max-w-xl">
              Master Full Stack Development, Artificial Intelligence, Data
              Science, Cloud Computing, and DevOps through expert-led programs,
              real-world projects, and placement-focused training.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 mt-5">
              <Link to="/courses">
                <button className="group inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                  Explore Courses
                  <FaArrowRight className="ml-2 text-xs group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>

              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 bg-white/10 backdrop-blur-xl text-sm font-medium text-white hover:bg-white/20 transition-all duration-300">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <FaPlay className="text-xs" />
                </div>
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              {stats.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3"
                >
                  <div className="text-cyan-400 text-2xl mb-3">{item.icon}</div>

                  <h3 className="text-white font-bold text-xl">
                    {item.value}
                  </h3>

                  <p className="text-slate-400 mt-2">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Reviews */}
            <div className="flex flex-wrap items-center gap-3 mt-5">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((id) => (
                  <img
                    key={id}
                    src={`https://i.pravatar.cc/100?img=${id}`}
                    alt=""
                    className="w-8 h-8 rounded-full border-2 border-white"
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
<<<<<<< HEAD
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-full max-w-md"
          >
            <div className="relative w-full max-w-md lg:max-w-lg aspect-square transform -translate-y-10">
=======
     <motion.div
  animate={{
    y: [20, 0, 20],
  }}
  transition={{
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="relative w-full max-w-lg mt-5"
>
            <div className="relative w-full max-w-md lg:max-w-lg aspect-square transform -translate-y-10 lg:-translate-y-24">
>>>>>>> 2ebd100 (new features)
              <img
                src={PrinavHero2}
                alt="Student"
                className="
      w-full
      max-w-[420px]
      object-contain
      [mask-image:radial-gradient(circle,white_75%,transparent_100%)]
      [-webkit-mask-image:radial-gradient(circle,white_75%,transparent_100%)]
    "
              />
            </div>
          </motion.div>
        </div>
        {/* Companies */}

<<<<<<< HEAD
        <div className="mt-12 overflow-hidden">
=======
        <div className="mt-0 overflow-hidden">
>>>>>>> 2ebd100 (new features)
          <div className="text-center mb-14">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-cyan-400 uppercase tracking-[0.3em] text-sm font-semibold"
            >
              Students Placed In
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white text-2xl md:text-3xl font-bold mt-2"
            >
              Distinguished Organizations

            </motion.h2>

            <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
              Our learners are building careers at leading technology companies
              across the globe.
            </p>
          </div>

          {/* Infinite Logo Slider */}
          <div className="relative">
            {/* Left Fade */}
            <div className="absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-slate-950 to-transparent" />

            {/* Right Fade */}
            <div className="absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-slate-950 to-transparent" />

            <motion.div
              animate={{
                x: ["0%", "-50%"],
              }}
              transition={{
                duration: 20,
                ease: "linear",
                repeat: Infinity,
              }}
              className="flex gap-6 w-max"
            >
              {[...companies, ...companies].map((company, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    y: -8,
                    scale: 1.05,
                  }}
                  className="
            flex-shrink-0
            w-48
            h-28
            rounded-3xl
            bg-white/5
            backdrop-blur-xl
            border
            border-white/10
            flex
            items-center
            justify-center
            shadow-xl
            hover:border-cyan-400/40
            transition-all
            duration-300
          "
                >
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="h-10 object-contain  hover:grayscale-0 transition duration-300"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
