<<<<<<< HEAD
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
=======
import { useState, useEffect } from "react";
import { FaChevronDown, FaQuestionCircle } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

function FAQ() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const categories = [
    "General Questions",
    "Program & Curriculum",
    "Teaching & Mentorship",
    "Placements & Outcomes",
    "Payments & Refunds",
  ];

  const faqData = {
    "General Questions": [
      {
        question: "What is Pirnav Edutech?",
        answer:
          "Pirnav Edutech is a modern learning platform helping students and professionals master industry-ready skills through live mentorship, projects, and structured learning paths.",
      },
      {
        question: "Who is this program for?",
        answer:
          "Students, freshers, job seekers, and working professionals who want to improve their technical skills and accelerate career growth.",
      },
    ],

    "Program & Curriculum": [
      {
        question: "Are projects included?",
        answer:
          "Yes, every learning path contains industry-level projects and real-world case studies.",
      },
      {
        question: "Is the curriculum updated?",
        answer:
          "Absolutely. Our curriculum is continuously updated based on industry trends and company requirements.",
      },
    ],

    "Teaching & Mentorship": [
      {
        question: "Will I get a mentor?",
        answer:
          "Yes, you'll receive guidance from experienced mentors through live sessions, weekly reviews, and dedicated doubt support.",
      },
      {
        question: "How are doubts resolved?",
        answer:
          "Students get access to live doubt-clearing sessions, mentor guidance, and community support.",
      },
    ],

    "Placements & Outcomes": [
      {
        question: "Do you provide placement support?",
        answer:
          "Yes, we offer resume reviews, mock interviews, portfolio building, and job preparation guidance.",
      },
      {
        question: "Will I get interview opportunities?",
        answer:
          "Eligible students receive hiring assistance and access to partner company opportunities.",
      },
    ],

    "Payments & Refunds": [
      {
        question: "Can I pay in installments?",
        answer:
          "Yes, EMI and flexible payment options are available for most programs.",
      },
      {
        question: "Do you have a refund policy?",
        answer:
          "Refund policies vary by program. Please check the enrollment terms before purchasing.",
      },
    ],
  };

  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative py-24 bg-[#020b14] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-20 left-20 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[140px] rounded-full" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.08),transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5">
        {/* Header */}
        <div
          data-aos="fade-up"
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-semibold mb-6">
            <FaQuestionCircle />
            Frequently Asked Questions
          </span>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Got Questions?
            <span className="block text-cyan-400">
              We've Got Answers
            </span>
          </h2>

          <p className="max-w-3xl mx-auto text-slate-400 text-lg">
            Find answers about our programs, mentorship,
            curriculum, placements, payments, and learning
            experience.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div
            data-aos="fade-right"
            className="lg:col-span-1"
          >
            <div className="sticky top-24 bg-[#061320] border border-cyan-500/10 backdrop-blur-xl rounded-3xl p-5">
              <h3 className="text-white font-bold mb-5">
                Categories
              </h3>

              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setOpenIndex(null);
                  }}
                  className={`w-full text-left px-5 py-4 rounded-2xl font-semibold mb-3 transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_30px_rgba(6,182,212,0.25)]"
                      : "text-slate-300 hover:bg-cyan-500/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ List */}
          <div
            data-aos="fade-left"
            className="lg:col-span-3"
          >
            <div className="space-y-5">
              {faqData[activeCategory].map(
                (faq, index) => (
                  <div
                    key={index}
                    className="
                      bg-[#061320]
                      border
                      border-cyan-500/10
                      rounded-3xl
                      overflow-hidden
                      backdrop-blur-xl
                      transition-all
                      duration-300
                      hover:border-cyan-400/30
                      hover:shadow-[0_0_40px_rgba(6,182,212,0.08)]
                    "
                  >
                    <button
                      onClick={() =>
                        setOpenIndex(
                          openIndex === index
                            ? null
                            : index
                        )
                      }
                      className="w-full flex justify-between items-center px-8 py-6 text-left"
                    >
                      <h3 className="text-xl font-bold text-white">
                        {faq.question}
                      </h3>

                      <FaChevronDown
                        className={`text-cyan-400 transition-transform duration-300 ${
                          openIndex === index
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        openIndex === index
                          ? "max-h-96"
                          : "max-h-0"
                      }`}
                    >
                      <div className="px-8 pb-6 text-slate-400 leading-relaxed">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Bottom CTA */}
            <div
              data-aos="fade-up"
              className="mt-12"
            >
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-3">
                  Still Have Questions?
                </h3>

                <p className="text-slate-400 mb-6">
                  Our admission counselors are here to help
                  you choose the right learning path.
                </p>

                <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:scale-105 transition-transform">
                  Talk To Our Expert
                </button>
              </div>
            </div>
          </div>
>>>>>>> 2ebd100 (new features)
        </div>
      </div>
    </section>
  );
}