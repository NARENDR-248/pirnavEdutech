import { motion } from 'framer-motion'

export default function Card({
  children,
  className = '',
  padding = 'p-6 sm:p-8',
  hover = false,
  onClick,
  animate = true,
  delay = 0,
}) {
  const baseClasses = `
    bg-white/70 dark:bg-slate-900/70
    backdrop-blur-xl
    border border-slate-200/50 dark:border-slate-700/50
    shadow-sm
    rounded-[20px]
    ${padding}
    ${hover ? 'hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer' : ''}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.3 }}
        className={baseClasses}
        onClick={onClick}
      >
        {children}
      </motion.div>
    )
  }

  return <div className={baseClasses} onClick={onClick}>{children}</div>
}
