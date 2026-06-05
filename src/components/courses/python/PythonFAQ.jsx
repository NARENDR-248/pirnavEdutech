import { useState } from "react";
import { motion } from "framer-motion";

const faqs = [
  {
    q: "Do I need coding experience?",
    a: "No, we start from basics.",
  },
  {
    q: "Will I get placement support?",
    a: "Yes, resume + mock interviews included.",
  },
  {
    q: "Is this live or recorded?",
    a: "Both live sessions and recordings available.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState(null);

  return (
    <section className="py-28 bg-gradient-to-b from-slate-950 via-slate-900 to-black overflow-hidden relative">
      <div className="max-w-3xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((item, i) => (
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

export default FAQ;