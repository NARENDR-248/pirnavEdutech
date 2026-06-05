import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaChevronDown,
  FaReact,
  FaPython,
  FaNodeJs,
  FaFileAlt,
  FaGraduationCap,
  FaBlog,
  FaClipboardCheck,
} from "react-icons/fa";

function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showPrograms, setShowPrograms] = useState(false);
  const [showResources, setShowResources] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-20 flex items-center justify-between">

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

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-10">

            {/* Programs */}
            <div
              className="relative"
              onMouseEnter={() => setShowPrograms(true)}
              onMouseLeave={() => setShowPrograms(false)}
            >
              <button className="flex items-center gap-2 text-[17px] font-semibold text-slate-700 hover:text-blue-600">
                Programs
                <FaChevronDown
                  className={`text-xs transition ${showPrograms ? "rotate-180" : ""
                    }`}
                />
              </button>

              {showPrograms && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-0 w-[1100px]">
                  <div className="h-4"></div>
                  <div className="bg-white rounded-3xl shadow-xl border overflow-hidden">
                    <div className="grid grid-cols-3">

                      {/* Software */}
                      <div className="p-8 border-r">
                        <h3 className="text-blue-600 font-bold mb-6">
                          Software Development
                        </h3>

                        <Link to="/react-course" className="flex gap-4 p-3 hover:bg-blue-50 rounded-xl">
                          <FaReact className="text-cyan-600 text-xl" />
                          <span>React Development</span>
                        </Link>

                        <Link to="/mern-course" className="flex gap-4 p-3 hover:bg-blue-50 rounded-xl">
                          <FaNodeJs className="text-green-600 text-xl" />
                          <span>MERN Stack</span>
                        </Link>
                      </div>

                      {/* AI */}
                      <div className="p-8 border-r">
                        <h3 className="text-blue-600 font-bold mb-6">
                          Data & AI
                        </h3>

                        <Link to="/python-course" className="flex gap-4 p-3 hover:bg-blue-50 rounded-xl">
                          <FaPython className="text-yellow-600 text-xl" />
                          <span>Python Development</span>
                        </Link>

                        <Link to="/ai-course" className="flex gap-4 p-3 hover:bg-blue-50 rounded-xl">
                          🤖 <span>AI Engineer</span>
                        </Link>
                      </div>

                      {/* Highlight */}
                      <div className="bg-blue-600 text-white p-8">
                        <h2 className="text-2xl font-bold">
                          AI Engineer Program
                        </h2>
                        <p className="mt-2 text-sm">
                          Learn ML, LLM, LangChain & more
                        </p>
                      </div>

                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Resources */}
            <div
              className="relative"
              onMouseEnter={() => setShowResources(true)}
              onMouseLeave={() => setShowResources(false)}
            >
              <button className="flex items-center gap-2 text-[17px] font-semibold text-slate-700 hover:text-blue-600">
                Resources
                <FaChevronDown
                  className={`text-xs transition ${showResources ? "rotate-180" : ""
                    }`}
                />
              </button>

              {showResources && (
                <div className="absolute top-full mt-0 pt-2 w-[500px]">
                  <div className="bg-white shadow-xl rounded-2xl p-6 grid grid-cols-2 gap-4">

                    <Link to="/resume-builder" className="p-3 hover:bg-blue-50 rounded-xl flex gap-2">
                      <FaFileAlt /> Resume Builder
                    </Link>

                    <Link to="/interview-guides" className="p-3 hover:bg-blue-50 rounded-xl flex gap-2">
                      <FaGraduationCap /> Interview Guides
                    </Link>

                    <Link to="/practice-tests" className="p-3 hover:bg-blue-50 rounded-xl flex gap-2">
                      <FaClipboardCheck /> Practice Tests
                    </Link>

                    <Link to="/blog" className="p-3 hover:bg-blue-50 rounded-xl flex gap-2">
                      <FaBlog /> Blog
                    </Link>

                  </div>
                </div>
              )}
            </div>

            <Link to="/career">Career</Link>
            <Link to="/courses">courses</Link>
            <Link to="/about">About</Link>




          </div>


          {/* Right Buttons */}
          <div className="hidden lg:flex gap-4">
            <button className="border px-4 py-2 rounded-lg">
              Login
            </button>
            <Link to="/enroll">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              Enroll
            </button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-2xl"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <FaTimes /> : <FaBars />}
          </button>

        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="lg:hidden bg-white p-5 space-y-4 shadow-md">
            <Link to="/react-course">React</Link>
            <Link to="/mern-course">MERN</Link>
            <Link to="/python-course">Python</Link>
            <Link to="/ai-course">AI</Link>
          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;