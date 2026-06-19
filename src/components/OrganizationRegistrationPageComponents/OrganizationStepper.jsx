import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const STEPS = [
  { id: 'basic', title: 'Basic Info', description: 'Company name & email' },
  { id: 'details', title: 'Details', description: 'Industry & size' },
  { id: 'location', title: 'Location', description: 'Country & timezone' },
]

export default function OrganizationStepper({ currentStep }) {
  return (
    <div className="relative px-2 sm:px-0">
      {/* Background Track */}
      <div className="absolute top-5 left-0 right-0 h-0.5 bg-slate-200 dark:bg-slate-700" />

      {/* Animated Progress */}
      <motion.div
        className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-[#2563EB] to-[#7C3AED]"
        animate={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />

      <div className="relative flex justify-between">
        {STEPS.map((step, index) => {
          const isCompleted = index < currentStep
          const isCurrent = index === currentStep

          return (
            <div key={step.id} className="flex flex-col items-center">
              <motion.div
                animate={{
                  scale: isCurrent ? 1.12 : 1,
                  backgroundColor: isCompleted
                    ? '#2563EB'
                    : isCurrent
                    ? '#2563EB'
                    : '#E2E8F0',
                }}
                transition={{ type: 'spring', stiffness: 300 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                  relative z-10 shadow-sm
                  ${isCompleted || isCurrent ? 'text-white' : 'text-slate-400 dark:text-slate-500'}
                  ${isCurrent ? 'shadow-[#2563EB]/30 shadow-lg' : ''}`}
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <Check className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <span>{index + 1}</span>
                )}
              </motion.div>

              <p
                className={`mt-2.5 text-xs font-semibold transition-colors duration-300
                  ${isCurrent ? 'text-[#2563EB]' : 'text-slate-400 dark:text-slate-500'}`}
              >
                {step.title}
              </p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 hidden sm:block">
                {step.description}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}