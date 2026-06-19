import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, Mail, Lock, CheckCircle } from "lucide-react";

// ── Social proof avatars (initials fallback) ─────────────────────────────────
const AVATARS = ["AK", "SR", "MJ", "PL", "TD"];

const TRUST_POINTS = [
  "Industry-recognised certificates",
  "500+ expert-led courses",
  "Live mentorship sessions",
];

// ── Google SVG Icon ───────────────────────────────────────────────────────────
function GoogleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 33.1 30.1 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l6-6C34.5 6.5 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.2-4z"/>
      <path fill="#34A853" d="M6.3 14.7l7 5.1C15.1 16.1 19.2 13 24 13c3 0 5.8 1.1 7.9 3l6-6C34.5 6.5 29.5 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"/>
      <path fill="#FBBC05" d="M24 44c5.2 0 9.9-1.7 13.6-4.7l-6.3-5.2C29.4 35.7 26.8 36 24 36c-6.1 0-11.2-4-13-9.5l-7 5.4C7.5 39.1 15.2 44 24 44z"/>
      <path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-.9 2.6-2.7 4.8-5 6.3l6.3 5.2C40.9 36.6 44.5 30.8 44.5 24c0-1.3-.1-2.7-.2-4z"/>
    </svg>
  );
}

// ── Animated floating label input ─────────────────────────────────────────────
function FloatingInput({ id, type = "text", label, value, onChange, icon: Icon, suffix }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative group">
      {/* Glow ring — only visible on focus */}
      <div
        className={`
          absolute inset-0 rounded-xl transition-opacity duration-300 pointer-events-none
          ${focused ? "opacity-100" : "opacity-0"}
        `}
        style={{ boxShadow: "0 0 0 3px rgba(99,102,241,0.25)" }}
      />

      {/* Left icon */}
      <div
        className={`
          absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200
          ${focused ? "text-indigo-400" : "text-slate-500"}
        `}
      >
        <Icon size={16} />
      </div>

      {/* Floating label */}
      <label
        htmlFor={id}
        className={`
          absolute left-11 pointer-events-none transition-all duration-200 select-none
          ${active
            ? "top-2.5 text-[10px] font-semibold tracking-wider text-indigo-400"
            : "top-1/2 -translate-y-1/2 text-sm text-slate-500"
          }
        `}
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
        autoComplete={id}
        className={`
          w-full bg-white/5 border rounded-xl text-white text-sm outline-none
          transition-all duration-200
          pl-11 pr-${suffix ? "12" : "4"} pt-6 pb-2.5
          ${focused ? "border-indigo-500/60 bg-white/8" : "border-white/10 hover:border-white/20"}
        `}
      />

      {/* Right slot (eye toggle etc.) */}
      {suffix && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          {suffix}
        </div>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Animated gradient angle
  const [angle, setAngle] = useState(135);
  useEffect(() => {
    let frame;
    let t = 0;
    const tick = () => {
      t += 0.4;
      setAngle(135 + Math.sin((t * Math.PI) / 180) * 25);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    navigate("/dashboard");
  };

  const set = (key) => (e) =>
    setForm((prev) => ({
      ...prev,
      [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  return (
    /*
      VIEWPORT STRATEGY
      ─────────────────
      h-screen + overflow-hidden = entire UI locked to one viewport, no scroll.
      On mobile (< lg) the panel stacks: left collapses to a compact header bar,
      right gets all remaining height.
    */
    <div className="h-screen overflow-hidden bg-[#070711] flex items-center justify-center p-3 sm:p-5 relative">

      {/* Page-level ambient glows */}
      <div className="absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full bg-indigo-600/20 blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[480px] h-[480px] rounded-full bg-purple-600/15 blur-[140px] pointer-events-none" />

      {/* ── Outer card ─────────────────────────────────────────────────────── */}
      <div
        className="
          relative z-10 w-full max-w-5xl
          h-[calc(100vh-40px)] max-h-[720px]
          rounded-2xl overflow-hidden
          flex flex-col lg:flex-row
          border border-white/[0.07]
        "
        style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.06)" }}
      >

        {/* ────────────────────────────────────────────────────────────────── */}
        {/* LEFT — Branding panel                                              */}
        {/* ────────────────────────────────────────────────────────────────── */}
        <div
          className="relative lg:w-[44%] shrink-0 flex flex-col overflow-hidden"
          style={{
            background: `linear-gradient(${angle}deg, #4338CA 0%, #7C3AED 50%, #C026D3 100%)`,
          }}
        >
          {/* Grain texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.18]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
              backgroundSize: "200px 200px",
            }}
          />

          {/* Dark overlay for readability over image */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none" />

          {/* Decorative circles */}
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/5 border border-white/10 pointer-events-none" />
          <div className="absolute top-10 -right-28 w-72 h-72 rounded-full bg-white/5 border border-white/10 pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full p-7 lg:p-8">

            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm border border-white/25 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                </svg>
              </div>
              <span className="text-white font-semibold tracking-tight">TalentSphere</span>
            </div>

            {/* Middle: hero copy */}
            <div className="flex-1 flex flex-col justify-center gap-5 mt-6 lg:mt-0">
              {/* Badge */}
              <span className="self-start text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full bg-white/15 text-white/80 backdrop-blur-sm border border-white/20">
                Premium Learning Platform
              </span>

              <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight">
                Learn. Build. Grow.
              </h1>

              <p className="text-white/70 text-sm lg:text-base leading-relaxed max-w-xs">
                Join 20,000+ professionals accelerating their careers with expert-led courses and live mentorship.
              </p>

              {/* Trust points */}
              <ul className="flex flex-col gap-2.5 mt-1">
                {TRUST_POINTS.map((pt) => (
                  <li key={pt} className="flex items-center gap-2.5 text-sm text-white/80">
                    <CheckCircle size={14} className="text-white/60 shrink-0" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom: social proof */}
            <div className="flex items-center gap-3 mt-auto">
              <div className="flex -space-x-2">
                {AVATARS.map((initials) => (
                  <div
                    key={initials}
                    className="w-7 h-7 rounded-full bg-white/20 border-2 border-white/30 backdrop-blur-sm flex items-center justify-center text-[9px] font-bold text-white"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <p className="text-xs text-white/70">
                <span className="text-white font-semibold">2,400+</span> joined this month
              </p>
            </div>
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────────────── */}
        {/* RIGHT — Form panel                                                 */}
        {/* ────────────────────────────────────────────────────────────────── */}
        <div className="flex-1 bg-[#0E0E1A] flex items-center justify-center p-6 lg:p-10 overflow-y-auto">
          <div className="w-full max-w-sm">

            {/* Heading */}
            <div className="mb-7">
              <h2 className="text-2xl font-bold text-white tracking-tight">Welcome back</h2>
              <p className="text-slate-500 text-sm mt-1">Sign in to your workspace to continue</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">

              <FloatingInput
                id="email"
                type="email"
                label="Email address"
                value={form.email}
                onChange={set("email")}
                icon={Mail}
              />

              <FloatingInput
                id="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                value={form.password}
                onChange={set("password")}
                icon={Lock}
                suffix={
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="text-slate-500 hover:text-slate-300 transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                }
              />

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between pt-0.5">
                <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={form.remember}
                    onChange={set("remember")}
                    className="w-4 h-4 rounded accent-indigo-500 cursor-pointer"
                  />
                  Remember me
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Sign in button */}
              <button
                type="submit"
                disabled={loading}
                className="
                  group relative w-full py-3 rounded-xl
                  font-semibold text-sm text-white overflow-hidden
                  transition-all duration-200
                  hover:scale-[1.02] active:scale-[0.98]
                  disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100
                "
                style={{
                  background: "linear-gradient(135deg, #4F46E5, #7C3AED, #A21CAF)",
                  boxShadow: loading ? "none" : "0 4px 24px rgba(99,102,241,0.4)",
                }}
              >
                {/* Hover shimmer */}
                <span className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-200 rounded-xl" />

                <span className="relative flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Signing in…
                    </>
                  ) : (
                    <>
                      Sign in
                      <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                    </>
                  )}
                </span>
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 py-1">
                <div className="flex-1 h-px bg-white/8" />
                <span className="text-xs text-slate-600 tracking-wider uppercase">or</span>
                <div className="flex-1 h-px bg-white/8" />
              </div>

              {/* Google */}
              <button
                type="button"
                className="
                  w-full py-3 rounded-xl flex items-center justify-center gap-2.5
                  bg-white/[0.04] border border-white/10
                  text-slate-300 text-sm font-medium
                  hover:bg-white/[0.08] hover:border-white/20
                  active:scale-[0.98]
                  transition-all duration-200
                "
              >
                <GoogleLogo />
                Continue with Google
              </button>

              {/* Sign up link */}
              <p className="text-center text-sm text-slate-500 pt-1">
                Don't have an account?{" "}
                <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                  Create one free
                </Link>
              </p>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}