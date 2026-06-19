import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ScrollToTop from "../components/common/ScrollToTop";
import EnquiryWidget from "../pages/EnquiryWidget";
import Wishlist from "../pages/Wishlist";
import Login from "../pages/Login/Login";
import ForgotPassword from "../pages/Login/ForgotPassword";
import ResetPasswordPage from "../pages/Login/ResetPassword";
import DashboardLayout from "../layouts/DashboardLayout";
import OrganizationRegistrationPage from "../pages/organization/OrganizationRegistrationPage";
import OrganizationProfilePage from "../pages/organization/OrganizationProfilePage";
import OrganizationSettingsPage from "../pages/organization/OrganizationSettingsPage";

// ✅ Lazy Imports
const Home = lazy(() => import("../pages/Home"));
const Courses = lazy(() => import("../pages/Courses"));
const CourseDetails = lazy(() => import("../pages/CourseDetails"));
const WatchCourse = lazy(() => import("../pages/WatchCourse"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Mentors = lazy(() => import("../pages/Mentors"));
const ResumeBuilder = lazy(() => import("../pages/ResumeBuilder"));
const InterviewGuides = lazy(() => import("../pages/InterviewGuides"));
const PracticeTests = lazy(() => import("../pages/PracticeTests"));
const Blog = lazy(() => import("../pages/Blog"));
const Career = lazy(() => import("../pages/Career"));
const About = lazy(() => import("../pages/About"));
const Enroll = lazy(() => import("../pages/Enroll"));
const Admissions = lazy(() => import("../pages/Admissions"));
const CheckoutPage = lazy(() => import("../pages/CheckoutPage"));
const NotFound = lazy(() => import("../pages/NotFound"));

// Course Components
const PythonCourseHero = lazy(() =>
  import("../components/courses/python/PythonCourseHero")
);
const ReactMain = lazy(() =>
  import("../components/courses/reactCource/ReactMain")
);
const MernMain = lazy(() =>
  import("../components/courses/mern/MernStack")
);
const AiMain = lazy(() =>
  import("../components/courses/Ai/AiMain")
);

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />

      {/* ✅ Suspense Wrapper */}
      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center text-lg font-semibold">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<DashboardLayout/>} />
          <Route path="/organization/registration" element={<OrganizationRegistrationPage/>}/>
          <Route path="/organization/profile" element={<OrganizationProfilePage/>}/>
          <Route path="organization/settings" element={<OrganizationSettingsPage/>}/>

          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/courses" element={<Courses />} />
           <Route path="/change-password" element={<ResetPasswordPage />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/watch-course" element={<WatchCourse />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
          <Route path="/interview-guides" element={<InterviewGuides />} />
          <Route path="/practice-tests" element={<PracticeTests />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/career" element={<Career />} />
          <Route path="/python-course" element={<PythonCourseHero />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses/react-mastery-track" element={<ReactMain />} />
          <Route path="/mern-course" element={<MernMain />} />
          <Route path="/AI-course" element={<AiMain />} />
          <Route path="/enroll" element={<Enroll />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <EnquiryWidget />
    </BrowserRouter>
  );
};

export default AppRoutes;