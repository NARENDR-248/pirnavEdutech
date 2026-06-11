
import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Bot } from "lucide-react";

const faqDB = [
  {
    q: "What is this platform?",
    a: "It is a modern learning platform for AI, development, and job-ready skills.",
  },
  {
    q: "Do you provide placement support?",
    a: "Yes, we provide resume building, mock interviews, and job referrals.",
  },
  {
    q: "Do I need coding experience?",
    a: "No, we start from basics and gradually move to advanced topics.",
  },
  {
    q: "Are real projects included?",
    a: "Yes, every course includes real-world industry projects.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="relative min-h-screen bg-[#020b14] text-white px-4 py-20 overflow-hidden">

      {/* Glow Background */}
      <div className="absolute w-[400px] h-[400px] bg-cyan-500/10 blur-[140px] top-0 left-0" />
      <div className="absolute w-[400px] h-[400px] bg-purple-500/10 blur-[140px] bottom-0 right-0" />

      <div className="relative max-w-3xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-xs">
            <Sparkles size={14} />
            FAQs
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mt-4">
            Frequently Asked Questions
          </h2>

          <p className="text-slate-400 mt-2 text-sm">
            Everything you need to know about our program
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqDB.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                layout
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden"
              >
                {/* Question */}
                <button
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                      <Bot size={14} className="text-cyan-300" />
                    </div>

                    <span className="text-sm md:text-base font-medium">
                      {item.q}
                    </span>
                  </div>

                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    className="text-cyan-300 text-xl"
                  >
                    +
                  </motion.span>
                </button>

                {/* Answer */}
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-5 pb-5 text-sm text-slate-300"
                  >
                    {item.a}
                  </motion.div>
                )}
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}