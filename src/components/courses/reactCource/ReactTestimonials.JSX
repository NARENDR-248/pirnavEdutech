import { motion } from "framer-motion";

const reactTestimonials = [
  {
    name: "Kiran Kumar",
    text: "Got placed as React Developer in just 4 months!",
  },
  {
    name: "Anjali",
    text: "Best React course with real projects.",
  },
  {
    name: "Suresh",
    text: "Loved the mentorship and practical approach.",
  },
];

const ReactTestimonials = () => {
  return (
    <section className="py-24 bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          Student Success Stories
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {reactTestimonials.map((t, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
            >
              <p className="text-slate-300">"{t.text}"</p>
              <h4 className="mt-4 font-semibold">{t.name}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReactTestimonials;