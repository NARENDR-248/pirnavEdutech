import AdmissionHero from "../components/admissions/AdmissionHero";
import TrustedCompanies from "../components/admissions/TrustedCompanies";
import WhyChooseUs from "../components/admissions/WhyChooseUs";
import AdmissionProcess from "../components/admissions/AdmissionProcess";
import Eligibility from "../components/admissions/Eligibility";
import ProgramHighlights from "../components/admissions/ProgramHighlights";
import Documents from "../components/admissions/Documents";
import ScholarshipSection from "../components/admissions/ScholarshipSection";
import SuccessStories from "../components/admissions/SuccessStories";
import AdmissionForm from "../components/admissions/AdmissionForm";
import FAQ from "../components/admissions/FAQ";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
<<<<<<< HEAD


export default function Admissions() {
  return (
    <main
      className="min-h-[100vh] font-sans antialiased bg-[#030B24] text-slate-100 overflow-x-hidden selection:bg-purple-500/30 selection:text-purple-200"
=======
import { useThemeContext } from "../context/ThemeContext";


export default function Admissions() {
  const { isDark } = useThemeContext();
  return (
    <main
      className={`min-h-[100vh] font-sans antialiased overflow-x-hidden selection:bg-purple-500/30 selection:text-purple-200 transition-colors duration-300 ${
        isDark ? 'bg-[#030B24] text-slate-100' : 'bg-slate-50 text-slate-800'
      }`}
>>>>>>> 71c966e78455926f66c1ded608fbc5490d976ab1
      style={{
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      }}
    >
      <Navbar />
      {/* Decorative Global Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[800px] bg-gradient-radial from-purple-600/10 via-blue-600/5 to-transparent pointer-events-none z-0" />
      <div className="absolute top-[2500px] right-0 w-[400px] h-[600px] bg-blue-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[1000px] left-0 w-[500px] h-[700px] bg-purple-500/5 blur-[150px] pointer-events-none" />

 <div className="relative z-10 pb-24">
        <AdmissionHero />
        <TrustedCompanies />
        <WhyChooseUs />
        <AdmissionProcess />
        <Eligibility />
        <ProgramHighlights />
        <Documents />
        <ScholarshipSection />
        <SuccessStories />
        
        {/* Dual Column Layout for Form + FAQ to mimic high-converting structures */}
        <AdmissionForm/>

        <FAQ/>
     
       
      </div>
      <Footer />
    </main>
  );
}