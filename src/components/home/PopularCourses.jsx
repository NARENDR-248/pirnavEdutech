import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Tilt from "react-parallax-tilt";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FaReact,
  FaPython,
  FaJava,
  FaAws,
  FaUsers,
  FaStar,
  FaClock,
  FaArrowRight,
  FaNodeJs,
  FaCode,
  FaChartLine,
  FaBrain,
  FaBug,
  FaDatabase,
  FaRobot,
  FaShieldAlt,
} from "react-icons/fa";

import "swiper/css";

const courses = [
  {
    id: 1,
    title: "React Development",
    path: "/courses/react-development",
    icon: <FaReact />,
    rating: "4.9",
    students: "2.5k+",
    duration: "4 Months",
    color: "from-cyan-400 to-blue-600",
    description: "React • Hooks • Redux • Tailwind CSS",
  },
  {
    id: 2,
    title: "Python Full Stack",
    path: "/courses/python-full-stack",
    icon: <FaPython />,
    rating: "4.8",
    students: "3.2k+",
    duration: "6 Months",
    color: "from-yellow-400 to-orange-500",
    description: "Python • Django • REST API • MySQL",
  },
  {
    id: 3,
    title: "Java Full Stack",
    path: "/courses/java-full-stack",
    icon: <FaJava />,
    rating: "4.9",
    students: "4k+",
    duration: "6 Months",
    color: "from-purple-500 to-pink-500",
    description: "Java • Spring Boot • Hibernate • SQL",
  },
  {
    id: 4,
    title: "AWS DevOps",
    path: "/courses/aws-devops",
    icon: <FaAws />,
    rating: "4.8",
    students: "1.8k+",
    duration: "5 Months",
    color: "from-blue-500 to-indigo-700",
    description: "AWS • Docker • Jenkins • Kubernetes",
  },
  {
    id: 5,
    title: "Node JS Development",
    path: "/courses/nodejs-development",
    icon: <FaNodeJs />,
    rating: "4.8",
    students: "2.2k+",
    duration: "4 Months",
    color: "from-green-400 to-emerald-600",
    description: "Node.js • Express • MongoDB • JWT",
  },
  {
    id: 6,
    title: "MERN Stack",
    path: "/courses/mern-stack",
    icon: <FaCode />,
    rating: "4.9",
    students: "3.8k+",
    duration: "6 Months",
    color: "from-teal-400 to-cyan-600",
    description: "MongoDB • Express • React • Node",
  },
  {
    id: 7,
    title: "Data Science",
    path: "/courses/data-science",
    icon: <FaChartLine />,
    rating: "4.9",
    students: "3.5k+",
    duration: "6 Months",
    color: "from-pink-400 to-rose-600",
    description: "Pandas • NumPy • Power BI • Analytics",
  },
  {
    id: 8,
    title: "Machine Learning",
    path: "/courses/machine-learning",
    icon: <FaBrain />,
    rating: "4.9",
    students: "2.9k+",
    duration: "5 Months",
    color: "from-violet-500 to-purple-700",
    description: "ML • Scikit-Learn • TensorFlow • AI",
  },
  {
    id: 9,
    title: "Software Testing",
    path: "/courses/software-testing",
    icon: <FaBug />,
    rating: "4.7",
    students: "1.9k+",
    duration: "3 Months",
    color: "from-red-400 to-orange-600",
    description: "Manual • Selenium • API Testing • QA",
  },
  {
    id: 10,
    title: "Oracle Fusion HCM",
    path: "/courses/oracle-fusion-hcm",
    icon: <FaDatabase />,
    rating: "4.8",
    students: "1.5k+",
    duration: "4 Months",
    color: "from-blue-400 to-sky-600",
    description: "HCM • Payroll • Core HR • Oracle Cloud",
  },
  {
    id: 11,
    title: "Generative AI",
    path: "/courses/generative-ai",
    icon: <FaRobot />,
    rating: "4.9",
    students: "2.7k+",
    duration: "5 Months",
    color: "from-fuchsia-500 to-indigo-700",
    description: "LLMs • LangChain • OpenAI • Prompting",
  },
  {
    id: 12,
    title: "Cyber Security",
    path: "/courses/cyber-security",
    icon: <FaShieldAlt />,
    rating: "4.8",
    students: "2.1k+",
    duration: "5 Months",
    color: "from-gray-700 to-black",
    description: "Ethical Hacking • Network Security • SOC",
  },
];

function PopularCourses() {
  const glowRef = useRef(null);
  const navigate = useNavigate();

  // 🔥 Mouse Follow Glow
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    glowRef.current.style.transform = `translate(${clientX}px, ${clientY}px)`;
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative py-32 bg-black overflow-hidden"
    >
      {/* 🔥 Cursor Glow */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed w-72 h-72 bg-cyan-500/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 transition"
      />

      <div className="max-w-7xl mx-auto px-5 relative">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl font-extrabold text-white">
            Professional Development{" "}
            <span className="text-cyan-400">Programs</span>
          </h2>
          <p className="text-gray-400 mt-4">
            Learn with top mentors & real-world projects
          </p>
        </motion.div>

        {/* Slider */}
        <Swiper
          modules={[Autoplay]}
          loop
          centeredSlides
          slidesPerView={1.2}
          spaceBetween={40}
          autoplay={{ delay: 2500 }}
          breakpoints={{
            768: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {courses.map((course) => (
            <SwiperSlide key={course.id}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="relative group h-full"
              >
                {/* Animated Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${course.color}
      blur-2xl opacity-20 group-hover:opacity-60 transition duration-500`}
                />

                <Tilt
                  tiltMaxAngleX={12}
                  tiltMaxAngleY={12}
                  scale={1.02}
                  transitionSpeed={1200}
                >
                  <div
                    className="
        relative
        bg-white/5
        backdrop-blur-xl
        border border-white/10
        rounded-3xl
        p-7
        h-[520px]
        flex
        flex-col
        justify-between
        overflow-hidden
        hover:border-cyan-400/40
        transition-all duration-500
      "
                  >
                    {/* Top Content */}
                    <div>
                      {/* Icon */}
                      <div
                        className={`
            w-20 h-20
            rounded-2xl
            bg-gradient-to-br
            ${course.color}
            flex items-center justify-center
            text-4xl text-white
            shadow-lg
          `}
                      >
                        {course.icon}
                      </div>

                      {/* Course Title */}
                      <h3 className="text-white text-2xl font-bold mt-6">
                        {course.title}
                      </h3>

                      {/* Description */}
                      <div className="mt-4 min-h-[90px]">
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {course.description}
                        </p>

                        <div
                          className={`mt-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${course.color}`}
                        >
                          Tech Skills
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-5 mt-5">
                        <span className="flex items-center gap-2 text-yellow-400 text-sm font-medium">
                          <FaStar />
                          {course.rating}
                        </span>

                        <span className="flex items-center gap-2 text-gray-300 text-sm">
                          <FaUsers />
                          {course.students}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Content */}
                    <div>
                      <div className="flex items-center gap-2 text-gray-400 text-sm mb-5">
                        <FaClock />
                        <span>{course.duration}</span>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(course.path)}
                        className="
              w-full
              py-3.5
              rounded-xl
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              text-white
              font-semibold
              flex
              items-center
              justify-center
              gap-2
              shadow-lg
              hover:shadow-cyan-500/30
              transition-all
              cursor-pointer
            "
                      >
                        Explore Course
                        <FaArrowRight />
                      </motion.button>
                    </div>

                    {/* Decorative Corner */}
                    <div
                      className={`
          absolute
          -top-12
          -right-12
          w-32
          h-32
          rounded-full
          bg-gradient-to-r
          ${course.color}
          opacity-10
        `}
                    />
                  </div>
                </Tilt>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}

export default PopularCourses;