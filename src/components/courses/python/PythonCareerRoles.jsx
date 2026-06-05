import React from "react";
import { motion } from "framer-motion";
import {
  FaPython,
  FaRobot,
  FaDatabase,
  FaServer,
  FaCode,
  FaChartLine,
} from "react-icons/fa";

const roles = [
  {
    id: "01",
    title: "Python Developer",
    desc: "Build scalable backend systems, REST APIs, automation tools and enterprise applications.",
    icon: <FaPython />,
  },
  {
    id: "02",
    title: "Backend Developer",
    desc: "Develop secure server-side applications using Django, Flask and modern architectures.",
    icon: <FaServer />,
  },
  {
    id: "03",
    title: "Data Analyst",
    desc: "Analyze business data and generate actionable insights using Python tools.",
    icon: <FaChartLine />,
  },
  {
    id: "04",
    title: "Data Scientist",
    desc: "Build predictive models and solve business problems using machine learning.",
    icon: <FaDatabase />,
  },
  {
    id: "05",
    title: "ML Engineer",
    desc: "Deploy machine learning models and AI systems into production environments.",
    icon: <FaRobot />,
  },
  {
    id: "06",
    title: "Full Stack Developer",
    desc: "Create complete web applications using React, APIs and Python backends.",
    icon: <FaCode />,
  },
];

const mentors = [
  {
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    role: "Senior Python Developer",
  },
  {
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    role: "Data Scientist",
  },
  {
    image: "https://randomuser.me/api/portraits/men/65.jpg",
    role: "ML Engineer",
  },
  {
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    role: "Backend Engineer",
  },
];

const cardVariant = {
  hidden: {
    opacity: 0,
    y: 70,
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.12,
    },
  }),
};

const PythonCareerRoles = () => {
  return (
    <section className="relative py-24 bg-slate-950 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[140px]" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-[140px]" />

      <div className="max-w-7xl mx-auto px-6">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 p-10 lg:p-16 mb-16 border border-blue-800"
        >
          {/* Grid Overlay */}
          <div
            className="
            absolute inset-0
            bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),
            linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)]
            bg-[size:35px_35px]
          "
          />

          <div className="grid lg:grid-cols-2 gap-10 items-center relative z-10">
            {/* Left */}
            <div>
              <span className="uppercase tracking-[4px] text-blue-300 text-sm">
                Career Opportunities
              </span>

              <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Roles This Program
                <br />
                Prepares You For
              </h2>

              <p className="mt-6 text-slate-300 text-lg leading-relaxed max-w-xl">
                Python is one of the most demanded programming languages in
                software development, AI, machine learning and data science.
                Our curriculum prepares you for industry-ready roles.
              </p>
            </div>

            {/* Right Floating Profiles */}
            <div className="grid grid-cols-2 gap-6">
              {mentors.map((mentor, index) => (
                <motion.div
                  key={index}
                  animate={{
                    y: [0, -12, 0],
                  }}
                  transition={{
                    duration: 4 + index,
                    repeat: Infinity,
                  }}
                  className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-3"
                >
                  <img
                    src={mentor.image}
                    alt=""
                    className="w-full h-44 object-cover rounded-2xl"
                  />

                  <p className="text-center text-white font-medium mt-3">
                    {mentor.role}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {roles.map((role, index) => (
            <motion.div
              key={role.id}
              custom={index}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className="
              relative
              overflow-hidden
              rounded-3xl
              bg-white
              p-8
              shadow-lg
              group
              transition-all
              duration-300
            "
            >
              {/* Number */}
              <div className="absolute right-4 top-0 text-[100px] font-black text-slate-100">
                {role.id}
              </div>

              {/* Icon */}
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 text-3xl mb-6 group-hover:scale-110 transition">
                {role.icon}
              </div>

              <h3 className="relative z-10 text-2xl font-bold text-slate-900 mb-4">
                {role.title}
              </h3>

              <p className="relative z-10 text-slate-600 leading-relaxed">
                {role.desc}
              </p>

              <div className="absolute bottom-0 left-0 h-1 w-0 bg-blue-600 group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-16 text-center"
        >
          <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:scale-105 transition-all duration-300 shadow-xl">
            Explore Python Career Path
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default PythonCareerRoles;