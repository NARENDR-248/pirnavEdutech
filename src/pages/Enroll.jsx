import { motion } from "framer-motion";
import {
  FaUserGraduate,
  FaLaptopCode,
  FaCertificate,
  FaBriefcase,
  FaArrowRight,
} from "react-icons/fa";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

function Enroll() {
  return (
    <>
    <Navbar />
    <section className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#12367D] to-[#0F766E] py-20 px-5 overflow-hidden">

      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-white/10 border border-white/20 text-cyan-300 font-medium">
            🚀 Admissions Open 2026
          </span>

          <h1 className="mt-6 text-5xl md:text-7xl font-black text-white">
            Start Your
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {" "}Tech Career
            </span>
          </h1>

          <p className="mt-6 text-xl text-slate-300 max-w-3xl mx-auto">
            Join 20,000+ learners and get trained by industry experts.
            Build real-world projects, earn certifications,
            and unlock placement opportunities.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-10">

          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            className="
            bg-white/10
            backdrop-blur-xl
            border
            border-white/10
            rounded-[32px]
            p-8
            text-white
            "
          >

            <h2 className="text-3xl font-bold mb-6">
              Why Join Pirnav?
            </h2>

            <div className="space-y-5">

              <div className="flex gap-4">
                <FaLaptopCode className="text-cyan-400 text-2xl mt-1" />
                <div>
                  <h3 className="font-semibold text-xl">
                    Real Projects
                  </h3>
                  <p className="text-slate-300">
                    Work on industry-level applications.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <FaCertificate className="text-green-400 text-2xl mt-1" />
                <div>
                  <h3 className="font-semibold text-xl">
                    Certification
                  </h3>
                  <p className="text-slate-300">
                    Receive industry-recognized certificates.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <FaBriefcase className="text-yellow-400 text-2xl mt-1" />
                <div>
                  <h3 className="font-semibold text-xl">
                    Placement Support
                  </h3>
                  <p className="text-slate-300">
                    Resume building and mock interviews.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <FaUserGraduate className="text-pink-400 text-2xl mt-1" />
                <div>
                  <h3 className="font-semibold text-xl">
                    Expert Mentors
                  </h3>
                  <p className="text-slate-300">
                    Learn from professionals working in top companies.
                  </p>
                </div>
              </div>

            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-5 mt-10">

              <div className="bg-white/10 rounded-2xl p-5 text-center">
                <h3 className="text-4xl font-bold text-cyan-400">
                  20K+
                </h3>
                <p>Students</p>
              </div>

              <div className="bg-white/10 rounded-2xl p-5 text-center">
                <h3 className="text-4xl font-bold text-green-400">
                  95%
                </h3>
                <p>Placement Rate</p>
              </div>

              <div className="bg-white/10 rounded-2xl p-5 text-center">
                <h3 className="text-4xl font-bold text-yellow-400">
                  350+
                </h3>
                <p>Hiring Partners</p>
              </div>

              <div className="bg-white/10 rounded-2xl p-5 text-center">
                <h3 className="text-4xl font-bold text-pink-400">
                  1000+
                </h3>
                <p>Batches</p>
              </div>

            </div>

          </motion.div>

          {/* Right Side Form */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            className="
            bg-white
            rounded-[32px]
            p-8
            shadow-[0_30px_80px_rgba(0,0,0,0.15)]
            "
          >

            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Enroll Now
            </h2>

            <p className="text-slate-500 mb-8">
              Fill in your details and our team will contact you.
            </p>

            <form className="space-y-5">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-4 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-4 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full p-4 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500"
              />

              <select
                className="w-full p-4 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Select Course</option>
                <option>React JS</option>
                <option>MERN Stack</option>
                <option>Python Full Stack</option>
                <option>AI Development</option>
                <option>Data Science</option>
              </select>

              <textarea
                rows="4"
                placeholder="Tell us about your goals..."
                className="w-full p-4 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="submit"
                className="
                w-full
                py-4
                rounded-2xl
                bg-gradient-to-r
                from-blue-600
                to-cyan-500
                text-white
                font-semibold
                flex
                items-center
                justify-center
                gap-2
                hover:scale-[1.02]
                transition-all
                duration-300
                "
              >
                Submit Application
                <FaArrowRight />
              </button>

            </form>

          </motion.div>

        </div>

      </div>

    </section>
    <Footer />
    </>
  );
}

export default Enroll;