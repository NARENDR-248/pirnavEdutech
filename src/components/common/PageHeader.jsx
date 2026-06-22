import { motion } from 'framer-motion'

export default function PageHeader({ title, subtitle, icon: Icon, actions, badge }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          {Icon && (
            <div className="w-12 h-12 rounded-[16px] bg-gradient-to-br from-[#2563EB]/10 to-[#7C3AED]/10 flex items-center justify-center shrink-0">
              <Icon className="w-6 h-6 text-[#2563EB]" />
            </div>
          )}
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                {title}
              </h1>
              {badge && badge}
            </div>
            {subtitle && (
              <p className="text-sm text-slate-400 dark:text-slate-500 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        {actions && (
          <div className="flex items-center gap-3">
            {actions}
          </div>
        )}
      </div>
    </motion.div>
  )
}
