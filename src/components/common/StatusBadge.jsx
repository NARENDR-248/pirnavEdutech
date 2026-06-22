import { motion } from 'framer-motion'

const VARIANTS = {
  active: {
    bg: 'bg-[#10B981]/10',
    text: 'text-[#10B981]',
    dot: 'bg-[#10B981]',
  },
  inactive: {
    bg: 'bg-slate-100 dark:bg-slate-700',
    text: 'text-slate-500 dark:text-slate-400',
    dot: 'bg-slate-400',
  },
  pending: {
    bg: 'bg-[#F59E0B]/10',
    text: 'text-[#F59E0B]',
    dot: 'bg-[#F59E0B]',
  },
  success: {
    bg: 'bg-[#10B981]/10',
    text: 'text-[#10B981]',
    dot: 'bg-[#10B981]',
  },
  warning: {
    bg: 'bg-[#F59E0B]/10',
    text: 'text-[#F59E0B]',
    dot: 'bg-[#F59E0B]',
  },
  danger: {
    bg: 'bg-[#EF4444]/10',
    text: 'text-[#EF4444]',
    dot: 'bg-[#EF4444]',
  },
  default: {
    bg: 'bg-slate-100 dark:bg-slate-700',
    text: 'text-slate-600 dark:text-slate-300',
    dot: 'bg-slate-400',
  },
}

export default function StatusBadge({ status = 'default', label, dot = true, size = 'sm' }) {
  const variant = VARIANTS[status] || VARIANTS.default
  const displayLabel = label || status.charAt(0).toUpperCase() + status.slice(1)

  const sizeClasses = size === 'sm'
    ? 'px-2.5 py-1 text-[11px]'
    : 'px-3 py-1.5 text-xs'

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      aria-label={`Status: ${displayLabel}`}
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full ${sizeClasses} ${variant.bg} ${variant.text}`}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${variant.dot}`} />
      )}
      {displayLabel}
    </motion.span>
  )
}
