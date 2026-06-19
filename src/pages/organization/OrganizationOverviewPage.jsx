import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Building2, Users, MapPin, Clock,
  CheckCircle, ChevronRight, UserPlus, Plus, ArrowRight,
  Sparkles, Target, Activity, ArrowUpRight, Layers, LayoutGrid,
  Briefcase, Play, Settings, Bell
} from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────────────────
   MOCK DATA
────────────────────────────────────────────────────────────────────────────── */
const ORG = {
  name: 'Acme Corp',
  adminName: 'Narendra',
  logo: null,
  employeeCount: 843,
  activeBranches: 7,
  departments: 8,
  activeTeams: 24,
  healthScore: 65,
  completionPct: 65,
  profileCompletion: 100,
  branchSetup: 88,
  departmentSetup: 92,
  teamSetup: 85,
  industry: 'Technology & Software',
  country: 'United States',
  timezone: 'Eastern Time (UTC-5)',
  size: '501–1,000 employees',
}

const SETUP_ITEMS = [
  { id: 'org', label: 'Organization Created', done: true, route: '/organization/profile' },
  { id: 'profile', label: 'Profile Completed', done: true, route: '/organization/profile' },
  { id: 'branch', label: 'Create First Branch', done: false, route: '/organization/branches' },
  { id: 'dept', label: 'Create Department', done: false, route: '/organization/departments' },
  { id: 'team', label: 'Create Team', done: false, route: '/organization/teams' },
  { id: 'employees', label: 'Invite Employees', done: false, route: '/organization/teams' },
]

const HEALTH_METRICS = [
  { label: 'Profile Completeness', value: ORG.profileCompletion, color: '#2563EB' },
  { label: 'Branch Configuration', value: ORG.branchSetup, color: '#7C3AED' },
  { label: 'Department Structure', value: ORG.departmentSetup, color: '#10B981' },
  { label: 'Team Structure', value: ORG.teamSetup, color: '#F59E0B' },
]

const RECENT_ACTIVITY = [
  { id: 'a1', user: 'Jane Smith', action: 'updated organization profile', target: 'Company timezone', time: '2 hours ago', initials: 'JS', color: 'from-blue-500 to-indigo-500' },
  { id: 'a2', user: 'David Williams', action: 'added a new branch', target: 'London Office', time: '1 day ago', initials: 'DW', color: 'from-emerald-500 to-teal-500' },
  { id: 'a3', user: 'Sarah Chen', action: 'created a new department', target: 'Engineering', time: '3 days ago', initials: 'SC', color: 'from-violet-500 to-purple-500' },
  { id: 'a4', user: 'System', action: 'completed onboarding step', target: 'Profile Setup', time: '5 days ago', initials: 'SY', color: 'from-amber-500 to-orange-500' },
]

const QUICK_ACTIONS = [
  { label: 'Add Branch', icon: Building2, route: '/organization/branches', gradient: 'from-blue-600 to-blue-400', desc: 'Register a new office location' },
  { label: 'Add Department', icon: Layers, route: '/organization/departments', gradient: 'from-violet-600 to-purple-400', desc: 'Create a new department' },
  { label: 'Create Team', icon: Users, route: '/organization/teams', gradient: 'from-emerald-600 to-teal-400', desc: 'Assemble a new team' },
  { label: 'Invite Employee', icon: UserPlus, route: '/organization/teams', gradient: 'from-amber-600 to-orange-400', desc: 'Onboard new members' },
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
  },
  {
    icon: Layers, label: 'Set up departments',
    desc: 'Departments help structure your organization by function — Engineering, Marketing, Sales, and more.',
    action: 'Create Department',
    route: '/organization/departments',
    gradient: 'from-violet-500/10 to-violet-500/5',
    iconGrad: 'from-violet-600 to-purple-400',
    color: '#7C3AED',
  },
  {
    icon: Users, label: 'Build your teams',
    desc: 'Teams are where work happens. Create teams within departments and assign members.',
    action: 'Create Team',
    route: '/organization/teams',
    gradient: 'from-emerald-500/10 to-emerald-500/5',
    iconGrad: 'from-emerald-600 to-teal-400',
    color: '#10B981',
  },
]

/* ─────────────────────────────────────────────────────────────────────────────
   SHARED COMPONENTS
────────────────────────────────────────────────────────────────────────────── */

function Section({ title, subtitle, icon: Icon, children, className = '', badge }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
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
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">{title}</h2>
              {badge && (
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full
                  bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20">{badge}</span>
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

function EmptyState({ icon: Icon, title, desc, actionLabel, actionRoute, color }) {
  const navigate = useNavigate()
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-10 text-center"
    >
      <div className={`w-16 h-16 rounded-[18px] bg-gradient-to-br ${color || 'from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700'}
        flex items-center justify-center mb-4 ring-1 ring-white/10`}>
        {Icon && <Icon className="w-7 h-7 text-slate-400" />}
      </div>
      <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-1">{title}</h3>
      <p className="text-sm text-slate-400 max-w-xs mb-5">{desc}</p>
      {actionLabel && (
        <button
          onClick={() => navigate(actionRoute)}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white
            bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:brightness-110
            rounded-xl transition-all duration-200 shadow-lg shadow-[#2563EB]/20 active:scale-95"
        >
          <Plus className="w-4 h-4" /> {actionLabel}
        </button>
      )}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION 1 — WELCOME HERO
────────────────────────────────────────────────────────────────────────────── */
function WelcomeHero({ org }) {
  const navigate = useNavigate()
  const circumference = 2 * Math.PI * 44
  const offset = circumference - (org.completionPct / 100) * circumference

  return (
    <div className="relative overflow-hidden rounded-[24px] mb-6 sm:mb-8">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A] via-[#2563EB]/90 to-[#7C3AED]/80" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#7C3AED]/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

      <div className="relative z-10 p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
          {/* Left: Text */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-[16px] bg-white/20 backdrop-blur-md border border-white/20
                flex items-center justify-center shadow-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
                  Welcome back, {org.adminName}
                </h1>
                <p className="text-white/70 text-sm mt-0.5">{org.name}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-0 lg:mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest
                rounded-full bg-white/15 text-white/90 backdrop-blur-sm border border-white/20">
                <Briefcase className="w-3 h-3" /> {org.industry}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest
                rounded-full bg-white/15 text-white/90 backdrop-blur-sm border border-white/20">
                <Users className="w-3 h-3" /> {org.size}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest
                rounded-full bg-white/15 text-white/90 backdrop-blur-sm border border-white/20">
                <MapPin className="w-3 h-3" /> {org.country}
              </span>
            </div>

            <button
              onClick={() => navigate('/organization/settings')}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white
                bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl transition-all duration-200
                border border-white/20 active:scale-95 mt-3"
            >
              <Settings className="w-4 h-4" /> Configure Workspace
            </button>
          </div>

          {/* Right: Progress Ring */}
          <div className="flex flex-col items-center shrink-0">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="6" />
                <circle cx="50" cy="50" r="44" fill="none" stroke="url(#heroGradient)"
                  strokeWidth="6" strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#60A5FA" />
                    <stop offset="100%" stopColor="#A78BFA" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl sm:text-3xl font-bold text-white">{org.completionPct}%</span>
                <span className="text-[10px] font-medium text-white/70 uppercase tracking-wider mt-0.5">Setup</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/organization/settings')}
              className="mt-3 text-xs font-medium text-white/80 hover:text-white transition-colors flex items-center gap-1"
            >
              Continue Setup <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION 2 — SETUP CHECKLIST
────────────────────────────────────────────────────────────────────────────── */
function SetupChecklist({ items }) {
  const navigate = useNavigate()
  const done = items.filter((i) => i.done).length
  return (
    <Section title="Setup Checklist" subtitle={`${done} of ${items.length} tasks complete`} icon={Target}
      badge={`${Math.round((done / items.length) * 100)}%`}>
      <div className="space-y-1">
        {items.map((item, i) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.04 * i, duration: 0.3 }}
            onClick={() => navigate(item.route)}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl
              hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-200
              group text-left"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all
              ${item.done
                ? 'bg-gradient-to-br from-emerald-400 to-emerald-500 shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-600'
              }`}>
              {item.done
                ? <CheckCircle className="w-4 h-4 text-white" />
                : <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" />
              }
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${item.done ? 'text-slate-400 line-through' : 'text-slate-700 dark:text-slate-300'}`}>
                {item.label}
              </p>
            </div>
            <ChevronRight className={`w-4 h-4 transition-all duration-200
              ${item.done ? 'text-emerald-400' : 'text-slate-300 group-hover:text-[#2563EB] group-hover:translate-x-0.5'}`} />
          </motion.button>
        ))}
      </div>
    </Section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION 3 — ORGANIZATION SNAPSHOT (KPI CARDS)
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
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.04 * i, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -3, scale: 1.02 }}
            className="group relative bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl
              border border-white/20 dark:border-slate-700/40 rounded-[20px] p-5
              transition-all duration-300 cursor-default overflow-hidden"
            style={{ boxShadow: '0 0 0 0.5px rgba(255,255,255,0.08) inset' }}
          >
            <div className={`absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br ${m.bg}
              rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-white/50 to-white/10 dark:from-slate-800/50 dark:to-slate-800/10
                  flex items-center justify-center ring-1 ring-[#2563EB]/10">
                  <m.icon className="w-4.5 h-4.5" style={{ color: m.color }} />
                </div>
                <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold px-2 py-0.5 rounded-full
                  bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <ArrowUpRight className="w-2.5 h-2.5" /> {m.growth}%
                </span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                {m.value.toLocaleString()}
              </p>
              <p className="text-xs text-slate-400 mt-0.5 font-medium">{m.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION 4 — QUICK ACTIONS
────────────────────────────────────────────────────────────────────────────── */
function QuickActions({ actions }) {
  const navigate = useNavigate()
  return (
    <Section title="Quick Actions" subtitle="Common tasks" icon={Play}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {actions.map((action, i) => (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 * i, duration: 0.3 }}
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(action.route)}
            className="group relative flex flex-col items-start gap-3 p-5 rounded-[20px] text-left
              bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl
              border border-white/20 dark:border-slate-700/40 transition-all duration-300
              hover:shadow-xl hover:shadow-[#2563EB]/5 cursor-pointer"
            style={{ boxShadow: '0 0 0 0.5px rgba(255,255,255,0.08) inset' }}
          >
            <div className={`w-11 h-11 rounded-[14px] bg-gradient-to-br ${action.gradient}
              flex items-center justify-center shadow-lg transition-transform duration-300
              group-hover:scale-110 group-hover:rotate-[-4deg]`}>
              <action.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{action.label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{action.desc}</p>
            </div>
            <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300
              group-hover:text-[#2563EB] group-hover:translate-x-0.5 transition-all duration-200 opacity-0 group-hover:opacity-100" />
          </motion.button>
        ))}
      </div>
    </Section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION 5 — RECENT ACTIVITY
────────────────────────────────────────────────────────────────────────────── */
function RecentActivity({ items }) {
  return (
    <Section title="Recent Activity" subtitle="Latest changes" icon={Bell}>
      {items.length === 0 ? (
        <p className="text-sm text-slate-400 text-center py-6">No recent activity</p>
      ) : (
        <div className="divide-y divide-slate-100 dark:divide-slate-700/30">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.04 * i, duration: 0.25 }}
              className="flex items-start gap-3 py-3.5 first:pt-0 last:pb-0 group"
            >
              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0 shadow-sm mt-0.5`}>
                <span className="text-[10px] font-bold text-white">{item.initials}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{item.user}</span>
                  {' '}{item.action}{' '}
                  <span className="font-medium text-[#2563EB]">{item.target}</span>
                </p>
                <p className="text-xs text-slate-400 mt-0.5">{item.time}</p>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-2
                group-hover:scale-125 transition-transform duration-200" />
            </motion.div>
          ))}
        </div>
      )}
    </Section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION 6 — WORKSPACE HEALTH SCORE
────────────────────────────────────────────────────────────────────────────── */
function HealthScore({ org, metrics }) {
  const score = org.healthScore
  const circumference = 2 * Math.PI * 44
  const offset = circumference - (score / 100) * circumference

  return (
    <Section title="Workspace Health" subtitle="Configuration completeness" icon={Target}>
      <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
        {/* Circular gauge */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(148,163,184,0.15)" strokeWidth="6" />
            <circle cx="50" cy="50" r="44" fill="none" stroke="url(#healthGrad)"
              strokeWidth="6" strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="healthGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#7C3AED" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{score}%</span>
            <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">Health</span>
          </div>
        </div>

        {/* Metrics bars */}
        <div className="flex-1 w-full space-y-4">
          {metrics.map((m) => (
            <div key={m.label}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{m.label}</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white">{m.value}%</span>
              </div>
              <div className="relative h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${m.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ background: `linear-gradient(90deg, ${m.color}, ${m.color}dd)` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION 7 — RECOMMENDED NEXT ACTIONS
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
            className={`flex flex-col sm:flex-row sm:items-center gap-4 p-4 sm:p-5 rounded-[16px]
              bg-gradient-to-br ${rec.gradient} border border-slate-100 dark:border-slate-700/30`}
          >
            <div className={`w-10 h-10 rounded-[12px] bg-gradient-to-br ${rec.iconGrad}
              flex items-center justify-center shadow-sm shrink-0`}>
              <rec.icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{rec.label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{rec.desc}</p>
            </div>
            <button
              onClick={() => navigate(rec.route)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white
                bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:brightness-110
                rounded-xl transition-all duration-200 shadow-lg shadow-[#2563EB]/20 shrink-0
                active:scale-95"
            >
              {rec.action} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION 8 — EMPTY STATES (shown only when entities have no data)
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
      color: 'from-blue-50 to-blue-100 dark:from-blue-500/10 dark:to-blue-500/5',
    })
  }
  if (org.departments === 0) {
    emptyStates.push({
      icon: Layers,
      title: 'No departments set up',
      desc: 'Create departments to structure your organization by function — Engineering, Marketing, Sales, and more.',
      actionLabel: 'Create Department',
      actionRoute: '/organization/departments',
      color: 'from-violet-50 to-violet-100 dark:from-violet-500/10 dark:to-violet-500/5',
    })
  }
  if (org.activeTeams === 0) {
    emptyStates.push({
      icon: Users,
      title: 'No teams created yet',
      desc: 'Teams are where work gets done. Assemble your first team to start collaborating.',
      actionLabel: 'Create Team',
      actionRoute: '/organization/teams',
      color: 'from-emerald-50 to-emerald-100 dark:from-emerald-500/10 dark:to-emerald-500/5',
    })
  }
  if (emptyStates.length === 0) return null

  return (
    <Section title="Getting Started" subtitle="Steps to build out your organization" icon={Sparkles} className="mt-6 sm:mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {emptyStates.map((es) => (
          <div key={es.title} className={`rounded-[20px] bg-gradient-to-br ${es.color} border border-slate-100 dark:border-slate-700/30 p-6`}>
            <EmptyState {...es} />
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
      <WelcomeHero org={ORG} />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="lg:col-span-3">
          <SetupChecklist items={SETUP_ITEMS} />
        </div>
        <div className="lg:col-span-2">
          <RecentActivity items={RECENT_ACTIVITY} />
        </div>
      </div>
      <OrgSnapshot org={ORG} />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 my-6 sm:my-8">
        <div className="lg:col-span-2">
          <HealthScore org={ORG} metrics={HEALTH_METRICS} />
        </div>
        <div className="lg:col-span-3">
          <QuickActions actions={QUICK_ACTIONS} />
        </div>
      </div>
      <Recommendations items={RECOMMENDATIONS} />
      <EmptyStates org={ORG} />
    </div>
  )
}
