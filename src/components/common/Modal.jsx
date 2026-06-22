import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.15 } },
}

export default function Modal({
  open,
  onClose,
  title,
  description,
  children,
  size = 'md',
  showClose = true,
  footer,
}) {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[95vw]',
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`
              relative w-full ${sizeClasses[size]}
              bg-white dark:bg-slate-800
              rounded-[20px] shadow-2xl
              border border-slate-200 dark:border-slate-700
              overflow-hidden
            `}
          >
            {/* Header */}
            {(title || showClose) && (
              <div className="flex items-start justify-between p-6 pb-4 border-b border-slate-100 dark:border-slate-700/50">
                <div className="pr-8">
                  {title && (
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p className="text-sm text-slate-400 dark:text-slate-500 mt-0.5">
                      {description}
                    </p>
                  )}
                </div>
                {showClose && (
                  <button
                    onClick={onClose}
                    className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shrink-0"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4 text-slate-400" />
                  </button>
                )}
              </div>
            )}

            {/* Body */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="p-6 pt-4 border-t border-slate-100 dark:border-slate-700/50">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
