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
            Future-Ready{" "}
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
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                {/* Glow Border */}
                <div className={`absolute inset-0 bg-gradient-to-r ${course.color} blur-xl opacity-30 group-hover:opacity-80 transition`} />

                <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} scale={1.05}>
                  <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 h-[420px] flex flex-col justify-between">

                    {/* Top */}
                    <div>
                      <div className={`w-16 h-16 flex items-center justify-center text-3xl text-white rounded-xl bg-gradient-to-br ${course.color}`}>
                        {course.icon}
                      </div>

                      <h3 className="text-white text-2xl font-bold mt-4">
                        {course.title}
                      </h3>

                      <div className="flex gap-4 mt-3 text-sm text-gray-300">
                        <span className="flex items-center gap-1 text-yellow-400">
                          <FaStar /> {course.rating}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaUsers /> {course.students}
                        </span>
                      </div>
                    </div>

                    {/* Bottom */}
                    <div>
                      <div className="text-gray-400 text-sm flex items-center gap-2 mb-4">
                        <FaClock /> {course.duration}
                      </div>

                      {/* 🔥 Magnetic Button */}
                     <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => navigate(course.path)}
  className="
  w-full
  bg-gradient-to-r
  from-cyan-500
  to-blue-600
  text-white
  py-3
  rounded-xl
  flex
  items-center
  justify-center
  gap-2
  font-semibold
  cursor-pointer
  "
>
  Explore Course
  <FaArrowRight />
</motion.button>
                    </div>

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