import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

import ScrollToTop from "../components/common/ScrollToTop";

// ── Layout ──────────────────────────────────────────────────
import DashboardLayout from "../layouts/DashboardLayout";

// ── Route Guards ────────────────────────────────────────────
import ProtectedRoute from "../components/auth/ProtectedRoute";
import RoleBasedRoute from "../components/auth/RoleBasedRoute";

// ── Route Constants ────────────────────────────────────────
import { ROUTES } from "./routeConstants";

// ================================================================
// LAZY-LOADED PAGE COMPONENTS
// ================================================================

// ── Public Pages ─────────────────────────────────────────────
const Home = lazy(() => import("../pages/Home"));
const Courses = lazy(() => import("../pages/Courses"));
const CourseDetails = lazy(() => import("../pages/CourseDetails"));
const WatchCourse = lazy(() => import("../pages/WatchCourse"));
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
const Wishlist = lazy(() => import("../pages/Wishlist"));
const NotFound = lazy(() => import("../pages/NotFound"));

// ── Course Detail Pages ─────────────────────────────────────
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

// ── Auth Pages ──────────────────────────────────────────────
const Login = lazy(() => import("../pages/Login/Login"));
const ForgotPassword = lazy(() => import("../pages/Login/ForgotPassword"));
const OtpVerification = lazy(() => import("../pages/Login/OtpVerification"));
const OtpChangePassword = lazy(() => import("../pages/Login/OtpChangePassword"));
const ResetPassword = lazy(() => import("../pages/Login/ResetPassword"));
const ProfileChangePassword = lazy(() =>
  import("../pages/Login/ProfileChangePassword")
);

// ── Dashboard Pages (statics become lazy) ───────────────────
const SuperAdminDashboard = lazy(() =>
  import("../pages/super-admin/SuperAdminDashboard")
);
const OrgAdminDashboard = lazy(() =>
  import("../pages/organization/OrgAdminDashboard")
);
const EmployeeDashboard = lazy(() =>
  import("../pages/employee/EmployeeDashboard")
);
const OrganizationRegistrationPage = lazy(() =>
  import("../pages/organization/OrganizationRegistrationPage")
);
const OrganizationOverviewPage = lazy(() =>
  import("../pages/organization/OrganizationOverviewPage")
);
const OrganizationProfilePage = lazy(() =>
  import("../pages/organization/OrganizationProfilePage")
);
const OrganizationSettingsPage = lazy(() =>
  import("../pages/organization/OrganizationSettingsPage")
);
const DepartmentManagement = lazy(() =>
  import("../pages/organization/DepartmentManagement")
);
const TeamManagement = lazy(() =>
  import("../pages/organization/TeamManagement")
);
const EmployeeManagement = lazy(() =>
  import("../pages/organization/EmployeeManagement")
);

// ── Placeholder for future pages ────────────────────────────
const PagePlaceholder = lazy(() => import("../components/common/PagePlaceholder"));

// ================================================================
// SUSPENSE FALLBACK
// ================================================================
const PageLoader = () => (
  <div className="h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-[#0F172A]">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
      <span className="text-sm font-medium text-slate-400">Loading...</span>
    </div>
  </div>
);

// ================================================================
// REUSABLE SUSPENSE WRAPPER
// ================================================================
const SuspenseWrapper = ({ children }) => (
  <Suspense fallback={<PageLoader />}>{children}</Suspense>
);

// ================================================================
// APP ROUTES
// ================================================================

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* ─────────────────────────────────────────────────────── */}
        {/* PUBLIC ROUTES                                          */}
        {/* ─────────────────────────────────────────────────────── */}

        {/* Root → Home */}
        <Route
          path="/"
          element={
            <SuspenseWrapper>
              <Home />
            </SuspenseWrapper>
          }
        />

        {/* Courses & Learning */}
        <Route
          path={ROUTES.PUBLIC.COURSES}
          element={
            <SuspenseWrapper>
              <Courses />
            </SuspenseWrapper>
          }
        />
        <Route
          path={ROUTES.PUBLIC.COURSE_DETAILS}
          element={
            <SuspenseWrapper>
              <CourseDetails />
            </SuspenseWrapper>
          }
        />
        <Route
          path={ROUTES.PUBLIC.WATCH_COURSE}
          element={
            <SuspenseWrapper>
              <WatchCourse />
            </SuspenseWrapper>
          }
        />
        <Route
          path={ROUTES.PUBLIC.MENTORS}
          element={
            <SuspenseWrapper>
              <Mentors />
            </SuspenseWrapper>
          }
        />
        <Route
          path={ROUTES.PUBLIC.RESUME_BUILDER}
          element={
            <SuspenseWrapper>
              <ResumeBuilder />
            </SuspenseWrapper>
          }
        />
        <Route
          path={ROUTES.PUBLIC.INTERVIEW_GUIDES}
          element={
            <SuspenseWrapper>
              <InterviewGuides />
            </SuspenseWrapper>
          }
        />
        <Route
          path={ROUTES.PUBLIC.PRACTICE_TESTS}
          element={
            <SuspenseWrapper>
              <PracticeTests />
            </SuspenseWrapper>
          }
        />
        <Route
          path={ROUTES.PUBLIC.BLOG}
          element={
            <SuspenseWrapper>
              <Blog />
            </SuspenseWrapper>
          }
        />
        <Route
          path={ROUTES.PUBLIC.CAREER}
          element={
            <SuspenseWrapper>
              <Career />
            </SuspenseWrapper>
          }
        />
        <Route
          path={ROUTES.PUBLIC.ABOUT}
          element={
            <SuspenseWrapper>
              <About />
            </SuspenseWrapper>
          }
        />
        <Route
          path={ROUTES.PUBLIC.ENROLL}
          element={
            <SuspenseWrapper>
              <Enroll />
            </SuspenseWrapper>
          }
        />
        <Route
          path={ROUTES.PUBLIC.ADMISSIONS}
          element={
            <SuspenseWrapper>
              <Admissions />
            </SuspenseWrapper>
          }
        />
        <Route
          path={ROUTES.PUBLIC.CHECKOUT}
          element={
            <SuspenseWrapper>
              <CheckoutPage />
            </SuspenseWrapper>
          }
        />
        <Route
          path={ROUTES.PUBLIC.WISHLIST}
          element={
            <SuspenseWrapper>
              <Wishlist />
            </SuspenseWrapper>
          }
        />

        {/* Course detail sub-pages */}
        <Route
          path={ROUTES.PUBLIC.PYTHON_COURSE}
          element={
            <SuspenseWrapper>
              <PythonCourseHero />
            </SuspenseWrapper>
          }
        />
        <Route
          path={ROUTES.PUBLIC.REACT_COURSE}
          element={
            <SuspenseWrapper>
              <ReactMain />
            </SuspenseWrapper>
          }
        />
        <Route
          path={ROUTES.PUBLIC.MERN_COURSE}
          element={
            <SuspenseWrapper>
              <MernMain />
            </SuspenseWrapper>
          }
        />
        <Route
          path={ROUTES.PUBLIC.AI_COURSE}
          element={
            <SuspenseWrapper>
              <AiMain />
            </SuspenseWrapper>
          }
        />

        {/* ─────────────────────────────────────────────────────── */}
        {/* AUTHENTICATION ROUTES (public, no layout)              */}
        {/* ─────────────────────────────────────────────────────── */}
        <Route
          path={ROUTES.AUTH.LOGIN}
          element={
            <SuspenseWrapper>
              <Login />
            </SuspenseWrapper>
          }
        />
        <Route
          path={ROUTES.AUTH.FORGOT_PASSWORD}
          element={
            <SuspenseWrapper>
              <ForgotPassword />
            </SuspenseWrapper>
          }
        />
        <Route
          path={ROUTES.AUTH.OTP_VERIFICATION}
          element={
            <SuspenseWrapper>
              <OtpVerification />
            </SuspenseWrapper>
          }
        />
        <Route
          path={ROUTES.AUTH.CHANGE_PASSWORD}
          element={
            <SuspenseWrapper>
              <OtpChangePassword />
            </SuspenseWrapper>
          }
        />
        <Route
          path={ROUTES.AUTH.RESET_PASSWORD}
          element={
            <SuspenseWrapper>
              <ResetPassword />
            </SuspenseWrapper>
          }
        />

        {/* ─────────────────────────────────────────────────────── */}
        {/* SUPER ADMIN MODULE (protected + role-gated)            */}
        {/* ─────────────────────────────────────────────────────── */}
        <Route
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={["super-admin"]}>
                <DashboardLayout />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        >
          <Route
            path={ROUTES.SUPER_ADMIN.ROOT}
            element={
              <Navigate to={ROUTES.SUPER_ADMIN.DASHBOARD} replace />
            }
          />
          <Route
            path={ROUTES.SUPER_ADMIN.DASHBOARD}
            element={
              <SuspenseWrapper>
                <SuperAdminDashboard />
              </SuspenseWrapper>
            }
          />
          <Route
            path={ROUTES.SUPER_ADMIN.ORGANIZATIONS}
            element={
              <SuspenseWrapper>
                <PagePlaceholder title="Organizations" />
              </SuspenseWrapper>
            }
          />
          <Route
            path={ROUTES.SUPER_ADMIN.EMPLOYEES}
            element={
              <SuspenseWrapper>
                <PagePlaceholder title="Employees" />
              </SuspenseWrapper>
            }
          />
          <Route
            path={ROUTES.SUPER_ADMIN.SUBSCRIPTIONS}
            element={
              <SuspenseWrapper>
                <PagePlaceholder title="Subscriptions" />
              </SuspenseWrapper>
            }
          />
          <Route
            path={ROUTES.SUPER_ADMIN.ANALYTICS}
            element={
              <SuspenseWrapper>
                <PagePlaceholder title="Analytics" />
              </SuspenseWrapper>
            }
          />
          <Route
            path={ROUTES.SUPER_ADMIN.REPORTS}
            element={
              <SuspenseWrapper>
                <PagePlaceholder title="Reports" />
              </SuspenseWrapper>
            }
          />
          <Route
            path={ROUTES.SUPER_ADMIN.SETTINGS}
            element={
              <SuspenseWrapper>
                <PagePlaceholder title="Settings" />
              </SuspenseWrapper>
            }
          />
        </Route>

        {/* ─────────────────────────────────────────────────────── */}
        {/* ORGANIZATION MODULE (protected + role-gated)           */}
        {/* ─────────────────────────────────────────────────────── */}

        {/* Registration — standalone public route (no dashboard layout / auth) */}
        <Route
          path={ROUTES.ORG_ADMIN.REGISTRATION}
          element={
            <SuspenseWrapper>
              <OrganizationRegistrationPage />
            </SuspenseWrapper>
          }
        />

        <Route
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={["org-admin"]}>
                <DashboardLayout />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        >
          {/* Org Admin Root → Dashboard */}
          <Route
            path={ROUTES.ORG_ADMIN.ROOT}
            element={
              <Navigate to={ROUTES.ORG_ADMIN.DASHBOARD} replace />
            }
          />
          <Route
            path={ROUTES.ORG_ADMIN.DASHBOARD}
            element={
              <SuspenseWrapper>
                <OrgAdminDashboard />
              </SuspenseWrapper>
            }
          />
          <Route
            path={ROUTES.ORG_ADMIN.OVERVIEW}
            element={
              <SuspenseWrapper>
                <OrganizationOverviewPage />
              </SuspenseWrapper>
            }
          />
          <Route
            path={ROUTES.ORG_ADMIN.PROFILE}
            element={
              <SuspenseWrapper>
                <OrganizationProfilePage />
              </SuspenseWrapper>
            }
          />
          <Route
            path={ROUTES.ORG_ADMIN.EMPLOYEES}
            element={
              <SuspenseWrapper>
                <EmployeeManagement />
              </SuspenseWrapper>
            }
          />
          <Route
            path={ROUTES.ORG_ADMIN.DEPARTMENTS}
            element={
              <SuspenseWrapper>
                <DepartmentManagement />
              </SuspenseWrapper>
            }
          />
          <Route
            path={ROUTES.ORG_ADMIN.TEAMS}
            element={
              <SuspenseWrapper>
                <TeamManagement />
              </SuspenseWrapper>
            }
          />
          <Route
            path={ROUTES.ORG_ADMIN.SKILLS}
            element={
              <SuspenseWrapper>
                <PagePlaceholder title="Skills" />
              </SuspenseWrapper>
            }
          />
          <Route
            path={ROUTES.ORG_ADMIN.GOALS}
            element={
              <SuspenseWrapper>
                <PagePlaceholder title="Goals" />
              </SuspenseWrapper>
            }
          />
          <Route
            path={ROUTES.ORG_ADMIN.PERFORMANCE}
            element={
              <SuspenseWrapper>
                <PagePlaceholder title="Performance" />
              </SuspenseWrapper>
            }
          />
          <Route
            path={ROUTES.ORG_ADMIN.REPORTS}
            element={
              <SuspenseWrapper>
                <PagePlaceholder title="Reports" />
              </SuspenseWrapper>
            }
          />
          <Route
            path={ROUTES.ORG_ADMIN.SETTINGS}
            element={
              <SuspenseWrapper>
                <OrganizationSettingsPage />
              </SuspenseWrapper>
            }
          />
          <Route
            path={ROUTES.ORG_ADMIN.CHANGE_PASSWORD}
            element={
              <SuspenseWrapper>
                <ProfileChangePassword />
              </SuspenseWrapper>
            }
          />
        </Route>

        {/* ─────────────────────────────────────────────────────── */}
        {/* EMPLOYEE MODULE (protected + role-gated)               */}
        {/* ─────────────────────────────────────────────────────── */}
        <Route
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={["employee"]}>
                <DashboardLayout />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        >
          <Route
            path={ROUTES.EMPLOYEE.ROOT}
            element={
              <Navigate to={ROUTES.EMPLOYEE.DASHBOARD} replace />
            }
          />
          <Route
            path={ROUTES.EMPLOYEE.DASHBOARD}
            element={
              <SuspenseWrapper>
                <EmployeeDashboard />
              </SuspenseWrapper>
            }
          />
          <Route
            path={ROUTES.EMPLOYEE.SKILLS}
            element={
              <SuspenseWrapper>
                <PagePlaceholder title="My Skills" />
              </SuspenseWrapper>
            }
          />
          <Route
            path={ROUTES.EMPLOYEE.GOALS}
            element={
              <SuspenseWrapper>
                <PagePlaceholder title="My Goals" />
              </SuspenseWrapper>
            }
          />
          <Route
            path={ROUTES.EMPLOYEE.CAREER}
            element={
              <SuspenseWrapper>
                <PagePlaceholder title="Career Path" />
              </SuspenseWrapper>
            }
          />
          <Route
            path={ROUTES.EMPLOYEE.LEARNING}
            element={
              <SuspenseWrapper>
                <PagePlaceholder title="Learning" />
              </SuspenseWrapper>
            }
          />
          <Route
            path={ROUTES.EMPLOYEE.REVIEWS}
            element={
              <SuspenseWrapper>
                <PagePlaceholder title="Reviews" />
              </SuspenseWrapper>
            }
          />
          <Route
            path={ROUTES.EMPLOYEE.PROFILE}
            element={
              <SuspenseWrapper>
                <PagePlaceholder title="Profile" />
              </SuspenseWrapper>
            }
          />
          <Route
            path={ROUTES.EMPLOYEE.SETTINGS}
            element={
              <SuspenseWrapper>
                <PagePlaceholder title="Settings" />
              </SuspenseWrapper>
            }
          />
        </Route>

        {/* ─────────────────────────────────────────────────────── */}
        {/* 404 — CATCH-ALL                                         */}
        {/* ─────────────────────────────────────────────────────── */}
        <Route
          path="*"
          element={
            <SuspenseWrapper>
              <NotFound />
            </SuspenseWrapper>
          }
        />
      </Routes>
    </>
  );
};

export default AppRoutes;
