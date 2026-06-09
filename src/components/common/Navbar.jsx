import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";

const courseLinks = [
  { label: "React JS Development", to: "/react-course" },
  { label: "MERN Stack Development", to: "/mern-course" },
  { label: "Python Development", to: "/python-course" },
  { label: "AI Engineer Program", to: "/ai-course" },
  { label: "View All Courses", to: "/courses" },
];

const internshipLinks = [
  { label: "Full Stack Internship", to: "/fullstack-internship" },
  { label: "React Internship", to: "/react-internship" },
  { label: "Python Internship", to: "/python-internship" },
];

const discoverLinks = [
  { label: "About", to: "/about" },
  { label: "Gallery", to: "/gallery" },
  { label: "Blogs", to: "/blogs" },
  { label: "Reviews", to: "/reviews" },
  { label: "Privacy Policy", to: "/privacy-policy" },
];

function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <>
      <div className="bg-slate-950 text-slate-300">
  <div className="max-w-7xl mx-auto flex h-12 items-center justify-between px-4 text-sm md:px-6">

    <span className="hidden md:block">
      Welcome to Pirnav EduTech
    </span>

    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <FaPhoneAlt className="text-sky-400" />
        <span>+91 99510 29900</span>
      </div>

      <div className="flex items-center gap-2">
        <FaEnvelope className="text-sky-400" />
        <span>info@pirnavedutech.com</span>
      </div>
    </div>
         
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/95 backdrop-blur-xl shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 md:px-6">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center">
                <img
                  src="https://www.pirnav.com/images/pirnav_logo.png"
                  alt="Pirnav Edutech"
                  className="h-10 w-10 object-contain"
                />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  Learn · Build · Grow
                </p>
              </div>
            </Link>

            <nav className="hidden items-center gap-10 lg:flex">
              <Link
                to="/"
                className="text-sm font-semibold text-slate-700 transition hover:text-slate-900"
              >
                Home
              </Link>

              <div className="relative group">
                <button className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-slate-900">
                  Courses
                  <FaChevronDown className="text-xs" />
                </button>
                <div
                  className="
    absolute
    left-1/2
    top-full
    -translate-x-1/2
    mt-4
    w-[950px]
    opacity-0
    invisible
    translate-y-4
    group-hover:opacity-100
    group-hover:visible
    group-hover:translate-y-0
    transition-all
    duration-300
    z-50
  "
                >
                  <div
                    className="
      bg-white
      rounded-[32px]
      border
      border-slate-200
      shadow-[0_30px_100px_rgba(15,23,42,0.15)]
      overflow-hidden
    "
                  >
                    <div className="grid grid-cols-3">
                      {/* Left */}
                      <div className="p-8 border-r border-slate-100">
                        <h3 className="font-bold text-lg text-slate-900 mb-5">
                          Popular Courses
                        </h3>

                        <div className="space-y-4">
                      <Link
  to="/python-course"
  className="block hover:text-cyan-600"
>
  🚀 Python Development
</Link>

                          <Link
                            to="/react-course"
                            className="block hover:text-cyan-600"
                          >
                            ⚛ React JS Development
                          </Link>

                          <Link
                            to="/ai-course"
                            className="block hover:text-cyan-600"
                              >
                            🤖 Artificial Intelligence
                          </Link>

                          <Link
                            to="/data-science-course"
                            className="block hover:text-cyan-600"
                          >
                            📊 Data Science
                          </Link>
                        </div>
                      </div>

                      {/* Center */}
                      <div className="p-8 border-r border-slate-100">
                        <h3 className="font-bold text-lg text-slate-900 mb-5">
                          Career Paths
                        </h3>

                        <div className="space-y-4">
                          <Link
                            to="/frontend-developer"
                            className="block hover:text-cyan-600"
                          >
                            Frontend Developer
                          </Link>

                          <Link to="/full-stack-developer" className="block hover:text-cyan-600">
                            Full Stack Developer
                          </Link>

                          <Link to="/ai-engineer" className="block hover:text-cyan-600">
                            AI Engineer
                          </Link>

                          <Link to="/data-analyst" className="block hover:text-cyan-600">
                            Data Analyst
                          </Link>
                        </div>
                      </div>

                      {/* Right */}
                      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-8">
                        <h3 className="font-bold text-xl text-slate-900">
                          Get Free Career Guidance
                        </h3>

                        <p className="text-slate-600 mt-3">
                          Talk with our experts and choose the right career
                          path.
                        </p>

                        <button
                          className="
            mt-6
            px-6
            py-3
            rounded-xl
            bg-gradient-to-r
            from-cyan-500
            to-blue-600
            text-white
            font-semibold
            hover:scale-[1.02]
            transition  
            cursor-pointer
          "
                        >
                          Book Consultation
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* internships */}

              <div className="relative group">
                <button className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-cyan-600 transition">
                  Internships
                  <FaChevronDown className="text-xs transition-transform duration-300 group-hover:rotate-180" />
                </button>

                <div
                  className="
      absolute
      left-1/2
      top-full
      -translate-x-1/2
      pt-4
      w-[650px]
      opacity-0
      invisible
      translate-y-3
      group-hover:opacity-100
      group-hover:visible
      group-hover:translate-y-0
      transition-all
      duration-300
      z-50
    "
                >
                  <div
                    className="
        bg-white
        rounded-[28px]
        border
        border-slate-200
        shadow-[0_25px_80px_rgba(15,23,42,0.12)]
        overflow-hidden
      "
                  >
                    <div className="grid grid-cols-2">
                      {/* LEFT */}
                      <div className="p-6">
                        <h3 className="font-bold text-lg text-slate-900 mb-4">
                          Internship Programs
                        </h3>

                        <div className="space-y-3">
                          <Link
                            to="/internships/react"
                            className="block p-4 rounded-2xl hover:bg-slate-50 transition"
                          >
                            <h4 className="font-semibold text-slate-800">
                              React JS Internship
                            </h4>
                            <p className="text-sm text-slate-500">
                              3 Months • Live Projects
                            </p>
                          </Link>

                          <Link
                            to="/internships/python"
                            className="block p-4 rounded-2xl hover:bg-slate-50 transition"
                          >
                            <h4 className="font-semibold text-slate-800">
                              Python Internship
                            </h4>
                            <p className="text-sm text-slate-500">
                              3 Months • Certification
                            </p>
                          </Link>

                          <Link
                            to="/internships/fullstack"
                            className="block p-4 rounded-2xl hover:bg-slate-50 transition"
                          >
                            <h4 className="font-semibold text-slate-800">
                              Full Stack Internship
                            </h4>
                            <p className="text-sm text-slate-500">
                              Real Client Projects
                            </p>
                          </Link>
                        </div>
                      </div>

                      {/* RIGHT */}
                      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6">
                        <span className="inline-flex px-3 py-1 rounded-full bg-cyan-100 text-cyan-700 text-xs font-semibold">
                          Limited Seats
                        </span>

                        <h3 className="mt-4 text-2xl font-bold text-slate-900">
                          Kickstart Your Career
                        </h3>

                        <p className="mt-3 text-slate-600">
                          Work on real-world projects, receive mentorship, and
                          gain internship certification.
                        </p>

                        <div className="mt-6 space-y-3">
                          <div className="flex items-center gap-2 text-sm text-slate-700">
                            ✓ Live Mentorship
                          </div>

                          <div className="flex items-center gap-2 text-sm text-slate-700">
                            ✓ Internship Certificate
                          </div>

                          <div className="flex items-center gap-2 text-sm text-slate-700">
                            ✓ Placement Assistance
                          </div>
                        </div>

                        <button
                          className="
              mt-6
              w-full
              py-3
              rounded-xl
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              text-white
              font-semibold
              hover:scale-[1.02]
              transition
            "
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <button className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-slate-900">
                  Discover
                  <FaChevronDown className="text-xs" />
                </button>
                <div className="absolute left-0 top-full mt-0 pt-3 w-72 rounded-3xl border border-slate-200 bg-white p-3 shadow-2xl opacity-0 invisible transition duration-300 group-hover:opacity-100 group-hover:visible">
                  {discoverLinks.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="block rounded-2xl px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                to="/contact"
                className="text-sm font-semibold text-slate-700 transition hover:text-slate-900"
              >
                Contact
              </Link>
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
           
              <Link
                to="/enroll"
                className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-xl shadow-slate-900/10 transition duration-300 hover:bg-slate-800"
              >
                Enroll Now
              </Link>
            </div>

            <button
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-2xl text-slate-800 transition hover:border-slate-300 hover:bg-slate-50 lg:hidden"
              aria-label="Toggle navigation menu"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              {mobileMenu ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {mobileMenu && (
            <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/10 lg:hidden">
              <div className="flex flex-col gap-4">
                <Link
                  to="/"
                  onClick={() => setMobileMenu(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                >
                  Home
                </Link>

                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="mb-3 text-sm font-semibold text-slate-700">
                    Courses
                  </p>
                  <div className="grid gap-2">
                    {courseLinks.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setMobileMenu(false)}
                        className="block rounded-2xl px-4 py-3 text-sm text-slate-700 transition hover:bg-white"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="mb-3 text-sm font-semibold text-slate-700">
                    Internships
                  </p>
                  <div className="grid gap-2">
                    {internshipLinks.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setMobileMenu(false)}
                        className="block rounded-2xl px-4 py-3 text-sm text-slate-700 transition hover:bg-white"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="mb-3 text-sm font-semibold text-slate-700">
                    Discover
                  </p>
                  <div className="grid gap-2">
                    {discoverLinks.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setMobileMenu(false)}
                        className="block rounded-2xl px-4 py-3 text-sm text-slate-700 transition hover:bg-white"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link
                  to="/contact"
                  onClick={() => setMobileMenu(false)}
                  className="rounded-full bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}

export default Navbar;
