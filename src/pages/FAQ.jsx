import { useState, useEffect } from "react";

import {
  FaChevronDown,
  FaQuestionCircle,
} from "react-icons/fa";

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
          "Yes, you'll receive guidance from experienced mentors through live sessions and doubt support.",
      },
    ],

    "Placements & Outcomes": [
      {
        question: "Do you provide placement support?",
        answer:
          "Yes, we offer resume reviews, mock interviews, and job preparation guidance.",
      },
    ],

    "Payments & Refunds": [
      {
        question: "Can I pay in installments?",
        answer:
          "Yes, EMI and flexible payment options are available.",
      },
    ],
  };

  const [activeCategory, setActiveCategory] =
    useState(categories[0]);

  const [openIndex, setOpenIndex] =
    useState(0);

  return (
    <section className="relative py-24 bg-gradient-to-b from-slate-50 via-white to-slate-100 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto px-5">

        {/* Heading */}
        <div
          data-aos="fade-up"
          className="text-center mb-20"
        >

          <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold mb-5">

            <FaQuestionCircle />

            FAQs

          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-5">

            Frequently Asked Questions

          </h2>

          <p className="text-slate-500 max-w-2xl mx-auto">

            Everything you need to know about our courses,
            mentorship, placements, and learning experience.

          </p>

        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-4 gap-10">

          {/* Sidebar */}
          <div
            data-aos="fade-right"
            className="lg:col-span-1"
          >

            <div className="bg-white rounded-3xl p-5 shadow-md border border-slate-100">

              {categories.map((category) => (

                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setOpenIndex(null);
                  }}
                  className={`w-full text-left px-5 py-4 rounded-2xl font-semibold transition-all duration-300 mb-3
                  ${
                    activeCategory === category
                      ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg"
                      : "hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  {category}
                </button>

              ))}

            </div>

          </div>

          {/* FAQ Section */}
          <div
            data-aos="fade-left"
            className="lg:col-span-3"
          >

            <div className="space-y-5">

              {faqData[activeCategory].map(
                (faq, index) => (

                  <div
                    key={index}
                    className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
                  >

                    {/* Question */}
                    <button
                      onClick={() =>
                        setOpenIndex(
                          openIndex === index
                            ? null
                            : index
                        )
                      }
                      className="w-full flex items-center justify-between px-8 py-6 text-left"
                    >

                      <h3 className="text-xl font-bold text-slate-900">

                        {faq.question}

                      </h3>

                      <FaChevronDown
                        className={`transition-transform duration-300 ${
                          openIndex === index
                            ? "rotate-180"
                            : ""
                        }`}
                      />

                    </button>

                    {/* Answer */}
                    <div
                      className={`transition-all duration-500 overflow-hidden ${
                        openIndex === index
                          ? "max-h-96"
                          : "max-h-0"
                      }`}
                    >

                      <div className="px-8 pb-6 text-slate-600 leading-relaxed">

                        {faq.answer}

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default FAQ;