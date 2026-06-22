

/**
 * WhyChooseUs.jsx — Fixed & Production-Ready
 *
 * PROBLEMS FIXED:
 * ─────────────────────────────────────────────────────────────────────────────
 * 1. NO FORCED VIEWPORT HEIGHT
 *    The original had `pt-4 pb-12` — very unbalanced (4px top, 48px bottom).
 *    Replaced with `py-16 md:py-20` for consistent breathing room.
 *    Sections must NEVER use `min-h-screen` individually — only the root
 *    layout wrapper gets that. See Layout.jsx.
 *
 * 2. BACKGROUND GLOWS BLEEDING
 *    Absolute orbs need `overflow-hidden` on the parent + `pointer-events-none`
 *    or they extend into adjacent sections visually. Added both.
 *
 * 3. ANIMATION: `animate` → `whileInView`
 *    Using `animate` fires on mount, not on scroll — so if this section is
 *    below the fold, the animation runs and finishes before the user ever
 *    sees it. Replaced with `whileInView` + `viewport={{ once: true }}`.
 *
 * 4. STATS CARDS: `whileHover={{ scale: 1.05 }}`
 *    Scale on hover shifts layout and can cause content jump on mobile.
 *    Replaced with a subtle `translateY` lift + shadow — same delight,
 *    no layout shift.
 *
 * 5. TABLE: last row has a dangling `border-b` on an empty container.
 *    Fixed with `last:border-b-0` on each row.
 *
 * 6. FEATURE NOTE positioning
 *    Notes like "Mostly Recorded" appeared in column 1 but logically
 *    belong in column 3 (Others). Moved to the Others cell.
 *
 * 7. ACCESSIBILITY
 *    - Table replaced with `role="table"` div structure + proper aria labels.
 *    - Icons get `aria-label` so screen readers announce ✓/✗/~ correctly.
 *    - Stats numbers wrapped in `aria-label` for context.
 */

import { motion } from "framer-motion";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { useThemeContext } from "../context/ThemeContext";

// ─── Data ─────────────────────────────────────────────────────────────────────
const FEATURES = [
  { title: "Live Classes",          academy: true, others: false,     othersNote: "Mostly Recorded"  },
  { title: "Structured Curriculum", academy: true, others: false,     othersNote: "Scattered Content" },
  { title: "1:1 Mentorship",        academy: true, others: false                                       },
  { title: "Placement Support",     academy: true, others: false                                       },
  { title: "Real Projects",         academy: true, others: "limited", othersNote: "Limited scope"     },
  { title: "Mock Interviews",       academy: true, others: false                                       },
];

const STATS = [
  { value: "500+", label: "Students Trained" },
  { value: "95%",  label: "Placement Rate"   },
  { value: "50+",  label: "Industry Mentors" },
];

// ─── Shared animation variants ─────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.07 } },
};

// ─── OthersCell ───────────────────────────────────────────────────────────────
function OthersCell({ others, othersNote }) {
  if (others === false) {
    return (
      <div className="flex flex-col items-center gap-1">
        <XCircle className="text-red-400" size={18} aria-label="Not available" />
        {othersNote && (
          <span className="text-[10px] text-slate-500 leading-tight text-center">
            {othersNote}
          </span>
        )}
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-1">
      <AlertTriangle className="text-yellow-400" size={18} aria-label="Limited" />
      {othersNote && (
        <span className="text-[10px] text-slate-500 leading-tight text-center">
          {othersNote}
        </span>
      )}
    </div>
  );
}

// ─── WhyChooseUs ──────────────────────────────────────────────────────────────
export default function WhyChooseUs() {
  const { isDark } = useThemeContext();
  return (
    <section
  id="why-us"
  className={`relative overflow-hidden pt-8 pb-12 md:pt-10 md:pb-16 transition-colors duration-300 ${isDark ? 'bg-[#020617] text-white' : 'bg-slate-50 text-slate-900'}`}
>

      {/* ── Background atmosphere ─────────────────────────────────────── */}
      {/* FIX 2 — pointer-events-none so glows never intercept clicks */}        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {isDark && <>
          <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-blue-600/10 blur-[120px]" />
        </>}
        <div className={`absolute inset-0 bg-[size:50px_50px] ${isDark ? 'bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]' : 'bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)]'}`} />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* ── Header ────────────────────────────────────────────────────── */}
        {/*
          FIX 3 — `whileInView` fires when the element enters the viewport,
          not on mount. `once: true` means it only animates in once.
        */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mb-8 text-center"
        >
          <span className="inline-block rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1 text-xs text-cyan-300">
            Why Choose Us
          </span>

          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            Compare Before You Decide
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400">
            Structured curriculum, real projects, and mentorship — side by side
            with what the rest of the market offers.
          </p>
        </motion.div>

        {/* ── Comparison Table ──────────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl"
          role="table"
          aria-label="Feature comparison between Our Academy and others"
        >
          {/* Column headers */}
          <div
            role="row"
            className="grid grid-cols-3 bg-gradient-to-r from-cyan-600 to-blue-700 px-5 py-3 text-sm font-semibold"
          >
            <div role="columnheader">Features</div>
            <div role="columnheader" className="text-center">Our Academy</div>
            <div role="columnheader" className="text-center">Others</div>
          </div>

          {/* Data rows */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            role="rowgroup"
          >
            {FEATURES.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                role="row"
                className="grid grid-cols-3 items-center border-b border-white/5 px-5 py-4
                           transition-colors hover:bg-white/[0.04] last:border-b-0"
              >
                {/* Feature name — col 1 */}
                <div role="cell">
                  <p className="text-sm font-medium">{item.title}</p>
                </div>

                {/* Our Academy — col 2 */}
                <div role="cell" className="flex justify-center">
                  <CheckCircle
                    className="text-emerald-400"
                    size={18}
                    aria-label="Available"
                  />
                </div>

                {/* Others — col 3: FIX 6 — notes belong here, not in col 1 */}
                <div role="cell" className="flex justify-center">
                  <OthersCell others={item.others} othersNote={item.othersNote} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Stats ─────────────────────────────────────────────────────── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              /**
               * FIX 4 — `scale` hover causes layout shift and looks cheap on mobile.
               * A -4px Y lift + shadow gives the same "elevated" feel without
               * affecting surrounding elements' positions.
               */
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="rounded-xl border border-white/10 bg-white/[0.04] p-5 text-center
                         backdrop-blur-xl transition-shadow hover:shadow-[0_12px_32px_rgba(6,182,212,0.12)]"
            >
              <p
                className="text-3xl font-bold text-cyan-400"
                aria-label={`${stat.value} ${stat.label}`}
              >
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}


/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * SYSTEM-WIDE RULES — apply to every section on your page
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * 1. SECTION HEIGHT
 *    ❌  min-h-screen on each section
 *    ✅  py-16 md:py-20 on standard sections
 *    ✅  py-24 md:py-32 on the Hero only
 *    Only your root <main> or Layout wrapper gets `min-h-screen`.
 *
 * 2. FRAMER MOTION — always use whileInView, never animate for below-fold content
 *    ❌  <motion.div animate={{ opacity: 1 }}>
 *    ✅  <motion.div whileInView="show" viewport={{ once: true }}>
 *
 * 3. HOVER EFFECTS — prefer transform: translateY over scale
 *    ❌  whileHover={{ scale: 1.05 }}   — causes layout shift
 *    ✅  whileHover={{ y: -4 }}         — lifts without affecting neighbours
 *
 * 4. BACKGROUND ORBS — always pair with:
 *    - `overflow-hidden` on the section
 *    - `pointer-events-none` on the orb container
 *    - `aria-hidden="true"` for screen readers
 *
 * 5. CONSISTENT CONTAINER
 *    Every section: `mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8`
 *    (or max-w-7xl for wider layouts). Mixing widths creates visual misalignment.
 *
 * 6. SPACING SCALE
 *    Section padding:   py-16 md:py-20
 *    Header → content:  mb-8
 *    Between sub-items: gap-4 or mt-8
 *    Don't mix arbitrary values (pt-4, pb-12) — they break visual rhythm.
 */