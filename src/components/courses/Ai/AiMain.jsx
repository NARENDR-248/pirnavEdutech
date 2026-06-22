import React from "react";

import Navbar from "../../common/Navbar";
import Footer from "../../common/Footer";

import AiCourse from "./AiCourse";
import AiMentores from "./AiMentores";
import AiCurriculum from "./AiCurriculum";
import AiFaq from "./AiFaq";
import AiPlacements from "./AiPlacements";
import AiProjects from "./AiProjects";
import AiHero from "./AiHero";

const AiMain = () => {
  return (
    <>
      <Navbar />
      <AiHero/>

      <AiCourse />
      <AiMentores />
      <AiProjects/>
      <AiCurriculum />
      <AiPlacements/>
      <AiFaq />

      <Footer />
    </>
  );
};

export default AiMain;