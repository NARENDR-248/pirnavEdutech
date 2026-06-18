import { motion } from "framer-motion";
import {
  FaReact,
  FaPlay,
  FaUsers,
  FaBriefcase,
  FaStar,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ReactHeroSection = () => {
  const navigate = useNavigate();

  const handleEnroll = () => {
    navigate("/checkout");
  };

  const handleDemo = () => {
    navigate("/react-curriculum");
  };

  const handleStartLearning = () => {
    navigate("/react-curriculum");
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#030712] flex items-center">

      {/* Premium Background */}
      <div className="absolute inset-0">

        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-cyan-500/15 blur-[180px]" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/15 blur-[180px]" />

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-500/10 blur-[220px]" />

      </div>

      {/* Grid Overlay */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.03]
          [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
          [background-size:60px_60px]
        "
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div
              className="
                inline-flex
                items-center
                gap-2
                px-5
                py-2
                rounded-full
                bg-white/5
                border
                border-cyan-500/20
                backdrop-blur-xl
                text-cyan-300
                text-sm
                font-medium
              "
            >
              🚀 #1 React Career Program
            </div>

            {/* Heading */}
            <h1 className="mt-8 text-5xl md:text-6xl xl:text-7xl font-black leading-tight text-white">
              Become a
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                React Developer
              </span>
              in 90 Days
            </h1>

            {/* Description */}
            <p className="mt-6 text-slate-400 text-lg max-w-xl leading-relaxed">
              Master React, Hooks, Redux, APIs, Routing, Projects,
              and modern frontend development through hands-on
              industry-focused training.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-5">

              <button
                onClick={handleEnroll}
                className="
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
                Enroll Now →
              </button>

              <button
                onClick={handleDemo}
                className="
                  px-8
                  py-4
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  backdrop-blur-xl
                  text-white
                  flex
                  items-center
                  gap-3
                  hover:bg-white/10
                  transition-all
                "
              >
                <FaPlay />
                Watch Demo
              </button>

            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-14">

              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
                <FaUsers className="text-cyan-400 text-xl mb-2" />
                <h3 className="text-3xl font-bold text-white">
                  5K+
                </h3>
                <p className="text-slate-400 text-sm">
                  Students
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
                <FaBriefcase className="text-blue-400 text-xl mb-2" />
                <h3 className="text-3xl font-bold text-white">
                  95%
                </h3>
                <p className="text-slate-400 text-sm">
                  Placement
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
                <FaStar className="text-yellow-400 text-xl mb-2" />
                <h3 className="text-3xl font-bold text-white">
                  ₹8LPA
                </h3>
                <p className="text-slate-400 text-sm">
                  Avg Salary
                </p>
              </div>

            </div>
          </motion.div>

          {/* RIGHT CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9 }}
            className="relative"
          >

            {/* Floating React Icon */}
            <motion.div
              animate={{
                y: [-15, 15, -15],
                rotate: [0, 180, 360],
              }}
              transition={{
                repeat: Infinity,
                duration: 8,
              }}
              className="
                absolute
                -top-12
                right-10
                text-cyan-400
                text-7xl
              "
            >
              <FaReact />
            </motion.div>

            {/* Main Card */}
            <div
              className="
                relative
                overflow-hidden
                rounded-[32px]
                border
                border-white/10
                bg-white/[0.05]
                backdrop-blur-2xl
                p-10
                shadow-[0_25px_80px_rgba(0,0,0,0.4)]
              "
            >

              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />

              <div className="relative">

                <div className="flex items-center gap-4 mb-8">

                  <div
                    className="
                      w-16
                      h-16
                      rounded-2xl
                      bg-gradient-to-r
                      from-cyan-500
                      to-blue-500
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <FaReact className="text-3xl text-white" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      React Bootcamp
                    </h3>
                    <p className="text-slate-400">
                      Industry Ready Program
                    </p>
                  </div>

                </div>

                <div className="space-y-4 text-slate-300">

                  <div className="flex items-center gap-3">
                    ✅ 30+ Real Projects
                  </div>

                  <div className="flex items-center gap-3">
                    ✅ Live Mentorship
                  </div>

                  <div className="flex items-center gap-3">
                    ✅ Redux Toolkit
                  </div>

                  <div className="flex items-center gap-3">
                    ✅ Placement Support
                  </div>

                  <div className="flex items-center gap-3">
                    ✅ Interview Preparation
                  </div>

                </div>

                <button
                  onClick={handleStartLearning}
                  className="
                    mt-8
                    w-full
                    py-4
                    rounded-2xl
                    font-semibold
                    text-white
                    bg-gradient-to-r
                    from-cyan-500
                    via-blue-500
                    to-purple-600
                    hover:scale-[1.02]
                    transition-all
                  "
                >
                  Start Learning →
                </button>

              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ReactHeroSection;