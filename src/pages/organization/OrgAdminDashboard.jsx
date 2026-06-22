import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users, Layers, Target, Star, ClipboardCheck, TrendingUp,
  Trophy, Clock, CheckCircle, AlertCircle, CircleDot,
  ChevronRight, Sparkles
} from 'lucide-react'
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  RadialBarChart, RadialBar, Legend
} from 'recharts'
import { KPICard, DashboardSection, StatusBadge } from '../../components/dashboard/SharedComponents'
import {
  ORG_ADMIN_STATS, SKILL_COVERAGE, PERFORMANCE_TREND,
  DEPARTMENT_DISTRIBUTION, GOAL_STATS, TOP_PERFORMERS, ORG_RECENT_ACTIVITY
} from '../../data/orgAdminMockData'

const TOOLTIP_STYLE = {
  background: 'rgba(255,255,255,0.95)',
  border: 'none',
  borderRadius: '12px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
  padding: '8px 12px',
  fontSize: '12px',
}

const GOAL_ITEMS = [
  { label: 'Completed', value: GOAL_STATS.completed, icon: CheckCircle, color: '#10B981', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
  { label: 'In Progress', value: GOAL_STATS.inProgress, icon: CircleDot, color: '#2563EB', bg: 'bg-blue-50 dark:bg-blue-500/10' },
  { label: 'Pending', value: GOAL_STATS.pending, icon: Clock, color: '#F59E0B', bg: 'bg-amber-50 dark:bg-amber-500/10' },
  { label: 'Overdue', value: GOAL_STATS.overdue, icon: AlertCircle, color: '#EF4444', bg: 'bg-red-50 dark:bg-red-500/10' },
]

export default function OrgAdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-10">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-8"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB]/10 to-[#8B5CF6]/10 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-[#2563EB]" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Organization Dashboard</h1>
          <p className="text-sm text-slate-400">Performance overview and workforce analytics</p>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-6">
        <KPICard icon={Users} label="Employees" value={ORG_ADMIN_STATS.employeeCount} change={ORG_ADMIN_STATS.employeeGrowth} color="#2563EB" delay={0} />
        <KPICard icon={Layers} label="Departments" value={ORG_ADMIN_STATS.departmentCount} change={ORG_ADMIN_STATS.departmentGrowth} color="#8B5CF6" delay={1} />
        <KPICard icon={Target} label="Skill Coverage" value={ORG_ADMIN_STATS.skillCoverage} suffix="%" color="#10B981" delay={2} />
        <KPICard icon={Star} label="Active Goals" value={ORG_ADMIN_STATS.activeGoals} color="#F59E0B" delay={3} />
        <KPICard icon={ClipboardCheck} label="Open Reviews" value={ORG_ADMIN_STATS.openReviews} color="#EF4444" delay={4} />
        <KPICard icon={TrendingUp} label="Avg Performance" value={ORG_ADMIN_STATS.avgPerformanceScore} suffix="%" change={ORG_ADMIN_STATS.performanceChange} color="#06B6D4" delay={5} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 mb-6">
        {/* Skill Coverage Radial */}
        <DashboardSection title="Skill Coverage" subtitle="Competency distribution" icon={Target} className="lg:col-span-2">
          <div className="h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart cx="50%" cy="50%" innerRadius="15%" outerRadius="80%" barSize={16} data={SKILL_COVERAGE} startAngle={180} endAngle={-180}>
                <RadialBar dataKey="value" cornerRadius={8} animationBegin={300} animationDuration={1200}>
                  {SKILL_COVERAGE.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </RadialBar>
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px', color: '#64748B' }} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </DashboardSection>

        {/* Performance Trend */}
        <DashboardSection title="Performance Trend" subtitle="Monthly scores · Last 12 months" icon={TrendingUp} className="lg:col-span-3">
          <div className="h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={PERFORMANCE_TREND} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis domain={[60, 100]} tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Line type="monotone" dataKey="score" stroke="#2563EB" strokeWidth={2.5} dot={{ r: 3, fill: '#2563EB' }} activeDot={{ r: 5, fill: '#2563EB' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </DashboardSection>
      </div>

      {/* Department Distribution + Goal Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 mb-6">
        {/* Department Donut */}
        <DashboardSection title="Department Distribution" subtitle="Headcount by department" icon={Layers} className="lg:col-span-2">
          <div className="h-64 flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={DEPARTMENT_DISTRIBUTION} cx="50%" cy="50%" innerRadius={50} outerRadius={75}
                  paddingAngle={3} dataKey="value" animationBegin={200} animationDuration={1000}>
                  {DEPARTMENT_DISTRIBUTION.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={TOOLTIP_STYLE} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2">
              {DEPARTMENT_DISTRIBUTION.slice(0, 4).map((d) => (
                <span key={d.name} className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                  {d.name}
                </span>
              ))}
            </div>
          </div>
        </DashboardSection>

        {/* Goal Tracking */}
        <DashboardSection title="Goal Tracking" subtitle="Progress overview" icon={Target} className="lg:col-span-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            {GOAL_ITEMS.map((item) => (
              <div key={item.label} className={`rounded-xl p-4 ${item.bg} border border-transparent`}>
                <div className="flex items-center gap-2 mb-2">
                  <item.icon className="w-4 h-4" style={{ color: item.color }} />
                  <span className="text-xs font-medium text-slate-500">{item.label}</span>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{item.value}</p>
              </div>
            ))}
          </div>
          {/* Goal completion bar */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Overall completion</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">{ORG_ADMIN_STATS.goalCompletionRate}%</span>
            </div>
            <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${ORG_ADMIN_STATS.goalCompletionRate}%` }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full bg-gradient-to-r from-[#2563EB] to-[#8B5CF6]"
              />
            </div>
          </div>
        </DashboardSection>
      </div>

      {/* Top Performers + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
        <DashboardSection title="Top Performers" subtitle="Highest rated employees" icon={Trophy} className="lg:col-span-2">
          <div className="space-y-3">
            {TOP_PERFORMERS.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.06 * i }}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
              >
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${p.color} flex items-center justify-center shrink-0`}>
                  <span className="text-[10px] font-bold text-white">{p.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{p.name}</p>
                  <p className="text-xs text-slate-400">{p.department}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{p.score}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </DashboardSection>

        <DashboardSection title="Recent Activity" subtitle="Latest updates across teams" icon={Clock} className="lg:col-span-3">
          <div className="relative">
            <div className="absolute left-[17px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-[#2563EB]/30 via-[#8B5CF6]/20 to-transparent" />
            <div className="space-y-0">
              {ORG_RECENT_ACTIVITY.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="relative flex items-start gap-3 py-3 pl-0 first:pt-0 last:pb-0 group"
                >
                  <div className="relative z-10 mt-0.5">
                    <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0 shadow-sm`}>
                      <span className="text-[10px] font-bold text-white">{item.initials}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 pt-0.5">
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{item.user}</span>
                      {' '}{item.action}{' '}
                      <span className="font-medium text-[#2563EB]">{item.target}</span>
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">{item.time}</p>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>
          </div>
        </DashboardSection>
      </div>
    </div>
  )
}
