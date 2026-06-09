import { motion } from "framer-motion";
import {
  Brain,
  Bot,
  Database,
  Cpu,
  BarChart3,
  Rocket,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const curriculum = [
  {
    phase: "Phase 01",
    title: "Python for AI",
    icon: Cpu,
    color: "from-cyan-500 to-blue-600",
    topics: [
      "Python Fundamentals",
      "Functions & OOP",
      "NumPy & Pandas",
      "Data Processing",
    ],
  },
  {
    phase: "Phase 02",
    title: "Machine Learning",
    icon: Brain,
    color: "from-purple-500 to-pink-600",
    topics: [
      "Supervised Learning",
      "Regression Models",
      "Classification",
      "Model Evaluation",
    ],
  },
  {
    phase: "Phase 03",
    title: "Deep Learning",
    icon: Bot,
    color: "from-orange-500 to-red-600",
    topics: [
      "Neural Networks",
      "TensorFlow",
      "CNN",
      "RNN",
    ],
  },
  {
    phase: "Phase 04",
    title: "Data Engineering",
    icon: Database,
    color: "from-emerald-500 to-green-600",
    topics: [
      "SQL",
      "Data Pipelines",
      "ETL Process",
      "Big Data Basics",
    ],
  },
  {
    phase: "Phase 05",
    title: "AI Analytics",
    icon: BarChart3,
    color: "from-blue-500 to-indigo-600",
    topics: [
      "Power BI",
      "Visualization",
      "Dashboards",
      "Business Insights",
    ],
  },
  {
    phase: "Phase 06",
    title: "Generative AI",
    icon: Rocket,
    color: "from-pink-500 to-violet-600",
    topics: [
      "LLMs",
      "Prompt Engineering",
      "OpenAI APIs",
      "AI Projects",
    ],
  },
];

export default function AiCurriculum() {
  const navigate = useNavigate();

  return (
    <section className="relative py-28 bg-[#020617] overflow-hidden">

      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[180px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[180px]" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-500/5 blur-[220px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-20">

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-cyan-500/20 bg-white/5 backdrop-blur-xl text-cyan-300 text-sm">
            🚀 AI Career Roadmap
          </div>

          <h2 className="mt-6 text-5xl md:text-7xl font-bold text-white">
            Artificial Intelligence
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Curriculum
            </span>
          </h2>

          <p className="max-w-3xl mx-auto mt-6 text-slate-400 text-lg">
            Learn AI, Machine Learning, Deep Learning, Data Science,
            and Generative AI through an industry-focused roadmap.
          </p>
        </div>

        {/* Curriculum Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {curriculum.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
                transition={{ duration: 0.4 }}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[32px]
                  border border-white/10
                  bg-white/[0.04]
                  backdrop-blur-2xl
                  p-8
                "
              >
                {/* Glow */}
                <div
                  className={`
                    absolute inset-0 opacity-0
                    group-hover:opacity-100
                    transition duration-500
                    bg-gradient-to-br ${item.color}/10
                  `}
                />

                <div className="relative z-10">

                  {/* Icon */}
                  <div
                    className={`
                      w-16 h-16 rounded-2xl
                      bg-gradient-to-r ${item.color}
                      flex items-center justify-center
                      shadow-xl
                    `}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Phase */}
                  <span className="inline-block mt-5 text-cyan-300 text-sm">
                    {item.phase}
                  </span>

                  {/* Title */}
                  <h3 className="mt-2 text-2xl font-bold text-white">
                    {item.title}
                  </h3>

                  {/* Topics */}
                  <ul className="mt-5 space-y-3">
                    {item.topics.map((topic, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-3 text-slate-300"
                      >
                        <div className="w-2 h-2 rounded-full bg-cyan-400" />
                        {topic}
                      </li>
                    ))}
                  </ul>
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
              p-10 md:p-14
              text-center
            "
          >
            <h3 className="text-3xl md:text-4xl font-bold text-white">
              Ready To Become An AI Engineer?
            </h3>

            <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
              Join our AI Career Program and build real-world projects
              with mentorship from industry experts.
            </p>

            <div className="flex flex-wrap justify-center gap-5 mt-8">

              {/* Curriculum Button */}
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
                  shadow-[0_20px_60px_rgba(59,130,246,0.35)]
                  hover:scale-105
                  transition-all
                "
              >
                View Full Curriculum
              </button>

              {/* Contact Button */}
              <button
                onClick={() => navigate("/contact")}
                className="
                  px-8 py-4
                  rounded-2xl
                  border border-white/10
                  bg-white/5
                  text-white
                  flex items-center gap-2
                  hover:bg-white/10
                  transition
                "
              >
                Talk To Counselor
                <ArrowRight size={18} />
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}