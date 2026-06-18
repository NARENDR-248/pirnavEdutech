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

function StatTile({ value, label, color }) {
  return (
    <div className="bg-white/10 rounded-xl p-3 text-center flex flex-col items-center justify-center gap-0.5">
      <span className={`text-xl font-extrabold leading-tight ${color}`}>{value}</span>
      <span className="text-[11px] text-slate-300 tracking-wide">{label}</span>
    </div>
  );
}

function BenefitRow({ icon: Icon, color, title, desc }) {
  return (
    <div className="flex items-start gap-3">
      <span className={`mt-0.5 shrink-0 ${color}`}>
        <Icon size={16} />
      </span>
      <div>
        <h3 className="font-semibold text-white text-sm leading-tight">{title}</h3>
        <p className="text-slate-400 text-xs mt-0.5 leading-snug">{desc}</p>
      </div>
    </div>
  );
}

export default function Enroll() {
  return (
    <>
      <Navbar />

      {/*
        ✅ CORRECT APPROACH:
        - NO h-screen on the wrapper (that clips content)
        - NO overflow-hidden on the page shell (that hides cards)
        - Section uses min-h with calc() to subtract navbar height (~64px)
        - Content is compact enough to fit, but CAN scroll if viewport is tiny
        - py-8 gives breathing room without pushing cards off screen
      */}
      <section
        className="
          relative
          min-h-[calc(100vh-64px)]
          flex flex-col items-center justify-center
          bg-gradient-to-br from-[#0F172A] via-[#12367D] to-[#0F766E]
          py-8 px-4 sm:px-6
          overflow-hidden
        "
      >
        {/* Blur orbs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-[120px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-blue-500/20 blur-[120px]"
        />

        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col gap-5">

          {/* ── Heading ── */}
          <motion.header
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-center"
          >
            <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-medium text-cyan-300">
              🚀 Admissions Open 2026
            </span>

            <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-white">
              Start Your{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Tech Career
              </span>
            </h1>

            <p className="mx-auto mt-2 max-w-xl text-sm sm:text-base text-slate-300">
              Join 20,000+ learners, build real-world projects, and unlock placement opportunities.
            </p>
          </motion.header>

          {/* ── Cards grid ── */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:items-stretch">

            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl"
            >
              <div>
                <h2 className="mb-3 text-base font-bold text-white">Why Join Pirnav?</h2>
                <div className="flex flex-col gap-3">
                  <BenefitRow icon={FaLaptopCode}  color="text-cyan-400"   title="Real Projects"    desc="Work on industry-level applications from day one." />
                  <BenefitRow icon={FaCertificate}  color="text-green-400"  title="Certification"    desc="Industry-recognised certificates, accepted by 350+ partners." />
                  <BenefitRow icon={FaBriefcase}    color="text-yellow-400" title="Placement Support" desc="Resume reviews, mock interviews, and referral network." />
                  <BenefitRow icon={FaUserGraduate} color="text-pink-400"   title="Expert Mentors"   desc="Learn from professionals with 5–15 years of experience." />
                </div>
              </div>

              <div className="mt-auto grid grid-cols-4 gap-2">
                <StatTile value="20K+"  label="Students"  color="text-cyan-400"   />
                <StatTile value="95%"   label="Placement" color="text-green-400"  />
                <StatTile value="350+"  label="Partners"  color="text-yellow-400" />
                <StatTile value="1000+" label="Batches"   color="text-pink-400"   />
              </div>
            </motion.div>

            {/* RIGHT */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.12 }}
              className="flex flex-col rounded-2xl bg-white p-5 shadow-xl"
            >
              <h2 className="text-base font-bold text-slate-900">Enroll Now</h2>
              <p className="mt-0.5 mb-4 text-xs text-slate-500">
                Fill in your details — we'll reach out within 24 hours.
              </p>

              <form
                className="flex flex-col flex-1 gap-3"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Full Name"
                    autoComplete="name"
                    className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm placeholder-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    autoComplete="email"
                    className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm placeholder-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    autoComplete="tel"
                    className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm placeholder-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25"
                  />
                  <select
                    defaultValue=""
                    className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25"
                  >
                    <option value="" disabled>Select Course</option>
                    <option>React JS</option>
                    <option>MERN Stack</option>
                    <option>Python</option>
                    <option>AI / ML</option>
                  </select>
                </div>

                <textarea
                  placeholder="Tell us your learning goals…"
                  className="flex-1 min-h-[80px] w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm placeholder-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25"
                />

                <button
                  type="submit"
                  className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-sm font-semibold text-white shadow-md transition hover:opacity-90 hover:scale-[1.01] active:scale-[0.99]"
                >
                  Submit Application <FaArrowRight size={13} />
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