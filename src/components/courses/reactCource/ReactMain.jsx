import React from "react";
 
import Navbar from "../../common/Navbar";
import Footer from "../../common/Footer";
 
import ReactHeroSection from "./ReactHeroSection";
import ReactCourse from "./ReactCourse";
import ReactMentors from "./ReactMentors";
import ReactProjectsSection from "./ReactProjectsSection"; // ✅ fixed
import ReactCurriculumSection from "./ReactCurriculumSection";
import ReactFAQ from "./ReactFAQ";
 
const ReactMain = () => {
  return (
<>
<Navbar />
 
      <ReactHeroSection />
<ReactCourse />
<ReactMentors />
<ReactProjectsSection /> {/* ✅ matches import */}
<ReactCurriculumSection />
<ReactFAQ />
 
      <Footer />
</>
  );
};
 
export default ReactMain;