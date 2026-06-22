import { motion } from 'framer-motion'
import { Users, Building2, Layers, LayoutGrid } from 'lucide-react'

const STAT_COLORS = [
  { bg: 'from-[#2563EB]/20 to-[#2563EB]/5', text: 'text-[#2563EB]' },
  { bg: 'from-[#7C3AED]/20 to-[#7C3AED]/5', text: 'text-[#7C3AED]' },
  { bg: 'from-[#10B981]/20 to-[#10B981]/5', text: 'text-[#10B981]' },
  { bg: 'from-[#F59E0B]/20 to-[#F59E0B]/5', text: 'text-[#F59E0B]' },
]

export default function StatisticsCards({ stats }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 * index }}
          className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/50 
            dark:border-slate-700/50 shadow-sm rounded-[20px] p-5 
            hover:shadow-lg transition-shadow duration-300 cursor-default"
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-xl bg-gradient-to-br ${STAT_COLORS[index].bg} flex items-center justify-center`}
            >
              <stat.icon className={`w-5 h-5 ${STAT_COLORS[index].text}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {stat.value.toLocaleString()}
              </p>
              <p className="text-xs text-slate-400">{stat.label}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}