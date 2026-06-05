import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import CourseCard from "../components/courses/CourseCard";
import CourseCardSkeleton from "../components/common/CourseCardSkeleton";

import AOS from "aos";
import "aos/dist/aos.css";

import { FaSearch } from "react-icons/fa";

function Courses() {

  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {

    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });

    fetchCourses();

  }, []);

  const fetchCourses = async () => {

    try {

      const response = await axios.get(
        "http://localhost:3000/api/courses"
      );

      setCourses(response.data);
      setFilteredCourses(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  const categories = [
    "All",
    "Frontend",
    "Backend",
    "Full Stack",
    "Database",
    "Cloud",
    "AI",
    "Programming",
    "Security",
  ];

  const filterCourses = (category) => {

    setActiveCategory(category);

    if (category === "All") {

      setFilteredCourses(courses);

      return;
    }

    const filtered = courses.filter(
      (course) =>
        course.Category === category
    );

    setFilteredCourses(filtered);
  };

  useEffect(() => {

    let filtered = courses;

    if (activeCategory !== "All") {

      filtered = filtered.filter(
        (course) =>
          course.Category === activeCategory
      );
    }

    filtered = filtered.filter((course) =>
      course.Title.toLowerCase().includes(
        search.toLowerCase()
      )
    );

    setFilteredCourses(filtered);

  }, [search, activeCategory, courses]);

  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white">

        <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-500/20 blur-3xl rounded-full"></div>

        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/20 blur-3xl rounded-full"></div>

        <div className="relative max-w-7xl mx-auto px-5 py-24 text-center">

          <div
            data-aos="fade-down"
            className="inline-flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-xl px-5 py-2 rounded-full mb-6"
          >

            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>

            <span className="text-sm font-medium">
              100+ Premium Courses
            </span>

          </div>

          <h1
            data-aos="zoom-in"
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6"
          >

            Explore Your

            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">

              Dream Career

            </span>

          </h1>

          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-lg text-gray-300 max-w-3xl mx-auto"
          >

            Learn React JS, MERN Stack, Python,
            Artificial Intelligence, Cloud Computing,
            Cyber Security and more from industry experts.

          </p>

        </div>

      </section>

      {/* COURSES SECTION */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-20">

        <div className="max-w-7xl mx-auto px-5">

          {/* SEARCH */}
          <div
            data-aos="fade-up"
            className="relative mb-10"
          >

            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search Courses..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full pl-14 pr-5 py-4 rounded-2xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* CATEGORIES */}
          <div
            data-aos="fade-up"
            className="flex flex-wrap gap-4 mb-14"
          >

            {categories.map((category) => (

              <button
                key={category}
                onClick={() =>
                  filterCourses(category)
                }
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg"
                    : "bg-white border border-gray-200 text-gray-700 hover:border-blue-500"
                }`}
              >

                {category}

              </button>

            ))}

          </div>

          {/* HEADER */}
          <div
            data-aos="fade-up"
            className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4"
          >

            <div>

              <h2 className="text-4xl font-extrabold text-gray-900">

                Courses Available

              </h2>

              <p className="text-gray-500 mt-2">

                Find the perfect course for your career growth

              </p>

            </div>

            <div className="bg-blue-100 text-blue-700 px-5 py-3 rounded-full font-bold">

              {filteredCourses.length} Courses

            </div>

          </div>

          {/* COURSES GRID */}
          {loading ? (

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

              {[...Array(6)].map((_, index) => (

                <CourseCardSkeleton
                  key={index}
                />

              ))}

            </div>

          ) : (

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

              {filteredCourses.map(
                (course, index) => (

                  <div
                    key={course.Id}
                    data-aos="fade-up"
                    data-aos-delay={
                      index * 100
                    }
                  >

                    <CourseCard
                      course={{
                        id: course.Id,
                        title: course.Title,
                        instructor:
                          course.Instructor,
                        image:
                          course.ImageUrl,
                        students:
                          course.Students,
                      }}
                    />

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Courses;