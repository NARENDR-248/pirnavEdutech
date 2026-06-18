import { useState, useRef, useEffect, useCallback } from "react";
import {
  FiSun, FiMoon, FiMenu, FiX, FiChevronDown, FiChevronRight,
  FiCode, FiDatabase, FiCloud, FiLayers, FiCpu, FiShield,
  FiSmartphone, FiBarChart2, FiBookOpen, FiZap, FiUsers,
  FiGlobe, FiAward, FiTrendingUp, FiTerminal, FiBox, FiHeart,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useThemeContext } from "../../context/ThemeContext";

// ─── Utility ──────────────────────────────────────────────────────────────────

export function slugify(title, prefix = "/courses") {
  const slug = title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  return `${prefix}/${slug}`;
}

// ─── Theme colour map ─────────────────────────────────────────────────────────

const th = {
  // ── header ────────────────────────────────────────────────────────────────
  headerBg: (scrolled, d) =>
    d
      ? (scrolled ? "rgba(2,21,41,0.97)"     : "rgba(2,21,41,0.92)")
      : (scrolled ? "rgba(248,250,252,0.97)"  : "rgba(248,250,252,0.92)"),

  accentLine: (d) =>
    d
      ? "bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"
      : "bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent",

  headerBorder:  (d) => d ? "border-b border-white/[0.04]"       : "border-b border-slate-200/80",
  headerShadow:  (scrolled, d) => scrolled
    ? (d ? "shadow-[0_12px_50px_rgba(0,0,0,0.35)]" : "shadow-[0_4px_24px_rgba(0,0,0,0.08)]")
    : "",

  tagline:       (d) => d ? "text-slate-400"  : "text-slate-500",

  navLink: (active, d) =>
    active
      ? (d ? "text-white bg-white/8"    : "text-cyan-700 bg-cyan-50")
      : (d ? "text-slate-300 hover:text-white hover:bg-white/6"
           : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"),

  chevron:       (active, d) => active ? "rotate-180 text-cyan-400" : (d ? "text-slate-500" : "text-slate-400"),
  admissions:    (d) => d ? "text-slate-300 hover:text-white hover:bg-white/6" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
  hamburger:     (d) => d ? "text-slate-300 hover:text-white hover:bg-white/8" : "text-slate-500 hover:text-slate-900 hover:bg-slate-100",

  // ── mega menu — NOW theme-aware ────────────────────────────────────────────
  megaPanel: (d) =>
    d
      ? "border-white/8 shadow-black/60"
      : "border-slate-200 shadow-slate-200/80",

  megaPanelBg: (d) =>
    d
      ? "linear-gradient(145deg,#0d2137 0%,#091929 60%,#0a1e2e 100%)"
      : "linear-gradient(145deg,#ffffff 0%,#f8fafc 60%,#f1f5f9 100%)",

  megaAccentLine: (d) =>
    d
      ? "bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
      : "bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent",

  // sidebar
  megaSidebar:    (d) => d ? "border-white/6 bg-black/20"        : "border-slate-100 bg-slate-50",
  megaSidebarLabel:(d)=> d ? "text-slate-500"                    : "text-slate-400",

  megaCatActive:  (d) =>
    d
      ? "bg-gradient-to-r from-cyan-600/25 to-blue-600/15 text-white border border-cyan-500/20 shadow-sm shadow-cyan-900/30"
      : "bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-700 border border-cyan-200 shadow-sm",

  megaCatIdle:    (d) =>
    d ? "text-slate-400 hover:text-slate-200 hover:bg-white/5"
      : "text-slate-500 hover:text-slate-800 hover:bg-slate-100",

  megaCatIcon:    (active, d) =>
    active
      ? "text-cyan-400"
      : (d ? "text-slate-500" : "text-slate-400"),

  megaLabel:      (d) => d ? "text-slate-500" : "text-slate-400",
  megaViewAll:    (d) => d ? "text-cyan-400 hover:text-cyan-300" : "text-cyan-600 hover:text-cyan-500",

  // footer strip
  megaFooter:     (d) => d ? "border-white/6 bg-black/20"        : "border-slate-100 bg-slate-50",
  megaFooterText: (d) => d ? "text-slate-500"                    : "text-slate-400",
  megaFooterCount:(d) => d ? "text-cyan-400"                     : "text-cyan-600",

  // course card
  cardWrapper:    (d) =>
    d
      ? "hover:bg-white/5 border-transparent hover:border-white/10 hover:shadow-black/20"
      : "hover:bg-slate-50 border-transparent hover:border-slate-200 hover:shadow-slate-100",

  cardIconWrap:   (d) =>
    d
      ? "from-cyan-500/20 to-blue-600/20 border-white/10 group-hover:from-cyan-500/30 group-hover:to-blue-600/30"
      : "from-cyan-100 to-blue-100 border-cyan-200/60 group-hover:from-cyan-200 group-hover:to-blue-200",

  cardIcon:       (d) => d ? "text-cyan-400" : "text-cyan-600",
  cardTitle:      (d) => d ? "text-slate-100 group-hover:text-white" : "text-slate-800 group-hover:text-slate-900",
  cardDesc:       (d) => d ? "text-slate-400"                        : "text-slate-500",
  cardArrow:      (d) => d ? "text-slate-600 group-hover:text-cyan-400" : "text-slate-300 group-hover:text-cyan-500",

  // ── mobile drawer ──────────────────────────────────────────────────────────
  drawerBg:       (d) => d ? "linear-gradient(180deg,#0d2137 0%,#091929 100%)" : "linear-gradient(180deg,#f8fafc 0%,#f1f5f9 100%)",
  drawerBorder:   (d) => d ? "rgba(255,255,255,0.06)"  : "rgba(0,0,0,0.08)",
  drawerHeader:   (d) => d ? "border-white/8"           : "border-slate-200",
  drawerDivider:  (d) => d ? "border-white/6"           : "border-slate-200",
  drawerItem:     (d) => d ? "text-slate-200 hover:text-white hover:bg-white/4" : "text-slate-700 hover:text-slate-900 hover:bg-slate-100",
  drawerClose:    (d) => d ? "text-slate-400 hover:text-white hover:bg-white/8" : "text-slate-500 hover:text-slate-900 hover:bg-slate-100",
  drawerChevron:  (d) => d ? "text-slate-400" : "text-slate-400",
  drawerPill:     (active, d) => active
    ? "bg-gradient-to-r from-cyan-600 to-blue-700 text-white"
    : (d ? "bg-white/6 text-slate-400 hover:text-white" : "bg-slate-200 text-slate-600 hover:text-slate-900"),
  drawerExpanded: (d) => d ? "bg-black/20" : "bg-slate-50",
  drawerBackdrop: (d) => d ? "bg-black/70" : "bg-slate-900/30",
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: "Skill Tracks",    hasMega: true, key: "skillTracks"   },
  { label: "Bootcamps",       hasMega: true, key: "bootcamps"     },
  { label: "Masterclasses",   hasMega: true, key: "masterclasses" },
  { label: "Courses & Books", hasMega: true, key: "coursesBooks"  },
];

const MEGA_DATA = {
  skillTracks: {
    categories: [
      { id: "frontend", label: "Frontend Dev",   icon: FiCode       },
      { id: "backend",  label: "Backend Dev",    icon: FiDatabase   },
      { id: "cloud",    label: "Cloud & DevOps", icon: FiCloud      },
      { id: "ai",       label: "AI & ML",        icon: FiCpu        },
      { id: "security", label: "Cybersecurity",  icon: FiShield     },
      { id: "mobile",   label: "Mobile Dev",     icon: FiSmartphone },
    ],
    courses: {
      frontend: [
        { icon: FiCode,   title: "React Mastery Track",  desc: "From hooks to architecture patterns — build scalable SPAs", badge: "Hot",  path: "/courses/react-mastery-track"  },
        { icon: FiLayers, title: "Advanced TypeScript",  desc: "Type systems, generics, and enterprise-grade patterns",      badge: "New",  path: "/courses/advanced-typescript"  },
        { icon: FiZap,    title: "Next.js Full Stack",   desc: "SSR, ISR, App Router, and production deployment",            badge: null,   path: "/courses/nextjs-full-stack"    },
        { icon: FiGlobe,  title: "Web Performance",      desc: "Core Web Vitals, bundling, and runtime optimization",        badge: null,   path: "/courses/web-performance"      },
      ],
      backend: [
        { icon: FiDatabase, title: "Node.js & Express",   desc: "REST APIs, middleware, auth, and microservices",            badge: "Hot",  path: "/courses/nodejs-and-express"  },
        { icon: FiTerminal, title: "Go for Backend Devs", desc: "Concurrency, HTTP servers, and production Go",              badge: "New",  path: "/courses/go-for-backend-devs" },
        { icon: FiBox,      title: "System Design Pro",   desc: "Scalability, caching, queues, and distributed systems",     badge: null,   path: "/courses/system-design-pro"   },
        { icon: FiLayers,   title: "GraphQL Deep Dive",   desc: "Schema design, resolvers, federation, and performance",     badge: null,   path: "/courses/graphql-deep-dive"   },
      ],
      cloud: [
        { icon: FiCloud,      title: "AWS Solutions Architect",      desc: "Certification-ready training for SAA-C03",             badge: "Popular", path: "/courses/aws-solutions-architect"      },
        { icon: FiZap,        title: "Docker & Kubernetes",          desc: "Containerization, orchestration, and CI/CD pipelines", badge: null,      path: "/courses/docker-and-kubernetes"        },
        { icon: FiShield,     title: "Terraform Infrastructure",     desc: "IaC patterns, modules, and state management",          badge: null,      path: "/courses/terraform-infrastructure"     },
        { icon: FiTrendingUp, title: "Site Reliability Engineering", desc: "Observability, alerting, and incident response",       badge: "New",     path: "/courses/site-reliability-engineering" },
      ],
      ai: [
        { icon: FiCpu,       title: "Machine Learning A-Z",     desc: "Supervised, unsupervised, and reinforcement learning", badge: "Hot",  path: "/courses/machine-learning-az"      },
        { icon: FiZap,       title: "LLM Engineering",          desc: "Prompt design, fine-tuning, and RAG pipelines",        badge: "New",  path: "/courses/llm-engineering"          },
        { icon: FiBarChart2, title: "Data Science with Python", desc: "EDA, visualization, and predictive modeling",          badge: null,   path: "/courses/data-science-with-python" },
        { icon: FiLayers,    title: "Computer Vision",          desc: "CNNs, object detection, and real-world projects",     badge: null,   path: "/courses/computer-vision"          },
      ],
      security: [
        { icon: FiShield,   title: "Ethical Hacking",    desc: "Pen testing, exploit development, and CTF challenges", badge: "Hot",  path: "/courses/ethical-hacking"       },
        { icon: FiTerminal, title: "AppSec Engineering", desc: "OWASP top 10, secure code review, SAST/DAST",          badge: null,   path: "/courses/appsec-engineering"    },
        { icon: FiGlobe,    title: "Network Security",   desc: "Firewalls, IDS/IPS, and zero-trust architecture",      badge: "New",  path: "/courses/network-security"      },
        { icon: FiAward,    title: "CompTIA Security+",  desc: "Exam-focused prep with real-world scenario labs",      badge: null,   path: "/courses/comptia-security-plus" },
      ],
      mobile: [
        { icon: FiSmartphone, title: "React Native Pro", desc: "Cross-platform apps with native performance",     badge: "Hot",  path: "/courses/react-native-pro"   },
        { icon: FiLayers,     title: "Flutter & Dart",   desc: "Beautiful UIs, state management, and deployment", badge: null,   path: "/courses/flutter-and-dart"   },
        { icon: FiCpu,        title: "iOS with Swift",   desc: "SwiftUI, UIKit, and App Store deployment",        badge: "New",  path: "/courses/ios-with-swift"     },
        { icon: FiBox,        title: "Android & Kotlin", desc: "Jetpack Compose, MVVM, and Play Store release",   badge: null,   path: "/courses/android-and-kotlin" },
      ],
    },
  },
  bootcamps: {
    categories: [
      { id: "fullstack",   label: "Full Stack",     icon: FiLayers    },
      { id: "datascience", label: "Data Science",   icon: FiBarChart2 },
      { id: "devops",      label: "DevOps",         icon: FiCloud     },
      { id: "aiml",        label: "AI & ML",        icon: FiCpu       },
      { id: "product",     label: "Product Design", icon: FiUsers     },
    ],
    courses: {
      fullstack: [
        { icon: FiCode,   title: "MERN Stack Bootcamp", desc: "12-week intensive from zero to job-ready",                 badge: "Cohort Live", path: "/bootcamps/mern-stack-bootcamp" },
        { icon: FiLayers, title: "Next.js + Supabase",  desc: "Modern full-stack with serverless and real-time features", badge: "New",         path: "/bootcamps/nextjs-supabase"     },
        { icon: FiZap,    title: "T3 Stack Bootcamp",   desc: "TypeScript, tRPC, Prisma, and deployment",                 badge: null,          path: "/bootcamps/t3-stack-bootcamp"   },
        { icon: FiGlobe,  title: "Headless CMS Track",  desc: "Contentful, Sanity, and composable architecture",          badge: null,          path: "/bootcamps/headless-cms-track"  },
      ],
      datascience: [
        { icon: FiBarChart2,  title: "Data Science Bootcamp", desc: "Python, SQL, ML, and Tableau in 16 weeks",          badge: "Hot",  path: "/bootcamps/data-science-bootcamp" },
        { icon: FiDatabase,   title: "Analytics Engineering",  desc: "dbt, Snowflake, and modern data stack",             badge: "New",  path: "/bootcamps/analytics-engineering" },
        { icon: FiTrendingUp, title: "Business Intelligence",  desc: "Power BI, dashboards, and executive reporting",     badge: null,   path: "/bootcamps/business-intelligence" },
        { icon: FiCpu,        title: "ML Ops Bootcamp",        desc: "Model deployment, monitoring, and drift detection", badge: null,   path: "/bootcamps/ml-ops-bootcamp"       },
      ],
      devops: [
        { icon: FiCloud,    title: "DevOps Engineer Bootcamp", desc: "CI/CD, containers, and cloud infrastructure",       badge: "Live", path: "/bootcamps/devops-engineer-bootcamp" },
        { icon: FiShield,   title: "Platform Engineering",     desc: "Internal developer portals and golden paths",       badge: "New",  path: "/bootcamps/platform-engineering"     },
        { icon: FiTerminal, title: "Kubernetes Bootcamp",      desc: "CKA exam prep with hands-on cluster labs",          badge: null,   path: "/bootcamps/kubernetes-bootcamp"      },
        { icon: FiZap,      title: "GitOps & ArgoCD",          desc: "Declarative deployments and progressive delivery",  badge: null,   path: "/bootcamps/gitops-and-argocd"        },
      ],
      aiml: [
        { icon: FiCpu,      title: "AI Engineering Bootcamp", desc: "Build and ship production AI applications",          badge: "Hot",  path: "/bootcamps/ai-engineering-bootcamp" },
        { icon: FiLayers,   title: "Deep Learning Intensive", desc: "PyTorch, transformers, and custom model training",   badge: null,   path: "/bootcamps/deep-learning-intensive"  },
        { icon: FiZap,      title: "Generative AI Track",     desc: "LLMs, diffusion models, and agentic systems",        badge: "New",  path: "/bootcamps/generative-ai-track"      },
        { icon: FiDatabase, title: "AI for Data Scientists",  desc: "Bridge classic ML skills to the LLM era",           badge: null,   path: "/bootcamps/ai-for-data-scientists"   },
      ],
      product: [
        { icon: FiUsers,     title: "UX Design Bootcamp",  desc: "Research, wireframing, prototyping, and portfolios",   badge: "Hot",  path: "/bootcamps/ux-design-bootcamp"   },
        { icon: FiLayers,    title: "Product Management",  desc: "Roadmaps, metrics, and cross-functional leadership",   badge: null,   path: "/bootcamps/product-management"   },
        { icon: FiGlobe,     title: "Design Systems",      desc: "Tokens, component libraries, and Figma workflows",     badge: "New",  path: "/bootcamps/design-systems"       },
        { icon: FiBarChart2, title: "Growth & Analytics",  desc: "Experimentation, funnels, and retention playbooks",    badge: null,   path: "/bootcamps/growth-and-analytics" },
      ],
    },
  },
  masterclasses: {
    categories: [
      { id: "engineering",  label: "Engineering",    icon: FiCode       },
      { id: "architecture", label: "Architecture",   icon: FiLayers     },
      { id: "leadership",   label: "Leadership",     icon: FiAward      },
      { id: "interview",    label: "Interview Prep", icon: FiTrendingUp },
    ],
    courses: {
      engineering: [
        { icon: FiCode,     title: "Clean Code Masterclass",  desc: "Refactoring, naming, and writing code that lasts",           badge: "Bestseller", path: "/masterclasses/clean-code-masterclass"  },
        { icon: FiZap,      title: "Performance Engineering", desc: "Profiling, caching, and latency reduction at scale",         badge: null,         path: "/masterclasses/performance-engineering" },
        { icon: FiTerminal, title: "API Design Principles",   desc: "REST, GraphQL, and versioning that does not break clients",  badge: "New",        path: "/masterclasses/api-design-principles"   },
        { icon: FiDatabase, title: "Database Internals",      desc: "B-trees, WAL, and query execution deep dive",               badge: null,         path: "/masterclasses/database-internals"      },
      ],
      architecture: [
        { icon: FiLayers, title: "Microservices Design",  desc: "Decomposition patterns, DDD, and event-driven systems",   badge: "Hot",  path: "/masterclasses/microservices-design"  },
        { icon: FiCloud,  title: "Cloud Native Patterns", desc: "12-factor apps, observability, and resilience",           badge: null,   path: "/masterclasses/cloud-native-patterns" },
        { icon: FiBox,    title: "Monolith to Services",  desc: "Incremental migration strategies without rewriting",      badge: "New",  path: "/masterclasses/monolith-to-services"  },
        { icon: FiShield, title: "Secure Architecture",   desc: "Threat modeling, zero-trust, and defense in depth",       badge: null,   path: "/masterclasses/secure-architecture"   },
      ],
      leadership: [
        { icon: FiUsers,      title: "Engineering Management", desc: "1:1s, roadmaps, and growing high-performing teams",   badge: "Popular", path: "/masterclasses/engineering-management" },
        { icon: FiAward,      title: "Staff Engineer Path",    desc: "Influence, technical strategy, and org navigation",   badge: "New",     path: "/masterclasses/staff-engineer-path"    },
        { icon: FiTrendingUp, title: "Tech Lead Skills",       desc: "Delegation, code review culture, and delivery",       badge: null,      path: "/masterclasses/tech-lead-skills"       },
        { icon: FiGlobe,      title: "Remote Team Leadership", desc: "Async culture, documentation, and distributed trust", badge: null,      path: "/masterclasses/remote-team-leadership" },
      ],
      interview: [
        { icon: FiCode,   title: "Coding Interview Pro",    desc: "LeetCode patterns, time complexity, and mock interviews", badge: "Hot",        path: "/masterclasses/coding-interview-pro"    },
        { icon: FiLayers, title: "System Design Interview", desc: "Framework, trade-offs, and 30 real design questions",    badge: "Bestseller", path: "/masterclasses/system-design-interview" },
        { icon: FiUsers,  title: "Behavioral Interview",    desc: "STAR stories, Amazon principles, and confidence",        badge: null,         path: "/masterclasses/behavioral-interview"    },
        { icon: FiAward,  title: "Salary Negotiation",      desc: "Comp research, anchoring, and negotiation scripts",      badge: "New",        path: "/masterclasses/salary-negotiation"      },
      ],
    },
  },
  coursesBooks: {
    categories: [
      { id: "webdev",    label: "Web Development", icon: FiCode      },
      { id: "databooks", label: "Data & AI Books",  icon: FiBookOpen  },
      { id: "algos",     label: "Algorithms",       icon: FiBarChart2 },
      { id: "devbooks",  label: "Dev Essentials",   icon: FiBookOpen  },
    ],
    courses: {
      webdev: [
        { icon: FiCode,   title: "JavaScript: The Good Parts", desc: "Core semantics, closures, and prototype chains",      badge: "Classic", path: "/books/javascript-the-good-parts" },
        { icon: FiLayers, title: "CSS in Depth",               desc: "Modern layout, custom properties, and animation",    badge: null,      path: "/books/css-in-depth"              },
        { icon: FiZap,    title: "React Patterns",             desc: "Compound components, render props, and composition", badge: "Hot",     path: "/books/react-patterns"            },
        { icon: FiGlobe,  title: "Web Security Handbook",      desc: "XSS, CSRF, CSP, and secure frontend practices",      badge: null,      path: "/books/web-security-handbook"     },
      ],
      databooks: [
        { icon: FiCpu,       title: "Designing ML Systems",        desc: "Chip Huyen's guide to production machine learning",  badge: "Bestseller", path: "/books/designing-ml-systems"        },
        { icon: FiDatabase,  title: "Fundamentals of Data Eng",    desc: "Pipelines, storage, and the modern data stack",      badge: "Hot",        path: "/books/fundamentals-of-data-eng"    },
        { icon: FiBarChart2, title: "Python for Data Analysis",    desc: "Pandas, NumPy, and Jupyter for real datasets",       badge: null,         path: "/books/python-for-data-analysis"    },
        { icon: FiLayers,    title: "Natural Language Processing", desc: "Transformers, tokenization, and text classification", badge: "New",       path: "/books/natural-language-processing" },
      ],
      algos: [
        { icon: FiBarChart2, title: "CLRS Algorithms",         desc: "The definitive guide to algorithm design and analysis", badge: "Classic",  path: "/books/clrs-algorithms"        },
        { icon: FiCode,      title: "Grokking Algorithms",     desc: "Illustrated walkthrough of essential CS algorithms",    badge: "Beginner", path: "/books/grokking-algorithms"    },
        { icon: FiCpu,       title: "Competitive Programming", desc: "Graph theory, DP, and segment trees for contests",      badge: null,       path: "/books/competitive-programming" },
        { icon: FiTerminal,  title: "LeetCode Patterns",       desc: "15 reusable patterns to solve any coding problem",      badge: "Hot",      path: "/books/leetcode-patterns"      },
      ],
      devbooks: [
        { icon: FiBookOpen, title: "The Pragmatic Programmer", desc: "20th anniversary edition, career wisdom for developers", badge: "Classic",    path: "/books/the-pragmatic-programmer" },
        { icon: FiLayers,   title: "Clean Architecture",       desc: "Robert Martin's guide to software structure",            badge: "Bestseller", path: "/books/clean-architecture"       },
        { icon: FiUsers,    title: "An Elegant Puzzle",        desc: "Engineering management systems for growing teams",       badge: null,         path: "/books/an-elegant-puzzle"        },
        { icon: FiZap,      title: "A Philosophy of Software", desc: "John Ousterhout on complexity and module design",        badge: "New",        path: "/books/a-philosophy-of-software" },
      ],
    },
  },
};

const BADGE_COLORS = {
  Hot:           "bg-rose-500/20 text-rose-400 border border-rose-500/30",
  New:           "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30",
  Popular:       "bg-violet-500/20 text-violet-400 border border-violet-500/30",
  "Cohort Live": "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
  Live:          "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
  Bestseller:    "bg-amber-500/20 text-amber-400 border border-amber-500/30",
  Classic:       "bg-slate-500/20 text-slate-300 border border-slate-500/30",
  Beginner:      "bg-teal-500/20 text-teal-400 border border-teal-500/30",
};

// ─── Badge ────────────────────────────────────────────────────────────────────

function Badge({ label }) {
  if (!label) return null;
  const cls = BADGE_COLORS[label] || "bg-slate-500/20 text-slate-300";
  return (
    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${cls}`}>
      {label}
    </span>
  );
}

// ─── CourseCard — NOW theme-aware ─────────────────────────────────────────────

function CourseCard({ course, isDark }) {
  const Icon = course.icon;
  const path = course.path ?? slugify(course.title);
  return (
    <Link
      to={path}
      className={`group flex items-start gap-3 p-3 rounded-2xl transition-all duration-200 cursor-pointer border hover:shadow-lg hover:-translate-y-0.5 ${th.cardWrapper(isDark)}`}
    >
      <div className={`flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br border flex items-center justify-center transition-all duration-200 ${th.cardIconWrap(isDark)}`}>
        <Icon className={`w-4 h-4 ${th.cardIcon(isDark)}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p className={`text-sm font-semibold truncate leading-tight transition-colors duration-200 ${th.cardTitle(isDark)}`}>
            {course.title}
          </p>
          <Badge label={course.badge} />
        </div>
        <p className={`text-xs leading-relaxed line-clamp-2 ${th.cardDesc(isDark)}`}>{course.desc}</p>
      </div>
      <FiChevronRight className={`w-3.5 h-3.5 flex-shrink-0 mt-1 transition-colors duration-200 ${th.cardArrow(isDark)}`} />
    </Link>
  );
}

// ─── MegaMenu — NOW fully theme-aware ────────────────────────────────────────

function MegaMenu({ menuKey, isVisible, isDark }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const data = MEGA_DATA[menuKey];

  useEffect(() => {
    if (data && isVisible) setActiveCategory(data.categories[0].id);
  }, [menuKey, isVisible, data]);

  if (!data) return null;
  const activeCourses = activeCategory ? data.courses[activeCategory] || [] : [];

  return (
    <div
      className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[820px] max-w-[96vw] rounded-3xl border shadow-2xl overflow-hidden transition-all duration-200 ${th.megaPanel(isDark)} ${
        isVisible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
      }`}
      style={{ background: th.megaPanelBg(isDark) }}
    >
      {/* Accent line */}
      <div className={`h-px w-full ${th.megaAccentLine(isDark)}`} />

      <div className="flex">
        {/* Sidebar */}
        <div className={`w-52 flex-shrink-0 p-3 border-r ${th.megaSidebar(isDark)}`}>
          <p className={`text-[10px] font-bold uppercase tracking-widest px-3 mb-2 mt-1 ${th.megaSidebarLabel(isDark)}`}>
            Categories
          </p>
          {data.categories.map((cat) => {
            const CatIcon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onMouseEnter={() => setActiveCategory(cat.id)}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-sm font-medium transition-all duration-150 mb-0.5 ${
                  isActive ? th.megaCatActive(isDark) : th.megaCatIdle(isDark)
                }`}
              >
                <CatIcon className={`w-4 h-4 flex-shrink-0 ${th.megaCatIcon(isActive, isDark)}`} />
                <span className="truncate">{cat.label}</span>
                {isActive && <FiChevronRight className="w-3 h-3 text-cyan-400 ml-auto flex-shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Course grid */}
        <div className="flex-1 p-4">
          <div className="flex items-center justify-between mb-3">
            <p className={`text-[10px] font-bold uppercase tracking-widest ${th.megaLabel(isDark)}`}>
              {data.categories.find((c) => c.id === activeCategory)?.label}
            </p>
            <button className={`text-xs font-semibold flex items-center gap-1 transition-colors duration-150 ${th.megaViewAll(isDark)}`}>
              View all <FiChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-1">
            {activeCourses.map((course, i) => (
              <CourseCard key={i} course={course} isDark={isDark} />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={`px-5 py-3 border-t flex items-center justify-between ${th.megaFooter(isDark)}`}>
        <p className={`text-xs ${th.megaFooterText(isDark)}`}>
          <span className={`font-semibold ${th.megaFooterCount(isDark)}`}>500+</span> courses · Updated weekly
        </p>
        <button className="text-xs font-semibold px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-600 to-blue-700 text-white hover:from-cyan-500 hover:to-blue-600 transition-all duration-200 shadow-md shadow-blue-900/20">
          Browse All Courses →
        </button>
      </div>
    </div>
  );
}

// ─── MobileNavItem ────────────────────────────────────────────────────────────

function MobileNavItem({ item, isOpen, onToggle, isDark }) {
  const data = item.hasMega ? MEGA_DATA[item.key] : null;
  const [activeCategory, setActiveCategory] = useState(data?.categories[0]?.id || null);

  return (
    <div className={`border-b ${th.drawerDivider(isDark)} last:border-0`}>
      {item.hasMega ? (
        <>
          <button
            onClick={onToggle}
            className={`w-full flex items-center justify-between px-5 py-4 text-sm font-semibold transition-all duration-150 ${th.drawerItem(isDark)}`}
          >
            {item.label}
            <FiChevronDown className={`w-4 h-4 transition-transform duration-200 ${th.drawerChevron(isDark)} ${isOpen ? "rotate-180" : ""}`} />
          </button>

          {isOpen && data && (
            <div className={`pb-3 ${th.drawerExpanded(isDark)}`}>
              <div className="flex gap-1 px-3 mb-3 overflow-x-auto scrollbar-hide">
                {data.categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-150 ${th.drawerPill(activeCategory === cat.id, isDark)}`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
              <div className="px-3 space-y-1">
                {(data.courses[activeCategory] || []).map((course, i) => (
                  <CourseCard key={i} course={course} isDark={isDark} />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <a
          href={item.href || "#"}
          className={`flex items-center px-5 py-4 text-sm font-semibold transition-all duration-150 ${th.drawerItem(isDark)}`}
        >
          {item.label}
        </a>
      )}
    </div>
  );
}

// ─── ThemeToggle ──────────────────────────────────────────────────────────────

function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle light / dark mode"
      className={`relative flex items-center w-[52px] h-[28px] rounded-full border transition-all duration-300 flex-shrink-0 ${
        isDark ? "bg-slate-700/80 border-slate-600/60" : "bg-amber-100 border-amber-300/60"
      }`}
    >
      <FiSun  className={`absolute left-[6px]  w-3 h-3 transition-opacity duration-200 ${isDark ? "opacity-25 text-slate-400" : "opacity-100 text-amber-500"}`} />
      <FiMoon className={`absolute right-[6px] w-3 h-3 transition-opacity duration-200 ${isDark ? "opacity-100 text-slate-300" : "opacity-25 text-slate-400"}`} />
      <span
        className={`absolute top-[3px] w-[22px] h-[22px] rounded-full flex items-center justify-center transition-all duration-300 ${
          isDark ? "translate-x-[25px] bg-slate-900 border border-slate-600/40"
                 : "translate-x-[3px]  bg-white     border border-amber-200/60"
        }`}
      >
        {isDark ? <FiMoon className="w-3 h-3 text-cyan-400" /> : <FiSun className="w-3 h-3 text-amber-500" />}
      </span>
    </button>
  );
}

// ─── WishlistButton ───────────────────────────────────────────────────────────

function WishlistButton({ count, isDark }) {
  return (
    <Link
      to="/wishlist"
      aria-label={`Wishlist${count > 0 ? `, ${count} items` : ""}`}
      className={`relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-150 ${
        isDark ? "text-slate-400 hover:text-rose-400 hover:bg-white/8" : "text-slate-500 hover:text-rose-500 hover:bg-rose-50"
      }`}
    >
      <FiHeart className="w-4 h-4" />
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center leading-none pointer-events-none">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────

export default function Navbar() {
  const { isDark, toggle: toggleTheme } = useThemeContext();

  const [activeMega,     setActiveMega]     = useState(null);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [openMobileItem, setOpenMobileItem] = useState(null);
  const [scrolled,       setScrolled]       = useState(false);
  const wishlistCount = 3;
  const megaTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const openMega  = useCallback((key) => { clearTimeout(megaTimer.current); setActiveMega(key); }, []);
  const closeMega = useCallback(() => { megaTimer.current = setTimeout(() => setActiveMega(null), 100); }, []);
  const stayOpen  = useCallback(() => clearTimeout(megaTimer.current), []);
  const toggleMobileItem = useCallback((key) => setOpenMobileItem((p) => p === key ? null : key), []);

  return (
    <>
      {/* ── Desktop / Tablet Navbar ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${th.headerShadow(scrolled, isDark)} ${th.headerBorder(isDark)}`}
        style={{
          background: th.headerBg(scrolled, isDark),
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          transition: "background 0.3s, box-shadow 0.3s",
        }}
      >
        <div className={`h-px w-full ${th.accentLine(isDark)}`} />

        <nav className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <a href="/" className="flex items-center gap-3 flex-shrink-0">
            <img src="https://www.pirnav.com/images/pirnav_logo.png" alt="Pirnav Edutech" className="h-9 w-9 object-contain" />
            <p className={`hidden sm:block text-xs uppercase tracking-[0.3em] font-medium leading-none transition-colors duration-300 ${th.tagline(isDark)}`}>
              Learn · Build · Grow
            </p>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.hasMega && openMega(item.key)}
                onMouseLeave={item.hasMega ? closeMega : undefined}
              >
                <Link
                  to={item.path || item.href || "#"}
                  className={`flex items-center gap-1 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-150 ${th.navLink(activeMega === item.key, isDark)}`}
                >
                  {item.label}
                  {item.hasMega && (
                    <FiChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${th.chevron(activeMega === item.key, isDark)}`} />
                  )}
                </Link>
                {item.hasMega && (
                  <div onMouseEnter={stayOpen} onMouseLeave={closeMega}>
                    {/* ✅ isDark now passed into MegaMenu */}
                    <MegaMenu menuKey={item.key} isVisible={activeMega === item.key} isDark={isDark} />
                  </div>
                )}
              </div>
            ))}

            <Link to="/admissions" className={`px-3.5 py-2 text-sm font-semibold rounded-xl transition-all duration-150 ${th.admissions(isDark)}`}>
              Admissions
            </Link>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
            <WishlistButton count={wishlistCount} isDark={isDark} />
            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className={`lg:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-150 ${th.hamburger(isDark)}`}
            >
              {mobileOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile Drawer ── */}
      <div
        className={`fixed inset-0 z-40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} ${th.drawerBackdrop(isDark)}`}
        onClick={() => setMobileOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm flex flex-col transition-transform duration-300 ease-out lg:hidden ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{
          background: th.drawerBg(isDark),
          borderLeft: `1px solid ${th.drawerBorder(isDark)}`,
          transition: "transform 0.3s ease-out, background 0.3s",
        }}
      >
        {/* Drawer header */}
        <div className={`flex items-center justify-between px-5 py-4 border-b ${th.drawerHeader(isDark)}`}>
          <a href="/" className="flex items-center gap-3">
            <img src="https://www.pirnav.com/images/pirnav_logo.png" alt="Pirnav Edutech" className="h-8 w-8 object-contain" />
            <p className={`text-xs uppercase tracking-[0.3em] font-medium leading-none ${th.tagline(isDark)}`}>
              Learn · Build · Grow
            </p>
          </a>
          <div className="flex items-center gap-1.5">
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
            <WishlistButton count={wishlistCount} isDark={isDark} />
            <button onClick={() => setMobileOpen(false)} className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-150 ${th.drawerClose(isDark)}`}>
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Nav items */}
        <div className="flex-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <MobileNavItem
              key={item.label}
              item={item}
              isOpen={openMobileItem === item.key}
              onToggle={() => toggleMobileItem(item.key)}
              isDark={isDark}
            />
          ))}
          <div className={`border-b ${th.drawerDivider(isDark)}`}>
            <Link
              to="/admissions"
              className={`flex items-center px-5 py-4 text-sm font-semibold transition-all duration-150 ${th.drawerItem(isDark)}`}
              onClick={() => setMobileOpen(false)}
            >
              Admissions
            </Link>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}