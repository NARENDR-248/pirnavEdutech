import { useState } from "react";
import { motion } from "framer-motion";

const reactFaqs = [
  {
    q: "Do I need JavaScript knowledge?",
    a: "Yes, basic JS is recommended before starting React.",
  },
  {
    q: "Will I build real projects?",
    a: "Yes, multiple real-world apps are included.",
  },
  {
    q: "Do you teach Redux?",
    a: "Yes, Redux and modern state management are covered.",
  },
];

const ReactFAQ = () => {
  const [open, setOpen] = useState(null);

  return (
    <section className="py-24 bg-slate-900 text-white">
      <div className="max-w-3xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          React Course FAQs
        </h2>

        <div className="space-y-4">
          {reactFaqs.map((item, i) => (
            <div
              key={i}
              onClick={() => setOpen(open === i ? null : i)}
              className="p-5 rounded-xl bg-white/5 border border-white/10 cursor-pointer"
            >
              <h3 className="font-semibold">{item.q}</h3>

              {open === i && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="text-slate-400 mt-3"
                >
                  {item.a}
                </motion.p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReactFAQ;