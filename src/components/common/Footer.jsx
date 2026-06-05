import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaArrowRight,
  FaGraduationCap,
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Footer() {

  const courses = [
  {
    name: "React JS",
    path: "/react-course",
  },
  {
    name: "MERN Stack",
    path: "/mern-course",
  },
  {
    name: "Python",
    path: "/python-course",
  },
  {
    name: "AI Development",
    path: "/ai-development-course",
  },
  {
    name: "Full Stack",
    path: "/full-stack-course",
  },
];

  const quickLinks = [
  { name: "Home", path: "/" },
  { name: "Courses", path: "/courses" },
  { name: "Mentors", path: "/mentors" },
  { name: "Dashboard", path: "/dashboard" },
];
  return (

    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white pt-20">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-500/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/10 blur-3xl rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-5">

        {/* ================= TOP SECTION ================= */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">

          {/* ================= BRAND ================= */}
          <div>

            {/* Logo */}
           <Link to="/" className="flex items-center gap-3">
            <img
              src="https://www.pirnav.com/images/pirnav_logo.png"
              alt="Pirnav"
              className="w-12 h-12 object-contain"
            />

            <p className="text-xs text-gray-500 tracking-[3px] uppercase font-semibold">
              Learn • Build • Grow
            </p>
          </Link>

            {/* Description */}
            <p className="text-gray-400 leading-relaxed mb-8">

              Learn modern technologies with professional
              mentors, real-world projects, and premium
              industry-focused courses.

            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4">

              <button className="w-11 h-11 rounded-full bg-white/10 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110">

                <FaFacebookF />

              </button>

              <button className="w-11 h-11 rounded-full bg-white/10 hover:bg-sky-500 flex items-center justify-center transition-all duration-300 hover:scale-110">

                <FaTwitter />

              </button>

              <button className="w-11 h-11 rounded-full bg-white/10 hover:bg-pink-500 flex items-center justify-center transition-all duration-300 hover:scale-110">

                <FaInstagram />

              </button>

              <button className="w-11 h-11 rounded-full bg-white/10 hover:bg-blue-700 flex items-center justify-center transition-all duration-300 hover:scale-110">

                <FaLinkedinIn />

              </button>

            </div>

          </div>

          {/* ================= QUICK LINKS ================= */}
          <div>

            <h3 className="text-2xl font-bold mb-6">

              Quick Links

            </h3>

           <div className="space-y-4">
  {quickLinks.map((item, index) => (
    <Link
      key={index}
      to={item.path}
      className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition duration-300 group"
    >
      <FaArrowRight className="text-sm group-hover:translate-x-1 transition duration-300" />

      {item.name}
    </Link>
  ))}
</div>

          </div>

          {/* ================= COURSES ================= */}
          <div>

            <h3 className="text-2xl font-bold mb-6">

              Popular Courses

            </h3>

            

<div className="space-y-4">

  {courses.map((course, index) => (

    <Link
      key={index}
      to={course.path}
      className="
      block
      text-gray-400
      hover:text-cyan-400
      hover:translate-x-2
      transition-all
      duration-300
      "
    >
      {course.name}
    </Link>

  ))}

</div>

          </div>

          {/* ================= NEWSLETTER ================= */}
          <div>

            <h3 className="text-2xl font-bold mb-6">

              Newsletter

            </h3>

            <p className="text-gray-400 leading-relaxed mb-6">

              Subscribe to get latest course updates and
              learning resources directly to your inbox.

            </p>

            {/* Input */}
            <div className="space-y-4">

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white/10 border border-white/10 focus:border-cyan-400 outline-none px-5 py-4 rounded-2xl placeholder:text-gray-400 text-white backdrop-blur-xl transition duration-300"
              />

              <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-indigo-700 text-white py-4 rounded-2xl font-bold shadow-[0_15px_40px_rgba(59,130,246,0.25)] hover:scale-[1.02] transition-all duration-300">

                Subscribe Now

              </button>

            </div>

          </div>

        </div>

        {/* ================= BOTTOM ================= */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 py-8">

          <p className="text-gray-400 text-center md:text-left">

            © 2026 pirnavEdutech. All Rights Reserved.

          </p>

          <div className="flex items-center gap-6 text-gray-400">

            <button className="hover:text-cyan-400 transition duration-300">

              Privacy Policy

            </button>

            <button className="hover:text-cyan-400 transition duration-300">

              Terms & Conditions

            </button>

          </div>

        </div>

      </div>

    </footer>

  );
}

export default Footer;