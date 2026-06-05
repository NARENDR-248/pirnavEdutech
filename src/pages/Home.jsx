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

function Home() {
  return (
    <>
      <Navbar />

      <Hero />
      

      <EnrollmentForm />

      <Partners />
      <SuccessStats />

      <PopularCourses />

      <WatchCourse />

      <SuccessStories />

      <WhyChooseUs />

      <TechnologiesSection />
      <OracleCourses />

      <FAQ />

      <Footer />
    </>
  );
}

export default Home;