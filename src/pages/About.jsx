import React from "react";
import TeamGallery from "./TeamGallery";
import WhoWeAre from "./WhoWeAre";
import MissionVision from "./MissionVision";
import OrganizationStructure from "./OrganizationStructure";
import WhyChooseUsAbout from "./WhyChooseUsAbout";
import FounderSection from "./FounderSection";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
function About() {
  return (
    <>
    <Navbar />
    <div className="bg-slate-50 overflow-hidden">

      <TeamGallery />
      <WhoWeAre />
      <MissionVision />
      <OrganizationStructure />
      <WhyChooseUsAbout />
      <FounderSection />
      <Footer/>
    </div>
    </>
  );
}

export default About;