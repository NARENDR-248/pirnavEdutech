import { motion } from 'framer-motion'

export function KPICard({ icon: Icon, label, value, change, changeLabel, color = '#2563EB', delay = 0, prefix = '', suffix = '', onClick }) {
  const isPositive = change >= 0
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3, scale: 1.01 }}
      onClick={onClick}
      className={`group relative bg-white dark:bg-slate-900/60 backdrop-blur-2xl
        border border-slate-200 dark:border-slate-700/40 rounded-2xl p-5 sm:p-6
        transition-all duration-300 ${onClick ? 'cursor-pointer' : 'cursor-default'} overflow-hidden`}
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 0 0 0.5px rgba(255,255,255,0.08) inset' }}
    >
      <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${color}15, ${color}08)` }} />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${color}12, ${color}06)` }}>
            <Icon className="w-5 h-5" style={{ color }} />
          </div>
          {change !== undefined && (
            <span className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full
              ${isPositive ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'}`}>
              <svg className={`w-3 h-3 ${isPositive ? '' : 'rotate-180'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 15l-6-6-6 6" />
              </svg>
              {Math.abs(change)}%
            </span>
          )}
        </div>
        <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
        </p>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">{label}</p>
        {changeLabel && <p className="text-xs text-emerald-500 mt-1.5 font-medium">{changeLabel}</p>}
      </div>
    </motion.div>
  )
}

export function DashboardSection({ title, subtitle, icon: Icon, children, className = '', badge, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`bg-white dark:bg-slate-900/60 backdrop-blur-2xl border border-slate-200 dark:border-slate-700/40
        shadow-sm rounded-2xl p-5 sm:p-6 ${className}`}
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 0 0 0.5px rgba(255,255,255,0.08) inset' }}
    >
      {(title || action) && (
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-start gap-3 min-w-0">
            {Icon && (
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2563EB]/10 to-[#8B5CF6]/10 flex items-center justify-center shrink-0">
                <Icon className="w-4.5 h-4.5 text-[#2563EB]" />
              </div>
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">{title}</h3>
                {badge && (
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20">{badge}</span>
                )}
              </div>
              {subtitle && <p className="text-xs sm:text-sm text-slate-400 mt-0.5">{subtitle}</p>}
            </div>
          </div>
          {action}
        </div>
      )}
      {children}
    </motion.div>
  )
}

export function StatusBadge({ status }) {
  const config = {
    active: { label: 'Active', classes: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20' },
    inactive: { label: 'Inactive', classes: 'bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-600' },
    suspended: { label: 'Suspended', classes: 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/20' },
    pending: { label: 'Pending', classes: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/20' },
    scheduled: { label: 'Scheduled', classes: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/20' },
    completed: { label: 'Completed', classes: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20' },
    upcoming: { label: 'Upcoming', classes: 'bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-500/20' },
  }
  const c = config[status] || config.inactive
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-lg border ${c.classes}`}>
      {c.label}
    </span>
  )
}

export function Skeleton({ className = 'h-4 w-full' }) {
  return (
    <div className={`animate-pulse bg-slate-200 dark:bg-slate-700/50 rounded-lg ${className}`} />
  )
}
