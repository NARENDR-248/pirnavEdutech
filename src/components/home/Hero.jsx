import React from "react";
import { motion } from "framer-motion";
import { FaPlay, FaStar, FaUsers, FaBriefcase, FaAward, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import PrinavHero2 from "../../assets/pirnavHero2.png";
import { TypeAnimation } from "react-type-animation";
import { useThemeContext } from "../../context/ThemeContext";

// ─── Theme tokens ───────────────────────────────────────────────────────────
const th = {
  section:              (d) => d ? "bg-slate-950" : "bg-slate-50",
  blob:                 (d) => d ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20" : "bg-gradient-to-r from-cyan-300/30 to-blue-300/30",
  particle:             (d) => d ? "bg-cyan-400" : "bg-cyan-500",
  badgeWrapper:         (d) => d ? "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10" : "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-50",
  badgeText:            (d) => d ? "text-cyan-300 font-semibold text-xs" : "text-cyan-700 font-semibold text-xs",
  typeAnimation:        (d) => d ? "text-cyan-400 font-semibold text-sm" : "text-cyan-600 font-semibold text-sm",
  heading:              (d) => d ? "text-white font-black leading-[1.08] text-2xl sm:text-3xl lg:text-4xl xl:text-5xl" : "text-slate-900 font-black leading-[1.08] text-2xl sm:text-3xl lg:text-4xl xl:text-5xl",
  headingGradient:      ()  => "bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent",
  description:          (d) => d ? "mt-3 text-slate-300 text-sm leading-6 max-w-lg" : "mt-3 text-slate-600 text-sm leading-6 max-w-lg",
  primaryButton:        ()  => "group inline-flex items-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300",
  secondaryButton:      (d) => d ? "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/20 bg-white/10 backdrop-blur-xl text-sm font-medium text-white hover:bg-white/20 transition-all duration-300" : "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-medium text-slate-900 hover:bg-slate-100 transition-all duration-300 shadow-sm",
  secondaryButtonIconWrap: (d) => d ? "w-7 h-7 rounded-full bg-white/10 flex items-center justify-center" : "w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center",
  statCard:             (d) => d ? "bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-3" : "bg-white border border-slate-200 rounded-xl p-3 shadow-sm",
  statIcon:             (d) => d ? "text-cyan-400 text-xl mb-1.5" : "text-cyan-600 text-xl mb-1.5",
  statValue:            (d) => d ? "text-white font-bold text-lg" : "text-slate-900 font-bold text-lg",
  statLabel:            (d) => d ? "text-slate-400 text-xs mt-0.5" : "text-slate-500 text-xs mt-0.5",
  avatarBorder:         (d) => d ? "w-7 h-7 rounded-full border-2 border-white" : "w-7 h-7 rounded-full border-2 border-slate-50",
  starRow:              ()  => "flex gap-0.5 text-yellow-400 text-xs",
  reviewText:           (d) => d ? "text-slate-300 text-xs" : "text-slate-600 text-xs",
  companiesEyebrow:     (d) => d ? "text-cyan-400 uppercase tracking-[0.3em] text-xs font-semibold" : "text-cyan-600 uppercase tracking-[0.3em] text-xs font-semibold",
  companiesHeading:     (d) => d ? "text-white text-xl md:text-2xl font-bold mt-1" : "text-slate-900 text-xl md:text-2xl font-bold mt-1",
  companiesSubtext:     (d) => d ? "text-slate-400 mt-2 max-w-xl mx-auto text-sm" : "text-slate-500 mt-2 max-w-xl mx-auto text-sm",
  fadeLeft:             (d) => d ? "absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none" : "absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none",
  fadeRight:            (d) => d ? "absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none" : "absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none",
  logoCard:             (d) => d ? "flex-shrink-0 w-36 h-20 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-xl hover:border-cyan-400/40 transition-all duration-300" : "flex-shrink-0 w-36 h-20 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-md hover:border-cyan-500/40 transition-all duration-300",
  logoImage:            (d) => d ? "h-8 object-contain transition duration-300" : "h-8 object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition duration-300",
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const companies = [
  { name: "Google",    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" },
  { name: "Microsoft", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg" },
  { name: "Amazon",    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "Infosys",   logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg" },
  { name: "Accenture", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg" },
];

const stats = [
  { icon: <FaUsers />,     value: "20K+",  label: "Students Trained" },
  { icon: <FaBriefcase />, value: "2200+", label: "Placements" },
  { icon: <FaAward />,     value: "95%",   label: "Success Rate" },
];

const Hero = () => {
  const { isDark } = useThemeContext();

  return (
    /**
     * FIX 1: `min-h-screen flex flex-col` — section always fills the viewport.
     * FIX 2: `overflow-hidden` kept so blobs don't cause horizontal scroll.
     */
    <section
      className={`
        relative min-h-screen flex flex-col overflow-hidden
        transition-colors duration-300
        ${th.section(isDark)}
      `}
    >
      {/* ── Decorative background ────────────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: [0, 180, 360], scale: [1, 1.2, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className={`absolute -top-32 -left-32 w-[500px] h-[500px] ${th.blob(isDark)} rounded-full blur-[130px]`}
        />
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -80, 0], opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute w-2.5 h-2.5 ${th.particle(isDark)} rounded-full`}
            style={{ left: `${10 + i * 12}%`, top: `${20 + i * 8}%` }}
          />
        ))}
      </div>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      {/**
       * FIX 3: `flex-1 flex flex-col justify-center` — content fills remaining
       *         height and is vertically centred inside the section.
       * FIX 4: Tightened vertical padding so headings + cards are together.
       */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">

        {/* ── Hero grid ──────────────────────────────────────────────────── */}
        {/**
         * FIX 5: `items-center` on the grid keeps text + image vertically
         *         aligned. Gap reduced so both columns are visible on laptops.
         */}
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-10 items-center">

          {/* Left — text column */}
          <motion.div
            className="flex flex-col gap-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={fadeUp}>
              <motion.span
                className={th.badgeWrapper(isDark)}
                animate={{ boxShadow: ["0 0 0px rgba(34,211,238,0)", "0 0 24px rgba(34,211,238,0.35)", "0 0 0px rgba(34,211,238,0)"] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className={th.badgeText(isDark)}>Industry Ready Programs</span>
              </motion.span>
            </motion.div>

            {/* Type animation */}
            <motion.div variants={fadeUp}>
              <TypeAnimation
                sequence={["🚀 AI & Full Stack Training", 2000, "💼 Placement Assistance", 2000, "🎯 Industry Ready Curriculum", 2000]}
                repeat={Infinity}
                speed={50}
                className={th.typeAnimation(isDark)}
              />
            </motion.div>

            {/* Heading */}
            <motion.h1 variants={fadeUp} className={th.heading(isDark)}>
              An Ecosystem for{" "}
              <span className={th.headingGradient()}>High Achievers</span>
            </motion.h1>

            {/* Description */}
            <motion.p variants={fadeUp} className={th.description(isDark)}>
              Master Full Stack Development, Artificial Intelligence, Data Science,
              Cloud Computing, and DevOps through expert-led programs, real-world
              projects, and placement-focused training.
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mt-1">
              <Link to="/courses">
                <button className={th.primaryButton()}>
                  Explore Courses
                  <FaArrowRight className="ml-2 text-xs group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
             <button className={`${th.secondaryButton(isDark)} px-4 py-2 text-sm`}>
  <div className={`${th.secondaryButtonIconWrap(isDark)} w-6 h-6`}>
    <FaPlay className="text-[10px]" />
  </div>
  Watch Demo
</button>
            </motion.div>

            {/* Stat cards */}
            {/**
             * FIX 6: `grid-cols-3` with `gap-3` — three cards in one row on all
             *         screen sizes ≥ sm. Cards are compact (tighter padding).
             */}
            <motion.div variants={fadeUp} className="grid grid-cols-3 gap-3 mt-2">
              {stats.map((item, i) => (
                <div key={i} className={th.statCard(isDark)}>
                  <div className={th.statIcon(isDark)}>{item.icon}</div>
                  <p className={th.statValue(isDark)}>{item.value}</p>
                  <p className={th.statLabel(isDark)}>{item.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Social proof */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 mt-1">
              <div className="flex -space-x-2.5">
                {[1, 2, 3, 4].map((id) => (
                  <img key={id} src={`https://i.pravatar.cc/100?img=${id}`} alt="" className={th.avatarBorder(isDark)} />
                ))}
              </div>
              <div>
                <div className={th.starRow()}>
                  {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                </div>
                <p className={th.reviewText(isDark)}>Rated 4.9 by 20,000+ learners</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — hero image */}
          {/**
           * FIX 7: Removed negative `translate-y-10` that was pushing the image
           *         out of the visible area. Added `max-h-[55vh]` so the image
           *         never overflows the viewport on shorter screens.
           */}
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex items-center justify-center"
          >
            <img
              src={PrinavHero2}
              alt="Student"
              className="w-full max-w-[380px] max-h-[90vh] object-contain
                [mask-image:radial-gradient(circle,white_75%,transparent_100%)]
                [-webkit-mask-image:radial-gradient(circle,white_75%,transparent_100%)]"
            />
          </motion.div>
        </div>

        {/* ── Companies marquee ──────────────────────────────────────────── */}
        {/**
         * FIX 8: `mt-8 lg:mt-10` — consistent, smaller top margin so this
         *         section is visible without scrolling on most laptops.
         */}
        <div className="mt-8 lg:mt-10 overflow-hidden">
          <div className="text-center mb-6">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={th.companiesEyebrow(isDark)}
            >
              Students Placed In
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={th.companiesHeading(isDark)}
            >
              Distinguished Organizations
            </motion.h2>
            <p className={th.companiesSubtext(isDark)}>
              Our learners are building careers at leading technology companies across the globe.
            </p>
          </div>

          <div className="relative">
            <div className={th.fadeLeft(isDark)} />
            <div className={th.fadeRight(isDark)} />
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 20, ease: "linear", repeat: Infinity }}
              className="flex gap-4 w-max"
            >
              {[...companies, ...companies].map((company, index) => (
                <motion.div key={index} whileHover={{ y: -6, scale: 1.04 }} className={th.logoCard(isDark)}>
                  <img src={company.logo} alt={company.name} className={th.logoImage(isDark)} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;