import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  User, Target, BookOpen, TrendingUp, Award, Star,
  ChevronRight, Calendar, Clock, BarChart3, GraduationCap,
  Briefcase, ArrowRight, CheckCircle, AlertCircle,
  CircleDot, Sparkles, Trophy, Layers
} from 'lucide-react'
import {
  RadialBarChart, RadialBar, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts'
import { KPICard, DashboardSection, StatusBadge } from '../../components/dashboard/SharedComponents'
import {
  EMPLOYEE_PROFILE, PERFORMANCE, SKILLS_DATA, GOALS_DATA,
  CAREER_PATH, LEARNING_RECOMMENDATIONS, UPCOMING_REVIEWS
} from '../../data/employeeMockData'

const TOOLTIP_STYLE = {
  background: 'rgba(255,255,255,0.95)',
  border: 'none',
  borderRadius: '12px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
  padding: '8px 12px',
  fontSize: '12px',
}

export default function EmployeeDashboard() {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-10">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#8B5CF6] p-6 sm:p-8 mb-6"
      >
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#8B5CF6]/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="flex items-center gap-4 flex-1">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg shrink-0">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
                {greeting}, {EMPLOYEE_PROFILE.name} 👋
              </h1>
              <div className="flex flex-wrap items-center gap-2 mt-1.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-white/15 text-white/90 backdrop-blur-sm border border-white/20">
                  <Briefcase className="w-3 h-3" /> {EMPLOYEE_PROFILE.role}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-white/15 text-white/90 backdrop-blur-sm border border-white/20">
                  <Layers className="w-3 h-3" /> {EMPLOYEE_PROFILE.department}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-white/15 text-white/90 backdrop-blur-sm border border-white/20">
                  <User className="w-3 h-3" /> Reports to {EMPLOYEE_PROFILE.manager}
                </span>
              </div>
            </div>
          </div>

          {/* Performance Score */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">{PERFORMANCE.currentScore}</p>
              <p className="text-[10px] font-medium text-white/70 uppercase tracking-wider mt-0.5">Score</p>
            </div>
            <div className="h-10 w-px bg-white/20" />
            <div className="text-center">
              <p className="text-lg font-bold text-emerald-300">{PERFORMANCE.changePercent}%</p>
              <p className="text-[10px] font-medium text-white/70 uppercase tracking-wider mt-0.5">Change</p>
            </div>
            <div className="h-10 w-px bg-white/20" />
            <div className="text-center">
              <p className="text-lg font-bold text-white">{PERFORMANCE.teamBenchmark}</p>
              <p className="text-[10px] font-medium text-white/70 uppercase tracking-wider mt-0.5">Team Avg</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <KPICard icon={Star} label="Performance Score" value={PERFORMANCE.currentScore} suffix="" change={PERFORMANCE.changePercent} color="#2563EB" delay={0} />
        <KPICard icon={Target} label="Active Goals" value={GOALS_DATA.filter(g => g.status === 'in-progress' || g.status === 'pending').length} color="#8B5CF6" delay={1} />
        <KPICard icon={Trophy} label="Completed Goals" value={GOALS_DATA.filter(g => g.status === 'completed').length} color="#10B981" delay={2} />
        <KPICard icon={GraduationCap} label="Skills Tracked" value={SKILLS_DATA.length} color="#F59E0B" delay={3} />
      </div>

      {/* Skills + Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 mb-6">
        {/* Skills Matrix */}
        <DashboardSection title="My Skills" subtitle="Current vs target levels" icon={BarChart3} className="lg:col-span-3">
          <div className="h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SKILLS_DATA} margin={{ top: 5, right: 10, left: -10, bottom: 0 }} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} width={80} />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Bar dataKey="level" name="Current Level" fill="#2563EB" radius={[0, 4, 4, 0]} animationBegin={200} animationDuration={1000} />
                <Bar dataKey="targetLevel" name="Target Level" fill="#8B5CF6" radius={[0, 4, 4, 0]} animationBegin={400} animationDuration={1000} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" /> Current</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" /> Target</span>
          </div>
        </DashboardSection>

        {/* Performance Score + Career Level */}
        <DashboardSection title="Performance Overview" subtitle="Score breakdown" icon={Award} className="lg:col-span-2">
          <div className="h-48 flex flex-col items-center justify-center">
            <div className="relative w-36 h-36">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(148,163,184,0.12)" strokeWidth="8" />
                <motion.circle
                  cx="50" cy="50" r="44" fill="none" stroke="url(#perfGrad)"
                  strokeWidth="8" strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 44}
                  strokeDashoffset={2 * Math.PI * 44 * (1 - PERFORMANCE.currentScore / 100)}
                  style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
                />
                <defs>
                  <linearGradient id="perfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">{PERFORMANCE.currentScore}%</span>
                <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">Score</span>
              </div>
            </div>
          </div>
          <div className="text-center text-xs text-slate-400">{EMPLOYEE_PROFILE.currentLevel} · {EMPLOYEE_PROFILE.department}</div>
        </DashboardSection>
      </div>

      {/* My Goals */}
      <DashboardSection title="My Goals" subtitle="Track your progress" icon={Target} className="mb-6">
        <div className="space-y-3">
          {GOALS_DATA.map((goal, i) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl border border-slate-100 dark:border-slate-700/30 hover:border-slate-200 dark:hover:border-slate-600 transition-colors"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                goal.status === 'completed' ? 'bg-emerald-50 dark:bg-emerald-500/10' :
                goal.status === 'in-progress' ? 'bg-blue-50 dark:bg-blue-500/10' :
                'bg-slate-50 dark:bg-slate-800/50'
              }`}>
                {goal.status === 'completed' ? <CheckCircle className="w-5 h-5 text-emerald-500" /> :
                 goal.status === 'in-progress' ? <CircleDot className="w-5 h-5 text-blue-500" /> :
                 <Clock className="w-5 h-5 text-slate-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{goal.title}</p>
                  <StatusBadge status={goal.status === 'in-progress' ? 'active' : goal.status} />
                </div>
                <p className="text-xs text-slate-400 mt-0.5">Due: {goal.dueDate}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="w-24 sm:w-28">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>{goal.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${goal.progress}%` }}
                      transition={{ duration: 0.8, delay: 0.2 + 0.05 * i }}
                      className={`h-full rounded-full ${
                        goal.progress === 100 ? 'bg-emerald-500' :
                        goal.progress > 0 ? 'bg-blue-500' : 'bg-slate-300'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </DashboardSection>

      {/* Career Path + Learning + Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
        {/* Career Path */}
        <DashboardSection title="Career Path" subtitle="Your professional journey" icon={TrendingUp} className="lg:col-span-2">
          <div className="relative">
            <div className="absolute left-[19px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-[#2563EB] via-[#8B5CF6] to-slate-200 dark:to-slate-700" />
            <div className="space-y-0">
              {CAREER_PATH.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i }}
                  className="relative flex items-start gap-4 pb-7 last:pb-0"
                >
                  <div className={`relative z-10 w-[38px] h-[38px] rounded-full flex items-center justify-center shrink-0 ${
                    step.current
                      ? 'bg-gradient-to-br from-[#2563EB] to-[#8B5CF6] shadow-lg shadow-[#2563EB]/20 ring-2 ring-white dark:ring-slate-900'
                      : step.completed
                      ? 'bg-emerald-500'
                      : 'bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-600'
                  }`}>
                    {step.completed ? <CheckCircle className="w-[18px] h-[18px] text-white" /> :
                     step.current ? <CircleDot className="w-[18px] h-[18px] text-white" /> :
                     <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" />}
                  </div>
                  <div className="pt-1.5">
                    <p className={`text-sm font-semibold ${step.current ? 'text-[#2563EB] dark:text-[#60A5FA]' : step.completed ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400'}`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">{step.period}</p>
                  </div>
                  {step.current && (
                    <span className="absolute -right-1 top-2 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-full bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20">
                      Current
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </DashboardSection>

        {/* Learning Recommendations */}
        <DashboardSection title="Learning Recommendations" subtitle="AI-powered suggestions" icon={BookOpen} className="lg:col-span-2">
          <div className="space-y-3">
            {LEARNING_RECOMMENDATIONS.map((rec, i) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * i }}
                className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-700/30 hover:border-slate-200 dark:hover:border-slate-600 transition-colors cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#2563EB]/10 to-[#8B5CF6]/10 flex items-center justify-center shrink-0">
                  <BookOpen className="w-4.5 h-4.5 text-[#2563EB]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-[#2563EB] transition-colors">{rec.title}</p>
                    <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded bg-[#2563EB]/10 text-[#2563EB]">{rec.type}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{rec.provider} · {rec.duration}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex-1 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-[#2563EB] to-[#8B5CF6]" style={{ width: `${rec.relevance}%` }} />
                    </div>
                    <span className="text-[10px] font-semibold text-slate-400">{rec.relevance}% match</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#2563EB] group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
              </motion.div>
            ))}
          </div>
        </DashboardSection>

        {/* Upcoming Reviews */}
        <DashboardSection title="Upcoming Reviews" subtitle="Performance evaluations" icon={Calendar} className="lg:col-span-1">
          <div className="space-y-4">
            {UPCOMING_REVIEWS.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i }}
                className="p-3 rounded-xl border border-slate-100 dark:border-slate-700/30"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-400">{review.date}</span>
                  <StatusBadge status={review.status} />
                </div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{review.manager}</p>
                <div className="mt-2 space-y-1">
                  {review.checklist.map((item, j) => (
                    <div key={j} className="flex items-center gap-1.5 text-xs text-slate-400">
                      <div className="w-1 h-1 rounded-full bg-slate-300" />
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
            <button className="w-full flex items-center justify-center gap-1.5 text-xs font-medium text-[#2563EB] py-2 rounded-lg hover:bg-[#2563EB]/5 transition-colors">
              View All Reviews <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </DashboardSection>
      </div>
    </div>
  )
}
