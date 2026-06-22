import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Building2, Users, UserCheck, DollarSign, TrendingUp,
  Activity, BarChart3, Bell, Search,
  Eye, Edit3, AlertCircle
} from 'lucide-react'
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  BarChart, Bar, Legend
} from 'recharts'
import { KPICard, DashboardSection, StatusBadge } from '../../components/dashboard/SharedComponents'
import {
  SUPER_ADMIN_STATS, SUBSCRIPTION_DATA, ORGANIZATION_GROWTH,
  USER_ACTIVITY, RECENT_ORGANIZATIONS, INSIGHTS_DATA
} from '../../data/superAdminMockData'

const TOOLTIP_STYLE = {
  background: 'rgba(255,255,255,0.95)',
  border: 'none',
  borderRadius: '12px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
  padding: '8px 12px',
  fontSize: '12px',
}

export default function SuperAdminDashboard() {
  const [orgFilter, setOrgFilter] = useState('')

  const filteredOrgs = RECENT_ORGANIZATIONS.filter(o =>
    !orgFilter || o.status === orgFilter
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-10">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB]/10 to-[#8B5CF6]/10 flex items-center justify-center">
            <Activity className="w-5 h-5 text-[#2563EB]" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Super Admin Dashboard</h1>
            <p className="text-sm text-slate-400">Platform-level overview and analytics</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search organizations..."
              className="w-56 pl-9 pr-3 py-2 text-sm bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30"
            />
          </div>
          <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 relative">
            <Bell className="w-5 h-5 text-slate-500 dark:text-slate-400" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>
        </div>
      </motion.div>

      {/* KPI Cards Row 1 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <KPICard icon={Building2} label="Total Organizations" value={SUPER_ADMIN_STATS.totalOrganizations} change={SUPER_ADMIN_STATS.orgGrowth} color="#2563EB" delay={0} />
        <KPICard icon={Users} label="Active Users" value={SUPER_ADMIN_STATS.activeUsers} change={SUPER_ADMIN_STATS.userChange} color="#8B5CF6" delay={1} />
        <KPICard icon={UserCheck} label="Total Employees" value={SUPER_ADMIN_STATS.totalEmployees} change={SUPER_ADMIN_STATS.employeeGrowth} color="#10B981" delay={2} />
        <KPICard icon={DollarSign} label="Monthly Revenue" value={SUPER_ADMIN_STATS.monthlyRevenue} prefix="$" change={SUPER_ADMIN_STATS.mrrTrend} color="#F59E0B" delay={3} />
      </div>

      {/* Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 mb-6">
        {/* Organization Growth Area Chart */}
        <DashboardSection title="Organization Growth" subtitle="Monthly registrations · Last 12 months" icon={TrendingUp} className="lg:col-span-3">
          <div className="h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ORGANIZATION_GROWTH} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="orgGrowthGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Area type="monotone" dataKey="registrations" stroke="#2563EB" strokeWidth={2} fill="url(#orgGrowthGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </DashboardSection>

        {/* Subscription Overview Donut */}
        <DashboardSection title="Subscription Overview" subtitle="Plan distribution" icon={BarChart3} className="lg:col-span-2">
          <div className="h-64 sm:h-72 flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={SUBSCRIPTION_DATA} cx="50%" cy="50%" innerRadius={50} outerRadius={75}
                  paddingAngle={3} dataKey="value" animationBegin={200} animationDuration={1000}>
                  {SUBSCRIPTION_DATA.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={TOOLTIP_STYLE} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 mt-2">
              {SUBSCRIPTION_DATA.map((d) => (
                <span key={d.name} className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                  {d.name} <span className="font-medium text-slate-700 dark:text-slate-300">{d.value}</span>
                </span>
              ))}
            </div>
          </div>
        </DashboardSection>
      </div>

      {/* User Activity + Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 mb-6">
        <DashboardSection title="User Activity Analytics" subtitle="Daily metrics" icon={Activity} className="lg:col-span-3">
          <div className="h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={USER_ACTIVITY} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px', color: '#64748B' }} />
                <Bar dataKey="logins" name="Daily Logins" fill="#2563EB" radius={[4, 4, 0, 0]} />
                <Bar dataKey="sessions" name="Active Sessions" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="registrations" name="New Registrations" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </DashboardSection>

        {/* Quick Insights */}
        <DashboardSection title="Quick Insights" subtitle="AI-generated business insights" icon={Bell} className="lg:col-span-2">
          <div className="space-y-3">
            {INSIGHTS_DATA.map((insight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 * i }}
                className={`flex items-start gap-3 p-3 rounded-xl border ${
                  insight.type === 'positive'
                    ? 'bg-emerald-50/50 dark:bg-emerald-500/5 border-emerald-100 dark:border-emerald-500/10'
                    : 'bg-amber-50/50 dark:bg-amber-500/5 border-amber-100 dark:border-amber-500/10'
                }`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  insight.type === 'positive' ? 'bg-emerald-100 dark:bg-emerald-500/10' : 'bg-amber-100 dark:bg-amber-500/10'
                }`}>
                  <TrendingUp className={`w-4 h-4 ${insight.type === 'positive' ? 'text-emerald-600' : 'text-amber-600'}`} />
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{insight.label}</p>
              </motion.div>
            ))}
          </div>
        </DashboardSection>
      </div>

      {/* Recent Organizations Table */}
      <DashboardSection
        title="Recent Organizations"
        subtitle="Latest registered organizations"
        icon={Building2}
        action={
          <div className="flex items-center gap-2">
            <select
              value={orgFilter}
              onChange={(e) => setOrgFilter(e.target.value)}
              className="px-3 py-1.5 text-xs bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 cursor-pointer"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        }
      >
        <div className="overflow-x-auto -mx-5 sm:-mx-6">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700/30">
                <th className="text-left px-5 sm:px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Organization</th>
                <th className="text-left px-5 sm:px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Industry</th>
                <th className="text-left px-5 sm:px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Employees</th>
                <th className="text-left px-5 sm:px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Subscription</th>
                <th className="text-left px-5 sm:px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Status</th>
                <th className="text-left px-5 sm:px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Created</th>
                <th className="text-right px-5 sm:px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/30">
              {filteredOrgs.map((org, i) => (
                <motion.tr
                  key={org.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.03 * i }}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-5 sm:px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2563EB]/10 to-[#8B5CF6]/10 flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-[#2563EB]" />
                      </div>
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">{org.name}</span>
                    </div>
                  </td>
                  <td className="px-5 sm:px-6 py-3.5 text-sm text-slate-500">{org.industry}</td>
                  <td className="px-5 sm:px-6 py-3.5 text-sm font-medium text-slate-700 dark:text-slate-300">{org.employees.toLocaleString()}</td>
                  <td className="px-5 sm:px-6 py-3.5">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{org.subscription}</span>
                  </td>
                  <td className="px-5 sm:px-6 py-3.5"><StatusBadge status={org.status} /></td>
                  <td className="px-5 sm:px-6 py-3.5 text-sm text-slate-400">{org.createdDate}</td>
                  <td className="px-5 sm:px-6 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                        <Eye className="w-3.5 h-3.5 text-slate-400 hover:text-[#2563EB]" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                        <Edit3 className="w-3.5 h-3.5 text-slate-400 hover:text-[#2563EB]" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                        <AlertCircle className="w-3.5 h-3.5 text-slate-400 hover:text-red-500" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardSection>
    </div>
  )
}
