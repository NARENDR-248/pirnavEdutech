import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaArrowRight,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import { useThemeContext } from "../../context/ThemeContext";

function Footer() {
  const { isDark } = useThemeContext();

  const courses = [
    { name: "React JS", path: "/react-course" },
    { name: "MERN Stack", path: "/mern-course" },
    { name: "Python", path: "/python-course" },
    { name: "AI Development", path: "/ai-development-course" },
    { name: "Full Stack", path: "/full-stack-course" },
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "Mentors", path: "/mentors" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <footer
      className={`relative overflow-hidden transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white"
          : "bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 text-slate-900"
      } pt-20`}
    >
      {/* Background Glow */}
      <div
        className={`absolute top-0 left-0 w-80 h-80 blur-3xl rounded-full ${
          isDark ? "bg-cyan-500/10" : "bg-blue-200/40"
        }`}
      />
      <div
        className={`absolute bottom-0 right-0 w-80 h-80 blur-3xl rounded-full ${
          isDark ? "bg-purple-500/10" : "bg-purple-200/40"
        }`}
      />

      <div className="relative max-w-7xl mx-auto px-5">
        {/* ================= TOP SECTION ================= */}
        <div
          className={`grid md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b ${
            isDark ? "border-white/10" : "border-slate-200"
          }`}
        >
          {/* ================= BRAND ================= */}
          <div>
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img
                src="https://www.pirnav.com/images/pirnav_logo.png"
                alt="Pirnav"
                className="w-12 h-12 object-contain"
              />
              <p
                className={`text-xs tracking-[3px] uppercase font-semibold ${
                  isDark ? "text-gray-500" : "text-slate-400"
                }`}
              >
                Learn • Build • Grow
              </p>
            </Link>

            {/* Description */}
            <p
              className={`leading-relaxed mb-8 ${
                isDark ? "text-gray-400" : "text-slate-500"
              }`}
            >
              Learn modern technologies with professional mentors, real-world projects, and
              premium industry-focused courses.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <button
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                  isDark
                    ? "bg-white/10 hover:bg-blue-600 text-white"
                    : "bg-slate-200 hover:bg-blue-500 text-slate-600 hover:text-white"
                }`}
              >
                <FaFacebookF />
              </button>
              <button
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                  isDark
                    ? "bg-white/10 hover:bg-sky-500 text-white"
                    : "bg-slate-200 hover:bg-sky-500 text-slate-600 hover:text-white"
                }`}
              >
                <FaTwitter />
              </button>
              <button
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                  isDark
                    ? "bg-white/10 hover:bg-pink-500 text-white"
                    : "bg-slate-200 hover:bg-pink-500 text-slate-600 hover:text-white"
                }`}
              >
                <FaInstagram />
              </button>
              <button
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                  isDark
                    ? "bg-white/10 hover:bg-blue-700 text-white"
                    : "bg-slate-200 hover:bg-blue-600 text-slate-600 hover:text-white"
                }`}
              >
                <FaLinkedinIn />
              </button>
            </div>
          </div>

          {/* ================= QUICK LINKS ================= */}
          <div>
            <h3
              className={`text-2xl font-bold mb-6 ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Quick Links
            </h3>
            <div className="space-y-4">
              {quickLinks.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`flex items-center gap-3 transition duration-300 group ${
                    isDark
                      ? "text-gray-400 hover:text-cyan-400"
                      : "text-slate-500 hover:text-cyan-600"
                  }`}
                >
                  <FaArrowRight className="text-sm group-hover:translate-x-1 transition duration-300" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* ================= COURSES ================= */}
          <div>
            <h3
              className={`text-2xl font-bold mb-6 ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Popular Courses
            </h3>
            <div className="space-y-4">
              {courses.map((course, index) => (
                <Link
                  key={index}
                  to={course.path}
                  className={`block transition-all duration-300 ${
                    isDark
                      ? "text-gray-400 hover:text-cyan-400 hover:translate-x-2"
                      : "text-slate-500 hover:text-cyan-600 hover:translate-x-2"
                  }`}
                >
                  {course.name}
                </Link>
              ))}
            </div>
          </div>

          {/* ================= NEWSLETTER ================= */}
          <div>
            <h3
              className={`text-2xl font-bold mb-6 ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Newsletter
            </h3>
            <p
              className={`leading-relaxed mb-6 ${
                isDark ? "text-gray-400" : "text-slate-500"
              }`}
            >
              Subscribe to get latest course updates and learning resources directly to your
              inbox.
            </p>

            {/* Input */}
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full border outline-none px-5 py-4 rounded-2xl backdrop-blur-xl transition duration-300 ${
                  isDark
                    ? "bg-white/10 border-white/10 focus:border-cyan-400 text-white placeholder:text-gray-400"
                    : "bg-white border-slate-300 focus:border-cyan-500 text-slate-900 placeholder:text-slate-400 shadow-sm"
                }`}
              />
              <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-indigo-700 text-white py-4 rounded-2xl font-bold shadow-[0_15px_40px_rgba(59,130,246,0.25)] hover:scale-[1.02] transition-all duration-300">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM ================= */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 py-8">
          <p
            className={`text-center md:text-left ${
              isDark ? "text-gray-400" : "text-slate-500"
            }`}
          >
            © 2026 pirnavEdutech. All Rights Reserved.
          </p>

          <div
            className={`flex items-center gap-6 ${
              isDark ? "text-gray-400" : "text-slate-500"
            }`}
          >
            <button
              className={`transition duration-300 ${
                isDark ? "hover:text-cyan-400" : "hover:text-cyan-600"
              }`}
            >
              Privacy Policy
            </button>
            <button
              className={`transition duration-300 ${
                isDark ? "hover:text-cyan-400" : "hover:text-cyan-600"
              }`}
            >
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
