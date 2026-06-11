import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  FaReact,
  FaPython,
  FaCode,
  FaBrain,
  FaAws,
  FaShieldAlt,
  FaStar,
  FaUsers,
} from "react-icons/fa";

import "swiper/css";

const courses = [
  { title: "React", path: "/react", icon: <FaReact />, color: "from-cyan-400 to-blue-600" },
  { title: "Python", path: "/python", icon: <FaPython />, color: "from-yellow-400 to-orange-500" },
  { title: "MERN", path: "/mern", icon: <FaCode />, color: "from-teal-400 to-cyan-600" },
  { title: "AI/ML", path: "/ml", icon: <FaBrain />, color: "from-purple-500 to-pink-600" },
  { title: "DevOps", path: "/devops", icon: <FaAws />, color: "from-blue-500 to-indigo-700" },
  { title: "Cyber", path: "/cyber", icon: <FaShieldAlt />, color: "from-gray-700 to-black" },
];

export default function NetflixCarousel() {
  const navigate = useNavigate();

  return (
    <section className="bg-[#020b14] py-16 text-white overflow-hidden relative">

      {/* Glow Background */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/10 blur-[120px]" />

      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">
          Trending <span className="text-cyan-400">Courses</span>
        </h2>
        <p className="text-slate-400 text-sm mt-2">
          Netflix-style infinite learning experience
        </p>
      </div>

      {/* Carousel */}
      <Swiper
        modules={[Autoplay, FreeMode]}
        loop={true}
        speed={8000}
        freeMode={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        slidesPerView={2}
        spaceBetween={20}
        breakpoints={{
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {[...courses, ...courses].map((course, i) => (
          <SwiperSlide key={i}>
            <motion.div
              whileHover={{ scale: 1.08 }}
              className="relative group cursor-pointer"
              onClick={() => navigate(course.path)}
            >

              {/* Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${course.color} opacity-10 blur-2xl rounded-2xl`}
              />

              {/* Card */}
              <div className="relative h-[180px] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 flex flex-col justify-between">

                {/* Avatar */}
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-r ${course.color}`}>
                  {course.icon}
                </div>

                {/* Title */}
                <h3 className="text-sm font-semibold mt-2">
                  {course.title}
                </h3>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" /> 4.9
                  </span>
                  <span className="flex items-center gap-1">
                    <FaUsers /> 2k+
                  </span>
                </div>

                {/* CTA */}
                <button className="mt-3 py-2 text-xs rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition">
                  Explore
                </button>

              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}