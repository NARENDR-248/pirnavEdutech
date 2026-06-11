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

      <section className=" bg-gradient-to-br from-[#0F172A] via-[#12367D] to-[#0F766E] py-5 mt-0 md:py-16 px-5 overflow-hidden relative">
        
        {/* Background Blur */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-500/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/20 blur-[120px] rounded-full"></div>

        <div className="max-w-6xl mx-auto relative z-10">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-5 py-2 rounded-full bg-white/10 border border-white/20 text-cyan-300 font-medium">
              🚀 Admissions Open 2026
            </span>

            <h1 className="mt-5 text-4xl md:text-6xl font-black text-white">
              Start Your
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {" "}Tech Career
              </span>
            </h1>

            <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
              Join 20,000+ learners, build real-world projects, and unlock placement opportunities.
            </p>
          </motion.div>

          {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-6">

            {/* LEFT CARD */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              className="
                bg-white/10 backdrop-blur-xl
                border border-white/10
                rounded-[28px]
                p-6 md:p-7
                text-white
                
              "
            >
              <h2 className="text-2xl font-bold mb-6">Why Join Pirnav?</h2>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <FaLaptopCode className="text-cyan-400 text-xl mt-1" />
                  <div>
                    <h3 className="font-semibold">Real Projects</h3>
                    <p className="text-slate-300 text-sm">
                      Work on industry-level applications.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <FaCertificate className="text-green-400 text-xl mt-1" />
                  <div>
                    <h3 className="font-semibold">Certification</h3>
                    <p className="text-slate-300 text-sm">
                      Industry-recognized certificates.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <FaBriefcase className="text-yellow-400 text-xl mt-1" />
                  <div>
                    <h3 className="font-semibold">Placement Support</h3>
                    <p className="text-slate-300 text-sm">
                      Resume + mock interviews.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <FaUserGraduate className="text-pink-400 text-xl mt-1" />
                  <div>
                    <h3 className="font-semibold">Expert Mentors</h3>
                    <p className="text-slate-300 text-sm">
                      Learn from top professionals.
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <h3 className="text-2xl font-bold text-cyan-400">20K+</h3>
                  <p className="text-sm">Students</p>
                </div>

                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <h3 className="text-2xl font-bold text-green-400">95%</h3>
                  <p className="text-sm">Placement</p>
                </div>

                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <h3 className="text-2xl font-bold text-yellow-400">350+</h3>
                  <p className="text-sm">Partners</p>
                </div>

                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <h3 className="text-2xl font-bold text-pink-400">1000+</h3>
                  <p className="text-sm">Batches</p>
                </div>
              </div>
            </motion.div>

            {/* RIGHT CARD */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              className="
                bg-white
                rounded-[24px]
                p-5 md:p-6
                shadow-[0_15px_40px_rgba(0,0,0,0.1)]
                
              "
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Enroll Now
              </h2>

              <p className="text-slate-500 mb-5 text-sm">
                Fill details and we will contact you.
              </p>

              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
                  />

                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
                  />

                  <input
                    type="tel"
                    placeholder="Phone"
                    className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
                  />

                  <select className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none">
                    <option>Select Course</option>
                    <option>React JS</option>
                    <option>MERN Stack</option>
                    <option>Python</option>
                    <option>AI</option>
                  </select>
                </div>

                <textarea
                  rows="3"
                  placeholder="Your Goals..."
                  className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
                />

             <button
    type="submit"
    className="
      mt-4 w-full py-3 rounded-xl
      bg-gradient-to-r from-blue-600 to-cyan-500
      text-white font-semibold
      flex items-center justify-center gap-2
      hover:scale-[1.02] transition
    "
  >
                  Submit Application <FaArrowRight />
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