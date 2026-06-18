import React from "react";

import Navbar from "../../common/Navbar";
import Footer from "../../common/Footer";

import ReactHeroSection from "./ReactHeroSection.jsx";
import ReactCourse from "./ReactCourse";
import ReactMentors from "./ReactMentors";
import ReactProjectsSection from "./ReactProjectsSection";
import ReactCurriculumSection from "./ReactCurriculumSection";
import ReactFAQ from "./ReactFAQ";

const ReactMain = () => {
  return (
    <div className="bg-[#030712] min-h-screen">
      <Navbar />
      <main>
        <ReactHeroSection />
        <ReactCourse />
        <ReactMentors />
        <ReactProjectsSection />
        <ReactCurriculumSection />
        <ReactFAQ />
      </main>
      <Footer />
    </div>
  );
};

export default ReactMain;