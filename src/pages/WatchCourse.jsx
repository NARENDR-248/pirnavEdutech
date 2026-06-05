import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

import {
  FaPlayCircle,
  FaClock,
  FaUsers,
  FaStar,
  FaCheckCircle,
} from "react-icons/fa";

import AOS from "aos";
import "aos/dist/aos.css";

import { useEffect } from "react";

function WatchCourse() {

  // ================= AOS =================
  useEffect(() => {

    AOS.init({
      duration: 1200,
      once: true,
      easing: "ease-in-out",
      offset: 80,
    });

  }, []);

  return (
    <>
      

      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white">

        {/* Background Glow */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-500/20 blur-3xl rounded-full"></div>

        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/20 blur-3xl rounded-full"></div>

        <div className="relative max-w-7xl mx-auto px-5 py-20 lg:py-28">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* ================= LEFT CONTENT ================= */}
            <div
              data-aos="fade-right"
            >

              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-2 rounded-full mb-6">

                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>

                <p className="text-sm font-medium tracking-wide">

                  Live Learning Experience

                </p>

              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">

                Watch &
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500">

                  Learn React JS

                </span>

              </h1>

              {/* Description */}
              <p className="text-lg text-gray-300 leading-relaxed mb-8">

                Master React JS with real-world projects,
                modern frontend architecture, Tailwind CSS,
                routing, APIs, authentication, and deployment.

              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-4 mb-10">

                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-3 rounded-2xl">

                  <FaStar className="text-yellow-400" />

                  <span>4.9 Rating</span>

                </div>

                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-3 rounded-2xl">

                  <FaUsers />

                  <span>12K+ Students</span>

                </div>

                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-3 rounded-2xl">

                  <FaClock />

                  <span>40 Hours</span>

                </div>

              </div>

              {/* Button */}
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-indigo-700 px-8 py-4 rounded-2xl font-bold shadow-[0_20px_60px_rgba(59,130,246,0.25)] hover:scale-105 transition-all duration-300">

                Start Learning

              </button>

            </div>

            {/* ================= VIDEO CARD ================= */}
            <div
              data-aos="fade-left"
              data-aos-delay="300"
              className="relative"
            >

              {/* Floating Card */}
              <div className="absolute -top-6 -left-6 bg-white text-gray-900 p-5 rounded-3xl shadow-2xl hidden md:block z-20">

                <p className="text-3xl font-extrabold text-blue-600 mb-1">

                  24+

                </p>

                <p className="text-gray-500">
                  Premium Lessons
                </p>

              </div>

              {/* Video Container */}
              <div className="relative rounded-[32px] overflow-hidden border border-white/10 shadow-[0_20px_100px_rgba(0,0,0,0.5)] bg-black">

                {/* Top Gradient */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 z-20"></div>

                {/* Video */}
               
                <iframe width="560" height="315" src="https://www.youtube.com/embed/pN6jk0uUrD8?si=1EcYT0oLBaGRf9HQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

              </div>

              {/* Bottom Floating Card */}
              <div className="absolute -bottom-6 right-6 bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-3xl shadow-2xl hidden md:block">

                <div className="flex items-center gap-3">

                  <FaPlayCircle className="text-cyan-400 text-2xl" />

                  <div>

                    <p className="text-white font-bold">
                      Hands-on Projects
                    </p>

                    <p className="text-sm text-gray-300">
                      Real-world learning
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= COURSE CONTENT ================= */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-20">

        <div className="max-w-7xl mx-auto px-5 grid lg:grid-cols-3 gap-10">

          {/* ================= LEFT CONTENT ================= */}
          <div className="lg:col-span-2 space-y-8">

            {/* Overview */}
            <div
              data-aos="fade-up"
              className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-md hover:shadow-xl transition duration-300"
            >

              <h2 className="text-3xl font-extrabold text-gray-900 mb-6">

                Course Overview

              </h2>

              <p className="text-lg text-gray-600 leading-relaxed">

                This professional React JS course helps you build
                modern web applications using components, hooks,
                Tailwind CSS, APIs, routing, authentication,
                Firebase, and deployment.

              </p>

            </div>

            {/* What You Learn */}
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-md hover:shadow-xl transition duration-300"
            >

              <h2 className="text-3xl font-extrabold text-gray-900 mb-8">

                What You'll Learn

              </h2>

              <div className="grid md:grid-cols-2 gap-5">

                {[
                  "React Fundamentals",
                  "Hooks & State Management",
                  "Tailwind CSS",
                  "Firebase Authentication",
                  "API Integration",
                  "Deployment & Hosting",
                ].map((item, index) => (

                  <div
                    key={index}
                    className="flex items-center gap-3 bg-slate-50 hover:bg-blue-50 p-5 rounded-2xl transition duration-300"
                  >

                    <FaCheckCircle className="text-green-500 text-xl" />

                    <span className="font-medium text-gray-700">

                      {item}

                    </span>

                  </div>

                ))}

              </div>

            </div>

          </div>

          {/* ================= SIDEBAR ================= */}
          <div
            data-aos="fade-left"
            data-aos-delay="300"
          >

            <div className="sticky top-28 bg-white rounded-[32px] p-8 border border-slate-100 shadow-xl">

              <h2 className="text-4xl font-extrabold text-blue-600 mb-6">

                $99

              </h2>

              {/* Buttons */}
              <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-indigo-700 hover:to-blue-700 text-white py-4 rounded-2xl font-bold shadow-[0_20px_60px_rgba(59,130,246,0.25)] hover:scale-[1.02] transition-all duration-300 mb-5">

                Enroll Now

              </button>

              <button className="w-full border border-slate-200 hover:bg-slate-50 py-4 rounded-2xl font-bold text-gray-700 transition duration-300">

                Add To Wishlist

              </button>

              {/* Details */}
              <div className="space-y-5 text-gray-600 mt-8">

                <div className="flex items-center justify-between">

                  <span>Lessons</span>
                  <span className="font-semibold">24</span>

                </div>

                <div className="flex items-center justify-between">

                  <span>Duration</span>
                  <span className="font-semibold">40 Hours</span>

                </div>

                <div className="flex items-center justify-between">

                  <span>Level</span>
                  <span className="font-semibold">Beginner</span>

                </div>

                <div className="flex items-center justify-between">

                  <span>Certificate</span>
                  <span className="font-semibold">Yes</span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

   
    </>
  );
}

export default WatchCourse;