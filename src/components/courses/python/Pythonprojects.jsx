import { motion } from "framer-motion";

const projects = [
  {
    title: "AI Resume Analyzer",
    desc: "Built using Python + NLP to analyze resumes and give smart feedback.",
  },
  {
    title: "E-commerce Backend",
    desc: "Node.js + MongoDB scalable backend with payments integration.",
  },
  {
    title: "ChatGPT Clone",
    desc: "Full-stack AI chat app using OpenAI API and React.",
  },
];

const ProjectsSection = () => {
  return (
    <section className="py-28 bg-gradient-to-b from-slate-950 via-slate-900 to-black overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-6">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/20 blur-[120px] rounded-full opacity-30" />

         <div className="text-center mb-16">

          {/* Badge */}
          <div className="inline-block px-4 py-1 mb-4 text-sm text-blue-400 border border-blue-500/30 rounded-full bg-blue-500/10 backdrop-blur">
            🚀 Learn from Industry Experts
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Meet Your{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Python Mentors
            </span>
          </h2>

          {/* Subtext */}
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-lg">
            Get guided by top engineers from leading tech companies. Learn real-world skills,
            build production-ready projects, and accelerate your career.
          </p>

          {/* Divider Line */}
          <div className="mt-6 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
            >
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="text-slate-400 mt-3">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;