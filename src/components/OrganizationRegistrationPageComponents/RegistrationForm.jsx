import { motion, AnimatePresence } from 'framer-motion'
import {
  Building2,
  Mail,
  Globe,
  Users,
  MapPin,
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
} from 'lucide-react'
import { INDUSTRIES, COMPANY_SIZES, COUNTRIES, TIMEZONES } from '../../data/organizationMockData'

const slideVariants = {
  enter: (direction) => ({ x: direction > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: direction > 0 ? -40 : 40, opacity: 0 }),
}

export default function RegistrationForm({ currentStep, formData, onChange, onNext, onPrev, errors }) {
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-5">
            <InputField
              label="Company Name"
              placeholder="e.g. Acme Corp"
              value={formData.companyName}
              onChange={(e) => onChange('companyName', e.target.value)}
              error={errors.companyName}
              Icon={Building2}
            />
            <InputField
              label="Company Email"
              type="email"
              placeholder="hello@company.com"
              value={formData.companyEmail}
              onChange={(e) => onChange('companyEmail', e.target.value)}
              error={errors.companyEmail}
              Icon={Mail}
            />
          </div>
        )

      case 1:
        return (
          <div className="space-y-5">
            <SelectField
              label="Industry"
              placeholder="Select your industry"
              options={INDUSTRIES}
              value={formData.industry}
              onChange={(e) => onChange('industry', e.target.value)}
              error={errors.industry}
              Icon={Globe}
            />
            <SelectField
              label="Company Size"
              placeholder="Select company size"
              options={COMPANY_SIZES}
              value={formData.companySize}
              onChange={(e) => onChange('companySize', e.target.value)}
              error={errors.companySize}
              Icon={Users}
            />
          </div>
        )

      case 2:
        return (
          <div className="space-y-5">
            <SelectField
              label="Country"
              placeholder="Select country"
              options={COUNTRIES}
              value={formData.country}
              onChange={(e) => onChange('country', e.target.value)}
              error={errors.country}
              Icon={MapPin}
            />
            <SelectField
              label="Timezone"
              placeholder="Select timezone"
              options={TIMEZONES}
              value={formData.timezone}
              onChange={(e) => onChange('timezone', e.target.value)}
              error={errors.timezone}
              Icon={Clock}
            />
          </div>
        )

      default:
        return null
    }
  }

  const isLastStep = currentStep === 2

  return (
    <div className="space-y-8">
      <AnimatePresence mode="wait" custom={currentStep}>
        <motion.div
          key={currentStep}
          custom={currentStep}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700/50">
        <button
          onClick={onPrev}
          disabled={currentStep === 0}
          className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200
            ${
              currentStep === 0
                ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white 
            bg-[#2563EB] hover:brightness-110 rounded-xl transition-all duration-200 shadow-sm shadow-[#2563EB]/20"
        >
          {isLastStep ? (
            <>
              Complete Setup
              <CheckCircle className="w-4 h-4" />
            </>
          ) : (
            <>
              Save & Continue
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  )
}

/* ─── Inline Reusable Input ─── */
function InputField({ label, type = 'text', placeholder, value, onChange, error, Icon }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Icon className="w-4 h-4 text-slate-400" />
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-3 ${Icon ? 'pl-10' : ''} bg-white dark:bg-slate-800/50
            border ${error ? 'border-[#EF4444] ring-2 ring-[#EF4444]/20' : 'border-slate-200 dark:border-slate-700'}
            rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400
            focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB]
            transition-all duration-200`}
        />
      </div>
      {error && (
        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-[#EF4444]">
          {error}
        </motion.p>
      )}
    </div>
  )
}

/* ─── Inline Reusable Select ─── */
function SelectField({ label, placeholder, options, value, onChange, error, Icon }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
            <Icon className="w-4 h-4 text-slate-400" />
          </div>
        )}
        <select
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-3 ${Icon ? 'pl-10' : ''} bg-white dark:bg-slate-800/50
            border ${error ? 'border-[#EF4444] ring-2 ring-[#EF4444]/20' : 'border-slate-200 dark:border-slate-700'}
            rounded-xl text-sm text-slate-900 dark:text-white appearance-none cursor-pointer
            focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB]
            transition-all duration-200`}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
          <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && (
        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-[#EF4444]">
          {error}
        </motion.p>
      )}
    </div>
  )
}