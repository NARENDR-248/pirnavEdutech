import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
  FaLinkedin,
  FaMicrosoft,
  FaAmazon,
  FaGoogle,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const mentors = [
  {
    name: "Rahul Sharma",
    role: "Senior Python Architect",
    company: "Microsoft",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43d",
    icon: <FaMicrosoft />,
  },
  {
    name: "Priya Reddy",
    role: "Lead Backend Engineer",
    company: "Amazon",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    icon: <FaAmazon />,
  },
  {
    name: "Arjun Kumar",
    role: "AI Engineer",
    company: "Google",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    icon: <FaGoogle />,
  },
  {
    name: "Sneha Patel",
    role: "Data Scientist",
    company: "Microsoft",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    icon: <FaMicrosoft />,
  },
  {
    name: "Vikram Singh",
    role: "Python Tech Lead",
    company: "Amazon",
    image: "https://images.unsplash.com/photo-1504593811423-6dd665756598",
    icon: <FaAmazon />,
  },
  {
    name: "Neha Gupta",
    role: "ML Engineer",
    company: "Google",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    icon: <FaGoogle />,
  },
];

/* 🔥 3D Tilt + Spotlight */
const MentorCard = ({ mentor, height }) => {
  const cardRef = useRef();

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = -(y / rect.height - 0.5) * 12;
    const rotateY = (x / rect.width - 0.5) * 12;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

    // spotlight
    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  };

  const resetTilt = () => {
    cardRef.current.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
  };

  return (
    
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      className={`group relative ${height} rounded-3xl overflow-hidden transition duration-300`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Image */}
      <img
        src={mentor.image}
        alt={mentor.name}
        className="w-full h-full object-cover"
      />

      {/* Dark */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* 🔥 Spotlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500"
        style={{
          background: `radial-gradient(circle at var(--x) var(--y), rgba(255,255,255,0.25), transparent 40%)`,
        }}
      />

      {/* Glass */}
      <div className="absolute inset-0 backdrop-blur-xl bg-white/5 opacity-0 group-hover:opacity-100 transition" />

      {/* Content */}
      <div className="absolute bottom-0 p-6 z-10">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-sm mb-2">
          {mentor.icon}
          {mentor.company}
        </div>

        <h3 className="text-white font-bold">{mentor.name}</h3>
        <p className="text-slate-300 text-sm">{mentor.role}</p>

        <button className="mt-3 w-9 h-9 rounded-full bg-white text-black flex items-center justify-center">
          <FaLinkedin />
        </button>
      </div>
    </div>
  );
};

/* 🔁 Row */
const MentorRow = ({ height, reverse }) => {
  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={24}
      slidesPerView={1.2}
      loop={true}
      speed={5000}
      autoplay={{
        delay: 1, // ⚠️ IMPORTANT (not 0)
        disableOnInteraction: false,
        reverseDirection: reverse, // ✅ ONLY THIS
      }}
      breakpoints={{
        640: { slidesPerView: 1.5 },
        768: { slidesPerView: 2.2 },
        1024: { slidesPerView: 3.2 },
        1400: { slidesPerView: 4 },
      }}
    >
      {mentors.map((mentor, index) => (
        <SwiperSlide key={index}>
          <MentorCard mentor={mentor} height={height} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const PythonMentors = () => {
  return (
    <section className="py-28 bg-gradient-to-b from-slate-950 via-slate-900 to-black overflow-hidden relative">

      {/* 🔥 Glow Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/20 blur-[120px] rounded-full opacity-30" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* 🔥 Heading Section */}
        <div className="text-center mb-16">

          {/* Badge */}
          <div className="inline-block px-4 py-1 mb-4 text-sm text-blue-400 border border-blue-500/30 rounded-full bg-blue-500/10 backdrop-blur">
            🚀 Learn from Industry Experts
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Meet Your{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Python Mentors
            </span>
          </h2>

          {/* Subtext */}
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-lg">
            Get guided by top engineers from leading tech companies. Learn real-world skills,
            build production-ready projects, and accelerate your career.
          </p>

          {/* Divider Line */}
          <div className="mt-6 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
          </div>

        </div>

        {/* 🔁 Mentor Rows */}
        <div className="space-y-10">

          {/* RIGHT */}
          <MentorRow height="h-[260px]" reverse={false} />

          {/* LEFT */}
          <MentorRow height="h-[260px]" reverse={true} />
          <MentorRow height="h-[260px]" reverse={false} />

        </div>

      </div>
    </section>
  );
};
export default PythonMentors;