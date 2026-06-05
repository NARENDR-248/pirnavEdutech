import { motion } from "framer-motion";

const reactProjects = [
  {
    title: "Netflix Clone",
    desc: "Built using React, Firebase & TMDB API with authentication.",
  },
  {
    title: "E-commerce App",
    desc: "Full React app with cart, payments & Redux state management.",
  },
  {
    title: "Admin Dashboard",
    desc: "Modern dashboard with charts, analytics & role-based access.",
  },
];

const ReactProjectsSection = () => {
  return (
    <section className="py-24 bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-bold mb-12 text-center">
          Build Real React Projects
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {reactProjects.map((p, i) => (
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

export default ReactProjectsSection;