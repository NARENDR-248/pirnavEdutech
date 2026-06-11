import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Courses from "../pages/Courses";
import CourseDetails from "../pages/CourseDetails";
import WatchCourse from "../pages/WatchCourse";
import Dashboard from "../pages/Dashboard";
import Mentors from "../pages/Mentors";
import ResumeBuilder from "../pages/ResumeBuilder";
import InterviewGuides from "../pages/InterviewGuides";
import PracticeTests from "../pages/PracticeTests";
import Blog from "../pages/Blog";
import Career from "../pages/Career";
import PythonCourseHero from "../components/courses/python/PythonCourseHero";
import About from "../pages/About";
import ReactMain from "../components/courses/reactCource/ReactMain";
import MernMain from "../components/courses/mern/MernStack";
import AiMain from "../components/courses/Ai/AiMain";
import ScrollToTop from "../components/common/ScrollToTop";
import NotFound from "../pages/NotFound";
import Enroll from "../pages/Enroll";

import EnquiryWidget from "../pages/EnquiryWidget";
import Admissions from "../pages/Admissions";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route
          path="/course/:id"
          element={<CourseDetails />}
        />
        <Route path="/watch-course" element={<WatchCourse />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/mentors" element={<Mentors />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />

        <Route path="/interview-guides" element={<InterviewGuides />} />

        <Route path="/practice-tests" element={<PracticeTests />} />

        <Route path="/blog" element={<Blog />} />
        <Route path="/career" element={<Career />} />
        <Route path="/python-course" element={<PythonCourseHero />} /> 
        <Route path="/about" element={<About />} />
        <Route path="/react-course" element={<ReactMain />} />
        <Route path="/mern-course" element={<MernMain />} />
        <Route path="/AI-course" element={<AiMain />} />
        <Route path="/enroll" element={<Enroll />} />
       <Route path="/admissions" element={<Admissions />} />
      </Routes>
      <EnquiryWidget />
    </BrowserRouter>
  );
};

export default AppRoutes;