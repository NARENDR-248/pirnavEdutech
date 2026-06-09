import React from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Bot,
  Cpu,
  Database,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const courses = [
  {
    title: "Artificial Intelligence",
    description:
      "Master AI concepts, intelligent systems, and real-world AI applications.",
    icon: Brain,
    color: "from-cyan-500 to-blue-600",
  },
  {
    title: "Machine Learning",
    description:
      "Learn supervised, unsupervised learning, regression, classification and deployment.",
    icon: Cpu,
    color: "from-purple-500 to-pink-600",
  },
  {
    title: "Deep Learning",
    description:
      "Build Neural Networks, CNNs, RNNs, and advanced AI models.",
    icon: Bot,
    color: "from-orange-500 to-red-600",
  },
  {
    title: "Data Science",
    description:
      "Work with Python, Pandas, NumPy, visualization and analytics.",
    icon: Database,
    color: "from-emerald-500 to-green-600",
  },
];

const AiCourse = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen py-28 bg-[#020617] overflow-hidden">

      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[180px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[180px]" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-500/5 blur-[220px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-20">

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-cyan-500/20 bg-white/5 backdrop-blur-xl text-cyan-300 text-sm">
            <Sparkles size={16} />
            AI Learning Ecosystem
          </div>

          <h1 className="mt-6 text-5xl md:text-7xl font-bold text-white">
            Become an
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              AI Engineer
            </span>
          </h1>

          <p className="max-w-3xl mx-auto mt-6 text-slate-400 text-lg">
            Learn Artificial Intelligence, Machine Learning, Deep Learning,
            Data Science and Generative AI through industry-driven programs.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

          {courses.map((course, index) => {
            const Icon = course.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
                viewport={{ once: true }}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[30px]
                  border border-white/10
                  bg-white/[0.04]
                  backdrop-blur-2xl
                  p-8
                "
              >
                <div
                  className={`
                    absolute inset-0 opacity-0
                    group-hover:opacity-100
                    transition duration-500
                    bg-gradient-to-br ${course.color}/10
                  `}
                />

                <div className="relative z-10">

                  <div
                    className={`
                      w-16 h-16 rounded-2xl
                      bg-gradient-to-r ${course.color}
                      flex items-center justify-center
                      shadow-xl
                    `}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="mt-6 text-2xl font-bold text-white">
                    {course.title}
                  </h3>

                  <p className="mt-4 text-slate-400 leading-relaxed">
                    {course.description}
                  </p>

                  <button
                    onClick={() => navigate("/ai-curriculum")}
                    className="
                      mt-6
                      flex items-center gap-2
                      text-cyan-400
                      font-medium
                      hover:text-cyan-300
                    "
                  >
                    View Curriculum
                    <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-24">

          <div
            className="
              rounded-[36px]
              border border-white/10
              bg-white/[0.04]
              backdrop-blur-2xl
              p-12
              text-center
            "
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Ready To Launch Your AI Career?
            </h2>

            <p className="mt-5 text-slate-400 max-w-2xl mx-auto">
              Join thousands of learners building careers in AI,
              Machine Learning, Data Science and Generative AI.
            </p>

            <div className="flex flex-wrap justify-center gap-5 mt-8">

              <button
                onClick={() => navigate("/ai-curriculum")}
                className="
                  px-8 py-4
                  rounded-2xl
                  font-semibold
                  text-white
                  bg-gradient-to-r
                  from-cyan-500
                  via-blue-500
                  to-purple-600
                  hover:scale-105
                  transition-all
                  shadow-[0_20px_60px_rgba(59,130,246,0.35)]
                "
              >
                Explore Curriculum
              </button>

              <button
                onClick={() => navigate("/contact")}
                className="
                  px-8 py-4
                  rounded-2xl
                  border border-white/10
                  bg-white/5
                  text-white
                  hover:bg-white/10
                  transition-all
                "
              >
                Talk To Counselor
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AiCourse;