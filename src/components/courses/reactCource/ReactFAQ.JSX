import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const reactFaqs = [
  {
    q: "Do I need JavaScript knowledge?",
    a: "Yes. A basic understanding of JavaScript fundamentals such as variables, functions, arrays, objects, and ES6 concepts is recommended before starting React.",
  },
  {
    q: "Will I build real projects?",
    a: "Absolutely. You'll build multiple real-world applications including dashboards, e-commerce projects, API-driven apps, and portfolio-worthy React projects.",
  },
  {
    q: "Do you teach Redux?",
    a: "Yes. Redux Toolkit, Context API, and modern state management patterns are covered with practical implementation examples.",
  },
  {
    q: "Is placement support included?",
    a: "Yes. We provide resume building, LinkedIn optimization, mock interviews, coding assessments, and placement assistance.",
  },
];

export default function ReactFAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative py-28 overflow-hidden bg-[#030712]">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/10 blur-[150px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 blur-[180px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-5 py-2 rounded-full border border-cyan-500/20 bg-white/5 backdrop-blur-xl text-cyan-300 text-sm font-medium">
            ❓ React Support Center
          </div>

          <h2 className="mt-6 text-5xl md:text-6xl font-bold text-white">
            Frequently Asked
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>

          <p className="mt-6 text-slate-400 max-w-2xl mx-auto text-lg">
            Everything you need to know before joining our React Developer Program.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-5">
          {reactFaqs.map((item, index) => {
            const isOpen = open === index;

            return (
              <motion.div
                key={index}
                layout
                transition={{ duration: 0.3 }}
                className="
                  group
                  overflow-hidden
                  rounded-[28px]
                  border border-white/10
                  bg-white/[0.04]
                  backdrop-blur-2xl
                  hover:border-cyan-400/30
                  transition-all
                  duration-500
                "
              >
                <button
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="
                    w-full
                    flex
                    items-center
                    justify-between
                    gap-5
                    p-7
                    text-left
                  "
                >
                  <h3 className="text-lg md:text-xl font-semibold text-white">
                    {item.q}
                  </h3>

                  <motion.div
                    animate={{
                      rotate: isOpen ? 45 : 0,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    className="
                      w-12
                      h-12
                      rounded-xl
                      border
                      border-white/10
                      bg-white/5
                      flex
                      items-center
                      justify-center
                      flex-shrink-0
                    "
                  >
                    <Plus className="w-5 h-5 text-cyan-400" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        height: 0,
                      }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                    >
                      <div className="px-7 pb-7">
                        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-5" />

                        <p className="text-slate-400 leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div
            className="
              rounded-[32px]
              border border-white/10
              bg-white/[0.04]
              backdrop-blur-2xl
              p-10
            "
          >
            <h3 className="text-3xl font-bold text-white">
              Still have questions?
            </h3>

            <p className="mt-3 text-slate-400">
              Speak directly with our React mentors and admissions team.
            </p>

            <button
              className="
                mt-7
                px-8
                py-4
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
                duration-300
              "
            >
              Talk to an Expert →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}