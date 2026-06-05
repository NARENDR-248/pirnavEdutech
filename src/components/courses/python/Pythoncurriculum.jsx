import { motion } from "framer-motion";

const curriculum = [
  { week: "Week 1-2", topic: "Python Fundamentals" },
  { week: "Week 3-5", topic: "Data Structures & Algorithms" },
  { week: "Week 6-8", topic: "Backend Development" },
  { week: "Week 9-12", topic: "AI + Machine Learning" },
];

const CurriculumSection = () => {
  return (
     <section className="py-28 bg-gradient-to-b from-slate-950 via-slate-900 to-black overflow-hidden relative">
      <div className="max-w-4xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-16">
          Curriculum Roadmap
        </h2>

        <div className="relative border-l border-blue-500/30 pl-8 space-y-10">
          {curriculum.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="absolute -left-4 top-2 w-3 h-3 bg-blue-500 rounded-full"></div>

              <h3 className="font-semibold text-lg">{item.week}</h3>
              <p className="text-slate-400">{item.topic}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CurriculumSection;