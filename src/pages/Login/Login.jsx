import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  ArrowRight,
  ChevronLeft,
  Sparkles,
  Shield,
  Building2,
  User,
  Plus,
  CheckCircle,
  Lock,
  Mail,
  Moon,
  Sun,
  Zap,
} from "lucide-react";
import { useThemeContext } from "../../context/ThemeContext";
import { ROUTES } from "../../routes/routeConstants";

// ═══════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════

const ROLES = [
  {
    id: "super-admin",
    title: "Super Admin",
    description:
      "Full platform oversight, manage organizations, subscriptions, and analytics.",
    action: "Continue as Super Admin",
    icon: Shield,
    gradient: "linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)",
    shadowColor: "rgba(59,130,246,0.25)",
    features: ["Organization oversight", "Subscription management", "Platform analytics"],
    redirectAfterLogin: ROUTES.SUPER_ADMIN.DASHBOARD,
    emailPlaceholder: "admin@talentsphere.io",
    color: "from-blue-500 via-purple-500 to-pink-500",
    tag: "Platform-wide",
  },
  {
    id: "org-admin",
    title: "Organization Admin",
    description:
      "Manage employees, departments, teams, goals, and performance reviews.",
    action: "Continue as Organization Admin",
    icon: Building2,
    gradient: "linear-gradient(135deg, #059669, #10B981, #34D399)",
    shadowColor: "rgba(5,150,105,0.25)",
    features: ["Employee management", "Team & department oversight", "Performance tracking"],
    redirectAfterLogin: ROUTES.ORG_ADMIN.DASHBOARD,
    emailPlaceholder: "admin@acmecorp.com",
    color: "from-emerald-500 via-emerald-400 to-teal-400",
    tag: "Organization",
  },
  {
    id: "employee",
    title: "Employee",
    description:
      "Track skills, goals, learning progress, and career growth in one place.",
    action: "Continue as Employee",
    icon: User,
    gradient: "linear-gradient(135deg, #D97706, #F59E0B, #FCD34D)",
    shadowColor: "rgba(217,119,6,0.25)",
    features: ["Skill development", "Goal tracking", "Career progression"],
    redirectAfterLogin: ROUTES.EMPLOYEE.DASHBOARD,
    emailPlaceholder: "narendra@acmecorp.com",
    color: "from-amber-500 via-amber-400 to-yellow-400",
    tag: "Individual",
  },
  {
    id: "register",
    title: "Register Organization",
    description:
      "Create a new organization and start managing your workforce in minutes.",
    action: "Register Organization",
    icon: Plus,
    gradient: "linear-gradient(135deg, #6366F1, #8B5CF6, #A78BFA)",
    shadowColor: "rgba(99,102,241,0.25)",
    features: ["Free organization setup", "Team onboarding tools", "HRMS configuration"],
    redirectPath: ROUTES.ORG_ADMIN.REGISTRATION,
    color: "from-indigo-500 via-purple-500 to-purple-400",
    tag: "New setup",
  },
];

const ROLE_LOGIN_DETAILS = {
  "super-admin": {
    label: "Super Admin",
    emailLabel: "Admin Email",
    emailIcon: Shield,
    badgeClass: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  "org-admin": {
    label: "Organization Admin",
    emailLabel: "Company Email",
    emailIcon: Building2,
    badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  employee: {
    label: "Employee",
    emailLabel: "Email Address",
    emailIcon: Mail,
    badgeClass: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
};

const AVATARS = ["AK", "SR", "MJ", "PL", "TD"];
const TRUST_POINTS = [
  "Enterprise-grade security & compliance",
  "Multi-branch & department management",
  "AI-powered workforce analytics",
];

// ═══════════════════════════════════════════════════════════════════
// MOTION VARIANTS
// ═══════════════════════════════════════════════════════════════════

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

// ═══════════════════════════════════════════════════════════════════
// DECORATIVE COMPONENTS
// ═══════════════════════════════════════════════════════════════════

function GrainOverlay({ isDark }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none mix-blend-overlay ${
        isDark ? "opacity-[0.08]" : "opacity-[0.03]"
      }`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundSize: "200px 200px",
      }}
      aria-hidden="true"
    />
  );
}

function GlowOrb({ className, size, color1, color2 }) {
  return (
    <div
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color1} 0%, ${color2} 70%, transparent 100%)`,
      }}
      aria-hidden="true"
    />
  );
}

function GoogleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 33.1 30.1 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l6-6C34.5 6.5 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.2-4z" />
      <path fill="#34A853" d="M6.3 14.7l7 5.1C15.1 16.1 19.2 13 24 13c3 0 5.8 1.1 7.9 3l6-6C34.5 6.5 29.5 4 24 4 16.3 4 9.7 8.4 6.3 14.7z" />
      <path fill="#FBBC05" d="M24 44c5.2 0 9.9-1.7 13.6-4.7l-6.3-5.2C29.4 35.7 26.8 36 24 36c-6.1 0-11.2-4-13-9.5l-7 5.4C7.5 39.1 15.2 44 24 44z" />
      <path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-.9 2.6-2.7 4.8-5 6.3l6.3 5.2C40.9 36.6 44.5 30.8 44.5 24c0-1.3-.1-2.7-.2-4z" />
    </svg>
  );
}

function LoadingSpinner({ className = "h-4 w-4" }) {
  return (
    <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════
// FLOATING INPUT COMPONENT
// ═══════════════════════════════════════════════════════════════════

function FloatingInput({ id, type = "text", label, value, onChange, icon: Icon, suffix, isDark }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value?.length > 0;

  return (
    <div className="relative group">
      {/* Focus glow ring */}
      <div
        className={`absolute -inset-0.5 rounded-xl transition-all duration-300 pointer-events-none ${
          focused ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: "linear-gradient(135deg, rgba(59,130,246,0.5), rgba(139,92,246,0.5))",
          filter: "blur(4px)",
        }}
      />

      <div
        className={`relative flex items-center rounded-xl border transition-all duration-200 ${
          focused
            ? "border-blue-500/50 bg-blue-500/5"
            : isDark
            ? "border-white/[0.08] bg-white/[0.04] hover:border-white/[0.14]"
            : "border-slate-200 bg-white hover:border-slate-300"
        }`}
      >
        {Icon && (
          <div
            className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
              focused ? "text-blue-400" : isDark ? "text-white/40 group-hover:text-white/60" : "text-slate-400 group-hover:text-slate-500"
            }`}
          >
            <Icon size={16} />
          </div>
        )}

        <label
          htmlFor={id}
          className={`absolute left-11 pointer-events-none transition-all duration-200 select-none ${
            active
              ? "top-2 text-[10px] font-semibold tracking-wider text-blue-400"
              : isDark
              ? "top-1/2 -translate-y-1/2 text-sm text-white/40"
              : "top-1/2 -translate-y-1/2 text-sm text-slate-400"
          }`}
        >
          {label}
        </label>

        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoComplete={id === "password" ? "current-password" : "email"}
          className={`w-full bg-transparent rounded-xl text-sm outline-none pl-11 pr-12 pt-6 pb-2.5 placeholder:text-slate-400 ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        />

        {suffix && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">{suffix}</div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// FEATURE / ROLE CARD
// ═══════════════════════════════════════════════════════════════════

function FeatureCard({ role, index, onSelect, isDark }) {
  const IconComponent = role.icon;

  return (
    <motion.button
      variants={itemVariants}
      whileHover="hover"
      initial="rest"
      whileFocus={{ scale: 1.02 }}
      onClick={() => onSelect(role)}
      className={`group relative w-full text-left overflow-hidden rounded-2xl border p-5 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 ${
        isDark
          ? "border-white/[0.06] bg-white/[0.04] backdrop-blur-sm focus-visible:ring-offset-[#020617]"
          : "border-slate-200 bg-white shadow-sm hover:shadow-md focus-visible:ring-offset-white"
      }`}
      style={{
        boxShadow: isDark ? "0 4px 32px rgba(0,0,0,0.2)" : "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      {/* Hover glow border (dark only) */}
      {isDark && (
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1), rgba(236,72,153,0.05))",
            padding: "1px",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      )}

      {/* Inner highlight (dark only) */}
      {isDark && (
        <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none" />
      )}

      <div className="relative z-10 flex items-start gap-4">
        {/* Icon container */}
        <div className="relative shrink-0">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
            style={{ background: role.gradient }}
          >
            <IconComponent className="w-5 h-5 text-white" />
          </div>
          {isDark && (
            <div
              className="absolute inset-0 rounded-xl blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-300"
              style={{ background: role.gradient }}
              aria-hidden="true"
            />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className={`text-[15px] font-bold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
              {role.title}
            </h3>
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider border ${
              isDark
                ? "bg-white/[0.06] text-white/50 border-white/[0.06]"
                : "bg-slate-100 text-slate-500 border-slate-200"
            }`}>
              {role.tag}
            </span>
          </div>

          <p className={`text-[13px] leading-relaxed mt-1 ${isDark ? "text-white/50" : "text-slate-500"}`}>
            {role.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {role.features.map((f, i) => (
              <span
                key={i}
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium ${
                  isDark
                    ? "bg-white/[0.06] text-white/60"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                <CheckCircle className="w-2.5 h-2.5 text-emerald-400/80" />
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* CTA arrow */}
        <div className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center group-hover:translate-x-0.5 transition-all duration-200 ${
          isDark
            ? "bg-white/[0.06] group-hover:bg-white/[0.10]"
            : "bg-slate-100 group-hover:bg-slate-200"
        }`}>
          <ArrowRight className={`w-4 h-4 transition-colors duration-200 ${
            isDark
              ? "text-white/40 group-hover:text-white/80"
              : "text-slate-400 group-hover:text-slate-600"
          }`} />
        </div>
      </div>
    </motion.button>
  );
}

// ═══════════════════════════════════════════════════════════════════
// LOGIN FORM
// ═══════════════════════════════════════════════════════════════════

function LoginForm({ role, onBack, navigate, isDark }) {
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const details = ROLE_LOGIN_DETAILS[role.id];
  const IconComponent = details?.emailIcon || Mail;

  useEffect(() => {
    setForm((prev) => ({ ...prev, email: role.emailPlaceholder || "" }));
  }, [role.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    navigate(role.redirectAfterLogin);
  };

  const set = (key) => (e) =>
    setForm((prev) => ({
      ...prev,
      [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  return (
    <motion.div
      key={role.id}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      {/* Back + Badge */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={onBack}
          className={`p-2 rounded-xl transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 ${
            isDark
              ? "hover:bg-white/[0.06] text-white/40 hover:text-white/70"
              : "hover:bg-slate-100 text-slate-400 hover:text-slate-600"
          }`}
          aria-label="Back to role selection"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${
            details?.badgeClass || "bg-blue-500/10 text-blue-400 border-blue-500/20"
          }`}
        >
          <IconComponent className="w-3.5 h-3.5" />
          {details?.label || role.title}
        </span>
      </div>

      <div className="mb-8">
        <h2 className={`text-2xl font-bold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
          Welcome back
        </h2>
        <p className={`text-sm mt-1.5 ${isDark ? "text-white/50" : "text-slate-500"}`}>
          Sign in to your {role.title.toLowerCase()} account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FloatingInput
          id="email"
          type="email"
          label={details?.emailLabel || "Email Address"}
          value={form.email}
          onChange={set("email")}
          icon={IconComponent}
          isDark={isDark}
        />

        <FloatingInput
          id="password"
          type={showPassword ? "text" : "password"}
          label="Password"
          value={form.password}
          onChange={set("password")}
          icon={Lock}
          isDark={isDark}
          suffix={
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className={`transition-colors outline-none focus-visible:text-white/70 ${
                isDark ? "text-white/40 hover:text-white/70" : "text-slate-400 hover:text-slate-600"
              }`}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          }
        />

        <div className="flex items-center justify-between pt-0.5">
          <label className={`flex items-center gap-2 text-sm cursor-pointer select-none ${
            isDark ? "text-white/50" : "text-slate-600"
          }`}>
            <input
              type="checkbox"
              checked={form.remember}
              onChange={set("remember")}
              className={`w-4 h-4 rounded cursor-pointer ${
                isDark
                  ? "border-white/[0.12] bg-white/[0.06] text-blue-500 focus:ring-blue-500/30 focus:ring-offset-0"
                  : "border-slate-300 bg-white text-blue-500 focus:ring-blue-500/30"
              }`}
            />
            Remember me
          </label>
          <Link
            to="/forgot-password"
            className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 rounded"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="group relative w-full py-3 rounded-xl font-semibold text-sm text-white overflow-hidden transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#020617]"
          style={{
            background: role.gradient || "linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)",
            boxShadow: loading ? "none" : `0 4px 24px ${role.shadowColor || "rgba(59,130,246,0.25)"}`,
          }}
        >
          <span className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.06] transition-colors duration-200 rounded-xl" />
          <span className="relative flex items-center justify-center gap-2">
            {loading ? (
              <>
                <LoadingSpinner />
                Signing in...
              </>
            ) : (
              <>
                Sign in
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </>
            )}
          </span>
        </button>

        <div className="flex items-center gap-3 py-1">
          <div className={`flex-1 h-px ${isDark ? "bg-white/[0.06]" : "bg-slate-200"}`} />
          <span className={`text-[11px] tracking-widest uppercase ${
            isDark ? "text-white/45" : "text-slate-400"
          }`}>or</span>
          <div className={`flex-1 h-px ${isDark ? "bg-white/[0.06]" : "bg-slate-200"}`} />
        </div>

        <button
          type="button"
          className={`w-full py-3 rounded-xl flex items-center justify-center gap-2.5 text-sm font-medium transition-all duration-200 active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 ${
            isDark
              ? "bg-white/[0.04] border border-white/[0.08] text-white/60 hover:bg-white/[0.08] hover:border-white/[0.14] hover:text-white/80"
              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
          }`}
        >
          <GoogleLogo />
          Continue with Google
        </button>

        <div className="text-center pt-1">
          <button
            type="button"
            onClick={onBack}
            className={`text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 rounded ${
              isDark ? "text-white/40 hover:text-white/70" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            ← Back to role selection
          </button>
        </div>
      </form>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// RIGHT PANEL — ROLE SELECTION VIEW
// ═══════════════════════════════════════════════════════════════════

function RoleSelectionView({ roles, onSelect, isDark }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      className="w-full"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className={`w-4 h-4 ${isDark ? "text-blue-400" : "text-blue-500"}`} />
          <span className={`text-[11px] font-semibold tracking-[0.2em] uppercase ${
            isDark ? "text-blue-400" : "text-blue-600"
          }`}>
            Authentication
          </span>
        </div>
        <h2 className={`text-2xl font-bold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
          Welcome to TalentSphere
        </h2>
        <p className={`text-sm mt-1.5 max-w-sm ${
          isDark ? "text-white/50" : "text-slate-500"
        }`}>
          Choose how you would like to continue. Pick your role to access the appropriate dashboard.
        </p>
      </motion.div>

      <div className="space-y-3">
        {roles.map((role, i) => (
          <FeatureCard key={role.id} role={role} index={i} onSelect={onSelect} isDark={isDark} />
        ))}
      </div>

      <motion.div variants={itemVariants} className={`mt-8 pt-5 border-t ${
        isDark ? "border-white/[0.06]" : "border-slate-200"
      }`}>
        <p className={`text-xs text-center ${
          isDark ? "text-white/40" : "text-slate-400"
        }`}>
          Secured with enterprise-grade authentication •{" "}
          <span className="text-blue-500 dark:text-blue-400 font-medium">SSO & SAML</span> supported
        </p>
      </motion.div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// LEFT PANEL — HERO BRANDING
// ═══════════════════════════════════════════════════════════════════

function HeroPanel({ selectedRole, isDark }) {
  return (
    <div className={`relative w-full lg:w-[45%] shrink-0 min-h-0 flex flex-col overflow-hidden ${
      isDark ? "bg-[#020617]" : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
    }`}>
      {/* Gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? "linear-gradient(160deg, #1E3A8A 0%, #5B21B6 40%, #9D174D 70%, #020617 100%)"
            : "linear-gradient(160deg, #dbeafe 0%, #e9d5ff 35%, #fce7f3 65%, #f8fafc 100%)",
        }}
      />

      {/* Glow orbs - lower opacity in light mode */}
      {isDark ? (
        <>
          <GlowOrb className="-top-32 -left-32" size="500px" color1="rgba(59,130,246,0.12)" color2="transparent" />
          <GlowOrb className="-bottom-40 -right-20" size="400px" color1="rgba(139,92,246,0.10)" color2="transparent" />
          <GlowOrb className="top-1/3 -right-32" size="300px" color1="rgba(236,72,153,0.06)" color2="transparent" />
        </>
      ) : (
        <>
          <GlowOrb className="-top-32 -left-32" size="500px" color1="rgba(59,130,246,0.06)" color2="transparent" />
          <GlowOrb className="-bottom-40 -right-20" size="400px" color1="rgba(139,92,246,0.05)" color2="transparent" />
        </>
      )}

      <GrainOverlay isDark={isDark} />

      {/* Vignette overlay */}
      <div className={`absolute inset-0 pointer-events-none ${
        isDark
          ? "bg-gradient-to-b from-black/30 via-transparent to-black/60"
          : "bg-gradient-to-b from-white/40 via-transparent to-white/60"
      }`} />

      {/* Decorative circles */}
      <div className={`absolute -top-20 -right-20 w-64 h-64 rounded-full border pointer-events-none ${
        isDark ? "border-white/[0.06]" : "border-blue-200/50"
      }`} />
      <div className={`absolute top-20 -right-32 w-80 h-80 rounded-full border pointer-events-none ${
        isDark ? "border-white/[0.04]" : "border-purple-200/40"
      }`} />
      <div className={`absolute -bottom-32 -left-32 w-72 h-72 rounded-full border pointer-events-none ${
        isDark ? "border-white/[0.03]" : "border-pink-200/30"
      }`} />

      {/* Top fade mask */}
      <div className={`absolute top-0 left-0 right-0 h-6 z-10 pointer-events-none bg-gradient-to-b ${
        isDark ? "from-[#020617]" : "from-blue-50"
      } to-transparent`} />

      {/* Content — scrollable */}
      <div className="relative z-10 flex-1 min-h-0 overflow-y-auto overscroll-contain">
        <div className="py-6 px-8 lg:px-10 xl:px-12">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
              </svg>
            </div>
            <span className={`font-bold tracking-tight text-xl ${
              isDark ? "text-white" : "text-slate-900"
            }`}>
              Talent<span className={isDark ? "text-white/50" : "text-slate-400"}>Sphere</span>
            </span>
          </motion.div>

          {/* Middle content */}
          <div className="flex flex-col justify-center gap-6 mt-8">
            {/* Enterprise badge */}
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`self-start inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.15em] uppercase px-3.5 py-1.5 rounded-full border backdrop-blur-sm ${
                isDark
                  ? "bg-white/[0.06] text-white/70 border-white/[0.08]"
                  : "bg-white/60 text-blue-700 border-blue-200 shadow-sm"
              }`}
            >
              <Zap className={`w-3 h-3 ${isDark ? "text-blue-400" : "text-blue-500"}`} />
              Enterprise HRMS Platform
            </motion.span>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={`text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold leading-[1.08] tracking-tight max-w-[14ch] ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              {selectedRole ? (
                <>
                  Welcome,{" "}
                  <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    {selectedRole.title}
                  </span>
                </>
              ) : (
                <>
                  Manage.
                  <br />
                  <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Empower.
                  </span>
                  <br />
                  Grow.
                </>
              )}
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className={`text-sm sm:text-base leading-relaxed max-w-[60ch] ${
                isDark ? "text-white/50" : "text-slate-500"
              }`}
            >
              {selectedRole
                ? `Sign in to access your ${selectedRole.title.toLowerCase()} dashboard and manage your workspace.`
                : "Enterprise-grade HRMS platform for managing your workforce, branches, departments, and teams — all in one place."}
            </motion.p>

            {/* Trust points */}
            <motion.ul
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-3 mt-1"
            >
              {TRUST_POINTS.map((pt) => (
                <li key={pt} className={`flex items-center gap-3 text-sm ${
                  isDark ? "text-white/60" : "text-slate-600"
                }`}>
                  <CheckCircle size={14} className={`shrink-0 ${
                    isDark ? "text-blue-400/60" : "text-blue-500"
                  }`} />
                  {pt}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Bottom: social proof */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mt-8 pt-6"
          >
            {/* Avatar stack */}
            <div className="flex -space-x-2.5">
              {AVATARS.map((initials, i) => (
                <div
                  key={initials}
                  className={`relative w-8 h-8 rounded-full border-2 backdrop-blur-sm flex items-center justify-center text-[10px] font-bold ${
                    isDark
                      ? "bg-gradient-to-br from-blue-500/30 to-purple-500/30 border-white/[0.15] text-white/80"
                      : "bg-white border-white shadow-sm text-slate-600"
                  }`}
                  style={{ zIndex: AVATARS.length - i }}
                >
                  {initials}
                </div>
              ))}
              <div className={`relative w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 border-2 flex items-center justify-center text-[10px] font-bold text-white -ml-2.5 ${
                isDark ? "border-white/[0.15]" : "border-white shadow-sm"
              }`}>
                <div className="absolute inset-0 rounded-full animate-pulse ring-2 ring-blue-400/30" />
                <span className="relative">+</span>
              </div>
            </div>

            <div className="flex flex-col">
              <p className={`text-xs ${isDark ? "text-white/50" : "text-slate-500"}`}>
                <span className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>10,000+</span> companies trust TalentSphere
              </p>
              <p className={`text-[11px] mt-0.5 ${
                isDark ? "text-white/45" : "text-slate-400"
              }`}>4.9 ⭐ average rating</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade mask */}
      <div className={`absolute bottom-0 left-0 right-0 h-6 z-10 pointer-events-none bg-gradient-to-t ${
        isDark ? "from-[#020617]" : "from-blue-50"
      } to-transparent`} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MAIN LOGIN COMPONENT
// ═══════════════════════════════════════════════════════════════════

export default function Login() {
  const navigate = useNavigate();
  const { isDark, toggle: toggleTheme } = useThemeContext();
  const [selectedRole, setSelectedRole] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleRoleSelect = useCallback(
    (role) => {
      if (role.id === "register") {
        navigate(role.redirectPath);
        return;
      }
      setSelectedRole(role);
      setTimeout(() => setShowForm(true), 50);
    },
    [navigate]
  );

  const handleBack = useCallback(() => {
    setShowForm(false);
    setTimeout(() => setSelectedRole(null), 200);
  }, []);

  return (
    <div className={`h-dvh overflow-hidden relative transition-colors duration-300 ${
      isDark ? "bg-[#020617]" : "bg-slate-50"
    }`}>
      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className={`absolute top-5 right-5 z-50 p-2.5 rounded-xl border transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 ${
          isDark
            ? "bg-white/[0.04] border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.12]"
            : "bg-white border-slate-200 hover:bg-slate-100 hover:border-slate-300 shadow-sm"
        }`}
        aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      >
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400" />
        ) : (
          <Moon className="w-4 h-4 text-slate-500" />
        )}
      </button>

      {/* ── Outer container ── */}
      <div className="relative z-10 w-full h-full p-4">
        <div
          className={`h-full max-w-6xl mx-auto rounded-2xl overflow-hidden flex flex-col lg:flex-row border transition-colors duration-300 ${
            isDark ? "border-white/[0.06]" : "border-slate-200"
          }`}
          style={{
            boxShadow: isDark
              ? "0 32px 80px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.04), 0 0 64px rgba(59,130,246,0.03)"
              : "0 32px 80px rgba(0,0,0,0.08), 0 0 0 0.5px rgba(0,0,0,0.02)",
          }}
        >
          {/* Left — Hero Panel */}
          <HeroPanel selectedRole={selectedRole} isDark={isDark} />

          {/* Right — Content Panel */}
          <div className={`flex-1 min-h-0 flex flex-col relative transition-colors duration-300 ${
            isDark ? "bg-[#0B1220]" : "bg-white"
          }`}>
            {/* Ambient glow (dark only) */}
            {isDark && (
              <GlowOrb className="-top-40 -right-40" size="400px" color1="rgba(139,92,246,0.04)" color2="transparent" />
            )}

            {/* Top fade mask */}
            <div className={`absolute top-0 left-0 right-0 h-6 z-10 pointer-events-none bg-gradient-to-b ${
              isDark ? "from-[#0B1220]" : "from-white"
            } to-transparent`} />

            {/* Scrollable content area */}
            <div className="flex-1 min-h-0 overflow-y-auto py-6 px-6 lg:px-10 xl:px-12 overscroll-contain">
              <div className="flex items-center justify-center min-h-full">
                <div className="relative z-10 w-full max-w-sm">
                  <AnimatePresence mode="wait">
                    {!showForm || !selectedRole ? (
                      <RoleSelectionView key="role-selection" roles={ROLES} onSelect={handleRoleSelect} isDark={isDark} />
                    ) : (
                      <LoginForm
                        key={`login-${selectedRole.id}`}
                        role={selectedRole}
                        onBack={handleBack}
                        navigate={navigate}
                        isDark={isDark}
                      />
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Bottom fade mask */}
            <div className={`absolute bottom-0 left-0 right-0 h-6 z-10 pointer-events-none bg-gradient-to-t ${
              isDark ? "from-[#0B1220]" : "from-white"
            } to-transparent`} />
          </div>
        </div>
      </div>
    </div>
  );
}
