import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

import Hero from "../components/home/Hero";
import EnrollmentForm from "./EnrollmentForm";
import Partners from "../components/home/Partners";
import PopularCourses from "../components/home/PopularCourses";
import WatchCourse from "./WatchCourse";
import SuccessStories from "./SuccessStories";
import WhyChooseUs from "./WhyChooseUs";
import TechnologiesSection from "./TechnologiesSection";
import FAQ from "./FAQ";
import OracleCourses from "./OracleCourses";
import SuccessStats from "../components/home/SuccessStats";
import PlacementPartners from "../components/home/PlacementPartners";
import WhatsAppButton from "../components/common/WhatsAppButton";
import PopupEnroll from "./PopupEnroll";
import EnquiryWidget from "./EnquiryWidget";
import SkillTracksSection from "./SkillTracksSection";
import PremiumDashboard from "./PremiumDashboard";
import StudentReviews from "./StudentReviews";
import CertificationCourses from "../components/home/CertificationCourses";

function Home() {
  return (
    <>
      <Navbar />
      <div className="relative z-10 pb-24">
        <Hero />

        <EnrollmentForm />

        {/* <Partners /> */}
        {/* <PlacementPartners /> */}

        <SkillTracksSection />
        {/* <PremiumDashboard/> */}
        <StudentReviews />

        {/* <SuccessStats /> */}

        {/* <PopularCourses /> */}

        {/* <WatchCourse /> */}

        {/* <SuccessStories /> */}

        <WhyChooseUs />

        {/* <TechnologiesSection /> */}
        <CertificationCourses />

        <FAQ />

        <Footer />
      </div>
      <EnquiryWidget />
    </>
  );
}

export default Home;
