import { useState, useMemo, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Building2, Users, MapPin, Clock,
  CheckCircle, ChevronRight, UserPlus, Plus, ArrowRight,
  Sparkles, Target, Activity, ArrowUpRight, Layers, LayoutGrid,
  Briefcase, Play, Settings, Bell, Zap, Shield,
  RefreshCw,
  ChevronLeft, CheckSquare, Star
} from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────────────────
   MOCK DATA
────────────────────────────────────────────────────────────────────────────── */
const ORG = {
  name: 'Acme Corp',
  adminName: 'Narendra',
  logo: null,
  employeeCount: 843,
  activeBranches: 0,
  departments: 0,
  activeTeams: 0,
  healthScore: 65,
  completionPct: 65,
  profileCompletion: 100,
  branchSetup: 88,
  departmentSetup: 92,
  teamSetup: 85,
  industry: 'Technology & Software',
  country: 'United States',
  timezone: 'Eastern Time (UTC-5)',
  size: '501\u20131,000 employees',
  founded: 2020,
}

const SETUP_ITEMS = [
  { id: 'org', label: 'Organization Created', done: true, route: '/organization/profile', icon: Building2 },
  { id: 'profile', label: 'Profile Completed', done: true, route: '/organization/profile', icon: Shield },
  { id: 'branch', label: 'Create First Branch', done: false, route: '/organization/branches', icon: Building2 },
  { id: 'dept', label: 'Create Department', done: false, route: '/organization/departments', icon: Layers },
  { id: 'team', label: 'Create Team', done: false, route: '/organization/teams', icon: Users },
  { id: 'employees', label: 'Invite Employees', done: false, route: '/organization/teams', icon: UserPlus },
]

const HEALTH_METRICS = [
  { label: 'Profile Completeness', value: ORG.profileCompletion, color: '#2563EB', icon: Shield },
  { label: 'Branch Configuration', value: ORG.branchSetup, color: '#7C3AED', icon: Building2 },
  { label: 'Department Structure', value: ORG.departmentSetup, color: '#10B981', icon: Layers },
  { label: 'Team Structure', value: ORG.teamSetup, color: '#F59E0B', icon: Users },
]

const RECENT_ACTIVITY = [
  { id: 'a1', user: 'Jane Smith', action: 'updated organization profile', target: 'Company timezone', time: '2 hours ago', initials: 'JS', color: 'from-blue-500 to-indigo-500' },
  { id: 'a2', user: 'David Williams', action: 'added a new branch', target: 'London Office', time: '1 day ago', initials: 'DW', color: 'from-emerald-500 to-teal-500' },
  { id: 'a3', user: 'Sarah Chen', action: 'created a new department', target: 'Engineering', time: '3 days ago', initials: 'SC', color: 'from-violet-500 to-purple-500' },
  { id: 'a4', user: 'System', action: 'completed onboarding step', target: 'Profile Setup', time: '5 days ago', initials: 'SY', color: 'from-amber-500 to-orange-500' },
]

const QUICK_ACTIONS = [
  { label: 'Add Branch', icon: Building2, route: '/organization/branches', gradient: 'from-blue-600 to-blue-400', desc: 'Register a new office location', shortcut: 'B' },
  { label: 'Add Department', icon: Layers, route: '/organization/departments', gradient: 'from-violet-600 to-purple-400', desc: 'Create a new department', shortcut: 'D' },
  { label: 'Create Team', icon: Users, route: '/organization/teams', gradient: 'from-emerald-600 to-teal-400', desc: 'Assemble a new team', shortcut: 'T' },
  { label: 'Invite Employee', icon: UserPlus, route: '/organization/teams', gradient: 'from-amber-600 to-orange-400', desc: 'Onboard new members', shortcut: 'I' },
]

const RECOMMENDATIONS = [
  {
    icon: Building2, label: 'Create your first branch',
    desc: 'You haven\'t created any branches yet. Branches help you organize employees by location.',
    action: 'Create Branch',
    route: '/organization/branches',
    gradient: 'from-blue-500/10 to-blue-500/5',
    iconGrad: 'from-blue-600 to-blue-400',
    color: '#2563EB',
    priority: 'High',
  },
  {
    icon: Layers, label: 'Set up departments',
    desc: 'Departments help structure your organization by function \u2014 Engineering, Marketing, Sales, and more.',
    action: 'Create Department',
    route: '/organization/departments',
    gradient: 'from-violet-500/10 to-violet-500/5',
    iconGrad: 'from-violet-600 to-purple-400',
    color: '#7C3AED',
    priority: 'High',
  },
  {
    icon: Users, label: 'Build your teams',
    desc: 'Teams are where work happens. Create teams within departments and assign members.',
    action: 'Create Team',
    route: '/organization/teams',
    gradient: 'from-emerald-500/10 to-emerald-500/5',
    iconGrad: 'from-emerald-600 to-teal-400',
    color: '#10B981',
    priority: 'Medium',
  },
]

/* ─────────────────────────────────────────────────────────────────────────────
   ANIMATED COUNTER
────────────────────────────────────────────────────────────────────────────── */
function AnimatedCounter({ value, suffix = '', duration = 1.5 }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const increment = value / (duration * 60)
    const timer = setInterval(() => {
      start += increment
      if (start >= value) {
        setDisplay(value)
        clearInterval(timer)
      } else {
        setDisplay(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, value, duration])

  return <span ref={ref}>{display.toLocaleString()}{suffix}</span>
}

/* ─────────────────────────────────────────────────────────────────────────────
   SHARED COMPONENTS
────────────────────────────────────────────────────────────────────────────── */

function Section({ title, subtitle, icon: Icon, children, className = '', badge }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/20 dark:border-slate-700/40
        shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]
        rounded-[24px] p-6 sm:p-8 ${className}`}
      style={{ boxShadow: '0 0 0 0.5px rgba(255,255,255,0.08) inset' }}
    >
      {title && (
        <div className="flex items-start gap-3 mb-6 sm:mb-7">
          {Icon && (
            <div className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-[#2563EB]/10 to-[#7C3AED]/10
              flex items-center justify-center shrink-0 ring-1 ring-[#2563EB]/10">
              <Icon className="w-5 h-5 text-[#2563EB]" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">{title}</h2>
              {badge && (
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full
                  bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20 shrink-0">{badge}</span>
              )}
            </div>
            {subtitle && <p className="text-sm text-slate-400 mt-0.5">{subtitle}</p>}
          </div>
        </div>
      )}
      {children}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   PREMIUM EMPTY STATE WITH SVG ILLUSTRATION
────────────────────────────────────────────────────────────────────────────── */
function PremiumEmptyState({ icon: Icon, title, desc, actionLabel, actionRoute, color = '#2563EB' }) {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center justify-center py-12 text-center px-4"
    >
      {/* SVG illustration-like icon container */}
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-[22px] flex items-center justify-center relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${color}12, ${color}06)`,
            boxShadow: `0 0 0 1px ${color}20 inset, 0 0 0 2px ${color}08`,
          }}
        >
          <Icon className="w-9 h-9 relative z-10" style={{ color }} />
          {/* Decorative dots */}
          <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full" style={{ backgroundColor: `${color}20` }} />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full" style={{ backgroundColor: `${color}15` }} />
        </div>
        {/* Ring decoration */}
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full border-2 opacity-30" style={{ borderColor: color, borderStyle: 'dashed' }} />
      </div>

      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-1.5">{title}</h3>
      <p className="text-sm text-slate-400 max-w-xs mb-6 leading-relaxed">{desc}</p>

      {actionLabel && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate(actionRoute)}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white
            rounded-xl transition-all duration-200 shadow-lg active:scale-95"
          style={{
            background: `linear-gradient(135deg, ${color}, ${color}dd)`,
            boxShadow: `0 4px 16px ${color}30`,
          }}
        >
          <Plus className="w-4 h-4" /> {actionLabel}
        </motion.button>
      )}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION 1 \u2014 WELCOME HERO (PREMIUM)
────────────────────────────────────────────────────────────────────────────── */
function WelcomeHero({ org }) {
  const navigate = useNavigate()
  const circumference = 2 * Math.PI * 48
  const offset = circumference - (org.completionPct / 100) * circumference

  return (
    <div className="relative overflow-hidden rounded-[24px] mb-6 sm:mb-8 group">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'linear-gradient(135deg, #1E3A8A, #2563EB, #7C3AED)',
            'linear-gradient(135deg, #1E40AF, #3B82F6, #8B5CF6)',
            'linear-gradient(135deg, #1E3A8A, #2563EB, #7C3AED)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Background patterns */}
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 0%, transparent 50%),
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 100% 100%, 40px 40px, 40px 40px',
        }}
      />
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#7C3AED]/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

      <div className="relative z-10 p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
          {/* Left: Text */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <motion.div
                whileHover={{ scale: 1.05, rotate: -3 }}
                className="w-14 h-14 rounded-[18px] bg-white/20 backdrop-blur-md border border-white/20
                  flex items-center justify-center shadow-lg"
              >
                <Building2 className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight"
                >
                  Welcome back, {org.adminName}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-white/70 text-sm mt-0.5"
                >
                  {org.name} \u00B7 {org.industry}
                </motion.p>
              </div>
            </div>

            {/* Badge row */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="flex flex-wrap items-center gap-2 mb-4"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest
                rounded-full bg-white/15 text-white/90 backdrop-blur-sm border border-white/20">
                <Briefcase className="w-3 h-3" /> {org.size}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest
                rounded-full bg-white/15 text-white/90 backdrop-blur-sm border border-white/20">
                <MapPin className="w-3 h-3" /> {org.country}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest
                rounded-full bg-white/15 text-white/90 backdrop-blur-sm border border-white/20">
                <Clock className="w-3 h-3" /> {org.timezone.split(' ')[0]}
              </span>
            </motion.div>

            {/* CTA */}
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/organization/profile')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white
                bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl transition-all duration-200
                border border-white/20 active:scale-95"
            >
              <Settings className="w-4 h-4" /> Configure Workspace
            </motion.button>
          </div>

          {/* Right: Progress Ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 15 }}
            className="flex flex-col items-center shrink-0"
          >
            <div className="relative w-32 h-32 sm:w-36 sm:h-36">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-[#2563EB]/20 blur-xl opacity-50 animate-pulse" />
              <svg className="w-full h-full -rotate-90 relative z-10" viewBox="0 0 108 108">
                <circle cx="54" cy="54" r="48" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="6" />
                <motion.circle
                  cx="54" cy="54" r="48" fill="none"
                  stroke="url(#heroGradientPremium)"
                  strokeWidth="6" strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  className="drop-shadow-[0_0_8px_rgba(96,165,250,0.3)]"
                  style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
                />
                <defs>
                  <linearGradient id="heroGradientPremium" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#60A5FA" />
                    <stop offset="100%" stopColor="#C084FC" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                <span className="text-3xl sm:text-4xl font-bold text-white drop-shadow-sm">{org.completionPct}%</span>
                <span className="text-[10px] font-semibold text-white/70 uppercase tracking-widest mt-0.5">Setup</span>
              </div>
            </div>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={() => document.getElementById('setup-checklist')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-3 text-xs font-medium text-white/80 hover:text-white transition-colors flex items-center gap-1"
            >
              Continue Setup <ChevronRight className="w-3 h-3" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION 2 \u2014 SETUP CHECKLIST (INTERACTIVE)
────────────────────────────────────────────────────────────────────────────── */
function SetupChecklist({ items }) {
  const navigate = useNavigate()
  const done = items.filter((i) => i.done).length
  const progress = Math.round((done / items.length) * 100)

  return (
    <Section
      title="Setup Checklist"
      subtitle={`${done} of ${items.length} tasks complete`}
      icon={CheckSquare}
      badge={`${progress}%`}
    >
      {/* Compact progress bar */}
      <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-4">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #10B981, #34D399)',
          }}
        />
      </div>

      <div className="space-y-1">
        {items.map((item, i) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.03 * i, duration: 0.3 }}
            whileHover={!item.done ? { x: 4, backgroundColor: 'rgba(37,99,235,0.03)' } : {}}
            whileTap={{ scale: 0.99 }}
            onClick={() => navigate(item.route)}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl
              transition-all duration-200 group text-left relative overflow-hidden"
          >
            {/* Hover background */}
            <div className="absolute inset-0 bg-slate-50 dark:bg-slate-800/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />

            {/* Status indicator */}
            <div className={`relative w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300
              ${item.done
                ? 'bg-gradient-to-br from-emerald-400 to-emerald-500 shadow-sm shadow-emerald-500/20'
                : 'bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-600 group-hover:border-[#2563EB]/40'
              }`}>
              {item.done ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <CheckCircle className="w-4 h-4 text-white" />
                </motion.div>
              ) : (
                <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-[#2563EB]/40 transition-colors" />
              )}
            </div>

            {/* Label */}
            <div className="flex-1 min-w-0 relative">
              <p className={`text-sm font-medium transition-colors duration-200 ${
                item.done
                  ? 'text-slate-400 line-through'
                  : 'text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white'
              }`}>
                {item.label}
              </p>
            </div>

            {/* Arrow */}
            <ChevronRight className={`relative w-4 h-4 transition-all duration-200 ${
              item.done
                ? 'text-emerald-400'
                : 'text-slate-300 group-hover:text-[#2563EB] group-hover:translate-x-0.5'
            }`} />
          </motion.button>
        ))}
      </div>
    </Section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION 3 \u2014 ORGANIZATION SNAPSHOT (KPI CARDS WITH COUNTERS)
────────────────────────────────────────────────────────────────────────────── */
function OrgSnapshot({ org }) {
  const metrics = useMemo(() => [
    { icon: Users, label: 'Total Employees', value: org.employeeCount, growth: 12.5, color: '#2563EB', bg: 'from-blue-500/20 to-blue-500/5' },
    { icon: Building2, label: 'Branches', value: org.activeBranches, growth: 8.3, color: '#7C3AED', bg: 'from-violet-500/20 to-violet-500/5' },
    { icon: Layers, label: 'Departments', value: org.departments, growth: 4.2, color: '#10B981', bg: 'from-emerald-500/20 to-emerald-500/5' },
    { icon: LayoutGrid, label: 'Active Teams', value: org.activeTeams, growth: 15.7, color: '#F59E0B', bg: 'from-amber-500/20 to-amber-500/5' },
  ], [org])

  return (
    <Section title="Organization Snapshot" subtitle="Key metrics at a glance" icon={Activity}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 * i, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="group relative bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl
              border border-white/20 dark:border-slate-700/40 rounded-[20px] p-5
              transition-all duration-300 cursor-default overflow-hidden"
            style={{ boxShadow: '0 0 0 0.5px rgba(255,255,255,0.08) inset' }}
          >
            {/* Glow effect */}
            <motion.div
              className={`absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br ${m.bg}
                rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-white/50 to-white/10 dark:from-slate-800/50 dark:to-slate-800/10
                  flex items-center justify-center ring-1 ring-[#2563EB]/10">
                  <m.icon className="w-5 h-5" style={{ color: m.color }} />
                </div>
                <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold px-2 py-0.5 rounded-full
                  bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <ArrowUpRight className="w-2.5 h-2.5" /> {m.growth}%
                </span>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                <AnimatedCounter value={m.value} />
              </p>
              <p className="text-xs text-slate-400 mt-1 font-medium">{m.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION 4 \u2014 QUICK ACTIONS
────────────────────────────────────────────────────────────────────────────── */
function QuickActions({ actions }) {
  const navigate = useNavigate()
  return (
    <Section title="Quick Actions" subtitle="Common tasks" icon={Zap}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {actions.map((action, i) => (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 * i, duration: 0.3 }}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(action.route)}
            className="group relative flex flex-col items-start gap-3 p-5 rounded-[20px] text-left
              bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl
              border border-white/20 dark:border-slate-700/40 transition-all duration-300
              hover:shadow-xl hover:shadow-[#2563EB]/5 cursor-pointer overflow-hidden"
            style={{ boxShadow: '0 0 0 0.5px rgba(255,255,255,0.08) inset' }}
          >
            {/* Icon */}
            <div className={`w-11 h-11 rounded-[14px] bg-gradient-to-br ${action.gradient}
              flex items-center justify-center shadow-lg transition-all duration-300
              group-hover:scale-110 group-hover:rotate-[-4deg]`}>
              <action.icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{action.label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{action.desc}</p>
            </div>
            {/* Keyboard shortcut hint */}
            <div className="absolute right-3 top-3 px-1.5 py-0.5 text-[10px] font-mono font-bold
              bg-slate-100 dark:bg-slate-800 text-slate-400 rounded border border-slate-200 dark:border-slate-700
              opacity-0 group-hover:opacity-100 transition-opacity">
              {action.shortcut}
            </div>
            <ChevronRight className="absolute right-4 bottom-4 w-4 h-4 text-slate-300
              group-hover:text-[#2563EB] group-hover:translate-x-0.5 transition-all duration-200 opacity-0 group-hover:opacity-100" />
          </motion.button>
        ))}
      </div>
    </Section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION 5 \u2014 RECENT ACTIVITY (TIMELINE)
────────────────────────────────────────────────────────────────────────────── */
function RecentActivity({ items }) {
  const [expanded, setExpanded] = useState(false)
  const displayItems = expanded ? items : items.slice(0, 3)

  return (
    <Section title="Recent Activity" subtitle="Latest changes" icon={Bell}>
      {items.length === 0 ? (
        <div className="flex flex-col items-center py-8 text-center">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3">
            <Bell className="w-5 h-5 text-slate-400" />
          </div>
          <p className="text-sm text-slate-400">No recent activity</p>
          <p className="text-xs text-slate-400 mt-1">Changes will appear here</p>
        </div>
      ) : (
        <>
          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[17px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-[#2563EB]/30 via-[#7C3AED]/20 to-transparent" />

            <div className="space-y-0 relative">
              {displayItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.04 * i, duration: 0.25 }}
                  className="relative flex items-start gap-3 py-3.5 pl-0 first:pt-0 last:pb-0 group"
                >
                  {/* Timeline dot */}
                  <div className="relative z-10 mt-0.5">
                    <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0 shadow-sm`}>
                      <span className="text-[11px] font-bold text-white">{item.initials}</span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 pt-0.5">
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{item.user}</span>
                      {' '}{item.action}{' '}
                      <span className="font-medium text-[#2563EB]">{item.target}</span>
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-400">{item.time}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <RefreshCw className="w-2.5 h-2.5" /> Updated
                      </span>
                    </div>
                  </div>

                  {/* Activity dot indicator */}
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-2
                    group-hover:scale-150 transition-transform duration-200" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* View all toggle */}
          {items.length > 3 && (
            <motion.button
              whileHover={{ x: 2 }}
              onClick={() => setExpanded(!expanded)}
              className="mt-4 w-full inline-flex items-center justify-center gap-1.5 text-sm font-medium
                text-slate-400 hover:text-[#2563EB] transition-colors duration-200 py-2 rounded-xl
                hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              {expanded ? (
                <>Show Less <ChevronLeft className="w-4 h-4" /></>
              ) : (
                <>View All Activity ({items.length}) <ChevronRight className="w-4 h-4" /></>
              )}
            </motion.button>
          )}
        </>
      )}
    </Section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION 6 \u2014 WORKSPACE HEALTH SCORE (PREMIUM)
────────────────────────────────────────────────────────────────────────────── */
function HealthScore({ org, metrics }) {
  const circumference = 2 * Math.PI * 52
  const score = org.healthScore
  const offset = circumference - (score / 100) * circumference

  return (
    <Section title="Workspace Health" subtitle="Configuration completeness" icon={Target}>
      <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
        {/* Circular gauge */}
        <div className="relative w-32 h-32 sm:w-36 sm:h-36 shrink-0">
          {/* Glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#2563EB]/20 to-[#7C3AED]/20 blur-xl" />
          <svg className="w-full h-full -rotate-90 relative z-10" viewBox="0 0 116 116">
            <circle cx="58" cy="58" r="52" fill="none" stroke="rgba(148,163,184,0.12)" strokeWidth="8" />
            <motion.circle
              cx="58" cy="58" r="52" fill="none"
              stroke="url(#healthGradPremium)"
              strokeWidth="8" strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="drop-shadow-[0_0_10px_rgba(37,99,235,0.3)]"
              style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
            />
            <defs>
              <linearGradient id="healthGradPremium" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#7C3AED" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white"
            >
              {score}%
            </motion.span>
            <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest mt-0.5">Health</span>
          </div>
        </div>

        {/* Metrics bars */}
        <div className="flex-1 w-full space-y-4">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <m.icon className="w-3.5 h-3.5" style={{ color: m.color }} />
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{m.label}</span>
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-white">{m.value}%</span>
              </div>
              <div className="relative h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${m.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 + 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ background: `linear-gradient(90deg, ${m.color}, ${m.color}dd)` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION 7 \u2014 RECOMMENDED NEXT ACTIONS
────────────────────────────────────────────────────────────────────────────── */
function Recommendations({ items }) {
  const navigate = useNavigate()
  return (
    <Section title="Recommended Next Actions" subtitle="Smart suggestions to complete your setup" icon={Sparkles}>
      <div className="space-y-3">
        {items.map((rec, i) => (
          <motion.div
            key={rec.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 * i, duration: 0.3 }}
            whileHover={{ y: -2 }}
            className={`flex flex-col sm:flex-row sm:items-center gap-4 p-4 sm:p-5 rounded-[16px]
              bg-gradient-to-br ${rec.gradient} border border-slate-100 dark:border-slate-700/30
              cursor-default transition-shadow hover:shadow-md`}
          >
            <div className={`w-11 h-11 rounded-[14px] bg-gradient-to-br ${rec.iconGrad}
              flex items-center justify-center shadow-sm shrink-0`}>
              <rec.icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{rec.label}</p>
                <span className={`px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded
                  ${rec.priority === 'High'
                    ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                  }`}>
                  {rec.priority}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{rec.desc}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(rec.route)}
              className="group inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-white
                rounded-xl transition-all duration-200 shadow-lg shrink-0 active:scale-95"
              style={{
                background: `linear-gradient(135deg, ${rec.color}, ${rec.color}dd)`,
                boxShadow: `0 4px 16px ${rec.color}30`,
              }}
            >
              {rec.action} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION 8 \u2014 EMPTY STATES (Premium)
────────────────────────────────────────────────────────────────────────────── */
function EmptyStates({ org }) {
  const emptyStates = []
  if (org.activeBranches === 0) {
    emptyStates.push({
      icon: Building2,
      title: 'No branches created yet',
      desc: 'Create your first branch to start organizing your workforce by location.',
      actionLabel: 'Create Branch',
      actionRoute: '/organization/branches',
      color: '#2563EB',
    })
  }
  if (org.departments === 0) {
    emptyStates.push({
      icon: Layers,
      title: 'No departments set up',
      desc: 'Create departments to structure your organization by function \u2014 Engineering, Marketing, Sales, and more.',
      actionLabel: 'Create Department',
      actionRoute: '/organization/departments',
      color: '#7C3AED',
    })
  }
  if (org.activeTeams === 0) {
    emptyStates.push({
      icon: Users,
      title: 'No teams created yet',
      desc: 'Teams are where work gets done. Assemble your first team to start collaborating.',
      actionLabel: 'Create Team',
      actionRoute: '/organization/teams',
      color: '#10B981',
    })
  }
  if (emptyStates.length === 0) return null

  return (
    <Section title="Getting Started" subtitle="Steps to build out your organization" icon={Star} className="mt-6 sm:mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {emptyStates.map((es) => (
          <div
            key={es.title}
            className="rounded-[20px] border border-slate-100 dark:border-slate-700/30 p-5
              bg-gradient-to-br from-white/50 to-transparent dark:from-slate-800/20 dark:to-transparent"
          >
            <PremiumEmptyState {...es} />
          </div>
        ))}
      </div>
    </Section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE LAYOUT
────────────────────────────────────────────────────────────────────────────── */
export default function OrganizationOverviewPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-10">
      {/* Hero */}
      <WelcomeHero org={ORG} />

      {/* Setup Checklist + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="lg:col-span-3" id="setup-checklist">
          <SetupChecklist items={SETUP_ITEMS} />
        </div>
        <div className="lg:col-span-2">
          <RecentActivity items={RECENT_ACTIVITY} />
        </div>
      </div>

      {/* Snapshot */}
      <OrgSnapshot org={ORG} />

      {/* Health Score + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 my-6 sm:my-8">
        <div className="lg:col-span-2">
          <HealthScore org={ORG} metrics={HEALTH_METRICS} />
        </div>
        <div className="lg:col-span-3">
          <QuickActions actions={QUICK_ACTIONS} />
        </div>
      </div>

      {/* Recommendations */}
      <Recommendations items={RECOMMENDATIONS} />

      {/* Empty States */}
      <EmptyStates org={ORG} />
    </div>
  )
}
