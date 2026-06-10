import { useState, useRef, useEffect, useCallback } from "react";
import {
  FiSun,
  FiMoon,
  FiMenu,
  FiX,
  FiChevronDown,
  FiChevronRight,
  FiCode,
  FiDatabase,
  FiCloud,
  FiLayers,
  FiCpu,
  FiShield,
  FiSmartphone,
  FiBarChart2,
  FiBookOpen,
  FiZap,
  FiUsers,
  FiGlobe,
  FiAward,
  FiTrendingUp,
  FiTerminal,
  FiBox,
} from "react-icons/fi";

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: "Skill Tracks", hasMega: true, key: "skillTracks" },
  { label: "Bootcamps", hasMega: true, key: "bootcamps" },
  { label: "Masterclasses", hasMega: true, key: "masterclasses" },
  { label: "Courses & Books", hasMega: true, key: "coursesBooks" },
  
  { label: "Explore", hasMega: false, href: "#" },
];

const MEGA_DATA = {
  skillTracks: {
    categories: [
      { id: "frontend", label: "Frontend Dev", icon: FiCode },
      { id: "backend", label: "Backend Dev", icon: FiDatabase },
      { id: "cloud", label: "Cloud & DevOps", icon: FiCloud },
      { id: "ai", label: "AI & ML", icon: FiCpu },
      { id: "security", label: "Cybersecurity", icon: FiShield },
      { id: "mobile", label: "Mobile Dev", icon: FiSmartphone },
    ],
    courses: {
      frontend: [
        {
          icon: FiCode,
          title: "React Mastery Track",
          desc: "From hooks to architecture patterns — build scalable SPAs",
          badge: "Hot",
          Path: "/react-course",
        },
        {
          icon: FiLayers,
          title: "Advanced TypeScript",
          desc: "Type systems, generics, and enterprise-grade patterns",
          badge: "New",
        },
        {
          icon: FiZap,
          title: "Next.js Full Stack",
          desc: "SSR, ISR, App Router, and production deployment",
          badge: null,
        },
        {
          icon: FiGlobe,
          title: "Web Performance",
          desc: "Core Web Vitals, bundling, and runtime optimization",
          badge: null,
        },
      ],
      backend: [
        {
          icon: FiDatabase,
          title: "Node.js & Express",
          desc: "REST APIs, middleware, auth, and microservices",
          badge: "Hot",
        },
        {
          icon: FiTerminal,
          title: "Go for Backend Devs",
          desc: "Concurrency, HTTP servers, and production Go",
          badge: "New",
        },
        {
          icon: FiBox,
          title: "System Design Pro",
          desc: "Scalability, caching, queues, and distributed systems",
          badge: null,
        },
        {
          icon: FiLayers,
          title: "GraphQL Deep Dive",
          desc: "Schema design, resolvers, federation, and performance",
          badge: null,
        },
      ],
      cloud: [
        {
          icon: FiCloud,
          title: "AWS Solutions Architect",
          desc: "Certification-ready training for SAA-C03",
          badge: "Popular",
        },
        {
          icon: FiZap,
          title: "Docker & Kubernetes",
          desc: "Containerization, orchestration, and CI/CD pipelines",
          badge: null,
        },
        {
          icon: FiShield,
          title: "Terraform Infrastructure",
          desc: "IaC patterns, modules, and state management",
          badge: null,
        },
        {
          icon: FiTrendingUp,
          title: "Site Reliability Engineering",
          desc: "Observability, alerting, and incident response",
          badge: "New",
        },
      ],
      ai: [
        {
          icon: FiCpu,
          title: "Machine Learning A–Z",
          desc: "Supervised, unsupervised, and reinforcement learning",
          badge: "Hot",
        },
        {
          icon: FiZap,
          title: "LLM Engineering",
          desc: "Prompt design, fine-tuning, and RAG pipelines",
          badge: "New",
        },
        {
          icon: FiBarChart2,
          title: "Data Science with Python",
          desc: "EDA, visualization, and predictive modeling",
          badge: null,
        },
        {
          icon: FiLayers,
          title: "Computer Vision",
          desc: "CNNs, object detection, and real-world projects",
          badge: null,
        },
      ],
      security: [
        {
          icon: FiShield,
          title: "Ethical Hacking",
          desc: "Pen testing, exploit development, and CTF challenges",
          badge: "Hot",
        },
        {
          icon: FiTerminal,
          title: "AppSec Engineering",
          desc: "OWASP top 10, secure code review, SAST/DAST",
          badge: null,
        },
        {
          icon: FiGlobe,
          title: "Network Security",
          desc: "Firewalls, IDS/IPS, and zero-trust architecture",
          badge: "New",
        },
        {
          icon: FiAward,
          title: "CompTIA Security+",
          desc: "Exam-focused prep with real-world scenario labs",
          badge: null,
        },
      ],
      mobile: [
        {
          icon: FiSmartphone,
          title: "React Native Pro",
          desc: "Cross-platform apps with native performance",
          badge: "Hot",
        },
        {
          icon: FiLayers,
          title: "Flutter & Dart",
          desc: "Beautiful UIs, state management, and deployment",
          badge: null,
        },
        {
          icon: FiCpu,
          title: "iOS with Swift",
          desc: "SwiftUI, UIKit, and App Store deployment",
          badge: "New",
        },
        {
          icon: FiBox,
          title: "Android & Kotlin",
          desc: "Jetpack Compose, MVVM, and Play Store release",
          badge: null,
        },
      ],
    },
  },
  bootcamps: {
    categories: [
      { id: "fullstack", label: "Full Stack", icon: FiLayers },
      { id: "datascience", label: "Data Science", icon: FiBarChart2 },
      { id: "devops", label: "DevOps", icon: FiCloud },
      { id: "aiml", label: "AI & ML", icon: FiCpu },
      { id: "product", label: "Product Design", icon: FiUsers },
    ],
    courses: {
      fullstack: [
        {
          icon: FiCode,
          title: "MERN Stack Bootcamp",
          desc: "12-week intensive — from zero to job-ready",
          badge: "Cohort Live",
        },
        {
          icon: FiLayers,
          title: "Next.js + Supabase",
          desc: "Modern full-stack with serverless and real-time features",
          badge: "New",
        },
        {
          icon: FiZap,
          title: "T3 Stack Bootcamp",
          desc: "TypeScript, tRPC, Prisma, and deployment",
          badge: null,
        },
        {
          icon: FiGlobe,
          title: "Headless CMS Track",
          desc: "Contentful, Sanity, and composable architecture",
          badge: null,
        },
      ],
      datascience: [
        {
          icon: FiBarChart2,
          title: "Data Science Bootcamp",
          desc: "Python, SQL, ML, and Tableau in 16 weeks",
          badge: "Hot",
        },
        {
          icon: FiDatabase,
          title: "Analytics Engineering",
          desc: "dbt, Snowflake, and modern data stack",
          badge: "New",
        },
        {
          icon: FiTrendingUp,
          title: "Business Intelligence",
          desc: "Power BI, dashboards, and executive reporting",
          badge: null,
        },
        {
          icon: FiCpu,
          title: "ML Ops Bootcamp",
          desc: "Model deployment, monitoring, and drift detection",
          badge: null,
        },
      ],
      devops: [
        {
          icon: FiCloud,
          title: "DevOps Engineer Bootcamp",
          desc: "CI/CD, containers, and cloud infrastructure",
          badge: "Live",
        },
        {
          icon: FiShield,
          title: "Platform Engineering",
          desc: "Internal developer portals and golden paths",
          badge: "New",
        },
        {
          icon: FiTerminal,
          title: "Kubernetes Bootcamp",
          desc: "CKA exam prep with hands-on cluster labs",
          badge: null,
        },
        {
          icon: FiZap,
          title: "GitOps & ArgoCD",
          desc: "Declarative deployments and progressive delivery",
          badge: null,
        },
      ],
      aiml: [
        {
          icon: FiCpu,
          title: "AI Engineering Bootcamp",
          desc: "Build and ship production AI applications",
          badge: "Hot",
        },
        {
          icon: FiLayers,
          title: "Deep Learning Intensive",
          desc: "PyTorch, transformers, and custom model training",
          badge: null,
        },
        {
          icon: FiZap,
          title: "Generative AI Track",
          desc: "LLMs, diffusion models, and agentic systems",
          badge: "New",
        },
        {
          icon: FiDatabase,
          title: "AI for Data Scientists",
          desc: "Bridge classic ML skills to the LLM era",
          badge: null,
        },
      ],
      product: [
        {
          icon: FiUsers,
          title: "UX Design Bootcamp",
          desc: "Research, wireframing, prototyping, and portfolios",
          badge: "Hot",
        },
        {
          icon: FiLayers,
          title: "Product Management",
          desc: "Roadmaps, metrics, and cross-functional leadership",
          badge: null,
        },
        {
          icon: FiGlobe,
          title: "Design Systems",
          desc: "Tokens, component libraries, and Figma workflows",
          badge: "New",
        },
        {
          icon: FiBarChart2,
          title: "Growth & Analytics",
          desc: "Experimentation, funnels, and retention playbooks",
          badge: null,
        },
      ],
    },
  },
  masterclasses: {
    categories: [
      { id: "engineering", label: "Engineering", icon: FiCode },
      { id: "architecture", label: "Architecture", icon: FiLayers },
      { id: "leadership", label: "Leadership", icon: FiAward },
      { id: "interview", label: "Interview Prep", icon: FiTrendingUp },
    ],
    courses: {
      engineering: [
        {
          icon: FiCode,
          title: "Clean Code Masterclass",
          desc: "Refactoring, naming, and writing code that lasts",
          badge: "Bestseller",
        },
        {
          icon: FiZap,
          title: "Performance Engineering",
          desc: "Profiling, caching, and latency reduction at scale",
          badge: null,
        },
        {
          icon: FiTerminal,
          title: "API Design Principles",
          desc: "REST, GraphQL, and versioning that doesn't break clients",
          badge: "New",
        },
        {
          icon: FiDatabase,
          title: "Database Internals",
          desc: "B-trees, WAL, and query execution deep dive",
          badge: null,
        },
      ],
      architecture: [
        {
          icon: FiLayers,
          title: "Microservices Design",
          desc: "Decomposition patterns, DDD, and event-driven systems",
          badge: "Hot",
        },
        {
          icon: FiCloud,
          title: "Cloud Native Patterns",
          desc: "12-factor apps, observability, and resilience",
          badge: null,
        },
        {
          icon: FiBox,
          title: "Monolith to Services",
          desc: "Incremental migration strategies without rewriting",
          badge: "New",
        },
        {
          icon: FiShield,
          title: "Secure Architecture",
          desc: "Threat modeling, zero-trust, and defense in depth",
          badge: null,
        },
      ],
      leadership: [
        {
          icon: FiUsers,
          title: "Engineering Management",
          desc: "1:1s, roadmaps, and growing high-performing teams",
          badge: "Popular",
        },
        {
          icon: FiAward,
          title: "Staff Engineer Path",
          desc: "Influence, technical strategy, and org navigation",
          badge: "New",
        },
        {
          icon: FiTrendingUp,
          title: "Tech Lead Skills",
          desc: "Delegation, code review culture, and delivery",
          badge: null,
        },
        {
          icon: FiGlobe,
          title: "Remote Team Leadership",
          desc: "Async culture, documentation, and distributed trust",
          badge: null,
        },
      ],
      interview: [
        {
          icon: FiCode,
          title: "Coding Interview Pro",
          desc: "LeetCode patterns, time complexity, and mock interviews",
          badge: "Hot",
        },
        {
          icon: FiLayers,
          title: "System Design Interview",
          desc: "Framework, trade-offs, and 30 real design questions",
          badge: "Bestseller",
        },
        {
          icon: FiUsers,
          title: "Behavioral Interview",
          desc: "STAR stories, Amazon principles, and confidence",
          badge: null,
        },
        {
          icon: FiAward,
          title: "Salary Negotiation",
          desc: "Comp research, anchoring, and negotiation scripts",
          badge: "New",
        },
      ],
    },
  },
  coursesBooks: {
    categories: [
      { id: "webdev", label: "Web Development", icon: FiCode },
      { id: "databooks", label: "Data & AI Books", icon: FiBookOpen },
      { id: "algos", label: "Algorithms", icon: FiBarChart2 },
      { id: "devbooks", label: "Dev Essentials", icon: FiBookOpen },
    ],
    courses: {
      webdev: [
        {
          icon: FiCode,
          title: "JavaScript: The Good Parts",
          desc: "Core semantics, closures, and prototype chains",
          badge: "Classic",
        },
        {
          icon: FiLayers,
          title: "CSS in Depth",
          desc: "Modern layout, custom properties, and animation",
          badge: null,
        },
        {
          icon: FiZap,
          title: "React Patterns",
          desc: "Compound components, render props, and composition",
          badge: "Hot",
        },
        {
          icon: FiGlobe,
          title: "Web Security Handbook",
          desc: "XSS, CSRF, CSP, and secure frontend practices",
          badge: null,
        },
      ],
      databooks: [
        {
          icon: FiCpu,
          title: "Designing ML Systems",
          desc: "Chip Huyen's guide to production machine learning",
          badge: "Bestseller",
        },
        {
          icon: FiDatabase,
          title: "Fundamentals of Data Eng",
          desc: "Pipelines, storage, and the modern data stack",
          badge: "Hot",
        },
        {
          icon: FiBarChart2,
          title: "Python for Data Analysis",
          desc: "Pandas, NumPy, and Jupyter for real datasets",
          badge: null,
        },
        {
          icon: FiLayers,
          title: "Natural Language Processing",
          desc: "Transformers, tokenization, and text classification",
          badge: "New",
        },
      ],
      algos: [
        {
          icon: FiBarChart2,
          title: "CLRS Algorithms",
          desc: "The definitive guide to algorithm design and analysis",
          badge: "Classic",
        },
        {
          icon: FiCode,
          title: "Grokking Algorithms",
          desc: "Illustrated walkthrough of essential CS algorithms",
          badge: "Beginner",
        },
        {
          icon: FiCpu,
          title: "Competitive Programming",
          desc: "Graph theory, DP, and segment trees for contests",
          badge: null,
        },
        {
          icon: FiTerminal,
          title: "LeetCode Patterns",
          desc: "15 reusable patterns to solve any coding problem",
          badge: "Hot",
        },
      ],
      devbooks: [
        {
          icon: FiBookOpen,
          title: "The Pragmatic Programmer",
          desc: "20th anniversary edition — career wisdom for developers",
          badge: "Classic",
        },
        {
          icon: FiLayers,
          title: "Clean Architecture",
          desc: "Robert Martin's guide to software structure",
          badge: "Bestseller",
        },
        {
          icon: FiUsers,
          title: "An Elegant Puzzle",
          desc: "Engineering management systems for growing teams",
          badge: null,
        },
        {
          icon: FiZap,
          title: "A Philosophy of Software",
          desc: "John Ousterhout on complexity and module design",
          badge: "New",
        },
      ],
    },
  },
 
};

const BADGE_COLORS = {
  Hot: "bg-rose-500/20 text-rose-400 border border-rose-500/30",
  New: "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30",
  Popular: "bg-violet-500/20 text-violet-400 border border-violet-500/30",
  "Cohort Live": "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
  Live: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
  Bestseller: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
  Classic: "bg-slate-500/20 text-slate-300 border border-slate-500/30",
  Beginner: "bg-teal-500/20 text-teal-400 border border-teal-500/30",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function Badge({ label }) {
  if (!label) return null;
  const colorClass = BADGE_COLORS[label] || "bg-slate-500/20 text-slate-300";
  return (
    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${colorClass}`}>
      {label}
    </span>
  );
}

function CourseCard({ course }) {
  const Icon = course.icon;
  return (
    <div className="group flex items-start gap-3 p-3 rounded-2xl transition-all duration-200 hover:bg-white/5 cursor-pointer border border-transparent hover:border-white/10 hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5">
      <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-white/10 flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-blue-600/30 transition-all duration-200">
        <Icon className="w-4 h-4 text-cyan-400" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p className="text-sm font-semibold text-slate-100 group-hover:text-white truncate leading-tight">
            {course.title}
          </p>
          <Badge label={course.badge} />
        </div>
        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{course.desc}</p>
      </div>
      <FiChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 flex-shrink-0 mt-1 transition-colors duration-200" />
    </div>
  );
}

function MegaMenu({ menuKey, isVisible }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const data = MEGA_DATA[menuKey];

  useEffect(() => {
    if (data && isVisible) {
      setActiveCategory(data.categories[0].id);
    }
  }, [menuKey, isVisible, data]);

  if (!data) return null;

  const activeCourses = activeCategory ? data.courses[activeCategory] || [] : [];

  return (
    <div
      className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[820px] max-w-[96vw] rounded-3xl border border-white/8 shadow-2xl shadow-black/60 overflow-hidden transition-all duration-200 ${
        isVisible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
      }`}
      style={{ background: "linear-gradient(145deg, #0d2137 0%, #091929 60%, #0a1e2e 100%)" }}
    >
      {/* Top accent bar */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="flex">
        {/* Left sidebar */}
        <div className="w-52 flex-shrink-0 p-3 border-r border-white/6 bg-black/20">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-3 mb-2 mt-1">
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
                  isActive
                    ? "bg-gradient-to-r from-cyan-600/25 to-blue-600/15 text-white border border-cyan-500/20 shadow-sm shadow-cyan-900/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                }`}
              >
                <CatIcon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-cyan-400" : "text-slate-500"}`} />
                <span className="truncate">{cat.label}</span>
                {isActive && <FiChevronRight className="w-3 h-3 text-cyan-400 ml-auto flex-shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Right course grid */}
        <div className="flex-1 p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              {data.categories.find((c) => c.id === activeCategory)?.label}
            </p>
            <button className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 transition-colors duration-150">
              View all <FiChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-1">
            {activeCourses.map((course, i) => (
              <CourseCard key={i} course={course} />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-white/6 bg-black/20 flex items-center justify-between">
        <p className="text-xs text-slate-500">
          <span className="text-cyan-400 font-semibold">500+</span> courses · Updated weekly
        </p>
        <button className="text-xs font-semibold px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-600 to-blue-700 text-white hover:from-cyan-500 hover:to-blue-600 transition-all duration-200 shadow-md shadow-blue-900/40">
          Browse All Courses →
        </button>
      </div>
    </div>
  );
}

function MobileNavItem({ item, isOpen, onToggle }) {
  const data = item.hasMega ? MEGA_DATA[item.key] : null;
  const [activeCategory, setActiveCategory] = useState(data?.categories[0]?.id || null);

  return (
    <div className="border-b border-white/6 last:border-0">
      {item.hasMega ? (
        <>
          <button
            onClick={onToggle}
            className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/4 transition-all duration-150"
          >
            {item.label}
            <FiChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
          </button>
          {isOpen && data && (
            <div className="pb-3 bg-black/20">
              <div className="flex gap-1 px-3 mb-3 overflow-x-auto scrollbar-hide">
                {data.categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-150 ${
                      activeCategory === cat.id
                        ? "bg-gradient-to-r from-cyan-600 to-blue-700 text-white"
                        : "bg-white/6 text-slate-400 hover:text-white"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
              <div className="px-3 space-y-1">
                {(data.courses[activeCategory] || []).map((course, i) => (
                  <CourseCard key={i} course={course} />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <a
          href={item.href || "#"}
          className="flex items-center px-5 py-4 text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/4 transition-all duration-150"
        >
          {item.label}
        </a>
      )}
    </div>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────

export default function Navbar() {
  const [activeMega, setActiveMega] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileItem, setOpenMobileItem] = useState(null);
  const [isDark, setIsDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const megaTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const openMega = useCallback((key) => {
    clearTimeout(megaTimer.current);
    setActiveMega(key);
  }, []);

  const closeMega = useCallback(() => {
    megaTimer.current = setTimeout(() => setActiveMega(null), 100);
  }, []);

  const stayOpen = useCallback(() => {
    clearTimeout(megaTimer.current);
  }, []);

  const toggleMobileItem = useCallback((key) => {
    setOpenMobileItem((prev) => (prev === key ? null : key));
  }, []);

  return (
    <>
      {/* ── Desktop / Tablet Navbar ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "shadow-2xl shadow-black/50 border-b border-white/6"
            : "border-b border-transparent"
        }`}
        style={{
          background: scrolled
            ? "rgba(2, 21, 41, 0.92)"
            : "rgba(2, 21, 41, 0.98)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        {/* Top gradient line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

        <nav className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

          {/* ── Logo ── */}
          <a href="/" className="flex items-center gap-3 flex-shrink-0">
            <img
              src="https://www.pirnav.com/images/pirnav_logo.png"
              alt="Pirnav Edutech"
              className="h-9 w-9 object-contain"
            />
            <p className="hidden sm:block text-xs uppercase tracking-[0.3em] text-slate-400 font-medium leading-none">
              Learn · Build · Grow
            </p>
          </a>

          {/* ── Desktop Nav (centred) ── */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.hasMega && openMega(item.key)}
                onMouseLeave={item.hasMega ? closeMega : undefined}
              >
                <button
                  className={`flex items-center gap-1 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-150 ${
                    activeMega === item.key
                      ? "text-white bg-white/8"
                      : "text-slate-300 hover:text-white hover:bg-white/6"
                  }`}
                >
                  {item.label}
                  {item.hasMega && (
                    <FiChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        activeMega === item.key ? "rotate-180 text-cyan-400" : "text-slate-500"
                      }`}
                    />
                  )}
                </button>

                {item.hasMega && (
                  <div onMouseEnter={stayOpen} onMouseLeave={closeMega}>
                    <MegaMenu menuKey={item.key} isVisible={activeMega === item.key} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ── Right: theme toggle + hamburger ── */}
          <div className="flex items-center gap-1.5">
            {/* Theme toggle */}
            <button
              onClick={() => setIsDark((d) => !d)}
              aria-label="Toggle theme"
              className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/8 transition-all duration-150"
            >
              {isDark ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/8 transition-all duration-150"
            >
              {mobileOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>

        </nav>
      </header>

      {/* ── Mobile Drawer ── */}
      <>
        {/* Backdrop */}
        <div
          className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
            mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer panel */}
        <div
          className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm flex flex-col transition-transform duration-300 ease-out lg:hidden ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{
            background: "linear-gradient(180deg, #0d2137 0%, #091929 100%)",
            borderLeft: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
            <a href="/" className="flex items-center gap-3">
              <img
                src="https://www.pirnav.com/images/pirnav_logo.png"
                alt="Pirnav Edutech"
                className="h-8 w-8 object-contain"
              />
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400 font-medium leading-none">
                Learn · Build · Grow
              </p>
            </a>
            <button
              onClick={() => setMobileOpen(false)}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/8 transition-all duration-150"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Nav items */}
          <div className="flex-1 overflow-y-auto">
            {NAV_ITEMS.map((item) => (
              <MobileNavItem
                key={item.label}
                item={item}
                isOpen={openMobileItem === item.key}
                onToggle={() => toggleMobileItem(item.key)}
              />
            ))}
          </div>


        </div>
      </>

      {/* ── Spacer (push content below fixed header) ── */}
      <div className="h-16" />
    </>
  );
}