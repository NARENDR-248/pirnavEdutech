// ================================================================
// Route Constants — single source of truth for all application paths
// ================================================================

export const ROUTES = {
  // ── Authentication ───────────────────────────────────────────
  AUTH: {
    LOGIN: "/login",
    FORGOT_PASSWORD: "/forgot-password",
    OTP_VERIFICATION: "/otp-verification",
    CHANGE_PASSWORD: "/change-password",
    RESET_PASSWORD: "/reset-password",
    PROFILE_CHANGE_PASSWORD: "/profile-change-password",
  },

  // ── Public Pages ─────────────────────────────────────────────
  PUBLIC: {
    HOME: "/",
    COURSES: "/courses",
    COURSE_DETAILS: "/courses/:courseId",
    WATCH_COURSE: "/watch-course",
    MENTORS: "/mentors",
    RESUME_BUILDER: "/resume-builder",
    INTERVIEW_GUIDES: "/interview-guides",
    PRACTICE_TESTS: "/practice-tests",
    BLOG: "/blog",
    CAREER: "/career",
    ABOUT: "/about",
    ENROLL: "/enroll",
    ADMISSIONS: "/admissions",
    CHECKOUT: "/checkout",
    WISHLIST: "/wishlist",
    // Course detail sub-pages
    PYTHON_COURSE: "/courses/python",
    REACT_COURSE: "/courses/react",
    MERN_COURSE: "/courses/mern",
    AI_COURSE: "/courses/ai",
  },

  // ── Super Admin ──────────────────────────────────────────────
  SUPER_ADMIN: {
    ROOT: "/super-admin",
    DASHBOARD: "/super-admin/dashboard",
    ORGANIZATIONS: "/super-admin/organizations",
    EMPLOYEES: "/super-admin/employees",
    SUBSCRIPTIONS: "/super-admin/subscriptions",
    ANALYTICS: "/super-admin/analytics",
    REPORTS: "/super-admin/reports",
    SETTINGS: "/super-admin/settings",
  },

  // ── Organization Admin ───────────────────────────────────────
  ORG_ADMIN: {
    ROOT: "/organization",
    DASHBOARD: "/organization/dashboard",
    REGISTRATION: "/organization/registration",
    OVERVIEW: "/organization/overview",
    PROFILE: "/organization/profile",
    EMPLOYEES: "/organization/employees",
    DEPARTMENTS: "/organization/departments",
    TEAMS: "/organization/teams",
    SKILLS: "/organization/skills",
    GOALS: "/organization/goals",
    PERFORMANCE: "/organization/performance",
    REPORTS: "/organization/reports",
    SETTINGS: "/organization/settings",
    CHANGE_PASSWORD: "/organization/change-password",
  },

  // ── Employee ─────────────────────────────────────────────────
  EMPLOYEE: {
    ROOT: "/employee",
    DASHBOARD: "/employee/dashboard",
    SKILLS: "/employee/skills",
    GOALS: "/employee/goals",
    CAREER: "/employee/career",
    LEARNING: "/employee/learning",
    REVIEWS: "/employee/reviews",
    PROFILE: "/employee/profile",
    SETTINGS: "/employee/settings",
  },
};

// ── Route Metadata ────────────────────────────────────────────
// Used for breadcrumbs, page titles, sidebar highlighting, etc.
export const ROUTE_META = {
  // Auth
  [ROUTES.AUTH.LOGIN]: { title: "Login", module: "auth" },
  [ROUTES.AUTH.FORGOT_PASSWORD]: { title: "Forgot Password", module: "auth" },
  [ROUTES.AUTH.OTP_VERIFICATION]: { title: "OTP Verification", module: "auth" },
  [ROUTES.AUTH.CHANGE_PASSWORD]: { title: "Change Password", module: "auth" },
  [ROUTES.AUTH.RESET_PASSWORD]: { title: "Reset Password", module: "auth" },

  // Public
  [ROUTES.PUBLIC.HOME]: { title: "Home", module: "public" },
  [ROUTES.PUBLIC.COURSES]: { title: "Courses", module: "public" },
  [ROUTES.PUBLIC.COURSE_DETAILS]: { title: "Course Details", module: "public" },
  [ROUTES.PUBLIC.MENTORS]: { title: "Mentors", module: "public" },
  [ROUTES.PUBLIC.BLOG]: { title: "Blog", module: "public" },
  [ROUTES.PUBLIC.ABOUT]: { title: "About", module: "public" },
  [ROUTES.PUBLIC.ADMISSIONS]: { title: "Admissions", module: "public" },
  [ROUTES.PUBLIC.CHECKOUT]: { title: "Checkout", module: "public" },
  [ROUTES.PUBLIC.ENROLL]: { title: "Enroll", module: "public" },
  [ROUTES.PUBLIC.WISHLIST]: { title: "Wishlist", module: "public" },
  [ROUTES.PUBLIC.RESUME_BUILDER]: { title: "Resume Builder", module: "public" },
  [ROUTES.PUBLIC.INTERVIEW_GUIDES]: { title: "Interview Guides", module: "public" },
  [ROUTES.PUBLIC.PRACTICE_TESTS]: { title: "Practice Tests", module: "public" },
  [ROUTES.PUBLIC.CAREER]: { title: "Career", module: "public" },

  // Super Admin
  [ROUTES.SUPER_ADMIN.DASHBOARD]: { title: "Super Admin Dashboard", module: "super-admin" },
  [ROUTES.SUPER_ADMIN.ORGANIZATIONS]: { title: "Organizations", module: "super-admin" },
  [ROUTES.SUPER_ADMIN.EMPLOYEES]: { title: "Employees", module: "super-admin" },
  [ROUTES.SUPER_ADMIN.SUBSCRIPTIONS]: { title: "Subscriptions", module: "super-admin" },
  [ROUTES.SUPER_ADMIN.ANALYTICS]: { title: "Analytics", module: "super-admin" },
  [ROUTES.SUPER_ADMIN.REPORTS]: { title: "Reports", module: "super-admin" },
  [ROUTES.SUPER_ADMIN.SETTINGS]: { title: "Settings", module: "super-admin" },

  // Org Admin
  [ROUTES.ORG_ADMIN.DASHBOARD]: { title: "Organization Dashboard", module: "org-admin" },
  [ROUTES.ORG_ADMIN.REGISTRATION]: { title: "Organization Registration", module: "org-admin" },
  [ROUTES.ORG_ADMIN.OVERVIEW]: { title: "Overview", module: "org-admin" },
  [ROUTES.ORG_ADMIN.PROFILE]: { title: "Organization Profile", module: "org-admin" },
  [ROUTES.ORG_ADMIN.EMPLOYEES]: { title: "Employees", module: "org-admin" },
  [ROUTES.ORG_ADMIN.DEPARTMENTS]: { title: "Departments", module: "org-admin" },
  [ROUTES.ORG_ADMIN.TEAMS]: { title: "Teams", module: "org-admin" },
  [ROUTES.ORG_ADMIN.SKILLS]: { title: "Skills", module: "org-admin" },
  [ROUTES.ORG_ADMIN.GOALS]: { title: "Goals", module: "org-admin" },
  [ROUTES.ORG_ADMIN.PERFORMANCE]: { title: "Performance", module: "org-admin" },
  [ROUTES.ORG_ADMIN.REPORTS]: { title: "Reports", module: "org-admin" },
  [ROUTES.ORG_ADMIN.SETTINGS]: { title: "Settings", module: "org-admin" },
  [ROUTES.ORG_ADMIN.CHANGE_PASSWORD]: { title: "Change Password", module: "org-admin" },

  // Employee
  [ROUTES.EMPLOYEE.DASHBOARD]: { title: "Employee Dashboard", module: "employee" },
  [ROUTES.EMPLOYEE.SKILLS]: { title: "My Skills", module: "employee" },
  [ROUTES.EMPLOYEE.GOALS]: { title: "My Goals", module: "employee" },
  [ROUTES.EMPLOYEE.CAREER]: { title: "Career Path", module: "employee" },
  [ROUTES.EMPLOYEE.LEARNING]: { title: "Learning", module: "employee" },
  [ROUTES.EMPLOYEE.REVIEWS]: { title: "Reviews", module: "employee" },
  [ROUTES.EMPLOYEE.PROFILE]: { title: "Profile", module: "employee" },
  [ROUTES.EMPLOYEE.SETTINGS]: { title: "Settings", module: "employee" },
};

// ── All routes requiring authentication ──────────────────────
export const PROTECTED_ROUTES = [
  ...Object.values(ROUTES.SUPER_ADMIN),
  ...Object.values(ROUTES.ORG_ADMIN),
  ...Object.values(ROUTES.EMPLOYEE),
];

// ── Role-to-route prefix mapping ─────────────────────────────
export const ROLE_ROUTE_MAP = {
  "super-admin": "/super-admin",
  "org-admin": "/organization",
  employee: "/employee",
};
